package com.yourorg.appname.config;

import com.yourorg.appname.entity.*;
import com.yourorg.appname.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Automatically seeds initial administrative accounts, clinical staff, patients,
 * and hospital records when running on a fresh PostgreSQL database (e.g. Render).
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;
    private final AdmissionRepository admissionRepository;
    private final LabTestRepository labTestRepository;
    private final MedicationRepository medicationRepository;
    private final BillingRepository billingRepository;
    private final StaffRepository staffRepository;
    private final HospitalNotificationRepository notificationRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           DoctorRepository doctorRepository,
                           PatientRepository patientRepository,
                           AppointmentRepository appointmentRepository,
                           AdmissionRepository admissionRepository,
                           LabTestRepository labTestRepository,
                           MedicationRepository medicationRepository,
                           BillingRepository billingRepository,
                           StaffRepository staffRepository,
                           HospitalNotificationRepository notificationRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
        this.appointmentRepository = appointmentRepository;
        this.admissionRepository = admissionRepository;
        this.labTestRepository = labTestRepository;
        this.medicationRepository = medicationRepository;
        this.billingRepository = billingRepository;
        this.staffRepository = staffRepository;
        this.notificationRepository = notificationRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            log.info("Database already contains users. Skipping initial seed.");
            return;
        }

        log.info("Fresh database detected. Seeding clinical and administrative records...");

        // 1. Initial Users
        User admin = userRepository.save(User.builder()
                .username("admin")
                .passwordHash(passwordEncoder.encode("admin123"))
                .email("admin@carepulse-hms.org")
                .fullName("System Administrator")
                .role("ADMIN")
                .title("Chief Systems Officer")
                .department("Administration")
                .avatarUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250")
                .active(true)
                .build());

        User drChenUser = userRepository.save(User.builder()
                .username("dr.chen")
                .passwordHash(passwordEncoder.encode("password123"))
                .email("e.chen@carepulse-hms.org")
                .fullName("Dr. Elizabeth Chen, MD")
                .role("DOCTOR")
                .title("Chief Medical Director")
                .department("Trauma & Critical Care")
                .avatarUrl("https://images.unsplash.com/photo-1594824813637-013063462947?auto=format&fit=crop&q=80&w=250")
                .active(true)
                .build());

        // 2. Doctors
        Doctor docVance = doctorRepository.save(Doctor.builder()
                .licenseNumber("LIC-MD-99210-MA")
                .fullName("Dr. Marcus Vance, MD, FACC")
                .specialty("Cardiology")
                .department("Cardiovascular Sciences")
                .ward("Cath Lab • Ward 4A")
                .qualifications("Harvard Med • Johns Hopkins Fellow")
                .status("IN_SURGERY")
                .email("m.vance@carepulse-hms.org")
                .phone("+1 (555) 392-4110")
                .avatarUrl("https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=250")
                .weeklyHours("Mon - Thu, 08:30 - 15:30")
                .lifetimePatients(3480)
                .successRate(BigDecimal.valueOf(99.40))
                .todayAppointmentsCount(8)
                .build());

        Doctor docAdams = doctorRepository.save(Doctor.builder()
                .licenseNumber("LIC-MD-88124-NY")
                .fullName("Dr. Sarah Adams, MD")
                .specialty("Cardiology")
                .department("Cardiovascular Sciences")
                .ward("Ward 4B • Echo Lab")
                .qualifications("Stanford Medicine • Cleveland Clinic Fellow")
                .status("IN_CONSULTATION")
                .email("s.adams@carepulse-hms.org")
                .phone("+1 (555) 234-9011")
                .avatarUrl("https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=250")
                .weeklyHours("Mon - Fri, 08:00 - 16:00")
                .lifetimePatients(2890)
                .successRate(BigDecimal.valueOf(98.80))
                .todayAppointmentsCount(6)
                .build());

        Doctor docReyes = doctorRepository.save(Doctor.builder()
                .licenseNumber("LIC-MD-77192-CA")
                .fullName("Dr. Robert Reyes, MD")
                .specialty("Orthopedics")
                .department("Surgical Specialties")
                .ward("Surg Post-Op 2A")
                .qualifications("UCSF School of Medicine • Mayo Clinic Fellow")
                .status("ON_DUTY")
                .email("r.reyes@carepulse-hms.org")
                .phone("+1 (555) 891-2345")
                .avatarUrl("https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=250")
                .weeklyHours("Tue - Sat, 07:30 - 15:30")
                .lifetimePatients(4120)
                .successRate(BigDecimal.valueOf(99.10))
                .todayAppointmentsCount(5)
                .build());

        Doctor docPatel = doctorRepository.save(Doctor.builder()
                .licenseNumber("LIC-MD-66231-IL")
                .fullName("Dr. Maya Patel, MD")
                .specialty("Pediatrics")
                .department("Childrens Health Wing")
                .ward("Pediatric Wing 3C")
                .qualifications("Northwestern Feinberg • Boston Childrens")
                .status("ON_DUTY")
                .email("m.patel@carepulse-hms.org")
                .phone("+1 (555) 782-9901")
                .avatarUrl("https://images.unsplash.com/photo-1594824813637-013063462947?auto=format&fit=crop&q=80&w=250")
                .weeklyHours("Mon - Fri, 09:00 - 17:00")
                .lifetimePatients(1950)
                .successRate(BigDecimal.valueOf(99.60))
                .todayAppointmentsCount(7)
                .build());

        Doctor docJulian = doctorRepository.save(Doctor.builder()
                .licenseNumber("LIC-MD-55410-TX")
                .fullName("Dr. Julian Vance, MD")
                .specialty("Neurology")
                .department("Neuroscience Institute")
                .ward("Neuro Suite 5B")
                .qualifications("Columbia P&S • MGH Fellow")
                .status("ON_DUTY")
                .email("j.vance@carepulse-hms.org")
                .phone("+1 (555) 432-1100")
                .avatarUrl("https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=250")
                .weeklyHours("Mon - Thu, 09:00 - 16:30")
                .lifetimePatients(2140)
                .successRate(BigDecimal.valueOf(98.20))
                .todayAppointmentsCount(4)
                .build());

        Doctor docChen = doctorRepository.save(Doctor.builder()
                .user(drChenUser)
                .licenseNumber("LIC-MD-44102-MA")
                .fullName("Dr. Elizabeth Chen, MD")
                .specialty("Trauma & Emergency")
                .department("Trauma & Critical Care")
                .ward("Trauma Bay 1 • ICU")
                .qualifications("Johns Hopkins • Harvard Fellow")
                .status("ON_DUTY")
                .email("e.chen@carepulse-hms.org")
                .phone("+1 (555) 312-9900")
                .avatarUrl(drChenUser.getAvatarUrl())
                .weeklyHours("Mon - Fri, 07:00 - 16:00")
                .lifetimePatients(5200)
                .successRate(BigDecimal.valueOf(99.70))
                .todayAppointmentsCount(9)
                .build());

        // 3. Patients
        LocalDateTime now = LocalDateTime.now();

        Patient p1 = patientRepository.save(Patient.builder()
                .mrn("MRN-89421")
                .fullName("Arthur Pendelton")
                .nationalId("SSN-982-12-8821")
                .dateOfBirth(LocalDate.of(1956, 4, 12))
                .gender("Male")
                .bloodGroup("O+")
                .contactNumber("+1 (555) 234-8901")
                .emergencyContactName("Martha Pendelton (Spouse)")
                .emergencyContactPhone("+1 (555) 234-8902")
                .residentialAddress("142 Elm Street, Boston, MA 02108")
                .insuranceCarrier("Medicare Part A/B")
                .policyId("MED-GOLD-9921")
                .department("Cardiology")
                .assignedDoctor(docVance)
                .careStatus("INPATIENT")
                .admissionDate(now.minusDays(3))
                .bedNumber("Bed 302-B")
                .triageNotes("Admitted with unstable angina. Telemetry continuous monitoring active.")
                .active(true)
                .build());

        Patient p2 = patientRepository.save(Patient.builder()
                .mrn("MRN-89422")
                .fullName("Elena Morales-Rios")
                .nationalId("SSN-881-43-1290")
                .dateOfBirth(LocalDate.of(1982, 8, 23))
                .gender("Female")
                .bloodGroup("A+")
                .contactNumber("+1 (555) 489-3321")
                .emergencyContactName("Carlos Morales (Brother)")
                .emergencyContactPhone("+1 (555) 489-3322")
                .residentialAddress("78 Beacon Ave, Cambridge, MA 02138")
                .insuranceCarrier("Blue Cross Blue Shield")
                .policyId("BCBS-44210")
                .department("Neurology")
                .assignedDoctor(docJulian)
                .careStatus("OUTPATIENT")
                .admissionDate(now.minusDays(1))
                .bedNumber("OPD Wing B")
                .triageNotes("Referred for recurrent migraine episodes and aura. EEG scheduled.")
                .active(true)
                .build());

        Patient p3 = patientRepository.save(Patient.builder()
                .mrn("MRN-89423")
                .fullName("Tariq Al-Mansoor")
                .nationalId("SSN-773-90-5512")
                .dateOfBirth(LocalDate.of(1995, 11, 4))
                .gender("Male")
                .bloodGroup("B-")
                .contactNumber("+1 (555) 712-4099")
                .emergencyContactName("Layla Al-Mansoor (Mother)")
                .emergencyContactPhone("+1 (555) 712-4098")
                .residentialAddress("504 Commonwealth Ave, Boston, MA 02215")
                .insuranceCarrier("Aetna Healthcare")
                .policyId("AET-PREM-88")
                .department("Trauma Emergency")
                .assignedDoctor(docChen)
                .careStatus("CRITICAL_ICU")
                .admissionDate(now.minusHours(8))
                .bedNumber("ICU Bed 04")
                .triageNotes("Severe trauma following motor collision. Immediate arterial blood gas requested.")
                .active(true)
                .build());

        Patient p4 = patientRepository.save(Patient.builder()
                .mrn("MRN-90214")
                .fullName("Eleanor Vance")
                .nationalId("SSN-662-81-3321")
                .dateOfBirth(LocalDate.of(1951, 2, 18))
                .gender("Female")
                .bloodGroup("O+")
                .contactNumber("+1 (555) 902-1144")
                .emergencyContactName("Julian Vance (Son)")
                .residentialAddress("90 Chestnut Hill, Newton, MA 02467")
                .insuranceCarrier("UnitedHealthcare")
                .policyId("UHC-SENIOR-1")
                .department("Cardiology")
                .assignedDoctor(docAdams)
                .careStatus("OUTPATIENT")
                .admissionDate(now.minusHours(2))
                .triageNotes("Post-echocardiogram consult. EF estimated 55%. Medications adjusted.")
                .active(true)
                .build());

        Patient p5 = patientRepository.save(Patient.builder()
                .mrn("MRN-88412")
                .fullName("Marcus Brody")
                .nationalId("SSN-554-21-9981")
                .dateOfBirth(LocalDate.of(1992, 6, 15))
                .gender("Male")
                .bloodGroup("A-")
                .contactNumber("+1 (555) 671-8842")
                .emergencyContactName("Sarah Brody (Spouse)")
                .residentialAddress("33 River St, Somerville, MA 02143")
                .insuranceCarrier("Kaiser Permanente")
                .policyId("KP-ACTIVE-302")
                .department("Orthopedics")
                .assignedDoctor(docReyes)
                .careStatus("OUTPATIENT")
                .admissionDate(now.minusHours(1))
                .triageNotes("Post-op 4-week cast evaluation. Tibial fracture healing favorably.")
                .active(true)
                .build());

        // 4. Appointments
        appointmentRepository.save(Appointment.builder()
                .appointmentNumber("APT-2024-001")
                .patient(p4)
                .doctor(docAdams)
                .department("Cardiology")
                .appointmentDateTime(now.minusMinutes(30))
                .appointmentType("Echo Follow-up")
                .status("IN_CONSULT")
                .durationMinutes(30)
                .reasonNotes("Review 2D-Echo and discuss beta blocker titration.")
                .build());

        appointmentRepository.save(Appointment.builder()
                .appointmentNumber("APT-2024-002")
                .patient(p5)
                .doctor(docReyes)
                .department("Orthopedics")
                .appointmentDateTime(now.minusMinutes(15))
                .appointmentType("Post-Op Cast Check")
                .status("CHECKED_IN")
                .durationMinutes(25)
                .reasonNotes("Evaluate cast comfort and verify distal pulse.")
                .build());

        appointmentRepository.save(Appointment.builder()
                .appointmentNumber("APT-2024-003")
                .patient(p2)
                .doctor(docJulian)
                .department("Neurology")
                .appointmentDateTime(now.plusMinutes(30))
                .appointmentType("EEG Review")
                .status("SCHEDULED")
                .durationMinutes(45)
                .reasonNotes("Interpret outpatient 24-hour ambulatory EEG recording.")
                .build());

        // 5. Admissions
        admissionRepository.save(Admission.builder()
                .admissionNumber("ADM-2024-101")
                .patient(p3)
                .ward("ICU & Critical Care")
                .bedNumber("ICU Bed 03")
                .admissionDateTime(now.minusMinutes(45))
                .triageAcuity("IMMEDIATE")
                .attendingDoctor(docChen)
                .status("ADMITTED")
                .diagnosis("Acute Polytrauma, Hemodynamic instability")
                .build());

        admissionRepository.save(Admission.builder()
                .admissionNumber("ADM-2024-102")
                .patient(p1)
                .ward("General Medical Ward")
                .bedNumber("Bed 302-B")
                .admissionDateTime(now.minusDays(3))
                .triageAcuity("STANDARD")
                .attendingDoctor(docVance)
                .status("ADMITTED")
                .diagnosis("Unstable Angina Pectoris")
                .build());

        // 6. Lab Tests
        labTestRepository.save(LabTest.builder()
                .testCode("LAB-8021")
                .testName("Arterial Blood Gas (ABG)")
                .category("Biochemistry")
                .patient(p3)
                .doctor(docChen)
                .priority("STAT_IMMEDIATE")
                .sampleCollectionTime(now.minusMinutes(25))
                .status("IN_PROGRESS")
                .resultSummary("Sample incubating in analyzer. pH 7.31, pCO2 48")
                .referenceRange("pH 7.35 - 7.45")
                .unit("pH units")
                .build());

        labTestRepository.save(LabTest.builder()
                .testCode("LAB-8022")
                .testName("High-Sensitivity Troponin I")
                .category("Biochemistry")
                .patient(p1)
                .doctor(docAdams)
                .priority("URGENT")
                .sampleCollectionTime(now.minusHours(2))
                .status("COMPLETED")
                .resultSummary("0.08 ng/mL (Mildly elevated, trend down from 0.14)")
                .referenceRange("< 0.04")
                .unit("ng/mL")
                .completedAt(now.minusHours(1))
                .build());

        // 7. Medications
        medicationRepository.save(Medication.builder()
                .drugCode("MED-RX-101")
                .name("Lipitor")
                .genericName("Atorvastatin Calcium")
                .category("Cardiovascular")
                .dosageForm("Tablet")
                .strength("20mg")
                .stockQuantity(840)
                .reorderLevel(150)
                .unitPrice(BigDecimal.valueOf(1.45))
                .batchNumber("LOT-88219")
                .expiryDate(LocalDate.of(2026, 12, 31))
                .manufacturer("Pfizer Inc.")
                .build());

        medicationRepository.save(Medication.builder()
                .drugCode("MED-RX-103")
                .name("EpiPen Auto-Injector")
                .genericName("Epinephrine")
                .category("Emergency")
                .dosageForm("Injection")
                .strength("0.3mg")
                .stockQuantity(28)
                .reorderLevel(50)
                .unitPrice(BigDecimal.valueOf(65.00))
                .batchNumber("LOT-99214")
                .expiryDate(LocalDate.of(2025, 6, 30))
                .manufacturer("Mylan Specialty")
                .build());

        // 8. Billings
        billingRepository.save(Billing.builder()
                .invoiceNumber("INV-2024-8841")
                .patient(p1)
                .invoiceDate(now.minusDays(2))
                .dueDate(now.plusDays(28))
                .totalAmount(BigDecimal.valueOf(14200.00))
                .insuranceCovered(BigDecimal.valueOf(12400.00))
                .patientPaid(BigDecimal.valueOf(1800.00))
                .balanceDue(BigDecimal.ZERO)
                .paymentStatus("PAID")
                .paymentMethod("Insurance Claim")
                .notes("Inpatient cardiac stay & telemetry. Fully settled.")
                .build());

        // 9. Staff Members
        staffRepository.save(Staff.builder()
                .employeeId("EMP-1049")
                .fullName("Angela Martinez, RN")
                .roleTitle("Head Nurse ICU")
                .department("Critical Care")
                .shiftSchedule("Morning 08:00 - 16:00")
                .contactNumber("+1 (555) 219-4820")
                .email("a.martinez@carepulse-hms.org")
                .status("ACTIVE")
                .build());

        staffRepository.save(Staff.builder()
                .employeeId("EMP-1050")
                .fullName("David Washington, RPh")
                .roleTitle("Lead Pharmacist")
                .department("Pharmacy Dispensation")
                .shiftSchedule("Morning 08:00 - 16:00")
                .contactNumber("+1 (555) 349-1123")
                .email("d.washington@carepulse-hms.org")
                .status("ACTIVE")
                .build());

        // 10. Notifications
        notificationRepository.save(HospitalNotification.builder()
                .title("TRAUMA ALERT: Trauma Bay 3")
                .message("Paramedic Unit 4 incoming (ETA 4 min). Polytrauma male acuity code 1.")
                .notificationType("TRAUMA_ALERT")
                .targetDepartment("Trauma & Emergency")
                .priority("CRITICAL")
                .read(false)
                .build());

        notificationRepository.save(HospitalNotification.builder()
                .title("Pharmacy Low Stock Alert")
                .message("Epinephrine 0.3mg Auto-Injectors have fallen below safe threshold (28 remaining).")
                .notificationType("LOW_STOCK")
                .targetDepartment("Pharmacy")
                .priority("HIGH")
                .read(false)
                .build());

        log.info("Initial demo dataset seeded successfully.");
    }
}
