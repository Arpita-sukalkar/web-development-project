package com.yourorg.appname.dto.response;

import java.time.LocalDateTime;

public class LabTestResponseDto {

    private Long id;

    private String testCode;

    private String testName;

    private String category;

    private Long patientId;

    private String patientName;

    private String patientMrn;

    private Long doctorId;

    private String doctorName;

    private String priority;

    private LocalDateTime sampleCollectionTime;

    private String status;

    private String resultSummary;

    private String referenceRange;

    private String unit;

    private LocalDateTime completedAt;

    private LocalDateTime createdAt;

    public LabTestResponseDto() {
    }

    public LabTestResponseDto(Long id, String testCode, String testName, String category, Long patientId, String patientName, String patientMrn, Long doctorId, String doctorName, String priority, LocalDateTime sampleCollectionTime, String status, String resultSummary, String referenceRange, String unit, LocalDateTime completedAt, LocalDateTime createdAt) {
        this.id = id;
        this.testCode = testCode;
        this.testName = testName;
        this.category = category;
        this.patientId = patientId;
        this.patientName = patientName;
        this.patientMrn = patientMrn;
        this.doctorId = doctorId;
        this.doctorName = doctorName;
        this.priority = priority;
        this.sampleCollectionTime = sampleCollectionTime;
        this.status = status;
        this.resultSummary = resultSummary;
        this.referenceRange = referenceRange;
        this.unit = unit;
        this.completedAt = completedAt;
        this.createdAt = createdAt;
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

    public Long getDoctorId() {
        return this.doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public String getDoctorName() {
        return this.doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
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

    public static LabTestResponseDtoBuilder builder() {
        return new LabTestResponseDtoBuilder();
    }

    public static class LabTestResponseDtoBuilder {
        private Long id;
        private String testCode;
        private String testName;
        private String category;
        private Long patientId;
        private String patientName;
        private String patientMrn;
        private Long doctorId;
        private String doctorName;
        private String priority;
        private LocalDateTime sampleCollectionTime;
        private String status;
        private String resultSummary;
        private String referenceRange;
        private String unit;
        private LocalDateTime completedAt;
        private LocalDateTime createdAt;

        public LabTestResponseDtoBuilder() {
        }

        public LabTestResponseDtoBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public LabTestResponseDtoBuilder testCode(String testCode) {
            this.testCode = testCode;
            return this;
        }

        public LabTestResponseDtoBuilder testName(String testName) {
            this.testName = testName;
            return this;
        }

        public LabTestResponseDtoBuilder category(String category) {
            this.category = category;
            return this;
        }

        public LabTestResponseDtoBuilder patientId(Long patientId) {
            this.patientId = patientId;
            return this;
        }

        public LabTestResponseDtoBuilder patientName(String patientName) {
            this.patientName = patientName;
            return this;
        }

        public LabTestResponseDtoBuilder patientMrn(String patientMrn) {
            this.patientMrn = patientMrn;
            return this;
        }

        public LabTestResponseDtoBuilder doctorId(Long doctorId) {
            this.doctorId = doctorId;
            return this;
        }

        public LabTestResponseDtoBuilder doctorName(String doctorName) {
            this.doctorName = doctorName;
            return this;
        }

        public LabTestResponseDtoBuilder priority(String priority) {
            this.priority = priority;
            return this;
        }

        public LabTestResponseDtoBuilder sampleCollectionTime(LocalDateTime sampleCollectionTime) {
            this.sampleCollectionTime = sampleCollectionTime;
            return this;
        }

        public LabTestResponseDtoBuilder status(String status) {
            this.status = status;
            return this;
        }

        public LabTestResponseDtoBuilder resultSummary(String resultSummary) {
            this.resultSummary = resultSummary;
            return this;
        }

        public LabTestResponseDtoBuilder referenceRange(String referenceRange) {
            this.referenceRange = referenceRange;
            return this;
        }

        public LabTestResponseDtoBuilder unit(String unit) {
            this.unit = unit;
            return this;
        }

        public LabTestResponseDtoBuilder completedAt(LocalDateTime completedAt) {
            this.completedAt = completedAt;
            return this;
        }

        public LabTestResponseDtoBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public LabTestResponseDto build() {
            return new LabTestResponseDto(this.id, this.testCode, this.testName, this.category, this.patientId, this.patientName, this.patientMrn, this.doctorId, this.doctorName, this.priority, this.sampleCollectionTime, this.status, this.resultSummary, this.referenceRange, this.unit, this.completedAt, this.createdAt);
        }
    }
}
