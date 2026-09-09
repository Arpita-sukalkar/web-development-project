package com.yourorg.appname.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.math.BigDecimal;

public class DoctorRequestDto {

    private Long userId;

    @NotBlank(message = "License number is required")
    private String licenseNumber;

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Specialty is required")
    private String specialty;

    @NotBlank(message = "Department is required")
    private String department;

    private String ward;

    private String qualifications;

    private String status;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Phone number is required")
    private String phone;

    private String avatarUrl;

    private String weeklyHours;

    private Integer lifetimePatients;

    private BigDecimal successRate;

    private Integer todayAppointmentsCount;

    public DoctorRequestDto() {
    }

    public DoctorRequestDto(Long userId, String licenseNumber, String fullName, String specialty, String department, String ward, String qualifications, String status, String email, String phone, String avatarUrl, String weeklyHours, Integer lifetimePatients, BigDecimal successRate, Integer todayAppointmentsCount) {
        this.userId = userId;
        this.licenseNumber = licenseNumber;
        this.fullName = fullName;
        this.specialty = specialty;
        this.department = department;
        this.ward = ward;
        this.qualifications = qualifications;
        this.status = status;
        this.email = email;
        this.phone = phone;
        this.avatarUrl = avatarUrl;
        this.weeklyHours = weeklyHours;
        this.lifetimePatients = lifetimePatients;
        this.successRate = successRate;
        this.todayAppointmentsCount = todayAppointmentsCount;
    }

    public Long getUserId() {
        return this.userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getLicenseNumber() {
        return this.licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public String getFullName() {
        return this.fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getSpecialty() {
        return this.specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }

    public String getDepartment() {
        return this.department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getWard() {
        return this.ward;
    }

    public void setWard(String ward) {
        this.ward = ward;
    }

    public String getQualifications() {
        return this.qualifications;
    }

    public void setQualifications(String qualifications) {
        this.qualifications = qualifications;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return this.phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAvatarUrl() {
        return this.avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getWeeklyHours() {
        return this.weeklyHours;
    }

    public void setWeeklyHours(String weeklyHours) {
        this.weeklyHours = weeklyHours;
    }

    public Integer getLifetimePatients() {
        return this.lifetimePatients;
    }

    public void setLifetimePatients(Integer lifetimePatients) {
        this.lifetimePatients = lifetimePatients;
    }

    public BigDecimal getSuccessRate() {
        return this.successRate;
    }

    public void setSuccessRate(BigDecimal successRate) {
        this.successRate = successRate;
    }

    public Integer getTodayAppointmentsCount() {
        return this.todayAppointmentsCount;
    }

    public void setTodayAppointmentsCount(Integer todayAppointmentsCount) {
        this.todayAppointmentsCount = todayAppointmentsCount;
    }

    public static DoctorRequestDtoBuilder builder() {
        return new DoctorRequestDtoBuilder();
    }

    public static class DoctorRequestDtoBuilder {
        private Long userId;
        private String licenseNumber;
        private String fullName;
        private String specialty;
        private String department;
        private String ward;
        private String qualifications;
        private String status;
        private String email;
        private String phone;
        private String avatarUrl;
        private String weeklyHours;
        private Integer lifetimePatients;
        private BigDecimal successRate;
        private Integer todayAppointmentsCount;

        public DoctorRequestDtoBuilder() {
        }

        public DoctorRequestDtoBuilder userId(Long userId) {
            this.userId = userId;
            return this;
        }

        public DoctorRequestDtoBuilder licenseNumber(String licenseNumber) {
            this.licenseNumber = licenseNumber;
            return this;
        }

        public DoctorRequestDtoBuilder fullName(String fullName) {
            this.fullName = fullName;
            return this;
        }

        public DoctorRequestDtoBuilder specialty(String specialty) {
            this.specialty = specialty;
            return this;
        }

        public DoctorRequestDtoBuilder department(String department) {
            this.department = department;
            return this;
        }

        public DoctorRequestDtoBuilder ward(String ward) {
            this.ward = ward;
            return this;
        }

        public DoctorRequestDtoBuilder qualifications(String qualifications) {
            this.qualifications = qualifications;
            return this;
        }

        public DoctorRequestDtoBuilder status(String status) {
            this.status = status;
            return this;
        }

        public DoctorRequestDtoBuilder email(String email) {
            this.email = email;
            return this;
        }

        public DoctorRequestDtoBuilder phone(String phone) {
            this.phone = phone;
            return this;
        }

        public DoctorRequestDtoBuilder avatarUrl(String avatarUrl) {
            this.avatarUrl = avatarUrl;
            return this;
        }

        public DoctorRequestDtoBuilder weeklyHours(String weeklyHours) {
            this.weeklyHours = weeklyHours;
            return this;
        }

        public DoctorRequestDtoBuilder lifetimePatients(Integer lifetimePatients) {
            this.lifetimePatients = lifetimePatients;
            return this;
        }

        public DoctorRequestDtoBuilder successRate(BigDecimal successRate) {
            this.successRate = successRate;
            return this;
        }

        public DoctorRequestDtoBuilder todayAppointmentsCount(Integer todayAppointmentsCount) {
            this.todayAppointmentsCount = todayAppointmentsCount;
            return this;
        }

        public DoctorRequestDto build() {
            return new DoctorRequestDto(this.userId, this.licenseNumber, this.fullName, this.specialty, this.department, this.ward, this.qualifications, this.status, this.email, this.phone, this.avatarUrl, this.weeklyHours, this.lifetimePatients, this.successRate, this.todayAppointmentsCount);
        }
    }
}
