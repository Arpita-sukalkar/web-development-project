package com.yourorg.appname.dto.request;

import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class BillingRequestDto {

    private String invoiceNumber;

    @NotNull(message = "Patient ID is required")
    private Long patientId;

    private LocalDateTime invoiceDate;

    @NotNull(message = "Due date is required")
    private LocalDateTime dueDate;

    @NotNull(message = "Total amount is required")
    private BigDecimal totalAmount;

    private BigDecimal insuranceCovered;

    private BigDecimal patientPaid;

    private String paymentStatus;

    private String paymentMethod;

    private String notes;

    public BillingRequestDto() {
    }

    public BillingRequestDto(String invoiceNumber, Long patientId, LocalDateTime invoiceDate, LocalDateTime dueDate, BigDecimal totalAmount, BigDecimal insuranceCovered, BigDecimal patientPaid, String paymentStatus, String paymentMethod, String notes) {
        this.invoiceNumber = invoiceNumber;
        this.patientId = patientId;
        this.invoiceDate = invoiceDate;
        this.dueDate = dueDate;
        this.totalAmount = totalAmount;
        this.insuranceCovered = insuranceCovered;
        this.patientPaid = patientPaid;
        this.paymentStatus = paymentStatus;
        this.paymentMethod = paymentMethod;
        this.notes = notes;
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

    public static BillingRequestDtoBuilder builder() {
        return new BillingRequestDtoBuilder();
    }

    public static class BillingRequestDtoBuilder {
        private String invoiceNumber;
        private Long patientId;
        private LocalDateTime invoiceDate;
        private LocalDateTime dueDate;
        private BigDecimal totalAmount;
        private BigDecimal insuranceCovered;
        private BigDecimal patientPaid;
        private String paymentStatus;
        private String paymentMethod;
        private String notes;

        public BillingRequestDtoBuilder() {
        }

        public BillingRequestDtoBuilder invoiceNumber(String invoiceNumber) {
            this.invoiceNumber = invoiceNumber;
            return this;
        }

        public BillingRequestDtoBuilder patientId(Long patientId) {
            this.patientId = patientId;
            return this;
        }

        public BillingRequestDtoBuilder invoiceDate(LocalDateTime invoiceDate) {
            this.invoiceDate = invoiceDate;
            return this;
        }

        public BillingRequestDtoBuilder dueDate(LocalDateTime dueDate) {
            this.dueDate = dueDate;
            return this;
        }

        public BillingRequestDtoBuilder totalAmount(BigDecimal totalAmount) {
            this.totalAmount = totalAmount;
            return this;
        }

        public BillingRequestDtoBuilder insuranceCovered(BigDecimal insuranceCovered) {
            this.insuranceCovered = insuranceCovered;
            return this;
        }

        public BillingRequestDtoBuilder patientPaid(BigDecimal patientPaid) {
            this.patientPaid = patientPaid;
            return this;
        }

        public BillingRequestDtoBuilder paymentStatus(String paymentStatus) {
            this.paymentStatus = paymentStatus;
            return this;
        }

        public BillingRequestDtoBuilder paymentMethod(String paymentMethod) {
            this.paymentMethod = paymentMethod;
            return this;
        }

        public BillingRequestDtoBuilder notes(String notes) {
            this.notes = notes;
            return this;
        }

        public BillingRequestDto build() {
            return new BillingRequestDto(this.invoiceNumber, this.patientId, this.invoiceDate, this.dueDate, this.totalAmount, this.insuranceCovered, this.patientPaid, this.paymentStatus, this.paymentMethod, this.notes);
        }
    }
}
