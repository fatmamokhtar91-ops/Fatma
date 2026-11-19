import fatmaBrandBanner from '../assets/images/fatma_brand_banner.jpg';
import studioProductionDesk from '../assets/images/studio_production_desk_1795036950460.jpg';
import workVideo1Coffee from '../assets/images/work_video_1_coffee.jpg';
import workVideo2Desserts from '../assets/images/work_video_2_desserts.jpg';
import workVideo3Jam from '../assets/images/work_video_3_jam.jpg';
import workVideo4Bakery from '../assets/images/work_video_4_bakery.jpg';
import workVideo5Perfume from '../assets/images/work_video_5_perfume.jpg';
import workVideo6Chicken from '../assets/images/work_video_6_chicken.jpg';

export type Language = 'ar' | 'en';

export type PortfolioCategory = 'all' | 'products' | 'bakery' | 'beauty' | 'restaurants';

export type PortfolioContentType = 'all' | 'tiktok-ads' | 'brand-identity' | 'ugc-content';

export interface PortfolioWork {
  id: string;
  category: Exclude<PortfolioCategory, 'all'>;
  categoryLabel: Record<Language, string>;
  contentTypes: Exclude<PortfolioContentType, 'all'>[];
  contentTypeLabel: Record<Language, string>;
  badge: Record<Language, string>;
  title: Record<Language, string>;
  client: Record<Language, string>;
  year: string;
  format: string;
  duration: string;
  platform: string;
  video: string;
  videoFileName: string;
  poster: string;
  imageAlt: Record<Language, string>;
  featured?: boolean;
  summary: Record<Language, string>;
  challenge: Record<Language, string>;
  execution: Record<Language, string>;
  serviceKey: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: Record<Language, string>;
  summary: Record<Language, string>;
  deliverables: Record<Language, string[]>;
  turnaround: Record<Language, string>;
  idealFor: Record<Language, string>;
}

export interface WorkflowStep {
  number: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
}

export interface StudioPolicyCard {
  id: string;
  number: string;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  items: Record<Language, string[]>;
  isProfileCard?: boolean;
}

export interface PackageItem {
  id: string;
  name: Record<Language, string>;
  subtitle: Record<Language, string>;
  priceNumber: number;
  price: Record<Language, string>;
  period: Record<Language, string>;
  recommended?: boolean;
  features: Record<Language, string[]>;
  turnaround: Record<Language, string>;
}

export interface FaqItem {
  id: string;
  question: Record<Language, string>;
  answer: Record<Language, string>;
}

export const IMAGES = {
  brandBanner: fatmaBrandBanner,
  studioDesk: studioProductionDesk,
};

export const STUDIO_INFO = {
  ownerName: {
    ar: 'Fatma | AIGC Creator',
    en: 'Fatma | AIGC Creator',
  },
  email: 'fatma.mokhtar91@gmail.com',
  whatsappDisplay: '01013308014',
  whatsappInternational: '+20 101 330 8014',
  whatsappUrl: 'https://wa.me/201013308014',
  cashInstapayDisplay: '01110082595',
  behanceUrl: 'https://www.behance.net/fatmaomar30',
  behanceHandle: 'fatmaomar30',
  linkedinUrl: 'https://www.linkedin.com/in/fatma-mokhtar-ba65a73b1/',
  linkedinHandle: 'fatma-mokhtar',
  canvaPortfolioUrl: 'https://canva.link/5l456lrneracv88',
  digitalMenuDemoUrl: 'https://restaurant-menu-saas.pages.dev/#/owner/dashboard',
};

export const PROOF_METRICS: { value: string; label: Record<Language, string> }[] = [
  {
    value: '6',
    label: {
      ar: 'أعمال ونماذج فيديو إعلانية بالذكاء الاصطناعي في المعرض',
      en: 'AI commercial video reels & samples showcased',
    },
  },
  {
    value: '50%',
    label: {
      ar: 'مقدم حجز لبدء التنفيذ والباقي قبل التسليم النهائي',
      en: 'Booking deposit to start production; balance due before final delivery',
    },
  },
  {
    value: '3',
    label: {
      ar: 'تعديلات مجانية مشمولة بعد الاتفاق النهائي على الفكرة',
      en: 'Free revision rounds included after concept sign-off',
    },
  },
  {
    value: '9:16',
    label: {
      ar: 'إعلانات رأسية مخصصة لريلز وتيك توك وسناب شات',
      en: 'Vertical video commercials tailored for Reels, TikTok & Shorts',
    },
  },
];

export const PORTFOLIO_CONTENT_TYPES: {
  id: PortfolioContentType;
  label: Record<Language, string>;
}[] = [
  { id: 'all', label: { ar: 'جميع الأنواع', en: 'All Types' } },
  { id: 'tiktok-ads', label: { ar: 'إعلانات تيك توك', en: 'TikTok Ads' } },
  { id: 'brand-identity', label: { ar: 'هوية بصرية', en: 'Visual Identity' } },
  { id: 'ugc-content', label: { ar: 'محتوى UGC', en: 'UGC Content' } },
];

export const PORTFOLIO_CATEGORIES: { id: PortfolioCategory; label: Record<Language, string> }[] = [
  { id: 'all', label: { ar: 'كل المجالات', en: 'All Sectors' } },
  { id: 'products', label: { ar: 'المنتجات والأغذية', en: 'Products & Food' } },
  { id: 'bakery', label: { ar: 'مخابز وحلويات', en: 'Bakery & Desserts' } },
  { id: 'beauty', label: { ar: 'العطور والجمال', en: 'Fragrance & Beauty' } },
  { id: 'restaurants', label: { ar: 'مطاعم وكافيهات', en: 'Restaurants & Cafes' } },
];

