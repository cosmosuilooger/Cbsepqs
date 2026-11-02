export interface OfficialResourceItem {
  id: string;
  title: string;
  category: 'sqp' | 'marking_scheme' | 'question_bank' | 'model_answers' | 'curriculum' | 'apq' | 'manuals';
  subject: 'Geography' | 'History' | 'Economics' | 'Hindi' | 'English' | 'General';
  subStream?: string;
  session: string;
  url: string;
  description: string;
  badge?: string;
  format?: 'PDF';
}

export const OFFICIAL_RESOURCE_CATEGORIES = [
  { id: 'all', label: 'All Segments', icon: 'Layers' },
  { id: 'model_answers', label: 'Topper Model Answers', icon: 'Award' },
  { id: 'sqp', label: '5-Yr Sample Papers (SQP)', icon: 'FileCheck' },
  { id: 'marking_scheme', label: 'Official Answer Keys (MS)', icon: 'CheckSquare' },
  { id: 'apq', label: 'Practice Sets (APQs)', icon: 'Zap' },
  { id: 'question_bank', label: 'NEP Question Banks', icon: 'HelpCircle' },
  { id: 'curriculum', label: 'Curriculum & Syllabus', icon: 'BookOpen' },
  { id: 'manuals', label: 'Handbooks & Manuals', icon: 'FolderArchive' },
] as const;

