import React, { useState } from 'react';
import { ExternalLink, Bookmark, CheckCircle2, Copy, Check, Eye, FileText, CheckCircle } from 'lucide-react';
import { Paper } from '../data/papers';

interface PaperItemCardProps {
  paper: Paper;
  isBookmarked: boolean;
  isSolved: boolean;
  onToggleBookmark: (paperId: string) => void;
  onToggleSolved: (paperId: string) => void;
  onQuickView: (paper: Paper) => void;
  readingRulerActive?: boolean;
}

export const PaperItemCard: React.FC<PaperItemCardProps> = ({
  paper,
  isBookmarked,
  isSolved,
  onToggleBookmark,
  onToggleSolved,
  onQuickView,
  readingRulerActive,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(paper.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      onClick={() => onQuickView(paper)}
      className={`group relative flex flex-col justify-between p-4 rounded-xl border transition-all cursor-pointer ${
        isSolved
          ? 'border-emerald-200/80 dark:border-emerald-900/40 bg-[var(--bg-card)]'
          : isBookmarked
          ? 'border-amber-300/80 dark:border-amber-800/40 bg-[var(--bg-card)]'
          : 'border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--border-strong)] hover:shadow-xs'
      }`}
    >
      <div>
        {/* Top unboxed metadata line */}
        <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] mb-2.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-[var(--accent)]">{paper.year}</span>
            <span>·</span>
            <span>{paper.subStream}</span>
            <span>·</span>
            <span>{paper.setCode}</span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {paper.isOfficial && (
              <span className="text-[10px] text-amber-700 dark:text-amber-400 font-mono font-medium bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-800/50">
                Official
              </span>
            )}
            {paper.isCompartment && (
              <span className="text-[10px] text-stone-600 dark:text-stone-400 font-mono px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
                Compartment
              </span>
            )}
            {paper.isSolution && (
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono font-medium bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/50">
                Solution
              </span>
            )}
          </div>
        </div>

        {/* Paper Title */}
        <h4 className="text-sm font-serif font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-snug line-clamp-2 mb-2">
          {paper.title}
        </h4>

        {/* Region & Size metadata */}
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-mono mb-4">
          <span>{paper.fileSize}</span>
          <span>·</span>
          <span>{paper.region}</span>
          {isSolved && (
            <>
              <span>·</span>
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                <CheckCircle className="w-3 h-3" /> Solved
              </span>
            </>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)] text-xs">
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(paper.id);
            }}
            className={`p-1.5 rounded border transition-colors cursor-pointer ${
              isBookmarked
                ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                : 'border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
            }`}
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Paper'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSolved(paper.id);
            }}
            className={`p-1.5 rounded border transition-colors cursor-pointer ${
              isSolved
                ? 'border-emerald-600 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                : 'border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
            }`}
            title={isSolved ? 'Mark as Unsolved' : 'Mark as Solved / Practiced'}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${isSolved ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleCopy}
            className="p-1.5 rounded border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors cursor-pointer"
            title="Copy Direct PDF Link"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(paper);
            }}
            className="px-2.5 py-1 rounded text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors cursor-pointer"
          >
            Preview
          </button>

          <a
            href={paper.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium text-white bg-[var(--accent)] hover:opacity-90 transition-opacity"
          >
            <span>PDF</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
