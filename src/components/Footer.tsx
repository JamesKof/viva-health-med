import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Heart,
  Shield,
  CreditCard,
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Our Services", to: "/what-we-do" },
  { label: "Events", to: "/events" },
  { label: "Gallery", to: "/gallery" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

const services = [
  "Blood Pressure Checks",
  "Dental Screening",
  "Free Medication",
  "Medical Consultations",
  "NHIS Registration",
  "Eye Screening",
];

const socialLinks = [
  { icon: Facebook, href: "https://web.facebook.com/profile.php?id=100075519322801", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/vivahealth_medical_foundation/", label: "Instagram" },
];

export const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img
                src={logo}
                alt="Viva Health Medical Foundation Logo"
                className="h-14 w-auto object-contain"
              />
              <span className="font-bold text-xl">Viva Health</span>
            </div>
            <p className="text-background/70 mb-6 leading-relaxed">
              A non-profit organization dedicated to improving healthcare access
              and quality for underserved communities.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center text-background/70 hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/what-we-do"
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-background/70">+233 53 083 9578</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-background/70">
                  info@vivahealthmedfoundation.org
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-background/70">Ghana, West Africa</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* PCI Compliance & Trust Badges */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
            <div className="flex items-center gap-2 bg-background/5 rounded-lg px-4 py-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm text-background/80">SSL Secured</span>
            </div>
            <div className="flex items-center gap-2 bg-background/5 rounded-lg px-4 py-2">
              <CreditCard className="w-5 h-5 text-primary" />
              <span className="text-sm text-background/80">PCI DSS Compliant</span>
            </div>
            <div className="flex items-center gap-2 bg-background/5 rounded-lg px-4 py-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm text-background/80">Secure Payments via Hubtel</span>
            </div>
          </div>
          <p className="text-center text-xs text-background/50 mb-6">
            All donations are processed securely through PCI-DSS Level 1 compliant payment processors.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/60 text-sm">
              © {new Date().getFullYear()} Viva Health Medical Foundation. All
              rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link to="/privacy-policy" className="text-background/60 hover:text-background transition-colors">
                Privacy Policy
              </Link>
              <span className="text-background/30">|</span>
              <Link to="/cookies-policy" className="text-background/60 hover:text-background transition-colors">
                Cookies Policy
              </Link>
            </div>
            <p className="text-background/60 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-accent" /> for better
              healthcare
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
