package com.samhith.portfolio.service;

import com.samhith.portfolio.model.GeneratedAnswer;
import com.samhith.portfolio.model.PortfolioContext;

public interface AnswerGenerator {
    GeneratedAnswer generate(String question, PortfolioContext context);
}
