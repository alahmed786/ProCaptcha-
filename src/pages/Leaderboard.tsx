import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, Medal, Star, TrendingUp, Crown, 
  ArrowUpRight, ArrowDownRight, Minus, Sparkles, 
  Zap, ShieldCheck, Flame, Target, Info, ArrowLeft, Search
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { cn } from "../lib/utils";
import { useUser } from "../context/UserContext";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, query, orderByChild, limitToLast, onValue, off } from "firebase/database";

const getBadgeByXP = (xp: number) => {
  if (xp >= 10000) return "Legendary";
  if (xp >= 5000) return "Elite";
  if (xp >= 2000) return "Master";
  if (xp >= 1000) return "Expert";
  if (xp >= 500) return "Pro";
  return "Active";
};

const PodiumCard = ({ leader, rank, delay }: { leader: any; rank: number; delay: number }) => {
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

  if (!leader) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className={cn("relative group", config?.order, isGold ? "z-20 scale-100 md:scale-110 mb-8 md:mb-12" : "z-10")}
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
              "absolute inset-0 rounded-full blur-xl opacity-30 animate-pulse",
              isGold ? "bg-yellow-500" : "bg-blue-500"
            )} />
            <div className={cn(
              "w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-2xl md:text-3xl font-black relative z-10 border-2",
              isGold ? "border-yellow-500 bg-yellow-500/10 text-yellow-500" : "border-white/10 bg-white/5 text-white"
            )}>
              {leader.avatar}
            </div>
            <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-8 h-8 md:w-10 md:h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center shadow-2xl z-20">
              <span className="text-[10px] md:text-xs font-black text-white">#{rank}</span>
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className={cn("text-[10px] font-black uppercase tracking-[0.2em]", isGold ? "text-yellow-500" : "text-slate-500")}>
                {config?.label}
              </span>
              {isGold && <Sparkles className="w-3 h-3 text-yellow-500" />}
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white mb-3 md:mb-4 tracking-tighter italic uppercase underline decoration-white/0 hover:decoration-white/20 transition-all cursor-default truncate max-w-[180px]">
              {leader.name}
            </h3>
            
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 justify-center">
                <span className="text-2xl md:text-3xl font-mono font-black text-white">${leader.earned.toFixed(0)}</span>
                <span className="text-xs md:text-sm font-mono text-white/40">.{(leader.earned % 1).toFixed(2).split('.')[1]}</span>
              </div>
              <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20">
                {leader.score.toLocaleString()} XP
              </p>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export function Leaderboard() {
  const { stats } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [dbLeaders, setDbLeaders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();
    
    // Fetch Top 10 users by XP
    const topUsersQuery = query(ref(db, 'users'), orderByChild('xp'), limitToLast(10));
    
    // Safety Fallback: Stop loading spinner if Firebase takes too long or DB is empty
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    const unsubscribe = onValue(topUsersQuery, (snapshot) => {
      clearTimeout(timeoutId); // Network responded, clear the safety timeout
      let fetchedLeaders: any[] = [];
      const currentUid = auth.currentUser?.uid;
      
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const data = childSnapshot.val();
          const name = data.username || data.name || "Operator";
          fetchedLeaders.push({
            id: childSnapshot.key,
            name: name,
            score: data.xp || 0,
            earned: data.balance || 0,
            trend: "up",
            avatar: name.substring(0, 2).toUpperCase(),
            level: Math.floor((data.xp || 0) / 100) + 1,
            badge: getBadgeByXP(data.xp || 0),
            isCurrentUser: childSnapshot.key === currentUid
          });
        });
        
        // Sort explicitly by score (highest XP first)
        fetchedLeaders.sort((a, b) => b.score - a.score);
      }

      // Assign exact ranks sequentially (1, 2, 3...)
      fetchedLeaders.forEach((leader, idx) => {
        leader.rank = idx + 1;
      });

      setDbLeaders(fetchedLeaders);
      setIsLoading(false);
    }, (error) => {
      console.error("Firebase Leaderboard Error:", error);
      clearTimeout(timeoutId);
      setIsLoading(false);
    });

    return () => {
      clearTimeout(timeoutId);
      off(topUsersQuery, 'value', unsubscribe);
    };
  }, []);
  
  const currentUid = getAuth().currentUser?.uid;
  let allLeaders = [...dbLeaders];

  // If there are >10 users and the current user missed the Top 10, append them safely to the bottom
  const isUserInTop10 = allLeaders.some(l => l.isCurrentUser);
  if (!isUserInTop10 && currentUid && stats.xp !== undefined) {
    allLeaders.push({
      id: currentUid,
      name: stats.username || "You",
      score: stats.xp || 0,
      earned: stats.balance || 0,
      trend: "stable",
      avatar: (stats.username || "U").substring(0, 2).toUpperCase(),
      rank: "-", // Unranked indicator
      level: Math.floor((stats.xp || 0) / 100) + 1,
      badge: getBadgeByXP(stats.xp || 0),
      isCurrentUser: true
    });
  }

  const filteredLeaders = allLeaders.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.badge.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const topThree = filteredLeaders.filter(l => l.rank !== "-" && l.rank <= 3);
  const others = filteredLeaders.filter(l => l.rank === "-" || l.rank > 3).sort((a, b) => {
    if (a.rank === "-") return 1;
    if (b.rank === "-") return -1;
    return a.rank - b.rank;
  });

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
            <Zap className="w-3 h-3 md:w-4 md:h-4 fill-current animate-pulse" /> WEEKLY STANDINGS
            
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-2xl z-50">
              <div className="flex items-center gap-2">
                <Info className="w-3 h-3 text-blue-400" />
                Leaderboard stats will Rest every 7 days
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
              EARNERS
            </motion.span>
          </motion.h1>
          
          <p className="text-slate-400 text-base md:text-xl max-w-3xl font-medium leading-relaxed px-4 italic">
            Where the highest-earning users are showcased. <br className="hidden md:block"/>
            Maximize your daily task completion to climb the ranks and unlock premium rewards.
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-center justify-between mb-16 md:mb-20 p-3 md:p-4 rounded-[24px] md:rounded-[32px] bg-white/[0.02] border border-white/5 backdrop-blur-xl">
          <div className="relative group flex-1 w-full p-[1px] overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-white/5" />
            <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg_at_50%_50%,#f43f5e_0%,transparent_20%,transparent_80%,#3b82f6_100%)] animate-[spin_6s_linear_infinite] opacity-30" />
            
            <div className="relative flex items-center gap-4 px-6 py-4 md:py-6 bg-slate-950/90 rounded-[15px] border border-white/5 w-full cursor-help overflow-hidden backdrop-blur-xl">
              <div className="absolute inset-0 bg-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                  <Info className="w-5 h-5 text-rose-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-0.5">System Status</span>
                  <span className="text-xs md:text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    Leaderboard stats reset every 7 days
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Find operator..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 md:h-16 pl-12 pr-6 bg-white/[0.03] border border-white/5 rounded-2xl text-xs font-black uppercase tracking-widest text-white focus:ring-1 focus:ring-blue-500/30 focus:border-blue-500/30 outline-none transition-all placeholder:text-slate-700" 
              />
            </div>
          </div>
        </div>

        {/* Podium OR Empty State Layout */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-6 w-full z-10 relative mb-24 md:mb-32">
            <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
            <span className="text-sm font-black text-blue-400 uppercase tracking-widest animate-pulse">Syncing Global Network...</span>
          </div>
        ) : allLeaders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-6 w-full z-10 relative bg-white/[0.02] border border-white/5 rounded-[40px] backdrop-blur-xl mb-24 md:mb-32 shadow-2xl">
            <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20">
              <ShieldCheck className="w-10 h-10 text-blue-400" />
            </div>
            <div className="text-center">
              <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-2">No Ranked Operators Yet</h3>
              <p className="text-slate-500 text-sm font-medium">Start solving captchas and earn weekly rewards to claim the top spot!</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 lg:gap-12 mb-24 md:mb-32 items-end">
            <PodiumCard leader={topThree.find(l => l.rank === 2)} rank={2} delay={0.4} />
            <PodiumCard leader={topThree.find(l => l.rank === 1)} rank={1} delay={0.2} />
            <PodiumCard leader={topThree.find(l => l.rank === 3)} rank={3} delay={0.6} />
          </div>
        )}

        {/* Technical Data Grid */}
        {others.length > 0 && (
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent rounded-[24px] md:rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative bg-white/[0.03] backdrop-blur-3xl rounded-[24px] md:rounded-[40px] border border-white/10 overflow-hidden shadow-2xl">
              <div className="grid grid-cols-12 gap-4 px-6 md:px-10 py-5 md:py-6 border-b border-white/10 bg-white/[0.03]">
                <div className="col-span-2 sm:col-span-1 text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Rank</div>
                <div className="col-span-7 sm:col-span-5 md:col-span-6 text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Operator Identification</div>
                <div className="hidden sm:block col-span-3 text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Performance XP</div>
                <div className="col-span-3 sm:col-span-3 md:col-span-2 text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Net Yield</div>
              </div>

              <div className="divide-y divide-white/5 font-mono">
                <AnimatePresence mode="popLayout">
                  {others.map((leader, index) => (
                    <motion.div 
                      layout
                      key={leader.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ delay: 0.1 + (index * 0.05) }}
                      className={cn(
                        "grid grid-cols-12 gap-4 items-center px-6 md:px-10 py-5 md:py-6 transition-all group/row cursor-pointer",
                        leader.isCurrentUser && "bg-blue-500/5 border-y border-blue-500/10"
                      )}
                    >
                      <div className="col-span-2 sm:col-span-1">
                        <span className={cn(
                          "text-xs md:text-sm font-black transition-colors",
                          leader.isCurrentUser ? "text-blue-400" : "text-slate-500 group-hover/row:text-blue-500"
                        )}>
                          #{leader.rank.toString().padStart(2, '0')}
                        </span>
                      </div>
                      
                      <div className="col-span-7 sm:col-span-5 md:col-span-6 flex items-center gap-3 md:gap-6 font-sans">
                        <div className="relative shrink-0">
                          <div className={cn(
                            "w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl border flex items-center justify-center text-xs md:text-sm font-black transition-all",
                            leader.isCurrentUser ? "bg-blue-600 border-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]" : "bg-black border-white/10 text-white group-hover/row:border-blue-500/50"
                          )}>
                            {leader.avatar}
                          </div>
                          <div className={cn(
                            "absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-slate-950",
                            leader.isCurrentUser ? "bg-blue-400 animate-ping" : "bg-green-500"
                          )} />
                        </div>
                        
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
                            <span className={cn(
                              "text-sm md:text-base font-black tracking-tight transition-colors uppercase truncate",
                              leader.isCurrentUser ? "text-blue-300" : "text-white group-hover/row:text-blue-400"
                            )}>
                              {leader.name}
                            </span>
                            <span className={cn(
                              "hidden xs:block px-2 py-0.5 rounded-md border text-[8px] md:text-[9px] font-black uppercase tracking-widest transition-all",
                              leader.isCurrentUser ? "bg-blue-500/20 border-blue-500/30 text-blue-300" : "bg-white/5 border border-white/5 text-slate-500 group-hover/row:border-white/10"
                            )}>
                              {leader.badge}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 md:gap-4 mt-0.5 md:mt-1">
                             <div className="flex items-center gap-1 grayscale group-hover/row:grayscale-0 transition-all">
                                <ShieldCheck className="w-2.5 h-2.5 md:w-3 md:h-3 text-emerald-500" />
                                <span className="text-[8px] md:text-[10px] font-black text-slate-600 uppercase tracking-tighter">LVL {leader.level}</span>
                             </div>
                             <div className="hidden sm:flex items-center gap-1.5">
                                <Target className="w-3 h-3 text-rose-500/50" />
                                <span className="text-[10px] font-black text-slate-600 uppercase tracking-tighter italic">Accuracy: 99%</span>
                             </div>
                          </div>
                        </div>
                      </div>

                      <div className="hidden sm:block col-span-3 text-right">
                        <div className="text-base md:text-lg font-black text-white group-hover/row:text-blue-400 transition-colors">
                          {leader.score.toLocaleString()} XP
                        </div>
                      </div>

                      <div className="col-span-3 sm:col-span-3 md:col-span-2 text-right">
                        <div className="flex flex-col items-end gap-0.5 md:gap-1">
                          <div className="flex items-center gap-1.5 md:gap-2">
                             <span className="text-sm md:text-base font-black text-blue-500 tracking-tighter">
                               ${leader.earned.toFixed(2)}
                             </span>
                          </div>
                          <div className="h-1 w-8 md:w-12 bg-white/5 rounded-full overflow-hidden">
                             <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: `${Math.min((leader.score / 15000) * 100, 100)}%` }}
                                className="h-full bg-blue-500"
                             />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
