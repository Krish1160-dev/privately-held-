import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, GraduationCap, UserCheck, Users, Bell, FileText,
  ExternalLink, CheckCircle2, ChevronRight, Shield, Award,
  Banknote, FlaskConical, ListChecks, BookOpen,
  ClipboardList, AlertCircle, IndianRupee, Info, ArrowLeft,
  CalendarClock, Link2Off,
} from "lucide-react";
import type { Exam } from "@/data/exams";

interface Props {
  exam: Exam | null;
  onClose: () => void;
}

/* ─────────────────────────────────────────────
   Real apply / notification URLs per exam id.
   When live data is connected, replace these
   with actual dynamic links from the API.
───────────────────────────────────────────── */
const APPLY_URLS: Record<number, string> = {
  1:  "https://www.tnpscexams.net/",       // TNPSC AO
  2:  "https://admissions.tnau.ac.in/",    // TNAU PG
  3:  "https://www.tnpscexams.net/",       // TN Block AO (TNPSC portal)
  4:  "https://www.tnpscexams.net/",       // TNPSC HO
  5:  "https://aice.icar.gov.in/",         // ICAR JRF
  6:  "https://upsconline.nic.in/",        // UPSC AO
  // 7 = NABARD — results only, no apply
  8:  "https://ibps.in/",                  // IBPS AFO
  9:  "https://bank.sbi/careers",          // SBI AO
  10: "https://iariexam.iari.res.in/",     // IARI Technician
  11: "https://thulasi.psc.kerala.gov.in/",// Kerala PSC
  12: "https://admissions.tnau.ac.in/",    // TNAU PhD
};

const RESULTS_URLS: Record<number, string> = {
  7: "https://www.nabard.org/content.aspx?id=586&catid=23&mid=23", // NABARD results
};

const NOTIFICATION_URLS: Record<number, string> = {
  1:  "https://www.tnpsc.gov.in/notifications.html",
  2:  "https://tnau.ac.in/admissions/",
  3:  "https://tn.gov.in/agriculture",
  4:  "https://www.tnpsc.gov.in/notifications.html",
  5:  "https://aice.icar.gov.in/",
  6:  "https://upsc.gov.in/notifications",
  7:  "https://nabard.org/content.aspx?id=586&catid=23&mid=23",
  8:  "https://ibps.in/",
  9:  "https://bank.sbi/careers",
  10: "https://iariexam.iari.res.in/",
  11: "https://thulasi.psc.kerala.gov.in/",
  12: "https://tnau.ac.in/admissions/",
};

