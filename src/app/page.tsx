import Link from "next/link";
import Image from "next/image";
import { Brain, Video, MessageSquare, LineChart, Sparkles, BookOpenCheck, Bot, ShieldCheck, GraduationCap, Network } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Video‑based courses",
    description: "HD lessons with transcripts, captions, and playback speed control.",
    icon: Video,
  },
  {
    title: "AI Agent feedback",
    description: "Your personal AI analyzes answers, explains mistakes, and scores rubrics.",
    icon: Bot,
  },
  {
    title: "Study assistant",
    description: "Ask context‑aware questions, get examples, and generate practice tasks.",
    icon: MessageSquare,
  },
  {
    title: "Mind‑map generator",
    description: "Turn topics into clean, exportable mindmaps for faster revision.",
    icon: Network,
  },
  {
    title: "Interactive practice",
    description: "Quizzes, coding sandboxes, and projects with instant hints.",
    icon: BookOpenCheck,
  },
  {
    title: "Progress & certificates",
    description: "Track mastery, earn badges, and get shareable certificates.",
    icon: GraduationCap,
  },
];

const sellingPoints = [
  {
    title: "Adaptive lessons",
    description: "Difficulty auto‑adjusts to your skill level and learning pace.",
    icon: Brain,
  },
  {
    title: "Real assessment",
    description: "Scenario‑based tasks, rubric grading, and skill gap analysis.",
    icon: LineChart,
  },
  {
    title: "Trusted & private",
    description: "FERPA‑friendly defaults, SSO, and role‑based access control.",
    icon: ShieldCheck,
  },
  {
    title: "Powered by modern AI",
    description: "Latest LLMs with safe‑guarded prompts and retrieval.",
    icon: Sparkles,
  },
];

const steps = [
  { n: 1, title: "Tell us your goal", body: "Pick a path (e.g., Web Dev, Data, IELTS)." },
  { n: 2, title: "Baseline check", body: "Quick diagnostic to place you at the right level." },
  { n: 3, title: "Adaptive roadmap", body: "Personalized modules with videos, readings, and projects." },
  { n: 4, title: "Learn with AI help", body: "Agent explains, reviews, and generates mindmaps & notes." },
  { n: 5, title: "Validate & certify", body: "Finish capstone; earn a certificate you can share." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AI Virtual Classroom",
  url: "https://example.com",
  logo: "https://example.com/logo.png",
  sameAs: ["https://twitter.com/ai_virtual_classroom"],
  offers: {
    "@type": "OfferCatalog",
    name: "Courses",
    itemListElement: [
      { "@type": "Course", name: "Web Development", provider: { "@type": "Organization", name: "AI Virtual Classroom" } },
      { "@type": "Course", name: "Data Analysis", provider: { "@type": "Organization", name: "AI Virtual Classroom" } },
    ],
  },
};



export default function LandingPage() {
  return (
    <main className="relative min-h-screen mx-auto max-w-7xl px-6 md:px-8 py-12 md:py-16">
      {/* Decorative background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* subtle grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.muted.DEFAULT,_.2),transparent_1px)] [background-size:16px_16px] opacity-40 dark:opacity-20" />
        {/* gradient blobs */}
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl bg-gradient-to-tr from-violet-400/40 via-fuchsia-400/30 to-cyan-300/30" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl bg-gradient-to-tr from-cyan-300/30 via-sky-300/30 to-indigo-400/30" />
      </div>

      {/* ---- HEADER ---- */}
      <header className="flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-primary/10 ring-1 ring-primary/20 flex items-center justify-center font-bold">AI</div>
          <span className="font-semibold">AI Virtual Classroom</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/login" className="rounded-full border px-4 py-2 text-sm">Sign in</Link>
          <Link href="/register" className="rounded-full bg-primary px-4 py-2 text-white text-sm font-semibold shadow">Get started</Link>
        </div>
      </header>

      {/* ---- HERO ---- */}
      <section aria-label="Hero" className="mt-12 grid gap-8 lg:grid-cols-2 items-center">
        <div>
          <Badge variant="outline" className="gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> AI · Adaptive · Interactive
          </Badge>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Learn faster with <span className="bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">AI‑powered</span> lessons
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl">
            Personalized paths, HD video courses, and an AI Agent that explains, evaluates, and helps you study smarter.
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

          <div className="mt-8 grid gap-4 sm:grid-cols-2" id="features">
            {features.map(({ title, description, icon: Icon }) => (
              <Card key={title}>
                <CardHeader className="flex flex-row items-start gap-3">
                  <Icon className="h-5 w-5" />
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
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
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 bg-gradient-to-t from-black/60 to-transparent text-white">
                <p className="text-xs md:text-sm opacity-90">Sample lesson: "Intro to Algorithms" · 12m video · 3 practice tasks</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- WHY ---- */}
      <section aria-label="Why choose us" id="why" className="mt-20">
        <h2 className="text-2xl md:text-3xl font-semibold">Why choose AI Virtual Classroom?</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sellingPoints.map(({ title, description, icon: Icon }) => (
            <Card key={title}>
              <CardHeader className="flex flex-row items-start gap-3">
                <div className="p-2 rounded-lg border">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* ---- HOW IT WORKS ---- */}
      <section aria-label="How it works" className="mt-20">
        <h2 className="text-2xl md:text-3xl font-semibold">How it works</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s) => (
            <li key={s.n} className="rounded-2xl border p-5 bg-background/60 backdrop-blur">
              <div className="text-xs text-muted-foreground">Step {s.n}</div>
              <div className="mt-1 font-semibold">{s.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
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
