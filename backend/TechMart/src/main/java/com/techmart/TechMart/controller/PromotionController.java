package com.techmart.TechMart.controller;

import com.techmart.TechMart.model.Promotion;
import com.techmart.TechMart.repository.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/v1/promotions")
public class PromotionController {
    private final PromotionRepository promoRepo;
    public PromotionController(PromotionRepository promoRepo) {
        this.promoRepo = promoRepo;
    }
    @GetMapping
    public List<Promotion> getAllPromotions() {
    return promoRepo.findAll();
  }
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping
    public Promotion addPromotion(@RequestBody Promotion promotion) {
        Promotion saved = promoRepo.save(promotion);
        messagingTemplate.convertAndSend("/topic/promotions", saved);
        return saved;
    }

}
