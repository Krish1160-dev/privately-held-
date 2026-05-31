import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  BookOpen, Briefcase, Bell, TrendingUp, ArrowRight,
  Search, Shield, Award, Leaf, CheckCircle2, Newspaper,
  Clock, MapPin, AlertTriangle, Calendar, Building2,
  IndianRupee, Tag,
} from "lucide-react";
import { exams } from "@/data/exams";
import { jobs } from "@/data/jobs";
import { newsItems, notifications } from "@/data/news";
import { WidgetCard, WidgetRow, WidgetEmpty } from "@/components/widgets/WidgetCard";

/* ── helpers ───────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.48, ease: "easeOut" as const, delay },
});

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  initial: { opacity: 0, y: 18 },
  animate:  { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

/* ── derived data ──────────────────────────────────────────────── */
const stateExamCount    = exams.filter((e) => e.level === "state").length;
const nationalExamCount = exams.filter((e) => e.level === "national").length;

const heroStats = [
  {
    value: String(stateExamCount),
    label: "State Exams",
    sub: "Tamil Nadu & State PSCs",
    icon: Shield,
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    value: String(nationalExamCount),
    label: "National Exams",
    sub: "ICAR, UPSC, NABARD & more",
    icon: Award,
    gradient: "from-sky-500 to-sky-600",
  },
  {
    value: `${jobs.length * 30}+`,
    label: "Job Opportunities",
    sub: "Govt, private & NGO roles",
    icon: Briefcase,
    gradient: "from-violet-500 to-violet-600",
  },
  {
    value: String(notifications.length + newsItems.length),
    label: "Latest Notifications",
    sub: "Admit cards, results & circulars",
    icon: Bell,
    gradient: "from-amber-500 to-amber-600",
  },
];

const quickLinks = [
  { label: "Browse Exams",  href: "/exams",   icon: BookOpen,   desc: "State & national exams" },
  { label: "Find Jobs",     href: "/jobs",    icon: Briefcase,  desc: "Govt, private & NGO roles" },
  { label: "Latest News",   href: "/news",    icon: Bell,       desc: "Schemes & notifications" },
  { label: "Career Paths",  href: "/careers", icon: TrendingUp, desc: "Plan your ag career" },
];

const trustBadges = [
  { icon: CheckCircle2, text: "18,000+ registered students" },
  { icon: CheckCircle2, text: "2,400+ placed this year"     },
  { icon: CheckCircle2, text: "Updated daily"               },
];

/* ── deadline urgency helpers ──────────────────────────────────── */
function deadlinePillColor(deadline: string) {
  if (deadline === "Closed") return "bg-slate-100 text-slate-500";
  if (deadline.includes("Jun")) return "bg-orange-100 text-orange-700";
  return "bg-amber-100 text-amber-700";
}

function typePillColor(type: "govt" | "private" | "ngo") {
  if (type === "govt")    return "bg-sky-100 text-sky-700";
  if (type === "ngo")     return "bg-violet-100 text-violet-700";
  return "bg-orange-100 text-orange-700";
}

/* ── agriculture SVG background ───────────────────────────────── */
function AgriPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 900 500"
    >
      {[60, 180, 300, 420, 540, 660, 780].map((x) => (
        <g key={x} transform={`translate(${x}, 80)`}>
          <line x1="0" y1="0" x2="0" y2="220" stroke="white" strokeWidth="2.5" />
          {[-18, -10, 0, 10, 18].map((dx, i) => (
            <ellipse key={i} cx={dx} cy={40 + i * 32} rx="9" ry="16"
              fill="white" transform={`rotate(${dx * 4}, ${dx}, ${40 + i * 32})`} />
          ))}
        </g>
      ))}
      <path d="M0 420 Q225 390 450 420 T900 420 V500 H0Z" fill="white" opacity="0.6" />
      <circle cx="820" cy="80" r="55" fill="white" opacity="0.5" />
      <circle cx="820" cy="80" r="35" fill="white" opacity="0.4" />
      <path d="M80 340 Q130 290 180 340 Q130 380 80 340Z" fill="white" opacity="0.7" />
      <path d="M760 320 Q810 270 860 320 Q810 360 760 320Z" fill="white" opacity="0.6" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   DASHBOARD
