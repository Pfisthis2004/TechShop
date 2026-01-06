package com.techmart.TechMart.repository;

import com.techmart.TechMart.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {
    List<Product> findByCategoryId(String categoryId);
    List<Product> findByNameContainingIgnoreCase(String name);
}
