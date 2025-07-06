import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { UserProgress, Algorithm, Achievement, LearningAnalytics } from '../types';
import { useAuth } from './AuthContext';
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import toast from 'react-hot-toast';

interface ProgressState {
  userProgress: Record<string, UserProgress>;
  achievements: Achievement[];
  analytics: LearningAnalytics | null;
  loading: boolean;
}

type ProgressAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_PROGRESS'; payload: Record<string, UserProgress> }
  | { type: 'UPDATE_PROGRESS'; payload: UserProgress }
  | { type: 'SET_ACHIEVEMENTS'; payload: Achievement[] }
  | { type: 'ADD_ACHIEVEMENT'; payload: Achievement }
  | { type: 'SET_ANALYTICS'; payload: LearningAnalytics };

const initialState: ProgressState = {
  userProgress: {},
  achievements: [],
  analytics: null,
  loading: false
};

const progressReducer = (state: ProgressState, action: ProgressAction): ProgressState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_PROGRESS':
      return { ...state, userProgress: action.payload };
    case 'UPDATE_PROGRESS':
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          [action.payload.algorithmId]: action.payload
        }
      };
    case 'SET_ACHIEVEMENTS':
      return { ...state, achievements: action.payload };
    case 'ADD_ACHIEVEMENT':
      return {
        ...state,
        achievements: [...state.achievements, action.payload]
      };
    case 'SET_ANALYTICS':
      return { ...state, analytics: action.payload };
    default:
      return state;
  }
};

interface ProgressContextType {
  state: ProgressState;
  startAlgorithm: (algorithmId: string) => Promise<void>;
  updateProgress: (algorithmId: string, updates: Partial<UserProgress>) => Promise<void>;
  completeAlgorithm: (algorithmId: string) => Promise<void>;
  completeSection: (algorithmId: string, sectionId: string) => Promise<void>;
  bookmarkAlgorithm: (algorithmId: string) => Promise<void>;
  rateAlgorithm: (algorithmId: string, rating: number) => Promise<void>;
  getProgress: (algorithmId: string) => UserProgress | null;
  getCompletionRate: () => number;
  getTimeSpent: () => number;
  refreshAnalytics: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

interface ProgressProviderProps {
  children: ReactNode;
}

export const ProgressProvider: React.FC<ProgressProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(progressReducer, initialState);
  const { user, userProfile } = useAuth();

  useEffect(() => {
    if (user) {
      loadUserProgress();
      loadAchievements();
      loadAnalytics();
    }
  }, [user]);

