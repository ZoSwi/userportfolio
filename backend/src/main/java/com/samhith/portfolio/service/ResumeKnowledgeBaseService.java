package com.samhith.portfolio.service;

import com.samhith.portfolio.model.ResumeStatusResponse;
import com.samhith.portfolio.model.ResumeUploadResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class ResumeKnowledgeBaseService {

    private static final Pattern TOKEN_PATTERN = Pattern.compile("[a-z0-9+#.]+");
    private static final Pattern CLIENT_QUALIFIED_NAME_PATTERN = Pattern.compile(
            "(?i)\\b(client|customer)\\s+([A-Z][A-Za-z0-9&.,'/-]*(?:\\s+[A-Z][A-Za-z0-9&.,'/-]*){0,4})\\b"
    );
    private static final Pattern CLIENT_LABEL_PATTERN = Pattern.compile(
            "(?i)\\b(client|customer)\\s*:\\s*([^\\n.]+)"
    );
    private static final Pattern BANK_OF_PATTERN = Pattern.compile(
            "\\b[Bb]ank\\s+of\\s+[A-Z][A-Za-z]+(?:\\s+[A-Z][A-Za-z]+){0,3}\\b"
    );
    private static final Pattern ORG_SUFFIX_PATTERN = Pattern.compile(
            "\\b[A-Z][A-Za-z0-9&.,'/-]*(?:\\s+[A-Z][A-Za-z0-9&.,'/-]*){0,4}\\s(?:Inc|LLC|Ltd|Corp|Corporation|Company|Technologies|Technology|Systems|Services|Bank|Healthcare|Hospital|University)\\b"
    );
    private static final Pattern EMAIL_PATTERN = Pattern.compile("(?i)\\b[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}\\b");
    private static final Pattern PHONE_PATTERN = Pattern.compile("(?<!\\d)(?:\\+?1[\\s\\-.]?)?(?:\\(\\d{3}\\)|\\d{3})[\\s\\-.]?\\d{3}[\\s\\-.]?\\d{3,4}(?!\\d)");
    private static final Pattern ADDRESS_PATTERN = Pattern.compile("(?im)^\\s*\\d{2,6}\\s+[A-Za-z0-9.#'\\- ]{3,}\\s(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Drive|Dr|Lane|Ln|Court|Ct|Way)\\b[^\\n]*$");
    private static final Pattern FULL_NAME_PATTERN = Pattern.compile("(?i)\\b(?:samhith(?:\\s+reddy)?\\s+cheruku|cheruku,\\s*samhith(?:\\s+reddy)?)\\b");
    private static final Set<String> STOP_WORDS = new HashSet<>(List.of(
            "a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "has", "have", "he", "her", "his",
            "i", "in", "is", "it", "its", "of", "on", "or", "that", "the", "their", "them", "they", "this", "to",
            "was", "were", "will", "with", "you", "your"
    ));

    private final double minScoreThreshold;
    private volatile IndexedResume indexedResume;

    public ResumeKnowledgeBaseService(
            @Value("${resume.assistant.min-score-threshold:0.11}") double minScoreThreshold
    ) {
        this.minScoreThreshold = minScoreThreshold;
    }

    public synchronized ResumeUploadResponse indexResume(String resumeName, String rawResumeText) {
        String normalized = sanitizeSensitiveDetails(normalizeText(rawResumeText));
        if (normalized.isBlank()) {
            throw new IllegalArgumentException("Resume contains no readable text.");
        }

        List<RawChunk> rawChunks = chunkResume(normalized);
        List<IndexedChunk> chunks = new ArrayList<>();
        for (int i = 0; i < rawChunks.size(); i++) {
            RawChunk rawChunk = rawChunks.get(i);
            Map<String, Integer> tf = termFrequency(rawChunk.text());
            if (tf.isEmpty()) {
                continue;
            }
            double norm = l2Norm(tf);
            chunks.add(new IndexedChunk("chunk-" + (i + 1), rawChunk.section(), rawChunk.text(), tf, norm));
        }

        if (chunks.isEmpty()) {
            throw new IllegalArgumentException("Resume parsing succeeded but no searchable chunks were produced.");
        }

        String version = UUID.randomUUID().toString();
        Instant indexedAt = Instant.now();
        indexedResume = new IndexedResume(resumeName, version, indexedAt, chunks);
        return new ResumeUploadResponse("Resume indexed successfully.", resumeName, version, chunks.size(), indexedAt);
    }

    public ResumeStatusResponse status() {
        IndexedResume resume = indexedResume;
        if (resume == null) {
            return new ResumeStatusResponse(false, null, null, 0, null);
        }
        return new ResumeStatusResponse(
                true,
                resume.resumeName(),
                resume.version(),
                resume.chunks().size(),
                resume.indexedAt()
        );
    }

    public boolean hasIndexedResume() {
        return indexedResume != null;
    }

    public List<IndexedChunk> overviewChunks(int limit) {
        IndexedResume resume = indexedResume;
        if (resume == null || resume.chunks().isEmpty()) {
            return List.of();
        }

        List<IndexedChunk> prioritized = resume.chunks().stream()
                .sorted(Comparator.comparingInt(chunk -> sectionPriority(chunk.section())))
                .limit(Math.max(1, limit))
                .toList();
        return prioritized;
    }

    public RetrievedContext retrieve(String question, int limit) {
        IndexedResume resume = indexedResume;
        if (resume == null) {
            return new RetrievedContext(List.of(), 0.0);
        }

        Map<String, Integer> queryTf = termFrequency(question);
        double queryNorm = l2Norm(queryTf);
        if (queryTf.isEmpty() || queryNorm == 0.0) {
            return new RetrievedContext(List.of(), 0.0);
        }

        List<ScoredChunk> scored = resume.chunks().stream()
                .map(chunk -> new ScoredChunk(chunk, similarity(queryTf, queryNorm, chunk, question)))
                .sorted(Comparator.comparingDouble(ScoredChunk::score).reversed())
                .limit(Math.max(1, limit))
                .toList();

        double bestScore = scored.isEmpty() ? 0.0 : scored.get(0).score();
        List<IndexedChunk> chunks = scored.stream()
                .filter(scoredChunk -> scoredChunk.score() > 0)
                .map(ScoredChunk::chunk)
                .toList();

        return new RetrievedContext(chunks, bestScore);
    }

    public boolean belowConfidenceThreshold(double score) {
        // Keep resume-only behavior, but avoid rejecting clearly relevant lexical matches.
        return score <= 0.0 || score < minScoreThreshold;
    }

    public String buildAnswer(String question, List<IndexedChunk> chunks) {
        if (chunks.isEmpty()) {
            return "I don't see that in Samhith's resume.";
        }

        Set<String> queryTerms = tokenize(question);
        List<String> selectedSentences = new ArrayList<>();
        for (IndexedChunk chunk : chunks) {
            for (String sentence : splitSentences(chunk.text())) {
                if (selectedSentences.size() >= 4) {
                    break;
                }
                String lower = sentence.toLowerCase(Locale.ROOT);
                boolean relevant = queryTerms.isEmpty() || queryTerms.stream().anyMatch(lower::contains);
                if (relevant && sentence.length() > 25) {
                    selectedSentences.add(sentence.trim());
                }
            }
        }

        if (selectedSentences.isEmpty()) {
            selectedSentences = chunks.stream()
                    .limit(2)
                    .map(IndexedChunk::text)
                    .map(text -> text.length() > 260 ? text.substring(0, 260) + "..." : text)
                    .collect(Collectors.toList());
        }

        return sanitizeClientReferences(String.join(" ", selectedSentences));
    }

    public List<String> sourceSections(List<IndexedChunk> chunks) {
        LinkedHashSet<String> sections = chunks.stream()
                .map(IndexedChunk::section)
                .collect(Collectors.toCollection(LinkedHashSet::new));
        return new ArrayList<>(sections);
    }

    private List<RawChunk> chunkResume(String text) {
        List<RawChunk> chunks = new ArrayList<>();
        String activeSection = "General";
        StringBuilder builder = new StringBuilder();

        for (String line : text.split("\\n")) {
            String trimmed = line.trim();
            if (trimmed.isBlank()) {
                flushChunk(chunks, activeSection, builder);
                continue;
            }

            String maybeSection = extractSectionHeading(trimmed);
            if (maybeSection != null) {
                flushChunk(chunks, activeSection, builder);
                activeSection = maybeSection;
                continue;
            }

            if (builder.length() > 0) {
                builder.append(' ');
            }
            builder.append(trimmed);
            if (builder.length() > 720) {
                flushChunk(chunks, activeSection, builder);
            }
        }

        flushChunk(chunks, activeSection, builder);
        return chunks;
    }

    private void flushChunk(List<RawChunk> chunks, String section, StringBuilder builder) {
        String text = builder.toString().trim();
        if (!text.isBlank()) {
            chunks.add(new RawChunk(section, text));
        }
        builder.setLength(0);
    }

    private String extractSectionHeading(String line) {
        String normalized = line.toLowerCase(Locale.ROOT).replace(":", "").trim();
        Set<String> sectionHints = Set.of(
                "summary", "profile", "about", "experience", "work experience", "projects", "skills", "education",
                "certifications", "awards", "publications", "contact"
        );
        if (sectionHints.contains(normalized)) {
            return titleCase(normalized);
        }
        if (line.length() <= 40 && line.equals(line.toUpperCase(Locale.ROOT)) && line.matches("[A-Z\\s&/-]+")) {
            return titleCase(normalized);
        }
        return null;
    }

    private String titleCase(String input) {
        return Arrays.stream(input.split("\\s+"))
                .map(word -> word.isBlank() ? word : Character.toUpperCase(word.charAt(0)) + word.substring(1))
                .collect(Collectors.joining(" "));
    }

    private String normalizeText(String text) {
        return text.replace("\r", "")
                .replace("back-end", "backend")
                .replace("front-end", "frontend")
                .replace("Back-end", "Backend")
                .replace("Front-end", "Frontend")
                .replace('\t', ' ')
                .replace('\u00A0', ' ')
                .replaceAll("[ ]{2,}", " ")
                .replaceAll("\\n{3,}", "\n\n")
                .trim();
    }

    private Map<String, Integer> termFrequency(String text) {
        Map<String, Integer> tf = new HashMap<>();
        for (String token : tokenize(text)) {
            tf.merge(token, 1, Integer::sum);
        }
        return tf;
    }

    private Set<String> tokenize(String text) {
        Set<String> tokens = new LinkedHashSet<>();
        Matcher matcher = TOKEN_PATTERN.matcher(text.toLowerCase(Locale.ROOT));
        while (matcher.find()) {
            String token = matcher.group();
            if (token.length() < 2 || STOP_WORDS.contains(token)) {
                continue;
            }
            tokens.add(token);
            String stemmed = simpleStem(token);
            if (!stemmed.equals(token) && !STOP_WORDS.contains(stemmed)) {
                tokens.add(stemmed);
            }
        }
        return tokens;
    }

    private String simpleStem(String token) {
        if (token.length() > 4 && token.endsWith("ies")) {
            return token.substring(0, token.length() - 3) + "y";
        }
        if (token.length() > 3 && token.endsWith("es")) {
            return token.substring(0, token.length() - 2);
        }
        if (token.length() > 3 && token.endsWith("s")) {
            return token.substring(0, token.length() - 1);
        }
        return token;
    }

    private double l2Norm(Map<String, Integer> tf) {
        double sumSquares = 0.0;
        for (Integer value : tf.values()) {
            sumSquares += value * value;
        }
        return Math.sqrt(sumSquares);
    }

    private double similarity(Map<String, Integer> queryTf, double queryNorm, IndexedChunk chunk, String question) {
        if (queryNorm == 0.0 || chunk.norm() == 0.0) {
            return 0.0;
        }

        double dot = 0.0;
        for (Map.Entry<String, Integer> queryTerm : queryTf.entrySet()) {
            dot += queryTerm.getValue() * chunk.termFrequency().getOrDefault(queryTerm.getKey(), 0);
        }

        double cosine = dot / (queryNorm * chunk.norm());
        String lowerQuestion = question.toLowerCase(Locale.ROOT).trim();
        double phraseBonus = lowerQuestion.length() >= 8
                && chunk.text().toLowerCase(Locale.ROOT).contains(lowerQuestion) ? 0.08 : 0.0;
        return cosine + phraseBonus;
    }

    private List<String> splitSentences(String text) {
        return Arrays.stream(text.split("(?<=[.!?])\\s+"))
                .map(String::trim)
                .filter(s -> !s.isBlank())
                .toList();
    }

    private int sectionPriority(String section) {
        String normalized = section == null ? "" : section.toLowerCase(Locale.ROOT);
        if (normalized.contains("summary") || normalized.contains("profile") || normalized.contains("about")) {
            return 0;
        }
        if (normalized.contains("experience") || normalized.contains("work")) {
            return 1;
        }
        if (normalized.contains("skills")) {
            return 2;
        }
        if (normalized.contains("projects")) {
            return 3;
        }
        return 4;
    }

    private String sanitizeClientReferences(String text) {
        String redacted = CLIENT_LABEL_PATTERN.matcher(text)
                .replaceAll("Client: Confidential Client");
        redacted = CLIENT_QUALIFIED_NAME_PATTERN.matcher(redacted)
                .replaceAll("$1 Confidential Client");
        redacted = BANK_OF_PATTERN.matcher(redacted)
                .replaceAll("Confidential Client");
        redacted = ORG_SUFFIX_PATTERN.matcher(redacted)
                .replaceAll("Confidential Client");
        redacted = EMAIL_PATTERN.matcher(redacted)
                .replaceAll("[REDACTED_EMAIL]");
        redacted = PHONE_PATTERN.matcher(redacted)
                .replaceAll("[REDACTED_PHONE]");
        redacted = ADDRESS_PATTERN.matcher(redacted)
                .replaceAll("[REDACTED_ADDRESS]");
        redacted = FULL_NAME_PATTERN.matcher(redacted)
                .replaceAll("Samhith");
        return redacted;
    }

    private String sanitizeSensitiveDetails(String text) {
        String redacted = EMAIL_PATTERN.matcher(text).replaceAll("[REDACTED_EMAIL]");
        redacted = PHONE_PATTERN.matcher(redacted).replaceAll("[REDACTED_PHONE]");
        redacted = ADDRESS_PATTERN.matcher(redacted).replaceAll("[REDACTED_ADDRESS]");
        redacted = FULL_NAME_PATTERN.matcher(redacted).replaceAll("Samhith");
        return redacted;
    }

    public record RetrievedContext(List<IndexedChunk> chunks, double bestScore) {
    }

    public record IndexedChunk(
            String id,
            String section,
            String text,
            Map<String, Integer> termFrequency,
            double norm
    ) {
    }

    private record RawChunk(String section, String text) {
    }

    private record IndexedResume(
            String resumeName,
            String version,
            Instant indexedAt,
            List<IndexedChunk> chunks
    ) {
    }

    private record ScoredChunk(IndexedChunk chunk, double score) {
    }
}
