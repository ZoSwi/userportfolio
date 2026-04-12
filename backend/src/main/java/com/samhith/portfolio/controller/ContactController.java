package com.samhith.portfolio.controller;

import com.samhith.portfolio.model.ContactDraftRequest;
import com.samhith.portfolio.model.ContactDraftResponse;
import com.samhith.portfolio.model.ContactMessageRequest;
import com.samhith.portfolio.service.ContactDraftService;
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
    private final ContactDraftService contactDraftService;

    public ContactController(ContactEmailService contactEmailService, ContactDraftService contactDraftService) {
        this.contactEmailService = contactEmailService;
        this.contactDraftService = contactDraftService;
    }

    @PostMapping("/send")
    public ResponseEntity<Map<String, String>> send(@Valid @RequestBody ContactMessageRequest request) {
        contactEmailService.sendContactMessage(request);
        return ResponseEntity.ok(Map.of("message", "Message sent successfully."));
    }

    @PostMapping("/draft")
    public ResponseEntity<ContactDraftResponse> draft(@Valid @RequestBody ContactDraftRequest request) {
        ContactDraftResponse response = contactDraftService.generateDraft(request.prompt(), request.email());
        return ResponseEntity.ok(response);
    }
}
