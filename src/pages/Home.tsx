import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Play, CheckCircle2, Box, GitBranch, ShieldCheck, History, Sparkles, ArrowRightLeft, Image as ImageIcon, Camera, ScanText, ShoppingCart, ListChecks, Type } from "lucide-react";
import confetti from "canvas-confetti";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Link } from "react-router-dom";

export function Home() {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [tickerValue, setTickerValue] = useState(1450392);
  const [optimizerState, setOptimizerState] = useState<'before' | 'typing' | 'after'>('before');
  const [typedText, setTypedText] = useState("");

  const fullPrompt = `# ROLE\nAct as a Senior Medical Technology Analyst...\n# TASK\nAuthor a comprehensive 1500-word editorial...\n# CONSTRAINTS\n- Tone: Clinical yet accessible...`;

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerValue(prev => prev + Math.floor(Math.random() * 7) + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleMagicClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOptimizerState('typing');
    setTypedText("");
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullPrompt.slice(0, i + 1));
      i++;
      if (i >= fullPrompt.length) {
         clearInterval(interval);
         setTimeout(() => setOptimizerState('after'), 500);
      }
    }, 15);
  };

  const handleStartFree = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f3ff', '#3b82f6', '#1e40af']
    });
  };

  return (
    <div className="flex-1 overflow-hidden relative">
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        
        {/* Pill Badge */}
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, ease: "easeOut" }} 
           className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 backdrop-blur-xl px-5 py-2 mb-8 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:bg-blue-500/20 transition-colors"
        >
          <span className="text-sm font-bold tracking-wide text-blue-300">Next-Gen Micro-Task & Reward Engine</span>
        </motion.div>

        {/* Hero Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", type: "spring", bounce: 0.4 }}
          className="max-w-4xl"
        >
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Solve Captchas <br className="hidden md:block" />
            <span className="bg-gradient-to-br from-white via-blue-200 to-blue-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(59,130,246,0.5)] animate-text-shimmer bg-[length:200%_auto]">
              Earn Rewards
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg md:text-xl text-slate-300/80 mb-12 leading-relaxed font-medium">
            Transform your ideas into professional AI prompts. The best prompt enhancer, builder, and flow generator for ChatGPT, Midjourney, DALL-E, and any AI model.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16">
            <Link to="/login" onClick={handleStartFree}>
              <Button variant="primary" size="lg" className="w-full sm:w-auto rounded-full px-10 py-4 text-lg group h-14 bg-gradient-to-b from-blue-500 to-blue-700">
                Start Free 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-8 h-14 text-lg group border-slate-700 hover:border-blue-500/50 bg-white/5 backdrop-blur-xl">
              <Play className="w-5 h-5 fill-current mr-2 group-hover:text-cyan-400 transition-colors" />
              See How It Works
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400 font-medium bg-black/20 backdrop-blur-md rounded-2xl w-fit mx-auto px-6 py-4 border border-white/5">
             <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>9+ variety of captchas</span>
             </div>
             <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Daily New Tasks</span>
             </div>
             <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Fast & Secure</span>
             </div>
             <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Reliable Support</span>
             </div>
             <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>No VPN, Ad Blockers, DNS</span>
             </div>
          </div>
        </motion.div>

        <div className="mt-24 mb-4 w-full text-center">
          <div className="mb-0 max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">Download Our App to Solve All Captchas</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">Get access to our next-gen micro-task & reward engine directly on your device. Solve captchas seamlessly and earn rewards today.</p>
            <Button 
               variant="primary" 
               size="lg" 
               className="gap-2 group shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] rounded-full h-14 px-8"
            >
               Download App
               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {showConfetti && <Confetti width={width} height={height} className="fixed inset-0 z-50 pointer-events-none" />}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes text-shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animate-text-shimmer {
          animation: text-shimmer 4s ease infinite;
        }
        @keyframes scan {
          0%   { transform: translateY(-20px); opacity: 0; }
          50%  { transform: translateY(0px); opacity: 1; }
          100% { transform: translateY(20px); opacity: 0; }
        }
      `}} />
      
      {/* Pricing and Contact sections removed per user request */}
    </div>
  );
}
