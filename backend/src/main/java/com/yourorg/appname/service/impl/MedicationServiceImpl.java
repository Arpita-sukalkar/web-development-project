package com.yourorg.appname.service.impl;

import com.yourorg.appname.dto.request.MedicationRequestDto;
import com.yourorg.appname.dto.response.MedicationResponseDto;
import com.yourorg.appname.entity.Medication;
import com.yourorg.appname.exception.BadRequestException;
import com.yourorg.appname.exception.ResourceNotFoundException;
import com.yourorg.appname.mapper.EntityDtoMapper;
import com.yourorg.appname.repository.MedicationRepository;
import com.yourorg.appname.service.MedicationService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class MedicationServiceImpl implements MedicationService {

    private final MedicationRepository medicationRepository;
    private final EntityDtoMapper mapper;

    public MedicationServiceImpl(MedicationRepository medicationRepository, EntityDtoMapper mapper) {
        this.medicationRepository = medicationRepository;
        this.mapper = mapper;
    }


    @Override
    @Transactional(readOnly = true)
    public List<MedicationResponseDto> getAllMedications(String category, Boolean lowStockOnly) {
        List<Medication> list = medicationRepository.findAll();

        return list.stream()
                .filter(m -> category == null || category.equalsIgnoreCase("ALL") || m.getCategory().equalsIgnoreCase(category))
                .filter(m -> lowStockOnly == null || !lowStockOnly || m.getStockQuantity() <= m.getReorderLevel())
                .map(mapper::toMedicationDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public MedicationResponseDto getMedicationById(Long id) {
        Medication med = medicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Medication not found with id: " + id));
        return mapper.toMedicationDto(med);
    }

    @Override
    @Transactional
    public MedicationResponseDto createMedication(MedicationRequestDto request) {
        String drugCode = request.getDrugCode();
        if (drugCode == null || drugCode.trim().isEmpty()) {
            drugCode = "MED-RX-" + (100 + new Random().nextInt(900));
        }

        Medication medication = Medication.builder()
                .drugCode(drugCode)
                .name(request.getName().trim())
                .genericName(request.getGenericName().trim())
                .category(request.getCategory())
                .dosageForm(request.getDosageForm())
                .strength(request.getStrength())
                .stockQuantity(request.getStockQuantity())
                .reorderLevel(request.getReorderLevel() != null ? request.getReorderLevel() : 50)
                .unitPrice(request.getUnitPrice() != null ? request.getUnitPrice() : BigDecimal.valueOf(1.00))
                .batchNumber(request.getBatchNumber() != null ? request.getBatchNumber() : "LOT-" + (10000 + new Random().nextInt(90000)))
                .expiryDate(request.getExpiryDate())
                .manufacturer(request.getManufacturer())
                .build();

        Medication saved = medicationRepository.save(medication);
        return mapper.toMedicationDto(saved);
    }

    @Override
    @Transactional
    public MedicationResponseDto updateStock(Long id, int newQuantity) {
        Medication med = medicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Medication not found with id: " + id));

        med.setStockQuantity(newQuantity);
        Medication updated = medicationRepository.save(med);
        return mapper.toMedicationDto(updated);
    }

    @Override
    @Transactional
    public MedicationResponseDto dispenseMedication(Long id, int quantity) {
        Medication med = medicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Medication not found with id: " + id));

        if (med.getStockQuantity() < quantity) {
            throw new BadRequestException("Insufficient medication stock. Available: " + med.getStockQuantity() + ", requested: " + quantity);
        }

        med.setStockQuantity(med.getStockQuantity() - quantity);
        Medication updated = medicationRepository.save(med);
        return mapper.toMedicationDto(updated);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MedicationResponseDto> getLowStockAlerts() {
        return medicationRepository.findLowStockMedications().stream()
                .map(mapper::toMedicationDto)
                .collect(Collectors.toList());
    }
}
