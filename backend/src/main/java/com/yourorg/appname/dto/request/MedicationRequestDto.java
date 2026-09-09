package com.yourorg.appname.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

public class MedicationRequestDto {

    @NotBlank(message = "Drug code is required")
    private String drugCode;

    @NotBlank(message = "Medication name is required")
    private String name;

    @NotBlank(message = "Generic name is required")
    private String genericName;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Dosage form is required")
    private String dosageForm;

    @NotBlank(message = "Strength is required")
    private String strength;

    private Integer stockQuantity;

    private Integer reorderLevel;

    private BigDecimal unitPrice;

    private String batchNumber;

    @NotNull(message = "Expiry date is required")
    private LocalDate expiryDate;

    private String manufacturer;

    public MedicationRequestDto() {
    }

    public MedicationRequestDto(String drugCode, String name, String genericName, String category, String dosageForm, String strength, Integer stockQuantity, Integer reorderLevel, BigDecimal unitPrice, String batchNumber, LocalDate expiryDate, String manufacturer) {
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

    public static MedicationRequestDtoBuilder builder() {
        return new MedicationRequestDtoBuilder();
    }

    public static class MedicationRequestDtoBuilder {
        private String drugCode;
        private String name;
        private String genericName;
        private String category;
        private String dosageForm;
        private String strength;
        private Integer stockQuantity;
        private Integer reorderLevel;
        private BigDecimal unitPrice;
        private String batchNumber;
        private LocalDate expiryDate;
        private String manufacturer;

        public MedicationRequestDtoBuilder() {
        }

        public MedicationRequestDtoBuilder drugCode(String drugCode) {
            this.drugCode = drugCode;
            return this;
        }

        public MedicationRequestDtoBuilder name(String name) {
            this.name = name;
            return this;
        }

        public MedicationRequestDtoBuilder genericName(String genericName) {
            this.genericName = genericName;
            return this;
        }

        public MedicationRequestDtoBuilder category(String category) {
            this.category = category;
            return this;
        }

        public MedicationRequestDtoBuilder dosageForm(String dosageForm) {
            this.dosageForm = dosageForm;
            return this;
        }

        public MedicationRequestDtoBuilder strength(String strength) {
            this.strength = strength;
            return this;
        }

        public MedicationRequestDtoBuilder stockQuantity(Integer stockQuantity) {
            this.stockQuantity = stockQuantity;
            return this;
        }

        public MedicationRequestDtoBuilder reorderLevel(Integer reorderLevel) {
            this.reorderLevel = reorderLevel;
            return this;
        }

        public MedicationRequestDtoBuilder unitPrice(BigDecimal unitPrice) {
            this.unitPrice = unitPrice;
            return this;
        }

        public MedicationRequestDtoBuilder batchNumber(String batchNumber) {
            this.batchNumber = batchNumber;
            return this;
        }

        public MedicationRequestDtoBuilder expiryDate(LocalDate expiryDate) {
            this.expiryDate = expiryDate;
            return this;
        }

        public MedicationRequestDtoBuilder manufacturer(String manufacturer) {
            this.manufacturer = manufacturer;
            return this;
        }

        public MedicationRequestDto build() {
            return new MedicationRequestDto(this.drugCode, this.name, this.genericName, this.category, this.dosageForm, this.strength, this.stockQuantity, this.reorderLevel, this.unitPrice, this.batchNumber, this.expiryDate, this.manufacturer);
        }
    }
}
