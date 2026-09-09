package com.yourorg.appname.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class PatientResponseDto {

    private Long id;

    private String mrn;

    private String fullName;

    private String nationalId;

    private LocalDate dateOfBirth;

    private Integer age;

    private String gender;

    private String bloodGroup;

    private String contactNumber;

    private String emergencyContactName;

    private String emergencyContactPhone;

    private String residentialAddress;

    private String insuranceCarrier;

    private String policyId;

    private String department;

    private Long assignedDoctorId;

    private String assignedDoctorName;

    private String careStatus;

    private LocalDateTime admissionDate;

    private LocalDateTime dischargeDate;

    private String bedNumber;

    private String triageNotes;

    private String avatarUrl;

    private boolean active;

    private LocalDateTime createdAt;

    public PatientResponseDto() {
    }

    public PatientResponseDto(Long id, String mrn, String fullName, String nationalId, LocalDate dateOfBirth, Integer age, String gender, String bloodGroup, String contactNumber, String emergencyContactName, String emergencyContactPhone, String residentialAddress, String insuranceCarrier, String policyId, String department, Long assignedDoctorId, String assignedDoctorName, String careStatus, LocalDateTime admissionDate, LocalDateTime dischargeDate, String bedNumber, String triageNotes, String avatarUrl, boolean active, LocalDateTime createdAt) {
        this.id = id;
        this.mrn = mrn;
        this.fullName = fullName;
        this.nationalId = nationalId;
        this.dateOfBirth = dateOfBirth;
        this.age = age;
        this.gender = gender;
        this.bloodGroup = bloodGroup;
        this.contactNumber = contactNumber;
        this.emergencyContactName = emergencyContactName;
        this.emergencyContactPhone = emergencyContactPhone;
        this.residentialAddress = residentialAddress;
        this.insuranceCarrier = insuranceCarrier;
        this.policyId = policyId;
        this.department = department;
        this.assignedDoctorId = assignedDoctorId;
        this.assignedDoctorName = assignedDoctorName;
        this.careStatus = careStatus;
        this.admissionDate = admissionDate;
        this.dischargeDate = dischargeDate;
        this.bedNumber = bedNumber;
        this.triageNotes = triageNotes;
        this.avatarUrl = avatarUrl;
        this.active = active;
        this.createdAt = createdAt;
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

    public Integer getAge() {
        return this.age;
    }

    public void setAge(Integer age) {
        this.age = age;
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

    public Long getAssignedDoctorId() {
        return this.assignedDoctorId;
    }

    public void setAssignedDoctorId(Long assignedDoctorId) {
        this.assignedDoctorId = assignedDoctorId;
    }

    public String getAssignedDoctorName() {
        return this.assignedDoctorName;
    }

    public void setAssignedDoctorName(String assignedDoctorName) {
        this.assignedDoctorName = assignedDoctorName;
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

    public static PatientResponseDtoBuilder builder() {
        return new PatientResponseDtoBuilder();
    }

    public static class PatientResponseDtoBuilder {
        private Long id;
        private String mrn;
        private String fullName;
        private String nationalId;
        private LocalDate dateOfBirth;
        private Integer age;
        private String gender;
        private String bloodGroup;
        private String contactNumber;
        private String emergencyContactName;
        private String emergencyContactPhone;
        private String residentialAddress;
        private String insuranceCarrier;
        private String policyId;
        private String department;
        private Long assignedDoctorId;
        private String assignedDoctorName;
        private String careStatus;
        private LocalDateTime admissionDate;
        private LocalDateTime dischargeDate;
        private String bedNumber;
        private String triageNotes;
        private String avatarUrl;
        private boolean active;
        private LocalDateTime createdAt;

        public PatientResponseDtoBuilder() {
        }

        public PatientResponseDtoBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public PatientResponseDtoBuilder mrn(String mrn) {
            this.mrn = mrn;
            return this;
        }

        public PatientResponseDtoBuilder fullName(String fullName) {
            this.fullName = fullName;
            return this;
        }

        public PatientResponseDtoBuilder nationalId(String nationalId) {
            this.nationalId = nationalId;
            return this;
        }

        public PatientResponseDtoBuilder dateOfBirth(LocalDate dateOfBirth) {
            this.dateOfBirth = dateOfBirth;
            return this;
        }

        public PatientResponseDtoBuilder age(Integer age) {
            this.age = age;
            return this;
        }

        public PatientResponseDtoBuilder gender(String gender) {
            this.gender = gender;
            return this;
        }

        public PatientResponseDtoBuilder bloodGroup(String bloodGroup) {
            this.bloodGroup = bloodGroup;
            return this;
        }

        public PatientResponseDtoBuilder contactNumber(String contactNumber) {
            this.contactNumber = contactNumber;
            return this;
        }

        public PatientResponseDtoBuilder emergencyContactName(String emergencyContactName) {
            this.emergencyContactName = emergencyContactName;
            return this;
        }

        public PatientResponseDtoBuilder emergencyContactPhone(String emergencyContactPhone) {
            this.emergencyContactPhone = emergencyContactPhone;
            return this;
        }

        public PatientResponseDtoBuilder residentialAddress(String residentialAddress) {
            this.residentialAddress = residentialAddress;
            return this;
        }

        public PatientResponseDtoBuilder insuranceCarrier(String insuranceCarrier) {
            this.insuranceCarrier = insuranceCarrier;
            return this;
        }

        public PatientResponseDtoBuilder policyId(String policyId) {
            this.policyId = policyId;
            return this;
        }

        public PatientResponseDtoBuilder department(String department) {
            this.department = department;
            return this;
        }

        public PatientResponseDtoBuilder assignedDoctorId(Long assignedDoctorId) {
            this.assignedDoctorId = assignedDoctorId;
            return this;
        }

        public PatientResponseDtoBuilder assignedDoctorName(String assignedDoctorName) {
            this.assignedDoctorName = assignedDoctorName;
            return this;
        }

        public PatientResponseDtoBuilder careStatus(String careStatus) {
            this.careStatus = careStatus;
            return this;
        }

        public PatientResponseDtoBuilder admissionDate(LocalDateTime admissionDate) {
            this.admissionDate = admissionDate;
            return this;
        }

        public PatientResponseDtoBuilder dischargeDate(LocalDateTime dischargeDate) {
            this.dischargeDate = dischargeDate;
            return this;
        }

        public PatientResponseDtoBuilder bedNumber(String bedNumber) {
            this.bedNumber = bedNumber;
            return this;
        }

        public PatientResponseDtoBuilder triageNotes(String triageNotes) {
            this.triageNotes = triageNotes;
            return this;
        }

        public PatientResponseDtoBuilder avatarUrl(String avatarUrl) {
            this.avatarUrl = avatarUrl;
            return this;
        }

        public PatientResponseDtoBuilder active(boolean active) {
            this.active = active;
            return this;
        }

        public PatientResponseDtoBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public PatientResponseDto build() {
            return new PatientResponseDto(this.id, this.mrn, this.fullName, this.nationalId, this.dateOfBirth, this.age, this.gender, this.bloodGroup, this.contactNumber, this.emergencyContactName, this.emergencyContactPhone, this.residentialAddress, this.insuranceCarrier, this.policyId, this.department, this.assignedDoctorId, this.assignedDoctorName, this.careStatus, this.admissionDate, this.dischargeDate, this.bedNumber, this.triageNotes, this.avatarUrl, this.active, this.createdAt);
        }
    }
}
