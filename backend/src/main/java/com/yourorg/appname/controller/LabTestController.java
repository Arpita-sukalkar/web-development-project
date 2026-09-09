package com.yourorg.appname.controller;

import com.yourorg.appname.dto.request.LabTestRequestDto;
import com.yourorg.appname.dto.response.LabTestResponseDto;
import com.yourorg.appname.service.LabTestService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/laboratory")
public class LabTestController {

    private final LabTestService labTestService;

    public LabTestController(LabTestService labTestService) {
        this.labTestService = labTestService;
    }


    @GetMapping
    public ResponseEntity<List<LabTestResponseDto>> getAllLabTests(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String priority,
            @RequestParam(required = false) String category) {
        List<LabTestResponseDto> tests = labTestService.getAllLabTests(status, priority, category);
        return ResponseEntity.ok(tests);
    }

    @GetMapping("/urgent")
    public ResponseEntity<List<LabTestResponseDto>> getUrgentTests() {
        List<LabTestResponseDto> urgent = labTestService.getUrgentTests();
        return ResponseEntity.ok(urgent);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LabTestResponseDto> getLabTestById(@PathVariable Long id) {
        LabTestResponseDto test = labTestService.getLabTestById(id);
        return ResponseEntity.ok(test);
    }

    @PostMapping
    public ResponseEntity<LabTestResponseDto> createLabTest(@Valid @RequestBody LabTestRequestDto request) {
        LabTestResponseDto created = labTestService.createLabTest(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}/result")
    public ResponseEntity<LabTestResponseDto> updateLabTestResult(
            @PathVariable Long id,
            @RequestParam String resultSummary,
            @RequestParam(required = false, defaultValue = "COMPLETED") String status) {
        LabTestResponseDto updated = labTestService.updateLabTestResult(id, resultSummary, status);
        return ResponseEntity.ok(updated);
    }
}
