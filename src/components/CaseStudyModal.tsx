import React, { useState } from 'react';
import { X, Check, ArrowRight, Layers, SlidersHorizontal, Sparkles } from 'lucide-react';
import { CaseStudy } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';

interface CaseStudyModalProps {
  caseItem: CaseStudy | null;
  onClose: () => void;
  onRequestQuote: (caseTitle: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  caseItem,
  onClose,
  onRequestQuote
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeTab, setActiveTab] = useState<'compare' | 'gallery'>('compare');
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();

  if (!caseItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-5xl bg-[#181615] border border-white/10 rounded-sm shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="px-6 sm:px-8 py-5 border-b border-white/10 flex items-center justify-between bg-[#141312] shrink-0">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#B38E5D] font-mono">
              {t.caseModal.projectCase} · {caseItem.residence}
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-white font-normal mt-1">
              {caseItem.title}
            </h3>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-sm hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Закрыть модальное окно"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Comparison / Visual Showcase */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('compare')}
                  className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium rounded-sm transition-colors cursor-pointer ${
                    activeTab === 'compare'
                      ? 'bg-[#B38E5D] text-white'
                      : 'bg-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  {t.caseModal.tabCompare}
                </button>
                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium rounded-sm transition-colors cursor-pointer ${
                    activeTab === 'gallery'
                      ? 'bg-[#B38E5D] text-white'
                      : 'bg-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  {t.caseModal.tabGallery}
                </button>
              </div>

              {activeTab === 'compare' && (
                <div className="text-xs font-mono text-neutral-400 hidden sm:flex items-center gap-2">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#B38E5D]" />
                  <span>{t.caseModal.dragHint}</span>
                </div>
              )}
            </div>

            {activeTab === 'compare' ? (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm border border-white/10 select-none">
                {/* Realized Image (Background) */}
                <img
                  src={caseItem.realizedImage}
                  alt={caseItem.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 text-xs font-mono text-white backdrop-blur-sm rounded-sm">
                  {t.caseModal.realizedBadge}
                </div>

                {/* Blueprint Drawing (Foreground Overlay with Clip) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={caseItem.blueprintImage}
                    alt="Чертеж КД"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover filter invert contrast-125 brightness-90"
                    style={{ width: '100%', maxWidth: 'none' }}
                  />
                  <div className="absolute inset-0 bg-[#0F2236]/70 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-blueprint-pattern opacity-40" />
                  <div className="absolute top-4 left-4 bg-[#0F2236]/90 px-3 py-1 text-xs font-mono text-[#B38E5D] backdrop-blur-sm rounded-sm border border-[#B38E5D]/30">
                    {t.caseModal.blueprintBadge}
                  </div>
                </div>

                {/* Slider Handle Line */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-[#B38E5D] cursor-ew-resize z-20"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#B38E5D] text-black flex items-center justify-center shadow-lg border-2 border-white">
                    <SlidersHorizontal className="w-4 h-4" />
                  </div>
                </div>

                {/* Range input transparent overlay for smooth dragging */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-30"
                  aria-label="Сравнение чертежа и готовой мебели"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {caseItem.gallery.map((img, i) => (
                  <div key={i} className="aspect-[4/3] rounded-sm overflow-hidden border border-white/10">
                    <img
                      src={img}
                      alt={`Деталь ${i + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="text-xs font-mono text-[#B38E5D] mt-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B38E5D]" />
              <span>{caseItem.drawingNote}</span>
            </div>
          </div>

          {/* Key Metrics Strip including Price */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#141312] border border-white/5 rounded-sm">
            <div className="text-center border-r border-white/5 pr-2">
              <div className="text-xs text-[#B38E5D] font-mono uppercase">{t.caseModal.turnkeyCost}</div>
              <div className="font-mono text-base sm:text-lg text-[#B38E5D] font-semibold mt-0.5 tabular-nums">
                {formatPrice(caseItem.priceRub, caseItem.priceKgs)}
              </div>
            </div>
            {caseItem.metrics.map((m, idx) => (
              <div key={idx} className="text-center">
                <div className="text-xs text-neutral-400">{m.label}</div>
                <div className="font-mono text-base sm:text-lg text-white font-medium mt-0.5">{m.value}</div>
              </div>
            ))}
          </div>

          {/* Key Node Price Breakdown */}
          {caseItem.priceBreakdown && (
            <div className="pt-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#B38E5D] font-mono mb-3">
                <SlidersHorizontal className="w-4 h-4" />
                <span>{t.caseModal.breakdownTitle}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {caseItem.priceBreakdown.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 bg-[#141312] border border-white/5 rounded-sm flex items-center justify-between text-xs"
                  >
                    <span className="text-neutral-300 font-light">{item.item}</span>
                    <span className="font-mono text-white font-medium tabular-nums ml-2 shrink-0">
                      {formatPrice(item.priceRub)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Task & Engineering Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-mono mb-2">
                {t.caseModal.taskTitle}
              </div>
              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                {caseItem.task}
              </p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-[#B38E5D] font-mono mb-2">
                {t.caseModal.solutionTitle}
              </div>
              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                {caseItem.engineeringSolution}
              </p>
            </div>
          </div>

          {/* Materials & Hardware Lists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white font-mono mb-3">
                <Layers className="w-4 h-4 text-[#B38E5D]" />
                <span>{t.caseModal.materialsTitle}</span>
              </div>
              <ul className="space-y-2">
                {caseItem.materials.map((mat, i) => (
                  <li key={i} className="text-sm text-neutral-300 flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#B38E5D] shrink-0 mt-0.5" />
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white font-mono mb-3">
                <Sparkles className="w-4 h-4 text-[#B38E5D]" />
                <span>{t.caseModal.hardwareTitle}</span>
              </div>
              <ul className="space-y-2">
                {caseItem.hardware.map((hw, i) => (
                  <li key={i} className="text-sm text-neutral-300 flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#B38E5D] shrink-0 mt-0.5" />
                    <span>{hw}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="px-6 sm:px-8 py-5 border-t border-white/10 bg-[#141312] flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="text-xs text-neutral-400 font-light">
            <span className="text-white font-mono">{formatPrice(caseItem.priceRub, caseItem.priceKgs)}</span> · {t.caseModal.timeline} <span className="text-white font-mono">{caseItem.timeline}</span> · {t.caseModal.area} <span className="text-white font-mono">{caseItem.area}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onRequestQuote(caseItem.title);
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#B38E5D] hover:bg-[#9E7C4F] text-white text-xs uppercase tracking-[0.15em] font-semibold rounded-sm transition-colors cursor-pointer"
            >
              <span>{t.caseModal.ctaCalculate}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
