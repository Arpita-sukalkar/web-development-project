package com.yourorg.appname.service;

import com.yourorg.appname.dto.request.DoctorRequestDto;
import com.yourorg.appname.dto.response.DoctorResponseDto;

import java.util.List;
import java.util.Map;

public interface DoctorService {
    List<DoctorResponseDto> getAllDoctors(String search, String specialty, String status);
    DoctorResponseDto getDoctorById(Long id);
    DoctorResponseDto createDoctor(DoctorRequestDto request);
    DoctorResponseDto updateDoctor(Long id, DoctorRequestDto request);
    DoctorResponseDto updateDoctorStatus(Long id, String status);
    Map<String, Object> getDoctorStats();
}
