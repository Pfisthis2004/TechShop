package com.techmart.TechMart.service;

import com.techmart.TechMart.model.Product;
import com.techmart.TechMart.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepo;

    public List<Product> getAllProducts() {
        return productRepo.findAll(); // trả về List<Product>
    }
    public Product getIdProducts(String id) {
        return productRepo.findById(id).orElse(null);
    }
    public List<Product> getProductsByCategory(String categoryId) {
        return productRepo.findByCategoryId(categoryId);
    }

    public List<Product> getProductsByName(String name) {
        return productRepo.findByNameContainingIgnoreCase(name);
    }

    public Product createProduct(Product product) {
        return productRepo.insert(product);
    }

    public void deleteProductById(String id) {
        productRepo.deleteById(id);
    }

    public Product updateProduct(String id, Product product) {
        // Tìm sản phẩm cũ theo id
        Product existing = productRepo.findById(id).orElse(null);

        // Cập nhật các field cần thiết
        existing.setName(product.getName());
        existing.setSlug(product.getSlug());
        existing.setPrice(product.getPrice());
        existing.setOriginalPrice(product.getOriginalPrice());
        existing.setImage(product.getImage());
        existing.setImages(product.getImages());
        existing.setCategoryId(product.getCategoryId());
        existing.setBrand(product.getBrand());
        existing.setDescription(product.getDescription());
        existing.setStock(product.getStock());
        existing.setSoldCount(product.getSoldCount());
        existing.setRating(product.getRating());
        existing.setReviewsCount(product.getReviewsCount());
        existing.setPromotions(product.getPromotions());
        existing.setSpecs(product.getSpecs());
        existing.setActive(product.isActive());
        existing.setCreatedAt(product.getCreatedAt());

        // Lưu lại vào DB
        return productRepo.save(existing);
    }


}
