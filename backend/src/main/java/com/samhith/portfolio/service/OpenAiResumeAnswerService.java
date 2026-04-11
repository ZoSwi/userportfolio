package com.samhith.portfolio.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.samhith.portfolio.model.AiStatusResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OpenAiResumeAnswerService {

    private static final Logger log = LoggerFactory.getLogger(OpenAiResumeAnswerService.class);
    private static final String FALLBACK_MESSAGE =
            "I may not have enough verified resume context for that yet. Please contact Samhith for a precise answer.";

    private final String apiKey;
    private final String model;
    private final String baseUrl;
    private final double temperature;
    private final ObjectMapper objectMapper;
    private final HttpClient httpClient;
    private volatile String lastError;

    public OpenAiResumeAnswerService(
            @Value("${resume.assistant.zoswi-ai.api-key:}") String apiKey,
            @Value("${resume.assistant.zoswi-ai.model:gpt-4.1-mini}") String model,
            @Value("${resume.assistant.zoswi-ai.base-url:https://api.openai.com}") String baseUrl,
            @Value("${resume.assistant.zoswi-ai.temperature:0.2}") double temperature,
            ObjectMapper objectMapper
    ) {
        this.apiKey = apiKey == null ? "" : apiKey.trim();
        this.model = model;
        this.baseUrl = (baseUrl == null ? "https://api.openai.com" : baseUrl).replaceAll("/+$", "");
        this.temperature = temperature;
        this.objectMapper = objectMapper;
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
        this.lastError = this.apiKey.isBlank() ? "ZoSwi AI key is not set for backend runtime." : "";
    }

    public Optional<String> generateAnswer(String question, List<ResumeKnowledgeBaseService.IndexedChunk> chunks) {
        if (apiKey.isBlank() || chunks.isEmpty()) {
            if (apiKey.isBlank()) {
                lastError = "ZoSwi AI key is not set for backend runtime.";
            }
            return Optional.empty();
        }

        String context = chunks.stream()
                .limit(4)
                .map(chunk -> "Section: " + chunk.section() + "\n" + chunk.text())
                .collect(Collectors.joining("\n\n---\n\n"));

        String systemPrompt = """
                You are a professional resume assistant for Samhith Cheruku.
                Use ONLY the provided resume context.
                Do not invent details.
                Do not provide code, pseudocode, technical implementations, or step-by-step coding solutions.
                Do not answer personal-life or non-professional questions.
                Never reveal client names or customer names; replace with "Confidential Client".
                If the answer is missing in context, reply exactly:
                I may not have enough verified resume context for that yet. Please contact Samhith for a precise answer.
                Keep response concise and professional.
                """;

        String userPrompt = "Question:\n" + question + "\n\nResume Context:\n" + context;

        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("model", model);
        payload.put("temperature", temperature);
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
                String msg = "ZoSwi AI request failed with status " + response.statusCode();
                lastError = msg;
                log.warn(msg);
                return Optional.empty();
            }

            JsonNode root = objectMapper.readTree(response.body());
            String content = root.path("choices").path(0).path("message").path("content").asText("").trim();
            lastError = "";
            if (content.isBlank()) {
                return Optional.of(FALLBACK_MESSAGE);
            }
            return Optional.of(content);
        } catch (IOException | InterruptedException ex) {
            String msg = "ZoSwi AI resume answer request failed: " + ex.getMessage();
            lastError = msg;
            log.warn(msg);
            if (ex instanceof InterruptedException) {
                Thread.currentThread().interrupt();
            }
            return Optional.empty();
        }
    }

    public AiStatusResponse aiStatus() {
        return new AiStatusResponse(
                !apiKey.isBlank(),
                "ZoSwi AI",
                model,
                lastError == null ? "" : lastError
        );
    }
}
