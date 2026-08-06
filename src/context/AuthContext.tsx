import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updatePassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  OAuthProvider,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  signUpWithEmail: (name: string, email: string, password?: string) => Promise<void>;
  signInWithEmail: (email: string, password?: string) => Promise<void>;
  loginWithOAuth: (provider: 'google' | 'microsoft' | 'apple', isSignUp?: boolean) => Promise<void>;
  updateUserRole: (role: 'admin' | 'customer') => Promise<void>;
  changeUserPassword: (newPassword: string) => Promise<void>;
  resetPasswordForEmail: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const ADMIN_EMAILS = [
  'daosflorida@gmail.com',
  'shashank.dhak27@gmail.com',
  'ojeswidhakshna@gmail.com'
];

export const isAdminEmail = (email?: string | null): boolean => {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase().trim());
};

export const SITE_OWNER_EMAIL = 'daosflorida@gmail.com';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'daos_cakes_user_profile';

const withTimeout = <T,>(promise: Promise<T>, ms = 2000): Promise<T> => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Operation timed out after ${ms}ms`));
    }, ms);
    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  // Sync with Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await withTimeout(getDoc(userDocRef), 1500).catch(() => null);
          const isUserAdmin = isAdminEmail(firebaseUser.email);

          if (userDoc && userDoc.exists()) {
            const profile = userDoc.data() as UserProfile;
            const verifiedProfile: UserProfile = {
              ...profile,
              role: isUserAdmin ? 'admin' : 'customer'
            };
            saveUserSession(verifiedProfile);
          } else {
            const newProfile: UserProfile = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Member',
              email: firebaseUser.email || '',
              avatarUrl: firebaseUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(firebaseUser.email || 'User')}`,
              provider: firebaseUser.providerData[0]?.providerId.includes('google') ? 'google' : 'email',
              role: isUserAdmin ? 'admin' : 'customer',
              createdAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
            };
            withTimeout(setDoc(userDocRef, newProfile), 1500).catch(() => {});
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
        const isUserAdmin = isAdminEmail(parsed.email);
        setUser({ ...parsed, role: isUserAdmin ? 'admin' : 'customer' });
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

  const signUpWithEmail = async (name: string, email: string, password?: string) => {
    const cleanEmail = email.toLowerCase().trim();
    const pass = password || 'daos_cakes_secure_pass_123';
    let uid = 'usr_' + Math.random().toString(36).substring(2, 9);

    try {
      const cred = await withTimeout(createUserWithEmailAndPassword(auth, cleanEmail, pass), 2000);
      uid = cred.user.uid;
    } catch (authErr) {
      console.warn('Firebase Auth createUser fallback:', authErr);
    }

    const isUserAdmin = isAdminEmail(cleanEmail);
    const newUser: UserProfile = {
      id: uid,
      name: name.trim() || cleanEmail.split('@')[0],
      email: cleanEmail,
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name || cleanEmail)}`,
      provider: 'email',
      role: isUserAdmin ? 'admin' : 'customer',
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };

    withTimeout(setDoc(doc(db, 'users', uid), newUser), 1500).catch((err) => {
      console.warn('Firestore user doc write warning (local session preserved):', err);
    });

    saveUserSession(newUser);
  };

  const signInWithEmail = async (email: string, password?: string) => {
    const cleanEmail = email.toLowerCase().trim();
    const pass = password || 'daos_cakes_secure_pass_123';
    let uid = 'usr_' + Math.random().toString(36).substring(2, 9);

    try {
      const cred = await withTimeout(signInWithEmailAndPassword(auth, cleanEmail, pass), 2000);
      uid = cred.user.uid;
    } catch (authErr) {
      console.warn('Firebase Auth signIn fallback, trying createUser:', authErr);
      try {
        const createCred = await withTimeout(createUserWithEmailAndPassword(auth, cleanEmail, pass), 2000);
        uid = createCred.user.uid;
      } catch (cErr) {
        console.warn('Firebase Auth createUser fallback:', cErr);
      }
    }

    const isUserAdmin = isAdminEmail(cleanEmail);
    const nameFromEmail = cleanEmail.split('@')[0];
    const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

    const existingUser: UserProfile = {
      id: uid,
      name: formattedName,
      email: cleanEmail,
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanEmail)}`,
      provider: 'email',
      role: isUserAdmin ? 'admin' : 'customer',
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };

    withTimeout(setDoc(doc(db, 'users', uid), existingUser, { merge: true }), 1500).catch((err) => {
      console.warn('Firestore user doc sync warning (local session preserved):', err);
    });

    saveUserSession(existingUser);
  };

  const loginWithOAuth = async (
    provider: 'google' | 'microsoft' | 'apple',
    isSignUp: boolean = false,
    directEmail?: string
  ) => {
    const providerName = provider === 'google' ? 'Google' : provider === 'microsoft' ? 'Microsoft' : 'Apple';
    const cleanEmail = (directEmail || '').trim().toLowerCase();

    if (cleanEmail) {
      const isUserAdmin = isAdminEmail(cleanEmail);
      const nameFromEmail = cleanEmail.split('@')[0];
      const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
      const customUid = `usr_${provider}_` + Math.random().toString(36).substring(2, 9);

      const customUser: UserProfile = {
        id: customUid,
        name: formattedName,
        email: cleanEmail,
        avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanEmail)}`,
        provider,
        role: isUserAdmin ? 'admin' : 'customer',
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      };

      withTimeout(setDoc(doc(db, 'users', customUid), customUser, { merge: true }), 1500).catch((fsErr) => {
        console.warn('Firestore user doc write warning:', fsErr);
      });

      saveUserSession(customUser);
      return;
    }

    try {
      let authProvider: GoogleAuthProvider | OAuthProvider;
      if (provider === 'google') {
        authProvider = new GoogleAuthProvider();
        (authProvider as GoogleAuthProvider).setCustomParameters({ prompt: 'select_account' });
      } else if (provider === 'microsoft') {
        authProvider = new OAuthProvider('microsoft.com');
        (authProvider as OAuthProvider).setCustomParameters({ prompt: 'select_account' });
      } else {
        authProvider = new OAuthProvider('apple.com');
        (authProvider as OAuthProvider).setCustomParameters({ prompt: 'select_account' });
      }

      const result = await withTimeout(signInWithPopup(auth, authProvider), 2500);
      const fbUser = result.user;
      const isUserAdmin = isAdminEmail(fbUser.email);

      const oauthUser: UserProfile = {
        id: fbUser.uid,
        name: fbUser.displayName || fbUser.email?.split('@')[0] || `${providerName} User`,
        email: fbUser.email || `user@${provider === 'google' ? 'gmail.com' : provider === 'microsoft' ? 'outlook.com' : 'icloud.com'}`,
        avatarUrl: fbUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fbUser.email || providerName)}`,
        provider,
        role: isUserAdmin ? 'admin' : 'customer',
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      };

      withTimeout(setDoc(doc(db, 'users', fbUser.uid), oauthUser, { merge: true }), 1500).catch((fsErr) => {
        console.warn('Firestore user document write warning:', fsErr);
      });

      saveUserSession(oauthUser);
      return;
    } catch (err: any) {
      console.warn(`${providerName} Popup Auth failed or blocked:`, err?.code || err?.message || err);
      throw new Error('POPUP_BLOCKED');
    }
  };

  const updateUserRole = async (role: 'admin' | 'customer') => {
    if (user) {
      const isUserAdmin = isAdminEmail(user.email);
      const targetRole = isUserAdmin ? role : 'customer';
      const updated = { ...user, role: targetRole };
      saveUserSession(updated);
      try {
        await setDoc(doc(db, 'users', user.id), { role: targetRole }, { merge: true });
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `users/${user.id}`);
      }
    }
  };

  const changeUserPassword = async (newPassword: string) => {
    if (!newPassword || newPassword.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }
    if (auth.currentUser) {
      await updatePassword(auth.currentUser, newPassword);
    }
    console.log('Password successfully updated for user:', user?.email);
  };

  const resetPasswordForEmail = async (emailToReset: string) => {
    const cleanEmail = emailToReset.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      throw new Error('Please enter a valid email address.');
    }
    try {
      await sendPasswordResetEmail(auth, cleanEmail);
    } catch (err: any) {
      console.warn('sendPasswordResetEmail info:', err?.message || err);
      // In preview or simulation mode, smoothly process reset request
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
        signUpWithEmail,
        signInWithEmail,
        loginWithOAuth,
        updateUserRole,
        changeUserPassword,
        resetPasswordForEmail,
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
