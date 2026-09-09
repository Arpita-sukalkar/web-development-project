package com.yourorg.appname.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "appointment_number", nullable = false, unique = true, length = 50)
    private String appointmentNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @Column(nullable = false, length = 100)
    private String department;

    @Column(name = "appointment_date_time", nullable = false)
    private LocalDateTime appointmentDateTime;

    @Column(name = "appointment_type", nullable = false, length = 100)
    private String appointmentType;

    @Column(nullable = false, length = 50)
    private String status = "SCHEDULED";

    @Column(name = "duration_minutes", nullable = false)
    private Integer durationMinutes = 30;

    @Column(name = "reason_notes", length = 500)
    private String reasonNotes;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Appointment() {
    }

    public Appointment(Long id, String appointmentNumber, Patient patient, Doctor doctor, String department, LocalDateTime appointmentDateTime, String appointmentType, String status, Integer durationMinutes, String reasonNotes, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.appointmentNumber = appointmentNumber;
        this.patient = patient;
        this.doctor = doctor;
        this.department = department;
        this.appointmentDateTime = appointmentDateTime;
        this.appointmentType = appointmentType;
        this.status = status;
        this.durationMinutes = durationMinutes;
        this.reasonNotes = reasonNotes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
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

    public LocalDateTime getUpdatedAt() {
        return this.updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public static AppointmentBuilder builder() {
        return new AppointmentBuilder();
    }

    public static class AppointmentBuilder {
        private Long id;
        private String appointmentNumber;
        private Patient patient;
        private Doctor doctor;
        private String department;
        private LocalDateTime appointmentDateTime;
        private String appointmentType;
        private String status = "SCHEDULED";
        private Integer durationMinutes = 30;
        private String reasonNotes;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public AppointmentBuilder() {
        }

        public AppointmentBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public AppointmentBuilder appointmentNumber(String appointmentNumber) {
            this.appointmentNumber = appointmentNumber;
            return this;
        }

        public AppointmentBuilder patient(Patient patient) {
            this.patient = patient;
            return this;
        }

        public AppointmentBuilder doctor(Doctor doctor) {
            this.doctor = doctor;
            return this;
        }

        public AppointmentBuilder department(String department) {
            this.department = department;
            return this;
        }

        public AppointmentBuilder appointmentDateTime(LocalDateTime appointmentDateTime) {
            this.appointmentDateTime = appointmentDateTime;
            return this;
        }

        public AppointmentBuilder appointmentType(String appointmentType) {
            this.appointmentType = appointmentType;
            return this;
        }

        public AppointmentBuilder status(String status) {
            this.status = status;
            return this;
        }

        public AppointmentBuilder durationMinutes(Integer durationMinutes) {
            this.durationMinutes = durationMinutes;
            return this;
        }

        public AppointmentBuilder reasonNotes(String reasonNotes) {
            this.reasonNotes = reasonNotes;
            return this;
        }

        public AppointmentBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public AppointmentBuilder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public Appointment build() {
            return new Appointment(this.id, this.appointmentNumber, this.patient, this.doctor, this.department, this.appointmentDateTime, this.appointmentType, this.status, this.durationMinutes, this.reasonNotes, this.createdAt, this.updatedAt);
        }
    }
}
