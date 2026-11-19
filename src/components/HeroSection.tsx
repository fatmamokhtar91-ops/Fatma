import React from 'react';
import { ArrowDownLeft, ArrowDownRight, ArrowLeft, ArrowRight, Globe } from 'lucide-react';
import { IMAGES, Language, PROOF_METRICS, UI_COPY } from '../data/portfolioData';
import { EditorialImage } from './EditorialImage';

interface HeroSectionProps {
  lang: Language;
  onToggleLang: () => void;
  onStartProject: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onToggleLang,
  onStartProject,
}) => {
  const isRtl = lang === 'ar';

  return (
    <section id="top" className="bg-[#FAF8F4]">
      <div className="bg-[#FAF8F4] text-[#121211]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-6 pb-14 lg:pt-8 lg:pb-18">
          {/* Quiet Utility Bar (Kicker & Language Switch) */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#E6E1D6]">
            <p className="text-xs sm:text-sm font-semibold text-[#52504B] tracking-normal">
              {UI_COPY.hero.kicker[lang]}
            </p>
            <button
              type="button"
              onClick={onToggleLang}
              className="inline-flex items-center gap-2 text-xs font-medium text-[#52504B] hover:text-[#121211] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1"
              aria-label={isRtl ? 'Switch to English' : 'التبديل إلى العربية'}
            >
              <Globe className="w-3.5 h-3.5 text-[#121211]" strokeWidth={1.75} aria-hidden="true" />
              <span>{isRtl ? 'English Version' : 'النسخة العربية'}</span>
            </button>
          </div>

          {/* Studio Photo & FO Logo Banner Framed Cleanly Inside Main Canvas */}
          <div className="mt-7 rounded-xl overflow-hidden bg-[#050505] border border-[#C5A048]/45 shadow-sm">
            <EditorialImage
              src={IMAGES.brandBanner}
              alt={UI_COPY.hero.portraitCaption[lang]}
              fallbackTitle={UI_COPY.brand[lang]}
              loading="eager"
              className="w-full h-auto block object-contain"
            />
          </div>

          {/* Editorial Headline & Primary Conversion Actions */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h1
                className="font-bold text-[#121211] tracking-[0.005em] leading-[1.24]"
                style={{ fontSize: 'clamp(2rem, 3.6vw, 3.25rem)' }}
              >
                {UI_COPY.hero.headline[lang]}
              </h1>

              <p className="mt-5 text-base sm:text-[17px] leading-[1.85] text-[#52504B] max-w-[62ch]">
                {UI_COPY.hero.subheadline[lang]}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-wrap lg:justify-end items-center gap-5">
              <button
                type="button"
                onClick={onStartProject}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-white bg-[#121211] hover:bg-[#DFB962] hover:text-[#121211] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>{UI_COPY.hero.primaryCta[lang]}</span>
                {isRtl ? (
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                )}
              </button>

              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 py-2 text-sm font-semibold text-[#121211] border-b border-[#121211]/40 hover:border-[#C5A048] transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                <span>{UI_COPY.hero.secondaryCta[lang]}</span>
                {isRtl ? (
                  <ArrowDownLeft className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
                )}
              </a>
            </div>
          </div>

          {/* Quiet Studio Discipline Footer Line inside Hero */}
          <div className="mt-10 pt-5 border-t border-[#E6E1D6] flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-[#52504B]">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span>{isRtl ? 'إعلانات الفيديو بالذكاء الاصطناعي' : 'AI Commercial Films'}</span>
              <span aria-hidden="true" className="text-[#C5A048]">·</span>
              <span>{isRtl ? 'مواقع وصفحات هبوط' : 'Websites & Landing Pages'}</span>
              <span aria-hidden="true" className="text-[#C5A048]">·</span>
              <span>{isRtl ? 'الهوية البصرية والمنتجات الرقمية' : 'Brand Identity & Digital Books'}</span>
            </div>
            <span className="text-[#121211] font-semibold">
              {UI_COPY.hero.portraitCaption[lang]}
            </span>
          </div>
        </div>
      </div>

      {/* Full-Width 4-Column Proof Row Below Hero */}
      <div className="border-b border-[#E6E1D6] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse lg:divide-x border-[#E6E1D6]">
            {PROOF_METRICS.map((item, idx) => (
              <div
                key={idx}
                className="py-7 sm:px-6 first:ps-0 last:pe-0 flex flex-col justify-between gap-2 border-[#E6E1D6]"
              >
                <span
                  className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#121211] tabular-nums"
                  style={{ fontFamily: 'var(--font-mono)' }}
                  dir="ltr"
                >
                  {item.value}
                </span>
                <p className="text-xs sm:text-sm leading-relaxed text-[#52504B]">
                  {item.label[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
