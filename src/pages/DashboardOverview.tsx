import React from "react";
import { motion } from "framer-motion";
import { 
  Bell, 
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { useUser } from "../context/UserContext";

export function DashboardOverview() {
  const { stats: userData } = useUser();

  const currentHour = new Date().getHours();
  let greeting = "Good Evening";
  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
  }

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 lg:p-10 h-full overflow-y-auto w-full max-w-[1400px] mx-auto font-sans relative pb-12 custom-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between gap-6 mt-4 md:mt-0">
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white flex flex-col leading-[1.1]">
            <span className="text-xl md:text-2xl lg:text-3xl font-bold opacity-70 tracking-normal">{greeting},</span>
            {/* Added fallback "User" so it never shows up blank */}
            <span className="text-4xl md:text-5xl lg:text-6xl">{userData?.username || "User"}</span>
          </h1>
          <p className="text-sm md:text-base text-slate-500 italic mt-2 font-medium">Welcome Back to your workspace</p>
        </div>
        {/* Added 'hidden md:flex' to remove this icon on mobile devices */}
        <Link 
          to="/dashboard/notifications" 
          className="hidden md:flex w-12 h-12 rounded-2xl bg-white/5 border border-white/10 items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all group relative shrink-0 shadow-lg"
        >
          <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <div className="absolute top-3.5 right-3.5 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-[#020617] group-hover:scale-125 transition-transform shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 relative z-10">
        
        {/* 1. Balance */}
        <motion.div whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 25 }} className="flex">
          <Card glass={true} className="p-6 md:p-8 flex items-center justify-between relative overflow-hidden group bg-gradient-to-br from-[#020617]/80 to-[#0f172a]/80 border-white/5 hover:border-blue-500/40 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-blue-500/10 w-full">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1)_0%,transparent_60%)] group-hover:opacity-100 opacity-50 transition-opacity duration-500" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent group-hover:opacity-100 opacity-0 transition-opacity duration-500" />

            <div className="relative z-10 flex w-full justify-between items-center">
              <div>
                <div className="w-fit flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-blue-400 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)] bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  <span className="material-symbols-outlined text-[14px]">wallet</span>
                  Balance
                </div>
                <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
                  ${userData?.balance?.toFixed(4) || "0.0000"}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 2. Points & XP */}
        <Card glass={true} className="p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group bg-gradient-to-br from-[#020617]/80 to-[#0f172a]/80 border-white/5 hover:border-rose-500/40 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-rose-500/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(244,63,94,0.1)_0%,transparent_60%)] group-hover:opacity-100 opacity-50 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-rose-400/30 to-transparent group-hover:opacity-100 opacity-0 transition-opacity duration-500" />

          <div className="relative z-10 w-full">
            <div className="w-fit flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-rose-400 drop-shadow-[0_0_5px_rgba(244,63,94,0.5)] bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              <span className="material-symbols-outlined text-[14px]">social_leaderboard</span>
              Points & XP
            </div>
            <div className="grid grid-cols-2 gap-4 divide-x divide-white/10">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Points</span>
                <div className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-md tracking-tight flex items-center gap-2">
                  {userData?.points || 0}
                </div>
              </div>
              <div className="flex flex-col pl-4">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">XP</span>
                <div className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-md tracking-tight flex items-center gap-2">
                  {userData?.xp || 0}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* 3. Score & Web Captcha Solved */}
        <Card glass={true} className="p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group bg-gradient-to-br from-[#020617]/80 to-[#0f172a]/80 border-white/5 hover:border-emerald-500/40 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-emerald-500/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.1)_0%,transparent_60%)] group-hover:opacity-100 opacity-50 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent group-hover:opacity-100 opacity-0 transition-opacity duration-500" />

          <div className="relative z-10 w-full">
            <div className="w-fit flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)] bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="material-symbols-outlined text-[14px]">readiness_score</span>
              Score & Captchas
            </div>
            
            <div className="grid grid-cols-2 gap-4 divide-x divide-white/10">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Score</span>
                <div className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-md tracking-tight flex items-center gap-2">
                  {userData?.score || 0} <span className="text-sm text-slate-500 font-medium">/ 100</span>
                </div>
              </div>
              <div className="flex flex-col pl-4">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1 whitespace-nowrap">Captchas Solved</span>
                <div className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-md tracking-tight flex items-center gap-2">
                  {userData?.web_captcha || 0}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* 4. Sprint Captcha */}
        <Link to="/dashboard/captcha" className="md:col-span-2 relative p-[1px] rounded-2xl overflow-hidden group cursor-pointer mt-2 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] transition-shadow duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-rose-500 to-red-600 border-rotate opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-rose-500 to-red-600 border-rotate opacity-40 blur-[8px] group-hover:opacity-75 transition-opacity duration-500" />
          <div className="relative bg-[#020617] backdrop-blur-xl h-full w-full rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 overflow-hidden">
            
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_center,rgba(239,68,68,0.15)_0%,transparent_70%)] opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
            <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-red-600/10 to-transparent pointer-events-none" />

            <div className="relative z-10 flex-1 w-full text-center md:text-left">
              <div className="w-fit flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-red-400 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)] bg-red-500/10 border border-red-500/30 px-3 py-1.5 rounded-full mb-4 mx-auto md:mx-0 group-hover:bg-red-500/20 group-hover:border-red-500/50 transition-colors">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="material-symbols-outlined text-[14px]">sprint</span>
                Sprint Captcha
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2 group-hover:text-red-50 transition-colors">Fast-paced decoding</h3>
              <p className="text-slate-400 text-sm max-w-sm mx-auto md:mx-0 group-hover:text-slate-300 transition-colors">
                Challenge your reflexes and accuracy. Earn bonuses by maintaining a high speed streak.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-end gap-3 w-full md:w-auto shrink-0 md:pr-4">
              <div className="w-full sm:w-auto bg-black/40 backdrop-blur-md border border-red-500/20 rounded-xl p-4 md:p-5 flex flex-col items-center justify-center gap-1 group-hover:bg-red-950/40 group-hover:border-red-500/40 group-hover:-translate-y-1 transition-all duration-300 relative overflow-hidden shadow-inner min-w-[120px]">
                <div className="absolute -inset-10 bg-gradient-to-r from-transparent via-red-500/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                <span className="text-[9px] text-red-300 uppercase tracking-widest font-black opacity-80">Points / Captcha</span>
                <div className="text-4xl font-black text-white drop-shadow-[0_0_12px_rgba(239,68,68,0.6)] flex items-end gap-1 transition-transform group-hover:scale-105">
                  1 <span className="text-sm font-bold text-red-500 pb-1">+</span>
                </div>
              </div>

              <div className="w-full sm:w-auto bg-black/40 backdrop-blur-md border border-red-500/20 rounded-xl p-4 md:p-5 flex flex-col items-center justify-center gap-1 group-hover:bg-red-950/40 group-hover:border-red-500/40 group-hover:-translate-y-1 transition-all duration-300 relative overflow-hidden shadow-inner min-w-[120px] delay-75">
                <div className="absolute -inset-10 bg-gradient-to-r from-transparent via-red-500/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" style={{ animationDelay: '0.2s' }} />
                <span className="text-[9px] text-red-300 uppercase tracking-widest font-black opacity-80">XP / Captcha</span>
                <div className="text-4xl font-black text-white drop-shadow-[0_0_12px_rgba(239,68,68,0.6)] flex items-end gap-1 transition-transform group-hover:scale-105">
                  4 <span className="text-sm font-bold text-red-500 pb-1">XP</span>
                </div>
              </div>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 pointer-events-none hidden md:block">
              <span className="material-symbols-outlined text-[28px] text-red-500/40">arrow_forward_ios</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Global Dashboard Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes border-rotate {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .border-rotate {
          background-size: 200% 200%;
          animation: border-rotate 3s linear infinite;
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
      `}} />
    </div>
  );
}

// MicroInteractions component for the Bento cells
export function MicroInteraction({ id }: { id: string }) {
  switch (id) {
    case 'prompt_gen':
      return (
        <div className="relative w-full h-8 flex justify-center items-center">
          {[...Array(3)].map((_, i) => (
            <motion.div key={i} className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full"
              animate={{ y: [0, -10, 0], opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
              style={{ left: `${30 + i * 20}%` }}
            />
          ))}
        </div>
      );
    case 'auditor':
      return (
        <div className="w-full flex flex-col gap-1 items-center">
          <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden relative">
            <motion.div className="absolute top-0 left-0 h-full bg-emerald-400"
              animate={{ width: ["0%", "84%"] }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            />
          </div>
          <span className="text-[9px] font-bold text-emerald-400 font-mono">CLARITY 84%</span>
        </div>
      );
    case 'artistry':
      return (
        <div className="grid grid-cols-2 gap-1 w-12 h-12">
          {[...Array(4)].map((_, i) => (
            <motion.div key={i} className="bg-purple-500/20 rounded-sm"
              animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      );
    case 'video':
      return (
        <div className="w-full h-8 relative flex items-center justify-center">
          <div className="w-full h-1 bg-black/50 rounded-full" />
          <motion.div className="absolute w-2 h-4 bg-rose-400 rounded-sm top-2 shadow-[0_0_5px_rgba(244,63,94,0.8)]"
            animate={{ left: ["0%", "90%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      );
    case 'integrity':
      return (
        <div className="w-10 h-10 rounded-full border border-blue-500/30 relative overflow-hidden flex items-center justify-center">
          <div className="w-1 h-1 bg-blue-500 rounded-full" />
          <motion.div className="absolute top-1/2 left-1/2 w-10 h-[2px] bg-gradient-to-r from-transparent to-blue-400 origin-left"
            animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>
      );
    case 'style':
      return (
        <div className="w-full h-6 relative flex flex-col justify-center gap-1">
          <div className="w-full h-[3px] bg-black/50 rounded-full" />
          <motion.div className="absolute left-1/2 w-3 h-3 bg-violet-400 rounded-full top-1 mt-0.5 shadow-md -translate-x-1/2"
            animate={{ x: ["-100%", "100%", "-100%"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="flex justify-between w-full text-[8px] font-bold text-slate-500 font-mono mt-1">
            <span>ROBOTIC</span><span>HUMAN</span>
          </div>
        </div>
      );
    case 'reverse_eng':
      return (
        <div className="w-12 h-10 border border-indigo-500/20 rounded relative overflow-hidden bg-indigo-500/5">
          <motion.div className="absolute w-full h-[2px] bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,1)]"
            animate={{ top: ["0%", "100%", "0%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      );
    case 'ocr':
      return (
        <div className="w-full flex justify-center relative">
          <div className="w-12 h-10 flex flex-col justify-between py-1 px-1">
            {[...Array(3)].map((_, i) => (
              <motion.div key={i} className="h-1 bg-pink-400/50 rounded"
                animate={{ width: ["20%", "100%"] }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: i * 0.3 }}
              />
            ))}
          </div>
        </div>
      );
    case 'multimodal':
      return (
        <div className="w-12 h-10 relative flex justify-center items-center">
          <motion.div className="w-6 h-6 rounded-full border border-teal-400/50 absolute"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }} transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div className="w-6 h-6 rounded-full border border-teal-400/50 absolute"
            animate={{ scale: [1.5, 1, 1.5], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      );
    case 'product':
      return (
        <div className="w-full flex justify-center">
          <motion.div className="px-2 py-1 bg-yellow-400/20 border border-yellow-400/50 rounded flex items-center justify-center -translate-y-1"
            animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-[8px] font-bold text-yellow-400 uppercase font-mono tracking-widest leading-none">Copied!</span>
          </motion.div>
        </div>
      );
    default:
      return null;
  }
}
