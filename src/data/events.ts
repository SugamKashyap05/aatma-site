import { assetUrl } from "@/lib/utils";

export interface EventPhoto {
  id: string;
  src: string;
  alt: string;
  date: string;
  caption: string;
}

export const EVENT_PHOTOS: EventPhoto[] = [
  {
    id: "aadb-field-visit",
    src: assetUrl("events/aadb-field-visit.jpg"),
    alt: "AADB officials during field visit with agarwood products on display",
    date: "2026",
    caption: "AADB officials field visit — agarwood products and distillation units",
  },
  {
    id: "national-conference",
    src: assetUrl("events/national-conference.jpg"),
    alt: "National Conference on Agarwood & Oil Industries — prospects and possibilities, 28 October 2016, NEDFi House, Guwahati",
    date: "2016",
    caption: "National conference On AGARWOOD & OIL INDUSTRIES Prospect & Possibilities On 28/10/2016, at NREDFI. House Guwahati",
  },
  {
    id: "aatma-special-meeting-2018",
    src: assetUrl("events/aatma-special-meeting-2018.jpg"),
    alt: "AATMA special meeting on survey of agar — 2018",
    date: "2018",
    caption: "AATMA Special Meeting on Survey of Agar, 2018",
  },
  {
    id: "aatma-meeting-1",
    src: assetUrl("events/aatma-meeting-1.jpg"),
    alt: "AATMA delegation meeting the Chief Minister of Assam",
    date: "2021",
    caption: "19/07/2021 delegation meet CM Assam",
  },
  {
    id: "aatma-meeting-2",
    src: assetUrl("events/aatma-meeting-2.jpg"),
    alt: "AATMA delegation meeting the Chief Minister of Assam — alternate view",
    date: "2021",
    caption: "19/07/2021 delegation meet CM Assam",
  },
];

/**
 * Photographs of the one-day stakeholders' workshop AATMA attended in
 * January 2023, organised by the Assam Industrial Development Corporation
 * Limited. Client-supplied images of the event.
 *
 * Date note: the brief states "on 26.08.2026"; the client corrected the
 * workshop date to January 2023 (2026-10-24), and every visible surface now
 * carries the corrected date. See the workshop rows in
 * docs/APPROVED_CONTENT_LEDGER.md.
 *
 * Kept separate from `EVENT_PHOTOS` because these are 3:4 portrait frames:
 * the shared gallery renders a fixed 192px-tall landscape strip, which would
 * crop the stage and backdrop out of every one of them.
 */
export interface WorkshopPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export const AIDC_WORKSHOP_PHOTOS: WorkshopPhoto[] = [
  {
    id: "aidc-workshop-hall",
    src: assetUrl("events/aidc-workshop-hall.jpg"),
    alt: "The hall at the AIDC stakeholders' workshop, showing the stage and the event backdrop",
    caption:
      "The workshop hall. The backdrop names the Assam Wood Based Industries (Promotion & Development) Rules, 2022 and the Assam Trees Outside Forest (Sustainable Management) Rules, 2022.",
  },
  {
    id: "aidc-workshop-podium",
    src: assetUrl("events/aidc-workshop-podium.jpg"),
    alt: "A speaker addressing the AIDC stakeholders' workshop from the podium",
    caption: "A speaker addressing the workshop from the podium.",
  },
  {
    id: "aidc-workshop-speaker",
    src: assetUrl("events/aidc-workshop-speaker.jpg"),
    alt: "A speaker at the podium during the AIDC stakeholders' workshop, with a guest seated on stage",
    caption: "A speaker at the podium, with a guest seated on stage.",
  },
];

/** The AIDC stakeholders' workshop — date and organiser. The brief states
 *  "26.08.2026"; the client corrected the date to January 2023 (2026-10-24). */
export const AIDC_WORKSHOP = {
  date: "January 2023",
  organiser: "Assam Industrial Development Corporation Limited",
  attendeeNote:
    "in the presence of the Minister of Forest, the Minister of Agriculture and the Minister of Industry",
} as const;
