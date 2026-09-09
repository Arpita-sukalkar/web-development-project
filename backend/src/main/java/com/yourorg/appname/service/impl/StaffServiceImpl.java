package com.yourorg.appname.service.impl;

import com.yourorg.appname.dto.request.StaffRequestDto;
import com.yourorg.appname.dto.response.StaffResponseDto;
import com.yourorg.appname.entity.Staff;
import com.yourorg.appname.exception.ResourceNotFoundException;
import com.yourorg.appname.mapper.EntityDtoMapper;
import com.yourorg.appname.repository.StaffRepository;
import com.yourorg.appname.service.StaffService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class StaffServiceImpl implements StaffService {

    private final StaffRepository staffRepository;
    private final EntityDtoMapper mapper;

    public StaffServiceImpl(StaffRepository staffRepository, EntityDtoMapper mapper) {
        this.staffRepository = staffRepository;
        this.mapper = mapper;
    }


    @Override
    @Transactional(readOnly = true)
    public List<StaffResponseDto> getAllStaff(String department, String status) {
        List<Staff> list = staffRepository.findAll();

        return list.stream()
                .filter(s -> department == null || department.equalsIgnoreCase("ALL") || s.getDepartment().equalsIgnoreCase(department))
                .filter(s -> status == null || status.equalsIgnoreCase("ALL") || s.getStatus().equalsIgnoreCase(status))
                .map(mapper::toStaffDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public StaffResponseDto getStaffById(Long id) {
        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Staff member not found with id: " + id));
        return mapper.toStaffDto(staff);
    }

    @Override
    @Transactional
    public StaffResponseDto createStaff(StaffRequestDto request) {
        String empId = request.getEmployeeId();
        if (empId == null || empId.trim().isEmpty()) {
            empId = "EMP-" + (1000 + new Random().nextInt(9000));
        }

        Staff staff = Staff.builder()
                .employeeId(empId)
                .fullName(request.getFullName().trim())
                .roleTitle(request.getRoleTitle())
                .department(request.getDepartment())
                .shiftSchedule(request.getShiftSchedule())
                .contactNumber(request.getContactNumber().trim())
                .email(request.getEmail().trim())
                .status(request.getStatus() != null ? request.getStatus() : "ACTIVE")
                .avatarUrl(request.getAvatarUrl() != null ? request.getAvatarUrl() : "https://lh3.googleusercontent.com/aida-public/AB6AXuCc-5FW2-kDj9vjWcFTbQeMtHsrUnFIUoEERp652okMy5k7lcbbUHhflp0WXKvD4BxIbar_3DrU2UH2boPh8j6LSAtdOY_u2vbsoQMj7bs1MSAs3WFK_jqYRJr3N5ZtSBEqHSz23VCJOJ4xssSPwFz0SiKDmmydbNqNqnLMBvyl7GzKugtzWqwXnKlUDTwaJKIDR3tKz8HrJwWmScogHyovtc-ur_HWPGTDRdWaTqkZJpRoLUJ2vfl3gQ")
                .build();

        Staff saved = staffRepository.save(staff);
        return mapper.toStaffDto(saved);
    }

    @Override
    @Transactional
    public StaffResponseDto updateStaff(Long id, StaffRequestDto request) {
        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Staff member not found with id: " + id));

        staff.setFullName(request.getFullName().trim());
        staff.setRoleTitle(request.getRoleTitle());
        staff.setDepartment(request.getDepartment());
        staff.setShiftSchedule(request.getShiftSchedule());
        staff.setContactNumber(request.getContactNumber().trim());
        staff.setEmail(request.getEmail().trim());
        if (request.getStatus() != null) staff.setStatus(request.getStatus());

        Staff updated = staffRepository.save(staff);
        return mapper.toStaffDto(updated);
    }
}
