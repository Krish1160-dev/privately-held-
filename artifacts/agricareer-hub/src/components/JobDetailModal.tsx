import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, MapPin, IndianRupee, GraduationCap, Users, Calendar,
  Briefcase, ExternalLink, CheckCircle2, ChevronRight,
  Shield, Landmark, Building2, FlaskConical, ClipboardList,
  AlertCircle, Star, ArrowRight, CalendarClock, BadgeCheck,
  Link2Off, ArrowLeft, Info,
} from "lucide-react";
import type { Job } from "@/data/jobs";

interface Props {
  job: Job | null;
  onClose: () => void;
}

/* ── helpers ──────────────────────────────────── */
function openUrl(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function SectorPill({ sector }: { sector: Job["sector"] }) {
  const map: Record<Job["sector"], { label: string; cls: string; icon: React.ElementType }> = {
    govt:     { label: "Government", cls: "bg-sky-100 text-sky-700 border-sky-200",       icon: Landmark   },
    private:  { label: "Private",    cls: "bg-orange-100 text-orange-700 border-orange-200", icon: Building2 },
    ngo:      { label: "NGO",        cls: "bg-violet-100 text-violet-700 border-violet-200", icon: Users     },
    research: { label: "Research",   cls: "bg-teal-100 text-teal-700 border-teal-200",    icon: FlaskConical },
  };
  const { label, cls, icon: Icon } = map[sector];
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${cls}`}>
      <Icon className="w-3 h-3" /> {label}
    </span>
  );
}

function RegionPill({ region }: { region: Job["region"] }) {
  if (region === "state")
    return (
      <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200">
        <Shield className="w-3 h-3" /> Tamil Nadu
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-full border border-indigo-200">
      <Landmark className="w-3 h-3" /> National
    </span>
  );
}

function Section({ icon: Icon, title, children }: {
  icon: React.ElementType; title: string; children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="w-3.5 h-3.5 text-primary" />
        </span>
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">{title}</h3>
      </div>
      {children}
    </div>
  );
}

/* ── placeholder panel ────────────────────────── */
function PlaceholderPanel({ job, onBack }: { job: Job; onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="absolute inset-0 bg-card/98 backdrop-blur-sm z-10 flex flex-col items-center justify-center px-8 py-10 text-center rounded-inherit"
    >
      <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-5">
        <Link2Off className="w-8 h-8 text-amber-500" />
      </div>
      <h3 className="text-lg font-extrabold text-foreground mb-2">Application Link Not Yet Active</h3>
      <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mb-6">
        Official application link will be available when live job data is connected. Visit the official website to apply directly.
      </p>
      <div className="w-full max-w-sm bg-muted/60 rounded-xl p-4 text-left mb-6 border border-border">
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
      <div className="flex gap-3 w-full max-w-sm">
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
  );
}

/* ══════════════════════════════════════════════
   MODAL
══════════════════════════════════════════════ */
export default function JobDetailModal({ job, onClose }: Props) {
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  useEffect(() => {
    if (!job) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showPlaceholder) setShowPlaceholder(false);
        else onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [job, onClose, showPlaceholder]);

  useEffect(() => { setShowPlaceholder(false); }, [job]);

  useEffect(() => {
    document.body.style.overflow = job ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [job]);

  function handleApply() {
    if (!job) return;
    if (job.applyUrl) openUrl(job.applyUrl);
    else setShowPlaceholder(true);
  }

  const isClosed = job?.lastDate === "Closed";

  const headerGradient = !job ? "" :
    job.sector === "govt"     ? "bg-gradient-to-r from-sky-700 to-blue-800"       :
    job.sector === "research" ? "bg-gradient-to-r from-teal-700 to-emerald-800"   :
    job.sector === "ngo"      ? "bg-gradient-to-r from-violet-700 to-purple-800"  :
                                "bg-gradient-to-r from-orange-600 to-amber-700";

  return (
    <AnimatePresence>
      {job && (
        <>
          {/* backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
            onClick={() => { if (showPlaceholder) setShowPlaceholder(false); else onClose(); }}
            data-testid="job-modal-backdrop"
          />

          {/* panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            className="fixed inset-x-0 bottom-0 sm:inset-0 sm:flex sm:items-center sm:justify-center z-50 p-0 sm:p-4"
            data-testid="job-detail-modal"
          >
            <div
              className="relative w-full sm:max-w-3xl max-h-[92dvh] sm:max-h-[90vh] bg-card rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* placeholder overlay */}
              <AnimatePresence>
                {showPlaceholder && (
                  <PlaceholderPanel
                    job={job}
                    onBack={() => setShowPlaceholder(false)}
                  />
                )}
              </AnimatePresence>

              {/* ── sticky header ── */}
              <div className={`shrink-0 px-5 sm:px-6 pt-5 pb-4 ${headerGradient}`}>
                <div className="w-10 h-1 rounded-full bg-white/40 mx-auto mb-4 sm:hidden" />
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 mb-2">
                      <RegionPill region={job.region} />
                      <SectorPill sector={job.sector} />
                      {isClosed && (
                        <span className="text-xs font-bold bg-white/20 text-white px-2.5 py-1 rounded-full">
                          Closed
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-white leading-snug">{job.title}</h2>
                    <p className="text-white/70 text-sm mt-0.5">{job.organization}</p>
                  </div>
                  <button
                    onClick={onClose}
                    data-testid="job-modal-close"
                    aria-label="Close"
                    className="shrink-0 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors mt-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* ── scrollable body ── */}
              <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-7" data-testid="job-modal-body">

                {/* description */}
                <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-primary pl-3">
                  {job.description}
                </p>

                {/* quick-info tiles */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { icon: MapPin,        label: "Location",    value: job.location },
                    { icon: Users,         label: "Vacancies",   value: `${job.vacancies.toLocaleString("en-IN")} posts` },
                    { icon: Briefcase,     label: "Experience",  value: job.experience },
                    { icon: CalendarClock, label: "Posted",      value: job.postedDate },
                    { icon: Calendar,      label: "Last Date",   value: job.lastDate },
                    ...(job.joiningDate ? [{ icon: ArrowRight, label: "Joining", value: job.joiningDate }] : []),
                  ].map((item) => (
                    <div key={item.label} className="bg-muted/50 rounded-xl px-3 py-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <item.icon className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{item.label}</span>
                      </div>
                      <div className={`text-sm font-semibold leading-snug ${
                        item.label === "Last Date" && !isClosed ? "text-orange-600" : "text-foreground"
                      }`}>
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* eligibility */}
                <Section icon={GraduationCap} title="Eligibility">
                  <div className="space-y-2">
                    {job.eligibilityDetails.map((line, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground leading-snug">{line}</span>
                      </div>
                    ))}
                  </div>
                </Section>

                {/* salary */}
                <Section icon={IndianRupee} title="Salary & Compensation">
                  <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-3">
                    <div className="text-[10px] font-bold text-green-700 uppercase tracking-wider">Pay Range</div>
                    <div className="text-lg font-extrabold text-green-800 mt-0.5">{job.salaryRange}</div>
                  </div>
                  <div className="space-y-2">
                    {job.salaryDetails.map((line, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <BadgeCheck className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground leading-snug">{line}</span>
                      </div>
                    ))}
                  </div>
                </Section>

                {/* responsibilities */}
                <Section icon={ClipboardList} title="Key Responsibilities">
                  <div className="space-y-2.5">
                    {job.responsibilities.map((r, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-sm text-foreground leading-snug">{r}</span>
                      </div>
                    ))}
                  </div>
                </Section>

                {/* selection process */}
                <Section icon={ChevronRight} title="Selection Process">
                  <div className="space-y-3">
                    {job.selectionProcess.map((stage, i) => (
                      <div key={i} className="flex items-start gap-3.5">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shrink-0 shadow-sm">
                          {stage.stage}
                        </div>
                        <div className="flex-1 pb-3 border-b border-border last:border-0 last:pb-0">
                          <div className="font-semibold text-sm text-foreground mb-0.5">{stage.title}</div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{stage.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>

                {/* important dates */}
                <Section icon={Calendar} title="Important Dates">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: "Posted",      value: job.postedDate,                 warn: false },
                      { label: "Last Date",   value: job.lastDate,                   warn: !isClosed },
                      { label: "Interview",   value: job.interviewDate ?? "TBA",     warn: false },
                      { label: "Joining",     value: job.joiningDate ?? "TBA",       warn: false },
                    ].map((d) => (
                      <div key={d.label} className="bg-muted/50 rounded-xl p-3 text-center">
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">{d.label}</div>
                        <div className={`text-sm font-bold leading-snug ${d.warn ? "text-orange-600" : "text-foreground"}`}>
                          {d.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>

                {/* benefits */}
                <Section icon={Star} title="Benefits & Perks">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {job.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2.5 bg-muted/40 rounded-xl px-3 py-2.5">
                        <Star className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground leading-snug">{b}</span>
                      </div>
                    ))}
                  </div>
                </Section>

                {/* tags */}
                <div className="flex flex-wrap gap-2 pb-1">
                  {job.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-muted text-muted-foreground px-3 py-1.5 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

              </div>

              {/* ── sticky footer ── */}
              <div className="shrink-0 px-5 sm:px-6 py-4 border-t border-border bg-card flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {!isClosed ? (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground sm:flex-1">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    Application closes: <span className="font-semibold text-foreground ml-1">{job.lastDate}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground sm:flex-1">
                    <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    Application window closed — check official site for results.
                  </div>
                )}
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => openUrl(`https://${job.officialWebsite}`)}
                    data-testid="job-modal-official-site"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 border border-border text-foreground text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-muted transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Official Site
                  </button>
                  {!isClosed ? (
                    <button
                      onClick={handleApply}
                      data-testid="job-modal-apply-button"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-primary text-primary-foreground text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-all duration-150 shadow-sm"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Apply Now
                    </button>
                  ) : (
                    <button
                      onClick={() => openUrl(`https://${job.officialWebsite}`)}
                      data-testid="job-modal-status-button"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-sky-600 text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-sky-700 transition-all duration-150"
                    >
                      <ExternalLink className="w-4 h-4" /> View Status
                    </button>
                  )}
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
