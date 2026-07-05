import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, BookOpen, Briefcase, Newspaper,
  TrendingUp, Sprout, Menu, X, Bell, ChevronRight,
} from "lucide-react";
import { initialAlerts } from "@/data/alerts";

const navLinks = [
  { label: "Dashboard",    href: "/",        icon: LayoutDashboard },
  { label: "Exams",        href: "/exams",    icon: BookOpen        },
  { label: "Jobs",         href: "/jobs",     icon: Briefcase       },
  { label: "News",         href: "/news",     icon: Newspaper       },
  { label: "Career Paths", href: "/careers",  icon: TrendingUp      },
];

const unreadCount = initialAlerts.filter((a) => !a.isRead).length;

function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

export default function Navbar() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function isActive(href: string) {
    return href === "/" ? location === "/" : location.startsWith(href);
  }

  const alertsActive = location.startsWith("/alerts");

  return (
    <nav
      ref={navRef}
      data-testid="navbar"
      className={`sticky top-0 z-50 bg-card transition-shadow duration-300 ${
        scrolled ? "shadow-md border-b border-border/80" : "border-b border-border"
      }`}
    >
      {/* Top accent stripe */}
      <div className="h-0.5 bg-gradient-to-r from-primary via-primary/70 to-amber-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link href="/" data-testid="nav-logo" className="flex items-center gap-3 group shrink-0 py-4">
            <div className="relative w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-200">
              <Sprout className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-foreground text-[15px] tracking-tight leading-none">AgriCareer</span>
              <span className="text-[9px] font-bold text-primary uppercase tracking-[0.2em] mt-0.5">Hub · Tamil Nadu</span>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(({ label, href, icon: Icon }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  data-testid={`nav-link-${label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`relative group flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                    active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className={`absolute inset-0 rounded-lg transition-colors duration-150 ${active ? "bg-primary/10" : "group-hover:bg-muted"}`} />
                  <Icon className={`relative z-10 w-4 h-4 transition-transform duration-150 group-hover:scale-110 ${active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
                  <span className="relative z-10">{label}</span>
                  {active && (
                    <motion.span
                      layoutId="nav-active-indicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-2">
            {/* Notification bell → /alerts */}
            <Link
              href="/alerts"
              data-testid="nav-notifications"
              aria-label="Alert Center"
              className={`hidden sm:flex relative items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                alertsActive ? "bg-amber-100 text-amber-700" : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Bell className="w-[18px] h-[18px]" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full px-1 ring-2 ring-card">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Link>

            {/* CTA → /alerts — desktop */}
            <Link
              href="/alerts"
              data-testid="nav-cta"
              className="hidden lg:inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md"
            >
              Get Alerts <ChevronRight className="w-3.5 h-3.5" />
            </Link>

            {/* Hamburger */}
            <button
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              data-testid="nav-mobile-toggle"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 top-[calc(4rem+2px)] bg-foreground/20 backdrop-blur-sm z-40"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="lg:hidden absolute top-full left-0 right-0 z-50 bg-card border-b border-border shadow-xl"
              data-testid="nav-mobile-menu"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-3 pb-5 space-y-1">
                {navLinks.map(({ label, href, icon: Icon }, i) => {
                  const active = isActive(href);
                  return (
                    <motion.div
                      key={href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                    >
                      <Link
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        data-testid={`nav-mobile-link-${label.toLowerCase().replace(/\s+/g, "-")}`}
                        className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                          active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        <span className={`flex items-center justify-center w-8 h-8 rounded-lg ${active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                          <Icon className="w-4 h-4" />
                        </span>
                        <div className="flex-1">
                          <div className={active ? "font-semibold" : ""}>{label}</div>
                        </div>
                        {active && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Alerts link */}
                <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: navLinks.length * 0.04, duration: 0.2 }}>
                  <Link
                    href="/alerts"
                    onClick={() => setMenuOpen(false)}
                    data-testid="nav-mobile-link-alerts"
                    className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      alertsActive ? "bg-amber-100 text-amber-700" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <span className={`flex items-center justify-center w-8 h-8 rounded-lg relative ${alertsActive ? "bg-amber-500 text-white" : "bg-muted text-muted-foreground"}`}>
                      <Bell className="w-4 h-4" />
                      {unreadCount > 0 && !alertsActive && (
                        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                          {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                      )}
                    </span>
                    <div className="flex-1 flex items-center gap-2">
                      <span className={alertsActive ? "font-semibold" : ""}>Alert Center</span>
                      {unreadCount > 0 && (
                        <span className="text-[10px] font-bold bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">{unreadCount} new</span>
                      )}
                    </div>
                  </Link>
                </motion.div>

                {/* Mobile CTA */}
                <div className="pt-2 mt-2 border-t border-border">
                  <Link
                    href="/alerts"
                    onClick={() => setMenuOpen(false)}
                    data-testid="nav-mobile-cta"
                    className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground text-sm font-semibold py-3 rounded-xl hover:bg-primary/90 transition-colors"
                  >
                    <Bell className="w-4 h-4" />
                    Get Exam & Job Alerts
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
