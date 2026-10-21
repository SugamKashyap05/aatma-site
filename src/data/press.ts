/**
 * press.ts — single typed source of truth for AATMA's own publications.
 *
 * These are documents AATMA itself issued (a press note, a letter to the Chief
 * Minister). They are `client-publication`s: the association wrote them and the
 * site reproduces them. This is deliberately separate from `src/data/news.ts`,
 * which holds *newspaper clippings about* AATMA written by outside journalists.
 *
 * Provenance rule: a visitor must never have to guess whether they are reading
 * something AATMA published or something the website wrote. Everything here is
 * labelled `client-publication`; the site-authored works live in
 * `src/data/books.ts` under `site-summary`.
 *
 * NOTE ON REMOVED ENTRIES. This module previously carried two further items —
 * a "CITES Export Quota Secured" release (2 March 2024) and an "Assam's First
 * Legal Agarwood Export" release (18 June 2025). Both were site-authored
 * placeholders: no AATMA document exists for either, and the figures they
 * quoted (a 1,51,080 kg/year national quota; 100 kg to Saudi Arabia and 12 kg
 * to the UAE worth ₹2.35 crore) are recorded in
 * docs/APPROVED_CONTENT_LEDGER.md (#167, #174, #179) as `exclude` — no client
 * source. They were removed rather than presented as AATMA publications. If
 * the client supplies the underlying documents, add them back here with their
 * `sourceDocument` recorded.
 */

export type PressReleaseCategory = "Press Release" | "Official Letter";

export interface PressRelease {
  id: string;
  title: string;
  /** Display date, e.g. "14 January 2023". */
  date: string;
  /** ISO date of the document itself, for sorting and for the label. */
  isoDate: string;
  category: PressReleaseCategory;
  summary: string;
  /** Path inside `public/`. Resolve with `assetUrl()` before use. */
  pdfPath: string;
  fileName: string;
  size: string;
  /**
   * False when the file has not been produced — the card renders a "not yet
   * published" state rather than shipping a link that 404s.
   */
  available?: boolean;
  featured?: boolean;
  /**
   * The client document this release was produced from, so a visitor can see
   * the original file. Every entry here has one.
   */
  sourceDocument: string;
}

export const PRESS_RELEASES: PressRelease[] = [
  {
    id: "press-note-2023",
    title:
      "AATMA Press Note — 14 January 2023",
    date: "14 January 2023",
    isoDate: "2023-01-14",
    category: "Press Release",
    summary:
      "AATMA expresses extreme gratitude over notification of Assam Wood Based Industries (Promotion and Development) Rules 2022 on 12th January 2023, thanking Hon'ble Chief Minister Dr Himanta Biswa Sarma for visionary leadership.",
    pdfPath: "/press/aatma-press-note-2023-01-14.pdf",
    available: true,
    fileName: "AATMA-Press-Note-2023-01-14.pdf",
    size: "5.6 KB",
    featured: true,
    sourceDocument: "Client-supplied AATMA press note",
  },
  {
    id: "letter-to-hcm-2023",
    title:
      "AATMA Letter to the Chief Minister — 14 January 2023",
    date: "14 January 2023",
    isoDate: "2023-01-14",
    category: "Official Letter",
    summary:
      "AATMA's letter to Shri Himanta Biswa Sarma ji acknowledging the path-breaking reforms and the 23-year wait for them.",
    pdfPath: "/press/aatma-letter-to-hcm-2023-01-14.pdf",
    available: true,
    fileName: "AATMA-Letter-to-HCM-2023-01-14.pdf",
    size: "5.7 KB",
    sourceDocument: "Client-supplied AATMA letter to the Chief Minister",
  },
];

/**
 * Releases that exist as a real file the site can serve. Used wherever the
 * page needs to state plainly how many of these are actually available.
 */
export function getAvailablePressReleases(): PressRelease[] {
  return PRESS_RELEASES.filter((release) => release.available !== false);
}
