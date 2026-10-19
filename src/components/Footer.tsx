import React from 'react';
import { Send, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { phoneHref } from '../content/siteContent';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { contacts } = useContent().content;

  return (
    <footer className="bg-[#11100F] text-neutral-400 text-xs font-light border-t border-white/10 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-2xl text-white tracking-[0.2em] uppercase font-normal block">
              Atelier Architectura
            </span>
            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm">
              {t.footer.desc}
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#B38E5D]">
              {t.footer.productionFacility}
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <div className="text-white font-mono text-xs uppercase tracking-wider mb-2">
              {t.footer.navTitle}
            </div>
            <ul className="space-y-2">
              <li><a href="#portfolio" className="hover:text-white transition-colors">{t.nav.portfolio}</a></li>
              <li><a href="#ready-collection" className="hover:text-white transition-colors text-[#B38E5D]">{t.nav.readyCollection}</a></li>
              <li><a href="#materials" className="hover:text-white transition-colors">{t.nav.materials}</a></li>
              <li><a href="#standards" className="hover:text-white transition-colors">{t.nav.standards}</a></li>
              <li><a href="#workflow" className="hover:text-white transition-colors">{t.nav.workflow}</a></li>
              <li><a href="#architects" className="hover:text-white transition-colors">{t.nav.architects}</a></li>
              <li><a href="#showroom" className="hover:text-white transition-colors">{t.nav.showroom}</a></li>
            </ul>
          </div>

          {/* Showroom & Production in Kyrgyzstan */}
          <div className="space-y-3">
            <div className="text-white font-mono text-xs uppercase tracking-wider mb-2">
              {t.footer.locationsTitle}
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-white block font-medium">{t.footer.flagshipLabel}</span>
                <span className="text-neutral-400 block mt-0.5">{t.footer.flagshipLocation}</span>
                <span className="text-neutral-500 text-[11px]">10:00 – 20:00 (Пн–Сб)</span>
              </div>
              <div>
                <span className="text-white block font-medium">{t.footer.factoryLabel}</span>
                <span className="text-neutral-400 block mt-0.5">{t.footer.factoryLocation}</span>
                <span className="text-neutral-500 text-[11px]">5-осевые ЧПУ Biesse (Италия)</span>
              </div>
            </div>
          </div>

          {/* Contacts & Socials for Kyrgyzstan */}
          <div className="space-y-3">
            <div className="text-white font-mono text-xs uppercase tracking-wider mb-2">
              {t.footer.contactsTitle}
            </div>
            <div className="space-y-2 font-mono">
              <a href={phoneHref(contacts.phone)} className="text-white hover:text-[#B38E5D] transition-colors block">
                {contacts.phone}
              </a>
              <a href={phoneHref(contacts.whatsapp)} className="text-neutral-300 hover:text-[#B38E5D] transition-colors block text-[11px]">
                {contacts.whatsapp} (WhatsApp)
              </a>
              <a href={`mailto:${contacts.email}`} className="hover:text-white transition-colors block text-[11px]">
                {contacts.email}
              </a>
            </div>

            <div className="pt-3">
              <div className="text-[11px] uppercase tracking-wider text-neutral-500 font-mono mb-2">
                {t.footer.socialsTitle}
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={contacts.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-sm bg-white/5 hover:bg-[#B38E5D] hover:text-black transition-colors flex items-center justify-center text-neutral-300"
                  aria-label="Telegram"
                >
                  <Send className="w-4 h-4" />
                </a>
                <a
                  href={contacts.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-sm bg-white/5 hover:bg-[#B38E5D] hover:text-black transition-colors flex items-center justify-center text-neutral-300"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href={contacts.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-sm bg-white/5 hover:bg-[#B38E5D] hover:text-black transition-colors flex items-center justify-center text-neutral-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 font-mono">
          <div>
            © {new Date().getFullYear()} Atelier Architectura. {t.footer.copyright}
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-300 transition-colors cursor-pointer">{t.footer.privacy}</span>
            <span>·</span>
            <span className="hover:text-neutral-300 transition-colors cursor-pointer">{t.footer.ndaAgreement}</span>
            <span>·</span>
            <span className="hover:text-neutral-300 transition-colors cursor-pointer">{t.footer.techStandards}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
