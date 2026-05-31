import { Link } from "wouter";
import { BookOpen, Briefcase, Bell, TrendingUp, ArrowRight, Calendar, MapPin, Clock, ChevronRight, Award, Users, Leaf } from "lucide-react";
import { exams } from "@/data/exams";
import { jobs } from "@/data/jobs";
import { newsItems, notifications } from "@/data/news";

const stats = [
  { label: "Open Job Listings", value: "284", change: "+12 this week", icon: Briefcase, color: "bg-emerald-50 text-emerald-700" },
  { label: "Upcoming Exams", value: "16", change: "3 deadlines soon", icon: BookOpen, color: "bg-amber-50 text-amber-700" },
  { label: "New Notifications", value: "8", change: "Since yesterday", icon: Bell, color: "bg-sky-50 text-sky-700" },
  { label: "Career Paths", value: "6", change: "Explore all sectors", icon: TrendingUp, color: "bg-violet-50 text-violet-700" },
];

const quickLinks = [
  { label: "Browse Exams", href: "/exams", icon: BookOpen, desc: "State & national ag exams" },
  { label: "Find Jobs", href: "/jobs", icon: Briefcase, desc: "Govt, private & NGO roles" },
  { label: "Latest News", href: "/news", icon: Bell, desc: "Schemes & notifications" },
  { label: "Career Paths", href: "/careers", icon: TrendingUp, desc: "Plan your future in ag" },
];

export default function Dashboard() {
  const upcomingExams = exams.filter((e) => e.status === "open" || e.status === "upcoming").slice(0, 3);
  const recentJobs = jobs.slice(0, 3);
  const recentNews = newsItems.slice(0, 3);
  const recentNotifs = notifications.filter((n) => n.isNew).slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" data-testid="dashboard-page">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-primary px-8 py-10 shadow-lg">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 100 Q200 20 400 100 T800 100 V200 H0Z" fill="white" />
            <circle cx="650" cy="50" r="80" fill="white" opacity="0.5" />
            <circle cx="750" cy="120" r="40" fill="white" opacity="0.4" />
          </svg>
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="w-4 h-4 text-primary-foreground/80" />
              <span className="text-primary-foreground/80 text-sm font-medium">AgriCareer Hub</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-foreground leading-tight">
              Your Agriculture Career<br />Starts Here
            </h1>
            <p className="mt-2 text-primary-foreground/75 text-base max-w-lg">
              Exams, jobs, schemes, and career guidance — everything an agriculture graduate needs in one trusted place.
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-3 shrink-0">
            <div className="flex items-center gap-2 bg-white/15 rounded-xl px-4 py-3 backdrop-blur-sm">
              <Award className="w-5 h-5 text-amber-300" />
              <div>
                <div className="text-primary-foreground font-bold text-lg leading-none">2,400+</div>
                <div className="text-primary-foreground/70 text-xs">Students placed this year</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/15 rounded-xl px-4 py-3 backdrop-blur-sm">
              <Users className="w-5 h-5 text-sky-300" />
              <div>
                <div className="text-primary-foreground font-bold text-lg leading-none">18,000+</div>
                <div className="text-primary-foreground/70 text-xs">Registered users across TN</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card rounded-xl border border-card-border p-5 hover:shadow-md transition-shadow duration-200"
            data-testid={`stat-card-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${stat.color} mb-3`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-sm font-medium text-foreground mt-0.5">{stat.label}</div>
            <div className="text-xs text-muted-foreground mt-1">{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-testid={`quick-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="flex flex-col items-center text-center gap-2 bg-card rounded-xl border border-card-border p-4 hover:border-primary/40 hover:bg-primary/5 transition-all duration-150 group"
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Featured Opportunity */}
        <div className="bg-card rounded-xl border border-card-border p-6 shadow-sm lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full">Featured</span>
            <span className="text-xs text-muted-foreground">Closes Jun 15</span>
          </div>
          <h3 className="font-bold text-foreground text-base">TNPSC Agriculture Officer 2025</h3>
          <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
            240 posts across Tamil Nadu. Ideal for fresh B.Sc Agriculture graduates. One of the most sought-after state government positions.
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              Exam: 10 August 2025
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              All Districts, Tamil Nadu
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Briefcase className="w-3.5 h-3.5 text-primary" />
              240 Vacancies
            </div>
          </div>
          <Link
            href="/exams"
            data-testid="featured-opportunity-cta"
            className="mt-5 flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground text-sm font-semibold py-2.5 rounded-lg hover:bg-primary/90 transition-colors"
          >
            View Details <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Upcoming Exams */}
        <div className="bg-card rounded-xl border border-card-border p-6 shadow-sm lg:col-span-2">
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
                className="flex items-start justify-between gap-4 p-3.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
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

      {/* Recent Jobs + Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Jobs */}
        <div className="bg-card rounded-xl border border-card-border p-6 shadow-sm">
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
                className="p-3.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                data-testid={`dashboard-job-${job.id}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-foreground truncate">{job.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{job.company}</div>
                  </div>
                  <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${
                    job.type === "govt"
                      ? "bg-sky-100 text-sky-700"
                      : job.type === "ngo"
                      ? "bg-violet-100 text-violet-700"
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
        <div className="bg-card rounded-xl border border-card-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-foreground">News & Notifications</h2>
            <Link href="/news" className="text-xs font-medium text-primary flex items-center gap-1 hover:underline" data-testid="see-all-news">
              See all <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {recentNotifs.length > 0 && (
            <div className="space-y-2 mb-4">
              {recentNotifs.map((notif) => (
                <div key={notif.id} className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50 border border-amber-100" data-testid={`dashboard-notif-${notif.id}`}>
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
                className="p-3.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
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
    </div>
  );
}
