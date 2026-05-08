import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  History, 
  Bell, 
  Trophy,
  X,
  Zap,
  LogIn,
  User
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Changed from "motion/react" to "framer-motion" (standard Vite/React import)

const SIDEBAR_LINKS = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Captcha Solver", icon: Zap, path: "/dashboard/captcha" },
  { name: "Leaderboard", icon: Trophy, path: "/dashboard/leaderboard" },
  { name: "Notifications", icon: Bell, path: "/dashboard/notifications" },
  { name: "History", icon: History, path: "/dashboard/history" },
  { name: "Account", icon: User, path: "/dashboard/account" },
];

export function Dashboard() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-full min-h-[calc(100vh-6rem)] overflow-hidden bg-transparent relative font-sans">
      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] md:hidden"
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-[#020617] border-r border-white/10 z-[101] md:hidden flex flex-col p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-2xl font-black text-white tracking-tighter">GRID.AI</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-2 overflow-y-auto no-scrollbar">
                {SIDEBAR_LINKS.map(link => {
                  const active = location.pathname === link.path || (link.path !== '/dashboard' && location.pathname.startsWith(link.path));
                  return (
                    <Link 
                      key={link.name} 
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-base font-bold transition-all relative overflow-hidden ${active ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                      {active && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 -z-10" />
                      )}
                      <link.icon className={`w-6 h-6 ${active ? 'text-blue-400' : 'opacity-70'}`} />
                      <span>{link.name}</span>
                      {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)]" />}
                    </Link>
                  )
                })}
              </div>

              <div className="mt-auto pt-6 border-t border-white/5">
                <Link to="/logout" className="flex items-center gap-4 px-5 py-4 text-slate-400 hover:text-rose-400 font-bold transition-colors">
                  <LogIn className="w-6 h-6" />
                  <span>Logout Session</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sidebar for Desktop */}
      <div className="hidden md:flex flex-col relative w-64 glass-panel h-full md:h-auto m-4 mt-0 rounded-3xl justify-start px-4 py-6 border border-white/10 bg-[#020617]/40 backdrop-blur-xl">
        <div className="flex flex-col overflow-y-auto gap-1 space-y-3 items-stretch no-scrollbar w-full mt-4">
          {SIDEBAR_LINKS.map(link => {
            const active = location.pathname === link.path || (link.path !== '/dashboard' && location.pathname.startsWith(link.path));
            return (
              <Link 
                key={link.name} 
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 relative overflow-hidden ${active ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                {active && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-rose-500 via-purple-500 to-blue-600 -z-10 shadow-[0_0_25px_rgba(0,243,255,0.4)]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="relative z-10 w-full flex items-center gap-3">
                  <link.icon className={`w-5 h-5 shrink-0 ${active ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'opacity-70'}`} />
                  <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis block w-auto">{link.name}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full md:mr-4 relative z-10 overflow-hidden">
        <div className="flex-1 overflow-y-auto relative no-scrollbar pb-20 md:pb-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
