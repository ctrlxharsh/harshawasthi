import { getCliClient } from "sanity/cli";
import { seed } from "../lib/seed";
import type { ProofLink } from "../lib/types";

const client = getCliClient({ apiVersion: "2026-03-01" }).withConfig({
  useCdn: false,
  perspective: "published",
});
const apply = process.env.APPLY_PORTFOLIO_REFINEMENT === "1";

type PublishedDocument = {
  _id: string;
  _rev: string;
  highlights?: string[];
  venue?: string;
  authors?: string;
  proofLinks?: ProofLink[];
};

async function main() {
  const cytology = seed.publications.find(
    (paper) => paper.slug === "cervical-cytology",
  );
  const conferenceLink = cytology?.proofLinks?.[0];
  if (!cytology || !conferenceLink)
    throw new Error("Missing cytology seed evidence.");

  const experience = seed.experience.filter(
    (entry) => entry.highlights?.length,
  );
  const ids = [...experience.map((entry) => entry._id), cytology._id];
  const published = await client.fetch<PublishedDocument[]>(
    "*[_id in $ids]{_id,_rev,highlights,venue,authors,proofLinks}",
    { ids },
  );
  const documents = new Map(
    published.map((document) => [document._id, document]),
  );
  const transaction = client.transaction();
  let changes = 0;

  for (const entry of experience) {
    const document = documents.get(entry._id);
    if (!document) throw new Error(`Missing published document: ${entry._id}`);
    if (document.highlights != null) continue;
    transaction.patch(entry._id, (patch) =>
      patch
        .ifRevisionId(document._rev)
        .setIfMissing({ highlights: entry.highlights }),
    );
    console.log(`${entry._id}: add ${entry.highlights?.length} highlights`);
    changes++;
  }

  const paper = documents.get(cytology._id);
  if (!paper) throw new Error(`Missing published document: ${cytology._id}`);
  const corrections: Record<string, string> = {};
  if (paper.venue === "IEEE DELCON 2026" && cytology.venue)
    corrections.venue = cytology.venue;
  if (
    paper.authors === "Ali, Siddiqui, Harsh Awasthi, Fatima" &&
    cytology.authors
  ) {
    corrections.authors = cytology.authors;
  }
  const addLink = !paper.proofLinks?.some(
    (link) => link.url === conferenceLink.url,
  );
  if (Object.keys(corrections).length || addLink) {
    transaction.patch(paper._id, (patch) => {
      const update = patch.ifRevisionId(paper._rev).set(corrections);
      return addLink
        ? update
            .setIfMissing({ proofLinks: [] })
            .append("proofLinks", [
              { _key: "delcon-2026-acceptance", ...conferenceLink },
            ])
        : update;
    });
    console.log(
      `${paper._id}: update ${[...Object.keys(corrections), ...(addLink ? ["conference evidence"] : [])].join(", ")}`,
    );
    changes++;
  }

  if (apply && changes) await transaction.commit();
  console.log(
    `${changes} document(s) ${apply ? "updated" : "would be updated"}.`,
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
