export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: "govt" | "private" | "ngo";
  salaryRange: string;
  experience: string;
  postedDate: string;
  description: string;
  tags: string[];
}

export const jobs: Job[] = [
  {
    id: 1,
    title: "Field Agricultural Officer",
    company: "Tamil Nadu Agriculture Department",
    location: "Various Districts, TN",
    type: "govt",
    salaryRange: "₹35,400 – ₹1,12,400",
    experience: "0–2 years",
    postedDate: "2 days ago",
    description: "Provide frontline extension services, conduct farmer training programs, and implement state schemes at village level.",
    tags: ["Extension", "Govt", "Entry Level"],
  },
  {
    id: 2,
    title: "Agronomy Specialist",
    company: "Coromandel International Ltd.",
    location: "Coimbatore, TN",
    type: "private",
    salaryRange: "₹4.5L – ₹7L per annum",
    experience: "1–3 years",
    postedDate: "5 days ago",
    description: "Plan and execute crop advisory programs, liaise with dealers and farmers, and drive product adoption in South India territories.",
    tags: ["Agronomy", "Sales", "Private"],
  },
  {
    id: 3,
    title: "Research Associate – Crop Science",
    company: "Tamil Nadu Agricultural University",
    location: "Coimbatore, TN",
    type: "govt",
    salaryRange: "₹31,000 – ₹38,000 per month",
    experience: "M.Sc required",
    postedDate: "1 week ago",
    description: "Conduct field experiments in rice and pulse varieties, maintain trial plots, and assist in manuscript preparation.",
    tags: ["Research", "Academia", "M.Sc"],
  },
  {
    id: 4,
    title: "Agriculture Loan Officer",
    company: "Indian Overseas Bank",
    location: "Chennai / Trichy, TN",
    type: "govt",
    salaryRange: "₹36,000 – ₹63,840 per month",
    experience: "0–1 year",
    postedDate: "3 days ago",
    description: "Process Kisan Credit Card applications, evaluate crop loan proposals, and support agricultural MSME lending.",
    tags: ["Banking", "Finance", "Entry Level"],
  },
  {
    id: 5,
    title: "Seed Production Technologist",
    company: "Mahyco Monsanto Biotech",
    location: "Hyderabad / Field Postings",
    type: "private",
    salaryRange: "₹5L – ₹9L per annum",
    experience: "2–4 years",
    postedDate: "4 days ago",
    description: "Oversee hybrid seed production plots, manage contract farmers, and conduct quality audits at processing centers.",
    tags: ["Seeds", "Biotech", "Field"],
  },
  {
    id: 6,
    title: "Programme Officer – Livelihoods",
    company: "DHAN Foundation",
    location: "Madurai, TN",
    type: "ngo",
    salaryRange: "₹3.5L – ₹5.5L per annum",
    experience: "1–3 years",
    postedDate: "6 days ago",
    description: "Implement sustainable agricultural livelihoods programs with smallholder and tribal farming communities.",
    tags: ["NGO", "Livelihoods", "Development"],
  },
  {
    id: 7,
    title: "Precision Agriculture Analyst",
    company: "CropIn Technology Solutions",
    location: "Remote / Bangalore",
    type: "private",
    salaryRange: "₹6L – ₹10L per annum",
    experience: "2–5 years",
    postedDate: "1 week ago",
    description: "Analyse satellite and drone imagery for crop monitoring, develop GIS-based advisory reports for enterprise clients.",
    tags: ["Agri-tech", "Remote Sensing", "GIS"],
  },
  {
    id: 8,
    title: "Horticulture Development Officer",
    company: "National Horticulture Mission (NHM)",
    location: "Salem / Dharmapuri, TN",
    type: "govt",
    salaryRange: "₹35,400 – ₹1,12,400",
    experience: "0–2 years",
    postedDate: "2 weeks ago",
    description: "Coordinate implementation of NHM schemes, assist farmers in availing subsidies, and monitor plantation activities.",
    tags: ["Horticulture", "Govt Scheme", "Field"],
  },
];
