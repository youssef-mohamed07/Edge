"use client";

import { useState, useEffect } from "react";

interface TypewriterTitleProps {
  text: string;
  isVisible: boolean;
  className?: string;
}

export function TypewriterTitle({ text, isVisible, className = "" }: TypewriterTitleProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    setIsTyping(true);
    let currentIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [isVisible, text]);

  return (
    <span className={className}>
      {displayedText}
      {isTyping && <span className="animate-pulse text-royal-azure">|</span>}
    </span>
  );
}
