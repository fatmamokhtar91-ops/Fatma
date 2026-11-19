import React from 'react';
import { ArrowUpLeft, ArrowUpRight, Check } from 'lucide-react';
import { Language, STUDIO_INFO, STUDIO_POLICY_CARDS, UI_COPY } from '../data/portfolioData';
import { Reveal } from './Reveal';

interface TestimonialsSectionProps {
  lang: Language;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ lang }) => {
  const isRtl = lang === 'ar';
  const ExternalIcon = isRtl ? ArrowUpLeft : ArrowUpRight;

  return (
    <section id="testimonials" className="py-16 lg:py-24 border-t border-[#E6E1D6] bg-white">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="max-w-2xl pb-12 border-b border-[#E6E1D6]">
            <p className="text-xs font-semibold text-[#52504B] mb-3">
              {UI_COPY.testimonials.kicker[lang]}
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#121211]">
              {UI_COPY.testimonials.title[lang]}
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {STUDIO_POLICY_CARDS.map((card, cardIdx) => (
            <Reveal key={card.id} delay={cardIdx * 0.07} className="flex">
              <article
                className="w-full flex flex-col justify-between p-7 bg-[#FAF8F4] border border-[#E6E1D6] rounded-xl"
              >
              <div>
                <div className="pb-5 mb-5 border-b border-[#E6E1D6] flex items-baseline justify-between gap-3">
                  <span
                    className="text-2xl font-semibold text-[#121211] tabular-nums"
                    style={{ fontFamily: 'var(--font-mono)' }}
                    dir="ltr"
                  >
                    {card.number}.
                  </span>
                  <span className="text-xs text-[#6E695E] text-end">
                    {card.subtitle[lang]}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#121211] mb-4">
                  {card.title[lang]}
                </h3>

                <ul className="space-y-3">
                  {card.items[lang].map((point, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm leading-[1.75] text-[#2E2D2A]"
                    >
                      <Check
                        className="w-4 h-4 text-[#121211] shrink-0 mt-1"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {card.isProfileCard ? (
                <footer className="mt-7 pt-5 border-t border-[#E6E1D6] space-y-2.5 text-xs">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[#6E695E]">{isRtl ? 'البريد الإلكتروني' : 'Email'}</span>
                    <a
                      href={`mailto:${STUDIO_INFO.email}`}
                      className="font-medium text-[#121211] hover:underline underline-offset-4 transition-colors truncate"
                      dir="ltr"
                    >
                      {STUDIO_INFO.email}
                    </a>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[#6E695E]">{isRtl ? 'واتساب' : 'WhatsApp'}</span>
                    <a
                      href={STUDIO_INFO.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-[#121211] hover:underline underline-offset-4 transition-colors tabular-nums"
                      dir="ltr"
                    >
                      {STUDIO_INFO.whatsappDisplay}
                    </a>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[#6E695E]">
                      {isRtl ? 'كاش وإنستا باي' : 'Cash / InstaPay'}
                    </span>
                    <span className="font-medium text-[#121211] tabular-nums" dir="ltr">
                      {STUDIO_INFO.cashInstapayDisplay}
                    </span>
                  </div>
                  <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#EAE5DA]">
                    <a
                      href={STUDIO_INFO.behanceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-[#121211] hover:underline decoration-[#C5A048] underline-offset-4 transition-colors"
                    >
                      <span>Behance</span>
                      <ExternalIcon className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                    <a
                      href={STUDIO_INFO.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-[#121211] hover:underline decoration-[#C5A048] underline-offset-4 transition-colors"
                    >
                      <span>LinkedIn</span>
                      <ExternalIcon className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                    <a
                      href={STUDIO_INFO.canvaPortfolioUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-[#121211] hover:underline decoration-[#C5A048] underline-offset-4 transition-colors"
                    >
                      <span>{isRtl ? 'بورتفوليو Canva' : 'Canva Portfolio'}</span>
                      <ExternalIcon className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                    <a
                      href={STUDIO_INFO.digitalMenuDemoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-[#121211] hover:underline decoration-[#C5A048] underline-offset-4 transition-colors"
                    >
                      <span>{isRtl ? 'مثال المنيو الإلكتروني' : 'Live Menu Example'}</span>
                      <ExternalIcon className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </footer>
              ) : (
                <footer className="mt-7 pt-5 border-t border-[#E6E1D6]">
                  <p className="text-xs font-semibold text-[#121211]">
                    {STUDIO_INFO.ownerName[lang]}
                  </p>
                  <p className="mt-1 text-xs text-[#6E695E]">
                    {isRtl ? 'صناعة المحتوى الإعلاني بالذكاء الاصطناعي' : 'AI Content & Commercial Production'}
                  </p>
                </footer>
              )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
