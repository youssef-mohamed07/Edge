"use client";

import { ReactNode } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  type = "button",
  className = "",
  onClick,
}: ButtonProps) {
  const { dir } = useLanguage();
  const baseStyles = `inline-flex items-center justify-center font-semibold tracking-wide transition-colors ${dir === "rtl" ? "font-[var(--font-cairo)]" : ""}`;
  
  const variants = {
    primary: "bg-[#1A4AFF] text-white hover:bg-[#122D8B]",
    secondary: "bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#122D8B]",
    outline: "bg-transparent text-[#122D8B] border-2 border-[#122D8B] hover:bg-[#122D8B] hover:text-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-base",
  };

  const styles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={styles}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={styles}>
      {children}
    </button>
  );
}
