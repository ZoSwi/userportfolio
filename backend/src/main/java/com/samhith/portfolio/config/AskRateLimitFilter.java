package com.samhith.portfolio.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class AskRateLimitFilter extends OncePerRequestFilter {

    private final int maxAskRequestsPerMinute;
    private final int maxContactRequestsPerMinute;
    private final ObjectMapper objectMapper;
    private final ConcurrentHashMap<String, WindowCounter> counters = new ConcurrentHashMap<>();

    public AskRateLimitFilter(
            @Value("${resume.assistant.rate-limit.ask.requests-per-minute:30}") int maxAskRequestsPerMinute,
            @Value("${resume.assistant.rate-limit.contact.requests-per-minute:6}") int maxContactRequestsPerMinute,
            ObjectMapper objectMapper
    ) {
        this.maxAskRequestsPerMinute = maxAskRequestsPerMinute;
        this.maxContactRequestsPerMinute = maxContactRequestsPerMinute;
        this.objectMapper = objectMapper;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        if (!"POST".equalsIgnoreCase(request.getMethod())) {
            return true;
        }
        String uri = request.getRequestURI();
        return !"/api/ask".equals(uri) && !"/api/contact/send".equals(uri);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String key = resolveClientKey(request);
        long now = Instant.now().toEpochMilli();
        long currentWindow = now / 60_000L;

        int limit = resolveLimit(request.getRequestURI());
        WindowCounter counter = counters.computeIfAbsent(request.getRequestURI() + "::" + key, ignored -> new WindowCounter(currentWindow));
        synchronized (counter) {
            if (counter.window != currentWindow) {
                counter.window = currentWindow;
                counter.count.set(0);
            }
            if (counter.count.incrementAndGet() > limit) {
                response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                response.getWriter().write(objectMapper.writeValueAsString(Map.of(
                        "message", "Too many requests. Please try again in a minute."
                )));
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

    private int resolveLimit(String uri) {
        if ("/api/contact/send".equals(uri)) {
            return maxContactRequestsPerMinute;
        }
        return maxAskRequestsPerMinute;
    }

    private String resolveClientKey(HttpServletRequest request) {
        String forwardedFor = request.getHeader("X-Forwarded-For");
        if (forwardedFor != null && !forwardedFor.isBlank()) {
            return forwardedFor.split(",")[0].trim();
        }
        String remoteAddr = request.getRemoteAddr();
        return remoteAddr == null ? "unknown" : remoteAddr;
    }

    private static final class WindowCounter {
        private long window;
        private final AtomicInteger count = new AtomicInteger(0);

        private WindowCounter(long window) {
            this.window = window;
        }
    }
}
