import { useState } from "react";
import { Search, MapPin, Briefcase, Clock, IndianRupee, Filter, Building2 } from "lucide-react";
import { jobs, type Job } from "@/data/jobs";

const typeOptions = ["All", "Govt", "Private", "NGO"] as const;
type JobType = (typeof typeOptions)[number];

function TypeBadge({ type }: { type: Job["type"] }) {
  if (type === "govt") return <span className="bg-sky-100 text-sky-700 text-xs font-semibold px-2.5 py-1 rounded-full">Govt</span>;
  if (type === "ngo") return <span className="bg-violet-100 text-violet-700 text-xs font-semibold px-2.5 py-1 rounded-full">NGO</span>;
  return <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-2.5 py-1 rounded-full">Private</span>;
}

function TagChip({ tag }: { tag: string }) {
  return (
    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{tag}</span>
  );
}

export default function Jobs() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<JobType>("All");

  const filtered = jobs.filter((job) => {
    const matchType = typeFilter === "All" || job.type === typeFilter.toLowerCase();
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      job.title.toLowerCase().includes(q) ||
      job.company.toLowerCase().includes(q) ||
      job.location.toLowerCase().includes(q) ||
      job.tags.some((t) => t.toLowerCase().includes(q));
    return matchType && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-testid="jobs-page">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Briefcase className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Opportunities</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground">Agriculture Jobs</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Government, private sector, and NGO roles for B.Sc and M.Sc Agriculture graduates across India.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6" data-testid="jobs-filter-bar">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search by role, company, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-testid="jobs-search-input"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 bg-card rounded-xl border border-card-border px-3 py-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {typeOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setTypeFilter(opt)}
              data-testid={`filter-job-type-${opt.toLowerCase()}`}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                typeFilter === opt
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="text-xs text-muted-foreground mb-4">
        Showing {filtered.length} of {jobs.length} listings
      </div>

      {/* Job Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-xl border border-card-border" data-testid="jobs-empty">
          <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
          <p className="text-muted-foreground font-medium">No jobs match your search.</p>
          <button
            onClick={() => { setSearch(""); setTypeFilter("All"); }}
            className="mt-3 text-sm text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((job) => (
            <div
              key={job.id}
              className="bg-card rounded-xl border border-card-border p-5 sm:p-6 hover:shadow-md hover:border-primary/30 transition-all duration-200"
              data-testid={`job-card-${job.id}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Company Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <h3 className="text-base font-bold text-foreground leading-snug">{job.title}</h3>
                    <TypeBadge type={job.type} />
                  </div>
                  <div className="text-sm font-medium text-primary mb-2">{job.company}</div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{job.description}</p>

                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-primary" />{job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <IndianRupee className="w-3.5 h-3.5 text-primary" />{job.salaryRange}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-primary" />{job.experience}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />Posted {job.postedDate}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {job.tags.map((tag) => <TagChip key={tag} tag={tag} />)}
                  </div>
                </div>

                {/* CTA */}
                <div className="shrink-0 flex sm:flex-col gap-2 sm:items-end">
                  <button
                    data-testid={`job-apply-${job.id}`}
                    className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
                  >
                    Apply Now
                  </button>
                  <button
                    data-testid={`job-save-${job.id}`}
                    className="px-5 py-2 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
