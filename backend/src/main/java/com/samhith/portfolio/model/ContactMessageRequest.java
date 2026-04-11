package com.samhith.portfolio.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactMessageRequest(
        @NotBlank(message = "email is required")
        @Email(message = "email is invalid")
        @Size(max = 160, message = "email is too long")
        String email,

        @NotBlank(message = "title is required")
        @Size(max = 180, message = "title is too long")
        String title,

        @NotBlank(message = "message is required")
        @Size(max = 4000, message = "message is too long")
        String message
) {
}
