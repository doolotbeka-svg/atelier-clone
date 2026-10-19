import React, { useState } from 'react';
import { 
  MapPin, Clock, Phone, Coffee, ShieldCheck, 
  Upload, FileText, CheckCircle2, Send, Car 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { useContent } from '../context/ContentContext';
import { phoneHref } from '../content/siteContent';

interface ShowroomAndFormProps {
  initialCaseTitle?: string;
}

export const ShowroomAndForm: React.FC<ShowroomAndFormProps> = ({ initialCaseTitle }) => {
  const { lang, t } = useLanguage();
  const { contacts } = useContent().content;
  const { currency, currencySymbol } = useCurrency();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: 'kitchen',
    budget: 'from_3m',
    notes: initialCaseTitle ? `Объект / Предмет мебели: ${initialCaseTitle}` : '',
    visitShowroom: true
  });

  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeMapLayer, setActiveMapLayer] = useState<'schematic' | 'transit'>('schematic');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAttachedFile({
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} МБ`
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setAttachedFile({
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} МБ`
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/consultation-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          lang,
          currency,
          hasFile: !!attachedFile,
          fileName: attachedFile?.name,
          country: 'Kyrgyzstan',
          city: 'Bishkek'
        })
      });
    } catch (err) {
      console.log('Submitted lead locally', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const projectTypes = [
    { id: 'ready_furniture', label: { ru: 'Готовая мебель из наличия в шоуруме', en: 'Ready Furniture from Showroom Stock', ky: 'Шоурумда бар даяр эмерек' } },
    { id: 'kitchen', label: { ru: 'Кухонный гарнитур и остров', en: 'Kitchen Cabinetry & Island', ky: 'Ашкана гарнитуру жана арал' } },
    { id: 'wardrobe', label: { ru: 'Мастер-гардеробная комната', en: 'Master Dressing Room', ky: 'Мастер-гардероб бөлмөсү' } },
    { id: 'living', label: { ru: 'Гостиная зона & ТВ-консоль', en: 'Living Area & TV Console', ky: 'Конок бөлмө жана ТВ-консоль' } },
    { id: 'cabinet', label: { ru: 'Кабинет & библиотека', en: 'Private Study & Library', ky: 'Иш бөлмө жана китепкана' } },
    { id: 'complex', label: { ru: 'Комплексная меблировка виллы/пентхауса', en: 'Full Villa/Penthouse Fitout', ky: 'Вилланы/пентхаусту толук эмеректөө' } },
  ];

  const budgetTiers = currency === 'KGS' 
    ? [
        { id: 'from_1_5m', label: { ru: '1.5 – 3 млн сом', en: '1.5M – 3M KGS', ky: '1.5 – 3 млн сом' } },
        { id: 'from_3m', label: { ru: '3 – 7 млн сом', en: '3M – 7M KGS', ky: '3 – 7 млн сом' } },
        { id: 'from_7m', label: { ru: '7 – 15 млн сом', en: '7M – 15M KGS', ky: '7 – 15 млн сом' } },
        { id: 'above_15m', label: { ru: 'Более 15 млн сом (High-End)', en: '15M+ KGS (Luxury)', ky: '15 млн сомдон жогору (High-End)' } }
      ]
    : [
        { id: 'from_1_5m', label: { ru: 'От 1.5 до 3 млн ₽', en: '1.5M – 3M RUB', ky: '1.5 – 3 млн рубль' } },
        { id: 'from_3m', label: { ru: 'От 3 до 7 млн ₽', en: '3M – 7M RUB', ky: '3 – 7 млн рубль' } },
        { id: 'from_7m', label: { ru: 'От 7 до 15 млн ₽', en: '7M – 15M RUB', ky: '7 – 15 млн рубль' } },
        { id: 'above_15m', label: { ru: 'Более 15 млн ₽ (High-End)', en: '15M+ RUB (Luxury)', ky: '15 млн рублден жогору (High-End)' } }
      ];

  return (
    <section id="showroom" className="py-28 bg-[#181615] border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs uppercase tracking-[0.2em] text-[#B38E5D] font-medium mb-3">
            {t.showroom.sectionTag}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-light leading-tight">
            {t.showroom.title}
          </h2>
          <p className="text-sm text-neutral-400 font-light mt-4 leading-relaxed">
            {t.showroom.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Map & Showroom Details */}
          <div className="lg:col-span-5 space-y-8">
            {/* Showroom Atmosphere Card */}
            <div className="p-8 bg-[#1D1B19] border border-white/10 rounded-sm">
              <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-[#B38E5D] font-mono mb-4">
                <Coffee className="w-4 h-4" />
                <span>{t.showroom.atmosphereTag}</span>
              </div>

              <h3 className="font-serif text-2xl text-white font-normal mb-3">
                {t.showroom.flagshipTitle}
              </h3>

              <div className="space-y-4 text-xs text-neutral-300 font-light leading-relaxed">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#B38E5D] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium">{t.showroom.address}</span>
                    <div className="text-neutral-500 font-mono mt-0.5">{t.showroom.addressSub}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Car className="w-4 h-4 text-[#B38E5D] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium">{t.showroom.parking}</span>
                    <div className="text-neutral-500 mt-0.5">{t.showroom.parkingSub}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#B38E5D] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium">{t.showroom.hours}</span>
                    <div className="text-neutral-500 mt-0.5">{t.showroom.hoursSub}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#B38E5D] shrink-0 mt-0.5" />
                  <div>
                    <a href={phoneHref(contacts.phone)} className="text-white font-medium hover:text-[#B38E5D] transition-colors">
                      {contacts.phone} / {contacts.whatsapp}
                    </a>
                    <div className="text-neutral-500 mt-0.5">{t.showroom.phoneSub}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map UI for Bishkek */}
            <div className="bg-[#1D1B19] border border-white/10 rounded-sm overflow-hidden">
              <div className="p-4 bg-[#141312] border-b border-white/5 flex items-center justify-between">
                <div className="text-xs uppercase font-mono tracking-wider text-neutral-400">
                  {lang === 'ky' ? 'Бишкек картасы' : lang === 'en' ? 'Bishkek Showroom Map' : 'Карта проезда · Бишкек'}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveMapLayer('schematic')}
                    className={`px-2.5 py-1 text-[11px] rounded-sm transition-colors cursor-pointer ${
                      activeMapLayer === 'schematic'
                        ? 'bg-[#B38E5D] text-white'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {t.showroom.mapSchematic}
                  </button>
                  <button
                    onClick={() => setActiveMapLayer('transit')}
                    className={`px-2.5 py-1 text-[11px] rounded-sm transition-colors cursor-pointer ${
                      activeMapLayer === 'transit'
                        ? 'bg-[#B38E5D] text-white'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {t.showroom.mapTransit}
                  </button>
                </div>
              </div>

              {/* Styled Stylized Architectural Map Graphic centered on Erkindik Boulevard */}
              <div className="relative aspect-[16/10] bg-[#121110] p-6 flex flex-col justify-between overflow-hidden">
                <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 500 300">
                  {/* Central Boulevard Erkindik with green park stripe */}
                  <rect x="230" y="0" width="40" height="300" fill="#1B261D" />
                  <path d="M 250,0 L 250,300" stroke="#B38E5D" strokeWidth="2" strokeDasharray="6 3" fill="none" />
                  
                  {/* Cross Streets: Kievskaya & Toktogul */}
                  <path d="M 0,90 L 500,90" stroke="#B38E5D" strokeWidth="2" fill="none" />
                  <path d="M 0,200 L 500,200" stroke="#B38E5D" strokeWidth="2" fill="none" />
                  
                  {/* Secondary Streets */}
                  <path d="M 110,0 L 110,300" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" fill="none" />
                  <path d="M 390,0 L 390,300" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" fill="none" />
                  
                  {/* Building Outlines */}
                  <rect x="280" y="110" width="90" height="70" fill="#221F1C" stroke="#333" strokeWidth="1" />
                  <rect x="130" y="110" width="90" height="70" fill="#221F1C" stroke="#333" strokeWidth="1" />
                  <rect x="280" y="220" width="90" height="60" fill="#221F1C" stroke="#333" strokeWidth="1" />
                  <rect x="130" y="220" width="90" height="60" fill="#221F1C" stroke="#333" strokeWidth="1" />
                </svg>

                <div className="relative z-10 flex items-center justify-between text-xs text-neutral-400 font-mono">
                  <span>ул. Киевская (пл. Ала-Тоо)</span>
                  <span>ул. Абдрахманова (Советская)</span>
                </div>

                {/* Showroom Pin Point on Erkindik 35 */}
                <div className="relative z-10 self-center text-center">
                  <div className="w-10 h-10 rounded-full bg-[#B38E5D] text-black mx-auto flex items-center justify-center shadow-xl animate-pulse">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="mt-2 bg-black/90 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-[#B38E5D]/60 text-xs text-white font-medium inline-block shadow-lg">
                    ATELIER ARCHITECTURA · БИШКЕК
                  </div>
                  <div className="text-[10px] text-[#B38E5D] font-mono mt-0.5">
                    бул. Эркиндик, 35 (пер. ул. Токтогула)
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>ул. Токтогула</span>
                  <span>ул. Боконбаева / ЖД Вокзал</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-7 bg-[#1D1B19] border border-white/10 p-8 sm:p-10 rounded-sm">
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-2">
              {t.showroom.formTitle}
            </h3>
            <p className="text-xs text-neutral-400 font-light mb-8 leading-relaxed">
              {t.showroom.formDesc}
            </p>

            {isSubmitted ? (
              <div className="p-8 bg-[#141312] border border-[#B38E5D]/40 rounded-sm text-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-[#B38E5D]/20 text-[#B38E5D] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl text-white font-normal">
                  {t.showroom.successTitle}
                </h4>
                <p className="text-xs text-neutral-400 font-light max-w-md mx-auto leading-relaxed">
                  {t.showroom.successDesc}
                </p>
                <div className="pt-2 text-[11px] text-[#B38E5D] font-mono">
                  {t.showroom.ndaGuarantee}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      {t.showroom.nameField} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={lang === 'ky' ? 'Аты-жөнүңүз' : lang === 'en' ? 'Full Name' : 'Иван Демидов'}
                      className="w-full bg-[#141312] border border-white/10 px-4 py-3 rounded-sm text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#B38E5D]"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      {t.showroom.phoneField} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+996 (555) 00-00-00"
                      className="w-full bg-[#141312] border border-white/10 px-4 py-3 rounded-sm text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#B38E5D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Space Type */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      {t.showroom.typeField}
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-[#141312] border border-white/10 px-4 py-3 rounded-sm text-xs text-white focus:outline-none focus:border-[#B38E5D]"
                    >
                      {projectTypes.map((type) => (
                        <option key={type.id} value={type.id} className="bg-[#1D1B19] text-white">
                          {type.label[lang] || type.label.ru}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      {t.showroom.budgetField} ({currencySymbol})
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-[#141312] border border-white/10 px-4 py-3 rounded-sm text-xs text-white focus:outline-none focus:border-[#B38E5D]"
                    >
                      {budgetTiers.map((tier) => (
                        <option key={tier.id} value={tier.id} className="bg-[#1D1B19] text-white">
                          {tier.label[lang] || tier.label.ru}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* File Upload Zone */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    {t.showroom.uploadField}
                  </label>
                  
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className="border border-dashed border-white/20 hover:border-[#B38E5D]/60 bg-[#141312] p-6 rounded-sm text-center transition-colors relative cursor-pointer"
                  >
                    <input
                      type="file"
                      accept=".pdf,.dwg,.zip,.rar,.png,.jpg"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />

                    {attachedFile ? (
                      <div className="flex items-center justify-center gap-3 text-xs text-[#B38E5D]">
                        <FileText className="w-5 h-5" />
                        <span className="font-mono">{attachedFile.name}</span>
                        <span className="text-neutral-500 font-mono">({attachedFile.size})</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-5 h-5 text-neutral-500 mx-auto" />
                        <div className="text-xs text-neutral-400 font-light">
                          <span>{t.showroom.uploadDrag} </span>
                          <span className="text-[#B38E5D] underline">{t.showroom.uploadSelect}</span>
                        </div>
                        <div className="text-[10px] text-neutral-600 font-mono">
                          {t.showroom.ndaProtected}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Comments / Notes */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    {t.showroom.commentsField}
                  </label>
                  <textarea
                    id="notes-input"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={lang === 'ky' ? 'Материалдар же чиймелер боюнча каалоолор...' : lang === 'en' ? 'Notes regarding materials or drawings...' : 'Опишите ваши предпочтения по шпону, камню, габаритам или укажите адрес объекта в Бишкеке/Иссык-Куле...'}
                    className="w-full bg-[#141312] border border-white/10 px-4 py-3 rounded-sm text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#B38E5D]"
                  />
                </div>

                {/* Visit Showroom Checkbox */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="visitShowroom"
                    checked={formData.visitShowroom}
                    onChange={(e) => setFormData({ ...formData, visitShowroom: e.target.checked })}
                    className="w-4 h-4 rounded bg-[#141312] border-white/20 text-[#B38E5D] accent-[#B38E5D] cursor-pointer"
                  />
                  <label htmlFor="visitShowroom" className="text-xs text-neutral-300 font-light cursor-pointer">
                    {lang === 'ky' 
                      ? 'Бишкектеги шоурумга жолугушууну пландоо (бул. Эркиндик, 35)' 
                      : lang === 'en' 
                      ? 'Schedule private showroom consultation in Bishkek' 
                      : 'Хочу лично посетить шоурум в Бишкеке для подбора материалов при правильном свете'}
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#E8E4DF] hover:bg-[#B38E5D] text-[#141312] hover:text-white transition-colors duration-200 rounded-sm font-semibold uppercase tracking-[0.15em] text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>{t.showroom.submitting}</span>
                  ) : (
                    <>
                      <span>{t.showroom.submitFormBtn}</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Trust proofs */}
                <div className="pt-4 flex items-center justify-between text-[11px] text-neutral-500 font-mono border-t border-white/5">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#B38E5D]" />
                    {t.showroom.contractProof}
                  </span>
                  <span>·</span>
                  <span>{t.showroom.warrantyProof}</span>
                  <span>·</span>
                  <span>{t.showroom.ndaProof}</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
