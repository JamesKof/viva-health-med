import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Home, Info, Briefcase, Calendar, Image, BookOpen, Mail, Heart, Users } from "lucide-react";

const navItems = [
  { label: "Home", to: "/", icon: Home },
  { label: "About", to: "/about", icon: Info },
  { label: "What We Do", to: "/what-we-do", icon: Briefcase },
  { label: "Events", to: "/events", icon: Calendar },
  { label: "Volunteer", to: "/volunteer", icon: Users },
  { label: "Gallery", to: "/gallery", icon: Image },
  { label: "Blog", to: "/blog", icon: BookOpen },
  { label: "Contact", to: "/contact", icon: Mail },
];

export const StickySubNav = () => {
  const [isVisible] = useState(false);
  const location = useLocation();


  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border shadow-soft"
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              {/* Logo/Brand */}
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Heart className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold text-foreground hidden sm:block">Viva Health</span>
              </Link>

              {/* Nav Items */}
              <div className="flex items-center gap-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.to;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="hidden md:block">{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* CTA */}
              <Link
                to="/donate"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground font-medium text-sm hover:shadow-glow transition-all"
              >
                <Heart className="w-4 h-4" />
                <span className="hidden sm:block">Donate</span>
              </Link>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};