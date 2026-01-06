package com.techmart.TechMart.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
import java.util.Map;
@Data
@Document(collection = "products")
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    private String _id;
    private String name;
    private String slug;
    private double price;
    private double originalPrice;
    private String image;
    private List<String> images;
    private String categoryId;
    private String brand;
    private String description;
    private int stock;
    private int soldCount;
    private double rating;
    private int reviewsCount;
    private List<String> promotions;
    private Map<String, String> specs;
    private boolean isActive;
    private String createdAt;
}