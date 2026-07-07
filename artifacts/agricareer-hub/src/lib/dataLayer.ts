/**
 * AgriCareer Hub — Central Data Layer
 *
 * Architecture: static-first, API-ready.
 * All sections currently read from local data files.
 * To connect a live API, RSS feed, or admin CMS in the future:
 *   1. Add an `apiEndpoint` or `rssEndpoint` to the SECTION_REGISTRY entry.
 *   2. Change `dataMode` from "static" to "api" or "rss".
 *   3. Replace the body of `fetchSectionData()` with a real fetch() call.
 *   No page or component files need changing — only this file.
 */

/* ─── Official source registry ───────────────────────────────────────────── */

export type SourceCategory =
  | "state-govt"
  | "central-govt"
  | "university"
  | "bank"
  | "research"
  | "ngo"
  | "private"
  | "international";

export interface SourceConfig {
  id: string;
  name: string;
  fullName: string;
  officialUrl: string;
  refreshIntervalDays: number;
  category: SourceCategory;
  isVerifiedOfficial: boolean;
}

/**
 * SOURCE_REGISTRY — single source of truth for all official bodies.
 * Update this record when a body's URL or name changes.
 */
export const SOURCE_REGISTRY: Record<string, SourceConfig> = {
  tnpsc: {
    id: "tnpsc",
    name: "TNPSC",
    fullName: "Tamil Nadu Public Service Commission",
    officialUrl: "https://www.tnpscexams.net",
    refreshIntervalDays: 1,
    category: "state-govt",
    isVerifiedOfficial: true,
  },
  tnau: {
    id: "tnau",
    name: "TNAU",
    fullName: "Tamil Nadu Agricultural University",
    officialUrl: "https://www.tnau.ac.in",
    refreshIntervalDays: 2,
    category: "university",
    isVerifiedOfficial: true,
  },
  tn_agri: {
    id: "tn_agri",
    name: "TN Agri Dept",
    fullName: "Tamil Nadu Department of Agriculture",
    officialUrl: "https://www.tn.gov.in/agriculture",
    refreshIntervalDays: 3,
    category: "state-govt",
    isVerifiedOfficial: true,
  },
  tn_horti: {
    id: "tn_horti",
    name: "TN Horticulture",
    fullName: "Tamil Nadu Department of Horticulture",
    officialUrl: "https://www.tnhorticulture.tn.gov.in",
    refreshIntervalDays: 3,
    category: "state-govt",
    isVerifiedOfficial: true,
  },
  icar: {
    id: "icar",
    name: "ICAR",
    fullName: "Indian Council of Agricultural Research",
    officialUrl: "https://www.icar.org.in",
    refreshIntervalDays: 2,
    category: "central-govt",
    isVerifiedOfficial: true,
  },
  ibps: {
    id: "ibps",
    name: "IBPS",
    fullName: "Institute of Banking Personnel Selection",
    officialUrl: "https://www.ibps.in",
    refreshIntervalDays: 1,
    category: "central-govt",
    isVerifiedOfficial: true,
  },
  nabard: {
    id: "nabard",
    name: "NABARD",
    fullName: "National Bank for Agriculture and Rural Development",
    officialUrl: "https://www.nabard.org",
    refreshIntervalDays: 2,
    category: "bank",
    isVerifiedOfficial: true,
  },
  upsc: {
    id: "upsc",
    name: "UPSC",
    fullName: "Union Public Service Commission",
    officialUrl: "https://upsc.gov.in",
    refreshIntervalDays: 1,
    category: "central-govt",
    isVerifiedOfficial: true,
  },
  sbi: {
    id: "sbi",
    name: "SBI",
    fullName: "State Bank of India",
    officialUrl: "https://sbi.co.in/careers",
    refreshIntervalDays: 2,
    category: "bank",
    isVerifiedOfficial: true,
  },
  dbt: {
    id: "dbt",
    name: "DBT India",
    fullName: "Department of Biotechnology, Government of India",
    officialUrl: "https://dbtindia.gov.in",
    refreshIntervalDays: 3,
    category: "central-govt",
    isVerifiedOfficial: true,
  },
  ugc: {
    id: "ugc",
    name: "UGC",
    fullName: "University Grants Commission",
    officialUrl: "https://ugcnet.nta.nic.in",
    refreshIntervalDays: 3,
    category: "central-govt",
    isVerifiedOfficial: true,
  },
  moafw: {
    id: "moafw",
    name: "MoAFW",
    fullName: "Ministry of Agriculture & Farmers Welfare",
    officialUrl: "https://agricoop.nic.in",
    refreshIntervalDays: 3,
    category: "central-govt",
    isVerifiedOfficial: true,
  },
  iob: {
    id: "iob",
    name: "Indian Overseas Bank",
    fullName: "Indian Overseas Bank",
    officialUrl: "https://www.iob.in/careers",
    refreshIntervalDays: 3,
    category: "bank",
    isVerifiedOfficial: true,
  },
  icrisat: {
    id: "icrisat",
    name: "ICRISAT",
    fullName: "International Crops Research Institute for Semi-Arid Tropics",
    officialUrl: "https://www.icrisat.org/careers",
    refreshIntervalDays: 5,
    category: "international",
    isVerifiedOfficial: true,
  },
  cgiar: {
    id: "cgiar",
    name: "CGIAR",
    fullName: "CGIAR — A Global Research Partnership",
    officialUrl: "https://www.cgiar.org/careers",
    refreshIntervalDays: 5,
    category: "international",
    isVerifiedOfficial: true,
  },
  sfac: {
    id: "sfac",
    name: "SFAC",
    fullName: "Small Farmers Agribusiness Consortium",
    officialUrl: "https://sfacindia.com",
    refreshIntervalDays: 5,
    category: "central-govt",
    isVerifiedOfficial: true,
  },
  dhan: {
    id: "dhan",
    name: "DHAN Foundation",
    fullName: "Development of Humane Action Foundation",
    officialUrl: "https://www.dhan.org/careers",
    refreshIntervalDays: 7,
    category: "ngo",
    isVerifiedOfficial: true,
  },
  coromandel: {
    id: "coromandel",
    name: "Coromandel",
    fullName: "Coromandel International Ltd.",
    officialUrl: "https://www.coromandel.farm/careers",
    refreshIntervalDays: 7,
    category: "private",
    isVerifiedOfficial: true,
  },
  cropin: {
    id: "cropin",
    name: "CropIn",
    fullName: "CropIn Technology Solutions",
    officialUrl: "https://www.cropin.com/careers",
    refreshIntervalDays: 7,
    category: "private",
    isVerifiedOfficial: true,
  },
  mahyco: {
    id: "mahyco",
    name: "Mahyco",
    fullName: "Maharashtra Hybrid Seeds Company",
    officialUrl: "https://www.mahyco.com/careers",
    refreshIntervalDays: 7,
    category: "private",
    isVerifiedOfficial: true,
  },
  iari: {
    id: "iari",
    name: "ICAR-IARI",
    fullName: "ICAR — Indian Agricultural Research Institute",
    officialUrl: "https://iari.res.in",
    refreshIntervalDays: 3,
    category: "central-govt",
    isVerifiedOfficial: true,
  },
};

