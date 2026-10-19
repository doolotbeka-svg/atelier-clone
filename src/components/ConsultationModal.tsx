import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Send, Upload, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledTitle?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  prefilledTitle
}) => {
  const { lang, t } = useLanguage();
  const { currency, currencySymbol } = useCurrency();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    format: 'showroom', // 'showroom' or 'online'
    message: prefilledTitle ? `Project: ${prefilledTitle}` : ''
  });
  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // The modal stays mounted, so refresh the prefilled message each time it opens
  useEffect(() => {
    if (!isOpen) return;
    setFormData((prev) => ({ ...prev, message: prefilledTitle ? `Project: ${prefilledTitle}` : '' }));
    setIsSubmitted(false);
  }, [isOpen, prefilledTitle]);

  if (!isOpen) return null;

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
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
          fileName: attachedFile?.name
        })
      });
    } catch (e) {
      console.log('Submitting lead', e);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#181615] border border-white/10 rounded-sm shadow-2xl overflow-hidden p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-neutral-400 hover:text-white rounded-sm hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-12 h-12 text-[#B38E5D] mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-white font-normal mb-2">
              {t.consultationModal.successTitle}
            </h3>
            <p className="text-xs text-neutral-300 font-light leading-relaxed max-w-sm mx-auto mb-6">
              {t.consultationModal.successDesc}
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 bg-[#B38E5D] text-white text-xs uppercase tracking-wider font-semibold rounded-sm cursor-pointer"
            >
              {t.consultationModal.closeBtn}
            </button>
          </div>
        ) : (
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#B38E5D] font-mono mb-2">
              {t.consultationModal.tag}
            </div>
            <h3 className="font-serif text-2xl text-white font-normal mb-2">
              {t.consultationModal.title}
            </h3>
            <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
              {t.consultationModal.desc}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  {t.consultationModal.formatLabel}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, format: 'showroom' })}
                    className={`py-2 px-3 text-xs rounded-sm text-center border transition-colors cursor-pointer ${
                      formData.format === 'showroom'
                        ? 'bg-[#B38E5D] text-white border-[#B38E5D]'
                        : 'bg-[#141312] text-neutral-400 border-white/10 hover:text-white'
                    }`}
                  >
                    {t.consultationModal.formatShowroom}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, format: 'online' })}
                    className={`py-2 px-3 text-xs rounded-sm text-center border transition-colors cursor-pointer ${
                      formData.format === 'online'
                        ? 'bg-[#B38E5D] text-white border-[#B38E5D]'
                        : 'bg-[#141312] text-neutral-400 border-white/10 hover:text-white'
                    }`}
                  >
                    {t.consultationModal.formatOnline}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                  {t.consultationModal.nameLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder="Константин / Alexander"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#141312] border border-white/10 rounded-sm text-sm text-white focus:outline-none focus:border-[#B38E5D]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                  {t.consultationModal.phoneLabel}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+996 (555) 00-00-00"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#141312] border border-white/10 rounded-sm text-sm text-white focus:outline-none focus:border-[#B38E5D]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                  {t.consultationModal.fileLabel}
                </label>
                <div className="relative border border-dashed border-white/15 rounded-sm p-3 text-center bg-[#141312]">
                  <input
                    type="file"
                    onChange={handleFile}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    aria-label="Upload File"
                  />
                  {attachedFile ? (
                    <div className="text-xs text-emerald-400 font-mono flex items-center justify-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>{attachedFile.name}</span>
                    </div>
                  ) : (
                    <div className="text-xs text-neutral-400 flex items-center justify-center gap-2">
                      <Upload className="w-4 h-4 text-[#B38E5D]" />
                      <span>{t.consultationModal.fileSelect}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                  {t.consultationModal.commentLabel}
                </label>
                <textarea
                  rows={2}
                  placeholder="Notes..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 bg-[#141312] border border-white/10 rounded-sm text-xs text-white focus:outline-none focus:border-[#B38E5D] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#B38E5D] hover:bg-[#9E7C4F] text-white text-xs uppercase tracking-[0.15em] font-semibold rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? t.consultationModal.submitting : t.consultationModal.submitBtn}</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 font-light">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B38E5D]" />
                <span>{t.consultationModal.ndaText}</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
