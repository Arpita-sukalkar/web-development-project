package com.yourorg.appname.dto.response;

import java.time.LocalDateTime;

public class AdmissionResponseDto {

    private Long id;

    private String admissionNumber;

    private Long patientId;

    private String patientName;

    private String patientMrn;

    private String ward;

    private String bedNumber;

    private LocalDateTime admissionDateTime;

    private LocalDateTime dischargeDateTime;

    private String triageAcuity;

    private Long attendingDoctorId;

    private String attendingDoctorName;

    private String status;

    private String diagnosis;

    private LocalDateTime createdAt;

    public AdmissionResponseDto() {
    }

    public AdmissionResponseDto(Long id, String admissionNumber, Long patientId, String patientName, String patientMrn, String ward, String bedNumber, LocalDateTime admissionDateTime, LocalDateTime dischargeDateTime, String triageAcuity, Long attendingDoctorId, String attendingDoctorName, String status, String diagnosis, LocalDateTime createdAt) {
        this.id = id;
        this.admissionNumber = admissionNumber;
        this.patientId = patientId;
        this.patientName = patientName;
        this.patientMrn = patientMrn;
        this.ward = ward;
        this.bedNumber = bedNumber;
        this.admissionDateTime = admissionDateTime;
        this.dischargeDateTime = dischargeDateTime;
        this.triageAcuity = triageAcuity;
        this.attendingDoctorId = attendingDoctorId;
        this.attendingDoctorName = attendingDoctorName;
        this.status = status;
        this.diagnosis = diagnosis;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAdmissionNumber() {
        return this.admissionNumber;
    }

    public void setAdmissionNumber(String admissionNumber) {
        this.admissionNumber = admissionNumber;
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

    public String getWard() {
        return this.ward;
    }

    public void setWard(String ward) {
        this.ward = ward;
    }

    public String getBedNumber() {
        return this.bedNumber;
    }

    public void setBedNumber(String bedNumber) {
        this.bedNumber = bedNumber;
    }

    public LocalDateTime getAdmissionDateTime() {
        return this.admissionDateTime;
    }

    public void setAdmissionDateTime(LocalDateTime admissionDateTime) {
        this.admissionDateTime = admissionDateTime;
    }

    public LocalDateTime getDischargeDateTime() {
        return this.dischargeDateTime;
    }

    public void setDischargeDateTime(LocalDateTime dischargeDateTime) {
        this.dischargeDateTime = dischargeDateTime;
    }

    public String getTriageAcuity() {
        return this.triageAcuity;
    }

    public void setTriageAcuity(String triageAcuity) {
        this.triageAcuity = triageAcuity;
    }

    public Long getAttendingDoctorId() {
        return this.attendingDoctorId;
    }

    public void setAttendingDoctorId(Long attendingDoctorId) {
        this.attendingDoctorId = attendingDoctorId;
    }

    public String getAttendingDoctorName() {
        return this.attendingDoctorName;
    }

    public void setAttendingDoctorName(String attendingDoctorName) {
        this.attendingDoctorName = attendingDoctorName;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDiagnosis() {
        return this.diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public static AdmissionResponseDtoBuilder builder() {
        return new AdmissionResponseDtoBuilder();
    }

    public static class AdmissionResponseDtoBuilder {
        private Long id;
        private String admissionNumber;
        private Long patientId;
        private String patientName;
        private String patientMrn;
        private String ward;
        private String bedNumber;
        private LocalDateTime admissionDateTime;
        private LocalDateTime dischargeDateTime;
        private String triageAcuity;
        private Long attendingDoctorId;
        private String attendingDoctorName;
        private String status;
        private String diagnosis;
        private LocalDateTime createdAt;

        public AdmissionResponseDtoBuilder() {
        }

        public AdmissionResponseDtoBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public AdmissionResponseDtoBuilder admissionNumber(String admissionNumber) {
            this.admissionNumber = admissionNumber;
            return this;
        }

        public AdmissionResponseDtoBuilder patientId(Long patientId) {
            this.patientId = patientId;
            return this;
        }

        public AdmissionResponseDtoBuilder patientName(String patientName) {
            this.patientName = patientName;
            return this;
        }

        public AdmissionResponseDtoBuilder patientMrn(String patientMrn) {
            this.patientMrn = patientMrn;
            return this;
        }

        public AdmissionResponseDtoBuilder ward(String ward) {
            this.ward = ward;
            return this;
        }

        public AdmissionResponseDtoBuilder bedNumber(String bedNumber) {
            this.bedNumber = bedNumber;
            return this;
        }

        public AdmissionResponseDtoBuilder admissionDateTime(LocalDateTime admissionDateTime) {
            this.admissionDateTime = admissionDateTime;
            return this;
        }

        public AdmissionResponseDtoBuilder dischargeDateTime(LocalDateTime dischargeDateTime) {
            this.dischargeDateTime = dischargeDateTime;
            return this;
        }

        public AdmissionResponseDtoBuilder triageAcuity(String triageAcuity) {
            this.triageAcuity = triageAcuity;
            return this;
        }

        public AdmissionResponseDtoBuilder attendingDoctorId(Long attendingDoctorId) {
            this.attendingDoctorId = attendingDoctorId;
            return this;
        }

        public AdmissionResponseDtoBuilder attendingDoctorName(String attendingDoctorName) {
            this.attendingDoctorName = attendingDoctorName;
            return this;
        }

        public AdmissionResponseDtoBuilder status(String status) {
            this.status = status;
            return this;
        }

        public AdmissionResponseDtoBuilder diagnosis(String diagnosis) {
            this.diagnosis = diagnosis;
            return this;
        }

        public AdmissionResponseDtoBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public AdmissionResponseDto build() {
            return new AdmissionResponseDto(this.id, this.admissionNumber, this.patientId, this.patientName, this.patientMrn, this.ward, this.bedNumber, this.admissionDateTime, this.dischargeDateTime, this.triageAcuity, this.attendingDoctorId, this.attendingDoctorName, this.status, this.diagnosis, this.createdAt);
        }
    }
}
