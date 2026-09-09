package com.yourorg.appname.service;

import com.yourorg.appname.dto.request.MedicationRequestDto;
import com.yourorg.appname.dto.response.MedicationResponseDto;

import java.util.List;

public interface MedicationService {
    List<MedicationResponseDto> getAllMedications(String category, Boolean lowStockOnly);
    MedicationResponseDto getMedicationById(Long id);
    MedicationResponseDto createMedication(MedicationRequestDto request);
    MedicationResponseDto updateStock(Long id, int newQuantity);
    MedicationResponseDto dispenseMedication(Long id, int quantity);
    List<MedicationResponseDto> getLowStockAlerts();
}
