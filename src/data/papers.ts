import rawPapers from './papersData.json';

export interface Paper {
  id: string;
  subject: 'Geography' | 'History' | 'Economics' | 'Hindi' | 'English';
  subStream: string;
  year: string;
  fileSize: string;
  url: string;
  isOfficial: boolean;
  isCompartment: boolean;
  isSolution: boolean;
  region: string;
  setCode: string;
  title: string;
}

export const allPapers: Paper[] = rawPapers as Paper[];

export const ALL_SUBJECTS = ['Geography', 'History', 'Economics', 'Hindi', 'English'] as const;
export type SubjectName = typeof ALL_SUBJECTS[number];

export const SUBJECT_METADATA: Record<SubjectName, {
  name: string;
  hindiName: string;
  code: string;
  description: string;
  icon: string;
  subStreams: string[];
}> = {
  Geography: {
    name: 'Geography',
    hindiName: 'भूगोल',
    code: '029',
    description: 'Human Geography, India - People and Economy, Practical Work, Map Studies',
    icon: 'Globe',
    subStreams: ['Geography']
  },
  History: {
    name: 'History',
    hindiName: 'इतिहास',
    code: '027',
    description: 'Themes in Indian History Parts I, II & III: Ancient, Medieval & Modern Eras',
    icon: 'Landmark',
    subStreams: ['History']
  },
  Economics: {
    name: 'Economics',
    hindiName: 'अर्थशास्त्र',
    code: '030',
    description: 'Introductory Macroeconomics and Indian Economic Development',
    icon: 'TrendingUp',
    subStreams: ['Economics']
  },
  Hindi: {
    name: 'Hindi',
    hindiName: 'हिन्दी',
    code: '002 / 022',
    description: 'Hindi Core (Aroh, Vitan, Abhivyakti) & Hindi Elective (Antra, Antral)',
    icon: 'BookOpen',
    subStreams: ['All Hindi', 'Hindi Core', 'Hindi Elective']
  },
  English: {
    name: 'English',
    hindiName: 'अंग्रेज़ी',
    code: '301 / 001',
    description: 'English Core (Flamingo, Vistas) & English Elective (Kaleidoscope, Literature)',
    icon: 'Feather',
    subStreams: ['All English', 'English Core', 'English Elective']
  }
};

export const ALL_YEARS = Array.from(new Set(allPapers.map(p => p.year))).sort((a, b) => Number(b) - Number(a));

export const getSubjectStats = () => {
  const counts: Record<string, number> = {};
  for (const p of allPapers) {
    counts[p.subject] = (counts[p.subject] || 0) + 1;
  }
  return counts;
};

export const getYearStats = (subject?: string) => {
  const counts: Record<string, number> = {};
  for (const p of allPapers) {
    if (!subject || subject === 'All' || p.subject === subject) {
      counts[p.year] = (counts[p.year] || 0) + 1;
    }
  }
  return counts;
};
