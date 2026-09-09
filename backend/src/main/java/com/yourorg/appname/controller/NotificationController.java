package com.yourorg.appname.controller;

import com.yourorg.appname.dto.response.HospitalNotificationResponseDto;
import com.yourorg.appname.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }


    @GetMapping
    public ResponseEntity<List<HospitalNotificationResponseDto>> getAllNotifications(
            @RequestParam(required = false, defaultValue = "false") Boolean unreadOnly) {
        List<HospitalNotificationResponseDto> notifications = notificationService.getAllNotifications(unreadOnly);
        return ResponseEntity.ok(notifications);
    }

    @GetMapping("/unread-count")
    public ResponseEntity<Map<String, Long>> getUnreadCount() {
        long count = notificationService.getUnreadCount();
        return ResponseEntity.ok(Map.of("count", count));
    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<HospitalNotificationResponseDto> markAsRead(@PathVariable Long id) {
        HospitalNotificationResponseDto notification = notificationService.markAsRead(id);
        return ResponseEntity.ok(notification);
    }

    @PostMapping("/mark-all-read")
    public ResponseEntity<Void> markAllAsRead() {
        notificationService.markAllAsRead();
        return ResponseEntity.ok().build();
    }
}
