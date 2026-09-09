package com.yourorg.appname.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "admissions")
public class Admission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "admission_number", nullable = false, unique = true, length = 50)
    private String admissionNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @Column(nullable = false, length = 100)
    private String ward;

    @Column(name = "bed_number", nullable = false, length = 50)
    private String bedNumber;

    @Column(name = "admission_date_time", nullable = false)
    private LocalDateTime admissionDateTime;

    @Column(name = "discharge_date_time")
    private LocalDateTime dischargeDateTime;

    @Column(name = "triage_acuity", nullable = false, length = 50)
    private String triageAcuity = "STANDARD";

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "attending_doctor_id")
    private Doctor attendingDoctor;

    @Column(nullable = false, length = 50)
    private String status = "ADMITTED";

    @Column(length = 255)
    private String diagnosis;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Admission() {
    }

    public Admission(Long id, String admissionNumber, Patient patient, String ward, String bedNumber, LocalDateTime admissionDateTime, LocalDateTime dischargeDateTime, String triageAcuity, Doctor attendingDoctor, String status, String diagnosis, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.admissionNumber = admissionNumber;
        this.patient = patient;
        this.ward = ward;
        this.bedNumber = bedNumber;
        this.admissionDateTime = admissionDateTime;
        this.dischargeDateTime = dischargeDateTime;
        this.triageAcuity = triageAcuity;
        this.attendingDoctor = attendingDoctor;
        this.status = status;
        this.diagnosis = diagnosis;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
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

    public Patient getPatient() {
        return this.patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
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

    public Doctor getAttendingDoctor() {
        return this.attendingDoctor;
    }

    public void setAttendingDoctor(Doctor attendingDoctor) {
        this.attendingDoctor = attendingDoctor;
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

    public LocalDateTime getUpdatedAt() {
        return this.updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public static AdmissionBuilder builder() {
        return new AdmissionBuilder();
    }

    public static class AdmissionBuilder {
        private Long id;
        private String admissionNumber;
        private Patient patient;
        private String ward;
        private String bedNumber;
        private LocalDateTime admissionDateTime;
        private LocalDateTime dischargeDateTime;
        private String triageAcuity = "STANDARD";
        private Doctor attendingDoctor;
        private String status = "ADMITTED";
        private String diagnosis;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public AdmissionBuilder() {
        }

        public AdmissionBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public AdmissionBuilder admissionNumber(String admissionNumber) {
            this.admissionNumber = admissionNumber;
            return this;
        }

        public AdmissionBuilder patient(Patient patient) {
            this.patient = patient;
            return this;
        }

        public AdmissionBuilder ward(String ward) {
            this.ward = ward;
            return this;
        }

        public AdmissionBuilder bedNumber(String bedNumber) {
            this.bedNumber = bedNumber;
            return this;
        }

        public AdmissionBuilder admissionDateTime(LocalDateTime admissionDateTime) {
            this.admissionDateTime = admissionDateTime;
            return this;
        }

        public AdmissionBuilder dischargeDateTime(LocalDateTime dischargeDateTime) {
            this.dischargeDateTime = dischargeDateTime;
            return this;
        }

        public AdmissionBuilder triageAcuity(String triageAcuity) {
            this.triageAcuity = triageAcuity;
            return this;
        }

        public AdmissionBuilder attendingDoctor(Doctor attendingDoctor) {
            this.attendingDoctor = attendingDoctor;
            return this;
        }

        public AdmissionBuilder status(String status) {
            this.status = status;
            return this;
        }

        public AdmissionBuilder diagnosis(String diagnosis) {
            this.diagnosis = diagnosis;
            return this;
        }

        public AdmissionBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public AdmissionBuilder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public Admission build() {
            return new Admission(this.id, this.admissionNumber, this.patient, this.ward, this.bedNumber, this.admissionDateTime, this.dischargeDateTime, this.triageAcuity, this.attendingDoctor, this.status, this.diagnosis, this.createdAt, this.updatedAt);
        }
    }
}
