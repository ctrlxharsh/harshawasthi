import { defineQuery } from "next-sanity";
import { client } from "./client";
import { seed } from "@/lib/seed";
import type { Portfolio } from "@/lib/types";

const portfolioQuery = defineQuery(`{
  "settings": *[_type == "siteSettings" && _id == "siteSettings"][0] { ..., "heroImage": heroImage { ..., "url": asset->url } },
  "profile": *[_type == "profile" && _id == "profile"][0] { ..., "portrait": portrait { ..., "url": asset->url } },
  "projects": *[_type == "project"] | order(order asc) {
    ..., "slug": slug.current,
    "image": image { ..., "url": asset->url },
    "gallery": gallery[] { ..., "url": asset->url },
    body[] { ..., _type == "media" => { ..., "url": asset->url } }
  },
  "publications": *[_type == "publication"] | order(order asc) {
    ..., "slug": slug.current,
    "image": image { ..., "url": asset->url },
    "gallery": gallery[] { ..., "url": asset->url },
    body[] { ..., _type == "media" => { ..., "url": asset->url } }
  },
  "experience": *[_type == "experience"] | order(order asc),
  "education": *[_type == "education"] | order(order asc),
  "awards": *[_type == "award"] | order(order asc),
  "skills": *[_type == "skill"] | order(order asc)
}`);

export async function getPortfolio(): Promise<Portfolio> {
  try {
    // ponytail: every request reads fresh content; add a shared cache if traffic warrants it.
    const data = await client.fetch(portfolioQuery, {}, { cache: "no-store" });
    const portfolio = data as unknown as Partial<Portfolio> | null;
    if (!portfolio?.settings || !portfolio?.profile) return seed;
    return {
      ...portfolio,
      settings: { ...seed.settings, ...portfolio.settings },
    } as Portfolio;
  } catch (error) {
    console.error("Unable to load published portfolio content:", error);
    return seed;
  }
}
