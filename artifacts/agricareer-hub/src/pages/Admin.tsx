import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Shield, RefreshCw, Database, Globe, CheckCircle2,
  AlertTriangle, XCircle, Copy, Check, ExternalLink,
  Wifi, WifiOff, ChevronDown, ChevronRight, Server,
  Clock, Archive, Zap,
} from "lucide-react";
import { ITEM_META, type ItemMeta } from "@/data/metadata";
import { SOURCE_REGISTRY, SECTION_REGISTRY, type SourceCategory } from "@/lib/dataLayer";

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */

const TODAY = new Date("2026-07-07T00:00:00+05:30");

function daysSince(dateStr: string): number {
  const MONTHS: Record<string, number> = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
  };
  const parts = dateStr.trim().split(/\s+/);
  if (parts.length === 3) {
    const d = parseInt(parts[0], 10);
    const m = MONTHS[parts[1].toLowerCase().slice(0, 3)];
    const y = parseInt(parts[2], 10);
    if (!isNaN(d) && m !== undefined && !isNaN(y)) {
      const date = new Date(y, m, d);
      return Math.floor((TODAY.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    }
  }
  return 0;
}

function itemFreshness(item: ItemMeta): "fresh" | "stale" | "overdue" {
  const days = daysSince(item.verifiedOn);
  if (days < 14) return "fresh";
  if (days < 30) return "stale";
  return "overdue";
}

function expiryStatus(item: ItemMeta): "active" | "expiring-soon" | "expired" | "no-expiry" {
  if (item.isArchived) return "expired";
  if (!item.expiresAt) return "no-expiry";
  const exp = new Date(item.expiresAt + "T00:00:00+05:30");
  const diff = Math.floor((exp.getTime() - TODAY.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return "expired";
  if (diff <= 7) return "expiring-soon";
  return "active";
}

function formatDaysAgo(days: number): string {
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}

function copyToClipboard(text: string, onDone: () => void) {
  navigator.clipboard.writeText(text).then(onDone);
}

const SECTION_TABS = [
  { id: "all", label: "All Items" },
  { id: "exams", label: "Exams" },
  { id: "jobs", label: "Jobs" },
  { id: "news", label: "News" },
  { id: "alerts", label: "Alerts" },
] as const;

const CATEGORY_LABEL: Record<SourceCategory, string> = {
  "state-govt": "State Govt",
  "central-govt": "Central Govt",
  university: "University",
  bank: "Bank",
  research: "Research",
  ngo: "NGO",
  private: "Private",
  international: "International",
};

const CATEGORY_COLOR: Record<SourceCategory, string> = {
  "state-govt": "bg-emerald-100 text-emerald-700",
  "central-govt": "bg-sky-100 text-sky-700",
  university: "bg-violet-100 text-violet-700",
  bank: "bg-amber-100 text-amber-700",
  research: "bg-teal-100 text-teal-700",
  ngo: "bg-orange-100 text-orange-700",
  private: "bg-slate-100 text-slate-600",
  international: "bg-pink-100 text-pink-700",
};

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

function FreshnessBadge({ status }: { status: "fresh" | "stale" | "overdue" }) {
  const map = {
    fresh:   { icon: CheckCircle2, color: "bg-green-100 text-green-700",  label: "Fresh"   },
    stale:   { icon: AlertTriangle, color: "bg-amber-100 text-amber-700", label: "Stale"   },
    overdue: { icon: XCircle,       color: "bg-red-100 text-red-700",     label: "Overdue" },
  };
  const { icon: Icon, color, label } = map[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${color}`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}

function ExpiryBadge({ status }: { status: ReturnType<typeof expiryStatus> }) {
  if (status === "no-expiry") return <span className="text-xs text-slate-400">—</span>;
  const map = {
    active:         { color: "bg-green-50 text-green-600 border-green-200",   label: "Active"   },
    "expiring-soon":{ color: "bg-amber-50 text-amber-600 border-amber-200",   label: "⚠ Soon"  },
    expired:        { color: "bg-red-50 text-red-500 border-red-200",         label: "Expired"  },
  };
  const { color, label } = map[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${color}`}>
      {label}
    </span>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => copyToClipboard(text, () => { setCopied(true); setTimeout(() => setCopied(false), 1500); })}
      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
      title="Copy update snippet"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

/* ─────────────────────────────────────────────
   Main Page
───────────────────────────────────────────── */

export default function Admin() {
  const [tab, setTab] = useState<"all" | "exams" | "jobs" | "news" | "alerts">("all");
  const [apiExpanded, setApiExpanded] = useState(false);
  const [sourcesExpanded, setSourcesExpanded] = useState(false);

  const items = useMemo(() => {
    return tab === "all" ? ITEM_META : ITEM_META.filter((i) => i.section === tab);
  }, [tab]);

  const stats = useMemo(() => {
    const fresh   = ITEM_META.filter((i) => itemFreshness(i) === "fresh").length;
    const stale   = ITEM_META.filter((i) => itemFreshness(i) === "stale").length;
    const overdue = ITEM_META.filter((i) => itemFreshness(i) === "overdue").length;
    const archived = ITEM_META.filter((i) => i.isArchived || expiryStatus(i) === "expired").length;
    const expiringSoon = ITEM_META.filter((i) => expiryStatus(i) === "expiring-soon").length;
    return { fresh, stale, overdue, archived, expiringSoon, total: ITEM_META.length };
  }, []);

  const sources = Object.values(SOURCE_REGISTRY);
  const sections = Object.values(SECTION_REGISTRY);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Content Admin Dashboard</h1>
            <p className="text-xs text-muted-foreground">
              Hidden page · /admin · Last viewed: {TODAY.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-3 max-w-2xl">
          Manage freshness of all 66 items across 5 sections. Update <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">src/data/metadata.ts</code> to refresh content — no other files need changing.
        </p>
      </motion.div>

      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {[
          { label: "Total Items",     value: stats.total,        color: "text-foreground",  bg: "bg-card",             icon: Database },
          { label: "Fresh",           value: stats.fresh,        color: "text-green-600",   bg: "bg-green-50",         icon: CheckCircle2 },
          { label: "Stale (14–30d)",  value: stats.stale,        color: "text-amber-600",   bg: "bg-amber-50",         icon: AlertTriangle },
          { label: "Overdue (30d+)",  value: stats.overdue,      color: "text-red-600",     bg: "bg-red-50",           icon: XCircle },
          { label: "Expiring Soon",   value: stats.expiringSoon, color: "text-orange-600",  bg: "bg-orange-50",        icon: Clock },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} rounded-2xl border border-card-border px-4 py-3.5 flex items-center gap-3`}>
            <s.icon className={`w-5 h-5 shrink-0 ${s.color}`} />
            <div>
              <div className={`text-2xl font-extrabold leading-none ${s.color}`}>{s.value}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Items Table ── */}
      <div className="bg-card rounded-2xl border border-card-border mb-6 overflow-hidden">
        <div className="px-5 py-4 border-b border-card-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-bold text-foreground text-sm">Item Freshness Registry</h2>
            <span className="text-[11px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">
              {items.length} item{items.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex gap-1">
            {SECTION_TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  tab === t.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-slate-100"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-[2rem_5rem_1fr_6rem_5rem_6rem_5rem_2.5rem] gap-x-3 px-5 py-2.5 bg-slate-50 border-b border-card-border text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          <span>#</span>
          <span>Section</span>
          <span>Source / URL</span>
          <span>Verified On</span>
          <span>Age</span>
          <span>Expires</span>
          <span>Status</span>
          <span></span>
        </div>

        {/* Table rows */}
        <div className="divide-y divide-slate-100">
          {items.map((item) => {
            const freshness = itemFreshness(item);
            const expiry    = expiryStatus(item);
            const days      = daysSince(item.verifiedOn);
            const src       = SOURCE_REGISTRY[item.sourceId];
            const snippet   = `{ section: "${item.section}", itemId: ${item.itemId},\n  sourceId: "${item.sourceId}",\n  verifiedOn: "7 Jul 2026",\n  verifiedByUrl: "${item.verifiedByUrl}" }`;

            return (
              <div
                key={`${item.section}-${item.itemId}`}
                className={`grid grid-cols-[2rem_5rem_1fr_6rem_5rem_6rem_5rem_2.5rem] gap-x-3 px-5 py-3 items-center text-sm hover:bg-slate-50 transition-colors ${
                  item.isArchived ? "opacity-60" : ""
                }`}
              >
                <span className="text-[11px] text-muted-foreground font-mono">{item.itemId}</span>
                <span className="text-[11px] font-semibold capitalize text-slate-500">{item.section}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="font-semibold text-xs text-foreground truncate">{src?.name ?? item.sourceId}</span>
                    {item.isArchived && (
                      <span className="shrink-0 flex items-center gap-0.5 text-[10px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded-full">
                        <Archive className="w-2.5 h-2.5" /> Archived
                      </span>
                    )}
                  </div>
                  <a
                    href={item.verifiedByUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-primary hover:underline truncate flex items-center gap-1 max-w-[280px]"
                  >
                    <span className="truncate">{item.verifiedByUrl.replace(/^https?:\/\//, "")}</span>
                    <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                  </a>
                </div>
                <span className="text-xs text-foreground">{item.verifiedOn}</span>
                <span className={`text-xs font-medium ${days === 0 ? "text-green-600" : days < 14 ? "text-slate-600" : days < 30 ? "text-amber-600" : "text-red-600"}`}>
                  {formatDaysAgo(days)}
                </span>
                <span className="text-xs text-slate-500 font-mono">{item.expiresAt ?? "—"}</span>
                <div className="flex flex-col gap-1">
                  <FreshnessBadge status={freshness} />
                  <ExpiryBadge status={expiry} />
                </div>
                <CopyButton text={snippet} />
              </div>
            );
          })}
        </div>

        <div className="px-5 py-3 bg-slate-50 border-t border-card-border">
          <p className="text-[11px] text-muted-foreground">
            <span className="font-semibold">How to refresh:</span> Copy a row's snippet → open{" "}
            <code className="bg-slate-200 px-1 rounded">src/data/metadata.ts</code> → update{" "}
            <code className="bg-slate-200 px-1 rounded">verifiedOn</code> to today → run typecheck → commit.
          </p>
        </div>
      </div>

      {/* ── API Mode Config ── */}
      <div className="bg-card rounded-2xl border border-card-border mb-6 overflow-hidden">
        <button
          onClick={() => setApiExpanded((p) => !p)}
          className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
              <Server className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-foreground text-sm">API Mode Configuration</h2>
              <p className="text-[11px] text-muted-foreground">Switch sections from static to live API or RSS feeds</p>
            </div>
          </div>
          {apiExpanded
            ? <ChevronDown className="w-4 h-4 text-muted-foreground" />
            : <ChevronRight className="w-4 h-4 text-muted-foreground" />
          }
        </button>

        {apiExpanded && (
          <div className="border-t border-card-border">
            {/* How-to banner */}
            <div className="px-5 py-4 bg-primary/5 border-b border-primary/10">
              <div className="flex gap-2.5">
                <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div className="text-xs text-foreground">
                  <span className="font-semibold">To connect a live API for any section:</span>
                  <ol className="mt-1.5 space-y-0.5 text-muted-foreground list-decimal list-inside">
                    <li>Add <code className="bg-white/60 px-1 rounded font-mono">apiEndpoint</code> to the section entry in <code className="bg-white/60 px-1 rounded font-mono">src/lib/dataLayer.ts → SECTION_REGISTRY</code></li>
                    <li>Change <code className="bg-white/60 px-1 rounded font-mono">dataMode</code> from <code className="bg-white/60 px-1 rounded font-mono">"static"</code> to <code className="bg-white/60 px-1 rounded font-mono">"api"</code> or <code className="bg-white/60 px-1 rounded font-mono">"rss"</code></li>
                    <li>Uncomment the fetch block in <code className="bg-white/60 px-1 rounded font-mono">fetchSectionData()</code></li>
                    <li>No page or component files need changes — only <code className="bg-white/60 px-1 rounded font-mono">dataLayer.ts</code></li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Section table */}
            <div className="divide-y divide-slate-100">
              {sections.map((section) => (
                <div key={section.id} className="px-5 py-4 grid grid-cols-[1fr_auto_auto_auto_auto] gap-x-6 items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold text-sm text-foreground">{section.label}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                        section.dataMode === "static"
                          ? "bg-slate-100 text-slate-500"
                          : section.dataMode === "api"
                          ? "bg-green-100 text-green-600"
                          : "bg-sky-100 text-sky-600"
                      }`}>
                        {section.dataMode === "static" ? <WifiOff className="w-2.5 h-2.5" /> : <Wifi className="w-2.5 h-2.5" />}
                        {section.dataMode.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">{section.description}</p>
                    <div className="mt-2 space-y-1">
                      <EndpointSlot label="API" endpoint={section.apiEndpoint} placeholder={`https://api.agricareerhub.in/v1/${section.id}`} />
                      <EndpointSlot label="RSS" endpoint={section.rssEndpoint} placeholder="No RSS feed configured" />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-extrabold text-foreground">{section.activeItems}</div>
                    <div className="text-[10px] text-muted-foreground">Active</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-extrabold text-slate-400">{section.totalItems}</div>
                    <div className="text-[10px] text-muted-foreground">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-foreground">{section.syncIntervalHours}h</div>
                    <div className="text-[10px] text-muted-foreground">Interval</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-foreground">{section.sourceIds.length}</div>
                    <div className="text-[10px] text-muted-foreground">Sources</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Source Registry ── */}
      <div className="bg-card rounded-2xl border border-card-border overflow-hidden">
        <button
          onClick={() => setSourcesExpanded((p) => !p)}
          className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Globe className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <h2 className="font-bold text-foreground text-sm">Source Registry</h2>
              <p className="text-[11px] text-muted-foreground">{sources.length} official bodies · all government-verified</p>
            </div>
          </div>
          {sourcesExpanded
            ? <ChevronDown className="w-4 h-4 text-muted-foreground" />
            : <ChevronRight className="w-4 h-4 text-muted-foreground" />
          }
        </button>

        {sourcesExpanded && (
          <div className="border-t border-card-border">
            <div className="grid grid-cols-[3rem_1fr_1fr_5rem_4rem_3rem] gap-x-3 px-5 py-2.5 bg-slate-50 border-b border-card-border text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <span>ID</span>
              <span>Name / Full Name</span>
              <span>Official URL</span>
              <span>Category</span>
              <span>Refresh</span>
              <span>Status</span>
            </div>
            <div className="divide-y divide-slate-100">
              {sources.map((src) => (
                <div
                  key={src.id}
                  className="grid grid-cols-[3rem_1fr_1fr_5rem_4rem_3rem] gap-x-3 px-5 py-3 items-center hover:bg-slate-50 transition-colors"
                >
                  <span className="text-[11px] font-mono text-muted-foreground">{src.id}</span>
                  <div>
                    <div className="text-xs font-semibold text-foreground">{src.name}</div>
                    <div className="text-[11px] text-muted-foreground truncate max-w-[180px]">{src.fullName}</div>
                  </div>
                  <a
                    href={src.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-primary hover:underline truncate flex items-center gap-1"
                  >
                    <span className="truncate">{src.officialUrl.replace(/^https?:\/\//, "")}</span>
                    <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                  </a>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block w-fit ${CATEGORY_COLOR[src.category]}`}>
                    {CATEGORY_LABEL[src.category]}
                  </span>
                  <span className="text-xs text-muted-foreground">{src.refreshIntervalDays}d</span>
                  <div className="flex items-center">
                    {src.isVerifiedOfficial
                      ? <CheckCircle2 className="w-4 h-4 text-green-500" />
                      : <AlertTriangle className="w-4 h-4 text-amber-400" />
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Footer note ── */}
      <p className="text-center text-[11px] text-muted-foreground mt-8">
        Admin Dashboard · AgriCareer Hub · This page is not linked from the public navbar.
        Access via <code className="bg-slate-100 px-1.5 rounded font-mono">/admin</code>
      </p>
    </div>
  );
}

/* ── Endpoint slot helper ── */
function EndpointSlot({
  label,
  endpoint,
  placeholder,
}: {
  label: string;
  endpoint?: string;
  placeholder: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[10px] font-bold text-slate-400 uppercase w-7 shrink-0">{label}</span>
      {endpoint ? (
        <a
          href={endpoint}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-primary hover:underline font-mono truncate"
        >
          {endpoint}
        </a>
      ) : (
        <span className="text-[11px] text-slate-400 font-mono">{placeholder}</span>
      )}
    </div>
  );
}
