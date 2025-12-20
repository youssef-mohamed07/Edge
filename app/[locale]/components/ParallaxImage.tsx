'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
}

export function ParallaxImage({ 
  src, 
  alt, 
  speed = 0.5, 
  className = '' 
}: ParallaxImageProps) {
  const [offset, setOffset] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current) return;
      
      const rect = imageRef.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight && rect.bottom > 0) {
        const parallax = (scrolled - elementTop) * speed;
        setOffset(parallax);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={imageRef} className={`relative overflow-hidden ${className}`}>
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          transform: `translateY(${offset}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}

interface HoverScaleImageProps {
  src: string;
  alt: string;
  className?: string;
  scale?: number;
}

export function HoverScaleImage({ 
  src, 
  alt, 
  className = '',
  scale = 1.1
}: HoverScaleImageProps) {
  return (
    <div className={`relative overflow-hidden group ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#122D8B]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

interface RevealImageProps {
  src: string;
  alt: string;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  className?: string;
}

export function RevealImage({ 
  src, 
  alt, 
  direction = 'left',
  className = '' 
}: RevealImageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

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

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const directionClasses = {
    left: isVisible ? 'translate-x-0' : '-translate-x-full',
    right: isVisible ? 'translate-x-0' : 'translate-x-full',
    top: isVisible ? 'translate-y-0' : '-translate-y-full',
    bottom: isVisible ? 'translate-y-0' : 'translate-y-full'
  };

  return (
    <div ref={imageRef} className={`relative overflow-hidden ${className}`}>
      <div 
        className={`
          absolute inset-0 w-full h-full
          transition-transform duration-1000 ease-out
          ${directionClasses[direction]}
        `}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}