import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'motion/react';
import {
  allPapers,
  ALL_SUBJECTS,
  ALL_YEARS,
  SUBJECT_METADATA,
  Paper,
  getSubjectStats,
  getYearStats,
} from './data/papers';
import { EyeCareSettings, PaperFilterState, ViewMode } from './types';
import { Header } from './components/Header';
import { EntranceAnimation } from './components/EntranceAnimation';
import { SubjectDirectory } from './components/SubjectDirectory';
import { YearNavigator } from './components/YearNavigator';
import { FilterBar } from './components/FilterBar';
import { PaperItemCard } from './components/PaperItemCard';
import { PaperTableView } from './components/PaperTableView';
import { PdfViewerModal } from './components/PdfViewerModal';
import { EyeCareSettingsModal } from './components/EyeCareSettingsModal';
import { ExamTimerModal } from './components/ExamTimerModal';
import { SavedPapersModal } from './components/SavedPapersModal';
import { OfficialResourcesCompendium } from './components/OfficialResourcesCompendium';
import {
  ALL_OFFICIAL_ACADEMIC_RESOURCES,
  OfficialResourceItem,
} from './data/officialAcademicResources';
import {
  BookOpen,
  Calendar,
  Layers,
  Sparkles,
  Shield,
  FileText,
  Compass,
  CheckCircle2,
  Bookmark,
  ChevronDown,
  Award,
  FileCheck,
  CheckSquare,
  ArrowRight,
  Eye,
} from 'lucide-react';

