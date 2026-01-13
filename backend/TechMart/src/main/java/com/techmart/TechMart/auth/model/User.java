package com.techmart.TechMart.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
@Data
@Document(collection = "users")
public class User {
    @Id private String id;
    @Indexed(unique = true) private String email;
    @Indexed(unique = true) private String username;
    private String password;
    private Role role = Role.USER; // mặc định là USER
    private boolean isActive = true;
    private String phone;
    private String address;
    private String avatar;
}

