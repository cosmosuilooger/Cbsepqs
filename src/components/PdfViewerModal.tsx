import React, { useState } from 'react';
import { X, ExternalLink, Download, Bookmark, CheckCircle2, Copy, Check, Eye, AlertCircle, FileText } from 'lucide-react';
import { Paper } from '../data/papers';

interface PdfViewerModalProps {
  paper: Paper | null;
  onClose: () => void;
  isBookmarked: boolean;
  isSolved: boolean;
  onToggleBookmark: (paperId: string) => void;
  onToggleSolved: (paperId: string) => void;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  paper,
  onClose,
  isBookmarked,
  isSolved,
  onToggleBookmark,
  onToggleSolved,
}) => {
  const [copied, setCopied] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  if (!paper) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(paper.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs cursor-pointer"
    >
      <div
        className="w-full max-w-5xl h-[92vh] flex flex-col rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] shadow-2xl overflow-hidden cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Operational Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] shrink-0">
          <div className="flex items-center gap-3 min-w-0 pr-4">
            <div className="p-2 rounded bg-[var(--bg-card)] border border-[var(--border-subtle)] shrink-0">
              <FileText className="w-4 h-4 text-[var(--accent)]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] truncate">
                <span>{paper.year}</span>
                <span>·</span>
                <span>{paper.subStream}</span>
                <span>·</span>
                <span>{paper.setCode}</span>
                <span>·</span>
                <span>{paper.fileSize}</span>
                {paper.isOfficial && (
                  <>
                    <span>·</span>
                    <span className="text-[var(--accent-amber)] font-semibold">Official CBSE</span>
                  </>
                )}
              </div>
              <h3 className="text-sm sm:text-base font-serif font-semibold text-[var(--text-primary)] truncate">
                {paper.title}
              </h3>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => onToggleBookmark(paper.id)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer text-xs flex items-center gap-1.5 ${
                isBookmarked
                  ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)] font-medium'
                  : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
              }`}
              title={isBookmarked ? 'Remove from Saved' : 'Save for Revision'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
              <span className="hidden md:inline">{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={() => onToggleSolved(paper.id)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer text-xs flex items-center gap-1.5 ${
                isSolved
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 font-medium'
                  : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
              }`}
              title={isSolved ? 'Marked as Practiced' : 'Mark as Practiced'}
            >
              <CheckCircle2 className={`w-3.5 h-3.5 ${isSolved ? 'fill-current' : ''}`} />
              <span className="hidden md:inline">{isSolved ? 'Practiced' : 'Mark Solved'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="p-2 rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors cursor-pointer text-xs flex items-center gap-1.5"
              title="Copy PDF URL"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden md:inline">{copied ? 'Copied' : 'Copy Link'}</span>
            </button>

            <a
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-white bg-[var(--accent)] hover:opacity-90 transition-opacity"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 ml-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Viewer Body */}
        <div className="flex-1 bg-[var(--bg-canvas)] relative overflow-hidden flex flex-col">
          {!iframeError ? (
            <iframe
              src={paper.url}
              title={paper.title}
              className="w-full h-full border-0"
              onError={() => setIframeError(true)}
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--bg-surface)] border border-[var(--border-strong)] flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-[var(--accent)]" />
              </div>
              <h4 className="text-lg font-serif font-semibold text-[var(--text-primary)] mb-2">
                External Direct Document Access
              </h4>
              <p className="text-sm text-[var(--text-secondary)] max-w-md mb-6 leading-relaxed">
                This CBSE paper is hosted on the high-speed Collegedunia content delivery network. You can view or download the complete original document directly in full resolution.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-[var(--accent)] hover:opacity-90 transition-opacity"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Full PDF in New Tab</span>
                </a>
                <button
                  onClick={handleCopy}
                  className="px-4 py-2.5 rounded-lg border border-[var(--border-strong)] text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors cursor-pointer"
                >
                  {copied ? 'Link Copied!' : 'Copy Direct Link'}
                </button>
              </div>
            </div>
          )}

          {/* Eye care bottom banner inside reader */}
          <div className="px-4 py-2 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)] font-mono">
            <div className="flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-[var(--accent-amber)]" />
              <span>Eye-Care Reading Mode Active</span>
            </div>
            <div>
              <span>File Size: {paper.fileSize}</span>
              <span className="mx-2">·</span>
              <span>Region: {paper.region}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
