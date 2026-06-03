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
}

export const newsItems: NewsItem[] = [
  /* ── Tamil Nadu Updates ── */
  {
    id: 1,
    title: "TN Govt Announces ₹1,200 Crore Boost for Smallholder Irrigation Under Kudimaramathu 2.0",
    date: "1 Jun 2025",
    category: "tn-updates",
    isNew: true,
    isImportant: true,
    source: "TN Agriculture Department",
    summary:
      "Chief Minister announced an expanded Kudimaramathu scheme allocating ₹1,200 crore for community-based irrigation restoration across 18,000 tanks in 32 districts, aiming to benefit 22 lakh farm families in kharif 2025.",
    readMoreUrl: "https://www.tn.gov.in/",
  },
  {
    id: 2,
    title: "TNAU Releases Low-Residue Fertiliser Schedule for Paddy Farmers Under PM-PRANAM",
    date: "28 May 2025",
    category: "tn-updates",
    isNew: true,
    source: "Tamil Nadu Agricultural University",
    summary:
      "TNAU's Agronomy department released an updated fertiliser schedule for Kuruvai paddy aligned with PM-PRANAM incentives, recommending Nano Urea and NPS fertilisers to reduce chemical fertiliser use by up to 25%.",
    readMoreUrl: "https://tnau.ac.in/",
  },
  {
    id: 3,
    title: "Tamil Nadu Signs MoU with Netafim for Drip-Fertigation Training Centres in 12 Districts",
    date: "22 May 2025",
    category: "tn-updates",
    source: "Directorate of Horticulture, TN",
    summary:
      "The TN Horticulture Department signed an MoU with Netafim India to establish 12 demonstration-cum-training centres for drip irrigation and fertigation covering banana, tomato, and chilli crops in water-stressed districts.",
  },
  {
    id: 4,
    title: "Cauvery Delta Zone Declared Special Agriculture Zone; 14 New Agri Processing Units Planned",
    date: "18 May 2025",
    category: "tn-updates",
    isImportant: true,
    source: "TN State Government",
    summary:
      "The State Cabinet approved special agriculture zone status for 5 Cauvery delta districts, promising 14 food processing units, dedicated cold chain infrastructure, and priority credit disbursement for rice farmers.",
  },
  {
    id: 5,
    title: "TN Announces Crop Insurance Premium Waiver for SC/ST Farmers Under PMFBY for Kharif 2025",
    date: "14 May 2025",
    category: "tn-updates",
    isNew: true,
    source: "TN Revenue & Disaster Management",
    summary:
      "SC/ST farmers across Tamil Nadu will receive a full state share premium waiver under PMFBY for kharif 2025 season, covering paddy, groundnut, and cotton crops. Enrolment through Common Service Centres open till 31 July.",
  },

  /* ── National Updates ── */
  {
    id: 6,
    title: "Union Budget 2025-26: Agriculture Gets ₹1.52 Lakh Crore; Digital Agri Mission Launched",
    date: "1 Feb 2025",
    category: "national-updates",
    isImportant: true,
    source: "Ministry of Finance",
    summary:
      "The Union Budget allocated ₹1.52 lakh crore for agriculture — the highest ever. The Digital Agriculture Mission, creating a national farmer registry and soil profile database, received ₹2,817 crore.",
    readMoreUrl: "https://www.indiabudget.gov.in/",
  },
  {
    id: 7,
    title: "PM-KISAN 19th Installment Released; ₹21,000 Crore Disbursed to 9.8 Crore Farmers",
    date: "20 May 2025",
    category: "national-updates",
    isNew: true,
    source: "Ministry of Agriculture & FW",
    summary:
      "The PM-KISAN 19th installment of ₹2,000 was transferred to 9.8 crore eligible farm families, taking total cumulative disbursement to over ₹3.45 lakh crore. e-KYC mandatory for next installment.",
  },
  {
    id: 8,
    title: "NABARD Approves ₹55,000 Crore Rural Infrastructure Fund for FY 2025-26",
    date: "15 May 2025",
    category: "national-updates",
    source: "NABARD",
    summary:
      "NABARD's Board approved Rural Infrastructure Development Fund (RIDF) allocation of ₹55,000 crore for 2025-26, with priority for micro-irrigation, post-harvest infrastructure, and agricultural roads in aspirational districts.",
  },
  {
    id: 9,
    title: "Cabinet Raises MSP for Kharif 2025: Paddy at ₹2,400/qtl, Groundnut at ₹7,050/qtl",
    date: "10 May 2025",
    category: "national-updates",
    isImportant: true,
    source: "CACP / MoAFW",
    summary:
      "The Cabinet Committee on Economic Affairs approved MSP hikes for 14 kharif crops for 2025-26. Paddy MSP raised to ₹2,400/qtl (up ₹117), Groundnut to ₹7,050/qtl (up ₹310), and Cotton to ₹7,521/qtl (up ₹501).",
  },
  {
    id: 10,
    title: "10,000 FPO Scheme: 8,200 FPOs Registered Across India; ₹4,000 Crore Equity Grant Released",
    date: "5 May 2025",
    category: "national-updates",
    source: "SFAC / MoAFW",
    summary:
      "The flagship 10,000 FPO scheme achieved 82% of its target with 8,200 FPOs registered. Government released ₹4,000 crore in equity grants and is linking FPOs to NAFED and e-NAM platforms.",
  },

  /* ── Recruitment News ── */
  {
    id: 11,
    title: "IBPS AFO CRP SPL XIV: 900 Posts Across 11 Banks — Applications Open 20 May to 15 July",
    date: "20 May 2025",
    category: "recruitment",
    isNew: true,
    isImportant: true,
    source: "IBPS",
    summary:
      "IBPS announced 900 Agriculture Field Officer vacancies across Canara Bank, PNB, Union Bank, and 8 other PSBs. Prelims scheduled for October 2025. B.Sc Agriculture / Horticulture / Agri Engineering eligible.",
    readMoreUrl: "https://ibps.in/",
  },
  {
    id: 12,
    title: "TNPSC Combined Agriculture Services 2025: 532 Vacancies — Agricultural Officer & Horticultural Officer",
    date: "2 May 2025",
    category: "recruitment",
    isNew: true,
    isImportant: true,
    source: "TNPSC",
    summary:
      "TNPSC released notification for 532 combined agriculture services posts including 412 Agricultural Officers and 120 Horticultural Officers. Written exam tentatively scheduled for August 2025. Apply by 25 June 2025.",
    readMoreUrl: "https://www.tnpscexams.net/",
  },
  {
    id: 13,
    title: "SBI Agriculture Domain Officer Scale II: 426 Posts — Application Deadline 30 July 2025",
    date: "10 Jun 2025",
    category: "recruitment",
    isNew: true,
    source: "State Bank of India",
    summary:
      "SBI notified 426 Agriculture Domain Officer posts at Scale II. Candidates with B.Sc Agriculture, M.Sc Agronomy, or MBA Agribusiness with 2 years experience are eligible. Online test September 2025.",
    readMoreUrl: "https://bank.sbi/careers",
  },
  {
    id: 14,
    title: "UPSC Agricultural Services Exam 2025: 48 Gazetted Posts Under Ministry of Agriculture",
    date: "18 May 2025",
    category: "recruitment",
    source: "UPSC",
    summary:
      "UPSC released combined Geo-Scientist and Allied Services notification with 48 Group A gazetted posts under Directorate of Marketing & Inspection. B.Sc Agriculture required. Last date: 10 July 2025.",
    readMoreUrl: "https://upsconline.nic.in/",
  },
  {
    id: 15,
    title: "ICAR Junior Research Fellowship 2025: 240 Positions Across ICAR Institutes — Apply by 30 June",
    date: "5 May 2025",
    category: "recruitment",
    isNew: true,
    source: "ICAR / AICE",
    summary:
      "ICAR opened applications for 240 JRF positions. M.Sc Agriculture holders who qualified AICE exam are eligible. Ph.D fellowships at IARI, NRRI, IISR and 47 other institutes. Stipend: ₹31,000/month.",
    readMoreUrl: "https://aice.icar.gov.in/",
  },

  /* ── Agriculture Research News ── */
  {
    id: 16,
    title: "TNAU Releases DRR Dhan 58: High-Yield Paddy Variety Resistant to Blast and Stem Borer",
    date: "25 May 2025",
    category: "research",
    isNew: true,
    source: "TNAU / DRR",
    summary:
      "TNAU and the Directorate of Rice Research jointly released paddy variety DRR Dhan 58, yielding 7.5 t/ha with built-in resistance to blast fungus and stem borer — a major breakthrough for Tamil Nadu farmers.",
  },
  {
    id: 17,
    title: "ICAR-IARI Demonstrates 45% Water Saving via AI-Driven Drip Irrigation in Wheat",
    date: "18 May 2025",
    category: "research",
    source: "ICAR-IARI, New Delhi",
    summary:
      "IARI's Precision Farming Development Centre demonstrated 45% reduction in irrigation water use for wheat using AI-controlled drip irrigation integrating soil moisture sensors, weather forecasting, and real-time ET data.",
  },
  {
    id: 18,
    title: "ICRISAT Develops Groundnut Varieties Withstanding 45°C Heat — A Climate Resilience Breakthrough",
    date: "12 May 2025",
    category: "research",
    isImportant: true,
    source: "ICRISAT, Hyderabad",
    summary:
      "ICRISAT released two groundnut varieties — ICGV 21050 and ICGV 21060 — that maintain yield under 45°C heat stress, offering a lifeline to farmers in TN, Andhra Pradesh, and Rajasthan facing rising temperatures.",
  },
  {
    id: 19,
    title: "Indian Scientists Complete Full Genome Mapping of Turmeric; Disease-Resistant Varieties Ahead",
    date: "8 May 2025",
    category: "research",
    isNew: true,
    source: "ICAR-NRCSS",
    summary:
      "Scientists at ICAR-NRCSS completed whole-genome sequencing of turmeric (Curcuma longa), enabling marker-assisted selection of rhizome rot-resistant varieties expected to benefit Tamil Nadu and Andhra Pradesh growers.",
  },
  {
    id: 20,
    title: "Biofertiliser Consortium Boosts Sugarcane Yield 18% in Tamil Nadu Field Trials",
    date: "2 May 2025",
    category: "research",
    source: "Sugarcane Research Station, Cuddalore",
    summary:
      "A 3-year trial by TN's Sugarcane Research Station found that a microbial consortium (Azospirillum + PSB + Trichoderma) increased cane yield by 18% and reduced chemical nitrogen use by 30% in Erode district conditions.",
  },

  /* ── Scholarship & Fellowship Updates ── */
  {
    id: 21,
    title: "ICAR Senior Research Fellowship: JRF Holders Eligible for Upgrade at ₹35,000/Month",
    date: "30 May 2025",
    category: "scholarship",
    isNew: true,
    source: "ICAR, New Delhi",
    summary:
      "ICAR JRF holders completing 2 years of Ph.D research with satisfactory progress are eligible for automatic SRF upgrade at ₹35,000/month plus HRA. Assessment reviews scheduled June–July 2025.",
    readMoreUrl: "https://icar.org.in/",
  },
  {
    id: 22,
    title: "TNAU Merit-cum-Means Scholarship 2025-26 Open for B.Sc and M.Sc Agriculture Students",
    date: "20 May 2025",
    category: "scholarship",
    isNew: true,
    source: "Tamil Nadu Agricultural University",
    summary:
      "TNAU scholarships for students with family income below ₹2.5 lakh: ₹24,000/year for UG and ₹36,000/year for PG. Application portal open till 30 June 2025.",
    readMoreUrl: "https://tnau.ac.in/",
  },
  {
    id: 23,
    title: "CGIAR Excellence Fellowship 2025: 3-Month Internships at ICRISAT & IRRI for Indian Postgraduates",
    date: "15 May 2025",
    category: "scholarship",
    isImportant: true,
    source: "CGIAR South Asia Hub",
    summary:
      "CGIAR opened applications for internships at ICRISAT (Hyderabad) and IRRI (Philippines) for M.Sc Agriculture students. Covers travel, stay, and ₹35,000/month stipend. Applications close 15 July 2025.",
    readMoreUrl: "https://www.icrisat.org/",
  },
  {
    id: 24,
    title: "DBT Junior Research Fellowship 2025: 102 Seats for Agricultural Biotechnology — Exam in August",
    date: "10 May 2025",
    category: "scholarship",
    isNew: true,
    source: "Department of Biotechnology, GOI",
    summary:
      "DBT notified 102 JRF seats for students in Agricultural Biotechnology, Plant Molecular Biology, and related fields. M.Sc Biotechnology / Genetics / Plant Science eligible. Ph.D stipend: ₹37,000/month.",
    readMoreUrl: "https://dbtindia.gov.in/",
  },
  {
    id: 25,
    title: "TN Chief Minister's Award Scholarship for Agricultural Innovation: ₹1 Lakh for Student Projects",
    date: "5 May 2025",
    category: "scholarship",
    source: "TN State Government / TNAU",
    summary:
      "Tamil Nadu launched a ₹1 lakh scholarship for outstanding student innovation projects in agriculture, with themes including organic farming, water-use efficiency, and FPO business models. Submit via TNAU portal by 30 Jul 2025.",
  },
];

