package com.yourorg.appname.service;

import com.yourorg.appname.dto.request.AppointmentRequestDto;
import com.yourorg.appname.dto.response.AppointmentResponseDto;

import java.time.LocalDate;
import java.util.List;

public interface AppointmentService {
    List<AppointmentResponseDto> getAllAppointments(String status, String department, LocalDate date);
    AppointmentResponseDto getAppointmentById(Long id);
    AppointmentResponseDto createAppointment(AppointmentRequestDto request);
    AppointmentResponseDto updateAppointmentStatus(Long id, String status);
    List<AppointmentResponseDto> getTodayAppointments();
}