// 1. Topper Copies from cbse.gov.in (Official Model Answers Written by Board Toppers)
const TOPPER_COPIES: OfficialResourceItem[] = [
  // 2023
  {
    id: 'topper-geo-2023',
    title: 'Geography Class 12 Topper Model Answer Booklet (2023)',
    category: 'model_answers',
    subject: 'Geography',
    subStream: 'Geography',
    session: '2023',
    url: 'https://www.cbse.gov.in/cbsenew/model-answer/2023/XII/Geography_029.pdf',
    description: 'Scanned official handwritten booklet of top scorer; demonstrates exemplary cartographic map plotting, neat point-wise presentation, and geographical terminology.',
    badge: '2023 Board Topper',
    format: 'PDF'
  },
  {
    id: 'topper-eng-core-2023',
    title: 'English Core Class 12 Topper Model Answer Booklet (2023)',
    category: 'model_answers',
    subject: 'English',
    subStream: 'English Core',
    session: '2023',
    url: 'https://www.cbse.gov.in/cbsenew/model-answer/2023/XII/English_Core_301.pdf',
    description: 'Scanned candidate answer script showing flawless letter to editor, article format, structured paragraphs, and concise literature answers.',
    badge: '2023 Board Topper',
    format: 'PDF'
  },
  {
    id: 'topper-eng-elec-2023',
    title: 'English Elective Class 12 Topper Model Answer Booklet (2023)',
    category: 'model_answers',
    subject: 'English',
    subStream: 'English Elective',
    session: '2023',
    url: 'https://www.cbse.gov.in/cbsenew/model-answer/2023/XII/English_Elective_001.pdf',
    description: 'Full evaluated candidate script for literary critique, poetry analysis, and creative writing.',
    badge: '2023 Board Topper',
    format: 'PDF'
  },
  {
    id: 'topper-hindi-core-2023',
    title: 'Hindi Core Class 12 Topper Model Answer Booklet (2023)',
    category: 'model_answers',
    subject: 'Hindi',
    subStream: 'Hindi Core',
    session: '2023',
    url: 'https://www.cbse.gov.in/cbsenew/model-answer/2023/XII/Hindi_Core_302.pdf',
    description: 'Scanned candidate answer book highlighting shuddh vartani (orthography), shreshth padya vyakhya, and patra lekhan.',
    badge: '2023 Board Topper',
    format: 'PDF'
  },
  {
    id: 'topper-hindi-elec-2023',
    title: 'Hindi Elective Class 12 Topper Model Answer Booklet (2023)',
    category: 'model_answers',
    subject: 'Hindi',
    subStream: 'Hindi Elective',
    session: '2023',
    url: 'https://www.cbse.gov.in/cbsenew/model-answer/2023/XII/Hindi_Elective_002.pdf',
    description: 'Scanned candidate booklet for Hindi Elective (Antra & Antral) annual examination.',
    badge: '2023 Board Topper',
    format: 'PDF'
  },

  // 2022 (Term II)
  {
    id: 'topper-history-2022',
    title: 'History Class 12 Topper Model Answer Booklet (2022 Term II)',
    category: 'model_answers',
    subject: 'History',
    subStream: 'History',
    session: '2022 Term II',
    url: 'https://www.cbse.gov.in/cbsenew/model-answer/2022/Term_II/XII/History_027.pdf',
    description: 'Evaluated candidate script illustrating chronological structuring, source appraisal, and historical reasoning.',
    badge: '2022 Topper Script',
    format: 'PDF'
  },
  {
    id: 'topper-economics-2022',
    title: 'Economics Class 12 Topper Model Answer Booklet (2022 Term II)',
    category: 'model_answers',
    subject: 'Economics',
    subStream: 'Economics',
    session: '2022 Term II',
    url: 'https://www.cbse.gov.in/cbsenew/model-answer/2022/Term_II/XII/Economics_030.pdf',
    description: 'Diagrammatic schedules, multiplier formula steps, and clean macroeconomic presentation.',
    badge: '2022 Topper Script',
    format: 'PDF'
  },
  {
    id: 'topper-geo-2022',
    title: 'Geography Class 12 Topper Model Answer Booklet (2022 Term II)',
    category: 'model_answers',
    subject: 'Geography',
    subStream: 'Geography',
    session: '2022 Term II',
    url: 'https://www.cbse.gov.in/cbsenew/model-answer/2022/Term_II/XII/Geography_029.pdf',
    description: 'Official candidate script for Human Geography & India People and Economy Term II.',
    badge: '2022 Topper Script',
    format: 'PDF'
  },
  {
    id: 'topper-eng-core-2022',
    title: 'English Core Class 12 Topper Model Answer Booklet (2022 Term II)',
    category: 'model_answers',
    subject: 'English',
    subStream: 'English Core',
    session: '2022 Term II',
    url: 'https://www.cbse.gov.in/cbsenew/model-answer/2022/Term_II/XII/EnglishCore_301.pdf',
    description: 'Official Term II answer script with literature analyses and creative expression.',
    badge: '2022 Topper Script',
    format: 'PDF'
  },
  {
    id: 'topper-eng-elec-2022',
    title: 'English Elective Class 12 Topper Model Answer Booklet (2022 Term II)',
    category: 'model_answers',
    subject: 'English',
    subStream: 'English Elective',
    session: '2022 Term II',
    url: 'https://www.cbse.gov.in/cbsenew/model-answer/2022/Term_II/XII/English_Elective_001.pdf',
    description: 'Official candidate answer booklet for English Elective Term II.',
    badge: '2022 Topper Script',
    format: 'PDF'
  },
  {
    id: 'topper-hindi-core-2022',
    title: 'Hindi Core Class 12 Topper Model Answer Booklet (2022 Term II)',
    category: 'model_answers',
    subject: 'Hindi',
    subStream: 'Hindi Core',
    session: '2022 Term II',
    url: 'https://www.cbse.gov.in/cbsenew/model-answer/2022/Term_II/XII/Hindi_Core_302.pdf',
    description: 'Official evaluated script for Hindi Core board examination.',
    badge: '2022 Topper Script',
    format: 'PDF'
  },
  {
    id: 'topper-hindi-elec-2022',
    title: 'Hindi Elective Class 12 Topper Model Answer Booklet (2022 Term II)',
    category: 'model_answers',
    subject: 'Hindi',
    subStream: 'Hindi Elective',
    session: '2022 Term II',
    url: 'https://www.cbse.gov.in/cbsenew/model-answer/2022/Term_II/XII/Hindi_Elective_002.pdf',
    description: 'Official candidate script for Hindi Elective Term II examination.',
    badge: '2022 Topper Script',
    format: 'PDF'
  },

  // 2020
  {
    id: 'topper-history-2020',
    title: 'History Class 12 Board Exam Topper Model Answer Script (2020)',
    category: 'model_answers',
    subject: 'History',
    subStream: 'History',
    session: '2020',
    url: 'https://www.cbse.gov.in/cbsenew/model-answer/2020/history.pdf',
    description: 'Complete 80-mark annual board exam candidate script with long essay answers.',
    badge: 'Full Board Script',
    format: 'PDF'
  },
  {
    id: 'topper-economics-2020',
    title: 'Economics Class 12 Board Exam Topper Model Answer Script (2020)',
    category: 'model_answers',
    subject: 'Economics',
    subStream: 'Economics',
    session: '2020',
    url: 'https://www.cbse.gov.in/cbsenew/model-answer/2020/economics.pdf',
    description: 'Scanned candidate script with flawless calculations and macroeconomic schedules.',
    badge: 'Full Board Script',
    format: 'PDF'
  },

  // 2019
  {
    id: 'topper-history-2019',
    title: 'History Class 12 Topper Model Answer Booklet 2019 (Code 027)',
    category: 'model_answers',
    subject: 'History',
    subStream: 'History',
    session: '2019',
    url: 'https://www.cbse.gov.in/cbsenew/model-answer/2019/027_HISTORY.pdf',
    description: 'Evaluated 2019 board script highlighting Themes in Indian History responses.',
    badge: 'Full Board Script',
    format: 'PDF'
  },
  {
    id: 'topper-economics-2019',
    title: 'Economics Class 12 Topper Model Answer Booklet 2019 (Code 030)',
    category: 'model_answers',
    subject: 'Economics',
    subStream: 'Economics',
    session: '2019',
    url: 'https://www.cbse.gov.in/cbsenew/model-answer/2019/030_ECONOMICS.pdf',
    description: 'Full candidate answer script for Economics annual board examination.',
    badge: 'Full Board Script',
    format: 'PDF'
  },
  {
    id: 'topper-geography-2019',
    title: 'Geography Class 12 Topper Model Answer Booklet 2019 (Code 029)',
    category: 'model_answers',
    subject: 'Geography',
    subStream: 'Geography',
    session: '2019',
    url: 'https://www.cbse.gov.in/cbsenew/model-answer/2019/029_GEOGRAPHY.pdf',
    description: 'Exemplary answer sheet with cartographic accuracy and geographical definitions.',
    badge: 'Full Board Script',
    format: 'PDF'
  },
  {
    id: 'topper-eng-core-2019',
    title: 'English Core Class 12 Topper Model Answer Booklet 2019 (Code 301)',
    category: 'model_answers',
    subject: 'English',
    subStream: 'English Core',
    session: '2019',
    url: 'https://www.cbse.gov.in/cbsenew/model-answer/2019/301_ENGLISH_CORE.pdf',
    description: 'Authentic board evaluated script demonstrating advanced prose and letter writing.',
    badge: 'Full Board Script',
    format: 'PDF'
  },
  {
    id: 'topper-eng-elec-2019',
    title: 'English Elective Class 12 Topper Model Answer Booklet 2019 (Code 001)',
    category: 'model_answers',
    subject: 'English',
    subStream: 'English Elective',
    session: '2019',
    url: 'https://www.cbse.gov.in/cbsenew/model-answer/2019/001_ENGLISH_ELEC.pdf',
    description: 'Official candidate script for English Elective annual examination.',
    badge: 'Full Board Script',
    format: 'PDF'
  },
  {
    id: 'topper-hindi-core-2019',
    title: 'Hindi Core Class 12 Topper Model Answer Booklet 2019 (Code 302)',
    category: 'model_answers',
    subject: 'Hindi',
    subStream: 'Hindi Core',
    session: '2019',
    url: 'https://www.cbse.gov.in/cbsenew/model-answer/2019/302_HINDI_CORE.pdf',
    description: 'Official candidate booklet for Hindi Core annual examination.',
    badge: 'Full Board Script',
    format: 'PDF'
  },
  {
    id: 'topper-hindi-elec-2019',
    title: 'Hindi Elective Class 12 Topper Model Answer Booklet 2019 (Code 002)',
    category: 'model_answers',
    subject: 'Hindi',
    subStream: 'Hindi Elective',
    session: '2019',
    url: 'https://www.cbse.gov.in/cbsenew/model-answer/2019/002_HINDI_ELEC.pdf',
    description: 'Official candidate booklet for Hindi Elective annual examination.',
    badge: 'Full Board Script',
    format: 'PDF'
  }
];

