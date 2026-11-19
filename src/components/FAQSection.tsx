import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import { FAQ_ITEMS, Language, UI_COPY } from '../data/portfolioData';
import { Reveal } from './Reveal';

interface FAQSectionProps {
  lang: Language;
  onContactClick: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ lang, onContactClick }) => {
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);
  const isRtl = lang === 'ar';

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="faq" className="py-16 lg:py-24 border-t border-[#E6E1D6] bg-white">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Editorial Intro Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <Reveal>
              <p className="text-xs font-semibold text-[#52504B] mb-3">
                {UI_COPY.faq.kicker[lang]}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#121211] leading-[1.3]">
                {UI_COPY.faq.title[lang]}
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#52504B]">
                {UI_COPY.faq.subtitle[lang]}
              </p>

              <button
                type="button"
                onClick={onContactClick}
                className="mt-7 inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#121211] hover:bg-[#DFB962] hover:text-[#121211] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>{UI_COPY.faq.cta[lang]}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </Reveal>
          </div>

          {/* Interactive Accordion Questions Column */}
          <Reveal delay={0.08} className="lg:col-span-8 border-y border-[#E6E1D6] divide-y divide-[#E6E1D6]">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openId === item.id;
              const numLabel = String(idx + 1).padStart(2, '0');
              const panelId = `faq-panel-${item.id}`;
              const buttonId = `faq-button-${item.id}`;

              return (
                <div key={item.id} className="bg-white">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => handleToggle(item.id)}
                    className="w-full py-5 sm:py-6 flex items-start justify-between gap-4 text-start cursor-pointer group"
                  >
                    <div className="flex items-baseline gap-3.5 sm:gap-4">
                      <span
                        className={`text-xs sm:text-sm font-semibold tabular-nums shrink-0 ${
                          isOpen ? 'text-[#121211]' : 'text-[#6E695E]'
                        }`}
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {numLabel}.
                      </span>
                      <span
                        className={`text-base sm:text-lg font-bold leading-[1.45] transition-colors ${
                          isOpen
                            ? 'text-[#121211]'
                            : 'text-[#2D2C29] group-hover:text-[#121211]'
                        }`}
                      >
                        {item.question[lang]}
                      </span>
                    </div>

                    <ChevronDown
                      aria-hidden="true"
                      className={`w-5 h-5 text-[#52504B] shrink-0 mt-0.5 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#121211]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="pb-6 ps-8 sm:ps-10 pe-4 text-sm sm:text-[15px] leading-[1.85] text-[#52504B]"
                    >
                      {item.answer[lang]}
                    </div>
                  )}
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
};
