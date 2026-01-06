package com.techmart.TechMart.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Data
@Document(collection = "promotions")
public class Promotion {
    @Id
    private String id;
    private String name;
    private String code;
    private String discountType;
    private int discountValue;
    private int minOrderValue;
    private String startDate;
    private String endDate;
    private int usageLimit;
    private int usedCount;
    private boolean isActive;
}
