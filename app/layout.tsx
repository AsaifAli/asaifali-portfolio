import type { Metadata } from "next";
import Link from "next/link";
import { ScrollRestoration } from "@/components/ScrollRestoration";
import { MobileNav } from "@/components/MobileNav";
import { AISessionProvider } from "@/components/AISessionProvider";
import { AISessionBadge } from "@/components/AISessionBadge";
import "./globals.css";

const SITE_URL = "https://asaifali-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Asaif Ali — AI/ML Engineer", template: "%s — Asaif Ali" },
  description: "AI/ML engineer building production-oriented Generative AI, Agentic AI, RAG, automation, and LLM systems.",
  keywords: ["AI/ML Engineer", "Generative AI", "Agentic AI", "RAG", "LLM Engineering", "LangGraph", "AI Automation"],
  alternates: { canonical: "/" },
  openGraph: { title: "Asaif Ali — AI/ML Engineer", description: "Production-oriented AI systems across Generative AI, Agentic AI, RAG, automation, and LLM engineering.", url: SITE_URL, siteName: "Asaif Ali", type: "website", locale: "en_IN" },
  twitter: { card: "summary", title: "Asaif Ali — AI/ML Engineer", description: "Production-oriented AI systems across Generative AI, Agentic AI, RAG, automation, and LLM engineering." },
  robots: { index: true, follow: true },
};

const nav = [["About", "/#about"], ["Work", "/#work"], ["Experience", "/#experience"], ["Contact", "/#contact"]];
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
      <div className="nav-actions"><AISessionBadge /><Link className="header-connect" href="/#contact">Let’s connect</Link></div>
      <MobileNav nav={nav} />
    </div></header>
    {children}
    <footer className="site-footer"><div className="shell footer-inner"><span>© {new Date().getFullYear()} Asaif Ali</span><span>AI / ML · Generative AI · Agentic AI · LLM Systems</span></div></footer>
          </AISessionProvider>
      </body></html>;
}
