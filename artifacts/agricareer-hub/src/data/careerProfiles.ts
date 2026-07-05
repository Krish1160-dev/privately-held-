export interface SalaryBreakdown {
  entry: string;
  mid: string;
  senior: string;
}

export interface CareerProfile {
  id: number;
  title: string;
  slug: string;
  icon: string;
  tag: "B.Sc Agriculture" | "M.Sc Agronomy" | "Both";
  accentColor: string;
  shortDescription: string;
  description: string;
  eligibility: string[];
  salaryRange: string;
  salaryBreakdown: SalaryBreakdown;
  careerGrowth: string[];
  relevantExams: string[];
  requiredSkills: string[];
  topRecruiters: string[];
  highlights: { label: string; value: string }[];
}

export const careerProfiles: CareerProfile[] = [
  {
    id: 1,
    title: "Agronomist",
    slug: "agronomist",
    icon: "Leaf",
    tag: "Both",
    accentColor: "green",
    shortDescription:
      "Crop scientists who optimise farm production using soil science, crop physiology, and integrated pest management for farmers and agri-businesses.",
    description:
      "Agronomists are the backbone of practical crop science. They advise farmers, agri-input companies, and research institutes on best practices for soil management, irrigation, variety selection, pest control, and post-harvest handling. With precision agriculture and digital farming on the rise, agronomists with GIS and data skills are in high demand across the private sector and government.",
    eligibility: [
      "B.Sc Agriculture from any ICAR-recognised university (for field/industry roles)",
      "M.Sc Agronomy preferred for research, technical advisory, and senior positions",
      "ICAR JRF qualification required for research institute roles",
      "Valid driving licence (for field roles in agri-input companies)",
      "Minimum 60% marks for most private sector positions",
    ],
    salaryRange: "₹3.5L – ₹20L per annum",
    salaryBreakdown: {
      entry: "₹3.5L – ₹6L p.a. (Field Officer / Technical Associate)",
      mid: "₹6L – ₹12L p.a. (Senior Agronomist / Area Manager)",
      senior: "₹12L – ₹22L p.a. (Agronomy Head / Regional Director)",
    },
    careerGrowth: [
      "Field Agronomist / Technical Officer",
      "Senior Agronomist",
      "Area / Territory Agronomy Manager",
      "Regional Head – Agronomy",
      "Director of Agronomy / Crop Science Head",
    ],
    relevantExams: [
      "IBPS AFO CRP SPL XV 2026",
      "TNPSC Combined Agriculture Services 2026",
      "ICAR AICE JRF 2026 (for M.Sc holders targeting research)",
      "UPSC Combined Agricultural Services 2026",
      "SBI Agriculture Domain Officer 2026",
    ],
    requiredSkills: [
      "Crop physiology & growth analysis",
      "Soil science & integrated nutrient management",
      "Integrated pest & disease management (IPM)",
      "GIS & remote sensing basics",
      "Field trial design & data interpretation",
      "Communication & farmer advisory skills",
      "Drone scouting & precision farming tools",
    ],
    topRecruiters: [
      "Coromandel International Ltd.",
      "UPL Ltd.",
      "Bayer CropScience",
      "Syngenta India",
      "Mahyco Seeds",
      "ICAR Institutes",
      "Tamil Nadu Agriculture Department",
      "CropIn Technology Solutions",
    ],
    highlights: [
      { label: "Job Growth", value: "Very High" },
      { label: "Work Type", value: "Field + Office" },
      { label: "Sector", value: "Govt + Private" },
      { label: "Entry Degree", value: "B.Sc Agriculture" },
    ],
  },
  {
    id: 2,
    title: "Agricultural Officer",
    slug: "agricultural-officer",
    icon: "Landmark",
    tag: "B.Sc Agriculture",
    accentColor: "sky",
    shortDescription:
      "Frontline government officers who implement agriculture schemes, provide extension services, and lead rural development at block and district level.",
    description:
      "Agricultural Officers (AOs) are the primary government interface with farmers, implementing state and central schemes such as PM-KISAN, PMFBY, Soil Health Card, and the National Mission for Sustainable Agriculture. They provide technical guidance, conduct demonstrations, monitor crop conditions, and prepare agricultural statistics. Recruited through TNPSC and UPSC competitive exams, these roles offer permanent employment with pension and strong social impact.",
    eligibility: [
      "B.Sc Agriculture from any ICAR-recognised university",
      "Minimum 50% aggregate marks (45% for BC/MBC/SC/ST in TN)",
      "Tamil Nadu nativity certificate mandatory for TN state posts",
      "Proficiency in Tamil language (reading, writing, speaking) — mandatory for TN",
      "Age: 18–32 years (relaxation as per state/central rules)",
      "Clear TNPSC Combined Agriculture Services / UPSC Combined Agri Services exam",
    ],
    salaryRange: "₹35,400 – ₹1,77,500 / month",
    salaryBreakdown: {
      entry: "₹35,400 – ₹45,000/month (Agricultural Officer, Block Level)",
      mid: "₹56,100 – ₹78,800/month (Senior AO / Deputy Director Agriculture)",
      senior: "₹1,00,000 – ₹1,77,500/month (Joint Director / Director of Agriculture)",
    },
    careerGrowth: [
      "Agricultural Officer (Block Level)",
      "Senior Agricultural Officer",
      "Deputy Director of Agriculture (District)",
      "Joint Director of Agriculture (Regional)",
      "Director of Agriculture (State Level)",
    ],
    relevantExams: [
      "TNPSC Combined Agriculture Services 2026 (532 vacancies)",
      "UPSC Combined Agricultural Services 2026 (165 vacancies)",
      "TN Agriculture Department Direct Recruitment 2026",
      "TNPSC Horticultural Officer 2026 (148 vacancies)",
    ],
    requiredSkills: [
      "Tamil language (mandatory for TN state roles)",
      "Knowledge of state & central agriculture schemes",
      "Extension communication methods",
      "Farm record keeping & data reporting",
      "Community mobilisation & farmer interaction",
      "General Knowledge (TN agriculture focus)",
      "Computer basics for e-governance portals",
    ],
    topRecruiters: [
      "Tamil Nadu Agriculture Department",
      "Tamil Nadu Horticulture Department",
      "Directorate of Marketing & Inspection (GoI)",
      "Ministry of Agriculture & Farmer Welfare",
      "State Agriculture Departments (Pan-India via UPSC)",
      "Krishi Vigyan Kendras (KVKs) — ICAR",
    ],
    highlights: [
      { label: "Job Security", value: "Permanent Govt" },
      { label: "Pension", value: "NPS / CPS" },
      { label: "Posting", value: "Rural / Block Level" },
      { label: "Entry Exam", value: "TNPSC / UPSC" },
    ],
  },
  {
    id: 3,
    title: "Assistant Agricultural Officer",
    slug: "assistant-agricultural-officer",
    icon: "UserCheck",
    tag: "B.Sc Agriculture",
    accentColor: "emerald",
    shortDescription:
      "Village-level government agriculture staff who conduct farm visits, demonstrations, and assist farmers in scheme enrollment and technical decisions.",
    description:
      "Assistant Agricultural Officers (AAOs) are the grass-roots face of the Agriculture Department, working at sub-divisional and panchayat levels. They visit farms, monitor crop conditions, conduct field demonstrations of improved varieties and practices, assist farmers in enrolling for government schemes, and maintain village-level agricultural records. It is often the entry-level government post for fresh B.Sc Agriculture graduates before promotion to Agricultural Officer.",
    eligibility: [
      "B.Sc Agriculture from any ICAR-recognised university",
      "Minimum 50% marks (45% for reserved categories in TN)",
      "Tamil Nadu domicile mandatory for TN state posts",
      "Tamil language proficiency essential",
      "Age: 18–32 years",
      "Clear TNPSC Combined Agriculture Services exam or equivalent state exam",
    ],
    salaryRange: "₹29,200 – ₹92,300 / month",
    salaryBreakdown: {
      entry: "₹29,200 – ₹35,000/month (AAO, entry level)",
      mid: "₹38,000 – ₹55,000/month (after increment cycles and DPC)",
      senior: "₹62,000 – ₹92,300/month (promoted to Agricultural Officer grade)",
    },
    careerGrowth: [
      "Assistant Agricultural Officer (Village Level)",
      "Agricultural Officer (Block Level)",
      "Senior Agricultural Officer",
      "Deputy Director Agriculture (District)",
      "Joint Director Agriculture (Region)",
    ],
    relevantExams: [
      "TNPSC Combined Agriculture Services 2026",
      "TN Agriculture Department Direct Recruitment 2026",
      "State Agriculture Department exams (other states)",
      "TNPSC Horticultural Officer 2026",
    ],
    requiredSkills: [
      "Tamil language (mandatory for TN)",
      "Farm visit and inspection skills",
      "Agricultural scheme knowledge (PM-KISAN, PMFBY, SHC)",
      "Basic data entry and record keeping",
      "Farmer mobilisation & group facilitation",
      "Knowledge of common crop pests/diseases of TN",
      "Report writing in Tamil and English",
    ],
    topRecruiters: [
      "Tamil Nadu Agriculture Department",
      "Tamil Nadu Horticulture Department",
      "Tamil Nadu Sericulture Department",
      "State Agriculture Departments (all states)",
      "Directorate of Horticulture (GoI projects)",
    ],
    highlights: [
      { label: "Entry Degree", value: "B.Sc Agriculture" },
      { label: "Work Location", value: "Village / Panchayat" },
      { label: "Job Type", value: "Permanent Govt" },
      { label: "Growth Path", value: "→ Agricultural Officer" },
    ],
  },
  {
    id: 4,
    title: "Scientist",
    slug: "scientist",
    icon: "FlaskConical",
    tag: "M.Sc Agronomy",
    accentColor: "violet",
    shortDescription:
      "Research scientists at ICAR, SAUs, and CGIAR centres working on crop improvement, soil health, and sustainable agriculture for India's food security.",
    description:
      "Scientists at ICAR institutes, State Agriculture Universities (SAUs), and international CGIAR centres drive India's agricultural R&D agenda. They develop new crop varieties, study soil microbiomes, design pest management strategies, and publish in national and international journals. It is a long but deeply rewarding career path requiring a Ph.D and strong publication record. The 7th CPC pay scales make Scientist roles among the best-compensated government positions available to agriculture graduates.",
    eligibility: [
      "Ph.D Agriculture / Agronomy / related discipline — mandatory for Scientist Grade B",
      "M.Sc Agriculture with ICAR JRF / ASRB NET for JRF/SRF positions (entry to research pathway)",
      "ASRB NET (National Eligibility Test) qualification for direct Scientist recruitment",
      "Minimum 60% at PG level (55% for SC/ST)",
      "Strong publication record (2+ NAAS-rated papers preferred for Scientist B)",
      "Age: Up to 32 years for JRF; no upper limit for direct Scientist posts",
    ],
    salaryRange: "₹37,000 stipend → ₹2,20,200/month",
    salaryBreakdown: {
      entry: "₹37,000 – ₹42,000/month stipend (JRF → SRF phase, 0–4 years)",
      mid: "₹56,100 – ₹1,07,700/month (Scientist B → Senior Scientist, 5–12 yrs)",
      senior: "₹1,18,500 – ₹2,20,200/month (Principal Scientist / Director Grade, 12+ yrs)",
    },
    careerGrowth: [
      "Junior Research Fellow (JRF) → Senior Research Fellow (SRF)",
      "Research Associate / Project Scientist",
      "Scientist Grade B",
      "Senior Scientist",
      "Principal Scientist",
      "Director Grade Scientist / Director of ICAR Institute",
    ],
    relevantExams: [
      "ICAR AICE JRF 2026 (Exam: 23 Aug 2026)",
      "DBT JRF 2026 (Exam: 14 Sep 2026)",
      "ASRB NET (Agricultural Scientists Recruitment Board NET — for direct Scientist posts)",
      "TNAU Ph.D Entrance 2026",
      "UPSC (for some ICAR Director positions)",
    ],
    requiredSkills: [
      "Experimental design (RCBD, CRD, factorial experiments)",
      "Statistical analysis (SAS, R, GenStat)",
      "Molecular biology techniques (PCR, gel electrophoresis, DNA extraction)",
      "CRISPR & genomics tools (for modern plant science roles)",
      "Scientific writing and peer-reviewed publication",
      "Grant writing (DBT, ICAR, DST, CGIAR projects)",
      "Bioinformatics basics (BLAST, phylogenetic analysis)",
    ],
    topRecruiters: [
      "ICAR-IARI (New Delhi)",
      "ICAR-NRRI (Rice Research Institute, Cuttack)",
      "ICAR-IGFRI (Jhansi) & ICAR-CIRCOT (Mumbai)",
      "Tamil Nadu Agricultural University (TNAU)",
      "ICRISAT (Hyderabad)",
      "IRRI South Asia Hub",
      "CIMMYT India Office",
      "National Bureau of Plant Genetic Resources (NBPGR)",
    ],
    highlights: [
      { label: "Min. Qualification", value: "Ph.D Agriculture" },
      { label: "Pay Scale", value: "7th CPC Level 10–15" },
      { label: "Research Impact", value: "National Priority" },
      { label: "Timeline to Scientist B", value: "~8–10 years" },
    ],
  },
  {
    id: 5,
    title: "Research Associate",
    slug: "research-associate",
    icon: "Microscope",
    tag: "Both",
    accentColor: "purple",
    shortDescription:
      "Project-based researchers at ICAR, SAUs, and CGIAR centres who conduct field trials, lab experiments, and data analysis — the key stepping stone to a full Scientist career.",
    description:
      "Research Associates (RAs) work on specific funded research projects at agricultural research institutions. They carry out laboratory experiments, manage field trials, collect and analyse data, and contribute to publications. The role is typically project-based (1–3 years), renewable based on funding. It is the most common entry point for M.Sc Agriculture graduates into a research career, with a clear pathway to ICAR Scientist Grade B positions after completing a Ph.D.",
    eligibility: [
      "M.Sc Agriculture / M.Sc Agronomy / related discipline (minimum 60%)",
      "ICAR JRF or ICAR SRF qualification strongly preferred",
      "Ph.D scholars (enrolled or completed) for Research Associate posts",
      "Net/DBT JRF qualification for biotech-oriented RA positions",
      "Age: Not exceeding 35 years (SC/ST/Women +5 years)",
    ],
    salaryRange: "₹37,000 – ₹65,000 / month + HRA",
    salaryBreakdown: {
      entry: "₹37,000/month + HRA (JRF phase — first 2 years)",
      mid: "₹42,000/month + HRA (SRF phase — years 3–4)",
      senior: "₹47,000 – ₹65,000/month + HRA (Research Associate / Project Scientist)",
    },
    careerGrowth: [
      "Junior Research Fellow (JRF)",
      "Senior Research Fellow (SRF)",
      "Research Associate (RA)",
      "Project Scientist / Research Scientist",
      "Scientist Grade B (after Ph.D + ASRB NET)",
    ],
    relevantExams: [
      "ICAR AICE JRF 2026 (entry to research pathway)",
      "DBT JRF 2026 (for biotech/genomics RA positions)",
      "TNAU Ph.D Entrance 2026",
      "CSIR NET Life Sciences",
      "ASRB NET (for Scientist Grade B promotion)",
    ],
    requiredSkills: [
      "Field trial management and crop observation",
      "Laboratory techniques (PCR, ELISA, spectrophotometry)",
      "Statistical analysis (R, SAS, Excel-based tools)",
      "Python basics / R for data analysis",
      "Scientific writing and journal submission",
      "Bioinformatics: BLAST, sequence alignment, databases (NCBI, KEGG)",
      "CRISPR and molecular marker techniques",
    ],
    topRecruiters: [
      "ICAR-IARI, ICAR-NRRI, ICAR-CRIDA",
      "Tamil Nadu Agricultural University (TNAU)",
      "ICRISAT (Patancheru, Hyderabad)",
      "IRRI South Asia Office",
      "Syngenta R&D India",
      "Bayer CropScience Biotech",
      "World Vegetable Center (AVRDC)",
    ],
    highlights: [
      { label: "Stipend (JRF, 2026)", value: "₹37,000 + HRA" },
      { label: "Ph.D Included", value: "Yes (at ICAR/SAUs)" },
      { label: "Project Based", value: "1–4 years, renewable" },
      { label: "Career Output", value: "Scientist B pathway" },
    ],
  },
  {
    id: 6,
    title: "Assistant Professor",
    slug: "assistant-professor",
    icon: "GraduationCap",
    tag: "M.Sc Agronomy",
    accentColor: "blue",
    shortDescription:
      "Academic professionals who teach agriculture students, mentor research scholars, and conduct independent research at SAUs and agricultural colleges.",
    description:
      "Assistant Professors at agricultural universities and colleges combine two core activities: teaching undergraduate and postgraduate students, and conducting independent research to publish and apply for grants. The role offers intellectual freedom, institutional prestige, and excellent compensation under the 7th CPC academic pay scales. A Ph.D is mandatory for most positions, and UGC NET or SLET qualification is required unless exempted by Ph.D regulations.",
    eligibility: [
      "Ph.D Agriculture / Agronomy — mandatory for all university-level posts",
      "UGC NET / ICAR SRF qualification required unless exempted",
      "Minimum 55% at M.Sc level (50% for SC/ST under old AICTE rules)",
      "M.Sc + NET for Junior Lecturer posts at agricultural polytechnics",
      "Research publications (2+ preferred for State Agriculture University posts)",
      "Age: Generally up to 40 years (relaxation for SC/ST/Women/PwD)",
    ],
    salaryRange: "₹57,700 – ₹1,82,400 / month",
    salaryBreakdown: {
      entry: "₹57,700 – ₹68,000/month (Assistant Professor, Academic Level 10–11)",
      mid: "₹79,800 – ₹1,00,000/month (Associate Professor, Academic Level 12–13A)",
      senior: "₹1,31,400 – ₹1,82,400/month (Professor / Senior Professor, Level 14–15)",
    },
    careerGrowth: [
      "Assistant Professor (Academic Level 10)",
      "Assistant Professor (Sr. Scale / Level 11)",
      "Associate Professor (Academic Level 13A)",
      "Professor (Academic Level 14)",
      "Head of Department",
      "Dean of Faculty / Vice Chancellor",
    ],
    relevantExams: [
      "UGC NET (Agricultural Sciences / Life Sciences)",
      "ICAR SRF / ASRB NET",
      "SLET (State Level Eligibility Test for state university posts)",
      "TNPSC Agricultural Engineering Lecturer (for polytechnics)",
      "TNAU Faculty Recruitment (direct application)",
    ],
    requiredSkills: [
      "Deep subject expertise in Agronomy / Crop Science",
      "Teaching pedagogy and curriculum design",
      "Research supervision for M.Sc and Ph.D students",
      "Grant application writing (ICAR, DBT, DST, SERB)",
      "Publication in NAAS-rated and international journals",
      "Statistical analysis for research (R, SAS, SPSS)",
      "E-learning and LMS platform proficiency",
    ],
    topRecruiters: [
      "Tamil Nadu Agricultural University (TNAU) — Coimbatore",
      "Acharya N.G. Ranga Agricultural University (ANGRAU) — Guntur",
      "UAS Dharwad / UAS Raichur",
      "Punjab Agricultural University (PAU) — Ludhiana",
      "ICAR Deemed Universities (IARI, NDRI, IVRI)",
      "Sam Higginbottom University (SHUATS) — Prayagraj",
      "Private agricultural colleges (KSR, Periyar Maniammai)",
    ],
    highlights: [
      { label: "Min. Qualification", value: "Ph.D + NET/SLET" },
      { label: "Pay Scale", value: "7th CPC Academic Levels" },
      { label: "Pension", value: "CPS / Defined Benefit" },
      { label: "Work-Life Balance", value: "Excellent" },
    ],
  },
  {
    id: 7,
    title: "Agriculture Extension Officer",
    slug: "agriculture-extension-officer",
    icon: "Megaphone",
    tag: "B.Sc Agriculture",
    accentColor: "teal",
    shortDescription:
      "Grassroots agriculture communicators who bridge the gap between research institutions and farming communities through training, demonstrations, and scheme facilitation.",
    description:
      "Agriculture Extension Officers (AEOs) are the communication backbone of India's agricultural system. They work through KVKs, ATMA, state departments, and NGOs to bring improved crop varieties, practices, and technologies to farmers. Their tools include farm demonstrations, farmer field schools, Kisan Melas, and now digital platforms and WhatsApp advisory groups. AEOs are increasingly required to manage FPOs and facilitate linkages with input companies and markets.",
    eligibility: [
      "B.Sc Agriculture from any ICAR-recognised university",
      "Minimum 50% marks (45% for reserved categories in TN)",
      "Tamil language proficiency (spoken, written) — mandatory for TN state posts",
      "Tamil Nadu domicile required for TN state-level posts",
      "Age: 18–32 years (relaxation as per norms)",
      "Clear TNPSC Combined Agriculture Services exam or ICAR KVK selection process",
    ],
    salaryRange: "₹29,200 – ₹92,300 / month",
    salaryBreakdown: {
      entry: "₹29,200 – ₹35,000/month (AEO, entry level / KVK SMS-entry)",
      mid: "₹38,000 – ₹55,000/month (Senior AEO / Block Technology Manager)",
      senior: "₹62,000 – ₹92,300/month (District Extension Officer / State Extension Head)",
    },
    careerGrowth: [
      "Agriculture Extension Officer (Village / Panchayat Level)",
      "Senior Extension Officer / Subject Matter Specialist (KVK)",
      "Block Technology Manager (ATMA)",
      "District Agriculture Extension Officer",
      "State Extension Programme Coordinator",
    ],
    relevantExams: [
      "TNPSC Combined Agriculture Services 2026",
      "TN Agriculture Department Direct Recruitment 2026",
      "ICAR KVK Subject Matter Specialist (SMS) Recruitment",
      "ATMA (Agricultural Technology Management Agency) Selection",
      "TNPSC Horticultural Officer 2026",
    ],
    requiredSkills: [
      "Tamil language communication (mandatory for TN)",
      "Training and workshop facilitation",
      "Farm demonstration design and delivery",
      "ICT tools for agriculture (mKisan, digital advisory apps)",
      "FPO and SHG formation and facilitation",
      "Knowledge of all central & state agri schemes",
      "Video/audio content creation for farmer outreach",
      "Basic data entry and report writing",
    ],
    topRecruiters: [
      "ICAR Krishi Vigyan Kendras (KVKs) — 30+ in Tamil Nadu",
      "Tamil Nadu Agriculture Department",
      "ATMA (Agricultural Technology Management Agency)",
      "National Institute of Agricultural Extension Management (MANAGE)",
      "DHAN Foundation",
      "M.S. Swaminathan Research Foundation (MSSRF)",
      "Agri-NGOs (Keystone Foundation, PRADAN)",
    ],
    highlights: [
      { label: "Work Style", value: "Field-intensive" },
      { label: "Primary Skill", value: "Communication" },
      { label: "Impact", value: "Direct Farmer Contact" },
      { label: "Entry Degree", value: "B.Sc Agriculture" },
    ],
  },
];
