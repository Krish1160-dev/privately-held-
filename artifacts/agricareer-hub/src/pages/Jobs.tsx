import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, Search, MapPin, IndianRupee, Calendar,
  Users, GraduationCap, X, Building2, FlaskConical,
  Landmark, Shield, ChevronRight, ExternalLink, Bell,
  Link2Off, ArrowLeft, AlertCircle, Info, CalendarClock,
  FileText,
} from "lucide-react";
import { jobs, type Job } from "@/data/jobs";
import JobDetailModal from "@/components/JobDetailModal";

/* ── types ──────────────────────────────────────────── */
type Region = "all" | "state" | "national";
type Sector = "all" | "govt" | "private" | "ngo" | "research";

/* ── badge helpers ──────────────────────────────────── */
function SectorBadge({ sector }: { sector: Job["sector"] }) {
  const map: Record<Job["sector"], { label: string; cls: string; icon: React.ElementType }> = {
    govt:     { label: "Government", cls: "bg-sky-50 text-sky-700 border-sky-200",       icon: Landmark },
    private:  { label: "Private",    cls: "bg-orange-50 text-orange-700 border-orange-200", icon: Building2 },
    ngo:      { label: "NGO",        cls: "bg-violet-50 text-violet-700 border-violet-200", icon: Users },
    research: { label: "Research",   cls: "bg-teal-50 text-teal-700 border-teal-200",    icon: FlaskConical },
  };
  const { label, cls, icon: Icon } = map[sector];
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${cls}`}>
      <Icon className="w-3 h-3" /> {label}
    </span>
  );
}

function RegionBadge({ region }: { region: Job["region"] }) {
  if (region === "state")
    return (
      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-200">
        <Shield className="w-3 h-3" /> Tamil Nadu
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-indigo-200">
      <Landmark className="w-3 h-3" /> National
    </span>
  );
}

/* ── filter chip ─────────────────────────────────────── */
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

/* ── info chip ──────────────────────────────────────── */
function InfoChip({ icon: Icon, label, value, highlight }: {
  icon: React.ElementType; label: string; value: string; highlight?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      <Icon className={`w-3.5 h-3.5 shrink-0 ${highlight ? "text-orange-500" : "text-primary"}`} />
      <div className="min-w-0">
        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider leading-none mb-0.5">{label}</div>
        <div className={`text-xs font-semibold leading-snug truncate ${highlight ? "text-orange-600" : "text-foreground"}`}>{value}</div>
      </div>
    </div>
  );
}

/* ── placeholder overlay ────────────────────────────── */
type PlaceholderType = "apply" | null;

function PlaceholderOverlay({
  type, job, onBack,
}: {
  type: PlaceholderType; job: Job; onBack: () => void;
}) {
  if (!type) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onBack}
    >
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ type: "spring", stiffness: 340, damping: 28 }}
        className="relative bg-card rounded-3xl shadow-2xl max-w-md w-full p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-5">
          <Link2Off className="w-8 h-8 text-amber-500" />
        </div>
        <h3 className="text-lg font-extrabold text-foreground mb-2">Application Link Not Yet Active</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          Official application link will be available when live job data is connected. Visit the official website to apply directly.
        </p>

        {/* job context */}
        <div className="bg-muted/60 rounded-xl p-4 text-left mb-6 border border-border">
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Position</div>
          <div className="font-semibold text-foreground text-sm">{job.title}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{job.organization}</div>
          <div className="flex flex-wrap gap-3 mt-3 text-xs">
            {job.lastDate !== "Closed" && (
              <span className="flex items-center gap-1 text-muted-foreground">
                <AlertCircle className="w-3 h-3 text-amber-500" />
                Last date: <span className="font-semibold text-foreground ml-0.5">{job.lastDate}</span>
              </span>
            )}
            <span className="flex items-center gap-1 text-muted-foreground">
              <Info className="w-3 h-3 text-primary" />
              Posted: <span className="font-semibold text-foreground ml-0.5">{job.postedDate}</span>
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 inline-flex items-center justify-center gap-1.5 border border-border text-foreground text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Go Back
          </button>
          <a
            href={`https://${job.officialWebsite}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-primary text-primary-foreground text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Official Site
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── job card ────────────────────────────────────────── */
function JobCard({ job, onApply, onViewDetails }: {
  job: Job;
  onApply: (j: Job) => void;
  onViewDetails: (j: Job) => void;
}) {
  const isClosed = job.lastDate === "Closed";
  const isDeadlineSoon = !isClosed && job.lastDate.includes("Jun 2025");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.22 }}
      className="bg-card rounded-2xl border border-card-border hover:shadow-lg hover:border-primary/25 transition-all duration-200 overflow-hidden"
      data-testid={`job-card-${job.id}`}
    >
      {/* colour stripe */}
      <div className={`h-1 w-full ${
        isClosed                       ? "bg-gradient-to-r from-slate-300 to-slate-400" :
        job.sector === "govt"          ? "bg-gradient-to-r from-sky-400 to-blue-500"    :
        job.sector === "private"       ? "bg-gradient-to-r from-orange-400 to-amber-400":
        job.sector === "research"      ? "bg-gradient-to-r from-teal-400 to-emerald-500":
                                         "bg-gradient-to-r from-violet-400 to-purple-500"
      }`} />

      <div className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4">

          {/* org icon */}
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
            job.sector === "govt"     ? "bg-sky-100"    :
            job.sector === "private"  ? "bg-orange-100" :
            job.sector === "research" ? "bg-teal-100"   :
                                        "bg-violet-100"
          }`}>
            {job.sector === "govt"     && <Landmark   className="w-6 h-6 text-sky-600"    />}
            {job.sector === "private"  && <Building2  className="w-6 h-6 text-orange-600" />}
            {job.sector === "research" && <FlaskConical className="w-6 h-6 text-teal-600" />}
            {job.sector === "ngo"      && <Users      className="w-6 h-6 text-violet-600" />}
          </div>

          {/* content */}
          <div className="flex-1 min-w-0">
            {/* top row */}
            <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <RegionBadge region={job.region} />
                <SectorBadge sector={job.sector} />
                <span className="text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200 px-2 py-0.5 rounded-full">Sample</span>
                {isClosed && (
                  <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full border border-slate-200">
                    Closed
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <CalendarClock className="w-3.5 h-3.5" /> Posted {job.postedDate}
              </div>
            </div>

            {/* title */}
            <h3 className="text-base font-bold text-foreground leading-snug mt-2 mb-0.5">
              {job.title}
            </h3>
            <p className="text-sm font-semibold text-primary mb-3">{job.organization}</p>

            {/* description */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
              {job.description}
            </p>

            {/* info grid — all 6 required fields */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3 mb-4 p-4 bg-muted/40 rounded-xl">
              <InfoChip icon={MapPin}       label="Location"    value={job.location} />
              <InfoChip icon={Users}        label="Vacancies"   value={`${job.vacancies.toLocaleString("en-IN")} posts`} />
              <InfoChip icon={GraduationCap} label="Qualification" value={job.qualification} />
              <InfoChip icon={IndianRupee}  label="Salary"      value={job.salaryRange} />
              <InfoChip icon={Briefcase}    label="Experience"  value={job.experience} />
              <InfoChip
                icon={Calendar}
                label="Last Date"
                value={job.lastDate}
                highlight={isDeadlineSoon}
              />
            </div>

            {/* tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {job.tags.map((tag) => (
                <span key={tag} className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            {/* footer */}
            <div className="flex items-center justify-between gap-3 pt-1 border-t border-border">
              <a
                href={`https://${job.officialWebsite}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                {job.officialWebsite}
              </a>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onViewDetails(job)}
                  data-testid={`job-details-${job.id}`}
                  className="inline-flex items-center gap-1.5 border border-border text-foreground text-sm font-semibold px-4 py-2 rounded-xl hover:bg-muted transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" /> Details
                </button>
                {!isClosed ? (
                  <button
                    onClick={() => onApply(job)}
                    data-testid={`job-apply-${job.id}`}
                    className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-bold px-5 py-2 rounded-xl hover:bg-primary/90 transition-all duration-150 shadow-sm"
                  >
                    Apply Now <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <a
                    href={`https://${job.officialWebsite}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`job-results-${job.id}`}
                    className="inline-flex items-center gap-1.5 bg-sky-600 text-white text-sm font-bold px-5 py-2 rounded-xl hover:bg-sky-700 transition-all duration-150"
                  >
                    View Status <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════ */
export default function Jobs() {
  const [search, setSearch]         = useState("");
  const [region, setRegion]         = useState<Region>("all");
  const [sector, setSector]         = useState<Sector>("all");
  const [applyJob, setApplyJob]     = useState<Job | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  /* counts */
  const counts = useMemo(() => ({
    state:    jobs.filter((j) => j.region === "state").length,
    national: jobs.filter((j) => j.region === "national").length,
    govt:     jobs.filter((j) => j.sector === "govt").length,
    private:  jobs.filter((j) => j.sector === "private").length,
    ngo:      jobs.filter((j) => j.sector === "ngo").length,
    research: jobs.filter((j) => j.sector === "research").length,
  }), []);

  const totalVacancies = useMemo(() => jobs.reduce((s, j) => s + j.vacancies, 0), []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return jobs.filter((job) => {
      if (region !== "all" && job.region !== region) return false;
      if (sector !== "all" && job.sector !== sector) return false;
      if (q &&
        !job.title.toLowerCase().includes(q) &&
        !job.organization.toLowerCase().includes(q) &&
        !job.location.toLowerCase().includes(q) &&
        !job.qualification.toLowerCase().includes(q) &&
        !job.tags.some((t) => t.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [search, region, sector]);

  const activeFilters = [region !== "all", sector !== "all", search !== ""].filter(Boolean).length;

  function clearAll() { setSearch(""); setRegion("all"); setSector("all"); }

  function handleApply(job: Job) {
    if (job.applyUrl) {
      window.open(job.applyUrl, "_blank", "noopener,noreferrer");
    } else {
      setApplyJob(job);
    }
  }

  return (
    <>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-testid="jobs-page">

      {/* ── page header ── */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Briefcase className="w-5 h-5 text-primary" />
          <span className="text-xs font-bold text-primary uppercase tracking-widest">Opportunities</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
          Agriculture Jobs & Vacancies
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl text-base">
          Government, research, private sector, and NGO roles for B.Sc and M.Sc Agriculture graduates — across Tamil Nadu and India.
        </p>
      </div>

      {/* ── stat strip ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
        {[
          { label: "Total Listings",   value: jobs.length,              color: "text-foreground"  },
          { label: "Total Vacancies",  value: `${totalVacancies.toLocaleString("en-IN")}+`, color: "text-green-600" },
          { label: "Govt / Banking",   value: counts.govt,              color: "text-sky-600"    },
          { label: "Research / NGO",   value: counts.research + counts.ngo, color: "text-teal-600" },
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
          placeholder="Search by job title, organisation, location, or skill..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-testid="jobs-search-input"
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors shadow-sm"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label="Clear">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* ── filter panel ── */}
      <div className="bg-card rounded-2xl border border-card-border p-4 mb-7 space-y-3" data-testid="jobs-filter-bar">

        {/* row 1: region */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider w-14 shrink-0">Region</span>
          <FilterChip label="All Jobs"    active={region === "all"}      onClick={() => setRegion("all")}      count={jobs.length} />
          <FilterChip label="Tamil Nadu"  active={region === "state"}    onClick={() => setRegion("state")}    count={counts.state} />
          <FilterChip label="National"    active={region === "national"} onClick={() => setRegion("national")} count={counts.national} />
        </div>

        <div className="border-t border-border" />

        {/* row 2: sector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider w-14 shrink-0">Sector</span>
          <FilterChip label="All Sectors" active={sector === "all"}      onClick={() => setSector("all")} />
          <FilterChip label="Government"  active={sector === "govt"}     onClick={() => setSector("govt")}     count={counts.govt} />
          <FilterChip label="Private"     active={sector === "private"}  onClick={() => setSector("private")}  count={counts.private} />
          <FilterChip label="NGO"         active={sector === "ngo"}      onClick={() => setSector("ngo")}      count={counts.ngo} />
          <FilterChip label="Research"    active={sector === "research"} onClick={() => setSector("research")} count={counts.research} />
        </div>

        {/* summary row */}
        {activeFilters > 0 ? (
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-muted-foreground">
              {filtered.length} of {jobs.length} listing{jobs.length !== 1 ? "s" : ""} shown
            </span>
            <button onClick={clearAll} data-testid="clear-filters" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
              <X className="w-3.5 h-3.5" /> Clear all filters
            </button>
          </div>
        ) : (
          <div className="text-xs text-muted-foreground pt-1">Showing all {jobs.length} listings</div>
        )}
      </div>

      {/* ── results ── */}
      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-center py-20 bg-card rounded-2xl border border-card-border"
            data-testid="jobs-empty"
          >
            <Briefcase className="w-14 h-14 text-muted-foreground mx-auto mb-4 opacity-30" />
            <p className="text-foreground font-semibold text-base">No jobs match your filters</p>
            <p className="text-muted-foreground text-sm mt-1">Try adjusting your search or clearing the filters.</p>
            <button
              onClick={clearAll}
              className="mt-4 inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors"
            >
              <X className="w-3.5 h-3.5" /> Clear filters
            </button>
          </motion.div>
        ) : (
          <motion.div key="list" className="space-y-4">
            {filtered.map((job) => (
              <JobCard key={job.id} job={job} onApply={handleApply} onViewDetails={setSelectedJob} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── alert strip ── */}
      {filtered.length > 0 && (
        <div className="mt-8 rounded-2xl bg-primary/5 border border-primary/15 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Bell className="w-5 h-5 text-primary shrink-0" />
            <span className="text-sm font-medium text-foreground">
              Get notified when new agriculture jobs matching your profile are posted.
            </span>
          </div>
          <button
            data-testid="jobs-alert-cta"
            className="shrink-0 inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors"
          >
            <Bell className="w-4 h-4" /> Set Job Alerts
          </button>
        </div>
      )}
    </div>

    {/* ── apply placeholder overlay ── */}
    <AnimatePresence>
      {applyJob && (
        <PlaceholderOverlay
          type="apply"
          job={applyJob}
          onBack={() => setApplyJob(null)}
        />
      )}
    </AnimatePresence>

    {/* ── job detail modal ── */}
    <JobDetailModal
      job={selectedJob}
      onClose={() => setSelectedJob(null)}
    />
    </>
  );
}
