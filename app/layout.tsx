import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { MobileNav } from "@/components/MobileNav";

export const metadata: Metadata = {
  title: "Asaif Ali — AI/ML Engineer",
  description:
    "AI/ML engineer building production-oriented Generative AI, Agentic AI, RAG, and LLM systems.",
  openGraph: {
    title: "Asaif Ali — AI/ML Engineer",
    description:
      "Production-oriented AI systems across Generative AI, Agentic AI, RAG, automation, and LLM engineering.",
    type: "website",
  },
};

const nav = [
  ["Work", "/#work"],
  ["Engineering", "/#engineering"],
  ["Experience", "/#experience"],
  ["Contact", "/#contact"],
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="site-noise" aria-hidden="true" />
        <header className="site-header">
          <div className="shell nav-inner">
            <Link href="/" className="brand" aria-label="Asaif Ali home">
              ASAIF ALI<span className="brand-dot">.</span>
            </Link>

            <nav className="nav-links" aria-label="Primary navigation">
              {nav.map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </nav>

            <div className="nav-actions">
              <a
                href="https://github.com/AsaifAli"
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>
              <a
                href="https://www.linkedin.com/in/sk-asaif-ali-134873243"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn ↗
              </a>
            </div>

            <MobileNav nav={nav} />
          </div>
        </header>

        {children}

        <footer className="site-footer">
          <div className="shell footer-inner">
            <span>© {new Date().getFullYear()} Asaif Ali</span>
            <span>AI / ML · Generative AI · Agentic AI · LLM Systems</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
