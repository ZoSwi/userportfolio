package com.samhith.portfolio.model;

import jakarta.validation.constraints.NotBlank;

public record AskRequest(
        @NotBlank(message = "question is required")
        String question
) {
}
