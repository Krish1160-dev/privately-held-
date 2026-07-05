export const IS_SAMPLE_DATA = true as const;

export type NewsCategory =
  | "tn-updates"
  | "national-updates"
  | "recruitment"
  | "research"
  | "scholarship";

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: NewsCategory;
  isNew?: boolean;
  isImportant?: boolean;
  source: string;
  summary: string;
  readMoreUrl?: string;
  isSample?: boolean;
}

export interface Notification {
  id: number;
  title: string;
  date: string;
  type: "result" | "admit-card" | "circular" | "date-change";
  body: string;
  isNew?: boolean;
  isImportant?: boolean;
  link?: string;
  isSample?: boolean;
}

export const newsItems: NewsItem[] = [
  /* ── Tamil Nadu Updates ── */
  {
    id: 1,
    title: "TN Budget 2026-27: Agriculture Sector Gets ₹8,420 Crore — Highest Allocation in State History",
    date: "19 Feb 2026",
    category: "tn-updates",
    isNew: false,
    isImportant: true,
    source: "TN Finance Department",
    summary:
      "Tamil Nadu's 2026-27 state budget allocated ₹8,420 crore for agriculture and allied sectors — a 22% increase over the previous year. Key announcements include ₹2,000 crore for drip irrigation expansion, ₹1,500 crore for cold chain infrastructure, and ₹900 crore for the Uzhavar Sandhai revamp across 350 towns.",
    readMoreUrl: "https://www.tn.gov.in/",
    isSample: true,
  },
  {
    id: 2,
    title: "TNAU Releases 'CO 55' — New Short-Duration Paddy Variety Yielding 8.1 t/ha in Kuruvai Season",
    date: "14 May 2026",
    category: "tn-updates",
    isNew: true,
    source: "Tamil Nadu Agricultural University",
    summary:
      "TNAU's Rice Research Station, Aduthurai, officially released CO 55, a short-duration (105-day) paddy variety suited for the Kuruvai season in delta districts. Yielding 8.1 t/ha under optimum conditions, CO 55 offers 20% water savings compared to ADT 43 and has built-in resistance to brown planthopper.",
    readMoreUrl: "https://tnau.ac.in/",
    isSample: true,
  },
  {
    id: 3,
    title: "Kudimaramathu 2.0: 12,400 Water Bodies Restored Across TN; ₹1,850 Crore Spent in Phase I",
    date: "28 Apr 2026",
    category: "tn-updates",
    isImportant: true,
    source: "TN Agriculture Department",
    summary:
      "Phase I of Tamil Nadu's Kudimaramathu 2.0 community tank restoration scheme completed restoration of 12,400 tanks across 32 districts, benefiting an estimated 19 lakh farming families. Phase II targeting 6,000 additional tanks has been approved with ₹900 crore outlay for 2026-27.",
    isSample: true,
  },
  {
    id: 4,
    title: "TN Launches 'Ilaignar Vivasayigal Thittam' — Startup Grants up to ₹5 Lakh for Young Agri-Entrepreneurs",
    date: "10 Apr 2026",
    category: "tn-updates",
    isNew: true,
    source: "TN Agri Business Development & Farmers Welfare Dept.",
    summary:
      "Tamil Nadu launched the Ilaignar Vivasayigal Thittam targeting agriculture graduates aged 21–35 who start farm-based enterprises. Grants of ₹2–5 lakh, backed by TNAU mentorship and NABARD working capital linkage, are available for applications through Tamil Nadu Agriculture Business Corporation portal.",
    isSample: true,
  },
  {
    id: 5,
    title: "Soil Health Card 3.0 Rollout: 1.1 Crore Cards Issued to TN Farmers with AI-Based Fertiliser Advice",
    date: "22 Mar 2026",
    category: "tn-updates",
    source: "TN Agriculture Department / DBT",
    summary:
      "Tamil Nadu completed issuance of Soil Health Card 3.0 to 1.1 crore farm families. The revamped cards now include AI-generated, location-specific fertiliser recommendations via the mKisan app, integrating soil test data with crop variety, season, and water source parameters.",
    isSample: true,
  },

  /* ── National Updates ── */
  {
    id: 6,
    title: "Union Budget 2026-27: Agriculture Allocation Rises to ₹1.71 Lakh Crore; Natural Farming Gets ₹3,600 Crore",
    date: "1 Feb 2026",
    category: "national-updates",
    isImportant: true,
    source: "Ministry of Finance",
    summary:
      "Union Budget 2026-27 raised agriculture sector allocation to ₹1.71 lakh crore — a 12% increase. Highlights: ₹3,600 crore for National Natural Farming Mission to cover 20 lakh farmers by 2027, ₹2,100 crore for Digital Agriculture Mission Phase II, and ₹1,500 crore for PM Matsya Sampada Yojana extension.",
    readMoreUrl: "https://www.indiabudget.gov.in/",
    isSample: true,
  },
  {
    id: 7,
    title: "MSP for Kharif 2026-27: Paddy at ₹2,500/Qtl, Groundnut ₹7,400/Qtl — CCEA Approval",
    date: "18 Jun 2026",
    category: "national-updates",
    isNew: true,
    isImportant: true,
    source: "CACP / Ministry of Agriculture & FW",
    summary:
      "The Cabinet Committee on Economic Affairs approved MSP for 14 kharif crops for 2026-27. Paddy (common) fixed at ₹2,500/qtl (up ₹100 from 2025-26), Groundnut at ₹7,400/qtl (up ₹350), Cotton Medium Staple at ₹7,850/qtl (up ₹329). Farmers can register on PM-KISAN portal for direct MSP procurement access.",
    isSample: true,
  },
  {
    id: 8,
    title: "PM-KISAN 21st Instalment: ₹22,000 Crore Released to 10.3 Crore Farm Families",
    date: "5 Apr 2026",
    category: "national-updates",
    isNew: false,
    source: "Ministry of Agriculture & FW",
    summary:
      "Prime Minister released the 21st PM-KISAN instalment of ₹2,000, benefiting 10.3 crore eligible farm families. Total cumulative disbursement under PM-KISAN now crosses ₹3.86 lakh crore. Face Authentication-based e-KYC is mandatory for the 22nd instalment.",
    isSample: true,
  },
  {
    id: 9,
    title: "Digital Agriculture Mission Phase II: National Farmer Registry Reaches 9.5 Crore Verified Profiles",
    date: "15 May 2026",
    category: "national-updates",
    source: "Ministry of Agriculture & FW",
    summary:
      "The National Farmer Registry under Digital Agriculture Mission Phase II reached 9.5 crore verified farmer profiles linked to Aadhaar, land records, and soil health data. The registry now enables instant PMFBY enrollment, targeted subsidy transfer, and personalised crop advisory through the Unified Farmer Service Interface.",
    readMoreUrl: "https://agricoop.nic.in/",
    isSample: true,
  },
  {
    id: 10,
    title: "10,000 FPO Scheme: 9,200 FPOs Registered; Govt Extends Scheme to 2028 with ₹6,865 Crore",
    date: "20 Mar 2026",
    category: "national-updates",
    source: "SFAC / MoAFW",
    summary:
      "The 10,000 FPO scheme crossed 92% of its target with 9,200 Farmer Producer Organisations registered. Government extended the scheme to 2028 with ₹6,865 crore additional outlay, focusing on cold chain access and e-NAM linkage for all registered FPOs.",
    isSample: true,
  },

  /* ── Recruitment News ── */
  {
    id: 11,
    title: "IBPS AFO CRP SPL XV 2026 Notified — 950 Posts; Apply at ibps.in before 20 July 2026",
    date: "28 May 2026",
    category: "recruitment",
    isNew: true,
    isImportant: true,
    source: "IBPS",
    summary:
      "IBPS officially notified AFO CRP SPL XV 2026 with 950 Agriculture Field Officer vacancies across 11 public sector banks including Canara Bank, PNB, Union Bank, and Bank of India. Prelims scheduled Oct 2026. B.Sc Agriculture / Horticulture / Agri Engineering eligible. Apply at ibps.in before 20 Jul 2026.",
    readMoreUrl: "https://ibps.in/",
    isSample: true,
  },
  {
    id: 12,
    title: "TNPSC Combined Agriculture Services 2026: 532 Vacancies — Application Open till 10 August",
    date: "15 Mar 2026",
    category: "recruitment",
    isNew: false,
    isImportant: true,
    source: "TNPSC",
    summary:
      "TNPSC notified 532 vacancies under Combined Agriculture Services 2026 — 412 Agricultural Officers and 120 Horticultural Officers. Written exam scheduled Sep 2026. Applications open till 10 August 2026 at tnpscexams.net. Fee: ₹150 (SC/ST free).",
    readMoreUrl: "https://www.tnpscexams.net/",
    isSample: true,
  },
  {
    id: 13,
    title: "SBI Agriculture Domain Officer 2026: 450 Posts (Scale II) — Apply before 31 July 2026",
    date: "5 Jun 2026",
    category: "recruitment",
    isNew: true,
    source: "State Bank of India",
    summary:
      "SBI notified 450 Agriculture Domain Officer posts at Scale II for 2026. B.Sc Agriculture, M.Sc Agronomy, or MBA Agribusiness with 2 years' experience eligible. Online test September 2026; group exercise and interview to follow. Fee: ₹750 (SC/ST/PwD exempt).",
    readMoreUrl: "https://bank.sbi/careers",
    isSample: true,
  },
  {
    id: 14,
    title: "NABARD Grade A 2026 Phase III Interviews Underway — Results Expected by September",
    date: "1 Jul 2026",
    category: "recruitment",
    isNew: true,
    source: "NABARD",
    summary:
      "NABARD Grade A 2026 Phase III (personal interview) is currently ongoing at Mumbai, Chennai, and Bhopal centres. 180 officers will be recruited for development, rural banking, and inspection divisions. Final result expected by September 2026. Check nabard.org for interview schedule.",
    readMoreUrl: "https://nabard.org/",
    isSample: true,
  },
  {
    id: 15,
    title: "UPSC Combined Agricultural Services 2026: Written Exam on 12 Sep — Hall Tickets Out by 20 Aug",
    date: "10 Jun 2026",
    category: "recruitment",
    source: "UPSC",
    summary:
      "UPSC Combined Agricultural Services 2026 written exam is scheduled for 12 September 2026. 165 Group A gazetted posts across Directorate of Marketing & Inspection and other central ministries. Hall tickets will be released by 20 August at upsconline.nic.in.",
    readMoreUrl: "https://upsconline.nic.in/",
    isSample: true,
  },

  /* ── Agriculture Research News ── */
  {
    id: 16,
    title: "TNAU CO 55 Paddy: 8.1 t/ha Yield, 20% Water Saving — Recommended for TN Delta Districts",
    date: "14 May 2026",
    category: "research",
    isNew: true,
    source: "TNAU Rice Research Station, Aduthurai",
    summary:
      "TNAU's Rice Research Station released CO 55, a 105-day short-duration paddy variety yielding 8.1 t/ha with 20% less water requirement. Trials across 8 delta districts showed consistent yield advantage over ADT 43 and resistance to brown planthopper — a major pest in Cauvery delta.",
    isSample: true,
  },
  {
    id: 17,
    title: "ICAR-IARI Demonstrates 50% Yield Boost in Wheat Using AI-Driven Variable Rate Fertilisation",
    date: "8 Apr 2026",
    category: "research",
    source: "ICAR-IARI, New Delhi",
    summary:
      "ICAR-IARI's Precision Farming Development Centre demonstrated a 50% yield improvement in wheat using AI-driven variable rate fertilisation combining satellite NDVI data, soil nutrient maps, and real-time weather APIs. The technology is being scaled to 1,000 farmers across 5 states in 2026-27.",
    isSample: true,
  },
  {
    id: 18,
    title: "ICRISAT Groundnut Variety ICGV 21060: Yields 3.8 t/ha Under 46°C Heat in TN Field Trials",
    date: "18 Mar 2026",
    category: "research",
    isImportant: true,
    source: "ICRISAT, Hyderabad",
    summary:
      "ICRISAT's heat-tolerant groundnut variety ICGV 21060 yielded 3.8 t/ha under 46°C peak temperature in Tamil Nadu field trials across Vellore and Tiruvannamalai districts — 40% more than local checks. State Agriculture Department is fast-tracking seed multiplication for kharif 2027.",
    isSample: true,
  },
  {
    id: 19,
    title: "Indian Scientists Develop Biofortified Sorghum with 3× Iron and Zinc — First in Asia",
    date: "2 Mar 2026",
    category: "research",
    isNew: false,
    source: "ICRISAT / IIMR",
    summary:
      "Scientists at ICRISAT and IIMR (Indian Institute of Millets Research) developed a biofortified sorghum variety with 3× higher iron (40 ppm) and zinc (35 ppm) content compared to conventional varieties. This is the first biofortified sorghum variety approved for commercial cultivation in Asia.",
    isSample: true,
  },
  {
    id: 20,
    title: "CRISPR-Edited Blast-Resistant Rice Line Successfully Grown in Tamil Nadu — Commercial Release in 2027",
    date: "10 Feb 2026",
    category: "research",
    source: "TNAU / ICAR-NRRI",
    summary:
      "A CRISPR-Cas9 edited rice line with complete resistance to blast fungus was successfully grown across 12 locations in Tamil Nadu. Developed jointly by TNAU and ICAR-NRRI, the variety awaits regulatory approval under the Environment Protection Act for commercial release in 2027.",
    isSample: true,
  },

  /* ── Scholarship & Fellowship Updates ── */
  {
    id: 21,
    title: "ICAR JRF 2026 Stipend Revised: JRF at ₹37,000/Month, SRF at ₹42,000/Month — Effective Jun 2026",
    date: "30 May 2026",
    category: "scholarship",
    isNew: true,
    isImportant: true,
    source: "ICAR, New Delhi",
    summary:
      "ICAR revised research fellowship stipends effective June 2026: JRF increased to ₹37,000/month (from ₹31,000) and SRF to ₹42,000/month (from ₹35,000). HRA at 24% of stipend for metro city postings. All existing JRF/SRF holders will receive revised stipend from June 2026 disbursement.",
    readMoreUrl: "https://icar.org.in/",
    isSample: true,
  },
  {
    id: 22,
    title: "DBT JRF 2026: 108 Fellowships in Agricultural Biotechnology — Apply by 15 July 2026",
    date: "15 May 2026",
    category: "scholarship",
    isNew: true,
    source: "Department of Biotechnology, GOI",
    summary:
      "DBT opened 108 JRF positions for Ph.D in Agricultural Biotechnology, Plant Genomics, and Bioinformatics. M.Sc in Biotechnology / Genetics / Plant Science eligible. Stipend: ₹37,000/month + HRA. Written exam: 14 Sep 2026. Apply at dbtindia.gov.in by 15 July.",
    readMoreUrl: "https://dbtindia.gov.in/",
    isSample: true,
  },
  {
    id: 23,
    title: "TNAU Merit-cum-Means Scholarship 2026-27 — ₹24,000–₹36,000/Year for UG & PG Students",
    date: "10 May 2026",
    category: "scholarship",
    isNew: true,
    source: "Tamil Nadu Agricultural University",
    summary:
      "TNAU Merit-cum-Means Scholarship for 2026-27 is open for B.Sc and M.Sc Agriculture students with family income below ₹2.5 lakh. Awards: ₹24,000/year (UG) and ₹36,000/year (PG). Application portal open till 30 June 2026 at tnau.ac.in/scholarships.",
    readMoreUrl: "https://tnau.ac.in/",
    isSample: true,
  },
  {
    id: 24,
    title: "CGIAR Excellence in Breeding Internship 2026 — 3-Month Paid Internships at ICRISAT & IRRI",
    date: "20 Apr 2026",
    category: "scholarship",
    isImportant: true,
    source: "CGIAR South Asia Hub",
    summary:
      "CGIAR opened applications for 2026 Excellence in Breeding internships at ICRISAT (Hyderabad) and IRRI (Philippines) for M.Sc Agriculture students. Internships cover molecular breeding, phenotyping, and bioinformatics. Travel, accommodation, and ₹40,000/month stipend covered. Deadline: 31 July 2026.",
    readMoreUrl: "https://www.icrisat.org/",
    isSample: true,
  },
  {
    id: 25,
    title: "PM-USHA Research Grant 2026: ₹5 Crore for State Agriculture Universities — TNAU Among Beneficiaries",
    date: "5 Apr 2026",
    category: "scholarship",
    source: "UGC / Ministry of Education",
    summary:
      "Under PM-USHA (Prime Minister's Uchchatar Shiksha Abhiyan), 8 State Agriculture Universities including TNAU received ₹5 crore each for research infrastructure upgradation. Funds earmarked for precision phenotyping labs, bioinformatics servers, and student research fellowships (₹18,000/month for M.Sc students).",
    isSample: true,
  },
];

