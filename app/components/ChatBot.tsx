"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  retrievedSources?: string[];
  suggestedPrompts?: string[];
  timestamp: string;
}

interface KnowledgeChunk {
  id: string;
  topic: string;
  keywords: string[];
  source: string;
  content: string;
}

const KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: "appsec-cves",
    topic: "AppSec & CVE Remediation",
    keywords: [
      "cve",
      "appsec",
      "security",
      "mythos",
      "vulnerability",
      "xss",
      "ssrf",
      "sqli",
      "injection",
      "shell",
      "viom",
      "bulletin",
      "pentest",
      "tim",
      "hawktrace",
      "owasp",
      "cve-2026-44923",
      "cve-2026-44924",
      "cve-2026-44925",
    ],
    source: "AppSec Advisory · CVE Bulletin & Mythos Remediation",
    content: `Rishabh has deep hands-on expertise in Application Security (AppSec) and CVE remediation:
• **Official Security Bulletin**: Published advisory for InfoScale Operations Manager (VIOM 9.1 & 9.2) addressing **CVE-2026-44923**, **CVE-2026-44924**, and **CVE-2026-44925**.
• **Team Collaboration**: Worked alongside **TIM Security Group**, **HawkTrace**, and **CSG PenTest** teams to isolate, reproduce, and patch critical zero-day vulnerabilities.
• **Remediated Attack Classes**:
  - **Cross-Site Scripting (XSS)**: Reflected, stored, and DOM-based XSS mitigation using context-aware output encoding, strict CSP headers without \`unsafe-inline\`, OWASP Java HTML Sanitizer, and DOMPurify.
  - **Command & Shell Injection**: Eradicated unescaped shell execution, transitioned to parameterized \`ProcessBuilder\` with explicit argument arrays, and enforced input allowlists.
  - **Server-Side Request Forgery (SSRF)**: Enforced pre-flight DNS resolution against RFC-1918/loopback ranges, disabled client HTTP redirects, and mandated AWS IMDSv2.
  - **SQL & Query Injection (SQLi)**: Converted dynamic strings to 100% parameterized queries via Spring Data JPA and Hibernate Criteria.
  - **CSRF & Session Security**: Synchronizer Token pattern (\`CookieCsrfTokenRepository\`), \`SameSite=Strict\`, and \`HttpOnly/Secure\` cookie attributes.`,
  },
  {
    id: "ai-rag",
    topic: "RAG & LLM Diagnostic Architecture",
    keywords: [
      "rag",
      "llm",
      "ai",
      "diagnostics",
      "emap",
      "quick assist",
      "elasticsearch",
      "langchain",
      "retrieval",
      "vector",
      "recommendations",
      "nlp",
    ],
    source: "AI Architecture · EMAP & Quick Assist Engineering",
    content: `Rishabh engineered AI-assisted diagnostics for enterprise systems using a **RAG (Retrieval-Augmented Generation) and LLM architecture**:
• **EMAP & Quick Assist**: Built automated log analysis, evidence processing, and diagnostic workflows for enterprise cluster operations.
• **RAG Pipeline**: Leveraged Java, Python, Elasticsearch, and LLM orchestration to retrieve relevant system symptoms, historical resolution tickets, and telemetry evidence.
• **Outcome**: Generated grounded, hallucination-resistant troubleshooting steps and root-cause explanations for enterprise support engineers and automated remediation pipelines.`,
  },
  {
    id: "tech-stack",
    topic: "Technical Stack & Tools",
    keywords: [
      "stack",
      "skills",
      "languages",
      "frameworks",
      "tools",
      "java",
      "spring",
      "python",
      "kubernetes",
      "aws",
      "docker",
      "burp",
      "sonarqube",
      "elasticsearch",
      "redis",
    ],
    source: "Tech Stack & Engineering Skills",
    content: `Rishabh's technical skillset spans backend, cloud infrastructure, and security:
• **Languages**: Java (8, 11, 17, 21), Python, JavaScript, TypeScript, SQL, C/C++
• **Frameworks**: Spring Boot, Spring MVC, Spring Data JPA, Spring Security, Hibernate, FastAPI, Angular
• **Cloud & DevOps**: Kubernetes, Docker, AWS (EC2, S3, IAM, CloudWatch), Jenkins CI/CD, Maven, Grafana
• **Data & Storage**: Elasticsearch, Redis, PostgreSQL, MySQL
• **AppSec & Testing**: Burp Suite, SonarQube, HawkTrace, OWASP ZAP, JUnit, Mockito, JaCoCo`,
  },
  {
    id: "career-roles",
    topic: "Career Experience & Companies",
    keywords: [
      "experience",
      "career",
      "roles",
      "company",
      "companies",
      "veritas",
      "arctera",
      "cloud software group",
      "csg",
      "cognizant",
      "l&t",
      "lnt",
      "infoscale",
      "viom",
      "years",
    ],
    source: "Career History · 6+ Years Experience",
    content: `Rishabh has over 6 years of professional engineering experience across enterprise software leaders:
1. **Cloud Software Group (InfoScale)** (Sept 2023 – Present): Senior Application Development Engineer (IC3). Led VIOM 9.1 & 9.2 feature enhancements, CVE remediation, and EMAP/Quick Assist RAG diagnostics.
2. **Arctera / Veritas Technologies** (Acquired by Cohesity / CSG): Delivered high-availability clustering and critical security hardening.
3. **Cognizant Technologies** (Nov 2022 – Sept 2023): Built REST APIs and responsive Angular SPA for BBVA's digital assets banking platform on AWS.
4. **L&T Infotech** (Jun 2020 – Nov 2022): Developed Java microservices and Angular components for Citi's global trading P&L platform with robust unit test coverage.`,
  },
  {
    id: "resume-contact",
    topic: "Resume Download & Contact Channels",
    keywords: [
      "resume",
      "cv",
      "download",
      "pdf",
      "contact",
      "email",
      "phone",
      "hire",
      "available",
      "reach",
      "linkedin",
      "github",
    ],
    source: "Contact & Resume Information",
    content: `You can reach Rishabh directly or download his verified resume:
• **Resume Download**: [Download Rishabh Kumar's Resume (PDF)](/resume/Rishabh_Kumar_Resume_CloudSoftwareGroup.pdf)
• **Email**: [Rishabh.Kumr@outlook.com](mailto:Rishabh.Kumr@outlook.com)
• **Phone**: [+91-8077619658](tel:+918077619658)
• **LinkedIn**: [linkedin.com/in/devrishabhkumar](https://www.linkedin.com/in/devrishabhkumar/)
• **GitHub**: [github.com/RishabhKumr](https://github.com/RishabhKumr)
• **Availability**: Currently open to Senior Software Engineer, Full-Stack, and AppSec roles worldwide.`,
  },
  {
    id: "blog-writings",
    topic: "Technical Security Articles",
    keywords: [
      "blog",
      "articles",
      "posts",
      "writings",
      "xss post",
      "csrf post",
      "ssrf post",
      "read",
      "publications",
    ],
    source: "Technical Security Publications",
    content: `Rishabh has written technical deep-dives into web security:
1. **Cross-Site Scripting (XSS) in Java Web Apps**: Explores reflected, stored, and DOM XSS vulnerabilities with Spring Security and OWASP sanitizer defenses.
2. **CSRF Attacks and Spring Security Defences**: Covers token synchronization patterns, SameSite cookies, and protection for cookie-based session apps.
3. **SSRF in Java: Abusing Your Own Backend**: Details cloud metadata exfiltration prevention, RFC-1918 blocking, and WebClient filters.
All articles are published and readable in the [/blog](/blog) section.`,
  },
];

