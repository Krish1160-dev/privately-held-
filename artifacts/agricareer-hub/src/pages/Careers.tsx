import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, FlaskConical, TrendingUp, Landmark, Sprout, Globe,
  Star, ChevronRight, Target, GraduationCap, IndianRupee,
  Briefcase, BookOpen, ThumbsUp, ThumbsDown, Clock, TrendingDown,
  Users, Award, ArrowRight,
} from "lucide-react";
import { careerPaths, type CareerPath } from "@/data/careers";

const iconMap: Record<string, React.ElementType> = {
  Building2, FlaskConical, TrendingUp, Landmark, Sprout, Globe,
};

const sectorMeta: Record<CareerPath["sector"], { color: string; badge: string; bg: string }> = {
  government:      { color: "text-sky-700",    badge: "bg-sky-100 text-sky-700 border-sky-200",      bg: "from-sky-500 to-blue-600" },
  research:        { color: "text-violet-700",  badge: "bg-violet-100 text-violet-700 border-violet-200", bg: "from-violet-500 to-purple-600" },
  private:         { color: "text-orange-700",  badge: "bg-orange-100 text-orange-700 border-orange-200", bg: "from-orange-500 to-amber-600" },
  entrepreneurship:{ color: "text-green-700",   badge: "bg-green-100 text-green-700 border-green-200",  bg: "from-green-500 to-emerald-600" },
  international:   { color: "text-pink-700",    badge: "bg-pink-100 text-pink-700 border-pink-200",    bg: "from-pink-500 to-rose-600" },
};

const sectorLabel: Record<CareerPath["sector"], string> = {
  government: "Government",
  research: "Research & Academia",
  private: "Private Sector",
  entrepreneurship: "Entrepreneurship",
  international: "International",
};

function GrowthStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/20"}`} />
      ))}
      <span className="text-xs text-muted-foreground ml-1.5">{rating}/5 growth potential</span>
    </div>
  );
}

