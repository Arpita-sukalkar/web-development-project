package com.yourorg.appname.repository;

import com.yourorg.appname.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {
    Optional<Staff> findByEmployeeId(String employeeId);
    List<Staff> findByDepartment(String department);
    List<Staff> findByStatus(String status);
    List<Staff> findByShiftSchedule(String shiftSchedule);
}
