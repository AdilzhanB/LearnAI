// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { 
  getFirestore, 
  enableIndexedDbPersistence, 
  initializeFirestore, 
  CACHE_SIZE_UNLIMITED,
  persistentLocalCache,
  persistentMultipleTabManager
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCTsHPPhybHfI7RfsCzjVLkMB59zyBJVeM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "utmsysai.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "utmsysai",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "utmsysai.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1061699367527",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1061699367527:web:482d0d4648239b2fcd5ac2",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-MW2S2QZ2M9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);

// Initialize Firestore with better offline settings
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    cacheSizeBytes: CACHE_SIZE_UNLIMITED,
    tabManager: persistentMultipleTabManager()
  })
});

export const storage = getStorage(app);

// We're already using persistentLocalCache above, so we don't need to call enableIndexedDbPersistence
// This was causing the "SDK cache is already specified" error
console.log('Firestore initialized with persistent cache');

// Set network connectivity listener
window.addEventListener('online', () => {
  console.log('Connection restored, syncing data with server...');
});

window.addEventListener('offline', () => {
  console.log('Connection lost, working in offline mode...');
});

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;