function CareerCard({ path, onExpand }: { path: CareerPath; onExpand: (id: number) => void }) {
  const Icon = iconMap[path.icon] ?? Building2;
  const meta = sectorMeta[path.sector];
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className="bg-card rounded-2xl border border-card-border hover:shadow-lg hover:border-primary/20 transition-all duration-200 flex flex-col overflow-hidden"
      data-testid={`career-card-${path.id}`}
    >
      {/* Gradient top stripe */}
      <div className={`h-1 w-full bg-gradient-to-r ${meta.bg}`} />

      <div className="p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${meta.bg}`}>
            <Icon className="w-5.5 h-5.5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-foreground text-base leading-snug">{path.title}</h3>
            <span className={`inline-block mt-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${meta.badge}`}>
              {sectorLabel[path.sector]}
            </span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{path.description}</p>

        {/* Salary & Growth */}
        <div className="flex items-center justify-between gap-2 mb-4 p-3 bg-muted/50 rounded-xl">
          <div>
            <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Salary Range</div>
            <div className="flex items-center gap-1 text-sm font-bold text-foreground">
              <IndianRupee className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>{path.salaryRange}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Growth</div>
            <GrowthStars rating={path.growthRating} />
          </div>
        </div>

        {/* Key info pills */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
          <div className="flex items-start gap-1.5 text-muted-foreground">
            <Clock className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-foreground text-[11px]">Time to First Job</div>
              <div>{path.timeToFirstJob}</div>
            </div>
          </div>
          <div className="flex items-start gap-1.5 text-muted-foreground">
            <Award className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-foreground text-[11px]">Entry Requirement</div>
              <div className="line-clamp-2">{path.entryRequirement}</div>
            </div>
          </div>
        </div>

        {/* Typical Roles */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Target className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] font-bold text-foreground uppercase tracking-wider">Typical Roles</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {path.roles.slice(0, 3).map((role) => (
              <span key={role} className="text-[11px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{role}</span>
            ))}
            {path.roles.length > 3 && (
              <span className="text-[11px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">
                +{path.roles.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Key Exams */}
        <div className="mb-5">
          <div className="flex items-center gap-1.5 mb-2">
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] font-bold text-foreground uppercase tracking-wider">Key Exams / Entry Points</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {path.keyExams.slice(0, 2).map((exam) => (
              <span key={exam} className="text-[11px] bg-primary/8 text-primary border border-primary/15 px-2 py-0.5 rounded-full font-medium">{exam}</span>
            ))}
            {path.keyExams.length > 2 && (
              <span className="text-[11px] text-muted-foreground px-2 py-0.5">+{path.keyExams.length - 2} more</span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-border">
          <button
            onClick={() => onExpand(path.id)}
            data-testid={`career-explore-${path.id}`}
            className="w-full py-2.5 rounded-xl bg-primary/10 text-primary font-bold text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-150 flex items-center justify-center gap-1.5"
          >
            View Full Career Guide <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Detail Panel ─── */
function CareerDetail({ path, onClose }: { path: CareerPath; onClose: () => void }) {
  const Icon = iconMap[path.icon] ?? Building2;
  const meta = sectorMeta[path.sector];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.25 }}
      className="bg-card rounded-2xl border border-card-border overflow-hidden"
      data-testid={`career-detail-${path.id}`}
    >
      {/* Header */}
      <div className={`bg-gradient-to-r ${meta.bg} p-6 text-white`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold leading-snug">{path.title}</h2>
              <span className="text-white/75 text-sm">{sectorLabel[path.sector]} Sector</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white text-sm font-semibold bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-lg transition-colors shrink-0"
          >
            ← Back
          </button>
        </div>
        <p className="text-white/80 text-sm mt-4 leading-relaxed max-w-2xl">{path.description}</p>
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="bg-white/15 rounded-xl px-4 py-2 text-center">
            <div className="font-bold text-base">{path.salaryRange}</div>
            <div className="text-white/70 text-[11px] mt-0.5">Full salary range</div>
          </div>
          <div className="bg-white/15 rounded-xl px-4 py-2">
            <div className="font-bold text-base">{path.timeToFirstJob}</div>
            <div className="text-white/70 text-[11px] mt-0.5">Time to first job</div>
          </div>
          <div className="bg-white/15 rounded-xl px-4 py-2 flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < path.growthRating ? "fill-amber-300 text-amber-300" : "text-white/20"}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Salary Milestones */}
        <div className="lg:col-span-2">
          <h3 className="flex items-center gap-2 font-bold text-foreground text-sm mb-3">
            <IndianRupee className="w-4 h-4 text-primary" /> Salary Trajectory
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {path.salaryMilestones.map((m, i) => (
              <div key={i} className="bg-muted/50 rounded-xl p-3 border border-border">
                <div className="text-[10px] font-bold text-primary uppercase tracking-wide mb-1">{m.year}</div>
                <div className="text-xs font-bold text-foreground leading-snug mb-1">{m.role}</div>
                <div className="text-sm font-extrabold text-foreground">{m.salary}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Roles */}
        <div>
          <h3 className="flex items-center gap-2 font-bold text-foreground text-sm mb-3">
            <Target className="w-4 h-4 text-primary" /> Typical Roles
          </h3>
          <ul className="space-y-1.5">
            {path.roles.map((role) => (
              <li key={role} className="flex items-start gap-2 text-sm text-muted-foreground">
                <ChevronRight className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" /> {role}
              </li>
            ))}
          </ul>
        </div>

        {/* Qualifications */}
        <div>
          <h3 className="flex items-center gap-2 font-bold text-foreground text-sm mb-3">
            <GraduationCap className="w-4 h-4 text-primary" /> Qualifications Required
          </h3>
          <ul className="space-y-1.5">
            {path.qualifications.map((q) => (
              <li key={q} className="flex items-start gap-2 text-sm text-muted-foreground">
                <ChevronRight className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" /> {q}
              </li>
            ))}
          </ul>
        </div>

        {/* Top Employers */}
        <div>
          <h3 className="flex items-center gap-2 font-bold text-foreground text-sm mb-3">
            <Briefcase className="w-4 h-4 text-primary" /> Top Employers
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {path.topEmployers.map((e) => (
              <span key={e} className="text-xs bg-muted text-muted-foreground border border-border px-2.5 py-1 rounded-full">{e}</span>
            ))}
          </div>
        </div>

        {/* Key Exams */}
        <div>
          <h3 className="flex items-center gap-2 font-bold text-foreground text-sm mb-3">
            <BookOpen className="w-4 h-4 text-primary" /> Key Exams / Entry Points
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {path.keyExams.map((e) => (
              <span key={e} className="text-xs bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-full font-medium">{e}</span>
            ))}
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
            <h3 className="flex items-center gap-2 font-bold text-green-700 dark:text-green-400 text-sm mb-3">
              <ThumbsUp className="w-4 h-4" /> Advantages
            </h3>
            <ul className="space-y-1.5">
              {path.prosAndCons.pros.map((p) => (
                <li key={p} className="flex items-start gap-2 text-xs text-green-700 dark:text-green-300">
                  <ChevronRight className="w-3 h-3 mt-0.5 shrink-0" /> {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
            <h3 className="flex items-center gap-2 font-bold text-red-700 dark:text-red-400 text-sm mb-3">
              <ThumbsDown className="w-4 h-4" /> Challenges
            </h3>
            <ul className="space-y-1.5">
              {path.prosAndCons.cons.map((c) => (
                <li key={c} className="flex items-start gap-2 text-xs text-red-700 dark:text-red-300">
                  <ChevronRight className="w-3 h-3 mt-0.5 shrink-0" /> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════ */
export default function Careers() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const expandedPath = careerPaths.find((p) => p.id === expandedId) ?? null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-testid="careers-page">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 px-8 py-12 mb-10 shadow-lg">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 900 250" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 150 Q225 60 450 150 T900 150 V250 H0Z" fill="white" />
            <circle cx="800" cy="60" r="100" fill="white" opacity="0.5" />
          </svg>
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <Sprout className="w-5 h-5 text-primary-foreground/80" />
            <span className="text-primary-foreground/80 text-sm font-semibold uppercase tracking-wider">2026 Career Guide</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary-foreground leading-tight mb-3">
            Where Will Your Agriculture<br />Degree Take You?
          </h1>
          <p className="text-primary-foreground/75 text-base max-w-xl leading-relaxed">
            Six distinct career paths — from government service to agri-tech startups, research fellowships to international consultancy. Salary trajectories, top employers, key exams, and honest pros & cons for each.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            {[
              { num: "6", label: "Career Sectors" },
              { num: "40+", label: "Distinct Roles" },
              { num: "₹35k – ₹2L+", label: "Monthly Range" },
              { num: "2026", label: "Data Current As Of" },
            ].map((item) => (
              <div key={item.label} className="bg-white/15 backdrop-blur-sm rounded-xl px-5 py-3">
                <div className="text-primary-foreground font-bold text-xl leading-none">{item.num}</div>
                <div className="text-primary-foreground/70 text-xs mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expanded Detail Panel */}
      <AnimatePresence mode="wait">
        {expandedPath && (
          <motion.div key={`detail-${expandedPath.id}`} className="mb-8">
            <CareerDetail path={expandedPath} onClose={() => setExpandedId(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section header */}
      {!expandedPath && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-1">Explore Career Sectors</h2>
          <p className="text-sm text-muted-foreground">
            Click "View Full Career Guide" on any card to see salary trajectory, top employers, key exams, and honest pros & cons.
          </p>
        </div>
      )}

      {/* Career Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {careerPaths.map((path) => (
          <CareerCard key={path.id} path={path} onExpand={setExpandedId} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-10 bg-card rounded-2xl border border-card-border p-8 text-center">
        <Users className="w-10 h-10 text-primary mx-auto mb-3" />
        <h3 className="text-xl font-bold text-foreground mb-2">Ready to Act?</h3>
        <p className="text-muted-foreground text-sm max-w-md mx-auto mb-5">
          Browse live 2026 exam notifications and current job vacancies — from IBPS AFO and TNPSC CAS to NABARD and ICAR JRF.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="/exams"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors"
            data-testid="careers-cta-exams"
          >
            Browse 2026 Exams <ChevronRight className="w-4 h-4" />
          </a>
          <a
            href="/jobs"
            className="inline-flex items-center gap-2 border border-border text-foreground px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-muted transition-colors"
            data-testid="careers-cta-jobs"
          >
            Browse 2026 Jobs <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
