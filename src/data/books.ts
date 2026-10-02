export interface Chapter {
  id: string;
  title: string;
  subtitle?: string;
  body: string[];
}

export interface Book {
  id: string;
  slug: string;
  title: string;
  author: string;
  description: string;
  format: string;
  chapterCount: number;
  filePath: string;
  coverImage: string;
  coverGradient: string;
  wordCount: number;
  readingTime: number;
  language: string;
  publisher: string;
  isbn: string;
  publishedYear: number;
  chapters: Chapter[];
}

export const BOOKS: Book[] = [
  {
    id: "agarwood-trade",
    slug: "agarwood-trade-of-assam",
    title: "The Agarwood Trade of Assam",
    author: "AATMA Research Wing",
    description:
      "A comprehensive account of the agarwood industry in Assam — from the resin's formation in wounded trees to the global markets that prize it.",
    format: "digital",
    chapterCount: 5,
    filePath: "public/books/agarwood-trade-of-assam.txt",
    coverImage: "public/books/covers/agarwood-trade-of-assam.jpg",
    coverGradient: "from-green-deep via-green-mid to-green-light",
    wordCount: 650,
    readingTime: 5,
    language: "English",
    publisher: "AATMA Research Wing",
    isbn: "",
    publishedYear: 2024,
    chapters: [
      {
        id: "ch1",
        title: "The Tree & The Resin",
        subtitle: "How agarwood forms",
        body: [
          "Agarwood is the fragrant resin that forms inside the heartwood of the agar tree. The tree — Aquilaria malaccensis, native to Northeast India and Southeast Asia — begins life as an ordinary, odourless, pale hardwood. Only when its bark is wounded and infected by a specific group of fungi does it produce the dark, heavy, aromatic resin that the world values.",
          "The resin is not present in healthy trees; it is a defence — the tree's response to injury and infection, a slow chemical armour grown over years and decades. The oldest, most resin-saturated heartwood commands the highest prices, and the formation of that wood is the entire economic basis of the agar trade.",
          "In Assam, the tree grows across the districts of Golaghat, Jorhat, Sivasagar, and Hojai — part of an estimated 114.3 million agar trees in the state, the largest population in India. The species is listed as Critically Endangered by the IUCN, making sustainable cultivation not just an economic imperative but an ecological one.",
        ],
      },
      {
        id: "ch2",
        title: "Distillation & Agaroil",
        subtitle: "The craft of extraction",
        body: [
          "Distilling agarwood chips yields agarwood essential oil — among the most expensive and most sought-after oils in the world. Pure-grade agar oil, of the quality produced in Assam's distillation centres, trades at USD 32,000–40,000 per kilogram.",
          "Hojai, Assam, is the distillation hub of India, where generations of agaroil manufacturers have refined the craft of extraction — the careful selection of chips, the slow hydro-distillation, and the repeated fractionation that separates the head, heart, and base notes.",
          "The oil is not merely an aroma: in Middle Eastern homes and courts it is a sign of hospitality, a marker of respect, and a tradition passed from one generation to the next. The distiller's knowledge — which chips to use, how long to distill, when to stop — is a craft transmitted through families and communities.",
        ],
      },
      {
        id: "ch3",
        title: "Global Markets",
        subtitle: "Demand and trade routes",
        body: [
          "Agarwood's demand is global, but its deepest roots are in the Middle East — particularly the Gulf states, where it is burned to honour guests, used in wedding ceremonies, and distilled into fine attars and luxury fragrances. Gulf importers have long formed the backbone of demand for Assam's agarwood.",
          "Demand is also growing across Europe, the United States, and East Asia — for premium fragrances, aromatherapy, cosmetics, and traditional medicine. The growth of legal, documented, traceable exports is reshaping a market that for decades operated largely in the shadows.",
          "India's 2024 CITES export quota — 1,51,080 kg of chips and powder and 7,050 kg of oil per year — marks a turning point. Assam's share of 1,19,400 kg chips and 5,560 kg oil positions the state as the primary supplier of legally traded Indian agarwood to the world.",
        ],
      },
      {
        id: "ch4",
        title: "Cultivation in Assam",
        subtitle: "The grower's story",
        body: [
          "Assam alone has an estimated 114.3 million agar trees — part of India's 139.89 million, the largest agarwood tree population in the country. Farmers grow Aquilaria on private land, homesteads, and plantations across Upper Assam.",
          "The crop is long-gestation — a farmer plants a tree and waits years before the first wounds are made, and longer still before resin begins to form — but the returns, when they come, are extraordinary. Empirical studies of agar cultivation in the region have found that every ₹100 invested can yield ₹623 in net benefit.",
          "The 2019 Assam Cabinet decision to liberalise agar cultivation and felling on non-forest lands up to 35 bighas (later refined to 5 hectares) without permission was a watershed moment. For the first time, farmers could legally cultivate and harvest agar without navigating the complex forest produce regulations that had long constrained the trade.",
        ],
      },
      {
        id: "ch5",
        title: "Policy & Legalisation",
        subtitle: "From prohibition to regulation",
        body: [
          "For over two decades, AATMA pressed for the legalisation of agarwood trade in Assam — beginning with a landmark seminar at the Assam Administrative Staff College in Guwahati in 2000, followed by years of memoranda, protests, and sustained engagement with government.",
          "In 2019 the Assam Cabinet moved to liberalise agar trade, and in 2020 the state enacted the Assam Agarwood Promotion Policy, bringing plantation, harvesting, processing, transit, and sale of agar within a formal legal framework on non-forest land.",
          "A 2024 CITES Review of Significant Trade outcome opened the door to formal international exports, and in 2025 Assam shipped its first legal agarwood consignment — 100 kg to Saudi Arabia and 12 kg to the UAE — from the Guwahati airport. A dedicated Agarwood Export Promotion Cell was constituted by the Ministry of Commerce in May 2026.",
        ],
      },
    ],
  },
  {
    id: "aatma-history",
    slug: "aatma-fifty-years",
    title: "AATMA: Fifty Years",
    author: "AATMA",
    description:
      "The story of the All Assam Agar Traders & Agaroil Manufacturers' Association — from its founding in 1976 to its role in shaping national policy.",
    format: "digital",
    chapterCount: 3,
    filePath: "public/books/aatma-fifty-years.txt",
    coverImage: "public/books/covers/aatma-fifty-years.jpg",
    coverGradient: "from-gold/30 via-green-deep to-green-mid",
    wordCount: 500,
    readingTime: 4,
    language: "English",
    publisher: "AATMA",
    isbn: "",
    publishedYear: 2024,
    chapters: [
      {
        id: "ch1",
        title: "Founding & Early Years",
        subtitle: "1976–1999",
        body: [
          "AATMA was established in 1976 in Hojai, Assam, by a group of agar traders and agaroil manufacturers who came together to form a collective body representing their shared interests — at a time when the agar trade operated largely outside formal regulation.",
          "The association received formal registration under the Registrar of Societies — Reg. No. 664 of 78–79 — giving it legal standing to represent its members and engage with government authorities. In these early years, AATMA focused on building a unified voice for the trade and addressing the day-to-day challenges faced by its members.",
          "The trade in this period was largely informal, often operating in a legal grey area. Agarwood was classified as forest produce, and its cultivation, harvesting, and sale were subject to regulations that had not kept pace with the reality of a crop that had been grown on private land for generations.",
        ],
      },
      {
        id: "ch2",
        title: "The Turning Point",
        subtitle: "2000–2018",
        body: [
          "The year 2000 marked a turning point. AATMA connected with outside agar expertise for the first time through a landmark seminar at the Assam Administrative Staff College, Guwahati. The seminar opened the association to broader knowledge, technical input, and wider networks.",
          "AATMA co-organised a seminar on Agar Plantation in the Northeast in Nagaon, with proceedings published — an early contribution to building a knowledge base for agar cultivation in the region. The association began a sustained push to legalise the agarwood business through protests, memoranda, and seminars.",
          "For nearly two decades, AATMA pressed the state and central governments to recognise agarwood as a agricultural and commercial crop rather than forest produce. The association's advocacy was rooted in the livelihoods of lakhs of families across Upper Assam whose futures were tied to the agar tree.",
        ],
      },
      {
        id: "ch3",
        title: "Victory & New Era",
        subtitle: "2019–Present",
        body: [
          "In July 2019, the Assam Cabinet approved growing and cutting of Agar and Chandan trees on non-forest lands up to 35 bighas (later refined to 5 hectares) without permission. AATMA's General Secretary addressed a press meet at the Hojai office welcoming the historic decision — the culmination of nearly 20 years of advocacy.",
          "The Assam Agarwood Promotion Policy 2020 brought the entire agarwood trade chain — plantation, harvesting, processing, transit, and sale — within a formal legal framework. Effective 2021 with a 5-year initial term, the policy provides incentives for nursery creation, sapling distribution, cultivation and processing support, R&D, and training and marketing assistance.",
          "India secured a CITES export quota for 2024–2027, and in 2025 Assam shipped its first legal agarwood consignment. The Ministry of Commerce constituted a dedicated Agarwood Export Promotion Cell in May 2026. AATMA continues to work toward developing an auction system for agar chips, building a recognised agarwood market, and securing the livelihoods of the families who depend on it.",
        ],
      },
    ],
  },
];
