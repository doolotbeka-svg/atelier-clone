import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';

interface HeaderProps {
  onOpenConsultation: () => void;
}

type NavKey = 'portfolio' | 'readyCollection' | 'configurator' | 'materials' | 'standards' | 'workflow' | 'architects' | 'showroom';

// Shared by the desktop nav row and the mobile menu
const NAV_LINKS: { href: string; key: NavKey; accent?: boolean }[] = [
  { href: '#portfolio', key: 'portfolio' },
  { href: '#ready-collection', key: 'readyCollection', accent: true },
  { href: '#configurator', key: 'configurator' },
  { href: '#materials', key: 'materials' },
  { href: '#standards', key: 'standards' },
  { href: '#workflow', key: 'workflow' },
  { href: '#architects', key: 'architects' },
  { href: '#showroom', key: 'showroom' }
];

const MENU_LABELS = {
  open: { ru: 'Открыть меню', en: 'Open menu', ky: 'Менюну ачуу' },
  close: { ru: 'Закрыть меню', en: 'Close menu', ky: 'Менюну жабуу' }
};

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const { currency, setCurrency } = useCurrency();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu with Escape or when the viewport grows to desktop
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onResize = () => {
      if (desktop.matches) setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onResize);
    };
  }, [isMenuOpen]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 border-b ${
        isScrolled 
          ? 'bg-[#141312]/95 backdrop-blur-md border-white/10 shadow-lg shadow-black/20' 
          : 'bg-[#141312]/80 backdrop-blur-sm border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 lg:py-0 lg:h-20 flex flex-wrap lg:flex-nowrap items-center justify-between gap-x-6 gap-y-2">
        {/* Zone 1: Wordmark + mobile menu toggle */}
        <div className="flex items-center justify-between gap-3 w-full lg:w-auto">
          <a 
            href="#" 
            onClick={() => setIsMenuOpen(false)}
            className="font-serif text-lg sm:text-2xl tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white font-medium hover:text-[#B38E5D] transition-colors whitespace-nowrap shrink-0"
          >
            Atelier Architectura
          </a>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label={(isMenuOpen ? MENU_LABELS.close : MENU_LABELS.open)[lang]}
            className="lg:hidden -mr-1 p-2 text-neutral-300 hover:text-white rounded-sm hover:bg-white/5 transition-colors cursor-pointer"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Zone 3: Currency Switcher (сом / рубль) + Language switcher + 1 primary action */}
        <div className="flex items-center gap-1.5 sm:gap-4 shrink-0 w-full lg:w-auto justify-between lg:justify-start">
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
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`${link.accent ? 'text-[#B38E5D] ' : ''}hover:text-white transition-colors py-1 whitespace-nowrap shrink-0`}
            >
              {t.nav[link.key]}
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav id="mobile-nav" className="lg:hidden border-t border-white/10 bg-[#141312] max-h-[calc(100dvh-7rem)] overflow-y-auto">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-3.5 border-b border-white/5 last:border-b-0 text-sm uppercase tracking-[0.12em] font-medium transition-colors ${link.accent ? 'text-[#B38E5D]' : 'text-neutral-200 hover:text-white'}`}
              >
                {t.nav[link.key]}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};
