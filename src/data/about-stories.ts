import { ABOUT_EDITORIAL, ABOUT_SPINE } from "@/data/about-spine";

export interface AboutStoryItem {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  detailParagraphs: readonly string[];
  author?: string;
  role?: string;
}

const editorialItem: AboutStoryItem = {
  id: "editorial",
  eyebrow: "OPENING EDITORIAL",
  title: ABOUT_EDITORIAL.heading,
  description: `${ABOUT_EDITORIAL.paragraphs.length} paragraphs · Open the editorial`,
  detailParagraphs: ABOUT_EDITORIAL.paragraphs,
  author: ABOUT_EDITORIAL.author,
  role: ABOUT_EDITORIAL.role,
};

const sectionItems: AboutStoryItem[] = ABOUT_SPINE.map((section, index) => ({
  id: `section-${section.num.toLowerCase()}`,
  eyebrow: `SECTION ${section.num} · ${String(index + 1).padStart(2, "0")}`,
  title: section.heading,
  description: `${section.paragraphs.length} ${section.paragraphs.length === 1 ? "paragraph" : "paragraphs"} · Open the complete section`,
  detailParagraphs: section.paragraphs,
}));

/** Ordered client-brief sequence; source paragraphs remain owned by about-spine.ts. */
export const ABOUT_STORY_ITEMS: readonly AboutStoryItem[] = [editorialItem, ...sectionItems];