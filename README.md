# Samhith Cheruku Premium Portfolio

A premium one-page portfolio built with:

- Frontend: React + Vite + Tailwind CSS + Framer Motion
- Backend: Java + Spring Boot REST API

The website is designed to feel calm, polished, and recruiter-focused, with smooth section reveals and a subtle AI-powered "Ask About My Work" feature.

## Backend Folder Structure

```text
Portfolio/
  backend/
    pom.xml
    src/main/java/com/samhith/portfolio/
      PortfolioApplication.java
      config/CorsConfig.java
      controller/AskController.java
      model/
        AskRequest.java
        AskResponse.java
        GeneratedAnswer.java
        PortfolioContext.java
      service/
        AnswerGenerator.java
        AskService.java
        MockPortfolioAnswerGenerator.java
    src/main/resources/application.properties
```

## Frontend Folder Structure

```text
frontend/
    package.json
    index.html
    tailwind.config.js
    postcss.config.js
    vite.config.js
    .env.example
    public/avatar.svg
    src/
      App.jsx
      main.jsx
      index.css
      components/
        Navbar.jsx
        Hero.jsx
        HighlightStrip.jsx
        About.jsx
        WorkCards.jsx
        PrinciplesSection.jsx
        AskAboutMe.jsx
        SkillsSection.jsx
        ContactSection.jsx
        Reveal.jsx
      data/portfolioData.js
```

## Root Structure

```text
Portfolio/
  backend/
  frontend/
  README.md
```

## Frontend Features

- Floating glassmorphism navbar with scroll-state transition
- Full-screen hero with premium typography, avatar, soft glow, and floating skill tags
- Highlight strip with animated reveal
- About section with concise professional narrative
- Selected work cards with subtle hover lift and border glow
- Engineering principles section with clean motion
- Ask About My Work AI section with response transition
- Skills/tool pill tags with minimal interaction
- Contact section with clean high-contrast CTA layout
- Fully responsive layout optimized for desktop and mobile

## Backend API

### `POST /api/ask`

Request:

```json
{
  "question": "What kind of architecture work have you done?"
}
```

Response:

```json
{
  "answer": "Recent work includes a Unified Integration Gateway...",
  "sources": [
    "projectHighlights"
  ],
  "generatedAt": "2026-04-06T22:10:00.000Z"
}
```

### Architecture Notes

- `AskController` handles HTTP concerns
- `AskService` orchestrates question handling and portfolio context
- `AnswerGenerator` is an abstraction for AI answer providers
- `MockPortfolioAnswerGenerator` provides mock contextual answers today
- You can add `OpenAiAnswerGenerator` later and switch implementations without changing controller logic

## Sample Portfolio Content

Defined in:

- Frontend UI content: `frontend/src/data/portfolioData.js`
- Backend AI context: `backend/src/main/java/com/samhith/portfolio/service/AskService.java`

Includes sample projects, principles, and technology stack aligned with:

- Enterprise Systems
- API Architecture
- Integration Engineering

## Local Setup

### 1. Run Backend

Requirements:

- Java 17+
- Maven 3.9+

Commands:

```bash
cd backend
mvn spring-boot:run
```

Backend starts on `http://localhost:8080`.

### 2. Run Frontend

Requirements:

- Node.js 20+
- npm 10+

Commands:

```bash
cd frontend
npm install
```

Create `.env` from `.env.example` (same values), then run:

```bash
npm run dev
```

Frontend starts on `http://localhost:5173`.

### 3. Build for Production

Frontend:

```bash
cd frontend
npm run build
```

Backend:

```bash
cd backend
mvn clean package
```

## Production Readiness (Cloud Run)

Use this if you want stable daily uptime and faster first response times.

1. Keep at least one backend instance warm:

```bash
gcloud run services update portfolio-backend \
  --region us-central1 \
  --min-instances 1
```

2. Configure backend env vars (including ZoSwi AI + admin key):

```bash
gcloud run services update portfolio-backend \
  --region us-central1 \
  --update-env-vars RESUME_ASSISTANT_ADMIN_KEY=your_strong_key,ZOSWI_AI_KEY=your_zoswi_key,ZOSWI_AI_MODEL=gpt-4.1-mini,ZOSWI_AI_BASE_URL=https://api.openai.com
```

3. Verify service is up:

```bash
curl https://YOUR_BACKEND_URL/api/health
```

4. Optional: add a scheduler warm ping every 5 minutes:

```bash
gcloud scheduler jobs create http portfolio-backend-health-ping \
  --location us-central1 \
  --schedule "*/5 * * * *" \
  --uri "https://YOUR_BACKEND_URL/api/health" \
  --http-method GET
```

5. Add frontend origin for CORS:

```bash
gcloud run services update portfolio-backend \
  --region us-central1 \
  --update-env-vars RESUME_ASSISTANT_CORS_ALLOWED_ORIGINS=https://YOUR_FRONTEND_DOMAIN
```

## Customization

- Update resume/link URLs in `frontend/src/data/portfolioData.js`
- Replace avatar in `frontend/public/avatar.svg`
- Adjust accent styling in `frontend/src/index.css` and `frontend/tailwind.config.js`
