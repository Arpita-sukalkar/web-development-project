-- ==============================================================================
-- CarePulse Enterprise HMS - Database Migration: V1__init_schema.sql
-- Target Database: Microsoft SQL Server (MSSQL 2017+)
-- ==============================================================================

-- 1. Users Table (Authentication & Clinical Staff Accounts)
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[users]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[users] (
        [id] BIGINT IDENTITY(1,1) NOT NULL,
        [username] NVARCHAR(50) NOT NULL UNIQUE,
        [password_hash] NVARCHAR(255) NOT NULL,
        [email] NVARCHAR(100) NOT NULL UNIQUE,
        [full_name] NVARCHAR(100) NOT NULL,
        [role] NVARCHAR(50) NOT NULL DEFAULT 'DOCTOR',
        [title] NVARCHAR(100) NULL,
        [department] NVARCHAR(100) NULL,
        [avatar_url] NVARCHAR(500) NULL,
        [is_active] BIT NOT NULL DEFAULT 1,
        [created_at] DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        [updated_at] DATETIME2 NULL,
        CONSTRAINT [PK_users] PRIMARY KEY CLUSTERED ([id] ASC)
    );
    CREATE NONCLUSTERED INDEX [IX_users_username] ON [dbo].[users]([username] ASC);
    CREATE NONCLUSTERED INDEX [IX_users_email] ON [dbo].[users]([email] ASC);
END
GO

-- 2. Doctors Table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[doctors]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[doctors] (
        [id] BIGINT IDENTITY(1,1) NOT NULL,
        [user_id] BIGINT NULL,
        [license_number] NVARCHAR(50) NOT NULL UNIQUE,
        [full_name] NVARCHAR(100) NOT NULL,
        [specialty] NVARCHAR(100) NOT NULL,
        [department] NVARCHAR(100) NOT NULL,
        [ward] NVARCHAR(100) NULL,
        [qualifications] NVARCHAR(255) NULL,
        [status] NVARCHAR(50) NOT NULL DEFAULT 'ON_DUTY',
        [email] NVARCHAR(100) NOT NULL,
        [phone] NVARCHAR(50) NOT NULL,
        [avatar_url] NVARCHAR(500) NULL,
        [weekly_hours] NVARCHAR(100) NULL,
        [lifetime_patients] INT NOT NULL DEFAULT 0,
        [success_rate] DECIMAL(5,2) NOT NULL DEFAULT 98.50,
        [today_appointments_count] INT NOT NULL DEFAULT 0,
        [created_at] DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        [updated_at] DATETIME2 NULL,
        CONSTRAINT [PK_doctors] PRIMARY KEY CLUSTERED ([id] ASC),
        CONSTRAINT [FK_doctors_users] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE SET NULL
    );
    CREATE NONCLUSTERED INDEX [IX_doctors_specialty] ON [dbo].[doctors]([specialty] ASC);
    CREATE NONCLUSTERED INDEX [IX_doctors_status] ON [dbo].[doctors]([status] ASC);
END
GO

-- 3. Patients Table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[patients]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[patients] (
        [id] BIGINT IDENTITY(1,1) NOT NULL,
        [mrn] NVARCHAR(50) NOT NULL UNIQUE,
        [full_name] NVARCHAR(100) NOT NULL,
        [national_id] NVARCHAR(50) NOT NULL,
        [date_of_birth] DATE NOT NULL,
        [gender] NVARCHAR(20) NOT NULL,
        [blood_group] NVARCHAR(10) NOT NULL,
        [contact_number] NVARCHAR(50) NOT NULL,
        [emergency_contact_name] NVARCHAR(100) NULL,
        [emergency_contact_phone] NVARCHAR(50) NULL,
        [residential_address] NVARCHAR(255) NULL,
        [insurance_carrier] NVARCHAR(100) NULL,
        [policy_id] NVARCHAR(100) NULL,
        [department] NVARCHAR(100) NOT NULL,
        [assigned_doctor_id] BIGINT NULL,
        [care_status] NVARCHAR(50) NOT NULL DEFAULT 'INPATIENT',
        [admission_date] DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        [discharge_date] DATETIME2 NULL,
        [bed_number] NVARCHAR(50) NULL,
        [triage_notes] NVARCHAR(MAX) NULL,
        [avatar_url] NVARCHAR(500) NULL,
        [is_active] BIT NOT NULL DEFAULT 1,
        [created_at] DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        [updated_at] DATETIME2 NULL,
        CONSTRAINT [PK_patients] PRIMARY KEY CLUSTERED ([id] ASC),
        CONSTRAINT [FK_patients_doctors] FOREIGN KEY ([assigned_doctor_id]) REFERENCES [dbo].[doctors]([id]) ON DELETE SET NULL
    );
    CREATE NONCLUSTERED INDEX [IX_patients_mrn] ON [dbo].[patients]([mrn] ASC);
    CREATE NONCLUSTERED INDEX [IX_patients_care_status] ON [dbo].[patients]([care_status] ASC);
    CREATE NONCLUSTERED INDEX [IX_patients_department] ON [dbo].[patients]([department] ASC);
