package com.yourorg.appname.service;

import com.yourorg.appname.dto.request.LabTestRequestDto;
import com.yourorg.appname.dto.response.LabTestResponseDto;

import java.util.List;

public interface LabTestService {
    List<LabTestResponseDto> getAllLabTests(String status, String priority, String category);
    LabTestResponseDto getLabTestById(Long id);
    LabTestResponseDto createLabTest(LabTestRequestDto request);
    LabTestResponseDto updateLabTestResult(Long id, String resultSummary, String status);
    List<LabTestResponseDto> getUrgentTests();
}
