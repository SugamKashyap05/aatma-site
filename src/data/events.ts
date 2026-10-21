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
    alt: "National Conference on Agarwood & Oil — dignitaries seated at the event",
    date: "2024",
    caption: "National Conference on Agarwood & Oil",
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
    alt: "AATMA office meeting with officials",
    date: "2026",
    caption: "AATMA office meeting",
  },
  {
    id: "aatma-meeting-2",
    src: assetUrl("events/aatma-meeting-2.jpg"),
    alt: "AATMA office meeting — alternate angle",
    date: "2026",
    caption: "AATMA office meeting — alternate view",
  },
];
