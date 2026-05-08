import React from "react";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Link } from "react-router-dom";

export function GetKey() {
  const steps = [
    {
      icon: "mobile_hand",
      title: "Download the App",
      description: "Install ProCaptcha on your mobile device from Google Play.",
      color: "from-blue-500 to-indigo-500",
      glow: "shadow-[0_0_15px_rgba(59,130,246,0.3)]",
      action: (
        <a href="#" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors shadow-lg shadow-blue-500/20">
          <span className="material-symbols-outlined text-[18px]">download</span> Download
        </a>
      )
    },
    {
      icon: "settings",
      title: "Go to Settings",
      description: "Open the app, navigate to Settings, and tap on Web Access Key.",
      color: "from-cyan-400 to-blue-500",
      glow: "shadow-[0_0_15px_rgba(34,211,238,0.3)]",
    },
    {
      icon: "timer_10_alt_1",
      title: "Get Your Key",
      description: "Your generated access key will be valid for exactly 2 minutes.",
      color: "from-emerald-400 to-teal-500",
      glow: "shadow-[0_0_15px_rgba(16,185,129,0.3)]",
    }
  ];

  return (
    <div className="flex-1 min-h-[calc(100vh-80px)] py-12 relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-white">How to Get Access</h1>
          <p className="text-base text-slate-400 font-medium max-w-sm mx-auto">
            Securely link your web session with the mobile app in three easy steps.
          </p>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
           animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
           transition={{ delay: 0.1, duration: 0.6 }}
        >
          <Card glass={false} whileHover={{ y: 0 }} className="p-8 bg-[#090e1a]/95 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-cyan-500/10 rounded-3xl relative overflow-hidden">
            {/* Subtle top highlight */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-100" />
            
            <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-10 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                
                {steps.map((step, index) => (
                  <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    {/* Timeline Dot */}
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-[#020617] absolute left-0 md:left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 shadow-xl z-10 transition-colors duration-300 group-hover:border-cyan-500/50">
                       <span className="text-sm font-bold text-slate-300 group-hover:text-cyan-400 transition-colors">{index + 1}</span>
                    </div>

                    <div className="w-full pl-16 md:pl-0 md:w-1/2 md:pr-12 md:odd:pl-12 md:odd:pr-0">
                      <div className="p-5 rounded-2xl bg-[#020617]/50 border border-white/5 group-hover:border-white/10 group-hover:bg-[#020617]/80 transition-all duration-300 hover:-translate-y-1 shadow-lg">
                        <div className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br ${step.color} ${step.glow}`}>
                          <span className="material-symbols-outlined text-white text-[20px]">{step.icon}</span>
                        </div>
                        <h3 className="font-bold text-white text-lg mb-1.5">{step.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                        {step.action && step.action}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-white/10 flex justify-center">
                <Link to="/login" className="inline-block">
                  <Button variant="outline" className="px-6 py-2.5 text-sm font-medium text-slate-300 hover:text-cyan-400 border-white/10 bg-[#020617] hover:bg-[#020617] rounded-full flex items-center gap-2 transition-colors hover:border-cyan-500/30">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Login
                  </Button>
                </Link>
              </div>

            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
