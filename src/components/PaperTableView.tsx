import React, { useState } from 'react';
import { ExternalLink, Bookmark, CheckCircle2, Copy, Check, Eye, FileText } from 'lucide-react';
import { Paper } from '../data/papers';

interface PaperTableViewProps {
  papers: Paper[];
  savedIds: string[];
  solvedIds: string[];
  onToggleBookmark: (paperId: string) => void;
  onToggleSolved: (paperId: string) => void;
  onQuickView: (paper: Paper) => void;
  readingRulerActive?: boolean;
}

export const PaperTableView: React.FC<PaperTableViewProps> = ({
  papers,
  savedIds,
  solvedIds,
  onToggleBookmark,
  onToggleSolved,
  onQuickView,
  readingRulerActive,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent, paper: Paper) => {
    e.stopPropagation();
    navigator.clipboard.writeText(paper.url);
    setCopiedId(paper.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-muted)] font-mono uppercase tracking-wider text-[11px]">
            <th className="py-3 px-4 font-medium">Year</th>
            <th className="py-3 px-4 font-medium">Subject / Stream</th>
            <th className="py-3 px-4 font-medium">Set Code</th>
            <th className="py-3 px-4 font-medium">Exam Type</th>
            <th className="py-3 px-4 font-medium">Region</th>
            <th className="py-3 px-4 font-medium">Size</th>
            <th className="py-3 px-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-subtle)]">
          {papers.map((paper) => {
            const isBookmarked = savedIds.includes(paper.id);
            const isSolved = solvedIds.includes(paper.id);

            return (
              <tr
                key={paper.id}
                onClick={() => onQuickView(paper)}
                className={`transition-colors cursor-pointer group ${
                  readingRulerActive
                    ? 'hover:bg-amber-100/60 dark:hover:bg-amber-950/30'
                    : 'hover:bg-[var(--bg-surface)]'
                } ${isSolved ? 'bg-emerald-500/5' : ''}`}
              >
                {/* Year */}
                <td className="py-2.5 px-4 font-mono font-bold text-[var(--accent)] whitespace-nowrap">
                  {paper.year}
                </td>

                {/* Subject / Stream */}
                <td className="py-2.5 px-4 font-serif font-medium text-[var(--text-primary)] whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <span>{paper.subStream}</span>
                    {paper.isOfficial && (
                      <span className="text-[10px] text-amber-700 dark:text-amber-400 font-mono px-1 py-0.2 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40">
                        Official
                      </span>
                    )}
                  </div>
                </td>

                {/* Set Code */}
                <td className="py-2.5 px-4 font-mono text-[var(--text-secondary)] whitespace-nowrap">
                  {paper.setCode}
                </td>

                {/* Exam Type */}
                <td className="py-2.5 px-4 whitespace-nowrap">
                  {paper.isSolution ? (
                    <span className="text-emerald-700 dark:text-emerald-400 font-mono text-[11px] font-medium">
                      Solved Key
                    </span>
                  ) : paper.isCompartment ? (
                    <span className="text-stone-600 dark:text-stone-400 font-mono text-[11px]">
                      Compartment
                    </span>
                  ) : (
                    <span className="text-[var(--text-muted)] font-mono text-[11px]">
                      Main Board
                    </span>
                  )}
                </td>

                {/* Region */}
                <td className="py-2.5 px-4 font-mono text-[var(--text-muted)] whitespace-nowrap">
                  {paper.region}
                </td>

                {/* Size */}
                <td className="py-2.5 px-4 font-mono text-[var(--text-muted)] whitespace-nowrap">
                  {paper.fileSize}
                </td>

                {/* Actions */}
                <td className="py-2.5 px-4 text-right whitespace-nowrap">
                  <div className="inline-flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onToggleBookmark(paper.id)}
                      className={`p-1.5 rounded transition-colors cursor-pointer ${
                        isBookmarked
                          ? 'text-[var(--accent)] bg-[var(--accent-soft)]'
                          : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
                      }`}
                      title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Paper'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      onClick={() => onToggleSolved(paper.id)}
                      className={`p-1.5 rounded transition-colors cursor-pointer ${
                        isSolved
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
                      }`}
                      title={isSolved ? 'Mark as Unsolved' : 'Mark as Solved'}
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isSolved ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      onClick={(e) => handleCopy(e, paper)}
                      className="p-1.5 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors cursor-pointer"
                      title="Copy Direct Link"
                    >
                      {copiedId === paper.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 py-1 px-2.5 rounded text-xs font-medium text-white bg-[var(--accent)] hover:opacity-90 transition-opacity ml-1"
                    >
                      <span>PDF</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
