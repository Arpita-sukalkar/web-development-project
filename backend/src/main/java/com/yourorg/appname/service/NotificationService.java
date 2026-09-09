package com.yourorg.appname.service;

import com.yourorg.appname.dto.response.HospitalNotificationResponseDto;

import java.util.List;

public interface NotificationService {
    List<HospitalNotificationResponseDto> getAllNotifications(Boolean unreadOnly);
    HospitalNotificationResponseDto markAsRead(Long id);
    void markAllAsRead();
    long getUnreadCount();
    HospitalNotificationResponseDto createNotification(String title, String message, String type, String priority, String department);
}
