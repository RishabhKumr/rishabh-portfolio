export interface Section {
  type: "h2" | "h3" | "p" | "code" | "ul" | "callout";
  text?: string;
  lang?: string;
  items?: string[];
  variant?: "danger" | "tip" | "info";
}

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  tags: string[];
  content: Section[];
}

export const posts: BlogPost[] = [
  /* ──────────────────────────────────────────────────── 1. XSS ── */
  {
    slug: "xss-attacks-and-java-defences",
    title: "Cross-Site Scripting (XSS) in Java Web Apps",
    subtitle:
      "How XSS works, why Spring apps are not immune by default, and the encoding & CSP patterns that actually stop it.",
    date: "May 28, 2026",
    readTime: "8 min read",
    tags: ["XSS", "Java", "Spring", "OWASP"],
    content: [
      {
        type: "p",
        text: "Cross-Site Scripting (XSS) sits in the OWASP Top 10 year after year. Even in Java / Spring Boot applications — which are often considered 'safer' than raw PHP or Node — XSS vulnerabilities are easy to introduce and hard to spot in code review. This post walks through the attack, the three variants, and the concrete Java defences.",
      },
      { type: "h2", text: "What Is XSS?" },
      {
        type: "p",
        text: "XSS occurs when attacker-supplied input is rendered as executable HTML/JavaScript in a victim's browser. Because the script runs in the origin of your site, it can steal session cookies, exfiltrate data, or rewrite the page.",
      },
      { type: "h2", text: "Variant 1 — Reflected XSS in a Spring Controller" },
      {
        type: "p",
        text: "A Thymeleaf or JSP template that echoes a request parameter without encoding is the classic entry point:",
      },
      {
        type: "code",
        lang: "java",
        text: `// ❌ VULNERABLE — controller passes raw input to the model
@GetMapping("/search")
public String search(@RequestParam String q, Model model) {
    model.addAttribute("query", q);  // attacker controls this
    return "search";
}`,
      },
      {
        type: "code",
        lang: "html",
        text: `<!-- ❌ VULNERABLE Thymeleaf template — th:utext skips escaping -->
<p>Results for: <span th:utext="${'$'}{query}"></span></p>

<!-- ✅ SAFE — th:text HTML-encodes the value -->
<p>Results for: <span th:text="${'$'}{query}"></span></p>`,
      },
      {
        type: "callout",
        variant: "danger",
        text: "th:utext and JSP's <%=..%> emit raw HTML. Always prefer th:text (Thymeleaf) or <c:out> (JSTL) which encode output by default.",
      },
      { type: "h2", text: "Variant 2 — Stored XSS in a REST API Response" },
      {
        type: "p",
        text: "If your API stores user-supplied content and echoes it back as HTML to a browser client, the attack persists for every visitor:",
      },
      {
        type: "code",
        lang: "java",
        text: `// ❌ VULNERABLE — comment stored and returned verbatim
@PostMapping("/comments")
public Comment addComment(@RequestBody Comment comment) {
    return commentRepository.save(comment); // <script> payload saved to DB
}

// ✅ SAFE — sanitise on the way IN using OWASP Java HTML Sanitizer
import org.owasp.html.PolicyFactory;
import org.owasp.html.Sanitizers;

private static final PolicyFactory POLICY =
    Sanitizers.FORMATTING.and(Sanitizers.LINKS);

@PostMapping("/comments")
public Comment addComment(@RequestBody Comment comment) {
    comment.setText(POLICY.sanitize(comment.getText())); // strip scripts
    return commentRepository.save(comment);
}`,
      },
      { type: "h2", text: "Variant 3 — DOM-Based XSS" },
      {
        type: "p",
        text: "DOM XSS lives entirely in the browser's JavaScript — the server never sees the payload. A Spring Boot backend serving a React/Vue SPA can still be indirectly responsible if it sets user-controlled values that the frontend writes to innerHTML.",
      },
      {
        type: "code",
        lang: "javascript",
        text: `// ❌ VULNERABLE — React front-end using dangerouslySetInnerHTML
//    with data fetched from the Spring API
function Comment({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

// ✅ SAFE — sanitise with DOMPurify before rendering
import DOMPurify from "dompurify";
function Comment({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />;
}`,
      },
      { type: "h2", text: "Content Security Policy with Spring Security" },
      {
        type: "p",
        text: "A strict CSP is the best second line of defence — even if encoding slips through, CSP can block script execution.",
      },
      {
        type: "code",
        lang: "java",
        text: `@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.headers(headers -> headers
            .contentSecurityPolicy(csp -> csp.policyDirectives(
                "default-src 'self'; " +
                "script-src 'self'; " +  // no unsafe-inline
                "style-src 'self' 'unsafe-inline'; " +
                "img-src 'self' data:; " +
                "frame-ancestors 'none';"
            ))
            .xssProtection(xss -> xss.headerValue(
                XXssProtectionHeaderWriter.HeaderValue.ENABLED_MODE_BLOCK))
        );
        return http.build();
    }
}`,
      },
      { type: "h2", text: "Defence Checklist" },
      {
        type: "ul",
        items: [
          "Use th:text (Thymeleaf) or <c:out> (JSTL) — never th:utext or raw <%=..%>.",
          "Sanitise stored HTML with OWASP Java HTML Sanitizer before persistence.",
          "Set a strict Content-Security-Policy header via Spring Security.",
          "Set HttpOnly and Secure on session cookies: server.servlet.session.cookie.http-only=true.",
          "Validate and reject unexpected characters in inputs that should be plain text (names, IDs).",
          "In React/Angular frontends, avoid dangerouslySetInnerHTML/bypassSecurityTrustHtml without DOMPurify.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        text: "Add the OWASP Java HTML Sanitizer dependency: com.googlecode.owasp-java-html-sanitizer:owasp-java-html-sanitizer. It is maintained by Google and the OWASP team and is safe for production use.",
      },
    ],
  },

  /* ──────────────────────────────────────────────────── 2. CSRF ── */
  {
    slug: "csrf-in-spring-security",
    title: "CSRF Attacks and Spring Security Defences",
    subtitle:
      "How Cross-Site Request Forgery exploits cookie-based sessions — and how Spring Security's CSRF tokens and SameSite cookies stop it.",
    date: "May 20, 2026",
    readTime: "7 min read",
    tags: ["CSRF", "Java", "Spring Security", "OWASP"],
    content: [
      {
        type: "p",
        text: "Cross-Site Request Forgery (CSRF) tricks an authenticated user's browser into firing a state-changing request — a money transfer, a password change, an admin action — to a site the user is logged into. Browsers automatically attach cookies, so the server can't tell the legitimate request from the forged one without extra protection.",
      },
      { type: "h2", text: "How the Attack Works" },
      {
        type: "code",
        lang: "html",
        text: `<!-- Attacker's page — auto-submits on load -->
<form id="csrf" action="https://bank.example.com/api/transfer" method="POST"
      style="display:none">
  <input name="to"     value="attacker-account" />
  <input name="amount" value="9999" />
</form>
<script>document.getElementById("csrf").submit();</script>
<!-- Victim visits this page while logged in → browser sends their session cookie -->`,
      },
      {
        type: "callout",
        variant: "danger",
        text: "CSRF is not about reading data. The attacker never sees the response. The goal is purely to execute an action using the victim's authenticated session.",
      },
      { type: "h2", text: "Spring Security CSRF Protection (Default)" },
      {
        type: "p",
        text: "Spring Security enables CSRF protection by default for all state-changing HTTP methods (POST, PUT, PATCH, DELETE). It uses the Synchroniser Token Pattern — a hidden field/header that the attacker cannot forge.",
      },
      {
        type: "code",
        lang: "java",
        text: `// Spring Security CSRF is ON by default.
// For a traditional MVC app you only need to include the token in your forms:

// Thymeleaf does this automatically when Spring Security is on the classpath.
// For manual inclusion:
// <input type="hidden" th:name="\${_csrf.parameterName}" th:value="\${_csrf.token}"/>

// For REST/SPA, expose the token via a cookie and read it in JS:
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf
                // Sends XSRF-TOKEN cookie; client reads & echoes as X-XSRF-TOKEN header
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
            );
        return http.build();
    }
}`,
      },
      {
        type: "code",
        lang: "javascript",
        text: `// SPA client — read the cookie and echo it as a header on every mutating request
function getCookie(name) {
  return document.cookie
    .split("; ")
    .find(r => r.startsWith(name + "="))
    ?.split("=")[1];
}

fetch("/api/transfer", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"), // Spring validates this
  },
  body: JSON.stringify({ to: "friend", amount: 50 }),
});`,
      },
      { type: "h2", text: "When to Disable CSRF (and When Not To)" },
      {
        type: "p",
        text: "It is common to disable CSRF for stateless REST APIs that use token-based auth (JWT in Authorization header). That is safe because there are no cookies to forge. Never disable it for cookie-session apps.",
      },
      {
        type: "code",
        lang: "java",
        text: `// ✅ Safe to disable CSRF for stateless JWT APIs
@Configuration
@EnableWebSecurity
public class StatelessApiSecurity {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .sessionManagement(sm ->
                sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .csrf(csrf -> csrf.disable()) // safe: no cookies, JWT in header
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}

// ❌ NEVER disable CSRF for apps that use HttpSession / remember-me cookies`,
      },
      { type: "h2", text: "SameSite Cookies in Spring Boot" },
      {
        type: "p",
        text: "The SameSite cookie attribute is the modern browser-level mitigation. Spring Boot 3+ lets you configure it directly:",
      },
      {
        type: "code",
        lang: "properties",
        text: `# application.properties
server.servlet.session.cookie.same-site=strict
server.servlet.session.cookie.secure=true
server.servlet.session.cookie.http-only=true`,
      },
      { type: "h2", text: "Defence Checklist" },
      {
        type: "ul",
        items: [
          "Keep Spring Security's CSRF protection enabled for any app that uses cookie-based sessions.",
          "Use CookieCsrfTokenRepository for SPA/REST frontends; include the token via X-XSRF-TOKEN header.",
          "Set server.servlet.session.cookie.same-site=strict in application.properties.",
          "Validate Origin and Referer headers as an additional layer.",
          "Never use GET/HEAD for state-changing operations — CSRF tokens only protect non-safe methods.",
          "Only disable CSRF on truly stateless endpoints that use bearer tokens, not cookies.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        text: "Spring Security 6+ changed the default CSRF token handling — CsrfTokenRequestAttributeHandler is now required alongside CookieCsrfTokenRepository for the token to be eagerly included in responses. Check the migration guide if upgrading from Spring Security 5.",
      },
    ],
  },

  /* ──────────────────────────────────────────────────── 3. SSRF ── */
  {
    slug: "ssrf-java-cloud-attacks",
    title: "SSRF in Java: Abusing Your Own Backend",
    subtitle:
      "Server-Side Request Forgery turns your Java service into an attacker's proxy against internal systems. Here's how to find it and fix it.",
    date: "May 12, 2026",
    readTime: "9 min read",
    tags: ["SSRF", "Java", "Cloud Security", "OWASP"],
    content: [
      {
        type: "p",
        text: "Server-Side Request Forgery (SSRF) is one of the most dangerous vulnerabilities in cloud-hosted Java applications. An attacker supplies a URL that the server fetches on their behalf — pointing to internal services, the AWS metadata endpoint, or localhost — effectively turning your backend into their proxy.",
      },
      { type: "h2", text: "A Vulnerable Java Endpoint" },
      {
        type: "p",
        text: "Consider a webhook validator or image-preview service that fetches a user-supplied URL:",
      },
      {
        type: "code",
        lang: "java",
        text: `// ❌ VULNERABLE — fetches any URL the client sends
@RestController
public class PreviewController {

    @GetMapping("/preview")
    public ResponseEntity<String> preview(@RequestParam String url)
            throws IOException {
        URL target = new URL(url); // no validation!
        HttpURLConnection conn = (HttpURLConnection) target.openConnection();
        conn.setRequestMethod("GET");
        conn.setConnectTimeout(3000);
        try (InputStream in = conn.getInputStream()) {
            return ResponseEntity.ok(new String(in.readAllBytes()));
        }
    }
}
// Attacker sends: ?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/
// → receives AWS IAM credentials in the response`,
      },
      {
        type: "callout",
        variant: "danger",
        text: "The AWS EC2 metadata endpoint 169.254.169.254 returns IAM role credentials as plaintext. A single SSRF vulnerability here equals full cloud account takeover.",
      },
      { type: "h2", text: "Bypassing Naive Blocklists" },
      {
        type: "p",
        text: "A simple string-contains check for '169.254' is not enough. Attackers use IP obfuscation and DNS rebinding to bypass it:",
      },
      {
        type: "code",
        lang: "text",
        text: `# All of these resolve to 127.0.0.1 / 169.254.169.254
http://2130706433/          ← decimal representation of 127.0.0.1
http://0x7f000001/          ← hex
http://127.1/               ← short form
http://[::ffff:169.254.169.254]/  ← IPv6 mapped
http://attacker.com/        ← DNS rebinding: resolves to 127.0.0.1 post-check`,
      },
      { type: "h2", text: "Safe Implementation in Java" },
      {
        type: "p",
        text: "The correct fix is to resolve DNS, then validate the resulting IP against private/loopback ranges before making the request:",
      },
      {
        type: "code",
        lang: "java",
        text: `import java.net.*;
import java.util.List;

public class SafeHttpClient {

    // Private, loopback, link-local, and metadata ranges to block
    private static final List<String> BLOCKED_PREFIXES = List.of(
        "10.", "172.16.", "172.17.", "172.18.", "172.19.",
        "172.20.", "172.21.", "172.22.", "172.23.", "172.24.",
        "172.25.", "172.26.", "172.27.", "172.28.", "172.29.",
        "172.30.", "172.31.", "192.168.", "127.", "0.", "169.254.",
        "::1", "fc", "fd"
    );

    public static String safeFetch(String rawUrl) throws Exception {
        URI uri = new URI(rawUrl);

        // 1 — Only allow HTTPS
        if (!"https".equalsIgnoreCase(uri.getScheme())) {
            throw new SecurityException("Only HTTPS URLs are allowed");
        }

        // 2 — Resolve DNS and check every returned address
        String host = uri.getHost();
        InetAddress[] addresses = InetAddress.getAllByName(host);
        for (InetAddress addr : addresses) {
            String ip = addr.getHostAddress();
            if (isPrivateOrReserved(ip)) {
                throw new SecurityException("Blocked: " + ip + " is a private/reserved IP");
            }
        }

        // 3 — Disable redirects to prevent redirect-chain bypasses
        HttpURLConnection conn = (HttpURLConnection) uri.toURL().openConnection();
        conn.setInstanceFollowRedirects(false);
        conn.setConnectTimeout(3000);
        conn.setReadTimeout(5000);

        int status = conn.getResponseCode();
        if (status >= 300 && status < 400) {
            throw new SecurityException("Redirects are not allowed");
        }

        try (InputStream in = conn.getInputStream()) {
            return new String(in.readAllBytes());
        }
    }

    private static boolean isPrivateOrReserved(String ip) {
        for (String prefix : BLOCKED_PREFIXES) {
            if (ip.startsWith(prefix)) return true;
        }
        return false;
    }
}`,
      },
      {
        type: "callout",
        variant: "tip",
        text: "Use InetAddress.getAllByName() not just getByName() — some hostnames resolve to multiple IPs and an attacker can ensure one of them is public while another is internal.",
      },
      { type: "h2", text: "Spring WebClient with an SSRF Filter" },
      {
        type: "p",
        text: "For modern Spring Boot apps using WebClient (Project Reactor), you can add an ExchangeFilterFunction to intercept and validate every outbound request:",
      },
      {
        type: "code",
        lang: "java",
        text: `import org.springframework.web.reactive.function.client.*;
import reactor.core.publisher.Mono;
import java.net.InetAddress;

public class SsrfProtectionFilter implements ExchangeFilterFunction {

    @Override
    public Mono<ClientResponse> filter(ClientRequest request,
                                       ExchangeFunction next) {
        String host = request.url().getHost();
        try {
            InetAddress[] addresses = InetAddress.getAllByName(host);
            for (InetAddress addr : addresses) {
                if (addr.isLoopbackAddress()
                        || addr.isSiteLocalAddress()
                        || addr.isLinkLocalAddress()
                        || addr.isAnyLocalAddress()) {
                    return Mono.error(
                        new SecurityException("SSRF blocked: " + addr.getHostAddress()));
                }
            }
        } catch (Exception e) {
            return Mono.error(new SecurityException("Could not resolve host: " + host));
        }
        return next.exchange(request);
    }
}

// Register the filter:
@Bean
public WebClient webClient() {
    return WebClient.builder()
        .filter(new SsrfProtectionFilter())
        .build();
}`,
      },
      { type: "h2", text: "IMDSv2 on AWS EC2" },
      {
        type: "p",
        text: "Even without application-level SSRF fixes, enforce IMDSv2 on all EC2 instances. IMDSv2 requires a PUT request with a TTL header to obtain a session token before metadata queries. Simple SSRF payloads that fire a single GET to 169.254.169.254 will fail.",
      },
      {
        type: "code",
        lang: "bash",
        text: `# Enforce IMDSv2 via AWS CLI (run during instance provisioning)
aws ec2 modify-instance-metadata-options \\
  --instance-id i-0123456789abcdef0 \\
  --http-tokens required \\
  --http-endpoint enabled

# In Terraform:
resource "aws_instance" "app" {
  metadata_options {
    http_tokens   = "required"   # IMDSv2 only
    http_endpoint = "enabled"
  }
}`,
      },
      { type: "h2", text: "Defence Checklist" },
      {
        type: "ul",
        items: [
          "Validate URLs against a strict allowlist of permitted domains — never a blocklist.",
          "Resolve DNS and reject requests to private, loopback, and link-local IP ranges.",
          "Disable HTTP redirects on all outbound HTTP clients.",
          "Enforce IMDSv2 on AWS EC2 to protect instance metadata.",
          "Use a dedicated egress proxy (e.g. Squid) with an allowlist for all server-side HTTP calls.",
          "Apply network segmentation — internal services should be unreachable from the app tier.",
          "Add SSRF-specific test cases (metadata endpoint, localhost, RFC-1918 ranges) to your security test suite.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        text: "The OWASP Java HTML Sanitizer team also maintains a safe URL validator. For a ready-made solution, consider using com.google.guava and wrapping HostSpecifier.fromValid() + checking InetAddress.isLoopbackAddress() for a clean, testable implementation.",
      },
    ],
  },
];
