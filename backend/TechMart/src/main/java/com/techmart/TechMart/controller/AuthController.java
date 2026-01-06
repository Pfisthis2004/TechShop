package com.techmart.TechMart.controller;

import com.techmart.TechMart.config.JwtUtil;
import com.techmart.TechMart.model.User;
import com.techmart.TechMart.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User loginRequest) {
        Optional<User> userOpt = userService.login(loginRequest.getEmail(), loginRequest.getPassword());
        Map<String, Object> response = new HashMap<>();
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            String token = JwtUtil.generateToken(user.getEmail(), user.getRole());
            response.put("user", user);
            response.put("token", token);
        } else {
            response.put("error", "Sai email hoặc mật khẩu");
        }
        return response;
    }

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody User user) {
        User saved = userService.register(user);
        String token = JwtUtil.generateToken(saved.getEmail(), saved.getRole());
        Map<String, Object> response = new HashMap<>();
        response.put("user", saved);
        response.put("token", token);
        return response;
    }

}

