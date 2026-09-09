package com.yourorg.appname.repository;

import com.yourorg.appname.entity.LabTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LabTestRepository extends JpaRepository<LabTest, Long> {
    Optional<LabTest> findByTestCode(String testCode);
    List<LabTest> findByStatus(String status);
    List<LabTest> findByPriority(String priority);
    List<LabTest> findByPatientId(Long patientId);
    List<LabTest> findByCategory(String category);
    long countByPriorityAndStatusNot(String priority, String status);
}
