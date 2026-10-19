import React, { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_CONTENT, SiteContent, normalizeContent } from '../content/siteContent';
import { fetchContent } from '../content/api';

interface ContentContextType {
  content: SiteContent;
  setContent: (content: SiteContent) => void;
}

const ContentContext = createContext<ContentContextType>({
  content: DEFAULT_CONTENT,
  setContent: () => {}
});

// Waits briefly for published content so visitors do not see the defaults flash first
const MAX_WAIT_MS = 2500;

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timer = window.setTimeout(() => setReady(true), MAX_WAIT_MS);
    fetchContent()
      .then((saved) => {
        if (!cancelled && saved) setContent(normalizeContent(saved));
      })
      .catch((err) => console.warn('Using built-in content:', err))
      .finally(() => {
        window.clearTimeout(timer);
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#141312] flex items-center justify-center">
        <span className="font-serif text-xl tracking-[0.2em] uppercase text-white/60 animate-pulse">Atelier Architectura</span>
      </div>
    );
  }

  return <ContentContext.Provider value={{ content, setContent }}>{children}</ContentContext.Provider>;
};

export const useContent = () => useContext(ContentContext);
