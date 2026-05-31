export interface CareerPath {
  id: number;
  title: string;
  sector: "government" | "research" | "private" | "entrepreneurship" | "international";
  roles: string[];
  qualifications: string[];
  salaryRange: string;
  growthRating: number;
  description: string;
  icon: string;
}

export const careerPaths: CareerPath[] = [
  {
    id: 1,
    title: "Government & Civil Services",
    sector: "government",
    roles: ["Agricultural Officer", "Block Development Officer", "Horticulture Inspector", "Soil Survey Officer", "Plant Protection Officer"],
    qualifications: ["B.Sc Agriculture", "Clear TNPSC / UPSC / State PSC exam"],
    salaryRange: "₹35,400 – ₹1,50,000/month",
    growthRating: 4,
    description: "Stable, pensionable government roles with social impact. Work directly with farmers, implement schemes, and lead rural development. Competitive exams are the gateway.",
    icon: "Building2",
  },
  {
    id: 2,
    title: "Research & Academia",
    sector: "research",
    roles: ["Junior Research Fellow (ICAR JRF)", "Research Associate", "Assistant Professor", "Scientist Grade B", "Ph.D Scholar"],
    qualifications: ["B.Sc / M.Sc Agriculture", "ICAR JRF / NET qualified", "Ph.D for faculty posts"],
    salaryRange: "₹31,000 – ₹2,20,200/month",
    growthRating: 5,
    description: "Contribute to crop science, soil health, and food security through research at IARI, SAUs, and ICAR institutes. Long-term prestige and intellectual reward.",
    icon: "FlaskConical",
  },
  {
    id: 3,
    title: "Private Sector & Agri-business",
    sector: "private",
    roles: ["Sales Officer (Seeds/Fertilizers)", "Agronomy Specialist", "Supply Chain Executive", "Crop Advisor", "Technical Marketing Manager"],
    qualifications: ["B.Sc Agriculture", "MBA Agribusiness is a plus"],
    salaryRange: "₹3L – ₹18L per annum",
    growthRating: 4,
    description: "Fast growth, performance bonuses, and India-wide exposure in companies like ITC, Mahyco, Coromandel, and agri-tech startups. Commercially rewarding career.",
    icon: "TrendingUp",
  },
  {
    id: 4,
    title: "Banking & Finance (Agriculture)",
    sector: "government",
    roles: ["Agricultural Development Officer (ADO)", "NABARD Grade A Officer", "Agriculture Loan Officer", "Rural Development Manager"],
    qualifications: ["B.Sc Agriculture", "IBPS AFO / NABARD / SBI exams"],
    salaryRange: "₹36,000 – ₹1,05,000/month",
    growthRating: 4,
    description: "Channel institutional credit and rural development funds to farmers. A secure career path through competitive bank exams, with postings across India.",
    icon: "Landmark",
  },
  {
    id: 5,
    title: "Entrepreneurship & Agri-business",
    sector: "entrepreneurship",
    roles: ["Organic Farm Entrepreneur", "FPO Promoter", "Agri-input Retailer", "Precision Agriculture Consultant", "Export-Oriented Farmer"],
    qualifications: ["B.Sc Agriculture", "Business acumen", "NABARD PRODUCE Fund / SFAC support available"],
    salaryRange: "₹3L – Unlimited",
    growthRating: 5,
    description: "Build your own agri-venture, promote Farmer Producer Organizations, or set up agri-input retail. Government support schemes make this increasingly accessible.",
    icon: "Sprout",
  },
  {
    id: 6,
    title: "International Opportunities",
    sector: "international",
    roles: ["FAO Consultant", "CGIAR Researcher", "Overseas Farm Manager", "Agricultural Attaché", "Development Programme Officer (UN/WFP)"],
    qualifications: ["M.Sc / Ph.D Agriculture", "International exposure", "Strong English + second language"],
    salaryRange: "$30,000 – $1,20,000 per annum",
    growthRating: 5,
    description: "Work with FAO, CGIAR, WFP, or in Gulf/Southeast Asia farm management. High earning potential and global exposure for ambitious graduates with PG degrees.",
    icon: "Globe",
  },
];
