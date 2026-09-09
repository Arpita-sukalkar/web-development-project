package com.yourorg.appname.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "billings")
public class Billing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "invoice_number", nullable = false, unique = true, length = 50)
    private String invoiceNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @Column(name = "invoice_date", nullable = false)
    private LocalDateTime invoiceDate;

    @Column(name = "due_date", nullable = false)
    private LocalDateTime dueDate;

    @Column(name = "total_amount", nullable = false, precision = 12, scale = 2)
    private BigDecimal totalAmount = BigDecimal.ZERO;

    @Column(name = "insurance_covered", nullable = false, precision = 12, scale = 2)
    private BigDecimal insuranceCovered = BigDecimal.ZERO;

    @Column(name = "patient_paid", nullable = false, precision = 12, scale = 2)
    private BigDecimal patientPaid = BigDecimal.ZERO;

    @Column(name = "balance_due", nullable = false, precision = 12, scale = 2)
    private BigDecimal balanceDue = BigDecimal.ZERO;

    @Column(name = "payment_status", nullable = false, length = 50)
    private String paymentStatus = "PENDING";

    @Column(name = "payment_method", length = 50)
    private String paymentMethod;

    @Column(length = 500)
    private String notes;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Billing() {
    }

    public Billing(Long id, String invoiceNumber, Patient patient, LocalDateTime invoiceDate, LocalDateTime dueDate, BigDecimal totalAmount, BigDecimal insuranceCovered, BigDecimal patientPaid, BigDecimal balanceDue, String paymentStatus, String paymentMethod, String notes, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.invoiceNumber = invoiceNumber;
        this.patient = patient;
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
        this.updatedAt = updatedAt;
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

    public Patient getPatient() {
        return this.patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
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

    public LocalDateTime getUpdatedAt() {
        return this.updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public static BillingBuilder builder() {
        return new BillingBuilder();
    }

    public static class BillingBuilder {
        private Long id;
        private String invoiceNumber;
        private Patient patient;
        private LocalDateTime invoiceDate;
        private LocalDateTime dueDate;
        private BigDecimal totalAmount = BigDecimal.ZERO;
        private BigDecimal insuranceCovered = BigDecimal.ZERO;
        private BigDecimal patientPaid = BigDecimal.ZERO;
        private BigDecimal balanceDue = BigDecimal.ZERO;
        private String paymentStatus = "PENDING";
        private String paymentMethod;
        private String notes;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public BillingBuilder() {
        }

        public BillingBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public BillingBuilder invoiceNumber(String invoiceNumber) {
            this.invoiceNumber = invoiceNumber;
            return this;
        }

        public BillingBuilder patient(Patient patient) {
            this.patient = patient;
            return this;
        }

        public BillingBuilder invoiceDate(LocalDateTime invoiceDate) {
            this.invoiceDate = invoiceDate;
            return this;
        }

        public BillingBuilder dueDate(LocalDateTime dueDate) {
            this.dueDate = dueDate;
            return this;
        }

        public BillingBuilder totalAmount(BigDecimal totalAmount) {
            this.totalAmount = totalAmount;
            return this;
        }

        public BillingBuilder insuranceCovered(BigDecimal insuranceCovered) {
            this.insuranceCovered = insuranceCovered;
            return this;
        }

        public BillingBuilder patientPaid(BigDecimal patientPaid) {
            this.patientPaid = patientPaid;
            return this;
        }

        public BillingBuilder balanceDue(BigDecimal balanceDue) {
            this.balanceDue = balanceDue;
            return this;
        }

        public BillingBuilder paymentStatus(String paymentStatus) {
            this.paymentStatus = paymentStatus;
            return this;
        }

        public BillingBuilder paymentMethod(String paymentMethod) {
            this.paymentMethod = paymentMethod;
            return this;
        }

        public BillingBuilder notes(String notes) {
            this.notes = notes;
            return this;
        }

        public BillingBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public BillingBuilder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public Billing build() {
            return new Billing(this.id, this.invoiceNumber, this.patient, this.invoiceDate, this.dueDate, this.totalAmount, this.insuranceCovered, this.patientPaid, this.balanceDue, this.paymentStatus, this.paymentMethod, this.notes, this.createdAt, this.updatedAt);
        }
    }
}
