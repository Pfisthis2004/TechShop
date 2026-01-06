package com.techmart.TechMart.service;

import com.techmart.TechMart.model.Category;
import com.techmart.TechMart.model.Product;
import com.techmart.TechMart.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepo;

    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }

    public Category getBySlug(String slug) {
        return categoryRepo.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    public Category createCategory(Category category) {
        return categoryRepo.insert(category);
    }
}