  const loadUserProgress = async () => {
    if (!user) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const progressQuery = query(
        collection(db, 'progress'),
        where('userId', '==', user.uid)
      );
      
      const querySnapshot = await getDocs(progressQuery);
      const progressData: Record<string, UserProgress> = {};
      
      querySnapshot.forEach((doc) => {
        const progress = doc.data() as UserProgress;
        progressData[progress.algorithmId] = progress;
      });
      
      dispatch({ type: 'SET_PROGRESS', payload: progressData });
    } catch (error) {
      console.error('Error loading progress:', error);
      toast.error('Failed to load progress');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const loadAchievements = async () => {
    if (!user) return;

    try {
      const achievementsQuery = query(
        collection(db, 'achievements'),
        where('userId', '==', user.uid)
      );
      
      const querySnapshot = await getDocs(achievementsQuery);
      const achievements: Achievement[] = [];
      
      querySnapshot.forEach((doc) => {
        achievements.push(doc.data() as Achievement);
      });
      
      dispatch({ type: 'SET_ACHIEVEMENTS', payload: achievements });
    } catch (error) {
      console.error('Error loading achievements:', error);
    }
  };

  const loadAnalytics = async () => {
    if (!user) return;

    try {
      const analyticsDoc = await getDoc(doc(db, 'analytics', user.uid));
      if (analyticsDoc.exists()) {
        dispatch({ type: 'SET_ANALYTICS', payload: analyticsDoc.data() as LearningAnalytics });
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    }
  };

  const startAlgorithm = async (algorithmId: string) => {
    if (!user) return;

    try {
      const progressData: UserProgress = {
        algorithmId,
        userId: user.uid,
        status: 'in_progress',
        completedSections: [],
        timeSpent: 0,
        accuracy: 0,
        attempts: 1,
        lastAccessed: new Date(),
        startedAt: new Date(),
        bookmarked: false
      };

      await setDoc(doc(db, 'progress', `${user.uid}_${algorithmId}`), progressData);
      dispatch({ type: 'UPDATE_PROGRESS', payload: progressData });
      
      toast.success('Algorithm started!');
    } catch (error) {
      console.error('Error starting algorithm:', error);
      toast.error('Failed to start algorithm');
    }
  };

  const updateProgress = async (algorithmId: string, updates: Partial<UserProgress>) => {
    if (!user) return;

    try {
      const currentProgress = state.userProgress[algorithmId];
      if (!currentProgress) return;

      const updatedProgress = {
        ...currentProgress,
        ...updates,
        lastAccessed: new Date()
      };

      await updateDoc(doc(db, 'progress', `${user.uid}_${algorithmId}`), updatedProgress);
      dispatch({ type: 'UPDATE_PROGRESS', payload: updatedProgress });
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Failed to update progress');
    }
  };

  const completeAlgorithm = async (algorithmId: string) => {
    if (!user) return;

    try {
      const updates: Partial<UserProgress> = {
        status: 'completed',
        completedAt: new Date()
      };

      await updateProgress(algorithmId, updates);
      
      // Check for achievements
      await checkAchievements();
      
      toast.success('Algorithm completed! 🎉');
    } catch (error) {
      console.error('Error completing algorithm:', error);
      toast.error('Failed to complete algorithm');
    }
  };

  const completeSection = async (algorithmId: string, sectionId: string) => {
    if (!user) return;

    try {
      const currentProgress = state.userProgress[algorithmId];
      if (!currentProgress) return;

      const completedSections = [...currentProgress.completedSections, sectionId];
      
      await updateProgress(algorithmId, {
        completedSections,
        timeSpent: currentProgress.timeSpent + 5 // Add 5 minutes for section completion
      });
      
      toast.success('Section completed!');
    } catch (error) {
      console.error('Error completing section:', error);
      toast.error('Failed to complete section');
    }
  };

  const bookmarkAlgorithm = async (algorithmId: string) => {
    if (!user) return;

    try {
      const currentProgress = state.userProgress[algorithmId];
      const isBookmarked = currentProgress?.bookmarked || false;
      
      if (currentProgress) {
        await updateProgress(algorithmId, { bookmarked: !isBookmarked });
      } else {
        await startAlgorithm(algorithmId);
        await updateProgress(algorithmId, { bookmarked: true });
      }
      
      toast.success(isBookmarked ? 'Bookmark removed' : 'Algorithm bookmarked');
    } catch (error) {
      console.error('Error bookmarking algorithm:', error);
      toast.error('Failed to bookmark algorithm');
    }
  };

  const rateAlgorithm = async (algorithmId: string, rating: number) => {
    if (!user) return;

    try {
      await updateProgress(algorithmId, { rating });
      toast.success('Rating submitted!');
    } catch (error) {
      console.error('Error rating algorithm:', error);
      toast.error('Failed to submit rating');
    }
  };

  const getProgress = (algorithmId: string): UserProgress | null => {
    return state.userProgress[algorithmId] || null;
  };

  const getCompletionRate = (): number => {
    const progressValues = Object.values(state.userProgress);
    const completedCount = progressValues.filter(p => p.status === 'completed').length;
    return progressValues.length > 0 ? (completedCount / progressValues.length) * 100 : 0;
  };

  const getTimeSpent = (): number => {
    return Object.values(state.userProgress).reduce((total, progress) => total + progress.timeSpent, 0);
  };

  const checkAchievements = async () => {
    if (!user || !userProfile) return;

    // This would contain logic to check for new achievements
    // For now, we'll just implement a simple example
    const completedAlgorithms = Object.values(state.userProgress).filter(p => p.status === 'completed').length;
    
    if (completedAlgorithms === 1) {
      // First algorithm completed achievement
      const achievement: Achievement = {
        id: 'first_algorithm',
        name: 'First Steps',
        description: 'Complete your first algorithm',
        icon: '🎯',
        category: 'milestone',
        points: 100,
        rarity: 'common',
        requirements: [{ type: 'algorithms_completed', value: 1 }],
        unlockedAt: new Date()
      };
      
      await setDoc(doc(db, 'achievements', `${user.uid}_first_algorithm`), achievement);
      dispatch({ type: 'ADD_ACHIEVEMENT', payload: achievement });
      
      toast.success('Achievement unlocked: First Steps! 🎯');
    }
  };

  const refreshAnalytics = async () => {
    await loadAnalytics();
  };

  const value: ProgressContextType = {
    state,
    startAlgorithm,
    updateProgress,
    completeAlgorithm,
    completeSection,
    bookmarkAlgorithm,
    rateAlgorithm,
    getProgress,
    getCompletionRate,
    getTimeSpent,
    refreshAnalytics
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
};
