import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Building2, Calendar, Clock, Users, Search,
  Shield, Award, GraduationCap, UserCheck, Bell, X,
  ChevronRight, Landmark, FlaskConical, Banknote,
} from "lucide-react";
import { exams, type Exam } from "@/data/exams";

/* ── types ─────────────────────────────────────────────────── */
type Level  = "all" | "state" | "national";
type Status = "all" | "open" | "upcoming" | "results";
type Category = "all" | "entrance" | "recruitment" | "fellowship" | "banking";

/* ── badge helpers ─────────────────────────────────────────── */
function StatusBadge({ status }: { status: Exam["status"] }) {
  const map = {
    open:     "bg-green-100 text-green-700 border-green-200",
    upcoming: "bg-amber-100 text-amber-700 border-amber-200",
    results:  "bg-slate-100 text-slate-600 border-slate-200",
  };
  const label = { open: "Open", upcoming: "Upcoming", results: "Results Out" };
  return (
    <span className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full border ${map[status]}`}>
      {status === "open" && <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />}
      {label[status]}
    </span>
  );
}

function LevelBadge({ level }: { level: Exam["level"] }) {
  if (level === "state")
    return (
      <span className="inline-flex items-center gap-1 bg-sky-50 text-sky-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-sky-200">
        <Shield className="w-3 h-3" /> Tamil Nadu
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 bg-violet-50 text-violet-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-violet-200">
      <Award className="w-3 h-3" /> National
    </span>
  );
}

function CategoryBadge({ category }: { category: Exam["category"] }) {
  const map: Record<Exam["category"], { label: string; className: string; icon: React.ElementType }> = {
    entrance:    { label: "Entrance",    className: "bg-teal-50 text-teal-700 border-teal-200",       icon: GraduationCap },
    recruitment: { label: "Recruitment", className: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: UserCheck },
    fellowship:  { label: "Fellowship",  className: "bg-purple-50 text-purple-700 border-purple-200", icon: FlaskConical },
    banking:     { label: "Banking",     className: "bg-blue-50 text-blue-700 border-blue-200",       icon: Banknote },
  };
  const { label, className, icon: Icon } = map[category];
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${className}`}>
      <Icon className="w-3 h-3" /> {label}
    </span>
  );
}

/* ── info row ──────────────────────────────────────────────── */
function InfoRow({ icon: Icon, label, value, highlight }: {
  icon: React.ElementType; label: string; value: string; highlight?: boolean;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-3.5 h-3.5 text-primary" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{label}</div>
        <div className={`text-sm mt-0.5 leading-snug ${highlight ? "font-semibold text-orange-600" : "text-foreground font-medium"}`}>
          {value}
        </div>
      </div>
    </div>
  );
}

/* ── filter chip ───────────────────────────────────────────── */
function FilterChip({
  label, active, onClick, count,
}: { label: string; active: boolean; onClick: () => void; count?: number }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium border transition-all duration-150 ${
        active
          ? "bg-primary text-primary-foreground border-primary shadow-sm"
          : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-primary/40 hover:bg-primary/5"
      }`}
    >
      {label}
      {count !== undefined && (
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none ${
          active ? "bg-white/25 text-white" : "bg-muted text-muted-foreground"
        }`}>
          {count}
        </span>
      )}
    </button>
  );
}

