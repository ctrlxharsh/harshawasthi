import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "portfolio",
  title: "Harsh Awasthi Portfolio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "mke2ofjc",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
