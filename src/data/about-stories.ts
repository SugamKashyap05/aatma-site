import { ABOUT_SPINE } from "@/data/about-spine";

export interface AboutStoryItem {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  detailParagraphs: readonly string[];
  author?: string;
  role?: string;
}

/**
 * Ordered client-brief sequence; source paragraphs remain owned by
 * about-spine.ts.
 *
 * The brief's opening editorial is deliberately absent: the client retired it
 * and replaced it with the President's message, which closes the homepage.
 */
export const ABOUT_STORY_ITEMS: readonly AboutStoryItem[] = ABOUT_SPINE.map(
  (section, index) => ({
    id: `section-${section.num.toLowerCase()}`,
    eyebrow: `SECTION ${section.num} · ${String(index + 1).padStart(2, "0")}`,
    title: section.heading,
    description: `${section.paragraphs.length} ${section.paragraphs.length === 1 ? "paragraph" : "paragraphs"} · Open the complete section`,
    detailParagraphs: section.paragraphs,
  }),
);