import React, { useState } from 'react';
import { MaterialItem } from '../types';
import { Check, Sparkles, Sliders } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';

export const MaterialsHub: React.FC = () => {
  const { content } = useContent();
  const materials = content.materials;
  const [selectedId, setSelectedId] = useState<string | undefined>(materials[0]?.id);
  const selectedMaterial: MaterialItem | undefined = materials.find((m) => m.id === selectedId) ?? materials[0];

  const [activeEngineeringTab, setActiveEngineeringTab] = useState<'materials' | 'engineering'>('materials');
  const { t } = useLanguage();

  // All materials removed in the admin panel: hide the section
  if (!selectedMaterial) return null;

  return (
    <section id="materials" className="py-28 bg-[#181615] border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] text-[#B38E5D] font-medium mb-3">
              {t.materials.sectionTag}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-light leading-tight">
              {t.materials.title}
            </h2>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2 p-1 bg-[#141312] border border-white/10 rounded-sm">
            <button
              onClick={() => setActiveEngineeringTab('materials')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-sm transition-colors cursor-pointer ${
                activeEngineeringTab === 'materials'
                  ? 'bg-[#B38E5D] text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {t.materials.tabMaterials}
            </button>
            <button
              onClick={() => setActiveEngineeringTab('engineering')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-sm transition-colors cursor-pointer ${
                activeEngineeringTab === 'engineering'
                  ? 'bg-[#B38E5D] text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {t.materials.tabEngineering}
            </button>
          </div>
        </div>

        {activeEngineeringTab === 'materials' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Material Cards List */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
                {t.materials.selectHint}
              </div>
              {materials.map((mat) => {
                const isSelected = selectedMaterial?.id === mat.id;
                return (
                  <button
                    key={mat.id}
                    onClick={() => setSelectedId(mat.id)}
                    className={`w-full text-left p-4 rounded-sm border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#221F1C] border-[#B38E5D] shadow-md'
                        : 'bg-[#1D1B19] border-white/5 hover:border-white/20 text-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Swatch Color Indicator */}
                      <div
                        className="w-10 h-10 rounded-sm border border-white/10 shrink-0 shadow-inner"
                        style={{ backgroundColor: mat.colorHex }}
                      />
                      <div>
                        <div className="text-xs font-mono text-[#B38E5D]">
                          {mat.categoryLabel}
                        </div>
                        <div className="text-sm font-medium text-white">
                          {mat.name}
                        </div>
                      </div>
                    </div>

                    <div className="text-right text-xs text-neutral-400 font-mono hidden sm:block">
                      {mat.origin}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Deep Tactile Inspector */}
            <div className="lg:col-span-7 bg-[#1D1B19] border border-white/10 p-6 sm:p-8 rounded-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#B38E5D] font-mono">
                    {selectedMaterial.categoryLabel}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mt-1">
                    {selectedMaterial.name}
                  </h3>
                </div>
                <div className="bg-black/40 border border-white/10 px-3 py-1.5 rounded-sm text-xs font-mono text-neutral-300">
                  {t.materials.originLabel} <span className="text-white">{selectedMaterial.origin}</span>
                </div>
              </div>

              {/* Swatch Feature Display */}
              <div className="my-6 p-6 rounded-sm bg-[#141312] border border-white/5 flex items-center gap-6">
                <div
                  className="w-20 h-20 rounded-sm border border-white/20 shrink-0 shadow-lg"
                  style={{ backgroundColor: selectedMaterial.colorHex }}
                />
                <div>
                  <div className="text-xs font-mono text-[#B38E5D] uppercase tracking-wider mb-1">
                    {t.materials.finishLabel}
                  </div>
                  <div className="text-sm text-neutral-200 leading-relaxed font-light">
                    {selectedMaterial.finish}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4 text-sm text-neutral-300 font-light leading-relaxed">
                <p>{selectedMaterial.description}</p>
                <div className="p-4 bg-white/5 border border-white/5 rounded-sm">
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    {t.materials.specsLabel}
                  </div>
                  <div className="text-xs font-mono text-neutral-200">
                    {selectedMaterial.specs}
                  </div>
                </div>
              </div>

              {/* Recommendation Note */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3 text-xs text-[#B38E5D]">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>{selectedMaterial.highlight}</span>
              </div>
            </div>
          </div>
        ) : (
          /* Engineering Showcase Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.materials.engineeringPillars.map((feat, idx) => (
              <div
                key={idx}
                className="p-8 bg-[#1D1B19] border border-white/5 rounded-sm hover:border-[#B38E5D]/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-[#B38E5D] tracking-widest">
                      0{idx + 1} · {feat.origin}
                    </span>
                    <Sliders className="w-5 h-5 text-neutral-400" />
                  </div>
                  <h3 className="font-serif text-2xl text-white font-normal mb-3">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-start gap-2 text-xs text-[#B38E5D]">
                  <Check className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{feat.highlight}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
