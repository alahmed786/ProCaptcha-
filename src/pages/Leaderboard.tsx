import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, Medal, Star, TrendingUp, Crown, 
  ArrowUpRight, ArrowDownRight, Minus, Sparkles, 
  Zap, ShieldCheck, Flame, Target, Info, Search,
  Rocket, ChevronRight, Lock, AlertCircle, Timer, Eye, EyeOff, Clock, Gift
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { cn } from "../lib/utils";
import { useUser } from "../context/UserContext";
import { getDatabase, ref, onValue, query, orderByChild, limitToLast, off } from "firebase/database";
import { getAuth } from "firebase/auth";

interface Leader {
  id: string;
  name: string;
  score: number;
  avatar: string;
  rank: number;
  level: number;
  badge: string;
  isCurrentUser: boolean;
  trend: "up" | "down" | "stable";
}

interface LeaderboardConfig {
  roundEndTime: number;
  rewardEndTime: number;
  nextRoundStartTime: number;
  rewardCode: string;
}

const useCountdown = (targetDate: number | undefined) => {
  const parsedTarget = Number(targetDate) || 0;
  const [timeLeft, setTimeLeft] = useState(Math.max(0, parsedTarget - Date.now()));

  useEffect(() => {
    if (parsedTarget <= 0) {
      setTimeLeft(0);
      return;
    }

    setTimeLeft(Math.max(0, parsedTarget - Date.now()));

    const interval = setInterval(() => {
      const remaining = parsedTarget - Date.now();
      setTimeLeft(Math.max(0, remaining));
      if (remaining <= 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [parsedTarget]);

  const format = () => {
    if (parsedTarget <= 0) return "00:00:00";
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return { timeLeft, formatted: format() };
};

const getBadgeByXP = (xp: number) => {
  if (xp >= 10000) return "Legendary";
  if (xp >= 5000) return "Elite";
  if (xp >= 2000) return "Master";
  if (xp >= 1000) return "Expert";
  if (xp >= 500) return "Pro";
  return "Active";
};

const PodiumCard = ({ leader, rank, delay }: { leader: Leader | undefined; rank: number; delay: number }) => {
  const isGold = rank === 1;

  const config = {
    1: {
      color: "from-yellow-400 via-amber-500 to-yellow-600",
      border: "border-yellow-500/50",
      glow: "shadow-[0_0_50px_rgba(234,179,8,0.2)]",
      icon: <Crown className="w-10 h-10 md:w-12 md:h-12 text-yellow-500" />,
      height: "h-80 md:h-96",
      label: "Grandmaster",
      order: "order-1 md:order-2"
    },
    2: {
      color: "from-slate-300 via-slate-400 to-slate-500",
      border: "border-slate-400/30",
      glow: "shadow-[0_0_40px_rgba(148,163,184,0.15)]",
      icon: <Medal className="w-8 h-8 md:w-10 md:h-10 text-slate-400" />,
      height: "h-72 md:h-80",
      label: "Apex Solver",
      order: "order-2 md:order-1"
    },
    3: {
      color: "from-orange-600 via-orange-700 to-orange-800",
      border: "border-orange-800/20",
      glow: "shadow-[0_0_30px_rgba(194,65,12,0.1)]",
      icon: <Star className="w-6 h-6 md:w-8 md:h-8 text-orange-700" />,
      height: "h-64 md:h-72",
      label: "Elite Contender",
      order: "order-3 md:order-3"
    }
  }[rank as 1 | 2 | 3];

  if (!leader) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.5 }}
        className={cn("relative group w-full", config?.order, "z-10 opacity-40")}
      >
        <Card className={cn(
          "relative h-full flex flex-col items-center justify-center p-6 md:p-8 border border-white/5 bg-slate-950/40 rounded-[30px] md:rounded-[38px] transition-all",
          config?.height
        )}>
          <Lock className="w-10 h-10 text-slate-700 mb-4" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 text-center">Position<br/>Open</span>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className={cn("relative group w-full", config?.order, isGold ? "z-20 scale-100 md:scale-110 mb-8 md:mb-12" : "z-10")}
    >
      <div className={cn(
        "absolute -top-10 md:-top-12 left-1/2 -translate-x-1/2 z-30 transform group-hover:scale-110 transition-transform duration-500",
        isGold && "animate-bounce hover:animate-none"
      )}>
        <div className="relative">
          <div className={cn("absolute inset-0 blur-2xl opacity-50", isGold ? "bg-yellow-500" : rank === 2 ? "bg-slate-400" : "bg-orange-800")} />
          {config?.icon}
        </div>
      </div>

      <div className={cn(
        "relative rounded-[32px] md:rounded-[40px] overflow-hidden border-2 p-1 transition-all duration-700",
        config?.border,
        config?.glow,
        "bg-gradient-to-b from-white/10 to-transparent backdrop-blur-3xl",
        "group-hover:border-white/40"
      )}>
        {isGold && (
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,#eab308_0%,transparent_20%,transparent_80%,#eab308_100%)] opacity-20 animate-[spin_8s_linear_infinite]" />
        )}
        
        <Card className={cn(
          "relative h-full flex flex-col items-center justify-center p-6 md:p-8 border-none bg-slate-950/80 rounded-[30px] md:rounded-[38px] transition-all",
          config?.height
        )}>
          <div className="relative mb-4 md:mb-6">
            <div className={cn(
              "absolute inset-0 rounded-full blur-2xl opacity-20 scale-150 animate-pulse",
              isGold ? "bg-yellow-500" : "bg-blue-600"
            )} />
            <div className={cn(
              "w-24 h-24 md:w-32 md:h-32 rounded-3xl md:rounded-[40px] flex items-center justify-center text-3xl md:text-4xl font-black relative z-10 border-2 overflow-hidden",
              isGold ? "border-yellow-500/50 bg-yellow-500/10 text-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.2)]" : "border-white/10 bg-white/5 text-white shadow-[0_0_30px_rgba(59,130,246,0.1)]"
            )}>
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
              {leader.avatar}
            </div>
            <motion.div 
              initial={{ rotate: -15, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              className={cn(
                "absolute -bottom-2 -right-2 md:-bottom-3 md:-right-3 w-10 h-10 md:w-14 md:h-14 rounded-2xl md:rounded-[20px] flex items-center justify-center shadow-2xl z-20 border-2 transition-transform duration-500 group-hover:rotate-6",
                isGold ? "bg-yellow-500 border-yellow-400 text-slate-950" : "bg-blue-600 border-blue-400 text-white"
              )}
            >
              <div className="flex flex-col items-center leading-none">
                <span className="text-[10px] md:text-xs font-black opacity-60">RANK</span>
                <span className="text-sm md:text-lg font-black tracking-tighter">#{rank}</span>
              </div>
            </motion.div>
          </div>

          <div className="text-center w-full">
            <div className="flex flex-col items-center gap-1 mb-2">
              <div className="flex items-center gap-2">
                <span className={cn("text-[10px] md:text-xs font-black uppercase tracking-[0.3em]", isGold ? "text-yellow-500" : "text-blue-400")}>
                  {config?.label}
                </span>
                {isGold && <Sparkles className="w-3 h-3 text-yellow-500 animate-pulse" />}
              </div>
              <div className="h-px w-8 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-6 md:mb-8 tracking-tighter uppercase italic group-hover:tracking-normal transition-all duration-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] truncate max-w-[150px] md:max-w-[200px]">
              {leader.name}
            </h3>
            <div className="relative group/score">
              <div className="absolute inset-x-0 -inset-y-4 bg-blue-500/5 blur-xl group-hover/score:bg-blue-500/10 transition-all rounded-[100%]" />
              <div className="relative px-6 py-4 md:py-6 bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden">
                <div className="absolute top-2 left-3 flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-blue-500/40" />
                  <div className="w-4 h-1 rounded-full bg-blue-500/10" />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none group-hover:scale-110 transition-transform duration-500">
                    {leader.score.toLocaleString()}
                  </span>
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-blue-500/60 mt-2">
                    XP YIELD
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export function Leaderboard() {
  const { stats } = useUser();
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [config, setConfig] = useState<LeaderboardConfig | null>(null);
  const [status, setStatus] = useState<"ACTIVE" | "RESULTS" | "MAINTENANCE">("MAINTENANCE");
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    const db = getDatabase();
    const auth = getAuth();
    
    const configRef = ref(db, 'leaderboard_config');
    const unsubscribeConfig = onValue(configRef, (snapshot) => {
      if (snapshot.exists()) {
        setConfig(snapshot.val());
      } else {
        setConfig(null);
      }
    });

    const usersRef = ref(db, 'users');
    const topUsersQuery = query(usersRef, orderByChild('xp'), limitToLast(50));
    
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 5000);

    const unsubscribeUsers = onValue(topUsersQuery, (snapshot) => {
      clearTimeout(timeoutId);
      const data = snapshot.val();
      if (data) {
        const userList: Leader[] = Object.entries(data).map(([uid, uData]: [string, any]) => {
          const xp = uData.xp || 0;
          return {
            id: uid,
            name: uData.username || uData.name || 'Operator',
            score: xp,
            avatar: (uData.username?.[0] || uData.name?.[0] || 'U').toUpperCase(),
            rank: 0,
            level: Math.floor(xp / 100) + 1,
            badge: getBadgeByXP(xp),
            isCurrentUser: auth.currentUser?.uid === uid,
            trend: "stable"
          };
        });
        setLeaders(userList);
      } else {
        setLeaders([]);
      }
      setLoading(false);
    }, (error) => {
      console.error("Leaderboard fetch error:", error);
      clearTimeout(timeoutId);
      setLoading(false);
    });

    return () => {
      clearTimeout(timeoutId);
      unsubscribeConfig();
      off(usersRef, 'value', unsubscribeUsers);
    };
  }, []);

  // Dynamic Status Evaluator 
  useEffect(() => {
    if (!config) {
      setStatus("MAINTENANCE");
      return;
    }

    const evaluateStatus = () => {
      const now = Date.now();
      const roundEnd = Number(config.roundEndTime) || 0;
      const rewardEnd = Number(config.rewardEndTime) || 0;

      if (roundEnd > now) {
        setStatus("ACTIVE");
      } else if (rewardEnd > now) {
        setStatus("RESULTS");
      } else {
        setStatus("MAINTENANCE");
      }
    };

    evaluateStatus();
    const interval = setInterval(evaluateStatus, 1000);
    return () => clearInterval(interval);
  }, [config]);

  const currentUid = getAuth().currentUser?.uid;
  let allLeaders = [...leaders];

  const isUserInList = allLeaders.some(l => l.id === currentUid || l.name === stats.username);
  
  if (!isUserInList && stats.username) {
    allLeaders.push({
      id: currentUid || "temp-id",
      name: stats.username || "You",
      score: stats.xp || 0,
      avatar: (stats.username || "U").substring(0, 2).toUpperCase(),
      rank: 0, 
      level: Math.floor((stats.xp || 0) / 100) + 1,
      badge: getBadgeByXP(stats.xp || 0),
      isCurrentUser: true,
      trend: "stable"
    });
  }

  allLeaders.sort((a, b) => b.score - a.score);
  allLeaders.forEach((leader, idx) => { leader.rank = idx + 1; });

  const roundEndTime = Number(config?.roundEndTime) || 0;
  const rewardEndTime = Number(config?.rewardEndTime) || 0;
  const nextRoundStartTime = Number(config?.nextRoundStartTime) || 0;

  const { formatted: activeCountdown } = useCountdown(roundEndTime);
  const { formatted: rewardCountdown } = useCountdown(rewardEndTime);
  const { formatted: nextRoundCountdown } = useCountdown(nextRoundStartTime);

  const currentUser = allLeaders.find(l => l.isCurrentUser);
  const isQualified = currentUser && currentUser.rank <= 9;

  const filteredLeaders = allLeaders.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.badge.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const topThree = filteredLeaders.filter(l => l.rank <= 3);
  const others = filteredLeaders.filter(l => l.rank > 3);

  return (
    <div className="min-h-screen pb-40 px-4 md:px-8 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-500/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-rose-500/5 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24 pt-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/5 text-blue-400 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em] mb-6 md:mb-8 cursor-help"
          >
            <Zap className="w-3 h-3 md:w-4 md:h-4 fill-current animate-pulse" /> 
            {status === "ACTIVE" ? "ROUND ENDS IN:" : status === "RESULTS" ? "REWARD EXPIRES IN:" : "NEXT ROUND STARTS IN:"} 
            <span className="font-mono text-white ml-2 text-sm md:text-base">
              {config ? (status === "ACTIVE" ? activeCountdown : status === "RESULTS" ? rewardCountdown : nextRoundCountdown) : "--:--:--"}
            </span>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-2xl z-50">
              <div className="flex items-center gap-2">
                <Info className="w-3 h-3 text-blue-400" />
                Dominate the top 9 to qualify for big rewards
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900" />
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-black mb-8 md:mb-12 tracking-tight leading-[0.85] text-white select-none"
          >
            <motion.span 
              animate={{ 
                scale: [1, 1.02, 1],
                textShadow: [
                  "0 0 20px rgba(244,63,94,0)",
                  "0 0 40px rgba(244,63,94,0.4)",
                  "0 0 20px rgba(244,63,94,0)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-white via-rose-500 to-rose-900"
            >
              MASTER
            </motion.span> <br/> 
            <motion.span 
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                filter: ["brightness(1) contrast(1.2)", "brightness(1.5) contrast(1.5)", "brightness(1) contrast(1.2)"]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "300% auto" }}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-400 to-red-900 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
            >
              OPERATORS
            </motion.span>
          </motion.h1>
          <p className="text-slate-400 text-base md:text-xl max-w-3xl font-medium leading-relaxed px-4 italic">
            Where the high-performance operators are showcased. <br className="hidden md:block"/>
            Maximize your daily task completion to climb the ranks and unlock premium rewards.
          </p>
        </div>

        {/* Promo Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 md:mb-24">
          <div className="relative group cursor-pointer overflow-hidden rounded-[32px] md:rounded-[48px] p-1 bg-gradient-to-r from-blue-500/20 via-rose-500/20 to-blue-500/20">
            <div className="relative bg-slate-950 rounded-[30px] md:rounded-[46px] p-8 md:p-12 overflow-hidden flex flex-col md:flex-row items-center gap-8 justify-between">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
              <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left max-w-xl">
                <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
                  <Rocket className="w-3.5 h-3.5" /> High Performance Target
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight mb-4">
                  Solve Captchas to Earn <span className="text-blue-500">XP</span> & Qualify
                </h2>
                <p className="text-slate-400 text-sm md:text-base font-medium mb-8 leading-relaxed">
                  Earn big rewards by dominating the XP yields. Every solved captcha brings you closer to the Grandmaster tier.
                </p>
                <Link to="/dashboard/captcha">
                  <Button className="h-14 px-10 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-xs shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:-translate-y-1 transition-all flex items-center gap-2 group/btn">
                    Start Earning Now
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Global Controls */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-center justify-between mb-16 md:mb-20 p-3 md:p-4 rounded-[24px] md:rounded-[32px] bg-white/[0.02] border border-white/5 backdrop-blur-xl">
          <div className="relative flex items-center gap-4 px-6 py-4 md:py-6 bg-slate-950/90 rounded-[15px] border border-white/5 flex-1 w-full backdrop-blur-xl">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
              <Info className="w-5 h-5 text-rose-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-0.5">System Status</span>
              <span className="text-xs md:text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                {status === "ACTIVE" ? (
                  <>RESET IN: <span className="text-blue-400 font-mono tracking-widest">{config ? activeCountdown : "--:--:--"}</span></>
                ) : status === "RESULTS" ? (
                  <>REWARDS EXPIRE IN: <span className="text-rose-400 font-mono tracking-widest">{config ? rewardCountdown : "--:--:--"}</span></>
                ) : (
                  <>NEXT ROUND IN: <span className="text-emerald-400 font-mono tracking-widest">{config ? nextRoundCountdown : "--:--:--"}</span></>
                )}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input 
                type="text" 
                placeholder="Find operator..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 md:h-16 pl-12 pr-6 bg-white/[0.03] border border-white/5 rounded-2xl text-xs font-black uppercase tracking-widest text-white outline-none placeholder:text-slate-700" 
              />
            </div>
          </div>
        </div>

        {/* Podium Layout */}
        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center gap-6">
            <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Synchronizing Data...</span>
          </div>
        ) : status === "MAINTENANCE" ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="relative mb-12">
              <div className="absolute inset-0 bg-blue-500/20 blur-[100px] animate-pulse" />
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-[30px] md:rounded-[40px] bg-slate-900 border border-white/10 flex items-center justify-center relative z-10">
                <Clock className="w-10 h-10 md:w-16 md:h-16 text-blue-500" />
              </div>
            </div>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic text-center mb-6">
              Round is Finished
            </h3>
            <p className="text-slate-500 max-w-lg text-center mb-12 font-medium">
              The previous round has concluded. The next round will be starting soon. Get ready to dominate the next deployment.
            </p>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Estimated Deployment</span>
              <span className="text-5xl md:text-7xl font-mono font-black text-white tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-white">
                {config ? nextRoundCountdown : "--:--:--"}
              </span>
            </div>
          </div>
        ) : status === "RESULTS" ? (
          <div className="flex flex-col items-center justify-center py-10">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-2xl">
              <Card className="relative overflow-hidden bg-slate-900/50 border border-white/10 backdrop-blur-3xl rounded-[40px] md:rounded-[56px] p-8 md:p-14">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.15)_0%,transparent_70%)]" />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center mb-10 shadow-2xl transition-all duration-700", isQualified ? "bg-emerald-500 text-slate-950 scale-110 shadow-emerald-500/20" : "bg-rose-500/20 text-rose-500 border border-rose-500/30")}>
                    {isQualified ? <Trophy className="w-10 h-10" /> : <AlertCircle className="w-10 h-10" />}
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 italic uppercase">
                    {isQualified ? "Round Cleared" : "Non-Qualifying Rank"}
                  </h2>
                  <div className="grid grid-cols-2 gap-4 w-full mb-10">
                    <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 flex flex-col items-center">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Global Rank</span>
                      <span className={cn("text-3xl font-mono font-black", currentUser ? "text-blue-400" : "text-slate-700")}>#{currentUser?.rank || "??"}</span>
                    </div>
                    <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 flex flex-col items-center">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Yield</span>
                      <span className="text-3xl font-mono font-black text-white">{currentUser?.score.toLocaleString() || "0"} XP</span>
                    </div>
                  </div>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />
                  {isQualified ? (
                    <div className="w-full">
                      <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-6">Congratulations on winning</p>
                      <button onClick={() => setShowCode(!showCode)} className="relative w-full h-20 rounded-2xl bg-slate-950 border border-white/10 flex items-center justify-between px-8 overflow-hidden group/btn active:scale-95 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                            <Gift className="w-5 h-5 text-blue-500" />
                          </div>
                          <div className="flex flex-col items-start translate-y-0.5">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Reward Voucher</span>
                            <span className="text-xl font-mono font-black text-white tracking-widest">
                              {showCode ? config?.rewardCode : "•••• •••• ••••"}
                            </span>
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover/btn:bg-white/10 transition-colors">
                          {showCode ? <EyeOff className="w-5 h-5 text-slate-400" /> : <Eye className="w-5 h-5 text-blue-500" />}
                        </div>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <p className="text-slate-400 text-sm md:text-base font-medium max-w-sm leading-relaxed mb-8">
                        Your rank is below the required rank to qualify for the reward. Maintain high performance in the next deployment to secure a top 9 position.
                      </p>
                      <Link to="/dashboard/captcha">
                        <Button className="h-14 px-10 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-xs shadow-[0_10px_30px_rgba(37,99,235,0.3)] flex items-center gap-2 group/btn">
                          Prepare for Next Round
                          <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 lg:gap-12 mb-24 md:mb-32 items-end">
              <PodiumCard leader={topThree.find(l => l.rank === 2)} rank={2} delay={0.4} />
              <PodiumCard leader={topThree.find(l => l.rank === 1)} rank={1} delay={0.2} />
              <PodiumCard leader={topThree.find(l => l.rank === 3)} rank={3} delay={0.6} />
            </div>

            {others.length > 0 && (
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent rounded-[24px] md:rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative bg-white/[0.03] backdrop-blur-3xl rounded-[24px] md:rounded-[40px] border border-white/10 overflow-hidden shadow-2xl">
                  <div className="grid grid-cols-12 gap-4 px-6 md:px-10 py-5 md:py-6 border-b border-white/10 bg-white/[0.03]">
                    <div className="col-span-2 sm:col-span-1 text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Rank</div>
                    <div className="col-span-7 sm:col-span-7 md:col-span-8 text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Operator Identification</div>
                    <div className="col-span-3 sm:col-span-4 md:col-span-3 text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-left pl-4">XP</div>
                  </div>
                  <div className="divide-y divide-white/5 font-mono">
                    <AnimatePresence mode="popLayout">
                      {others.map((leader, index) => (
                        <motion.div 
                          layout key={leader.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                          className={cn("grid grid-cols-12 gap-4 items-center px-6 md:px-10 py-5 md:py-6 transition-all", leader.isCurrentUser && "bg-blue-500/5 border-y border-blue-500/10")}
                        >
                          <div className="col-span-2 sm:col-span-1">
                            <span className={cn("text-lg md:text-xl font-black transition-all font-mono tracking-tighter", leader.isCurrentUser ? "text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" : "text-slate-600")}>
                              {leader.rank.toString().padStart(2, '0')}
                            </span>
                          </div>
                          <div className="col-span-7 sm:col-span-7 md:col-span-8 flex items-center gap-4 md:gap-8 font-sans">
                            <div className="relative shrink-0">
                              <div className={cn("w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl border-2 flex items-center justify-center text-sm md:text-lg font-black relative overflow-hidden", leader.isCurrentUser ? "bg-blue-600/20 border-blue-400 text-white" : "bg-white/[0.02] border-white/10 text-white")}>
                                {leader.avatar}
                              </div>
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className={cn("text-base md:text-xl font-black tracking-tight uppercase truncate italic", leader.isCurrentUser ? "text-blue-200" : "text-white")}>
                                {leader.name}
                              </span>
                            </div>
                          </div>
                          <div className="col-span-3 sm:col-span-4 md:col-span-3 text-left pl-4">
                            <span className={cn("text-lg md:text-2xl font-black font-mono tracking-tighter", leader.isCurrentUser ? "text-blue-400" : "text-slate-300")}>
                              {leader.score.toLocaleString()} <span className="text-[10px] text-slate-600">XP</span>
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Global Stats Footer */}
        <div className="mt-24 md:mt-40 flex justify-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative group h-64 md:h-80 w-full max-w-2xl">
            <div className="absolute inset-0 blur-[120px] opacity-20 transition-opacity group-hover:opacity-30 rounded-full bg-blue-600" />
            <div className="absolute inset-0 rounded-[48px] p-[2px] overflow-hidden">
              <div className="absolute inset-0 bg-slate-900" />
              <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg_at_50%_50%,#3b82f6_0%,transparent_20%,transparent_80%,#3b82f6_100%)] animate-[spin_4s_linear_infinite] opacity-40" />
              <div className="relative h-full w-full p-8 md:p-12 rounded-[46px] bg-slate-950/90 flex flex-col justify-end overflow-hidden group hover:bg-slate-900/90 transition-all backdrop-blur-3xl">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-all duration-700 pointer-events-none transform translate-x-1/4 -translate-y-1/4 group-hover:translate-x-0 group-hover:translate-y-0">
                  <Target className="w-64 h-64 md:w-80 md:h-80 text-blue-500" />
                </div>
                <div className="relative z-10 flex flex-col">
                  <p className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-[0.5em] mb-3">Active Members</p>
                  <p className="text-5xl md:text-8xl font-mono font-black text-white tracking-tighter leading-none">{allLeaders.length.toLocaleString()}</p>
                  <p className="mt-6 text-xs md:text-sm text-blue-500/80 font-bold tracking-widest uppercase flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> Users Currently Ranked
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
