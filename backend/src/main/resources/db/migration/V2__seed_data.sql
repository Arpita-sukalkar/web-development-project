-- ==============================================================================
-- CarePulse Enterprise HMS - Database Migration: V2__seed_data.sql
-- Realistic clinical data mirroring the Stitch UI design
-- ==============================================================================

-- 1. Insert Initial Users
-- Passwords:
-- admin / admin123 (BCrypt: $2a$10$GRLdNijSQMUvl/au9ofL.eDwmoohzzS7.rmNSJZ.0FxO/BTk76klW)
-- dr.chen / password123 (BCrypt: $2a$10$K9Wn0rUfLfx3bT90i8e6y.63B3q.rY5Cg0mKxP0E7Yd7Vf5N.3JzS)
IF NOT EXISTS (SELECT 1 FROM [dbo].[users] WHERE [username] = 'dr.chen')
BEGIN
    INSERT INTO [dbo].[users] ([username], [password_hash], [email], [full_name], [role], [title], [department], [avatar_url], [is_active])
    VALUES
    ('admin', '$2a$10$GRLdNijSQMUvl/au9ofL.eDwmoohzzS7.rmNSJZ.0FxO/BTk76klW', 'admin@carepulse-hms.org', 'System Administrator', 'ADMIN', 'Chief Systems Officer', 'Administration', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc-5FW2-kDj9vjWcFTbQeMtHsrUnFIUoEERp652okMy5k7lcbbUHhflp0WXKvD4BxIbar_3DrU2UH2boPh8j6LSAtdOY_u2vbsoQMj7bs1MSAs3WFK_jqYRJr3N5ZtSBEqHSz23VCJOJ4xssSPwFz0SiKDmmydbNqNqnLMBvyl7GzKugtzWqwXnKlUDTwaJKIDR3tKz8HrJwWmScogHyovtc-ur_HWPGTDRdWaTqkZJpRoLUJ2vfl3gQ', 1),
    ('dr.chen', '$2a$10$K9Wn0rUfLfx3bT90i8e6y.63B3q.rY5Cg0mKxP0E7Yd7Vf5N.3JzS', 'e.chen@carepulse-hms.org', 'Dr. Elizabeth Chen, MD', 'DOCTOR', 'Chief Medical Director', 'Trauma & Critical Care', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc-5FW2-kDj9vjWcFTbQeMtHsrUnFIUoEERp652okMy5k7lcbbUHhflp0WXKvD4BxIbar_3DrU2UH2boPh8j6LSAtdOY_u2vbsoQMj7bs1MSAs3WFK_jqYRJr3N5ZtSBEqHSz23VCJOJ4xssSPwFz0SiKDmmydbNqNqnLMBvyl7GzKugtzWqwXnKlUDTwaJKIDR3tKz8HrJwWmScogHyovtc-ur_HWPGTDRdWaTqkZJpRoLUJ2vfl3gQ', 1);
END
GO

-- 2. Insert Doctors
IF NOT EXISTS (SELECT 1 FROM [dbo].[doctors] WHERE [license_number] = 'LIC-MD-99210-MA')
BEGIN
    INSERT INTO [dbo].[doctors] ([license_number], [full_name], [specialty], [department], [ward], [qualifications], [status], [email], [phone], [avatar_url], [weekly_hours], [lifetime_patients], [success_rate], [today_appointments_count])
    VALUES
    ('LIC-MD-99210-MA', 'Dr. Marcus Vance, MD, FACC', 'Cardiology', 'Cardiovascular Sciences', 'Cath Lab • Ward 4A', 'Harvard Med • Johns Hopkins Fellow', 'IN_SURGERY', 'm.vance@carepulse-hms.org', '+1 (555) 392-4110', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc-5FW2-kDj9vjWcFTbQeMtHsrUnFIUoEERp652okMy5k7lcbbUHhflp0WXKvD4BxIbar_3DrU2UH2boPh8j6LSAtdOY_u2vbsoQMj7bs1MSAs3WFK_jqYRJr3N5ZtSBEqHSz23VCJOJ4xssSPwFz0SiKDmmydbNqNqnLMBvyl7GzKugtzWqwXnKlUDTwaJKIDR3tKz8HrJwWmScogHyovtc-ur_HWPGTDRdWaTqkZJpRoLUJ2vfl3gQ', 'Mon - Thu, 08:30 - 15:30', 3480, 99.40, 8),
    ('LIC-MD-88124-NY', 'Dr. Sarah Adams, MD', 'Cardiology', 'Cardiovascular Sciences', 'Ward 4B • Echo Lab', 'Stanford Medicine • Cleveland Clinic Fellow', 'IN_CONSULTATION', 's.adams@carepulse-hms.org', '+1 (555) 234-9011', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAL6_4gjQRjjqAuugwxzMb4FiO-z3-9QyZJoHmQo2YxIDGIzQK-CQUvmd9p3PgOpzWBmH8Lb_kt8A9tk3oaYen1ayOGHzvFxGp5BUi1TTIn2N7sERy149FpT_FrXZ31NhcjSFEkHb0ysifKcL5KBPAkfOmjBvzhAj-eoChf6KMWOfWInFekSG3hwUohoWiEFdRVHMIFWD8qQZDNCMPKmSKL0c17ZBdDXs5z-pfPhUAFwokhYGtq0JPTsw', 'Mon - Fri, 08:00 - 16:00', 2890, 98.80, 6),
    ('LIC-MD-77192-CA', 'Dr. Robert Reyes, MD', 'Orthopedics', 'Surgical Specialties', 'Surg Post-Op 2A', 'UCSF School of Medicine • Mayo Clinic Fellow', 'ON_DUTY', 'r.reyes@carepulse-hms.org', '+1 (555) 891-2345', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDq1G-UpvsRsPOkXIMNrjU5vt6hlToPEdDq6p3zuAjY60vQnFfMZDWILvGT5MZULXUValSgMUDyAZnVDgYyIv02I_DUG9vdqLt33_IhbIswMglfov_kV9HpmjWLiZcjd3zXjCpazp27Iazjd00_chXkaN3qnHdq5ppjK2OmENBmekYXFoEO8Px2FxuVVLmW94_6s6BVHmR0a_NpNNfdiahlJaS3tyyuwVAvz7jWYx-rmZUREY6LETGI7w', 'Tue - Sat, 07:30 - 15:30', 4120, 99.10, 5),
    ('LIC-MD-66231-IL', 'Dr. Maya Patel, MD', 'Pediatrics', 'Childrens Health Wing', 'Pediatric Wing 3C', 'Northwestern Feinberg • Boston Childrens', 'ON_DUTY', 'm.patel@carepulse-hms.org', '+1 (555) 782-9901', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBt3vwNeUOZKqGctrlLeb60F5A5qMI1mo5ycW3qURZoWkZpP5iF7TnY16jIBEbfAcCwG8m0Q8coYr04oSh37MKGCIOl-KQB3np01gW3a81mZl7H5LvRkIsfa-QXcqpaupy102VzLtGNRvQm6RAY5dIAB3l8nJEa8tfu5HWzk8Bn535pgnheCebfG4VlhVW0C74RWwknTE6iDb7JrQxbefGhUHbxnZDFLBrhfKlAd4C-94odLFGsQLJR5Q', 'Mon - Fri, 09:00 - 17:00', 1950, 99.60, 7),
    ('LIC-MD-55410-TX', 'Dr. Julian Vance, MD', 'Neurology', 'Neuroscience Institute', 'Neuro Suite 5B', 'Columbia P&S • MGH Fellow', 'ON_DUTY', 'j.vance@carepulse-hms.org', '+1 (555) 432-1100', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmsuYwcwfhKY5-RzfkGkimLkxs5WbGQgSE9j5qmlM0N-Y-Eprs-05KuYsx4ilUrvfyg75ZTO5JJk_uyf9p2djiK0jW_q8I86cQ58L0WyrgyiImTPh0Hm4aNFb019JTw4RNendTDeHpdWvzA5ZnBmXqSJH2sA9dQh6rXw8y5OGVBQLipaEHplk9qicBDu5EEzDclQqOoG2hpGF_DrsMF6j8NtrPupQU_i-8emsQw3B8Fcy1XeUYUXiM5w', 'Mon - Thu, 09:00 - 16:30', 2140, 98.20, 4),
    ('LIC-MD-44321-WA', 'Dr. Kenneth Wu, MD', 'Oncology', 'Comprehensive Cancer Center', 'Oncology Wing 6A', 'Penn Med • Memorial Sloan Kettering', 'ON_DUTY', 'k.wu@carepulse-hms.org', '+1 (555) 678-2231', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuweab9W_fojYbjK9yElg3AiVnv54SfPoE0J3j1U_LbYYbw9Dkss_gzRgg53aG-QPoQzjqGfgKqM2GntdhKtI6KMbiMEDUIdEi6TKNcNxfHUfPnEb90yvV9YlGiZC9xfhysMo_8IuXrJhh9EYAtXaCRLCNO2jePOHByMuXsqXbj1910etW81e1Py9NcidJcQVcprLF6JU1311Jj9CQn9dP4H0cQ4ukXv4vgOQMqwc9RtjXpT2FdMbc1g', 'Mon - Fri, 08:30 - 16:00', 3100, 97.90, 4);
END
GO

-- 3. Insert Patients
IF NOT EXISTS (SELECT 1 FROM [dbo].[patients] WHERE [mrn] = 'MRN-89421')
BEGIN
    INSERT INTO [dbo].[patients] ([mrn], [full_name], [national_id], [date_of_birth], [gender], [blood_group], [contact_number], [emergency_contact_name], [residential_address], [insurance_carrier], [policy_id], [department], [assigned_doctor_id], [care_status], [admission_date], [bed_number], [triage_notes])
    VALUES
    ('MRN-89421', 'Arthur Pendelton', 'SSN-982-12-8821', '1956-04-12', 'Male', 'O+', '+1 (555) 234-8901', 'Martha Pendelton (Spouse)', '142 Elm Street, Boston, MA 02108', 'Medicare Part A/B', 'MED-GOLD-9921', 'Cardiology', 1, 'INPATIENT', DATEADD(day, -3, SYSUTCDATETIME()), 'Bed 302-B', 'Admitted with unstable angina. Telemetry continuous monitoring active.'),
    ('MRN-89422', 'Elena Morales-Rios', 'SSN-881-43-1290', '1982-08-23', 'Female', 'A+', '+1 (555) 489-3321', 'Carlos Morales (Brother)', '78 Beacon Ave, Cambridge, MA 02138', 'Blue Cross Blue Shield', 'BCBS-44210', 'Neurology', 5, 'OUTPATIENT', DATEADD(day, -1, SYSUTCDATETIME()), 'OPD Wing B', 'Referred for recurrent migraine episodes and aura. EEG scheduled.'),
    ('MRN-89423', 'Tariq Al-Mansoor', 'SSN-773-90-5512', '1995-11-04', 'Male', 'B-', '+1 (555) 712-4099', 'Layla Al-Mansoor (Mother)', '504 Commonwealth Ave, Boston, MA 02215', 'Aetna Healthcare', 'AET-PREM-88', 'Trauma Emergency', 1, 'CRITICAL_ICU', DATEADD(hour, -8, SYSUTCDATETIME()), 'ICU Bed 04', 'Severe trauma following motor collision. Immediate arterial blood gas requested.'),
    ('MRN-90214', 'Eleanor Vance', 'SSN-662-81-3321', '1951-02-18', 'Female', 'O+', '+1 (555) 902-1144', 'Julian Vance (Son)', '90 Chestnut Hill, Newton, MA 02467', 'UnitedHealthcare', 'UHC-SENIOR-1', 'Cardiology', 2, 'OUTPATIENT', DATEADD(hour, -2, SYSUTCDATETIME()), NULL, 'Post-echocardiogram consult. EF estimated 55%. Medications adjusted.'),
    ('MRN-88412', 'Marcus Brody', 'SSN-554-21-9981', '1992-06-15', 'Male', 'A-', '+1 (555) 671-8842', 'Sarah Brody (Spouse)', '33 River St, Somerville, MA 02143', 'Kaiser Permanente', 'KP-ACTIVE-302', 'Orthopedics', 3, 'OUTPATIENT', DATEADD(hour, -1, SYSUTCDATETIME()), NULL, 'Post-op 4-week cast evaluation. Tibial fracture healing favorably.'),
    ('MRN-72301', 'Grace Henderson', 'SSN-441-99-4412', '1975-09-30', 'Female', 'B+', '+1 (555) 819-2234', 'David Henderson (Spouse)', '12 Harvard St, Brookline, MA 02446', 'Blue Cross Blue Shield', 'BCBS-88912', 'Neurology', 5, 'OBSERVATION', DATEADD(hour, -4, SYSUTCDATETIME()), 'Gen Ward 4B-12', 'Observation for transient focal neurological deficit. MRI Brain scheduled.'),
    ('MRN-43198', 'Arthur Liu', 'SSN-332-11-8843', '2016-12-01', 'Male', 'O-', '+1 (555) 431-9800', 'Mei Liu (Mother)', '45 Boylston St, Boston, MA 02116', 'Self-Pay / Direct Bill', 'DIR-99120', 'Pediatrics', 4, 'OUTPATIENT', DATEADD(hour, -1, SYSUTCDATETIME()), NULL, 'Annual well-child pediatric examination and immunization review.');
END
GO

-- 4. Insert Appointments
IF NOT EXISTS (SELECT 1 FROM [dbo].[appointments] WHERE [appointment_number] = 'APT-2024-001')
BEGIN
    INSERT INTO [dbo].[appointments] ([appointment_number], [patient_id], [doctor_id], [department], [appointment_date_time], [appointment_type], [status], [duration_minutes], [reason_notes])
    VALUES
    ('APT-2024-001', 4, 2, 'Cardiology', DATEADD(minute, -30, SYSUTCDATETIME()), 'Echo Follow-up', 'IN_CONSULT', 30, 'Review 2D-Echo and discuss beta blocker titration.'),
    ('APT-2024-002', 5, 3, 'Orthopedics', DATEADD(minute, -15, SYSUTCDATETIME()), 'Post-Op Cast Check', 'CHECKED_IN', 25, 'Evaluate cast comfort and verify distal pulse.'),
    ('APT-2024-003', 6, 5, 'Neurology', DATEADD(minute, 30, SYSUTCDATETIME()), 'EEG Review', 'SCHEDULED', 45, 'Interpret outpatient 24-hour ambulatory EEG recording.'),
    ('APT-2024-004', 7, 4, 'Pediatrics', DATEADD(minute, 60, SYSUTCDATETIME()), 'Annual Well Check', 'SCHEDULED', 30, 'Growth chart percentile analysis and seasonal flu vaccine.');
END
GO

-- 5. Insert Admissions
IF NOT EXISTS (SELECT 1 FROM [dbo].[admissions] WHERE [admission_number] = 'ADM-2024-101')
BEGIN
    INSERT INTO [dbo].[admissions] ([admission_number], [patient_id], [ward], [bed_number], [admission_date_time], [triage_acuity], [attending_doctor_id], [status], [diagnosis])
    VALUES
    ('ADM-2024-101', 3, 'ICU & Critical Care', 'ICU Bed 03', DATEADD(minute, -45, SYSUTCDATETIME()), 'IMMEDIATE', 1, 'ADMITTED', 'Acute Polytrauma, Hemodynamic instability'),
    ('ADM-2024-102', 1, 'General Medical Ward', 'Bed 302-B', DATEADD(day, -3, SYSUTCDATETIME()), 'STANDARD', 1, 'ADMITTED', 'Unstable Angina Pectoris'),
    ('ADM-2024-103', 6, 'Emergency Ward (ER)', 'ER Bay 06', DATEADD(minute, -90, SYSUTCDATETIME()), 'URGENT', 5, 'ADMITTED', 'Transient Ischemic Attack protocol');
END
GO

-- 6. Insert Laboratory Tests
IF NOT EXISTS (SELECT 1 FROM [dbo].[lab_tests] WHERE [test_code] = 'LAB-8021')
BEGIN
    INSERT INTO [dbo].[lab_tests] ([test_code], [test_name], [category], [patient_id], [doctor_id], [priority], [sample_collection_time], [status], [result_summary], [reference_range], [unit])
    VALUES
    ('LAB-8021', 'Arterial Blood Gas (ABG)', 'Biochemistry', 3, 1, 'STAT_IMMEDIATE', DATEADD(minute, -25, SYSUTCDATETIME()), 'IN_PROGRESS', 'Sample incubating in analyzer. pH 7.31, pCO2 48', 'pH 7.35 - 7.45', 'pH units'),
    ('LAB-8022', 'High-Sensitivity Troponin I', 'Biochemistry', 1, 2, 'URGENT', DATEADD(hour, -2, SYSUTCDATETIME()), 'COMPLETED', '0.08 ng/mL (Mildly elevated, trend down from 0.14)', '< 0.04', 'ng/mL'),
    ('LAB-8023', 'Complete Blood Count (CBC)', 'Hematology', 4, 2, 'ROUTINE', DATEADD(day, -1, SYSUTCDATETIME()), 'COMPLETED', 'WBC: 6.8, Hgb: 13.2 g/dL, Platelets: 240k', 'Normal indices', 'k/uL'),
    ('LAB-8024', 'Comprehensive Metabolic Panel', 'Biochemistry', 6, 5, 'URGENT', DATEADD(hour, -3, SYSUTCDATETIME()), 'PENDING', 'Awaiting laboratory technician processing', 'Standard ranges', 'mg/dL');
END
GO

-- 7. Insert Medications
IF NOT EXISTS (SELECT 1 FROM [dbo].[medications] WHERE [drug_code] = 'MED-RX-101')
BEGIN
    INSERT INTO [dbo].[medications] ([drug_code], [name], [generic_name], [category], [dosage_form], [strength], [stock_quantity], [reorder_level], [unit_price], [batch_number], [expiry_date], [manufacturer])
    VALUES
    ('MED-RX-101', 'Lipitor', 'Atorvastatin Calcium', 'Cardiovascular', 'Tablet', '20mg', 840, 150, 1.45, 'LOT-88219', '2026-12-31', 'Pfizer Inc.'),
    ('MED-RX-102', 'Amoxil', 'Amoxicillin Trihydrate', 'Antibiotic', 'Capsule', '500mg', 320, 100, 0.85, 'LOT-77142', '2025-10-15', 'GlaxoSmithKline'),
    ('MED-RX-103', 'EpiPen Auto-Injector', 'Epinephrine', 'Emergency', 'Injection', '0.3mg', 28, 50, 65.00, 'LOT-99214', '2025-06-30', 'Mylan Specialty'),
    ('MED-RX-104', 'Metoprolol Tartrate', 'Metoprolol', 'Cardiovascular', 'Tablet', '50mg', 620, 120, 0.65, 'LOT-66183', '2026-08-31', 'Novartis'),
    ('MED-RX-105', 'Ceftriaxone IV', 'Ceftriaxone Sodium', 'Antibiotic', 'IV Infusion', '1g Vial', 140, 80, 14.20, 'LOT-55102', '2025-12-01', 'Roche');
END
GO

-- 8. Insert Billings
IF NOT EXISTS (SELECT 1 FROM [dbo].[billings] WHERE [invoice_number] = 'INV-2024-8841')
BEGIN
    INSERT INTO [dbo].[billings] ([invoice_number], [patient_id], [invoice_date], [due_date], [total_amount], [insurance_covered], [patient_paid], [balance_due], [payment_status], [payment_method], [notes])
    VALUES
    ('INV-2024-8841', 1, DATEADD(day, -2, SYSUTCDATETIME()), DATEADD(day, 28, SYSUTCDATETIME()), 14200.00, 12400.00, 1800.00, 0.00, 'PAID', 'Insurance Claim', 'Inpatient cardiac stay & telemetry. Fully settled.'),
    ('INV-2024-8842', 4, DATEADD(day, -1, SYSUTCDATETIME()), DATEADD(day, 29, SYSUTCDATETIME()), 1850.00, 1500.00, 0.00, 350.00, 'PENDING', 'Credit Card', 'Diagnostic Echocardiography and physician consultation.'),
    ('INV-2024-8843', 5, DATEADD(day, -4, SYSUTCDATETIME()), DATEADD(day, 26, SYSUTCDATETIME()), 3400.00, 2800.00, 300.00, 300.00, 'PARTIAL', 'Credit Card', 'Orthopedic surgical follow-up and radiological casting.');
END
GO

-- 9. Insert Staff Members
IF NOT EXISTS (SELECT 1 FROM [dbo].[staff_members] WHERE [employee_id] = 'EMP-1049')
BEGIN
    INSERT INTO [dbo].[staff_members] ([employee_id], [full_name], [role_title], [department], [shift_schedule], [contact_number], [email], [status])
    VALUES
    ('EMP-1049', 'Angela Martinez, RN', 'Head Nurse ICU', 'Critical Care', 'Morning 08:00 - 16:00', '+1 (555) 219-4820', 'a.martinez@carepulse-hms.org', 'ACTIVE'),
    ('EMP-1050', 'David Washington, RPh', 'Lead Pharmacist', 'Pharmacy Dispensation', 'Morning 08:00 - 16:00', '+1 (555) 349-1123', 'd.washington@carepulse-hms.org', 'ACTIVE'),
    ('EMP-1051', 'Chloe Zhao, MLS', 'Senior Medical Technologist', 'Laboratory Pathology', 'Evening 16:00 - 00:00', '+1 (555) 489-7721', 'c.zhao@carepulse-hms.org', 'ACTIVE'),
    ('EMP-1052', 'Carlos Delgado', 'Triage Registrar', 'Emergency Admissions', 'Morning 08:00 - 16:00', '+1 (555) 781-9922', 'c.delgado@carepulse-hms.org', 'ACTIVE');
END
GO

-- 10. Insert Hospital Notifications
IF NOT EXISTS (SELECT 1 FROM [dbo].[hospital_notifications] WHERE [title] = 'TRAUMA ALERT: Trauma Bay 3')
BEGIN
    INSERT INTO [dbo].[hospital_notifications] ([title], [message], [notification_type], [target_department], [priority], [is_read])
    VALUES
    ('TRAUMA ALERT: Trauma Bay 3', 'Paramedic Unit 4 incoming (ETA 4 min). Polytrauma male acuity code 1.', 'TRAUMA_ALERT', 'Trauma & Emergency', 'CRITICAL', 0),
    ('Urgent Lab Alert', 'Arterial Blood Gas for Patient #MRN-89423 requires critical review.', 'URGENT_LAB', 'ICU & Critical Care', 'HIGH', 0),
    ('Pharmacy Low Stock Alert', 'Epinephrine 0.3mg Auto-Injectors have fallen below safe threshold (28 remaining).', 'LOW_STOCK', 'Pharmacy', 'HIGH', 0),
    ('Census Milestone', 'Inpatient occupancy reaches 88.6%. Bed coordination committee alerted.', 'SYSTEM', 'All Departments', 'MEDIUM', 1);
END
GO