// 2. 5-Year Sample Question Papers (SQPs) & Official Marking Schemes (MS) from cbseacademic.nic.in
const SQP_MS_DATA: OfficialResourceItem[] = [];

const SESSIONS = [
  { yearStr: '2026-27', folder: 'ClassXII_2026_27', label: '2027 Board Cycle' },
  { yearStr: '2025-26', folder: 'ClassXII_2025_26', label: '2026 Board Cycle' },
  { yearStr: '2024-25', folder: 'ClassXII_2024_25', label: '2025 Board Cycle' },
  { yearStr: '2023-24', folder: 'ClassXII_2023_24', label: '2024 Board Cycle' },
  { yearStr: '2022-23', folder: 'ClassXII_2022_23', label: '2023 Board Cycle' },
  { yearStr: '2020-21', folder: 'ClassXII_2020_21', label: '2021 Board Cycle' }
];

const SUBJECT_CONFIGS: { name: 'Geography' | 'History' | 'Economics' | 'Hindi' | 'English'; filePrefix: string; subStream: string }[] = [
  { name: 'History', filePrefix: 'History', subStream: 'History' },
  { name: 'Geography', filePrefix: 'Geography', subStream: 'Geography' },
  { name: 'Economics', filePrefix: 'Economics', subStream: 'Economics' },
  { name: 'English', filePrefix: 'EnglishCore', subStream: 'English Core' },
  { name: 'English', filePrefix: 'EnglishElective', subStream: 'English Elective' },
  { name: 'Hindi', filePrefix: 'HindiCore', subStream: 'Hindi Core' },
  { name: 'Hindi', filePrefix: 'HindiElective', subStream: 'Hindi Elective' }
];

