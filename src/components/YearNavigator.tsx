import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { ALL_YEARS } from '../data/papers';

interface YearNavigatorProps {
  selectedYear: string;
  onSelectYear: (year: string) => void;
  yearCounts: Record<string, number>;
  totalFilteredCount: number;
}

export const YearNavigator: React.FC<YearNavigatorProps> = ({
  selectedYear,
  onSelectYear,
  yearCounts,
  totalFilteredCount,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -240 : 240;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative py-2 border-y border-[var(--border-subtle)] bg-[var(--bg-card)]/50">
      <div className="flex items-center justify-between gap-3 px-1 sm:px-2">
        {/* Label */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] shrink-0 pr-3 border-r border-[var(--border-subtle)]">
          <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span>Academic Year:</span>
        </div>

        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="p-1.5 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] shrink-0 transition-colors cursor-pointer"
          title="Scroll Left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scrollable Year Buttons */}
        <div
          ref={scrollContainerRef}
          className="flex-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* All Years Button */}
          <button
            onClick={() => onSelectYear('All')}
            className={`px-3 py-1.5 rounded-md text-xs font-mono whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedYear === 'All'
                ? 'bg-[var(--accent)] text-white font-semibold shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
            }`}
          >
            <span>All Years</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded ${
                selectedYear === 'All' ? 'bg-white/20 text-white' : 'bg-[var(--bg-surface)] text-[var(--text-muted)]'
              }`}
            >
              {totalFilteredCount}
            </span>
          </button>

          {/* Individual Years */}
          {ALL_YEARS.map((yr) => {
            const count = yearCounts[yr] || 0;
            const isSelected = selectedYear === yr;

            return (
              <button
                key={yr}
                onClick={() => onSelectYear(yr)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[var(--accent)] text-white font-semibold shadow-xs'
                    : count > 0
                    ? 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
                    : 'text-[var(--text-muted)]/40 hover:text-[var(--text-muted)]'
                }`}
              >
                <span>{yr}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[var(--bg-surface)] text-[var(--text-muted)]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="p-1.5 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] shrink-0 transition-colors cursor-pointer"
          title="Scroll Right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
