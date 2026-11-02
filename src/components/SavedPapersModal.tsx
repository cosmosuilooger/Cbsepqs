import React from 'react';
import { X, Bookmark, ExternalLink, Trash2, CheckCircle2, Download, FileText } from 'lucide-react';
import { Paper, allPapers } from '../data/papers';

interface SavedPapersModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedIds: string[];
  solvedIds: string[];
  onToggleBookmark: (paperId: string) => void;
  onToggleSolved: (paperId: string) => void;
  onSelectPaper: (paper: Paper) => void;
}

export const SavedPapersModal: React.FC<SavedPapersModalProps> = ({
  isOpen,
  onClose,
  savedIds,
  solvedIds,
  onToggleBookmark,
  onToggleSolved,
  onSelectPaper,
}) => {
  if (!isOpen) return null;

  const savedPapers = allPapers.filter((p) => savedIds.includes(p.id));

  const exportList = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(savedPapers, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `cbse_humanities_revision_list_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs">
      <div
        className="w-full max-w-2xl max-h-[85vh] flex flex-col rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
              <Bookmark className="w-5 h-5 text-[var(--accent)] fill-[var(--accent)]" />
            </div>
            <div>
              <h3 className="text-base font-serif font-semibold text-[var(--text-primary)]">
                Saved Revision Papers
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-sans">
                {savedPapers.length} papers bookmarked for targeted practice
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {savedPapers.length > 0 && (
              <button
                onClick={exportList}
                className="p-1.5 px-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] text-xs font-mono text-[var(--text-secondary)] flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Export as JSON study list"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export List</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {savedPapers.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-12 h-12 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] flex items-center justify-center mx-auto mb-3">
                <Bookmark className="w-6 h-6 text-[var(--text-muted)]" />
              </div>
              <h4 className="text-sm font-serif font-medium text-[var(--text-primary)]">
                No saved papers yet
              </h4>
              <p className="text-xs text-[var(--text-muted)] mt-1 max-w-sm mx-auto">
                Click the bookmark star icon on any question paper to pin it here for focused exam revision.
              </p>
            </div>
          ) : (
            savedPapers.map((paper) => {
              const isSolved = solvedIds.includes(paper.id);
              return (
                <div
                  key={paper.id}
                  className="flex items-center justify-between gap-3 p-3.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] transition-all"
                >
                  <div
                    className="flex-1 min-w-0 cursor-pointer"
                    onClick={() => {
                      onSelectPaper(paper);
                      onClose();
                    }}
                  >
                    <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mb-1">
                      <span className="font-semibold text-[var(--accent)]">{paper.subject}</span>
                      <span>·</span>
                      <span>{paper.year}</span>
                      <span>·</span>
                      <span>{paper.setCode}</span>
                      <span>·</span>
                      <span>{paper.fileSize}</span>
                    </div>
                    <div className="text-sm font-medium text-[var(--text-primary)] truncate hover:text-[var(--accent)] transition-colors">
                      {paper.title}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onToggleSolved(paper.id)}
                      className={`p-1.5 rounded-md text-xs flex items-center gap-1 border transition-colors cursor-pointer ${
                        isSolved
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                          : 'border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] bg-[var(--bg-card)]'
                      }`}
                      title={isSolved ? 'Marked as Practiced' : 'Mark as Practiced'}
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isSolved ? 'fill-current' : ''}`} />
                      <span className="text-[11px] hidden sm:inline">{isSolved ? 'Solved' : 'Solve'}</span>
                    </button>

                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors"
                      title="Open Original PDF"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => onToggleBookmark(paper.id)}
                      className="p-1.5 rounded-md border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-between text-xs text-[var(--text-muted)] font-mono">
          <div>
            Total Saved: {savedPapers.length} · Practiced: {savedPapers.filter((p) => solvedIds.includes(p.id)).length}
          </div>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg border border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
