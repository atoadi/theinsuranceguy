"use client";
import { motion } from "framer-motion";

export const LogoIcon = ({ className = "w-10 h-10" }: { className?: string }) => {
  return (
    <div className={className}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* The World / The Scope (Emerald 900) */}
        <circle cx="50" cy="50" r="50" fill="#022c22" />
        
        {/* The "True North" Indicator - A sharp geometric needle pointing Northeast */}
        {/* This represents Expert Direction and "Moving Forward" */}
        <motion.path
          d="M50 20L65 50L50 80L35 50L50 20Z"
          fill="#10b981" /* Emerald 500 - The "Spark" of Clarity */
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "backOut", delay: 0.2 }}
        />
        
        {/* The Central Pivot (The Advisor) */}
        <circle cx="50" cy="50" r="4" fill="#022c22" />
      </svg>
    </div>
  );
};