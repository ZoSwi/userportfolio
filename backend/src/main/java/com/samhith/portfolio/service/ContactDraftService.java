package com.samhith.portfolio.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.samhith.portfolio.model.ContactDraftResponse;
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
public class ContactDraftService {

    private final String apiKey;
    private final String model;
    private final String baseUrl;
    private final ObjectMapper objectMapper;
    private final HttpClient httpClient;

    public ContactDraftService(
            @Value("${resume.assistant.zoswi-ai.api-key:}") String apiKey,
            @Value("${resume.assistant.zoswi-ai.model:gpt-4.1-mini}") String model,
            @Value("${resume.assistant.zoswi-ai.base-url:https://api.openai.com}") String baseUrl,
            ObjectMapper objectMapper
    ) {
        this.apiKey = apiKey == null ? "" : apiKey.trim();
        this.model = model;
        this.baseUrl = (baseUrl == null ? "https://api.openai.com" : baseUrl).replaceAll("/+$", "");
        this.objectMapper = objectMapper;
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
    }

    public ContactDraftResponse generateDraft(String prompt, String senderEmail) {
        String cleanPrompt = prompt == null ? "" : prompt.trim();
        if (cleanPrompt.isBlank()) {
            throw new IllegalArgumentException("Please enter what you want to write.");
        }

        if (apiKey.isBlank()) {
            return fallbackDraft(cleanPrompt);
        }

        String systemPrompt = """
                You are ZoSwi AI writing a professional contact email draft.
                Return only valid JSON with keys: title, message.
                Requirements:
                - title: concise, professional, <= 90 chars
                - message: professional outreach email body, 3-7 short paragraphs
                - do not include markdown
                - do not include placeholders like [Your Name]
                - keep tone clear and respectful
                """;

        String userPrompt = """
                Draft an email for this intent:
                %s

                Sender email (optional context):
                %s
                """.formatted(cleanPrompt, senderEmail == null ? "" : senderEmail.trim());

        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("model", model);
        payload.put("temperature", 0.4);
        payload.put("messages", List.of(
                Map.of("role", "system", "content", systemPrompt),
                Map.of("role", "user", "content", userPrompt)
        ));

        try {
            String body = objectMapper.writeValueAsString(payload);
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(baseUrl + "/v1/chat/completions"))
                    .timeout(Duration.ofSeconds(30))
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(body))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() >= 300) {
                return fallbackDraft(cleanPrompt);
            }

            JsonNode root = objectMapper.readTree(response.body());
            String content = root.path("choices").path(0).path("message").path("content").asText("").trim();
            if (content.isBlank()) {
                return fallbackDraft(cleanPrompt);
            }

            try {
                JsonNode draft = objectMapper.readTree(content);
                String title = normalizeTitle(draft.path("title").asText(""));
                String message = normalizeMessage(draft.path("message").asText(""));
                if (title.isBlank() || message.isBlank()) {
                    return fallbackDraft(cleanPrompt);
                }
                return new ContactDraftResponse(title, message);
            } catch (Exception ignored) {
                return fallbackDraft(cleanPrompt);
            }
        } catch (IOException | InterruptedException ex) {
            if (ex instanceof InterruptedException) {
                Thread.currentThread().interrupt();
            }
            return fallbackDraft(cleanPrompt);
        }
    }

    private ContactDraftResponse fallbackDraft(String prompt) {
        String condensed = prompt.length() > 120 ? prompt.substring(0, 120).trim() + "..." : prompt;
        String title = normalizeTitle("Professional Inquiry");
        String message = """
                Hello Samhith,

                I hope you are doing well. I am reaching out regarding %s.

                I would appreciate the opportunity to connect and discuss this further. Please let me know a convenient time to continue the conversation.

                Best regards,
                """.formatted(condensed);
        return new ContactDraftResponse(title, normalizeMessage(message));
    }

    private String normalizeTitle(String raw) {
        if (raw == null) return "";
        String cleaned = raw.replaceAll("[\\r\\n]+", " ").trim();
        return cleaned.length() > 90 ? cleaned.substring(0, 90).trim() : cleaned;
    }

    private String normalizeMessage(String raw) {
        if (raw == null) return "";
        String cleaned = raw.replace("\r\n", "\n").replace("\r", "\n").trim();
        return cleaned.length() > 2500 ? cleaned.substring(0, 2500).trim() : cleaned;
    }
}
