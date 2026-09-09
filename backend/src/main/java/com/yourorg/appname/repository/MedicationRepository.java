package com.yourorg.appname.repository;

import com.yourorg.appname.entity.Medication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MedicationRepository extends JpaRepository<Medication, Long> {
    Optional<Medication> findByDrugCode(String drugCode);
    List<Medication> findByCategory(String category);

    @Query("SELECT m FROM Medication m WHERE m.stockQuantity <= m.reorderLevel")
    List<Medication> findLowStockMedications();

    @Query("SELECT COUNT(m) FROM Medication m WHERE m.stockQuantity <= m.reorderLevel")
    long countLowStockMedications();
}
