import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  Auth
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  Firestore
} from 'firebase/firestore';
import { GenerationMetadata } from '../types/generation';

export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  createdAt: string;
  isAnonymous?: boolean;
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (err) {
    console.warn('Firebase initialization error, using local fallback:', err);
  }
}

// Local Storage Fallback for Auth and History
const LOCAL_USER_KEY = 'bhaktivision_user';
const LOCAL_GENERATIONS_KEY = 'bhaktivision_generations';

export function getLocalUser(): AppUser | null {
  try {
    const raw = localStorage.getItem(LOCAL_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveLocalUser(user: AppUser | null) {
  if (user) {
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(LOCAL_USER_KEY);
  }
}

export function getLocalGenerations(uid?: string): GenerationMetadata[] {
  try {
    const raw = localStorage.getItem(LOCAL_GENERATIONS_KEY);
    const list: GenerationMetadata[] = raw ? JSON.parse(raw) : [];
    if (uid) {
      return list.filter((g) => g.uid === uid || !g.uid);
    }
    return list;
  } catch {
    return [];
  }
}

export function saveLocalGeneration(generation: GenerationMetadata) {
  const existing = getLocalGenerations();
  const updated = [generation, ...existing.filter((g) => g.id !== generation.id)];
  localStorage.setItem(LOCAL_GENERATIONS_KEY, JSON.stringify(updated.slice(0, 50)));
}

export function deleteLocalGeneration(id: string) {
  const existing = getLocalGenerations();
  const updated = existing.filter((g) => g.id !== id);
  localStorage.setItem(LOCAL_GENERATIONS_KEY, JSON.stringify(updated));
}

// Unified Service layer
export const authService = {
  isConfigured: isFirebaseConfigured,

  onUserChange(callback: (user: AppUser | null) => void) {
    if (isFirebaseConfigured && auth) {
      return onAuthStateChanged(auth, (fbUser: FirebaseUser | null) => {
        if (fbUser) {
          const u: AppUser = {
            uid: fbUser.uid,
            email: fbUser.email || 'user@bhaktivision.ai',
            displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Devotee',
            createdAt: new Date().toISOString(),
          };
          saveLocalUser(u);
          callback(u);
        } else {
          callback(getLocalUser());
        }
      });
    } else {
      // Local reactive fallback
      const initial = getLocalUser();
      callback(initial);
      const listener = () => callback(getLocalUser());
      window.addEventListener('storage', listener);
      return () => window.removeEventListener('storage', listener);
    }
  },

  async login(email: string, password: string): Promise<AppUser> {
    if (isFirebaseConfigured && auth) {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const u: AppUser = {
        uid: res.user.uid,
        email: res.user.email || email,
        displayName: res.user.displayName || email.split('@')[0],
        createdAt: new Date().toISOString(),
      };
      saveLocalUser(u);
      return u;
    } else {
      // Local authentication simulation
      const u: AppUser = {
        uid: `usr_${Date.now()}`,
        email,
        displayName: email.split('@')[0],
        createdAt: new Date().toISOString(),
      };
      saveLocalUser(u);
      return u;
    }
  },

  async register(email: string, password: string, displayName?: string): Promise<AppUser> {
    if (isFirebaseConfigured && auth) {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const u: AppUser = {
        uid: res.user.uid,
        email: res.user.email || email,
        displayName: displayName || email.split('@')[0],
        createdAt: new Date().toISOString(),
      };
      saveLocalUser(u);
      return u;
    } else {
      const u: AppUser = {
        uid: `usr_${Date.now()}`,
        email,
        displayName: displayName || email.split('@')[0],
        createdAt: new Date().toISOString(),
      };
      saveLocalUser(u);
      return u;
    }
  },

  async guestLogin(): Promise<AppUser> {
    const guestUser: AppUser = {
      uid: `guest_${Date.now()}`,
      email: 'guest@bhaktivision.local',
      displayName: 'Devotee Guest',
      createdAt: new Date().toISOString(),
      isAnonymous: true,
    };
    saveLocalUser(guestUser);
    return guestUser;
  },

  async logout(): Promise<void> {
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
    }
    saveLocalUser(null);
  },
};

export const databaseService = {
  async saveGeneration(generation: GenerationMetadata): Promise<void> {
    // Always save locally for instant response & offline resilience
    saveLocalGeneration(generation);

    if (isFirebaseConfigured && db && generation.uid) {
      try {
        await addDoc(collection(db, 'generations'), {
          ...generation,
          storedAt: new Date().toISOString(),
        });
      } catch (e) {
        console.warn('Could not persist to Firestore, stored locally:', e);
      }
    }
  },

  async getGenerations(uid?: string): Promise<GenerationMetadata[]> {
    if (isFirebaseConfigured && db && uid) {
      try {
        const q = query(collection(db, 'generations'), where('uid', '==', uid));
        const snap = await getDocs(q);
        const results: GenerationMetadata[] = [];
        snap.forEach((d) => results.push({ id: d.id, ...d.data() } as GenerationMetadata));
        if (results.length > 0) return results;
      } catch (e) {
        console.warn('Firestore fetch failed, reading local:', e);
      }
    }
    return getLocalGenerations(uid);
  },

  async deleteGeneration(id: string, uid?: string): Promise<void> {
    deleteLocalGeneration(id);
    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'generations', id));
      } catch (e) {
        console.warn('Firestore delete error:', e);
      }
    }
  },
};
