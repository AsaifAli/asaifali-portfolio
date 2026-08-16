"use client";

import { useState } from "react";
import Link from "next/link";

type Props = {
  nav: string[][];
};

export function MobileNav({ nav }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mobile-nav">
      <button
        type="button"
        className="mobile-nav-toggle"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <span>{open ? "Close" : "Menu"}</span>
        <span className="mobile-nav-icon" aria-hidden="true">
          {open ? "×" : "☰"}
        </span>
      </button>

      {open && (
        <div id="mobile-nav-panel" className="mobile-nav-panel">
          <nav aria-label="Mobile navigation">
            {nav.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>
                {label}
              </Link>
            ))}
            <a
              href="https://github.com/AsaifAli"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/sk-asaif-ali-134873243"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              LinkedIn ↗
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
