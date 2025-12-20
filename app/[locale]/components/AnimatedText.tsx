'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  isRTL?: boolean;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'typewriter';
}

export function AnimatedText({ 
  text, 
  className = '', 
  delay = 0,
  isRTL = false,
  animation = 'fadeIn'
}: AnimatedTextProps) {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const animationClasses = {
    fadeIn: isVisible ? 'opacity-100' : 'opacity-0',
    slideUp: isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
    slideLeft: isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8',
    slideRight: isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8',
    typewriter: isVisible ? 'opacity-100' : 'opacity-0'
  };

  return (
    <div 
      ref={textRef}
      className={`
        transition-all duration-1000 ease-out
        ${animationClasses[animation]}
        ${isRTL ? 'text-right font-[var(--font-cairo)]' : ''}
        ${className}
      `}
    >
      {animation === 'typewriter' ? (
        <TypewriterEffect text={text} isVisible={isVisible} />
      ) : (
        text
      )}
    </div>
  );
}

interface TypewriterEffectProps {
  text: string;
  isVisible: boolean;
  speed?: number;
}

function TypewriterEffect({ text, isVisible, speed = 50 }: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed, isVisible]);

  return (
    <span>
      {displayText}
      {currentIndex < text.length && (
        <span className="animate-pulse text-[#1A4AFF]">|</span>
      )}
    </span>
  );
}

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  isRTL?: boolean;
}

export function CountUp({ 
  end, 
  duration = 2000, 
  prefix = '', 
  suffix = '',
  className = '',
  isRTL = false
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const startCount = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * (end - startCount) + startCount);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span 
      ref={countRef}
      className={`
        ${isRTL ? 'font-[var(--font-cairo)]' : ''}
        ${className}
      `}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  wordDelay?: number;
  isRTL?: boolean;
}

export function WordReveal({ 
  text, 
  className = '', 
  delay = 0,
  wordDelay = 100,
  isRTL = false
}: WordRevealProps) {
  const [visibleWords, setVisibleWords] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  
  const words = text.split(' ');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;

    words.forEach((_, index) => {
      setTimeout(() => {
        setVisibleWords(prev => [...prev, index]);
      }, index * wordDelay);
    });
  }, [isVisible, words, wordDelay]);

  return (
    <div 
      ref={textRef}
      className={`
        ${isRTL ? 'text-right font-[var(--font-cairo)]' : ''}
        ${className}
      `}
    >
      {words.map((word, index) => (
        <span
          key={index}
          className={`
            inline-block transition-all duration-500 ease-out mr-1
            ${visibleWords.includes(index)
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
            }
          `}
        >
          {word}
        </span>
      ))}
    </div>
  );
}