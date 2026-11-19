import React from 'react';
import { Language } from '../data/portfolioData';
import { Reveal } from './Reveal';

interface TrustedBySectionProps {
  lang: Language;
}

interface SuitableSector {
  id: string;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  mark: React.ReactNode;
}

const SUITABLE_SECTORS: SuitableSector[] = [
  {
    id: 'wadi-elbon',
    title: { ar: 'وادي البن البرازيلي', en: 'Wadi El-Bon Al-Brazili' },
    subtitle: { ar: 'عميل حالي · إعلانات القهوة والمنتجات', en: 'Featured Client · Coffee & Products' },
    mark: (
      <svg viewBox="0 0 28 28" className="w-6 h-6 shrink-0" fill="none" aria-hidden="true">
        <path d="M4 9L14 4L24 9V19L14 24L4 19V9Z" stroke="currentColor" strokeWidth="1.5" />
        <line x1="14" y1="4" x2="14" y2="24" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'personal-brand',
    title: { ar: 'العلامة الشخصية', en: 'Personal Brands' },
    subtitle: { ar: 'بناء الحضور والمحتوى التعريفي', en: 'Creator & founder presence' },
    mark: (
      <svg viewBox="0 0 28 28" className="w-6 h-6 shrink-0" fill="none" aria-hidden="true">
        <circle cx="14" cy="10" r="4.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 23C6.8 18.8 10 16.5 14 16.5C18 16.5 21.2 18.8 22 23" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'small-business',
    title: { ar: 'المشروعات الصغيرة', en: 'Small Businesses' },
    subtitle: { ar: 'إعلانات ذكية بتكلفة مرنة', en: 'Agile commercial campaigns' },
    mark: (
      <svg viewBox="0 0 28 28" className="w-6 h-6 shrink-0" fill="none" aria-hidden="true">
        <rect x="4" y="6" width="8" height="16" stroke="currentColor" strokeWidth="1.5" />
        <rect x="16" y="10" width="8" height="12" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'product-brands',
    title: { ar: 'العلامات التجارية للمنتجات', en: 'Product Brands' },
    subtitle: { ar: 'إبراز تفاصيل وجودة المنتج', en: 'Macro product storytelling' },
    mark: (
      <svg viewBox="0 0 28 28" className="w-6 h-6 shrink-0" fill="none" aria-hidden="true">
        <polygon points="14,3 24,14 14,25 4,14" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="14" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'ecommerce',
    title: { ar: 'المتاجر الإلكترونية', en: 'E-Commerce Stores' },
    subtitle: { ar: 'فيديوهات ريلز وتيك توك للبيع', en: 'High-converting social ads' },
    mark: (
      <svg viewBox="0 0 28 28" className="w-6 h-6 shrink-0" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="22" height="22" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 19L14 9L19 19" stroke="currentColor" strokeWidth="1.5" />
        <line x1="11" y1="15.5" x2="17" y2="15.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'restaurants',
    title: { ar: 'المطاعم والكافيهات', en: 'Restaurants & Cafes' },
    subtitle: { ar: 'إعلانات الطعام والمنيو الإلكتروني', en: 'Food commercials & QR menus' },
    mark: (
      <svg viewBox="0 0 28 28" className="w-6 h-6 shrink-0" fill="none" aria-hidden="true">
        <path d="M5 21V12C5 7.02944 9.02944 3 14 3C18.9706 3 23 7.02944 23 12V21" stroke="currentColor" strokeWidth="1.5" />
        <line x1="3" y1="21" x2="25" y2="21" stroke="currentColor" strokeWidth="1.5" />
        <line x1="14" y1="8" x2="14" y2="21" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'beauty-fashion',
    title: { ar: 'الجمال والأزياء', en: 'Beauty & Fashion' },
    subtitle: { ar: 'العطور ومستحضرات التجميل', en: 'Fragrance, skincare & fashion' },
    mark: (
      <svg viewBox="0 0 28 28" className="w-6 h-6 shrink-0" fill="none" aria-hidden="true">
        <path d="M14 4C19.5 7 22 12 22 17.5C22 21.6 18.4 24 14 24C9.6 24 6 21.6 6 17.5C6 12 8.5 7 14 4Z" stroke="currentColor" strokeWidth="1.5" />
        <line x1="14" y1="9" x2="14" y2="24" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export const TrustedBySection: React.FC<TrustedBySectionProps> = ({ lang }) => {
  const isRtl = lang === 'ar';

  return (
    <section
      aria-label={isRtl ? 'الأنشطة والقطاعات المناسبة' : 'Suitable brands and sectors'}
      className="py-12 lg:py-14 bg-[#FAF8F4] overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <Reveal y={12}>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-8">
            <p className="text-xs font-semibold text-[#52504B]">
              {isRtl ? 'الأنشطة التجارية المناسبة' : 'Built For Your Business'}
            </p>
            <p className="text-xs sm:text-sm text-[#52504B]">
              {isRtl
                ? 'مناسبة للعلامات الشخصية، المشروعات الصغيرة، المتاجر الإلكترونية، المطاعم والكافيهات، والجمال والأزياء'
                : 'Tailored for personal brands, small businesses, product labels, online stores, restaurants, and beauty'}
            </p>
          </div>
        </Reveal>
      </div>

      {/* Horizontal Auto-Scrolling Carousel */}
      <div className="relative group" dir="ltr">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 z-10 bg-gradient-to-r from-[#FAF8F4] to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 z-10 bg-gradient-to-l from-[#FAF8F4] to-transparent"
        />

        <div className="flex w-max animate-trusted-marquee group-hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
          <div className="flex items-center gap-6 sm:gap-10 px-3 sm:px-5">
            {SUITABLE_SECTORS.map((sector) => (
              <div
                key={sector.id}
                className="flex items-center gap-3.5 px-6 py-4 bg-white border border-[#E6E1D6] rounded-lg text-[#2E2D2A] hover:text-[#121211] hover:border-[#C5A048] transition-colors duration-150 shrink-0"
              >
                <span className="text-[#121211]">{sector.mark}</span>
                <div className="flex flex-col" dir={isRtl ? 'rtl' : 'ltr'}>
                  <span
                    className="text-sm font-semibold text-[#121211] whitespace-nowrap text-start"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {sector.title[lang]}
                  </span>
                  <span className="text-[11px] text-[#6E695E] whitespace-nowrap text-start">
                    {sector.subtitle[lang]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div aria-hidden="true" className="flex items-center gap-6 sm:gap-10 px-3 sm:px-5">
            {SUITABLE_SECTORS.map((sector) => (
              <div
                key={`${sector.id}-clone`}
                className="flex items-center gap-3.5 px-6 py-4 bg-white border border-[#E6E1D6] rounded-lg text-[#2E2D2A] hover:text-[#121211] hover:border-[#C5A048] transition-colors duration-150 shrink-0"
              >
                <span className="text-[#121211]">{sector.mark}</span>
                <div className="flex flex-col" dir={isRtl ? 'rtl' : 'ltr'}>
                  <span
                    className="text-sm font-semibold text-[#121211] whitespace-nowrap text-start"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {sector.title[lang]}
                  </span>
                  <span className="text-[11px] text-[#6E695E] whitespace-nowrap text-start">
                    {sector.subtitle[lang]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
