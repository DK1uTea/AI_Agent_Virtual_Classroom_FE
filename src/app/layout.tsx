import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ToastProvider from "@/components/toast-provider";
import { QueryProvider } from "@/components/query-provider";
import { AuthProvider } from "@/components/auth-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["vietnamese"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-agent-virtual-classroom-fe.vercel.app"),

  title: {
    default: "AI Virtual Classroom – Learn Smarter with AI",
    template: "%s | AI Virtual Classroom",
  },

  description:
    "AI Virtual Classroom is an AI-powered learning platform with video courses, quizzes, mindmaps, and personalized AI feedback to help you learn faster.",

  keywords: [
    "AI learning platform",
    "AI online courses",
    "virtual classroom",
    "AI tutor",
    "AI education",
  ],

  openGraph: {
    title: "AI Virtual Classroom – Learn Smarter with AI",
    description:
      "Personalized AI-powered courses with videos, quizzes, mindmaps, and instant AI feedback.",
    url: "https://ai-agent-virtual-classroom-fe.vercel.app",
    siteName: "AI Virtual Classroom",
    images: [
      {
        url: "/AI_Classroom_Logo.png",
        width: 1200,
        height: 630,
        alt: "AI Virtual Classroom",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Virtual Classroom – Learn Smarter with AI",
    description:
      "AI-powered courses with smart practice and instant feedback.",
    images: ["/AI_Classroom_Logo.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <QueryProvider>
              <div className="min-h-screen bg-background">
                {children}
              </div>
            </QueryProvider>
          </AuthProvider>
        </ThemeProvider>
        <ToastProvider />
        <Toaster />
      </body>
    </html>
  );
}
