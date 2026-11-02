import React, { useState, useMemo } from 'react';
import {
  FileCheck,
  CheckSquare,
  HelpCircle,
  Award,
  BookOpen,
  Zap,
  FolderArchive,
  ExternalLink,
  Copy,
  Check,
  Eye,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  ALL_OFFICIAL_ACADEMIC_RESOURCES,
  OFFICIAL_RESOURCE_CATEGORIES,
  OfficialResourceItem,
} from '../data/officialAcademicResources';

interface OfficialResourcesCompendiumProps {
  onQuickViewResource: (item: OfficialResourceItem) => void;
  selectedSubject: string;
  searchQuery?: string;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export const OfficialResourcesCompendium: React.FC<OfficialResourcesCompendiumProps> = ({
  onQuickViewResource,
  selectedSubject = 'All',
  searchQuery = '',
  activeCategory,
  onSelectCategory,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent, item: OfficialResourceItem) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const filteredResources = useMemo(() => {
    return ALL_OFFICIAL_ACADEMIC_RESOURCES.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Subject filter
      if (selectedSubject !== 'All' && item.subject !== selectedSubject && item.subject !== 'General') {
        return false;
      }
      // Search query
      if (searchQuery && searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesSubject = item.subject.toLowerCase().includes(q);
        const matchesSession = item.session.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesSubject && !matchesSession) return false;
      }
      return true;
    });
  }, [activeCategory, selectedSubject, searchQuery]);

  const getCategoryIcon = (catId: string) => {
    switch (catId) {
      case 'model_answers':
        return <Award className="w-4 h-4 text-amber-700 dark:text-amber-400" />;
      case 'sqp':
        return <FileCheck className="w-4 h-4 text-[#9a3412]" />;
      case 'marking_scheme':
        return <CheckSquare className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />;
      case 'apq':
        return <Zap className="w-4 h-4 text-amber-600" />;
      case 'question_bank':
        return <HelpCircle className="w-4 h-4 text-blue-700 dark:text-blue-400" />;
      case 'curriculum':
        return <BookOpen className="w-4 h-4 text-indigo-700 dark:text-indigo-400" />;
      case 'manuals':
        return <FolderArchive className="w-4 h-4 text-stone-700 dark:text-stone-300" />;
      default:
        return <Layers className="w-4 h-4 text-[var(--accent)]" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Category Pills Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-medium" style={{ scrollbarWidth: 'none' }}>
        {OFFICIAL_RESOURCE_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count =
            cat.id === 'all'
              ? ALL_OFFICIAL_ACADEMIC_RESOURCES.filter(
                  (r) => selectedSubject === 'All' || r.subject === selectedSubject || r.subject === 'General'
                ).length
              : ALL_OFFICIAL_ACADEMIC_RESOURCES.filter(
                  (r) =>
                    r.category === cat.id &&
                    (selectedSubject === 'All' || r.subject === selectedSubject || r.subject === 'General')
                ).length;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'border-[var(--accent)] bg-[var(--bg-surface)] text-[var(--text-primary)] font-semibold shadow-xs ring-1 ring-[var(--accent)]'
                  : 'border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
              }`}
            >
              <span>{getCategoryIcon(cat.id)}</span>
              <span>{cat.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                  isActive
                    ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                    : 'bg-[var(--bg-surface)] text-[var(--text-muted)]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Cards Grid */}
      {filteredResources.length === 0 ? (
        <div className="text-center py-12 rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--bg-card)] p-6">
          <BookOpen className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-2" />
          <h4 className="text-sm font-serif font-medium text-[var(--text-primary)]">
            No official documents found for {selectedSubject !== 'All' ? selectedSubject : 'this filter'}
          </h4>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Try switching categories or clearing search keywords.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredResources.map((item) => {
            const isTopper = item.category === 'model_answers';
            const isKey = item.category === 'marking_scheme';

            return (
              <div
                key={item.id}
                onClick={() => onQuickViewResource(item)}
                className={`flex flex-col justify-between p-4 rounded-xl border transition-all cursor-pointer group hover:shadow-sm ${
                  isTopper
                    ? 'border-amber-300/80 dark:border-amber-800/40 bg-[var(--bg-card)] hover:border-amber-500'
                    : isKey
                    ? 'border-emerald-300/70 dark:border-emerald-800/40 bg-[var(--bg-card)] hover:border-emerald-500'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--border-strong)]'
                }`}
              >
                <div>
                  {/* Header metadata */}
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] mb-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-semibold text-[var(--accent)]">{item.subject}</span>
                      <span>·</span>
                      <span className="font-medium text-[var(--text-primary)]">{item.session}</span>
                      {item.subStream && item.subStream !== item.subject && (
                        <>
                          <span>·</span>
                          <span>{item.subStream}</span>
                        </>
                      )}
                    </div>

                    {item.badge && (
                      <span className="text-[10px] font-mono font-medium text-amber-900 dark:text-amber-200 bg-amber-100 dark:bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-300 dark:border-amber-800/50">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Document Title */}
                  <h4 className="text-sm font-serif font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-snug mb-1.5 line-clamp-2">
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Direct Actions: Click to open in front or download */}
                <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)] text-xs">
                  <button
                    onClick={(e) => handleCopy(e, item)}
                    className="p-1.5 rounded border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                    title="Copy Direct Link to Clipboard"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-mono">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="font-mono">Copy Link</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[var(--accent)] group-hover:underline flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>Open in Front</span>
                    </span>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded text-xs font-medium text-white bg-[var(--accent)] hover:opacity-90 transition-opacity"
                      title="Open PDF directly in new tab"
                    >
                      <span>Direct PDF</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
