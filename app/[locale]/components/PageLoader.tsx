'use client';

import { useEffect, useState } from 'react';

interface PageLoaderProps {
  isRTL?: boolean;
}

export function PageLoader({ isRTL = false }: PageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#122D8B] to-[#1A4AFF] animate-[fadeOut_0.5s_ease-out_1.5s_forwards]">
      <div className="text-center">
        {/* Logo or Brand */}
        <div className="mb-8">
          <h1 className={`text-4xl font-bold text-white mb-2 ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
            {isRTL ? 'إيدج' : 'EDGE'}
          </h1>
          <p className={`text-white/70 text-sm ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
            {isRTL ? 'للملابس' : 'for Garments'}
          </p>
        </div>

        {/* Loading Animation */}
        <div className="relative w-64 h-2 bg-white/20 rounded-full overflow-hidden mb-4">
          <div 
            className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
        </div>

        {/* Loading Text */}
        <p className={`text-white/60 text-xs mt-4 ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
          {isRTL ? 'جاري التحميل...' : 'Loading...'}
        </p>
      </div>
    </div>
  );
}

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export function LoadingSpinner({ size = 'md', color = '#1A4AFF' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex justify-center items-center">
      <div 
        className={`${sizeClasses[size]} border-2 border-gray-200 border-t-[${color}] rounded-full animate-spin`}
      />
    </div>
  );
}