SESSIONS.forEach((session) => {
  SUBJECT_CONFIGS.forEach((cfg) => {
    // Sample Question Paper
    SQP_MS_DATA.push({
      id: `sqp-${cfg.filePrefix.toLowerCase()}-${session.yearStr.replace('-', '_')}`,
      title: `${cfg.subStream} Official Sample Question Paper (${session.yearStr})`,
      category: 'sqp',
      subject: cfg.name,
      subStream: cfg.subStream,
      session: session.yearStr,
      url: `https://cbseacademic.nic.in/web_material/SQP/${session.folder}/${cfg.filePrefix}-SQP.pdf`,
      description: `Official CBSE Class 12 ${cfg.subStream} blueprint and question structure released for ${session.yearStr}.`,
      badge: `${session.yearStr} SQP`,
      format: 'PDF'
    });

    // Official Marking Scheme
    SQP_MS_DATA.push({
      id: `ms-${cfg.filePrefix.toLowerCase()}-${session.yearStr.replace('-', '_')}`,
      title: `${cfg.subStream} Official Marking Scheme & Answer Key (${session.yearStr})`,
      category: 'marking_scheme',
      subject: cfg.name,
      subStream: cfg.subStream,
      session: session.yearStr,
      url: `https://cbseacademic.nic.in/web_material/SQP/${session.folder}/${cfg.filePrefix}-MS.pdf`,
      description: `Official step-by-step point allocation, value points, and scoring key published by CBSE for ${session.yearStr}.`,
      badge: `${session.yearStr} Answer Key`,
      format: 'PDF'
    });

    // Hindi Medium variant for History & Geography in 2025-26 and 2026-27
    if ((session.yearStr === '2025-26' || session.yearStr === '2026-27') && (cfg.name === 'History' || cfg.name === 'Geography')) {
      SQP_MS_DATA.push({
        id: `sqp-${cfg.filePrefix.toLowerCase()}-${session.yearStr.replace('-', '_')}-hi`,
        title: `${cfg.subStream} Official Sample Question Paper (${session.yearStr}) - हिन्दी माध्यम`,
        category: 'sqp',
        subject: cfg.name,
        subStream: cfg.subStream,
        session: session.yearStr,
        url: `https://cbseacademic.nic.in/web_material/SQP/${session.folder}/${cfg.filePrefix}-SQP_hi.pdf`,
        description: `Official CBSE Class 12 ${cfg.subStream} sample paper in Hindi medium format for ${session.yearStr}.`,
        badge: `${session.yearStr} SQP (हिन्दी)`,
        format: 'PDF'
      });

      SQP_MS_DATA.push({
        id: `ms-${cfg.filePrefix.toLowerCase()}-${session.yearStr.replace('-', '_')}-hi`,
        title: `${cfg.subStream} Official Marking Scheme (${session.yearStr}) - हिन्दी माध्यम`,
        category: 'marking_scheme',
        subject: cfg.name,
        subStream: cfg.subStream,
        session: session.yearStr,
        url: `https://cbseacademic.nic.in/web_material/SQP/${session.folder}/${cfg.filePrefix}-MS_hi.pdf`,
        description: `Official CBSE Class 12 ${cfg.subStream} marking scheme in Hindi medium for ${session.yearStr}.`,
        badge: `${session.yearStr} Key (हिन्दी)`,
        format: 'PDF'
      });
    }
  });
});

// 2021-22 Term 1 and Term 2
const T2122_CONFIGS: { name: 'Geography' | 'History' | 'Economics' | 'Hindi' | 'English'; filePrefix: string; subStream: string }[] = [
  { name: 'History', filePrefix: 'History', subStream: 'History' },
  { name: 'Geography', filePrefix: 'Geography', subStream: 'Geography' },
  { name: 'Economics', filePrefix: 'Economics', subStream: 'Economics' },
  { name: 'English', filePrefix: 'EnglishCore', subStream: 'English Core' },
  { name: 'Hindi', filePrefix: 'HindiCore', subStream: 'Hindi Core' }
];

