package com.techmart.TechMart.auth.controller;

import com.techmart.TechMart.auth.DTO.*;
import com.techmart.TechMart.auth.model.Role;
import com.techmart.TechMart.auth.model.User;
import com.techmart.TechMart.auth.repository.UserRepository;
import com.techmart.TechMart.auth.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            return ResponseEntity.badRequest().body("Email đã tồn tại");
        }
        User user = new User();
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setRole(Role.USER); // mặc định USER
        user.setPhone(req.getPhone());
        user.setAddress(req.getAddress());
        userRepository.save(user);
        return ResponseEntity.ok("Đăng ký thành công");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        return performLogin(req.getIdentifier(), req.getPassword(), null);
    }

    @PostMapping("/admin-login")
    public ResponseEntity<?> adminLogin(@RequestBody LoginRequest req) {
        return performLogin(req.getIdentifier(), req.getPassword(), Role.ADMIN);
    }

    private ResponseEntity<?> performLogin(String identifier, String password, Role requiredRole) {
        Optional<User> userOpt = userRepository.findByUsernameOrEmail(identifier, identifier);
        if (userOpt.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Tài khoản không tồn tại");

        User user = userOpt.get();
        if (!user.isActive()) return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Tài khoản đã bị khóa");
        if (requiredRole != null && user.getRole() != requiredRole) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Vai trò không hợp lệ cho endpoint này");
        }

        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), password)
        );

        String token = jwtService.generateToken((UserDetails) auth.getPrincipal(), user.getRole().name());
        return ResponseEntity.ok(new AuthResponse(token));
    }
}

