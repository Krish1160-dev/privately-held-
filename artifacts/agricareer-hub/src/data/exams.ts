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
  applyUrl?: string;
  resultsUrl?: string;
  isSample?: boolean;
}

export const IS_SAMPLE_DATA = true as const;

export const exams: Exam[] = [
  /* ─── Tamil Nadu ─────────────────────────────── */
  {
    id: 1,
    name: "TNPSC Combined Agriculture Services 2026",
    shortName: "TNPSC CAS 2026",
    conductingBody: "Tamil Nadu Public Service Commission",
    level: "state",
    status: "open",
    notificationDate: "15 Mar 2026",
    applicationDeadline: "10 Aug 2026",
    examDate: "20 Sep 2026",
    resultDate: "Dec 2026 (expected)",
    eligibility: "B.Sc Agriculture from a recognised university",
    eligibilityDetails: [
      "Must hold B.Sc Agriculture from any ICAR-recognised university",
      "Minimum 50% aggregate marks for General; 45% for BC/MBC/SC/ST",
      "Citizen of India with Tamil Nadu nativity",
      "Knowledge of Tamil (reading and writing) mandatory for most posts",
    ],
    ageLimit: "18 – 32 years (BC/MBC +3 yrs, SC/ST +5 yrs, PwD +10 yrs)",
    description:
      "Recruitment to Agricultural Officer, Horticultural Officer, and Extension Officer posts under the Tamil Nadu Agriculture Department. Officers deliver frontline extension services and implement state government schemes.",
    vacancies: 532,
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
      negativeMarking: "1/3 mark deducted per wrong answer",
      medium: "Tamil & English",
    },
    syllabus: [
      {
        subject: "Agronomy & Crop Production",
        topics: ["Kharif & Rabi crops of TN", "Cropping systems", "Seed technology", "Irrigation management", "Organic farming"],
      },
      {
        subject: "Soil Science & Fertilizers",
        topics: ["Soil classification", "Soil fertility & testing", "INM", "Micronutrients", "Soil Health Card scheme"],
      },
      {
        subject: "Plant Protection",
        topics: ["Pests of rice, cotton, pulses", "Disease management", "Bio-pesticides", "IPM principles", "Pesticide safety"],
      },
      {
        subject: "Agricultural Extension & Schemes",
        topics: ["Extension methods", "KVK functions", "PM-KISAN, PMFBY", "FPO formation", "Rural credit institutions"],
      },
      {
        subject: "General Knowledge",
        topics: ["Tamil Nadu geography & economy", "National agriculture policy", "Current affairs 2026", "Science & technology"],
      },
    ],
    applicationProcess: [
      { step: 1, title: "Register on TNPSC Portal", description: "Complete One-Time Registration at www.tnpsc.gov.in using your Aadhaar-linked mobile number." },
      { step: 2, title: "Fill Application Form", description: "Log in and select 'CAS 2026'. Enter personal details, educational qualifications, and community status." },
      { step: 3, title: "Upload Documents", description: "Upload passport photo (20–50 KB, JPG), signature (10–20 KB, JPG), and community certificate." },
      { step: 4, title: "Pay Fee", description: "Pay ₹150 via Net Banking, UPI, or Debit/Credit Card. SC/ST and PwD candidates are fee-exempt." },
      { step: 5, title: "Submit & Download Confirmation", description: "Review entries, submit, and download the filled application PDF for future reference." },
    ],
    notificationPdf: "#",
    applyUrl: "https://www.tnpscexams.net/",
    isSample: true,
  },
  {
    id: 2,
    name: "TNAU PG Entrance Examination 2026",
    shortName: "TNAU PG 2026",
    conductingBody: "Tamil Nadu Agricultural University",
    level: "state",
    status: "results",
    notificationDate: "20 Mar 2026",
    applicationDeadline: "Closed",
    examDate: "5 Jul 2026",
    resultDate: "Results Published — Aug 2026",
    eligibility: "B.Sc Agriculture / B.Sc Horticulture with min 60% marks",
    eligibilityDetails: [
      "B.Sc Agriculture or B.Sc Horticulture from ICAR-recognised university with min 60%",
      "Final-year students may apply provisionally",
      "Out-of-state candidates require minimum 65% marks",
      "NRI / Foreign national quota seats available under separate norms",
    ],
    ageLimit: "No upper age limit",
    description:
      "Entrance test for M.Sc, M.Tech, MBA Agribusiness, and Ph.D programmes at TNAU Coimbatore and its constituent colleges. Results are now published; selected candidates are in the counselling stage.",
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
        topics: ["Mendelian genetics", "Quantitative genetics", "Hybridisation", "Plant variety protection", "Biotechnology basics"],
      },
      {
        subject: "Soil Science",
        topics: ["Soil formation & classification", "Physical & chemical properties", "Nutrient cycling", "Land capability classification"],
      },
      {
        subject: "Agricultural Economics",
        topics: ["Farm management", "Agricultural marketing", "Price policy", "Cooperative farming", "Agricultural finance"],
      },
    ],
    applicationProcess: [
      { step: 1, title: "Application Window Closed", description: "The TNAU PG 2026 application window closed on 10 June 2026. Results are now available at admissions.tnau.ac.in." },
      { step: 2, title: "Check Merit List", description: "Visit admissions.tnau.ac.in and log in with your application credentials to view your rank and counselling date." },
      { step: 3, title: "Counselling & Allotment", description: "Counselling dates: Aug 2026. Carry all original certificates for verification. Report to allotted department within 5 days." },
    ],
    notificationPdf: "#",
    resultsUrl: "https://admissions.tnau.ac.in/",
    isSample: true,
  },
  {
    id: 3,
    name: "TNPSC Horticultural Officer 2026",
    shortName: "TNPSC HO 2026",
    conductingBody: "Tamil Nadu Public Service Commission",
    level: "state",
    status: "upcoming",
    notificationDate: "15 Jun 2026",
    applicationDeadline: "20 Aug 2026",
    examDate: "10 Oct 2026",
    resultDate: "Dec 2026 (expected)",
    eligibility: "B.Sc Horticulture / B.Sc Agriculture (Horticulture major)",
    eligibilityDetails: [
      "B.Sc Horticulture or B.Sc Agriculture with Horticulture as principal subject",
      "Minimum 50% marks (45% for BC/MBC/SC/ST)",
      "Tamil Nadu permanent resident — nativity certificate required",
    ],
    ageLimit: "18 – 32 years",
    description:
      "Recruitment to Horticultural Officer Grade II posts under TN Horticulture Department. Officers lead extension work for fruit, vegetable, and flower crops across rural Tamil Nadu.",
    vacancies: 148,
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
      negativeMarking: "1/3 mark deducted per wrong answer",
      medium: "Tamil & English",
    },
    syllabus: [
      {
        subject: "Fruit & Vegetable Production",
        topics: ["Mango, banana, guava cultivation", "Tomato, brinjal, onion production", "Nursery management", "Post-harvest handling"],
      },
      {
        subject: "Floriculture & Landscaping",
        topics: ["Commercial flower crops", "Cut flower technology", "Landscape design principles", "Turf management"],
      },
      {
        subject: "Protected Cultivation",
        topics: ["Greenhouse & polyhouse structures", "Hydroponics basics", "Shade-net cultivation", "High-value vegetables"],
      },
      {
        subject: "Horticulture Schemes",
        topics: ["National Horticulture Mission", "TN HDCA schemes", "MIDH components", "Cold chain subsidy policy"],
      },
    ],
    applicationProcess: [
      { step: 1, title: "OTR on TNPSC Portal", description: "Complete One-Time Registration at tnpsc.gov.in if not done. Mandatory for all TNPSC exams." },
      { step: 2, title: "Apply for HO 2026 Notification", description: "Log in and select the Horticultural Officer 2026 notification. Verify and update your OTR data if needed." },
      { step: 3, title: "Upload Photo & Signature", description: "Passport photo must be within 6 months. Signature must match government ID exactly." },
      { step: 4, title: "Pay & Submit", description: "Pay ₹150 via TNPSC payment gateway. SC/ST candidates upload community certificate for fee waiver." },
    ],
    notificationPdf: "#",
    applyUrl: "https://www.tnpscexams.net/",
    isSample: true,
  },
  {
    id: 4,
    name: "TN Agriculture Department Direct Recruitment 2026",
    shortName: "TN Agri DR 2026",
    conductingBody: "Tamil Nadu Agriculture Department / TNPSC",
    level: "state",
    status: "upcoming",
    notificationDate: "Aug 2026 (expected)",
    applicationDeadline: "Sep 2026 (expected)",
    examDate: "Nov 2026 (expected)",
    resultDate: "Jan 2027 (expected)",
    eligibility: "B.Sc Agriculture (Tamil Nadu domicile required)",
    eligibilityDetails: [
      "B.Sc Agriculture from any ICAR-recognised university",
      "Domicile of Tamil Nadu mandatory — nativity certificate required",
      "Minimum 50% aggregate marks",
      "Knowledge of Tamil (reading & writing) is mandatory",
    ],
    ageLimit: "18 – 30 years",
    description:
      "Block-level Agricultural Officer posts for frontline extension work. Officers implement state schemes, conduct farm demonstrations, and support FPOs at the grassroots level.",
    vacancies: 300,
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
        topics: ["Watershed management", "Drip & sprinkler irrigation", "Soil Health Card", "Water harvesting structures"],
      },
      {
        subject: "Agricultural Schemes",
        topics: ["PM-KISAN", "PMFBY crop insurance", "Kisan Credit Card", "Tamil Nadu state schemes 2026", "FPO promotion"],
      },
      {
        subject: "Tamil Language",
        topics: ["Tamil grammar basics", "Comprehension passages", "Official Tamil terminology in agriculture", "Letter writing"],
      },
    ],
    applicationProcess: [
      { step: 1, title: "Watch for Official Notification", description: "Notification expected by Aug 2026 on tn.gov.in/agriculture. Subscribe to TNPSC alerts to be notified immediately." },
      { step: 2, title: "Apply via TN e-Service Portal", description: "Apply online through the Agriculture Department portal or TNPSC portal when notification is live." },
      { step: 3, title: "Upload Nativity Certificate", description: "Nativity / domicile certificate along with educational documents is mandatory for all applicants." },
      { step: 4, title: "Pay & Confirm", description: "Pay ₹100 via Challan or online. Note your application reference number after submission." },
    ],
    notificationPdf: "#",
    isSample: true,
  },
  {
    id: 5,
    name: "TNAU Ph.D Entrance Examination 2026",
    shortName: "TNAU Ph.D 2026",
    conductingBody: "Tamil Nadu Agricultural University",
    level: "state",
    status: "upcoming",
    notificationDate: "1 Jul 2026",
    applicationDeadline: "31 Aug 2026",
    examDate: "5 Oct 2026",
    resultDate: "Nov 2026 (expected)",
    eligibility: "M.Sc Agriculture / M.Sc Agronomy / M.Tech Agri Engineering (min 60%)",
    eligibilityDetails: [
      "M.Sc Agriculture, M.Sc Horticulture, or related PG degree with min 60%",
      "ICAR JRF / CSIR NET qualified candidates may be exempted from entrance",
      "GATE score in relevant discipline also accepted in lieu of entrance",
    ],
    ageLimit: "No upper age limit",
    description:
      "Ph.D entrance test across all faculties at TNAU: Agronomy, Plant Pathology, Agricultural Entomology, Soil Science, and more. JRF/NET holders may be admitted without entrance exam.",
    vacancies: 200,
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
        topics: ["Experimental designs (RCBD, CRD, LSD)", "ANOVA, correlation, regression", "Hypothesis testing", "Scientific writing", "Research ethics"],
      },
      {
        subject: "Agronomy Specialization",
        topics: ["Advanced crop physiology", "Precision agriculture", "Remote sensing in agronomy", "Climate-smart crop management", "Carbon credits & agriculture"],
      },
      {
        subject: "Current Research in Agriculture",
        topics: ["Genome editing (CRISPR) in crops", "Nano-fertilizers", "Drone applications in farming", "AI in agronomy 2026", "Biofortification"],
      },
    ],
    applicationProcess: [
      { step: 1, title: "Apply at TNAU Admissions Portal", description: "Visit admissions.tnau.ac.in and click 'Ph.D Admissions 2026'. Register using your PG institution email." },
      { step: 2, title: "Select Specialization & Guide Preference", description: "Choose your Ph.D specialization and up to 3 faculty guide preferences from listed faculty profiles." },
      { step: 3, title: "Upload PG Marksheets & Documents", description: "Upload all PG semester marksheets, provisional certificate, and JRF/GATE proof if claiming exemption." },
      { step: 4, title: "Pay & Submit", description: "Pay ₹1,500 (₹1,000 for SC/ST) online. Download the application form PDF for interview reference." },
    ],
    notificationPdf: "#",
    applyUrl: "https://admissions.tnau.ac.in/",
    isSample: true,
  },

  /* ─── National ───────────────────────────────── */
  {
    id: 6,
    name: "ICAR AICE Junior Research Fellowship 2026",
    shortName: "ICAR JRF 2026",
    conductingBody: "Indian Council of Agricultural Research",
    level: "national",
    status: "upcoming",
    notificationDate: "10 Apr 2026",
    applicationDeadline: "20 Jun 2026 (Closed)",
    examDate: "23 Aug 2026",
    resultDate: "Oct 2026 (expected)",
    eligibility: "B.Sc Agriculture / related with min 55% (50% for SC/ST/PwD)",
    eligibilityDetails: [
      "B.Sc Agriculture, B.Sc Horticulture, B.Sc Forestry, B.V.Sc, or B.F.Sc with 55%",
      "50% marks for SC/ST/PwD candidates",
      "Final-year candidates may apply provisionally",
      "Age: Up to 25 years for JRF (SC/ST/PwD/Women +5 years)",
    ],
    ageLimit: "Up to 25 years (SC/ST/PwD/Women +5 years)",
    description:
      "AICE JRF is the premier gateway to Ph.D research at ICAR institutes. Qualified candidates receive ₹37,000/month stipend and SRF upgrade to ₹42,000/month after 2 years. Exam scheduled 23 Aug 2026.",
    vacancies: 1200,
    category: "fellowship",
    officialWebsite: "icar.org.in",
    applicationFee: "₹600 (General/OBC) / ₹300 (SC/ST/PwD/Women)",
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
        topics: ["Indian agriculture overview", "Green Revolution & beyond", "Crop improvement history", "Key ICAR institutes and their mandates", "National agriculture schemes 2026"],
      },
      {
        subject: "Agronomy (Subject Paper)",
        topics: ["Crop physiology & growth analysis", "Cropping systems", "Precision farming", "Climate-smart agriculture", "Resource-use efficiency"],
      },
      {
        subject: "Plant Pathology",
        topics: ["Fungal, bacterial, viral diseases", "Koch's postulates", "Seed-borne diseases", "Biological control", "Disease forecasting models"],
      },
      {
        subject: "Agricultural Biotechnology",
        topics: ["Recombinant DNA technology", "Transgenic crops", "Molecular markers", "Tissue culture", "CRISPR in crop improvement"],
      },
    ],
    applicationProcess: [
      { step: 1, title: "Application Window Closed", description: "Applications for ICAR AICE JRF 2026 closed on 20 June 2026. Download your admit card from aice.icar.gov.in." },
      { step: 2, title: "Download Admit Card", description: "Admit cards available 10 days before exam (by 13 Aug 2026) on aice.icar.gov.in. Carry valid photo ID to exam centre." },
      { step: 3, title: "Appear for CBT on 23 Aug 2026", description: "Computer-based test at designated centres nationwide. Report 30 minutes before exam time with admit card and ID." },
      { step: 4, title: "Institute Interview", description: "Shortlisted candidates (based on AICE rank) appear for interview at their chosen ICAR institute." },
    ],
    notificationPdf: "#",
    applyUrl: "https://aice.icar.gov.in/",
    isSample: true,
  },
  {
    id: 7,
    name: "IBPS Agriculture Field Officer CRP SPL XV 2026",
    shortName: "IBPS AFO 2026",
    conductingBody: "Institute of Banking Personnel Selection",
    level: "national",
    status: "open",
    notificationDate: "28 May 2026",
    applicationDeadline: "20 Jul 2026",
    examDate: "18 Oct 2026",
    resultDate: "Jan 2027 (expected)",
    eligibility: "B.Sc Agriculture / Horticulture / B.Tech Agricultural Engineering",
    eligibilityDetails: [
      "B.Sc Agriculture, B.Sc Horticulture, B.Sc Forestry, B.V.Sc or B.Tech Agri Engineering",
      "Degree from University incorporated by an Act of Central or State Legislature",
      "Minimum 60% marks for General/EWS; 55% for SC/ST/PwD/OBC-NCL",
      "Proficiency in official language of State/UT applied for is desirable",
    ],
    ageLimit: "20 – 30 years (OBC +3 yrs; SC/ST +5 yrs; PwD +10 yrs)",
    description:
      "IBPS AFO CRP SPL XV 2026 — 950 Agriculture Field Officer posts across 11 public sector banks. Applications open till 20 July 2026. Officers handle agricultural loan appraisal, KCC, and rural banking operations.",
    vacancies: 950,
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
        topics: ["Crop production technology", "Soil science & fertilizers", "Irrigation methods", "Plant protection", "Seed technology"],
      },
      {
        subject: "Agricultural Finance & Banking",
        topics: ["Kisan Credit Card features", "Types of agricultural loans", "SARFAESI Act basics", "Priority sector lending norms", "Lead Bank scheme"],
      },
      {
        subject: "Government Schemes",
        topics: ["PM-KISAN, PMFBY, RKVY", "Soil Health Card", "e-NAM platform", "Natural Farming Mission 2026", "National Mission for Sustainable Agriculture"],
      },
    ],
    applicationProcess: [
      { step: 1, title: "Apply at ibps.in (Open till 20 Jul 2026)", description: "Visit www.ibps.in and navigate to CRP SPL XV (AFO 2026). Register as a new user with a valid email and mobile number." },
      { step: 2, title: "Select Bank Preferences", description: "Choose up to 3 participating banks in order of preference. Bank allotment is based on merit rank and bank-wise vacancy." },
      { step: 3, title: "Fill Application & Upload Documents", description: "Enter academic details. Upload photo (4.5×3.5 cm, JPG, 20–50 KB) and signature (3.5×1.5 cm, JPG, 10–20 KB)." },
      { step: 4, title: "Pay Fee & Download Form", description: "Pay ₹850 online (SC/ST/PwD: ₹175). Download filled form and payment receipt." },
    ],
    notificationPdf: "#",
    applyUrl: "https://ibps.in/",
    isSample: true,
  },
  {
    id: 8,
    name: "NABARD Grade A Development Assistant 2026",
    shortName: "NABARD Grade A 2026",
    conductingBody: "National Bank for Agriculture and Rural Development",
    level: "national",
    status: "results",
    notificationDate: "12 Jan 2026",
    applicationDeadline: "Closed",
    examDate: "22 Mar 2026",
    resultDate: "Phase III interviews: Jul–Aug 2026",
    eligibility: "B.Sc Agriculture / MBA Agribusiness / B.E. Agricultural Engineering",
    eligibilityDetails: [
      "Bachelor's degree in Agriculture / Horticulture / Veterinary Science / Forestry",
      "MBA in Agribusiness from reputed institution also eligible",
      "B.E./B.Tech in Agricultural Engineering accepted",
      "Minimum 60% marks in graduation (55% for SC/ST)",
    ],
    ageLimit: "21 – 30 years (relaxation per NABARD guidelines)",
    description:
      "NABARD Grade A 2026 — Phase I and II completed. Phase III (interview) currently ongoing at Mumbai, Chennai, and Bhopal centres. Join one of India's most prestigious agricultural finance institutions.",
    vacancies: 180,
    category: "banking",
    officialWebsite: "nabard.org",
    applicationFee: "₹800 (General/OBC) / ₹150 (SC/ST/PwD)",
    examPattern: {
      mode: "Online CBT (Phase I) + Descriptive (Phase II) + Interview (Phase III)",
      duration: "Phase I: 2 hours | Phase II: 1.5 hours + Interview",
      totalMarks: 200,
      sections: [
        { name: "Reasoning & Quantitative Aptitude", questions: 40, marks: 40 },
        { name: "English Language", questions: 40, marks: 40 },
        { name: "General Awareness & Agriculture", questions: 40, marks: 40 },
        { name: "Economic & Social Issues + Agriculture (Descriptive)", questions: 0, marks: 80 },
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
        subject: "Reasoning & Aptitude",
        topics: ["Data interpretation", "Logical reasoning", "Number series", "Inequalities", "Blood relations"],
      },
    ],
    applicationProcess: [
      { step: 1, title: "Application & Phase I Completed", description: "NABARD Grade A 2026 application window closed on 15 Feb 2026. Phase I CBT was held on 22 Mar 2026." },
      { step: 2, title: "Check Phase III Interview Schedule", description: "Visit nabard.org/careers to check your interview date and centre. Interviews at Mumbai, Chennai, and Bhopal — Jul to Aug 2026." },
      { step: 3, title: "Document Verification at Interview", description: "Carry original degree, marksheets, community certificate, and valid photo ID to the interview venue." },
    ],
    notificationPdf: "#",
    resultsUrl: "https://nabard.org/careers.aspx",
    isSample: true,
  },
  {
    id: 9,
    name: "UPSC Combined Agricultural Services 2026",
    shortName: "UPSC AO 2026",
    conductingBody: "Union Public Service Commission",
    level: "national",
    status: "upcoming",
    notificationDate: "12 Feb 2026",
    applicationDeadline: "15 Apr 2026 (Closed)",
    examDate: "12 Sep 2026",
    resultDate: "Jan 2027 (expected)",
    eligibility: "B.Sc Agriculture from any recognised university",
    eligibilityDetails: [
      "Bachelor's degree in Agriculture from a UGC-recognised central/state university",
      "Must be a citizen of India",
      "Should meet physical fitness standards per Ministry norms",
      "No minimum percentage required at graduation level",
    ],
    ageLimit: "21 – 30 years (OBC: +3 yrs; SC/ST: +5 yrs; PwD: +10 yrs; Ex-SM: as per rules)",
    description:
      "Group A gazetted posts: Agricultural Marketing Specialist, Extension Officer, Subject Matter Specialist, and Assistant Director Agriculture under Government of India. Written exam on 12 Sep 2026.",
    vacancies: 165,
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
        topics: ["WTO & Indian agriculture", "Food security", "MSP policy 2026", "Agricultural credit & insurance", "International trade in commodities"],
      },
    ],
    applicationProcess: [
      { step: 1, title: "Application Closed — Prepare for Written Exam", description: "UPSC CAS 2026 application window closed on 15 Apr 2026. Focus on exam preparation for the 12 Sep 2026 written exam." },
      { step: 2, title: "Download Admit Card", description: "Admit card will be released 3 weeks before exam on upsconline.nic.in. Carry it with a valid photo ID on exam day." },
      { step: 3, title: "Written Exam — 12 Sep 2026", description: "Offline descriptive exam at UPSC-allotted centres across India. Paper I (General Agriculture) + Paper II (Specialisation)." },
      { step: 4, title: "Interview / Personality Test", description: "Shortlisted candidates called for interview at UPSC Bhavan, New Delhi. Expected Jan 2027." },
    ],
    notificationPdf: "#",
    applyUrl: "https://upsconline.nic.in/",
    isSample: true,
  },
  {
    id: 10,
    name: "SBI Agriculture Domain Officer 2026",
    shortName: "SBI ADO 2026",
    conductingBody: "State Bank of India",
    level: "national",
    status: "open",
    notificationDate: "5 Jun 2026",
    applicationDeadline: "31 Jul 2026",
    examDate: "20 Sep 2026",
    resultDate: "Nov 2026 (expected)",
    eligibility: "B.Sc Agriculture / M.Sc Agronomy / Agribusiness MBA (min 60%)",
    eligibilityDetails: [
      "B.Sc Agriculture or B.Sc Horticulture with min 60% marks",
      "M.Sc in Agronomy, Soil Science, or related field with min 60%",
      "MBA Agribusiness from reputed institution",
      "Post-graduate degree holders preferred for Scale II posts",
    ],
    ageLimit: "21 – 35 years",
    description:
      "SBI Agriculture Domain Officer posts for agricultural banking verticals — 450 vacancies (Scale II). Officers assess crop loans, KCC, and agri-MSME proposals. Apply before 31 Jul 2026.",
    vacancies: 450,
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
      { step: 1, title: "Apply at SBI Careers Portal (Open)", description: "Visit bank.sbi/careers and find the 'Agriculture Domain Officer 2026' notification. Apply before 31 Jul 2026." },
      { step: 2, title: "Fill Online Form", description: "Enter personal details, academic background, and work experience. Ensure details match certificates exactly." },
      { step: 3, title: "Upload Photo & Signature", description: "Upload recent colour photograph (200×230 px, JPG, max 50 KB) and signature (140×60 px, max 20 KB)." },
      { step: 4, title: "Pay & Submit", description: "General/EWS/OBC pay ₹750. SC/ST/PwD are exempt. Payment via online mode only." },
      { step: 5, title: "Print e-Receipt", description: "Review all entries, submit, and print the system-generated e-receipt. No physical submission required." },
    ],
    notificationPdf: "#",
    applyUrl: "https://bank.sbi/careers",
    isSample: true,
  },
  {
    id: 11,
    name: "DBT Junior Research Fellowship 2026",
    shortName: "DBT JRF 2026",
    conductingBody: "Department of Biotechnology, Govt. of India",
    level: "national",
    status: "open",
    notificationDate: "15 May 2026",
    applicationDeadline: "15 Jul 2026",
    examDate: "14 Sep 2026",
    resultDate: "Nov 2026 (expected)",
    eligibility: "M.Sc Biotechnology / Agricultural Biotechnology / Plant Science (min 60%)",
    eligibilityDetails: [
      "M.Sc in Biotechnology, Agricultural Biotechnology, Plant Molecular Biology, or Genetics",
      "Minimum 60% marks at PG level (55% for SC/ST/PwD)",
      "Final-year M.Sc students may apply provisionally",
      "Age: Not exceeding 28 years (SC/ST/PwD/Women +5 years)",
    ],
    ageLimit: "Up to 28 years (SC/ST/PwD/Women +5 years)",
    description:
      "DBT JRF 2026 — 108 fellowships for Ph.D in agricultural biotechnology, plant genomics, and bioinformatics. Stipend ₹37,000/month (JRF) + HRA. Apply before 15 Jul 2026.",
    vacancies: 108,
    category: "fellowship",
    officialWebsite: "dbtindia.gov.in",
    applicationFee: "₹300 (General/OBC) / ₹150 (SC/ST/PwD/Women)",
    examPattern: {
      mode: "Online CBT",
      duration: "2 hours",
      totalMarks: 100,
      sections: [
        { name: "General Biotechnology & Plant Science", questions: 50, marks: 50 },
        { name: "Specialisation (Agri Biotech / Genomics / Bioinformatics)", questions: 30, marks: 30 },
        { name: "Reasoning & Aptitude", questions: 20, marks: 20 },
      ],
      negativeMarking: "0.25 mark per wrong answer",
      medium: "English only",
    },
    syllabus: [
      {
        subject: "Agricultural Biotechnology",
        topics: ["Plant tissue culture & transformation", "Transgenic crop development", "Molecular markers (SSR, SNP)", "Plant genomics & proteomics", "CRISPR-Cas9 applications in crops"],
      },
      {
        subject: "Bioinformatics & Genomics",
        topics: ["DNA sequence analysis", "Phylogenetics & evolutionary biology", "Functional annotation", "Comparative genomics", "Databases: NCBI, UniProt, KEGG"],
      },
    ],
    applicationProcess: [
      { step: 1, title: "Apply Online (Open till 15 Jul 2026)", description: "Visit dbtindia.gov.in and navigate to DBT JRF 2026 notification. Complete online registration." },
      { step: 2, title: "Select Research Area", description: "Choose from Agricultural Biotechnology, Plant Genomics, or Bioinformatics as your primary research focus." },
      { step: 3, title: "Upload Documents", description: "Upload PG marksheets, community certificate, and passport photo/signature in specified format." },
      { step: 4, title: "Pay Fee & Confirm", description: "Pay ₹300 (General/OBC) or ₹150 (SC/ST/PwD/Women) online. Save payment confirmation." },
    ],
    notificationPdf: "#",
    applyUrl: "https://dbtindia.gov.in/",
    isSample: true,
  },
];