/* ── exam card ─────────────────────────────────────────────── */
function ExamCard({ exam }: { exam: Exam }) {
  const isDeadlineSoon =
    exam.status === "open" && !exam.applicationDeadline.includes("Closed");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25 }}
      className="bg-card rounded-2xl border border-card-border hover:shadow-lg hover:border-primary/25 transition-all duration-200 flex flex-col overflow-hidden"
      data-testid={`exam-card-${exam.id}`}
    >
      {/* card header stripe */}
      <div className={`h-1 w-full ${
        exam.status === "open"     ? "bg-gradient-to-r from-green-400 to-emerald-500" :
        exam.status === "upcoming" ? "bg-gradient-to-r from-amber-400 to-orange-400"  :
                                     "bg-gradient-to-r from-slate-300 to-slate-400"
      }`} />

      <div className="p-5 flex flex-col flex-1">
        {/* top row: badges + status */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap gap-1.5">
            <LevelBadge level={exam.level} />
            <CategoryBadge category={exam.category} />
          </div>
          <StatusBadge status={exam.status} />
        </div>

        {/* exam name */}
        <h3 className="font-bold text-foreground text-[15px] leading-snug mb-0.5">
          {exam.name}
        </h3>
        <p className="text-xs text-primary font-semibold mb-3">{exam.shortName}</p>

        {/* description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
          {exam.description}
        </p>

        {/* info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <InfoRow
            icon={Building2}
            label="Conducting Body"
            value={exam.conductingBody}
          />
          <InfoRow
            icon={GraduationCap}
            label="Eligibility"
            value={exam.eligibility}
          />
          <InfoRow
            icon={UserCheck}
            label="Age Limit"
            value={exam.ageLimit}
          />
          {exam.vacancies && (
            <InfoRow
              icon={Users}
              label="Vacancies"
              value={exam.vacancies.toLocaleString("en-IN") + " posts"}
            />
          )}
        </div>

        {/* dates row */}
        <div className="bg-muted/50 rounded-xl p-3.5 mb-4 grid grid-cols-3 gap-3">
          <div className="text-center">
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Notification</div>
            <div className="text-xs font-semibold text-foreground">{exam.notificationDate}</div>
          </div>
          <div className="text-center border-x border-border px-2">
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Deadline</div>
            <div className={`text-xs font-bold ${
              isDeadlineSoon ? "text-orange-600" : "text-foreground"
            }`}>
              {exam.applicationDeadline}
            </div>
          </div>
          <div className="text-center">
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Exam Date</div>
            <div className="text-xs font-semibold text-foreground">{exam.examDate}</div>
          </div>
        </div>

        {/* footer */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-1">
          <a
            href={`https://${exam.officialWebsite}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            data-testid={`exam-website-${exam.id}`}
          >
            {exam.officialWebsite}
          </a>
          <button
            data-testid={`exam-view-details-${exam.id}`}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-150 ${
              exam.status === "open"
                ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                : exam.status === "upcoming"
                ? "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                : "bg-muted text-muted-foreground cursor-default"
            }`}
          >
            {exam.status === "results" ? "View Result" : "Apply Now"}
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export default function Exams() {
  const [search, setSearch]         = useState("");
  const [level, setLevel]           = useState<Level>("all");
  const [status, setStatus]         = useState<Status>("all");
  const [category, setCategory]     = useState<Category>("all");

  /* counts for chips */
  const counts = useMemo(() => ({
    state:       exams.filter((e) => e.level === "state").length,
    national:    exams.filter((e) => e.level === "national").length,
    open:        exams.filter((e) => e.status === "open").length,
    upcoming:    exams.filter((e) => e.status === "upcoming").length,
    results:     exams.filter((e) => e.status === "results").length,
    entrance:    exams.filter((e) => e.category === "entrance").length,
    recruitment: exams.filter((e) => e.category === "recruitment").length,
    fellowship:  exams.filter((e) => e.category === "fellowship").length,
    banking:     exams.filter((e) => e.category === "banking").length,
  }), []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return exams.filter((exam) => {
      if (level !== "all" && exam.level !== level) return false;
      if (status !== "all" && exam.status !== status) return false;
      if (category !== "all" && exam.category !== category) return false;
      if (q && !exam.name.toLowerCase().includes(q) &&
               !exam.shortName.toLowerCase().includes(q) &&
               !exam.conductingBody.toLowerCase().includes(q) &&
               !exam.eligibility.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [search, level, status, category]);

  const activeFilterCount = [
    level !== "all", status !== "all", category !== "all", search !== "",
  ].filter(Boolean).length;

  function clearAll() {
    setSearch(""); setLevel("all"); setStatus("all"); setCategory("all");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-testid="exams-page">

      {/* ── page header ── */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <span className="text-xs font-bold text-primary uppercase tracking-widest">Examinations</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
          Agriculture Competitive Exams
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl text-base">
          State and national-level examinations for B.Sc Agriculture, M.Sc Agronomy graduates,
          and research aspirants — all in one place.
        </p>
      </div>

      {/* ── summary stat strip ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
        {[
          { label: "Total Exams",    value: exams.length,     color: "text-foreground" },
          { label: "Currently Open", value: counts.open,      color: "text-green-600"  },
          { label: "Upcoming",       value: counts.upcoming,  color: "text-amber-600"  },
          { label: "Results Out",    value: counts.results,   color: "text-slate-500"  },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-card-border px-4 py-3 text-center">
            <div className={`text-2xl font-extrabold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── search ── */}
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground pointer-events-none" />
        <input
          type="search"
          placeholder="Search by exam name, organisation, or eligibility..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-testid="exams-search-input"
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors shadow-sm"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* ── filter chips ── */}
      <div className="bg-card rounded-2xl border border-card-border p-4 mb-7 space-y-3" data-testid="exams-filter-bar">

        {/* row 1: level */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider w-16 shrink-0">Region</span>
          <FilterChip label="All Exams" active={level === "all"}      onClick={() => setLevel("all")}      count={exams.length} />
          <FilterChip label="Tamil Nadu" active={level === "state"}   onClick={() => setLevel("state")}    count={counts.state} />
          <FilterChip label="National"  active={level === "national"} onClick={() => setLevel("national")} count={counts.national} />
        </div>

        <div className="border-t border-border" />

        {/* row 2: status */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider w-16 shrink-0">Status</span>
          <FilterChip label="All"         active={status === "all"}      onClick={() => setStatus("all")} />
          <FilterChip label="Open Now"    active={status === "open"}     onClick={() => setStatus("open")}     count={counts.open} />
          <FilterChip label="Upcoming"    active={status === "upcoming"} onClick={() => setStatus("upcoming")} count={counts.upcoming} />
          <FilterChip label="Results Out" active={status === "results"}  onClick={() => setStatus("results")}  count={counts.results} />
        </div>

        <div className="border-t border-border" />

        {/* row 3: category */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider w-16 shrink-0">Type</span>
          <FilterChip label="All Types"   active={category === "all"}         onClick={() => setCategory("all")} />
          <FilterChip label="Recruitment" active={category === "recruitment"} onClick={() => setCategory("recruitment")} count={counts.recruitment} />
          <FilterChip label="Entrance"    active={category === "entrance"}    onClick={() => setCategory("entrance")}    count={counts.entrance} />
          <FilterChip label="Fellowship"  active={category === "fellowship"}  onClick={() => setCategory("fellowship")}  count={counts.fellowship} />
          <FilterChip label="Banking"     active={category === "banking"}     onClick={() => setCategory("banking")}     count={counts.banking} />
        </div>

        {/* active filter summary */}
        {activeFilterCount > 0 && (
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-muted-foreground">
              {filtered.length} of {exams.length} exam{exams.length !== 1 ? "s" : ""} shown
            </span>
            <button
              onClick={clearAll}
              data-testid="clear-filters"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Clear all filters
            </button>
          </div>
        )}
        {activeFilterCount === 0 && (
          <div className="text-xs text-muted-foreground pt-1">
            Showing all {exams.length} exams
          </div>
        )}
      </div>

      {/* ── results ── */}
      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-center py-20 bg-card rounded-2xl border border-card-border"
            data-testid="exams-empty"
          >
            <BookOpen className="w-14 h-14 text-muted-foreground mx-auto mb-4 opacity-30" />
            <p className="text-foreground font-semibold text-base">No exams match your filters</p>
            <p className="text-muted-foreground text-sm mt-1">Try adjusting your search or clearing the filters.</p>
            <button
              onClick={clearAll}
              className="mt-4 inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors"
            >
              <X className="w-3.5 h-3.5" /> Clear filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {filtered.map((exam) => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── bottom alert strip ── */}
      {filtered.length > 0 && (
        <div className="mt-8 rounded-2xl bg-primary/5 border border-primary/15 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Bell className="w-5 h-5 text-primary shrink-0" />
            <span className="text-sm font-medium text-foreground">
              Don't miss exam deadlines — get alerts directly to your phone.
            </span>
          </div>
          <button
            data-testid="exams-alert-cta"
            className="shrink-0 inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors"
          >
            <Bell className="w-4 h-4" /> Set Exam Alerts
          </button>
        </div>
      )}
    </div>
  );
}
