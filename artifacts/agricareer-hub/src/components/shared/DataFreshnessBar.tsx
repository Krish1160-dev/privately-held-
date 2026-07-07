import { useState } from "react";
import { CheckCircle2, RefreshCw, ChevronDown, ExternalLink, Clock, ShieldCheck, Wifi } from "lucide-react";
import { SECTION_REGISTRY, getSectionSources, formatSyncedAt, isSectionOverdue } from "@/lib/dataLayer";
import { getSectionVerifiedDate } from "@/data/metadata";

interface DataFreshnessBarProps {
  sectionId: string;
  className?: string;
}

export default function DataFreshnessBar({ sectionId, className = "" }: DataFreshnessBarProps) {
  const [expanded, setExpanded] = useState(false);
  const section = SECTION_REGISTRY[sectionId];
  if (!section) return null;

  const sources = getSectionSources(sectionId);
  const overdue = isSectionOverdue(sectionId);
  const verifiedDate = getSectionVerifiedDate(section.id as "exams" | "jobs" | "news" | "alerts");
  const syncedAt = formatSyncedAt(sectionId);

  return (
    <div className={`rounded-xl border text-sm ${overdue ? "bg-amber-50 border-amber-200" : "bg-green-50 border-green-200"} ${className}`}>
      {/* Summary row */}
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 flex-wrap">
        <div className="flex items-center gap-2">
          {overdue ? (
            <RefreshCw className="w-4 h-4 text-amber-600 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          )}
          <span className={`font-semibold text-xs ${overdue ? "text-amber-700" : "text-green-700"}`}>
            {overdue
              ? "Data may be outdated — refresh recommended"
              : `Verified ${verifiedDate} · All data sourced from official government portals`}
          </span>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {/* Mode badge */}
          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
            section.dataMode === "static"
              ? "bg-sky-100 text-sky-700 border-sky-200"
              : "bg-green-200 text-green-800 border-green-300"
          }`}>
            <Wifi className="w-2.5 h-2.5" />
            {section.dataMode === "static" ? "STATIC" : section.dataMode.toUpperCase()}
          </span>

          {/* Expand toggle */}
          <button
            onClick={() => setExpanded((p) => !p)}
            className={`flex items-center gap-1 text-xs font-semibold transition-colors ${
              overdue ? "text-amber-600 hover:text-amber-800" : "text-green-700 hover:text-green-900"
            }`}
            aria-label="Toggle source details"
          >
            {expanded ? "Hide" : "Sources"}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {/* Expanded source details */}
      {expanded && (
        <div className="px-4 pb-4 pt-1 border-t border-current/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Left: source list */}
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Official Sources
              </div>
              <div className="flex flex-wrap gap-1.5">
                {sources.map((src) => (
                  <a
                    key={src.id}
                    href={src.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-lg border transition-colors hover:opacity-80 ${
                      overdue
                        ? "bg-amber-100 text-amber-800 border-amber-200"
                        : "bg-green-100 text-green-800 border-green-200"
                    }`}
                    title={src.fullName}
                  >
                    {src.name}
                    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right: sync metadata */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                <Clock className="w-3.5 h-3.5 text-primary" /> Sync Info
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                <div className="flex justify-between gap-2">
                  <span>Last synced:</span>
                  <span className="font-semibold text-foreground">{syncedAt}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span>Refresh cycle:</span>
                  <span className="font-semibold text-foreground">Every {section.syncIntervalHours}h</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span>Data mode:</span>
                  <span className="font-semibold text-foreground capitalize">{section.dataMode}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span>Active items:</span>
                  <span className="font-semibold text-foreground">{section.activeItems} / {section.totalItems}</span>
                </div>
              </div>

              {section.dataMode === "static" && (
                <p className="text-[10px] text-muted-foreground/70 mt-2 leading-relaxed border-t border-current/10 pt-2">
                  Currently using verified static data. Live API integration ready — configure
                  <code className="mx-1 px-1 bg-muted rounded text-[10px]">apiEndpoint</code>
                  in <code className="px-1 bg-muted rounded text-[10px]">dataLayer.ts</code> to switch.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
