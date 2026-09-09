package com.yourorg.appname.dto.response;

import java.time.LocalDateTime;

public class HospitalNotificationResponseDto {

    private Long id;

    private String title;

    private String message;

    private String notificationType;

    private String targetDepartment;

    private String priority;

    private boolean read;

    private LocalDateTime createdAt;

    public HospitalNotificationResponseDto() {
    }

    public HospitalNotificationResponseDto(Long id, String title, String message, String notificationType, String targetDepartment, String priority, boolean read, LocalDateTime createdAt) {
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

    public static HospitalNotificationResponseDtoBuilder builder() {
        return new HospitalNotificationResponseDtoBuilder();
    }

    public static class HospitalNotificationResponseDtoBuilder {
        private Long id;
        private String title;
        private String message;
        private String notificationType;
        private String targetDepartment;
        private String priority;
        private boolean read;
        private LocalDateTime createdAt;

        public HospitalNotificationResponseDtoBuilder() {
        }

        public HospitalNotificationResponseDtoBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public HospitalNotificationResponseDtoBuilder title(String title) {
            this.title = title;
            return this;
        }

        public HospitalNotificationResponseDtoBuilder message(String message) {
            this.message = message;
            return this;
        }

        public HospitalNotificationResponseDtoBuilder notificationType(String notificationType) {
            this.notificationType = notificationType;
            return this;
        }

        public HospitalNotificationResponseDtoBuilder targetDepartment(String targetDepartment) {
            this.targetDepartment = targetDepartment;
            return this;
        }

        public HospitalNotificationResponseDtoBuilder priority(String priority) {
            this.priority = priority;
            return this;
        }

        public HospitalNotificationResponseDtoBuilder read(boolean read) {
            this.read = read;
            return this;
        }

        public HospitalNotificationResponseDtoBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public HospitalNotificationResponseDto build() {
            return new HospitalNotificationResponseDto(this.id, this.title, this.message, this.notificationType, this.targetDepartment, this.priority, this.read, this.createdAt);
        }
    }
}
