package com.samhith.portfolio.model;

import java.time.Instant;
import java.util.List;

public record AskResponse(
        String answer,
        List<String> sources,
        Instant generatedAt
) {
}
