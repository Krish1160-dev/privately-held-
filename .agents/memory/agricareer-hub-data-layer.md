---
name: AgriCareer Hub data layer
description: Architecture for the continuously-updatable data platform in AgriCareer Hub — how freshness, sources, and archive logic are wired.
---

## Rule
All content metadata lives in one file: `src/data/metadata.ts` (ITEM_META array). That is the only file an admin needs to edit to refresh content — no page or component changes needed.

**Why:** The user requirement was "refresh content without changing multiple files."

**How to apply:** When adding new exams/jobs/news/alerts, add entries to ITEM_META with `sourceId`, `verifiedOn`, `expiresAt`. The pages auto-archive expired items and auto-show the freshness bar.

## Key files
- `src/lib/dataLayer.ts` — SOURCE_REGISTRY (20 official bodies) + SECTION_REGISTRY (per-section sync metadata + API endpoint slots)
- `src/lib/freshness.ts` — parseFlexibleDate, isExpired, getDaysUntil, getDeadlineUrgency, partitionByExpiry, formatTimestamp
- `src/data/metadata.ts` — ITEM_META (66 entries: 11 exams, 15 jobs, 25 news, 15 alerts), getItemMeta, getSectionVerifiedDate
- `src/components/shared/DataFreshnessBar.tsx` — per-page freshness bar; expand to see all sources + sync info
- `src/components/shared/SourceBadge.tsx` — SourceBadge (from officialWebsite URL), SourceBadgeFromMeta (from metadata), VerifiedOn

## To switch to live API
1. Add `apiEndpoint` to the section's entry in SECTION_REGISTRY.
2. Change `dataMode` to `"api"`.
3. Uncomment the fetch block in `fetchSectionData()` in dataLayer.ts.
No page or component files need changes.

## Expiry / archive logic
- Exams: `partitionByExpiry` on `applicationDeadline`; skips items with status "upcoming" or "results" (still relevant even after deadline)
- Jobs: `partitionByExpiry` on `lastDate`; all past-deadline jobs go to "Closed Listings" accordion
- `parseFlexibleDate` handles "20 Jul 2026", "Closed", "Sep 2026 (expected)", ISO, and mixed formats

## Date format used in data files
"20 Jul 2026" — day month year. freshness.ts parses this correctly. "Closed" / "(Closed)" suffix → treated as definitively expired (maps to year 2000).