export const PORTFOLIO_WORKS: PortfolioWork[] = [
  {
    id: 'wadi-coffee-ad',
    category: 'products',
    categoryLabel: { ar: 'منتجات', en: 'Products' },
    contentTypes: ['tiktok-ads', 'brand-identity'],
    contentTypeLabel: { ar: 'إعلانات تيك توك · هوية بصرية', en: 'TikTok Ads · Visual Identity' },
    badge: {
      ar: 'عمل عميل · وادي البن',
      en: 'Client Work · Wadi El-Bon',
    },
    title: {
      ar: '01. إعلان قهوة — وادي البن البرازيلي',
      en: '01. Coffee Commercial — Wadi El-Bon',
    },
    client: { ar: 'وادي البن البرازيلي', en: 'Wadi El-Bon Al-Brazili' },
    year: '2026',
    format: '9:16 Vertical',
    duration: 'AI Ad',
    platform: 'Reels · TikTok · Shorts',
    video: '/videos/video-1.mp4',
    videoFileName: 'video-1.mp4',
    poster: workVideo1Coffee,
    imageAlt: {
      ar: 'لقطة من إعلان قهوة لوادي البن البرازيلي يبرز حبوب البن المحمصة بإضاءة سينمائية',
      en: 'Frame from Wadi El-Bon Al-Brazili coffee commercial showcasing roasted coffee beans in cinematic lighting',
    },
    featured: true,
    summary: {
      ar: 'مشاهد سينمائية مقربة تبرز جودة التحميص ونكهة البن الأصيلة للعرض الرأسي.',
      en: 'Cinematic macro roasting scenes crafted to highlight bean quality for vertical feeds.',
    },
    challenge: {
      ar: 'إبراز جودة حبوب البن المحمصة وروح العلامة التجارية بأسلوب بصري دافئ يلفت انتباه عشاق القهوة من الثانية الأولى.',
      en: 'Highlight the richness of freshly roasted coffee beans and brand craft with an opening visual that captures attention immediately.',
    },
    execution: {
      ar: 'مشاهد مقربة بتفاصيل التحميص وحركة سينمائية ناعمة وإضاءة دافئة مصممة للعرض الرأسي على منصات التواصل.',
      en: 'Executed macro roasting shots, smooth cinematic camera movement, and warm directional lighting calibrated for vertical social feeds.',
    },
    serviceKey: 'ai-commercials',
  },
  {
    id: 'luxury-desserts-ad',
    category: 'bakery',
    categoryLabel: { ar: 'مخابز وحلويات', en: 'Bakery & Desserts' },
    contentTypes: ['tiktok-ads', 'ugc-content'],
    contentTypeLabel: { ar: 'إعلانات تيك توك · محتوى UGC', en: 'TikTok Ads · UGC Content' },
    badge: { ar: 'نموذج إعلاني', en: 'Ad Sample' },
    title: {
      ar: '02. إعلان حلويات فاخرة',
      en: '02. Luxury Desserts Commercial',
    },
    client: { ar: 'نموذج إعلاني بالذكاء الاصطناعي', en: 'AI Commercial Sample' },
    year: '2026',
    format: '9:16 Vertical',
    duration: 'AI Ad',
    platform: 'Reels · TikTok · Snapchat',
    video: '/videos/video-2.mp4',
    videoFileName: 'video-2.mp4',
    poster: workVideo2Desserts,
    imageAlt: {
      ar: 'لقطة من إعلان حلويات فاخرة بإضاءة دافئة تبرز قوام الحلوى',
      en: 'Frame from a luxury desserts commercial with warm lighting highlighting dessert textures',
    },
    summary: {
      ar: 'مشهد دافئ يبرز طبقات الحلوى والسينابون والتفاصيل الشهية بإيقاع يجذب المشاهد.',
      en: 'Warm cinematic framing highlighting pastry layers, glazes, and immediate appetite appeal.',
    },
    challenge: {
      ar: 'نقل إحساس الملمس الغني والطزاجة في الحلويات الفاخرة عبر شاشة الهاتف بدون تصوير مطبخي مكلف.',
      en: 'Convey rich texture and freshness for artisanal desserts on mobile screens without costly food-studio overhead.',
    },
    execution: {
      ar: 'إضاءة ذهبية دافئة وزوايا تصوير قريبة مع إيقاع مونتاج سلس يبرز كل طبقة وتفصيلة شهية.',
      en: 'Crafted warm golden lighting and close-up food motion with smooth pacing that accentuates every layer.',
    },
    serviceKey: 'ai-commercials',
  },
  {
    id: 'strawberry-jam-ad',
    category: 'products',
    categoryLabel: { ar: 'منتجات غذائية', en: 'Food Products' },
    contentTypes: ['ugc-content', 'tiktok-ads'],
    contentTypeLabel: { ar: 'محتوى UGC · إعلانات تيك توك', en: 'UGC Content · TikTok Ads' },
    badge: { ar: 'نموذج إعلاني', en: 'Ad Sample' },
    title: {
      ar: '03. إعلان مربى الفراولة الإبداعي',
      en: '03. Strawberry Jam Creative Ad',
    },
    client: { ar: 'نموذج إعلاني بالذكاء الاصطناعي', en: 'AI Commercial Sample' },
    year: '2026',
    format: '9:16 Vertical',
    duration: 'AI Ad',
    platform: 'Reels · TikTok · Shorts',
    video: '/videos/video-3.mp4',
    videoFileName: 'video-3.mp4',
    poster: workVideo3Jam,
    imageAlt: {
      ar: 'لقطة من إعلان مربى الفراولة الإبداعي على لوحة إعلانية',
      en: 'Frame from the creative strawberry jam billboard commercial concept',
    },
    summary: {
      ar: 'فكرة بصرية تُخرج المنتج من اللوحة الإعلانية إلى يد المشاهد في لقطة لافتة.',
      en: 'An inventive visual concept bringing the product from a street billboard into hand.',
    },
    challenge: {
      ar: 'تقديم منتج غذائي يومي بفكرة بصرية غير تقليدية توقف التمرير السريع على تيك توك وإنستغرام.',
      en: 'Present an everyday food staple with a thumb-stopping visual hook designed for TikTok and Reels.',
    },
    execution: {
      ar: 'تنفيذ خدعة بصرية بالذكاء الاصطناعي تدمج الواقع باللوحة الإعلانية بأسلوب حيوي ومبهج.',
      en: 'Directed an AI-driven mixed-reality transition seamlessly bridging out-of-home framing with tactile hand interaction.',
    },
    serviceKey: 'ai-commercials',
  },
  {
    id: 'bakery-pastries-ad',
    category: 'bakery',
    categoryLabel: { ar: 'مخابز وحلويات', en: 'Bakery & Desserts' },
    contentTypes: ['brand-identity', 'ugc-content'],
    contentTypeLabel: { ar: 'هوية بصرية · محتوى UGC', en: 'Visual Identity · UGC Content' },
    badge: { ar: 'نموذج إعلاني', en: 'Ad Sample' },
    title: {
      ar: '04. إعلان مخبز ومعجنات فاخرة',
      en: '04. Bakery & Pastries Story Ad',
    },
    client: { ar: 'نموذج إعلاني بالذكاء الاصطناعي', en: 'AI Commercial Sample' },
    year: '2026',
    format: '9:16 Vertical',
    duration: 'AI Story',
    platform: 'Instagram Reels · TikTok',
    video: '/videos/video-4.mp4',
    videoFileName: 'video-4.mp4',
    poster: workVideo4Bakery,
    imageAlt: {
      ar: 'لقطة من إعلان مخبز ومعجنات فاخرة في عرض تقديمي ذهبي',
      en: 'Frame from the luxury bakery and pastries table-display commercial',
    },
    summary: {
      ar: 'قصة إعلانية بأسلوب عرض فاخر تأخذ المشاهد من التحضير إلى لحظة التقديم.',
      en: 'A narrative commercial guiding viewers from artisan preparation through elegant presentation.',
    },
    challenge: {
      ar: 'بناء قصة قصيرة مترابطة تخلق ارتباطاً عاطفياً بالمخبز وتُشعر المشاهد بدفء الفرن والطزاجة.',
      en: 'Build a cohesive short story that evokes warmth, craftsmanship, and fresh-from-the-oven appeal.',
    },
    execution: {
      ar: 'تسلسل مشاهد متدرج يبدأ من التحضير والعجن وصولاً إلى التقديم النهائي مع مؤثرات صوتية وبصرية متناسقة.',
      en: 'Structured a multi-scene arc from dough preparation to final plating with cohesive sound and color grading.',
    },
    serviceKey: 'ai-commercials',
  },
  {
    id: 'luxury-perfume-ad',
    category: 'beauty',
    categoryLabel: { ar: 'العطور والجمال', en: 'Fragrance & Beauty' },
    contentTypes: ['brand-identity'],
    contentTypeLabel: { ar: 'هوية بصرية', en: 'Visual Identity' },
    badge: { ar: 'نموذج إعلاني', en: 'Ad Sample' },
    title: {
      ar: '05. إعلان عطر فاخر — Laurence Gold',
      en: '05. Luxury Perfume — Laurence Gold',
    },
    client: { ar: 'نموذج إعلاني بالذكاء الاصطناعي', en: 'AI Commercial Sample' },
    year: '2026',
    format: '9:16 Vertical',
    duration: 'AI Ad',
    platform: 'Instagram · Snapchat · TikTok',
    video: '/videos/video-5.mp4',
    videoFileName: 'video-5.mp4',
    poster: workVideo5Perfume,
    imageAlt: {
      ar: 'لقطة من إعلان عطر Laurence Gold باللونين الأسود والذهبي مع دخان ناعم',
      en: 'Frame from the black-and-gold Laurence Gold perfume commercial with soft smoke motion',
    },
    summary: {
      ar: 'أجواء راقية بالأسود والذهبي مع حركة دخان ناعمة تعكس فخامة الزجاجة العطرية.',
      en: 'Black-and-gold studio atmosphere with fluid smoke motion reflecting luxury fragrance craft.',
    },
    challenge: {
      ar: 'ترجمة الطابع الفخم والغامض للعطر إلى فيديو قصير يليق بعلامات العطور الراقية.',
      en: 'Translate the prestige and mood of a fine fragrance into a sleek vertical commercial.',
    },
    execution: {
      ar: 'تباين لوني بين الأسود والذهبي مع حركة دخان بطيئة وإبراز انعكاسات الزجاجة.',
      en: 'Paired deep obsidian tones and golden rim lighting with fluid smoke movement and bottle reflections.',
    },
    serviceKey: 'ai-commercials',
  },
  {
    id: 'fried-chicken-ad',
    category: 'restaurants',
    categoryLabel: { ar: 'مطاعم وكافيهات', en: 'Restaurants & Cafes' },
    contentTypes: ['tiktok-ads', 'ugc-content'],
    contentTypeLabel: { ar: 'إعلانات تيك توك · محتوى UGC', en: 'TikTok Ads · UGC Content' },
    badge: { ar: 'نموذج إعلاني', en: 'Ad Sample' },
    title: {
      ar: '06. إعلان مطعم فراخ مقلية',
      en: '06. Fried Chicken Restaurant Ad',
    },
    client: { ar: 'نموذج إعلاني بالذكاء الاصطناعي', en: 'AI Commercial Sample' },
    year: '2026',
    format: '9:16 Vertical',
    duration: 'AI Ad',
    platform: 'TikTok · Reels · Snapchat',
    video: '/videos/video-6.mp4',
    videoFileName: 'video-6.mp4',
    poster: workVideo6Chicken,
    imageAlt: {
      ar: 'لقطة من إعلان مطعم فراخ مقلية يظهر الشيف وصواني الدجاج المقرمش',
      en: 'Frame from a fried chicken restaurant ad featuring chef and crispy chicken trays',
    },
    summary: {
      ar: 'لقطات حيوية من المطبخ إلى التقديم تبرز القرمشة والطزاجة وتجذب طلبات المطعم.',
      en: 'High-energy kitchen-to-table cuts emphasizing golden crispness to drive orders.',
    },
    challenge: {
      ar: 'إبراز القرمشة والطزاجة السريعة بطريقة ديناميكية تجذب عشاق الوجبات السريعة على السوشيال ميديا.',
      en: 'Showcase sizzling crunch and freshness with high-tempo visuals tailored for social foodies.',
    },
    execution: {
      ar: 'لقطات سريعة الإيقاع من القلي حتى التقديم مع إبراز البخار والتوابل والقرمشة.',
      en: 'Produced dynamic kitchen-to-table cuts emphasizing steam, seasoning, and golden crunch.',
    },
    serviceKey: 'ai-commercials',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'ai-commercials',
    number: '01.',
    title: {
      ar: 'إعلانات فيديو بالذكاء الاصطناعي',
      en: 'AI Video Commercials',
    },
    summary: {
      ar: 'فكرة وسيناريو ومشاهد AI وتعليق صوتي ومونتاج وحركة إعلانية مصممة خصيصاً لإبراز المنتج وزيادة التفاعل على منصات التواصل.',
      en: 'End-to-end concepting, direct-response scripting, AI scene generation, crisp voiceover, and commercial motion editing built for paid social.',
    },
    deliverables: {
      ar: [
        'فيديو إعلاني رئيسي بدقة 4K بمقاسات متعددة (9:16 و 16:9)',
        '3 نسخ مختلفة لأول 3 ثوانٍ (Visual Hooks) لاختبار الأداء الإعلاني',
        'تصميم صوتي احترافي وتعليق صوتي متقن باللهجة المطلوبة',
        'ملفات جاهزة مباشرة للإطلاق على ميتا وتيك توك وسناب شات',
      ],
      en: [
        'Primary 4K commercial edit formatted for 9:16, 16:9, and 4:5',
        'Three distinct 3-second visual hooks for paid media split testing',
        'Bespoke sound design and studio-grade Arabic or English voiceover',
        'Ad-ready exports calibrated for Meta, TikTok, and Snapchat',
      ],
    },
    turnaround: { ar: 'من 3 إلى 5 أيام عمل', en: '3 to 5 business days' },
    idealFor: {
      ar: 'العطور، مستحضرات التجميل، المتاجر الإلكترونية، وإطلاق المنتجات الجديدة',
      en: 'Fragrance, beauty, e-commerce brands, and flagship product launches',
    },
  },
  {
    id: 'digital-menu',
    number: '02.',
    title: {
      ar: 'منيو إلكتروني للمطاعم',
      en: 'Digital Restaurant Menus & QR',
    },
    summary: {
      ar: 'منيو رقمي بتصميم متجاوب وروابط QR لعرض الأصناف بسهولة وسرعة على الهاتف مع إبراز صور الأطباق والأسعار بوضوح.',
      en: 'Responsive digital menus with custom QR links that showcase dishes, pricing, and categories effortlessly on every mobile screen.',
    },
    deliverables: {
      ar: [
        'منيو إلكتروني سريع ومتجاوب بالكامل مع شاشات الهواتف',
        'توليد رموز QR عالية الدقة جاهزة للطباعة على الطاولات',
        'تنظيم الأقسام والأطباق والأسعار مع سهولة التحديث المستمر',
        'تحسين صور الأطباق لتظهر بأشهى شكل وأسرع تحميل',
      ],
      en: [
        'Fast, mobile-first digital menu interface tailored to your brand',
        'Print-ready high-resolution QR codes for tables and packaging',
        'Structured dish categories, modifiers, and easy price updates',
        'Curated food photography retouching for fast mobile loading',
      ],
    },
    turnaround: { ar: '48 إلى 72 ساعة', en: '48 to 72 hours' },
    idealFor: {
      ar: 'المطاعم، الكافيهات المختصة، ومشاريع الضيافة الحديثة',
      en: 'Restaurants, specialty cafes, bakeries, and hospitality venues',
    },
  },
  {
    id: 'web-design',
    number: '03.',
    title: {
      ar: 'تصميم المواقع وصفحات الهبوط',
      en: 'Websites & High-Converting Landing Pages',
    },
    summary: {
      ar: 'مواقع تعريفية وصفحات هبوط منظمة ومتوافقة مع الهاتف، تركز على وضوح الرسالة التسويقية وتحويل الزوار إلى عملاء فعليين.',
      en: 'Structured corporate websites and mobile-optimized landing pages designed around clear messaging hierarchy and measurable lead conversion.',
    },
    deliverables: {
      ar: [
        'تصميم واجهة احترافية متوافقة مع الهواتف والأجهزة اللوحية',
        'هيكلة واضحة للمحتوى وأزرار الدعوة لاتخاذ إجراء (CTA)',
        'ربط نماذج التواصل والواتساب ووسائل التواصل الاجتماعي',
        'سرعة تحميل عالية وتجربة مستخدم مريحة وخالية من التعقيد',
      ],
      en: [
        'Responsive UI design calibrated across mobile and desktop viewports',
        'Clear information architecture and conversion-focused CTAs',
        'Integrated contact forms, WhatsApp routing, and social links',
        'Lightweight performance and clean typographic hierarchy',
      ],
    },
    turnaround: { ar: 'من 4 إلى 7 أيام عمل', en: '4 to 7 business days' },
    idealFor: {
      ar: 'الشركات الناشئة، مقدمي الخدمات، والحملات الإعلانية الموجهة',
      en: 'Service businesses, startups, and paid-traffic campaign funnels',
    },
  },
  {
    id: 'digital-products',
    number: '04.',
    title: {
      ar: 'المنتجات الرقمية والكتب',
      en: 'Digital Products & Illustrated Books',
    },
    summary: {
      ar: 'كتب إلكترونية وأدلة رقمية وكتب أطفال مصورة وتجهيز ملفات النشر الاحترافية بأسلوب بصري متناسق وجاهز للبيع أو الطباعة.',
      en: 'E-books, digital guides, and illustrated children’s books formatted with cohesive art direction and ready for digital release or print.',
    },
    deliverables: {
      ar: [
        'تصميم داخلي منظم وغلاف احترافي يعكس موضوع الكتاب أو الدليل',
        'توليد وتنسيق الرسومات التوضيحية المتناسقة لكتب الأطفال',
        'تجهيز ملفات PDF تفاعلية ونسخ عالية الدقة للطباعة والنشر',
        'صور ترويجية للمنتج الرقمي لعرضه في المتجر الإلكتروني',
      ],
      en: [
        'Editorial interior layout and custom cover design',
        'Consistent character and scene illustrations for children’s books',
        'Interactive PDF exports and print-ready publishing masters',
        'Promotional product mockups ready for storefront listings',
      ],
    },
    turnaround: { ar: 'من 4 إلى 6 أيام عمل', en: '4 to 6 business days' },
    idealFor: {
      ar: 'صناع المحتوى، المؤلفين، والأكاديميات التعليمية',
      en: 'Creators, independent authors, coaches, and educational brands',
    },
  },
  {
    id: 'presentations',
    number: '05.',
    title: {
      ar: 'العروض التقديمية وبروفايل الشركات',
      en: 'Presentations & Company Profiles',
    },
    summary: {
      ar: 'إعداد Presentation و Portfolio و Company Profile بتصميم متناسق وواضح يبرز قيمة المشروع أمام المستثمرين والعملاء.',
      en: 'Cohesive pitch decks, portfolios, and company profiles structured to communicate brand authority to investors and enterprise clients.',
    },
    deliverables: {
      ar: [
        'تصميم شرائح عرض متناسقة بهوية العلامة التجارية',
        'إعادة صياغة وترتيب المعلومات والبيانات بأسلوب بصري مقنع',
        'تسليم ملفات قابلة للتعديل (PowerPoint / Google Slides) و PDF',
        'رسوم بيانية وجداول واضحة تسهل قراءة الأرقام والنتائج',
      ],
      en: [
        'Custom slide system aligned with your brand identity',
        'Information structuring for clear executive storytelling',
        'Editable PowerPoint / Google Slides decks plus PDF masters',
        'Clean charts and tabular metrics built for rapid scanning',
      ],
    },
    turnaround: { ar: 'من 3 إلى 4 أيام عمل', en: '3 to 4 business days' },
    idealFor: {
      ar: 'الشركات الباحثة عن تمويل، الوكالات، والمشاريع المتقدمة للمناقصات',
      en: 'Fundraising startups, agencies, and B2B commercial proposals',
    },
  },
  {
    id: 'branding',
    number: '06.',
    title: {
      ar: 'الهوية البصرية والتصميم',
      en: 'Visual Identity & Social Templates',
    },
    summary: {
      ar: 'بناء نظام ألوان وخطوط وتطبيقات بصرية وقوالب للسوشيال ميديا تمنح علامتك التجارية حضوراً متفرداً وموحداً عبر كل المنصات.',
      en: 'Curated color palettes, typographic systems, brand guidelines, and reusable social media templates for unified brand presence.',
    },
    deliverables: {
      ar: [
        'دليل الهوية البصرية: الشعار، نظام الألوان، والخطوط المعتمدة',
        'قوالب جاهزة لمنشورات وقصص إنستغرام وتيك توك',
        'تطبيقات بصرية للمطبوعات والتغليف وتوقيع البريد الإلكتروني',
        'ملفات مصدرية مفتوحة وعالية الدقة لجميع الاستخدامات',
      ],
      en: [
        'Brand style guide covering logo usage, palette, and typography',
        'Reusable templates for Instagram feeds, Stories, and Reels covers',
        'Stationery, packaging, and digital touchpoint applications',
        'High-resolution source files organized for your team',
      ],
    },
    turnaround: { ar: 'من 5 إلى 7 أيام عمل', en: '5 to 7 business days' },
    idealFor: {
      ar: 'العلامات التجارية الجديدة أو المشاريع الراغبة في تحديث هويتها',
      en: 'New brand launches and established businesses undergoing a refresh',
    },
  },
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    number: '01',
    title: { ar: 'الاتفاق على التفاصيل والسعر', en: 'Scope & Price Agreement' },
    description: {
      ar: 'الاتفاق على تفاصيل المشروع والباقة والسعر قبل بدء التنفيذ.',
      en: 'Confirming project details, selected package, and final price prior to starting production.',
    },
  },
  {
    number: '02',
    title: { ar: 'دفع 50% مقدماً للحجز', en: '50% Booking Deposit' },
    description: {
      ar: 'دفع 50% مقدماً لتأكيد الحجز وبدء العمل، ويُكمل باقي المبلغ قبل تسليم النسخة النهائية دون مقدمات إضافية.',
      en: 'A 50% deposit confirms booking and starts production; the balance is completed before final delivery.',
    },
  },
  {
    number: '03',
    title: { ar: 'معاينة الفيديو للمراجعة', en: 'Preview Cut Review' },
    description: {
      ar: 'إرسال معاينة للفيديو لمراجعتها وتطبيق التعديلات المشمولة قبل التسليم النهائي.',
      en: 'Sending a watermarked/preview cut for your review and included revisions before final export.',
    },
  },
  {
    number: '04',
    title: { ar: 'التسليم بأعلى جودة', en: 'Final High-Res Delivery' },
    description: {
      ar: 'بعد اعتمادك للفيديو، تُسلّم النسخة النهائية بأعلى جودة وبالصيغ المطلوبة.',
      en: 'Once approved, final video masters are delivered in high resolution and requested aspect ratios.',
    },
  },
];

