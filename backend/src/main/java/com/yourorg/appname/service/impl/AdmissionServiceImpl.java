package com.yourorg.appname.service.impl;

import com.yourorg.appname.dto.request.AdmissionRequestDto;
import com.yourorg.appname.dto.response.AdmissionResponseDto;
import com.yourorg.appname.entity.Admission;
import com.yourorg.appname.entity.Doctor;
import com.yourorg.appname.entity.Patient;
import com.yourorg.appname.exception.ResourceNotFoundException;
import com.yourorg.appname.mapper.EntityDtoMapper;
import com.yourorg.appname.repository.AdmissionRepository;
import com.yourorg.appname.repository.DoctorRepository;
import com.yourorg.appname.repository.PatientRepository;
import com.yourorg.appname.service.AdmissionService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AdmissionServiceImpl implements AdmissionService {

    private final AdmissionRepository admissionRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final EntityDtoMapper mapper;

    public AdmissionServiceImpl(AdmissionRepository admissionRepository, PatientRepository patientRepository, DoctorRepository doctorRepository, EntityDtoMapper mapper) {
        this.admissionRepository = admissionRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.mapper = mapper;
    }


    @Override
    @Transactional(readOnly = true)
    public List<AdmissionResponseDto> getAllAdmissions(String status, String ward, String acuity) {
        List<Admission> list = admissionRepository.findAll();

        return list.stream()
                .filter(a -> status == null || status.equalsIgnoreCase("ALL") || a.getStatus().equalsIgnoreCase(status))
                .filter(a -> ward == null || ward.equalsIgnoreCase("ALL") || a.getWard().equalsIgnoreCase(ward))
                .filter(a -> acuity == null || acuity.equalsIgnoreCase("ALL") || a.getTriageAcuity().equalsIgnoreCase(acuity))
                .map(mapper::toAdmissionDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public AdmissionResponseDto getAdmissionById(Long id) {
        Admission admission = admissionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admission record not found with id: " + id));
        return mapper.toAdmissionDto(admission);
    }

    @Override
    @Transactional
    public AdmissionResponseDto createAdmission(AdmissionRequestDto request) {
        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + request.getPatientId()));

        Doctor attendingDoctor = null;
        if (request.getAttendingDoctorId() != null) {
            attendingDoctor = doctorRepository.findById(request.getAttendingDoctorId()).orElse(null);
        }

        String admNumber = request.getAdmissionNumber();
        if (admNumber == null || admNumber.trim().isEmpty()) {
            admNumber = "ADM-2024-" + (100 + new Random().nextInt(900));
        }

        Admission admission = Admission.builder()
                .admissionNumber(admNumber)
                .patient(patient)
                .ward(request.getWard())
                .bedNumber(request.getBedNumber())
                .admissionDateTime(request.getAdmissionDateTime() != null ? request.getAdmissionDateTime() : LocalDateTime.now())
                .triageAcuity(request.getTriageAcuity() != null ? request.getTriageAcuity() : "STANDARD")
                .attendingDoctor(attendingDoctor)
                .status("ADMITTED")
                .diagnosis(request.getDiagnosis())
                .build();

        // Update patient bed and status
        patient.setBedNumber(request.getBedNumber());
        patient.setCareStatus(request.getTriageAcuity() != null && request.getTriageAcuity().equalsIgnoreCase("IMMEDIATE") ? "CRITICAL_ICU" : "INPATIENT");
        patientRepository.save(patient);

        Admission saved = admissionRepository.save(admission);
        return mapper.toAdmissionDto(saved);
    }

    @Override
    @Transactional
    public AdmissionResponseDto updateAdmission(Long id, AdmissionRequestDto request) {
        Admission admission = admissionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admission not found with id: " + id));

        admission.setWard(request.getWard());
        admission.setBedNumber(request.getBedNumber());
        if (request.getTriageAcuity() != null) admission.setTriageAcuity(request.getTriageAcuity());
        if (request.getStatus() != null) admission.setStatus(request.getStatus());
        if (request.getDiagnosis() != null) admission.setDiagnosis(request.getDiagnosis());

        if (request.getAttendingDoctorId() != null) {
            Doctor doctor = doctorRepository.findById(request.getAttendingDoctorId()).orElse(null);
            admission.setAttendingDoctor(doctor);
        }

        Admission updated = admissionRepository.save(admission);
        return mapper.toAdmissionDto(updated);
    }

    @Override
    @Transactional
    public AdmissionResponseDto transferBed(Long id, String newWard, String newBedNumber) {
        Admission admission = admissionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admission not found with id: " + id));

        admission.setWard(newWard);
        admission.setBedNumber(newBedNumber);

        Patient patient = admission.getPatient();
        if (patient != null) {
            patient.setBedNumber(newBedNumber);
            patientRepository.save(patient);
        }

        Admission updated = admissionRepository.save(admission);
        return mapper.toAdmissionDto(updated);
    }

    @Override
    @Transactional
    public AdmissionResponseDto dischargePatient(Long id) {
        Admission admission = admissionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admission not found with id: " + id));

        admission.setStatus("DISCHARGED");
        admission.setDischargeDateTime(LocalDateTime.now());

        Patient patient = admission.getPatient();
        if (patient != null) {
            patient.setCareStatus("DISCHARGED");
            patient.setBedNumber(null);
            patientRepository.save(patient);
        }

        Admission updated = admissionRepository.save(admission);
        return mapper.toAdmissionDto(updated);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Object> getWardBedStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalCapacity", 420);
        stats.put("occupiedBeds", 372);
        stats.put("availableBeds", 48);
        stats.put("overallOccupancyRate", 88.6);

        List<Map<String, Object>> wards = List.of(
                Map.of("ward", "ICU & Critical Care", "occupied", 38, "capacity", 40, "occupancyRate", 95.0, "status", "CRITICAL"),
                Map.of("ward", "General Medical Ward", "occupied", 184, "capacity", 200, "occupancyRate", 92.0, "status", "HIGH"),
                Map.of("ward", "Emergency Ward (ER)", "occupied", 68, "capacity", 80, "occupancyRate", 85.0, "status", "NORMAL"),
                Map.of("ward", "Private & Semi-Private", "occupied", 82, "capacity", 100, "occupancyRate", 82.0, "status", "NORMAL")
        );
        stats.put("wards", wards);
        return stats;
    }
}
