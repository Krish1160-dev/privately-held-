import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell, Search, CheckCheck, BookOpen, Briefcase, Clock,
  FileText, CheckCircle2, AlertTriangle, Info, Calendar,
  IndianRupee, Globe, X, ExternalLink, Filter, BellOff,
  TrendingUp, ChevronRight,
} from "lucide-react";
import { initialAlerts, type Alert, type AlertType } from "@/data/alerts";

/* ─── Icon map ─────────────────────────────────────── */
const iconMap: Record<string, React.ElementType> = {
  Bell, BookOpen, Briefcase, Clock, FileText, CheckCircle2,
  AlertTriangle, Info, Calendar, IndianRupee, Globe, TrendingUp,
};

/* ─── Status badge config ──────────────────────────── */
const statusConfig = {
  new:             { label: "NEW",           className: "bg-green-100 text-green-700 border-green-200",   dot: "bg-green-500" },
  urgent:          { label: "URGENT",        className: "bg-red-100 text-red-700 border-red-200",         dot: "bg-red-500 animate-pulse" },
  "deadline-soon": { label: "DEADLINE SOON", className: "bg-amber-100 text-amber-700 border-amber-200",   dot: "bg-amber-500" },
  info:            { label: "INFO",          className: "bg-sky-100 text-sky-700 border-sky-200",         dot: "bg-sky-400" },
};

/* ─── Type config ──────────────────────────────────── */
const typeConfig: Record<AlertType, { label: string; icon: React.ElementType; badgeCls: string }> = {
  exam:         { label: "Exam",       icon: BookOpen,    badgeCls: "bg-violet-100 text-violet-700 border-violet-200" },
  job:          { label: "Job",        icon: Briefcase,   badgeCls: "bg-orange-100 text-orange-700 border-orange-200" },
  deadline:     { label: "Deadline",   icon: Clock,       badgeCls: "bg-red-100 text-red-700 border-red-200" },
  "admit-card": { label: "Admit Card", icon: FileText,    badgeCls: "bg-amber-100 text-amber-700 border-amber-200" },
  result:       { label: "Result",     icon: CheckCircle2, badgeCls: "bg-green-100 text-green-700 border-green-200" },
};

const tabs: { key: "all" | AlertType; label: string }[] = [
  { key: "all",         label: "All" },
  { key: "exam",        label: "Exams" },
  { key: "job",         label: "Jobs" },
  { key: "deadline",    label: "Deadlines" },
  { key: "admit-card",  label: "Admit Cards" },
  { key: "result",      label: "Results" },
];

