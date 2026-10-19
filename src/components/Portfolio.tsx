import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/atelierData';
import { CaseStudy, ZoneCategory, StyleCategory } from '../types';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';

interface PortfolioProps {
  onSelectCase: (caseItem: CaseStudy) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectCase }) => {
  const [selectedZone, setSelectedZone] = useState<ZoneCategory>('all');
  const [selectedStyle, setSelectedStyle] = useState<StyleCategory>('all');
  const { lang, t } = useLanguage();
  const { formatPrice } = useCurrency();

  const zoneFilters: { id: ZoneCategory; label: string }[] = [
    { id: 'all', label: t.portfolio.allZones },
    { id: 'kitchen', label: t.portfolio.kitchens },
    { id: 'wardrobe', label: t.portfolio.wardrobes },
    { id: 'living', label: t.portfolio.living },
    { id: 'cabinet', label: t.portfolio.cabinets },
    { id: 'complex', label: t.portfolio.complex }
  ];

  const styleFilters: { id: StyleCategory; label: string }[] = [
    { id: 'all', label: t.portfolio.allStyles },
    { id: 'minimalism', label: t.portfolio.minimalism },
    { id: 'modern_luxury', label: t.portfolio.modernLuxury },
    { id: 'japandi', label: t.portfolio.japandi },
    { id: 'neoclassic', label: t.portfolio.neoclassic }
  ];

  const filteredCases = CASE_STUDIES.filter((c) => {
    const matchesZone = selectedZone === 'all' || c.zone === selectedZone;
    const matchesStyle = selectedStyle === 'all' || c.style === selectedStyle;
    return matchesZone && matchesStyle;
  });

  return (
    <section id="portfolio" className="py-28 bg-[#141312] border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] text-[#B38E5D] font-medium mb-3">
              {t.portfolio.sectionTag}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-light leading-tight">
              {t.portfolio.title}
            </h2>
          </div>
          <p className="text-sm text-neutral-400 font-light max-w-md leading-relaxed">
            {t.portfolio.subtitle}
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 mb-12 pb-6 border-b border-white/10">
          {/* Zone Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs uppercase tracking-wider text-neutral-500 font-mono mr-2 shrink-0">
              {t.portfolio.zoneLabel}
            </span>
            {zoneFilters.map((zf) => (
              <button
                key={zf.id}
                onClick={() => setSelectedZone(zf.id)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.1em] font-medium rounded-sm transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedZone === zf.id
                    ? 'bg-[#B38E5D] text-white'
                    : 'bg-[#1F1D1B] text-neutral-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {zf.label}
              </button>
            ))}
          </div>

          {/* Style Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs uppercase tracking-wider text-neutral-500 font-mono mr-2 shrink-0">
              {t.portfolio.styleLabel}
            </span>
            {styleFilters.map((sf) => (
              <button
                key={sf.id}
                onClick={() => setSelectedStyle(sf.id)}
                className={`px-3 py-1.5 text-xs rounded-sm transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedStyle === sf.id
                    ? 'border-b-2 border-[#B38E5D] text-white bg-white/5'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {sf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCases.map((caseItem) => (
            <div
              key={caseItem.id}
              onClick={() => onSelectCase(caseItem)}
              className="group bg-[#181615] border border-white/10 rounded-sm overflow-hidden hover:border-[#B38E5D]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Image Container with Hover Zoom */}
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                  <img
                    src={caseItem.realizedImage}
                    alt={caseItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Top Kicker */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
                    <span className="font-mono bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-sm border border-white/10">
                      {caseItem.residence}
                    </span>
                  </div>

                  {/* Bottom Image Microcopy */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <div className="text-xs text-neutral-300 font-mono">
                      {caseItem.zoneLabel} <span aria-hidden="true">·</span> {caseItem.styleLabel}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-serif text-xl text-white font-normal group-hover:text-[#B38E5D] transition-colors leading-snug mb-3">
                    {caseItem.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light line-clamp-2 leading-relaxed mb-5">
                    {caseItem.description}
                  </p>

                  {/* Price Row */}
                  <div className="pt-3 pb-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-neutral-400">
                      {t.portfolio.priceLabel}
                    </span>
                    <span className="font-mono text-sm text-[#B38E5D] font-medium tabular-nums">
                      {formatPrice(caseItem.priceRub, caseItem.priceKgs)}
                    </span>
                  </div>

                  {/* Materials list without badges */}
                  <div className="space-y-1 pt-3 border-t border-white/5">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                      {t.portfolio.materialsAndNodes}
                    </div>
                    <div className="text-xs text-neutral-300 leading-snug">
                      {caseItem.materials.slice(0, 2).join(' · ')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="px-6 py-4 bg-[#141312] border-t border-white/5 flex items-center justify-between text-xs text-neutral-400 group-hover:text-white transition-colors">
                <span className="font-mono text-[11px] text-[#B38E5D]">{t.portfolio.viewDetails}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {filteredCases.length === 0 && (
          <div className="text-center py-20 bg-[#181615] border border-white/5 rounded-sm">
            <p className="text-neutral-400 font-light">{t.portfolio.emptyMessage}</p>
            <button
              onClick={() => { setSelectedZone('all'); setSelectedStyle('all'); }}
              className="mt-4 px-4 py-2 bg-[#B38E5D] text-white text-xs uppercase tracking-wider font-medium rounded-sm cursor-pointer"
            >
              {t.portfolio.resetFilters}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
