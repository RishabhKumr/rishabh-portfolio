import Link from "next/link";
import { posts } from "./data";

export const metadata = {
  title: "Security Blog — Rishabh Kumar",
  description: "Deep dives into web security topics with Java code examples.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      {/* NAV */}
      <nav className="border-b border-white/5 sticky top-0 z-50 backdrop-blur-sm bg-[#0d0d0d]/80">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight hover:text-violet-400 transition-colors">
            Rishabh Kumar
          </Link>
          <div className="flex items-center gap-6 text-sm text-zinc-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-violet-400 font-medium">Blog</span>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-12">
        <p className="text-sm font-mono text-violet-400 mb-3">// writings</p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Security Blog</h1>
        <p className="text-zinc-400 text-lg max-w-2xl">
          Deep dives into web security vulnerabilities — how they work, how they&apos;re exploited,
          and the Java patterns that stop them.
        </p>
      </section>

      {/* POSTS */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-6 hover:border-violet-500/50 hover:bg-white/[0.06] transition-all duration-200"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2 className="text-lg font-bold mb-2 group-hover:text-violet-300 transition-colors leading-snug">
                {post.title}
              </h2>

              {/* Subtitle */}
              <p className="text-zinc-400 text-sm flex-1 mb-6 leading-relaxed">
                {post.subtitle}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>{post.date}</span>
                <span className="font-mono">{post.readTime}</span>
              </div>

              {/* Arrow */}
              <span className="absolute bottom-6 right-6 text-zinc-600 group-hover:text-violet-400 transition-colors text-lg">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

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
