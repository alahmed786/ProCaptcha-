import React from "react";
import { cn } from "../../lib/utils";
import { motion, HTMLMotionProps } from "motion/react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const variants = {
      primary: "bg-blue-600 text-white font-semibold hover:bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)] border border-blue-400/30",
      secondary: "glass-panel text-white hover:bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]",
      outline: "glass-panel bg-transparent text-white border border-white/20 hover:border-blue-500/50 hover:bg-blue-500/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] text-blue-200",
      ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-white/5",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ 
          scale: 1.03, 
          y: -2,
          boxShadow: variant === "primary" ? "0 10px 40px rgba(59,130,246,0.4)" : "0 10px 30px rgba(0,0,0,0.2)"
        }}
        whileTap={{ scale: 0.95, y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 20,
          mass: 0.5 
        }}
        className={cn(
          "rounded-xl transition-all flex items-center justify-center gap-2 relative overflow-hidden",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {/* Hover Background Glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          initial={false}
          animate={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />

        {variant === "primary" && (
           <motion.span 
             animate={{ 
               translateX: ["-150%", "150%"]
             }}
             transition={{ 
               duration: 3, 
               repeat: Infinity, 
               ease: "linear",
               delay: Math.random() * 2
             }}
             className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" 
           />
        )}
        
        <span className="relative z-10 flex items-center gap-2 justify-center w-full h-full">
           {children}
        </span>
      </motion.button>
    );
  }
);
Button.displayName = "Button";
