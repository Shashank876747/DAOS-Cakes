import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

export interface SiteContent {
  siteName: string;
  tagline: string;
  announcement: {
    enabled: boolean;
    text: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaText: string;
  };
  googleFormUrl: string;
  about: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    highlight1: string;
    highlight2: string;
    highlight3: string;
  };
  contact: {
    email: string;
    phone: string;
    instagram: string;
    location: string;
    hours: string;
  };
  orderNotice: {
    badge: string;
    title: string;
    subtitle: string;
  };
}

export const DEFAULT_SITE_CONTENT: SiteContent = {
  siteName: 'DAOS Cakes',
  tagline: 'Handcrafted Bakery',
  announcement: {
    enabled: true,
    text: '🎉 Now accepting custom cake orders for upcoming celebrations! Reserve your date today.'
  },
  hero: {
    badge: 'Artisan Custom Bakery',
    title: 'Handcrafted Custom Cakes & Gourmet Treats',
    subtitle: 'From intimate birthdays to grand celebrations, we create beautiful, delicious cakes tailored uniquely to your vision and taste.',
    ctaText: 'Place Custom Order'
  },
  googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdQ7d5odCaliDzgkufvsD_hfwdhbi1meCHUyO_zMdgoLJVMwA/viewform?embedded=true',
  about: {
    title: 'Baked with Love & Precision',
    paragraph1: 'At DAOS Cakes, every creation is a labor of love. We combine traditional pastry techniques with modern artistic design to deliver custom cakes that taste as incredible as they look.',
    paragraph2: 'Using only premium ingredients—real butter, pure vanilla bean, and high-quality chocolate—we ensure every slice is a memorable moment for you and your guests.',
    highlight1: '100% Custom Baked To Order',
    highlight2: 'Premium Ingredients Only',
    highlight3: 'Personalized Consultation'
  },
  contact: {
    email: 'daosflorida@gmail.com',
    phone: '(555) 234-5678',
    instagram: '@daoscakes',
    location: 'Central Florida Area (Pickup & Local Delivery)',
    hours: 'Mon - Sat: 9:00 AM - 6:00 PM'
  },
  orderNotice: {
    badge: 'Direct Google Form Link',
    title: 'Submit Your Custom Order Request',
    subtitle: 'Fill out our quick order request form below to secure your date. Our team will review your details and contact you within 24 hours.'
  }
};

interface SiteContextType {
  content: SiteContent;
  updateContent: (updated: Partial<SiteContent>) => Promise<void>;
  resetToDefaults: () => Promise<void>;
  isAdminMode: boolean;
  setIsAdminMode: (mode: boolean) => void;
  isAdminEditorOpen: boolean;
  openAdminEditor: () => void;
  closeAdminEditor: () => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'daos_cakes_site_content';
const ADMIN_MODE_KEY = 'daos_cakes_admin_mode';

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [isAdminMode, setIsAdminModeState] = useState<boolean>(false);
  const [isAdminEditorOpen, setIsAdminEditorOpen] = useState<boolean>(false);

  // Sync site content with Firebase Firestore in real-time
  useEffect(() => {
    // Check localStorage fallback first
    try {
      const savedAdminMode = localStorage.getItem(ADMIN_MODE_KEY);
      if (savedAdminMode === 'true') {
        setIsAdminModeState(true);
      }
    } catch (e) {
      console.error('Failed to load local admin mode setting', e);
    }

    const docRef = doc(db, 'site_settings', 'main');
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as SiteContent;
          setContent(data);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        } else {
          // Initialize Firestore with default content if doc does not exist
          setDoc(docRef, DEFAULT_SITE_CONTENT).catch((err) => {
            console.warn('Initial site_settings write error:', err);
          });
        }
      },
      (error) => {
        console.warn('Firestore site_settings snapshot listener error:', error);
        // Fallback to local storage
        const savedContent = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedContent) {
          try {
            setContent(JSON.parse(savedContent));
          } catch (e) {
            /* ignore */
          }
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const updateContent = async (updated: Partial<SiteContent>) => {
    const next = { ...content, ...updated };
    setContent(next);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));

    try {
      const docRef = doc(db, 'site_settings', 'main');
      await setDoc(docRef, next, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'site_settings/main');
    }
  };

  const resetToDefaults = async () => {
    setContent(DEFAULT_SITE_CONTENT);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    try {
      const docRef = doc(db, 'site_settings', 'main');
      await setDoc(docRef, DEFAULT_SITE_CONTENT);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'site_settings/main');
    }
  };

  const setIsAdminMode = (mode: boolean) => {
    setIsAdminModeState(mode);
    localStorage.setItem(ADMIN_MODE_KEY, mode ? 'true' : 'false');
  };

  const openAdminEditor = () => setIsAdminEditorOpen(true);
  const closeAdminEditor = () => setIsAdminEditorOpen(false);

  return (
    <SiteContext.Provider
      value={{
        content,
        updateContent,
        resetToDefaults,
        isAdminMode,
        setIsAdminMode,
        isAdminEditorOpen,
        openAdminEditor,
        closeAdminEditor
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