T2122_CONFIGS.forEach((cfg) => {
  // Term 1 (MCQ)
  SQP_MS_DATA.push({
    id: `sqp-${cfg.filePrefix.toLowerCase()}-2021_22_t1`,
    title: `${cfg.subStream} Official Sample Question Paper 2021-22 (Term 1 MCQ)`,
    category: 'sqp',
    subject: cfg.name,
    subStream: cfg.subStream,
    session: '2021-22 Term 1',
    url: `https://cbseacademic.nic.in/web_material/SQP/ClassXII_2021_22/${cfg.filePrefix}-SQP.pdf`,
    description: `Official Term 1 objective MCQ blueprint and sample paper.`,
    badge: 'Term 1 SQP',
    format: 'PDF'
  });
  SQP_MS_DATA.push({
    id: `ms-${cfg.filePrefix.toLowerCase()}-2021_22_t1`,
    title: `${cfg.subStream} Official Marking Scheme 2021-22 (Term 1)`,
    category: 'marking_scheme',
    subject: cfg.name,
    subStream: cfg.subStream,
    session: '2021-22 Term 1',
    url: `https://cbseacademic.nic.in/web_material/SQP/ClassXII_2021_22/${cfg.filePrefix}-MS.pdf`,
    description: `Term 1 scoring key and answer explanations.`,
    badge: 'Term 1 Key',
    format: 'PDF'
  });

  // Term 2 (Descriptive)
  SQP_MS_DATA.push({
    id: `sqp-${cfg.filePrefix.toLowerCase()}-2021_22_t2`,
    title: `${cfg.subStream} Official Sample Question Paper 2021-22 (Term 2 Subjective)`,
    category: 'sqp',
    subject: cfg.name,
    subStream: cfg.subStream,
    session: '2021-22 Term 2',
    url: `https://cbseacademic.nic.in/web_material/SQP/ClassXII_2021_22/${cfg.filePrefix}-SQP_Term2.pdf`,
    description: `Official Term 2 subjective descriptive board paper.`,
    badge: 'Term 2 SQP',
    format: 'PDF'
  });
  SQP_MS_DATA.push({
    id: `ms-${cfg.filePrefix.toLowerCase()}-2021_22_t2`,
    title: `${cfg.subStream} Official Marking Scheme 2021-22 (Term 2)`,
    category: 'marking_scheme',
    subject: cfg.name,
    subStream: cfg.subStream,
    session: '2021-22 Term 2',
    url: `https://cbseacademic.nic.in/web_material/SQP/ClassXII_2021_22/${cfg.filePrefix}-MS_Term2.pdf`,
    description: `Term 2 subjective answer key and grading rubrics.`,
    badge: 'Term 2 Key',
    format: 'PDF'
  });
});

// 3. Official Question Banks (qbclass12.html)
const QUESTION_BANKS: OfficialResourceItem[] = [
  {
    id: 'qb-history-xii',
    title: 'Class XII History Official Competency Question Bank',
    category: 'question_bank',
    subject: 'History',
    subStream: 'History',
    session: 'Official CBSE',
    url: 'https://cbseacademic.nic.in/web_material/QuestionBank/ClassXII/HistoryXII.pdf',
    description: 'Extensive chapter-wise competency questions, source analyses, and chronological reasoning.',
    badge: 'NEP Competency Bank',
    format: 'PDF'
  },
  {
    id: 'qb-economics-xii',
    title: 'Class XII Economics Official Competency Question Bank',
    category: 'question_bank',
    subject: 'Economics',
    subStream: 'Economics',
    session: 'Official CBSE',
    url: 'https://cbseacademic.nic.in/web_material/QuestionBank/ClassXII/EconomicsXII.pdf',
    description: 'Case studies, macroeconomic curves, numerical data sets, and Indian economic dilemmas.',
    badge: 'NEP Competency Bank',
    format: 'PDF'
  },
  {
    id: 'qb-english-core-xii',
    title: 'Class XII English Core Official Competency Question Bank',
    category: 'question_bank',
    subject: 'English',
    subStream: 'English Core',
    session: 'Official CBSE',
    url: 'https://cbseacademic.nic.in/web_material/QuestionBank/ClassXII/EnglishCoreXII.pdf',
    description: 'Inference-based reading passages, analytical paragraphs, and thematic literature extracts.',
    badge: 'NEP Competency Bank',
    format: 'PDF'
  },
  {
    id: 'qb-pol-science-xii',
    title: 'Class XII Political Science Official Question Bank',
    category: 'question_bank',
    subject: 'General',
    session: 'Official CBSE',
    url: 'https://cbseacademic.nic.in/web_material/QuestionBank/ClassXII/PoliticalScienceXII.pdf',
    description: 'Contemporary world politics and Indian politics since independence practice modules.',
    badge: 'Humanities Bank',
    format: 'PDF'
  },
  {
    id: 'qb-sociology-xii',
    title: 'Class XII Sociology Official Question Bank',
    category: 'question_bank',
    subject: 'General',
    session: 'Official CBSE',
    url: 'https://cbseacademic.nic.in/web_material/QuestionBank/ClassXII/SociologyXII.pdf',
    description: 'Indian society and social institutions analytical questions and case investigations.',
    badge: 'Humanities Bank',
    format: 'PDF'
  }
];

