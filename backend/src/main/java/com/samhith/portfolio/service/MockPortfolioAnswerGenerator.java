package com.samhith.portfolio.service;

import com.samhith.portfolio.model.GeneratedAnswer;
import com.samhith.portfolio.model.PortfolioContext;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Component
public class MockPortfolioAnswerGenerator implements AnswerGenerator {

    @Override
    public GeneratedAnswer generate(String question, PortfolioContext context) {
        String normalized = question.toLowerCase(Locale.ROOT);
        List<String> sources = new ArrayList<>();
        String answer;

        if (containsAny(normalized, "project", "work", "built", "delivery")) {
            answer = "Recent work includes a Unified Integration Gateway, an Order Lifecycle Platform, and a Release Reliability Dashboard. "
                    + "The focus has been integration-first design, reliable APIs, and measurable platform stability outcomes.";
            sources.add("projectHighlights");
        } else if (containsAny(normalized, "skill", "stack", "technology", "tools", "experience")) {
            String skills = context.skills().stream().limit(8).collect(Collectors.joining(", "));
            answer = "Core strengths include " + skills + ", with practical experience in enterprise integration and scalable backend architecture.";
            sources.add("skills");
        } else if (containsAny(normalized, "architecture", "design", "approach", "principle", "think")) {
            answer = "Samhith approaches systems with clarity over complexity, scalable architecture, and practical engineering decisions. "
                    + "The goal is clean contracts, resilient integrations, and maintainable long-term delivery.";
            sources.add("architecturePrinciples");
        } else if (containsAny(normalized, "contact", "hire", "reach", "email", "linkedin")) {
            answer = "You can connect through LinkedIn, GitHub, or email from the contact section. "
                    + "Samhith is open to architecture-focused and backend engineering opportunities.";
            sources.add("profileSummary");
        } else {
            answer = context.profileSummary()
                    + " Ask about projects, architecture, or technical strengths for a deeper breakdown.";
            sources.add("profileSummary");
        }

        return new GeneratedAnswer(answer, sources);
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
