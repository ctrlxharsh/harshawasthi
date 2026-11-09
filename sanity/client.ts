import { createClient } from "next-sanity";
import { defineLive } from "next-sanity/live";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "mke2ofjc",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-03-01",
  useCdn: false,
  perspective: "published",
  token: process.env.SANITY_API_READ_TOKEN,
});

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: false,
  browserToken: false,
});