export const STUDIO_POLICY_CARDS: StudioPolicyCard[] = [
  {
    id: 'profile',
    number: '01',
    title: {
      ar: 'Fatma | AIGC Creator',
      en: 'Fatma | AIGC Creator',
    },
    subtitle: {
      ar: 'رؤيتك وإبداعي وقوة الذكاء الاصطناعي — التواصل المباشر والروابط الرسمية',
      en: 'Your vision, my creativity, and AI power — direct channels & official links',
    },
    items: {
      ar: [
        'إعلانات فيديو بالذكاء الاصطناعي مصممة خصيصاً لإبراز منتجك وزيادة التفاعل.',
        'أحدث أعمالنا للعملاء: إعلان قهوة للعميل «وادي البن البرازيلي» مع 5 نماذج إعلانية متنوعة.',
      ],
      en: [
        'AI-crafted video commercials tailored to highlight your product and boost engagement.',
        'Recent client work: Coffee commercial for Wadi El-Bon Al-Brazili alongside 5 ad concepts.',
      ],
    },
    isProfileCard: true,
  },
  {
    id: 'revisions',
    number: '02',
    title: {
      ar: 'سياسة التعديلات',
      en: 'Revision Policy',
    },
    subtitle: {
      ar: 'وضوح كامل في مراجعة العمل واعتماد النسخة النهائية',
      en: 'Clear, structured revision rounds after concept approval',
    },
    items: {
      ar: [
        'السعر يشمل 3 تعديلات مجانية على الفيديو، بعد الاتفاق النهائي على الفكرة.',
        'تُحتسب كل الملاحظات في كل جولة إذا أُرسلت بشكل واضح ومحدد.',
        'التعديلات بعد الجولات المجانية تُحتسب بتكلفة جديدة حسب حجم التعديل، وتشمل تغيير النص أو التصميم أو المؤثرات.',
      ],
      en: [
        'Pricing includes 3 free revision rounds on the video after final concept sign-off.',
        'All notes sent clearly and together in one round count as a single revision.',
        'Additional revisions beyond the included 3 rounds are quoted based on scope (copy, visuals, or effects).',
      ],
    },
  },
  {
    id: 'workflow-terms',
    number: '03',
    title: {
      ar: 'آلية العمل وملاحظات مهمة',
      en: 'Booking, Payment & Notes',
    },
    subtitle: {
      ar: 'خطوات واضحة من تأكيد الحجز حتى التسليم بأعلى جودة',
      en: 'Transparent steps from booking deposit to final delivery',
    },
    items: {
      ar: [
        'دفع 50% مقدماً لتأكيد الحجز وبدء العمل، ويُكمل باقي المبلغ قبل تسليم النسخة النهائية.',
        'إرسال معاينة للفيديو لمراجعتها قبل تسليم النسخة النهائية بأعلى جودة وبالصيغ المطلوبة.',
        'تغيير الفكرة الأساسية أو السيناريو بعد الموافقة أو إعادة تنفيذ الفيديو بالكامل يُحتسب كاتفاق/عمل جديد.',
        'يرجى إرسال كافة تفاصيل المشروع والملفات المطلوبة عند الحجز لضمان سرعة التنفيذ.',
      ],
      en: [
        'A 50% booking deposit initiates production; the remaining 50% is settled prior to final delivery.',
        'A preview cut is shared for review before delivering final high-resolution masters.',
        'Changing the core concept after approval or requesting a full rebuild counts as a new production scope.',
        'Please provide complete project details upfront to keep delivery fast and on schedule.',
      ],
    },
  },
];

