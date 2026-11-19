import React from 'react';
import { Language, STUDIO_INFO, UI_COPY } from '../data/portfolioData';

interface FooterProps {
  lang: Language;
  onToggleLang: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onToggleLang }) => {
  const isRtl = lang === 'ar';

  return (
    <footer className="border-t border-[#E6E1D6] bg-[#FAF8F4]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-[#E6E1D6]">
          <div>
            <a
              href="#top"
              className="text-lg font-bold tracking-tight text-[#121211] hover:opacity-80 transition-opacity"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {UI_COPY.brand[lang]}
            </a>
            <p className="mt-1.5 text-xs sm:text-sm text-[#52504B]">
              {UI_COPY.footer.tagline[lang]}
            </p>
          </div>

          <nav
            aria-label={isRtl ? 'روابط التذييل' : 'Footer navigation'}
            className="flex flex-wrap items-center gap-6 text-sm text-[#52504B]"
          >
            <a href="#portfolio" className="hover:text-[#121211] transition-colors">
              {UI_COPY.nav.portfolio[lang]}
            </a>
            <a href="#services" className="hover:text-[#121211] transition-colors">
              {UI_COPY.nav.services[lang]}
            </a>
            <a href="#testimonials" className="hover:text-[#121211] transition-colors">
              {UI_COPY.nav.testimonials[lang]}
            </a>
            <a href="#packages" className="hover:text-[#121211] transition-colors">
              {UI_COPY.nav.packages[lang]}
            </a>
            <a href="#contact" className="hover:text-[#121211] transition-colors">
              {UI_COPY.nav.contact[lang]}
            </a>
            <a href="#faq" className="hover:text-[#121211] transition-colors">
              {isRtl ? 'الأسئلة الشائعة' : 'FAQ'}
            </a>
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#6E695E]">
          <p>{UI_COPY.footer.rights[lang]}</p>

          <div className="flex flex-wrap items-center gap-5">
            <a
              href={STUDIO_INFO.behanceUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#121211] transition-colors"
            >
              Behance
            </a>
            <a
              href={STUDIO_INFO.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#121211] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={STUDIO_INFO.canvaPortfolioUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#121211] transition-colors"
            >
              Canva Portfolio
            </a>
            <a
              href={STUDIO_INFO.digitalMenuDemoUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#121211] transition-colors"
            >
              {isRtl ? 'مثال المنيو الإلكتروني' : 'Menu Demo'}
            </a>
            <a
              href={STUDIO_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#121211] transition-colors"
            >
              WhatsApp
            </a>
            <button
              type="button"
              onClick={onToggleLang}
              className="text-[#121211] font-medium hover:underline decoration-[#C5A048] underline-offset-4 transition-colors cursor-pointer"
            >
              {isRtl ? 'English' : 'العربية'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
