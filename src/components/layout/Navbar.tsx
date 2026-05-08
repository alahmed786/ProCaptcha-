import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  TerminalSquare, 
  ChevronDown, 
  Menu, 
  X, 
  LogOut, 
  Bell, 
  Trophy,
  LayoutDashboard, 
  Zap, 
  History,
  User
} from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";
import { useAuth } from "../../context/AuthContext";

const NAV_LINKS = [];

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-4 inset-x-4 md:inset-x-8 z-50 transition-all duration-300 pointer-events-none">
        <div className="mx-auto max-w-7xl pointer-events-auto">
          <div className="glass-panel rounded-full h-16 flex items-center justify-between px-6 shadow-[0_0_20px_rgba(0,0,0,0.5)] relative overflow-hidden backdrop-blur-2xl bg-white/5 border border-white/10">
            
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
                  className={cn(
                    "text-3xl font-bold tracking-tighter drop-shadow-[0_0_8px_rgba(244,63,94,0.4)] transition-all",
                    location.pathname.startsWith('/dashboard') 
                      ? "font-['Caveat'] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-pink-500" 
                      : "font-['Caveat'] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-pink-500"
                  )}
                >
                  ProCaptcha
                </motion.span>
              </Link>
              
              {!location.pathname.startsWith('/dashboard') && (
                <div className="hidden md:flex items-center gap-8">
                  {NAV_LINKS.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        className={cn(
                          "relative flex items-center gap-1.5 text-sm font-semibold transition-all hover:text-white group",
                          isActive ? "text-white" : "text-slate-300"
                        )}
                      >
                        {link.name}
                        {isActive && (
                          <motion.div
                            layoutId="nav-indicator"
                            className="absolute -bottom-6 left-0 right-0 h-[2px] bg-blue-500 shadow-[0_-5px_10px_rgba(59,130,246,0.6)]"
                            initial={false}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 relative z-10">
              {user && location.pathname.startsWith('/dashboard') && (
                <Link to="/dashboard/notifications" className="md:hidden relative p-2 text-slate-400 hover:text-white transition-colors">
                  <Bell className="w-6 h-6" />
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500 border border-[#020617]" />
                </Link>
              )}
              {user ? (
                <>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link to="/dashboard/account" className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-400 font-bold uppercase shadow-[0_0_10px_rgba(59,130,246,0.3)] hover:bg-blue-500/30 transition-colors cursor-pointer">
                      {user.email ? user.email.charAt(0) : 'U'}
                    </Link>
                  </motion.div>
                  <Button onClick={handleLogout} variant="outline" size="sm" className="hidden sm:flex rounded-full border border-rose-500/30 text-rose-300 hover:bg-rose-500/10 transition-colors group">
                    <LogOut className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Logout
                  </Button>
                </>
              ) : (
                <>
                  {!location.pathname.startsWith('/dashboard') ? (
                    <div className="hidden sm:flex items-center gap-6">
                      <div className="flex items-center gap-4 pr-6 border-r border-white/10">
                        <Link to="/privacy" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Privacy</Link>
                        <Link to="/terms" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Terms</Link>
                      </div>
                      <Link to="/login">
                        <Button variant="primary" size="md" className="rounded-full px-6 relative group overflow-hidden border border-white/10 text-white font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all">
                          Access Key
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <Link to="/dashboard/account" onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-400 font-bold uppercase shadow-[0_0_10px_rgba(59,130,246,0.3)] hover:bg-blue-500/30 transition-colors mx-auto block text-center leading-[38px] cursor-pointer">
                      U
                    </Link>
                  )}
                </>
              )}
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="md:hidden text-white/70 hover:text-white focus:outline-none bg-white/5 p-2 rounded-full border border-white/10"
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
              className="fixed inset-0 z-[60] bg-[#020617]/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] z-[70] p-6 backdrop-blur-2xl bg-[#020617]/90 border-l-[3px] border-rose-500 shadow-[-10px_0_30px_rgba(244,63,94,0.15)] flex flex-col"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="text-xl font-extrabold tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  Menu
                </span>
                <button 
                  className="text-white/70 hover:text-white transition-colors p-2 bg-white/5 rounded-full"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-2 flex-1 overflow-y-auto no-scrollbar">
                {!location.pathname.startsWith('/dashboard') ? (
                  [
                    { name: "Dashboard", path: "/dashboard", requiresAuth: true },
                  ].filter(link => !link.requiresAuth || user).map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-semibold text-slate-300 hover:text-white transition-colors flex items-center justify-between px-2 py-4"
                    >
                      {link.name}
                    </Link>
                  ))
                ) : (
                  [
                    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
                    { name: "Captcha Solver", icon: Zap, path: "/dashboard/captcha" },
                    { name: "Leaderboard", icon: Trophy, path: "/dashboard/leaderboard" },
                    { name: "Notifications", icon: Bell, path: "/dashboard/notifications" },
                    { name: "History", icon: History, path: "/dashboard/history" },
                    { name: "Account", icon: User, path: "/dashboard/account" },
                  ].map((link) => {
                    const active = location.pathname === link.path || (link.path !== '/dashboard' && location.pathname.startsWith(link.path));
                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-4 px-4 py-4 rounded-2xl text-base font-bold transition-all relative overflow-hidden",
                          active ? "text-white bg-white/5" : "text-slate-400 hover:text-white hover:bg-white/5"
                        )}
                      >
                        <link.icon className={cn("w-6 h-6", active ? "text-blue-400" : "opacity-70")} />
                        <span>{link.name}</span>
                        {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)]" />}
                      </Link>
                    );
                  })
                )}
              </div>

              <div className="flex flex-col gap-4 mt-auto">
                {user ? (
                   <Button onClick={handleLogout} variant="outline" className="w-full border border-rose-500/30 text-rose-300 hover:bg-rose-500/10">
                      Logout
                   </Button>
                ) : (
                  <>
                    {!location.pathname.startsWith('/dashboard') && (
                      <>
                        <div className="flex items-center justify-center gap-6 py-2 border-b border-white/5 mb-2">
                          <Link to="/privacy" onClick={() => setIsOpen(false)} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Privacy</Link>
                          <Link to="/terms" onClick={() => setIsOpen(false)} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Terms</Link>
                        </div>
                        <Link to="/login" onClick={() => setIsOpen(false)}>
                          <Button variant="primary" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 border border-white/10 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                            Access Key
                          </Button>
                        </Link>
                      </>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
