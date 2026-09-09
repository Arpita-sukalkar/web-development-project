package com.yourorg.appname.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "staff_members")
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "employee_id", nullable = false, unique = true, length = 50)
    private String employeeId;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(name = "role_title", nullable = false, length = 100)
    private String roleTitle;

    @Column(nullable = false, length = 100)
    private String department;

    @Column(name = "shift_schedule", nullable = false, length = 100)
    private String shiftSchedule;

    @Column(name = "contact_number", nullable = false, length = 50)
    private String contactNumber;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(nullable = false, length = 50)
    private String status = "ACTIVE";

    @Column(name = "avatar_url", length = 500)
    private String avatarUrl;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Staff() {
    }

    public Staff(Long id, String employeeId, String fullName, String roleTitle, String department, String shiftSchedule, String contactNumber, String email, String status, String avatarUrl, LocalDateTime createdAt, LocalDateTime updatedAt) {
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
        this.updatedAt = updatedAt;
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

    public LocalDateTime getUpdatedAt() {
        return this.updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public static StaffBuilder builder() {
        return new StaffBuilder();
    }

    public static class StaffBuilder {
        private Long id;
        private String employeeId;
        private String fullName;
        private String roleTitle;
        private String department;
        private String shiftSchedule;
        private String contactNumber;
        private String email;
        private String status = "ACTIVE";
        private String avatarUrl;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public StaffBuilder() {
        }

        public StaffBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public StaffBuilder employeeId(String employeeId) {
            this.employeeId = employeeId;
            return this;
        }

        public StaffBuilder fullName(String fullName) {
            this.fullName = fullName;
            return this;
        }

        public StaffBuilder roleTitle(String roleTitle) {
            this.roleTitle = roleTitle;
            return this;
        }

        public StaffBuilder department(String department) {
            this.department = department;
            return this;
        }

        public StaffBuilder shiftSchedule(String shiftSchedule) {
            this.shiftSchedule = shiftSchedule;
            return this;
        }

        public StaffBuilder contactNumber(String contactNumber) {
            this.contactNumber = contactNumber;
            return this;
        }

        public StaffBuilder email(String email) {
            this.email = email;
            return this;
        }

        public StaffBuilder status(String status) {
            this.status = status;
            return this;
        }

        public StaffBuilder avatarUrl(String avatarUrl) {
            this.avatarUrl = avatarUrl;
            return this;
        }

        public StaffBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public StaffBuilder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public Staff build() {
            return new Staff(this.id, this.employeeId, this.fullName, this.roleTitle, this.department, this.shiftSchedule, this.contactNumber, this.email, this.status, this.avatarUrl, this.createdAt, this.updatedAt);
        }
    }
}
