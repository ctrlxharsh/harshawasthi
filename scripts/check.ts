import assert from "node:assert/strict";
import { seed } from "../lib/seed";
import { httpUrl, selectionFromParams } from "../lib/links";

const slugs = [...seed.projects, ...seed.publications].map((item) => item.slug);
assert.equal(
  new Set(slugs).size,
  slugs.length,
  "All item slugs should be unique",
);
assert.deepEqual(
  seed.projects
    .filter((item) => item.featuredOnHome)
    .sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0))
    .map((item) => item.slug),
  ["driveo", "air-quality-estimation", "newssure", "agenda-ai"],
);
assert.deepEqual(selectionFromParams(new URLSearchParams("research=lagps")), {
  kind: "research",
  slug: "lagps",
});
assert.deepEqual(selectionFromParams(new URLSearchParams("project=driveo")), {
  kind: "project",
  slug: "driveo",
});
assert.equal(selectionFromParams(new URLSearchParams()), null);
assert.equal(httpUrl("javascript:alert(1)"), undefined);
assert.equal(httpUrl("not a URL"), undefined);
assert.equal(httpUrl("https://example.com/paper"), "https://example.com/paper");
console.log("Portfolio content and link checks passed.");