// 4. Additional Practice Questions (APQs) from additionalPQ.html
const APQ_ITEMS: OfficialResourceItem[] = [
  {
    id: 'apq-history-set1',
    title: 'History Official Additional Practice Questions (Set 1)',
    category: 'apq',
    subject: 'History',
    subStream: 'History',
    session: '2023-24',
    url: 'https://cbseacademic.nic.in/web_material/SQP/ClassXII_2023_24/History-PQ.pdf',
    description: 'High-difficulty mock question set released directly by CBSE ahead of boards.',
    badge: 'Practice Set 1',
    format: 'PDF'
  },
  {
    id: 'apq-history-ms1',
    title: 'History Official Additional Practice Marking Scheme (Set 1)',
    category: 'apq',
    subject: 'History',
    subStream: 'History',
    session: '2023-24',
    url: 'https://cbseacademic.nic.in/web_material/SQP/ClassXII_2023_24/History-PQMS.pdf',
    description: 'Official answers and point allocation for History Practice Questions Set 1.',
    badge: 'Answer Key',
    format: 'PDF'
  },
  {
    id: 'apq-history-set2',
    title: 'History Official Additional Practice Questions (Set 2)',
    category: 'apq',
    subject: 'History',
    subStream: 'History',
    session: '2023-24',
    url: 'https://cbseacademic.nic.in/web_material/SQP/ClassXII_2023_24/History-PQ2.pdf',
    description: 'Supplementary high-order thinking items for History board preparation.',
    badge: 'Practice Set 2',
    format: 'PDF'
  },
  {
    id: 'apq-history-ms2',
    title: 'History Official Additional Practice Marking Scheme (Set 2)',
    category: 'apq',
    subject: 'History',
    subStream: 'History',
    session: '2023-24',
    url: 'https://cbseacademic.nic.in/web_material/SQP/ClassXII_2023_24/History-PQMS2.pdf',
    description: 'Official answer key for History Practice Questions Set 2.',
    badge: 'Answer Key',
    format: 'PDF'
  },
  {
    id: 'apq-geography-set1',
    title: 'Geography Official Additional Practice Questions (Set 1)',
    category: 'apq',
    subject: 'Geography',
    subStream: 'Geography',
    session: '2023-24',
    url: 'https://cbseacademic.nic.in/web_material/SQP/ClassXII_2023_24/Geography-PQ.pdf',
    description: 'Case-based geographical scenarios, map drills, and spatial data interpretation.',
    badge: 'Practice Set 1',
    format: 'PDF'
  },
  {
    id: 'apq-geography-ms1',
    title: 'Geography Official Additional Practice Marking Scheme (Set 1)',
    category: 'apq',
    subject: 'Geography',
    subStream: 'Geography',
    session: '2023-24',
    url: 'https://cbseacademic.nic.in/web_material/SQP/ClassXII_2023_24/Geography-PQMS.pdf',
    description: 'Official answers and marking breakdown for Geography Set 1.',
    badge: 'Answer Key',
    format: 'PDF'
  },
  {
    id: 'apq-geography-set2',
    title: 'Geography Official Additional Practice Questions (Set 2)',
    category: 'apq',
    subject: 'Geography',
    subStream: 'Geography',
    session: '2023-24',
    url: 'https://cbseacademic.nic.in/web_material/SQP/ClassXII_2023_24/Geography-PQ2.pdf',
    description: 'Intensive map work and thematic human geography practice problems.',
    badge: 'Practice Set 2',
    format: 'PDF'
  },
  {
    id: 'apq-geography-ms2',
    title: 'Geography Official Additional Practice Marking Scheme (Set 2)',
    category: 'apq',
    subject: 'Geography',
    subStream: 'Geography',
    session: '2023-24',
    url: 'https://cbseacademic.nic.in/web_material/SQP/ClassXII_2023_24/Geography-PQMS2.pdf',
    description: 'Official answer key for Geography Set 2.',
    badge: 'Answer Key',
    format: 'PDF'
  },
  {
    id: 'apq-economics-set1',
    title: 'Economics Official Additional Practice Questions (Set 1)',
    category: 'apq',
    subject: 'Economics',
    subStream: 'Economics',
    session: '2023-24',
    url: 'https://cbseacademic.nic.in/web_material/SQP/ClassXII_2023_24/Economics_PQ.pdf',
    description: 'Challenging numericals in National Income, Keynesian economics, and rural credit analysis.',
    badge: 'Practice Set 1',
    format: 'PDF'
  },
  {
    id: 'apq-economics-ms1',
    title: 'Economics Official Additional Practice Marking Scheme (Set 1)',
    category: 'apq',
    subject: 'Economics',
    subStream: 'Economics',
    session: '2023-24',
    url: 'https://cbseacademic.nic.in/web_material/SQP/ClassXII_2023_24/Economics_PQMS.pdf',
    description: 'Detailed steps, formulas, and examiner justifications for Economics Set 1.',
    badge: 'Answer Key',
    format: 'PDF'
  },
  {
    id: 'apq-economics-set2',
    title: 'Economics Official Additional Practice Questions (Set 2)',
    category: 'apq',
    subject: 'Economics',
    subStream: 'Economics',
    session: '2023-24',
    url: 'https://cbseacademic.nic.in/web_material/SQP/ClassXII_2023_24/Economics_PQ2.pdf',
    description: 'Second full revision question bank for Macroeconomics & Indian Economy.',
    badge: 'Practice Set 2',
    format: 'PDF'
  },
  {
    id: 'apq-economics-ms2',
    title: 'Economics Official Additional Practice Marking Scheme (Set 2)',
    category: 'apq',
    subject: 'Economics',
    subStream: 'Economics',
    session: '2023-24',
    url: 'https://cbseacademic.nic.in/web_material/SQP/ClassXII_2023_24/Economics_PQMS2.pdf',
    description: 'Official answer key for Economics Set 2.',
    badge: 'Answer Key',
    format: 'PDF'
  },
  {
    id: 'apq-english-core-set1',
    title: 'English Core Official Additional Practice Questions (Set 1)',
    category: 'apq',
    subject: 'English',
    subStream: 'English Core',
    session: '2023-24',
    url: 'https://cbseacademic.nic.in/web_material/SQP/ClassXII_2023_24/EnglishCore-PQ.pdf',
    description: 'Extensive reading comprehension and notice/letter/article writing practice questions.',
    badge: 'Practice Set 1',
    format: 'PDF'
  },
  {
    id: 'apq-english-core-ms1',
    title: 'English Core Official Additional Practice Marking Scheme (Set 1)',
    category: 'apq',
    subject: 'English',
    subStream: 'English Core',
    session: '2023-24',
    url: 'https://cbseacademic.nic.in/web_material/SQP/ClassXII_2023_24/EnglishCore-PQMS.pdf',
    description: 'Official expression guidelines, format points, and literary value points.',
    badge: 'Answer Key',
    format: 'PDF'
  },
  {
    id: 'apq-hindi-set1',
    title: 'Hindi Official Additional Practice Questions (Set 1)',
    category: 'apq',
    subject: 'Hindi',
    subStream: 'Hindi Core',
    session: '2023-24',
    url: 'https://cbseacademic.nic.in/web_material/SQP/ClassXII_2023_24/Hindi-PQ.pdf',
    description: 'Official high-level practice paper for Hindi Core & Elective board examination.',
    badge: 'Practice Set 1',
    format: 'PDF'
  },
  {
    id: 'apq-hindi-ms1',
    title: 'Hindi Official Additional Practice Marking Scheme (Set 1)',
    category: 'apq',
    subject: 'Hindi',
    subStream: 'Hindi Core',
    session: '2023-24',
    url: 'https://cbseacademic.nic.in/web_material/SQP/ClassXII_2023_24/Hindi-PQMS.pdf',
    description: 'Official scoring and answer key for Hindi Practice Questions.',
    badge: 'Answer Key',
    format: 'PDF'
  }
];

