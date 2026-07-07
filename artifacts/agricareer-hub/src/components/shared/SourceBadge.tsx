import { ShieldCheck, ExternalLink } from "lucide-react";
import { sourceFromUrl, SOURCE_REGISTRY, type SourceConfig } from "@/lib/dataLayer";
import { getItemMeta, type ItemMeta } from "@/data/metadata";
import { isDataStale } from "@/lib/freshness";

/* ─── Derive a SourceConfig from either a URL or a sourceId ─ */
function resolveSource(urlOrId: string): SourceConfig | undefined {
  // Try direct key lookup first
  if (SOURCE_REGISTRY[urlOrId]) return SOURCE_REGISTRY[urlOrId];
  // Try URL-based lookup
  return sourceFromUrl(urlOrId);
}

/* ─── Variant: derives source from existing officialWebsite string ─────── */
interface SourceBadgeUrlProps {
  officialWebsite: string;
  verifiedOn?: string;
  size?: "sm" | "md";
  className?: string;
}

export function SourceBadge({ officialWebsite, verifiedOn, size = "sm", className = "" }: SourceBadgeUrlProps) {
  const source = resolveSource(officialWebsite);
  const stale = verifiedOn ? isDataStale(verifiedOn, 30) : false;

  const domain = officialWebsite.replace(/^https?:\/\//, "").split("/")[0];
  const displayName = source?.name ?? domain;
  const url = source?.officialUrl ?? `https://${officialWebsite}`;

  const cls = size === "md"
    ? "text-xs px-2.5 py-1 gap-1.5"
    : "text-[10px] px-2 py-0.5 gap-1";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center rounded-full border font-semibold transition-colors hover:opacity-80 ${cls} ${
        stale
          ? "bg-amber-50 text-amber-700 border-amber-200"
          : "bg-green-50 text-green-700 border-green-200"
      } ${className}`}
      title={source?.fullName ?? `Official source: ${domain}`}
    >
      <ShieldCheck className={size === "md" ? "w-3.5 h-3.5" : "w-3 h-3"} />
      {displayName}
      <ExternalLink className={`opacity-50 ${size === "md" ? "w-3 h-3" : "w-2.5 h-2.5"}`} />
    </a>
  );
}

/* ─── Variant: derives everything from metadata lookup ─────────────────── */
interface SourceBadgeMetaProps {
  section: ItemMeta["section"];
  itemId: number;
  size?: "sm" | "md";
  className?: string;
}

export function SourceBadgeFromMeta({ section, itemId, size = "sm", className = "" }: SourceBadgeMetaProps) {
  const meta = getItemMeta(section, itemId);
  if (!meta) return null;
  const source = SOURCE_REGISTRY[meta.sourceId];
  if (!source) return null;
  const stale = isDataStale(meta.verifiedOn, 30);

  const cls = size === "md"
    ? "text-xs px-2.5 py-1 gap-1.5"
    : "text-[10px] px-2 py-0.5 gap-1";

  return (
    <a
      href={meta.verifiedByUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center rounded-full border font-semibold transition-colors hover:opacity-80 ${cls} ${
        stale
          ? "bg-amber-50 text-amber-700 border-amber-200"
          : "bg-green-50 text-green-700 border-green-200"
      } ${className}`}
      title={`Verified: ${meta.verifiedOn} · Source: ${source.fullName}`}
    >
      <ShieldCheck className={size === "md" ? "w-3.5 h-3.5" : "w-3 h-3"} />
      {source.name}
      <ExternalLink className={`opacity-50 ${size === "md" ? "w-3 h-3" : "w-2.5 h-2.5"}`} />
    </a>
  );
}

/* ─── Compact "Verified on" line ─────────────────────────────────────────── */
interface VerifiedOnProps {
  section: ItemMeta["section"];
  itemId: number;
  className?: string;
}

export function VerifiedOn({ section, itemId, className = "" }: VerifiedOnProps) {
  const meta = getItemMeta(section, itemId);
  if (!meta) return null;
  const stale = isDataStale(meta.verifiedOn, 30);

  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-medium ${stale ? "text-amber-600" : "text-muted-foreground"} ${className}`}>
      <ShieldCheck className="w-3 h-3" />
      Verified {meta.verifiedOn}
      {stale && <span className="text-amber-500"> · may be outdated</span>}
    </span>
  );
}
