import type { Metadata } from "next";
import Link from "next/link";
import { ScrollRestoration } from "@/components/ScrollRestoration";
import { MobileNav } from "@/components/MobileNav";
import { AISessionProvider } from "@/components/AISessionProvider";
import "./globals.css";

const SITE_URL = "https://asaifali-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Asaif Ali — AI/ML Engineer", template: "%s — Asaif Ali" },
  description: "Asaif Ali is an AI/ML engineer building useful AI systems across Generative AI, Agentic AI, retrieval, automation, and software engineering.",
  keywords: ["AI/ML Engineer", "Generative AI", "Agentic AI", "RAG", "LLM Engineering", "LangGraph", "AI Automation"],
  alternates: { canonical: "/" },
  openGraph: { title: "Asaif Ali — AI/ML Engineer", description: "AI/ML engineer building useful AI systems across Generative AI, Agentic AI, retrieval, automation, and software engineering.", url: SITE_URL, siteName: "Asaif Ali", type: "website", locale: "en_IN" },
  twitter: { card: "summary", title: "Asaif Ali — AI/ML Engineer", description: "AI/ML engineer building useful AI systems across Generative AI, Agentic AI, retrieval, automation, and software engineering." },
  robots: { index: true, follow: true },
};

const nav = [["About", "/#about"], ["Experience", "/#experience"], ["Work", "/#work"], ["Contact", "/#contact"]];
const personJsonLd = {
  "@context": "https://schema.org", "@type": "Person", name: "Asaif Ali", jobTitle: "AI/ML Engineer", url: SITE_URL,
  sameAs: ["https://github.com/AsaifAli", "https://www.linkedin.com/in/sk-asaif-ali-134873243"],
  knowsAbout: ["Generative AI", "Agentic AI", "RAG", "LLM Engineering", "Machine Learning", "AI Automation"]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
        <AISessionProvider>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
    <ScrollRestoration />
    <div className="site-noise" aria-hidden="true" />
    <header className="site-header"><div className="shell nav-inner">
      <Link href="/" className="brand" aria-label="Asaif Ali home">ASAIF ALI<span className="brand-dot">.</span></Link>
      <nav className="nav-links" aria-label="Primary navigation">{nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>
      <MobileNav nav={nav} />
    </div></header>
    {children}
    <footer className="site-footer"><div className="shell footer-inner"><span>© {new Date().getFullYear()} Asaif Ali</span><span>AI/ML engineer · India</span></div></footer>
          </AISessionProvider>
      </body></html>;
}
