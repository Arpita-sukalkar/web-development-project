package com.yourorg.appname.service.impl;

import com.yourorg.appname.dto.request.LabTestRequestDto;
import com.yourorg.appname.dto.response.LabTestResponseDto;
import com.yourorg.appname.entity.Doctor;
import com.yourorg.appname.entity.LabTest;
import com.yourorg.appname.entity.Patient;
import com.yourorg.appname.exception.ResourceNotFoundException;
import com.yourorg.appname.mapper.EntityDtoMapper;
import com.yourorg.appname.repository.DoctorRepository;
import com.yourorg.appname.repository.LabTestRepository;
import com.yourorg.appname.repository.PatientRepository;
import com.yourorg.appname.service.LabTestService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class LabTestServiceImpl implements LabTestService {

    private final LabTestRepository labTestRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final EntityDtoMapper mapper;

    public LabTestServiceImpl(LabTestRepository labTestRepository, PatientRepository patientRepository, DoctorRepository doctorRepository, EntityDtoMapper mapper) {
        this.labTestRepository = labTestRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.mapper = mapper;
    }


    @Override
    @Transactional(readOnly = true)
    public List<LabTestResponseDto> getAllLabTests(String status, String priority, String category) {
        List<LabTest> list = labTestRepository.findAll();

        return list.stream()
                .filter(t -> status == null || status.equalsIgnoreCase("ALL") || t.getStatus().equalsIgnoreCase(status))
                .filter(t -> priority == null || priority.equalsIgnoreCase("ALL") || t.getPriority().equalsIgnoreCase(priority))
                .filter(t -> category == null || category.equalsIgnoreCase("ALL") || t.getCategory().equalsIgnoreCase(category))
                .map(mapper::toLabTestDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public LabTestResponseDto getLabTestById(Long id) {
        LabTest test = labTestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lab test not found with id: " + id));
        return mapper.toLabTestDto(test);
    }

    @Override
    @Transactional
    public LabTestResponseDto createLabTest(LabTestRequestDto request) {
        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + request.getPatientId()));
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with id: " + request.getDoctorId()));

        String testCode = request.getTestCode();
        if (testCode == null || testCode.trim().isEmpty()) {
            testCode = "LAB-" + (1000 + new Random().nextInt(9000));
        }

        LabTest test = LabTest.builder()
                .testCode(testCode)
                .testName(request.getTestName().trim())
                .category(request.getCategory())
                .patient(patient)
                .doctor(doctor)
                .priority(request.getPriority() != null ? request.getPriority() : "ROUTINE")
                .sampleCollectionTime(request.getSampleCollectionTime() != null ? request.getSampleCollectionTime() : LocalDateTime.now())
                .status(request.getStatus() != null ? request.getStatus() : "PENDING")
                .resultSummary(request.getResultSummary())
                .referenceRange(request.getReferenceRange())
                .unit(request.getUnit())
                .build();

        LabTest saved = labTestRepository.save(test);
        return mapper.toLabTestDto(saved);
    }

    @Override
    @Transactional
    public LabTestResponseDto updateLabTestResult(Long id, String resultSummary, String status) {
        LabTest test = labTestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lab test not found with id: " + id));

        test.setResultSummary(resultSummary);
        if (status != null) {
            test.setStatus(status);
            if (status.equalsIgnoreCase("COMPLETED")) {
                test.setCompletedAt(LocalDateTime.now());
            }
        }

        LabTest updated = labTestRepository.save(test);
        return mapper.toLabTestDto(updated);
    }

    @Override
    @Transactional(readOnly = true)
    public List<LabTestResponseDto> getUrgentTests() {
        return labTestRepository.findByPriority("STAT_IMMEDIATE").stream()
                .map(mapper::toLabTestDto)
                .collect(Collectors.toList());
    }
}