/* ─── Alert Card ───────────────────────────────────── */
function AlertCard({
  alert,
  onToggleRead,
}: {
  alert: Alert;
  onToggleRead: (id: number) => void;
}) {
  const Icon = iconMap[alert.icon] ?? Bell;
  const status = statusConfig[alert.status];
  const typeCfg = typeConfig[alert.type];
  const TypeIcon = typeCfg.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.18 }}
      className={`bg-card rounded-xl border transition-all duration-200 hover:shadow-md group ${
        alert.isRead
          ? "border-border opacity-75 hover:opacity-100"
          : "border-primary/20 shadow-sm"
      }`}
      data-testid={`alert-card-${alert.id}`}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Unread dot + icon */}
          <div className="relative shrink-0 mt-0.5">
            {!alert.isRead && (
              <span className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-card ${status.dot}`} />
            )}
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${alert.isRead ? "bg-muted" : "bg-primary/10"}`}>
              <Icon className={`w-5 h-5 ${alert.isRead ? "text-muted-foreground" : "text-primary"}`} />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className={`text-sm font-bold leading-snug ${alert.isRead ? "text-muted-foreground" : "text-foreground"}`}>
                {alert.title}
              </h3>
              {/* Status badge */}
              <span className={`shrink-0 inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full border ${status.className}`}>
                {status.label}
              </span>
            </div>

            <p className={`text-xs leading-relaxed mb-2 ${alert.isRead ? "text-muted-foreground/70" : "text-muted-foreground"}`}>
              {alert.description}
            </p>

            {/* Meta row */}
            <div className="flex items-center flex-wrap gap-2">
              {/* Type badge */}
              <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${typeCfg.badgeCls}`}>
                <TypeIcon className="w-3 h-3" /> {typeCfg.label}
              </span>

              {/* Related to */}
              <span className="text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                {alert.relatedTo}
              </span>

              {/* Date + time */}
              <span className="text-[11px] text-muted-foreground flex items-center gap-1 ml-auto">
                <Calendar className="w-3 h-3" /> {alert.date} · {alert.time}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/60">
          <button
            onClick={() => onToggleRead(alert.id)}
            className="text-[11px] font-semibold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            {alert.isRead ? (
              <><Bell className="w-3 h-3" /> Mark Unread</>
            ) : (
              <><CheckCheck className="w-3 h-3" /> Mark Read</>
            )}
          </button>

          {alert.actionLabel && alert.actionUrl && (
            <a
              href={alert.actionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary hover:underline"
            >
              {alert.actionLabel} <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════ */
export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [activeTab, setActiveTab] = useState<"all" | AlertType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const unreadCount = alerts.filter((a) => !a.isRead).length;

  const toggleRead = (id: number) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isRead: !a.isRead } : a))
    );
  };

  const markAllRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, isRead: true })));
  };

  const filtered = useMemo(() => {
    let list = alerts;
    if (activeTab !== "all") list = list.filter((a) => a.type === activeTab);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.relatedTo.toLowerCase().includes(q)
      );
    }
    return list;
  }, [alerts, activeTab, searchQuery]);

  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = { all: alerts.length };
    tabs.forEach(({ key }) => {
      if (key !== "all")
        counts[key] = alerts.filter((a) => a.type === key).length;
    });
    return counts;
  }, [alerts]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-testid="alerts-page">

      {/* ── Header ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 px-8 py-10 mb-8 shadow-lg">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 900 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="820" cy="40" r="120" fill="white" />
            <path d="M0 120 Q200 50 400 120 T800 120 V200 H0Z" fill="white" />
          </svg>
        </div>
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Bell className="w-5 h-5 text-white/80" />
              <span className="text-white/80 text-sm font-bold uppercase tracking-wider">Alert Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-2">
              Exam & Job Notifications
            </h1>
            <p className="text-white/75 text-sm max-w-md leading-relaxed">
              Stay on top of every exam deadline, admit card release, result, and new job opening — all in one place.
            </p>
          </div>
          {unreadCount > 0 && (
            <div className="bg-white/20 rounded-2xl px-5 py-4 text-center shrink-0">
              <div className="text-white font-extrabold text-3xl leading-none">{unreadCount}</div>
              <div className="text-white/70 text-xs mt-1">Unread</div>
            </div>
          )}
        </div>
      </div>

      {/* ── Controls row ── */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notifications..."
            className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
            data-testid="alerts-search"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Mark all read */}
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            data-testid="mark-all-read"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-card border border-border text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
          >
            <CheckCheck className="w-4 h-4" /> Mark All Read
          </button>
        )}
      </div>

      {/* ── Filter tabs ── */}
      <div className="flex items-center gap-1.5 mb-5 overflow-x-auto pb-1 scrollbar-hide">
        {tabs.map(({ key, label }) => {
          const count = tabCounts[key] ?? 0;
          const unread = key === "all"
            ? alerts.filter((a) => !a.isRead).length
            : alerts.filter((a) => a.type === key && !a.isRead).length;

          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              data-testid={`alerts-tab-${key}`}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-150 whitespace-nowrap ${
                activeTab === key
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-primary/40"
              }`}
            >
              {label}
              <span className={`min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[10px] font-bold px-1 ${activeTab === key ? "bg-white/20" : "bg-muted"}`}>
                {count}
              </span>
              {unread > 0 && (
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Results info ── */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filtered.length}</span> notifications
          {unreadCount > 0 && <> · <span className="text-primary font-semibold">{unreadCount} unread</span></>}
        </p>
        {filtered.length !== alerts.length && (
          <button
            onClick={() => { setActiveTab("all"); setSearchQuery(""); }}
            className="text-xs text-primary hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* ── Alert Feed ── */}
      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-card rounded-2xl border border-border"
            >
              <BellOff className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-1">No notifications found</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                {searchQuery
                  ? `No results match "${searchQuery}". Try a different search term.`
                  : "No notifications in this category yet."}
              </p>
            </motion.div>
          ) : (
            filtered.map((alert) => (
              <AlertCard key={alert.id} alert={alert} onToggleRead={toggleRead} />
            ))
          )}
        </AnimatePresence>
      </div>

      {/* ── Bottom info ── */}
      <div className="mt-8 bg-card rounded-2xl border border-card-border p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-foreground text-sm mb-1">Stay updated on every agriculture exam</h3>
          <p className="text-xs text-muted-foreground max-w-sm">
            Notifications cover TNPSC, IBPS AFO, NABARD, SBI, ICAR, UPSC, and all major recruiters for agriculture graduates.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <a href="/exams" className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-bold px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors">
            View Exams <ChevronRight className="w-3.5 h-3.5" />
          </a>
          <a href="/jobs" className="inline-flex items-center gap-1.5 border border-border text-foreground text-sm font-bold px-4 py-2 rounded-xl hover:bg-muted transition-colors">
            View Jobs <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
