export interface Exam {
  id: number;
  name: string;
  conductingBody: string;
  level: "state" | "national";
  status: "upcoming" | "open" | "results";
  applicationDeadline: string;
  examDate: string;
  eligibility: string;
  description: string;
  vacancies?: number;
}

export const exams: Exam[] = [
  {
    id: 1,
    name: "TNAU PG Entrance Examination 2025",
    conductingBody: "Tamil Nadu Agricultural University",
    level: "state",
    status: "open",
    applicationDeadline: "15 Jun 2025",
    examDate: "20 Jul 2025",
    eligibility: "B.Sc Agriculture / B.Sc Horticulture (min 60%)",
    description: "Admission to M.Sc, M.Tech, and MBA programmes at TNAU, Coimbatore.",
    vacancies: 320,
  },
  {
    id: 2,
    name: "ICAR JRF / SRF Examination 2025",
    conductingBody: "Indian Council of Agricultural Research",
    level: "national",
    status: "upcoming",
    applicationDeadline: "30 Jun 2025",
    examDate: "24 Aug 2025",
    eligibility: "B.Sc Agriculture / related (min 55% for general)",
    description: "Junior Research Fellowship for admission to Ph.D programs and ICAR research positions.",
    vacancies: 1200,
  },
  {
    id: 3,
    name: "UPSC Agricultural Services Combined",
    conductingBody: "Union Public Service Commission",
    level: "national",
    status: "upcoming",
    applicationDeadline: "10 Jul 2025",
    examDate: "15 Sep 2025",
    eligibility: "B.Sc Agriculture (any recognized university)",
    description: "Recruitment to Group A posts: Agricultural Marketing Specialist, Subject Matter Specialist, etc.",
    vacancies: 156,
  },
  {
    id: 4,
    name: "TNPSC Agriculture Officer Exam",
    conductingBody: "Tamil Nadu Public Service Commission",
    level: "state",
    status: "open",
    applicationDeadline: "5 Jul 2025",
    examDate: "10 Aug 2025",
    eligibility: "B.Sc Agriculture from a recognized university",
    description: "Recruitment to Agricultural Officer posts in Tamil Nadu government departments.",
    vacancies: 240,
  },
  {
    id: 5,
    name: "NABARD Development Assistant Grade A",
    conductingBody: "National Bank for Agriculture and Rural Development",
    level: "national",
    status: "results",
    applicationDeadline: "Closed",
    examDate: "12 Apr 2025",
    eligibility: "B.Sc Agriculture / MBA Agribusiness / related",
    description: "Officer-level recruitment in NABARD's development and rural financing divisions.",
    vacancies: 170,
  },
  {
    id: 6,
    name: "KEAM Agriculture 2025",
    conductingBody: "Commissioner for Entrance Examinations, Kerala",
    level: "state",
    status: "results",
    applicationDeadline: "Closed",
    examDate: "30 Mar 2025",
    eligibility: "+2 with Biology/Agriculture (min 50%)",
    description: "Admission to B.Sc Agriculture programmes in Kerala Agriculture University and affiliated colleges.",
  },
  {
    id: 7,
    name: "CSIR-IARI Technician Recruitment",
    conductingBody: "Indian Agricultural Research Institute",
    level: "national",
    status: "upcoming",
    applicationDeadline: "20 Jul 2025",
    examDate: "22 Sep 2025",
    eligibility: "B.Sc Agriculture / B.Sc Life Sciences",
    description: "Technical and research support positions at IARI's experimental farm and labs.",
    vacancies: 89,
  },
  {
    id: 8,
    name: "Tamil Nadu AO Block Level Exam",
    conductingBody: "Tamil Nadu Agriculture Dept",
    level: "state",
    status: "upcoming",
    applicationDeadline: "25 Jun 2025",
    examDate: "5 Aug 2025",
    eligibility: "B.Sc Agriculture (Tamil Nadu domicile)",
    description: "Block-level Agricultural Officer posts for frontline extension work across TN districts.",
    vacancies: 412,
  },
];
