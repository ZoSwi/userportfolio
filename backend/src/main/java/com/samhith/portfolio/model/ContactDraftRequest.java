package com.samhith.portfolio.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactDraftRequest(
        @NotBlank(message = "prompt is required")
        @Size(max = 1200, message = "prompt is too long")
        String prompt,

        @Size(max = 160, message = "email is too long")
        @Email(message = "email is invalid")
        String email
) {
}
