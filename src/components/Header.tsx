import React from 'react';
import { Eye, Bookmark, Clock, Sparkles, BookOpen } from 'lucide-react';
import { EyeCareSettings } from '../types';

interface HeaderProps {
  onOpenEyeCare: () => void;
  onOpenTimer: () => void;
  onOpenSaved: () => void;
  onReplayIntro: () => void;
  savedCount: number;
  eyeCareSettings: EyeCareSettings;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenEyeCare,
  onOpenTimer,
  onOpenSaved,
  onReplayIntro,
  savedCount,
  eyeCareSettings,
  onNavigateSection,
}) => {
  const getThemeLabel = () => {
    switch (eyeCareSettings.mode) {
      case 'eyecare':
        return 'Eye Care Sepia';
      case 'midnight':
        return 'Midnight Dark';
      case 'studio':
        return 'Studio Day';
      case 'parchment':
        return 'Parchment';
      default:
        return 'Eye Care';
    }
  };

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-8 px-4 sm:px-8 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--bg-card)]/95 backdrop-blur-md transition-colors">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="flex items-center gap-2.5 text-base sm:text-lg font-serif font-bold tracking-tight text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors whitespace-nowrap shrink-0"
      >
        <BookOpen className="w-5 h-5 text-[var(--accent)] shrink-0" strokeWidth={1.75} />
        <span>CBSE Humanities Archive</span>
      </a>

      {/* Zone 2: 4-5 concise single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-[var(--text-secondary)]">
        <button
          onClick={() => onNavigateSection('academic-compendium')}
          className="hover:text-[var(--text-primary)] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Official Segments (SQP/MS/QB)
        </button>

        <button
          onClick={() => onNavigateSection('repository')}
          className="hover:text-[var(--text-primary)] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Papers Archive (2,092)
        </button>

        <button
          onClick={() => onNavigateSection('years')}
          className="hover:text-[var(--text-primary)] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Year Timeline
        </button>

        <button
          onClick={onOpenSaved}
          className="hover:text-[var(--text-primary)] transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Saved Papers</span>
          {savedCount > 0 && (
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-semibold">
              {savedCount}
            </span>
          )}
        </button>

        <button
          onClick={onOpenTimer}
          className="hover:text-[var(--text-primary)] transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Exam Simulator</span>
        </button>

        <button
          onClick={onReplayIntro}
          className="hover:text-[var(--text-primary)] transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Replay Intro</span>
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Mobile quick icons */}
        <div className="flex md:hidden items-center gap-1">
          <button
            onClick={onOpenSaved}
            className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] relative"
            title="Saved Papers"
          >
            <Bookmark className="w-4 h-4" />
            {savedCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[var(--accent)]" />
            )}
          </button>
          <button
            onClick={onOpenTimer}
            className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            title="Exam Simulator"
          >
            <Clock className="w-4 h-4" />
          </button>
        </div>

        {/* Primary Action Button: Eye Care Mode Configurator */}
        <button
          onClick={onOpenEyeCare}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface)]/80 text-[var(--text-primary)] text-xs font-mono transition-all shadow-2xs cursor-pointer whitespace-nowrap shrink-0"
        >
          <Eye className="w-3.5 h-3.5 text-[var(--accent-amber)]" />
          <span className="font-medium">{getThemeLabel()}</span>
        </button>
      </div>
    </header>
  );
};
