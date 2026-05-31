import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

interface WidgetCardProps {
  title: string;
  icon: React.ElementType;
  iconColor?: string;
  href?: string;
  linkLabel?: string;
  badge?: string | number;
  badgeColor?: string;
  children: React.ReactNode;
  testId?: string;
}

export function WidgetCard({
  title,
  icon: Icon,
  iconColor = "bg-primary/10 text-primary",
  href,
  linkLabel = "See all",
  badge,
  badgeColor = "bg-primary text-primary-foreground",
  children,
  testId,
}: WidgetCardProps) {
  return (
    <div
      className="bg-card rounded-2xl border border-card-border shadow-sm flex flex-col overflow-hidden"
      data-testid={testId}
    >
      {/* header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <span className={`flex items-center justify-center w-8 h-8 rounded-lg ${iconColor}`}>
            <Icon className="w-4 h-4" />
          </span>
          <span className="font-bold text-foreground text-sm">{title}</span>
          {badge !== undefined && (
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${badgeColor}`}>
              {badge}
            </span>
          )}
        </div>
        {href && (
          <Link
            href={href}
            className="flex items-center gap-0.5 text-xs font-medium text-primary hover:underline shrink-0"
            data-testid={`${testId}-see-all`}
          >
            {linkLabel} <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      {/* body */}
      <div className="flex-1 divide-y divide-border">
        {children}
      </div>
    </div>
  );
}

/* ── reusable row atoms ─────────────────────────────────── */

interface WidgetRowProps {
  title: string;
  subtitle?: string;
  meta?: string;
  right?: React.ReactNode;
  pill?: string;
  pillColor?: string;
  testId?: string;
}

export function WidgetRow({
  title,
  subtitle,
  meta,
  right,
  pill,
  pillColor = "bg-muted text-muted-foreground",
  testId,
}: WidgetRowProps) {
  return (
    <div
      className="flex items-start justify-between gap-3 px-5 py-3.5 hover:bg-muted/40 transition-colors"
      data-testid={testId}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground leading-snug truncate">{title}</p>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5 truncate">{subtitle}</p>}
        {meta && <p className="text-xs text-muted-foreground mt-1">{meta}</p>}
      </div>
      <div className="shrink-0 flex flex-col items-end gap-1">
        {pill && (
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${pillColor}`}>
            {pill}
          </span>
        )}
        {right}
      </div>
    </div>
  );
}

interface WidgetEmptyProps {
  message?: string;
}

export function WidgetEmpty({ message = "Nothing to show right now." }: WidgetEmptyProps) {
  return (
    <div className="px-5 py-8 text-center text-sm text-muted-foreground">{message}</div>
  );
}
