export interface Lesson {
  id: string;
  title: string;
  subtitle?: string;
  content: string; // HTML or markdown
  formulas: { name: string; formula: string; explanation: string }[];
  keyPoints: string[];
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Question {
  id: string;
  chapterId: string;
  lessonId: string;
  type: 'choice' | 'boolean' | 'fill' | 'match' | 'diagram';
  questionText: string;
  options?: string[]; // For choice questions
  correctAnswer: string; // Or serialized answer
  pairs?: { left: string; right: string }[]; // For match type questions
  diagramUrl?: string; // For diagram components labeling
  diagramLabels?: { id: string; x: number; y: number; correctLabel: string }[];
  explanation?: string;
}

export interface Flashcard {
  id: string;
  chapterId: string;
  lessonId: string;
  term: string;
  definition: string;
  category: 'term' | 'law'; // law shows formula on front or back
  formula?: string;
}

export interface SavedWorksheet {
  id: string;
  title: string;
  chapterIds: string[];
  lessonIds: string[];
  questionTypes: string[];
  numPages: number;
  createdAt: string;
  showWatermark: boolean;
}
