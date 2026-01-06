package com.techmart.TechMart.repository;

import com.techmart.TechMart.model.Promotion;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PromotionRepository extends MongoRepository<Promotion, String> {
}
