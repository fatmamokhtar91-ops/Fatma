import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpLeft, ArrowUpRight, Check } from 'lucide-react';
import { IMAGES, Language, SERVICES, STUDIO_INFO, UI_COPY, WORKFLOW_STEPS } from '../data/portfolioData';
import { EditorialImage } from './EditorialImage';
import { Reveal } from './Reveal';

interface ServicesSectionProps {
  lang: Language;
  onBookService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ lang, onBookService }) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES[0].id);
  const isRtl = lang === 'ar';
  const ExternalIcon = isRtl ? ArrowUpLeft : ArrowUpRight;

  const activeService = SERVICES.find((s) => s.id === activeServiceId) || SERVICES[0];

  return (
    <section id="services" className="py-16 lg:py-24 border-t border-[#E6E1D6] bg-[#FAF8F4]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Section Heading */}
        <Reveal>
          <div className="max-w-2xl pb-12">
            <p className="text-xs font-semibold text-[#52504B] mb-3">
              {UI_COPY.services.kicker[lang]}
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#121211] leading-[1.3]">
              {UI_COPY.services.title[lang]}
            </h2>
          </div>
        </Reveal>

        {/* Interactive Numbered Services + Editorial Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Numbered Editorial Index */}
          <div className="lg:col-span-5 border-t border-[#E6E1D6]">
            {SERVICES.map((service) => {
              const isSelected = service.id === activeService.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveServiceId(service.id)}
                  className={`w-full text-start py-5 px-5 border-b border-[#E6E1D6] transition-colors duration-150 cursor-pointer flex items-start justify-between gap-4 ${
                    isSelected ? 'bg-white border-s-2 border-s-[#C5A048]' : 'hover:bg-[#EFECE4]/70'
                  }`}
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className={`text-sm font-semibold tabular-nums shrink-0 ${
                        isSelected ? 'text-[#121211]' : 'text-[#6E695E]'
                      }`}
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {service.number}
                    </span>
                    <div>
                      <h3
                        className={`text-base sm:text-[17px] font-bold leading-[1.4] transition-colors ${
                          isSelected ? 'text-[#121211]' : 'text-[#4A473F]'
                        }`}
                      >
                        {service.title[lang]}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#6E695E]">
                        {service.turnaround[lang]}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Capability Breakdown + Production Studio Desk */}
          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="bg-white border border-[#E6E1D6] rounded-xl overflow-hidden">
              <div className="aspect-[16/9] w-full overflow-hidden bg-[#EFECE4] border-b border-[#E6E1D6]">
                <EditorialImage
                  src={IMAGES.studioDesk}
                  alt={
                    isRtl
                      ? 'مساحة العمل الإبداعية لإنتاج الفيديوهات الإعلانية والتصاميم الرقمية'
                      : 'Creative production studio workspace for AI video commercials and digital design'
                  }
                  fallbackTitle={activeService.title[lang]}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-7 sm:p-9 space-y-7">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#6E695E] mb-2.5">
                    <span
                      className="font-semibold text-[#121211] tabular-nums"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {activeService.number}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{activeService.turnaround[lang]}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#121211] leading-[1.35]">
                    {activeService.title[lang]}
                  </h3>
                  <p className="mt-3.5 text-sm sm:text-base leading-[1.85] text-[#52504B]">
                    {activeService.summary[lang]}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#E6E1D6]">
                  <h4 className="text-xs font-semibold text-[#121211] mb-4">
                    {UI_COPY.services.deliverablesLabel[lang]}
                  </h4>
                  <ul className="space-y-3">
                    {activeService.deliverables[lang].map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm sm:text-[15px] text-[#3F3E3A] leading-[1.75]"
                      >
                        <Check
                          className="w-4 h-4 text-[#121211] shrink-0 mt-1.5"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 border-t border-[#E6E1D6] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="block text-xs text-[#6E695E]">
                      {UI_COPY.services.idealForLabel[lang]}
                    </span>
                    <span className="text-sm font-medium text-[#121211]">
                      {activeService.idealFor[lang]}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    {activeService.id === 'digital-menu' && (
                      <a
                        href={STUDIO_INFO.digitalMenuDemoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-sm font-semibold text-[#121211] bg-white border border-[#121211] hover:border-[#C5A048] hover:bg-[#FAF8F4] rounded-md transition-colors whitespace-nowrap shrink-0"
                      >
                        <span>{isRtl ? 'معاينة مثال حي للمنيو' : 'View Live Menu Demo'}</span>
                        <ExternalIcon className="w-4 h-4" aria-hidden="true" />
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => onBookService(activeService.id)}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#121211] hover:bg-[#DFB962] hover:text-[#121211] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>{UI_COPY.services.bookService[lang]}</span>
                      {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* 4-Step Linear Production Workflow */}
        <div className="mt-16 lg:mt-20 pt-14 border-t border-[#E6E1D6]">
          <Reveal>
            <div className="max-w-xl mb-10">
              <p className="text-xs font-semibold text-[#52504B] mb-2">
                {UI_COPY.services.workflowKicker[lang]}
              </p>
              <h3 className="text-xl sm:text-3xl font-bold tracking-tight text-[#121211]">
                {UI_COPY.services.workflowTitle[lang]}
              </h3>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {WORKFLOW_STEPS.map((step, idx) => (
              <Reveal key={step.number} delay={idx * 0.06}>
                <div className="pt-5 border-t border-[#C5A048]/60">
                  <span
                    className="text-xs font-semibold text-[#121211] tabular-nums"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {step.number}.
                  </span>
                  <h4 className="mt-2 text-base font-bold text-[#121211]">
                    {step.title[lang]}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#52504B]">
                    {step.description[lang]}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
