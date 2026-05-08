import React from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export function Account() {
  const userName = "Ahmed";
  const userEmail = "ahmedalirutf@gmail.com";

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8 h-full overflow-y-auto w-full max-w-[1400px] mx-auto font-sans relative">
      <div>
        <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2">Account Details</h1>
        <p className="text-sm text-slate-400">View your current account information.</p>
      </div>

      <Card glass className="p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden bg-gradient-to-br from-[#020617]/80 to-[#0f172a]/80 border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1)_0%,transparent_60%)] opacity-50" />
        
        <div className="relative z-10 flex flex-col gap-4">
           {/* Info group */}
           <div className="flex flex-col gap-1">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-widest">Username</span>
              <div className="text-xl md:text-2xl font-bold text-white">
                 {userName}
              </div>
           </div>
           
           <div className="flex flex-col gap-1">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-widest">Email Address</span>
              <div className="text-xl md:text-2xl font-bold text-white">
                 {userEmail}
              </div>
           </div>
        </div>

        <div className="relative z-10 pt-6 mt-2 border-t border-white/10">
           <p className="text-slate-400 text-sm">
              <span className="text-blue-400 font-semibold">Note:</span> To change username, email, and password, changes can be done in app.
           </p>
        </div>
      </Card>
    </div>
  );
}
