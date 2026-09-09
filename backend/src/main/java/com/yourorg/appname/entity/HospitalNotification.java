package com.yourorg.appname.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "hospital_notifications")
public class HospitalNotification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, length = 500)
    private String message;

    @Column(name = "notification_type", nullable = false, length = 50)
    private String notificationType = "INFO";

    @Column(name = "target_department", length = 100)
    private String targetDepartment;

    @Column(nullable = false, length = 50)
    private String priority = "MEDIUM";

    @Column(name = "is_read", nullable = false)
    private boolean read = false;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public HospitalNotification() {
    }

    public HospitalNotification(Long id, String title, String message, String notificationType, String targetDepartment, String priority, boolean read, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.message = message;
        this.notificationType = notificationType;
        this.targetDepartment = targetDepartment;
        this.priority = priority;
        this.read = read;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getNotificationType() {
        return this.notificationType;
    }

    public void setNotificationType(String notificationType) {
        this.notificationType = notificationType;
    }

    public String getTargetDepartment() {
        return this.targetDepartment;
    }

    public void setTargetDepartment(String targetDepartment) {
        this.targetDepartment = targetDepartment;
    }

    public String getPriority() {
        return this.priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public boolean isRead() {
        return this.read;
    }

    public boolean getRead() {
        return this.read;
    }

    public void setRead(boolean read) {
        this.read = read;
    }

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public static HospitalNotificationBuilder builder() {
        return new HospitalNotificationBuilder();
    }

    public static class HospitalNotificationBuilder {
        private Long id;
        private String title;
        private String message;
        private String notificationType = "INFO";
        private String targetDepartment;
        private String priority = "MEDIUM";
        private boolean read = false;
        private LocalDateTime createdAt;

        public HospitalNotificationBuilder() {
        }

        public HospitalNotificationBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public HospitalNotificationBuilder title(String title) {
            this.title = title;
            return this;
        }

        public HospitalNotificationBuilder message(String message) {
            this.message = message;
            return this;
        }

        public HospitalNotificationBuilder notificationType(String notificationType) {
            this.notificationType = notificationType;
            return this;
        }

        public HospitalNotificationBuilder targetDepartment(String targetDepartment) {
            this.targetDepartment = targetDepartment;
            return this;
        }

        public HospitalNotificationBuilder priority(String priority) {
            this.priority = priority;
            return this;
        }

        public HospitalNotificationBuilder read(boolean read) {
            this.read = read;
            return this;
        }

        public HospitalNotificationBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public HospitalNotification build() {
            return new HospitalNotification(this.id, this.title, this.message, this.notificationType, this.targetDepartment, this.priority, this.read, this.createdAt);
        }
    }
}
