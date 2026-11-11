import { createClient } from "@sanity/client";
import { getCliClient } from "sanity/cli";
import { seed } from "../lib/seed";

const token = process.env.SANITY_WRITE_TOKEN;
const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "mke2ofjc",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-03-01",
  useCdn: false,
};
const client = token
  ? createClient({ ...config, token })
  : getCliClient({ apiVersion: config.apiVersion }).withConfig(config);

function keys<T extends object>(items: T[]) {
  return items.map((item, index) => ({ _key: `item-${index}`, ...item }));
}

async function main() {
  const documents: Array<{
    _id: string;
    _type: string;
    [key: string]: unknown;
  }> = [
    { _id: "siteSettings", _type: "siteSettings", ...seed.settings },
    {
      _id: "profile",
      _type: "profile",
      ...seed.profile,
      socialLinks: keys(seed.profile.socialLinks),
    },
    ...(["projects", "publications"] as const).flatMap((kind) =>
      seed[kind].map(({ slug, proofLinks, ...item }) => ({
        ...item,
        _type: kind === "projects" ? "project" : "publication",
        slug: { _type: "slug", current: slug },
        proofLinks: keys(proofLinks || []),
      })),
    ),
    ...seed.workshops.map((item) => ({ ...item, _type: "workshop" })),
    ...(["experience", "education", "awards", "skills"] as const).flatMap(
      (kind) =>
        seed[kind].map((item) => ({
          ...item,
          _type:
            kind === "awards" ? "award" : kind === "skills" ? "skill" : kind,
        })),
    ),
  ];
  const transaction = client.transaction();
  documents.forEach((document) => transaction.createIfNotExists(document));
  const result = await transaction.commit();
  console.log(
    `Import complete: ${documents.length} documents considered; existing documents were preserved. Transaction ${result.transactionId}.`,
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
