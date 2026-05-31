import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Sprout, ChevronRight } from "lucide-react";

const navLinks = [
  { label: "Dashboard", href: "/" },
  { label: "Exams", href: "/exams" },
  { label: "Jobs", href: "/jobs" },
  { label: "News", href: "/news" },
  { label: "Careers", href: "/careers" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" data-testid="nav-logo">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm group-hover:bg-primary/90 transition-colors">
              <Sprout className="w-4.5 h-4.5 text-primary-foreground" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-foreground text-base tracking-tight">AgriCareer</span>
              <span className="text-[10px] font-medium text-primary uppercase tracking-widest">Hub</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = link.href === "/"
                ? location === "/"
                : location.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-testid={`nav-link-${link.label.toLowerCase()}`}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              data-testid="nav-cta"
            >
              Get Alerts <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            data-testid="nav-mobile-toggle"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 py-3 space-y-1" data-testid="nav-mobile-menu">
          {navLinks.map((link) => {
            const isActive = link.href === "/"
              ? location === "/"
              : location.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                data-testid={`nav-mobile-link-${link.label.toLowerCase()}`}
                className={`flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
