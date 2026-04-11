export const navLinks = [
  { id: "work", label: "Case Studies" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "approach", label: "Approach" },
  { id: "contact", label: "Contact" },
];

export const profile = {
  name: "Samhith Cheruku",
  role: "Application Architect & Software Engineer",
  headline: "Backend systems, integration platforms, and API architecture for teams that need reliability at scale.",
  summary:
    "I design and deliver integration-first platforms with clear contracts, stable delivery paths, and production-minded architecture. My work centers on Java, Spring Boot, APIs, orchestration, observability, and practical system design.",
  availability: "Open to software engineering and architecture opportunities.",
  location: "United States",
  primaryCta: { label: "View Case Studies", target: "work" },
  secondaryCta: {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/samhith-cheruku",
  },
  tertiaryCta: { label: "Contact", target: "contact" },
};

export const heroStats = [
  { value: "Backend", label: "Systems focus" },
  { value: "APIs", label: "Integration depth" },
  { value: "Scale", label: "Architecture mindset" },
  { value: "Delivery", label: "Execution discipline" },
];

export const highlights = [
  {
    label: "Architecture",
    value: "Service boundaries, contracts, and platform design",
  },
  {
    label: "Integration",
    value: "Enterprise APIs, orchestration, and system connectivity",
  },
  {
    label: "Reliability",
    value: "Production readiness, observability, and resilient delivery",
  },
];

export const proofPoints = [
  {
    title: "Architect for Operational Resilience",
    body: "I define durable service contracts, observability-first workflows, and failure-aware patterns that stay predictable under production load.",
  },
  {
    title: "Convert System Complexity Into Delivery",
    body: "I bridge architecture and implementation through clear API boundaries, integration sequencing, and execution plans teams can ship against.",
  },
  {
    title: "Engineer for Throughput and Change Safety",
    body: "I optimize for release velocity with guardrails: testable components, measurable performance, and low-risk evolution of core services.",
  },
];

export const projects = [
  {
    title: "Unified Integration Gateway",
    eyebrow: "Case Study 01",
    description:
      "Designed a centralized gateway to connect legacy services, partner systems, and modern APIs through a more maintainable integration layer.",
    outcome:
      "Improved service interoperability, simplified downstream integration patterns, and created clearer operational visibility.",
    tags: ["Java", "Spring Boot", "MuleSoft", "Architecture"],
    bullets: [
      "Defined cleaner boundaries between core services and external dependencies.",
      "Improved observability and fault handling for multi-system traffic.",
      "Reduced complexity in partner-facing integration flows.",
    ],
  },
  {
    title: "Order Lifecycle Platform",
    eyebrow: "Case Study 02",
    description:
      "Built backend services that orchestrated order workflows across distributed systems with stronger consistency and clearer service ownership.",
    outcome:
      "Reduced operational friction across workflow states and gave teams a more predictable platform for feature delivery.",
    tags: ["Microservices", "REST APIs", "PostgreSQL", "Docker"],
    bullets: [
      "Modeled service interactions around clear API contracts and state transitions.",
      "Improved reliability for high-touch operational workflows.",
      "Created a better base for future workflow expansion.",
    ],
  },
  {
    title: "Release Reliability Dashboard",
    eyebrow: "Case Study 03",
    description:
      "Delivered an internal engineering dashboard focused on release insight, deployment confidence, and operational signal visibility.",
    outcome:
      "Enabled faster issue detection and clearer release visibility for engineering stakeholders.",
    tags: ["React", "Jenkins", "Observability", "DevOps"],
    bullets: [
      "Aggregated release and deployment signals into one operational surface.",
      "Improved visibility during release cycles and handoffs.",
      "Helped teams identify delivery issues earlier.",
    ],
  },
];

