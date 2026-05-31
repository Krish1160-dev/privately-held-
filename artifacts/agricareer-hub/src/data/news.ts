export interface NewsItem {
  id: number;
  title: string;
  category: "policy" | "scheme" | "technology" | "market";
  date: string;
  summary: string;
  isNew: boolean;
  isImportant: boolean;
  source: string;
}

export interface Notification {
  id: number;
  title: string;
  type: "result" | "admit-card" | "circular" | "date-change";
  date: string;
  body: string;
  isNew: boolean;
  isImportant: boolean;
  link?: string;
}

export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Cabinet approves ₹63,246 Cr PM-KISAN revision — payment frequency increases to quarterly",
    category: "scheme",
    date: "28 May 2025",
    summary: "The Union Cabinet approved the revision of PM-KISAN Samman Nidhi, increasing disbursement cycles and extending benefits to tenant farmers with valid lease agreements.",
    isNew: true,
    isImportant: true,
    source: "PIB India",
  },
  {
    id: 2,
    title: "TNAU develops drought-tolerant rice variety 'ADT 53' suitable for water-scarce districts",
    category: "technology",
    date: "27 May 2025",
    summary: "Researchers at TNAU's Rice Research Station released a new cultivar yielding 5.8 t/ha with 30% less water requirement, recommended for Tiruvannamalai and Villupuram districts.",
    isNew: true,
    isImportant: false,
    source: "The Hindu AgriTech",
  },
  {
    id: 3,
    title: "MSP for Kharif crops 2025-26 declared — paddy at ₹2,300, groundnut ₹6,760 per quintal",
    category: "market",
    date: "26 May 2025",
    summary: "CCEA approved MSPs for 14 kharif crops. Paddy (common) set at ₹2,300/quintal, a hike of ₹117 over last year. Groundnut increased to ₹6,760/quintal.",
    isNew: false,
    isImportant: true,
    source: "Agriculture Ministry",
  },
  {
    id: 4,
    title: "Tamil Nadu launches 'Uzhavar Suraksha' digital crop insurance scheme",
    category: "scheme",
    date: "24 May 2025",
    summary: "The TN Agriculture Department launched a state-funded supplementary crop insurance platform with instant claim settlement via satellite-based yield assessment.",
    isNew: false,
    isImportant: false,
    source: "TN Govt Press",
  },
  {
    id: 5,
    title: "India signs MoU with Israel for precision irrigation tech transfer to KVKs",
    category: "technology",
    date: "22 May 2025",
    summary: "The ICAR and Israel's ARO will jointly train 2,400 KVK scientists in drip, micro-sprinkler, and fertigation systems over three years under the Avi Adama Programme.",
    isNew: false,
    isImportant: false,
    source: "ICAR Press Note",
  },
  {
    id: 6,
    title: "Natural Farming Mission allocated ₹2,481 Cr — 1 crore farmers to be onboarded by 2027",
    category: "policy",
    date: "20 May 2025",
    summary: "The Union Budget allocation for NMNF confirmed. Tamil Nadu expects 3.5 lakh farmers to transition to chemical-free farming under the scheme over the next two years.",
    isNew: false,
    isImportant: false,
    source: "MoAFW",
  },
];

export const notifications: Notification[] = [
  {
    id: 1,
    title: "TNPSC Agriculture Officer Exam 2025 — Hall Tickets Released",
    type: "admit-card",
    date: "29 May 2025",
    body: "Admit cards for TNPSC AO Group II exam (Advt. No. 04/2025) are available for download on the official TNPSC portal. Exam scheduled for 10 Aug 2025.",
    isNew: true,
    isImportant: true,
    link: "#",
  },
  {
    id: 2,
    title: "ICAR JRF 2025 — Application Window Extended to 30 June",
    type: "date-change",
    date: "27 May 2025",
    body: "ICAR has extended the last date for JRF online applications from 15 June to 30 June 2025 due to technical issues on the portal. Fee waiver for SC/ST applicants confirmed.",
    isNew: true,
    isImportant: true,
    link: "#",
  },
  {
    id: 3,
    title: "TNAU PG Entrance 2024 — Final Merit List Published",
    type: "result",
    date: "25 May 2025",
    body: "The final allotment list for TNAU PG admissions 2024-25 has been published. Selected candidates must report to respective departments with original certificates by 10 June.",
    isNew: false,
    isImportant: false,
    link: "#",
  },
  {
    id: 4,
    title: "NABARD Grade A 2025 — Phase II Interview Schedule",
    type: "result",
    date: "23 May 2025",
    body: "NABARD has released the schedule for Phase II (interview) of Grade A 2025 recruitment. Interview dates: 16–27 June 2025 at Mumbai, Chennai, and Bhopal centres.",
    isNew: false,
    isImportant: false,
    link: "#",
  },
  {
    id: 5,
    title: "Official Circular: Service Bond Terms Updated for KVK Contract Appointments",
    type: "circular",
    date: "20 May 2025",
    body: "ICAR has revised the service bond requirement for KVK contract positions from 3 years to 2 years, effective from appointments made after 1 June 2025.",
    isNew: false,
    isImportant: false,
    link: "#",
  },
];
