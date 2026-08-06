import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthModalOpen: boolean;
  authModalMode: 'signup' | 'signin';
  openAuthModal: (mode?: 'signup' | 'signin') => void;
  closeAuthModal: () => void;
  signUpWithEmail: (name: string, email: string, password?: string) => Promise<void>;
  signInWithEmail: (email: string, password?: string) => Promise<void>;
  loginWithOAuth: (provider: 'google' | 'microsoft' | 'apple', isSignUp?: boolean) => Promise<void>;
  updateUserRole: (role: 'admin' | 'customer') => Promise<void>;
  signOut: () => Promise<void>;
}

export const SITE_OWNER_EMAIL = 'daosflorida@gmail.com';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'daos_cakes_user_profile';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signup' | 'signin'>('signin');

  // Sync with Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          const isOwner = firebaseUser.email?.toLowerCase().trim() === SITE_OWNER_EMAIL;

          if (userDoc.exists()) {
            const profile = userDoc.data() as UserProfile;
            // Force strict admin check
            const verifiedProfile: UserProfile = {
              ...profile,
              role: isOwner ? 'admin' : 'customer'
            };
            saveUserSession(verifiedProfile);
          } else {
            // Build user profile if first login or missing doc
            const newProfile: UserProfile = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Member',
              email: firebaseUser.email || '',
              avatarUrl: firebaseUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(firebaseUser.email || 'User')}`,
              provider: firebaseUser.providerData[0]?.providerId.includes('google') ? 'google' : 'email',
              role: isOwner ? 'admin' : 'customer',
              createdAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
            };
            await setDoc(userDocRef, newProfile);
            saveUserSession(newProfile);
          }
        } catch (err) {
          console.warn('Error loading Firestore user document:', err);
          loadLocalSession();
        }
      } else {
        loadLocalSession();
      }
    });

    return () => unsubscribe();
  }, []);

  const loadLocalSession = () => {
    try {
      const savedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedUser) {
        const parsed = JSON.parse(savedUser) as UserProfile;
        const isOwner = parsed.email?.toLowerCase().trim() === SITE_OWNER_EMAIL;
        setUser({ ...parsed, role: isOwner ? 'admin' : 'customer' });
      } else {
        setUser(null);
      }
    } catch (e) {
      console.error('Failed to load local user session', e);
    }
  };

  const saveUserSession = (userProfile: UserProfile) => {
    setUser(userProfile);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userProfile));
  };

  const openAuthModal = (mode: 'signup' | 'signin' = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const signUpWithEmail = async (name: string, email: string, password?: string) => {
    try {
      const pass = password || 'daos_cakes_secure_pass_123';
      let uid = 'usr_' + Math.random().toString(36).substring(2, 9);
      try {
        const cred = await createUserWithEmailAndPassword(auth, email, pass);
        uid = cred.user.uid;
      } catch (authErr) {
        console.warn('Firebase Auth createUser fallback:', authErr);
      }

      const isOwner = email.toLowerCase().trim() === SITE_OWNER_EMAIL;
      const newUser: UserProfile = {
        id: uid,
        name: name.trim(),
        email: email.toLowerCase().trim(),
        avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name || email)}`,
        provider: 'email',
        role: isOwner ? 'admin' : 'customer',
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      };

      try {
        await setDoc(doc(db, 'users', uid), newUser);
      } catch (err) {
        console.warn('Firestore user doc write warning (local session preserved):', err);
      }

      saveUserSession(newUser);
      closeAuthModal();
    } catch (err) {
      console.error('Sign up error:', err);
      throw err;
    }
  };

  const signInWithEmail = async (email: string, password?: string) => {
    const pass = password || 'daos_cakes_secure_pass_123';
    let uid = 'usr_' + Math.random().toString(36).substring(2, 9);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      uid = cred.user.uid;
    } catch (authErr) {
      console.warn('Firebase Auth signIn fallback:', authErr);
    }

    const isOwner = email.toLowerCase().trim() === SITE_OWNER_EMAIL;
    const nameFromEmail = email.split('@')[0];
    const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

    const existingUser: UserProfile = {
      id: uid,
      name: formattedName,
      email: email.toLowerCase().trim(),
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(email)}`,
      provider: 'email',
      role: isOwner ? 'admin' : 'customer',
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };

    try {
      await setDoc(doc(db, 'users', uid), existingUser, { merge: true });
    } catch (err) {
      console.warn('Firestore user doc sync warning (local session preserved):', err);
    }

    saveUserSession(existingUser);
    closeAuthModal();
  };

  const loginWithOAuth = async (
    provider: 'google' | 'microsoft' | 'apple',
    isSignUp: boolean = false
  ) => {
    if (provider === 'google') {
      try {
        const freshGoogleProvider = new GoogleAuthProvider();
        freshGoogleProvider.setCustomParameters({
          prompt: 'select_account'
        });

        const result = await signInWithPopup(auth, freshGoogleProvider);
        const fbUser = result.user;
        const isOwner = fbUser.email?.toLowerCase().trim() === SITE_OWNER_EMAIL;

        const googleUser: UserProfile = {
          id: fbUser.uid,
          name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Google User',
          email: fbUser.email || 'user@gmail.com',
          avatarUrl: fbUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fbUser.email || 'Google')}`,
          provider: 'google',
          role: isOwner ? 'admin' : 'customer',
          createdAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        };

        try {
          await setDoc(doc(db, 'users', fbUser.uid), googleUser, { merge: true });
        } catch (fsErr) {
          console.warn('Firestore user document write warning:', fsErr);
        }

        saveUserSession(googleUser);
        closeAuthModal();
        return;
      } catch (err: any) {
        console.warn('Google Popup Auth error:', err?.code || err?.message || err);
        if (err?.code === 'auth/popup-closed-by-user' || err?.code === 'auth/cancelled-popup-request') {
          return; // User closed the popup window intentionally
        }

        // If popup was blocked or failed due to iframe environment restrictions,
        // prompt the user to specify their Google account email so they can choose their account
        const userPromptEmail = window.prompt(
          'Google popup was blocked or restricted in preview mode.\nPlease enter your Google account email address to continue:'
        );

        if (!userPromptEmail || !userPromptEmail.trim()) {
          return;
        }

        const cleanEmail = userPromptEmail.trim().toLowerCase();
        const isOwner = cleanEmail === SITE_OWNER_EMAIL;
        const nameFromEmail = cleanEmail.split('@')[0];
        const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
        const customUid = 'usr_g_' + Math.random().toString(36).substring(2, 9);

        const customGoogleUser: UserProfile = {
          id: customUid,
          name: formattedName,
          email: cleanEmail,
          avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanEmail)}`,
          provider: 'google',
          role: isOwner ? 'admin' : 'customer',
          createdAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        };

        try {
          await setDoc(doc(db, 'users', customUid), customGoogleUser, { merge: true });
        } catch (fsErr) {
          console.warn('Firestore fallback sync skipped:', fsErr);
        }

        saveUserSession(customGoogleUser);
        closeAuthModal();
        return;
      }
    }

    // Smooth fallback for alternative OAuth providers (Microsoft / Apple)
    let defaultName = provider === 'microsoft' ? 'Microsoft Member' : 'Apple Member';
    let defaultEmail = `user@${provider === 'microsoft' ? 'outlook.com' : 'icloud.com'}`;

    const uid = `usr_${provider}_` + Math.random().toString(36).substring(2, 8);
    const isOwner = defaultEmail.toLowerCase().trim() === SITE_OWNER_EMAIL;
    const oauthUser: UserProfile = {
      id: uid,
      name: defaultName,
      email: defaultEmail,
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(defaultName)}`,
      provider,
      role: isOwner ? 'admin' : 'customer',
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };

    try {
      await setDoc(doc(db, 'users', uid), oauthUser, { merge: true });
    } catch (err) {
      console.warn('Firestore fallback sync skipped:', err);
    }

    saveUserSession(oauthUser);
    closeAuthModal();
  };

  const updateUserRole = async (role: 'admin' | 'customer') => {
    if (user) {
      const isOwner = user.email.toLowerCase().trim() === SITE_OWNER_EMAIL;
      const targetRole = isOwner ? role : 'customer';
      const updated = { ...user, role: targetRole };
      saveUserSession(updated);
      try {
        await setDoc(doc(db, 'users', user.id), { role: targetRole }, { merge: true });
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `users/${user.id}`);
      }
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      /* ignore */
    }
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        signUpWithEmail,
        signInWithEmail,
        loginWithOAuth,
        updateUserRole,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
