import { Bell, Newspaper, ExternalLink, Tag, AlertCircle } from "lucide-react";
import { newsItems, notifications, type NewsItem, type Notification } from "@/data/news";

const categoryColors: Record<NewsItem["category"], string> = {
  policy: "bg-violet-100 text-violet-700",
  scheme: "bg-green-100 text-green-700",
  technology: "bg-sky-100 text-sky-700",
  market: "bg-amber-100 text-amber-700",
};

const categoryLabels: Record<NewsItem["category"], string> = {
  policy: "Policy",
  scheme: "Scheme",
  technology: "Technology",
  market: "Market",
};

const notifTypeLabels: Record<Notification["type"], string> = {
  result: "Result",
  "admit-card": "Admit Card",
  circular: "Circular",
  "date-change": "Date Change",
};

const notifTypeColors: Record<Notification["type"], string> = {
  result: "bg-green-100 text-green-700",
  "admit-card": "bg-amber-100 text-amber-700",
  circular: "bg-sky-100 text-sky-700",
  "date-change": "bg-orange-100 text-orange-700",
};

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <div
      className="bg-card rounded-xl border border-card-border p-5 hover:shadow-md hover:border-primary/30 transition-all duration-200"
      data-testid={`news-card-${item.id}`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[item.category]}`}>
            {categoryLabels[item.category]}
          </span>
          {item.isNew && (
            <span className="bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded">NEW</span>
          )}
          {item.isImportant && (
            <span className="bg-red-100 text-red-700 text-[10px] font-bold px-1.5 py-0.5 rounded">IMPORTANT</span>
          )}
        </div>
        <span className="text-xs text-muted-foreground shrink-0">{item.date}</span>
      </div>
      <h3 className="font-semibold text-foreground text-sm leading-snug mb-2">{item.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{item.summary}</p>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Tag className="w-3.5 h-3.5" />{item.source}
        </div>
        <a href="#" className="flex items-center gap-1 text-xs font-medium text-primary hover:underline" data-testid={`news-read-more-${item.id}`}>
          Read more <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

function NotifCard({ item }: { item: Notification }) {
  return (
    <div
      className={`bg-card rounded-xl border p-5 hover:shadow-md transition-all duration-200 ${
        item.isImportant ? "border-amber-300 bg-amber-50/40" : "border-card-border"
      }`}
      data-testid={`notification-card-${item.id}`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
          item.isImportant ? "bg-amber-100" : "bg-primary/10"
        }`}>
          {item.isImportant
            ? <AlertCircle className="w-4 h-4 text-amber-600" />
            : <Bell className="w-4 h-4 text-primary" />
          }
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 mb-1">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${notifTypeColors[item.type]}`}>
              {notifTypeLabels[item.type]}
            </span>
            {item.isNew && (
              <span className="bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded">NEW</span>
            )}
            <span className="text-xs text-muted-foreground ml-auto">{item.date}</span>
          </div>
          <h3 className="font-semibold text-foreground text-sm leading-snug mb-1">{item.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
          {item.link && (
            <a
              href={item.link}
              className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-primary hover:underline"
              data-testid={`notification-link-${item.id}`}
            >
              View Official Notice <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function News() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-testid="news-page">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Newspaper className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Updates</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground">News & Notifications</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Latest agriculture policies, government schemes, technology updates, and official exam notifications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* News section — wider */}
        <div className="lg:col-span-3">
          <div className="flex items-center gap-2 mb-4">
            <Newspaper className="w-4 h-4 text-foreground" />
            <h2 className="text-base font-bold text-foreground">Latest News</h2>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full ml-auto">
              {newsItems.length} articles
            </span>
          </div>
          <div className="space-y-4">
            {newsItems.map((item) => <NewsCard key={item.id} item={item} />)}
          </div>
        </div>

        {/* Notifications section — narrower */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-4 h-4 text-foreground" />
            <h2 className="text-base font-bold text-foreground">Official Notifications</h2>
            <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-bold ml-auto">
              {notifications.filter((n) => n.isNew).length} New
            </span>
          </div>
          <div className="space-y-4">
            {notifications.map((item) => <NotifCard key={item.id} item={item} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