// 5. Official Curriculum & Detailed Syllabus (curriculum_2025.html)
const CURRICULUM_ITEMS: OfficialResourceItem[] = [
  {
    id: 'curr-history-2025',
    title: 'History (Code 027) Official Senior Secondary Curriculum 2024-25',
    category: 'curriculum',
    subject: 'History',
    subStream: 'History',
    session: '2024-25',
    url: 'https://cbseacademic.nic.in/web_material/CurriculumMain25/SrSec/History_SrSec_2024-25.pdf',
    description: 'Prescribed course contents, unit-wise marks distribution, project work rubrics, and map list.',
    badge: 'Official Syllabus',
    format: 'PDF'
  },
  {
    id: 'curr-geography-2025',
    title: 'Geography (Code 029) Official Senior Secondary Curriculum 2024-25',
    category: 'curriculum',
    subject: 'Geography',
    subStream: 'Geography',
    session: '2024-25',
    url: 'https://cbseacademic.nic.in/web_material/CurriculumMain25/SrSec/Geography_SrSec_2024-25.pdf',
    description: 'Theory syllabus (70 marks) + Practical work guidelines (30 marks) and surveying handbook.',
    badge: 'Official Syllabus',
    format: 'PDF'
  },
  {
    id: 'curr-economics-2025',
    title: 'Economics (Code 030) Official Senior Secondary Curriculum 2024-25',
    category: 'curriculum',
    subject: 'Economics',
    subStream: 'Economics',
    session: '2024-25',
    url: 'https://cbseacademic.nic.in/web_material/CurriculumMain25/SrSec/Economics_SrSec_2024-25.pdf',
    description: 'Course structure for Macroeconomics & Indian Economic Development + 20-mark Project Guidelines.',
    badge: 'Official Syllabus',
    format: 'PDF'
  },
  {
    id: 'curr-hindi-core-2025',
    title: 'Hindi Core (Code 302) Official Senior Secondary Curriculum 2024-25',
    category: 'curriculum',
    subject: 'Hindi',
    subStream: 'Hindi Core',
    session: '2024-25',
    url: 'https://cbseacademic.nic.in/web_material/CurriculumMain25/SrSec/Hindi_Core_SrSec_2024-25.pdf',
    description: 'Complete syllabus, textbook chapters, and shravan-vachan (ASL) evaluation rules.',
    badge: 'Official Syllabus',
    format: 'PDF'
  },
  {
    id: 'curr-hindi-elec-2025',
    title: 'Hindi Elective (Code 002) Official Senior Secondary Curriculum 2024-25',
    category: 'curriculum',
    subject: 'Hindi',
    subStream: 'Hindi Elective',
    session: '2024-25',
    url: 'https://cbseacademic.nic.in/web_material/CurriculumMain25/SrSec/Hindi_Elective_SrSec_2024-25.pdf',
    description: 'Antra & Antral prescribed chapters, kavyashastra, and project work criteria.',
    badge: 'Official Syllabus',
    format: 'PDF'
  },
  {
    id: 'curr-english-core-2025',
    title: 'English Core (Code 301) Official Senior Secondary Curriculum 2024-25',
    category: 'curriculum',
    subject: 'English',
    subStream: 'English Core',
    session: '2024-25',
    url: 'https://cbseacademic.nic.in/web_material/CurriculumMain25/SrSec/English_core_SrSec_2024-25.pdf',
    description: 'Section A (Reading), Section B (Writing Skills), Section C (Literature) and ASL guidelines.',
    badge: 'Official Syllabus',
    format: 'PDF'
  },
  {
    id: 'curr-english-elec-2025',
    title: 'English Elective (Code 001) Official Senior Secondary Curriculum 2024-25',
    category: 'curriculum',
    subject: 'English',
    subStream: 'English Elective',
    session: '2024-25',
    url: 'https://cbseacademic.nic.in/web_material/CurriculumMain25/SrSec/English_elective_SrSec_2024-25.pdf',
    description: 'Prescribed texts, seminars, and literary appreciation project outlines.',
    badge: 'Official Syllabus',
    format: 'PDF'
  }
];

