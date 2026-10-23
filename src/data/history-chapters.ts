import { assetUrl } from "@/lib/utils";

/**
 * HISTORY_CHAPTERS — /history
 *
 * Source: `documents/A BRIEF HISTORY OF AGAR.pdf` (client-supplied, 12 Oct 2026),
 * read in full; extraction in `docs/_agar_history_raw.txt`, cleaned summary in
 * `docs/AGAR_HISTORY_SOURCE.md`.
 *
 * The client's own document has eight headed sections. Each chapter below keeps
 * that heading and the client's wording verbatim, including slips such as
 * "Thiland" and "Occtober" — these are the client's text and are not silently
 * corrected.
 *
 * Office-bearer names stay redacted exactly as in the redacted client copy
 * (ledger C3). The live /about reader publishes the same names from the client
 * brief; that inconsistency is tracked separately, not resolved here.
 */

export interface HistoryChapterImage {
  src: string;
  alt: string;
  caption: string;
}

export interface HistoryHighlight {
  label: string;
  value: string;
}

export interface HistoryChapter {
  id: string;
  /** Client's section number, as printed in the document. */
  num: string;
  kicker: string;
  heading: string;
  paragraphs: string[];
  image?: HistoryChapterImage;
  highlights?: HistoryHighlight[];
}