══════════════════════════════════════════════════════════════ */
export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");

  /* widget data */
  const tnExams       = exams.filter((e) => e.level === "state" && e.status !== "results");
  const nationalExams = exams.filter((e) => e.level === "national" && e.status !== "results");
  const deadlines     = exams
    .filter((e) => e.status === "open" || e.status === "upcoming")
    .slice(0, 5);
  const vacancies     = jobs.slice(0, 5);
  const agriNotifs    = notifications.slice(0, 5);
  const agriNews      = newsItems.slice(0, 5);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setLocation(`/jobs?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <div data-testid="dashboard-page">

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="relative overflow-hidden bg-primary" data-testid="hero-section">
        <AgriPattern />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/0 to-primary/60 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-32 sm:pt-20 sm:pb-36">

          <motion.div {...fadeUp(0)} className="flex flex-wrap items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full border border-white/25">
              <Leaf className="w-3.5 h-3.5" /> Tamil Nadu's #1 Agri Career Portal
            </span>
            <span className="inline-flex items-center gap-1.5 bg-amber-400/25 backdrop-blur-sm text-amber-100 text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-300/30">
              <Bell className="w-3 h-3" /> 2 new exam alerts today
            </span>
          </motion.div>

          <motion.h1 {...fadeUp(0.08)}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-foreground leading-tight max-w-3xl"
          >
            Your Gateway to<br className="hidden sm:block" />
            Agriculture Careers<br className="hidden sm:block" />
            <span className="text-amber-300">in Tamil Nadu and India</span>
          </motion.h1>

          <motion.p {...fadeUp(0.16)}
            className="mt-4 text-primary-foreground/75 text-base sm:text-lg max-w-xl leading-relaxed"
          >
            Competitive exams, government jobs, research fellowships, and career paths —
            everything a B.Sc and M.Sc Agriculture graduate needs, in one trusted place.
          </motion.p>

          <motion.div {...fadeUp(0.22)} className="flex flex-wrap gap-4 mt-4 mb-8">
            {trustBadges.map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-1.5 text-primary-foreground/80 text-sm">
                <Icon className="w-4 h-4 text-emerald-300" /> {text}
              </span>
            ))}
          </motion.div>

          <motion.form {...fadeUp(0.28)} onSubmit={handleSearch}
            className="flex items-center gap-2 bg-white rounded-2xl shadow-xl p-2 max-w-xl"
            data-testid="hero-search-form"
          >
            <Search className="w-5 h-5 text-muted-foreground shrink-0 ml-2" />
            <input
              type="search"
              placeholder="Search exams, jobs, or companies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              data-testid="hero-search-input"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none py-1.5 min-w-0"
            />
            <button type="submit" data-testid="hero-search-button"
              className="shrink-0 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors"
            >
              Search
            </button>
          </motion.form>

          <motion.div {...fadeUp(0.34)} className="flex flex-wrap gap-3 mt-5">
            <Link href="/exams" data-testid="hero-cta-exams"
              className="inline-flex items-center gap-2 bg-white text-primary font-bold text-sm px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:bg-white/90 transition-all duration-200"
            >
              <BookOpen className="w-4 h-4" /> Explore Exams
            </Link>
            <Link href="/jobs" data-testid="hero-cta-jobs"
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-primary-foreground font-bold text-sm px-6 py-3 rounded-xl border border-white/30 hover:bg-white/25 transition-all duration-200"
            >
              <Briefcase className="w-4 h-4" /> Explore Jobs
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ STAT CARDS ══════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 mb-10">
        <motion.div variants={staggerContainer} initial="initial" animate="animate"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {heroStats.map((s, i) => (
            <motion.div key={s.label} variants={staggerItem}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.35 + i * 0.07 }}
              className="bg-card rounded-2xl border border-card-border shadow-lg p-5 flex flex-col gap-3 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              data-testid={`stat-card-${s.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-sm`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-foreground leading-none">{s.value}</div>
                <div className="text-sm font-semibold text-foreground mt-1">{s.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5 leading-snug">{s.sub}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ══════════════════ QUICK ACCESS ══════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h2 className="text-lg font-bold text-foreground mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href}
              data-testid={`quick-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="flex flex-col items-center text-center gap-2 bg-card rounded-xl border border-card-border p-4 hover:border-primary/40 hover:bg-primary/5 hover:-translate-y-0.5 transition-all duration-150 group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                <link.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">{link.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{link.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ══════════════════ 6 WIDGETS ══════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-foreground">Your Dashboard</h2>
          <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">Live updates</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {/* ── Widget 1: TN Exams ── */}
          <WidgetCard
            title="Tamil Nadu Exams"
            icon={Shield}
            iconColor="bg-emerald-100 text-emerald-700"
            href="/exams"
            badge={tnExams.length}
            badgeColor="bg-emerald-600 text-white"
            testId="widget-tn-exams"
          >
            {tnExams.length === 0 ? (
              <WidgetEmpty message="No state exams at the moment." />
            ) : (
              tnExams.map((exam) => (
                <WidgetRow
                  key={exam.id}
                  title={exam.name}
                  subtitle={exam.conductingBody}
                  meta={`Deadline: ${exam.applicationDeadline}`}
                  pill={exam.status === "open" ? "Open" : "Upcoming"}
                  pillColor={exam.status === "open" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}
                  testId={`widget-tn-exam-${exam.id}`}
                />
              ))
            )}
          </WidgetCard>

          {/* ── Widget 2: National Exams ── */}
          <WidgetCard
            title="National Exams"
            icon={Award}
            iconColor="bg-sky-100 text-sky-700"
            href="/exams"
            badge={nationalExams.length}
            badgeColor="bg-sky-600 text-white"
            testId="widget-national-exams"
          >
            {nationalExams.length === 0 ? (
              <WidgetEmpty message="No national exams right now." />
            ) : (
              nationalExams.map((exam) => (
                <WidgetRow
                  key={exam.id}
                  title={exam.name}
                  subtitle={exam.conductingBody}
                  meta={`Exam: ${exam.examDate}`}
                  pill={exam.status === "open" ? "Open" : "Upcoming"}
                  pillColor={exam.status === "open" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}
                  testId={`widget-national-exam-${exam.id}`}
                />
              ))
            )}
          </WidgetCard>

          {/* ── Widget 3: Important Deadlines ── */}
          <WidgetCard
            title="Important Deadlines"
            icon={AlertTriangle}
            iconColor="bg-orange-100 text-orange-700"
            href="/exams"
            badge="URGENT"
            badgeColor="bg-orange-500 text-white"
            testId="widget-deadlines"
          >
            {deadlines.length === 0 ? (
              <WidgetEmpty message="No urgent deadlines." />
            ) : (
              deadlines.map((exam) => (
                <WidgetRow
                  key={exam.id}
                  title={exam.name}
                  subtitle={exam.level === "state" ? "State Level" : "National Level"}
                  pill={exam.applicationDeadline}
                  pillColor={deadlinePillColor(exam.applicationDeadline)}
                  right={
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Calendar className="w-3 h-3" /> {exam.examDate}
                    </span>
                  }
                  testId={`widget-deadline-${exam.id}`}
                />
              ))
            )}
          </WidgetCard>

          {/* ── Widget 4: Latest Vacancies ── */}
          <WidgetCard
            title="Latest Vacancies"
            icon={Briefcase}
            iconColor="bg-violet-100 text-violet-700"
            href="/jobs"
            badge={`${jobs.length * 30}+`}
            badgeColor="bg-violet-600 text-white"
            testId="widget-vacancies"
          >
            {vacancies.length === 0 ? (
              <WidgetEmpty message="No new vacancies right now." />
            ) : (
              vacancies.map((job) => (
                <WidgetRow
                  key={job.id}
                  title={job.title}
                  subtitle={job.company}
                  right={
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${typePillColor(job.type)}`}>
                        {job.type === "govt" ? "Govt" : job.type === "ngo" ? "NGO" : "Private"}
                      </span>
                      <span className="flex items-center gap-0.5 text-[11px] text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {job.location.split(",")[0]}
                      </span>
                    </div>
                  }
                  testId={`widget-vacancy-${job.id}`}
                />
              ))
            )}
          </WidgetCard>

          {/* ── Widget 5: Agriculture Notifications ── */}
          <WidgetCard
            title="Agriculture Notifications"
            icon={Bell}
            iconColor="bg-amber-100 text-amber-700"
            href="/news"
            badge={agriNotifs.filter((n) => n.isNew).length + " New"}
            badgeColor="bg-amber-500 text-white"
            testId="widget-notifications"
          >
            {agriNotifs.length === 0 ? (
              <WidgetEmpty message="No notifications right now." />
            ) : (
              agriNotifs.map((notif) => (
                <WidgetRow
                  key={notif.id}
                  title={notif.title}
                  subtitle={notif.date}
                  pill={
                    notif.type === "admit-card" ? "Admit Card"
                    : notif.type === "result"   ? "Result"
                    : notif.type === "date-change" ? "Date Change"
                    : "Circular"
                  }
                  pillColor={
                    notif.type === "admit-card"   ? "bg-amber-100 text-amber-700"
                    : notif.type === "result"     ? "bg-green-100 text-green-700"
                    : notif.type === "date-change"? "bg-orange-100 text-orange-700"
                    : "bg-sky-100 text-sky-700"
                  }
                  right={
                    notif.isNew ? (
                      <span className="text-[10px] font-bold bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
                        NEW
                      </span>
                    ) : undefined
                  }
                  testId={`widget-notif-${notif.id}`}
                />
              ))
            )}
          </WidgetCard>

          {/* ── Widget 6: Agriculture News ── */}
          <WidgetCard
            title="Agriculture News"
            icon={Newspaper}
            iconColor="bg-teal-100 text-teal-700"
            href="/news"
            testId="widget-news"
          >
            {agriNews.length === 0 ? (
              <WidgetEmpty message="No news right now." />
            ) : (
              agriNews.map((item) => (
                <WidgetRow
                  key={item.id}
                  title={item.title}
                  subtitle={item.source}
                  meta={item.date}
                  pill={
                    item.category === "policy"     ? "Policy"
                    : item.category === "scheme"   ? "Scheme"
                    : item.category === "technology" ? "Technology"
                    : "Market"
                  }
                  pillColor={
                    item.category === "policy"     ? "bg-violet-100 text-violet-700"
                    : item.category === "scheme"   ? "bg-green-100 text-green-700"
                    : item.category === "technology" ? "bg-sky-100 text-sky-700"
                    : "bg-amber-100 text-amber-700"
                  }
                  right={
                    item.isNew ? (
                      <span className="text-[10px] font-bold bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
                        NEW
                      </span>
                    ) : undefined
                  }
                  testId={`widget-news-${item.id}`}
                />
              ))
            )}
          </WidgetCard>

        </div>

        {/* ── bottom trust strip ── */}
        <div className="mt-8 rounded-2xl bg-primary/5 border border-primary/15 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">Stay updated every day</div>
              <div className="text-xs text-muted-foreground">Exam alerts, new jobs, and scheme news delivered to you</div>
            </div>
          </div>
          <a href="#" data-testid="hero-alert-cta"
            className="shrink-0 inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-colors"
          >
            <Bell className="w-4 h-4" /> Get Free Alerts
          </a>
        </div>
      </div>
    </div>
  );
}
