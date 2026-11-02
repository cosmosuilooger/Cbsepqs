import React from 'react';
import { Globe, Landmark, TrendingUp, BookOpen, Feather, Layers } from 'lucide-react';
import { ALL_SUBJECTS, SUBJECT_METADATA, SubjectName } from '../data/papers';

interface SubjectDirectoryProps {
  selectedSubject: string;
  selectedSubStream: string;
  onSelectSubject: (subject: string) => void;
  onSelectSubStream: (subStream: string) => void;
  countsBySubject: Record<string, number>;
  totalCount: number;
}

export const SubjectDirectory: React.FC<SubjectDirectoryProps> = ({
  selectedSubject,
  selectedSubStream,
  onSelectSubject,
  onSelectSubStream,
  countsBySubject,
  totalCount,
}) => {
  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-4 h-4" strokeWidth={1.75} />;
      case 'Landmark':
        return <Landmark className="w-4 h-4" strokeWidth={1.75} />;
      case 'TrendingUp':
        return <TrendingUp className="w-4 h-4" strokeWidth={1.75} />;
      case 'BookOpen':
        return <BookOpen className="w-4 h-4" strokeWidth={1.75} />;
      case 'Feather':
        return <Feather className="w-4 h-4" strokeWidth={1.75} />;
      default:
        return <Layers className="w-4 h-4" strokeWidth={1.75} />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Primary Subject Selection Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
        {/* All Subjects Tab */}
        <button
          onClick={() => {
            onSelectSubject('All');
            onSelectSubStream('All');
          }}
          className={`flex flex-col p-3 rounded-lg border text-left transition-all cursor-pointer ${
            selectedSubject === 'All'
              ? 'border-[var(--accent)] bg-[var(--bg-surface)] ring-1 ring-[var(--accent)] shadow-xs'
              : 'border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--border-strong)]'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className={`p-1 rounded ${selectedSubject === 'All' ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
              <Layers className="w-4 h-4" />
            </span>
            <span className="text-[10px] font-mono font-medium text-[var(--text-muted)]">ALL 5</span>
          </div>
          <span className="text-xs font-semibold text-[var(--text-primary)]">All Humanities</span>
          <span className="text-[11px] font-mono text-[var(--text-muted)] mt-0.5">{totalCount} Papers</span>
        </button>

        {/* 5 Subjects */}
        {ALL_SUBJECTS.map((sub) => {
          const meta = SUBJECT_METADATA[sub];
          const isSelected = selectedSubject === sub;
          const count = countsBySubject[sub] || 0;

          return (
            <button
              key={sub}
              onClick={() => {
                onSelectSubject(sub);
                onSelectSubStream('All');
              }}
              className={`flex flex-col p-3 rounded-lg border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'border-[var(--accent)] bg-[var(--bg-surface)] ring-1 ring-[var(--accent)] shadow-xs'
                  : 'border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--border-strong)]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`p-1 rounded ${isSelected ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
                  {getSubjectIcon(meta.icon)}
                </span>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">Code {meta.code.split('/')[0].trim()}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xs font-semibold text-[var(--text-primary)]">{meta.name}</span>
                <span className="text-[10px] text-[var(--text-muted)] font-serif italic hidden xl:inline">({meta.hindiName})</span>
              </div>
              <span className="text-[11px] font-mono text-[var(--text-muted)] mt-0.5">{count} Papers</span>
            </button>
          );
        })}
      </div>

      {/* Sub-stream filter (Core vs Elective for Hindi & English) */}
      {(selectedSubject === 'Hindi' || selectedSubject === 'English') && (
        <div className="flex items-center gap-2 p-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] w-fit text-xs">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] px-2">
            Course Stream:
          </span>
          <div className="flex items-center gap-1">
            {['All', `${selectedSubject} Core`, `${selectedSubject} Elective`].map((stream) => {
              const active =
                selectedSubStream === stream ||
                (stream === 'All' && (selectedSubStream === 'All' || selectedSubStream === selectedSubject));
              return (
                <button
                  key={stream}
                  onClick={() => onSelectSubStream(stream === 'All' ? 'All' : stream)}
                  className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
                    active
                      ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-xs border border-[var(--border-subtle)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {stream}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
