import React from "react";
import { motion } from "motion/react";
import { Bell, Check, Trash2, ArrowLeft, Info, Zap, ShieldCheck, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: "Rewards Processed",
    description: "Your daily earnings of $12.50 have been successfully added to your balance.",
    time: "2 mins ago",
    type: "success",
    icon: ShieldCheck,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20"
  },
  {
    id: 2,
    title: "New Achievement",
    description: "Congratulations! You've unlocked the 'Speed Demon' badge for 50 rapid solves.",
    time: "1 hour ago",
    type: "achievement",
    icon: Star,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20"
  },
  {
    id: 3,
    title: "Security Update",
    description: "A login was detected from a new IP address: 192.168.1.45. If this wasn't you, please change your password.",
    time: "3 hours ago",
    type: "warning",
    icon: Info,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20"
  },
  {
    id: 4,
    title: "Global Task Boost",
    description: "2x multiplier is now active for the next 2 hours on all Sprint Captchas!",
    time: "5 hours ago",
    type: "system",
    icon: Zap,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  }
];

export function Notifications() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8 h-full overflow-y-auto w-full max-w-4xl mx-auto font-sans pb-20">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="md:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">Notifications</h1>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Stay updated with your progress</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="hidden md:flex rounded-xl border-white/5 bg-white/5 text-slate-400 hover:text-white">
          Mark all as read
        </Button>
      </div>

      {/* Notifications List */}
      <div className="flex flex-col gap-4 mt-4">
        {MOCK_NOTIFICATIONS.map((notif, index) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all cursor-pointer relative overflow-hidden group">
              <div className="flex gap-5 relative z-10">
                <div className={`w-14 h-14 rounded-2xl ${notif.bg} ${notif.border} border flex items-center justify-center shrink-0 shadow-lg`}>
                  <notif.icon className={`w-7 h-7 ${notif.color}`} />
                </div>
                
                <div className="flex-1 flex flex-col gap-2 min-w-0">
                  <h3 className="font-bold text-white text-lg tracking-tight">{notif.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">{notif.description}</p>
                  
                  {/* Timestamp positioned naturally below text */}
                  <div className="mt-2 flex justify-end">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] group-hover:text-slate-400 transition-colors">
                      {notif.time}
                    </span>
                  </div>
                </div>

                <div className="absolute right-6 top-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="w-8 h-8 rounded-lg bg-black border border-white/5 flex items-center justify-center text-slate-500 hover:text-rose-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                   </button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
