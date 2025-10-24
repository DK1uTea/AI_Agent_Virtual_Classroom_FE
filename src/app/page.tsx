import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

// ---- SEO ----
export const metadata: Metadata = {
  title: "AI Virtual Classroom — Adaptive, Interactive Learning with AI",
  description:
    "AI Virtual Classroom: personalized learning paths, AI-powered tutoring, interactive lessons and progress tracking. Start learning faster with intelligent recommendations.",
  metadataBase: new URL("https://your-domain.example/"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "AI Virtual Classroom — Adaptive, Interactive Learning with AI",
    description:
      "Personalized, AI-powered online classroom. Adaptive lessons, practice exercises, and certificates.",
    url: "https://your-domain.example/",
    siteName: "AI Virtual Classroom",
    images: [
      {
        // Free Unsplash image with AI/tech vibe
        url: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Neural network abstract — AI Virtual Classroom",
      },
    ],
    locale: "vi-VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Virtual Classroom",
    description:
      "Adaptive lessons, AI tutors, practice exercises and certificates — learn smarter with AI.",
    images: [
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1200&auto=format&fit=crop",
    ],
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AI Virtual Classroom",
    url: "https://your-domain.example/",
    description:
      "AI Virtual Classroom offers personalized learning paths, interactive lessons, AI tutors and progress tracking to help learners succeed.",
    publisher: {
      "@type": "Organization",
      name: "AI Virtual Classroom",
    },
  };

  return (
    <main className="relative min-h-screen mx-auto max-w-6xl px-6 md:px-8 py-12 md:py-16">
      {/* Decorative background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* subtle grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.muted.DEFAULT,_.2),transparent_1px)] [background-size:16px_16px] opacity-40 dark:opacity-20" />
        {/* gradient blobs */}
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl bg-gradient-to-tr from-violet-400/40 via-fuchsia-400/30 to-cyan-300/30" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl bg-gradient-to-tr from-cyan-300/30 via-sky-300/30 to-indigo-400/30" />
      </div>

      {/* ---- NAV ---- */}
      <header className="flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-primary/10 ring-1 ring-primary/20 flex items-center justify-center font-bold">AI</div>
          <span className="font-semibold">AI Virtual Classroom</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          <Link href="#features" className="hover:underline">Features</Link>
          <Link href="#why" className="hover:underline">Why us</Link>
          <Link href="/course-catalog" className="hover:underline">Courses</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login" className="rounded-full border px-4 py-2 text-sm">Sign in</Link>
          <Link href="/register" className="rounded-full bg-primary px-4 py-2 text-white text-sm font-semibold shadow">Get started</Link>
        </div>
      </header>

      {/* ---- HERO ---- */}
      <section aria-label="Hero" className="mt-12 grid gap-8 lg:grid-cols-2 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs font-medium backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> AI · Adaptive · Interactive
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Learn faster with <span className="bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">AI‑powered</span> lessons
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl">
            Personalized learning paths, instant feedback from an AI tutor, and real assessments to prove your skills.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-white font-semibold shadow hover:shadow-md transition"
            >
              Start free trial
            </Link>
            <Link
              href="/course-catalog"
              className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm"
            >
              Explore courses
            </Link>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2" id="features">
            <li className="rounded-xl border bg-background/50 p-4 backdrop-blur">
              <strong className="block">Adaptive lessons</strong>
              <div className="text-sm text-muted-foreground">Content adjusts to your skill level.</div>
            </li>
            <li className="rounded-xl border bg-background/50 p-4 backdrop-blur">
              <strong className="block">AI Tutor</strong>
              <div className="text-sm text-muted-foreground">Instant feedback and guidance.</div>
            </li>
            <li className="rounded-xl border bg-background/50 p-4 backdrop-blur">
              <strong className="block">Interactive practice</strong>
              <div className="text-sm text-muted-foreground">Hands-on exercises with solutions.</div>
            </li>
            <li className="rounded-xl border bg-background/50 p-4 backdrop-blur">
              <strong className="block">Progress tracking</strong>
              <div className="text-sm text-muted-foreground">See improvement over time.</div>
            </li>
          </ul>
        </div>

        <div className="order-first lg:order-last flex items-center justify-center">
          <div className="relative w-full max-w-xl">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-indigo-500/30 via-fuchsia-400/30 to-cyan-400/30 blur-2xl" aria-hidden />
            <div className="relative rounded-[2rem] ring-1 ring-white/10 overflow-hidden shadow-2xl">
              <Image
                priority
                src="https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1400&auto=format&fit=crop"
                alt="AI network visualization"
                width={1120}
                height={840}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---- WHY ---- */}
      <section aria-label="Why choose us" id="why" className="mt-20">
        <h2 className="text-2xl md:text-3xl font-semibold">Why choose AI Virtual Classroom?</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <article className="rounded-2xl border p-6 bg-background/60 backdrop-blur">
            <h3 className="font-semibold">Personalized Path</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Algorithms create a study path tailored to your goals and pace.
            </p>
          </article>
          <article className="rounded-2xl border p-6 bg-background/60 backdrop-blur">
            <h3 className="font-semibold">AI Tutor</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Get on-demand help, explanations and code review from AI.
            </p>
          </article>
          <article className="rounded-2xl border p-6 bg-background/60 backdrop-blur">
            <h3 className="font-semibold">Real Assessments</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Practical exercises, quizzes and certificates to validate skills.
            </p>
          </article>
        </div>
      </section>

      {/* ---- SOCIAL PROOF ---- */}
      <section className="mt-16">
        <div className="rounded-2xl border p-6 md:p-8 bg-background/60 backdrop-blur">
          <p className="text-sm text-muted-foreground">Trusted by learners from</p>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 opacity-80">
            <div className="h-10 rounded bg-muted" />
            <div className="h-10 rounded bg-muted" />
            <div className="h-10 rounded bg-muted" />
            <div className="h-10 rounded bg-muted" />
          </div>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section aria-label="Call to action" className="mt-16 text-center">
        <h2 className="text-xl md:text-2xl font-semibold">Ready to learn smarter?</h2>
        <p className="mt-2 text-muted-foreground">Join thousands leveling up with adaptive, AI‑powered learning.</p>
        <div className="mt-5 flex items-center justify-center gap-4">
          <Link href="/register" className="rounded-full bg-primary px-6 py-3 text-white font-semibold shadow">
            Start free trial
          </Link>
          <Link href="/course-catalog" className="rounded-full border px-6 py-3">
            Explore courses
          </Link>
        </div>
      </section>

      {/* JSON-LD for SEO (rendered server-side) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ---- FOOTER ---- */}
      <footer className="mt-20 border-t pt-8 text-sm text-muted-foreground">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} AI Virtual Classroom</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/terms" className="hover:underline">Terms</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
