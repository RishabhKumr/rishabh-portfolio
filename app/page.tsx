import Link from "next/link";
import BinarySearchGame from "./components/BinarySearchGame";
import BugSquash from "./components/BugSquash";
import { posts } from "./blog/data";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans">
      {/* ─── NAV ──────────────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 backdrop-blur-xl bg-[#0d0d0d]/80">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            {/* RK */}
          </span>
          <div className="hidden sm:flex items-center gap-5 md:gap-7 lg:gap-8 text-sm text-zinc-400">
            {["About", "Offer", "AppSec", "Skills", "Experience", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-white transition-colors duration-200"
              >
                {item}
              </a>
            ))}
            <Link href="/blog" className="hover:text-white transition-colors duration-200 text-violet-400">
              Blog
            </Link>
          </div>
          <a
            href="#contact"
            className="text-sm font-medium px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 transition-all duration-200 shadow-lg shadow-violet-900/30"
          >
            Let’s build.
          </a>
        </div>
      </nav>

      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section id="about" className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Background blobs */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-700/20 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-cyan-700/20 blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 py-12 w-full grid lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-violet-400 bg-violet-400/10 border border-violet-400/20 rounded-full px-4 py-1.5 w-fit">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for opportunities
            </span>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
              Rishabh
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                Kumar
              </span>
            </h1>
            <p className="text-xl text-zinc-300 font-semibold">
              Senior Software Engineer | Distributed Systems & AppSec
            </p>
            <p className="text-base text-zinc-400 max-w-lg leading-relaxed">
              I build enterprise-scale backend services, secure web platforms, and AI-assisted diagnostics for high-availability products. My work spans Java, Spring, Python, hands-on CVE vulnerability remediation, cloud platforms, and observability at scale.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#appsec"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-red-600 via-violet-600 to-cyan-600 hover:from-red-500 hover:to-cyan-500 font-semibold text-sm transition-all duration-200 shadow-xl shadow-red-900/30"
              >
                AppSec & CVE Fixes
              </a>
              <a
                href="#projects"
                className="px-6 py-3 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 font-semibold text-sm transition-all duration-200"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 font-semibold text-sm transition-all duration-200"
              >
                Get In Touch
              </a>
            </div>
            {/* Stats */}
            <div className="flex gap-8 pt-4 border-t border-white/5 mt-2">
              {[
                { value: "6+", label: "Years Experience" },
                { value: "3", label: "Published CVEs" },
                { value: "5+", label: "Enterprise Platforms" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    {value}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mini Game */}
          <div className="hidden lg:flex flex-col items-center gap-3">
            <p className="text-xs text-zinc-500 font-mono tracking-wide">
              — a little fun while you browse —
            </p>
            <BinarySearchGame />
          </div>
        </div>
      </section>

      {/* ─── WHAT I CAN OFFER ─────────────────────────────────────── */}
      <section id="offer" className="py-24 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-fuchsia-700/10 blur-[100px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel>Why Hire Me</SectionLabel>
          <h2 className="text-4xl font-bold mt-3 mb-4">What I Can Offer</h2>
          <p className="text-zinc-400 max-w-xl mb-12">
            When you bring me on board, you get more than a developer — you get a strategic technical partner invested in your product&apos;s success.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {offerings.map(({ icon, title, description }) => (
              <div
                key={title}
                className="group relative p-6 rounded-2xl border border-white/8 bg-white/3 hover:border-violet-500/40 hover:bg-white/5 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="text-3xl mb-4">{icon}</div>
                  <h3 className="font-bold text-base mb-2">{title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Value proposition banner */}
          <div className="relative rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 to-cyan-900/20 p-8 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-violet-600/20 blur-3xl" />
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-3">Ready to build something great?</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  I bring senior-level engineering, clear communication, and a product mindset to every engagement. Whether it&apos;s a greenfield build, scaling an existing system, or rescuing a project — I deliver.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {hiringHighlights.map(({ stat, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400 shrink-0" />
                    <span className="text-sm text-zinc-300">
                      <strong className="text-white">{stat}</strong> {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── APPSEC ─────────────────────────────────────────────────── */}
      <section id="appsec" className="py-24 border-t border-white/5 relative overflow-hidden">
        {/* Glow effects */}
        <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-red-600/10 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-[450px] h-[450px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <SectionLabel variant="red">Application Security</SectionLabel>
              <h2 className="text-4xl font-bold mt-3">AppSec & Vulnerability Remediation</h2>
              <p className="text-zinc-400 max-w-2xl mt-3 text-base leading-relaxed">
                Hardening enterprise platforms, mitigating critical OWASP Top 10 vulnerabilities, and conducting defense-in-depth engineering from code review to production.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 text-xs font-mono px-3.5 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-300">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                CVE Remediation Track Record
              </span>
            </div>
          </div>

          {/* 1. Official Security Bulletin / Mythos Advisory Banner */}
          <div className="mb-14 relative rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/30 via-[#13111c] to-violet-950/20 p-8 lg:p-10 overflow-hidden shadow-2xl shadow-red-950/20">
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-red-600/20 blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-300 bg-red-500/15 border border-red-500/30 rounded-full px-3.5 py-1 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  Official Security Advisory
                </span>
                <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                  CVE-2026-44923
                </span>
                <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                  CVE-2026-44924
                </span>
                <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                  CVE-2026-44925
                </span>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">
                  VIOM 9.1 & 9.2
                </span>
              </div>

              <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4 leading-snug">
                    InfoScale Operations Manager (VIOM) — Mythos Security Remediation
                  </h3>
                  <p className="text-zinc-300 leading-relaxed text-base mb-6">
                    Delivered critical application hardening across web application surfaces for Veritas / Cloud Software Group&apos;s flagship enterprise storage operations platform. Collaborated directly with <strong className="text-white">TIM Security Group</strong>, <strong className="text-white">HawkTrace</strong>, and <strong className="text-white">CSG PenTest</strong> to address critical vulnerabilities including Cross-Site Scripting (XSS), SQL injection, shell and command injection, and Server-Side Request Forgery (SSRF).
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="https://supportinfoscale.cloud.com/support-home/kbsearch/article?articleNumber=1000766080&articleTitle=InfoScale_Operations_Manager_IOM_web_application_Security_Bulletin_for_CVE_2026_44923_CVE_2026_44924_and_CVE_2026_44925"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-violet-600 hover:from-red-500 hover:to-violet-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-red-900/30"
                    >
                      <span>Read Published Security Bulletin</span>
                      <span className="text-xs">↗</span>
                    </a>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 text-zinc-300 font-semibold text-sm transition-all"
                    >
                      Discuss Security Engagements
                    </a>
                  </div>
                </div>

                <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-black/40 p-5 backdrop-blur-sm">
                  <span className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">
                    Remediation Highlights
                  </span>
                  <div className="space-y-3 pt-1">
                    <div>
                      <p className="text-sm font-bold text-white flex items-center gap-2">
                        <span className="text-red-400">🛡️</span> Multi-Class Hardening
                      </p>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        XSS, Command Injection, SQLi, SSRF, & Path Traversal fixes.
                      </p>
                    </div>
                    <div className="border-t border-white/5 pt-2">
                      <p className="text-sm font-bold text-white flex items-center gap-2">
                        <span className="text-violet-400">👥</span> Collaborative Defense
                      </p>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        Coordinated with TIM Security, HawkTrace, & CSG PenTest.
                      </p>
                    </div>
                    <div className="border-t border-white/5 pt-2">
                      <p className="text-sm font-bold text-white flex items-center gap-2">
                        <span className="text-green-400">🚀</span> Enterprise Production
                      </p>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        Cross-platform patches deployed across enterprise clusters.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Vulnerability Defense Matrix */}
          <div className="mb-16">
            <div className="mb-8">
              <h3 className="text-2xl font-bold">Vulnerability Defense Matrix</h3>
              <p className="text-sm text-zinc-400 mt-1">
                Technical control implementations across primary OWASP & CWE attack surfaces.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityVulnerabilities.map((vuln) => (
                <div
                  key={vuln.category}
                  className="group relative flex flex-col p-6 rounded-2xl border border-white/8 bg-white/3 hover:border-red-500/40 hover:bg-white/5 transition-all duration-300"
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400">
                      {vuln.tag}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      {vuln.severity} Severity
                    </span>
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-white group-hover:text-red-200 transition-colors">
                    {vuln.category}
                  </h4>
                  <p className="text-sm text-zinc-400 leading-relaxed flex-1 mb-4">
                    {vuln.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                    {vuln.controls.map((ctrl) => (
                      <span
                        key={ctrl}
                        className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300"
                      >
                        {ctrl}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Security Tooling & Interactive Bug Squasher */}
          <div className="grid lg:grid-cols-3 gap-8 items-start mb-16">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="p-7 rounded-2xl border border-white/8 bg-white/3">
                <h3 className="text-xl font-bold mb-2">AppSec Tooling & Security Methodologies</h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                  Applying defense-in-depth across the software development lifecycle — from threat modeling and static analysis to dynamic penetration test verification.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {securityTools.map((tool) => (
                    <div
                      key={tool.name}
                      className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/2 hover:border-violet-500/30 transition-colors"
                    >
                      <span className="text-sm font-semibold text-zinc-200">{tool.name}</span>
                      <span className="text-xs font-mono text-zinc-500">{tool.type}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Practices List */}
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    title: "Threat Modeling",
                    desc: "Decomposing trust boundaries and attack paths before implementation.",
                    icon: "🎯",
                  },
                  {
                    title: "Pen-Test Remediation",
                    desc: "Triage and root-cause fix verification with external testing groups.",
                    icon: "🔍",
                  },
                  {
                    title: "Defensive Code Review",
                    desc: "Enforcing zero-trust input validation and context-safe output encoding.",
                    icon: "🛡️",
                  },
                ].map((item) => (
                  <div key={item.title} className="p-5 rounded-2xl border border-white/8 bg-white/3">
                    <span className="text-2xl mb-2 block">{item.icon}</span>
                    <h4 className="font-bold text-sm mb-1 text-white">{item.title}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Bug Squasher Game */}
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-white/8 bg-white/3">
              <div className="mb-2 text-center">
                <p className="text-xs font-mono text-red-400 font-semibold uppercase tracking-wider">
                  Interactive Defense
                </p>
                <p className="text-sm text-zinc-300 font-medium">Patch the vulnerabilities!</p>
              </div>
              <BugSquash />
            </div>
          </div>

          {/* 4. Security Engineering Writeups (From Blog) */}
          <div className="p-8 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/10 via-[#0f0e17] to-cyan-900/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-mono text-violet-400 uppercase tracking-wider font-semibold">
                  Technical Publications
                </span>
                <h3 className="text-2xl font-bold mt-1">AppSec Engineering Deep Dives</h3>
              </div>
              <Link
                href="/blog"
                className="text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1.5"
              >
                <span>Browse All Security Articles</span>
                <span>→</span>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {posts.slice(0, 3).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col p-5 rounded-xl border border-white/10 bg-white/3 hover:border-violet-500/40 hover:bg-white/6 transition-all"
                >
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 font-mono"
                      >
                        {t}
                      </span>
                    ))}
                    <span className="text-xs font-mono text-zinc-500 ml-auto">{post.readTime}</span>
                  </div>
                  <h4 className="font-bold text-base text-zinc-100 group-hover:text-violet-300 transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4 flex-1">
                    {post.subtitle}
                  </p>
                  <span className="text-xs font-medium text-violet-400 group-hover:underline flex items-center gap-1">
                    Read Analysis →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SKILLS ───────────────────────────────────────────────── */}
      <section id="skills" className="py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel>Technical Skills</SectionLabel>
          <h2 className="text-4xl font-bold mt-3 mb-12">Tech Stack</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map(({ category, icon, skills }) => (
              <div
                key={category}
                className="group p-6 rounded-2xl border border-white/8 bg-white/3 hover:border-violet-500/40 hover:bg-white/5 transition-all duration-300"
              >
                <div className="text-2xl mb-3">{icon}</div>
                <h3 className="font-semibold text-sm text-zinc-300 mb-4">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 group-hover:text-zinc-300 transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCE ───────────────────────────────────────────── */}
      <section id="experience" className="py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel>Career</SectionLabel>
          <h2 className="text-4xl font-bold mt-3 mb-12">Experience</h2>
          <div className="relative flex flex-col gap-0">
            {/* Timeline line */}
            <div className="absolute left-5 top-6 bottom-6 w-px bg-gradient-to-b from-violet-600 via-fuchsia-600 to-cyan-600 opacity-30" />
            {experiences.map((exp, i) => (
              <div key={i} className="relative pl-16 pb-12 last:pb-0">
                {/* Dot */}
                <div className="absolute left-3.5 top-1.5 w-3 h-3 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 ring-4 ring-[#0d0d0d]" />
                <div className="p-6 rounded-2xl border border-white/8 bg-white/3 hover:border-violet-500/20 hover:bg-white/5 transition-all duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-bold text-lg">{exp.role}</h3>
                      <p className="text-violet-400 font-medium text-sm">{exp.company}</p>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full border border-white/10 text-zinc-400 whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROJECTS ─────────────────────────────────────────────── */}
      <section id="projects" className="py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel>Portfolio</SectionLabel>
          <h2 className="text-4xl font-bold mt-3 mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <div
                key={i}
                className="group flex flex-col p-6 rounded-2xl border border-white/8 bg-white/3 hover:border-violet-500/40 hover:bg-white/5 transition-all duration-300"
              >
                <div className="text-3xl mb-4">{project.emoji}</div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-base">{project.title}</h3>
                  <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                    project.status === "Production"
                      ? "bg-green-500/10 border border-green-500/20 text-green-400"
                      : "bg-yellow-500/10 border border-yellow-500/20 text-yellow-400"
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed flex-1 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-400">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {project.live && (
                    <a
                      href={project.live}
                      className="text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1"
                    >
                      ↗ Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ──────────────────────────────────────────────── */}
      <section id="contact" className="py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel>Let&apos;s Talk</SectionLabel>
          <h2 className="text-4xl font-bold mt-3 mb-4">Get In Touch</h2>
          <p className="text-zinc-400 max-w-lg mb-12">
            I&apos;m currently open to senior engineering roles and interesting freelance projects. Drop me a message!
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact links */}
            <div className="flex flex-col gap-4">
              {contactLinks.map(({ label, value, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-2xl border border-white/8 bg-white/3 hover:border-violet-500/40 hover:bg-white/5 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600/30 to-cyan-600/30 flex items-center justify-center text-lg border border-white/10">
                    {icon}
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500">{label}</p>
                    <p className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Quick message card */}
            <div className="p-8 rounded-2xl border border-white/8 bg-white/3 flex flex-col items-center justify-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center text-2xl">
                ✉️
              </div>
              <div>
                <p className="font-bold text-xl">Rishabh Kumar</p>
                <p className="text-zinc-400 text-sm mt-1">Senior Software Engineer</p>
              </div>
              <p className="text-zinc-400 text-sm max-w-xs">
                Open to full-time positions and exciting collaborative projects worldwide.
              </p>
              <a
                href="mailto:rishabh@example.com"
                className="mt-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 font-semibold text-sm transition-all duration-200 shadow-xl shadow-violet-900/40"
              >
                Send a Message
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <p>© 2026 Rishabh Kumar</p>
          <p className="flex items-center gap-1">
            Designed & built by{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent font-medium ml-1">
              Rishabh Kumar
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ─── HELPER COMPONENT ──────────────────────────────────────────── */
function SectionLabel({
  children,
  variant = "violet",
}: {
  children: React.ReactNode;
  variant?: "violet" | "red";
}) {
  const isRed = variant === "red";
  return (
    <span
      className={`inline-flex items-center gap-2 text-sm font-medium rounded-full px-4 py-1.5 border ${
        isRed
          ? "text-red-300 bg-red-500/10 border-red-500/20"
          : "text-violet-400 bg-violet-400/10 border-violet-400/20"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isRed ? "bg-red-400" : "bg-violet-400"
        }`}
      />
      {children}
    </span>
  );
}

const securityVulnerabilities = [
  {
    category: "Cross-Site Scripting (XSS)",
    tag: "OWASP A03",
    severity: "Critical",
    description:
      "Remediated reflected, stored, and DOM-based XSS across enterprise consoles by implementing context-aware output encoding, eliminating unescaped template directives, and enforcing OWASP Java HTML Sanitizer and DOMPurify.",
    controls: ["Content Security Policy (CSP)", "OWASP HTML Sanitizer", "DOMPurify", "Output Encoding"],
  },
  {
    category: "Command & Shell Injection",
    tag: "CWE-78",
    severity: "Critical",
    description:
      "Eliminated OS command injection vulnerabilities by retiring direct shell invocations, moving to parameterized ProcessBuilder APIs with explicit argument arrays, and enforcing strict regex allowlists for all system utilities.",
    controls: ["ProcessBuilder APIs", "Input Allowlisting", "Non-Root Execution", "Argument Escaping"],
  },
  {
    category: "Server-Side Request Forgery (SSRF)",
    tag: "OWASP A10",
    severity: "High",
    description:
      "Protected cloud metadata endpoints (169.254.169.254) and internal networks from SSRF attacks by introducing pre-flight DNS validation against RFC-1918 ranges, disabling client redirects, and enforcing AWS IMDSv2.",
    controls: ["DNS Resolution Checks", "RFC-1918 Blocking", "IMDSv2 Enforced", "WebClient Filters"],
  },
  {
    category: "SQL & Query Injection (SQLi)",
    tag: "OWASP A03",
    severity: "Critical",
    description:
      "Secured data access layers by transitioning raw dynamic query strings to parameterized prepared statements, Hibernate Criteria queries, and automated SAST static code analysis gates.",
    controls: ["Parameterized Queries", "Spring Data JPA", "Hibernate Criteria", "Static Taint Analysis"],
  },
  {
    category: "CSRF & Session Security",
    tag: "OWASP A01",
    severity: "High",
    description:
      "Protected user sessions and state-changing REST endpoints via Spring Security's Synchronizer Token Pattern (CookieCsrfTokenRepository), SameSite=Strict cookies, and HttpOnly/Secure flags.",
    controls: ["CSRF Tokens", "SameSite=Strict", "HttpOnly & Secure", "Origin Validation"],
  },
  {
    category: "Broken Access Control & IDOR",
    tag: "OWASP A01",
    severity: "Critical",
    description:
      "Hardened authorization models against privilege escalation and horizontal data leakage by enforcing Spring Security @PreAuthorize method-level controls and tenant-isolated repository filters.",
    controls: ["RBAC", "@PreAuthorize", "Tenant Isolation", "Least Privilege"],
  },
];

const securityTools = [
  { name: "Burp Suite", type: "DAST & PenTesting" },
  { name: "SonarQube", type: "SAST & Quality Gates" },
  { name: "HawkTrace", type: "Security Trace" },
  { name: "OWASP ZAP", type: "Vulnerability Scanning" },
  { name: "OWASP Java Sanitizer", type: "HTML Defense" },
  { name: "Spring Security", type: "Auth & Access Control" },
  { name: "DOMPurify", type: "Client-Side Sanitization" },
  { name: "IMDSv2", type: "Cloud Metadata Guard" },
];

/* ─── DATA ──────────────────────────────────────────────────────── */
const offerings = [
  {
    icon: "🏗️",
    title: "Enterprise Platform Engineering",
    description:
      "Delivered high-availability feature enhancements for VIOM and other enterprise platforms (EMAP / VQA / AnalyseIQ), improving cluster management, storage provisioning, and failover reliability.",
  },
  {
    icon: "🔒",
    title: "Security Hardening",
    description:
      "Remediated critical OWASP vulnerabilities and zero-day issues across web applications, strengthening product security and compliance.",
  },
  {
    icon: "🧠",
    title: "AI-Assisted Diagnostics",
    description:
      "Built intelligent troubleshooting flows for EMAP and Quick Assist using Java, Python, Elasticsearch, and RAG/LLM-based recommendations.",
  },
  {
    icon: "☁️",
    title: "Cloud & DevOps",
    description:
      "Worked across Docker, Kubernetes, Jenkins, AWS, and observability tooling to ship and support modern distributed systems.",
  },
  {
    icon: "⚙️",
    title: "Backend & API Development",
    description:
      "Designed and implemented RESTful services with Spring Boot, Spring MVC, Hibernate, and Swagger-based documentation for scalable products.",
  },
  {
    icon: "🧪",
    title: "Reliability & Quality",
    description:
      "Improved product quality with JUnit, Mockito, SonarQube, multithreading, and focused testing for enterprise-grade software.",
  },
];

const hiringHighlights = [
  { stat: "6+ years", label: "building production software for enterprise platforms" },
  { stat: "Mythos security fixes", label: "critical XSS, SQLi, shell/command injection, and SSRF remediation" },
  { stat: "Java / Spring / Python", label: "across backend, cloud, and product engineering" },
  { stat: "EMAP & Quick Assist", label: "AI-driven diagnostics and automated support workflows" },
  { stat: "Open to", label: "senior engineering roles and collaborative product work" },
];

const skillCategories = [
  {
    category: "Languages",
    icon: "💻",
    skills: ["Java", "Python", "JavaScript", "TypeScript", "SQL", "C/C++"],
  },
  {
    category: "Frameworks",
    icon: "⚙️",
    skills: ["Spring Boot", "Spring MVC", "Spring Data JPA", "Hibernate", "FastAPI", "Angular"],
  },
  {
    category: "Cloud & DevOps",
    icon: "☁️",
    skills: ["Docker", "Kubernetes", "Jenkins", "AWS", "Maven", "Grafana"],
  },
  {
    category: "Data & Security",
    icon: "🛡️",
    skills: ["Elasticsearch", "Redis", "SQL", "JUnit", "Mockito", "BurpSuite"],
  },
];

const experiences = [
  {
    role: "Senior Application Development Engineer (IC3)",
    company: "Cloud Software Group (InfoScale)",
    period: "Sept 2023 – Present",
    description: (
      <>
        Delivered enterprise feature enhancements for VIOM 9.1 and 9.2, worked with TIM Security Group, HawkTrace, and CSG PenTest to address critical vulnerabilities in VIOM, provided cross-platform fixes, and built AI-assisted diagnostics for EMAP and Quick Assist.{' '}
        <a
          href="https://supportinfoscale.cloud.com/support-home/kbsearch/article?articleNumber=1000766080&articleTitle=InfoScale_Operations_Manager_IOM_web_application_Security_Bulletin_for_CVE_2026_44923_CVE_2026_44924_and_CVE_2026_44925"
          target="_blank"
          rel="noopener noreferrer"
          className="text-violet-400 underline underline-offset-2"
        >
          Refer
        </a>
        {' '}to the security bulletin.
      </>
    ),
    tech: ["Java", "Spring", "Python", "Kubernetes", "AWS", "Elasticsearch"],
  },
  {
    role: "Senior Software Engineer",
    company: "Arctera (Aquired by Cloud Software Group)",
    period: "Continued Service",
    description:
      "Delivered enterprise feature enhancements for VIOM 9.1 and 9.2, remediated critical OWASP vulnerabilities, and built AI-assisted diagnostics for EMAP and Quick Assist.",
    tech: ["Java", "Spring", "Python", "Kubernetes", "AWS", "Elasticsearch"],
  },
   {
    role: "Software Engineer",
    company: "Veritas Technologies (Aquired by Cohesity)",
    period: "Sept 2023 - Continued Service",
    description:
      "Delivered enterprise feature enhancements for VIOM 9.1 and 9.2, remediated critical OWASP vulnerabilities, and built AI-assisted diagnostics for EMAP and Quick Assist.",
    tech: ["Java", "Spring", "Python", "Kubernetes", "AWS", "Elasticsearch"],
  },
  {
    role: "Programmer Analyst",
    company: "Cognizant Technologies",
    period: "Nov 2022 – Sept 2023",
    description:
      "Built RESTful APIs and a responsive Angular SPA for BBVA’s digital assets platform, deploying the solution on AWS with strong testing and code quality practices.",
    tech: ["Spring Boot", "Hibernate", "Angular", "AWS", "JUnit"],
  },
  {
    role: "Software Engineer",
    company: "L&T Infotech",
    period: "Jun 2020 – Nov 2022",
    description:
      "Contributed to Citi’s global trading P&L platform with Java-based microservices, Angular UI components, and high-coverage unit testing for higher reliability.",
    tech: ["Java", "Spring", "Angular", "JUnit", "SonarQube"],
  },
];

const projects = [
  {
    emoji: "🧱",
    title: "VIOM Platform Enhancements",
    status: "Production",
    description:
      "Improved high availability, cluster management, storage provisioning, and failover workflows for enterprise storage operations.",
    tech: ["Java", "Spring", "Python", "Kubernetes", "Linux"],
    github: "#",
    live: null,
  },
  {
    emoji: "🧠",
    title: "EMAP & Quick Assist Diagnostics",
    status: "Production",
    description:
      "Built AI-assisted troubleshooting and evidence-processing services with log analysis, health reports, and RAG-based recommendations.",
    tech: ["Java", "Python", "Elasticsearch", "RAG", "LLM"],
    github: "#",
    live: null,
  },
  {
    emoji: "💳",
    title: "BBVA Digital Assets SPA",
    status: "Production",
    description:
      "Developed REST APIs and a responsive Angular experience for a financial digital assets product deployed on AWS.",
    tech: ["Spring Boot", "Angular", "Swagger", "AWS", "Postman"],
    github: "#",
    live: null,
  },
  {
    emoji: "📈",
    title: "GTPL Trading & P&L Platform",
    status: "Production",
    description:
      "Contributed to Java microservices and Angular UI work for a global trading profit & loss application with strong quality controls.",
    tech: ["Java", "Spring", "Angular", "JUnit", "JaCoCo"],
    github: "#",
    live: null,
  },
];

const contactLinks = [
  { label: "Email", value: "Rishabh.Kumr@outlook.com", href: "mailto:RishabhKumr@outlook.com", icon: "📧" },
  { label: "Phone", value: "+91-8077619658", href: "tel:+918077619658", icon: "📞" },
  { label: "GitHub", value: "github.com/RishabhKumr", href: "https://github.com/RishabhKumr", icon: "🐙" },
  { label: "LinkedIn", value: "linkedin.com/in/devrishabhkumar", href: "https://www.linkedin.com/in/devrishabhkumar/", icon: "💼" },
];
