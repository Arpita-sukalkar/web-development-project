package com.yourorg.appname.dto.response;

import java.time.LocalDateTime;

public class StaffResponseDto {

    private Long id;

    private String employeeId;

    private String fullName;

    private String roleTitle;

    private String department;

    private String shiftSchedule;

    private String contactNumber;

    private String email;

    private String status;

    private String avatarUrl;

    private LocalDateTime createdAt;

    public StaffResponseDto() {
    }

    public StaffResponseDto(Long id, String employeeId, String fullName, String roleTitle, String department, String shiftSchedule, String contactNumber, String email, String status, String avatarUrl, LocalDateTime createdAt) {
        this.id = id;
        this.employeeId = employeeId;
        this.fullName = fullName;
        this.roleTitle = roleTitle;
        this.department = department;
        this.shiftSchedule = shiftSchedule;
        this.contactNumber = contactNumber;
        this.email = email;
        this.status = status;
        this.avatarUrl = avatarUrl;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public static StaffResponseDtoBuilder builder() {
        return new StaffResponseDtoBuilder();
    }

    public static class StaffResponseDtoBuilder {
        private Long id;
        private String employeeId;
        private String fullName;
        private String roleTitle;
        private String department;
        private String shiftSchedule;
        private String contactNumber;
        private String email;
        private String status;
        private String avatarUrl;
        private LocalDateTime createdAt;

        public StaffResponseDtoBuilder() {
        }

        public StaffResponseDtoBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public StaffResponseDtoBuilder employeeId(String employeeId) {
            this.employeeId = employeeId;
            return this;
        }

        public StaffResponseDtoBuilder fullName(String fullName) {
            this.fullName = fullName;
            return this;
        }

        public StaffResponseDtoBuilder roleTitle(String roleTitle) {
            this.roleTitle = roleTitle;
            return this;
        }

        public StaffResponseDtoBuilder department(String department) {
            this.department = department;
            return this;
        }

        public StaffResponseDtoBuilder shiftSchedule(String shiftSchedule) {
            this.shiftSchedule = shiftSchedule;
            return this;
        }

        public StaffResponseDtoBuilder contactNumber(String contactNumber) {
            this.contactNumber = contactNumber;
            return this;
        }

        public StaffResponseDtoBuilder email(String email) {
            this.email = email;
            return this;
        }

        public StaffResponseDtoBuilder status(String status) {
            this.status = status;
            return this;
        }

        public StaffResponseDtoBuilder avatarUrl(String avatarUrl) {
            this.avatarUrl = avatarUrl;
            return this;
        }

        public StaffResponseDtoBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public StaffResponseDto build() {
            return new StaffResponseDto(this.id, this.employeeId, this.fullName, this.roleTitle, this.department, this.shiftSchedule, this.contactNumber, this.email, this.status, this.avatarUrl, this.createdAt);
        }
    }
}
