import * as React from "react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // UPDATED: Added 'rounded-full' to match index123.html
          "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 focus-visible:outline-none disabled:opacity-50",
          
          // VARIANT: PRIMARY (The Emerald Button with Shadow)
          variant === "primary" && "bg-[#047857] text-white hover:bg-[#064e3b] hover:-translate-y-1 shadow-[0_10px_25px_rgba(4,120,87,0.25)]",
          
          // VARIANT: OUTLINE (The White Button)
          variant === "outline" && "bg-white text-[#047857] border border-[#047857] hover:bg-[#f0fdf4] hover:-translate-y-1",
          
          // VARIANT: DESTRUCTIVE (Emergency Red)
          variant === "destructive" && "bg-[#fee2e2] text-[#ef4444] hover:bg-[#fecaca] hover:scale-105",

          // SIZES
          size === "sm" && "h-10 px-6 text-sm",
          size === "md" && "h-12 px-8 text-base",
          size === "lg" && "h-14 px-10 text-lg", // Bigger, luxury click area
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }