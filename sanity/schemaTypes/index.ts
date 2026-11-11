import { defineField, defineType } from "sanity";

const link = defineType({
  name: "proofLink",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      type: "url",
      validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }),
    }),
  ],
});
const media = defineType({
  name: "media",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "caption", type: "string" }),
  ],
});
const settingsFields = [
  ["heroPrimaryAction", "Hero primary action"],
  ["heroSecondaryAction", "Hero secondary action"],
  ["contactAction", "Contact action"],
  ["archiveExpandAction", "Archive expand action"],
  ["archiveCollapseAction", "Archive collapse action"],
  ["educationLabel", "Education label"],
  ["awardsLabel", "Awards label"],
  ["researchLabel", "Research label"],
  ["projectsLabel", "Projects label"],
  ["experienceLabel", "Experience label"],
  ["aboutLabel", "About label"],
  ["contactLabel", "Contact label"],
  ["selectedLabel", "Selected projects label"],
  ["archiveLabel", "Project archive label"],
  ["archiveTitle", "Project archive heading"],
  ["experienceIntro", "Experience introduction"],
  ["awardsIntro", "Awards introduction"],
  ["aboutTitle", "About heading"],
  ["eyebrow", "Hero eyebrow"],
  ["headline", "Hero headline"],
  ["intro", "Hero introduction"],
  ["availability", "Availability"],
  ["researchTitle", "Research heading"],
  ["researchIntro", "Research introduction"],
  ["projectsTitle", "Projects heading"],
  ["projectsIntro", "Projects introduction"],
  ["experienceTitle", "Experience heading"],
  ["educationTitle", "Education heading"],
  ["awardsTitle", "Awards heading"],
  ["contactTitle", "Contact heading"],
  ["contactIntro", "Contact introduction"],
] as const;

const settings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "heroImage", title: "Hero image", type: "media" }),
    ...settingsFields.map(([name, title]) =>
      defineField({ name, title, type: "string" }),
    ),
  ],
});
const profile = defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      type: "email",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "biography", type: "text" }),
    defineField({ name: "portrait", type: "media" }),
    defineField({
      name: "socialLinks",
      type: "array",
      of: [{ type: "proofLink" }],
    }),
  ],
});

const baseCaseFields = [
  defineField({
    name: "title",
    type: "string",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "slug",
    type: "slug",
    options: { source: "title" },
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "category",
    type: "string",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "summary",
    type: "text",
    rows: 3,
    validation: (rule) => rule.required(),
  }),
  defineField({ name: "date", title: "Date or year", type: "string" }),
  defineField({ name: "order", title: "Display order", type: "number" }),
  defineField({
    name: "technology",
    title: "Topics and technologies",
    type: "array",
    of: [{ type: "string" }],
  }),
  defineField({ name: "image", title: "Cover image", type: "media" }),
  defineField({
    name: "gallery",
    title: "Image gallery",
    type: "array",
    of: [{ type: "media" }],
  }),
  defineField({
    name: "videoUrl",
    title: "Demo video URL",
    type: "url",
    validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
  }),
  defineField({
    name: "body",
    title: "Article",
    type: "array",
    of: [{ type: "block" }, { type: "media" }],
  }),
  defineField({
    name: "proofLinks",
    title: "Evidence links",
    type: "array",
    of: [{ type: "proofLink" }],
  }),
  defineField({
    name: "accent",
    title: "Card color",
    type: "string",
    options: { list: ["blue", "sky", "ink", "lavender", "deep"] },
  }),
];
const project = defineType({
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    ...baseCaseFields,
    defineField({
      name: "featuredOnHome",
      title: "Featured on home",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "featuredOrder",
      title: "Featured order",
      type: "number",
    }),
  ],
});
const publication = defineType({
  name: "publication",
  title: "Research & publications",
  type: "document",
  fields: [
    ...baseCaseFields,
    defineField({ name: "authors", type: "string" }),
    defineField({ name: "venue", type: "string" }),
  ],
});

function timeline(name: string, title: string) {
  return defineType({
    name,
    title,
    type: "document",
    fields: [
      defineField({
        name: "title",
        type: "string",
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: "organization",
        title: "Organization or institution",
        type: "string",
      }),
      ...(name === "experience"
        ? [
            defineField({
              name: "logo",
              title: "Organization logo",
              type: "image",
            }),
            defineField({
              name: "highlights",
              title: "Highlights",
              type: "array",
              of: [{ type: "string" }],
            }),
          ]
        : []),
      defineField({ name: "date", type: "string" }),
      defineField({ name: "description", type: "text" }),
      defineField({ name: "order", type: "number" }),
    ],
  });
}

export const schemaTypes = [
  link,
  media,
  settings,
  profile,
  project,
  publication,
  timeline("experience", "Experience & leadership"),
  timeline("education", "Education"),
  timeline("award", "Awards & service"),
  timeline("skill", "Skills & interests"),
];
