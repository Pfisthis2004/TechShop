package com.techmart.TechMart.DTO;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private String phone;
    private String address;
}

