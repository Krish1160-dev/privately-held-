import { Link } from "wouter";
import { Sprout, Mail, Phone, MapPin, Bell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background/80 mt-auto" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sprout className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-background text-base">AgriCareer</span>
                <span className="text-[10px] font-medium text-primary uppercase tracking-widest">Hub · TN</span>
              </div>
            </div>
            <p className="text-sm text-background/60 leading-relaxed">
              Empowering Agriculture graduates in Tamil Nadu and India to discover exams, jobs, career paths, and stay updated with the latest alerts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-background font-semibold text-sm mb-4 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Dashboard", href: "/" },
                { label: "Upcoming Exams", href: "/exams" },
                { label: "Latest Jobs", href: "/jobs" },
                { label: "News & Updates", href: "/news" },
                { label: "Career Paths", href: "/careers" },
                { label: "Alert Center", href: "/alerts" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                    data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Students */}
          <div>
            <h4 className="text-background font-semibold text-sm mb-4 uppercase tracking-wider">Career Profiles</h4>
            <ul className="space-y-2.5">
              {[
                "Agronomist",
                "Agricultural Officer",
                "Assistant Agri Officer",
                "Scientist (ICAR)",
                "Research Associate",
                "Assistant Professor",
                "Extension Officer",
              ].map((item) => (
                <li key={item}>
                  <Link href="/careers" className="text-sm text-background/60 hover:text-background transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-background font-semibold text-sm mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2.5 text-sm text-background/60">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <span>support@agricareerhub.in</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-background/60">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-background/60">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <span>Coimbatore, Tamil Nadu</span>
              </li>
            </ul>

            <Link
              href="/alerts"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Bell className="w-3.5 h-3.5" /> Get Alerts
            </Link>
          </div>
        </div>

        <div className="border-t border-background/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-background/40">
            © 2026 AgriCareer Hub. All rights reserved. Data is indicative — verify from official sources.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-background/40 hover:text-background/70 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-background/40 hover:text-background/70 transition-colors">Terms of Use</a>
            <a href="#" className="text-xs text-background/40 hover:text-background/70 transition-colors">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
