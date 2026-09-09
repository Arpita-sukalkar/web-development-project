package com.yourorg.appname.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class AppointmentRequestDto {

    private String appointmentNumber;

    @NotNull(message = "Patient ID is required")
    private Long patientId;

    @NotNull(message = "Doctor ID is required")
    private Long doctorId;

    @NotBlank(message = "Department is required")
    private String department;

    @NotNull(message = "Appointment date/time is required")
    private LocalDateTime appointmentDateTime;

    @NotBlank(message = "Appointment type is required")
    private String appointmentType;

    private String status;

    private Integer durationMinutes;

    private String reasonNotes;

    public AppointmentRequestDto() {
    }

    public AppointmentRequestDto(String appointmentNumber, Long patientId, Long doctorId, String department, LocalDateTime appointmentDateTime, String appointmentType, String status, Integer durationMinutes, String reasonNotes) {
        this.appointmentNumber = appointmentNumber;
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.department = department;
        this.appointmentDateTime = appointmentDateTime;
        this.appointmentType = appointmentType;
        this.status = status;
        this.durationMinutes = durationMinutes;
        this.reasonNotes = reasonNotes;
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

    public Long getDoctorId() {
        return this.doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
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

    public static AppointmentRequestDtoBuilder builder() {
        return new AppointmentRequestDtoBuilder();
    }

    public static class AppointmentRequestDtoBuilder {
        private String appointmentNumber;
        private Long patientId;
        private Long doctorId;
        private String department;
        private LocalDateTime appointmentDateTime;
        private String appointmentType;
        private String status;
        private Integer durationMinutes;
        private String reasonNotes;

        public AppointmentRequestDtoBuilder() {
        }

        public AppointmentRequestDtoBuilder appointmentNumber(String appointmentNumber) {
            this.appointmentNumber = appointmentNumber;
            return this;
        }

        public AppointmentRequestDtoBuilder patientId(Long patientId) {
            this.patientId = patientId;
            return this;
        }

        public AppointmentRequestDtoBuilder doctorId(Long doctorId) {
            this.doctorId = doctorId;
            return this;
        }

        public AppointmentRequestDtoBuilder department(String department) {
            this.department = department;
            return this;
        }

        public AppointmentRequestDtoBuilder appointmentDateTime(LocalDateTime appointmentDateTime) {
            this.appointmentDateTime = appointmentDateTime;
            return this;
        }

        public AppointmentRequestDtoBuilder appointmentType(String appointmentType) {
            this.appointmentType = appointmentType;
            return this;
        }

        public AppointmentRequestDtoBuilder status(String status) {
            this.status = status;
            return this;
        }

        public AppointmentRequestDtoBuilder durationMinutes(Integer durationMinutes) {
            this.durationMinutes = durationMinutes;
            return this;
        }

        public AppointmentRequestDtoBuilder reasonNotes(String reasonNotes) {
            this.reasonNotes = reasonNotes;
            return this;
        }

        public AppointmentRequestDto build() {
            return new AppointmentRequestDto(this.appointmentNumber, this.patientId, this.doctorId, this.department, this.appointmentDateTime, this.appointmentType, this.status, this.durationMinutes, this.reasonNotes);
        }
    }
}
