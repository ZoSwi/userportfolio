package com.samhith.portfolio.service;

import com.samhith.portfolio.model.AskResponse;
import com.samhith.portfolio.model.AiStatusResponse;
import com.samhith.portfolio.model.ResumeStatusResponse;
import com.samhith.portfolio.model.ResumeUploadResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.List;
import java.util.Locale;
import java.util.regex.Pattern;

@Service
public class AskService {

    private static final Pattern CLIENT_LINE_PATTERN = Pattern.compile("(?i)\\b(client|customer)\\s*:\\s*[^\\n.]+");
    private static final Pattern BANK_OF_PATTERN = Pattern.compile("\\b[Bb]ank\\s+of\\s+[A-Z][A-Za-z]+(?:\\s+[A-Z][A-Za-z]+){0,3}\\b");
    private static final Pattern KNOWN_CLIENT_PATTERN = Pattern.compile("(?i)\\b(bank\\s*of\\s*america|jpmorgan|wells\\s*fargo|citi\\s*bank|citibank|capital\\s*one)\\b");
    private static final Pattern EMAIL_PATTERN = Pattern.compile("(?i)\\b[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}\\b");
    private static final Pattern PHONE_PATTERN = Pattern.compile("(?<!\\d)(?:\\+?1[\\s\\-.]?)?(?:\\(\\d{3}\\)|\\d{3})[\\s\\-.]?\\d{3}[\\s\\-.]?\\d{3,4}(?!\\d)");
    private static final Pattern ADDRESS_PATTERN = Pattern.compile("(?im)^\\s*\\d{2,6}\\s+[A-Za-z0-9.#'\\- ]{3,}\\s(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Drive|Dr|Lane|Ln|Court|Ct|Way)\\b[^\\n]*$");
    private static final Pattern FULL_NAME_PATTERN = Pattern.compile("(?i)\\b(?:samhith(?:\\s+reddy)?\\s+cheruku|cheruku,\\s*samhith(?:\\s+reddy)?)\\b");

    private final ResumeParserService resumeParserService;
    private final ResumeKnowledgeBaseService knowledgeBaseService;
    private final OpenAiResumeAnswerService openAiResumeAnswerService;

    public AskService(
            ResumeParserService resumeParserService,
            ResumeKnowledgeBaseService knowledgeBaseService,
            OpenAiResumeAnswerService openAiResumeAnswerService
    ) {
        this.resumeParserService = resumeParserService;
        this.knowledgeBaseService = knowledgeBaseService;
        this.openAiResumeAnswerService = openAiResumeAnswerService;
    }

    public AskResponse answerQuestion(String question) {
        if (!knowledgeBaseService.hasIndexedResume()) {
            return new AskResponse(
                    "Resume data is not available yet. Please use the contact page to enable resume-based responses.",
                    List.of("Resume Status"),
                    Instant.now()
            );
        }

        if (isBlockedIntent(question)) {
            return new AskResponse(
                    "I can only answer technical resume topics such as architecture, integrations, systems, tools, and project delivery. Personal details are not available.",
                    List.of("Policy Guardrail"),
                    Instant.now()
            );
        }

        ResumeKnowledgeBaseService.RetrievedContext context = knowledgeBaseService.retrieve(question, 4);
        List<ResumeKnowledgeBaseService.IndexedChunk> usableChunks = context.chunks();
        boolean lowConfidence = usableChunks.isEmpty() || knowledgeBaseService.belowConfidenceThreshold(context.bestScore());
        if (lowConfidence && isIntroQuestion(question)) {
            usableChunks = knowledgeBaseService.overviewChunks(4);
            lowConfidence = usableChunks.isEmpty();
        }

        if (lowConfidence) {
            return new AskResponse(
                    "I may not have enough verified technical resume context for that yet.",
                    List.of("No matching section"),
                    Instant.now()
            );
        }

        final List<ResumeKnowledgeBaseService.IndexedChunk> chunksForAnswer = usableChunks;
        String answer = openAiResumeAnswerService.generateAnswer(question, chunksForAnswer)
                .map(this::sanitizeClientPrivacy)
                .orElseGet(() -> sanitizeClientPrivacy(knowledgeBaseService.buildAnswer(question, chunksForAnswer)));
        if (containsSensitivePayload(answer)) {
            answer = "I can only answer technical resume topics such as architecture, integrations, systems, tools, and project delivery. Personal details are not available.";
        }
        List<String> sources = knowledgeBaseService.sourceSections(chunksForAnswer);
        return new AskResponse(answer, sources, Instant.now());
    }

    public ResumeUploadResponse uploadResume(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Resume file is required.");
        }
        String parsedText = resumeParserService.parse(file);
        String name = file.getOriginalFilename() == null ? "resume" : file.getOriginalFilename();
        return knowledgeBaseService.indexResume(name, parsedText);
    }

    public ResumeStatusResponse resumeStatus() {
        return knowledgeBaseService.status();
    }

    public AiStatusResponse aiStatus() {
        return openAiResumeAnswerService.aiStatus();
    }

    private String sanitizeClientPrivacy(String answer) {
        String sanitized = CLIENT_LINE_PATTERN.matcher(answer).replaceAll("Client: Confidential Client");
        sanitized = BANK_OF_PATTERN.matcher(sanitized).replaceAll("Confidential Client");
        sanitized = KNOWN_CLIENT_PATTERN.matcher(sanitized).replaceAll("Confidential Client");
        sanitized = EMAIL_PATTERN.matcher(sanitized).replaceAll("[REDACTED_EMAIL]");
        sanitized = PHONE_PATTERN.matcher(sanitized).replaceAll("[REDACTED_PHONE]");
        sanitized = ADDRESS_PATTERN.matcher(sanitized).replaceAll("[REDACTED_ADDRESS]");
        sanitized = FULL_NAME_PATTERN.matcher(sanitized).replaceAll("Samhith");
        return sanitized;
    }

    private boolean isIntroQuestion(String question) {
        String normalized = question == null ? "" : question.toLowerCase(Locale.ROOT).trim();
        return normalized.contains("tell me about yourself")
                || normalized.contains("about yourself")
                || normalized.contains("introduce yourself")
                || normalized.contains("who are you")
                || normalized.contains("your background")
                || normalized.equals("about you");
    }

    private boolean isBlockedIntent(String question) {
        String normalized = question == null ? "" : question.toLowerCase(Locale.ROOT).trim();
        return containsAny(normalized,
                "write code", "give code", "code snippet", "source code", "algorithm", "leetcode",
                "debug this", "fix this code", "implement", "script for",
                "family", "girlfriend", "boyfriend", "wife", "husband", "religion", "politics",
                "personal life", "address", "home address", "where does he live",
                "phone number", "phone", "mobile", "cell number",
                "full name", "legal name", "last name", "surname",
                "email address", "contact details", "contact info",
                "salary expectation", "date of birth", "dob", "linkedin", "github", "instagram", "twitter",
                "contact", "reach out", "reach him", "reach her", "reach them", "get in touch",
                "share contact", "how to contact", "call him", "email him", "mail id"
        );
    }

    private boolean containsSensitivePayload(String text) {
        if (text == null || text.isBlank()) {
            return false;
        }
        return EMAIL_PATTERN.matcher(text).find()
                || PHONE_PATTERN.matcher(text).find()
                || ADDRESS_PATTERN.matcher(text).find()
                || FULL_NAME_PATTERN.matcher(text).find();
    }

    private boolean containsAny(String text, String... terms) {
        for (String term : terms) {
            if (text.contains(term)) {
                return true;
            }
        }
        return false;
    }
}
