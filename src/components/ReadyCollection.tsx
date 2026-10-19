import React, { useState } from 'react';
import { ReadyFurnitureItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { useContent } from '../context/ContentContext';
import { 
  CheckCircle2, Sparkles, SlidersHorizontal, ArrowUpRight, 
  MapPin, ShieldCheck, Ruler, Layers, ChevronRight, X, Calculator, Eye
} from 'lucide-react';

interface ReadyCollectionProps {
  onReserveItem: (item: ReadyFurnitureItem) => void;
}

export const ReadyCollection: React.FC<ReadyCollectionProps> = ({ onReserveItem }) => {
  const { lang, t } = useLanguage();
  const { content } = useContent();
  const { currency, formatPrice, currencySymbol } = useCurrency();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<ReadyFurnitureItem | null>(null);

  // Interactive Calculator State
  const [calcType, setCalcType] = useState<string>('dining');
  const [calcMaterial, setCalcMaterial] = useState<string>('walnut');
  const [calcLength, setCalcLength] = useState<number>(2.6); // in meters
  const [calcHardware, setCalcHardware] = useState<string>('salice');

  const filteredItems = activeCategory === 'all'
    ? content.readyFurniture
    : content.readyFurniture.filter(item => item.category === activeCategory);

  // Dynamic cost calculation for custom / bespoke pieces
  const calculateEstimate = () => {
    let basePerMeter = 240000; // in KGS
    if (calcType === 'kitchen') basePerMeter = 650000;
    if (calcType === 'wardrobe') basePerMeter = 380000;
    if (calcType === 'cabinet') basePerMeter = 420000;
    if (calcType === 'credenza') basePerMeter = 220000;

    let materialMultiplier = 1.0;
    if (calcMaterial === 'eucalyptus') materialMultiplier = 1.25;
    if (calcMaterial === 'marble_viola') materialMultiplier = 1.45;
    if (calcMaterial === 'patagonia') materialMultiplier = 1.6;
    if (calcMaterial === 'brass') materialMultiplier = 1.35;

    let hardwareAddon = calcHardware === 'servodrive' ? 120000 : 60000;

    const totalKgs = Math.round((basePerMeter * calcLength * materialMultiplier) + hardwareAddon);
    const totalRub = Math.round(totalKgs / 0.975);

    return { totalKgs, totalRub };
  };

  const estimate = calculateEstimate();

  const handleSendEstimateToForm = () => {
    const typeLabel = calcType === 'dining' 
      ? 'Обеденный стол' 
      : calcType === 'kitchen' 
      ? 'Кухня' 
      : calcType === 'wardrobe' 
      ? 'Гардеробная' 
      : 'Консоль / Кабинет';
    
    const formattedEstimate = currency === 'KGS' 
      ? `${estimate.totalKgs.toLocaleString()} сом` 
      : `${estimate.totalRub.toLocaleString()} ₽`;

    const summaryText = `Расчет калькулятора: ${typeLabel} (${calcLength} м, материал: ${calcMaterial}) — ориентир ${formattedEstimate}`;
    
    // Smooth scroll to showroom form
    const showroomSection = document.getElementById('showroom');
    if (showroomSection) {
      showroomSection.scrollIntoView({ behavior: 'smooth' });
      // prefill the comment
      const commentInput = document.getElementById('notes-input') as HTMLTextAreaElement | null;
      if (commentInput) {
        commentInput.value = summaryText;
      }
    }
  };

  return (
    <section id="ready-collection" className="py-28 bg-[#181615] border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] text-[#B38E5D] font-medium mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.readyCollection.sectionTag}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-light leading-tight">
              {t.readyCollection.title}
            </h2>
            <p className="text-sm text-neutral-400 font-light mt-4 leading-relaxed">
              {t.readyCollection.subtitle}
            </p>
          </div>

          {/* Currency indicator notification */}
          <div className="bg-[#1D1B19] border border-white/10 px-4 py-3 rounded-sm flex items-center gap-3 shrink-0">
            <div className="w-2 h-2 rounded-full bg-[#B38E5D] animate-ping" />
            <div className="text-xs text-neutral-300 font-mono">
              <span className="text-neutral-500 uppercase tracking-wider block text-[10px]">
                {lang === 'ky' ? 'Учурдагы валюта' : lang === 'en' ? 'Active Currency' : 'Текущая валюта'}:
              </span>
              <span className="text-white font-semibold">
                {currency === 'KGS' ? 'Кыргыз сому (KGS)' : 'Российский рубль (RUB / ₽)'}
              </span>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none text-xs font-mono tracking-wider uppercase">
          {[
            { id: 'all', label: t.readyCollection.filterAll },
            { id: 'dining', label: t.readyCollection.filterDining },
            { id: 'storage', label: t.readyCollection.filterStorage },
            { id: 'lounge', label: t.readyCollection.filterLounge },
            { id: 'living', label: t.readyCollection.filterLiving },
            { id: 'office', label: t.readyCollection.filterOffice },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-2.5 rounded-sm transition-all whitespace-nowrap cursor-pointer border ${
                activeCategory === tab.id
                  ? 'bg-[#B38E5D] text-white border-[#B38E5D] font-medium shadow-md'
                  : 'bg-[#1D1B19] text-neutral-400 border-white/5 hover:text-white hover:border-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredItems.map(item => {
            const localizedTitle = item.title[lang] || item.title.ru;
            const localizedCat = item.categoryLabel[lang] || item.categoryLabel.ru;
            const localizedMaterials = item.materials[lang] || item.materials.ru;
            const localizedLocation = item.stockLocation[lang] || item.stockLocation.ru;

            return (
              <div 
                key={item.id}
                className="group bg-[#1D1B19] border border-white/10 rounded-sm overflow-hidden flex flex-col hover:border-[#B38E5D]/60 transition-all duration-300"
              >
                {/* Image Box */}
                <div className="relative aspect-[4/3] bg-[#141312] overflow-hidden">
                  <img
                    src={item.image}
                    alt={localizedTitle}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141312] via-transparent to-black/20" />

                  {/* Stock status badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 bg-[#141312]/90 backdrop-blur-md border border-[#B38E5D]/40 rounded-sm text-[11px] font-mono text-[#B38E5D]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B38E5D]" />
                    <span>{t.readyCollection.inStockBadge}</span>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-4 right-4 z-10 px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/10 rounded-sm text-[10px] font-mono uppercase tracking-wider text-neutral-300">
                    {localizedCat}
                  </div>

                  {/* Price Tag Overlay on Hover */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white z-10">
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block">
                        {t.readyCollection.priceLabel}
                      </span>
                      <span className="font-serif text-2xl font-light text-white tracking-wide">
                        {formatPrice(item.priceRub, item.priceKgs)}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedItem(item)}
                      className="w-10 h-10 rounded-sm bg-white/10 backdrop-blur-md hover:bg-[#B38E5D] hover:text-black flex items-center justify-center text-white transition-colors cursor-pointer"
                      title={t.readyCollection.detailsBtn}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mb-2">
                      <span>{t.readyCollection.skuLabel} {item.sku}</span>
                      <span className="flex items-center gap-1 text-[#B38E5D]">
                        <Ruler className="w-3 h-3" />
                        {item.dimensions}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg text-white font-normal line-clamp-2 mb-3 group-hover:text-[#B38E5D] transition-colors">
                      {localizedTitle}
                    </h3>

                    <p className="text-xs text-neutral-400 font-light line-clamp-2 leading-relaxed mb-4">
                      {localizedMaterials}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 space-y-3">
                    <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-light">
                      <MapPin className="w-3.5 h-3.5 text-[#B38E5D] shrink-0" />
                      <span className="truncate">{localizedLocation}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="w-full py-2.5 px-3 text-center border border-white/10 hover:border-white/30 text-xs font-mono text-neutral-300 hover:text-white rounded-sm transition-colors cursor-pointer"
                      >
                        {t.readyCollection.detailsBtn}
                      </button>

                      <button
                        onClick={() => onReserveItem(item)}
                        className="w-full py-2.5 px-3 text-center bg-[#E8E4DF] hover:bg-[#B38E5D] text-[#141312] hover:text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer shadow-sm"
                      >
                        {t.readyCollection.reserveBtn}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* White-Glove Logistics Note */}
        <div className="bg-[#141312] border border-white/10 p-6 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 mb-20 text-xs text-neutral-400">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#B38E5D] shrink-0" />
            <span>{t.readyCollection.deliveryNote}</span>
          </div>
          <div className="font-mono text-[#B38E5D] shrink-0">
            {lang === 'ky' ? 'Кыргызстан жана Борбордук Азия' : lang === 'en' ? 'Kyrgyzstan & Central Asia' : 'Кыргызстан и Центральная Азия'}
          </div>
        </div>

        {/* Interactive Custom Furniture Price Estimator / Configurator */}
        <div className="bg-[#1D1B19] border border-white/10 p-8 lg:p-12 rounded-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#B38E5D]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Explanations & Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#B38E5D] mb-2">
                  <Calculator className="w-4 h-4" />
                  <span>{t.readyCollection.calculatorTitle}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                  {lang === 'ky' 
                    ? 'Жеке долбоордун баасын заматта эсептеңиз' 
                    : lang === 'en' 
                    ? 'Instant Preliminary Cost Estimation' 
                    : 'Мгновенный расчет стоимости индивидуального изделия'}
                </h3>
                <p className="text-xs text-neutral-400 font-light mt-2 leading-relaxed">
                  {t.readyCollection.calculatorSubtitle}
                </p>
              </div>

              {/* Control 1: Category */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  {t.readyCollection.calcSelectType}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  {[
                    { id: 'dining', label: { ru: 'Обеденный стол', en: 'Dining Table', ky: 'Тамактануучу үстөл' } },
                    { id: 'kitchen', label: { ru: 'Кухня (остров)', en: 'Kitchen Island', ky: 'Ашкана аралы' } },
                    { id: 'wardrobe', label: { ru: 'Гардеробная', en: 'Dressing Room', ky: 'Гардероб' } },
                    { id: 'credenza', label: { ru: 'Консоль / ТВ', en: 'Credenza / TV', ky: 'Консоль / ТВ' } },
                  ].map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setCalcType(cat.id)}
                      className={`p-2.5 rounded-sm border text-center transition-colors cursor-pointer ${
                        calcType === cat.id
                          ? 'border-[#B38E5D] bg-[#B38E5D]/10 text-white font-medium'
                          : 'border-white/5 bg-[#141312] text-neutral-400 hover:text-white'
                      }`}
                    >
                      {cat.label[lang] || cat.label.ru}
                    </button>
                  ))}
                </div>
              </div>

              {/* Control 2: Noble Material */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  {t.readyCollection.calcSelectMaterial}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  {[
                    { id: 'walnut', label: { ru: 'Американский орех', en: 'American Walnut', ky: 'Америкалык жаңгак' } },
                    { id: 'eucalyptus', label: { ru: 'Копченый эвкалипт', en: 'Fumed Eucalyptus', ky: 'Ышталган эвкалипт' } },
                    { id: 'marble_viola', label: { ru: 'Мрамор Calacatta', en: 'Calacatta Marble', ky: 'Calacatta мрамору' } },
                    { id: 'patagonia', label: { ru: 'Кварцит Patagonia', en: 'Patagonia Quartz', ky: 'Patagonia кварцити' } },
                  ].map(mat => (
                    <button
                      key={mat.id}
                      onClick={() => setCalcMaterial(mat.id)}
                      className={`p-2.5 rounded-sm border text-center transition-colors cursor-pointer ${
                        calcMaterial === mat.id
                          ? 'border-[#B38E5D] bg-[#B38E5D]/10 text-white font-medium'
                          : 'border-white/5 bg-[#141312] text-neutral-400 hover:text-white'
                      }`}
                    >
                      {mat.label[lang] || mat.label.ru}
                    </button>
                  ))}
                </div>
              </div>

              {/* Control 3: Dimensions Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                  <span>{t.readyCollection.calcLengthLabel}</span>
                  <span className="text-[#B38E5D] font-bold">{calcLength.toFixed(1)} м ({Math.round(calcLength * 1000)} мм)</span>
                </div>
                <input
                  type="range"
                  min="1.4"
                  max="5.5"
                  step="0.1"
                  value={calcLength}
                  onChange={(e) => setCalcLength(parseFloat(e.target.value))}
                  className="w-full accent-[#B38E5D] cursor-pointer"
                />
              </div>
            </div>

            {/* Right: Calculated Price Summary Card */}
            <div className="lg:col-span-5 bg-[#141312] border border-[#B38E5D]/30 p-8 rounded-sm text-center lg:text-left space-y-6">
              <span className="text-xs uppercase font-mono tracking-widest text-[#B38E5D] block">
                {t.readyCollection.calcEstimatedCost}
              </span>

              <div>
                <div className="font-serif text-4xl sm:text-5xl text-white font-light tracking-wide mb-1">
                  {currency === 'KGS' 
                    ? `${estimate.totalKgs.toLocaleString()} сом` 
                    : `${estimate.totalRub.toLocaleString()} ₽`}
                </div>
                <div className="text-xs font-mono text-neutral-400">
                  {currency === 'KGS'
                    ? `≈ ${estimate.totalRub.toLocaleString()} ₽ (по курсу ЦБ / НБКР)`
                    : `≈ ${estimate.totalKgs.toLocaleString()} сом`}
                </div>
              </div>

              <div className="space-y-2 text-xs text-neutral-400 border-t border-b border-white/5 py-4 font-light leading-relaxed text-left">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B38E5D] shrink-0" />
                  <span>Включает конструкторскую 3D-деталировку КД</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B38E5D] shrink-0" />
                  <span>100% сухая контрольная сборка в цеху Бишкека</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B38E5D] shrink-0" />
                  <span>Беспылевой монтаж Festool и гарантия 5 лет</span>
                </div>
              </div>

              <button
                onClick={handleSendEstimateToForm}
                className="w-full py-3.5 px-6 bg-[#B38E5D] hover:bg-[#c29c6b] text-white font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>{t.readyCollection.calcSendEstimate}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-neutral-500 font-mono leading-relaxed">
                {t.readyCollection.calcNote}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Item Details Full Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
          <div 
            className="bg-[#1A1817] border border-white/10 max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-sm p-6 sm:p-10 relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs uppercase tracking-[0.2em] text-[#B38E5D] font-mono mb-2">
              {t.readyCollection.modalSubtitle}
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-4">
              {selectedItem.title[lang] || selectedItem.title.ru}
            </h3>

            {/* Gallery / Image */}
            <div className="relative aspect-[16/9] bg-[#141312] rounded-sm overflow-hidden mb-8 border border-white/5">
              <img
                src={selectedItem.image}
                alt={selectedItem.title[lang] || selectedItem.title.ru}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-md border border-[#B38E5D]/40 text-[#B38E5D] text-xs font-mono rounded-sm">
                {selectedItem.stockLocation[lang] || selectedItem.stockLocation.ru}
              </div>
            </div>

            {/* Description & Specs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-xs">
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] uppercase font-mono tracking-wider text-neutral-500 block mb-1">
                    {t.readyCollection.dimensionsLabel}
                  </span>
                  <span className="text-white font-mono text-sm">{selectedItem.dimensions}</span>
                </div>

                <div>
                  <span className="text-[11px] uppercase font-mono tracking-wider text-neutral-500 block mb-1">
                    {t.readyCollection.materialsLabel}
                  </span>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    {selectedItem.materials[lang] || selectedItem.materials.ru}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] uppercase font-mono tracking-wider text-neutral-500 block mb-1">
                    {t.readyCollection.finishLabel}
                  </span>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    {selectedItem.finish[lang] || selectedItem.finish.ru}
                  </p>
                </div>
              </div>

              {/* Technical Specs List */}
              <div className="space-y-3 bg-[#141312] p-5 rounded-sm border border-white/5">
                <span className="text-[11px] uppercase font-mono tracking-wider text-[#B38E5D] block mb-2">
                  {t.readyCollection.specsLabel}
                </span>
                {selectedItem.specs.map((sp, idx) => (
                  <div key={idx} className="flex items-start justify-between gap-4 py-1.5 border-b border-white/5">
                    <span className="text-neutral-400 font-light">{sp.label[lang] || sp.label.ru}</span>
                    <span className="text-white font-mono text-right">{sp.value[lang] || sp.value.ru}</span>
                  </div>
                ))}

                <div className="pt-3">
                  <span className="text-[11px] uppercase font-mono tracking-wider text-neutral-500 block mb-1">
                    {t.readyCollection.priceLabel}
                  </span>
                  <span className="font-serif text-3xl font-light text-white block">
                    {formatPrice(selectedItem.priceRub, selectedItem.priceKgs)}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
              <div className="text-xs text-neutral-400 font-light">
                {lang === 'ky' 
                  ? 'Бишкек шоурумунда көрсөтүүгө даяр' 
                  : lang === 'en' 
                  ? 'Available for private preview in Bishkek' 
                  : 'Доступен к личному просмотру в шоуруме Бишкека'}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-5 py-3 border border-white/10 text-neutral-400 hover:text-white rounded-sm text-xs font-mono transition-colors cursor-pointer w-full sm:w-auto"
                >
                  {t.consultationModal.closeBtn}
                </button>
                <button
                  onClick={() => {
                    const itemToReserve = selectedItem;
                    setSelectedItem(null);
                    onReserveItem(itemToReserve);
                  }}
                  className="px-6 py-3 bg-[#B38E5D] hover:bg-[#c29c6b] text-white font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer w-full sm:w-auto shadow-md"
                >
                  {t.readyCollection.reserveBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
