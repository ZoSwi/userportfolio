package com.samhith.portfolio.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.samhith.portfolio.model.ContactMessageRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class ContactEmailService {

    private final String resendApiKey;
    private final String resendBaseUrl;
    private final String recipientEmail;
    private final String fromAddress;
    private final ObjectMapper objectMapper;
    private final HttpClient httpClient;

    public ContactEmailService(
            @Value("${portfolio.contact.resend.api-key:}") String resendApiKey,
            @Value("${portfolio.contact.resend.base-url:https://api.resend.com}") String resendBaseUrl,
            @Value("${portfolio.contact.recipient-email:samhithc1@gmail.com}") String recipientEmail,
            @Value("${portfolio.contact.from-address:onboarding@resend.dev}") String fromAddress,
            ObjectMapper objectMapper
    ) {
        this.resendApiKey = resendApiKey == null ? "" : resendApiKey.trim();
        this.resendBaseUrl = (resendBaseUrl == null ? "https://api.resend.com" : resendBaseUrl).replaceAll("/+$", "");
        this.recipientEmail = recipientEmail;
        this.fromAddress = fromAddress;
        this.objectMapper = objectMapper;
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
    }

    public void sendContactMessage(ContactMessageRequest request) {
        if (resendApiKey.isBlank()) {
            throw new IllegalArgumentException("Contact email service is not configured yet.");
        }

        try {
            Map<String, Object> payload = new LinkedHashMap<>();
            payload.put("from", fromAddress);
            payload.put("to", List.of(recipientEmail));
            payload.put("reply_to", request.email().trim());
            payload.put("subject", "[Portfolio Contact] " + request.title().trim());
            payload.put("text", buildBody(request));

            String body = objectMapper.writeValueAsString(payload);
            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(URI.create(resendBaseUrl + "/emails"))
                    .timeout(Duration.ofSeconds(20))
                    .header("Authorization", "Bearer " + resendApiKey)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(body))
                    .build();

            HttpResponse<String> response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() >= 300) {
                throw new IllegalArgumentException("Unable to send message right now.");
            }
        } catch (IOException | InterruptedException ex) {
            if (ex instanceof InterruptedException) {
                Thread.currentThread().interrupt();
            }
            throw new IllegalArgumentException("Unable to send message right now.");
        }
    }

    private String buildBody(ContactMessageRequest request) {
        return """
                New contact message from portfolio UI

                Sender Email:
                %s

                Title:
                %s

                Message:
                %s
                """.formatted(
                request.email().trim(),
                request.title().trim(),
                request.message().trim()
        );
    }
}
