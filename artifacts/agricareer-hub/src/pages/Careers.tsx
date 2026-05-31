import {
  Building2, FlaskConical, TrendingUp, Landmark, Sprout, Globe,
  Star, ChevronRight, Target, GraduationCap, IndianRupee
} from "lucide-react";
import { careerPaths, type CareerPath } from "@/data/careers";

const iconMap: Record<string, React.ElementType> = {
  Building2, FlaskConical, TrendingUp, Landmark, Sprout, Globe,
};

const sectorColors: Record<CareerPath["sector"], string> = {
  government: "bg-sky-50 border-sky-200 text-sky-700",
  research: "bg-violet-50 border-violet-200 text-violet-700",
  private: "bg-orange-50 border-orange-200 text-orange-700",
  entrepreneurship: "bg-green-50 border-green-200 text-green-700",
  international: "bg-pink-50 border-pink-200 text-pink-700",
};

const sectorIconBg: Record<CareerPath["sector"], string> = {
  government: "bg-sky-100 text-sky-700",
  research: "bg-violet-100 text-violet-700",
  private: "bg-orange-100 text-orange-700",
  entrepreneurship: "bg-green-100 text-green-700",
  international: "bg-pink-100 text-pink-700",
};

function GrowthStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" data-testid="growth-stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}`}
        />
      ))}
      <span className="text-xs text-muted-foreground ml-1">Growth potential</span>
    </div>
  );
}

function CareerCard({ path }: { path: CareerPath }) {
  const Icon = iconMap[path.icon] ?? Building2;
  return (
    <div
      className="bg-card rounded-2xl border border-card-border p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-200 flex flex-col"
      data-testid={`career-card-${path.id}`}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${sectorIconBg[path.sector]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-foreground text-base leading-snug">{path.title}</h3>
          <span className={`inline-block mt-1 text-xs font-medium px-2.5 py-0.5 rounded-full border ${sectorColors[path.sector]} capitalize`}>
            {path.sector.replace("-", " ")}
          </span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{path.description}</p>

      {/* Roles */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 mb-2">
          <Target className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Typical Roles</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {path.roles.slice(0, 4).map((role) => (
            <span
              key={role}
              className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full"
            >
              {role}
            </span>
          ))}
          {path.roles.length > 4 && (
            <span className="text-xs bg-muted text-primary px-2.5 py-1 rounded-full font-medium">
              +{path.roles.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Qualifications */}
      <div className="mb-5">
        <div className="flex items-center gap-1.5 mb-2">
          <GraduationCap className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Qualifications</span>
        </div>
        <ul className="space-y-1">
          {path.qualifications.map((q) => (
            <li key={q} className="flex items-start gap-2 text-xs text-muted-foreground">
              <ChevronRight className="w-3 h-3 text-primary mt-0.5 shrink-0" />{q}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-border space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <IndianRupee className="w-4 h-4 text-primary shrink-0" />
          <span className="font-semibold text-foreground">{path.salaryRange}</span>
        </div>
        <GrowthStars rating={path.growthRating} />
        <button
          data-testid={`career-explore-${path.id}`}
          className="w-full mt-2 py-2.5 rounded-lg bg-primary/10 text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-150"
        >
          Explore This Path
        </button>
      </div>
    </div>
  );
}

export default function Careers() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-testid="careers-page">
      {/* Hero section */}
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
            <span className="text-primary-foreground/80 text-sm font-medium uppercase tracking-wider">Career Guide</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-foreground leading-tight mb-3">
            Where Will Your Agriculture<br />Degree Take You?
          </h1>
          <p className="text-primary-foreground/75 text-base max-w-xl leading-relaxed">
            From government service to agri-tech startups, research fellowships to international consultancy — an agriculture degree opens more doors than most people realise. Explore your options.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            {[
              { num: "6", label: "Career Sectors" },
              { num: "30+", label: "Distinct Roles" },
              { num: "₹35k–₹2L", label: "Monthly Salary Range" },
            ].map((item) => (
              <div key={item.label} className="bg-white/15 backdrop-blur-sm rounded-xl px-5 py-3">
                <div className="text-primary-foreground font-bold text-xl leading-none">{item.num}</div>
                <div className="text-primary-foreground/70 text-xs mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Career Cards */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground mb-1">Explore Career Sectors</h2>
        <p className="text-sm text-muted-foreground">
          Each sector below represents a distinct career path available to Agriculture graduates in India.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {careerPaths.map((path) => (
          <CareerCard key={path.id} path={path} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-10 bg-card rounded-2xl border border-card-border p-8 text-center">
        <h3 className="text-xl font-bold text-foreground mb-2">Not sure which path is right for you?</h3>
        <p className="text-muted-foreground text-sm max-w-md mx-auto mb-5">
          Explore our exam listings and job board to get a feel for what's available right now in each sector.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="/exams"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors"
            data-testid="careers-cta-exams"
          >
            Browse Exams <ChevronRight className="w-4 h-4" />
          </a>
          <a
            href="/jobs"
            className="inline-flex items-center gap-2 border border-border text-foreground px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-muted transition-colors"
            data-testid="careers-cta-jobs"
          >
            Browse Jobs <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
