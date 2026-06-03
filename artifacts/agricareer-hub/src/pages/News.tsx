import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Newspaper, Bell, Search, X, ExternalLink,
  AlertCircle, Calendar, Tag, ChevronRight,
  Shield, Globe, Briefcase, FlaskConical, GraduationCap,
  Megaphone, FileText, CheckCircle, RefreshCw, CalendarClock,
  Dot,
} from "lucide-react";
import { newsItems, notifications, type NewsItem, type NewsCategory } from "@/data/news";

/* ── category config ──────────────────────────────── */
type CategoryKey = NewsCategory | "all";

const CATEGORIES: {
  key: CategoryKey;
  label: string;
  icon: React.ElementType;
  color: string;
  badge: string;
}[] = [
  { key: "all",              label: "All News",               icon: Newspaper,    color: "text-foreground",   badge: "bg-muted text-foreground" },
  { key: "tn-updates",       label: "Tamil Nadu Updates",     icon: Shield,       color: "text-emerald-700",  badge: "bg-emerald-100 text-emerald-700 border border-emerald-200" },
  { key: "national-updates", label: "National Updates",       icon: Globe,        color: "text-indigo-700",   badge: "bg-indigo-100 text-indigo-700 border border-indigo-200" },
  { key: "recruitment",      label: "Recruitment News",       icon: Briefcase,    color: "text-sky-700",      badge: "bg-sky-100 text-sky-700 border border-sky-200" },
  { key: "research",         label: "Research News",          icon: FlaskConical, color: "text-teal-700",     badge: "bg-teal-100 text-teal-700 border border-teal-200" },
  { key: "scholarship",      label: "Scholarships & Fellowships", icon: GraduationCap, color: "text-violet-700", badge: "bg-violet-100 text-violet-700 border border-violet-200" },
];

const NOTIF_CONFIG: Record<string, { label: string; cls: string; icon: React.ElementType }> = {
  result:       { label: "Result",      cls: "bg-green-100 text-green-700 border border-green-200",   icon: CheckCircle },
  "admit-card": { label: "Admit Card",  cls: "bg-amber-100 text-amber-700 border border-amber-200",   icon: FileText },
  circular:     { label: "Circular",    cls: "bg-sky-100 text-sky-700 border border-sky-200",         icon: Megaphone },
  "date-change":{ label: "Date Change", cls: "bg-orange-100 text-orange-700 border border-orange-200", icon: RefreshCw },
};

function getCategoryConfig(key: NewsCategory) {
  return CATEGORIES.find((c) => c.key === key)!;
}

/* ── filter tab ───────────────────────────────────── */
function TabButton({
  cat, active, count, onClick,
}: {
  cat: typeof CATEGORIES[number]; active: boolean; count: number; onClick: () => void;
}) {
  const Icon = cat.icon;
  return (
    <button
      onClick={onClick}
      data-testid={`news-filter-${cat.key}`}
      className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-150 whitespace-nowrap ${
        active
          ? "bg-primary text-primary-foreground border-primary shadow-sm"
          : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-primary/30 hover:bg-primary/5"
      }`}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span>{cat.label}</span>
      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none ${
        active ? "bg-white/25 text-white" : "bg-muted text-muted-foreground"
      }`}>{count}</span>
    </button>
  );
}

