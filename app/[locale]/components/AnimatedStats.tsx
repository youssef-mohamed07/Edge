'use client';

import { useEffect, useRef, useState } from 'react';

interface StatItem {
  number: string;
  label: string;
}

interface AnimatedStatsProps {
  stats: StatItem[];
  isRTL?: boolean;
  className?: string;
}

export function AnimatedStats({ stats, isRTL = false, className = '' }: AnimatedStatsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState<string[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const animateNumbers = () => {
      stats.forEach((stat, index) => {
        const numericValue = parseInt(stat.number.replace(/,/g, ''));
        let currentValue = 0;
        const increment = numericValue / 60; // 60 frames for smooth animation
        
        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= numericValue) {
            currentValue = numericValue;
            clearInterval(timer);
          }
          
          setAnimatedNumbers(prev => {
            const newNumbers = [...prev];
            newNumbers[index] = currentValue.toLocaleString();
            return newNumbers;
          });
        }, 16); // ~60fps
      });
    };

    // Initialize with zeros
    setAnimatedNumbers(stats.map(() => '0'));
    
    // Start animation after a short delay
    setTimeout(animateNumbers, 300);
  }, [isVisible, stats]);

  return (
    <div 
      ref={statsRef}
      className={`grid grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}
    >
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`
            text-center group cursor-pointer
            transition-all duration-500 ease-out
            hover:-translate-y-2 hover:scale-105
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
          style={{ transitionDelay: `${index * 150}ms` }}
        >
          <div className="relative">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-royal-azure/20 to-[#60A5FA]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Content */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 group-hover:bg-white/90 group-hover:border-royal-azure/30 transition-all duration-300">
              <div className={`text-3xl lg:text-4xl font-bold text-true-cobalt mb-2 ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
                {animatedNumbers[index] || stat.number}
              </div>
              <div className={`text-sm text-true-cobalt/70 font-medium ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
                {stat.label}
              </div>
              
              {/* Animated underline */}
              <div className="mt-3 h-1 bg-gradient-to-r from-royal-azure to-[#60A5FA] rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface CounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function Counter({ end, duration = 2000, prefix = '', suffix = '', className = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

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

    if (counterRef.current) {
      observer.observe(counterRef.current);
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
      
      // Easing function for smooth animation
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
    <span ref={counterRef} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}