/* ─── Section registry ───────────────────────────────────────────────────── */

export type DataMode = "static" | "api" | "rss";

export interface SectionConfig {
  id: string;
  label: string;
  description: string;
  lastSyncedAt: string;       // ISO-8601 UTC timestamp
  syncIntervalHours: number;
  sourceIds: string[];
  dataMode: DataMode;
  apiEndpoint?: string;       // Wire up when API is ready
  rssEndpoint?: string;       // Wire up when RSS is ready
  totalItems: number;
  activeItems: number;
}

/**
 * SECTION_REGISTRY — one record per data section.
 * Update `lastSyncedAt`, `totalItems`, and `activeItems` each time content is refreshed.
 * Change `dataMode` + add `apiEndpoint` / `rssEndpoint` to switch from static to live.
 */
export const SECTION_REGISTRY: Record<string, SectionConfig> = {
  exams: {
    id: "exams",
    label: "Government Exams",
    description: "Competitive exams for agriculture graduates",
    lastSyncedAt: "2026-07-07T10:00:00Z",
    syncIntervalHours: 24,
    sourceIds: ["tnpsc", "tnau", "icar", "ibps", "nabard", "upsc", "sbi", "dbt"],
    dataMode: "static",
    // apiEndpoint: "https://api.agricareerhub.in/v1/exams",
    // rssEndpoint: "https://www.tnpscexams.net/rss",
    totalItems: 11,
    activeItems: 8,
  },
  jobs: {
    id: "jobs",
    label: "Government & Agri Jobs",
    description: "Current vacancies across government, research, and private sector",
    lastSyncedAt: "2026-07-07T10:00:00Z",
    syncIntervalHours: 12,
    sourceIds: ["tnpsc", "tn_agri", "tn_horti", "tnau", "icar", "ibps", "nabard", "sbi", "iob", "icrisat", "sfac", "dhan", "coromandel", "cropin", "mahyco"],
    dataMode: "static",
    // apiEndpoint: "https://api.agricareerhub.in/v1/jobs",
    totalItems: 15,
    activeItems: 11,
  },
  news: {
    id: "news",
    label: "Agriculture News & Notifications",
    description: "Policies, research, scheme launches, and official circulars",
    lastSyncedAt: "2026-07-07T10:00:00Z",
    syncIntervalHours: 6,
    sourceIds: ["tnpsc", "icar", "ibps", "nabard", "upsc", "sbi", "moafw", "tnau", "dbt", "ugc", "cgiar"],
    dataMode: "static",
    // rssEndpoint: "https://agricoop.nic.in/rss",
    totalItems: 25,
    activeItems: 25,
  },
  alerts: {
    id: "alerts",
    label: "Alert Center",
    description: "Exam deadlines, admit cards, results, and urgent notifications",
    lastSyncedAt: "2026-07-07T10:00:00Z",
    syncIntervalHours: 6,
    sourceIds: ["tnpsc", "icar", "ibps", "nabard", "upsc", "sbi", "dbt", "tnau"],
    dataMode: "static",
    // apiEndpoint: "https://api.agricareerhub.in/v1/alerts",
    totalItems: 15,
    activeItems: 15,
  },
  careers: {
    id: "careers",
    label: "Career Paths",
    description: "Career profiles and sector guides for agriculture graduates",
    lastSyncedAt: "2026-07-07T10:00:00Z",
    syncIntervalHours: 168, // weekly
    sourceIds: ["icar", "tnpsc", "ugc", "ibps"],
    dataMode: "static",
    totalItems: 13,
    activeItems: 13,
  },
};

