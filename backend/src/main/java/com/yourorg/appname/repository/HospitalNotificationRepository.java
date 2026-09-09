package com.yourorg.appname.repository;

import com.yourorg.appname.entity.HospitalNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HospitalNotificationRepository extends JpaRepository<HospitalNotification, Long> {
    List<HospitalNotification> findByOrderByCreatedAtDesc();
    List<HospitalNotification> findByReadFalseOrderByCreatedAtDesc();
    long countByReadFalse();
}
