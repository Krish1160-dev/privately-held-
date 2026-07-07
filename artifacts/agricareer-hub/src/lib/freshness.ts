/**
 * Freshness utilities — date parsing, expiry detection, deadline urgency.
 * Used by all pages to determine whether an item is active, expiring, or archived.
 */

const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

/**
 * Parse a human date string like "20 Jul 2026" or ISO "2026-07-20" into a Date.
 * Returns null for strings containing "Closed", "Expected", "TBA", etc.
 */
export function parseFlexibleDate(raw: string): Date | null {
  if (!raw) return null;
  const str = raw.trim();

  // Already archived markers — treat as definitively expired
  if (/closed|tba|n\/a|na|—|–/i.test(str)) return new Date("2000-01-01");

  // Strip parenthetical notes like "(Closed)", "(expected)", "(as per schedule)"
  const clean = str.replace(/\(.*?\)/g, "").trim();

  // ISO format: 2026-07-20
  if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) return new Date(clean + "T00:00:00+05:30");

  // "20 Jul 2026"
  const parts = clean.split(/\s+/);
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = MONTHS[parts[1].toLowerCase().slice(0, 3)];
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && month !== undefined && !isNaN(year)) {
      return new Date(year, month, day, 23, 59, 59);
    }
  }

  // "Jul 2026" — use last day of month
  if (parts.length === 2) {
    const month = MONTHS[parts[0].toLowerCase().slice(0, 3)];
    const year = parseInt(parts[1], 10);
    if (month !== undefined && !isNaN(year)) {
      const lastDay = new Date(year, month + 1, 0).getDate();
      return new Date(year, month, lastDay, 23, 59, 59);
    }
  }

  // "Sep 2026 (expected)" after clean
  const m = clean.match(/(\w{3,})\s+(\d{4})/i);
  if (m) {
    const month = MONTHS[m[1].toLowerCase().slice(0, 3)];
    const year = parseInt(m[2], 10);
    if (month !== undefined && !isNaN(year)) {
      const lastDay = new Date(year, month + 1, 0).getDate();
      return new Date(year, month, lastDay, 23, 59, 59);
    }
  }

  return null;
}

/** Returns true when the given date string is in the past. */
export function isExpired(dateStr: string): boolean {
  const d = parseFlexibleDate(dateStr);
  if (!d) return false;
  return d.getTime() < Date.now();
}

/** Returns the number of days until (positive) or since (negative) the given date. */
export function getDaysUntil(dateStr: string): number {
  const d = parseFlexibleDate(dateStr);
  if (!d) return Infinity;
  return Math.ceil((d.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

export type DeadlineUrgency =
  | "expired"       // deadline passed
  | "today"         // 0 days left
  | "critical"      // 1–3 days
  | "urgent"        // 4–7 days
  | "approaching"   // 8–14 days
  | "upcoming"      // 15–30 days
  | "open";         // 30+ days away

/** Classify the urgency of a deadline date string. */
export function getDeadlineUrgency(dateStr: string): DeadlineUrgency {
  const days = getDaysUntil(dateStr);
  if (days < 0)   return "expired";
  if (days === 0) return "today";
  if (days <= 3)  return "critical";
  if (days <= 7)  return "urgent";
  if (days <= 14) return "approaching";
  if (days <= 30) return "upcoming";
  return "open";
}

/** Human-readable relative label: "3 days left", "Closed 4 days ago", "Closed". */
export function getDeadlineLabel(dateStr: string): string {
  if (/closed/i.test(dateStr)) return "Closed";
  const days = getDaysUntil(dateStr);
  if (!isFinite(days)) return dateStr;
  if (days < 0) return `Closed ${Math.abs(days)} day${Math.abs(days) !== 1 ? "s" : ""} ago`;
  if (days === 0) return "Closes today!";
  if (days === 1) return "1 day left";
  return `${days} days left`;
}

/** Tailwind colour classes for urgency badges. */
export const URGENCY_BADGE: Record<DeadlineUrgency, { className: string; label: string }> = {
  expired:    { className: "bg-slate-100 text-slate-500 border-slate-200",    label: "Closed" },
  today:      { className: "bg-red-100 text-red-700 border-red-200 animate-pulse", label: "Closes Today" },
  critical:   { className: "bg-red-100 text-red-700 border-red-200",          label: "Critical" },
  urgent:     { className: "bg-orange-100 text-orange-700 border-orange-200", label: "Urgent" },
  approaching:{ className: "bg-amber-100 text-amber-700 border-amber-200",    label: "Closing Soon" },
  upcoming:   { className: "bg-yellow-100 text-yellow-700 border-yellow-200", label: "Upcoming" },
  open:       { className: "bg-green-100 text-green-700 border-green-200",    label: "Open" },
};

/**
 * Partition a list of items into active and archived based on an expiry field.
 * Items where `getExpiry(item)` returns a past date go to `archived`.
 */
export function partitionByExpiry<T>(
  items: T[],
  getExpiry: (item: T) => string | undefined
): { active: T[]; archived: T[] } {
  const active: T[] = [];
  const archived: T[] = [];
  for (const item of items) {
    const raw = getExpiry(item);
    if (raw && isExpired(raw)) {
      archived.push(item);
    } else {
      active.push(item);
    }
  }
  return { active, archived };
}

/**
 * Check if a data entry is stale (verifiedOn is older than thresholdDays).
 * Default threshold: 30 days for government data.
 */
export function isDataStale(verifiedOn: string, thresholdDays = 30): boolean {
  const days = getDaysUntil(verifiedOn);
  return days < -thresholdDays; // days is negative (past), stale if more negative than threshold
}

/** Format an ISO timestamp as "7 Jul 2026, 10:00 AM IST". */
export function formatTimestamp(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
      timeZoneName: "short",
    });
  } catch {
    return iso;
  }
}

/** Short format: "7 Jul 2026". */
export function formatDateShort(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    });
  } catch {
    return iso;
  }
}
