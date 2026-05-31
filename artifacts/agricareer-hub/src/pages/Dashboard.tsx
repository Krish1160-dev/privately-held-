import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  BookOpen, Briefcase, Bell, TrendingUp, ArrowRight,
  Calendar, MapPin, Clock, ChevronRight, Search,
  Shield, Users, Award, Leaf, CheckCircle2, Newspaper,
} from "lucide-react";
import { exams } from "@/data/exams";
import { jobs } from "@/data/jobs";
import { newsItems, notifications } from "@/data/news";

/* ── animation helpers ─────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut", delay },
});

const stagger = {
  animate: { transition: { staggerChildren: 0.09 } },
};

/* ── stat data ─────────────────────────────────────────────────── */
const stateExamCount  = exams.filter((e) => e.level === "state").length;
const nationalExamCount = exams.filter((e) => e.level === "national").length;

const heroStats = [
  {
    value: `${stateExamCount}`,
    label: "State Exams",
    sub: "Tamil Nadu & State PSCs",
    icon: Shield,
    color: "from-emerald-500 to-emerald-600",
    lightBg: "bg-emerald-50",
    textColor: "text-emerald-700",
  },
  {
    value: `${nationalExamCount}`,
    label: "National Exams",
    sub: "ICAR, UPSC, NABARD & more",
    icon: Award,
    color: "from-sky-500 to-sky-600",
    lightBg: "bg-sky-50",
    textColor: "text-sky-700",
  },
  {
    value: `${jobs.length * 30}+`,
    label: "Job Opportunities",
    sub: "Govt, private & NGO roles",
    icon: Briefcase,
    color: "from-violet-500 to-violet-600",
    lightBg: "bg-violet-50",
    textColor: "text-violet-700",
  },
  {
    value: `${notifications.length + newsItems.length}`,
    label: "Latest Notifications",
    sub: "Admit cards, results & circulars",
    icon: Bell,
    color: "from-amber-500 to-amber-600",
    lightBg: "bg-amber-50",
    textColor: "text-amber-700",
  },
];

const quickLinks = [
  { label: "Browse Exams",  href: "/exams",   icon: BookOpen,  desc: "State & national exams" },
  { label: "Find Jobs",     href: "/jobs",    icon: Briefcase, desc: "Govt, private & NGO roles" },
  { label: "Latest News",   href: "/news",    icon: Bell,      desc: "Schemes & notifications" },
  { label: "Career Paths",  href: "/careers", icon: TrendingUp,desc: "Plan your ag career" },
];

const trustBadges = [
  { icon: CheckCircle2, text: "18,000+ registered students" },
  { icon: CheckCircle2, text: "2,400+ placed this year" },
  { icon: CheckCircle2, text: "Updated daily" },
];

/* ── SVG agriculture pattern ───────────────────────────────────── */
function AgriPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 900 500"
    >
      {/* wheat stalks */}
      {[60, 180, 300, 420, 540, 660, 780].map((x) => (
        <g key={x} transform={`translate(${x}, 80)`}>
          <line x1="0" y1="0" x2="0" y2="220" stroke="white" strokeWidth="2.5" />
          {[-18,-10,0,10,18].map((dx, i) => (
            <ellipse key={i} cx={dx} cy={40 + i * 32} rx="9" ry="16"
              fill="white" transform={`rotate(${dx * 4}, ${dx}, ${40 + i * 32})`} />
          ))}
        </g>
      ))}
      {/* soil wave */}
      <path d="M0 420 Q225 390 450 420 T900 420 V500 H0Z" fill="white" opacity="0.6" />
      {/* sun */}
      <circle cx="820" cy="80" r="55" fill="white" opacity="0.5" />
      <circle cx="820" cy="80" r="35" fill="white" opacity="0.4" />
      {/* leaf */}
      <path d="M80 340 Q130 290 180 340 Q130 380 80 340Z" fill="white" opacity="0.7" />
      <path d="M760 320 Q810 270 860 320 Q810 360 760 320Z" fill="white" opacity="0.6" />
    </svg>
  );
}

