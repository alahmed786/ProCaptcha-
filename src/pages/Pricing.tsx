import React from "react";
import { motion } from "motion/react";
import { DollarSign, CheckCircle2 } from "lucide-react";
import { Card } from "../components/ui/Card";

export function Pricing() {
  const rates = [
    { name: "Text Captcha", rate: "2,000", price: "$1.00", icon: "text_fields" },
    { name: "Image Captcha", rate: "2,500", price: "$1.00", icon: "wallpaper" },
    { name: "Slider Captcha", rate: "3,333", price: "$1.00", icon: "toys_and_games" },
    { name: "Emoji Captcha", rate: "3,333", price: "$1.00", icon: "emoji_symbols" },
    { name: "Tap Captcha", rate: "5,000", price: "$1.00", icon: "touch_app" },
    { name: "Math Captcha", rate: "5,000", price: "$1.00", icon: "casino" },
    { name: "Match Captcha", rate: "5,000", price: "$1.00", icon: "sound_detection_dog_barking" },
    { name: "Missing Captcha", rate: "3,333", price: "$1.00", icon: "flare" },
    { name: "Auto Captcha", rate: "5,000", price: "$1.00", icon: "robot_2" },
    { name: "Audio Captcha", rate: "2,500", price: "$1.00", icon: "voice_selection" },
  ];

  return (
    <div className="flex-1 py-10 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#1E40AF]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#164E63]/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">Reward Rates</h1>
          <p className="text-xl text-slate-400 mb-10 font-medium">
            Solve these captchas and earn rewards. Simple, transparent rates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {rates.map((rate, i) => (
             <motion.div
              key={rate.name}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
             >
                <div className="group relative flex items-center justify-between p-5 bg-[#020617]/50 backdrop-blur-md border border-white/5 rounded-2xl hover:bg-white/[0.02] overflow-hidden transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-colors duration-300">
                       <span className="material-symbols-outlined text-cyan-500 text-xl group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] transition-all">
                         {rate.icon}
                       </span>
                     </div>
                     <span className="font-semibold text-slate-200 group-hover:text-white transition-colors">{rate.name}</span>
                   </div>
                   
                   <div className="flex flex-col items-end">
                      <span className="text-xs text-slate-500 font-mono tracking-widest">{rate.rate}</span>
                      <span className="text-base font-extrabold text-white mt-0.5 group-hover:text-cyan-300 transition-colors">{rate.price}</span>
                   </div>
                   
                   {/* Subtle hover gradient */}
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent -translate-x-[150%] group-hover:animate-shimmer pointer-events-none" />
                </div>
             </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
