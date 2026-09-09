package com.yourorg.appname.repository;

import com.yourorg.appname.entity.Billing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface BillingRepository extends JpaRepository<Billing, Long> {
    Optional<Billing> findByInvoiceNumber(String invoiceNumber);
    List<Billing> findByPaymentStatus(String paymentStatus);
    List<Billing> findByPatientId(Long patientId);

    @Query("SELECT COALESCE(SUM(b.totalAmount), 0) FROM Billing b WHERE b.invoiceDate BETWEEN :start AND :end")
    BigDecimal sumTotalRevenueBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT COUNT(b) FROM Billing b WHERE b.paymentStatus = 'PENDING'")
    long countPendingInvoices();
}
