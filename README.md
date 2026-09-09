# CarePulse HMS - Enterprise Hospital Management System

A mission-critical Hospital Management System (HMS) built around the **CarePulse HMS** design system from Stitch. CarePulse provides real-time inpatient bed telemetry, outpatient appointment scheduling, automated pathology lab accessioning, formulary pharmacy dispensing, and revenue cycle management (RCM).

---

## 1. Technology Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS with custom clinical tokens (Inter font, Material Symbols Outlined, acuity badges, tabular metrics)
- **Routing**: React Router v6 (Protected routes, persistent layouts)
- **State & Networking**: Axios with JWT Bearer request interceptors & automatic 401 redirect, React Context API (`AuthContext`)

### Backend
- **Framework**: Spring Boot 3.2.3, Java 17
- **Security**: Spring Security 6 with stateless JWT authentication (`jjwt 0.11.5`), BCrypt password hashing, role-based authorization
- **Persistence**: Spring Data JPA / Hibernate (`ddl-auto: none`), Microsoft SQL Server JDBC Driver
- **Database Migrations**: Flyway (`org.flywaydb:flyway-core`, `flyway-sqlserver`)
- **Package Base**: `com.yourorg.appname`

### Database
- **Engine**: Microsoft SQL Server (MSSQL) 2019 / 2022 / Express or Azure SQL Database
- **Database Name**: `hospital_db`
- **Port**: `1433`

---

## 2. Directory Structure

```
Hospital_Project/
├── backend/
│   ├── pom.xml                                      # Spring Boot 3.2.3 build descriptor
│   └── src/
│       └── main/
│           ├── java/com/yourorg/appname/
│           │   ├── Application.java                 # Spring Boot Main Entrypoint
│           │   ├── config/                          # Security & CORS configuration
│           │   ├── controller/                      # 11 REST Controllers
│           │   ├── dto/                             # Request & Response DTOs
│           │   ├── entity/                          # 10 JPA Entities
│           │   ├── exception/                       # Global exception handler & error response
│           │   ├── mapper/                          # EntityDtoMapper
│           │   ├── repository/                      # JPA Repositories
│           │   ├── security/                        # JwtUtil, JwtAuthFilter, UserDetailsService
│           │   └── service/                         # Service interfaces & implementations
│           └── resources/
│               ├── application.properties           # Database, Flyway, JWT, & CORS properties
│               └── db/migration/
│                   ├── V1__init_schema.sql          # 10 MSSQL tables, FKs, indexes
│                   └── V2__seed_data.sql            # Realistic clinical seed data & accounts
├── database/
│   └── migrations/
│       ├── V1__init_schema.sql                      # Root migrations directory (mirrored)
│       └── V2__seed_data.sql
├── frontend/
│   ├── index.html                                   # Preconnected to Inter & Material Symbols
│   ├── package.json                                 # Vite, React 18, Tailwind, Lucide React
│   ├── vite.config.js                               # Port 5173 with proxy to backend :8080
│   ├── tailwind.config.js                           # Stitch clinical design tokens
│   └── src/
│       ├── components/
│       │   ├── common/                              # Modal, StatCard, StatusBadge
│       │   └── layout/                              # AppLayout, Header, Sidebar
│       ├── constants/                               # apiEndpoints.js, navigation.js
│       ├── context/                                 # AuthContext.jsx
│       ├── hooks/                                   # useAuth.js
│       ├── pages/                                   # 14 Clinical Module Pages
│       │   ├── Admissions/
│       │   ├── Appointments/
│       │   ├── Auth/
│       │   ├── Billing/
│       │   ├── Dashboard/
│       │   ├── Doctors/
│       │   ├── Laboratory/
│       │   ├── Logout/
│       │   ├── Notifications/
│       │   ├── Patients/
│       │   ├── Pharmacy/
│       │   ├── Reports/
│       │   ├── Settings/
│       │   └── Staff/
│       ├── routes/                                  # AppRoutes.jsx, ProtectedRoute.jsx
│       ├── services/                                # apiClient.js + 11 module API clients
│       └── utils/                                   # formatters.js, tokenStorage.js
└── README.md
```

---

## 3. Database Setup (Microsoft SQL Server)

CarePulse requires a running Microsoft SQL Server instance on port `1433`.

### Option A: Using Docker (Recommended for quick setup)

If Docker is installed on your machine, launch an MSSQL container with a single command:

```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=YourStrong@Passw0rd" \
   -p 1433:1433 --name carepulse-mssql --restart always \
   -d mcr.microsoft.com/mssql/server:2022-latest
```

Create the `hospital_db` database using `sqlcmd`:
```bash
docker exec -it carepulse-mssql /opt/mssql-tools18/bin/sqlcmd \
   -S localhost -U sa -P "YourStrong@Passw0rd" -C \
   -Q "CREATE DATABASE hospital_db;"
```

### Option B: Using Local SQL Server or SQL Server Express

1. Open **SQL Server Management Studio (SSMS)** or Azure Data Studio.
2. Connect to your SQL Server instance (e.g. `localhost` or `localhost\SQLEXPRESS`).
3. Ensure **SQL Server and Windows Authentication mode** is enabled (Mixed Mode Authentication) in Server Properties > Security.
4. Ensure TCP/IP protocol is enabled in **SQL Server Configuration Manager** under SQL Server Network Configuration > Protocols for MSSQLSERVER.
5. Create the database:
   ```sql
   CREATE DATABASE hospital_db;
   GO
   ```

