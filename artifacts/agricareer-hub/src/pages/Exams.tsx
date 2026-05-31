import { useState } from "react";
import { Calendar, Building2, Users, Clock, BookOpen, Filter } from "lucide-react";
import { exams, type Exam } from "@/data/exams";

const levelOptions = ["All", "State", "National"] as const;
const statusOptions = ["All", "Open", "Upcoming", "Results"] as const;

type Level = (typeof levelOptions)[number];
type Status = (typeof statusOptions)[number];

function StatusBadge({ status }: { status: Exam["status"] }) {
  if (status === "open") return <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">Open</span>;
  if (status === "upcoming") return <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full">Upcoming</span>;
  return <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-full">Results Out</span>;
}

function LevelBadge({ level }: { level: Exam["level"] }) {
  if (level === "state") return <span className="bg-sky-50 text-sky-700 text-xs font-medium px-2 py-0.5 rounded-full border border-sky-200">State</span>;
  return <span className="bg-violet-50 text-violet-700 text-xs font-medium px-2 py-0.5 rounded-full border border-violet-200">National</span>;
}

export default function Exams() {
  const [levelFilter, setLevelFilter] = useState<Level>("All");
  const [statusFilter, setStatusFilter] = useState<Status>("All");

  const filtered = exams.filter((exam) => {
    const matchLevel = levelFilter === "All" || exam.level === levelFilter.toLowerCase();
    const matchStatus = statusFilter === "All" || exam.status === statusFilter.toLowerCase().replace(" ", "-");
    return matchLevel && matchStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-testid="exams-page">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Examinations</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground">Agriculture Competitive Exams</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          State and national-level examinations for B.Sc Agriculture, M.Sc Agronomy graduates, and research aspirants.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6 p-4 bg-card rounded-xl border border-card-border" data-testid="exams-filter-bar">
        <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
          <Filter className="w-4 h-4" /> Filter by:
        </div>
        <div className="flex flex-wrap gap-2">
          {levelOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setLevelFilter(opt)}
              data-testid={`filter-level-${opt.toLowerCase()}`}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                levelFilter === opt
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        <div className="w-px h-5 bg-border mx-1 hidden sm:block" />
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setStatusFilter(opt)}
              data-testid={`filter-status-${opt.toLowerCase()}`}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                statusFilter === opt
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        <div className="ml-auto text-xs text-muted-foreground">
          {filtered.length} exam{filtered.length !== 1 ? "s" : ""} found
        </div>
      </div>

      {/* Exam Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-xl border border-card-border" data-testid="exams-empty">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
          <p className="text-muted-foreground font-medium">No exams match your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((exam) => (
            <div
              key={exam.id}
              className="bg-card rounded-xl border border-card-border p-6 hover:shadow-md hover:border-primary/30 transition-all duration-200 flex flex-col"
              data-testid={`exam-card-${exam.id}`}
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground text-base leading-snug">{exam.name}</h3>
                </div>
                <StatusBadge status={exam.status} />
              </div>

              <div className="flex items-center gap-2 mb-3">
                <LevelBadge level={exam.level} />
                {exam.vacancies && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> {exam.vacancies} vacancies
                  </span>
                )}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{exam.description}</p>

              {/* Details */}
              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-muted-foreground">{exam.conductingBody}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-muted-foreground">
                    Deadline: <span className={`font-medium ${exam.status === "open" ? "text-orange-600" : "text-foreground"}`}>
                      {exam.applicationDeadline}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-muted-foreground">
                    Exam Date: <span className="font-medium text-foreground">{exam.examDate}</span>
                  </span>
                </div>
              </div>

              {/* Eligibility */}
              <div className="bg-muted/60 rounded-lg p-3 mb-5">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Eligibility</span>
                <p className="text-sm text-foreground mt-1">{exam.eligibility}</p>
              </div>

              {/* CTA */}
              <div className="mt-auto">
                <button
                  data-testid={`exam-view-details-${exam.id}`}
                  className="w-full py-2.5 rounded-lg border-2 border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-150"
                >
                  View Details & Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
