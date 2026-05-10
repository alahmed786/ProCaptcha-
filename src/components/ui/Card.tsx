import React from "react";
import { cn } from "../../lib/utils";
import { motion, HTMLMotionProps } from "motion/react";

interface CardProps extends HTMLMotionProps<"div"> {
  glass?: boolean;
  glow?: "blue" | "cyan" | "none";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glass = true, glow = "none", children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -2 }}
        className={cn(
          "rounded-2xl relative overflow-hidden",
          glass ? "glass-panel" : "bg-[#111827] border border-white/5",
          glow === "blue" && "shadow-[0_0_20px_rgba(59,130,246,0.3)] border-blue-500/30",
          glow === "cyan" && "shadow-[0_0_20px_rgba(0,243,255,0.3)] border-cyan-500/30",
          className
        )}
        {...props}
      >
        {/* Subtle noise layer inside card */}
        {glass && <div className="absolute inset-0 bg-noise mix-blend-overlay pointer-events-none rounded-2xl" />}
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </motion.div>
    );
  }
);
Card.displayName = "Card";
