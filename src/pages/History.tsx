import React from "react";
import { motion } from "motion/react";
import { 
  History as HistoryIcon, 
  ArrowDownLeft, 
  Clock, 
  AlertCircle,
  CheckCircle2,
  Clock4,
  XCircle,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { cn } from "../lib/utils";

const MOCK_WITHDRAWALS = [
  { id: 1, amount: 150.00, method: "USDT (TRC20)", status: "completed", timestamp: "2024-05-07 14:23:45", address: "TX7g...9kL2" },
  { id: 2, amount: 85.50, method: "Bitcoin", status: "pending", timestamp: "2024-05-08 09:12:10", address: "bc1q...v5a9" },
  { id: 3, amount: 320.00, method: "Ethereum", status: "completed", timestamp: "2024-05-05 18:45:30", address: "0x74...fE81" },
  { id: 4, amount: 45.00, method: "USDT (TRC20)", status: "failed", timestamp: "2024-05-04 11:20:00", address: "TYm2...3pX9" },
  { id: 5, amount: 1200.00, method: "Bank Transfer", status: "completed", timestamp: "2024-05-02 16:10:15", address: "IBAN ...9821" },
];

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    completed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    failed: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  }[status as keyof typeof styles];

  const icons = {
    completed: <CheckCircle2 className="w-3 h-3" />,
    pending: <Clock4 className="w-3 h-3" />,
    failed: <XCircle className="w-3 h-3" />,
  }[status as keyof typeof icons];

  return (
    <div className={cn("px-2.5 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5", styles)}>
      {icons}
      {status}
    </div>
  );
};

export function History() {
  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header section with note */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="md:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase">
              WITHDRAWAL HISTORY
            </h1>
            <p className="text-slate-500 text-[10px] md:text-sm font-medium mt-1 uppercase tracking-wider">
              Track and monitor your financial operations in the field.
            </p>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative group p-[1px] overflow-hidden rounded-2xl md:w-auto"
        >
          <div className="absolute inset-0 bg-amber-500/10" />
          <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg_at_50%_50%,#f59e0b_0%,transparent_20%,transparent_80%,#fbbf24_100%)] animate-[spin_4s_linear_infinite] opacity-40" />
          
          <div className="relative flex items-center gap-3 px-5 py-3 rounded-[15px] bg-slate-950/90 border border-amber-500/10 text-amber-500 backdrop-blur-xl group-hover:bg-slate-900/90 transition-colors">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-xs font-bold uppercase tracking-wider">
              Withdrawal history will reset in 15 days
            </p>
          </div>
        </motion.div>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {MOCK_WITHDRAWALS.map((tx, index) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="hover:bg-white/[0.04] transition-all border-white/5 group relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               
               <div className="relative z-10 p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center border",
                      tx.status === 'completed' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" :
                      tx.status === 'failed' ? "bg-rose-500/10 border-rose-500/20 text-rose-500" :
                      "bg-amber-500/10 border-amber-500/20 text-amber-500"
                    )}>
                      <ArrowDownLeft className="w-6 h-6 rotate-[135deg]" />
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm font-black text-white tracking-tight uppercase">
                          {tx.method}
                        </span>
                        <StatusBadge status={tx.status} />
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-mono text-slate-500 tracking-wider">
                          DEST: {tx.address}
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                          <Clock className="w-3 h-3 text-blue-500/50" />
                          {tx.timestamp}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xl font-mono font-black text-white">
                      +${tx.amount.toFixed(2)}
                    </span>
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] group-hover:text-blue-500 transition-colors">
                      TXID: #{Math.random().toString(36).substring(7).toUpperCase()}
                    </span>
                  </div>
               </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {MOCK_WITHDRAWALS.length === 0 && (
        <div className="text-center py-20 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl">
          <HistoryIcon className="w-12 h-12 text-slate-700 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">No Records Found</h3>
          <p className="text-slate-500 text-sm">You haven't made any withdrawals in the current cycle.</p>
        </div>
      )}
    </div>
  );
}
