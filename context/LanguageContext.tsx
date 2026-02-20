import * as SecureStore from 'expo-secure-store';
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

type LanguageMode = 'mm' | 'en';

interface LanguageContextType {
  language: 'mm' | 'en';
  languageMode: LanguageMode;
  setLanguageMode: (mode: LanguageMode) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'mm',
  languageMode: 'mm',
  setLanguageMode: () => {},
  toggleLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

const LANGUAGE_STORAGE_KEY = 'language';

export default function LanguageProvider({ children }: PropsWithChildren) {

  const [languageMode, setLanguageModeState] = useState<LanguageMode>('mm');
  const [language, setLanguage] = useState<'mm' | 'en'>('mm');

  // Load saved language preference
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await SecureStore.getItemAsync(LANGUAGE_STORAGE_KEY);
        if (savedLanguage && (savedLanguage === 'mm' || savedLanguage === 'en')) {
          setLanguageModeState(savedLanguage as LanguageMode);
        }
      } catch (error) {
        console.error('Error loading language:', error);
      }
    };
    loadLanguage();
  }, []);

  // Update language based on mode
  useEffect(() => {
    setLanguage(languageMode);
  }, [languageMode]);

  const setLanguageMode = async (mode: LanguageMode) => {
    try {
      await SecureStore.setItemAsync(LANGUAGE_STORAGE_KEY, mode);
      setLanguageModeState(mode);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const toggleLanguage = () => {
    const newMode = language === 'mm' ? 'en' : 'mm';
    setLanguageMode(newMode);
  };

  return (
    <LanguageContext.Provider value={{ language, languageMode, setLanguageMode, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
