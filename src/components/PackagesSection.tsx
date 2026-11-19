import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpLeft,
  ArrowUpRight,
  Check,
  Minus,
  Plus,
} from 'lucide-react';
import { Language, PACKAGES, STUDIO_INFO, UI_COPY } from '../data/portfolioData';
import { Reveal } from './Reveal';

interface PackagesSectionProps {
  lang: Language;
  onSelectPackage: (packageName: string, priceLabel: string) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  lang,
  onSelectPackage,
}) => {
  const isRtl = lang === 'ar';
  const ExternalIcon = isRtl ? ArrowUpLeft : ArrowUpRight;

  const [calcPackId, setCalcPackId] = useState<string>(PACKAGES[1]?.id || PACKAGES[0].id);
  const [quantity, setQuantity] = useState<number>(1);

  const selectedCalcPack = PACKAGES.find((p) => p.id === calcPackId) || PACKAGES[0];
  const totalEgp = selectedCalcPack.priceNumber * quantity;
  const depositEgp = Math.round(totalEgp * 0.5);
  const restEgp = totalEgp - depositEgp;

  const fmt = (n: number) => n.toLocaleString('en-US');

  const whatsappCalculatorHref = `${STUDIO_INFO.whatsappUrl}?text=${encodeURIComponent(
    isRtl
      ? `مرحباً، أريد ${quantity} فيديو بباقة ${selectedCalcPack.name.ar} (${selectedCalcPack.turnaround.ar}). الإجمالي المبدئي ${fmt(totalEgp)} جنيه.`
      : `Hello Fatma | AIGC Creator, I would like ${quantity} video(s) with the ${selectedCalcPack.name.en} package (${selectedCalcPack.turnaround.en}). Estimated total: ${fmt(totalEgp)} EGP.`
  )}`;

  return (
    <section id="packages" className="py-16 lg:py-24 border-t border-[#E6E1D6] bg-[#FAF8F4]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="max-w-2xl pb-10 border-b border-[#E6E1D6]">
            <p className="text-xs font-semibold text-[#52504B] mb-3">
              {UI_COPY.packages.kicker[lang]}
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#121211]">
              {UI_COPY.packages.title[lang]}
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#52504B]">
              {UI_COPY.packages.subtitle[lang]}
            </p>
          </div>
        </Reveal>

        {/* 3 Real EGP Video Packages */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
          {PACKAGES.map((pkg, pkgIdx) => {
            const isHighlighted = Boolean(pkg.recommended);
            return (
              <Reveal key={pkg.id} delay={pkgIdx * 0.07} className="flex">
                <div
                  className={`w-full flex flex-col justify-between rounded-xl p-7 sm:p-8 border transition-colors ${
                    isHighlighted
                      ? 'bg-[#121211] text-white border-[#C5A048]/70'
                      : 'bg-white text-[#121211] border-[#E6E1D6]'
                  }`}
                >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs mb-3">
                    <span className={isHighlighted ? 'text-white/70' : 'text-[#6E695E]'}>
                      {pkg.turnaround[lang]}
                    </span>
                    {isHighlighted && (
                      <span className="font-semibold text-[#DFB962]">
                        {UI_COPY.packages.recommendedLabel[lang]}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold leading-[1.35]">{pkg.name[lang]}</h3>
                  <p
                    className={`mt-2.5 text-sm leading-[1.75] ${
                      isHighlighted ? 'text-white/75' : 'text-[#52504B]'
                    }`}
                  >
                    {pkg.subtitle[lang]}
                  </p>

                  <div
                    className={`mt-7 pt-6 border-t flex items-baseline gap-2.5 ${
                      isHighlighted ? 'border-white/15' : 'border-[#E6E1D6]'
                    }`}
                  >
                    <span
                      className="text-3xl sm:text-4xl font-semibold tabular-nums tracking-tight"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {pkg.price[lang]}
                    </span>
                    <span className={`text-xs ${isHighlighted ? 'text-white/65' : 'text-[#6E695E]'}`}>
                      / {pkg.period[lang]}
                    </span>
                  </div>

                  <ul className="mt-7 space-y-3.5">
                    {pkg.features[lang].map((feature, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start gap-3 text-sm leading-[1.75] ${
                          isHighlighted ? 'text-white/90' : 'text-[#3F3E3A]'
                        }`}
                      >
                        <Check
                          className={`w-4 h-4 shrink-0 mt-1.5 ${
                            isHighlighted ? 'text-[#DFB962]' : 'text-[#121211]'
                          }`}
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectPackage(pkg.name[lang], `${pkg.price[lang]} (${pkg.turnaround[lang]})`)}
                  className={`mt-8 w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 text-sm font-semibold rounded-md transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                    isHighlighted
                      ? 'bg-[#DFB962] hover:bg-[#C9A24B] text-[#121211]'
                      : 'bg-[#121211] hover:bg-[#DFB962] hover:text-[#121211] text-white'
                  }`}
                >
                  <span>{UI_COPY.packages.selectPackage[lang]}</span>
                  {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Interactive EGP Order & 50% Deposit Calculator */}
        <Reveal delay={0.1}>
          <div className="mt-10 bg-white border border-[#E6E1D6] rounded-xl p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E6E1D6]">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#121211]">
                {isRtl ? 'احسب تكلفة طلبك' : 'Calculate Your Order Estimate'}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#52504B]">
                {isRtl
                  ? 'السعر النهائي يتأكد بعد الاتفاق على التفاصيل · مقدم الحجز 50% والباقي قبل التسليم.'
                  : 'Final quote confirmed upon brief alignment · 50% booking deposit, 50% before delivery.'}
              </p>
            </div>

            <div className="flex items-center gap-3 self-start lg:self-center">
              <span className="text-xs font-semibold text-[#52504B] whitespace-nowrap">
                {isRtl ? 'عدد الفيديوهات:' : 'Videos:'}
              </span>
              <div className="inline-flex items-center border border-[#E6E1D6] rounded-md bg-[#FAF8F4]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label={isRtl ? 'تقليل العدد' : 'Decrease quantity'}
                  className="w-9 h-9 inline-flex items-center justify-center text-[#121211] hover:bg-[#EFECE4] transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <output
                  className="w-10 text-center text-sm font-bold tabular-nums text-[#121211]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {quantity}
                </output>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                  aria-label={isRtl ? 'زيادة العدد' : 'Increase quantity'}
                  className="w-9 h-9 inline-flex items-center justify-center text-[#121211] hover:bg-[#EFECE4] transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Package Radio Choices */}
            <div
              role="radiogroup"
              aria-label={isRtl ? 'اختيار الباقة' : 'Choose package tier'}
              className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              {PACKAGES.map((pkg) => {
                const isSelected = pkg.id === selectedCalcPack.id;
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setCalcPackId(pkg.id)}
                    className={`p-3.5 rounded-lg border text-start transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#121211] text-white border-[#121211]'
                        : 'bg-[#FAF8F4] text-[#121211] border-[#E6E1D6] hover:border-[#C5A048]'
                    }`}
                  >
                    <div className="text-sm font-bold">{pkg.name[lang]}</div>
                    <div
                      className={`mt-1 text-xs tabular-nums ${
                        isSelected ? 'text-[#DFB962]' : 'text-[#52504B]'
                      }`}
                    >
                      {pkg.price[lang]}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Summary Totals + Direct Action */}
            <div className="lg:col-span-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#E6E1D6]">
              <div className="grid grid-cols-3 gap-4 flex-1">
                <div>
                  <span className="block text-[11px] text-[#6E695E]">
                    {isRtl ? 'الإجمالي (ج.م)' : 'Total (EGP)'}
                  </span>
                  <span
                    className="mt-1 block text-xl font-bold text-[#121211] tabular-nums"
                    style={{ fontFamily: 'var(--font-mono)' }}
                    dir="ltr"
                  >
                    {fmt(totalEgp)}
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] text-[#6E695E]">
                    {isRtl ? 'مقدم الحجز 50%' : '50% Deposit'}
                  </span>
                  <span
                    className="mt-1 block text-xl font-bold text-[#121211] tabular-nums"
                    style={{ fontFamily: 'var(--font-mono)' }}
                    dir="ltr"
                  >
                    {fmt(depositEgp)}
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] text-[#6E695E]">
                    {isRtl ? 'الباقي قبل التسليم' : 'Remaining'}
                  </span>
                  <span
                    className="mt-1 block text-xl font-bold text-[#121211] tabular-nums"
                    style={{ fontFamily: 'var(--font-mono)' }}
                    dir="ltr"
                  >
                    {fmt(restEgp)}
                  </span>
                </div>
              </div>

              <a
                href={whatsappCalculatorHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#121211] hover:bg-[#DFB962] hover:text-[#121211] rounded-md transition-colors whitespace-nowrap shrink-0"
              >
                <span>{isRtl ? 'اطلب عبر واتساب' : 'Order via WhatsApp'}</span>
                <ExternalIcon className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
