package com.yourorg.appname.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "doctors")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "license_number", nullable = false, unique = true, length = 50)
    private String licenseNumber;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(nullable = false, length = 100)
    private String specialty;

    @Column(nullable = false, length = 100)
    private String department;

    @Column(length = 100)
    private String ward;

    @Column(length = 255)
    private String qualifications;

    @Column(nullable = false, length = 50)
    private String status = "ON_DUTY";

    @Column(nullable = false, length = 100)
    private String email;

    @Column(nullable = false, length = 50)
    private String phone;

    @Column(name = "avatar_url", length = 500)
    private String avatarUrl;

    @Column(name = "weekly_hours", length = 100)
    private String weeklyHours;

    @Column(name = "lifetime_patients")
    private Integer lifetimePatients = 0;

    @Column(name = "success_rate", precision = 5, scale = 2)
    private BigDecimal successRate = BigDecimal.valueOf(98.50);

    @Column(name = "today_appointments_count")
    private Integer todayAppointmentsCount = 0;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Doctor() {
    }

    public Doctor(Long id, User user, String licenseNumber, String fullName, String specialty, String department, String ward, String qualifications, String status, String email, String phone, String avatarUrl, String weeklyHours, Integer lifetimePatients, BigDecimal successRate, Integer todayAppointmentsCount, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.user = user;
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
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public LocalDateTime getUpdatedAt() {
        return this.updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public static DoctorBuilder builder() {
        return new DoctorBuilder();
    }

    public static class DoctorBuilder {
        private Long id;
        private User user;
        private String licenseNumber;
        private String fullName;
        private String specialty;
        private String department;
        private String ward;
        private String qualifications;
        private String status = "ON_DUTY";
        private String email;
        private String phone;
        private String avatarUrl;
        private String weeklyHours;
        private Integer lifetimePatients = 0;
        private BigDecimal successRate = BigDecimal.valueOf(98.50);
        private Integer todayAppointmentsCount = 0;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public DoctorBuilder() {
        }

        public DoctorBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public DoctorBuilder user(User user) {
            this.user = user;
            return this;
        }

        public DoctorBuilder licenseNumber(String licenseNumber) {
            this.licenseNumber = licenseNumber;
            return this;
        }

        public DoctorBuilder fullName(String fullName) {
            this.fullName = fullName;
            return this;
        }

        public DoctorBuilder specialty(String specialty) {
            this.specialty = specialty;
            return this;
        }

        public DoctorBuilder department(String department) {
            this.department = department;
            return this;
        }

        public DoctorBuilder ward(String ward) {
            this.ward = ward;
            return this;
        }

        public DoctorBuilder qualifications(String qualifications) {
            this.qualifications = qualifications;
            return this;
        }

        public DoctorBuilder status(String status) {
            this.status = status;
            return this;
        }

        public DoctorBuilder email(String email) {
            this.email = email;
            return this;
        }

        public DoctorBuilder phone(String phone) {
            this.phone = phone;
            return this;
        }

        public DoctorBuilder avatarUrl(String avatarUrl) {
            this.avatarUrl = avatarUrl;
            return this;
        }

        public DoctorBuilder weeklyHours(String weeklyHours) {
            this.weeklyHours = weeklyHours;
            return this;
        }

        public DoctorBuilder lifetimePatients(Integer lifetimePatients) {
            this.lifetimePatients = lifetimePatients;
            return this;
        }

        public DoctorBuilder successRate(BigDecimal successRate) {
            this.successRate = successRate;
            return this;
        }

        public DoctorBuilder todayAppointmentsCount(Integer todayAppointmentsCount) {
            this.todayAppointmentsCount = todayAppointmentsCount;
            return this;
        }

        public DoctorBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public DoctorBuilder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public Doctor build() {
            return new Doctor(this.id, this.user, this.licenseNumber, this.fullName, this.specialty, this.department, this.ward, this.qualifications, this.status, this.email, this.phone, this.avatarUrl, this.weeklyHours, this.lifetimePatients, this.successRate, this.todayAppointmentsCount, this.createdAt, this.updatedAt);
        }
    }
}
