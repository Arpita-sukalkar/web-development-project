package com.yourorg.appname.repository;

import com.yourorg.appname.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByMrn(String mrn);
    List<Patient> findByCareStatus(String careStatus);
    List<Patient> findByDepartment(String department);
    List<Patient> findByBloodGroup(String bloodGroup);

    @Query("SELECT p FROM Patient p WHERE " +
           "LOWER(p.fullName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.mrn) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.nationalId) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.contactNumber) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Patient> searchPatients(@Param("query") String query);

    long countByCareStatus(String careStatus);

    @Query("SELECT COUNT(p) FROM Patient p WHERE p.active = true")
    long countActivePatients();
}