export const notifications: Notification[] = [
  {
    id: 1,
    title: "TNPSC Agri Services 2025 — Application Deadline Extended to 30 June",
    date: "25 May 2025",
    type: "date-change",
    body: "TNPSC has extended the application deadline for Combined Agriculture Services (CAS) 2025 to 30 June 2025. Candidates who have not applied must complete registration at tnpscexams.net before the new deadline.",
    isNew: true,
    isImportant: true,
    link: "https://www.tnpscexams.net/",
  },
  {
    id: 2,
    title: "IBPS AFO SPL XIV Prelims Admit Card — Download from 1 October 2025",
    date: "1 Sep 2025",
    type: "admit-card",
    body: "IBPS AFO Preliminary exam admit cards will be available for download from 1 October 2025 on ibps.in. Prelims exam dates: 18–20 October 2025. Hall ticket required for entry.",
    link: "https://ibps.in/",
  },
  {
    id: 3,
    title: "ICAR JRF 2025 — Institute-Wise Interview Schedule Published",
    date: "20 May 2025",
    type: "circular",
    body: "ICAR has published institute-wise interview schedule for JRF 2025. Candidates shortlisted based on AICE rank should report to their respective institute for interviews between 12–30 August 2025.",
    isNew: true,
    link: "https://aice.icar.gov.in/",
  },
  {
    id: 4,
    title: "NABARD Grade A 2025 — Phase II Results Declared",
    date: "15 May 2025",
    type: "result",
    body: "NABARD has declared Phase II results. Qualified candidates are called for Phase III interviews at NABARD's Mumbai/Chennai offices in June 2025. Check results at nabard.org.",
    isNew: true,
    isImportant: true,
    link: "https://nabard.org/",
  },
  {
    id: 5,
    title: "TNAU M.Sc Admissions 2025-26 — Counselling Circular Released",
    date: "10 May 2025",
    type: "circular",
    body: "TNAU centralised counselling for M.Sc Agriculture programmes commences 15 July 2025. ICAR PG entrance exam qualified candidates must register with documents at the TNAU admissions portal.",
    link: "https://tnau.ac.in/",
  },
];
