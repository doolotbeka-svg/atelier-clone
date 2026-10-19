import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS, TranslationData } from '../i18n/translations';
import { useContent } from './ContentContext';

export type Language = 'ru' | 'en' | 'ky';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationData;
}

export const LanguageContext = createContext<LanguageContextType>({
  lang: 'ru',
  setLang: () => {},
  t: TRANSLATIONS.ru,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('atelier_lang');
    if (saved === 'ru' || saved === 'en' || saved === 'ky') return saved;
    return 'ru';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('atelier_lang', newLang);
  };

  // Texts come from the published site content, so the admin panel can edit them
  const { content } = useContent();
  const t = content.translations[lang] || content.translations.ru;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
