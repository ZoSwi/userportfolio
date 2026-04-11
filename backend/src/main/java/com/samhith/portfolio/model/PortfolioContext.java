package com.samhith.portfolio.model;

import java.util.List;

public record PortfolioContext(
        String profileSummary,
        List<String> skills,
        List<String> projectHighlights,
        List<String> architecturePrinciples
) {
}
