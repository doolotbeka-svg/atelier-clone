import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { whatsappNumber } from '../content/siteContent';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { lang, t } = useLanguage();
  const { contacts } = useContent().content;
  const phoneNumber = whatsappNumber(contacts.whatsapp);
  const messageText = encodeURIComponent(contacts.whatsappMessage[lang] || contacts.whatsappMessage.ru);

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
      <a
        href={`https://wa.me/${phoneNumber}?text=${messageText}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-all duration-200 border-2 border-white/20 hover:border-white focus:outline-none focus:ring-2 focus:ring-[#25D366] cursor-pointer"
        aria-label={t.whatsappTooltip}
      >
        <MessageCircle className="w-7 h-7 fill-current" />
      </a>

      {showTooltip && (
        <div className="bg-[#181615] text-white text-xs px-3.5 py-1.5 rounded-sm border border-white/10 shadow-xl whitespace-nowrap animate-fade-in font-medium">
          {t.whatsappTooltip}
        </div>
      )}
    </div>
  );
};