export const experience = [
  {
    role: "Application Architect",
    company: "Enterprise Platform Work",
    period: "Recent",
    summary:
      "Focused on integration architecture, backend system design, and platform-oriented engineering for enterprise environments.",
    points: [
      "Designed API-led service flows and integration patterns for multi-system environments.",
      "Worked across architecture and implementation to keep delivery aligned with system intent.",
      "Emphasized maintainability, reliability, and operational clarity in system design.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Backend and Full-Stack Delivery",
    period: "Earlier",
    summary:
      "Built services, internal tools, and workflow-oriented applications with attention to delivery quality and production behavior.",
    points: [
      "Delivered backend services and internal tooling with Java, Spring Boot, and modern frontend support where needed.",
      "Contributed to release quality, deployment visibility, and engineering operations improvements.",
      "Collaborated with cross-functional stakeholders to turn technical ambiguity into executable work.",
    ],
  },
];

export const principles = [
  {
    title: "Design for long-term operation",
    body: "I favor stable interfaces, observable flows, and systems that remain understandable after handoff.",
  },
  {
    title: "Clarity over complexity",
    body: "I prioritize explicit interfaces, understandable service boundaries, and decisions that remain readable over time.",
  },
  {
    title: "Architecture as execution support",
    body: "Good architecture should reduce delivery friction, not become a layer of abstraction that teams fight against.",
  },
  {
    title: "Reliable systems first",
    body: "I optimize for stable behavior, operational insight, and change safety before novelty.",
  },
  {
    title: "Practical engineering judgment",
    body: "I choose approaches that fit the business problem, team constraints, and long-term maintenance reality.",
  },
];

export const capabilities = [
  {
    title: "Platform Thinking",
    body: "Designing systems as durable operating surfaces, not isolated features.",
  },
  {
    title: "Integration Design",
    body: "Connecting services, external systems, and workflows with clear contracts.",
  },
  {
    title: "Production Readiness",
    body: "Observability, failure handling, and operational feedback built into delivery.",
  },
  {
    title: "Cross-Team Execution",
    body: "Turning architecture direction into implementation paths teams can actually ship.",
  },
];

export const techStack = [
  { name: "Java", symbol: "J", color: "#f97316", description: "Core backend delivery" },
  { name: "Spring Boot", symbol: "S", color: "#22c55e", description: "Service architecture" },
  { name: "React", symbol: "R", color: "#38bdf8", description: "Product-facing interfaces" },
  { name: "TypeScript", symbol: "TS", color: "#60a5fa", description: "Typed frontend engineering" },
  { name: "Node.js", symbol: "N", color: "#22c55e", description: "Service tooling and runtime support" },
  { name: "PostgreSQL", symbol: "P", color: "#60a5fa", description: "Relational data design" },
  { name: "Oracle", symbol: "O", color: "#fb7185", description: "Enterprise data workloads" },
  { name: "MongoDB", symbol: "MG", color: "#34d399", description: "Document data models" },
  { name: "MySQL", symbol: "MY", color: "#60a5fa", description: "Transactional data services" },
  { name: "Redis", symbol: "RD", color: "#ef4444", description: "Caching and fast state access" },
  { name: "Kafka", symbol: "KF", color: "#d1d5db", description: "Event streaming backbone" },
  { name: "RabbitMQ", symbol: "RM", color: "#f97316", description: "Message broker patterns" },
  { name: "Docker", symbol: "D", color: "#06b6d4", description: "Environment consistency" },
  { name: "Kubernetes", symbol: "K8", color: "#8b5cf6", description: "Container orchestration" },
  { name: "Terraform", symbol: "TF", color: "#8b5cf6", description: "Infrastructure as code" },
  { name: "Jenkins", symbol: "JK", color: "#f59e0b", description: "CI and release automation" },
  { name: "GitHub Actions", symbol: "GA", color: "#94a3b8", description: "Workflow automation" },
  { name: "SonarQube", symbol: "SQ", color: "#14b8a6", description: "Code quality governance" },
  { name: "AWS", symbol: "AW", color: "#f97316", description: "Cloud infrastructure services" },
  { name: "Azure", symbol: "AZ", color: "#0ea5e9", description: "Enterprise cloud platform" },
  { name: "MuleSoft", symbol: "M", color: "#0ea5e9", description: "Enterprise integration" },
  { name: "Microservices", symbol: "MS", color: "#8b5cf6", description: "Distributed architecture" },
  { name: "REST APIs", symbol: "API", color: "#14b8a6", description: "Contract-first communication" },
  { name: "GraphQL", symbol: "GQL", color: "#ec4899", description: "Schema-driven APIs" },
  { name: "OpenAPI", symbol: "OA", color: "#38bdf8", description: "Contract specification" },
  { name: "SOAP", symbol: "SP", color: "#94a3b8", description: "Legacy enterprise interoperability" },
  { name: "Prometheus", symbol: "PM", color: "#f59e0b", description: "Metrics collection" },
  { name: "Grafana", symbol: "GF", color: "#f97316", description: "Operational dashboards" },
  { name: "ELK Stack", symbol: "ELK", color: "#eab308", description: "Centralized logging and search" },
  { name: "Splunk", symbol: "SPK", color: "#84cc16", description: "Operational analytics" },
  { name: "JUnit", symbol: "JT", color: "#22c55e", description: "Automated test reliability" },
  { name: "Mockito", symbol: "MO", color: "#60a5fa", description: "Service-level testing" },
  { name: "Linux", symbol: "LX", color: "#94a3b8", description: "Production runtime operations" },
  { name: "Git", symbol: "G", color: "#f97316", description: "Version control and collaboration" },
];

export const askSuggestions = [
  "How do you approach API architecture?",
  "What kind of backend systems have you built?",
  "How do you balance architecture with delivery speed?",
];

export const contactLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/samhith-cheruku" },
  { label: "GitHub", href: "https://github.com/samhithcheruku" },
];