export const HISTORY_CHAPTERS: HistoryChapter[] = [
  {
    id: "origins",
    num: "1",
    kicker: "Cultural Heritage",
    heading: "Agar in Assamese culture",
    paragraphs: [
      "Agar Tree of Sanchi plant is one of the precious gift of nature and deeply associated with the culture of Assam & North eastern India since ancient time. Bark of agar tree called sanchi paat was used for writing scripture. The renown Vaishnab saints of Assam Srimanta Sankar Dev, Madhav Deb and Damudar Deb used Sanchipat for writing scriptures. Since than the Assamese people of upper Assam planted Sanchi plant in their homestead which become a part of ritual. Agaru is an inseparable puja article of Hindus since ancient time. It belongs to Aquilaria of family Thymeleaceae. Agarwood chips (Black resinous wood) and Agar Oil (Essential Oil) Attar are most useful and oldest raw materials for perfume. Thus agar is a highly commercial plant.",
    ],
    image: {
      src: assetUrl("history/sanchi-paat-original.png"),
      alt: "Client-supplied scan of Sanchi paat — the bark of the agar tree used for writing scriptures.",
      caption: "Sanchi paat — the bark of the agar tree, used by Vaishnav saints for writing scriptures.",
    },
  },
  {
    id: "trade",
    num: "2",
    kicker: "About the Trade",
    heading: "About the trade",
    paragraphs: [
      "The trade in Agar is currently spread over the Indian sub-continent, the middle east, European countries and south east Asia. Due to many time increase use of perfume in India in recent past Agar oil and its product now highly demanded in the domestic as well as International market for perfumery industries.",
    ],
    image: {
      src: assetUrl("client-images/agarwood/agarwood-chips-hand.jpg"),
      alt: "A hand holding dark agarwood chips above a larger pile.",
      caption: "Agarwood chips — the black resinous wood that is the raw material of the trade.",
    },
  },
  {
    id: "early-trade",
    num: "3",
    kicker: "1905–1970",
    heading: "The early trade, 1905–1970",
    paragraphs: [
      "Agar wood was found abundantly in the forests of North Eastern region and used by some people of Sylhet (Now in Bangladesh) region for extracting oil back in 1905-06. After Independence of India certain entrepreneurs of Barpather started business of Agar wood in Barpather in their homestead. They collected raw agar wood from the forest Mahals of Karbi Angong and Naga Hills etc. Meanwhile, several enthusiastic and visionary people of Hojai area entered in the trade and started small-scale distillation at Hojai. A few years later, the Agar trade & distillery business also began in Naharani & other parts of Jorhat, Sibsagar Districts of upper Assam, utilizing Agar wood harvested from their own homegrown Trees.",
      "At that period of time i,e in the late 60s, a group of enthusiastic people of Hojai involved in taking lease of agar mahals in NEFA and Bhutan and collected agar from there and brought to Hojai. The Govt. of Assam used to lease Agarwood Mahals for a fixed period which continued till 1970 in Assam, and by this time Agar trade developed as a cottage industry in the un-organized sector.",
      "However, from 1970 to 1980s the entrepreneurs of Hojai & Silchar collected Agarwood from the Mahalders of Manipur State (under Forest Transit Pass) which were processed & distilled for oil at Hojai and Silchar. These products were subsequently taken to Bombay (Mumbai) under Lieu T.P. issued by Forest Deptt. Of Assam for sale.",
    ],
    image: {
      src: assetUrl("history/trade-journey-map.svg"),
      alt: "Route map of the early agar trade — Sylhet, Barpather, Hojai, Jorhat, Sibsagar, NEFA, Bhutan, Manipur, Silchar and Bombay.",
      caption: "The early trade moved from Sylhet and Barpather through Hojai to Jorhat, Sibsagar, NEFA, Bhutan, Manipur and Silchar, and on to Bombay.",
    },
    highlights: [
      { label: "Earliest recorded extraction", value: "1905–06, Sylhet" },
      { label: "Trade reaches Bombay", value: "1970–1980s" },
    ],
  },
  {
    id: "far-east",
    num: "4",
    kicker: "The Import Era",
    heading: "Far East discovery and the import era",
    paragraphs: [
      "For a short while from 1970 to 1980 trade of agar in Assam survived somehow with the agar from the state of Manipur but it came to a standstill since 1982. However, there happened a sudden change in the trade which started with the discovery of Agar wood abumdantly in the far Eastern countries like Malaysia, Indonesia, Thiland, Combodia etc. Some prominent business houses of Hojai Assam started importing agar wood from those countries as per Exim Policy of Govt. of India after paying heavy import duties. It is pertinent to mention that in Hojai, Assam has good number of skilled agar processing workers as well as for Agar oil distilleries and the employment was as good as 5000 people. The raw agar wood so imported were re-exported after processing in their factory as finished products.",
    ],
    image: {
      src: assetUrl("client-images/nature/forest-1.jpeg"),
      alt: "Client-supplied photograph of an agar plantation.",
      caption: "Agar plantation — the cultivated trees that replaced wild supply.",
    },
    highlights: [
      { label: "Hojai processing workforce at the import peak", value: "5,000 people" },
      { label: "Wild supply exhausted", value: "1982" },
    ],
  },
  {
    id: "formation",
    num: "5",
    kicker: "1976",
    heading: "Formation of AATMA",
    paragraphs: [
      "The trade being a cottage based industry in unorganized sector has suffered many obstacles largely due to lack of knowledge on the part of traders as well as law enforcing agency and there were undue and uncalled for interference posing hurdles to the safe sailing of the trade for which it was felt by some prominent traders of Hojai area back in 1975-76 to form some sort of association / NGO for the improvement and expansion of the trade in the pursuit of which ALL ASSAM AGAR TRADERS AND AGAR OIL MANUFACTURERS, ASSOCTION (AATMA) was formed under the President ship and Secretary ship of (L) [REDACTED: AATMA member], (L) [REDACTED: AATMA member] and (L) [REDACTED: AATMA member] in 1976 with its H.O. at Hojai which was duly registered vide 664 of 1978-79. Since then the Association continuously fought legally as well as by submitting different representations before the govt to remove unnecessary interference and hurdle in the interest of smooth going of the trade. In the year 2000 AATMA was re-organized in a General Meeting at Hojai with [REDACTED: AATMA member] as President and (L) [REDACTED: AATMA member] as General Secretary and with its Executive body.",
    ],
    image: {
      src: assetUrl("client-images/aatma-tree-plantation.jpg"),
      alt: "AATMA tree plantation photographed by the association.",
      caption: "AATMA tree plantation — the association's own planting programme.",
    },
    highlights: [
      { label: "Founded", value: "1976, Hojai" },
      { label: "Registered", value: "Reg. No. 664 of 1978-79" },
      { label: "Re-organised", value: "2000" },
    ],
  },
  {
    id: "seminar",
    num: "6",
    kicker: "November 2000",
    heading: "National seminar on agarwood plantation",
    paragraphs: [
      "In November 2000, AATMA organized a National level seminar on Scope & Dimension of Agar (Aquilaria spp.) plantation in North Eastern Region at Administrative staff college, Guwahati, which was attended by several scientist from different parts of India and was presided over by Dr. P.K. Hajra, Ex Director of the Botanical Survey of India. Several scientific reports on Agar wood and its plantation and development submitted by the participant scientist are incorporated in the proceedings of the seminar. The seminar was an eye-opener to different entrepreneurs who started commercial plantation in their private land in North Eastern states like Assam, Nagaland, Tripura and Manipur etc. where it is a great success and are major source of raw materials for Agar wood trade & Industry of the region now a days. Survey conducted jointly by AATMA and Assam Govt. reveals that there are more than crores of agar trees in private cultivation in Upper Assam region, and other parts of the state commercially. Similarly there are reports that wide spread private cultivation have flourished in Tripura and Nagaland as well. It is worth mentioning that lakhs of people are involved in the cultivation agar trade as well.",
    ],
    image: {
      src: assetUrl("client-images/nature/forest-2.jpeg"),
      alt: "Client-supplied photograph of an agar plantation in the North East.",
      caption: "Private agar cultivation in the North East, which the 2000 seminar set in motion.",
    },
    highlights: [
      { label: "Presided over by", value: "Dr. P.K. Hajra, Ex-Director, Botanical Survey of India" },
      { label: "Agar trees in private cultivation", value: "more than a crore" },
    ],
  },
  {
    id: "critical-era",
    num: "7",
    kicker: "2001–2016",
    heading: "The critical era of agar trade, 2001–2016",
    paragraphs: [
      "In the year 2000 the Govt. of Assam framed Rules as “Assam Wood Based Industries (Establishment and Regulation) Rules, 2000” classifying agar oil extracting unit as wood based industries, these rules plunged Agar growers and traders into a period of deep uncertainties to the industry and the trade.",
      "Consequently, on June 26, 2000, representative of the All Assam Agar Traders and Agaroil Manufactures` Association (AATMA) met with the then Chief Minister of Assam. They submitted a Memorandum urging Government to exclude agar oil extraction units from the purview of the these Rules, arguing that traders sourced their raw materials from private cultivations (patta land or homesteads) and through legal Import from abroad. The memorandum further requested that the agar wood industry be officially declared an agro-based industry. However, no concrete action was taken at the time, leaving the agar oil extraction industry without its hard earn much-needed official recognition.",
      "However, in 2001 the AATMA submitted fresh representation and memorandum before the Government of Assam, urging the exclusion of Agar oil extracting units from the purview of “Assam Wood Based Industries (Establishment and Regulation) Rules, 2000. This matter was vigorously pursued multiple times. Consequently, In December 2003, at the request of the then Forest Minister, AATMA sponsored and participated in “The Workshop on Agar Plantation and the Rule of Joint Forest Management Committees of Assam,” which was held in Rabindra Bhavan on 6th and 7th January 2004.",
      "Until that point, Agar processing units were not govern by the aforementioned Rules. Instead, these units continued to survive by the import of agar wood from abroad until 2005. This arrangement required verification of consignments by the concerned Divisional Forest Officer (DFO) at the time of both import and re-export to ensure compliance with CITES regulations. Unfortunately October 2005 the then DFO of Hojai, Shri Siv Kumar, IFS denied the verification. This action, which was unlawful and arbitrarily, was allegedly based on the verbal instruction from the then Forest Minister of Assam. As a result, around Seven Processing Units to suffered massive financial losses because they were unable to re-export their raw and processed Agar wood. This caused severe damage to the local industry and a significant loss of foreign exchange earning. Finding no alternative, several prominent business houses shifted their operations (industry) to neighboring state like Meghalaya, as well as Overseas. Consequently, the prospects of a highly viable industry were severely crippled and strangled within Assam.",
      "As per CCF(T) letter No. FGT39/WBI/Amand/SecondaryWBI/06 dt. 01.03.2006, the Central Empowered Committee agreed to certain changes in Assam Wood Based Industries (Establishment and Regulation) Rules, 2000 and recommended to incorporate the Agarwood industries in Secondary Wood Based Industry which could be set up outside designated Industrial Area. But unfortunately the Assam Cabinet did not approve the recommendation. Thus all efforts of AATMA to streamline the trade did not succeed due to the deaf ear and negligence of the then Govt. of Assam.",
      "The office bearers of AATMA although disheartened with the negative approach of the Govt of Assam did not sit idly and during the period 2005-2016 continued to meet the then Chief Minister / Forest Minister as well as concerned forest deptt. authorities and submitted memorandums for excluding agar industry from the purview of the above said Rules - 2000. As stated above the Forest Deptt. submitted several recommendations proposing to bring Agar industries under the “Secondary Wood Based Industry” as approved by the Central High Power Committee. These efforts did not yield desired result as yet and Agar Industry did not receive any due recognition.",
      "Because the agar industry was never officially legalized or exempted under these rigid rules—largely due to the persistent unwillingness of the then Forest Minister up until 2016—the everyday reality for those on the ground became a nightmare. Routine transportation of agar wood, even when legally harvested from private cultivated lands, was treated as a criminal act. Business personnel and local cultivators faced relentless harassment from both legal authority and forest department officials. This hostile environment led to numerous unjustified seizures of cultivated agar wood, causing immense financial distress and systemic disruption for the traders and farmers struggling to keep this traditional industry alive.",
      "On Augast 24, 2016, an AATMA delegation met with then Forest Minister Smt. Pramila Rani Brahma, at the Hojai Forest circuit House. The delegation submitted a memorandum to apprise her the challenges the industry faced due to the aforesaid Rule 2000. She took a keen interest in the matter, and at her behest, a proposal was submitted to the Government to classify the Agar wood Industry as a “Secondary Wood Based Industry” by excluding it from “Assam Wood Based Industries (Establishment and Regulation) Rules, 2000”. Subsequently, under the initiative of Smt. Pramila Rani Brahma, the Assam Forest Department organized a National Conference on “Agarwood & Oil Industries: prospect & Possibilities”. The conference was held on Occtober 28, 2016, at NEDFi House in Guwahati.",
    ],
    image: {
      src: assetUrl("events/national-conference.jpg"),
      alt: "National Conference on Agarwood & Oil Industries, 28 October 2016, NEDFi House, Guwahati.",
      caption: "National Conference on Agarwood & Oil Industries: Prospect & Possibilities — 28 October 2016, NEDFi House, Guwahati.",
    },
    highlights: [
      { label: "DFO Hojai denies verification", value: "October 2005" },
      { label: "Processing units ruined", value: "around seven" },
      { label: "CCF(T) recommendation rejected by Cabinet", value: "01.03.2006" },
      { label: "Forest Minister's intervention", value: "24 August 2016" },
    ],
  },
  {
    id: "achievement",
    num: "8",
    kicker: "2021–2023",
    heading: "Achievement — the 2022 Rules",
    paragraphs: [
      "Following this on 19/07/2021, an AATMA delegation accompanied by Mr. Sirajuddin Ajmal, MLA, met with the Chief minister Assam, Shri Himanta Biswa Sharma, to submit a memorandum apprising him of the ongoing problems face by Agar industries from last 21 years, due to Asaam wood Base Industries (Eastablishment & Regulation) Rule 2000. The chief minister patiently listened to the delegation, acknowledged the memorandum, and assured them he would work on resolving the matter.",
      "True to his assurance, the Chief Minister of Assam and his government took fresh, positive approach to the long-standing, vexed issue. The association extends its sincere thanks to Sri Himanta Biswa Sharma for enacting the Assam Wood Base Industries (Promotion & Development) Rule 2022 on 12th January 2023. Consequent upon the Rules Agar Wood Industries are now declared as Secondary Wood Based Industries, which can operate outside the Industrial estate, successfully liberalizing and simplifying the trade from the grip of strict laws. These new Rules will definitely pave the way for smooth trade and overall development of plantations.",
    ],
    image: {
      src: assetUrl("events/aatma-meeting-1.jpg"),
      alt: "AATMA delegation meeting the Chief Minister of Assam, 19 July 2021.",
      caption: "AATMA delegation meeting the Chief Minister of Assam — 19 July 2021.",
    },
    highlights: [
      { label: "Delegation to the Chief Minister", value: "19 July 2021" },
      { label: "WBI Rules 2022 notified", value: "12 January 2023" },
      { label: "Agar wood units declared", value: "Secondary Wood Based Industry" },
    ],
  },
];
