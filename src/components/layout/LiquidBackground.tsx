import React from "react";
import { motion } from "motion/react";

export function LiquidBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dark Base */}
      <div className="absolute inset-0 bg-[var(--bg-color)] transition-colors duration-300" />
      
      {/* Grid line overlay with fade */}
      <div className="absolute inset-0 bg-grid-white opacity-[var(--grid-opacity)]" />

      {/* Liquid Blobs */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
          willChange: "transform"
        }}
        className="absolute top-[20%] left-[20%] w-[50vw] h-[50vw] bg-[#1d4ed8]/30 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen will-change-transform opacity-60 dark:opacity-100"
      />

      <motion.div
        animate={{
          x: [0, -150, 50, 0],
          y: [0, 100, -100, 0],
          scale: [1, 0.9, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          willChange: "transform",
        }}
        className="absolute top-[10%] right-[10%] w-[40vw] h-[40vw] bg-[#e11d48]/15 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen will-change-transform opacity-60 dark:opacity-100"
      />

      <motion.div
        animate={{
          x: [0, 100, -100, 0],
          y: [0, 50, -50, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
          willChange: "transform",
        }}
        className="absolute bottom-[10%] left-[30%] w-[60vw] h-[60vw] bg-[#be185d]/10 rounded-full blur-[140px] mix-blend-multiply dark:mix-blend-screen will-change-transform opacity-60 dark:opacity-100"
      />
      
      {/* Global Noise - 2% subtle */}
      <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-[0.02]" />
    </div>
  );
}
