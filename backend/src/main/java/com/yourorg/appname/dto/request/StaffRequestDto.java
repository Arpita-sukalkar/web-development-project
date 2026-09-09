package com.yourorg.appname.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class StaffRequestDto {

    @NotBlank(message = "Employee ID is required")
    private String employeeId;

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Role title is required")
    private String roleTitle;

    @NotBlank(message = "Department is required")
    private String department;

    @NotBlank(message = "Shift schedule is required")
    private String shiftSchedule;

    @NotBlank(message = "Contact number is required")
    private String contactNumber;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    private String status;

    private String avatarUrl;

    public StaffRequestDto() {
    }

    public StaffRequestDto(String employeeId, String fullName, String roleTitle, String department, String shiftSchedule, String contactNumber, String email, String status, String avatarUrl) {
        this.employeeId = employeeId;
        this.fullName = fullName;
        this.roleTitle = roleTitle;
        this.department = department;
        this.shiftSchedule = shiftSchedule;
        this.contactNumber = contactNumber;
        this.email = email;
        this.status = status;
        this.avatarUrl = avatarUrl;
    }

    public String getEmployeeId() {
        return this.employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public String getFullName() {
        return this.fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getRoleTitle() {
        return this.roleTitle;
    }

    public void setRoleTitle(String roleTitle) {
        this.roleTitle = roleTitle;
    }

    public String getDepartment() {
        return this.department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getShiftSchedule() {
        return this.shiftSchedule;
    }

    public void setShiftSchedule(String shiftSchedule) {
        this.shiftSchedule = shiftSchedule;
    }

    public String getContactNumber() {
        return this.contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAvatarUrl() {
        return this.avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public static StaffRequestDtoBuilder builder() {
        return new StaffRequestDtoBuilder();
    }

    public static class StaffRequestDtoBuilder {
        private String employeeId;
        private String fullName;
        private String roleTitle;
        private String department;
        private String shiftSchedule;
        private String contactNumber;
        private String email;
        private String status;
        private String avatarUrl;

        public StaffRequestDtoBuilder() {
        }

        public StaffRequestDtoBuilder employeeId(String employeeId) {
            this.employeeId = employeeId;
            return this;
        }

        public StaffRequestDtoBuilder fullName(String fullName) {
            this.fullName = fullName;
            return this;
        }

        public StaffRequestDtoBuilder roleTitle(String roleTitle) {
            this.roleTitle = roleTitle;
            return this;
        }

        public StaffRequestDtoBuilder department(String department) {
            this.department = department;
            return this;
        }

        public StaffRequestDtoBuilder shiftSchedule(String shiftSchedule) {
            this.shiftSchedule = shiftSchedule;
            return this;
        }

        public StaffRequestDtoBuilder contactNumber(String contactNumber) {
            this.contactNumber = contactNumber;
            return this;
        }

        public StaffRequestDtoBuilder email(String email) {
            this.email = email;
            return this;
        }

        public StaffRequestDtoBuilder status(String status) {
            this.status = status;
            return this;
        }

        public StaffRequestDtoBuilder avatarUrl(String avatarUrl) {
            this.avatarUrl = avatarUrl;
            return this;
        }

        public StaffRequestDto build() {
            return new StaffRequestDto(this.employeeId, this.fullName, this.roleTitle, this.department, this.shiftSchedule, this.contactNumber, this.email, this.status, this.avatarUrl);
        }
    }
}
