package com.techmart.TechMart.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Data
@Document(collection = "categories")
public class Category {
    @Id
    private String _id;
    private String name;
    private String slug;
    private String icon;
    private int order;
    private boolean isActive;
}
