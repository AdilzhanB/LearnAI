// Algorithm types and interfaces
export interface Algorithm {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: AlgorithmCategory;
  difficulty: DifficultyLevel;
  estimatedTime: number; // in minutes
  prerequisites: string[];
  applications: string[];
  advantages: string[];
  disadvantages: string[];
  timeComplexity: string;
  spaceComplexity: string;
  
  // Visual content
  thumbnailUrl: string;
  visualizationComponent: string;
  codeExamples: CodeExample[];
  mathematicalBackground: MathContent[];
  
  // Learning content
  sections: AlgorithmSection[];
  quiz: QuizQuestion[];
  
  // Metadata
  tags: string[];
  popularity: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  
  // Progress tracking
  progress?: UserProgress;
}

export interface CodeExample {
  id: string;
  language: ProgrammingLanguage;
  title: string;
  description: string;
  code: string;
  explanation: string;
  runnable: boolean;
  complexity?: {
    time: string;
    space: string;
  };
}

export interface MathContent {
  id: string;
  title: string;
  content: string;
  latex: string;
  explanation: string;
  examples: string[];
}

export interface AlgorithmSection {
  id: string;
  title: string;
  content: string;
  type: SectionType;
  order: number;
  estimatedTime: number;
  isCompleted?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: QuestionType;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  difficulty: DifficultyLevel;
  points: number;
}

export interface UserProgress {
  algorithmId: string;
  userId: string;
  status: ProgressStatus;
  completedSections: string[];
  timeSpent: number; // in minutes
  accuracy: number; // percentage
  attempts: number;
  lastAccessed: Date;
  startedAt: Date;
  completedAt?: Date;
  bookmarked: boolean;
  rating?: number;
  notes?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  points: number;
  rarity: AchievementRarity;
  requirements: AchievementRequirement[];
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

export interface AchievementRequirement {
  type: 'algorithms_completed' | 'time_spent' | 'accuracy' | 'streak' | 'category_mastery';
  value: number;
  category?: AlgorithmCategory;
}

export interface LearningPath {
  id: string;
  name: string;
  description: string;
  estimatedTime: number;
  difficulty: DifficultyLevel;
  algorithmIds: string[];
  prerequisites: string[];
  skills: string[];
  projects: Project[];
  order: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  difficulty: DifficultyLevel;
  estimatedTime: number;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  instructions: string[];
  resources: Resource[];
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  url: string;
  difficulty: DifficultyLevel;
  duration?: number;
  author?: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
  type: 'user' | 'ai';
  context?: {
    algorithmId?: string;
    sectionId?: string;
    topic?: string;
  };
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  level: number;
  experiencePoints: number;
  globalRank: number;
  totalTimeSpent: number;
  algorithmsCompleted: number;
  currentStreak: number;
  longestStreak: number;
  preferredLanguage: string;
  learningGoals: string[];
  achievements: Achievement[];
  preferences: UserPreferences;
  createdAt: Date;
  lastActive: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'ru' | 'kz';
  notifications: {
    email: boolean;
    push: boolean;
    dailyReminder: boolean;
    weeklyProgress: boolean;
    achievements: boolean;
  };
  learningPreferences: {
    preferredProgrammingLanguage: ProgrammingLanguage;
    difficultyProgression: 'gradual' | 'adaptive' | 'challenging';
    studyTime: number; // minutes per day
    reminderTime: string; // HH:MM format
  };
}

// Enums
export enum AlgorithmCategory {
  DEEP_LEARNING = 'deep_learning',
  MACHINE_LEARNING = 'machine_learning',
  NEURAL_NETWORKS = 'neural_networks',
  REINFORCEMENT_LEARNING = 'reinforcement_learning',
  COMPUTER_VISION = 'computer_vision',
  NLP = 'nlp',
  OPTIMIZATION = 'optimization',
  STATISTICAL = 'statistical'
}

export enum DifficultyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export enum ProgrammingLanguage {
  PYTHON = 'python',
  PYTORCH = 'pytorch',
  TENSORFLOW = 'tensorflow',
  JAVASCRIPT = 'javascript',
  R = 'r',
  JULIA = 'julia',
  MATLAB = 'matlab'
}

export enum SectionType {
  THEORY = 'theory',
  VISUALIZATION = 'visualization',
  CODE = 'code',
  MATH = 'math',
  EXAMPLES = 'examples',
  QUIZ = 'quiz'
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  MULTIPLE_SELECT = 'multiple_select',
  TRUE_FALSE = 'true_false',
  FILL_IN_BLANK = 'fill_in_blank',
  CODE_COMPLETION = 'code_completion',
  ORDERING = 'ordering'
}

export enum ProgressStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  LOCKED = 'locked'
}

