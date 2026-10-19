import React, { useState } from 'react';
import { ArrowUpRight, Compass, ShieldCheck, Cpu, Sliders, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';

interface HeroProps {
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { lang, t } = useLanguage();
  const { content } = useContent();
  const slides = content.heroSlides;
  const slide = slides[Math.min(activeSlide, slides.length - 1)];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-12 overflow-hidden border-b border-white/5">
      {/* Background Architectural Ambient Image */}
      <div className="absolute inset-0 z-0">
        {slide && <img
          src={slide.image}
          alt={slide.title[lang]}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.42] contrast-[1.1] transition-all duration-700 ease-out scale-100"
        />}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141312] via-[#141312]/60 to-[#141312]/40" />
        <div className="absolute inset-0 bg-grid-pattern opacity-15" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-12 md:pt-16">
        <div className="max-w-3xl">
          {/* Natural Editorial Tagline */}
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#B38E5D] mb-6 font-medium">
            <span>{t.hero.kicker}</span>
          </div>

          {/* Headline with balanced wrap */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] text-white font-light leading-[1.08] tracking-tight mb-8 text-balance">
            {t.hero.title}
          </h1>

          {/* Subtitle with measure */}
          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-2xl mb-10 text-pretty">
            {t.hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="#portfolio"
              className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#B38E5D] hover:bg-[#9E7C4F] text-white text-xs uppercase tracking-[0.15em] font-semibold transition-all duration-200 rounded-sm shadow-md cursor-pointer"
            >
              <span>{t.hero.ctaPortfolio}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="#ready-collection"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-[#B38E5D]/40 hover:border-[#B38E5D] text-xs uppercase tracking-[0.15em] font-semibold transition-all duration-200 rounded-sm backdrop-blur-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B38E5D]" />
              <span>{t.hero.ctaReady}</span>
            </a>

            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-transparent hover:bg-white/5 text-neutral-300 hover:text-white border border-white/15 text-xs uppercase tracking-[0.15em] font-medium transition-all duration-200 rounded-sm backdrop-blur-sm cursor-pointer"
            >
              <span>{t.hero.ctaShowroom}</span>
            </button>
          </div>
        </div>

        {/* Ambient Slide Controls */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {slides.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`text-left px-3 py-2 rounded-sm transition-all text-xs cursor-pointer ${
                  activeSlide === idx
                    ? 'bg-white/15 text-white border-b-2 border-[#B38E5D]'
                    : 'text-neutral-400 hover:text-neutral-200 bg-black/20'
                }`}
              >
                <div className="font-mono text-[10px] text-[#B38E5D] tracking-wider">{String(idx + 1).padStart(2, '0')}</div>
                <div className="truncate max-w-[200px] text-[11px] font-medium">{item.residence[lang]}</div>
              </button>
            ))}
          </div>

          <div className="text-right text-xs text-neutral-400 hidden sm:block">
            <span className="text-[#B38E5D] font-mono">{t.hero.currentObject}</span>
            <span className="text-white ml-2">{slide?.tag[lang]}</span>
          </div>
        </div>
      </div>

      {/* Proof KPI Strip at bottom of hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10 text-xs">
          <div>
            <div className="font-serif text-2xl lg:text-3xl text-white font-light tracking-wide">
              {t.hero.kpiProduction}
            </div>
            <div className="text-neutral-400 font-light mt-1 text-[11px] leading-tight">
              {t.hero.kpiProductionSub}
            </div>
          </div>

          <div>
            <div className="font-serif text-2xl lg:text-3xl text-[#B38E5D] font-light tracking-wide">
              {t.hero.kpiTolerance}
            </div>
            <div className="text-neutral-400 font-light mt-1 text-[11px] leading-tight">
              {t.hero.kpiToleranceSub}
            </div>
          </div>

          <div>
            <div className="font-serif text-2xl lg:text-3xl text-white font-light tracking-wide">
              {t.hero.kpiWarranty}
            </div>
            <div className="text-neutral-400 font-light mt-1 text-[11px] leading-tight">
              {t.hero.kpiWarrantySub}
            </div>
          </div>

          <div>
            <div className="font-serif text-2xl lg:text-3xl text-white font-light tracking-wide">
              {t.hero.kpiNda}
            </div>
            <div className="text-neutral-400 font-light mt-1 text-[11px] leading-tight">
              {t.hero.kpiNdaSub}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
