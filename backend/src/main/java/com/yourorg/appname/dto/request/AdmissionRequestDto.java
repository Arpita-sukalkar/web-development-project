package com.yourorg.appname.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class AdmissionRequestDto {

    private String admissionNumber;

    @NotNull(message = "Patient ID is required")
    private Long patientId;

    @NotBlank(message = "Ward is required")
    private String ward;

    @NotBlank(message = "Bed number is required")
    private String bedNumber;

    private LocalDateTime admissionDateTime;

    private LocalDateTime dischargeDateTime;

    private String triageAcuity;

    private Long attendingDoctorId;

    private String status;

    private String diagnosis;

    public AdmissionRequestDto() {
    }

    public AdmissionRequestDto(String admissionNumber, Long patientId, String ward, String bedNumber, LocalDateTime admissionDateTime, LocalDateTime dischargeDateTime, String triageAcuity, Long attendingDoctorId, String status, String diagnosis) {
        this.admissionNumber = admissionNumber;
        this.patientId = patientId;
        this.ward = ward;
        this.bedNumber = bedNumber;
        this.admissionDateTime = admissionDateTime;
        this.dischargeDateTime = dischargeDateTime;
        this.triageAcuity = triageAcuity;
        this.attendingDoctorId = attendingDoctorId;
        this.status = status;
        this.diagnosis = diagnosis;
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

    public static AdmissionRequestDtoBuilder builder() {
        return new AdmissionRequestDtoBuilder();
    }

    public static class AdmissionRequestDtoBuilder {
        private String admissionNumber;
        private Long patientId;
        private String ward;
        private String bedNumber;
        private LocalDateTime admissionDateTime;
        private LocalDateTime dischargeDateTime;
        private String triageAcuity;
        private Long attendingDoctorId;
        private String status;
        private String diagnosis;

        public AdmissionRequestDtoBuilder() {
        }

        public AdmissionRequestDtoBuilder admissionNumber(String admissionNumber) {
            this.admissionNumber = admissionNumber;
            return this;
        }

        public AdmissionRequestDtoBuilder patientId(Long patientId) {
            this.patientId = patientId;
            return this;
        }

        public AdmissionRequestDtoBuilder ward(String ward) {
            this.ward = ward;
            return this;
        }

        public AdmissionRequestDtoBuilder bedNumber(String bedNumber) {
            this.bedNumber = bedNumber;
            return this;
        }

        public AdmissionRequestDtoBuilder admissionDateTime(LocalDateTime admissionDateTime) {
            this.admissionDateTime = admissionDateTime;
            return this;
        }

        public AdmissionRequestDtoBuilder dischargeDateTime(LocalDateTime dischargeDateTime) {
            this.dischargeDateTime = dischargeDateTime;
            return this;
        }

        public AdmissionRequestDtoBuilder triageAcuity(String triageAcuity) {
            this.triageAcuity = triageAcuity;
            return this;
        }

        public AdmissionRequestDtoBuilder attendingDoctorId(Long attendingDoctorId) {
            this.attendingDoctorId = attendingDoctorId;
            return this;
        }

        public AdmissionRequestDtoBuilder status(String status) {
            this.status = status;
            return this;
        }

        public AdmissionRequestDtoBuilder diagnosis(String diagnosis) {
            this.diagnosis = diagnosis;
            return this;
        }

        public AdmissionRequestDto build() {
            return new AdmissionRequestDto(this.admissionNumber, this.patientId, this.ward, this.bedNumber, this.admissionDateTime, this.dischargeDateTime, this.triageAcuity, this.attendingDoctorId, this.status, this.diagnosis);
        }
    }
}
