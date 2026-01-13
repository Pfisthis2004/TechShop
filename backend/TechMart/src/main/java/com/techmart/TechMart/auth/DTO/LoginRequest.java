package com.techmart.TechMart.DTO;

import lombok.Data;

@Data
public class LoginRequest {
    private String identifier; // email hoặc username
    private String password;
}