export const notifications: Notification[] = [
  {
    id: 1,
    title: "IBPS AFO SPL XV 2026 — Application Open, Deadline 20 July 2026",
    date: "28 May 2026",
    type: "date-change",
    body: "IBPS AFO CRP SPL XV 2026 applications are currently open. 950 Agriculture Field Officer posts across 11 banks. Apply at ibps.in before 20 July 2026. Fee: ₹850 (General), ₹175 (SC/ST/PwD).",
    isNew: true,
    isImportant: true,
    link: "https://ibps.in/",
    isSample: true,
  },
  {
    id: 2,
    title: "ICAR AICE JRF 2026 — Admit Cards Available from 13 August 2026",
    date: "10 Jul 2026",
    type: "admit-card",
    body: "ICAR AICE JRF 2026 admit cards will be available from 13 August 2026 on aice.icar.gov.in. Exam date: 23 August 2026 at centres nationwide. Carry a valid photo ID along with the admit card.",
    isNew: true,
    isImportant: true,
    link: "https://aice.icar.gov.in/",
    isSample: true,
  },
  {
    id: 3,
    title: "NABARD Grade A 2026 — Phase III Interview Schedule Released",
    date: "25 Jun 2026",
    type: "circular",
    body: "NABARD released Phase III (interview) schedule for Grade A 2026. Interviews at Mumbai, Chennai, and Bhopal from July to August 2026. Qualified candidates must carry original certificates, photocopies, and a valid photo ID to the interview venue.",
    isNew: true,
    link: "https://nabard.org/",
    isSample: true,
  },
  {
    id: 4,
    title: "TNAU PG 2026 — Merit List Published; Counselling Starts 10 August",
    date: "15 Jul 2026",
    type: "result",
    body: "TNAU has published the final merit list for PG Entrance 2026. Selected candidates must register for counselling at admissions.tnau.ac.in before 5 August. Counselling begins 10 August 2026. Carry all original certificates and ID proof.",
    isNew: true,
    isImportant: true,
    link: "https://admissions.tnau.ac.in/",
    isSample: true,
  },
  {
    id: 5,
    title: "TNPSC CAS 2026 — Syllabus Updated; GK Current Affairs Cutoff Extended to June 2026",
    date: "1 Jun 2026",
    type: "circular",
    body: "TNPSC has updated the CAS 2026 syllabus: General Knowledge & Current Affairs section now covers events up to June 2026. Candidates must study the 2026 state budget highlights, Kharif MSP 2026-27, and Digital Agriculture Mission Phase II for this section.",
    link: "https://www.tnpscexams.net/",
    isSample: true,
  },
];
