package com.samhith.portfolio.controller;

import com.samhith.portfolio.model.AskRequest;
import com.samhith.portfolio.model.AskResponse;
import com.samhith.portfolio.model.ResumeUploadResponse;
import com.samhith.portfolio.service.AskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api")
public class AskController {

    private final AskService askService;
    private final String adminKey;

    public AskController(
            AskService askService,
            @Value("${resume.assistant.admin-key:}") String adminKey
    ) {
        this.askService = askService;
        this.adminKey = adminKey == null ? "" : adminKey;
    }

    @PostMapping("/ask")
    public ResponseEntity<AskResponse> askAboutWork(@Valid @RequestBody AskRequest request) {
        AskResponse response = askService.answerQuestion(request.question());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/admin/resume/upload")
    public ResponseEntity<?> uploadResume(
            @RequestParam("file") MultipartFile file,
            @RequestHeader(value = "X-Resume-Admin-Key", required = false) String providedKey
    ) {
        if (!isAdminEndpointAuthorized(providedKey)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized admin request.");
        }
        ResumeUploadResponse response = askService.uploadResume(file);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/resume/status")
    public ResponseEntity<?> resumeStatus(
            @RequestHeader(value = "X-Resume-Admin-Key", required = false) String providedKey
    ) {
        if (!isAdminEndpointAuthorized(providedKey)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized admin request.");
        }
        return ResponseEntity.ok(askService.resumeStatus());
    }

    @GetMapping("/resume/ai-status")
    public ResponseEntity<?> aiStatus(
            @RequestHeader(value = "X-Resume-Admin-Key", required = false) String providedKey
    ) {
        if (!isAdminEndpointAuthorized(providedKey)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized admin request.");
        }
        return ResponseEntity.ok(askService.aiStatus());
    }

    private boolean isAdminEndpointAuthorized(String providedKey) {
        return !adminKey.isBlank() && adminKey.equals(providedKey);
    }
}
