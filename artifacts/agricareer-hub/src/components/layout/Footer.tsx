import { Link } from "wouter";
import { Sprout, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background/80 mt-auto" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sprout className="w-4.5 h-4.5 text-primary-foreground" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-background text-base">AgriCareer</span>
                <span className="text-[10px] font-medium text-primary uppercase tracking-widest">Hub</span>
              </div>
            </div>
            <p className="text-sm text-background/60 leading-relaxed">
              Empowering Agriculture graduates in Tamil Nadu and India to discover exams, jobs, and career paths in the agricultural sector.
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
                { label: "News & Alerts", href: "/news" },
                { label: "Career Paths", href: "/careers" },
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
            <h4 className="text-background font-semibold text-sm mb-4 uppercase tracking-wider">For Students</h4>
            <ul className="space-y-2.5">
              {["B.Sc Agriculture", "M.Sc Agronomy", "Competitive Exams", "Government Jobs", "Research Fellowships", "Agri-tech Careers"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-background font-semibold text-sm mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
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
          </div>
        </div>

        <div className="border-t border-background/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-background/40">
            © 2025 AgriCareer Hub. All rights reserved.
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
