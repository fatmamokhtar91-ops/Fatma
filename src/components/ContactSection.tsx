import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  ArrowUpLeft,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  CreditCard,
  ExternalLink,
  Mail,
  Phone,
} from 'lucide-react';
import { Language, PACKAGES, SERVICES, STUDIO_INFO, UI_COPY } from '../data/portfolioData';
import { Reveal } from './Reveal';

export interface PrefillBrief {
  service: string;
  note?: string;
}

interface ContactSectionProps {
  lang: Language;
  prefill: PrefillBrief | null;
}

interface FormErrors {
  name?: string;
  contact?: string;
  details?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang, prefill }) => {
  const isRtl = lang === 'ar';
  const copy = UI_COPY.contact;
  const ExternalIcon = isRtl ? ArrowUpLeft : ArrowUpRight;

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [brand, setBrand] = useState('');
  const [selectedService, setSelectedService] = useState(SERVICES[0].title[lang]);
  const [budget, setBudget] = useState(isRtl ? '300 – 900 ج.م' : '300 – 900 EGP');
  const [details, setDetails] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (prefill) {
      setSelectedService(prefill.service);
      if (prefill.note) {
        setDetails(prefill.note);
      }
      setSubmitted(false);
    }
  }, [prefill]);

  const serviceOptions = [
    ...PACKAGES.map((p) => `${p.name[lang]} — ${p.price[lang]}`),
    ...SERVICES.map((s) => s.title[lang]),
  ];

  const normalizedOptions = serviceOptions.includes(selectedService)
    ? serviceOptions
    : [selectedService, ...serviceOptions];

  const budgetOptions = isRtl
    ? ['300 ج.م (الأساسية)', '600 ج.م (الإبداعية)', '900 ج.م (المميزة)', '300 – 900 ج.م', '+1,000 ج.م']
    : ['300 EGP (Basic)', '600 EGP (Creative)', '900 EGP (Premium)', '300 – 900 EGP', '1,000+ EGP'];

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (name.trim().length < 2) {
      nextErrors.name = copy.form.errName[lang];
    }

    const trimmedContact = contact.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedContact);
    const digitsOnly = trimmedContact.replace(/[\s\-()+]/g, '');
    const isPhone = /^\d{8,15}$/.test(digitsOnly);

    if (!isEmail && !isPhone) {
      nextErrors.contact = copy.form.errContact[lang];
    }

    if (details.trim().length < 15) {
      nextErrors.details = copy.form.errDetails[lang];
    }

    return nextErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setContact('');
    setBrand('');
    setDetails('');
    setErrors({});
  };

  const handleCopy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      setCopiedKey(null);
    }
  };

  const whatsappBriefMessage = encodeURIComponent(
    [
      isRtl ? '*طلب مشروع إعلان فيديو*' : '*New Project Brief*',
      `${copy.form.name[lang]}: ${name}`,
      `${copy.form.email[lang]}: ${contact}`,
      brand.trim() ? `${copy.form.brand[lang]}: ${brand.trim()}` : null,
      `${copy.form.service[lang]}: ${selectedService}`,
      `${copy.form.budget[lang]}: ${budget}`,
      `${copy.form.details[lang]}: ${details}`,
    ]
      .filter(Boolean)
      .join('\n')
  );

  return (
    <section id="contact" className="py-16 lg:py-24 border-t border-[#E6E1D6] bg-white">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Direct Real Studio Channels Column */}
          <Reveal className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-xs font-semibold text-[#52504B] mb-3">{copy.kicker[lang]}</p>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#121211] leading-tight">
                {copy.title[lang]}
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#52504B]">
                {copy.subtitle[lang]}
              </p>
            </div>

            <div className="pt-6 border-t border-[#E6E1D6] space-y-4">
              <h3 className="text-xs font-semibold text-[#121211]">{copy.directTitle[lang]}</h3>

              {/* 1. WhatsApp: 01013308014 */}
              <div className="flex items-center justify-between gap-4 py-3 border-b border-[#EAE5DA]">
                <div className="flex items-center gap-3 min-w-0">
                  <Phone className="w-4 h-4 text-[#121211] shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <span className="block text-xs text-[#6E695E]">{copy.whatsappLabel[lang]}</span>
                    <a
                      href={STUDIO_INFO.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-[#121211] hover:underline underline-offset-4 transition-colors tabular-nums block"
                      dir="ltr"
                    >
                      {STUDIO_INFO.whatsappDisplay}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('phone', STUDIO_INFO.whatsappDisplay)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#52504B] hover:text-[#121211] border border-[#E6E1D6] rounded-md transition-colors shrink-0 cursor-pointer"
                >
                  {copiedKey === 'phone' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#15803D]" />
                      <span>{isRtl ? 'تم النسخ' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isRtl ? 'نسخ' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* 2. Cash / InstaPay (for payment): 01110082595 */}
              <div className="flex items-center justify-between gap-4 py-3 border-b border-[#EAE5DA]">
                <div className="flex items-center gap-3 min-w-0">
                  <CreditCard className="w-4 h-4 text-[#121211] shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <span className="block text-xs text-[#6E695E]">{copy.cashLabel[lang]}</span>
                    <span
                      className="text-sm font-medium text-[#121211] tabular-nums block"
                      dir="ltr"
                    >
                      {STUDIO_INFO.cashInstapayDisplay}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('cash', STUDIO_INFO.cashInstapayDisplay)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#52504B] hover:text-[#121211] border border-[#E6E1D6] rounded-md transition-colors shrink-0 cursor-pointer"
                >
                  {copiedKey === 'cash' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#15803D]" />
                      <span>{isRtl ? 'تم النسخ' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isRtl ? 'نسخ' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* 3. Email: fatma.mokhtar91@gmail.com */}
              <div className="flex items-center justify-between gap-4 py-3 border-b border-[#EAE5DA]">
                <div className="flex items-center gap-3 min-w-0">
                  <Mail className="w-4 h-4 text-[#121211] shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <span className="block text-xs text-[#6E695E]">{copy.emailLabel[lang]}</span>
                    <a
                      href={`mailto:${STUDIO_INFO.email}`}
                      className="text-sm font-medium text-[#121211] hover:underline underline-offset-4 transition-colors truncate block"
                      dir="ltr"
                    >
                      {STUDIO_INFO.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('email', STUDIO_INFO.email)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#52504B] hover:text-[#121211] border border-[#E6E1D6] rounded-md transition-colors shrink-0 cursor-pointer"
                >
                  {copiedKey === 'email' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#15803D]" />
                      <span>{isRtl ? 'تم النسخ' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isRtl ? 'نسخ' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* 4, 5, 6, 7. Real Official Links: Behance, LinkedIn, Canva Portfolio, Live Digital Menu */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={STUDIO_INFO.behanceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-[#FAF8F4] border border-[#E6E1D6] hover:border-[#C5A048] rounded-lg transition-colors"
                >
                  <span className="flex items-center justify-between text-[11px] text-[#52504B] font-medium">
                    <span>{isRtl ? 'بيهانس' : 'Behance'}</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </span>
                  <span className="mt-1 block text-xs font-semibold text-[#121211] truncate" dir="ltr">
                    {STUDIO_INFO.behanceHandle}
                  </span>
                </a>

                <a
                  href={STUDIO_INFO.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-[#FAF8F4] border border-[#E6E1D6] hover:border-[#C5A048] rounded-lg transition-colors"
                >
                  <span className="flex items-center justify-between text-[11px] text-[#52504B] font-medium">
                    <span>{isRtl ? 'لينكدإن' : 'LinkedIn'}</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </span>
                  <span className="mt-1 block text-xs font-semibold text-[#121211] truncate" dir="ltr">
                    {STUDIO_INFO.linkedinHandle}
                  </span>
                </a>

                <a
                  href={STUDIO_INFO.canvaPortfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-[#FAF8F4] border border-[#E6E1D6] hover:border-[#C5A048] rounded-lg transition-colors"
                >
                  <span className="flex items-center justify-between text-[11px] text-[#52504B] font-medium">
                    <span>{isRtl ? 'البورتفوليو الكامل' : 'Full Portfolio'}</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </span>
                  <span className="mt-1 block text-xs font-semibold text-[#121211] truncate">
                    {isRtl ? 'شاهد على Canva' : 'View on Canva'}
                  </span>
                </a>

                <a
                  href={STUDIO_INFO.digitalMenuDemoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-[#FAF8F4] border border-[#E6E1D6] hover:border-[#C5A048] rounded-lg transition-colors"
                >
                  <span className="flex items-center justify-between text-[11px] text-[#52504B] font-medium">
                    <span>{isRtl ? 'نموذج عمل منيو' : 'Digital Menu Sample'}</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </span>
                  <span className="mt-1 block text-xs font-semibold text-[#121211] truncate">
                    {isRtl ? 'معاينة المنيو الإلكتروني' : 'Open Live Menu Demo'}
                  </span>
                </a>
              </div>
            </div>

            <div className="p-5 bg-[#FAF8F4] border border-[#E6E1D6] rounded-lg">
              <p className="text-xs sm:text-sm leading-relaxed text-[#4A473F]">
                {copy.availabilityNote[lang]}
              </p>
            </div>
          </Reveal>

          {/* Validated Project Brief Form */}
          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="bg-[#FAF8F4] border border-[#E6E1D6] rounded-xl p-6 sm:p-9">
            {submitted ? (
              <div className="py-6 space-y-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#121211] text-[#DFB962]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#121211]">
                    {copy.form.successTitle[lang]}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#52504B]">
                    {copy.form.successBody[lang]}
                  </p>
                </div>

                <div className="p-5 bg-white border border-[#E6E1D6] rounded-lg space-y-2.5 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-[#6E695E]">{copy.form.name[lang]}</span>
                    <span className="font-medium text-[#121211]">{name}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-[#6E695E]">{copy.form.service[lang]}</span>
                    <span className="font-medium text-[#121211]">{selectedService}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-[#6E695E]">{copy.form.budget[lang]}</span>
                    <span className="font-medium text-[#121211] tabular-nums">
                      {budget}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`${STUDIO_INFO.whatsappUrl}?text=${whatsappBriefMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#121211] hover:bg-[#DFB962] hover:text-[#121211] rounded-md transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>{isRtl ? 'إرسال الطلب عبر واتساب الآن' : 'Send Brief via WhatsApp'}</span>
                    <ExternalIcon className="w-4 h-4" aria-hidden="true" />
                  </a>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-3 text-sm font-semibold text-[#121211] bg-white border border-[#121211] hover:bg-[#121211] hover:text-white rounded-md transition-colors cursor-pointer"
                  >
                    {copy.form.sendAnother[lang]}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="brief-name"
                      className="block text-xs font-semibold text-[#121211] mb-2"
                    >
                      {copy.form.name[lang]} *
                    </label>
                    <input
                      id="brief-name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder={copy.form.namePlaceholder[lang]}
                      aria-invalid={Boolean(errors.name)}
                      className={`w-full px-4 py-3 text-sm bg-white border rounded-md text-[#121211] placeholder:text-[#8C877B] focus:outline-none focus:border-[#121211] transition-colors ${
                        errors.name ? 'border-[#121211]' : 'border-[#D6CFC2]'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#121211]">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="brief-contact"
                      className="block text-xs font-semibold text-[#121211] mb-2"
                    >
                      {copy.form.email[lang]} *
                    </label>
                    <input
                      id="brief-contact"
                      type="text"
                      value={contact}
                      onChange={(e) => {
                        setContact(e.target.value);
                        if (errors.contact) setErrors((prev) => ({ ...prev, contact: undefined }));
                      }}
                      placeholder={copy.form.emailPlaceholder[lang]}
                      aria-invalid={Boolean(errors.contact)}
                      className={`w-full px-4 py-3 text-sm bg-white border rounded-md text-[#121211] placeholder:text-[#8C877B] focus:outline-none focus:border-[#121211] transition-colors ${
                        errors.contact ? 'border-[#121211]' : 'border-[#D6CFC2]'
                      }`}
                    />
                    {errors.contact && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#121211]">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.contact}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="brief-brand"
                      className="block text-xs font-semibold text-[#121211] mb-2"
                    >
                      {copy.form.brand[lang]}
                    </label>
                    <input
                      id="brief-brand"
                      type="text"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      placeholder={copy.form.brandPlaceholder[lang]}
                      className="w-full px-4 py-3 text-sm bg-white border border-[#D6CFC2] rounded-md text-[#121211] placeholder:text-[#8C877B] focus:outline-none focus:border-[#121211] transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="brief-budget"
                      className="block text-xs font-semibold text-[#121211] mb-2"
                    >
                      {copy.form.budget[lang]}
                    </label>
                    <select
                      id="brief-budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-white border border-[#D6CFC2] rounded-md text-[#121211] focus:outline-none focus:border-[#121211] transition-colors tabular-nums"
                    >
                      {budgetOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="brief-service"
                    className="block text-xs font-semibold text-[#121211] mb-2"
                  >
                    {copy.form.service[lang]}
                  </label>
                  <select
                    id="brief-service"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-white border border-[#D6CFC2] rounded-md text-[#121211] focus:outline-none focus:border-[#121211] transition-colors"
                  >
                    {normalizedOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="brief-details"
                    className="block text-xs font-semibold text-[#121211] mb-2"
                  >
                    {copy.form.details[lang]} *
                  </label>
                  <textarea
                    id="brief-details"
                    rows={4}
                    value={details}
                    onChange={(e) => {
                      setDetails(e.target.value);
                      if (errors.details) setErrors((prev) => ({ ...prev, details: undefined }));
                    }}
                    placeholder={copy.form.detailsPlaceholder[lang]}
                    aria-invalid={Boolean(errors.details)}
                    className={`w-full px-4 py-3 text-sm bg-white border rounded-md text-[#121211] placeholder:text-[#8C877B] focus:outline-none focus:border-[#121211] transition-colors resize-y ${
                      errors.details ? 'border-[#121211]' : 'border-[#D6CFC2]'
                    }`}
                  />
                  {errors.details && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#121211]">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.details}</span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 text-sm font-semibold text-white bg-[#121211] hover:bg-[#DFB962] hover:text-[#121211] rounded-md transition-colors duration-150 cursor-pointer"
                >
                  {copy.form.submit[lang]}
                </button>
              </form>
            )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
