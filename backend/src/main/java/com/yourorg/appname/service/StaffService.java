package com.yourorg.appname.service;

import com.yourorg.appname.dto.request.StaffRequestDto;
import com.yourorg.appname.dto.response.StaffResponseDto;

import java.util.List;

public interface StaffService {
    List<StaffResponseDto> getAllStaff(String department, String status);
    StaffResponseDto getStaffById(Long id);
    StaffResponseDto createStaff(StaffRequestDto request);
    StaffResponseDto updateStaff(Long id, StaffRequestDto request);
}
