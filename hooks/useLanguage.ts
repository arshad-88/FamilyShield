import { useCallback } from 'react';
import i18n, { Language, LANGUAGES, saveLanguage } from '@/i18n';

export function useLanguage() {
  const language = (i18n.language as Language) || 'en';

  const setLanguage = useCallback((lang: Language) => {
    i18n.changeLanguage(lang);
    saveLanguage(lang);
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      return i18n.t(key, params);
    },
    [language]
  );

  const languageLabel = LANGUAGES[language]?.label || language;

  return {
    language,
    setLanguage,
    t,
    languageLabel,
    languages: LANGUAGES,
  };
}
