package com.yourorg.appname.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class LabTestRequestDto {

    private String testCode;

    @NotBlank(message = "Test name is required")
    private String testName;

    @NotBlank(message = "Category is required")
    private String category;

    @NotNull(message = "Patient ID is required")
    private Long patientId;

    @NotNull(message = "Doctor ID is required")
    private Long doctorId;

    private String priority;

    private LocalDateTime sampleCollectionTime;

    private String status;

    private String resultSummary;

    private String referenceRange;

    private String unit;

    private LocalDateTime completedAt;

    public LabTestRequestDto() {
    }

    public LabTestRequestDto(String testCode, String testName, String category, Long patientId, Long doctorId, String priority, LocalDateTime sampleCollectionTime, String status, String resultSummary, String referenceRange, String unit, LocalDateTime completedAt) {
        this.testCode = testCode;
        this.testName = testName;
        this.category = category;
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.priority = priority;
        this.sampleCollectionTime = sampleCollectionTime;
        this.status = status;
        this.resultSummary = resultSummary;
        this.referenceRange = referenceRange;
        this.unit = unit;
        this.completedAt = completedAt;
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

    public Long getPatientId() {
        return this.patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public Long getDoctorId() {
        return this.doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
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

    public static LabTestRequestDtoBuilder builder() {
        return new LabTestRequestDtoBuilder();
    }

    public static class LabTestRequestDtoBuilder {
        private String testCode;
        private String testName;
        private String category;
        private Long patientId;
        private Long doctorId;
        private String priority;
        private LocalDateTime sampleCollectionTime;
        private String status;
        private String resultSummary;
        private String referenceRange;
        private String unit;
        private LocalDateTime completedAt;

        public LabTestRequestDtoBuilder() {
        }

        public LabTestRequestDtoBuilder testCode(String testCode) {
            this.testCode = testCode;
            return this;
        }

        public LabTestRequestDtoBuilder testName(String testName) {
            this.testName = testName;
            return this;
        }

        public LabTestRequestDtoBuilder category(String category) {
            this.category = category;
            return this;
        }

        public LabTestRequestDtoBuilder patientId(Long patientId) {
            this.patientId = patientId;
            return this;
        }

        public LabTestRequestDtoBuilder doctorId(Long doctorId) {
            this.doctorId = doctorId;
            return this;
        }

        public LabTestRequestDtoBuilder priority(String priority) {
            this.priority = priority;
            return this;
        }

        public LabTestRequestDtoBuilder sampleCollectionTime(LocalDateTime sampleCollectionTime) {
            this.sampleCollectionTime = sampleCollectionTime;
            return this;
        }

        public LabTestRequestDtoBuilder status(String status) {
            this.status = status;
            return this;
        }

        public LabTestRequestDtoBuilder resultSummary(String resultSummary) {
            this.resultSummary = resultSummary;
            return this;
        }

        public LabTestRequestDtoBuilder referenceRange(String referenceRange) {
            this.referenceRange = referenceRange;
            return this;
        }

        public LabTestRequestDtoBuilder unit(String unit) {
            this.unit = unit;
            return this;
        }

        public LabTestRequestDtoBuilder completedAt(LocalDateTime completedAt) {
            this.completedAt = completedAt;
            return this;
        }

        public LabTestRequestDto build() {
            return new LabTestRequestDto(this.testCode, this.testName, this.category, this.patientId, this.doctorId, this.priority, this.sampleCollectionTime, this.status, this.resultSummary, this.referenceRange, this.unit, this.completedAt);
        }
    }
}
