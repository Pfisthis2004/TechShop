package com.techmart.TechMart.service;

import com.techmart.TechMart.model.User;
import com.techmart.TechMart.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepo;
//    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    // Đăng ký
    public User register(User user) {
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("USER");
        user.setActive(true);
        return userRepo.save(user);
    }

    // Đăng nhập
    public Optional<User> login(String email, String rawPassword) {
        Optional<User> userOpt = userRepo.findByEmail(email);
//        if (userOpt.isPresent() && passwordEncoder.matches(rawPassword, userOpt.get().getPassword())) {
//            return userOpt;
//        }
        return Optional.empty();
    }
}

