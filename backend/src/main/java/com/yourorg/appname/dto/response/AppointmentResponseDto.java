package com.yourorg.appname.dto.response;

import java.time.LocalDateTime;

public class AppointmentResponseDto {

    private Long id;

    private String appointmentNumber;

    private Long patientId;

    private String patientName;

    private String patientMrn;

    private String patientAvatarUrl;

    private Long doctorId;

    private String doctorName;

    private String department;

    private LocalDateTime appointmentDateTime;

    private String appointmentType;

    private String status;

    private Integer durationMinutes;

    private String reasonNotes;

    private LocalDateTime createdAt;

    public AppointmentResponseDto() {
    }

    public AppointmentResponseDto(Long id, String appointmentNumber, Long patientId, String patientName, String patientMrn, String patientAvatarUrl, Long doctorId, String doctorName, String department, LocalDateTime appointmentDateTime, String appointmentType, String status, Integer durationMinutes, String reasonNotes, LocalDateTime createdAt) {
        this.id = id;
        this.appointmentNumber = appointmentNumber;
        this.patientId = patientId;
        this.patientName = patientName;
        this.patientMrn = patientMrn;
        this.patientAvatarUrl = patientAvatarUrl;
        this.doctorId = doctorId;
        this.doctorName = doctorName;
        this.department = department;
        this.appointmentDateTime = appointmentDateTime;
        this.appointmentType = appointmentType;
        this.status = status;
        this.durationMinutes = durationMinutes;
        this.reasonNotes = reasonNotes;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAppointmentNumber() {
        return this.appointmentNumber;
    }

    public void setAppointmentNumber(String appointmentNumber) {
        this.appointmentNumber = appointmentNumber;
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

    public String getPatientAvatarUrl() {
        return this.patientAvatarUrl;
    }

    public void setPatientAvatarUrl(String patientAvatarUrl) {
        this.patientAvatarUrl = patientAvatarUrl;
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

    public String getDepartment() {
        return this.department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public LocalDateTime getAppointmentDateTime() {
        return this.appointmentDateTime;
    }

    public void setAppointmentDateTime(LocalDateTime appointmentDateTime) {
        this.appointmentDateTime = appointmentDateTime;
    }

    public String getAppointmentType() {
        return this.appointmentType;
    }

    public void setAppointmentType(String appointmentType) {
        this.appointmentType = appointmentType;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getDurationMinutes() {
        return this.durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public String getReasonNotes() {
        return this.reasonNotes;
    }

    public void setReasonNotes(String reasonNotes) {
        this.reasonNotes = reasonNotes;
    }

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public static AppointmentResponseDtoBuilder builder() {
        return new AppointmentResponseDtoBuilder();
    }

    public static class AppointmentResponseDtoBuilder {
        private Long id;
        private String appointmentNumber;
        private Long patientId;
        private String patientName;
        private String patientMrn;
        private String patientAvatarUrl;
        private Long doctorId;
        private String doctorName;
        private String department;
        private LocalDateTime appointmentDateTime;
        private String appointmentType;
        private String status;
        private Integer durationMinutes;
        private String reasonNotes;
        private LocalDateTime createdAt;

        public AppointmentResponseDtoBuilder() {
        }

        public AppointmentResponseDtoBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public AppointmentResponseDtoBuilder appointmentNumber(String appointmentNumber) {
            this.appointmentNumber = appointmentNumber;
            return this;
        }

        public AppointmentResponseDtoBuilder patientId(Long patientId) {
            this.patientId = patientId;
            return this;
        }

        public AppointmentResponseDtoBuilder patientName(String patientName) {
            this.patientName = patientName;
            return this;
        }

        public AppointmentResponseDtoBuilder patientMrn(String patientMrn) {
            this.patientMrn = patientMrn;
            return this;
        }

        public AppointmentResponseDtoBuilder patientAvatarUrl(String patientAvatarUrl) {
            this.patientAvatarUrl = patientAvatarUrl;
            return this;
        }

        public AppointmentResponseDtoBuilder doctorId(Long doctorId) {
            this.doctorId = doctorId;
            return this;
        }

        public AppointmentResponseDtoBuilder doctorName(String doctorName) {
            this.doctorName = doctorName;
            return this;
        }

        public AppointmentResponseDtoBuilder department(String department) {
            this.department = department;
            return this;
        }

        public AppointmentResponseDtoBuilder appointmentDateTime(LocalDateTime appointmentDateTime) {
            this.appointmentDateTime = appointmentDateTime;
            return this;
        }

        public AppointmentResponseDtoBuilder appointmentType(String appointmentType) {
            this.appointmentType = appointmentType;
            return this;
        }

        public AppointmentResponseDtoBuilder status(String status) {
            this.status = status;
            return this;
        }

        public AppointmentResponseDtoBuilder durationMinutes(Integer durationMinutes) {
            this.durationMinutes = durationMinutes;
            return this;
        }

        public AppointmentResponseDtoBuilder reasonNotes(String reasonNotes) {
            this.reasonNotes = reasonNotes;
            return this;
        }

        public AppointmentResponseDtoBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public AppointmentResponseDto build() {
            return new AppointmentResponseDto(this.id, this.appointmentNumber, this.patientId, this.patientName, this.patientMrn, this.patientAvatarUrl, this.doctorId, this.doctorName, this.department, this.appointmentDateTime, this.appointmentType, this.status, this.durationMinutes, this.reasonNotes, this.createdAt);
        }
    }
}
