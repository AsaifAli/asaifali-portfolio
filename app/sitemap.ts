import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

const SITE_URL = "https://asaifali-portfolio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projectEntries,
  ];
}
