package com.yourorg.appname.service;

import com.yourorg.appname.dto.request.AdmissionRequestDto;
import com.yourorg.appname.dto.response.AdmissionResponseDto;

import java.util.List;
import java.util.Map;

public interface AdmissionService {
    List<AdmissionResponseDto> getAllAdmissions(String status, String ward, String acuity);
    AdmissionResponseDto getAdmissionById(Long id);
    AdmissionResponseDto createAdmission(AdmissionRequestDto request);
    AdmissionResponseDto updateAdmission(Long id, AdmissionRequestDto request);
    AdmissionResponseDto transferBed(Long id, String newWard, String newBedNumber);
    AdmissionResponseDto dischargePatient(Long id);
    Map<String, Object> getWardBedStats();
}
