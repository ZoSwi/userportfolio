package com.samhith.portfolio.controller;

import com.samhith.portfolio.model.ContactMessageRequest;
import com.samhith.portfolio.service.ContactEmailService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactEmailService contactEmailService;

    public ContactController(ContactEmailService contactEmailService) {
        this.contactEmailService = contactEmailService;
    }

    @PostMapping("/send")
    public ResponseEntity<Map<String, String>> send(@Valid @RequestBody ContactMessageRequest request) {
        contactEmailService.sendContactMessage(request);
        return ResponseEntity.ok(Map.of("message", "Message sent successfully."));
    }
}
