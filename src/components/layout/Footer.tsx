import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TerminalSquare, Twitter, Github, Linkedin, Send, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";
import { motion, AnimatePresence } from "motion/react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 glass-panel bg-[#020617]/50 mt-20 relative z-10">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-start gap-3 mb-4 group w-fit">
              <div className="relative mt-1">
                <div className="absolute inset-0 bg-rose-500 blur-md opacity-0 group-hover:opacity-50 transition-opacity" />
                <span className="material-symbols-outlined text-rose-500 relative z-10" style={{ fontSize: '32px' }}>fingerprint</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-['Caveat'] font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]">
                  ProCaptcha
                </span>
              </div>
            </Link>
            <p className="text-slate-400 mt-2 max-w-md leading-relaxed text-sm mb-6">
              The premium environment for professional AI Prompt Engineers. Test, enhance, and deploy sophisticated workflows across models instantly.
            </p>
            <div className="flex items-center gap-4 mb-6">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <span className="flex w-fit items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)] bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              System Operational
            </span>
          </div>

          <div>
             <h3 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Resources</h3>
             <ul className="space-y-3">
               <li><Link to="/docs" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">API Documentation</Link></li>
               <li><Link to="/debug" className="text-sm text-slate-400 hover:text-rose-400 transition-colors">Debug Console</Link></li>
             </ul>
          </div>

        </div>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 font-mono">
            &copy; {new Date().getFullYear()} ProCaptcha Inc. Global Network.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-xs text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-slate-500 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
