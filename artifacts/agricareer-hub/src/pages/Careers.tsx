import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf, Landmark, UserCheck, FlaskConical, Microscope,
  GraduationCap, Megaphone, Building2, Globe, TrendingUp, Sprout,
  Star, ChevronRight, Target, IndianRupee, BookOpen, Briefcase,
  ThumbsUp, ThumbsDown, Clock, Award, Users, ArrowRight, X,
  CheckCircle2, TrendingDown, BadgeCheck, Layers,
} from "lucide-react";
import { careerProfiles, type CareerProfile } from "@/data/careerProfiles";
import { careerPaths, type CareerPath } from "@/data/careers";

/* ─── Icon maps ─────────────────────────────────────── */
const profileIconMap: Record<string, React.ElementType> = {
  Leaf, Landmark, UserCheck, FlaskConical, Microscope,
  GraduationCap, Megaphone, Building2, Globe, TrendingUp,
};

const sectorIconMap: Record<string, React.ElementType> = {
  Building2, FlaskConical, TrendingUp, Landmark, Sprout, Globe,
};

/* ─── Profile accent colors ─────────────────────────── */
const accentMap: Record<string, { bg: string; badge: string; iconBg: string; barFrom: string; barTo: string; highlight: string }> = {
  green:   { bg: "from-green-500 to-emerald-600",   badge: "bg-green-100 text-green-700 border-green-200",   iconBg: "bg-green-100 text-green-700",   barFrom: "from-green-500",   barTo: "to-emerald-600",   highlight: "bg-green-50 border-green-200" },
  sky:     { bg: "from-sky-500 to-blue-600",         badge: "bg-sky-100 text-sky-700 border-sky-200",         iconBg: "bg-sky-100 text-sky-700",         barFrom: "from-sky-500",     barTo: "to-blue-600",     highlight: "bg-sky-50 border-sky-200" },
  emerald: { bg: "from-emerald-500 to-teal-600",     badge: "bg-emerald-100 text-emerald-700 border-emerald-200", iconBg: "bg-emerald-100 text-emerald-700", barFrom: "from-emerald-500", barTo: "to-teal-600",   highlight: "bg-emerald-50 border-emerald-200" },
  violet:  { bg: "from-violet-500 to-purple-600",    badge: "bg-violet-100 text-violet-700 border-violet-200", iconBg: "bg-violet-100 text-violet-700",   barFrom: "from-violet-500",  barTo: "to-purple-600",  highlight: "bg-violet-50 border-violet-200" },
  purple:  { bg: "from-purple-500 to-indigo-600",    badge: "bg-purple-100 text-purple-700 border-purple-200", iconBg: "bg-purple-100 text-purple-700",   barFrom: "from-purple-500",  barTo: "to-indigo-600",  highlight: "bg-purple-50 border-purple-200" },
  blue:    { bg: "from-blue-500 to-indigo-600",      badge: "bg-blue-100 text-blue-700 border-blue-200",       iconBg: "bg-blue-100 text-blue-700",       barFrom: "from-blue-500",    barTo: "to-indigo-600",  highlight: "bg-blue-50 border-blue-200" },
  teal:    { bg: "from-teal-500 to-cyan-600",        badge: "bg-teal-100 text-teal-700 border-teal-200",       iconBg: "bg-teal-100 text-teal-700",       barFrom: "from-teal-500",    barTo: "to-cyan-600",    highlight: "bg-teal-50 border-teal-200" },
};

const sectorMeta: Record<CareerPath["sector"], { badge: string; bg: string }> = {
  government:      { badge: "bg-sky-100 text-sky-700 border-sky-200",           bg: "from-sky-500 to-blue-600" },
  research:        { badge: "bg-violet-100 text-violet-700 border-violet-200",  bg: "from-violet-500 to-purple-600" },
  private:         { badge: "bg-orange-100 text-orange-700 border-orange-200",  bg: "from-orange-500 to-amber-600" },
  entrepreneurship:{ badge: "bg-green-100 text-green-700 border-green-200",     bg: "from-green-500 to-emerald-600" },
  international:   { badge: "bg-pink-100 text-pink-700 border-pink-200",        bg: "from-pink-500 to-rose-600" },
};

