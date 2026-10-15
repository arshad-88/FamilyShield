import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as SecureStore from 'expo-secure-store';

import en from './locales/en.json';
import hi from './locales/hi.json';
import ta from './locales/ta.json';
import te from './locales/te.json';

const LANGUAGE_KEY = 'familysheed_language';

export type Language = 'en' | 'hi' | 'ta' | 'te';

export const LANGUAGES: Record<Language, { label: string; flag: string }> = {
  en: { label: 'English', flag: '🇬🇧' },
  hi: { label: 'हिन्दी', flag: '🇮🇳' },
  ta: { label: 'தமிழ்', flag: '🇮🇳' },
  te: { label: 'తెలుగు', flag: '🇮🇳' },
};

async function getSavedLanguage(): Promise<Language> {
  try {
    const saved = await SecureStore.getItemAsync(LANGUAGE_KEY);
    if (saved && saved in LANGUAGES) {
      return saved as Language;
    }
  } catch {
    // SecureStore not available on this device
  }
  return 'en';
}

async function saveLanguage(language: Language): Promise<void> {
  try {
    await SecureStore.setItemAsync(LANGUAGE_KEY, language);
  } catch {
    // SecureStore not available
  }
}

// Initialize with English first, then switch to saved language
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    ta: { translation: ta },
    te: { translation: te },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

// Load saved language in background
getSavedLanguage().then(savedLang => {
  if (savedLang !== 'en') {
    i18n.changeLanguage(savedLang);
  }
});

export { saveLanguage };
export default i18n;