// 6. Handbooks & Pedagogical Manuals
const MANUALS_ITEMS: OfficialResourceItem[] = [
  {
    id: 'manual-art-integration',
    title: 'Art-Integrated Learning (AIL) Official Handbook',
    category: 'manuals',
    subject: 'General',
    session: 'Official CBSE',
    url: 'https://cbseacademic.nic.in/web_material/Manuals/Art_Integration.pdf',
    description: 'Mandatory guidelines for Class 12 Art-Integrated research projects across Humanities.',
    badge: 'Official Handbook',
    format: 'PDF'
  },
  {
    id: 'manual-nep-progress',
    title: 'Competency-Based Education & NEP Progress Framework',
    category: 'manuals',
    subject: 'General',
    session: 'Official CBSE',
    url: 'https://cbseacademic.nic.in/web_material/Manuals/Progress_of_NEP.pdf',
    description: 'Curricular shifts, cognitive frameworks, and criterion-referenced assessment guidelines.',
    badge: 'Policy Document',
    format: 'PDF'
  },
  {
    id: 'manual-disaster-reduction',
    title: 'Disaster Risk Reduction & Geography Field Guidelines',
    category: 'manuals',
    subject: 'Geography',
    subStream: 'Geography',
    session: 'Official CBSE',
    url: 'https://cbseacademic.nic.in/web_material/Manuals/DisasterRiskReduction24.pdf',
    description: 'Practical fieldwork instructions, environmental mapping, and risk mitigation methodologies.',
    badge: 'Practical Manual',
    format: 'PDF'
  },
  {
    id: 'manual-vocational-skills',
    title: 'Vocational & Applied Skills Compendium (Senior Secondary)',
    category: 'manuals',
    subject: 'General',
    session: 'Official CBSE',
    url: 'https://cbseacademic.nic.in/web_material/skilledu/Compendium-2026.pdf',
    description: 'Guidelines for elective vocational competencies, applied research, and internal grades.',
    badge: 'Skill Compendium',
    format: 'PDF'
  }
];

export const ALL_OFFICIAL_ACADEMIC_RESOURCES: OfficialResourceItem[] = [
  ...TOPPER_COPIES,
  ...SQP_MS_DATA,
  ...APQ_ITEMS,
  ...QUESTION_BANKS,
  ...CURRICULUM_ITEMS,
  ...MANUALS_ITEMS
];
