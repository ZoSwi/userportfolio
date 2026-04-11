package com.samhith.portfolio.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class ResumeParserService {

    public String parse(MultipartFile file) {
        String filename = file.getOriginalFilename() == null ? "resume.txt" : file.getOriginalFilename();
        try {
            return parseFrom(filename, file.getInputStream());
        } catch (IOException ex) {
            throw new IllegalArgumentException("Failed to parse resume file.", ex);
        }
    }

    public String parsePath(Path filePath) {
        String filename = filePath.getFileName().toString();
        try (InputStream stream = Files.newInputStream(filePath)) {
            return parseFrom(filename, stream);
        } catch (IOException ex) {
            throw new IllegalArgumentException("Failed to parse resume file from path: " + filePath, ex);
        }
    }

    private String parseFrom(String filename, InputStream stream) throws IOException {
        String lower = filename.toLowerCase(Locale.ROOT);
        if (lower.endsWith(".pdf")) {
            return parsePdf(stream);
        }
        if (lower.endsWith(".docx")) {
            return parseDocx(stream);
        }
        if (lower.endsWith(".txt") || lower.endsWith(".md")) {
            return new String(stream.readAllBytes(), StandardCharsets.UTF_8);
        }
        throw new IllegalArgumentException("Unsupported file type. Use PDF, DOCX, TXT, or MD.");
    }

    private String parsePdf(InputStream stream) throws IOException {
        try (PDDocument document = PDDocument.load(stream)) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        }
    }

    private String parseDocx(InputStream stream) throws IOException {
        try (XWPFDocument document = new XWPFDocument(stream)) {
            return document.getParagraphs().stream()
                    .map(p -> p.getText() == null ? "" : p.getText())
                    .collect(Collectors.joining("\n"));
        }
    }
}
