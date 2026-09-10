package com.yourorg.appname.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
public class HealthController {

    private final Instant startTime = Instant.now();

    @GetMapping
    public ResponseEntity<Map<String, Object>> checkHealth() {
        Map<String, Object> health = new LinkedHashMap<>();
        health.put("status", "UP");
        health.put("service", "CarePulse HMS Backend API");
        health.put("uptimeSeconds", Instant.now().getEpochSecond() - startTime.getEpochSecond());
        health.put("timestamp", Instant.now().toString());
        return ResponseEntity.ok(health);
    }
}
