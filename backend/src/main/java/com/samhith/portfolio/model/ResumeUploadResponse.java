package com.samhith.portfolio.model;

import java.time.Instant;

public record ResumeUploadResponse(
        String message,
        String resumeName,
        String version,
        int chunks,
        Instant indexedAt
) {
}
