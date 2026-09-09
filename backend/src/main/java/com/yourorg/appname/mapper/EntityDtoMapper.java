package com.yourorg.appname.mapper;

import com.yourorg.appname.dto.response.*;
import com.yourorg.appname.entity.*;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.Period;

@Component
public class EntityDtoMapper {

    public UserDto toUserDto(User user) {
        if (user == null) return null;
        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole())
                .title(user.getTitle())
                .department(user.getDepartment())
                .avatarUrl(user.getAvatarUrl())
                .active(user.isActive())
                .createdAt(user.getCreatedAt())
                .build();
    }

    public DoctorResponseDto toDoctorDto(Doctor doctor) {
        if (doctor == null) return null;
        return DoctorResponseDto.builder()
                .id(doctor.getId())
                .userId(doctor.getUser() != null ? doctor.getUser().getId() : null)
                .licenseNumber(doctor.getLicenseNumber())
                .fullName(doctor.getFullName())
                .specialty(doctor.getSpecialty())
                .department(doctor.getDepartment())
                .ward(doctor.getWard())
                .qualifications(doctor.getQualifications())
                .status(doctor.getStatus())
                .email(doctor.getEmail())
                .phone(doctor.getPhone())
                .avatarUrl(doctor.getAvatarUrl())
                .weeklyHours(doctor.getWeeklyHours())
                .lifetimePatients(doctor.getLifetimePatients())
                .successRate(doctor.getSuccessRate())
                .todayAppointmentsCount(doctor.getTodayAppointmentsCount())
                .createdAt(doctor.getCreatedAt())
                .build();
    }

    public PatientResponseDto toPatientDto(Patient patient) {
        if (patient == null) return null;
        Integer age = null;
        if (patient.getDateOfBirth() != null) {
            age = Period.between(patient.getDateOfBirth(), LocalDate.now()).getYears();
        }

        return PatientResponseDto.builder()
                .id(patient.getId())
                .mrn(patient.getMrn())
                .fullName(patient.getFullName())
                .nationalId(patient.getNationalId())
                .dateOfBirth(patient.getDateOfBirth())
                .age(age)
                .gender(patient.getGender())
                .bloodGroup(patient.getBloodGroup())
                .contactNumber(patient.getContactNumber())
                .emergencyContactName(patient.getEmergencyContactName())
                .emergencyContactPhone(patient.getEmergencyContactPhone())
                .residentialAddress(patient.getResidentialAddress())
                .insuranceCarrier(patient.getInsuranceCarrier())
                .policyId(patient.getPolicyId())
                .department(patient.getDepartment())
                .assignedDoctorId(patient.getAssignedDoctor() != null ? patient.getAssignedDoctor().getId() : null)
                .assignedDoctorName(patient.getAssignedDoctor() != null ? patient.getAssignedDoctor().getFullName() : null)
                .careStatus(patient.getCareStatus())
                .admissionDate(patient.getAdmissionDate())
                .dischargeDate(patient.getDischargeDate())
                .bedNumber(patient.getBedNumber())
                .triageNotes(patient.getTriageNotes())
                .avatarUrl(patient.getAvatarUrl())
                .active(patient.isActive())
                .createdAt(patient.getCreatedAt())
                .build();
    }

    public AppointmentResponseDto toAppointmentDto(Appointment appointment) {
        if (appointment == null) return null;
        return AppointmentResponseDto.builder()
                .id(appointment.getId())
                .appointmentNumber(appointment.getAppointmentNumber())
                .patientId(appointment.getPatient().getId())
                .patientName(appointment.getPatient().getFullName())
                .patientMrn(appointment.getPatient().getMrn())
                .patientAvatarUrl(appointment.getPatient().getAvatarUrl())
                .doctorId(appointment.getDoctor().getId())
                .doctorName(appointment.getDoctor().getFullName())
                .department(appointment.getDepartment())
                .appointmentDateTime(appointment.getAppointmentDateTime())
                .appointmentType(appointment.getAppointmentType())
                .status(appointment.getStatus())
                .durationMinutes(appointment.getDurationMinutes())
                .reasonNotes(appointment.getReasonNotes())
                .createdAt(appointment.getCreatedAt())
                .build();
    }

    public AdmissionResponseDto toAdmissionDto(Admission admission) {
        if (admission == null) return null;
        return AdmissionResponseDto.builder()
                .id(admission.getId())
                .admissionNumber(admission.getAdmissionNumber())
                .patientId(admission.getPatient().getId())
                .patientName(admission.getPatient().getFullName())
                .patientMrn(admission.getPatient().getMrn())
                .ward(admission.getWard())
                .bedNumber(admission.getBedNumber())
                .admissionDateTime(admission.getAdmissionDateTime())
                .dischargeDateTime(admission.getDischargeDateTime())
                .triageAcuity(admission.getTriageAcuity())
                .attendingDoctorId(admission.getAttendingDoctor() != null ? admission.getAttendingDoctor().getId() : null)
                .attendingDoctorName(admission.getAttendingDoctor() != null ? admission.getAttendingDoctor().getFullName() : null)
                .status(admission.getStatus())
                .diagnosis(admission.getDiagnosis())
                .createdAt(admission.getCreatedAt())
                .build();
    }

    public LabTestResponseDto toLabTestDto(LabTest labTest) {
        if (labTest == null) return null;
        return LabTestResponseDto.builder()
                .id(labTest.getId())
                .testCode(labTest.getTestCode())
                .testName(labTest.getTestName())
                .category(labTest.getCategory())
                .patientId(labTest.getPatient().getId())
                .patientName(labTest.getPatient().getFullName())
                .patientMrn(labTest.getPatient().getMrn())
                .doctorId(labTest.getDoctor().getId())
                .doctorName(labTest.getDoctor().getFullName())
                .priority(labTest.getPriority())
                .sampleCollectionTime(labTest.getSampleCollectionTime())
                .status(labTest.getStatus())
                .resultSummary(labTest.getResultSummary())
                .referenceRange(labTest.getReferenceRange())
                .unit(labTest.getUnit())
                .completedAt(labTest.getCompletedAt())
                .createdAt(labTest.getCreatedAt())
                .build();
    }

    public MedicationResponseDto toMedicationDto(Medication med) {
        if (med == null) return null;
        boolean lowStock = med.getStockQuantity() <= med.getReorderLevel();
        return MedicationResponseDto.builder()
                .id(med.getId())
                .drugCode(med.getDrugCode())
                .name(med.getName())
                .genericName(med.getGenericName())
                .category(med.getCategory())
                .dosageForm(med.getDosageForm())
                .strength(med.getStrength())
                .stockQuantity(med.getStockQuantity())
                .reorderLevel(med.getReorderLevel())
                .lowStock(lowStock)
                .unitPrice(med.getUnitPrice())
                .batchNumber(med.getBatchNumber())
                .expiryDate(med.getExpiryDate())
                .manufacturer(med.getManufacturer())
                .createdAt(med.getCreatedAt())
                .build();
    }

    public BillingResponseDto toBillingDto(Billing billing) {
        if (billing == null) return null;
        return BillingResponseDto.builder()
                .id(billing.getId())
                .invoiceNumber(billing.getInvoiceNumber())
                .patientId(billing.getPatient().getId())
                .patientName(billing.getPatient().getFullName())
                .patientMrn(billing.getPatient().getMrn())
                .invoiceDate(billing.getInvoiceDate())
                .dueDate(billing.getDueDate())
                .totalAmount(billing.getTotalAmount())
                .insuranceCovered(billing.getInsuranceCovered())
                .patientPaid(billing.getPatientPaid())
                .balanceDue(billing.getBalanceDue())
                .paymentStatus(billing.getPaymentStatus())
                .paymentMethod(billing.getPaymentMethod())
                .notes(billing.getNotes())
                .createdAt(billing.getCreatedAt())
                .build();
    }

    public StaffResponseDto toStaffDto(Staff staff) {
        if (staff == null) return null;
        return StaffResponseDto.builder()
                .id(staff.getId())
                .employeeId(staff.getEmployeeId())
                .fullName(staff.getFullName())
                .roleTitle(staff.getRoleTitle())
                .department(staff.getDepartment())
                .shiftSchedule(staff.getShiftSchedule())
                .contactNumber(staff.getContactNumber())
                .email(staff.getEmail())
                .status(staff.getStatus())
                .avatarUrl(staff.getAvatarUrl())
                .createdAt(staff.getCreatedAt())
                .build();
    }

    public HospitalNotificationResponseDto toNotificationDto(HospitalNotification n) {
        if (n == null) return null;
        return HospitalNotificationResponseDto.builder()
                .id(n.getId())
                .title(n.getTitle())
                .message(n.getMessage())
                .notificationType(n.getNotificationType())
                .targetDepartment(n.getTargetDepartment())
                .priority(n.getPriority())
                .read(n.isRead())
                .createdAt(n.getCreatedAt())
                .build();
    }
}
