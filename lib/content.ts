import { z } from 'zod';

export const sectionIds = ['projects', 'research', 'experience', 'achievements', 'skills', 'activities', 'journey'] as const;
export type SectionId = typeof sectionIds[number];

const safeLink = z.string().max(2048).refine(value => {
  if (value.startsWith('portfolio/')) return /^portfolio\/[a-zA-Z0-9._/-]+$/.test(value) && !value.includes('..');
  try { return ['https:', 'http:', 'mailto:'].includes(new URL(value).protocol); } catch { return false; }
}, 'Use an http(s) or email URL, or an uploaded asset.');
const linkSchema = z.object({ label: z.string().trim().min(1).max(60), url: safeLink });
const galleryImageSchema = z.object({ url: safeLink.refine(value => value.startsWith('portfolio/') || /^https?:\/\//i.test(value), 'Use an image URL or upload an image.'), caption: z.string().max(500) });
export const entrySchema = z.object({
  id: z.string().min(1).max(100), title: z.string().trim().min(1).max(200),
  description: z.string().max(3000), meta: z.string().max(200),
  image: z.union([safeLink, z.literal('')]), links: z.array(linkSchema).max(20), tags: z.array(z.string().max(80)).max(30),
  details: z.object({ enabled: z.boolean(), description: z.string().max(10000), images: z.array(galleryImageSchema).max(12) }).optional(),
});
export function hasDetails(entry: Entry) { return entry.details?.enabled !== false && (!!entry.details?.description.trim() || !!entry.details?.images.length || !!entry.image || entry.links.length > 0 || entry.tags.length > 0); }
export const contentSchema = z.object({
  profile: z.object({ name: z.string().min(1).max(100), greeting: z.string().min(1).max(100), hindi: z.string().min(1).max(100), about: z.string().min(1).max(5000), email: z.email(), resume: z.union([safeLink, z.literal('')]), socials: z.array(linkSchema).max(20) }),
  sections: z.object(Object.fromEntries(sectionIds.map(id => [id, z.array(entrySchema).max(100)])) as Record<SectionId, z.ZodArray<typeof entrySchema>>),
});
export type Entry = z.infer<typeof entrySchema>;
export type Portfolio = z.infer<typeof contentSchema>;
export const sectionLabels: Record<SectionId, string> = { projects: 'Projects', research: 'Research & publications', experience: 'Experience', achievements: 'Achievements', skills: 'Skills', activities: 'Activities', journey: 'Journey & education' };
export function assetUrl(value: string) { return value.startsWith('portfolio/') ? `/api/media/${value.split('/').map(encodeURIComponent).join('/')}` : value; }
export function isOwner(userId: string | undefined, ownerId: string | undefined) { return !!ownerId && userId === ownerId; }
export function validRevision(value: unknown): value is number { return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0; }
