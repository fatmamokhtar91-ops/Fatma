import React from 'react';
import { Language, STUDIO_INFO } from '../data/portfolioData';

interface WhatsAppFabProps {
  lang: Language;
}

export const WhatsAppFab: React.FC<WhatsAppFabProps> = ({ lang }) => {
  const isRtl = lang === 'ar';
  const label = isRtl
    ? 'تواصل مباشر عبر واتساب الأعمال'
    : 'Chat directly on WhatsApp Business';

  return (
    <a
      href={STUDIO_INFO.whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className="fixed bottom-5 right-5 z-40 inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white shadow-lg transition-transform duration-150 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16A34A]"
    >
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6 sm:w-7 sm:h-7 fill-current"
        aria-hidden="true"
      >
        <path d="M12.03 2C6.5 2 2 6.48 2 12c0 1.85.5 3.63 1.46 5.19L2 22l4.94-1.42A9.97 9.97 0 0 0 12.03 22C17.55 22 22 17.52 22 12S17.55 2 12.03 2zm5.82 14.12c-.24.69-1.41 1.32-1.95 1.4-.5.08-1.13.11-1.83-.11-.42-.13-.96-.31-1.66-.61-2.92-1.26-4.82-4.21-4.97-4.4-.15-.2-1.19-1.58-1.19-3.02 0-1.44.75-2.15 1.02-2.44.27-.29.59-.36.79-.36h.57c.18 0 .43-.07.67.51.24.59.84 2.04.91 2.19.07.15.12.33.02.53-.1.2-.15.33-.29.5-.15.17-.31.38-.44.51-.15.15-.3.31-.13.61.17.3.76 1.25 1.63 2.03 1.12 1 2.07 1.31 2.37 1.46.3.15.47.12.64-.08.17-.2.74-.86.94-1.16.2-.3.4-.25.67-.15.27.1 1.72.81 2.02.96.3.15.49.22.56.34.07.12.07.7-.17 1.39z" />
      </svg>
    </a>
  );
};
