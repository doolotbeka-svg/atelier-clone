import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { KeyUSPs } from './components/KeyUSPs';
import { Portfolio } from './components/Portfolio';
import { ReadyCollection } from './components/ReadyCollection';
import { Configurator3D } from './components/Configurator3D';
import { CaseStudyModal } from './components/CaseStudyModal';
import { MaterialsHub } from './components/MaterialsHub';
import { ProductionStandards } from './components/ProductionStandards';
import { WorkflowSteps } from './components/WorkflowSteps';
import { ArchitectsB2B } from './components/ArchitectsB2B';
import { ReviewsAndPartners } from './components/ReviewsAndPartners';
import { FAQSection } from './components/FAQSection';
import { ShowroomAndForm } from './components/ShowroomAndForm';
import { Footer } from './components/Footer';
import { AIConciergeModal } from './components/AIConciergeModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ConsultationModal } from './components/ConsultationModal';
import { CaseStudy, ReadyFurnitureItem } from './types';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { CurrencyProvider, useCurrency } from './context/CurrencyContext';

function AtelierContent() {
  const { lang } = useLanguage();
  const { currency } = useCurrency();
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [prefilledQuoteTitle, setPrefilledQuoteTitle] = useState<string>('');

  const handleOpenConsultation = (title?: string) => {
    if (title) {
      setPrefilledQuoteTitle(title);
    } else {
      setPrefilledQuoteTitle('');
    }
    setIsConsultationOpen(true);
  };

  const handleRequestQuoteFromCase = (caseTitle: string) => {
    // Scroll smoothly to showroom form and set context
    const showroomSection = document.getElementById('showroom');
    if (showroomSection) {
      showroomSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleOpenConsultation(caseTitle);
    }
  };

  const handleReserveReadyItem = (item: ReadyFurnitureItem) => {
    const titleLocalized = item.title[lang] || item.title.ru;
    const priceFormatted = currency === 'KGS' 
      ? `${item.priceKgs.toLocaleString()} сом` 
      : `${item.priceRub.toLocaleString()} ₽`;
    const fullPrefill = `Бронь / Предмет: ${titleLocalized} [${item.sku}] — ${priceFormatted}`;
    
    // We can open the modal or scroll to form
    handleOpenConsultation(fullPrefill);
  };

  return (
    <div className="min-h-screen bg-[#141312] text-[#E8E4DF] flex flex-col selection:bg-[#B38E5D]/30 selection:text-white relative font-sans">
      {/* Top Bar Navigation with Language & Currency Switcher */}
      <Header onOpenConsultation={() => handleOpenConsultation()} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero Section with Ambient Slides & Kyrgyz Residencies */}
        <Hero onOpenConsultation={() => handleOpenConsultation()} />

        {/* 2. Key USPs & Architectural Standards */}
        <KeyUSPs />

        {/* 3. Portfolio & Case Studies */}
        <Portfolio onSelectCase={(item) => setSelectedCase(item)} />

        {/* 4. Ready-Made Designer Furniture Collection & Cost Calculator (SOM / RUB) */}
        <ReadyCollection onReserveItem={handleReserveReadyItem} />

        {/* 4b. Interactive 3D furniture configurator */}
        <Configurator3D onSendToTechnologist={handleOpenConsultation} />

        {/* 5. Materials & Hidden Engineering */}
        <MaterialsHub />

        {/* 6. High-Tech In-House Production in Bishkek */}
        <ProductionStandards />

        {/* 7. 6-Step Workflow */}
        <WorkflowSteps />

        {/* 8. Special Section for Architects & Designers */}
        <ArchitectsB2B />

        {/* 9. Client Reviews & European Hardware Partners */}
        <ReviewsAndPartners />

        {/* 10. FAQ & Quick Service Links */}
        <FAQSection />

        {/* 11. Showroom on Erkindik Blvd, Map & Lead Form */}
        <ShowroomAndForm initialCaseTitle={prefilledQuoteTitle} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Case Study Modal (Blueprint vs Realized slider) */}
      <CaseStudyModal
        caseItem={selectedCase}
        onClose={() => setSelectedCase(null)}
        onRequestQuote={handleRequestQuoteFromCase}
      />

      {/* Global Quick Consultation / Booking Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        prefilledTitle={prefilledQuoteTitle}
      />

      {/* Floating WhatsApp Quick Action Button (+996) */}
      <WhatsAppButton />

      {/* Floating AI Concierge Chatbot Button & Dialog (Bishkek / Kyrgyzstan context) */}
      <AIConciergeModal />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <AtelierContent />
      </CurrencyProvider>
    </LanguageProvider>
  );
}
