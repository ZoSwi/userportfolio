package com.samhith.portfolio.model;

import java.time.Instant;

public record ResumeStatusResponse(
        boolean indexed,
        String resumeName,
        String version,
        int chunks,
        Instant indexedAt
) {
}
