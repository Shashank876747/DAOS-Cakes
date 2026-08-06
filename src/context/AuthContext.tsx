import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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
  signUpWithEmail: (name: string, email: string, role?: 'admin' | 'customer') => Promise<void>;
  signInWithEmail: (email: string, role?: 'admin' | 'customer') => Promise<void>;
  loginWithOAuth: (provider: 'google' | 'microsoft' | 'apple', isSignUp?: boolean, role?: 'admin' | 'customer') => Promise<void>;
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

  const signUpWithEmail = async (name: string, email: string, role: 'admin' | 'customer' = 'admin') => {
    try {
      // Try Firebase Auth email creation (password handled in form or mock password)
      const mockPassword = 'daos_cakes_secure_pass_123';
      let uid = 'usr_' + Math.random().toString(36).substring(2, 9);
      try {
        const cred = await createUserWithEmailAndPassword(auth, email, mockPassword);
        uid = cred.user.uid;
      } catch (authErr) {
        // Fallback if password or email exists or local simulation
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
        handleFirestoreError(err, OperationType.WRITE, `users/${uid}`);
      }

      saveUserSession(newUser);
      closeAuthModal();
    } catch (err) {
      console.error('Sign up error:', err);
      throw err;
    }
  };

  const signInWithEmail = async (email: string, role: 'admin' | 'customer' = 'admin') => {
    const mockPassword = 'daos_cakes_secure_pass_123';
    let uid = 'usr_' + Math.random().toString(36).substring(2, 9);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, mockPassword);
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
      handleFirestoreError(err, OperationType.WRITE, `users/${uid}`);
    }

    saveUserSession(existingUser);
    closeAuthModal();
  };

  const loginWithOAuth = async (
    provider: 'google' | 'microsoft' | 'apple',
    isSignUp: boolean = false,
    role: 'admin' | 'customer' = 'admin'
  ) => {
    if (provider === 'google') {
      try {
        googleProvider.setCustomParameters({
          prompt: 'select_account'
        });
        const result = await signInWithPopup(auth, googleProvider);
        const fbUser = result.user;
        const isOwner = fbUser.email?.toLowerCase().trim() === SITE_OWNER_EMAIL;

        const googleUser: UserProfile = {
          id: fbUser.uid,
          name: fbUser.displayName || 'Google Member',
          email: fbUser.email || 'user@gmail.com',
          avatarUrl: fbUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fbUser.displayName || 'Google')}`,
          provider: 'google',
          role: isOwner ? 'admin' : 'customer',
          createdAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        };

        await setDoc(doc(db, 'users', fbUser.uid), googleUser, { merge: true });
        saveUserSession(googleUser);
        closeAuthModal();
        return;
      } catch (err) {
        console.warn('Google Popup Auth failed or dismissed:', err);
      }
    }

    // Fallback simulation for Microsoft/Apple/Offline Google
    let defaultName = 'Cake Enthusiast';
    let defaultEmail = `user@${provider === 'google' ? 'gmail.com' : provider === 'microsoft' ? 'outlook.com' : 'icloud.com'}`;

    if (provider === 'google') {
      defaultName = 'Google Member';
    } else if (provider === 'microsoft') {
      defaultName = 'Microsoft Member';
    } else if (provider === 'apple') {
      defaultName = 'Apple Member';
    }

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
      handleFirestoreError(err, OperationType.WRITE, `users/${uid}`);
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
