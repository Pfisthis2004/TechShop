package com.techmart.TechMart.controller;

import com.techmart.TechMart.model.User;
import com.techmart.TechMart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserRepository userRepo;
    public UserController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }
    @GetMapping
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping
    public User addUser(@RequestBody User user) {
        User saved = userRepo.save(user);
        messagingTemplate.convertAndSend("/topic/users", saved);
        return saved;
    }

}
