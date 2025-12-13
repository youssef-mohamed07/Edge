import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`bg-white p-8 border border-[#D8DDE9] ${
        hover ? "hover:shadow-md hover:border-[#1A4AFF]/30 transition-all" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
