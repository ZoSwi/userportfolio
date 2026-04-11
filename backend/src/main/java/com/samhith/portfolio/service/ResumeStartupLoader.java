package com.samhith.portfolio.service;

import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;

@Component
public class ResumeStartupLoader {

    private static final Logger log = LoggerFactory.getLogger(ResumeStartupLoader.class);

    private final String configuredPath;
    private final ResumeParserService resumeParserService;
    private final ResumeKnowledgeBaseService knowledgeBaseService;

    public ResumeStartupLoader(
            @Value("${resume.assistant.local-path:}") String configuredPath,
            ResumeParserService resumeParserService,
            ResumeKnowledgeBaseService knowledgeBaseService
    ) {
        this.configuredPath = configuredPath == null ? "" : configuredPath.trim();
        this.resumeParserService = resumeParserService;
        this.knowledgeBaseService = knowledgeBaseService;
    }

    @PostConstruct
    public void loadOnStartup() {
        if (configuredPath.isBlank()) {
            log.info("Resume startup loader skipped: resume.assistant.local-path is not set.");
            return;
        }

        Path path = Path.of(configuredPath);
        if (!Files.exists(path)) {
            log.warn("Resume startup loader skipped: path does not exist: {}", path);
            return;
        }

        Path resumeFile = resolveResumeFile(path);
        if (resumeFile == null) {
            log.warn("Resume startup loader skipped: no supported resume file found at {}", path);
            return;
        }

        try {
            String parsed = resumeParserService.parsePath(resumeFile);
            knowledgeBaseService.indexResume(resumeFile.getFileName().toString(), parsed);
            log.info("Resume indexed on startup from {}", resumeFile);
        } catch (Exception ex) {
            log.error("Failed to auto-index resume from {}: {}", resumeFile, ex.getMessage());
        }
    }

    private Path resolveResumeFile(Path path) {
        if (Files.isRegularFile(path) && isSupported(path)) {
            return path;
        }
        if (!Files.isDirectory(path)) {
            return null;
        }
        try {
            List<Path> candidates = Files.list(path)
                    .filter(Files::isRegularFile)
                    .filter(this::isSupported)
                    .sorted(Comparator.comparingLong(this::lastModified).reversed())
                    .toList();
            return candidates.isEmpty() ? null : candidates.get(0);
        } catch (IOException ex) {
            return null;
        }
    }

    private long lastModified(Path path) {
        try {
            return Files.getLastModifiedTime(path).toMillis();
        } catch (IOException ex) {
            return 0L;
        }
    }

    private boolean isSupported(Path file) {
        String name = file.getFileName().toString().toLowerCase(Locale.ROOT);
        return name.endsWith(".pdf")
                || name.endsWith(".docx")
                || name.endsWith(".txt")
                || name.endsWith(".md");
    }
}