/* ── main component ────────────────────────────────────────────── */
export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");

  const upcomingExams = exams.filter((e) => e.status === "open" || e.status === "upcoming").slice(0, 3);
  const recentJobs    = jobs.slice(0, 3);
  const recentNews    = newsItems.slice(0, 3);
  const recentNotifs  = notifications.filter((n) => n.isNew).slice(0, 2);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setLocation(`/jobs?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <div data-testid="dashboard-page">

      {/* ══════════════════════════════════════════════
          HERO — full-bleed green section
      ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-primary" data-testid="hero-section">
        <AgriPattern />

        {/* gradient overlay — darker at bottom so stats cards float above */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/0 via-primary/0 to-primary/60 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-32 sm:pt-20 sm:pb-36">

          {/* badge row */}
          <motion.div {...fadeUp(0)} className="flex flex-wrap items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full border border-white/25">
              <Leaf className="w-3.5 h-3.5" /> Tamil Nadu's #1 Agri Career Portal
            </span>
            <span className="inline-flex items-center gap-1.5 bg-amber-400/25 backdrop-blur-sm text-amber-100 text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-300/30">
              <Bell className="w-3 h-3" /> 2 new exam alerts today
            </span>
          </motion.div>

          {/* headline */}
          <motion.h1
            {...fadeUp(0.08)}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-foreground leading-tight max-w-3xl"
          >
            Your Gateway to<br className="hidden sm:block" />
            Agriculture Careers<br className="hidden sm:block" />
            <span className="text-amber-300">in Tamil Nadu and India</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            className="mt-4 text-primary-foreground/75 text-base sm:text-lg max-w-xl leading-relaxed"
          >
            Competitive exams, government jobs, research fellowships, and career paths —
            everything a B.Sc and M.Sc Agriculture graduate needs, in one trusted place.
          </motion.p>

          {/* trust badges */}
          <motion.div {...fadeUp(0.22)} className="flex flex-wrap gap-4 mt-4 mb-8">
            {trustBadges.map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-1.5 text-primary-foreground/80 text-sm">
                <Icon className="w-4 h-4 text-emerald-300" /> {text}
              </span>
            ))}
          </motion.div>

          {/* search bar */}
          <motion.form
            {...fadeUp(0.28)}
            onSubmit={handleSearch}
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
            <button
              type="submit"
              data-testid="hero-search-button"
              className="shrink-0 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors"
            >
              Search
            </button>
          </motion.form>

          {/* CTA buttons */}
          <motion.div {...fadeUp(0.34)} className="flex flex-wrap gap-3 mt-5">
            <Link
              href="/exams"
              data-testid="hero-cta-exams"
              className="inline-flex items-center gap-2 bg-white text-primary font-bold text-sm px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:bg-white/90 transition-all duration-200"
            >
              <BookOpen className="w-4 h-4" /> Explore Exams
            </Link>
            <Link
              href="/jobs"
              data-testid="hero-cta-jobs"
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-primary-foreground font-bold text-sm px-6 py-3 rounded-xl border border-white/30 hover:bg-white/25 transition-all duration-200"
            >
              <Briefcase className="w-4 h-4" /> Explore Jobs
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STAT CARDS — overlap the hero bottom
      ══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 mb-10">
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {heroStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={{ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.35 + i * 0.07 }}
              className="bg-card rounded-2xl border border-card-border shadow-lg p-5 flex flex-col gap-3 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              data-testid={`stat-card-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-sm`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-foreground leading-none">{stat.value}</div>
                <div className="text-sm font-semibold text-foreground mt-1">{stat.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5 leading-snug">{stat.sub}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════
          QUICK LINKS + BELOW-FOLD CONTENT
      ══════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-12">

        {/* Quick Access */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">Quick Access</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
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

        {/* Featured + Upcoming Exams */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured Opportunity */}
          <div className="bg-card rounded-2xl border border-card-border p-6 shadow-sm lg:col-span-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">Featured</span>
              <span className="text-xs text-orange-600 font-medium">Closes Jun 15</span>
            </div>
            <h3 className="font-bold text-foreground text-base leading-snug mb-2">
              TNPSC Agriculture Officer 2025
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              240 posts across Tamil Nadu. Ideal for fresh B.Sc Agriculture graduates. One of the most sought-after state government positions.
            </p>
            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="w-3.5 h-3.5 text-primary" /> Exam: 10 August 2025
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 text-primary" /> All Districts, Tamil Nadu
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Users className="w-3.5 h-3.5 text-primary" /> 240 Vacancies
              </div>
            </div>
            <Link
              href="/exams"
              data-testid="featured-opportunity-cta"
              className="mt-auto flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground text-sm font-semibold py-2.5 rounded-xl hover:bg-primary/90 transition-colors"
            >
              View Details <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Upcoming Exams */}
          <div className="bg-card rounded-2xl border border-card-border p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-foreground">Upcoming Exams</h2>
              <Link href="/exams" className="text-xs font-medium text-primary flex items-center gap-1 hover:underline" data-testid="see-all-exams">
                See all <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-3">
              {upcomingExams.map((exam) => (
                <div
                  key={exam.id}
                  className="flex items-start justify-between gap-4 p-3.5 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  data-testid={`dashboard-exam-${exam.id}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-foreground truncate">{exam.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{exam.conductingBody}</div>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Deadline: {exam.applicationDeadline}</span>
                    </div>
                  </div>
                  <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${
                    exam.status === "open"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}>
                    {exam.status === "open" ? "Open" : "Upcoming"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Jobs + News */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Jobs */}
          <div className="bg-card rounded-2xl border border-card-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-foreground">Recent Jobs</h2>
              <Link href="/jobs" className="text-xs font-medium text-primary flex items-center gap-1 hover:underline" data-testid="see-all-jobs">
                See all <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-3">
              {recentJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-3.5 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  data-testid={`dashboard-job-${job.id}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-foreground truncate">{job.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{job.company}</div>
                    </div>
                    <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${
                      job.type === "govt" ? "bg-sky-100 text-sky-700"
                      : job.type === "ngo" ? "bg-violet-100 text-violet-700"
                      : "bg-orange-100 text-orange-700"
                    }`}>
                      {job.type === "govt" ? "Govt" : job.type === "ngo" ? "NGO" : "Private"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />{job.location}
                    </span>
                    <span className="text-xs text-primary font-medium">{job.salaryRange}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* News & Notifications */}
          <div className="bg-card rounded-2xl border border-card-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-foreground">News & Notifications</h2>
              <Link href="/news" className="text-xs font-medium text-primary flex items-center gap-1 hover:underline" data-testid="see-all-news">
                See all <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            {recentNotifs.length > 0 && (
              <div className="space-y-2 mb-4">
                {recentNotifs.map((notif) => (
                  <div key={notif.id} className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-100" data-testid={`dashboard-notif-${notif.id}`}>
                    <Bell className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-amber-900 leading-snug">{notif.title}</div>
                      <div className="text-xs text-amber-700 mt-0.5">{notif.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="space-y-3">
              {recentNews.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  data-testid={`dashboard-news-${item.id}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-foreground leading-snug line-clamp-2">{item.title}</p>
                    {item.isNew && (
                      <span className="shrink-0 text-[10px] font-bold bg-primary text-primary-foreground px-1.5 py-0.5 rounded">NEW</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{item.source}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom trust strip */}
        <div className="rounded-2xl bg-primary/5 border border-primary/15 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <Newspaper className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">Stay updated every day</div>
              <div className="text-xs text-muted-foreground">Exam alerts, new jobs, and scheme news delivered to you</div>
            </div>
          </div>
          <a
            href="#"
            data-testid="hero-alert-cta"
            className="shrink-0 inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-colors"
          >
            <Bell className="w-4 h-4" /> Get Free Alerts
          </a>
        </div>

      </div>
    </div>
  );
}
