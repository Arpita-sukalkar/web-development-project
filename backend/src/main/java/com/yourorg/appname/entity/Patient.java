package com.yourorg.appname.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "patients")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String mrn;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(name = "national_id", nullable = false, length = 50)
    private String nationalId;

    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @Column(nullable = false, length = 20)
    private String gender;

    @Column(name = "blood_group", nullable = false, length = 10)
    private String bloodGroup;

    @Column(name = "contact_number", nullable = false, length = 50)
    private String contactNumber;

    @Column(name = "emergency_contact_name", length = 100)
    private String emergencyContactName;

    @Column(name = "emergency_contact_phone", length = 50)
    private String emergencyContactPhone;

    @Column(name = "residential_address", length = 255)
    private String residentialAddress;

    @Column(name = "insurance_carrier", length = 100)
    private String insuranceCarrier;

    @Column(name = "policy_id", length = 100)
    private String policyId;

    @Column(nullable = false, length = 100)
    private String department;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_doctor_id")
    private Doctor assignedDoctor;

    @Column(name = "care_status", nullable = false, length = 50)
    private String careStatus = "INPATIENT";

    @Column(name = "admission_date", nullable = false)
    private LocalDateTime admissionDate;

    @Column(name = "discharge_date")
    private LocalDateTime dischargeDate;

    @Column(name = "bed_number", length = 50)
    private String bedNumber;

    @Column(name = "triage_notes", columnDefinition = "NVARCHAR(MAX)")
    private String triageNotes;

    @Column(name = "avatar_url", length = 500)
    private String avatarUrl;

    @Column(name = "is_active", nullable = false)
    private boolean active = true;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Patient() {
    }

    public Patient(Long id, String mrn, String fullName, String nationalId, LocalDate dateOfBirth, String gender, String bloodGroup, String contactNumber, String emergencyContactName, String emergencyContactPhone, String residentialAddress, String insuranceCarrier, String policyId, String department, Doctor assignedDoctor, String careStatus, LocalDateTime admissionDate, LocalDateTime dischargeDate, String bedNumber, String triageNotes, String avatarUrl, boolean active, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.mrn = mrn;
        this.fullName = fullName;
        this.nationalId = nationalId;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.bloodGroup = bloodGroup;
        this.contactNumber = contactNumber;
        this.emergencyContactName = emergencyContactName;
        this.emergencyContactPhone = emergencyContactPhone;
        this.residentialAddress = residentialAddress;
        this.insuranceCarrier = insuranceCarrier;
        this.policyId = policyId;
        this.department = department;
        this.assignedDoctor = assignedDoctor;
        this.careStatus = careStatus;
        this.admissionDate = admissionDate;
        this.dischargeDate = dischargeDate;
        this.bedNumber = bedNumber;
        this.triageNotes = triageNotes;
        this.avatarUrl = avatarUrl;
        this.active = active;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMrn() {
        return this.mrn;
    }

    public void setMrn(String mrn) {
        this.mrn = mrn;
    }

    public String getFullName() {
        return this.fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getNationalId() {
        return this.nationalId;
    }

    public void setNationalId(String nationalId) {
        this.nationalId = nationalId;
    }

    public LocalDate getDateOfBirth() {
        return this.dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return this.gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getBloodGroup() {
        return this.bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public String getContactNumber() {
        return this.contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getEmergencyContactName() {
        return this.emergencyContactName;
    }

    public void setEmergencyContactName(String emergencyContactName) {
        this.emergencyContactName = emergencyContactName;
    }

    public String getEmergencyContactPhone() {
        return this.emergencyContactPhone;
    }

    public void setEmergencyContactPhone(String emergencyContactPhone) {
        this.emergencyContactPhone = emergencyContactPhone;
    }

    public String getResidentialAddress() {
        return this.residentialAddress;
    }

    public void setResidentialAddress(String residentialAddress) {
        this.residentialAddress = residentialAddress;
    }

    public String getInsuranceCarrier() {
        return this.insuranceCarrier;
    }

    public void setInsuranceCarrier(String insuranceCarrier) {
        this.insuranceCarrier = insuranceCarrier;
    }

    public String getPolicyId() {
        return this.policyId;
    }

    public void setPolicyId(String policyId) {
        this.policyId = policyId;
    }

    public String getDepartment() {
        return this.department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Doctor getAssignedDoctor() {
        return this.assignedDoctor;
    }

    public void setAssignedDoctor(Doctor assignedDoctor) {
        this.assignedDoctor = assignedDoctor;
    }

    public String getCareStatus() {
        return this.careStatus;
    }

    public void setCareStatus(String careStatus) {
        this.careStatus = careStatus;
    }

    public LocalDateTime getAdmissionDate() {
        return this.admissionDate;
    }

    public void setAdmissionDate(LocalDateTime admissionDate) {
        this.admissionDate = admissionDate;
    }

    public LocalDateTime getDischargeDate() {
        return this.dischargeDate;
    }

    public void setDischargeDate(LocalDateTime dischargeDate) {
        this.dischargeDate = dischargeDate;
    }

    public String getBedNumber() {
        return this.bedNumber;
    }

    public void setBedNumber(String bedNumber) {
        this.bedNumber = bedNumber;
    }

    public String getTriageNotes() {
        return this.triageNotes;
    }

    public void setTriageNotes(String triageNotes) {
        this.triageNotes = triageNotes;
    }

    public String getAvatarUrl() {
        return this.avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public boolean isActive() {
        return this.active;
    }

    public boolean getActive() {
        return this.active;
    }

    public void setActive(boolean active) {
        this.active = active;
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

    public static PatientBuilder builder() {
        return new PatientBuilder();
    }

    public static class PatientBuilder {
        private Long id;
        private String mrn;
        private String fullName;
        private String nationalId;
        private LocalDate dateOfBirth;
        private String gender;
        private String bloodGroup;
        private String contactNumber;
        private String emergencyContactName;
        private String emergencyContactPhone;
        private String residentialAddress;
        private String insuranceCarrier;
        private String policyId;
        private String department;
        private Doctor assignedDoctor;
        private String careStatus = "INPATIENT";
        private LocalDateTime admissionDate;
        private LocalDateTime dischargeDate;
        private String bedNumber;
        private String triageNotes;
        private String avatarUrl;
        private boolean active = true;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public PatientBuilder() {
        }

        public PatientBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public PatientBuilder mrn(String mrn) {
            this.mrn = mrn;
            return this;
        }

        public PatientBuilder fullName(String fullName) {
            this.fullName = fullName;
            return this;
        }

        public PatientBuilder nationalId(String nationalId) {
            this.nationalId = nationalId;
            return this;
        }

        public PatientBuilder dateOfBirth(LocalDate dateOfBirth) {
            this.dateOfBirth = dateOfBirth;
            return this;
        }

        public PatientBuilder gender(String gender) {
            this.gender = gender;
            return this;
        }

        public PatientBuilder bloodGroup(String bloodGroup) {
            this.bloodGroup = bloodGroup;
            return this;
        }

        public PatientBuilder contactNumber(String contactNumber) {
            this.contactNumber = contactNumber;
            return this;
        }

        public PatientBuilder emergencyContactName(String emergencyContactName) {
            this.emergencyContactName = emergencyContactName;
            return this;
        }

        public PatientBuilder emergencyContactPhone(String emergencyContactPhone) {
            this.emergencyContactPhone = emergencyContactPhone;
            return this;
        }

        public PatientBuilder residentialAddress(String residentialAddress) {
            this.residentialAddress = residentialAddress;
            return this;
        }

        public PatientBuilder insuranceCarrier(String insuranceCarrier) {
            this.insuranceCarrier = insuranceCarrier;
            return this;
        }

        public PatientBuilder policyId(String policyId) {
            this.policyId = policyId;
            return this;
        }

        public PatientBuilder department(String department) {
            this.department = department;
            return this;
        }

        public PatientBuilder assignedDoctor(Doctor assignedDoctor) {
            this.assignedDoctor = assignedDoctor;
            return this;
        }

        public PatientBuilder careStatus(String careStatus) {
            this.careStatus = careStatus;
            return this;
        }

        public PatientBuilder admissionDate(LocalDateTime admissionDate) {
            this.admissionDate = admissionDate;
            return this;
        }

        public PatientBuilder dischargeDate(LocalDateTime dischargeDate) {
            this.dischargeDate = dischargeDate;
            return this;
        }

        public PatientBuilder bedNumber(String bedNumber) {
            this.bedNumber = bedNumber;
            return this;
        }

        public PatientBuilder triageNotes(String triageNotes) {
            this.triageNotes = triageNotes;
            return this;
        }

        public PatientBuilder avatarUrl(String avatarUrl) {
            this.avatarUrl = avatarUrl;
            return this;
        }

        public PatientBuilder active(boolean active) {
            this.active = active;
            return this;
        }

        public PatientBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public PatientBuilder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public Patient build() {
            return new Patient(this.id, this.mrn, this.fullName, this.nationalId, this.dateOfBirth, this.gender, this.bloodGroup, this.contactNumber, this.emergencyContactName, this.emergencyContactPhone, this.residentialAddress, this.insuranceCarrier, this.policyId, this.department, this.assignedDoctor, this.careStatus, this.admissionDate, this.dischargeDate, this.bedNumber, this.triageNotes, this.avatarUrl, this.active, this.createdAt, this.updatedAt);
        }
    }
}