export const PACKAGES: PackageItem[] = [
  {
    id: 'basic',
    name: { ar: 'أساسية', en: 'Basic' },
    subtitle: {
      ar: 'مناسبة للعرض السريع للمنتجات والصفحات الناشئة',
      en: 'Ideal for quick product spotlights and emerging stores',
    },
    priceNumber: 300,
    price: { ar: '300 ج.م', en: '300 EGP' },
    period: { ar: 'للفيديو', en: 'per video' },
    features: {
      ar: [
        'مشاهد للمنتج',
        'حركة بسيطة',
        'موسيقى ونص إعلاني',
      ],
      en: [
        'Product showcase scenes',
        'Smooth subtle motion',
        'Music and promotional captions',
      ],
    },
    turnaround: { ar: '10 - 15 ثانية', en: '10 – 15 seconds' },
  },
  {
    id: 'creative',
    name: { ar: 'إبداعية', en: 'Creative' },
    subtitle: {
      ar: 'الأنسب للإعلانات الجذابة وإبراز هوية المنتج بوضوح',
      en: 'Most requested tier for engaging vertical social commercials',
    },
    priceNumber: 600,
    price: { ar: '600 ج.م', en: '600 EGP' },
    period: { ar: 'للفيديو', en: 'per video' },
    recommended: true,
    features: {
      ar: [
        'مشاهد إبداعية',
        'حركة سينمائية',
        'إبراز المنتج',
        'موسيقى وانتقالات',
      ],
      en: [
        'Creative AI scene direction',
        'Cinematic camera motion',
        'Focused product highlighting',
        'Music & seamless transitions',
      ],
    },
    turnaround: { ar: '20 - 30 ثانية', en: '20 – 30 seconds' },
  },
  {
    id: 'premium',
    name: { ar: 'مميزة', en: 'Premium' },
    subtitle: {
      ar: 'قصة إعلانية متكاملة بمشاهد متعددة ومؤثرات متقدمة',
      en: 'Complete narrative commercial with multi-scene storytelling & VFX',
    },
    priceNumber: 900,
    price: { ar: '900 ج.م', en: '900 EGP' },
    period: { ar: 'للفيديو', en: 'per video' },
    features: {
      ar: [
        'مشاهد متعددة',
        'مؤثرات بصرية متقدمة',
        'قصة إعلانية',
        'مونتاج سينمائي',
      ],
      en: [
        'Multi-scene narrative flow',
        'Advanced visual effects',
        'Full commercial storyline',
        'Cinematic editing & pacing',
      ],
    },
    turnaround: { ar: '30 - 40 ثانية', en: '30 – 40 seconds' },
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'turnaround-time',
    question: {
      ar: 'كم تستغرق مدة تنفيذ وتسليم الفيديو أو التصميم؟',
      en: 'How long does production and final delivery take?',
    },
    answer: {
      ar: 'تعتمد المدة على نوع الخدمة وحجم المشروع؛ غالباً ما يتم تسليم إعلانات الفيديو خلال 3 إلى 5 أيام عمل، والمنيو الإلكتروني خلال 48 إلى 72 ساعة، بينما تستغرق المواقع والهوية البصرية من 4 إلى 7 أيام عمل بعد استلام كافة البيانات وتأكيد الحجز.',
      en: 'Turnaround depends on the service and scope: AI video commercials typically take 3 to 5 business days, digital restaurant menus take 48 to 72 hours, and websites or brand identities take 4 to 7 business days once full brief assets and the booking deposit are received.',
    },
  },
  {
    id: 'payment-methods',
    question: {
      ar: 'ما هي طرق الدفع المتاحة وما قيمة مقدم الحجز؟',
      en: 'What payment methods do you accept and how does the deposit work?',
    },
    answer: {
      ar: 'يتم دفع 50% مقدم حجز لتأكيد البدء في العمل، ويُستكمل باقي المبلغ (50%) قبل تسليم النسخة النهائية بأعلى جودة. الدفع متاح بسهولة عبر فودافون كاش أو إنستا باي على الرقم 01110082595.',
      en: 'A 50% booking deposit confirms your slot and starts production, and the remaining 50% is paid prior to final high-resolution delivery. Payments are accepted conveniently via Vodafone Cash or InstaPay on 01110082595.',
    },
  },
  {
    id: 'deliverable-formats',
    question: {
      ar: 'ما نوع وصيغ الملفات التي أستلمها عند انتهاء المشروع؟',
      en: 'What file formats and deliverables will I receive?',
    },
    answer: {
      ar: 'لإعلانات الفيديو تستلم ملفات MP4 عالية الدقة جاهزة للنشر بالمقاسات المطلوبة (9:16 لريلز وتيك توك وسناب شات، أو 16:9 عند الطلب). أما المنيو الرقمي، الكتب الرقمية، العروض التقديمية، والهوية البصرية فتُسلّم بصيغ PDF عالية الدقة وروابط أو ملفات قابلة للتعديل حسب الخدمة.',
      en: 'For video ads, you receive high-resolution MP4 exports tailored for Reels, TikTok, and Shorts (9:16 vertical, plus 16:9 when requested). Digital menus, e-books, pitch decks, and brand identities are delivered as print/web-ready PDFs and editable source files where applicable.',
    },
  },
  {
    id: 'revision-policy',
    question: {
      ar: 'كم عدد التعديلات المجانية المتاحة؟',
      en: 'How many free revisions are included?',
    },
    answer: {
      ar: 'يشمل السعر 3 تعديلات مجانية بعد الاتفاق النهائي على الفكرة. وتُحتسب جميع الملاحظات المرسلة معاً بوضوح في كل جولة كتعديل واحد، أما تغيير الفكرة الأساسية بالكامل بعد الموافقة فيُحتسب كاتفاق جديد.',
      en: 'Every project includes 3 free revision rounds after final concept approval. Consolidated notes sent clearly in one round count as a single revision; changing the entire core concept after approval is scoped separately.',
    },
  },
  {
    id: 'preview-before-balance',
    question: {
      ar: 'هل يمكنني مراجعة معاينة العمل قبل استكمال الدفع النهائي؟',
      en: 'Can I review a preview cut before completing the final balance?',
    },
    answer: {
      ar: 'بالتأكيد؛ يتم إرسال نسخة معاينة للفيديو أو التصميم لمراجعتها وتطبيق التعديلات المشمولة، وبعد اعتمادك النهائي وإتمام الـ 50% المتبقية تُسلّم الملفات الأصلية بأعلى جودة.',
      en: 'Yes. A watermarked/preview version is shared for your review and included revisions. Once approved and the remaining 50% balance is completed, your final unwatermarked high-res masters are delivered.',
    },
  },
  {
    id: 'how-to-start',
    question: {
      ar: 'ما البيانات المطلوبة لبدء تنفيذ مشروعي فوراً؟',
      en: 'What details should I send to start my project right away?',
    },
    answer: {
      ar: 'أرسل اسم العلامة التجارية، صور أو تفاصيل المنتج، الفكرة أو الرسالة التسويقية المطلوبة، والمنصات المستهدفة عبر واتساب (01013308014) أو نموذج الطلب بالأسفل لنبدأ التجهيز فوراً.',
      en: 'Share your brand name, product photos or details, campaign goal, and target platforms via WhatsApp (+20 101 330 8014) or the brief form below so we can begin right away.',
    },
  },
];

