package com.yourorg.appname.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class DoctorResponseDto {

    private Long id;

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

    private LocalDateTime createdAt;

    public DoctorResponseDto() {
    }

    public DoctorResponseDto(Long id, Long userId, String licenseNumber, String fullName, String specialty, String department, String ward, String qualifications, String status, String email, String phone, String avatarUrl, String weeklyHours, Integer lifetimePatients, BigDecimal successRate, Integer todayAppointmentsCount, LocalDateTime createdAt) {
        this.id = id;
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
        this.createdAt = createdAt;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public static DoctorResponseDtoBuilder builder() {
        return new DoctorResponseDtoBuilder();
    }

    public static class DoctorResponseDtoBuilder {
        private Long id;
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
        private LocalDateTime createdAt;

        public DoctorResponseDtoBuilder() {
        }

        public DoctorResponseDtoBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public DoctorResponseDtoBuilder userId(Long userId) {
            this.userId = userId;
            return this;
        }

        public DoctorResponseDtoBuilder licenseNumber(String licenseNumber) {
            this.licenseNumber = licenseNumber;
            return this;
        }

        public DoctorResponseDtoBuilder fullName(String fullName) {
            this.fullName = fullName;
            return this;
        }

        public DoctorResponseDtoBuilder specialty(String specialty) {
            this.specialty = specialty;
            return this;
        }

        public DoctorResponseDtoBuilder department(String department) {
            this.department = department;
            return this;
        }

        public DoctorResponseDtoBuilder ward(String ward) {
            this.ward = ward;
            return this;
        }

        public DoctorResponseDtoBuilder qualifications(String qualifications) {
            this.qualifications = qualifications;
            return this;
        }

        public DoctorResponseDtoBuilder status(String status) {
            this.status = status;
            return this;
        }

        public DoctorResponseDtoBuilder email(String email) {
            this.email = email;
            return this;
        }

        public DoctorResponseDtoBuilder phone(String phone) {
            this.phone = phone;
            return this;
        }

        public DoctorResponseDtoBuilder avatarUrl(String avatarUrl) {
            this.avatarUrl = avatarUrl;
            return this;
        }

        public DoctorResponseDtoBuilder weeklyHours(String weeklyHours) {
            this.weeklyHours = weeklyHours;
            return this;
        }

        public DoctorResponseDtoBuilder lifetimePatients(Integer lifetimePatients) {
            this.lifetimePatients = lifetimePatients;
            return this;
        }

        public DoctorResponseDtoBuilder successRate(BigDecimal successRate) {
            this.successRate = successRate;
            return this;
        }

        public DoctorResponseDtoBuilder todayAppointmentsCount(Integer todayAppointmentsCount) {
            this.todayAppointmentsCount = todayAppointmentsCount;
            return this;
        }

        public DoctorResponseDtoBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public DoctorResponseDto build() {
            return new DoctorResponseDto(this.id, this.userId, this.licenseNumber, this.fullName, this.specialty, this.department, this.ward, this.qualifications, this.status, this.email, this.phone, this.avatarUrl, this.weeklyHours, this.lifetimePatients, this.successRate, this.todayAppointmentsCount, this.createdAt);
        }
    }
}
