package com.yourorg.appname.controller;

import com.yourorg.appname.dto.request.DoctorRequestDto;
import com.yourorg.appname.dto.response.DoctorResponseDto;
import com.yourorg.appname.service.DoctorService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }


    @GetMapping
    public ResponseEntity<List<DoctorResponseDto>> getAllDoctors(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String specialty,
            @RequestParam(required = false) String status) {
        List<DoctorResponseDto> doctors = doctorService.getAllDoctors(search, specialty, status);
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorResponseDto> getDoctorById(@PathVariable Long id) {
        DoctorResponseDto doctor = doctorService.getDoctorById(id);
        return ResponseEntity.ok(doctor);
    }

    @PostMapping
    public ResponseEntity<DoctorResponseDto> createDoctor(@Valid @RequestBody DoctorRequestDto request) {
        DoctorResponseDto created = doctorService.createDoctor(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DoctorResponseDto> updateDoctor(
            @PathVariable Long id, @Valid @RequestBody DoctorRequestDto request) {
        DoctorResponseDto updated = doctorService.updateDoctor(id, request);
        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<DoctorResponseDto> updateDoctorStatus(
            @PathVariable Long id, @RequestParam String status) {
        DoctorResponseDto updated = doctorService.updateDoctorStatus(id, status);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getDoctorStats() {
        Map<String, Object> stats = doctorService.getDoctorStats();
        return ResponseEntity.ok(stats);
    }
}
