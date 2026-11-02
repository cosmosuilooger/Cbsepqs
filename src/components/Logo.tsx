import React from 'react';
import { BookOpen, Globe } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div className={`relative flex items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-2xs ${iconSizes[size]}`}>
        <div className="absolute inset-0.5 rounded-lg border border-dashed border-[var(--accent)] opacity-40" />
        <BookOpen className="w-4 h-4 text-[var(--accent)]" strokeWidth={2} />
        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[var(--accent-amber)] flex items-center justify-center text-[8px] font-mono text-white font-bold">
          XII
        </div>
      </div>
      <div className="flex flex-col">
        <span className={`font-serif font-bold tracking-tight text-[var(--text-primary)] leading-none ${textSizes[size]}`}>
          CBSE Humanities
        </span>
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-muted)] mt-0.5">
          Official Papers Archive
        </span>
      </div>
    </div>
  );
};
