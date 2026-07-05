export interface SalaryMilestone {
  year: string;
  role: string;
  salary: string;
}

export interface CareerPath {
  id: number;
  title: string;
  sector: "government" | "research" | "private" | "entrepreneurship" | "international";
  icon: string;
  description: string;
  roles: string[];
  qualifications: string[];
  salaryRange: string;
  salaryMilestones: SalaryMilestone[];
  growthRating: number;
  keyExams: string[];
  topEmployers: string[];
  entryRequirement: string;
  timeToFirstJob: string;
  prosAndCons: { pros: string[]; cons: string[] };
}

export const careerPaths: CareerPath[] = [
  {
    id: 1,
    title: "Government & Civil Services",
    sector: "government",
    icon: "Building2",
    description:
      "Stable, pensionable roles with direct social impact. Work alongside farmers, deliver government schemes, and lead rural development from the ground up. State PSC and UPSC exams are the primary gateway into this sector.",
    roles: [
      "Agricultural Officer (Block Level)",
      "Horticultural Officer Grade II",
      "Subject Matter Specialist (KVK)",
      "Plant Protection Officer",
      "Soil Survey Officer",
      "Assistant Director of Agriculture",
      "District Agricultural Officer (after promotion)",
    ],
    qualifications: [
      "B.Sc Agriculture from an ICAR-recognised university",
      "Clear TNPSC Combined Agriculture Services exam (for TN state roles)",
      "Clear UPSC Combined Agricultural Services exam (for central government roles)",
      "Tamil Nadu domicile + Tamil language proficiency for most TN posts",
    ],
    salaryRange: "₹35,400 – ₹1,77,500 / month",
    salaryMilestones: [
      { year: "Entry (0–2 yrs)", role: "Agricultural Officer", salary: "₹35,400 – ₹42,000" },
      { year: "Mid (5–8 yrs)", role: "Senior Agricultural Officer", salary: "₹56,100 – ₹70,000" },
      { year: "Senior (10–15 yrs)", role: "Deputy Director Agriculture", salary: "₹78,800 – ₹1,10,000" },
      { year: "Leadership (18+ yrs)", role: "Joint Director / Director Agriculture", salary: "₹1,18,500 – ₹1,77,500" },
    ],
    growthRating: 4,
    keyExams: ["TNPSC CAS 2026", "UPSC Combined Agricultural Services 2026", "TN Agriculture DR 2026"],
    topEmployers: [
      "Tamil Nadu Agriculture Department",
      "Tamil Nadu Horticulture Department",
      "Directorate of Marketing & Inspection (GoI)",
      "KVK (Krishi Vigyan Kendras) under ICAR",
      "State Agriculture Universities (SAUs)",
    ],
    entryRequirement: "B.Sc Agriculture + clear state/national PSC exam",
    timeToFirstJob: "1–2 years (exam preparation + results cycle)",
    prosAndCons: {
      pros: [
        "Job security and permanent employment",
        "Defined pension benefit under CPS",
        "Social impact — directly supporting farming communities",
        "Promotions on seniority + departmental exam",
        "Medical benefits for self and family",
      ],
      cons: [
        "Competitive exam preparation requires 1–2 years of dedicated study",
        "Rural/remote postings mandatory at entry level",
        "Salary growth slower than private sector",
        "Bureaucratic pace can limit innovation",
      ],
    },
  },
  {
    id: 2,
    title: "Research & Academia",
    sector: "research",
    icon: "FlaskConical",
    description:
      "Contribute to India's food security through cutting-edge research at ICAR institutes and State Agriculture Universities. A long-term, intellectually stimulating career path with global collaboration opportunities.",
    roles: [
      "Junior Research Fellow (JRF) — ICAR / DBT",
      "Senior Research Fellow (SRF)",
      "Research Associate",
      "Scientist Grade B (ICAR)",
      "Assistant Professor / Lecturer",
      "Associate Professor",
      "Professor & Head of Department",
    ],
    qualifications: [
      "B.Sc Agriculture + M.Sc Agriculture (min 60%) for JRF",
      "Clear ICAR AICE JRF exam or DBT JRF exam",
      "Ph.D for Scientist Grade B and faculty roles",
      "NET/SLET qualification for assistant professor posts",
      "Research publications required for senior positions",
    ],
    salaryRange: "₹37,000 stipend → ₹2,20,200 / month (Professor)",
    salaryMilestones: [
      { year: "JRF (0–2 yrs)", role: "Junior Research Fellow", salary: "₹37,000 + HRA" },
      { year: "SRF (2–4 yrs)", role: "Senior Research Fellow", salary: "₹42,000 + HRA" },
      { year: "Scientist B (4–8 yrs)", role: "Scientist Grade B (ICAR)", salary: "₹56,100 – ₹1,00,000" },
      { year: "Senior Scientist (8–15 yrs)", role: "Principal Scientist / Associate Professor", salary: "₹1,07,700 – ₹1,82,200" },
    ],
    growthRating: 5,
    keyExams: ["ICAR JRF 2026", "DBT JRF 2026", "TNAU Ph.D Entrance 2026", "CSIR NET Life Sciences"],
    topEmployers: [
      "ICAR-IARI (New Delhi)",
      "ICAR-NRRI (Rice Research, Cuttack)",
      "Tamil Nadu Agricultural University (TNAU)",
      "ICRISAT (Hyderabad)",
      "IRRI South Asia Hub",
      "Central Institute for Cotton Research (CICR)",
    ],
    entryRequirement: "M.Sc Agriculture + ICAR JRF / DBT JRF qualification",
    timeToFirstJob: "Immediate after JRF qualification (stipend begins at institute)",
    prosAndCons: {
      pros: [
        "Intellectually stimulating work with real-world impact",
        "JRF/SRF stipend revised to ₹37k–₹42k in 2026",
        "Ph.D registration included with JRF at ICAR institutes",
        "International collaboration — IRRI, CIMMYT, Wageningen",
        "Strong pathway to scientist positions with pay scales matching Group A govt officers",
      ],
      cons: [
        "Lengthy career path — 8–10 years to reach scientist level",
        "Competitive — very few Scientist B positions open each year",
        "Publications and grants required for promotion",
        "Contract nature of project positions creates uncertainty",
      ],
    },
  },
  {
    id: 3,
    title: "Banking & Agriculture Finance",
    sector: "government",
    icon: "Landmark",
    description:
      "Channel institutional credit and rural development funds to India's farming communities. Secure bank employment with strong salary, transfer preferences, and clear promotion ladders — accessed through IBPS AFO, NABARD, and SBI exams.",
    roles: [
      "Agriculture Field Officer (AFO) — PSU Banks via IBPS",
      "Agriculture Domain Officer — SBI Scale II",
      "Development Assistant Grade A — NABARD",
      "Agriculture Loan Appraisal Officer",
      "Regional Rural Bank Officer (IBPS RRB)",
      "Senior Manager — Agricultural Credit",
    ],
    qualifications: [
      "B.Sc Agriculture / B.Sc Horticulture / B.Tech Agri Engineering",
      "Minimum 60% marks at graduation (55% for SC/ST/PwD)",
      "Clear IBPS AFO exam for PSU banks (900+ posts in 2026)",
      "Clear NABARD Grade A exam for development banking",
      "SBI Agriculture Domain Officer exam for SBI posts",
    ],
    salaryRange: "₹36,000 – ₹1,05,000 / month",
    salaryMilestones: [
      { year: "Entry (0–3 yrs)", role: "AFO / Junior Manager (JMGS-I)", salary: "₹36,000 – ₹52,000" },
      { year: "Mid (3–8 yrs)", role: "Senior Manager (MMGS-II)", salary: "₹48,170 – ₹69,810" },
      { year: "Senior (8–15 yrs)", role: "Chief Manager (MMGS-III / SMGS-IV)", salary: "₹63,840 – ₹90,000" },
      { year: "Leadership (15+ yrs)", role: "Assistant General Manager", salary: "₹76,010 – ₹1,05,000" },
    ],
    growthRating: 4,
    keyExams: ["IBPS AFO CRP SPL XV 2026", "NABARD Grade A 2026", "SBI Agriculture Domain Officer 2026"],
    topEmployers: [
      "State Bank of India",
      "NABARD",
      "Canara Bank",
      "Punjab National Bank",
      "Indian Overseas Bank",
      "Union Bank of India",
      "Bank of India",
    ],
    entryRequirement: "B.Sc Agriculture + clear IBPS AFO / NABARD / SBI exam",
    timeToFirstJob: "1–1.5 years (exam cycle from notification to joining)",
    prosAndCons: {
      pros: [
        "Permanent government bank employment with strong job security",
        "Competitive salary with DA, HRA, perquisites adding 40–50% to basic",
        "Home loan, vehicle loan at staff rates",
        "Medical insurance for self and family",
        "Transfers limited to state/zone preference",
      ],
      cons: [
        "Competitive exams — IBPS AFO prelims + mains + interview",
        "Field postings in rural areas mandatory at entry level",
        "Promotion based on seniority + exam",
        "Frequent transfers may affect family stability",
      ],
    },
  },
  {
    id: 4,
    title: "Private Sector & Agribusiness",
    sector: "private",
    icon: "TrendingUp",
    description:
      "Fast-paced careers in India's largest agri-input, food processing, and agri-tech companies. Performance-linked growth, incentives, and India-wide (and international) exposure make this the highest-earning early-career path for agriculture graduates.",
    roles: [
      "Sales Officer — Seeds / Fertilizers / Pesticides",
      "Agronomy Specialist / Technical Advisor",
      "Supply Chain & Procurement Executive",
      "Crop Advisor (Digital Platforms)",
      "Technical Marketing Manager",
      "Product Manager — Agri Inputs",
      "Key Account Manager — Agri-corporates",
    ],
    qualifications: [
      "B.Sc Agriculture from any university",
      "MBA Agribusiness / MBA Marketing is a strong advantage",
      "Valid two-wheeler driving licence (mandatory for field roles)",
      "Regional language proficiency for market-facing roles",
      "1–3 years' experience preferred for senior roles",
    ],
    salaryRange: "₹3.5L – ₹20L per annum",
    salaryMilestones: [
      { year: "Entry (0–2 yrs)", role: "Sales / Field Officer (Fresher)", salary: "₹3.5L – ₹5.5L p.a." },
      { year: "Mid (2–5 yrs)", role: "Agronomy Specialist / AM", salary: "₹6L – ₹10L p.a." },
      { year: "Senior (5–10 yrs)", role: "Territory / Zonal Manager", salary: "₹10L – ₹16L p.a." },
      { year: "Leadership (10+ yrs)", role: "Regional Head / Product Head", salary: "₹16L – ₹25L+ p.a." },
    ],
    growthRating: 4,
    keyExams: ["No mandatory exam — direct recruitment via company HR / MBA entrance"],
    topEmployers: [
      "Coromandel International Ltd.",
      "Mahyco Seeds",
      "ITC Agribusiness Division",
      "UPL Ltd.",
      "Bayer Crop Science",
      "Syngenta India",
      "Jain Irrigation Systems",
      "Nuziveedu Seeds",
    ],
    entryRequirement: "B.Sc Agriculture + field aptitude (MBA preferred for product/marketing roles)",
    timeToFirstJob: "Immediate to 3 months (campus or off-campus recruitment)",
    prosAndCons: {
      pros: [
        "Fastest path to high salaries — ₹6–10L within 3 years with performance",
        "Performance incentives (up to 20% of CTC) on top of fixed salary",
        "Exposure to nationwide markets and international product portfolios",
        "Promotions on merit, not seniority",
        "Company vehicles, mobile allowance, field expense reimbursement",
      ],
      cons: [
        "High travel load — field roles require 15–20 days/month on the road",
        "Sales targets add performance pressure",
        "No job security comparable to government roles",
        "Work-life balance can be challenging in field-intensive roles",
      ],
    },
  },
  {
    id: 5,
    title: "Entrepreneurship & Agri-startups",
    sector: "entrepreneurship",
    icon: "Sprout",
    description:
      "Launch your own agri-venture, promote FPOs, or join a fast-growing agri-tech startup. Government support through NABARD PRODUCE Fund, SFAC, and state startup schemes makes this increasingly viable. The highest-risk, highest-reward path.",
    roles: [
      "Organic / Natural Farm Entrepreneur",
      "FPO Promoter & CEO",
      "Agri-input Retailer / Distributor",
      "Precision Agriculture Consultant",
      "Agri-tech Startup Founder / Co-founder",
      "Export-Oriented Produce Aggregator",
      "Farm Tourism / Agri-education Entrepreneur",
    ],
    qualifications: [
      "B.Sc Agriculture (sufficient for most ventures)",
      "MBA Agribusiness or PGDM for investor-backed startups",
      "NABARD's PRODUCE Fund / SFAC FPO support available to B.Sc holders",
      "State startup incubator registration (TNAU's Agri-Business Incubator, TNIFMC)",
      "Business plan and domain expertise in chosen vertical",
    ],
    salaryRange: "₹2L in early stage → Unlimited with scale",
    salaryMilestones: [
      { year: "Year 1–2", role: "Startup Founder (early stage)", salary: "₹2L – ₹5L (founder draw)" },
      { year: "Year 3–5", role: "Established Micro-enterprise", salary: "₹8L – ₹20L annual profit" },
      { year: "Year 5–10", role: "Scaled Agri-venture / FPO CEO", salary: "₹20L – ₹60L+ annual profit" },
      { year: "10+ years", role: "Agri-company Founder / Director", salary: "₹60L+ (depends on scale)" },
    ],
    growthRating: 5,
    keyExams: ["No qualifying exam required — apply directly to NABARD, SFAC, or state incubators"],
    topEmployers: [
      "Self / Own Venture",
      "TNAU Agri-Business Incubation Forum (ABIF)",
      "CropIn Technology Solutions",
      "DeHaat Agri Services",
      "Ninjacart",
      "AgriBazaar",
      "Waycool Foods",
    ],
    entryRequirement: "B.Sc Agriculture + a validated business idea and basic capital or grant",
    timeToFirstJob: "Immediate — but profitability may take 1–3 years",
    prosAndCons: {
      pros: [
        "Unlimited earning potential — no salary ceiling",
        "TN Ilaignar Vivasayigal Thittam offers ₹2–5 lakh startup grants for graduates",
        "NABARD PRODUCE Fund provides equity up to ₹15 lakh to FPOs",
        "Control over your time, team, and direction",
        "India's agri-tech ecosystem is booming — 2026 funding reached $800M+",
      ],
      cons: [
        "High risk — most agri-startups take 2–3 years to reach profitability",
        "No fixed income or job security",
        "Market, weather, and supply chain risks are constant",
        "Requires strong networks, mentorship, and access to credit",
      ],
    },
  },
  {
    id: 6,
    title: "International Opportunities",
    sector: "international",
    icon: "Globe",
    description:
      "Work with global organisations like FAO, CGIAR, WFP, or as an Overseas Farm Manager in Gulf / Southeast Asia. A high-earning, high-impact path that demands strong academic credentials and international exposure.",
    roles: [
      "FAO Associate Professional Officer (APO)",
      "CGIAR / ICRISAT / IRRI Research Scientist",
      "Overseas Farm Manager (UAE, Oman, Australia)",
      "Agricultural Consultant — UN / World Bank Projects",
      "Development Programme Officer (WFP / IFAD)",
      "Agricultural Attaché (Embassy / Trade Mission)",
      "International Agri-business Executive",
    ],
    qualifications: [
      "M.Sc / Ph.D Agriculture from a reputed university",
      "CGIAR Excellence in Breeding / FAO internship for entry",
      "Strong publication record for research roles",
      "Excellent English + preferably one international language (French/Spanish/Arabic)",
      "International fellowship or exchange experience preferred",
    ],
    salaryRange: "$28,000 – $1,20,000 per annum (role & organisation dependent)",
    salaryMilestones: [
      { year: "Entry (0–3 yrs)", role: "Intern / APO / Junior Researcher", salary: "$28,000 – $45,000 p.a." },
      { year: "Mid (3–8 yrs)", role: "Project Officer / Researcher", salary: "$45,000 – $75,000 p.a." },
      { year: "Senior (8–15 yrs)", role: "Senior Programme Officer / Scientist", salary: "$75,000 – $1,00,000 p.a." },
      { year: "Leadership (15+ yrs)", role: "Country Director / Principal Scientist", salary: "$1,00,000 – $1,20,000+ p.a." },
    ],
    growthRating: 5,
    keyExams: ["CGIAR Excellence in Breeding Internship 2026", "ICAR JRF 2026 (pathway to Ph.D for CGIAR roles)", "FAO APO Programme"],
    topEmployers: [
      "FAO (Food & Agriculture Organization)",
      "CGIAR Research Centres (ICRISAT, IRRI, CIMMYT, CIP)",
      "World Food Programme (WFP)",
      "IFAD (International Fund for Agricultural Development)",
      "World Bank Agriculture & Food Practice",
      "Gulf-based Agro-corporations (UAE, Oman, Saudi Arabia)",
    ],
    entryRequirement: "M.Sc Agriculture + Ph.D strongly preferred + international internship / fellowship",
    timeToFirstJob: "2–5 years post-M.Sc (requires Ph.D or significant international exposure)",
    prosAndCons: {
      pros: [
        "Highest-earning path for agriculture graduates — $75k+ at mid-career",
        "Work on global food security challenges across 80+ countries",
        "Tax-free or low-tax salaries in many Gulf / UN postings",
        "Comprehensive benefits: relocation, housing, health, education allowances",
        "Unmatched professional network and publication opportunities",
      ],
      cons: [
        "Requires Ph.D and publications — 8–10 year journey before senior roles",
        "Highly competitive — very few openings, many qualified candidates",
        "Frequent relocation and long periods away from family",
        "Uncertain tenure for project-based UN / CGIAR roles",
      ],
    },
  },
];
