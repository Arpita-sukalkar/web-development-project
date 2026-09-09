package com.yourorg.appname.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class BillingResponseDto {

    private Long id;

    private String invoiceNumber;

    private Long patientId;

    private String patientName;

    private String patientMrn;

    private LocalDateTime invoiceDate;

    private LocalDateTime dueDate;

    private BigDecimal totalAmount;

    private BigDecimal insuranceCovered;

    private BigDecimal patientPaid;

    private BigDecimal balanceDue;

    private String paymentStatus;

    private String paymentMethod;

    private String notes;

    private LocalDateTime createdAt;

    public BillingResponseDto() {
    }

    public BillingResponseDto(Long id, String invoiceNumber, Long patientId, String patientName, String patientMrn, LocalDateTime invoiceDate, LocalDateTime dueDate, BigDecimal totalAmount, BigDecimal insuranceCovered, BigDecimal patientPaid, BigDecimal balanceDue, String paymentStatus, String paymentMethod, String notes, LocalDateTime createdAt) {
        this.id = id;
        this.invoiceNumber = invoiceNumber;
        this.patientId = patientId;
        this.patientName = patientName;
        this.patientMrn = patientMrn;
        this.invoiceDate = invoiceDate;
        this.dueDate = dueDate;
        this.totalAmount = totalAmount;
        this.insuranceCovered = insuranceCovered;
        this.patientPaid = patientPaid;
        this.balanceDue = balanceDue;
        this.paymentStatus = paymentStatus;
        this.paymentMethod = paymentMethod;
        this.notes = notes;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInvoiceNumber() {
        return this.invoiceNumber;
    }

    public void setInvoiceNumber(String invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
    }

    public Long getPatientId() {
        return this.patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public String getPatientName() {
        return this.patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public String getPatientMrn() {
        return this.patientMrn;
    }

    public void setPatientMrn(String patientMrn) {
        this.patientMrn = patientMrn;
    }

    public LocalDateTime getInvoiceDate() {
        return this.invoiceDate;
    }

    public void setInvoiceDate(LocalDateTime invoiceDate) {
        this.invoiceDate = invoiceDate;
    }

    public LocalDateTime getDueDate() {
        return this.dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public BigDecimal getTotalAmount() {
        return this.totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public BigDecimal getInsuranceCovered() {
        return this.insuranceCovered;
    }

    public void setInsuranceCovered(BigDecimal insuranceCovered) {
        this.insuranceCovered = insuranceCovered;
    }

    public BigDecimal getPatientPaid() {
        return this.patientPaid;
    }

    public void setPatientPaid(BigDecimal patientPaid) {
        this.patientPaid = patientPaid;
    }

    public BigDecimal getBalanceDue() {
        return this.balanceDue;
    }

    public void setBalanceDue(BigDecimal balanceDue) {
        this.balanceDue = balanceDue;
    }

    public String getPaymentStatus() {
        return this.paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getPaymentMethod() {
        return this.paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getNotes() {
        return this.notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public static BillingResponseDtoBuilder builder() {
        return new BillingResponseDtoBuilder();
    }

    public static class BillingResponseDtoBuilder {
        private Long id;
        private String invoiceNumber;
        private Long patientId;
        private String patientName;
        private String patientMrn;
        private LocalDateTime invoiceDate;
        private LocalDateTime dueDate;
        private BigDecimal totalAmount;
        private BigDecimal insuranceCovered;
        private BigDecimal patientPaid;
        private BigDecimal balanceDue;
        private String paymentStatus;
        private String paymentMethod;
        private String notes;
        private LocalDateTime createdAt;

        public BillingResponseDtoBuilder() {
        }

        public BillingResponseDtoBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public BillingResponseDtoBuilder invoiceNumber(String invoiceNumber) {
            this.invoiceNumber = invoiceNumber;
            return this;
        }

        public BillingResponseDtoBuilder patientId(Long patientId) {
            this.patientId = patientId;
            return this;
        }

        public BillingResponseDtoBuilder patientName(String patientName) {
            this.patientName = patientName;
            return this;
        }

        public BillingResponseDtoBuilder patientMrn(String patientMrn) {
            this.patientMrn = patientMrn;
            return this;
        }

        public BillingResponseDtoBuilder invoiceDate(LocalDateTime invoiceDate) {
            this.invoiceDate = invoiceDate;
            return this;
        }

        public BillingResponseDtoBuilder dueDate(LocalDateTime dueDate) {
            this.dueDate = dueDate;
            return this;
        }

        public BillingResponseDtoBuilder totalAmount(BigDecimal totalAmount) {
            this.totalAmount = totalAmount;
            return this;
        }

        public BillingResponseDtoBuilder insuranceCovered(BigDecimal insuranceCovered) {
            this.insuranceCovered = insuranceCovered;
            return this;
        }

        public BillingResponseDtoBuilder patientPaid(BigDecimal patientPaid) {
            this.patientPaid = patientPaid;
            return this;
        }

        public BillingResponseDtoBuilder balanceDue(BigDecimal balanceDue) {
            this.balanceDue = balanceDue;
            return this;
        }

        public BillingResponseDtoBuilder paymentStatus(String paymentStatus) {
            this.paymentStatus = paymentStatus;
            return this;
        }

        public BillingResponseDtoBuilder paymentMethod(String paymentMethod) {
            this.paymentMethod = paymentMethod;
            return this;
        }

        public BillingResponseDtoBuilder notes(String notes) {
            this.notes = notes;
            return this;
        }

        public BillingResponseDtoBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public BillingResponseDto build() {
            return new BillingResponseDto(this.id, this.invoiceNumber, this.patientId, this.patientName, this.patientMrn, this.invoiceDate, this.dueDate, this.totalAmount, this.insuranceCovered, this.patientPaid, this.balanceDue, this.paymentStatus, this.paymentMethod, this.notes, this.createdAt);
        }
    }
}
