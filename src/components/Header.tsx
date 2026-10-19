import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';

interface HeaderProps {
  onOpenConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const { currency, setCurrency } = useCurrency();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 border-b ${
        isScrolled 
          ? 'bg-[#141312]/95 backdrop-blur-md border-white/10 shadow-lg shadow-black/20' 
          : 'bg-[#141312]/80 backdrop-blur-sm border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 lg:py-0 lg:h-20 flex flex-wrap lg:flex-nowrap items-center justify-between gap-x-6 gap-y-2">
        {/* Zone 1: Wordmark */}
        <a 
          href="#" 
          className="font-serif text-lg sm:text-2xl tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white font-medium hover:text-[#B38E5D] transition-colors whitespace-nowrap shrink-0"
        >
          Atelier Architectura
        </a>

        {/* Zone 3: Currency Switcher (сом / рубль) + Language switcher + 1 primary action */}
        <div className="flex items-center gap-1.5 sm:gap-4 shrink-0 w-full sm:w-auto justify-between sm:justify-start">
          {/* Currency Switcher: сом / рубль */}
          <div className="flex items-center gap-1 text-[11px] font-mono tracking-wider text-neutral-400 border-r border-white/10 pr-2 sm:pr-4">
            <button
              onClick={() => setCurrency('RUB')}
              className={`px-1.5 py-0.5 transition-colors cursor-pointer ${
                currency === 'RUB' ? 'text-[#B38E5D] font-bold border-b border-[#B38E5D]' : 'hover:text-white'
              }`}
              title="Рубль (₽)"
            >
              ₽ РУБ
            </button>
            <span className="opacity-30">/</span>
            <button
              onClick={() => setCurrency('KGS')}
              className={`px-1.5 py-0.5 transition-colors cursor-pointer ${
                currency === 'KGS' ? 'text-[#B38E5D] font-bold border-b border-[#B38E5D]' : 'hover:text-white'
              }`}
              title="Кыргыз сому"
            >
              СОМ
            </button>
          </div>

          {/* Subtle Trilingual Switcher: RU / EN / KG */}
          <div className="flex items-center gap-1 text-[11px] font-mono tracking-wider text-neutral-400 border-r border-white/10 pr-2 sm:pr-4">
            <button
              onClick={() => setLang('ru')}
              className={`px-1 py-0.5 transition-colors cursor-pointer ${
                lang === 'ru' ? 'text-[#B38E5D] font-bold border-b border-[#B38E5D]' : 'hover:text-white'
              }`}
            >
              RU
            </button>
            <span className="opacity-30">/</span>
            <button
              onClick={() => setLang('en')}
              className={`px-1 py-0.5 transition-colors cursor-pointer ${
                lang === 'en' ? 'text-[#B38E5D] font-bold border-b border-[#B38E5D]' : 'hover:text-white'
              }`}
            >
              EN
            </button>
            <span className="opacity-30">/</span>
            <button
              onClick={() => setLang('ky')}
              className={`px-1 py-0.5 transition-colors cursor-pointer ${
                lang === 'ky' ? 'text-[#B38E5D] font-bold border-b border-[#B38E5D]' : 'hover:text-white'
              }`}
            >
              KG
            </button>
          </div>

          <button
            onClick={onOpenConsultation}
            className="px-2.5 sm:px-5 py-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.04em] sm:tracking-[0.15em] text-[#141312] bg-[#E8E4DF] hover:bg-[#B38E5D] hover:text-white transition-colors duration-200 rounded-sm whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
          >
            {t.nav.discuss}
          </button>
        </div>
      </div>

      {/* Zone 2: Navigation links on their own row, so the brand and actions above always fit */}
      <nav className="hidden lg:block border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-11 flex items-center justify-center gap-4 xl:gap-7 overflow-x-auto text-[11px] xl:text-[12px] tracking-[0.1em] xl:tracking-[0.12em] uppercase text-neutral-300 font-medium">
              <a href="#portfolio" className="hover:text-white transition-colors py-1 whitespace-nowrap shrink-0">
                {t.nav.portfolio}
              </a>
              <a href="#ready-collection" className="text-[#B38E5D] hover:text-white transition-colors py-1 whitespace-nowrap shrink-0">
                {t.nav.readyCollection}
              </a>
              <a href="#configurator" className="hover:text-white transition-colors py-1 whitespace-nowrap shrink-0">
                {t.nav.configurator}
              </a>
              <a href="#materials" className="hover:text-white transition-colors py-1 whitespace-nowrap shrink-0">
                {t.nav.materials}
              </a>
              <a href="#standards" className="hover:text-white transition-colors py-1 whitespace-nowrap shrink-0">
                {t.nav.standards}
              </a>
              <a href="#workflow" className="hover:text-white transition-colors py-1 whitespace-nowrap shrink-0">
                {t.nav.workflow}
              </a>
              <a href="#architects" className="hover:text-white transition-colors py-1 whitespace-nowrap shrink-0">
                {t.nav.architects}
              </a>
              <a href="#showroom" className="hover:text-white transition-colors py-1 whitespace-nowrap shrink-0">
                {t.nav.showroom}
              </a>
        </div>
      </nav>
    </header>
  );
};
