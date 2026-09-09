package com.yourorg.appname.controller;

import com.yourorg.appname.dto.request.MedicationRequestDto;
import com.yourorg.appname.dto.response.MedicationResponseDto;
import com.yourorg.appname.service.MedicationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pharmacy")
public class PharmacyController {

    private final MedicationService medicationService;

    public PharmacyController(MedicationService medicationService) {
        this.medicationService = medicationService;
    }


    @GetMapping
    public ResponseEntity<List<MedicationResponseDto>> getAllMedications(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Boolean lowStockOnly) {
        List<MedicationResponseDto> meds = medicationService.getAllMedications(category, lowStockOnly);
        return ResponseEntity.ok(meds);
    }

    @GetMapping("/alerts")
    public ResponseEntity<List<MedicationResponseDto>> getLowStockAlerts() {
        List<MedicationResponseDto> alerts = medicationService.getLowStockAlerts();
        return ResponseEntity.ok(alerts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicationResponseDto> getMedicationById(@PathVariable Long id) {
        MedicationResponseDto med = medicationService.getMedicationById(id);
        return ResponseEntity.ok(med);
    }

    @PostMapping
    public ResponseEntity<MedicationResponseDto> createMedication(@Valid @RequestBody MedicationRequestDto request) {
        MedicationResponseDto created = medicationService.createMedication(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}/stock")
    public ResponseEntity<MedicationResponseDto> updateStock(
            @PathVariable Long id, @RequestParam int newQuantity) {
        MedicationResponseDto updated = medicationService.updateStock(id, newQuantity);
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/{id}/dispense")
    public ResponseEntity<MedicationResponseDto> dispenseMedication(
            @PathVariable Long id, @RequestParam int quantity) {
        MedicationResponseDto updated = medicationService.dispenseMedication(id, quantity);
        return ResponseEntity.ok(updated);
    }
}
