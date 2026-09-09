package com.yourorg.appname.repository;

import com.yourorg.appname.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatientId(Long patientId);
    List<Appointment> findByDoctorId(Long doctorId);
    List<Appointment> findByStatus(String status);
    List<Appointment> findByDepartment(String department);

    @Query("SELECT a FROM Appointment a WHERE a.appointmentDateTime BETWEEN :start AND :end ORDER BY a.appointmentDateTime ASC")
    List<Appointment> findAppointmentsBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT COUNT(a) FROM Appointment a WHERE a.appointmentDateTime BETWEEN :start AND :end")
    long countAppointmentsBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT COUNT(a) FROM Appointment a WHERE a.appointmentDateTime BETWEEN :start AND :end AND a.status = 'COMPLETED'")
    long countCompletedAppointmentsBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}