/* ── helpers ─────────────────────────────── */
function openUrl(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function StatusPill({ status }: { status: Exam["status"] }) {
  const map = {
    open:     "bg-green-100 text-green-700 border-green-200",
    upcoming: "bg-amber-100 text-amber-700 border-amber-200",
    results:  "bg-slate-100 text-slate-600 border-slate-200",
  };
  const label = { open: "Open", upcoming: "Upcoming", results: "Results Out" };
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${map[status]}`}>
      {status === "open" && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />}
      {label[status]}
    </span>
  );
}

function LevelPill({ level }: { level: Exam["level"] }) {
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

const categoryIcon: Record<Exam["category"], React.ElementType> = {
  entrance:    GraduationCap,
  recruitment: UserCheck,
  fellowship:  FlaskConical,
  banking:     Banknote,
};

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

/* ── placeholder panel shown when no direct link ── */
type PlaceholderType = "apply" | "reminder" | "notification" | null;

function PlaceholderPanel({
  type, exam, onBack, onOpenSite,
}: {
  type: PlaceholderType;
  exam: Exam;
  onBack: () => void;
  onOpenSite: () => void;
}) {
  const content = {
    apply: {
      icon: Link2Off,
      title: "Application Link Not Yet Active",
      body: "Official application link will be available when live exam data is connected. Check the official website to apply directly.",
      cta: "Go to Official Website",
    },
    reminder: {
      icon: CalendarClock,
      title: "Reminder Feature Coming Soon",
      body: "Deadline alerts and reminders will be available in the next update. For now, note the application deadline and check the official website regularly.",
      cta: "Visit Official Website",
    },
    notification: {
      icon: FileText,
      title: "Notification PDF Link Not Active",
      body: "The official notification PDF link will be available when live exam data is connected. You can read it on the official website.",
      cta: "View on Official Website",
    },
  };

  if (!type) return null;
  const c = content[type];
  const Icon = c.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="absolute inset-0 bg-card/98 backdrop-blur-sm z-10 flex flex-col"
    >
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-10 text-center">
        {/* icon */}
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-5">
          <Icon className="w-8 h-8 text-amber-500" />
        </div>

        {/* title */}
        <h3 className="text-lg font-extrabold text-foreground mb-2">{c.title}</h3>

        {/* body */}
        <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mb-6">{c.body}</p>

        {/* exam context */}
        <div className="w-full max-w-sm bg-muted/60 rounded-xl p-4 text-left mb-6 border border-border">
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Exam Details</div>
          <div className="font-semibold text-foreground text-sm">{exam.name}</div>
          <div className="text-xs text-muted-foreground mt-1">{exam.conductingBody}</div>
          <div className="flex flex-wrap gap-3 mt-3 text-xs">
            {exam.status !== "results" && (
              <span className="flex items-center gap-1 text-muted-foreground">
                <AlertCircle className="w-3 h-3 text-amber-500" />
                Deadline: <span className="font-semibold text-foreground ml-0.5">{exam.applicationDeadline}</span>
              </span>
            )}
            <span className="flex items-center gap-1 text-muted-foreground">
              <Info className="w-3 h-3 text-primary" />
              Notification: <span className="font-semibold text-foreground ml-0.5">{exam.notificationDate}</span>
            </span>
          </div>
        </div>

        {/* actions */}
        <div className="flex gap-3 w-full max-w-sm">
          <button
            onClick={onBack}
            className="flex-1 inline-flex items-center justify-center gap-1.5 border border-border text-foreground text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Go Back
          </button>
          <button
            onClick={onOpenSite}
            data-testid="placeholder-open-site"
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-primary text-primary-foreground text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" /> {c.cta}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   MODAL
══════════════════════════════════════════════════════════ */
export default function ExamDetailModal({ exam, onClose }: Props) {
  const [placeholder, setPlaceholder] = useState<PlaceholderType>(null);

  /* close on Escape */
  useEffect(() => {
    if (!exam) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (placeholder) setPlaceholder(null);
        else onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [exam, onClose, placeholder]);

  /* reset placeholder when modal closes or exam changes */
  useEffect(() => { setPlaceholder(null); }, [exam]);

  /* lock body scroll */
  useEffect(() => {
    document.body.style.overflow = exam ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [exam]);

  function handleApply() {
    if (!exam) return;
    const url = exam.applyUrl ?? APPLY_URLS[exam.id];
    if (url) openUrl(url);
    else setPlaceholder("apply");
  }

  function handleResults() {
    if (!exam) return;
    const url = exam.resultsUrl ?? RESULTS_URLS[exam.id] ?? `https://${exam.officialWebsite}`;
    openUrl(url);
  }

  function handleReminder() {
    setPlaceholder("reminder");
  }

  function handleNotification(e: React.MouseEvent) {
    if (!exam) return;
    const url = NOTIFICATION_URLS[exam.id];
    if (url) { openUrl(url); return; }
    e.preventDefault();
    setPlaceholder("notification");
  }

  function openOfficialSite() {
    if (!exam) return;
    openUrl(`https://${exam.officialWebsite}`);
  }

  return (
    <AnimatePresence>
      {exam && (
        <>
          {/* backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
            onClick={() => { if (placeholder) setPlaceholder(null); else onClose(); }}
            data-testid="modal-backdrop"
          />

          {/* panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            className="fixed inset-x-0 bottom-0 sm:inset-0 sm:flex sm:items-center sm:justify-center z-50 p-0 sm:p-4"
            data-testid="exam-detail-modal"
          >
            <div
              className="relative w-full sm:max-w-3xl max-h-[92dvh] sm:max-h-[90vh] bg-card rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── placeholder overlay ── */}
              <AnimatePresence>
                {placeholder && (
                  <PlaceholderPanel
                    type={placeholder}
                    exam={exam}
                    onBack={() => setPlaceholder(null)}
                    onOpenSite={() => { openOfficialSite(); setPlaceholder(null); }}
                  />
                )}
              </AnimatePresence>

              {/* ── sticky header ── */}
              <div className={`shrink-0 px-5 sm:px-6 pt-5 pb-4 border-b border-border ${
                exam.status === "open"     ? "bg-gradient-to-r from-green-600 to-emerald-700" :
                exam.status === "upcoming" ? "bg-gradient-to-r from-primary to-primary/80"    :
                                             "bg-gradient-to-r from-slate-600 to-slate-700"
              }`}>
                {/* drag handle – mobile */}
                <div className="w-10 h-1 rounded-full bg-white/40 mx-auto mb-4 sm:hidden" />

                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 mb-2">
                      <StatusPill status={exam.status} />
                      <LevelPill level={exam.level} />
                      {(() => {
                        const Icon = categoryIcon[exam.category];
                        return (
                          <span className="inline-flex items-center gap-1 bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                            <Icon className="w-3 h-3" /> {exam.category.charAt(0).toUpperCase() + exam.category.slice(1)}
                          </span>
                        );
                      })()}
                    </div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                      {exam.name}
                    </h2>
                    <p className="text-white/70 text-sm mt-0.5">{exam.shortName} · {exam.conductingBody}</p>
                  </div>
                  <button
                    onClick={onClose}
                    data-testid="modal-close"
                    aria-label="Close"
                    className="shrink-0 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors mt-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* ── scrollable body ── */}
              <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-7" data-testid="modal-body">

                {/* description */}
                <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-primary pl-3">
                  {exam.description}
                </p>

                {/* important dates */}
                <Section icon={CalendarClock} title="Important Dates">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: "Notification",  value: exam.notificationDate,    highlight: false },
                      { label: "Last Date",     value: exam.applicationDeadline, highlight: exam.status === "open" },
                      { label: "Exam Date",     value: exam.examDate,            highlight: false },
                      { label: "Result",        value: exam.resultDate,          highlight: false },
                    ].map((d) => (
                      <div key={d.label} className="bg-muted/50 rounded-xl p-3 text-center">
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">{d.label}</div>
                        <div className={`text-sm font-bold leading-snug ${d.highlight ? "text-orange-600" : "text-foreground"}`}>
                          {d.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>

                {/* eligibility */}
                <Section icon={GraduationCap} title="Eligibility & Age Limit">
                  <div className="space-y-2 mb-3">
                    {exam.eligibilityDetails.map((line, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground leading-snug">{line}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3.5 py-2.5 mt-2">
                    <UserCheck className="w-4 h-4 text-amber-600 shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Age Limit</span>
                      <p className="text-sm text-amber-900 font-medium leading-snug mt-0.5">{exam.ageLimit}</p>
                    </div>
                  </div>
                </Section>

                {/* exam pattern */}
                <Section icon={ListChecks} title="Exam Pattern">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-4">
                    {[
                      { label: "Mode",             value: exam.examPattern.mode },
                      { label: "Duration",         value: exam.examPattern.duration },
                      { label: "Total Marks",      value: String(exam.examPattern.totalMarks) },
                      { label: "Negative Marking", value: exam.examPattern.negativeMarking },
                      { label: "Medium",           value: exam.examPattern.medium },
                    ].map((item) => (
                      <div key={item.label} className="bg-muted/50 rounded-xl px-3 py-2.5">
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{item.label}</div>
                        <div className="text-sm font-semibold text-foreground mt-0.5 leading-snug">{item.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl border border-border overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/60">
                          <th className="text-left px-4 py-2.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Section</th>
                          <th className="text-center px-3 py-2.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Questions</th>
                          <th className="text-center px-3 py-2.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Marks</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {exam.examPattern.sections.map((sec, i) => (
                          <tr key={i} className="hover:bg-muted/30 transition-colors">
                            <td className="px-4 py-2.5 font-medium text-foreground">{sec.name}</td>
                            <td className="px-3 py-2.5 text-center text-muted-foreground">{sec.questions || "—"}</td>
                            <td className="px-3 py-2.5 text-center font-bold text-primary">{sec.marks}</td>
                          </tr>
                        ))}
                        <tr className="bg-primary/5">
                          <td className="px-4 py-2.5 font-bold text-foreground">Total</td>
                          <td className="px-3 py-2.5 text-center text-muted-foreground">
                            {exam.examPattern.sections.reduce((s, x) => s + x.questions, 0) || "—"}
                          </td>
                          <td className="px-3 py-2.5 text-center font-extrabold text-primary">{exam.examPattern.totalMarks}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Section>

                {/* syllabus */}
                <Section icon={BookOpen} title="Syllabus Overview">
                  <div className="space-y-3">
                    {exam.syllabus.map((section, i) => (
                      <div key={i} className="border border-border rounded-xl overflow-hidden">
                        <div className="bg-primary/8 px-4 py-2.5 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shrink-0">
                            {i + 1}
                          </span>
                          <span className="font-semibold text-sm text-foreground">{section.subject}</span>
                        </div>
                        <div className="px-4 py-3 flex flex-wrap gap-2">
                          {section.topics.map((topic) => (
                            <span key={topic} className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>

                {/* application process */}
                <Section icon={ClipboardList} title="Application Process">
                  <div className="space-y-3">
                    {exam.applicationProcess.map((step) => (
                      <div key={step.step} className="flex items-start gap-3.5">
                        <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                          {step.step}
                        </div>
                        <div className="flex-1 pb-3 border-b border-border last:border-0 last:pb-0">
                          <div className="font-semibold text-sm text-foreground mb-0.5">{step.title}</div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>

                {/* official notification */}
                <Section icon={FileText} title="Official Notification">
                  <div className="bg-muted/50 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-foreground">Official Notification PDF</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          Published: {exam.notificationDate} · {exam.conductingBody}
                        </div>
                        {exam.vacancies && (
                          <div className="flex items-center gap-1 mt-1 text-xs text-primary font-medium">
                            <Users className="w-3 h-3" /> {exam.vacancies.toLocaleString("en-IN")} vacancies notified
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={handleNotification}
                      data-testid="modal-download-notification"
                      className="inline-flex items-center gap-1.5 bg-card border border-border text-foreground text-sm font-semibold px-4 py-2 rounded-xl hover:bg-muted hover:border-primary/40 transition-all duration-150 shrink-0"
                    >
                      <ExternalLink className="w-4 h-4" /> View Notification
                    </button>
                  </div>

                  {exam.applicationFee && (
                    <div className="flex items-center gap-2.5 mt-3 bg-sky-50 border border-sky-200 rounded-xl px-4 py-3">
                      <IndianRupee className="w-4 h-4 text-sky-600 shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">Application Fee</span>
                        <p className="text-sm font-semibold text-sky-900 mt-0.5">{exam.applicationFee}</p>
                      </div>
                    </div>
                  )}
                </Section>

              </div>

              {/* ── sticky footer CTA ── */}
              <div className="shrink-0 px-5 sm:px-6 py-4 border-t border-border bg-card flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {exam.status !== "results" && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground sm:flex-1">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    {exam.status === "open"
                      ? `Application closes: ${exam.applicationDeadline}`
                      : `Notification released: ${exam.notificationDate}`}
                  </div>
                )}
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={openOfficialSite}
                    data-testid="modal-official-site"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 border border-border text-foreground text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-muted transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Official Site
                  </button>

                  {exam.status === "open" && (
                    <button
                      onClick={handleApply}
                      data-testid="modal-apply-button"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-primary text-primary-foreground text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-all duration-150 shadow-sm"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Apply Now
                    </button>
                  )}

                  {exam.status === "upcoming" && (
                    <button
                      onClick={handleReminder}
                      data-testid="modal-reminder-button"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 border-2 border-primary text-primary text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-150"
                    >
                      <Bell className="w-4 h-4" /> Set Reminder
                    </button>
                  )}

                  {exam.status === "results" && (
                    <button
                      onClick={handleResults}
                      data-testid="modal-results-button"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-sky-600 text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-sky-700 transition-all duration-150"
                    >
                      <ChevronRight className="w-4 h-4" /> View Results
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
