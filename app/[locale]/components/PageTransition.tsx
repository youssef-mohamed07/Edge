'use client';

import { useEffect, useState } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`transition-all duration-1000 ease-out ${
        isLoaded 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
}

interface StaggeredAnimationProps {
  children: React.ReactNode[];
  delay?: number;
  className?: string;
}

export function StaggeredAnimation({ 
  children, 
  delay = 150, 
  className = '' 
}: StaggeredAnimationProps) {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    children.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(prev => [...prev, index]);
      }, index * delay);
    });
  }, [children, delay]);

  return (
    <div className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={`transition-all duration-700 ease-out ${
            visibleItems.includes(index)
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-6 scale-95'
          }`}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

interface FadeInOnScrollProps {
  children: React.ReactNode;
  threshold?: number;
  className?: string;
}

export function FadeInOnScroll({ 
  children, 
  threshold = 0.1, 
  className = '' 
}: FadeInOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    const element = document.querySelector(`[data-fade-in]`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      data-fade-in
      className={`transition-all duration-1000 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {children}
    </div>
  );
}