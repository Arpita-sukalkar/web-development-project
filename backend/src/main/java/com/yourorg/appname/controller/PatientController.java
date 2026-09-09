package com.yourorg.appname.controller;

import com.yourorg.appname.dto.request.PatientRequestDto;
import com.yourorg.appname.dto.response.PatientResponseDto;
import com.yourorg.appname.service.PatientService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }


    @GetMapping
    public ResponseEntity<List<PatientResponseDto>> getAllPatients(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String careStatus,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String bloodGroup) {
        List<PatientResponseDto> patients = patientService.getAllPatients(search, careStatus, department, bloodGroup);
        return ResponseEntity.ok(patients);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PatientResponseDto> getPatientById(@PathVariable Long id) {
        PatientResponseDto patient = patientService.getPatientById(id);
        return ResponseEntity.ok(patient);
    }

    @GetMapping("/mrn/{mrn}")
    public ResponseEntity<PatientResponseDto> getPatientByMrn(@PathVariable String mrn) {
        PatientResponseDto patient = patientService.getPatientByMrn(mrn);
        return ResponseEntity.ok(patient);
    }

    @PostMapping
    public ResponseEntity<PatientResponseDto> createPatient(@Valid @RequestBody PatientRequestDto request) {
        PatientResponseDto created = patientService.createPatient(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PatientResponseDto> updatePatient(
            @PathVariable Long id, @Valid @RequestBody PatientRequestDto request) {
        PatientResponseDto updated = patientService.updatePatient(id, request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getPatientStats() {
        Map<String, Object> stats = patientService.getPatientStats();
        return ResponseEntity.ok(stats);
    }
}
