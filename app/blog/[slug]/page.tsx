import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, Section } from "../data";

// Next.js 16: params is a Promise
type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: `${post.title} — Rishabh Kumar`, description: post.subtitle };
}

function renderSection(section: Section, i: number) {
  switch (section.type) {
    case "h2":
      return (
        <h2 key={i} className="text-2xl font-bold mt-10 mb-4 text-white">
          {section.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={i} className="text-lg font-semibold mt-7 mb-3 text-zinc-200">
          {section.text}
        </h3>
      );
    case "p":
      return (
        <p key={i} className="text-zinc-400 leading-relaxed mb-4">
          {section.text}
        </p>
      );
    case "ul":
      return (
        <ul key={i} className="flex flex-col gap-2 mb-5 ml-2">
          {section.items?.map((item, j) => (
            <li key={j} className="flex gap-3 text-sm text-zinc-400 leading-relaxed">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "code":
      return (
        <div key={i} className="my-5 rounded-xl border border-white/8 overflow-hidden">
          {section.lang && (
            <div className="px-4 py-2 bg-white/3 border-b border-white/5 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-500">{section.lang}</span>
            </div>
          )}
          <pre className="p-4 overflow-x-auto text-xs font-mono text-zinc-300 bg-[#111] leading-relaxed">
            <code>{section.text}</code>
          </pre>
        </div>
      );
    case "callout": {
      const styles = {
        danger: "border-red-500/30 bg-red-500/5 text-red-300",
        tip: "border-green-500/30 bg-green-500/5 text-green-300",
        info: "border-blue-500/30 bg-blue-500/5 text-blue-300",
      };
      const icons = { danger: "⚠️", tip: "💡", info: "ℹ️" };
      const variant = section.variant ?? "info";
      return (
        <div
          key={i}
          className={`my-5 flex gap-3 rounded-xl border p-4 text-sm leading-relaxed ${styles[variant]}`}
        >
          <span className="shrink-0">{icons[variant]}</span>
          <span>{section.text}</span>
        </div>
      );
    }
    default:
      return null;
  }
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const currentIndex = posts.findIndex((p) => p.slug === slug);
  const prev = posts[currentIndex + 1] ?? null;
  const next = posts[currentIndex - 1] ?? null;

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans">
      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 backdrop-blur-xl bg-[#0d0d0d]/80">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"
          >
            RK
          </Link>
          <div className="hidden sm:flex items-center gap-6 text-sm text-zinc-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/#about" className="hover:text-white transition-colors">About</Link>
            <Link href="/blog" className="hover:text-white transition-colors">All Posts</Link>
          </div>
          <Link
            href="/#contact"
            className="text-sm font-medium px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 transition-all duration-200 shadow-lg shadow-violet-900/30"
          >
            Connect Me
          </Link>
        </div>
      </nav>

      {/* ARTICLE */}
      <article className="max-w-2xl mx-auto px-6 pt-28 pb-20">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-violet-400 transition-colors mb-8"
        >
          ← All posts
        </Link>

        {/* Meta */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl lg:text-4xl font-extrabold mb-3 leading-tight">{post.title}</h1>
        <p className="text-zinc-400 text-base mb-6 leading-relaxed">{post.subtitle}</p>

        <div className="flex items-center gap-4 text-xs font-mono text-zinc-600 pb-8 border-b border-white/5 mb-8">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime}</span>
          <span>·</span>
          <span>by Rishabh Kumar</span>
        </div>

        {/* Content */}
        <div>{post.content.map((section, i) => renderSection(section, i))}</div>

        {/* Post navigation */}
        <div className="mt-16 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
          {prev ? (
            <Link
              href={`/blog/${prev.slug}`}
              className="group flex flex-col gap-1 p-4 rounded-xl border border-white/8 bg-white/3 hover:border-violet-500/30 transition-all"
            >
              <span className="text-xs text-zinc-600 font-mono">← Previous</span>
              <span className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors line-clamp-2">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/blog/${next.slug}`}
              className="group flex flex-col gap-1 p-4 rounded-xl border border-white/8 bg-white/3 hover:border-violet-500/30 transition-all text-right"
            >
              <span className="text-xs text-zinc-600 font-mono">Next →</span>
              <span className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors line-clamp-2">
                {next.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </article>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <p>© 2026 Rishabh Kumar.</p>
          <Link href="/" className="hover:text-zinc-300 transition-colors">
            ← Back to portfolio
          </Link>
        </div>
      </footer>
    </div>
  );
}