END
GO

-- 4. Appointments Table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[appointments]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[appointments] (
        [id] BIGINT IDENTITY(1,1) NOT NULL,
        [appointment_number] NVARCHAR(50) NOT NULL UNIQUE,
        [patient_id] BIGINT NOT NULL,
        [doctor_id] BIGINT NOT NULL,
        [department] NVARCHAR(100) NOT NULL,
        [appointment_date_time] DATETIME2 NOT NULL,
        [appointment_type] NVARCHAR(100) NOT NULL,
        [status] NVARCHAR(50) NOT NULL DEFAULT 'SCHEDULED',
        [duration_minutes] INT NOT NULL DEFAULT 30,
        [reason_notes] NVARCHAR(500) NULL,
        [created_at] DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        [updated_at] DATETIME2 NULL,
        CONSTRAINT [PK_appointments] PRIMARY KEY CLUSTERED ([id] ASC),
        CONSTRAINT [FK_appointments_patients] FOREIGN KEY ([patient_id]) REFERENCES [dbo].[patients]([id]) ON DELETE NO ACTION,
        CONSTRAINT [FK_appointments_doctors] FOREIGN KEY ([doctor_id]) REFERENCES [dbo].[doctors]([id]) ON DELETE NO ACTION
    );
    CREATE NONCLUSTERED INDEX [IX_appointments_date_time] ON [dbo].[appointments]([appointment_date_time] ASC);
    CREATE NONCLUSTERED INDEX [IX_appointments_status] ON [dbo].[appointments]([status] ASC);
END
GO

-- 5. Admissions & Bed Allocations Table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[admissions]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[admissions] (
        [id] BIGINT IDENTITY(1,1) NOT NULL,
        [admission_number] NVARCHAR(50) NOT NULL UNIQUE,
        [patient_id] BIGINT NOT NULL,
        [ward] NVARCHAR(100) NOT NULL,
        [bed_number] NVARCHAR(50) NOT NULL,
        [admission_date_time] DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        [discharge_date_time] DATETIME2 NULL,
        [triage_acuity] NVARCHAR(50) NOT NULL DEFAULT 'STANDARD',
        [attending_doctor_id] BIGINT NULL,
        [status] NVARCHAR(50) NOT NULL DEFAULT 'ADMITTED',
        [diagnosis] NVARCHAR(255) NULL,
        [created_at] DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        [updated_at] DATETIME2 NULL,
        CONSTRAINT [PK_admissions] PRIMARY KEY CLUSTERED ([id] ASC),
        CONSTRAINT [FK_admissions_patients] FOREIGN KEY ([patient_id]) REFERENCES [dbo].[patients]([id]) ON DELETE NO ACTION,
        CONSTRAINT [FK_admissions_doctors] FOREIGN KEY ([attending_doctor_id]) REFERENCES [dbo].[doctors]([id]) ON DELETE SET NULL
    );
    CREATE NONCLUSTERED INDEX [IX_admissions_status] ON [dbo].[admissions]([status] ASC);
    CREATE NONCLUSTERED INDEX [IX_admissions_ward] ON [dbo].[admissions]([ward] ASC);
END
GO

-- 6. Laboratory Orders & Tests Table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[lab_tests]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[lab_tests] (
        [id] BIGINT IDENTITY(1,1) NOT NULL,
        [test_code] NVARCHAR(50) NOT NULL UNIQUE,
        [test_name] NVARCHAR(150) NOT NULL,
        [category] NVARCHAR(100) NOT NULL,
        [patient_id] BIGINT NOT NULL,
        [doctor_id] BIGINT NOT NULL,
        [priority] NVARCHAR(50) NOT NULL DEFAULT 'ROUTINE',
        [sample_collection_time] DATETIME2 NULL,
        [status] NVARCHAR(50) NOT NULL DEFAULT 'PENDING',
        [result_summary] NVARCHAR(MAX) NULL,
        [reference_range] NVARCHAR(255) NULL,
        [unit] NVARCHAR(50) NULL,
        [completed_at] DATETIME2 NULL,
        [created_at] DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        [updated_at] DATETIME2 NULL,
        CONSTRAINT [PK_lab_tests] PRIMARY KEY CLUSTERED ([id] ASC),
        CONSTRAINT [FK_lab_tests_patients] FOREIGN KEY ([patient_id]) REFERENCES [dbo].[patients]([id]) ON DELETE NO ACTION,
        CONSTRAINT [FK_lab_tests_doctors] FOREIGN KEY ([doctor_id]) REFERENCES [dbo].[doctors]([id]) ON DELETE NO ACTION
    );
    CREATE NONCLUSTERED INDEX [IX_lab_tests_status] ON [dbo].[lab_tests]([status] ASC);
    CREATE NONCLUSTERED INDEX [IX_lab_tests_priority] ON [dbo].[lab_tests]([priority] ASC);
END
GO