export const UI_COPY = {
  brand: {
    ar: 'Fatma | AIGC Creator',
    en: 'Fatma | AIGC Creator',
  },
  nav: {
    portfolio: { ar: 'الأعمال', en: 'Selected Works' },
    services: { ar: 'الخدمات', en: 'Services' },
    testimonials: { ar: 'بياناتي والسياسة', en: 'Profile & Terms' },
    packages: { ar: 'الباقات', en: 'Packages' },
    contact: { ar: 'تواصل معنا', en: 'Contact' },
    cta: { ar: 'ابدأ مشروعك', en: 'Start a Project' },
  },
  hero: {
    kicker: {
      ar: 'خدمات الاستوديو الإبداعي · إعلانات الذكاء الاصطناعي وتصميم المواقع والهوية',
      en: 'AI Video Ads · Web & Digital Menus · Brand Identity',
    },
    headline: {
      ar: 'حلول إبداعية ورقمية متكاملة ترتقي بحضور علامتك التجارية',
      en: 'Editorial AI video ads and digital design engineered to perform.',
    },
    subheadline: {
      ar: 'من إعلانات الفيديو بالذكاء الاصطناعي والمنيو الإلكتروني للمطاعم، إلى تصميم المواقع، الكتب الرقمية، بروفايل الشركات، وبناء الهوية البصرية المتكاملة.',
      en: 'From AI commercial videos and QR restaurant menus to conversion-focused landing pages, illustrated digital books, company profiles, and cohesive brand identities.',
    },
    primaryCta: { ar: 'اطلب عرض سعر لمشروعك', en: 'Request a Project Brief' },
    secondaryCta: { ar: 'استعرض الأعمال المختارة', en: 'Explore Selected Works' },
    portraitCaption: {
      ar: 'Fatma | AIGC Creator',
      en: 'Fatma | AIGC Creator',
    },
  },
  portfolio: {
    kicker: { ar: 'من أحدث أعمالنا', en: 'Selected Video Works' },
    title: { ar: 'فيديوهات إعلانية مصممة بالذكاء الاصطناعي', en: 'Six AI-crafted commercial video productions.' },
    subtitle: {
      ar: 'أعمال حقيقية لعملائنا ونماذج إعلانية متنوعة صُنعت بالذكاء الاصطناعي — اضغط لتشغيل المعاينة أو اطلب إعلاناً مشابهاً.',
      en: 'Client campaigns and bespoke AI commercial samples — play each vertical reel or request a similar production.',
    },
    viewDetails: { ar: 'عرض التفاصيل', en: 'View Details' },
    requestSimilar: { ar: 'اطلب مثله', en: 'Request Similar' },
    challengeLabel: { ar: 'الفكرة والهدف', en: 'Concept & Goal' },
    executionLabel: { ar: 'أسلوب التنفيذ', en: 'Production Approach' },
    resultsLabel: { ar: 'مواصفات العرض', en: 'Display Specs' },
    specsLabel: { ar: 'المواصفات الفنية', en: 'Deliverable Specs' },
  },
  services: {
    kicker: { ar: 'خدمات الاستوديو الإبداعي', en: 'Studio Capabilities' },
    title: { ar: 'كل خدمات Fatma | AIGC Creator', en: 'Six specialized services under one creative desk.' },
    deliverablesLabel: { ar: 'ما الذي تستلمه فعلياً', en: 'What You Receive' },
    turnaroundLabel: { ar: 'مدة التنفيذ المتوقعة', en: 'Estimated Turnaround' },
    idealForLabel: { ar: 'مثالية لـ', en: 'Best Suited For' },
    bookService: { ar: 'احجز هذه الخدمة', en: 'Book This Service' },
    workflowKicker: { ar: 'منهجية التنفيذ', en: 'Production Workflow' },
    workflowTitle: { ar: 'من الفكرة إلى الإطلاق في أربع خطوات واضحة', en: 'From initial brief to ad-ready masters in four steps.' },
  },
  testimonials: {
    kicker: { ar: 'القنوات الرسمية وسياسة العمل', en: 'Official Profile & Working Terms' },
    title: {
      ar: 'القنوات الرسمية وسياسة التعديلات — Fatma | AIGC Creator',
      en: 'Fatma | AIGC Creator — Official contact channels, links & terms',
    },
  },
  packages: {
    kicker: { ar: 'الباقات والأسعار', en: 'Video Packages & Pricing' },
    title: { ar: 'باقات إعلانات الفيديو', en: 'AI Video Commercial Packages' },
    subtitle: {
      ar: 'الأسعار ابتدائية بالجنيه المصري، وتختلف حسب الفكرة وعدد المشاهد والتعليق الصوتي والمؤثرات المطلوبة.',
      en: 'Starting rates in Egyptian Pounds (EGP); final quotes depend on concept, scene count, voiceover, and visual effects.',
    },
    recommendedLabel: { ar: 'الأكثر اختياراً', en: 'Most Selected' },
    selectPackage: { ar: 'اختر هذه الباقة', en: 'Select This Package' },
  },
  faq: {
    kicker: { ar: 'الأسئلة الشائعة', en: 'Frequently Asked Questions' },
    title: {
      ar: 'كل ما تحتاج معرفته قبل بدء مشروعك',
      en: 'Clear answers before starting your project',
    },
    subtitle: {
      ar: 'تفاصيل واضحة حول مدة التنفيذ والتسليم، طرق الدفع، التعديلات، وصيغ الملفات المستلمة.',
      en: 'Straightforward details on turnaround time, payments, revisions, and final file deliverables.',
    },
    cta: { ar: 'لديك استفسار آخر؟ تواصل معنا', en: 'Have another question? Contact us' },
  },
  contact: {
    kicker: { ar: 'تواصل معنا', en: 'Start a Collaboration' },
    title: {
      ar: 'شاركنا فكرتك لنبدأ التنفيذ — أخبرنا عن مشروعك القادم',
      en: 'Share your brand goals and upcoming campaign timeline.',
    },
    subtitle: {
      ar: 'يمكنك مراسلتي مباشرة عبر واتساب أو البريد الإلكتروني أو إرسال تفاصيل مشروعك من النموذج التالي.',
      en: 'Reach out directly via WhatsApp or email, or submit your project brief using the form.',
    },
    directTitle: { ar: 'بيانات التواصل والدفع والروابط الرسمية', en: 'Direct Channels, Payment & Official Links' },
    emailLabel: { ar: 'البريد الإلكتروني', en: 'Email' },
    whatsappLabel: { ar: 'واتساب', en: 'WhatsApp' },
    cashLabel: { ar: 'حساب الكاش وإنستا باي (للدفع)', en: 'Vodafone Cash & InstaPay (Payment)' },
    locationLabel: { ar: 'نطاق العمل', en: 'Coverage' },
    locationValue: { ar: 'مصر · العمل عن بُعد لجميع العملاء والأنشطة التجارية', en: 'Egypt · Remote creative production worldwide' },
    availabilityNote: {
      ar: 'ملاحظة: يُدفع 50% مقدماً لتأكيد الحجز وبدء التنفيذ، ويُستكمل الباقي قبل تسليم النسخة النهائية.',
      en: 'Note: A 50% deposit confirms booking and starts production; the remaining 50% is due prior to final delivery.',
    },
    form: {
      name: { ar: 'الاسم الكامل', en: 'Full Name' },
      namePlaceholder: { ar: 'مثال: أحمد محمود', en: 'e.g., Ahmed Mahmoud' },
      email: { ar: 'البريد الإلكتروني أو رقم واتساب', en: 'Email or WhatsApp Number' },
      emailPlaceholder: { ar: 'name@brand.com أو 01013308014', en: 'name@brand.com or +20 101 330 8014' },
      brand: { ar: 'اسم العلامة التجارية أو النشاط', en: 'Brand or Business Name' },
      brandPlaceholder: { ar: 'مثال: وادي البن البرازيلي', en: 'e.g., Wadi El-Bon Al-Brazili' },
      service: { ar: 'الخدمة أو الباقة المطلوبة', en: 'Requested Service or Package' },
      budget: { ar: 'الميزانية التقديرية', en: 'Estimated Budget' },
      details: { ar: 'نبذة عن المشروع والهدف الإعلاني', en: 'Project Brief & Campaign Goals' },
      detailsPlaceholder: {
        ar: 'اذكر نوع المنتج، المنصات المستهدفة، وموعد الإطلاق المطلوب...',
        en: 'Describe your product category, target ad platforms, and launch timeline...',
      },
      submit: { ar: 'إرسال طلب المشروع', en: 'Submit Project Brief' },
      successTitle: { ar: 'تم تجهيز تفاصيل مشروعك بنجاح', en: 'Your project brief is ready' },
      successBody: {
        ar: 'شكراً لتواصلك مع Fatma | AIGC Creator. تم حفظ تفاصيل طلبك ويمكنك أيضاً إرسالها مباشرة عبر واتساب على الرقم 01013308014 لسرعة الرد.',
        en: 'Thank you for reaching out to Fatma | AIGC Creator. Your brief has been recorded and you can also send it directly via WhatsApp (+20 101 330 8014).',
      },
      sendAnother: { ar: 'إرسال طلب جديد', en: 'Submit Another Brief' },
      errName: { ar: 'يرجى إدخال الاسم الكامل.', en: 'Please enter your full name.' },
      errContact: {
        ar: 'يرجى إدخال بريد إلكتروني صحيح أو رقم هاتف/واتساب صالح.',
        en: 'Please provide a valid email address or phone/WhatsApp number.',
      },
      errDetails: {
        ar: 'يرجى كتابة نبذة مختصرة عن المشروع (15 حرفاً على الأقل).',
        en: 'Please share a brief description of your project (at least 15 characters).',
      },
    },
  },
  footer: {
    rights: {
      ar: '© 2026 Fatma | AIGC Creator. جميع الحقوق محفوظة.',
      en: '© 2026 Fatma | AIGC Creator. All rights reserved.',
    },
    tagline: {
      ar: 'Fatma | AIGC Creator · رؤيتك وإبداعي وقوة الذكاء الاصطناعي',
      en: 'Fatma | AIGC Creator · Your vision, creativity, and AI power',
    },
  },
};
