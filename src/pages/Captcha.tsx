import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Zap, ShieldCheck, Target, RefreshCcw, ArrowRight, 
  Info, Trophy, Flame, AlertCircle, ChevronRight
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { cn } from "../lib/utils";
import { useUser } from "../context/UserContext";

type Difficulty = "EASY" | "MEDIUM" | "HARD";

const DIFFICULTY_CONFIG = {
  EASY: {
    length: 4,
    timer: 45,
    noiseCurves: 1,
    particleCount: 20,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    chars: "0123456789"
  },
  MEDIUM: {
    length: 6,
    timer: 30,
    noiseCurves: 3,
    particleCount: 50,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    chars: "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  },
  HARD: {
    length: 8,
    timer: 15,
    noiseCurves: 6,
    particleCount: 100,
    color: "text-rose-400",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/20",
    chars: "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%&"
  }
};

const GENERATE_CAPTCHA = (length: number, charset: string) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
};

export function Captcha() {
  // Pulling updateScore from context to handle the 1% deduction
  const { stats: globalStats, addXP, addPoints, updateScore, incrementWebCaptcha } = useUser();
  const [difficulty] = useState<Difficulty>("HARD");
  const [captcha, setCaptcha] = useState("");
  const [userInput, setUserInput] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error" | "processing" | "insufficient">("idle");
  const [timeLeft, setTimeLeft] = useState(DIFFICULTY_CONFIG.HARD.timer);
  
  // Custom Logic States
  const [mistakeCount, setMistakeCount] = useState(0);
  const [isPenaltyLoading, setIsPenaltyLoading] = useState(false);
  const [sessionStats, setSessionStats] = useState({ solvedInSession: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = (duration: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(duration);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          refreshCaptcha();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const refreshCaptcha = (newDifficulty?: Difficulty) => {
    const diff = newDifficulty || difficulty;
    const config = DIFFICULTY_CONFIG[diff];
    const newCaptcha = GENERATE_CAPTCHA(config.length, config.chars);
    setCaptcha(newCaptcha);
    setUserInput("");
    setStatus("idle");

    // Dynamic Loading Penalty Check
    const currentScore = globalStats.score || 0;
    if (currentScore < 40) {
      setIsPenaltyLoading(true);
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
      
      // The lower the score, the longer the penalty wait (e.g. 30 score = 1 second wait)
      const penaltyDelay = (40 - currentScore) * 100; 
      
      setTimeout(() => {
        setIsPenaltyLoading(false);
        drawCaptcha(newCaptcha, diff);
        startTimer(config.timer);
      }, penaltyDelay);
    } else {
      drawCaptcha(newCaptcha, diff);
      startTimer(config.timer);
    }
  };

  const drawCaptcha = (text: string, diffLevel: Difficulty) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const config = DIFFICULTY_CONFIG[diffLevel];

    // Reset
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Modern Background Style
    const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bgGradient.addColorStop(0, "#020617");
    bgGradient.addColorStop(0.5, "#0a0f1e");
    bgGradient.addColorStop(1, "#020617");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dynamic Scanning Line Effect
    const scanPos = (Date.now() / 20) % canvas.width;
    const scanGrad = ctx.createLinearGradient(scanPos - 50, 0, scanPos + 50, 0);
    scanGrad.addColorStop(0, "rgba(59, 130, 246, 0)");
    scanGrad.addColorStop(0.5, "rgba(59, 130, 246, 0.05)");
    scanGrad.addColorStop(1, "rgba(59, 130, 246, 0)");
    ctx.fillStyle = scanGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle Grid Pattern
    ctx.strokeStyle = "rgba(59, 130, 246, 0.08)";
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 40) {
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
    }

    // Modern Noise (Bezier Curves)
    for (let i = 0; i < config.noiseCurves; i++) {
      ctx.strokeStyle = diffLevel === "HARD" ? "rgba(244, 63, 94, 0.2)" : "rgba(59, 130, 246, 0.15)";
      ctx.lineWidth = diffLevel === "HARD" ? 2 : 1;
      ctx.beginPath();
      ctx.moveTo(0, Math.random() * canvas.height);
      ctx.bezierCurveTo(
        canvas.width / 3, Math.random() * canvas.height,
        (canvas.width / 3) * 2, Math.random() * canvas.height,
        canvas.width, Math.random() * canvas.height
      );
      ctx.stroke();
    }

    // Draw characters
    const fontSize = diffLevel === "HARD" ? 64 : 84; 
    ctx.font = `900 ${fontSize}px "JetBrains Mono", "Inter", monospace`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    const charGap = diffLevel === "HARD" ? 45 : 65;
    const totalWidth = text.length * charGap;
    const startX = (canvas.width - totalWidth) / 2 + (charGap / 2);

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const x = startX + i * charGap;
      const y = canvas.height / 2 + (Math.random() * (diffLevel === "HARD" ? 20 : 6) - (diffLevel === "HARD" ? 10 : 3));
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((Math.random() * (diffLevel === "HARD" ? 25 : 6) - (diffLevel === "HARD" ? 12.5 : 3)) * Math.PI / 180);
      
      // Shadow
      ctx.shadowBlur = diffLevel === "HARD" ? 15 : 40;
      ctx.shadowColor = diffLevel === "HARD" ? "rgba(244, 63, 94, 0.6)" : "rgba(59, 130, 246, 0.9)";
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      
      // Main Text color
      ctx.fillStyle = "#ffffff";
      ctx.fillText(char, 0, 0);

      const grad = ctx.createLinearGradient(0, -fontSize/2, 0, fontSize/2);
      grad.addColorStop(0, "#ffffff");
      if (diffLevel === "HARD") {
        grad.addColorStop(0.5, "#f43f5e");
        grad.addColorStop(1, "#be123c");
      } else {
        grad.addColorStop(0.5, "#60a5fa");
        grad.addColorStop(1, "#2563eb");
      }
      ctx.fillStyle = grad;
      ctx.globalCompositeOperation = "source-atop";
      ctx.fillText(char, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      ctx.lineWidth = 1.5;
      ctx.strokeText(char, 0, 0);
      ctx.restore();
    }

    // Particles
    for (let i = 0; i < config.particleCount; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? "rgba(59, 130, 246, 0.3)" : "rgba(255, 255, 255, 0.2)";
      if (diffLevel === "HARD" && Math.random() > 0.8) ctx.fillStyle = "rgba(244, 63, 94, 0.4)";
      ctx.beginPath();
      const px = Math.random() * canvas.width;
      const py = Math.random() * canvas.height;
      const size = Math.random() * 1.5;
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  useEffect(() => {
    refreshCaptcha();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "processing" || isPenaltyLoading) return;

    if (!userInput.trim()) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
      return;
    }

    if (globalStats.points < 1) {
      setStatus("insufficient");
      setTimeout(() => setStatus("idle"), 5000);
      return;
    }

    setStatus("processing");

    setTimeout(() => {
      const isValid = userInput === captcha;
      const config = DIFFICULTY_CONFIG[difficulty];

      if (isValid) {
        setStatus("success");
        
        // --- Custom Reward Logic ---
        const timeTaken = config.timer - timeLeft;
        let earnedXP = 3; // Base XP for regular solve or < 95 score
        
        // Condition: Fast solve (< 5s) AND High Score (> 95)
        if (timeTaken <= 5 && globalStats.score >= 95) {
          earnedXP = 4;
        }

        addXP(earnedXP);
        addPoints(-1);
        incrementWebCaptcha();
        setMistakeCount(0); // Reset mistakes on success
        
        setSessionStats(prev => ({
          solvedInSession: prev.solvedInSession + 1,
        }));
        
        setTimeout(() => {
          refreshCaptcha();
        }, 1500);
        
      } else {
        setStatus("error");
        
        // --- Custom Penalty Logic ---
        const newMistakes = mistakeCount + 1;
        if (newMistakes >= 3) {
          if (updateScore) updateScore(-1); // Reduce score by 1%
          setMistakeCount(0); // Reset counter
        } else {
          setMistakeCount(newMistakes);
        }

        setTimeout(() => setStatus("idle"), 2000);
      }
    }, 600);
  };

  return (
    <div className="flex flex-col gap-8 p-4 md:p-6 lg:p-8 h-full overflow-y-auto w-full max-w-5xl mx-auto font-sans pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-blue-500 mb-2">
            <Zap className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Solve. Verify. Earn XP.</span>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">TEXT CAPTCHA</h1>
          <p className="text-slate-500 font-medium text-sm mt-1 max-w-2xl">
            Each Captcha costs 1 point. High scores and fast solves yield max XP!
          </p>
        </div>

        {/* Stats Chips */}
        <div className="flex flex-wrap items-center gap-3 md:justify-end shrink-0">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="relative group">
            <div className="flex items-center gap-2 bg-[#0a0f1e]/80 backdrop-blur-xl border border-emerald-500/20 px-5 py-2 rounded-full cursor-help hover:border-emerald-500/50 transition-all shadow-xl">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
              <span className="text-[11px] font-mono font-black text-white whitespace-nowrap">{globalStats.xp} <span className="text-emerald-500/60 ml-0.5">XP</span></span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative group">
            <div className="flex items-center gap-2 bg-[#0a0f1e]/80 backdrop-blur-xl border border-rose-500/20 px-5 py-2 rounded-full cursor-help hover:border-rose-500/50 transition-all shadow-xl">
              <Target className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-[11px] font-mono font-black text-white whitespace-nowrap">{globalStats.points} <span className="text-rose-500/60 ml-0.5">POINTS</span></span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative group">
            <div className="flex items-center gap-2 bg-[#0a0f1e]/80 backdrop-blur-xl border border-blue-500/20 px-5 py-2 rounded-full cursor-help hover:border-blue-500/50 transition-all shadow-xl">
              <span className="material-symbols-outlined text-[14px] text-amber-400">readiness_score</span>
              <span className="text-[11px] font-mono font-black text-white whitespace-nowrap">{globalStats.score} <span className="text-amber-500/60 ml-0.5">SCORE</span></span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full">
        {/* Main Interface */}
        <div className="flex flex-col gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative p-[1px] rounded-[32px] overflow-hidden"
          >
            {/* Subtle card glow/border animation */}
            <div className="absolute inset-[-100%] animate-[spin_10s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,rgba(59,130,246,0.1)_25%,transparent_50%,rgba(59,130,246,0.1)_75%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity" />
            <Card className="relative overflow-hidden bg-white/[0.02] border-white/10 rounded-[31px] p-8 md:p-12 shadow-2xl">
              <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none" />
              <div className="flex flex-col items-center gap-10">
                
                {/* Captcha Display Area */}
                <div className="relative group w-full max-w-lg">
                  {/* Timer Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 rounded-full overflow-hidden z-20">
                    <motion.div 
                      initial={{ width: "100%" }}
                      animate={{ width: `${(timeLeft / DIFFICULTY_CONFIG[difficulty].timer) * 100}%` }}
                      transition={{ duration: 1, ease: "linear" }}
                      className={cn(
                        "h-full transition-colors",
                        timeLeft < 5 ? "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]" : 
                        timeLeft < 10 ? "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" : 
                        "bg-blue-500"
                      )}
                    />
                  </div>
                  <div className="absolute -inset-8 bg-blue-500/5 blur-3xl rounded-[60px] group-hover:bg-blue-500/10 transition-all duration-700" />
                  
                  <div className="relative mt-4 p-3 rounded-[32px] bg-black/60 border border-white/10 overflow-hidden shadow-2xl backdrop-blur-md">
                    <canvas 
                      ref={canvasRef} 
                      width={400} 
                      height={160}
                      className="w-full h-auto rounded-2xl grayscale-0 opacity-100 transition-opacity duration-300"
                    />
                    <div className="absolute top-4 right-6 flex gap-2 z-10">
                      <button 
                        onClick={() => refreshCaptcha()}
                        className="p-2.5 rounded-xl bg-black/60 border border-white/10 text-slate-400 hover:text-white transition-all hover:scale-110 hover:bg-black active:rotate-180"
                      >
                        <RefreshCcw className="w-5 h-5" />
                      </button>
                    </div>
                    
                    {/* Status Overlays */}
                    <AnimatePresence>
                      {status === "processing" && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-30"
                        >
                          <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                            <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Decrypting...</span>
                          </div>
                        </motion.div>
                      )}
                      
                      {/* Low Score Penalty Overlay */}
                      {isPenaltyLoading && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-40"
                        >
                          <div className="flex flex-col items-center gap-4 text-center">
                            <AlertCircle className="w-10 h-10 text-amber-500 animate-pulse" />
                            <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] leading-tight px-4">
                              Low Score Penalty <br/> Delaying Next Captcha
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Input Area */}
                <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4">
                  <div className="relative group/input">
                    <Input 
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Enter Captcha"
                      disabled={status === "success" || status === "processing" || isPenaltyLoading}
                      className={cn(
                        "h-16 bg-black/40 border-white/10 rounded-2xl text-center text-xl font-mono font-black transition-all",
                        status === "success" ? "border-emerald-500/50 ring-emerald-500/10 text-emerald-400" :
                        (status === "error" || status === "insufficient") ? "border-rose-500/50 ring-rose-500/10 text-rose-400 animate-shake bg-rose-500/5" :
                        "focus:ring-blue-500/10 focus:border-blue-500/50"
                      )}
                    />
                    <div className="h-6 flex items-center justify-center mt-2">
                      <AnimatePresence mode="wait">
                        {status === "error" && !userInput.trim() && (
                          <motion.div key="error-empty" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                            <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Enter Captcha before verifying</span>
                          </motion.div>
                        )}
                        {status === "error" && userInput.trim() && userInput !== captcha && (
                          <motion.div key="error-wrong" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                            <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">
                              {mistakeCount >= 2 ? "3 Mistakes - Score Penalty Applied" : "Invalid Sequence Detected"}
                            </span>
                          </motion.div>
                        )}
                        {status === "insufficient" && (
                          <motion.div key="insufficient" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="text-center px-4">
                            <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest leading-tight">
                              Insufficient points, get more in the app
                            </span>
                          </motion.div>
                        )}
                        {status === "success" && (
                          <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Captcha Verified Successfully</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <Button 
                    type="submit"
                    disabled={status === "success" || status === "processing" || isPenaltyLoading}
                    className={cn(
                      "h-16 rounded-2xl font-black uppercase tracking-widest text-xs transition-all",
                      status === "success" ? "bg-emerald-600 hover:bg-emerald-600 shadow-[0_4px_20px_rgba(16,185,129,0.4)]" : 
                      (status === "error" || status === "insufficient") ? "bg-rose-600 hover:bg-rose-600 shadow-[0_4px_20px_rgba(244,63,94,0.4)]" :
                      "bg-blue-600 hover:bg-blue-700 shadow-[0_8px_30px_rgba(37,99,235,0.3)] hover:-translate-y-0.5"
                    )}
                  >
                    Verify
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