-- 7. Pharmacy Inventory & Medications Table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[medications]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[medications] (
        [id] BIGINT IDENTITY(1,1) NOT NULL,
        [drug_code] NVARCHAR(50) NOT NULL UNIQUE,
        [name] NVARCHAR(150) NOT NULL,
        [generic_name] NVARCHAR(150) NOT NULL,
        [category] NVARCHAR(100) NOT NULL,
        [dosage_form] NVARCHAR(50) NOT NULL,
        [strength] NVARCHAR(50) NOT NULL,
        [stock_quantity] INT NOT NULL DEFAULT 0,
        [reorder_level] INT NOT NULL DEFAULT 50,
        [unit_price] DECIMAL(10,2) NOT NULL DEFAULT 0.00,
        [batch_number] NVARCHAR(50) NULL,
        [expiry_date] DATE NOT NULL,
        [manufacturer] NVARCHAR(100) NULL,
        [created_at] DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        [updated_at] DATETIME2 NULL,
        CONSTRAINT [PK_medications] PRIMARY KEY CLUSTERED ([id] ASC)
    );
    CREATE NONCLUSTERED INDEX [IX_medications_drug_code] ON [dbo].[medications]([drug_code] ASC);
    CREATE NONCLUSTERED INDEX [IX_medications_category] ON [dbo].[medications]([category] ASC);
END
GO

-- 8. Billing & Invoices Table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[billings]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[billings] (
        [id] BIGINT IDENTITY(1,1) NOT NULL,
        [invoice_number] NVARCHAR(50) NOT NULL UNIQUE,
        [patient_id] BIGINT NOT NULL,
        [invoice_date] DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        [due_date] DATETIME2 NOT NULL,
        [total_amount] DECIMAL(12,2) NOT NULL DEFAULT 0.00,
        [insurance_covered] DECIMAL(12,2) NOT NULL DEFAULT 0.00,
        [patient_paid] DECIMAL(12,2) NOT NULL DEFAULT 0.00,
        [balance_due] DECIMAL(12,2) NOT NULL DEFAULT 0.00,
        [payment_status] NVARCHAR(50) NOT NULL DEFAULT 'PENDING',
        [payment_method] NVARCHAR(50) NULL,
        [notes] NVARCHAR(500) NULL,
        [created_at] DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        [updated_at] DATETIME2 NULL,
        CONSTRAINT [PK_billings] PRIMARY KEY CLUSTERED ([id] ASC),
        CONSTRAINT [FK_billings_patients] FOREIGN KEY ([patient_id]) REFERENCES [dbo].[patients]([id]) ON DELETE NO ACTION
    );
    CREATE NONCLUSTERED INDEX [IX_billings_invoice_number] ON [dbo].[billings]([invoice_number] ASC);
    CREATE NONCLUSTERED INDEX [IX_billings_payment_status] ON [dbo].[billings]([payment_status] ASC);
END
GO

-- 9. Staff Members & Duty Rota Table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[staff_members]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[staff_members] (
        [id] BIGINT IDENTITY(1,1) NOT NULL,
        [employee_id] NVARCHAR(50) NOT NULL UNIQUE,
        [full_name] NVARCHAR(100) NOT NULL,
        [role_title] NVARCHAR(100) NOT NULL,
        [department] NVARCHAR(100) NOT NULL,
        [shift_schedule] NVARCHAR(100) NOT NULL,
        [contact_number] NVARCHAR(50) NOT NULL,
        [email] NVARCHAR(100) NOT NULL,
        [status] NVARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
        [avatar_url] NVARCHAR(500) NULL,
        [created_at] DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        [updated_at] DATETIME2 NULL,
        CONSTRAINT [PK_staff_members] PRIMARY KEY CLUSTERED ([id] ASC)
    );
    CREATE NONCLUSTERED INDEX [IX_staff_department] ON [dbo].[staff_members]([department] ASC);
    CREATE NONCLUSTERED INDEX [IX_staff_status] ON [dbo].[staff_members]([status] ASC);
END
GO

-- 10. Hospital Notifications & Trauma Alerts Table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[hospital_notifications]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[hospital_notifications] (
        [id] BIGINT IDENTITY(1,1) NOT NULL,
        [title] NVARCHAR(150) NOT NULL,
        [message] NVARCHAR(500) NOT NULL,
        [notification_type] NVARCHAR(50) NOT NULL DEFAULT 'INFO',
        [target_department] NVARCHAR(100) NULL,
        [priority] NVARCHAR(50) NOT NULL DEFAULT 'MEDIUM',
        [is_read] BIT NOT NULL DEFAULT 0,
        [created_at] DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT [PK_hospital_notifications] PRIMARY KEY CLUSTERED ([id] ASC)
    );
    CREATE NONCLUSTERED INDEX [IX_notifications_priority] ON [dbo].[hospital_notifications]([priority] ASC);
    CREATE NONCLUSTERED INDEX [IX_notifications_is_read] ON [dbo].[hospital_notifications]([is_read] ASC);
END
GO