const CAPABILITY_CHIPS = [
  "AppSec & CVE remediation",
  "RAG & LLM architecture",
  "Tech stack & frameworks",
  "Career history & roles",
  "Download resume / Contact",
];

let globalMsgId = 0;
function getNextId() {
  globalMsgId += 1;
  return `msg-${globalMsgId}`;
}

function getCurrentTime() {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

// RAG Search Function (at module level)
function retrieveRelevantKnowledge(query: string): { chunks: KnowledgeChunk[]; sources: string[] } {
  const qLower = query.toLowerCase();
  const queryTokens = qLower.split(/[\s,?.!]+/).filter((t) => t.length > 2);

  const scoredChunks = KNOWLEDGE_BASE.map((chunk) => {
    let score = 0;
    for (const token of queryTokens) {
      if (chunk.keywords.some((kw) => kw.includes(token) || token.includes(kw))) {
        score += 3;
      }
      if (chunk.topic.toLowerCase().includes(token)) {
        score += 4;
      }
      if (chunk.content.toLowerCase().includes(token)) {
        score += 1;
      }
    }
    return { chunk, score };
  });

  scoredChunks.sort((a, b) => b.score - a.score);

  // Pick top matching chunks
  const matches = scoredChunks.filter((item) => item.score > 0);
  if (matches.length === 0) {
    // Fallback: return general profile
    return {
      chunks: [KNOWLEDGE_BASE[0], KNOWLEDGE_BASE[2]],
      sources: [KNOWLEDGE_BASE[0].source, KNOWLEDGE_BASE[2].source],
    };
  }

  const selected = matches.slice(0, 2).map((m) => m.chunk);
  return {
    chunks: selected,
    sources: selected.map((s) => s.source),
  };
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "👋 Hi! I am **Rishabh's AI Assistant**, powered by **RAG (Retrieval-Augmented Generation) & LLM knowledge indexing**.\n\nI can answer questions regarding Rishabh's **enterprise software engineering**, **CVE security remediations**, **RAG/AI diagnostics**, and **technical stack**.",
      retrievedSources: ["Knowledge Index: AppSec, VIOM CVEs, Career, Tech Stack"],
      suggestedPrompts: [
        "What CVEs has Rishabh remediated?",
        "Explain his RAG & LLM diagnostics experience",
        "What is his core technical stack?",
        "How can I download his resume?",
      ],
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCapabilities, setShowCapabilities] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isTyping) return;

    const userMessage: Message = {
      id: getNextId(),
      sender: "user",
      text: query,
      timestamp: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Execute simulated RAG pipeline: Query Parsing -> Embedding/Vector Search -> LLM Context Synthesis
    setTimeout(() => {
      const { chunks, sources } = retrieveRelevantKnowledge(query);

      let reply = "";
      const queryLower = query.toLowerCase();

      if (
        queryLower.includes("cve") ||
        queryLower.includes("appsec") ||
        queryLower.includes("security") ||
        queryLower.includes("mythos") ||
        queryLower.includes("xss") ||
        queryLower.includes("ssrf") ||
        queryLower.includes("vulnerabilit")
      ) {
        reply = `**RAG Context Synthesis: AppSec & CVE Remediation**\n\n${chunks[0].content}\n\n💡 *Rishabh has collaborated extensively with security teams to deliver production-grade patches for enterprise web surfaces.*`;
      } else if (
        queryLower.includes("rag") ||
        queryLower.includes("llm") ||
        queryLower.includes("ai") ||
        queryLower.includes("diagnostics") ||
        queryLower.includes("emap")
      ) {
        reply = `**RAG Context Synthesis: AI & Diagnostic Engineering**\n\n${chunks.find((c) => c.id === "ai-rag")?.content || chunks[0].content}\n\n💡 *Rishabh combines modern generative AI and retrieval techniques with reliable distributed backend systems.*`;
      } else if (
        queryLower.includes("resume") ||
        queryLower.includes("contact") ||
        queryLower.includes("email") ||
        queryLower.includes("phone") ||
        queryLower.includes("hire") ||
        queryLower.includes("download")
      ) {
        reply = `**RAG Context Synthesis: Resume & Contact Channels**\n\n${chunks.find((c) => c.id === "resume-contact")?.content || chunks[0].content}\n\n📄 *You can download the PDF resume immediately or reach out via email!*`;
      } else if (
        queryLower.includes("stack") ||
        queryLower.includes("skill") ||
        queryLower.includes("java") ||
        queryLower.includes("spring") ||
        queryLower.includes("python") ||
        queryLower.includes("cloud")
      ) {
        reply = `**RAG Context Synthesis: Tech Stack & Tools**\n\n${chunks.find((c) => c.id === "tech-stack")?.content || chunks[0].content}`;
      } else if (
        queryLower.includes("experience") ||
        queryLower.includes("company") ||
        queryLower.includes("role") ||
        queryLower.includes("career") ||
        queryLower.includes("background")
      ) {
        reply = `**RAG Context Synthesis: Career Experience**\n\n${chunks.find((c) => c.id === "career-roles")?.content || chunks[0].content}`;
      } else if (
        queryLower.includes("blog") ||
        queryLower.includes("article") ||
        queryLower.includes("writing")
      ) {
        reply = `**RAG Context Synthesis: Security Writings**\n\n${chunks.find((c) => c.id === "blog-writings")?.content || chunks[0].content}`;
      } else {
        reply = `Based on Rishabh's portfolio context chunks:\n\n${chunks
          .map((c) => `### ${c.topic}\n${c.content}`)
          .join("\n\n")}\n\nFeel free to ask more specific questions about his **AppSec work**, **RAG/LLM diagnostics**, **tech stack**, or **resume**!`;
      }

      const botMessage: Message = {
        id: getNextId(),
        sender: "bot",
        text: reply,
        retrievedSources: sources,
        suggestedPrompts: [
          "What CVEs has Rishabh remediated?",
          "Tell me about his tech stack",
          "Download his resume",
        ].filter((p) => p.toLowerCase() !== query.toLowerCase()).slice(0, 2),
        timestamp: getCurrentTime(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 750);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const renderFormattedText = (text: string) => {
    // Quick custom formatter for markdown bold, bullet points, and links
    const lines = text.split("\n");
    return (
      <div className="space-y-1.5 leading-relaxed text-sm">
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} className="h-1" />;

          // Process bold (**...**)
          let formattedLine: React.ReactNode = line;
          if (line.includes("**")) {
            const parts = line.split(/\*\*(.*?)\*\*/g);
            formattedLine = parts.map((part, pIdx) =>
              pIdx % 2 === 1 ? (
                <strong key={pIdx} className="text-white font-semibold">
                  {part}
                </strong>
              ) : (
                part
              )
            );
          }

          // Process links [text](url)
          if (typeof formattedLine === "string" && formattedLine.includes("[")) {
            const linkMatch = line.match(/\[(.*?)\]\((.*?)\)/);
            if (linkMatch) {
              const [full, linkText, url] = linkMatch;
              const [before, after] = line.split(full);
              formattedLine = (
                <>
                  {before}
                  <a
                    href={url}
                    target={url.startsWith("http") || url.endsWith(".pdf") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 font-medium inline-flex items-center gap-0.5"
                  >
                    {linkText}
                    {url.endsWith(".pdf") && <span className="text-xs">↓</span>}
                  </a>
                  {after}
                </>
              );
            }
          }

          if (line.startsWith("• ") || line.startsWith("- ")) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="text-violet-400 font-bold mt-1 text-xs">●</span>
                <span className="text-zinc-300 flex-1">{formattedLine}</span>
              </div>
            );
          }

          if (line.startsWith("### ")) {
            return (
              <h4 key={idx} className="text-violet-300 font-bold text-sm mt-2 mb-1">
                {line.replace("### ", "")}
              </h4>
            );
          }

          return (
            <p key={idx} className="text-zinc-300">
              {formattedLine}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 font-sans">
      {/* ─── CHAT WINDOW MODAL ────────────────────────────────────── */}
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-2.5rem)] sm:w-[420px] h-[580px] max-h-[82vh] rounded-2xl border border-white/12 bg-[#101014]/95 backdrop-blur-2xl shadow-2xl shadow-black/80 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 border-b border-white/10 bg-gradient-to-r from-violet-950/40 via-purple-900/30 to-cyan-950/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-500 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-violet-900/40">
                  ⚡
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-[#101014]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white tracking-tight">Rishabh AI</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 font-semibold tracking-wide">
                    RAG + LLM
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Grounded Vector Knowledge Base
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowCapabilities((v) => !v)}
                title="View Chatbot Capabilities"
                className={`p-1.5 rounded-lg border text-xs transition-colors ${
                  showCapabilities
                    ? "bg-violet-500/20 border-violet-500/40 text-violet-300"
                    : "border-white/10 text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                ✨ Capabilities
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Minimize Chat"
                className="p-1.5 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* RAG & LLM Info Banner */}
          <div className="px-3.5 py-1.5 bg-violet-950/30 border-b border-violet-500/20 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
            <span className="flex items-center gap-1 text-violet-300">
              <span>🧠</span> Retrieval-Augmented Generation
            </span>
            <span className="text-zinc-500">Fast Grounding</span>
          </div>

          {/* Capabilities Drawer (Collapsible) */}
          {showCapabilities && (
            <div className="p-3 bg-[#14131d] border-b border-white/10 text-xs text-zinc-300 space-y-2 animate-in slide-in-from-top-2 duration-150">
              <p className="font-semibold text-white flex items-center gap-1 text-[11px] uppercase tracking-wider text-violet-400">
                <span>🤖</span> What can this RAG Chatbot answer?
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { label: "🛡️ AppSec & CVEs", query: "What CVEs did Rishabh remediate?" },
                  { label: "🧠 RAG & AI Experience", query: "Explain his RAG and LLM diagnostic work" },
                  { label: "💻 Tech Stack", query: "What is his tech stack and frameworks?" },
                  { label: "📄 Resume Download", query: "How can I download Rishabh's resume?" },
                ].map((cap) => (
                  <button
                    key={cap.label}
                    onClick={() => {
                      setShowCapabilities(false);
                      handleSend(cap.query);
                    }}
                    className="p-2 rounded-lg bg-white/4 hover:bg-white/8 border border-white/8 text-left transition-colors text-[11px]"
                  >
                    <p className="font-semibold text-zinc-200">{cap.label}</p>
                    <p className="text-[10px] text-zinc-400 truncate mt-0.5">{cap.query}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
            {messages.map((m) => {
              const isUser = m.sender === "user";
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      isUser
                        ? "bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-md shadow-violet-950/40 rounded-br-xs"
                        : "bg-white/[0.06] border border-white/10 text-zinc-200 rounded-bl-xs"
                    }`}
                  >
                    {isUser ? (
                      <p className="leading-relaxed">{m.text}</p>
                    ) : (
                      renderFormattedText(m.text)
                    )}

                    {/* Retrieved Sources Citation Badge */}
                    {!isUser && m.retrievedSources && m.retrievedSources.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-white/10 flex flex-wrap gap-1.5 items-center">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                          RAG Sources:
                        </span>
                        {m.retrievedSources.map((src, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/20 text-cyan-300"
                          >
                            🔍 {src}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] text-zinc-500 mt-1 px-1">{m.timestamp}</span>

                  {/* Suggested follow-up prompt chips */}
                  {!isUser && m.suggestedPrompts && m.suggestedPrompts.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[85%]">
                      {m.suggestedPrompts.map((prompt, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(prompt)}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 text-violet-300 transition-colors text-left"
                        >
                          {prompt} →
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex flex-col items-start animate-pulse">
                <div className="rounded-2xl px-4 py-3 bg-white/[0.06] border border-white/10 text-zinc-400 rounded-bl-xs flex items-center gap-2 text-xs font-mono">
                  <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="inline-block w-2 h-2 rounded-full bg-violet-400 animate-bounce [animation-delay:0.15s]" />
                  <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 animate-bounce [animation-delay:0.3s]" />
                  <span className="ml-1 text-zinc-400">Retrieving context & generating with LLM...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Capability Chips */}
          <div className="px-3 py-1.5 border-t border-white/5 bg-black/40 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-mono text-zinc-500 shrink-0">Try:</span>
            {CAPABILITY_CHIPS.map((chip) => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                className="text-[11px] whitespace-nowrap px-2.5 py-0.5 rounded-full bg-white/4 hover:bg-white/10 border border-white/8 text-zinc-400 hover:text-white transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 border-t border-white/10 bg-[#0d0d10]">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about AppSec, RAG, tech stack, resume..."
                className="flex-1 bg-white/[0.05] border border-white/10 focus:border-violet-500/50 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none transition-colors"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold text-xs transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-violet-900/30 flex items-center gap-1 shrink-0"
              >
                <span>Send</span>
                <span className="text-xs">↑</span>
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-500 font-mono px-1">
              <span>RAG Knowledge Index v1.0</span>
              <a
                href="/resume/Rishabh_Kumar_Resume_CloudSoftwareGroup.pdf"
                download="Rishabh_Kumar_Resume.pdf"
                className="text-violet-400 hover:underline flex items-center gap-0.5"
              >
                Resume PDF ↓
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ─── HOVER / FLOATING LAUNCHER BUTTON ─────────────────────── */}
      <div className="flex items-center gap-2.5 justify-end">
        {/* Tooltip badge visible when closed */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#13121d]/90 hover:bg-[#1a1827] border border-violet-500/30 text-xs text-zinc-300 hover:text-white shadow-xl shadow-black/60 transition-all group backdrop-blur-md cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-medium">Ask AI</span>
            <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
              RAG
            </span>
          </button>
        )}

        <button
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? "Close AI Chatbot" : "Open AI Chatbot"}
          className="relative group p-3.5 rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white shadow-2xl shadow-violet-900/50 hover:scale-105 transition-all duration-200 cursor-pointer flex items-center justify-center"
        >
          {/* Subtle pulse ring around button */}
          <span className="absolute inset-0 rounded-2xl bg-cyan-400/20 animate-ping pointer-events-none" />

          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <div className="flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              {/* Badge for RAG */}
              <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-cyan-400 text-black shadow-md">
                AI
              </span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