/* ── news card ────────────────────────────────────── */
function NewsCard({ item }: { item: NewsItem }) {
  const cat = getCategoryConfig(item.category);
  const Icon = cat.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className="bg-card rounded-2xl border border-card-border hover:shadow-md hover:border-primary/20 transition-all duration-200 overflow-hidden"
      data-testid={`news-card-${item.id}`}
    >
      {/* category colour stripe */}
      <div className={`h-1 w-full ${
        item.category === "tn-updates"       ? "bg-gradient-to-r from-emerald-400 to-green-500" :
        item.category === "national-updates" ? "bg-gradient-to-r from-indigo-400 to-blue-500"   :
        item.category === "recruitment"      ? "bg-gradient-to-r from-sky-400 to-cyan-500"       :
        item.category === "research"         ? "bg-gradient-to-r from-teal-400 to-emerald-500"   :
                                               "bg-gradient-to-r from-violet-400 to-purple-500"
      }`} />

      <div className="p-5">
        {/* top row — badges + date */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${cat.badge}`}>
              <Icon className="w-3 h-3" /> {cat.label}
            </span>
            {item.isNew && (
              <span className="bg-primary text-primary-foreground text-[10px] font-extrabold px-2 py-0.5 rounded-full tracking-wide">
                NEW
              </span>
            )}
            {item.isImportant && (
              <span className="bg-red-100 text-red-700 border border-red-200 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                IMPORTANT
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
            <Calendar className="w-3 h-3" /> {item.date}
          </div>
        </div>

        {/* title */}
        <h3 className="text-sm font-bold text-foreground leading-snug mb-2">
          {item.title}
        </h3>

        {/* summary */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
          {item.summary}
        </p>

        {/* footer */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-border">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground min-w-0">
            <Tag className="w-3 h-3 shrink-0" />
            <span className="truncate">{item.source}</span>
          </div>
          {item.readMoreUrl ? (
            <a
              href={item.readMoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`news-read-more-${item.id}`}
              className="shrink-0 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
            >
              Read More <ExternalLink className="w-3 h-3" />
            </a>
          ) : (
            <button
              data-testid={`news-read-more-${item.id}`}
              className="shrink-0 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
            >
              Read More <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ── featured (hero) card ─────────────────────────── */
function FeaturedCard({ item }: { item: NewsItem }) {
  const cat = getCategoryConfig(item.category);
  const Icon = cat.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative rounded-2xl overflow-hidden border p-6 sm:p-8 ${
        item.category === "tn-updates"       ? "bg-gradient-to-br from-emerald-700 to-green-800 border-emerald-600" :
        item.category === "national-updates" ? "bg-gradient-to-br from-indigo-700 to-blue-800 border-indigo-600"   :
        item.category === "recruitment"      ? "bg-gradient-to-br from-sky-700 to-cyan-800 border-sky-600"         :
        item.category === "research"         ? "bg-gradient-to-br from-teal-700 to-emerald-800 border-teal-600"    :
                                               "bg-gradient-to-br from-violet-700 to-purple-800 border-violet-600"
      }`}
      data-testid={`news-featured-${item.id}`}
    >
      <div className="flex flex-col h-full">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
            <Icon className="w-3.5 h-3.5" /> {cat.label}
          </span>
          {item.isNew && (
            <span className="bg-white text-primary text-[10px] font-extrabold px-2 py-0.5 rounded-full tracking-wide">
              NEW
            </span>
          )}
          {item.isImportant && (
            <span className="bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
              IMPORTANT
            </span>
          )}
          <span className="ml-auto flex items-center gap-1 text-white/70 text-xs">
            <Calendar className="w-3 h-3" /> {item.date}
          </span>
        </div>
        <h2 className="text-base sm:text-lg font-extrabold text-white leading-snug mb-3 flex-1">
          {item.title}
        </h2>
        <p className="text-white/75 text-sm leading-relaxed mb-5 line-clamp-2">
          {item.summary}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-white/60 text-xs flex items-center gap-1">
            <Tag className="w-3 h-3" /> {item.source}
          </span>
          {item.readMoreUrl ? (
            <a
              href={item.readMoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-white text-primary text-xs font-bold px-3.5 py-2 rounded-xl hover:bg-white/90 transition-colors"
            >
              Read Full Story <ExternalLink className="w-3 h-3" />
            </a>
          ) : (
            <button className="inline-flex items-center gap-1.5 bg-white text-primary text-xs font-bold px-3.5 py-2 rounded-xl hover:bg-white/90 transition-colors">
              Read Full Story <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ── notification card ────────────────────────────── */
function NotifCard({ item }: { item: typeof notifications[number] }) {
  const cfg = NOTIF_CONFIG[item.type];
  const Icon = cfg.icon;
  return (
    <div
      className={`rounded-xl border p-4 transition-all duration-200 ${
        item.isImportant ? "border-amber-300 bg-amber-50/50 dark:bg-amber-950/20" : "border-card-border bg-card hover:shadow-sm"
      }`}
      data-testid={`notification-card-${item.id}`}
    >
      <div className="flex items-start gap-3">
        {/* icon */}
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
          item.isImportant ? "bg-amber-100" : "bg-primary/10"
        }`}>
          {item.isImportant
            ? <AlertCircle className="w-4 h-4 text-amber-600" />
            : <Icon className="w-4 h-4 text-primary" />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 mb-1">
            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${cfg.cls}`}>
              <Icon className="w-2.5 h-2.5" /> {cfg.label}
            </span>
            {item.isNew && (
              <span className="bg-primary text-primary-foreground text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                NEW
              </span>
            )}
            <span className="ml-auto flex items-center gap-0.5 text-[10px] text-muted-foreground">
              <CalendarClock className="w-3 h-3" /> {item.date}
            </span>
          </div>
          <h4 className="text-sm font-bold text-foreground leading-snug mb-1">{item.title}</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">{item.body}</p>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`notification-link-${item.id}`}
              className="inline-flex items-center gap-1 mt-2 text-xs font-bold text-primary hover:underline"
            >
              View Official Notice <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════ */
export default function News() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [search, setSearch] = useState("");

  const counts = useMemo(
    () =>
      Object.fromEntries(
        CATEGORIES.map((c) => [
          c.key,
          c.key === "all"
            ? newsItems.length
            : newsItems.filter((n) => n.category === c.key).length,
        ])
      ) as Record<CategoryKey, number>,
    []
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return newsItems.filter((item) => {
      if (activeCategory !== "all" && item.category !== activeCategory) return false;
      if (
        q &&
        !item.title.toLowerCase().includes(q) &&
        !item.summary.toLowerCase().includes(q) &&
        !item.source.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [activeCategory, search]);

  const featured = filtered.find((n) => n.isImportant && n.isNew) ?? filtered[0];
  const rest = featured ? filtered.filter((n) => n.id !== featured.id) : filtered;

  const newNotifCount = notifications.filter((n) => n.isNew).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-testid="news-page">

      {/* ── header ── */}
      <div className="mb-7">
        <div className="flex items-center gap-2 mb-2">
          <Newspaper className="w-5 h-5 text-primary" />
          <span className="text-xs font-bold text-primary uppercase tracking-widest">Updates</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
          News & Notifications
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl text-base">
          Agriculture policies, government schemes, research breakthroughs, recruitment alerts, and fellowship opportunities — all in one place.
        </p>
      </div>

      {/* ── stat strip ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
        {[
          { label: "Total Articles",   value: newsItems.length,                                     color: "text-foreground"   },
          { label: "Tamil Nadu",       value: counts["tn-updates"],                                  color: "text-emerald-600"  },
          { label: "Recruitment",      value: counts["recruitment"],                                  color: "text-sky-600"      },
          { label: "Scholarships",     value: counts["scholarship"],                                  color: "text-violet-600"   },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-card-border px-4 py-3 text-center">
            <div className={`text-2xl font-extrabold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── search ── */}
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          type="search"
          placeholder="Search news by title, summary, or source..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-testid="news-search-input"
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors shadow-sm"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label="Clear">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* ── category tabs ── */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-6 scrollbar-none" data-testid="news-category-tabs">
        {CATEGORIES.map((cat) => (
          <TabButton
            key={cat.key}
            cat={cat}
            active={activeCategory === cat.key}
            count={counts[cat.key]}
            onClick={() => setActiveCategory(cat.key)}
          />
        ))}
      </div>

      {/* ── main grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* left — articles (2/3 width) */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center py-20 bg-card rounded-2xl border border-card-border"
                data-testid="news-empty"
              >
                <Newspaper className="w-14 h-14 text-muted-foreground mx-auto mb-4 opacity-25" />
                <p className="font-semibold text-foreground">No articles match your search</p>
                <p className="text-muted-foreground text-sm mt-1">Try a different keyword or category.</p>
                <button
                  onClick={() => { setSearch(""); setActiveCategory("all"); }}
                  className="mt-4 inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors"
                >
                  <X className="w-3.5 h-3.5" /> Clear filters
                </button>
              </motion.div>
            ) : (
              <motion.div key="content" className="space-y-4">
                {/* featured hero card */}
                {featured && !search && (
                  <FeaturedCard key={`featured-${featured.id}`} item={featured} />
                )}

                {/* result count */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
                  <Dot className="w-4 h-4" />
                  {search
                    ? `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${search}"`
                    : `${filtered.length} article${filtered.length !== 1 ? "s" : ""}`}
                </div>

                {/* article cards */}
                {(search ? filtered : rest).map((item) => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* right — notifications sidebar (1/3) */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 space-y-4">

            {/* section header */}
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-foreground" />
              <h2 className="text-sm font-extrabold text-foreground uppercase tracking-wider">Official Notifications</h2>
              {newNotifCount > 0 && (
                <span className="ml-auto bg-primary text-primary-foreground text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  {newNotifCount} New
                </span>
              )}
            </div>

            {/* notification cards */}
            <div className="space-y-3">
              {notifications.map((n) => (
                <NotifCard key={n.id} item={n} />
              ))}
            </div>

            {/* alert signup */}
            <div className="bg-primary/5 border border-primary/15 rounded-2xl p-5 text-center mt-2">
              <Bell className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="text-sm font-bold text-foreground mb-1">Stay Updated</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                Get recruitment alerts, scholarship deadlines, and scheme updates delivered instantly.
              </p>
              <button
                data-testid="news-alert-cta"
                className="w-full inline-flex items-center justify-center gap-1.5 bg-primary text-primary-foreground text-sm font-bold py-2.5 rounded-xl hover:bg-primary/90 transition-colors"
              >
                <Bell className="w-4 h-4" /> Set Alerts
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
