import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, 
  X, 
  LogOut, 
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const NAV_LINKS = [
  { name: "Pricing", path: "#pricing" },
  { name: "Contact", path: "#contact" },
];

const SIDEBAR_LINKS = [
  { name: "Privacy Policy", path: "/privacy" },
  { name: "Terms of Service", path: "/terms" },
];

export function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith('#')) {
      e.preventDefault();
      const element = document.getElementById(path.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsOpen(false);
    }
  };

  return (
    <>
      <nav className="fixed top-4 inset-x-4 md:inset-x-8 z-50 transition-all duration-300 pointer-events-none">
        <div className="mx-auto max-w-7xl pointer-events-auto">
          <div className="glass-panel rounded-full h-16 flex items-center justify-between px-6 shadow-[0_0_20px_rgba(0,0,0,0.1)] relative overflow-hidden backdrop-blur-2xl bg-[var(--nav-bg)] border border-[var(--border-color)] transition-all duration-300">
            
            <div className="flex items-center gap-10 relative z-10">
              <Link to="/" className="flex items-center gap-2 group">
                <motion.span 
                  whileHover={{ rotate: 15, scale: 1.2 }}
                  className="material-symbols-outlined text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]" 
                  style={{ fontSize: '28px' }}
                >
                  fingerprint
                </motion.span>
                <motion.span 
                  whileHover={{ x: 2 }}
                  className="text-3xl font-bold tracking-tighter drop-shadow-[0_0_8px_rgba(244,63,94,0.3)] transition-all font-['Caveat'] text-transparent bg-clip-text bg-[image:var(--brand-gradient)]"
                >
                  ProCaptcha
                </motion.span>
              </Link>
              
              <div className="hidden md:flex items-center gap-8">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={(e) => handleLinkClick(e, link.path)}
                    className="relative flex items-center gap-1.5 text-sm font-semibold transition-all hover:text-blue-500 group text-[var(--text-secondary)]"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 relative z-10">
              <div className="hidden sm:flex items-center gap-6">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all hover:bg-white/10"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <div className="flex items-center gap-6">
                  <Link to="/privacy" className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] hover:text-blue-500 transition-colors">Privacy</Link>
                  <Link to="/terms" className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] hover:text-blue-500 transition-colors">Terms</Link>
                </div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="md:hidden text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus:outline-none bg-[var(--card-bg)] p-2 rounded-full border border-[var(--border-color)]"
                onClick={() => setIsOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] z-[70] p-6 backdrop-blur-2xl bg-[var(--sidebar-bg)] border-l-[3px] border-blue-500 shadow-[-10px_0_30px_rgba(0,0,0,0.1)] flex flex-col"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="text-xl font-extrabold tracking-tight text-[var(--text-primary)]">
                  Menu
                </span>
                <button 
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-2 bg-[var(--card-bg)] rounded-full"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={toggleTheme}
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-[var(--card-bg)] text-sm font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-6 border border-[var(--border-color)]"
              >
                <span>Theme</span>
                {theme === "dark" ? (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">Dark</span>
                    <Sun className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">Light</span>
                    <Moon className="w-4 h-4" />
                  </div>
                )}
              </button>

              <div className="flex flex-col gap-2 flex-1 overflow-y-auto no-scrollbar">
                {SIDEBAR_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-semibold text-[var(--text-secondary)] hover:text-blue-500 transition-colors flex items-center justify-between px-2 py-4"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {location.pathname !== '/privacy' && location.pathname !== '/terms' && (
                <div className="mt-auto pt-10 border-t border-[var(--border-color)]">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] text-center mb-4">Support & Scaling</p>
                  <div className="flex flex-col gap-2">
                     <a href="#pricing" onClick={(e) => handleLinkClick(e, '#pricing')} className="px-4 py-3 rounded-xl bg-[var(--card-bg)] text-sm font-bold text-[var(--text-secondary)] hover:text-blue-500 text-center">Reward Rates</a>
                     <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="px-4 py-3 rounded-xl bg-[var(--card-bg)] text-sm font-bold text-[var(--text-secondary)] hover:text-blue-500 text-center">Support</a>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </>
  );
}
