import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../config/firebase';
import { UserProfile, ProgrammingLanguage } from '../types';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Enable real authentication flow
    const enableRealAuth = true; // Set to true to show login page
    
    if (!enableRealAuth && import.meta.env.DEV) {
      const mockUser = {
        uid: 'dev-user-123',
        email: 'dev@example.com',
        displayName: 'Developer',
        photoURL: null,
        emailVerified: true,
        isAnonymous: false,
        metadata: {
          creationTime: new Date().toISOString(),
          lastSignInTime: new Date().toISOString()
        },
        providerData: [],
        refreshToken: 'mock-refresh-token',
        tenantId: null,
        delete: async () => {},
        getIdToken: async () => 'mock-token',
        getIdTokenResult: async () => ({
          token: 'mock-token',
          expirationTime: new Date(Date.now() + 3600000).toISOString(),
          authTime: new Date().toISOString(),
          issuedAtTime: new Date().toISOString(),
          signInProvider: 'custom',
          signInSecondFactor: null,
          claims: {}
        }),
        reload: async () => {},
        toJSON: () => ({}),
        phoneNumber: null,
        providerId: 'firebase'
      } as User;

      const mockProfile: UserProfile = {
        uid: 'dev-user-123',
        email: 'dev@example.com',
        displayName: 'Developer',
        photoURL: undefined,
        level: 1,
        experiencePoints: 0,
        globalRank: 0,
        totalTimeSpent: 0,
        algorithmsCompleted: 0,
        currentStreak: 0,
        longestStreak: 0,
        preferredLanguage: 'en',
        learningGoals: [],
        achievements: [],
        preferences: {
          theme: 'light',
          language: 'en',
          notifications: {
            email: true,
            push: true,
            dailyReminder: true,
            weeklyProgress: true,
            achievements: true
          },
          learningPreferences: {
            preferredProgrammingLanguage: ProgrammingLanguage.PYTHON,
            difficultyProgression: 'gradual',
            studyTime: 30,
            reminderTime: '18:00'
          }
        },
        createdAt: new Date(),
        lastActive: new Date()
      };

      setUser(mockUser);
      setUserProfile(mockProfile);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Fetch user profile from Firestore
        try {
          // Try to get user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            // Ensure the data matches UserProfile type
            const profile: UserProfile = {
              uid: userData.uid ?? user.uid,
              email: userData.email ?? user.email ?? '',
              displayName: userData.displayName ?? user.displayName ?? '',
              photoURL: userData.photoURL ?? user.photoURL ?? undefined,
              level: userData.level ?? 1,
              experiencePoints: userData.experiencePoints ?? 0,
              globalRank: userData.globalRank ?? 0,
              totalTimeSpent: userData.totalTimeSpent ?? 0,
              algorithmsCompleted: userData.algorithmsCompleted ?? 0,
              currentStreak: userData.currentStreak ?? 0,
              longestStreak: userData.longestStreak ?? 0,
              preferredLanguage: userData.preferredLanguage ?? 'en',
              learningGoals: userData.learningGoals ?? [],
              achievements: userData.achievements ?? [],
              preferences: userData.preferences ?? {
                theme: 'light',
                language: 'en',
                notifications: {
                  email: true,
                  push: true,
                  dailyReminder: true,
                  weeklyProgress: true,
                  achievements: true
                },
                learningPreferences: {
                  preferredProgrammingLanguage: ProgrammingLanguage.PYTHON,
                  difficultyProgression: 'gradual',
                  studyTime: 30,
                  reminderTime: '18:00'
                }
              },
              createdAt: userData.createdAt ? new Date(userData.createdAt) : new Date(),
              lastActive: userData.lastActive ? new Date(userData.lastActive) : new Date()
            };
            setUserProfile(profile);
            
            // Try to update last active timestamp, but don't block if it fails
            updateDoc(doc(db, 'users', user.uid), {
              lastActive: new Date()
            }).catch(err => {
              console.warn('Could not update last active timestamp:', err);
              // Continue silently - this is not critical
            });
          } else {
            // Create new user profile if it doesn't exist
            const newProfile: UserProfile = {
              uid: user.uid,
              email: user.email!,
              displayName: user.displayName || '',
              photoURL: user.photoURL || undefined,
              level: 1,
              experiencePoints: 0,
              globalRank: 0,
              totalTimeSpent: 0,
              algorithmsCompleted: 0,
              currentStreak: 0,
              longestStreak: 0,
              preferredLanguage: 'en',
              learningGoals: [],
              achievements: [],
              preferences: {
                theme: 'light',
                language: 'en',
                notifications: {
                  email: true,
                  push: true,
                  dailyReminder: true,
                  weeklyProgress: true,
                  achievements: true
                },
                learningPreferences: {
                  preferredProgrammingLanguage: ProgrammingLanguage.PYTHON,
                  difficultyProgression: 'gradual',
                  studyTime: 30,
                  reminderTime: '18:00'
                }
              },
              createdAt: new Date(),
              lastActive: new Date()
            };
            
            try {
              await setDoc(doc(db, 'users', user.uid), newProfile);
            } catch (err) {
              console.warn('Failed to create user profile in Firestore, using local profile:', err);
            }
            
            setUserProfile(newProfile);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // Create a fallback profile when offline
          const fallbackProfile: UserProfile = {
            uid: user.uid,
            email: user.email ?? '',
            displayName: user.displayName || user.email?.split('@')[0] || 'User',
            photoURL: user.photoURL || undefined,
            level: 1,
            experiencePoints: 0,
            globalRank: 0,
            totalTimeSpent: 0,
            algorithmsCompleted: 0,
            currentStreak: 0,
            longestStreak: 0,
            preferredLanguage: 'en',
            learningGoals: [],
            achievements: [],
            preferences: {
              theme: 'light',
              language: 'en',
              notifications: {
                email: true,
                push: true,
                dailyReminder: true,
                weeklyProgress: true,
                achievements: true
              },
              learningPreferences: {
                preferredProgrammingLanguage: ProgrammingLanguage.PYTHON,
                difficultyProgression: 'gradual',
                studyTime: 30,
                reminderTime: '18:00'
              }
            },
            createdAt: new Date(),
            lastActive: new Date(),
            // Optionally add a custom property to indicate offline profile
            // @ts-ignore
            isOfflineProfile: true
          };
          setUserProfile(fallbackProfile);
          
          // Only show the error toast if we're not in a known offline state
          if ((error as any)?.message !== 'Failed to get document because the client is offline.') {
            toast.error('Failed to load user profile');
          } else {
            toast('Using offline profile data');
          }
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Successfully signed in!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      setLoading(true);
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile with display name
      await updateProfile(user, { displayName });
      
      toast.success('Account created successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      toast.success('Successfully signed in with Google!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in with Google');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('Successfully signed out!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign out');
      throw error;
    }
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !userProfile) return;

    try {
      const updatedProfile = { ...userProfile, ...updates, lastActive: new Date() };
      await updateDoc(doc(db, 'users', user.uid), updatedProfile);
      setUserProfile(updatedProfile);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    logout,
    updateUserProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
