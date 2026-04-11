package com.samhith.portfolio.model;

public record AiStatusResponse(
        boolean aiConfigured,
        String provider,
        String model,
        String lastError
) {
}
