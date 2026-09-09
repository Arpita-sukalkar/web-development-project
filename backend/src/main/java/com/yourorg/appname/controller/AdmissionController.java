package com.yourorg.appname.controller;

import com.yourorg.appname.dto.request.AdmissionRequestDto;
import com.yourorg.appname.dto.response.AdmissionResponseDto;
import com.yourorg.appname.service.AdmissionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admissions")
public class AdmissionController {

    private final AdmissionService admissionService;

    public AdmissionController(AdmissionService admissionService) {
        this.admissionService = admissionService;
    }


    @GetMapping
    public ResponseEntity<List<AdmissionResponseDto>> getAllAdmissions(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String ward,
            @RequestParam(required = false) String acuity) {
        List<AdmissionResponseDto> admissions = admissionService.getAllAdmissions(status, ward, acuity);
        return ResponseEntity.ok(admissions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdmissionResponseDto> getAdmissionById(@PathVariable Long id) {
        AdmissionResponseDto admission = admissionService.getAdmissionById(id);
        return ResponseEntity.ok(admission);
    }

    @PostMapping
    public ResponseEntity<AdmissionResponseDto> createAdmission(@Valid @RequestBody AdmissionRequestDto request) {
        AdmissionResponseDto created = admissionService.createAdmission(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdmissionResponseDto> updateAdmission(
            @PathVariable Long id, @Valid @RequestBody AdmissionRequestDto request) {
        AdmissionResponseDto updated = admissionService.updateAdmission(id, request);
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/{id}/transfer")
    public ResponseEntity<AdmissionResponseDto> transferBed(
            @PathVariable Long id,
            @RequestParam String newWard,
            @RequestParam String newBedNumber) {
        AdmissionResponseDto updated = admissionService.transferBed(id, newWard, newBedNumber);
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/{id}/discharge")
    public ResponseEntity<AdmissionResponseDto> dischargePatient(@PathVariable Long id) {
        AdmissionResponseDto discharged = admissionService.dischargePatient(id);
        return ResponseEntity.ok(discharged);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getWardBedStats() {
        Map<String, Object> stats = admissionService.getWardBedStats();
        return ResponseEntity.ok(stats);
    }
}
