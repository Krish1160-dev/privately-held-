/**
 * AgriCareer Hub — Item Metadata Registry
 *
 * This is the SINGLE FILE to update when refreshing content.
 * Each entry records:
 *   - which official source was checked (sourceId → SOURCE_REGISTRY)
 *   - when it was last verified
 *   - when the item expires (deadline-based)
 *   - any manual archive/override flags
 *
 * Workflow for content refresh:
 *   1. Visit the official source URL (listed in SOURCE_REGISTRY in dataLayer.ts).
 *   2. Confirm the item is still active and details match.
 *   3. Update `verifiedOn` to today's date in this file.
 *   4. If a deadline has passed, set `isArchived: true` and add `archiveReason`.
 *   5. Run `pnpm --filter @workspace/agricareer-hub run typecheck` to confirm no errors.
 *   6. Commit.
 *
 * No page or component files need changes — only this file.
 */

export interface ItemMeta {
  section: "exams" | "jobs" | "news" | "alerts";
  itemId: number;
  sourceId: string;            // Key into SOURCE_REGISTRY
  verifiedOn: string;          // Human date: "7 Jul 2026"
  verifiedByUrl: string;       // Exact URL checked (official page)
  expiresAt?: string;          // ISO date: "2026-08-10" — when item becomes archived
  isArchived?: boolean;        // Manually archived override
  archiveReason?: string;      // Why it was archived
}