const sectorLabel: Record<CareerPath["sector"], string> = {
  government: "Government", research: "Research", private: "Private",
  entrepreneurship: "Entrepreneurship", international: "International",
};

/* ─── Tag badge ─────────────────────────────────────── */
function TagBadge({ tag }: { tag: CareerProfile["tag"] }) {
  const colors: Record<CareerProfile["tag"], string> = {
    "B.Sc Agriculture": "bg-emerald-100 text-emerald-700 border-emerald-200",
    "M.Sc Agronomy":    "bg-blue-100 text-blue-700 border-blue-200",
    "Both":             "bg-amber-100 text-amber-700 border-amber-200",
  };
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${colors[tag]}`}>
      <GraduationCap className="w-3 h-3" /> {tag}
    </span>
  );
}

/* ─── Stars ─────────────────────────────────────────── */
function GrowthStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/20"}`} />
      ))}
      <span className="text-xs text-muted-foreground ml-1">{rating}/5</span>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   CAREER PROFILE CARD
════════════════════════════════════════════════════ */
function ProfileCard({ profile, onView }: { profile: CareerProfile; onView: (p: CareerProfile) => void }) {
  const Icon = profileIconMap[profile.icon] ?? Leaf;
  const accent = accentMap[profile.accentColor] ?? accentMap.green;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className="bg-card rounded-2xl border border-card-border hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden group"
      data-testid={`profile-card-${profile.id}`}
    >
      {/* Accent bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${accent.barFrom} ${accent.barTo}`} />

      <div className="p-5 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${accent.bg} shadow-sm`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-foreground text-sm leading-snug">{profile.title}</h3>
            <div className="mt-1">
              <TagBadge tag={profile.tag} />
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">{profile.shortDescription}</p>

        {/* Salary + highlights */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {profile.highlights.slice(0, 2).map((h) => (
            <div key={h.label} className={`rounded-xl p-2.5 border ${accent.highlight}`}>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">{h.label}</div>
              <div className="text-xs font-bold text-foreground mt-0.5">{h.value}</div>
            </div>
          ))}
        </div>

        {/* Salary range */}
        <div className="flex items-center gap-1.5 text-sm font-bold text-foreground mb-3 px-3 py-2 bg-muted/50 rounded-xl">
          <IndianRupee className="w-4 h-4 text-primary shrink-0" />
          <span>{profile.salaryRange}</span>
        </div>

        {/* Top 3 skills */}
        <div className="mb-4">
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-1.5">Key Skills</div>
          <div className="flex flex-wrap gap-1">
            {profile.requiredSkills.slice(0, 3).map((s) => (
              <span key={s} className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{s}</span>
            ))}
            {profile.requiredSkills.length > 3 && (
              <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">+{profile.requiredSkills.length - 3}</span>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-3 border-t border-border">
          <button
            onClick={() => onView(profile)}
            data-testid={`profile-view-${profile.id}`}
            className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all duration-150 flex items-center justify-center gap-1.5 bg-gradient-to-r ${accent.bg} text-white hover:opacity-90 shadow-sm hover:shadow-md`}
          >
            View Full Profile <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════
   PROFILE DETAIL MODAL
════════════════════════════════════════════════════ */
function ProfileModal({ profile, onClose }: { profile: CareerProfile; onClose: () => void }) {
  const Icon = profileIconMap[profile.icon] ?? Leaf;
  const accent = accentMap[profile.accentColor] ?? accentMap.green;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.22 }}
        className="bg-card w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        data-testid={`profile-modal-${profile.id}`}
      >
        {/* Modal header */}
        <div className={`bg-gradient-to-r ${accent.bg} p-6 text-white shrink-0`}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold leading-tight">{profile.title}</h2>
                <TagBadge tag={profile.tag} />
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-white shrink-0"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-white/80 text-sm mt-3 leading-relaxed">{profile.description}</p>
          <div className="flex flex-wrap gap-3 mt-4">
            {profile.highlights.map((h) => (
              <div key={h.label} className="bg-white/15 rounded-xl px-3 py-2">
                <div className="text-white/60 text-[10px] font-semibold uppercase tracking-wider">{h.label}</div>
                <div className="text-white font-bold text-sm">{h.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal body — scrollable */}
        <div className="overflow-y-auto flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Eligibility */}
            <div>
              <h3 className="flex items-center gap-2 text-sm font-bold text-foreground mb-3">
                <BadgeCheck className="w-4 h-4 text-primary" /> Eligibility
              </h3>
              <ul className="space-y-1.5">
                {profile.eligibility.map((e) => (
                  <li key={e} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" /> {e}
                  </li>
                ))}
              </ul>
            </div>

            {/* Career Growth */}
            <div>
              <h3 className="flex items-center gap-2 text-sm font-bold text-foreground mb-3">
                <TrendingUp className="w-4 h-4 text-primary" /> Career Growth Path
              </h3>
              <ol className="space-y-1.5">
                {profile.careerGrowth.map((step, i) => (
                  <li key={step} className="flex items-center gap-2.5 text-xs text-muted-foreground">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 bg-gradient-to-br ${accent.bg} text-white`}>{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Salary Breakdown — full width */}
            <div className="md:col-span-2">
              <h3 className="flex items-center gap-2 text-sm font-bold text-foreground mb-3">
                <IndianRupee className="w-4 h-4 text-primary" /> Salary Breakdown (India 2026)
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Entry Level", value: profile.salaryBreakdown.entry, color: "bg-green-50 border-green-200" },
                  { label: "Mid Career", value: profile.salaryBreakdown.mid, color: "bg-amber-50 border-amber-200" },
                  { label: "Senior Level", value: profile.salaryBreakdown.senior, color: "bg-blue-50 border-blue-200" },
                ].map((tier) => (
                  <div key={tier.label} className={`rounded-xl p-3 border ${tier.color}`}>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-1">{tier.label}</div>
                    <div className="text-xs font-bold text-foreground leading-snug">{tier.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Relevant Exams */}
            <div>
              <h3 className="flex items-center gap-2 text-sm font-bold text-foreground mb-3">
                <BookOpen className="w-4 h-4 text-primary" /> Relevant Exams (2026)
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {profile.relevantExams.map((exam) => (
                  <span key={exam} className="text-[11px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full font-medium">{exam}</span>
                ))}
              </div>
            </div>

            {/* Required Skills */}
            <div>
              <h3 className="flex items-center gap-2 text-sm font-bold text-foreground mb-3">
                <Target className="w-4 h-4 text-primary" /> Required Skills
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {profile.requiredSkills.map((skill) => (
                  <span key={skill} className="text-[11px] bg-muted text-muted-foreground border border-border px-2 py-0.5 rounded-full">{skill}</span>
                ))}
              </div>
            </div>

            {/* Top Recruiters */}
            <div className="md:col-span-2">
              <h3 className="flex items-center gap-2 text-sm font-bold text-foreground mb-3">
                <Briefcase className="w-4 h-4 text-primary" /> Top Recruiters in India
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {profile.topRecruiters.map((r) => (
                  <div key={r} className="bg-muted/60 rounded-xl px-3 py-2 text-[11px] font-semibold text-muted-foreground border border-border text-center">{r}</div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════
   SECTOR CARD (existing career sectors)
════════════════════════════════════════════════════ */
function SectorCard({ path, onExpand }: { path: CareerPath; onExpand: (id: number) => void }) {
  const Icon = sectorIconMap[path.icon] ?? Building2;
  const meta = sectorMeta[path.sector];
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-card rounded-2xl border border-card-border hover:shadow-lg hover:border-primary/20 transition-all duration-200 flex flex-col overflow-hidden"
      data-testid={`sector-card-${path.id}`}
    >
      <div className={`h-1 w-full bg-gradient-to-r ${meta.bg}`} />
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start gap-3 mb-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${meta.bg}`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-foreground text-sm leading-snug">{path.title}</h3>
            <span className={`inline-block mt-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${meta.badge} capitalize`}>
              {sectorLabel[path.sector]}
            </span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">{path.description}</p>
        <div className="flex items-center gap-2 text-sm font-bold text-foreground mb-3 px-3 py-2 bg-muted/50 rounded-xl">
          <IndianRupee className="w-4 h-4 text-primary shrink-0" />
          <span>{path.salaryRange}</span>
        </div>
        <div className="mb-4">
          <GrowthStars rating={path.growthRating} />
        </div>
        <div className="flex flex-wrap gap-1 mb-4">
          {path.roles.slice(0, 3).map((r) => (
            <span key={r} className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{r}</span>
          ))}
          {path.roles.length > 3 && (
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">+{path.roles.length - 3}</span>
          )}
        </div>
        <div className="mt-auto pt-3 border-t border-border">
          <button
            onClick={() => onExpand(path.id)}
            className="w-full py-2.5 rounded-xl bg-primary/10 text-primary font-bold text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-150 flex items-center justify-center gap-1.5"
          >
            View Full Guide <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════
   SECTOR DETAIL PANEL
════════════════════════════════════════════════════ */
function SectorDetail({ path, onClose }: { path: CareerPath; onClose: () => void }) {
  const Icon = sectorIconMap[path.icon] ?? Building2;
  const meta = sectorMeta[path.sector];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.22 }}
      className="bg-card rounded-2xl border border-card-border overflow-hidden mb-6"
    >
      <div className={`bg-gradient-to-r ${meta.bg} p-6 text-white`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold">{path.title}</h2>
              <span className="text-white/75 text-sm">{sectorLabel[path.sector]} Sector</span>
            </div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white text-sm font-semibold bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-lg transition-colors shrink-0">
            ← Back
          </button>
        </div>
        <p className="text-white/80 text-sm mt-3 leading-relaxed max-w-2xl">{path.description}</p>
        <div className="flex flex-wrap gap-3 mt-4">
          <div className="bg-white/15 rounded-xl px-4 py-2">
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
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="lg:col-span-2">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2"><IndianRupee className="w-4 h-4 text-primary" /> Salary Trajectory</h3>
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
        <div>
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2"><Target className="w-4 h-4 text-primary" /> Roles</h3>
          <ul className="space-y-1.5">
            {path.roles.map((r) => (<li key={r} className="flex items-start gap-2 text-xs text-muted-foreground"><ChevronRight className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />{r}</li>))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2"><GraduationCap className="w-4 h-4 text-primary" /> Qualifications</h3>
          <ul className="space-y-1.5">
            {path.qualifications.map((q) => (<li key={q} className="flex items-start gap-2 text-xs text-muted-foreground"><ChevronRight className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />{q}</li>))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2"><Briefcase className="w-4 h-4 text-primary" /> Top Employers</h3>
          <div className="flex flex-wrap gap-1.5">{path.topEmployers.map((e) => (<span key={e} className="text-[11px] bg-muted text-muted-foreground border border-border px-2.5 py-1 rounded-full">{e}</span>))}</div>
        </div>
        <div>
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2"><BookOpen className="w-4 h-4 text-primary" /> Key Exams</h3>
          <div className="flex flex-wrap gap-1.5">{path.keyExams.map((e) => (<span key={e} className="text-[11px] bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-full font-medium">{e}</span>))}</div>
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
            <h3 className="flex items-center gap-2 font-bold text-green-700 text-sm mb-3"><ThumbsUp className="w-4 h-4" /> Advantages</h3>
            <ul className="space-y-1.5">{path.prosAndCons.pros.map((p) => (<li key={p} className="flex items-start gap-2 text-xs text-green-700"><ChevronRight className="w-3 h-3 mt-0.5 shrink-0" />{p}</li>))}</ul>
          </div>
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
            <h3 className="flex items-center gap-2 font-bold text-red-700 text-sm mb-3"><ThumbsDown className="w-4 h-4" /> Challenges</h3>
            <ul className="space-y-1.5">{path.prosAndCons.cons.map((c) => (<li key={c} className="flex items-start gap-2 text-xs text-red-700"><ChevronRight className="w-3 h-3 mt-0.5 shrink-0" />{c}</li>))}</ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════ */
type Tab = "profiles" | "sectors";

export default function Careers() {
  const [activeTab, setActiveTab] = useState<Tab>("profiles");
  const [selectedProfile, setSelectedProfile] = useState<CareerProfile | null>(null);
  const [expandedSectorId, setExpandedSectorId] = useState<number | null>(null);
  const [tagFilter, setTagFilter] = useState<"All" | CareerProfile["tag"]>("All");

  const expandedSector = careerPaths.find((p) => p.id === expandedSectorId) ?? null;

  const filteredProfiles = tagFilter === "All"
    ? careerProfiles
    : careerProfiles.filter((p) => p.tag === tagFilter || p.tag === "Both");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-testid="careers-page">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 px-8 py-12 mb-8 shadow-lg">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 900 250" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 150 Q225 60 450 150 T900 150 V250 H0Z" fill="white" />
            <circle cx="800" cy="60" r="100" fill="white" opacity="0.5" />
          </svg>
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <Sprout className="w-5 h-5 text-primary-foreground/80" />
            <span className="text-primary-foreground/80 text-sm font-bold uppercase tracking-wider">2026 Career Guide</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary-foreground leading-tight mb-3">
            Where Will Your Agriculture<br className="hidden sm:block" /> Degree Take You?
          </h1>
          <p className="text-primary-foreground/75 text-base max-w-xl leading-relaxed">
            Explore 7 specific career profiles for B.Sc Agriculture and M.Sc Agronomy graduates — eligibility, salary, growth paths, key exams, and top recruiters.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            {[
              { num: "7", label: "Career Profiles" },
              { num: "6", label: "Career Sectors" },
              { num: "40+", label: "Distinct Roles" },
              { num: "2026", label: "Data Year" },
            ].map((item) => (
              <div key={item.label} className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2.5">
                <div className="text-primary-foreground font-bold text-xl leading-none">{item.num}</div>
                <div className="text-primary-foreground/70 text-xs mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab switcher ── */}
      <div className="flex items-center gap-2 mb-6 bg-muted/50 rounded-2xl p-1.5 w-fit border border-border">
        {([
          { key: "profiles" as Tab, label: "Career Profiles", icon: Target, count: careerProfiles.length },
          { key: "sectors" as Tab,  label: "Career Sectors",  icon: Layers, count: careerPaths.length },
        ] as const).map(({ key, label, icon: Icon, count }) => (
          <button
            key={key}
            onClick={() => { setActiveTab(key); setExpandedSectorId(null); setSelectedProfile(null); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
              activeTab === key
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
            <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${activeTab === key ? "bg-white/20" : "bg-muted text-muted-foreground"}`}>
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* ── Tab: Career Profiles ── */}
      <AnimatePresence mode="wait">
        {activeTab === "profiles" && (
          <motion.div key="profiles" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>

            {/* Tag filter row */}
            <div className="flex items-center gap-2 mb-5 flex-wrap">
              <span className="text-xs font-semibold text-muted-foreground">Filter by degree:</span>
              {(["All", "B.Sc Agriculture", "M.Sc Agronomy"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTagFilter(t)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-150 ${
                    tagFilter === t
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-primary/40"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProfiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} onView={setSelectedProfile} />
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Tab: Career Sectors ── */}
        {activeTab === "sectors" && (
          <motion.div key="sectors" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
            <AnimatePresence mode="wait">
              {expandedSector && (
                <SectorDetail key={`detail-${expandedSector.id}`} path={expandedSector} onClose={() => setExpandedSectorId(null)} />
              )}
            </AnimatePresence>
            {!expandedSector && (
              <p className="text-sm text-muted-foreground mb-5">
                Six broad career sectors for agriculture graduates — with salary trajectory, top employers, and honest pros & cons.
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {careerPaths.map((path) => (
                <SectorCard key={path.id} path={path} onExpand={setExpandedSectorId} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottom CTA ── */}
      <div className="mt-10 bg-card rounded-2xl border border-card-border p-8 text-center">
        <Users className="w-10 h-10 text-primary mx-auto mb-3" />
        <h3 className="text-xl font-bold text-foreground mb-2">Ready to take the next step?</h3>
        <p className="text-muted-foreground text-sm max-w-md mx-auto mb-5">
          Browse live 2026 exam notifications, current job vacancies, and set up alerts for your target career path.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href="/exams" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors">
            Browse 2026 Exams <ChevronRight className="w-4 h-4" />
          </a>
          <a href="/jobs" className="inline-flex items-center gap-2 border border-border text-foreground px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-muted transition-colors">
            Browse 2026 Jobs <ChevronRight className="w-4 h-4" />
          </a>
          <a href="/alerts" className="inline-flex items-center gap-2 bg-amber-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-amber-600 transition-colors">
            Set Up Alerts <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* ── Profile Modal ── */}
      <AnimatePresence>
        {selectedProfile && (
          <ProfileModal profile={selectedProfile} onClose={() => setSelectedProfile(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
