/**
 * ABOUT_SPINE — the complete client brief, transcribed verbatim.
 *
 * Source: the final client PDF, “A brief note on Agar Trade (2) (2).pdf”.
 * The /about reader includes the opening editorial, all ten headed sections,
 * the source byline, and every paragraph in PDF order. Preserve the source's
 * spelling and punctuation; do not silently correct client text.
 *
 * `deepDives` are the only site-authored values here: links into the
 * homepage sections and routes that expand each part of the brief.
 */

import { assetUrl } from "@/lib/utils";

export type SpineNum =
  | "I" | "II" | "III" | "IV" | "V"
  | "VI" | "VII" | "VIII" | "IX" | "X";

export interface SpineLink {
  /** Chip label shown under a block. */
  label: string;
  /** Same-app route or homepage anchor, e.g. "/history" or "/#critical-era". */
  href: string;
}

export interface SpineSection {
  num: SpineNum;
  /** Verbatim brief heading — kept exactly as written, including slips. */
  heading: string;
  /** Verbatim brief paragraphs in source order. */
  paragraphs: string[];
  /** Existing site surfaces that expand this part of the brief. */
  deepDives: SpineLink[];
  /**
   * Optional client-supplied photograph of an event the section describes.
   * Supplementary to the verbatim text, never a substitute for it — only
   * section X (the January 2023 AIDC workshop) carries one.
   */
  image?: string;
  imageAlt?: string;
}

export interface AboutEditorial {
  heading: string;
  paragraphs: string[];
  author: string;
  role: string;
}

export const ABOUT_EDITORIAL: AboutEditorial = {
  heading: "Editorial",
  paragraphs: [
    "When the Assam Wood Based Industries (Establishment and Regulation) Rules, 2000 were notified on February 15, 2000, it plunged the agar wood growers and traders of our state into a period of deep uncertainty and despair. Disheartened but refusing to be defeated by laws that threatened our very livelihoods, our community of agar business people convened an urgent general meeting. It was during this pivotal moment that I was entrusted with the immense responsibility of serving as the President of AATMA, alongside a newly formed executive body. From that day in 2000, our mission became clear. For over two decades, we knocked on the doors of every successive government and debated with every Chief Minister, Forest minister and forest department fighting relentlessly to free our traditional cottage industry from the grip of that restrictive act.",
    "On 2022, after 22 years of unwavering struggle, we have finally achieved a historic milestone and secured much-needed relief for our trade. However, our work is not yet complete. We are actively continuing our dialogue with the government to secure further relaxations specifically tailored for our micro and small-scale traders. AATMA’s ultimate vision is to ensure that every individual—whether a small-scale homegrown cultivator or a large-scale exporter—can conduct their business efficiently, profitably, and proudly, thereby growing this magnificent industry across Assam.",
    "This booklet represents the culmination of that decades-long journey—a documented legacy of our struggles, our unyielding resilience, and the enduring cultural heritage of Assam’s agar wood trade & Industry.",
  ],
  author: "Ataur Rahman",
  role: "President, AATMA",
};

