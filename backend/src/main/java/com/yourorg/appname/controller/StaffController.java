package com.yourorg.appname.controller;

import com.yourorg.appname.dto.request.StaffRequestDto;
import com.yourorg.appname.dto.response.StaffResponseDto;
import com.yourorg.appname.service.StaffService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
public class StaffController {

    private final StaffService staffService;

    public StaffController(StaffService staffService) {
        this.staffService = staffService;
    }


    @GetMapping
    public ResponseEntity<List<StaffResponseDto>> getAllStaff(
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String status) {
        List<StaffResponseDto> staffList = staffService.getAllStaff(department, status);
        return ResponseEntity.ok(staffList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StaffResponseDto> getStaffById(@PathVariable Long id) {
        StaffResponseDto staff = staffService.getStaffById(id);
        return ResponseEntity.ok(staff);
    }

    @PostMapping
    public ResponseEntity<StaffResponseDto> createStaff(@Valid @RequestBody StaffRequestDto request) {
        StaffResponseDto created = staffService.createStaff(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StaffResponseDto> updateStaff(
            @PathVariable Long id, @Valid @RequestBody StaffRequestDto request) {
        StaffResponseDto updated = staffService.updateStaff(id, request);
        return ResponseEntity.ok(updated);
    }
}
