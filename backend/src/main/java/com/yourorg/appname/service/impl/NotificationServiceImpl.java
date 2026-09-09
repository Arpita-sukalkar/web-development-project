package com.yourorg.appname.service.impl;

import com.yourorg.appname.dto.response.HospitalNotificationResponseDto;
import com.yourorg.appname.entity.HospitalNotification;
import com.yourorg.appname.exception.ResourceNotFoundException;
import com.yourorg.appname.mapper.EntityDtoMapper;
import com.yourorg.appname.repository.HospitalNotificationRepository;
import com.yourorg.appname.service.NotificationService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final HospitalNotificationRepository notificationRepository;
    private final EntityDtoMapper mapper;

    public NotificationServiceImpl(HospitalNotificationRepository notificationRepository, EntityDtoMapper mapper) {
        this.notificationRepository = notificationRepository;
        this.mapper = mapper;
    }


    @Override
    @Transactional(readOnly = true)
    public List<HospitalNotificationResponseDto> getAllNotifications(Boolean unreadOnly) {
        List<HospitalNotification> list = (unreadOnly != null && unreadOnly)
                ? notificationRepository.findByReadFalseOrderByCreatedAtDesc()
                : notificationRepository.findByOrderByCreatedAtDesc();

        return list.stream().map(mapper::toNotificationDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public HospitalNotificationResponseDto markAsRead(Long id) {
        HospitalNotification n = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found with id: " + id));
        n.setRead(true);
        HospitalNotification updated = notificationRepository.save(n);
        return mapper.toNotificationDto(updated);
    }

    @Override
    @Transactional
    public void markAllAsRead() {
        List<HospitalNotification> unread = notificationRepository.findByReadFalseOrderByCreatedAtDesc();
        unread.forEach(n -> n.setRead(true));
        notificationRepository.saveAll(unread);
    }

    @Override
    @Transactional(readOnly = true)
    public long getUnreadCount() {
        return notificationRepository.countByReadFalse();
    }

    @Override
    @Transactional
    public HospitalNotificationResponseDto createNotification(String title, String message, String type, String priority, String department) {
        HospitalNotification n = HospitalNotification.builder()
                .title(title)
                .message(message)
                .notificationType(type != null ? type : "INFO")
                .priority(priority != null ? priority : "MEDIUM")
                .targetDepartment(department)
                .read(false)
                .build();
        HospitalNotification saved = notificationRepository.save(n);
        return mapper.toNotificationDto(saved);
    }
}
