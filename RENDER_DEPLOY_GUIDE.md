# Render Cloud Production Deployment Guide

This guide provides step-by-step instructions to deploy the entire **CarePulse Enterprise Hospital Management System (HMS)** to [Render.com](https://render.com).

The project is fully pre-configured with:
- **Spring Boot 3.2.3 (Java 17)** with PostgreSQL cloud support, automatic dynamic `DATABASE_URL` parsing, and non-root Docker containerization.
- **React 18 + Vite 5** Single-Page Application (SPA) with automated base URL normalization and fallback proxying.
- **Render Infrastructure as Code Blueprint** (`render.yaml`) for 1-click provisioning of Database, Backend Web Service, and Frontend Static Site.

---

## Architecture Overview

| Component | Technology | Render Service Type | Port / Route |
| :--- | :--- | :--- | :--- |
| **Database** | Managed PostgreSQL 16 | Render PostgreSQL | Dynamic port / 5432 |
| **Backend API** | Spring Boot 3.2.3 / Java 17 | Web Service (Docker) | Dynamic `$PORT` (default `8080`) |
| **Frontend UI** | React 18 + Tailwind CSS + Vite 5 | Static Site | Publish `./frontend/dist` |

---

## Method A: 1-Click Blueprint Deployment (Recommended)

Render Blueprints allow you to provision and connect all 3 services automatically using the included `render.yaml` file.

### Prerequisites:
1. Push this repository to **GitHub** or **GitLab**.
2. A free account on [Render.com](https://render.com).

### Steps:
1. Log in to the [Render Dashboard](https://dashboard.render.com/).
2. Click the **New +** button in the top navigation bar and select **Blueprint**.
3. Connect your Git repository containing this project.
4. Render will detect `render.yaml` and display the three resources:
   - `carepulse-hms-db` (PostgreSQL Database)
   - `carepulse-hms-backend` (Docker Web Service)
   - `carepulse-hms-frontend` (Static Site)
5. Click **Apply**.
6. Render will automatically:
   - Provision the PostgreSQL database.
   - Build and start the backend Docker container (injecting `DATABASE_URL` and `PORT`).
   - Run the frontend build and link `VITE_API_BASE_URL` to your backend service.

---

## Method B: Manual Dashboard Deployment

If you prefer to configure each service manually in the Render UI:

### Step 1: Create the Managed PostgreSQL Database
1. In the Render Dashboard, click **New +** > **PostgreSQL**.
2. Fill in the database details:
   - **Name**: `carepulse-hms-db`
   - **Database**: `hospital_db`
   - **User**: `hospital_user`
   - **Region**: Choose the region closest to you (e.g. `Oregon (US West)` or `Frankfurt (EU Central)`).
   - **Plan**: `Free`
3. Click **Create Database**.
4. Once created, copy the **Internal Database URL** (e.g., `postgres://hospital_user:password@dpg-...-a/hospital_db`).

---

### Step 2: Deploy the Backend Web Service (Docker)
1. In the Render Dashboard, click **New +** > **Web Service**.
2. Select your repository.
3. Configure the service settings:
   - **Name**: `carepulse-hms-backend`
   - **Language / Runtime**: `Docker`
   - **Branch**: `main`
   - **Root Directory**: Leave blank (uses repository root)
   - **Dockerfile Path**: `./Dockerfile`
   - **Health Check Path**: `/api/health`
   - **Plan**: `Free`
4. Under **Environment Variables**, add the following:

| Key | Recommended Value | Description |
| :--- | :--- | :--- |
| `PORT` | `8080` | Port for the container (Render binds this dynamically) |
| `SPRING_PROFILES_ACTIVE` | `postgres` | Activates PostgreSQL datasource and Hibernate dialect |
| `DATABASE_URL` | `<Internal Database URL from Step 1>` | Render PostgreSQL connection string (auto-parsed into JDBC) |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:5173,https://*.onrender.com` | Allowed CORS origins for browser security |
| `APP_JWT_SECRET` | `404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970` | 256-bit Base64 signing key for JWT tokens |
| `APP_JWT_EXPIRATION_MS` | `86400000` | Token expiration time in milliseconds (24 hours) |

5. Click **Create Web Service**.
6. Wait for the build to complete and copy the deployed URL (e.g., `https://carepulse-hms-backend.onrender.com`).

---

### Step 3: Deploy the Frontend Static Site
1. In the Render Dashboard, click **New +** > **Static Site**.
2. Select your repository.
3. Configure the static site settings:
   - **Name**: `carepulse-hms-frontend`
   - **Branch**: `main`
   - **Root Directory**: Leave blank (uses repo root)
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `./frontend/dist`
4. Under **Redirects / Rewrites**, add an SPA routing rewrite rule:
   - **Type**: `Rewrite`
   - **Source**: `/*`
   - **Destination**: `/index.html`
   > *Note: This ensures refreshing on subroutes like `/patients`, `/doctors`, or `/admissions` does not return 404.*
5. Under **Environment Variables**, add:

| Key | Value | Description |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | `https://carepulse-hms-backend.onrender.com` | The URL of your deployed backend service from Step 2 |

6. Click **Create Static Site**.

---

## Default Demo Credentials

When launched on a clean PostgreSQL database, the built-in `DataInitializer` automatically provisions demo accounts and sample clinical data:

| Role | Username / Email | Password | Access Scope |
| :--- | :--- | :--- | :--- |
| **System Administrator** | `admin` | `admin123` | Full access to system, staff, settings, clinical modules |
| **Chief Medical Director** | `dr.chen` | `password123` | Full clinical workflow: patients, admissions, triage, surgery |
| **New Clinical Staff** | (Self Register) | (Custom) | Self-register via the Registration screen |

---

## Verification & Health Check Endpoints

Once deployed, you can verify each layer:

1. **Backend Health Probe**:
   ```http
   GET https://<your-backend>.onrender.com/api/health
   ```
   **Response**:
   ```json
   {
     "status": "UP",
     "service": "CarePulse HMS Backend API",
     "uptimeSeconds": 42,
     "timestamp": "2026-09-10T08:45:00Z"
   }
   ```

2. **Backend Authentication Verification**:
   ```http
   POST https://<your-backend>.onrender.com/api/auth/login
   Content-Type: application/json

   {
     "username": "dr.chen",
     "password": "password123"
   }
   ```

3. **Frontend Application**:
   - Open `https://<your-frontend>.onrender.com` in your browser.
   - Log in with `dr.chen` / `password123`.
   - Verify dashboard widgets, patient directory, doctors list, appointments, and admissions load.
   - Navigate to `/patients` and refresh the browser page to ensure the SPA rewrite works seamlessly without 404 errors.

---

## Cloud Features & Hardening Included

- **Smart URL Adapter (`DatabaseConfig.java`)**:
  Automatically accepts Render's `postgres://` or `postgresql://` environment variable, extracts credentials, and converts them to `jdbc:postgresql://...` without requiring manual JDBC parameter string manipulation.
- **Render Dynamic Port Binding**:
  Supports `server.port=${PORT:8085}`, automatically binding to whatever port Render dynamically assigns to the container.
- **CORS Pattern Matching (`CorsConfig.java`)**:
  Uses `setAllowedOriginPatterns` to safely support all Render subdomains (`https://*.onrender.com`) alongside `localhost` while keeping `AllowCredentials=true`.
- **Multi-Stage Dockerfile**:
  - Compiles with Maven 3.9.6 + Eclipse Temurin 17.
  - Runs in a minimal `eclipse-temurin:17-jre-jammy` runtime as an unprivileged non-root user `appuser` (UID 1001) for container security.
- **Zero-Downtime Health Check**:
  Includes dedicated `/api/health` endpoint configured in `render.yaml` for Render's service health monitor.
- **Cross-Database Entity Types**:
  Text fields configured with cross-platform `columnDefinition = "TEXT"` ensuring Hibernate auto-DDL generates clean PostgreSQL schema without syntax collisions.
