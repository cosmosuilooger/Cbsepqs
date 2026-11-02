export type ThemeMode = 'eyecare' | 'midnight' | 'dark' | 'studio' | 'parchment';
export type WarmthLevel = 'mild' | 'deep' | 'candlelight';
export type TextScale = 'sm' | 'base' | 'lg';
export type ViewMode = 'grid' | 'table';
export type ActiveTab = 'board_papers' | 'toppers' | 'sqp' | 'marking_schemes' | 'practice_banks' | 'syllabus' | 'all';

export interface EyeCareSettings {
  mode: ThemeMode;
  warmth: WarmthLevel;
  textScale: TextScale;
  readingRuler: boolean;
  dimNonActive: boolean;
}

export interface PaperFilterState {
  subject: string;
  subStream: string;
  year: string;
  searchQuery: string;
  examType: 'all' | 'main' | 'compartment';
  onlyOfficial: boolean;
  onlySolutions: boolean;
  region: 'all' | 'Delhi' | 'Outside Delhi' | 'Foreign';
  sortBy: 'year-desc' | 'year-asc' | 'size-desc' | 'set-asc';
}
