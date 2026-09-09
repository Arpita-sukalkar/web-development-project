package com.yourorg.appname.repository;

import com.yourorg.appname.entity.Admission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdmissionRepository extends JpaRepository<Admission, Long> {
    List<Admission> findByStatus(String status);
    List<Admission> findByWard(String ward);
    List<Admission> findByTriageAcuity(String triageAcuity);
    List<Admission> findByPatientId(Long patientId);

    @Query("SELECT a FROM Admission a WHERE a.status = 'ADMITTED' ORDER BY a.admissionDateTime DESC")
    List<Admission> findActiveAdmissions();

    @Query("SELECT COUNT(a) FROM Admission a WHERE a.status = 'ADMITTED'")
    long countActiveAdmissions();

    @Query("SELECT COUNT(a) FROM Admission a WHERE a.status = 'ADMITTED' AND a.triageAcuity = 'IMMEDIATE'")
    long countEmergencyCriticalCases();
}