export enum AchievementCategory {
  LEARNING = 'learning',
  PERFORMANCE = 'performance',
  CONSISTENCY = 'consistency',
  EXPLORATION = 'exploration',
  SOCIAL = 'social',
  MILESTONE = 'milestone'
}

export enum AchievementRarity {
  COMMON = 'common',
  UNCOMMON = 'uncommon',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary'
}

export enum ResourceType {
  ARTICLE = 'article',
  VIDEO = 'video',
  PAPER = 'paper',
  BOOK = 'book',
  COURSE = 'course',
  TOOL = 'tool',
  DATASET = 'dataset'
}

// Filter and sort interfaces
export interface AlgorithmFilter {
  categories: AlgorithmCategory[];
  difficulties: DifficultyLevel[];
  status: ProgressStatus[];
  timeRange: [number, number]; // [min, max] in minutes
  rating: number;
  search: string;
  tags: string[];
}

export interface SortOption {
  field: 'name' | 'difficulty' | 'popularity' | 'rating' | 'estimatedTime' | 'createdAt';
  direction: 'asc' | 'desc';
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  success: boolean;
  message?: string;
}

// Learning analytics
export interface LearningAnalytics {
  userId: string;
  totalTimeSpent: number;
  algorithmsCompleted: number;
  averageAccuracy: number;
  categoriesProgress: Record<AlgorithmCategory, number>;
  difficultyProgress: Record<DifficultyLevel, number>;
  learningStreak: number;
  weeklyStats: WeeklyStats[];
  monthlyStats: MonthlyStats[];
}

export interface WeeklyStats {
  week: string; // YYYY-WW format
  timeSpent: number;
  algorithmsCompleted: number;
  accuracy: number;
  streakDays: number;
}

export interface MonthlyStats {
  month: string; // YYYY-MM format
  timeSpent: number;
  algorithmsCompleted: number;
  accuracy: number;
  newSkillsLearned: number;
  projectsCompleted: number;
}

// Gamification
export interface Leaderboard {
  period: 'daily' | 'weekly' | 'monthly' | 'all_time';
  users: LeaderboardEntry[];
  userRank?: number;
  updatedAt: Date;
}

export interface LeaderboardEntry {
  userId: string;
  displayName: string;
  photoURL?: string;
  score: number;
  rank: number;
  change: number; // rank change from previous period
  badge?: string;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: any;
  read: boolean;
  createdAt: Date;
  expiresAt?: Date;
}

export enum NotificationType {
  ACHIEVEMENT = 'achievement',
  STREAK = 'streak',
  REMINDER = 'reminder',
  PROGRESS = 'progress',
  SOCIAL = 'social',
  SYSTEM = 'system'
}

// Export all types
export type {
  Algorithm,
  CodeExample,
  MathContent,
  AlgorithmSection,
  QuizQuestion,
  UserProgress,
  Achievement,
  AchievementRequirement,
  LearningPath,
  Project,
  Resource,
  ChatMessage,
  UserProfile,
  UserPreferences,
  AlgorithmFilter,
  SortOption,
  ApiResponse,
  PaginatedResponse,
  LearningAnalytics,
  WeeklyStats,
  MonthlyStats,
  Leaderboard,
  LeaderboardEntry,
  Notification
};
