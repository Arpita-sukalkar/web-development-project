package com.yourorg.appname.controller;

import com.yourorg.appname.dto.request.AppointmentRequestDto;
import com.yourorg.appname.dto.response.AppointmentResponseDto;
import com.yourorg.appname.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }


    @GetMapping
    public ResponseEntity<List<AppointmentResponseDto>> getAllAppointments(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<AppointmentResponseDto> appointments = appointmentService.getAllAppointments(status, department, date);
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/today")
    public ResponseEntity<List<AppointmentResponseDto>> getTodayAppointments() {
        List<AppointmentResponseDto> appointments = appointmentService.getTodayAppointments();
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentResponseDto> getAppointmentById(@PathVariable Long id) {
        AppointmentResponseDto appointment = appointmentService.getAppointmentById(id);
        return ResponseEntity.ok(appointment);
    }

    @PostMapping
    public ResponseEntity<AppointmentResponseDto> createAppointment(@Valid @RequestBody AppointmentRequestDto request) {
        AppointmentResponseDto created = appointmentService.createAppointment(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<AppointmentResponseDto> updateAppointmentStatus(
            @PathVariable Long id, @RequestParam String status) {
        AppointmentResponseDto updated = appointmentService.updateAppointmentStatus(id, status);
        return ResponseEntity.ok(updated);
    }
}
