package com.samhith.portfolio.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class HealthController {

    private final String applicationName;
    private final String appVersion;

    public HealthController(
            @Value("${spring.application.name:portfolio-backend}") String applicationName,
            @Value("${APP_VERSION:unknown}") String appVersion
    ) {
        this.applicationName = applicationName;
        this.appVersion = appVersion;
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
                "status", "ok",
                "service", applicationName,
                "version", appVersion,
                "timestamp", Instant.now().toString()
        ));
    }
}
