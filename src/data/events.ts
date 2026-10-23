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