const SOURCE_SPINE: SpineSection[] = [
  {
    num: "I",
    heading: "A BRIEF HISTORY OF AGAR",
    paragraphs: [

      "The agar tree, or sanchi plant, is one of the precious gifts of nature and has been deeply associated with the culture of Assam and North Eastern India since ancient times. The bark of the agar tree, called sanchi paat, was used for writing scriptures. The renowned Vaishnav saints of Assam — Srimanta Sankar Dev, Madhav Deb and Damudar Deb — used Sanchipat for writing scriptures. Since then, the Assamese people of upper Assam have planted the sanchi plant in their homesteads, which became a part of their rituals. Agaru is an inseparable puja article of Hindus since ancient times. Agar is scientifically known by the generic name Aquilaria of the family Thymelaeaceae. The main species found in India are Aquilaria malaccensis, Aquilaria agallocha and Aquilaria khasiana. Agarwood chips (black resinous wood), agar oil (essential oil) and attar are the most useful and oldest raw materials for perfumery. Thus, agar is a highly commercially useful plant.",

    ],
    deepDives: [
      { label: "Sanchi Paat — homepage", href: "/#sanchi-paat" },
      { label: "The story of Agar in Assam", href: "/history" },
    ]
  },
  {
    num: "II",
    heading: "ABOUT THE TRADE",
    paragraphs: [

      "The trade in agar is currently spread over the Indian subcontinent, the Middle East, European countries and Southeast Asia. Due to the manifold increase in the use of perfumes in India in the recent past, agar oil and its products are now highly demanded in the domestic as well as international markets for the perfumery industry.",
      "The native population of agar trees was found in abundance in the forests of the North Eastern region, and agarwood was used by some people of the Sylhet region for extracting oil as far back as 1905–06. After the Independence of India, certain entrepreneurs of Barpather started the agar wood business in Barpather in their own homesteads. They collected raw agar wood from the forest mahals of Karbi Anglong and the Naga Hills, etc. Meanwhile, several enthusiastic and visionary people of the Hojai area entered the trade and started small-scale distillation at Hojai. A few years later, the agar trade and distillery business also began in Naharani and other parts of the Jorhat and Sibsagar districts of upper Assam, utilizing agar wood harvested from their own homegrown trees.",
      "At that period of time, i.e. in the late 1960s, a group of enthusiastic people of Hojai became involved in taking leases of agar mahals in NEFA and Bhutan, collected agar from there and brought it back to Hojai. The Govt. of Assam used to lease agarwood mahals for a fixed period, which continued till 1970 in Assam, and by this time the agar trade had developed as a cottage industry as part of the unorganized sector.",
      "However, from 1970 to the 1980s, the entrepreneurs of Hojai and Silchar collected agarwood from the mahaldars of Manipur state (under Forest Transit Pass), which was processed and distilled for oil at Hojai and Silchar. These products were subsequently taken to Bombay (Mumbai) under Lieu T.P. issued by the Forest Deptt. of Assam for sale.",

    ],
    deepDives: [
      { label: "From forest to fragrance", href: "/#agar-story" },
      { label: "The story of Agar in Assam", href: "/history" },
    ]
  },
  {
    num: "III",
    heading: "NEW DIMENSION TO AGAR TRADE DUE TO DISCOVERY OF WILD AGARWOOD IN THE FAR EAST ASIAN COUNTRIES",
    paragraphs: [

      "For a short while, from 1970 to 1980, the agar trade of Assam somehow survived on agar from the state of Manipur, but it came to a standstill in 1982. However, there came a sudden change in the trade, which started with the discovery of agarwood in abundance in the Far Eastern countries like Malaysia, Indonesia, Thailand, Cambodia, etc. Some prominent business houses of Hojai, Assam started importing agar wood from those countries as per the Exim Policy of the Govt. of India after paying heavy import duties. It is pertinent to mention that in Hojai, Assam has a good number of skilled agar processing workers as well as agar oil distilleries, and employment was as high as 5,000 people. The raw agar wood so imported was re-exported after processing in their factories as finished products. Local forest authorities used to issue a ‘Legal Procurement Certificate (LPC)’ for the products derived from the imported materials to be re-exported, to comply with the CITES provisions.",

    ],
    deepDives: [
      { label: "From forest to fragrance", href: "/#agar-story" },
    ]
  },
  {
    num: "IV",
    heading: "FORMATION OF AATMA",
    paragraphs: [

      "The trade, being a cottage-based industry in the unorganized sector, has suffered many obstacles largely due to a lack of knowledge on the part of traders as well as law-enforcing agencies, and there was undue and uncalled-for interference posing hurdles to the safe sailing of the trade, which is why some prominent traders of the Hojai area felt the need, back in 1975-76, to form some sort of association/NGO for the improvement and expansion of the trade. In pursuit of this, the ALL ASSAM AGAR TRADERS AND AGAR OIL MANUFACTURERS ASSOCIATION (AATMA) was formed in 1976 under the presidentship and secretaryship of (L) Hazi Anfar Ali, (L) Hazi Samsul Islam and (L) Binay Kumar Paul, with its head office at Hojai, and was duly registered vide 664 of 1978-79. Since then, the association has continuously fought legally as well as by submitting different representations before the government to remove unnecessary interference and hurdles in the interest of the smooth conduct of the trade. In the year 2000, AATMA was reorganized in a general meeting at Hojai with Ataur Rahman as President and (L) Jamal Uddin Choudhury as General Secretary, along with its executive body.",

    ],
    deepDives: [
      { label: "The Birth of AATMA", href: "/#formation" },
    ]
  },
  {
    num: "V",
    heading: "NATIONAL SEMINAR ON SCOPE & DIMENSION OF AGAR (Aquilaria spp.) PLANTATION IN N.E. REGION",
    paragraphs: [

      "In November 2000, AATMA organized a national-level seminar on the Scope & Dimension of Agar (Aquilaria spp.) Plantation in the North Eastern Region at the Administrative Staff College, Guwahati, which was attended by several scientists from different parts of India and was presided over by Dr. P.K. Hajra, former Director of the Botanical Survey of India. Several scientific reports on agar wood and its plantation and development submitted by the participating scientists are incorporated in the proceedings of the seminar. The seminar was an eye-opener to different entrepreneurs who started commercial plantations on their private land in North Eastern states like Assam, Nagaland, Tripura and Manipur, etc., where they are a great success and are a major source of raw materials for the agar wood trade and industry of the region nowadays. A survey conducted jointly by AATMA and the Assam Govt. reveals that there are several crores of agar trees in private cultivation in the Upper Assam region and other parts of the state commercially. Similarly, there are reports that widespread private cultivation has flourished in Tripura and Nagaland as well. It is worth mentioning that lakhs of people are involved in the cultivation and agar trade as well.",

    ],
    deepDives: [
      { label: "The story of Agar in Assam", href: "/history" },
      { label: "National Seminar abstracts", href: "/resources" },
    ]
  },
  {
    num: "VI",
    heading: "CRITICAL ERA OF AGAR TRADE (Year 2001 to 2016)",
    paragraphs: [

      "In the year 2000, the Govt. of Assam notified the “Assam Wood Based Industries (Establishment and Regulation) Rules, 2000”, classifying agar-oil-extracting units as wood-based industries; these rules plunged agar growers and traders into a period of deep uncertainty for the industry and the trade. The agar distillation units, which were functioning as cottage industries with licences issued by the Industry Department, Assam, as small-scale industries, were required to obtain registration under the new rules. All these units were required to be shifted to and established in newly designated ‘Industrial Estates’ as a prerequisite for submitting applications for registration under the new rules. Thousands of poor households which depended on agar oil distillation for their livelihood suffered immensely, as shifting to the industrial estates was practically not feasible or viable. As the agar distillation units remained unregistered due to impractical rules and regulations, the practice of issuance of ‘Legal Procurement Certificate (LPC)’ was also stopped by the forest authorities. This proved extremely detrimental to the import and re-export of the agar wood materials. In other words, the entire agar trade came to a grinding halt.",
      "Consequently, on June 26, 2000, representatives of the All Assam Agar Traders and Agaroil Manufacturers’ Association (AATMA) met with the then Chief Minister of Assam. They submitted a memorandum urging the Government to exclude agar oil extraction units from the purview of these Rules, arguing that traders sourced their raw materials from private cultivations (patta land or homesteads) and through legal import from abroad. The memorandum further requested that the agar wood industry be officially declared an agro-based industry. However, no concrete action was taken at that time, leaving the agar oil extraction industry without its hard-earned, much-needed official recognition, and the trade suffered a severe setback.",
      "However, in 2001, AATMA submitted a fresh representation and memorandum before the Government of Assam, urging the exclusion of agar-oil-extracting units from the purview of the “Assam Wood Based Industries (Establishment and Regulation) Rules, 2000”. This matter was vigorously pursued multiple times. Consequently, in December 2003, at the request of the then Forest Minister, AATMA sponsored and participated in “The Workshop on Agar Plantation and the Rule of Joint Forest Management Committees of Assam”, which was held in Rabindra Bhavan on 6th and 7th January 2004. However, no positive step was taken by the then Forest Minister regarding the regularization of the agar industry.",
      "These continued efforts yielded positive administrative support when, on June 23, 2005, the Principal Chief Conservator of Forests (PCCF) of Assam, S. Doley, officially wrote to the Commissioner & Secretary of the Environment & Forest Department recommending the amendment of the 2000 Rules. The PCCF proposed excluding agar wood oil extraction units from the definition of \"Wood Based Industries\", acknowledging that the 1,000–1,500 village and cottage distillation units functioning in Hojai sourced their raw materials from cultivated trees on private homesteads rather than reserved forests. Referencing the New Forest Policy of Assam, 2004, which identified agar as a major economic species providing livelihood support, the PCCF explicitly proposed this exclusion to remove legal hurdles and allow agar cultivation to grow unhindered. The PCCF also noted that the Government of India had taken steps to relax export restrictions under the EXIM Policy for artificially propagated agar wood.",
      "Until that point, agar processing units were not governed by the aforementioned Rules. Instead, these units continued to survive on the import of agar wood from abroad until 2005. This arrangement required verification of consignments by the concerned Divisional Forest Officer (DFO) at the time of both import and re-export to ensure compliance with CITES regulations. Unfortunately, in October 2005, the forest authorities (DFO Hojai) denied the verification. This action, which was unlawful and arbitrary, was allegedly based on the verbal instruction of the then Forest Minister of Assam. As a result, around seven processing units suffered massive financial losses because they were unable to re-export their processed agar wood. This caused severe damage to the local industry and a significant loss of foreign exchange earnings. Finding no alternative, several prominent business houses shifted their operations (industry) to a neighbouring state like Meghalaya, as well as overseas. Consequently, the prospects of a highly viable industry were severely crippled and strangled within Assam. In 2006, the Govt. of Assam included agar wood processing units under the Assam Wood Based Industry Rules 2000, a move that served to further damage the agar business and industry. Driven to desperation by these unjust regulations, the industry sought legal recourse. A prominent agar wood importing and exporting firm, M/s North East Aromatics based in Hojai, with the backing of AATMA, filed a Writ Petition (W.P.(c) No. 6284/2007) in the Gauhati High Court against the State of Assam’s Forest Department. During this period, the association also prepared a case to escalate the matter to the Supreme Court of India. However, the then Forest Minister intervened, personally urging the petitioners to withdraw the case with a firm assurance that the government would amicably resolve the issues and provide the necessary relief. Trusting this official promise, the party withdrew the legal proceedings. Unfortunately, once the petition was withdrawn, the Minister went into complete denial and reneged on his commitments.",
      "As per CCF(T) letter No. FGT39/WBI/Amand/SecondaryWBI/06 dt. 01.03.2006, the Central Empowered Committee agreed to make certain changes in the Assam Wood Based Industries (Establishment and Regulation) Rules, 2000 and recommended the incorporation of the agar wood industries in the Secondary Wood Based Industry, which could be set up outside designated industrial areas. But unfortunately, the Assam Cabinet did not approve the recommendation. Thus, all efforts of AATMA to streamline the trade did not succeed due to the deaf ear and negligence of the then Govt. of Assam.",
      "The office bearers of AATMA, although disheartened with the negative approach of the Govt. of Assam, did not sit idle, and during the period 2005–2016 continued to meet the then Chief Minister/Forest Minister as well as the concerned forest deptt. authorities, and submitted memorandums for excluding the agar industry from the purview of the aforesaid Rules, 2000. As stated above, the Forest Deptt. submitted several recommendations proposing to bring agar industries under the “Secondary Wood Based Industry” as approved by the Central High Power Committee. These efforts did not yield the desired result as yet, and the agar industry did not receive any due recognition, since the Assam Ministry did not approve it in cabinet.",
      "Because the agar industry was never officially legalized or exempted under these rigid rules—largely due to this persistent unwillingness and betrayal by the then Forest Minister up until 2016—the everyday reality for those on the ground became a nightmare. Routine transportation of agar wood, even when legally harvested from private, cultivated lands, was treated as a criminal act. This hostility escalated severely in 2010 when the then Forest Minister issued strict instructions explicitly targeting the trade. Alerts were coordinated across multiple agencies, including the Guwahati Airport authorities, the Assam Police, the Assam Forest Department, and even the Maharashtra Forest Department, to actively search for agar traders and seize their products. The harassment extended far beyond state borders; if agar farmers or traders from Assam were found staying in hotels in Maharashtra, they faced unjustified detention and harassment. Furthermore, the authorities also targeted and harassed the agar dealers based in Mumbai. This highly hostile environment led to numerous unlawful seizures of cultivated agar wood, causing immense financial distress and systemic disruption for the traders and farmers struggling to keep this traditional industry alive.",
      "Amidst this intense persecution, AATMA continued to fight for survival at the national level. Following an official invitation, AATMA participated in a critical meeting on the ‘Conservation of Agarwood in India’ convened by the Ministry of Environment and Forests (MoEF) on December 20, 2011, at Paryavaran Bhawan, New Delhi, chaired by the Additional Director General (Wildlife). During this meeting, AATMA President Shri A. Rahman delivered a passionate and emotional briefing regarding the historical significance and the grim current scenario of the agar wood trade in Assam. He poignantly explained how the once-flourishing industry in the North Eastern states was being systematically decimated by the ban on running distillation units, a hostile legal framework, and the specific setbacks caused by the Assam Wood Based Industries Rules 2000. He emphasized that for the past ten years, AATMA had been pleading with the Government of Assam to exclude the agar industry from these Rules, given that the trade relies entirely on privately cultivated and legally imported raw materials. He further exposed how the Assam Government had continuously deflected responsibility by claiming the Central Government was blocking the exemption. In a crucial revelation, the presiding Central authorities categorically clarified that the Central Government was not responsible for restricting the Assam wood-based industry, affirming that regulating these local units was strictly a State matter.",
      "On August 24, 2016, an AATMA delegation led by Humayun Chaudhury met with the then Forest Minister Smt. Pramila Rani Brahma at the Hojai Forest circuit house. The delegation submitted a memorandum to apprise her of the challenges the industry faced due to the aforesaid Rules 2000. She took a keen interest in the matter, and at her behest, a proposal was submitted to the Government to classify the agar wood industry as a “Secondary Wood Based Industry” by excluding it from the “Assam Wood Based Industries (Establishment and Regulation) Rules, 2000”. Subsequently, under the initiative of Smt. Pramila Rani Brahma, the Assam Forest Department organized a National Conference on “Agarwood & Oil Industries: Prospects & Possibilities”. The conference was held on October 28, 2016, at NEDFi House in Guwahati.",

    ],
    deepDives: [
      { label: "22 Years of Struggle", href: "/#critical-era" },
      { label: "The story of Agar in Assam", href: "/history" },
    ]
  },
  {
    num: "VII",
    heading: "Achivement",
    paragraphs: [
      "Following this on 19/07/2021, an AATMA delegation accompanied by Mr. Sirajuddin Ajmal, MLA, met with the Chief minister of Assam, Dr. Himanta Biswa Sharma, to submit a memorandum apprising him of the ongoing problems face by Agar industries from last 21 years, due to Asaam wood Base Industries (Eastablishment & Regulation) Rule 2000. The chief minister patiently listened to the delegation , acknowledged the memorandum , and assured them he would work on resolving the matter",
      "True to his assurance, the Chief Minister of Assam and his government took fresh , positive approach to the long-standing , vexed issue .The association extends its sincere thanks to Sri Himanta Biswa Sharma for enacting the Assam Wood Base Industries (Promotion & Development) Rule 2022 on 12th. January 2023. Consequent upon the Rules Agar Wood Industries are now declared as Secondary Wood Based Industries, which can operate outside the Industrial estate , successfully liberalizing and simplifying the trade from the grip of strict laws . These new Rules will definitely pave the way for smooth trade and overall development of plantations .To further clarify and implement these progressive changes, a Stakeholders Conference was organized on 14 February 2023. Graced by Environment & Forests Department, Government of Assam, the conference served to explain the newly introduced \"Assam Wood Based Industries (Promotion & Development) Rules, 2022\" alongside the \"Assam Trees Outside Forest (Sustainable Management) Rules, 2022\" to the relevant industry stakeholders.",
    ],
    deepDives: [
      { label: "A New Dawn for the Agarwood Trade", href: "/#achievement" },
    ]
  },
  {
    num: "VIII",
    heading: "NON-DETRIMENT FINDINGS OF AGAR TREES (AQUILARIA MALACCENSIS)",
    paragraphs: [
      "MoEF&CC commissioned the NDF Study through the Botanical Survey of India (BSI) and the BSI had submitted the report in February 2024. The work was carried out by following the ‘CITES Non-detriment Findings Guidance for Perennial Plants’ (Wolf & al 2016).",
      "Aquilaria malaccensis is listed as a Critically Endangered (CR) Species in the IUCN Red List of Threatened Species. The species is listed under CITES Appendix-II (w.e.f. 16th February 1995).Ensuring trade within sustainable limits is at the core of the Convention on International Trade in Endangered Species of Wild Fauna and Flora (CITES). According to the Convention, Parties shall allow trade in specimens of species included in Appendix II only if the Scientific Authority of the State of export has advised that \"such export will not be detrimental to the survival of that species\" (Article IV).",
      "Major Agarwood markets in Hojai (Assam) and Calicut (Kerala) were surveyed. Several Agarwood Processing units and other Agarwood-based units were visited in Assam, Karnataka, Kerala, Manipur, Nagaland and Tripura.",
      "Cultivated Agar Tree Assam Population (>2 years of age &>10 cm GBH) was estimated at 1143.7 Lakh. Golaghat, Jorhat, Sibsagar, Karimganj and Cachar are the districts of Assam with major Cultivated Agar Tree Assam Population.",
    ],
    deepDives: [
      { label: "Non-Detriment Findings", href: "/#ndf-findings" },
    ]
  },
  {
    num: "IX",
    heading: "NOTIFICATION OF ASSAM WOOD BASED INDUSTRIES (PROMOTION AND DEVELOPMENT) RULES 2022",
    paragraphs: [
      "As per the Assam Wood-based Industries (Establishment & Regulation) Rules 2000, Agar wood Oil extracting Units are included in Wood-Based Industries and according to these Rules, Agar wood Oil extracting Units are required to be established only in industrial estate areas (notified by the state government after obtaining concurrence of MOEFCC, as per the directions of Hon’ble Supreme Court of India dated 15th January 1998 in WP (C) No. 171/1996) to get license. However, on the contrary, Agar wood Oil extracting Units have been traditionally established as cottage industries in the households and their number on the ground stands more than 800. Therefore, shifting these household industries to designated industrial estate areas was never feasible and hence these Agar wood Oil extracting Units of Assam could not get license even after 22 years of notification of the said rules.",
      "True to his assurance, the Chief Minister of Assam and his government took fresh, positive approach to the long-standing , vexed issue. To revive the once flourishing industry, the Assam Wood-based Industries (Promotion and Development) Rules 2022 were notified by the Govt of Assam under the leadership of Dr Himanta Biswa Sarma, the Hon’ble Chief Minister of Assam, by repealing the Assam Wood-based Industries (Establishment & Regulation) Rules 2000. Assam Agar Traders and Manufacturers Association expresses its extreme gratitude and happiness over notification of Assam Wood Based Industries (Promotion and Development) Rules 2022 on 12th January 2023. AATMA takes this opportunity to profusely thank Dr Himanta Biswa Sarma, Hon’ble Chief Minister of Assam, for his visionary leadership and for taking this great initiative of bringing back the glory to Agar Wood Based Industries.",
      "Under the new set of Rules, the Agar wood based industries have been newly categorized into Secondary Wood-Based Industries and licensing has been done away with, they need only to be registered with the forest department and start functioning legally at present location without shifting to any other place. In order to meet Convention of International Trade in Endangered Species of Wild Fauna and Flora (CITES) requirements for international export and facilitate tracing of origin of the raw materials of the final produce, a set of simple processes under ease of doing business, such as registration of the industry and registration of plantations, stock register of inbound and outbound raw materials will be established under new rules.",
      "Major features of the Assam Wood Based Industries (Promotion and Development) Rules 2022 such as categorizing Agar Wood Based Industries as Secondary Wood Based Industries and liberating the trade from license regime and associated restrictions and simplifying the procedures for registration of the Agar Wood Based Industries by Registration Committees at the level of Conservator of Forests concerned will immensely benefit the Agar wood industry and provide much needed boost. The rules are made fully CITES compliant and paved way for revival of Agar Wood Industries and the import and re-export as well as export of domestic agar wood products. With the notification of these rules, the Agar Wood Based Industries in Assam can function from the present locations after obtaining registration under the new rules, which is valid for five (5) years. The categorization of Agar Wood Based Industries into Micro, Small, Medium and Large units based on the aggregate capacity of each unit. This provides necessary impetus for small traders to conduct the trade in an affordable manner. AATMA firmly believes that all these provisions in new rules will radically transform the Agar Wood Trade in to a vibrant industry.",
      "AATMA duly recognises the recent notification of Assam Trees Outside Forest (Sustainable Management) Rules 2022. Assam has huge population of Agar trees growing on non-forest lands by private farmers. These rules promote and facilitate the creation of Agar tree plantations on non-forest lands, thereby, making raw material available for Agar Wood Based Industries by simplifying procedures for registration of Agar tree plantations and felling and transportation of harvested material from various parts of the State to Agar Wood Based Industries.",
      "Both the above said rules operate on complete and interactive end-to-end online platform for traders/planters which provide complete transparency and timely permissions by reducing human interface.",
    ],
    deepDives: [
      { label: "Assam WBI Rules 2022", href: "/#rules" },
      { label: "Policy & legal framework", href: "/policy" },
    ]
  },
  {
    num: "X",
    heading: "ONGOING CHALLENGES & THE WAY FORWARD",
    paragraphs: [
      "While we have finally achieved legal status for the agar trade, the current license fees remain quite high for small-scale and general traders, and the overall registration process is overly lengthy. Given that agarwood is fundamentally a homegrown agricultural product, we respectfully seek further relaxations. We would highly appreciate a shorter, more efficient, and cost-effective licensing process to alleviate the burden on local cultivators and small traders.",
      "Furthermore, the current procedures for export involve a massively lengthy process requiring applications to be filed and processed across multiple government departments. For instance, the Standard Operating Procedure for securing a No Objection Certificate (NOC) requires navigating the Directorate General of Foreign Trade (DGFT), the State Forest Department (for Certificates of Origin and physical verification), the SU Division of the Ministry of Environment, Forest & Climate Change, and the CITES Management Authority. Even after receiving the necessary verification reports from the State Forest Department and CITES, the Ministry can take up to 30 working days just to issue the NOC to the DGFT. Following this, authorities such as Customs and the Wildlife Crime Control Bureau (WCCB) must also verify the materials prior to export. This multi-layered bureaucracy consumes a tremendous amount of time, frequently causing traders to lose international buyers who cannot afford to wait for such extended periods. We strongly advocate for a shorter, more efficient application process, preferably consolidated into a single-window system rather than being scattered across disparate departments. In pursuit of development, easier licensing processes, and better market linkages,",
      "AATMA recently participated in a one-day stakeholders' workshop organized by the Assam Industrial Development Corporation Limited in January 2023, in the presence of Honorable Minister of Forest, Minister of Agriculture and Minister of Industry, several discussion was done for the relaxation for agar wood trade & industry. We remain hopeful that such continued dialogue will help streamline these critical export and licensing processes.",
    ],
    deepDives: [
      { label: "Ongoing Challenges & the Way Forward", href: "/#challenges" },
      { label: "AIDC workshop photographs", href: "/press" },
    ],
    image: assetUrl("events/aidc-workshop-hall.jpg"),
    imageAlt:
      "The hall at the AIDC stakeholders' workshop, showing the stage and the event backdrop",
  },
];

const FINAL_PDF_SECTION_ORDER: SpineNum[] = [
  "I", "II", "III", "IV", "V", "VI", "VII", "X", "VIII", "IX",
];
const DISPLAY_SECTION_NUMBERS: SpineNum[] = [
  "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
];

export const ABOUT_SPINE: SpineSection[] = FINAL_PDF_SECTION_ORDER.map(
  (sourceNum, index) => {
    const section = SOURCE_SPINE.find((candidate) => candidate.num === sourceNum);
    if (!section) throw new Error(`Missing source section ${sourceNum}`);
    return { ...section, num: DISPLAY_SECTION_NUMBERS[index] };
  },
);

/** Source byline printed at the end of the PDF editorial. */
export const ABOUT_BYLINE = `${ABOUT_EDITORIAL.author} · ${ABOUT_EDITORIAL.role}`;
