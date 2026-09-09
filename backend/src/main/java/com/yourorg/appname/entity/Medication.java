package com.yourorg.appname.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "medications")
public class Medication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "drug_code", nullable = false, unique = true, length = 50)
    private String drugCode;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(name = "generic_name", nullable = false, length = 150)
    private String genericName;

    @Column(nullable = false, length = 100)
    private String category;

    @Column(name = "dosage_form", nullable = false, length = 50)
    private String dosageForm;

    @Column(nullable = false, length = 50)
    private String strength;

    @Column(name = "stock_quantity", nullable = false)
    private Integer stockQuantity = 0;

    @Column(name = "reorder_level", nullable = false)
    private Integer reorderLevel = 50;

    @Column(name = "unit_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal unitPrice = BigDecimal.ZERO;

    @Column(name = "batch_number", length = 50)
    private String batchNumber;

    @Column(name = "expiry_date", nullable = false)
    private LocalDate expiryDate;

    @Column(length = 100)
    private String manufacturer;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Medication() {
    }

    public Medication(Long id, String drugCode, String name, String genericName, String category, String dosageForm, String strength, Integer stockQuantity, Integer reorderLevel, BigDecimal unitPrice, String batchNumber, LocalDate expiryDate, String manufacturer, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.drugCode = drugCode;
        this.name = name;
        this.genericName = genericName;
        this.category = category;
        this.dosageForm = dosageForm;
        this.strength = strength;
        this.stockQuantity = stockQuantity;
        this.reorderLevel = reorderLevel;
        this.unitPrice = unitPrice;
        this.batchNumber = batchNumber;
        this.expiryDate = expiryDate;
        this.manufacturer = manufacturer;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDrugCode() {
        return this.drugCode;
    }

    public void setDrugCode(String drugCode) {
        this.drugCode = drugCode;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGenericName() {
        return this.genericName;
    }

    public void setGenericName(String genericName) {
        this.genericName = genericName;
    }

    public String getCategory() {
        return this.category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDosageForm() {
        return this.dosageForm;
    }

    public void setDosageForm(String dosageForm) {
        this.dosageForm = dosageForm;
    }

    public String getStrength() {
        return this.strength;
    }

    public void setStrength(String strength) {
        this.strength = strength;
    }

    public Integer getStockQuantity() {
        return this.stockQuantity;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public Integer getReorderLevel() {
        return this.reorderLevel;
    }

    public void setReorderLevel(Integer reorderLevel) {
        this.reorderLevel = reorderLevel;
    }

    public BigDecimal getUnitPrice() {
        return this.unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public String getBatchNumber() {
        return this.batchNumber;
    }

    public void setBatchNumber(String batchNumber) {
        this.batchNumber = batchNumber;
    }

    public LocalDate getExpiryDate() {
        return this.expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getManufacturer() {
        return this.manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return this.updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public static MedicationBuilder builder() {
        return new MedicationBuilder();
    }

    public static class MedicationBuilder {
        private Long id;
        private String drugCode;
        private String name;
        private String genericName;
        private String category;
        private String dosageForm;
        private String strength;
        private Integer stockQuantity = 0;
        private Integer reorderLevel = 50;
        private BigDecimal unitPrice = BigDecimal.ZERO;
        private String batchNumber;
        private LocalDate expiryDate;
        private String manufacturer;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public MedicationBuilder() {
        }

        public MedicationBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public MedicationBuilder drugCode(String drugCode) {
            this.drugCode = drugCode;
            return this;
        }

        public MedicationBuilder name(String name) {
            this.name = name;
            return this;
        }

        public MedicationBuilder genericName(String genericName) {
            this.genericName = genericName;
            return this;
        }

        public MedicationBuilder category(String category) {
            this.category = category;
            return this;
        }

        public MedicationBuilder dosageForm(String dosageForm) {
            this.dosageForm = dosageForm;
            return this;
        }

        public MedicationBuilder strength(String strength) {
            this.strength = strength;
            return this;
        }

        public MedicationBuilder stockQuantity(Integer stockQuantity) {
            this.stockQuantity = stockQuantity;
            return this;
        }

        public MedicationBuilder reorderLevel(Integer reorderLevel) {
            this.reorderLevel = reorderLevel;
            return this;
        }

        public MedicationBuilder unitPrice(BigDecimal unitPrice) {
            this.unitPrice = unitPrice;
            return this;
        }

        public MedicationBuilder batchNumber(String batchNumber) {
            this.batchNumber = batchNumber;
            return this;
        }

        public MedicationBuilder expiryDate(LocalDate expiryDate) {
            this.expiryDate = expiryDate;
            return this;
        }

        public MedicationBuilder manufacturer(String manufacturer) {
            this.manufacturer = manufacturer;
            return this;
        }

        public MedicationBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public MedicationBuilder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public Medication build() {
            return new Medication(this.id, this.drugCode, this.name, this.genericName, this.category, this.dosageForm, this.strength, this.stockQuantity, this.reorderLevel, this.unitPrice, this.batchNumber, this.expiryDate, this.manufacturer, this.createdAt, this.updatedAt);
        }
    }
}