export default function App() {
  // Entrance animation state (plays on entry as requested)
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    return localStorage.getItem('cbse_skip_intro') !== 'true';
  });

  // Eye Care settings (Active by default!)
  const [eyeCareSettings, setEyeCareSettings] = useState<EyeCareSettings>(() => {
    const saved = localStorage.getItem('cbse_eyecare_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      mode: 'eyecare', // Default aesthetic eye care mode!
      warmth: 'mild',
      textScale: 'base',
      readingRuler: true,
      dimNonActive: false,
    };
  });

  // Modals state
  const [isEyeCareOpen, setIsEyeCareOpen] = useState(false);
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [activeViewingPaper, setActiveViewingPaper] = useState<Paper | null>(null);

  // User saved / solved paper state (persisted in localStorage)
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('cbse_saved_papers');
    return saved ? JSON.parse(saved) : [];
  });

  const [solvedIds, setSolvedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('cbse_solved_papers');
    return saved ? JSON.parse(saved) : [];
  });

  // Filtering state
  const [filter, setFilter] = useState<PaperFilterState>({
    subject: 'All',
    subStream: 'All',
    year: 'All',
    searchQuery: '',
    examType: 'all',
    onlyOfficial: false,
    onlySolutions: false,
    region: 'all',
    sortBy: 'year-desc',
  });

  // View mode (Cards Grid vs Dense Table)
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Unified Mode Navigator: 'papers' | 'official' | 'unified'
  const [primaryMode, setPrimaryMode] = useState<'papers' | 'official' | 'unified'>('papers');

  // Official Category filter state
  const [officialCategory, setOfficialCategory] = useState<string>('model_answers');

  // Pagination for smooth rendering of 2,092 records
  const [page, setPage] = useState(1);
  const pageSize = 36;

  // Apply Theme & Font Scale classes to documentElement
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-eyecare', 'theme-dark', 'theme-studio', 'theme-parchment', 'dark');

    if (eyeCareSettings.mode === 'midnight') {
      root.classList.add('theme-dark', 'dark');
    } else if (eyeCareSettings.mode === 'studio') {
      root.classList.add('theme-studio');
    } else if (eyeCareSettings.mode === 'parchment') {
      root.classList.add('theme-parchment');
    } else {
      root.classList.add('theme-eyecare');
    }

    localStorage.setItem('cbse_eyecare_settings', JSON.stringify(eyeCareSettings));
  }, [eyeCareSettings]);

  // Persist bookmarks
  useEffect(() => {
    localStorage.setItem('cbse_saved_papers', JSON.stringify(savedIds));
  }, [savedIds]);

  // Persist solved status
  useEffect(() => {
    localStorage.setItem('cbse_solved_papers', JSON.stringify(solvedIds));
  }, [solvedIds]);

  const toggleBookmark = (id: string) => {
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const toggleSolved = (id: string) => {
    setSolvedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  // Filter calculations for board papers
  const filteredPapers = useMemo(() => {
    return allPapers.filter((paper) => {
      // Subject filter
      if (filter.subject !== 'All' && paper.subject !== filter.subject) {
        return false;
      }

      // Sub-stream filter (e.g. Hindi Core vs Hindi Elective)
      if (filter.subStream !== 'All' && paper.subStream !== filter.subStream) {
        return false;
      }

      // Year filter
      if (filter.year !== 'All' && paper.year !== filter.year) {
        return false;
      }

      // Exam type
      if (filter.examType === 'main' && paper.isCompartment) {
        return false;
      }
      if (filter.examType === 'compartment' && !paper.isCompartment) {
        return false;
      }

      // Official only
      if (filter.onlyOfficial && !paper.isOfficial) {
        return false;
      }

      // Solutions only
      if (filter.onlySolutions && !paper.isSolution) {
        return false;
      }

      // Region
      if (filter.region !== 'all' && paper.region !== filter.region) {
        return false;
      }

      // Search Query
      if (filter.searchQuery.trim()) {
        const query = filter.searchQuery.toLowerCase().trim();
        const matchesTitle = paper.title.toLowerCase().includes(query);
        const matchesSet = paper.setCode.toLowerCase().includes(query);
        const matchesYear = paper.year.includes(query);
        const matchesSubject = paper.subject.toLowerCase().includes(query);
        const matchesSubStream = paper.subStream.toLowerCase().includes(query);
        if (!matchesTitle && !matchesSet && !matchesYear && !matchesSubject && !matchesSubStream) {
          return false;
        }
      }

      return true;
    });
  }, [filter]);

  // Sorting
  const sortedPapers = useMemo(() => {
    const list = [...filteredPapers];
    switch (filter.sortBy) {
      case 'year-desc':
        return list.sort((a, b) => Number(b.year) - Number(a.year));
      case 'year-asc':
        return list.sort((a, b) => Number(a.year) - Number(b.year));
      case 'size-desc':
        return list.sort((a, b) => {
          const sizeA = parseFloat(a.fileSize) || 0;
          const sizeB = parseFloat(b.fileSize) || 0;
          return sizeB - sizeA;
        });
      case 'set-asc':
        return list.sort((a, b) => a.setCode.localeCompare(b.setCode));
      default:
        return list;
    }
  }, [filteredPapers, filter.sortBy]);

  // Paginated papers for rendering
  const paginatedPapers = useMemo(() => {
    return sortedPapers.slice(0, page * pageSize);
  }, [sortedPapers, page]);

  // Dynamic counts for years based on current subject filter
  const yearCounts = useMemo(() => {
    return getYearStats(filter.subject);
  }, [filter.subject]);

  const subjectCounts = useMemo(() => {
    return getSubjectStats();
  }, []);

  const handleResetFilters = () => {
    setFilter({
      subject: 'All',
      subStream: 'All',
      year: 'All',
      searchQuery: '',
      examType: 'all',
      onlyOfficial: false,
      onlySolutions: false,
      region: 'all',
      sortBy: 'year-desc',
    });
    setPage(1);
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Convert an official resource item into a paper object so it opens immediately in front in PdfViewerModal
  const handleQuickViewResource = (item: OfficialResourceItem) => {
    const adaptedPaper: Paper = {
      id: item.id,
      subject: item.subject === 'General' ? 'History' : item.subject,
      subStream: item.subStream || item.subject,
      year: item.session,
      fileSize: 'Official PDF',
      url: item.url,
      isOfficial: true,
      isCompartment: false,
      isSolution: item.category === 'marking_scheme' || item.category === 'model_answers',
      region: 'All India',
      setCode: item.badge || 'Official CBSE',
      title: item.title,
    };
    setActiveViewingPaper(adaptedPaper);
  };

  // Quick Study Kit items for the selected subject (psychological quick-launch anchor)
  const currentSubjectStudyKit = useMemo(() => {
    if (filter.subject === 'All') return [];
    return ALL_OFFICIAL_ACADEMIC_RESOURCES.filter(
      (r) => r.subject === filter.subject && (r.category === 'model_answers' || r.session === '2026-27' || r.session === '2025-26')
    ).slice(0, 4);
  }, [filter.subject]);

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors ${
        eyeCareSettings.textScale === 'lg' ? 'text-base' : eyeCareSettings.textScale === 'sm' ? 'text-xs' : 'text-sm'
      }`}
    >
      {/* Entrance Animation Gateway */}
      <AnimatePresence>
        {showIntro && <EntranceAnimation onEnter={() => setShowIntro(false)} />}
      </AnimatePresence>

      {/* Main Top Bar */}
      <Header
        onOpenEyeCare={() => setIsEyeCareOpen(true)}
        onOpenTimer={() => setIsTimerOpen(true)}
        onOpenSaved={() => setIsSavedOpen(true)}
        onReplayIntro={() => setShowIntro(true)}
        savedCount={savedIds.length}
        eyeCareSettings={eyeCareSettings}
        onNavigateSection={handleNavigateSection}
      />

      {/* Hero Curatorial Marquee */}
      <section className="px-4 sm:px-8 pt-8 pb-6 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]/60 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent)]">
                <Shield className="w-3.5 h-3.5" />
                <span>Senior School Certificate Examination (Class XII)</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[var(--text-primary)] tracking-tight leading-tight">
                CBSE Humanities Repository
              </h1>
              <p className="text-sm sm:text-base font-serif italic text-[var(--text-secondary)] leading-relaxed">
                Centralized academic catalog containing 2,092 board examination papers, official topper handwritten scripts, 2020–2027 SQPs, and marking schemes across 15 sessions.
              </p>
            </div>

            {/* Curatorial Status Strip */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono text-[var(--text-secondary)] bg-[var(--bg-card)] p-3.5 rounded-xl border border-[var(--border-subtle)] shrink-0 shadow-2xs">
              <div>
                <span className="font-bold text-[var(--text-primary)] text-sm">2,092</span>
                <span className="block text-[10px] text-[var(--text-muted)] uppercase">Past Papers</span>
              </div>
              <div className="w-px h-7 bg-[var(--border-subtle)]" />
              <div>
                <span className="font-bold text-amber-700 dark:text-amber-400 text-sm">21 Scripts</span>
                <span className="block text-[10px] text-[var(--text-muted)] uppercase">Topper Copies</span>
              </div>
              <div className="w-px h-7 bg-[var(--border-subtle)]" />
              <div>
                <span className="font-bold text-[var(--accent)] text-sm">2020–2027</span>
                <span className="block text-[10px] text-[var(--text-muted)] uppercase">SQP & Keys</span>
              </div>
              <div className="w-px h-7 bg-[var(--border-subtle)]" />
              <div>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">Eye Care</span>
                <span className="block text-[10px] text-[var(--text-muted)] uppercase">Active (Default)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 space-y-6">
        {/* Step 1: Subject Selection (Prominent, Top-Level Decision) */}
        <section id="repository" className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
            <span className="font-semibold text-[var(--text-primary)]">Step 1 · Choose Humanities Subject</span>
            <span>Focuses all past papers & topper materials on chosen subject</span>
          </div>

          <SubjectDirectory
            selectedSubject={filter.subject}
            selectedSubStream={filter.subStream}
            onSelectSubject={(sub) => {
              setFilter((prev) => ({ ...prev, subject: sub, subStream: 'All' }));
              setPage(1);
            }}
            onSelectSubStream={(stream) => {
              setFilter((prev) => ({ ...prev, subStream: stream }));
              setPage(1);
            }}
            countsBySubject={subjectCounts}
            totalCount={allPapers.length}
          />
        </section>

        {/* Quick Subject Master Kit (when a specific subject is picked) */}
        {filter.subject !== 'All' && currentSubjectStudyKit.length > 0 && (
          <div className="p-3.5 sm:p-4 rounded-xl border border-amber-300/80 dark:border-amber-800/40 bg-[var(--bg-surface)]/80 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--accent)]">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold">
                  {filter.subject} Official Board Prep Kit
                </div>
                <div className="text-sm font-serif font-medium text-[var(--text-primary)]">
                  Latest 2026-27 & 2025-26 SQPs, Official Marking Keys & Verified Topper Answer Scripts
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {currentSubjectStudyKit.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleQuickViewResource(item)}
                  className="px-2.5 py-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-card)] hover:border-[var(--accent)] hover:text-[var(--accent)] text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                >
                  <Eye className="w-3 h-3 text-[var(--accent-amber)]" />
                  <span className="truncate max-w-[170px]">{item.badge || item.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Unified Mode Switcher (Clean, Single Navigation Bar) */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[var(--border-subtle)]">
            <div className="flex items-center gap-1.5 p-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs font-medium overflow-x-auto no-scrollbar shadow-2xs">
              <button
                onClick={() => setPrimaryMode('papers')}
                className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  primaryMode === 'papers'
                    ? 'bg-[var(--accent)] text-white font-semibold shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>15-Year Board Papers (2,092)</span>
              </button>

              <button
                onClick={() => setPrimaryMode('official')}
                className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  primaryMode === 'official'
                    ? 'bg-[var(--accent)] text-white font-semibold shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Official Toppers & 2020–2027 SQP/Keys</span>
              </button>

              <button
                onClick={() => setPrimaryMode('unified')}
                className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  primaryMode === 'unified'
                    ? 'bg-[var(--accent)] text-white font-semibold shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>All Combined</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] self-end sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span>Click any document to open in front</span>
            </div>
          </div>

          {/* Mode A / C: Official Compendium Section */}
          {(primaryMode === 'official' || primaryMode === 'unified') && (
            <div id="academic-compendium" className="pt-2">
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                <span className="font-semibold text-[var(--text-primary)]">
                  Official CBSE Study Compendium ({filter.subject !== 'All' ? filter.subject : 'All Humanities'})
                </span>
                <span>Direct verified downloads from cbseacademic.nic.in</span>
              </div>

              <OfficialResourcesCompendium
                onQuickViewResource={handleQuickViewResource}
                selectedSubject={filter.subject}
                searchQuery={filter.searchQuery}
                activeCategory={officialCategory}
                onSelectCategory={setOfficialCategory}
              />
            </div>
          )}

          {/* Mode B / C: Past Board Papers Section */}
          {(primaryMode === 'papers' || primaryMode === 'unified') && (
            <div className="space-y-4 pt-2">
              {/* Year Timeline Rail */}
              <div id="years">
                <YearNavigator
                  selectedYear={filter.year}
                  onSelectYear={(yr) => {
                    setFilter((prev) => ({ ...prev, year: yr }));
                    setPage(1);
                  }}
                  yearCounts={yearCounts}
                  totalFilteredCount={
                    filter.subject === 'All' ? allPapers.length : subjectCounts[filter.subject] || 0
                  }
                />
              </div>

              {/* Single Unified Search & Filter Command Bar */}
              <div>
                <FilterBar
                  filter={filter}
                  onUpdateFilter={(update) => {
                    setFilter((prev) => ({ ...prev, ...update }));
                    setPage(1);
                  }}
                  onResetFilter={handleResetFilters}
                  viewMode={viewMode}
                  onToggleViewMode={setViewMode}
                  totalFiltered={filteredPapers.length}
                />
              </div>

              {/* Papers Results Display */}
              {sortedPapers.length === 0 ? (
                <div className="text-center py-16 rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--bg-card)] p-8">
                  <FileText className="w-10 h-10 text-[var(--text-muted)] mx-auto mb-3" />
                  <h3 className="text-base font-serif font-medium text-[var(--text-primary)]">
                    No matching question papers found
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1 max-w-md mx-auto">
                    Try adjusting the search query or selecting a different academic year.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="mt-4 px-4 py-2 rounded-lg text-xs font-medium text-white bg-[var(--accent)] hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    Reset Filter Criteria
                  </button>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                  {paginatedPapers.map((paper) => (
                    <PaperItemCard
                      key={paper.id}
                      paper={paper}
                      isBookmarked={savedIds.includes(paper.id)}
                      isSolved={solvedIds.includes(paper.id)}
                      onToggleBookmark={toggleBookmark}
                      onToggleSolved={toggleSolved}
                      onQuickView={setActiveViewingPaper}
                      readingRulerActive={eyeCareSettings.readingRuler}
                    />
                  ))}
                </div>
              ) : (
                <PaperTableView
                  papers={paginatedPapers}
                  savedIds={savedIds}
                  solvedIds={solvedIds}
                  onToggleBookmark={toggleBookmark}
                  onToggleSolved={toggleSolved}
                  onQuickView={setActiveViewingPaper}
                  readingRulerActive={eyeCareSettings.readingRuler}
                />
              )}

              {/* Load More Pagination */}
              {paginatedPapers.length < sortedPapers.length && (
                <div className="text-center pt-6 pb-2">
                  <button
                    onClick={() => setPage((prev) => prev + 1)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] text-xs font-mono text-[var(--text-primary)] transition-all cursor-pointer shadow-2xs"
                  >
                    <span>Load Next {Math.min(pageSize, sortedPapers.length - paginatedPapers.length)} Papers</span>
                    <span className="text-[var(--text-muted)]">
                      ({paginatedPapers.length} of {sortedPapers.length} shown)
                    </span>
                    <ChevronDown className="w-4 h-4 text-[var(--accent)]" />
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      {/* Curatorial Academic Footer */}
      <footer className="mt-16 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-8 px-4 sm:px-8 text-xs text-[var(--text-muted)] transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-serif font-semibold text-[var(--text-primary)] text-sm">
              CBSE Class 12 Humanities Archive Portal
            </div>
            <p className="max-w-lg leading-relaxed">
              Curated for senior secondary students, educators, and scholars. Question papers, marking schemes, and set series are original assets of the Central Board of Secondary Education.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-[11px]">
            <button
              onClick={() => setIsEyeCareOpen(true)}
              className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              Eye-Care Settings
            </button>
            <span>·</span>
            <button
              onClick={() => setIsTimerOpen(true)}
              className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              Exam Simulator
            </button>
            <span>·</span>
            <button
              onClick={() => setIsSavedOpen(true)}
              className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              Saved ({savedIds.length})
            </button>
            <span>·</span>
            <button
              onClick={() => setShowIntro(true)}
              className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              Replay Intro
            </button>
          </div>
        </div>
      </footer>

      {/* Modals & Dialogs (Open in Front) */}
      <PdfViewerModal
        paper={activeViewingPaper}
        onClose={() => setActiveViewingPaper(null)}
        isBookmarked={activeViewingPaper ? savedIds.includes(activeViewingPaper.id) : false}
        isSolved={activeViewingPaper ? solvedIds.includes(activeViewingPaper.id) : false}
        onToggleBookmark={toggleBookmark}
        onToggleSolved={toggleSolved}
      />

      <EyeCareSettingsModal
        isOpen={isEyeCareOpen}
        onClose={() => setIsEyeCareOpen(false)}
        settings={eyeCareSettings}
        onUpdateSettings={(newVals) => setEyeCareSettings((prev) => ({ ...prev, ...newVals }))}
      />

      <ExamTimerModal isOpen={isTimerOpen} onClose={() => setIsTimerOpen(false)} />

      <SavedPapersModal
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        savedIds={savedIds}
        solvedIds={solvedIds}
        onToggleBookmark={toggleBookmark}
        onToggleSolved={toggleSolved}
        onSelectPaper={(p) => setActiveViewingPaper(p)}
      />
    </div>
  );
}
