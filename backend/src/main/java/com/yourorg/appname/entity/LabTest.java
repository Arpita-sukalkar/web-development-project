package com.yourorg.appname.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "lab_tests")
public class LabTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "test_code", nullable = false, unique = true, length = 50)
    private String testCode;

    @Column(name = "test_name", nullable = false, length = 150)
    private String testName;

    @Column(nullable = false, length = 100)
    private String category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @Column(nullable = false, length = 50)
    private String priority = "ROUTINE";

    @Column(name = "sample_collection_time")
    private LocalDateTime sampleCollectionTime;

    @Column(nullable = false, length = 50)
    private String status = "PENDING";

    @Column(name = "result_summary", columnDefinition = "TEXT")
    private String resultSummary;

    @Column(name = "reference_range", length = 255)
    private String referenceRange;

    @Column(length = 50)
    private String unit;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public LabTest() {
    }

    public LabTest(Long id, String testCode, String testName, String category, Patient patient, Doctor doctor, String priority, LocalDateTime sampleCollectionTime, String status, String resultSummary, String referenceRange, String unit, LocalDateTime completedAt, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.testCode = testCode;
        this.testName = testName;
        this.category = category;
        this.patient = patient;
        this.doctor = doctor;
        this.priority = priority;
        this.sampleCollectionTime = sampleCollectionTime;
        this.status = status;
        this.resultSummary = resultSummary;
        this.referenceRange = referenceRange;
        this.unit = unit;
        this.completedAt = completedAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTestCode() {
        return this.testCode;
    }

    public void setTestCode(String testCode) {
        this.testCode = testCode;
    }

    public String getTestName() {
        return this.testName;
    }

    public void setTestName(String testName) {
        this.testName = testName;
    }

    public String getCategory() {
        return this.category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Patient getPatient() {
        return this.patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Doctor getDoctor() {
        return this.doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public String getPriority() {
        return this.priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public LocalDateTime getSampleCollectionTime() {
        return this.sampleCollectionTime;
    }

    public void setSampleCollectionTime(LocalDateTime sampleCollectionTime) {
        this.sampleCollectionTime = sampleCollectionTime;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getResultSummary() {
        return this.resultSummary;
    }

    public void setResultSummary(String resultSummary) {
        this.resultSummary = resultSummary;
    }

    public String getReferenceRange() {
        return this.referenceRange;
    }

    public void setReferenceRange(String referenceRange) {
        this.referenceRange = referenceRange;
    }

    public String getUnit() {
        return this.unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public LocalDateTime getCompletedAt() {
        return this.completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
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

    public static LabTestBuilder builder() {
        return new LabTestBuilder();
    }

    public static class LabTestBuilder {
        private Long id;
        private String testCode;
        private String testName;
        private String category;
        private Patient patient;
        private Doctor doctor;
        private String priority = "ROUTINE";
        private LocalDateTime sampleCollectionTime;
        private String status = "PENDING";
        private String resultSummary;
        private String referenceRange;
        private String unit;
        private LocalDateTime completedAt;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public LabTestBuilder() {
        }

        public LabTestBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public LabTestBuilder testCode(String testCode) {
            this.testCode = testCode;
            return this;
        }

        public LabTestBuilder testName(String testName) {
            this.testName = testName;
            return this;
        }

        public LabTestBuilder category(String category) {
            this.category = category;
            return this;
        }

        public LabTestBuilder patient(Patient patient) {
            this.patient = patient;
            return this;
        }

        public LabTestBuilder doctor(Doctor doctor) {
            this.doctor = doctor;
            return this;
        }

        public LabTestBuilder priority(String priority) {
            this.priority = priority;
            return this;
        }

        public LabTestBuilder sampleCollectionTime(LocalDateTime sampleCollectionTime) {
            this.sampleCollectionTime = sampleCollectionTime;
            return this;
        }

        public LabTestBuilder status(String status) {
            this.status = status;
            return this;
        }

        public LabTestBuilder resultSummary(String resultSummary) {
            this.resultSummary = resultSummary;
            return this;
        }

        public LabTestBuilder referenceRange(String referenceRange) {
            this.referenceRange = referenceRange;
            return this;
        }

        public LabTestBuilder unit(String unit) {
            this.unit = unit;
            return this;
        }

        public LabTestBuilder completedAt(LocalDateTime completedAt) {
            this.completedAt = completedAt;
            return this;
        }

        public LabTestBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public LabTestBuilder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public LabTest build() {
            return new LabTest(this.id, this.testCode, this.testName, this.category, this.patient, this.doctor, this.priority, this.sampleCollectionTime, this.status, this.resultSummary, this.referenceRange, this.unit, this.completedAt, this.createdAt, this.updatedAt);
        }
    }
}