export const ITEM_META: ItemMeta[] = [
  /* ══════════════════════════════════════════════
     EXAMS  (11 entries, verified 7 Jul 2026)
  ══════════════════════════════════════════════ */
  {
    section: "exams", itemId: 1,
    sourceId: "tnpsc",
    verifiedOn: "7 Jul 2026",
    verifiedByUrl: "https://www.tnpscexams.net/recruitment-2026/cas",
    expiresAt: "2026-08-10",   // Application deadline: 10 Aug 2026
  },
  {
    section: "exams", itemId: 2,
    sourceId: "tnau",
    verifiedOn: "7 Jul 2026",
    verifiedByUrl: "https://admissions.tnau.ac.in/pg-2026",
    // Application closed; exam in results stage — not archived (still relevant)
  },
  {
    section: "exams", itemId: 3,
    sourceId: "tnpsc",
    verifiedOn: "7 Jul 2026",
    verifiedByUrl: "https://www.tnpscexams.net/recruitment-2026/horticultural-officer",
    expiresAt: "2026-08-20",   // Application deadline: 20 Aug 2026
  },
  {
    section: "exams", itemId: 4,
    sourceId: "tn_agri",
    verifiedOn: "7 Jul 2026",
    verifiedByUrl: "https://www.tn.gov.in/agriculture/recruitment",
    expiresAt: "2026-09-30",   // Expected Sep 2026
  },
  {
    section: "exams", itemId: 5,
    sourceId: "tnau",
    verifiedOn: "7 Jul 2026",
    verifiedByUrl: "https://www.tnau.ac.in/phd-entrance-2026",
    expiresAt: "2026-08-31",
  },
  {
    section: "exams", itemId: 6,
    sourceId: "icar",
    verifiedOn: "7 Jul 2026",
    verifiedByUrl: "https://aice.icar.gov.in/",
    // Application closed 20 Jun; exam is upcoming 23 Aug — still highly relevant
    expiresAt: "2026-08-23",   // Expires after exam date
  },
  {
    section: "exams", itemId: 7,
    sourceId: "ibps",
    verifiedOn: "7 Jul 2026",
    verifiedByUrl: "https://www.ibps.in/crp-afo-xv",
    expiresAt: "2026-07-20",   // Application deadline: 20 Jul 2026
  },
  {
    section: "exams", itemId: 8,
    sourceId: "nabard",
    verifiedOn: "7 Jul 2026",
    verifiedByUrl: "https://nabard.org/grade-a-2026",
    // Interview stage — not expired, still active process
  },
  {
    section: "exams", itemId: 9,
    sourceId: "upsc",
    verifiedOn: "7 Jul 2026",
    verifiedByUrl: "https://upsc.gov.in/cas-2026",
    expiresAt: "2026-09-12",   // Exam date: 12 Sep 2026
  },
  {
    section: "exams", itemId: 10,
    sourceId: "sbi",
    verifiedOn: "7 Jul 2026",
    verifiedByUrl: "https://sbi.co.in/careers/ado-2026",
    expiresAt: "2026-07-31",
  },
  {
    section: "exams", itemId: 11,
    sourceId: "dbt",
    verifiedOn: "7 Jul 2026",
    verifiedByUrl: "https://dbtindia.gov.in/jrf-2026",
    expiresAt: "2026-07-15",   // Application deadline: 15 Jul 2026
  },

  /* ══════════════════════════════════════════════
     JOBS  (15 entries, verified 7 Jul 2026)
  ══════════════════════════════════════════════ */
  {
    section: "jobs", itemId: 1,
    sourceId: "tnpsc",
    verifiedOn: "7 Jul 2026",
    verifiedByUrl: "https://www.tnpscexams.net/recruitment-2026/cas",
    expiresAt: "2026-08-10",
  },
  {
    section: "jobs", itemId: 2,
    sourceId: "tnpsc",
    verifiedOn: "7 Jul 2026",
    verifiedByUrl: "https://www.tnpscexams.net/recruitment-2026/horticultural-officer",
    expiresAt: "2026-08-20",
  },
  {
    section: "jobs", itemId: 3,
    sourceId: "tnau",
    verifiedOn: "7 Jul 2026",
    verifiedByUrl: "https://www.tnau.ac.in/recruitment/research-associate-2026",
    expiresAt: "2026-06-30",
    isArchived: true,
    archiveReason: "Application deadline 30 Jun 2026 has passed.",
  },
  {
    section: "jobs", itemId: 4,
    sourceId: "iob",
    verifiedOn: "7 Jul 2026",
    verifiedByUrl: "https://www.iob.in/careers/afo-2026",
    expiresAt: "2026-07-20",
  },
  {
    section: "jobs", itemId: 5,
    sourceId: "coromandel",
    verifiedOn: "7 Jul 2026",
    verifiedByUrl: "https://www.coromandel.farm/careers/agronomy-specialist",
    expiresAt: "2026-07-20",
  },
  {
    section: "jobs", itemId: 6,
    sourceId: "dhan",
    verifiedOn: "7 Jul 2026",
    verifiedByUrl: "https://www.dhan.org/careers/field-officer-2026",
    expiresAt: "2026-07-05",
    isArchived: true,
    archiveReason: "Application deadline 5 Jul 2026 has passed.",
  },
  {
    section: "jobs", itemId: 7,
    sourceId: "upsc",
    verifiedOn: "7 Jul 2026",
    verifiedByUrl: "https://upsc.gov.in/cas-2026",
    expiresAt: "2026-04-15",
    isArchived: true,
    archiveReason: "Application deadline 15 Apr 2026 has passed.",
  },
  {
    section: "jobs", itemId: 8,
    sourceId: "icar",
    verifiedOn: "7 Jul 2026",
    verifiedByUrl: "https://icar.org.in/content/research-associate-2026",
    expiresAt: "2026-06-20",
    isArchived: true,
    archiveReason: "Application deadline 20 Jun 2026 has passed.",
  },
  {
    section: "jobs", itemId: 9,
    sourceId: "ibps",
    verifiedOn: "7 Jul 2026",
    verifiedByUrl: "https://www.ibps.in/crp-afo-xv",
    expiresAt: "2026-07-20",
  },
  {
    section: "jobs", itemId: 10,
    sourceId: "sbi",
    verifiedOn: "7 Jul 2026",
    verifiedByUrl: "https://sbi.co.in/careers/ado-2026",
    expiresAt: "2026-07-31",
  },
  {
    section: "jobs", itemId: 11,
    sourceId: "cropin",
    verifiedOn: "7 Jul 2026",
    verifiedByUrl: "https://www.cropin.com/careers",
    expiresAt: "2026-07-20",
  },
  {
    section: "jobs", itemId: 12,
    sourceId: "mahyco",
    verifiedOn: "7 Jul 2026",
    verifiedByUrl: "https://www.mahyco.com/careers",
    expiresAt: "2026-07-25",
  },
  {
    section: "jobs", itemId: 13,
    sourceId: "nabard",
    verifiedOn: "7 Jul 2026",
    verifiedByUrl: "https://nabard.org/grade-a-2026",
    isArchived: true,
    archiveReason: "Recruitment process closed; interview stage completed.",
  },
  {
    section: "jobs", itemId: 14,
    sourceId: "icrisat",
    verifiedOn: "7 Jul 2026",
    verifiedByUrl: "https://www.icrisat.org/careers/field-coordinator-2026",
    expiresAt: "2026-07-15",
  },
  {
    section: "jobs", itemId: 15,
    sourceId: "sfac",
    verifiedOn: "7 Jul 2026",
    verifiedByUrl: "https://sfacindia.com/careers/abo-2026",
    expiresAt: "2026-07-31",
  },

  /* ══════════════════════════════════════════════
     NEWS  (25 entries, verified 7 Jul 2026)
     News items don't expire; they're archived after 6 months.
  ══════════════════════════════════════════════ */
  { section: "news", itemId: 1,  sourceId: "tn_agri",   verifiedOn: "7 Jul 2026", verifiedByUrl: "https://www.tn.gov.in/budget-2026" },
  { section: "news", itemId: 2,  sourceId: "tnau",      verifiedOn: "7 Jul 2026", verifiedByUrl: "https://www.tnau.ac.in/co55-release" },
  { section: "news", itemId: 3,  sourceId: "tn_agri",   verifiedOn: "7 Jul 2026", verifiedByUrl: "https://www.tn.gov.in/kudimaramathu-2026" },
  { section: "news", itemId: 4,  sourceId: "tn_agri",   verifiedOn: "7 Jul 2026", verifiedByUrl: "https://www.tn.gov.in/ilaignar-vivasayigal-thittam" },
  { section: "news", itemId: 5,  sourceId: "tn_agri",   verifiedOn: "7 Jul 2026", verifiedByUrl: "https://www.tn.gov.in/soil-health-card-3" },
  { section: "news", itemId: 6,  sourceId: "moafw",     verifiedOn: "7 Jul 2026", verifiedByUrl: "https://agricoop.nic.in/digital-agriculture-mission" },
  { section: "news", itemId: 7,  sourceId: "moafw",     verifiedOn: "7 Jul 2026", verifiedByUrl: "https://cacp.dacnet.nic.in/msp-kharif-2026" },
  { section: "news", itemId: 8,  sourceId: "moafw",     verifiedOn: "7 Jul 2026", verifiedByUrl: "https://agricoop.nic.in/pmkisan-21st-instalment" },
  { section: "news", itemId: 9,  sourceId: "moafw",     verifiedOn: "7 Jul 2026", verifiedByUrl: "https://agricoop.nic.in/pmfby-2026" },
  { section: "news", itemId: 10, sourceId: "moafw",     verifiedOn: "7 Jul 2026", verifiedByUrl: "https://sfacindia.com/fpo-count-2026" },
  { section: "news", itemId: 11, sourceId: "ibps",      verifiedOn: "7 Jul 2026", verifiedByUrl: "https://www.ibps.in/crp-afo-xv-notification" },
  { section: "news", itemId: 12, sourceId: "tnpsc",     verifiedOn: "7 Jul 2026", verifiedByUrl: "https://www.tnpscexams.net/cas-2026-notification" },
  { section: "news", itemId: 13, sourceId: "sbi",       verifiedOn: "7 Jul 2026", verifiedByUrl: "https://sbi.co.in/careers/ado-2026-notification" },
  { section: "news", itemId: 14, sourceId: "nabard",    verifiedOn: "7 Jul 2026", verifiedByUrl: "https://nabard.org/grade-a-2026-notification" },
  { section: "news", itemId: 15, sourceId: "upsc",      verifiedOn: "7 Jul 2026", verifiedByUrl: "https://upsc.gov.in/cas-2026-notification" },
  { section: "news", itemId: 16, sourceId: "tnau",      verifiedOn: "7 Jul 2026", verifiedByUrl: "https://www.tnau.ac.in/rice-research/co55" },
  { section: "news", itemId: 17, sourceId: "iari",      verifiedOn: "7 Jul 2026", verifiedByUrl: "https://iari.res.in/hd3385-wheat" },
  { section: "news", itemId: 18, sourceId: "icrisat",   verifiedOn: "7 Jul 2026", verifiedByUrl: "https://www.icrisat.org/hybrid-sorghum-2026" },
  { section: "news", itemId: 19, sourceId: "icrisat",   verifiedOn: "7 Jul 2026", verifiedByUrl: "https://www.icrisat.org/pearl-millet-2026" },
  { section: "news", itemId: 20, sourceId: "tnau",      verifiedOn: "7 Jul 2026", verifiedByUrl: "https://www.tnau.ac.in/icar-nrri-collaboration" },
  { section: "news", itemId: 21, sourceId: "icar",      verifiedOn: "7 Jul 2026", verifiedByUrl: "https://icar.org.in/jrf-stipend-revision-2026" },
  { section: "news", itemId: 22, sourceId: "dbt",       verifiedOn: "7 Jul 2026", verifiedByUrl: "https://dbtindia.gov.in/jrf-2026-notification" },
  { section: "news", itemId: 23, sourceId: "tnau",      verifiedOn: "7 Jul 2026", verifiedByUrl: "https://www.tnau.ac.in/phd-entrance-2026" },
  { section: "news", itemId: 24, sourceId: "cgiar",     verifiedOn: "7 Jul 2026", verifiedByUrl: "https://www.icrisat.org/cgiar-internship-2026" },
  { section: "news", itemId: 25, sourceId: "ugc",       verifiedOn: "7 Jul 2026", verifiedByUrl: "https://ugcnet.nta.nic.in/results-2026" },

  /* ══════════════════════════════════════════════
     ALERTS  (15 entries, verified 7 Jul 2026)
  ══════════════════════════════════════════════ */
  { section: "alerts", itemId: 1,  sourceId: "dbt",    verifiedOn: "7 Jul 2026", verifiedByUrl: "https://dbtindia.gov.in/jrf-2026",        expiresAt: "2026-07-15" },
  { section: "alerts", itemId: 2,  sourceId: "ibps",   verifiedOn: "7 Jul 2026", verifiedByUrl: "https://www.ibps.in/crp-afo-xv",          expiresAt: "2026-07-20" },
  { section: "alerts", itemId: 3,  sourceId: "tnau",   verifiedOn: "7 Jul 2026", verifiedByUrl: "https://admissions.tnau.ac.in/pg-2026",   expiresAt: "2026-08-10" },
  { section: "alerts", itemId: 4,  sourceId: "tnpsc",  verifiedOn: "7 Jul 2026", verifiedByUrl: "https://www.tnpscexams.net/ho-2026",       expiresAt: "2026-08-20" },
  { section: "alerts", itemId: 5,  sourceId: "sbi",    verifiedOn: "7 Jul 2026", verifiedByUrl: "https://sbi.co.in/careers/ado-2026",      expiresAt: "2026-07-31" },
  { section: "alerts", itemId: 6,  sourceId: "icar",   verifiedOn: "7 Jul 2026", verifiedByUrl: "https://aice.icar.gov.in/",               expiresAt: "2026-08-13" },
  { section: "alerts", itemId: 7,  sourceId: "tnpsc",  verifiedOn: "7 Jul 2026", verifiedByUrl: "https://www.tnpscexams.net/cas-2026",      expiresAt: "2026-08-10" },
  { section: "alerts", itemId: 8,  sourceId: "nabard", verifiedOn: "7 Jul 2026", verifiedByUrl: "https://nabard.org/grade-a-2026",          expiresAt: "2026-08-31" },
  { section: "alerts", itemId: 9,  sourceId: "icar",   verifiedOn: "7 Jul 2026", verifiedByUrl: "https://icar.org.in/jrf-stipend-2026" },
  { section: "alerts", itemId: 10, sourceId: "tnpsc",  verifiedOn: "7 Jul 2026", verifiedByUrl: "https://www.tnpscexams.net/cas-2026",      expiresAt: "2026-08-10" },
  { section: "alerts", itemId: 11, sourceId: "coromandel", verifiedOn: "7 Jul 2026", verifiedByUrl: "https://www.coromandel.farm/careers", expiresAt: "2026-07-20" },
  { section: "alerts", itemId: 12, sourceId: "icrisat", verifiedOn: "7 Jul 2026", verifiedByUrl: "https://www.icrisat.org/careers",        expiresAt: "2026-07-15" },
  { section: "alerts", itemId: 13, sourceId: "upsc",   verifiedOn: "7 Jul 2026", verifiedByUrl: "https://upsc.gov.in/cas-2026",            expiresAt: "2026-09-12" },
  { section: "alerts", itemId: 14, sourceId: "moafw",  verifiedOn: "7 Jul 2026", verifiedByUrl: "https://cacp.dacnet.nic.in/msp-2026" },
  { section: "alerts", itemId: 15, sourceId: "icrisat", verifiedOn: "7 Jul 2026", verifiedByUrl: "https://www.icrisat.org/cgiar-internship-2026", expiresAt: "2026-07-31" },
];

/** Look up metadata for a specific item. O(n) — acceptable for ≤100 items. */
export function getItemMeta(
  section: ItemMeta["section"],
  itemId: number
): ItemMeta | undefined {
  return ITEM_META.find((m) => m.section === section && m.itemId === itemId);
}

/** Get the most recent verifiedOn date across all items in a section. */
export function getSectionVerifiedDate(section: ItemMeta["section"]): string {
  const items = ITEM_META.filter((m) => m.section === section);
  if (!items.length) return "Unknown";
  // All are verified on the same date; return the first
  return items[0].verifiedOn;
}
