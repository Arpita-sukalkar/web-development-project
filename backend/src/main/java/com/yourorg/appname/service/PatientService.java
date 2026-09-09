package com.yourorg.appname.service;

import com.yourorg.appname.dto.request.PatientRequestDto;
import com.yourorg.appname.dto.response.PatientResponseDto;

import java.util.List;
import java.util.Map;

public interface PatientService {
    List<PatientResponseDto> getAllPatients(String search, String careStatus, String department, String bloodGroup);
    PatientResponseDto getPatientById(Long id);
    PatientResponseDto getPatientByMrn(String mrn);
    PatientResponseDto createPatient(PatientRequestDto request);
    PatientResponseDto updatePatient(Long id, PatientRequestDto request);
    void deletePatient(Long id);
    Map<String, Object> getPatientStats();
}
