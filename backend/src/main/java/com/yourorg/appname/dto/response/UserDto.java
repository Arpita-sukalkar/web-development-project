package com.yourorg.appname.dto.response;

import java.time.LocalDateTime;

public class UserDto {

    private Long id;

    private String username;

    private String email;

    private String fullName;

    private String role;

    private String title;

    private String department;

    private String avatarUrl;

    private boolean active;

    private LocalDateTime createdAt;

    public UserDto() {
    }

    public UserDto(Long id, String username, String email, String fullName, String role, String title, String department, String avatarUrl, boolean active, LocalDateTime createdAt) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.fullName = fullName;
        this.role = role;
        this.title = title;
        this.department = department;
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

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return this.fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getRole() {
        return this.role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDepartment() {
        return this.department;
    }

    public void setDepartment(String department) {
        this.department = department;
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

    public static UserDtoBuilder builder() {
        return new UserDtoBuilder();
    }

    public static class UserDtoBuilder {
        private Long id;
        private String username;
        private String email;
        private String fullName;
        private String role;
        private String title;
        private String department;
        private String avatarUrl;
        private boolean active;
        private LocalDateTime createdAt;

        public UserDtoBuilder() {
        }

        public UserDtoBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public UserDtoBuilder username(String username) {
            this.username = username;
            return this;
        }

        public UserDtoBuilder email(String email) {
            this.email = email;
            return this;
        }

        public UserDtoBuilder fullName(String fullName) {
            this.fullName = fullName;
            return this;
        }

        public UserDtoBuilder role(String role) {
            this.role = role;
            return this;
        }

        public UserDtoBuilder title(String title) {
            this.title = title;
            return this;
        }

        public UserDtoBuilder department(String department) {
            this.department = department;
            return this;
        }

        public UserDtoBuilder avatarUrl(String avatarUrl) {
            this.avatarUrl = avatarUrl;
            return this;
        }

        public UserDtoBuilder active(boolean active) {
            this.active = active;
            return this;
        }

        public UserDtoBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public UserDto build() {
            return new UserDto(this.id, this.username, this.email, this.fullName, this.role, this.title, this.department, this.avatarUrl, this.active, this.createdAt);
        }
    }
}
