package com.yourorg.appname.service.impl;

import com.yourorg.appname.dto.request.AppointmentRequestDto;
import com.yourorg.appname.dto.response.AppointmentResponseDto;
import com.yourorg.appname.entity.Appointment;
import com.yourorg.appname.entity.Doctor;
import com.yourorg.appname.entity.Patient;
import com.yourorg.appname.exception.ResourceNotFoundException;
import com.yourorg.appname.mapper.EntityDtoMapper;
import com.yourorg.appname.repository.AppointmentRepository;
import com.yourorg.appname.repository.DoctorRepository;
import com.yourorg.appname.repository.PatientRepository;
import com.yourorg.appname.service.AppointmentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final EntityDtoMapper mapper;

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository, PatientRepository patientRepository, DoctorRepository doctorRepository, EntityDtoMapper mapper) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.mapper = mapper;
    }


    @Override
    @Transactional(readOnly = true)
    public List<AppointmentResponseDto> getAllAppointments(String status, String department, LocalDate date) {
        List<Appointment> list = appointmentRepository.findAll();

        return list.stream()
                .filter(a -> status == null || status.equalsIgnoreCase("ALL") || a.getStatus().equalsIgnoreCase(status))
                .filter(a -> department == null || department.equalsIgnoreCase("ALL") || department.equalsIgnoreCase("All Specialties") || a.getDepartment().equalsIgnoreCase(department))
                .filter(a -> date == null || a.getAppointmentDateTime().toLocalDate().equals(date))
                .map(mapper::toAppointmentDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public AppointmentResponseDto getAppointmentById(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found with id: " + id));
        return mapper.toAppointmentDto(appointment);
    }

    @Override
    @Transactional
    public AppointmentResponseDto createAppointment(AppointmentRequestDto request) {
        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + request.getPatientId()));
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with id: " + request.getDoctorId()));

        String aptNumber = request.getAppointmentNumber();
        if (aptNumber == null || aptNumber.trim().isEmpty()) {
            aptNumber = "APT-2024-" + (100 + new Random().nextInt(900));
        }

        Appointment appointment = Appointment.builder()
                .appointmentNumber(aptNumber)
                .patient(patient)
                .doctor(doctor)
                .department(request.getDepartment())
                .appointmentDateTime(request.getAppointmentDateTime())
                .appointmentType(request.getAppointmentType())
                .status(request.getStatus() != null ? request.getStatus() : "SCHEDULED")
                .durationMinutes(request.getDurationMinutes() != null ? request.getDurationMinutes() : 30)
                .reasonNotes(request.getReasonNotes())
                .build();

        Appointment saved = appointmentRepository.save(appointment);
        return mapper.toAppointmentDto(saved);
    }

    @Override
    @Transactional
    public AppointmentResponseDto updateAppointmentStatus(Long id, String status) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found with id: " + id));
        appointment.setStatus(status);
        Appointment updated = appointmentRepository.save(appointment);
        return mapper.toAppointmentDto(updated);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AppointmentResponseDto> getTodayAppointments() {
        LocalDateTime startOfDay = LocalDateTime.of(LocalDate.now(), LocalTime.MIN);
        LocalDateTime endOfDay = LocalDateTime.of(LocalDate.now(), LocalTime.MAX);
        List<Appointment> today = appointmentRepository.findAppointmentsBetween(startOfDay, endOfDay);
        if (today.isEmpty()) {
            // Return latest appointments as fallback for demonstration
            return appointmentRepository.findAll().stream()
                    .limit(5)
                    .map(mapper::toAppointmentDto)
                    .collect(Collectors.toList());
        }
        return today.stream().map(mapper::toAppointmentDto).collect(Collectors.toList());
    }
}
