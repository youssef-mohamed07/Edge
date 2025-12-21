'use client';

import { useEffect, useState } from 'react';

interface AnimatedTitleProps {
  text: string;
  className?: string;
  delay?: number;
  isRTL?: boolean;
}

export function AnimatedTitle({ 
  text, 
  className = '', 
  delay = 0,
  isRTL = false 
}: AnimatedTitleProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <h1 
      className={`
        transition-all duration-1000 ease-out
        ${isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-95'
        }
        ${isRTL ? 'text-right font-[var(--font-cairo)]' : ''}
        ${className}
      `}
    >
      {text}
    </h1>
  );
}

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  isRTL?: boolean;
}

export function TypewriterText({ 
  text, 
  speed = 50, 
  delay = 0,
  className = '',
  isRTL = false
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      if (currentIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);

        return () => clearTimeout(timer);
      } else {
        // Hide cursor after typing is complete
        setTimeout(() => setShowCursor(false), 1000);
      }
    }, delay);

    return () => clearTimeout(startTimer);
  }, [currentIndex, text, speed, delay]);

  return (
    <span 
      className={`
        ${isRTL ? 'font-[var(--font-cairo)]' : ''}
        ${className}
      `}
    >
      {displayText}
      {showCursor && (
        <span className="animate-pulse text-royal-azure ml-1">|</span>
      )}
    </span>
  );
}

interface GradientTextProps {
  text: string;
  className?: string;
  isRTL?: boolean;
}

export function GradientText({ text, className = '', isRTL = false }: GradientTextProps) {
  return (
    <span 
      className={`
        bg-gradient-to-r from-true-cobalt via-royal-azure to-[#60A5FA] 
        bg-clip-text text-transparent
        animate-[gradientShift_3s_ease_infinite]
        ${isRTL ? 'font-[var(--font-cairo)]' : ''}
        ${className}
      `}
    >
      {text}
    </span>
  );
}