### Option C: Configuring Database Credentials in Backend

Edit `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=hospital_db;encrypt=true;trustServerCertificate=true
spring.datasource.username=sa
spring.datasource.password=YourStrong@Passw0rd
spring.datasource.driver-class-name=com.microsoft.sqlserver.jdbc.SQLServerDriver
```

---

## 4. Running Flyway Migrations

Flyway is integrated into Spring Boot and runs **automatically** on application startup:
- `V1__init_schema.sql`: Creates all 10 core entities (`users`, `doctors`, `patients`, `appointments`, `admissions`, `lab_tests`, `medications`, `billings`, `staff_members`, `hospital_notifications`).
- `V2__seed_data.sql`: Seeds initial administrative accounts, doctors, patients, bed telemetry, lab tests, inventory, and invoices.

*(Optional)* If you prefer running migrations manually via Flyway CLI:
```bash
flyway -url="jdbc:sqlserver://localhost:1433;databaseName=hospital_db;encrypt=true;trustServerCertificate=true" \
       -user="sa" -password="YourStrong@Passw0rd" \
       -locations="filesystem:database/migrations" migrate
```

---

## 5. Running the Backend

### Prerequisites
- Java 17+ (Java 17, 21, or 25 LTS supported)
- Apache Maven (or run via IDE like IntelliJ IDEA / Eclipse / VS Code)

### Terminal Command:
```bash
cd backend
mvn clean spring-boot:run
```

The Spring Boot backend will start on **http://localhost:8080**.

---

## 6. Running the Frontend

### Prerequisites
- Node.js 18+ (tested on Node.js v24)
- npm

### Installation & Development Server:
```bash
cd frontend
npm install
npm run dev
```

The Vite dev server will start on **http://localhost:5173**.
The Vite server is preconfigured with a proxy that routes all `/api/**` calls directly to `http://localhost:8080`.

---

## 7. Default Credentials

The database migration pre-seeds the following clinical and administrative accounts:

| Username | Password | Role | Description |
| :--- | :--- | :--- | :--- |
| `dr.chen` | `password123` | `ROLE_DOCTOR` | **Dr. Elizabeth Chen, MD** — Chief Medical Director |
| `admin` | `admin123` | `ROLE_ADMIN` | **System Administrator** — Full Enterprise Access |

---

## 8. REST API Endpoints Overview

| Module | Endpoint | Methods | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | `/api/auth/login` | `POST` | Authenticate & obtain JWT Bearer token |
| | `/api/auth/register` | `POST` | Register new hospital personnel |
| | `/api/auth/me` | `GET` | Retrieve authenticated profile |
| **Dashboard** | `/api/dashboard/summary` | `GET` | 7-card KPI telemetry summary |
| **Patients** | `/api/patients` | `GET`, `POST` | Patient directory & new intake |
| | `/api/patients/{id}` | `GET`, `PUT`, `DELETE` | Specific patient profile |
| **Doctors** | `/api/doctors` | `GET`, `POST` | Physician roster & credentialing |
| | `/api/doctors/{id}/status` | `PATCH` | Update status (On Duty, In Surgery, etc.) |
| **Appointments** | `/api/appointments` | `GET`, `POST` | Master schedule & booking |
| | `/api/appointments/{id}/status` | `PATCH` | Update status (In Consultation, Completed) |
| **Admissions** | `/api/admissions` | `GET`, `POST` | Ward intake & bed allocation |
| | `/api/admissions/{id}/transfer` | `POST` | Transfer patient ward/bed |
| | `/api/admissions/{id}/discharge` | `POST` | Mark patient discharged |
| **Laboratory** | `/api/laboratory` | `GET`, `POST` | Diagnostic worklist & test orders |
| | `/api/laboratory/{id}/result` | `PATCH` | Enter result & verify to EHR |
| **Pharmacy** | `/api/pharmacy` | `GET`, `POST` | Medication catalog & formulary |
| | `/api/pharmacy/{id}/dispense` | `POST` | Dispense medication units |
| | `/api/pharmacy/{id}/stock` | `PATCH` | Update inventory stock level |
| **Billing** | `/api/billing` | `GET`, `POST` | Master invoicing ledger & create invoice |
| | `/api/billing/{id}/payment` | `POST` | Collect copay/payment |
| **Staff** | `/api/staff` | `GET`, `POST` | Personnel directory & shift scheduling |
| **Notifications**| `/api/notifications` | `GET` | Clinical alerts & trauma alarms |
| | `/api/notifications/{id}/read` | `PATCH` | Acknowledge alert |
| | `/api/notifications/mark-all-read` | `POST` | Mark all alerts read |

---

## 9. Security & HIPAA Compliance Architecture

- **Stateless Tokens**: JWT Bearer authentication with expiration and cryptographic HMAC-SHA256 signature verification.
- **Interceptors**: Axios automatically injects `Authorization: Bearer <token>` into all outgoing API requests.
- **Session Termination**: 401 Unauthorized responses trigger automatic cache invalidation and redirect to `/login`.
- **RBAC**: Endpoints are protected by Spring Security filters enforcing role authorization policies.
#   w e b - d e v e l o p m e n t - p r o j e c t  
 