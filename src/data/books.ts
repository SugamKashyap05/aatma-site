export interface Chapter {
  id: string;
  title: string;
  subtitle?: string;
  body: string[];
  image?: string;
  page?: number;
  bookPage?: number;
  pageStart?: number;
  pageEnd?: number;
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
  externalDownloadUrl?: string;
  coverImage: string;
  coverGradient: string;
  wordCount: number;
  readingTime: number;
  language: string;
  publisher: string;
  isbn: string;
  publishedYear: number;
  totalPages?: number;
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
    filePath: "books/agarwood-trade-of-assam.txt",
    coverImage: "books/covers/agarwood-trade-of-assam.jpg",
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
    filePath: "books/aatma-fifty-years.txt",
    coverImage: "books/covers/aatma-fifty-years.jpg",
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
  {
    id: "agar-original",
    slug: "agar-original",
    title: "AGAR — History & Scope of Plantation: A Perspective",
    author: "Dr. M. Ahmed and Dr. P. Gogoi",
    description:
      "The original AGAR publication by Dr. M. Ahmed and Dr. P. Gogoi — a comprehensive visual document on the agarwood trade, its history, cultivation, and significance to Assam.",
    format: "pdf",
    chapterCount: 26,
    filePath: "books/agar.pdf",
    externalDownloadUrl: "https://drive.google.com/uc?export=download&id=16YhZKCIcLPfor1VEu6KEiMa7OsgPgp1n",
    coverImage: "books/agar/pages/page-001.jpg",
    coverGradient: "from-green-deep via-green-mid to-green-light",
    wordCount: 0,
    readingTime: 0,
    language: "English",
    publisher: "AATMA",
    isbn: "",
    publishedYear: 2000,
    totalPages: 31,
    chapters: [
      { id: "front-matter", title: "Front Matter", image: "books/agar/pages/page-001.jpg", body: [], page: 1, bookPage: 1, pageStart: 1, pageEnd: 6 },
      { id: "introduction", title: "Introduction", image: "books/agar/pages/page-007.jpg", body: [], page: 7, bookPage: 1, pageStart: 7, pageEnd: 8 },
      { id: "history-of-agarwood", title: "History of Agarwood", image: "books/agar/pages/page-007.jpg", body: [], page: 7, bookPage: 1, pageStart: 7, pageEnd: 8 },
      { id: "commercial-development", title: "Commercial Development", image: "books/agar/pages/page-009.jpg", body: [], page: 9, bookPage: 3, pageStart: 9, pageEnd: 10 },
      { id: "use-of-sanchipat", title: "Use of Sanchipat", image: "books/agar/pages/page-011.jpg", body: [], page: 11, bookPage: 5, pageStart: 11, pageEnd: 11 },
      { id: "distribution", title: "Distribution", image: "books/agar/pages/page-011.jpg", body: [], page: 11, bookPage: 5, pageStart: 11, pageEnd: 11 },
      { id: "the-tree", title: "The Tree", image: "books/agar/pages/page-012.jpg", body: [], page: 12, bookPage: 6, pageStart: 12, pageEnd: 13 },
      { id: "how-the-tree-becomes-valuable", title: "How the Tree becomes so valuable", image: "books/agar/pages/page-012.jpg", body: [], page: 12, bookPage: 6, pageStart: 12, pageEnd: 13 },
      { id: "raising-plantation", title: "Raising Plantation", image: "books/agar/pages/page-014.jpg", body: [], page: 14, bookPage: 8, pageStart: 14, pageEnd: 14 },
      { id: "soil-and-climate", title: "Soil and Climate", image: "books/agar/pages/page-014.jpg", body: [], page: 14, bookPage: 8, pageStart: 14, pageEnd: 14 },
      { id: "propagation", title: "Propagation", image: "books/agar/pages/page-015.jpg", body: [], page: 15, bookPage: 9, pageStart: 15, pageEnd: 15 },
      { id: "planting", title: "Planting", image: "books/agar/pages/page-016.jpg", body: [], page: 16, bookPage: 10, pageStart: 16, pageEnd: 16 },
      { id: "silvicultural-characteristics", title: "Silvicultural Characteristics", image: "books/agar/pages/page-017.jpg", body: [], page: 17, bookPage: 11, pageStart: 17, pageEnd: 17 },
      { id: "agar-in-homestead", title: "Agar in Homestead Planting", image: "books/agar/pages/page-018.jpg", body: [], page: 18, bookPage: 12, pageStart: 18, pageEnd: 18 },
      { id: "agar-in-agroforestry", title: "Agar in Agro-forestry", image: "books/agar/pages/page-019.jpg", body: [], page: 19, bookPage: 13, pageStart: 19, pageEnd: 19 },
      { id: "agar-in-tea-gardens", title: "Agar in Tea gardens", image: "books/agar/pages/page-019.jpg", body: [], page: 19, bookPage: 13, pageStart: 19, pageEnd: 19 },
      { id: "present-status-ne-india", title: "Present status of Agar Tree in the NE India", image: "books/agar/pages/page-020.jpg", body: [], page: 20, bookPage: 14, pageStart: 20, pageEnd: 24 },
      { id: "population-status-trends", title: "Population Status and Trends", image: "books/agar/pages/page-020.jpg", body: [], page: 20, bookPage: 14, pageStart: 20, pageEnd: 24 },
      { id: "artificial-regeneration", title: "Status in Artificial Regeneration", image: "books/agar/pages/page-025.jpg", body: [], page: 25, bookPage: 19, pageStart: 25, pageEnd: 25 },
      { id: "promotional-activities", title: "Promotional Activities", image: "books/agar/pages/page-026.jpg", body: [], page: 26, bookPage: 20, pageStart: 26, pageEnd: 26 },
      { id: "cultural-treatment", title: "Cultural Treatment to Augment Oil Formation", image: "books/agar/pages/page-027.jpg", body: [], page: 27, bookPage: 21, pageStart: 27, pageEnd: 27 },
      { id: "detection-harvestable", title: "Detection of Harvestable trees", image: "books/agar/pages/page-028.jpg", body: [], page: 28, bookPage: 22, pageStart: 28, pageEnd: 28 },
      { id: "harvesting", title: "Harvesting", image: "books/agar/pages/page-029.jpg", body: [], page: 29, bookPage: 23, pageStart: 29, pageEnd: 29 },
      { id: "harvesting-season", title: "Harvesting Season", image: "books/agar/pages/page-030.jpg", body: [], page: 30, bookPage: 24, pageStart: 30, pageEnd: 30 },
      { id: "yield", title: "Yield", image: "books/agar/pages/page-030.jpg", body: [], page: 30, bookPage: 24, pageStart: 30, pageEnd: 30 },
      { id: "future-prospects", title: "Future Prospects as a Plantation Crop", image: "books/agar/pages/page-031.jpg", body: [], page: 31, bookPage: 25, pageStart: 31, pageEnd: 31 },
    ],
  },
];
