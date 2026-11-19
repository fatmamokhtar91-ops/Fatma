import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Language, UI_COPY } from '../data/portfolioData';

interface NavbarProps {
  lang: Language;
  onStartProject: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onStartProject }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: '#portfolio', label: UI_COPY.nav.portfolio[lang] },
    { href: '#services', label: UI_COPY.nav.services[lang] },
    { href: '#testimonials', label: UI_COPY.nav.testimonials[lang] },
    { href: '#packages', label: UI_COPY.nav.packages[lang] },
    { href: '#contact', label: UI_COPY.nav.contact[lang] },
  ];

  const handleMobileAction = () => {
    setMobileOpen(false);
    onStartProject();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F4]/95 backdrop-blur-sm border-b border-[#E6E1D6] text-[#121211]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Emblem (Site Background Color) + Single-line Wordmark */}
        <a
          href="#top"
          className="inline-flex items-center gap-2.5 text-lg font-bold tracking-tight text-[#121211] whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity duration-150"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <span
            aria-hidden="true"
            className="w-9 h-9 rounded-full bg-[#FAF8F4] border border-[#C5A048] flex items-center justify-center shrink-0"
          >
            <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none">
              <path d="M12.5 11.5L14.5 7.5L18 10L21.5 7.5L23.5 11.5H12.5Z" fill="#C5A048" />
              <text
                x="18"
                y="24"
                textAnchor="middle"
                fill="#121211"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="Georgia, serif"
                letterSpacing="-0.5"
              >
                FO
              </text>
            </svg>
          </span>
          <span>{UI_COPY.brand[lang]}</span>
        </a>

        {/* Zone 2: Clean Single-Line Navigation Links */}
        <nav aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Primary navigation'} className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#52504B] hover:text-[#121211] underline-offset-8 hover:underline decoration-[#C5A048] decoration-2 transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onStartProject}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#121211] hover:bg-[#DFB962] hover:text-[#121211] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            {UI_COPY.nav.cta[lang]}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={lang === 'ar' ? 'فتح القائمة' : 'Toggle menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-md border border-[#E6E1D6] text-[#121211] hover:bg-[#EFECE4] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E6E1D6] bg-[#FAF8F4] px-5 py-5">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-base font-medium text-[#121211] border-b border-[#EAE5DA] last:border-b-0"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={handleMobileAction}
              className="mt-4 w-full py-3 px-5 text-sm font-semibold text-white bg-[#121211] hover:bg-[#DFB962] hover:text-[#121211] rounded-md transition-colors cursor-pointer"
            >
              {UI_COPY.nav.cta[lang]}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
