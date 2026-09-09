package com.yourorg.appname.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class MedicationResponseDto {

    private Long id;

    private String drugCode;

    private String name;

    private String genericName;

    private String category;

    private String dosageForm;

    private String strength;

    private Integer stockQuantity;

    private Integer reorderLevel;

    private boolean lowStock;

    private BigDecimal unitPrice;

    private String batchNumber;

    private LocalDate expiryDate;

    private String manufacturer;

    private LocalDateTime createdAt;

    public MedicationResponseDto() {
    }

    public MedicationResponseDto(Long id, String drugCode, String name, String genericName, String category, String dosageForm, String strength, Integer stockQuantity, Integer reorderLevel, boolean lowStock, BigDecimal unitPrice, String batchNumber, LocalDate expiryDate, String manufacturer, LocalDateTime createdAt) {
        this.id = id;
        this.drugCode = drugCode;
        this.name = name;
        this.genericName = genericName;
        this.category = category;
        this.dosageForm = dosageForm;
        this.strength = strength;
        this.stockQuantity = stockQuantity;
        this.reorderLevel = reorderLevel;
        this.lowStock = lowStock;
        this.unitPrice = unitPrice;
        this.batchNumber = batchNumber;
        this.expiryDate = expiryDate;
        this.manufacturer = manufacturer;
        this.createdAt = createdAt;
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

    public boolean isLowStock() {
        return this.lowStock;
    }

    public boolean getLowStock() {
        return this.lowStock;
    }

    public void setLowStock(boolean lowStock) {
        this.lowStock = lowStock;
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

    public static MedicationResponseDtoBuilder builder() {
        return new MedicationResponseDtoBuilder();
    }

    public static class MedicationResponseDtoBuilder {
        private Long id;
        private String drugCode;
        private String name;
        private String genericName;
        private String category;
        private String dosageForm;
        private String strength;
        private Integer stockQuantity;
        private Integer reorderLevel;
        private boolean lowStock;
        private BigDecimal unitPrice;
        private String batchNumber;
        private LocalDate expiryDate;
        private String manufacturer;
        private LocalDateTime createdAt;

        public MedicationResponseDtoBuilder() {
        }

        public MedicationResponseDtoBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public MedicationResponseDtoBuilder drugCode(String drugCode) {
            this.drugCode = drugCode;
            return this;
        }

        public MedicationResponseDtoBuilder name(String name) {
            this.name = name;
            return this;
        }

        public MedicationResponseDtoBuilder genericName(String genericName) {
            this.genericName = genericName;
            return this;
        }

        public MedicationResponseDtoBuilder category(String category) {
            this.category = category;
            return this;
        }

        public MedicationResponseDtoBuilder dosageForm(String dosageForm) {
            this.dosageForm = dosageForm;
            return this;
        }

        public MedicationResponseDtoBuilder strength(String strength) {
            this.strength = strength;
            return this;
        }

        public MedicationResponseDtoBuilder stockQuantity(Integer stockQuantity) {
            this.stockQuantity = stockQuantity;
            return this;
        }

        public MedicationResponseDtoBuilder reorderLevel(Integer reorderLevel) {
            this.reorderLevel = reorderLevel;
            return this;
        }

        public MedicationResponseDtoBuilder lowStock(boolean lowStock) {
            this.lowStock = lowStock;
            return this;
        }

        public MedicationResponseDtoBuilder unitPrice(BigDecimal unitPrice) {
            this.unitPrice = unitPrice;
            return this;
        }

        public MedicationResponseDtoBuilder batchNumber(String batchNumber) {
            this.batchNumber = batchNumber;
            return this;
        }

        public MedicationResponseDtoBuilder expiryDate(LocalDate expiryDate) {
            this.expiryDate = expiryDate;
            return this;
        }

        public MedicationResponseDtoBuilder manufacturer(String manufacturer) {
            this.manufacturer = manufacturer;
            return this;
        }

        public MedicationResponseDtoBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public MedicationResponseDto build() {
            return new MedicationResponseDto(this.id, this.drugCode, this.name, this.genericName, this.category, this.dosageForm, this.strength, this.stockQuantity, this.reorderLevel, this.lowStock, this.unitPrice, this.batchNumber, this.expiryDate, this.manufacturer, this.createdAt);
        }
    }
}
