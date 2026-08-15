import { useEffect, useRef, useState } from "react";
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

const SHOW_AFTER = 400;

export const StickySubNav = () => {
  const [isVisible, setIsVisible] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const current = window.scrollY;
      const delta = current - lastScrollY.current;

      if (current < SHOW_AFTER) {
        setIsVisible(false);
      } else if (delta > 6) {
        // scrolling down → hide
        setIsVisible(false);
      } else if (delta < -6) {
        // scrolling up → reveal
        setIsVisible(true);
      }

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsVisible(false);
  }, [location.pathname]);

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
                <img
                  src="/favicon-192x192.png"
                  alt="Viva Health Medical Foundation"
                  className="w-8 h-8 object-contain"
                  loading="lazy"
                />
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