/* ─── Helpers ────────────────────────────────────────────────────────────── */

/** Retrieve a source config by ID, with a safe fallback. */
export function getSource(sourceId: string): SourceConfig | undefined {
  return SOURCE_REGISTRY[sourceId];
}

/** Retrieve all sources for a section. */
export function getSectionSources(sectionId: string): SourceConfig[] {
  const section = SECTION_REGISTRY[sectionId];
  if (!section) return [];
  return section.sourceIds
    .map((id) => SOURCE_REGISTRY[id])
    .filter(Boolean) as SourceConfig[];
}

/** Derive a sourceId from an officialWebsite domain string. */
export function sourceIdFromUrl(url: string): string | undefined {
  const domain = url.replace(/^https?:\/\//, "").split("/")[0].toLowerCase();
  return Object.values(SOURCE_REGISTRY).find((s) =>
    s.officialUrl.includes(domain) || domain.includes(s.id)
  )?.id;
}

/** Look up a SourceConfig from any domain/URL string. */
export function sourceFromUrl(url: string): SourceConfig | undefined {
  const id = sourceIdFromUrl(url);
  return id ? SOURCE_REGISTRY[id] : undefined;
}

/**
 * API-ready data fetcher.
 * Currently returns static data synchronously.
 * Future: replace body with fetch(section.apiEndpoint) or RSS parser.
 */
export async function fetchSectionData<T>(
  sectionId: string,
  staticData: T[]
): Promise<{ data: T[]; syncedAt: string; mode: DataMode }> {
  const section = SECTION_REGISTRY[sectionId];
  if (!section) {
    return { data: staticData, syncedAt: new Date().toISOString(), mode: "static" };
  }

  // ── Future API integration point ──────────────────────────────────────
  // if (section.dataMode === "api" && section.apiEndpoint) {
  //   const res = await fetch(section.apiEndpoint);
  //   const json = await res.json();
  //   return { data: json.data, syncedAt: json.syncedAt, mode: "api" };
  // }
  // ── Future RSS integration point ─────────────────────────────────────
  // if (section.dataMode === "rss" && section.rssEndpoint) {
  //   const items = await parseRssFeed(section.rssEndpoint);
  //   return { data: items, syncedAt: new Date().toISOString(), mode: "rss" };
  // }
  // ─────────────────────────────────────────────────────────────────────

  return { data: staticData, syncedAt: section.lastSyncedAt, mode: "static" };
}

/** Check if a section's cached data is overdue for a refresh. */
export function isSectionOverdue(sectionId: string): boolean {
  const section = SECTION_REGISTRY[sectionId];
  if (!section) return false;
  const syncedAt = new Date(section.lastSyncedAt).getTime();
  const overdueMs = section.syncIntervalHours * 60 * 60 * 1000;
  return Date.now() - syncedAt > overdueMs;
}

/** Format `lastSyncedAt` as a human-readable string. */
export function formatSyncedAt(sectionId: string): string {
  const section = SECTION_REGISTRY[sectionId];
  if (!section) return "Unknown";
  const d = new Date(section.lastSyncedAt);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });
}
