export interface ExamPattern {
  mode: string;
  duration: string;
  totalMarks: number;
  sections: { name: string; questions: number; marks: number }[];
  negativeMarking: string;
  medium: string;
}

export interface SyllabusSection {
  subject: string;
  topics: string[];
}

export interface ApplicationStep {
  step: number;
  title: string;
  description: string;
}

export interface Exam {
  id: number;
  name: string;
  shortName: string;
  conductingBody: string;
  level: "state" | "national";
  status: "upcoming" | "open" | "results";
  notificationDate: string;
  applicationDeadline: string;
  examDate: string;
  resultDate: string;
  eligibility: string;
  eligibilityDetails: string[];
  ageLimit: string;
  description: string;
  vacancies?: number;
  category: "entrance" | "recruitment" | "fellowship" | "banking";
  officialWebsite: string;
  applicationFee: string;
  examPattern: ExamPattern;
  syllabus: SyllabusSection[];
  applicationProcess: ApplicationStep[];
  notificationPdf?: string;
}

export const exams: Exam[] = [
  {
    id: 1,
    name: "TNPSC Agricultural Officer Recruitment 2025",
    shortName: "TNPSC AO",
    conductingBody: "Tamil Nadu Public Service Commission",
    level: "state",
    status: "open",
    notificationDate: "1 Apr 2025",
    applicationDeadline: "5 Jul 2025",
    examDate: "10 Aug 2025",
    resultDate: "Oct 2025 (expected)",
    eligibility: "B.Sc Agriculture from a recognized university",
    eligibilityDetails: [
      "Must hold a B.Sc Agriculture degree from any ICAR-recognised university",
      "Minimum 50% aggregate marks for General category; 45% for BC/MBC/SC/ST",
      "Must be a citizen of India",
      "Tamil Nadu nativity certificate required for some posts",
    ],
    ageLimit: "18 – 32 years (relaxation: BC/MBC +3 yrs, SC/ST +5 yrs, PwD +10 yrs)",
    description: "Recruitment to Agricultural Officer posts in Tamil Nadu Agriculture Department. Officers work at block level providing extension services to farmers.",
    vacancies: 240,
    category: "recruitment",
    officialWebsite: "tnpsc.gov.in",
    applicationFee: "₹150 (General) / ₹0 (SC/ST/PwD)",
    examPattern: {
      mode: "Offline (OMR-based)",
      duration: "3 hours",
      totalMarks: 300,
      sections: [
        { name: "Agriculture & Allied Sciences", questions: 150, marks: 150 },
        { name: "General Tamil / English", questions: 75, marks: 75 },
        { name: "General Knowledge & Current Affairs", questions: 75, marks: 75 },
      ],
      negativeMarking: "1/3 mark deducted for each wrong answer",
      medium: "Tamil & English",
    },
    syllabus: [
      {
        subject: "Agronomy & Crop Production",
        topics: ["Kharif & Rabi crops of TN", "Cropping systems", "Seed technology", "Irrigation management", "Organic farming"],
      },
      {
        subject: "Soil Science & Fertilizers",
        topics: ["Soil classification", "Soil fertility & testing", "Fertilizer recommendations", "Integrated Nutrient Management", "Micronutrients"],
      },
      {
        subject: "Plant Protection",
        topics: ["Major pests of rice, cotton, pulses", "Diseases and their management", "Bio-pesticides", "IPM principles", "Pesticide safety"],
      },
      {
        subject: "Agricultural Extension & Rural Development",
        topics: ["Extension methods", "KVK functions", "Government schemes (PM-KISAN, PMFBY)", "FPO formation", "Rural credit institutions"],
      },
      {
        subject: "General Knowledge",
        topics: ["Tamil Nadu geography & economy", "Indian agriculture policy", "Current affairs", "Science & technology"],
      },
    ],
    applicationProcess: [
      { step: 1, title: "Register on TNPSC Portal", description: "Create a one-time registration on www.tnpsc.gov.in using your mobile number and email ID. Keep your Aadhaar and community certificate ready." },
      { step: 2, title: "Fill the Application Form", description: "Log in and select 'Agricultural Officer Recruitment 2025'. Fill personal details, educational qualifications, and community status accurately." },
      { step: 3, title: "Upload Documents", description: "Upload scanned copies of passport photo (20–50 KB, JPG), signature (10–20 KB, JPG), and community certificate if applicable." },
      { step: 4, title: "Pay Application Fee", description: "Pay ₹150 online via Net Banking, UPI, or Debit/Credit Card. SC/ST and PwD candidates are exempt. Keep the payment receipt." },
      { step: 5, title: "Submit & Download Confirmation", description: "Review all entries and submit. Download the filled application form PDF for future reference." },
    ],
    notificationPdf: "#",
  },
  {
    id: 2,
    name: "TNAU PG Entrance Examination 2025",
    shortName: "TNAU PG",
    conductingBody: "Tamil Nadu Agricultural University",
    level: "state",
    status: "open",
    notificationDate: "20 Mar 2025",
    applicationDeadline: "15 Jun 2025",
    examDate: "20 Jul 2025",
    resultDate: "Aug 2025 (expected)",
    eligibility: "B.Sc Agriculture / B.Sc Horticulture with min 60% marks",
    eligibilityDetails: [
      "B.Sc Agriculture or B.Sc Horticulture from ICAR-recognised university with min 60%",
      "Students appearing in final-year examinations may also apply provisionally",
      "Candidates from other states must secure minimum 65% marks",
      "NRI/Foreign national quota seats available with different eligibility norms",
    ],
    ageLimit: "No upper age limit",
    description: "Entrance test for M.Sc, M.Tech, MBA Agribusiness, and Ph.D programmes at TNAU Coimbatore and its constituent colleges.",
    vacancies: 320,
    category: "entrance",
    officialWebsite: "tnau.ac.in",
    applicationFee: "₹1,000 (General) / ₹750 (SC/ST)",
    examPattern: {
      mode: "Online (Computer-Based Test)",
      duration: "2 hours",
      totalMarks: 100,
      sections: [
        { name: "Core Agriculture / Horticulture", questions: 70, marks: 70 },
        { name: "Logical Reasoning & Aptitude", questions: 20, marks: 20 },
        { name: "English Language", questions: 10, marks: 10 },
      ],
      negativeMarking: "No negative marking",
      medium: "English only",
    },
    syllabus: [
      {
        subject: "Crop Production & Agronomy",
        topics: ["Field crop production", "Cropping systems", "Water management", "Weed management", "Post-harvest technology"],
      },
      {
        subject: "Plant Breeding & Genetics",
        topics: ["Mendelian genetics", "Quantitative genetics", "Hybridisation techniques", "Plant variety protection", "Biotechnology basics"],
      },
      {
        subject: "Soil Science",
        topics: ["Soil formation & classification", "Soil physical & chemical properties", "Nutrient cycling", "Land capability classification"],
      },
      {
        subject: "Agricultural Economics",
        topics: ["Farm management", "Agricultural marketing", "Price policy", "Cooperative farming", "Agricultural finance"],
      },
    ],
    applicationProcess: [
      { step: 1, title: "Apply at TNAU Admissions Portal", description: "Visit admissions.tnau.ac.in and create a new applicant account using your email and phone number." },
      { step: 2, title: "Select Programme", description: "Choose your preferred PG programme (M.Sc / M.Tech / MBA) and specialization from the dropdown." },
      { step: 3, title: "Fill Academic Details", description: "Enter your UG marks, university name, and year of passing. Candidates in final year should enter marks up to 5th semester." },
      { step: 4, title: "Pay Fee & Submit", description: "Pay ₹1,000 via online payment. Download the confirmation slip and preserve it for admit card verification." },
    ],
    notificationPdf: "#",
  },
  {
    id: 3,
    name: "Tamil Nadu Block-Level Agricultural Officer 2025",
    shortName: "TN Block AO",
    conductingBody: "Tamil Nadu Agriculture Department",
    level: "state",
    status: "upcoming",
    notificationDate: "10 May 2025",
    applicationDeadline: "25 Jun 2025",
    examDate: "5 Aug 2025",
    resultDate: "Sep 2025 (expected)",
    eligibility: "B.Sc Agriculture (Tamil Nadu domicile required)",
    eligibilityDetails: [
      "B.Sc Agriculture from any ICAR-recognised university",
      "Domicile of Tamil Nadu mandatory — nativity certificate required",
      "Minimum 50% aggregate marks",
      "Knowledge of Tamil (reading & writing) is mandatory",
    ],
    ageLimit: "18 – 30 years",
    description: "Block-level Agricultural Officer posts for frontline extension work. Officers implement state schemes, conduct farm demonstrations, and support FPOs.",
    vacancies: 412,
    category: "recruitment",
    officialWebsite: "tn.gov.in/agriculture",
    applicationFee: "₹100 (General) / ₹0 (SC/ST)",
    examPattern: {
      mode: "Offline (OMR-based)",
      duration: "2.5 hours",
      totalMarks: 200,
      sections: [
        { name: "Agriculture (Core)", questions: 100, marks: 100 },
        { name: "Tamil Language & Comprehension", questions: 50, marks: 50 },
        { name: "General Knowledge (TN Focus)", questions: 50, marks: 50 },
      ],
      negativeMarking: "No negative marking",
      medium: "Tamil & English",
    },
    syllabus: [
      {
        subject: "Crop Science",
        topics: ["Rice, millets, pulses, oilseeds cultivation", "Hybrid seed production", "Organic farming methods", "Protected cultivation"],
      },
      {
        subject: "Soil & Water Conservation",
        topics: ["Watershed management", "Drip & sprinkler irrigation", "Soil health card scheme", "Water harvesting structures"],
      },
      {
        subject: "Agricultural Schemes",
        topics: ["PM-KISAN", "PMFBY crop insurance", "Kisan Credit Card", "Tamil Nadu state schemes", "FPO promotion"],
      },
      {
        subject: "Tamil Language",
        topics: ["Tamil grammar basics", "Comprehension passages", "Official Tamil terminology in agriculture", "Letter writing"],
      },
    ],
    applicationProcess: [
      { step: 1, title: "Download Notification", description: "Download the official notification PDF from tn.gov.in/agriculture to verify eligibility and post details." },
      { step: 2, title: "Apply via TN e-Service Portal", description: "Visit tnreginet.gov.in or the Agriculture Department portal to fill the online form." },
      { step: 3, title: "Upload Nativity Certificate", description: "Upload nativity / domicile certificate along with educational documents. This is mandatory for all applicants." },
      { step: 4, title: "Pay & Confirm", description: "Pay ₹100 via Challan or online. Submit the form and note your application reference number." },
    ],
    notificationPdf: "#",
  },
  {
    id: 4,
    name: "TNPSC Horticultural Officer 2025",
    shortName: "TNPSC HO",
    conductingBody: "Tamil Nadu Public Service Commission",
    level: "state",
    status: "upcoming",
    notificationDate: "15 May 2025",
    applicationDeadline: "10 Jul 2025",
    examDate: "20 Sep 2025",
    resultDate: "Nov 2025 (expected)",
    eligibility: "B.Sc Horticulture / B.Sc Agriculture with Horticulture as main subject",
    eligibilityDetails: [
      "B.Sc Horticulture or B.Sc Agriculture (Horticulture major) from recognised university",
      "Minimum 50% marks (45% for BC/MBC/SC/ST)",
      "Tamil Nadu permanent resident",
    ],
    ageLimit: "18 – 32 years",
    description: "Recruitment to Horticultural Officer Grade II posts under TN Horticulture Department. Covers fruit, vegetable, and flower crop extension.",
    vacancies: 120,
    category: "recruitment",
    officialWebsite: "tnpsc.gov.in",
    applicationFee: "₹150 (General) / ₹0 (SC/ST/PwD)",
    examPattern: {
      mode: "Offline (OMR-based)",
      duration: "3 hours",
      totalMarks: 300,
      sections: [
        { name: "Horticulture & Allied Sciences", questions: 150, marks: 150 },
        { name: "General Tamil / English", questions: 75, marks: 75 },
        { name: "General Knowledge", questions: 75, marks: 75 },
      ],
      negativeMarking: "1/3 mark deducted for wrong answers",
      medium: "Tamil & English",
    },
    syllabus: [
      {
        subject: "Fruit & Vegetable Production",
        topics: ["Mango, banana, guava cultivation", "Tomato, brinjal, onion production", "Nursery management", "Post-harvest handling of produce"],
      },
      {
        subject: "Floriculture & Landscaping",
        topics: ["Commercial flower crops", "Cut flower technology", "Landscape design principles", "Turf management"],
      },
      {
        subject: "Protected Cultivation",
        topics: ["Greenhouse & polyhouse structures", "Hydroponics basics", "Shade-net cultivation", "High-value vegetable crops"],
      },
      {
        subject: "Horticulture Schemes",
        topics: ["National Horticulture Mission", "TN Horticulture Development Agency schemes", "MIDH components", "Cold chain subsidy"],
      },
    ],
    applicationProcess: [
      { step: 1, title: "Register on TNPSC One-Time Registration", description: "Complete OTR at tnpsc.gov.in if not already done. OTR is valid for life and mandatory for all TNPSC exams." },
      { step: 2, title: "Apply for Horticultural Officer Post", description: "Log in to TNPSC portal and select the HO 2025 notification. Verify your OTR data and update if needed." },
      { step: 3, title: "Upload Photo & Signature", description: "Ensure passport photo is recent (within 6 months). Signature must match exactly with government ID." },
      { step: 4, title: "Pay Fee & Submit", description: "Pay ₹150 online via TNPSC payment gateway. SC/ST candidates need to upload community certificate for fee waiver." },
    ],
    notificationPdf: "#",
  },
  {
    id: 5,
    name: "ICAR Junior Research Fellowship 2025",
    shortName: "ICAR JRF",
    conductingBody: "Indian Council of Agricultural Research",
    level: "national",
    status: "upcoming",
    notificationDate: "5 Apr 2025",
    applicationDeadline: "30 Jun 2025",
    examDate: "24 Aug 2025",
    resultDate: "Oct 2025 (expected)",
    eligibility: "B.Sc Agriculture / related with min 55% (50% for SC/ST/PwD)",
    eligibilityDetails: [
      "B.Sc Agriculture, B.Sc Horticulture, B.Sc Forestry, B.V.Sc, or B.F.Sc with 55%",
      "50% marks for SC/ST/PwD candidates",
      "Candidates in final year of qualifying degree may apply",
      "No age restriction mentioned for JRF; SRF requires max 35 years",
    ],
    ageLimit: "Up to 25 years for JRF (relaxation: SC/ST/PwD/women +5 years)",
    description: "Junior Research Fellowship for admission to Ph.D at ICAR institutes. Qualified candidates receive ₹31,000/month stipend and SRF upgrade after 2 years.",
    vacancies: 1200,
    category: "fellowship",
    officialWebsite: "icar.org.in",
    applicationFee: "₹500 (General/OBC) / ₹250 (SC/ST/PwD/Women)",
    examPattern: {
      mode: "Online (Computer-Based Test)",
      duration: "2.5 hours",
      totalMarks: 150,
      sections: [
        { name: "General Agriculture (Compulsory)", questions: 60, marks: 60 },
        { name: "Subject-Specific Paper (from 17 choices)", questions: 60, marks: 60 },
        { name: "General Aptitude / Reasoning", questions: 30, marks: 30 },
      ],
      negativeMarking: "0.25 mark deducted per wrong answer",
      medium: "English only",
    },
    syllabus: [
      {
        subject: "General Agriculture",
        topics: ["Indian agriculture — overview", "Green Revolution & beyond", "Crop improvement history", "Agricultural research institutions", "Important government schemes"],
      },
      {
        subject: "Agronomy (Subject Paper)",
        topics: ["Crop physiology & growth analysis", "Cropping systems & sequences", "Precision farming", "Climate-smart agriculture", "Resource-use efficiency"],
      },
      {
        subject: "Plant Pathology",
        topics: ["Fungal, bacterial, viral diseases", "Koch's postulates", "Seed-borne diseases", "Biological control", "Disease forecasting"],
      },
      {
        subject: "Agricultural Biotechnology",
        topics: ["Recombinant DNA technology", "Transgenic crops — Bt cotton", "Molecular markers", "Tissue culture", "Bioinformatics basics"],
      },
    ],
    applicationProcess: [
      { step: 1, title: "Apply at ICAR-AICE Portal", description: "Visit aice.icar.gov.in and register as a new user. Enter basic details and get login credentials via email." },
      { step: 2, title: "Choose Subject Paper", description: "Select your subject paper from 17 available disciplines (Agronomy, Plant Pathology, Soil Science, etc.) based on your specialization." },
      { step: 3, title: "Fill Academic & Personal Details", description: "Enter your UG marks, institution details, and upload supporting documents including degree certificate and community certificate." },
      { step: 4, title: "Pay Fee Online", description: "Pay ₹500 (General/OBC) or ₹250 (SC/ST/PwD/Women) via Debit Card, Credit Card, or Net Banking." },
      { step: 5, title: "Print Confirmation", description: "Save and print your application confirmation. Admit card will be released 10 days before exam date on the same portal." },
    ],
    notificationPdf: "#",
  },
  {
    id: 6,
    name: "UPSC Combined Agricultural Services 2025",
    shortName: "UPSC AO",
    conductingBody: "Union Public Service Commission",
    level: "national",
    status: "upcoming",
    notificationDate: "12 Feb 2025",
    applicationDeadline: "10 Jul 2025",
    examDate: "15 Sep 2025",
    resultDate: "Dec 2025 (expected)",
    eligibility: "B.Sc Agriculture from any recognised university",
    eligibilityDetails: [
      "Bachelor's degree in Agriculture from a central/state university recognised by UGC",
      "Must be a citizen of India",
      "Should meet the physical fitness standards prescribed by the Ministry",
      "No minimum percentage required at graduation level",
    ],
    ageLimit: "21 – 30 years (OBC: +3 yrs; SC/ST: +5 yrs; PwD: +10 yrs; Ex-servicemen: as per rules)",
    description: "Group A gazetted posts: Agricultural Marketing Specialist, Extension Officer, Subject Matter Specialist, and Assistant Director Agriculture under GoI.",
    vacancies: 156,
    category: "recruitment",
    officialWebsite: "upsc.gov.in",
    applicationFee: "₹25 (General/OBC) / ₹0 (Women/SC/ST/PwD)",
    examPattern: {
      mode: "Offline written exam + Interview",
      duration: "3 hours per paper",
      totalMarks: 500,
      sections: [
        { name: "Paper I — General Agriculture", questions: 0, marks: 200 },
        { name: "Paper II — Agriculture Specialisation", questions: 0, marks: 200 },
        { name: "Interview / Personality Test", questions: 0, marks: 100 },
      ],
      negativeMarking: "1/3 mark deducted for wrong answers",
      medium: "English & Hindi",
    },
    syllabus: [
      {
        subject: "Ecology & Climate Change",
        topics: ["Agro-ecosystems", "Climate change & agriculture", "Carbon sequestration", "Sustainable agriculture", "Natural resource management"],
      },
      {
        subject: "Agricultural Engineering",
        topics: ["Farm machinery & mechanization", "Irrigation & drainage engineering", "Post-harvest engineering", "Rural electrification", "Renewable energy in agriculture"],
      },
      {
        subject: "Animal Husbandry",
        topics: ["Dairy development", "Poultry farming", "Fisheries management", "Livestock insurance", "Feed & fodder production"],
      },
      {
        subject: "Agricultural Economics & Policy",
        topics: ["WTO & Indian agriculture", "Food security", "MSP policy", "Agricultural credit & insurance", "International trade in commodities"],
      },
    ],
    applicationProcess: [
      { step: 1, title: "Register at UPSCONLINE", description: "Visit upsconline.nic.in and register as a new user. Complete One-Time Registration (OTR) under the new UPSC system." },
      { step: 2, title: "Submit Application Part I", description: "Fill Part I with personal details, contact information, and choose your examination centre preferences." },
      { step: 3, title: "Submit Application Part II", description: "Fill Part II with educational qualifications, upload photo and signature. Review carefully before submitting." },
      { step: 4, title: "Pay Fee via SBI Challan or Online", description: "Pay ₹25 via SBI challan or online payment. Women, SC/ST, and PwD candidates are exempt from fee." },
      { step: 5, title: "Download Application PDF", description: "Save the submitted application as PDF. Admit card will be available 3 weeks before exam on UPSC website." },
    ],
    notificationPdf: "#",
  },
  {
    id: 7,
    name: "NABARD Development Assistant Grade A 2025",
    shortName: "NABARD Grade A",
    conductingBody: "National Bank for Agriculture and Rural Development",
    level: "national",
    status: "results",
    notificationDate: "15 Jan 2025",
    applicationDeadline: "Closed",
    examDate: "12 Apr 2025",
    resultDate: "Phase II interviews: Jun 2025",
    eligibility: "B.Sc Agriculture / MBA Agribusiness / B.E. Agricultural Engineering",
    eligibilityDetails: [
      "Bachelor's degree in Agriculture / Horticulture / Veterinary Science / Forestry",
      "MBA in Agribusiness from reputed institution also eligible",
      "B.E./B.Tech in Agricultural Engineering accepted",
      "Minimum 60% marks in graduation (55% for SC/ST)",
    ],
    ageLimit: "21 – 30 years (relaxation applicable per RBI guidelines)",
    description: "Officer-level recruitment in NABARD's development, rural financing, and inspection divisions. Phase II interviews currently underway.",
    vacancies: 170,
    category: "banking",
    officialWebsite: "nabard.org",
    applicationFee: "₹800 (General/OBC) / ₹150 (SC/ST/PwD)",
    examPattern: {
      mode: "Online CBT (Phase I) + Descriptive + Interview (Phase II)",
      duration: "Phase I: 2 hours | Phase II: 1.5 hours + Interview",
      totalMarks: 200,
      sections: [
        { name: "Reasoning & Quantitative Aptitude", questions: 40, marks: 40 },
        { name: "English Language", questions: 40, marks: 40 },
        { name: "General Awareness & Agriculture", questions: 40, marks: 40 },
        { name: "Economic & Social Issues + Agriculture", questions: 0, marks: 80 },
      ],
      negativeMarking: "0.25 mark per wrong answer in Phase I",
      medium: "English only",
    },
    syllabus: [
      {
        subject: "Economic & Social Issues",
        topics: ["Indian economy overview", "Rural development programmes", "Financial inclusion", "Micro-finance & SHGs", "Climate change impacts"],
      },
      {
        subject: "Agriculture & Rural Development",
        topics: ["Agricultural credit flow", "KCC scheme", "NABARD's role in rural development", "Watershed development", "FPO & cooperatives"],
      },
      {
        subject: "Reasoning & Quantitative Aptitude",
        topics: ["Data interpretation", "Logical reasoning", "Number series", "Inequalities", "Blood relations"],
      },
    ],
    applicationProcess: [
      { step: 1, title: "Application Closed", description: "The application window for NABARD Grade A 2025 has closed. Phase I exam was conducted on 12 April 2025. Phase II interview schedule has been released." },
      { step: 2, title: "Check Phase II Schedule", description: "Visit nabard.org/careers to check your Phase II interview date. Interviews are being conducted at Mumbai, Chennai, and Bhopal centres." },
      { step: 3, title: "Document Verification", description: "Carry original documents including degree certificate, mark sheets, community certificate, and valid photo ID to the interview venue." },
    ],
    notificationPdf: "#",
  },
  {
    id: 8,
    name: "IBPS Agriculture Field Officer 2025",
    shortName: "IBPS AFO",
    conductingBody: "Institute of Banking Personnel Selection",
    level: "national",
    status: "upcoming",
    notificationDate: "20 May 2025",
    applicationDeadline: "15 Jul 2025",
    examDate: "28 Sep 2025",
    resultDate: "Dec 2025 (expected)",
    eligibility: "B.Sc Agriculture / Horticulture / B.Tech Agricultural Engineering",
    eligibilityDetails: [
      "B.Sc Agriculture, B.Sc Horticulture, B.Sc Forestry, B.V.Sc or B.Tech Agri Engineering",
      "Degree from University incorporated by an Act of the Central or State Legislature",
      "Minimum 60% marks for General/EWS; 55% for SC/ST/PwD/OBC (Non-Creamy)",
      "Proficiency in official language of the State/UT applied for is desirable",
    ],
    ageLimit: "20 – 30 years (OBC: +3 yrs; SC/ST: +5 yrs; PwD: +10 yrs)",
    description: "Specialist Officer recruitment for AFO posts across 11 public sector banks. Officers handle agricultural loan appraisal, KCC, and rural banking.",
    vacancies: 900,
    category: "banking",
    officialWebsite: "ibps.in",
    applicationFee: "₹850 (General/EWS/OBC) / ₹175 (SC/ST/PwD)",
    examPattern: {
      mode: "Online CBT (Prelims + Mains) + Interview",
      duration: "Prelims: 1 hour | Mains: 2 hours",
      totalMarks: 200,
      sections: [
        { name: "English Language", questions: 50, marks: 25 },
        { name: "Reasoning", questions: 50, marks: 25 },
        { name: "Professional Knowledge (Agriculture)", questions: 60, marks: 60 },
        { name: "Quantitative Aptitude & DI", questions: 40, marks: 40 },
      ],
      negativeMarking: "0.25 marks deducted per wrong answer",
      medium: "English & Hindi",
    },
    syllabus: [
      {
        subject: "Professional Knowledge — Core Agriculture",
        topics: ["Crop production technology", "Soil science & fertilizers", "Irrigation methods", "Plant protection", "Seed technology & variety development"],
      },
      {
        subject: "Agricultural Finance & Banking",
        topics: ["Types of agricultural loans", "Kisan Credit Card features", "SARFAESI Act basics", "Priority sector lending norms", "Lead Bank scheme"],
      },
      {
        subject: "Government Schemes",
        topics: ["PM-KISAN, PMFBY, RKVY", "Soil Health Card", "e-NAM platform", "Paramparagat Krishi Vikas Yojana", "National Mission for Sustainable Agriculture"],
      },
    ],
    applicationProcess: [
      { step: 1, title: "Apply at ibps.in", description: "Visit www.ibps.in and navigate to 'CRP SPL XIV' (AFO 2025 notification). Register as a new user with a valid email and mobile number." },
      { step: 2, title: "Select Bank Preferences", description: "Choose up to 3 participating banks in order of preference. Bank allotment is based on your merit rank and bank-wise vacancy." },
      { step: 3, title: "Fill Application & Upload Documents", description: "Enter academic details and upload photo (4.5×3.5 cm, JPG, 20–50 KB) and signature (3.5×1.5 cm, JPG, 10–20 KB)." },
      { step: 4, title: "Pay Fee & Download Form", description: "Pay ₹850 online (SC/ST/PwD: ₹175). Download filled form and payment receipt for future correspondence." },
    ],
    notificationPdf: "#",
  },
  {
    id: 9,
    name: "SBI Agriculture Officer Specialist 2025",
    shortName: "SBI AO",
    conductingBody: "State Bank of India",
    level: "national",
    status: "upcoming",
    notificationDate: "10 Jun 2025",
    applicationDeadline: "30 Jul 2025",
    examDate: "20 Oct 2025",
    resultDate: "Jan 2026 (expected)",
    eligibility: "B.Sc Agriculture / M.Sc Agronomy / Agribusiness MBA",
    eligibilityDetails: [
      "B.Sc Agriculture or B.Sc Horticulture with min 60%",
      "M.Sc in Agronomy, Soil Science, or related field with min 60%",
      "MBA Agribusiness from reputed institution",
      "Post-graduate degree holders preferred for scale II posts",
    ],
    ageLimit: "21 – 35 years",
    description: "Agriculture Domain Officer posts for SBI's rural and agricultural banking verticals. Officers assess crop loans, KCC, and agri-MSME proposals.",
    vacancies: 426,
    category: "banking",
    officialWebsite: "sbi.co.in",
    applicationFee: "₹750 (General/EWS/OBC) / ₹0 (SC/ST/PwD)",
    examPattern: {
      mode: "Online Written Test + Group Exercise + Interview",
      duration: "Written: 2.5 hours",
      totalMarks: 250,
      sections: [
        { name: "Agriculture Domain Knowledge", questions: 50, marks: 100 },
        { name: "Analytical Aptitude & DI", questions: 35, marks: 35 },
        { name: "English Language", questions: 35, marks: 35 },
        { name: "Group Exercise + Interview", questions: 0, marks: 80 },
      ],
      negativeMarking: "0.25 mark per wrong MCQ answer",
      medium: "English only",
    },
    syllabus: [
      {
        subject: "Agriculture Domain",
        topics: ["Crop loan appraisal", "KCC norms & documentation", "PMFBY implementation", "Agricultural value chains", "Agri-MSME financing"],
      },
      {
        subject: "Rural Economy & Policy",
        topics: ["Rural credit institutions", "NABARD refinance", "Priority sector lending", "Financial inclusion in rural India", "SHG-Bank linkage programme"],
      },
    ],
    applicationProcess: [
      { step: 1, title: "Visit SBI Careers Portal", description: "Go to bank.sbi/careers or sbi.co.in/careers. Find the 'Specialist Cadre Officers' notification and click Apply Online." },
      { step: 2, title: "Fill Online Form", description: "Enter personal details, academic background, and work experience. Ensure all information matches your certificates exactly." },
      { step: 3, title: "Upload Photo & Signature", description: "Upload a recent colour photograph (200×230 pixels, JPG, max 50 KB) and signature (140×60 pixels, JPG, max 20 KB)." },
      { step: 4, title: "Pay Application Fee", description: "General/EWS/OBC candidates pay ₹750. SC/ST/PwD candidates are exempt. Payment via online mode only." },
      { step: 5, title: "Submit & Print", description: "Review all entries, submit, and print the system-generated e-receipt. No physical submission of form required at this stage." },
    ],
    notificationPdf: "#",
  },
  {
    id: 10,
    name: "CSIR-IARI Technician Recruitment 2025",
    shortName: "IARI Technician",
    conductingBody: "Indian Agricultural Research Institute",
    level: "national",
    status: "upcoming",
    notificationDate: "22 Apr 2025",
    applicationDeadline: "20 Jul 2025",
    examDate: "22 Sep 2025",
    resultDate: "Nov 2025 (expected)",
    eligibility: "B.Sc Agriculture / B.Sc Life Sciences (min 55%)",
    eligibilityDetails: [
      "B.Sc Agriculture, B.Sc Botany, B.Sc Zoology, or B.Sc Biochemistry with min 55%",
      "Diploma in Agricultural Sciences (3-year) may be considered for T-1 posts",
      "Working knowledge of basic lab instruments required",
    ],
    ageLimit: "18 – 28 years (SC/ST: +5 yrs; OBC: +3 yrs; PwD: +10 yrs; Ex-SM: as per rules)",
    description: "Technical support positions at IARI New Delhi — field trial maintenance, soil lab, seed storage, and crop protection units.",
    vacancies: 89,
    category: "recruitment",
    officialWebsite: "iari.res.in",
    applicationFee: "₹500 (General/OBC/EWS) / ₹0 (SC/ST/PwD/Women)",
    examPattern: {
      mode: "Online CBT + Skill Test",
      duration: "CBT: 1.5 hours | Skill Test: 30 minutes",
      totalMarks: 150,
      sections: [
        { name: "Subject Knowledge (Agriculture/Science)", questions: 75, marks: 75 },
        { name: "General Intelligence & Reasoning", questions: 50, marks: 50 },
        { name: "Skill Test (Practical Lab Tasks)", questions: 0, marks: 25 },
      ],
      negativeMarking: "0.25 mark per wrong answer",
      medium: "English & Hindi",
    },
    syllabus: [
      {
        subject: "Basic Agriculture & Life Sciences",
        topics: ["Plant morphology & taxonomy", "Soil composition", "Crop diseases basics", "Laboratory instruments & methods", "Bio-safety protocols"],
      },
      {
        subject: "Reasoning & Aptitude",
        topics: ["Analogies", "Coding-decoding", "Series completion", "Data sufficiency", "Spatial reasoning"],
      },
    ],
    applicationProcess: [
      { step: 1, title: "Apply via IARI Recruitment Portal", description: "Visit iariexam.iari.res.in or the ICAR online application portal. Create a new account with email and mobile verification." },
      { step: 2, title: "Select Post Code", description: "Choose the appropriate technician post code matching your discipline (T-1 to T-6 based on specialization and education level)." },
      { step: 3, title: "Upload Documents", description: "Upload degree certificate, marksheets, community certificate, and passport photo/signature in specified formats." },
      { step: 4, title: "Pay & Submit", description: "SC/ST/PwD/Women candidates are exempt from fee. Others pay ₹500 online. Download confirmation receipt after submission." },
    ],
    notificationPdf: "#",
  },
  {
    id: 11,
    name: "Kerala PSC Agricultural Assistant 2025",
    shortName: "KPSC Agri Asst",
    conductingBody: "Kerala Public Service Commission",
    level: "state",
    status: "upcoming",
    notificationDate: "1 Jun 2025",
    applicationDeadline: "20 Aug 2025",
    examDate: "15 Nov 2025",
    resultDate: "Feb 2026 (expected)",
    eligibility: "B.Sc Agriculture from a recognised university",
    eligibilityDetails: [
      "B.Sc Agriculture from any University recognised by Kerala Government",
      "Must be a Kerala domicile",
      "Proficiency in Malayalam is essential",
      "No minimum percentage specified; merit list based on exam score",
    ],
    ageLimit: "18 – 36 years (SC/ST candidates: no upper age limit)",
    description: "Agricultural Assistant Grade II posts under Kerala Agriculture Department — village-level extension officers supporting farmers with crop selection and subsidy access.",
    vacancies: 195,
    category: "recruitment",
    officialWebsite: "keralapsc.gov.in",
    applicationFee: "₹0 (all candidates — Kerala PSC does not charge application fee)",
    examPattern: {
      mode: "OMR-based Objective Written Test",
      duration: "1.5 hours",
      totalMarks: 100,
      sections: [
        { name: "Agriculture (Core)", questions: 60, marks: 60 },
        { name: "General Knowledge & Current Affairs (Kerala focus)", questions: 40, marks: 40 },
      ],
      negativeMarking: "1/3 mark deducted per wrong answer",
      medium: "Malayalam & English",
    },
    syllabus: [
      {
        subject: "Core Agriculture",
        topics: ["Kerala-specific crops (rubber, coconut, pepper)", "Paddy cultivation in Kerala", "Soil types in Kerala", "Minor irrigation structures", "Organic farming in Kerala context"],
      },
      {
        subject: "Kerala Current Affairs & GK",
        topics: ["Kerala government schemes", "State geography & rivers", "Kerala agriculture statistics", "National & international current events"],
      },
    ],
    applicationProcess: [
      { step: 1, title: "Register on Kerala PSC Thulasi Portal", description: "Visit thulasi.psc.kerala.gov.in and complete One Time Registration (OTR). All Kerala PSC exams use this single portal." },
      { step: 2, title: "Apply for the Notification", description: "After OTR, log in and find the Agricultural Assistant notification. No fee to pay — Kerala PSC is free for all candidates." },
      { step: 3, title: "Select District Preferences", description: "Choose your district preferences for posting. Selections made here influence your future posting if selected." },
      { step: 4, title: "Submit & Await Admit Card", description: "Submit application and keep your candidate ID safe. Admit card will be released 2 weeks before exam date on the Thulasi portal." },
    ],
    notificationPdf: "#",
  },
  {
    id: 12,
    name: "TNAU Ph.D Entrance Examination 2025",
    shortName: "TNAU Ph.D",
    conductingBody: "Tamil Nadu Agricultural University",
    level: "state",
    status: "upcoming",
    notificationDate: "1 Jul 2025",
    applicationDeadline: "31 Aug 2025",
    examDate: "5 Oct 2025",
    resultDate: "Nov 2025 (expected)",
    eligibility: "M.Sc Agriculture / M.Sc Agronomy / M.Tech Agri Engineering (min 60%)",
    eligibilityDetails: [
      "M.Sc Agriculture, M.Sc Horticulture, or related PG degree with min 60%",
      "Candidates with ICAR JRF / CSIR NET may be exempted from entrance test",
      "GATE score in relevant discipline also accepted in lieu of entrance",
    ],
    ageLimit: "No upper age limit",
    description: "Ph.D entrance test across all faculties at TNAU: Agronomy, Plant Pathology, Agricultural Entomology, Soil Science, and more.",
    vacancies: 180,
    category: "entrance",
    officialWebsite: "tnau.ac.in",
    applicationFee: "₹1,500 (General) / ₹1,000 (SC/ST)",
    examPattern: {
      mode: "Online CBT",
      duration: "2 hours",
      totalMarks: 100,
      sections: [
        { name: "Research Methodology & Statistics", questions: 20, marks: 20 },
        { name: "Subject Specialization (chosen discipline)", questions: 60, marks: 60 },
        { name: "General Agriculture & Current Research", questions: 20, marks: 20 },
      ],
      negativeMarking: "No negative marking",
      medium: "English only",
    },
    syllabus: [
      {
        subject: "Research Methodology",
        topics: ["Experimental designs (RCBD, CRD, LSD)", "Statistical analysis (ANOVA, correlation)", "Hypothesis testing", "Scientific writing", "Research ethics"],
      },
      {
        subject: "Agronomy Specialization",
        topics: ["Advanced crop physiology", "Precision agriculture", "Remote sensing in agronomy", "Climate-smart crop management", "Carbon credits & agriculture"],
      },
      {
        subject: "Current Research in Agriculture",
        topics: ["Recent breakthroughs in crop science", "Genome editing (CRISPR) in crops", "Nano-fertilizers", "Drone applications in farming", "AI & machine learning in agronomy"],
      },
    ],
    applicationProcess: [
      { step: 1, title: "Apply at TNAU Admissions", description: "Visit admissions.tnau.ac.in and click 'Ph.D Admissions 2025'. Register with your PG institution email if possible." },
      { step: 2, title: "Select Specialization & Guide Preference", description: "Choose your preferred Ph.D specialization and up to 3 faculty guide preferences from the listed faculty profiles." },
      { step: 3, title: "Upload PG Marksheets & Documents", description: "Upload all PG semester marksheets, provisional certificate, and proof of JRF/GATE score if claiming exemption." },
      { step: 4, title: "Pay & Submit", description: "Pay ₹1,500 (₹1,000 for SC/ST) online. After submission, download the application form PDF for interview reference." },
    ],
    notificationPdf: "#",
  },
];
