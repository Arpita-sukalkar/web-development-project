package com.yourorg.appname.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterRequest {

    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Full name is required")
    private String fullName;

    private String role;

    private String title;

    private String department;

    private String avatarUrl;

    public RegisterRequest() {
    }

    public RegisterRequest(String username, String password, String email, String fullName, String role, String title, String department, String avatarUrl) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.fullName = fullName;
        this.role = role;
        this.title = title;
        this.department = department;
        this.avatarUrl = avatarUrl;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public static RegisterRequestBuilder builder() {
        return new RegisterRequestBuilder();
    }

    public static class RegisterRequestBuilder {
        private String username;
        private String password;
        private String email;
        private String fullName;
        private String role;
        private String title;
        private String department;
        private String avatarUrl;

        public RegisterRequestBuilder() {
        }

        public RegisterRequestBuilder username(String username) {
            this.username = username;
            return this;
        }

        public RegisterRequestBuilder password(String password) {
            this.password = password;
            return this;
        }

        public RegisterRequestBuilder email(String email) {
            this.email = email;
            return this;
        }

        public RegisterRequestBuilder fullName(String fullName) {
            this.fullName = fullName;
            return this;
        }

        public RegisterRequestBuilder role(String role) {
            this.role = role;
            return this;
        }

        public RegisterRequestBuilder title(String title) {
            this.title = title;
            return this;
        }

        public RegisterRequestBuilder department(String department) {
            this.department = department;
            return this;
        }

        public RegisterRequestBuilder avatarUrl(String avatarUrl) {
            this.avatarUrl = avatarUrl;
            return this;
        }

        public RegisterRequest build() {
            return new RegisterRequest(this.username, this.password, this.email, this.fullName, this.role, this.title, this.department, this.avatarUrl);
        }
    }
}
