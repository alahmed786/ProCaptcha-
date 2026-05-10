import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TerminalSquare, Twitter, Github, Linkedin, Send, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";
import { motion, AnimatePresence } from "motion/react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-color)] glass-panel bg-[var(--nav-bg)] mt-20 relative z-10 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-start gap-3 mb-4 group w-fit">
              <div className="relative mt-1">
                <div className="absolute inset-0 bg-rose-500 blur-md opacity-0 group-hover:opacity-50 transition-opacity" />
                <span className="material-symbols-outlined text-rose-500 relative z-10" style={{ fontSize: '32px' }}>fingerprint</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-['Caveat'] font-bold tracking-wider text-transparent bg-clip-text bg-[image:var(--brand-gradient)] drop-shadow-[0_0_8px_rgba(244,63,94,0.3)]">
                  ProCaptcha
                </span>
              </div>
            </Link>
            <p className="text-[var(--text-secondary)] mt-2 max-w-md leading-relaxed text-sm mb-6">
              Solve. Verify. Earn Rewards. Platform for mobile-first micro-tasks, Points Rewards, and ad-solving. Get paid for every captcha verified.
            </p>
            <div className="flex items-center gap-4 mb-6">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all">
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

        </div>
        <div className="mt-16 pt-8 border-t border-[var(--border-color)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--text-secondary)] font-mono flex items-center gap-1">
            &copy; {new Date().getFullYear()} ProCaptcha Inc. <span className="font-['Caveat'] font-bold text-transparent bg-clip-text bg-[image:var(--brand-gradient)] drop-shadow-[0_0_5px_rgba(244,63,94,0.3)] text-sm ml-1">neXBot</span>.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
