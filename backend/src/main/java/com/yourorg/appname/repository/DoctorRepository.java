package com.yourorg.appname.repository;

import com.yourorg.appname.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findByLicenseNumber(String licenseNumber);
    List<Doctor> findBySpecialty(String specialty);
    List<Doctor> findByStatus(String status);
    List<Doctor> findByDepartment(String department);

    @Query("SELECT COUNT(d) FROM Doctor d WHERE d.status = 'ON_DUTY'")
    long countOnDuty();
}
