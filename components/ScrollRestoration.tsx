"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const KEY_PREFIX = "portfolio-scroll:";

export function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    const key = `${KEY_PREFIX}${pathname}`;
    const saved = sessionStorage.getItem(key);

    if (saved) {
      const y = Number(saved);
      if (Number.isFinite(y)) {
        requestAnimationFrame(() => window.scrollTo(0, y));
      }
    }

    const handleScroll = () => {
      sessionStorage.setItem(key, String(window.scrollY));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem(
        `${KEY_PREFIX}${pathname}`,
        String(window.scrollY),
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [pathname]);

  return null;
}
