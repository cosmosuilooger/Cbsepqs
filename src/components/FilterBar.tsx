import React from 'react';
import { Search, SlidersHorizontal, LayoutGrid, Table, X, Check, ArrowUpDown } from 'lucide-react';
import { PaperFilterState, ViewMode } from '../types';

interface FilterBarProps {
  filter: PaperFilterState;
  onUpdateFilter: (update: Partial<PaperFilterState>) => void;
  onResetFilter: () => void;
  viewMode: ViewMode;
  onToggleViewMode: (mode: ViewMode) => void;
  totalFiltered: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  onUpdateFilter,
  onResetFilter,
  viewMode,
  onToggleViewMode,
  totalFiltered,
}) => {
  const hasActiveFilters =
    filter.searchQuery.trim() !== '' ||
    filter.examType !== 'all' ||
    filter.onlyOfficial ||
    filter.onlySolutions ||
    filter.region !== 'all';

  return (
    <div className="space-y-3">
      {/* Search and Primary Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        {/* Search Field */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input
            type="text"
            value={filter.searchQuery}
            onChange={(e) => onUpdateFilter({ searchQuery: e.target.value })}
            placeholder="Search set codes (e.g. 64-1-1, Set 2), subjects, solutions, years..."
            className="w-full pl-9 pr-8 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-hidden focus:border-[var(--accent)] transition-colors"
          />
          {filter.searchQuery && (
            <button
              onClick={() => onUpdateFilter({ searchQuery: '' })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* View Mode & Sort Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs text-[var(--text-secondary)]">
            <ArrowUpDown className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            <select
              value={filter.sortBy}
              onChange={(e) => onUpdateFilter({ sortBy: e.target.value as any })}
              className="bg-transparent border-none text-xs text-[var(--text-primary)] focus:outline-hidden cursor-pointer"
            >
              <option value="year-desc">Newest Year First</option>
              <option value="year-asc">Oldest Year First</option>
              <option value="size-desc">Largest File Size</option>
              <option value="set-asc">Set Code (Ascending)</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center p-0.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)]">
            <button
              onClick={() => onToggleViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
              title="Card Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleViewMode('table')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
              title="Dense Index Table View"
            >
              <Table className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Quick Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Exam Type Segment */}
          <div className="flex items-center p-0.5 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            <button
              onClick={() => onUpdateFilter({ examType: 'all' })}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                filter.examType === 'all'
                  ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => onUpdateFilter({ examType: 'main' })}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                filter.examType === 'main'
                  ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Main / Annual
            </button>
            <button
              onClick={() => onUpdateFilter({ examType: 'compartment' })}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                filter.examType === 'compartment'
                  ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Compartment
            </button>
          </div>

          {/* Official Papers Toggle */}
          <button
            onClick={() => onUpdateFilter({ onlyOfficial: !filter.onlyOfficial })}
            className={`px-2.5 py-1 rounded-md border text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              filter.onlyOfficial
                ? 'border-amber-400 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200'
                : 'border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
            }`}
          >
            <span>Official Papers Only</span>
            {filter.onlyOfficial && <Check className="w-3 h-3 text-amber-600" />}
          </button>

          {/* Solutions Toggle */}
          <button
            onClick={() => onUpdateFilter({ onlySolutions: !filter.onlySolutions })}
            className={`px-2.5 py-1 rounded-md border text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              filter.onlySolutions
                ? 'border-emerald-400 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200'
                : 'border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
            }`}
          >
            <span>With Solutions</span>
            {filter.onlySolutions && <Check className="w-3 h-3 text-emerald-600" />}
          </button>

          {/* Region Filter */}
          <select
            value={filter.region}
            onChange={(e) => onUpdateFilter({ region: e.target.value as any })}
            className="px-2 py-1 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[11px] text-[var(--text-secondary)] focus:outline-hidden cursor-pointer"
          >
            <option value="all">All Regions</option>
            <option value="Delhi">Delhi Scheme</option>
            <option value="Outside Delhi">Outside Delhi</option>
            <option value="Foreign">Foreign Schools</option>
          </select>
        </div>

        {/* Clear Filters & Count */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-[var(--text-muted)]">
            Showing <strong className="text-[var(--text-primary)]">{totalFiltered}</strong> papers
          </span>

          {hasActiveFilters && (
            <button
              onClick={onResetFilter}
              className="text-xs text-[var(--accent)] hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              <X className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
