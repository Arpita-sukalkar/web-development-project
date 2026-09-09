package com.yourorg.appname.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class PatientRequestDto {

    private String mrn;

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "National ID is required")
    private String nationalId;

    @NotNull(message = "Date of birth is required")
    private LocalDate dateOfBirth;

    @NotBlank(message = "Gender is required")
    private String gender;

    @NotBlank(message = "Blood group is required")
    private String bloodGroup;

    @NotBlank(message = "Contact number is required")
    private String contactNumber;

    private String emergencyContactName;

    private String emergencyContactPhone;

    private String residentialAddress;

    private String insuranceCarrier;

    private String policyId;

    @NotBlank(message = "Department is required")
    private String department;

    private Long assignedDoctorId;

    private String careStatus;

    private String bedNumber;

    private String triageNotes;

    private String avatarUrl;

    public PatientRequestDto() {
    }

    public PatientRequestDto(String mrn, String fullName, String nationalId, LocalDate dateOfBirth, String gender, String bloodGroup, String contactNumber, String emergencyContactName, String emergencyContactPhone, String residentialAddress, String insuranceCarrier, String policyId, String department, Long assignedDoctorId, String careStatus, String bedNumber, String triageNotes, String avatarUrl) {
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
        this.assignedDoctorId = assignedDoctorId;
        this.careStatus = careStatus;
        this.bedNumber = bedNumber;
        this.triageNotes = triageNotes;
        this.avatarUrl = avatarUrl;
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

    public Long getAssignedDoctorId() {
        return this.assignedDoctorId;
    }

    public void setAssignedDoctorId(Long assignedDoctorId) {
        this.assignedDoctorId = assignedDoctorId;
    }

    public String getCareStatus() {
        return this.careStatus;
    }

    public void setCareStatus(String careStatus) {
        this.careStatus = careStatus;
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

    public static PatientRequestDtoBuilder builder() {
        return new PatientRequestDtoBuilder();
    }

    public static class PatientRequestDtoBuilder {
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
        private Long assignedDoctorId;
        private String careStatus;
        private String bedNumber;
        private String triageNotes;
        private String avatarUrl;

        public PatientRequestDtoBuilder() {
        }

        public PatientRequestDtoBuilder mrn(String mrn) {
            this.mrn = mrn;
            return this;
        }

        public PatientRequestDtoBuilder fullName(String fullName) {
            this.fullName = fullName;
            return this;
        }

        public PatientRequestDtoBuilder nationalId(String nationalId) {
            this.nationalId = nationalId;
            return this;
        }

        public PatientRequestDtoBuilder dateOfBirth(LocalDate dateOfBirth) {
            this.dateOfBirth = dateOfBirth;
            return this;
        }

        public PatientRequestDtoBuilder gender(String gender) {
            this.gender = gender;
            return this;
        }

        public PatientRequestDtoBuilder bloodGroup(String bloodGroup) {
            this.bloodGroup = bloodGroup;
            return this;
        }

        public PatientRequestDtoBuilder contactNumber(String contactNumber) {
            this.contactNumber = contactNumber;
            return this;
        }

        public PatientRequestDtoBuilder emergencyContactName(String emergencyContactName) {
            this.emergencyContactName = emergencyContactName;
            return this;
        }

        public PatientRequestDtoBuilder emergencyContactPhone(String emergencyContactPhone) {
            this.emergencyContactPhone = emergencyContactPhone;
            return this;
        }

        public PatientRequestDtoBuilder residentialAddress(String residentialAddress) {
            this.residentialAddress = residentialAddress;
            return this;
        }

        public PatientRequestDtoBuilder insuranceCarrier(String insuranceCarrier) {
            this.insuranceCarrier = insuranceCarrier;
            return this;
        }

        public PatientRequestDtoBuilder policyId(String policyId) {
            this.policyId = policyId;
            return this;
        }

        public PatientRequestDtoBuilder department(String department) {
            this.department = department;
            return this;
        }

        public PatientRequestDtoBuilder assignedDoctorId(Long assignedDoctorId) {
            this.assignedDoctorId = assignedDoctorId;
            return this;
        }

        public PatientRequestDtoBuilder careStatus(String careStatus) {
            this.careStatus = careStatus;
            return this;
        }

        public PatientRequestDtoBuilder bedNumber(String bedNumber) {
            this.bedNumber = bedNumber;
            return this;
        }

        public PatientRequestDtoBuilder triageNotes(String triageNotes) {
            this.triageNotes = triageNotes;
            return this;
        }

        public PatientRequestDtoBuilder avatarUrl(String avatarUrl) {
            this.avatarUrl = avatarUrl;
            return this;
        }

        public PatientRequestDto build() {
            return new PatientRequestDto(this.mrn, this.fullName, this.nationalId, this.dateOfBirth, this.gender, this.bloodGroup, this.contactNumber, this.emergencyContactName, this.emergencyContactPhone, this.residentialAddress, this.insuranceCarrier, this.policyId, this.department, this.assignedDoctorId, this.careStatus, this.bedNumber, this.triageNotes, this.avatarUrl);
        }
    }
}
