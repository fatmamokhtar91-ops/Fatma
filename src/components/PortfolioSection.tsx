import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Pause,
  Play,
  RotateCcw,
  SlidersHorizontal,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import {
  Language,
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_CONTENT_TYPES,
  PORTFOLIO_WORKS,
  PortfolioCategory,
  PortfolioContentType,
  PortfolioWork,
  UI_COPY,
} from '../data/portfolioData';
import {
  clearAllStoredVideos,
  deleteStoredVideo,
  loadAllStoredVideos,
  saveStoredVideo,
} from '../utils/videoStore';
import { EditorialImage } from './EditorialImage';
import { GoogleDriveVideoSync } from './GoogleDriveVideoSync';
import { Reveal } from './Reveal';

interface PortfolioSectionProps {
  lang: Language;
  onRequestSimilar: (serviceKey: string, referenceTitle: string) => void;
}

interface PortfolioVideoPlayerProps {
  work: PortfolioWork;
  lang: Language;
  localUrl?: string;
  hasFailed?: boolean;
  onVideoError: (workId: string) => void;
  onVideoReady: (workId: string) => void;
  onSelectLocalVideo: (workId: string, file: File) => void;
  onOpenLightbox?: () => void;
  compact?: boolean;
}

const PREVIEW_DURATION_SEC = 12;

function formatSeconds(sec: number): string {
  const whole = Math.max(0, Math.min(PREVIEW_DURATION_SEC, Math.floor(sec)));
  return `0:${whole.toString().padStart(2, '0')}`;
}

const PortfolioVideoPlayer: React.FC<PortfolioVideoPlayerProps> = ({
  work,
  lang,
  localUrl,
  hasFailed,
  onVideoError,
  onVideoReady,
  onSelectLocalVideo,
  onOpenLightbox,
  compact = true,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const isRtl = lang === 'ar';
  const activeSrc = localUrl || work.video;
  const showFallbackPoster = Boolean(hasFailed && !localUrl);

  useEffect(() => {
    if (!showFallbackPoster || !isPlaying) return;
    const timer = window.setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 0.1;
        return next >= PREVIEW_DURATION_SEC ? 0 : next;
      });
    }, 100);
    return () => window.clearInterval(timer);
  }, [showFallbackPoster, isPlaying]);

  useEffect(() => {
    if (!showFallbackPoster) {
      setIsPlaying(false);
      setElapsed(0);
    }
  }, [showFallbackPoster, work.id]);

  const progressPercent = (elapsed / PREVIEW_DURATION_SEC) * 100;

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setElapsed(ratio * PREVIEW_DURATION_SEC);
  };

  return (
    <div className="relative w-full aspect-[9/16] bg-[#121211] overflow-hidden select-none">
      {!showFallbackPoster ? (
        <video
          key={activeSrc}
          src={activeSrc}
          poster={work.poster}
          controls
          playsInline
          preload="metadata"
          aria-label={work.imageAlt[lang]}
          onLoadedData={() => onVideoReady(work.id)}
          onError={() => onVideoError(work.id)}
          className="w-full h-full object-cover bg-[#121211] transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <div
          onClick={() => setIsPlaying((prev) => !prev)}
          className="relative w-full h-full cursor-pointer"
        >
          <EditorialImage
            src={work.poster}
            alt={work.imageAlt[lang]}
            fallbackTitle={work.title[lang]}
            className={`w-full h-full object-cover transition-transform duration-300 ease-out ${
              isPlaying ? 'animate-reel-pan' : 'group-hover:scale-[1.03]'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/25 pointer-events-none" />

          {/* Center Play Button when Paused */}
          {!isPlaying && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(true);
              }}
              aria-label={isRtl ? `تشغيل معاينة ${work.title.ar}` : `Play preview for ${work.title.en}`}
              className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#121211]/85 hover:bg-[#DFB962] text-[#DFB962] hover:text-[#121211] border border-[#DFB962]/70 flex items-center justify-center shadow-lg transition-all duration-150 hover:scale-105 cursor-pointer"
            >
              <Play className="w-6 h-6 fill-current ms-0.5" />
            </button>
          )}

          {/* Bottom Interactive Motion Player Controls */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-0 inset-x-0 z-10 bg-black/85 backdrop-blur-xs px-3 py-2.5 text-white border-t border-white/10"
          >
            {/* Interactive Seek Progress Track */}
            <div
              role="slider"
              tabIndex={0}
              aria-label={isRtl ? 'شريط التقدم' : 'Preview progress'}
              aria-valuemin={0}
              aria-valuemax={PREVIEW_DURATION_SEC}
              aria-valuenow={Math.round(elapsed)}
              onClick={handleSeek}
              dir="ltr"
              className="w-full h-1.5 bg-white/25 rounded-full overflow-hidden cursor-pointer mb-2"
            >
              <div
                className="h-full bg-[#DFB962] transition-[width] duration-100 ease-linear"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5" dir="ltr">
                <button
                  type="button"
                  onClick={() => setIsPlaying((prev) => !prev)}
                  aria-label={
                    isPlaying
                      ? isRtl
                        ? 'إيقاف مؤقت'
                        : 'Pause'
                      : isRtl
                        ? 'تشغيل'
                        : 'Play'
                  }
                  className="inline-flex items-center justify-center w-7 h-7 rounded bg-white/15 hover:bg-[#DFB962] text-white hover:text-[#121211] transition-colors cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setElapsed(0);
                    setIsPlaying(true);
                  }}
                  aria-label={isRtl ? 'إعادة التشغيل' : 'Restart'}
                  className="inline-flex items-center justify-center w-7 h-7 rounded bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <span
                  className="text-[11px] text-white/85 tabular-nums ms-1"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {formatSeconds(elapsed)} / 0:12
                </span>
              </div>

              <span
                className="text-[11px] text-white/75 tabular-nums whitespace-nowrap shrink-0"
                style={{ fontFamily: 'var(--font-mono)' }}
                dir="ltr"
              >
                {work.format}
              </span>
            </div>
          </div>
        </div>
      )}

      {compact && onOpenLightbox && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenLightbox();
          }}
          aria-label={isRtl ? `عرض تفاصيل ${work.title.ar}` : `Inspect ${work.title.en}`}
          className="absolute top-3 end-3 z-10 inline-flex items-center justify-center w-9 h-9 rounded-md bg-black/70 text-[#DFB962] hover:text-[#121211] border border-white/15 backdrop-blur-xs hover:bg-[#DFB962] transition-colors duration-150 cursor-pointer"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  lang,
  onRequestSimilar,
}) => {
  const [activeContentType, setActiveContentType] = useState<PortfolioContentType>('all');
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('all');
  const [selectedWork, setSelectedWork] = useState<PortfolioWork | null>(null);
  const [showMediaManager, setShowMediaManager] = useState(false);
  const [failedVideos, setFailedVideos] = useState<Record<string, boolean>>({});
  const [readyVideos, setReadyVideos] = useState<Record<string, boolean>>({});
  const [localVideoUrls, setLocalVideoUrls] = useState<Record<string, string>>({});
  const localVideoUrlsRef = useRef<Record<string, string>>({});

  const isRtl = lang === 'ar';

  useEffect(() => {
    localVideoUrlsRef.current = localVideoUrls;
  }, [localVideoUrls]);

  useEffect(() => {
    let active = true;
    loadAllStoredVideos(PORTFOLIO_WORKS.map((w) => w.id)).then((stored) => {
      if (!active) {
        Object.values(stored).forEach((url) => URL.revokeObjectURL(url));
        return;
      }
      if (Object.keys(stored).length > 0) {
        setLocalVideoUrls(stored);
        setFailedVideos((prev) => {
          const next = { ...prev };
          for (const id of Object.keys(stored)) {
            next[id] = false;
          }
          return next;
        });
      }
    });

    return () => {
      active = false;
      Object.values(localVideoUrlsRef.current).forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, []);

  const filteredWorks = PORTFOLIO_WORKS.filter((item) => {
    const matchesType =
      activeContentType === 'all' || item.contentTypes.includes(activeContentType);
    const matchesCategory =
      activeCategory === 'all' || item.category === activeCategory;
    return matchesType && matchesCategory;
  });

  const hasActiveFilter = activeContentType !== 'all' || activeCategory !== 'all';

  const resetFilters = () => {
    setActiveContentType('all');
    setActiveCategory('all');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedWork) return;
      if (e.key === 'Escape') {
        setSelectedWork(null);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const list = filteredWorks.some((w) => w.id === selectedWork.id)
          ? filteredWorks
          : PORTFOLIO_WORKS;
        const currentIndex = list.findIndex((w) => w.id === selectedWork.id);
        if (currentIndex === -1) return;
        const step = e.key === 'ArrowRight' ? 1 : -1;
        const nextIndex = (currentIndex + step + list.length) % list.length;
        setSelectedWork(list[nextIndex]);
      }
    };

    if (selectedWork) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedWork, filteredWorks]);

  const handleVideoError = (workId: string) => {
    setFailedVideos((prev) => (prev[workId] ? prev : { ...prev, [workId]: true }));
  };

  const handleVideoReady = (workId: string) => {
    setReadyVideos((prev) => (prev[workId] ? prev : { ...prev, [workId]: true }));
  };

  const resolveWorkIdForFile = (fileName: string): string | undefined => {
    const cleanName = fileName.replace(/\.[^.]+$/, '');

    // 1. Match descriptive keywords first to prevent scrambling regardless of filename numbers
    const keywordRules: { id: string; pattern: RegExp }[] = [
      { id: 'wadi-coffee-ad', pattern: /coffee|wadi|bon|قهوة|وادي|بن/i },
      { id: 'luxury-desserts-ad', pattern: /dessert|sweet|sinna|cinn|حلو|سينابون/i },
      { id: 'strawberry-jam-ad', pattern: /jam|straw|vitrac|مربى|فراولة|فيتراك/i },
      { id: 'bakery-pastries-ad', pattern: /bakery|pastry|pastries|bread|croissant|مخبز|معجنات/i },
      { id: 'luxury-perfume-ad', pattern: /perfume|laurence|scent|fragrance|عطر/i },
      { id: 'fried-chicken-ad', pattern: /chicken|fried|crispy|restaurant|فراخ|دجاج|مطعم/i },
    ];

    for (const rule of keywordRules) {
      if (rule.pattern.test(cleanName)) {
        return rule.id;
      }
    }

    // 2. Match explicit video-1..6 or leading/trailing slot digits (avoids date numbers like 2026-03-11)
    const explicitMatch =
      cleanName.match(/video[-_ ]?([1-6])$/i) ||
      cleanName.match(/^0?([1-6])(?:[-_. ]|$)/) ||
      cleanName.match(/(?:^|[^0-9])([1-6])$/);

    if (explicitMatch) {
      const index = Number(explicitMatch[1]) - 1;
      return PORTFOLIO_WORKS[index]?.id;
    }

    return undefined;
  };

  const handleSelectLocalVideo = (workId: string, file: Blob) => {
    const objectUrl = URL.createObjectURL(file);
    void saveStoredVideo(workId, file);
    setLocalVideoUrls((prev) => {
      if (prev[workId]) {
        URL.revokeObjectURL(prev[workId]);
      }
      return { ...prev, [workId]: objectUrl };
    });
    setFailedVideos((prev) => ({ ...prev, [workId]: false }));
    setReadyVideos((prev) => ({ ...prev, [workId]: true }));
  };

  const handleRemoveLocalVideo = (workId: string) => {
    void deleteStoredVideo(workId);
    setLocalVideoUrls((prev) => {
      if (prev[workId]) {
        URL.revokeObjectURL(prev[workId]);
      }
      const next = { ...prev };
      delete next[workId];
      return next;
    });
    setReadyVideos((prev) => ({ ...prev, [workId]: false }));
    setFailedVideos((prev) => ({ ...prev, [workId]: true }));
  };

  const handleClearAllVideos = () => {
    void clearAllStoredVideos();
    Object.values(localVideoUrlsRef.current).forEach((url) => {
      URL.revokeObjectURL(url);
    });
    setLocalVideoUrls({});
    setReadyVideos({});
    setFailedVideos({});
  };

  const handleSelectMultipleVideos = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList);
    const assigned = new Map<string, File>();
    const unassignedFiles: File[] = [];

    for (const file of files) {
      const targetId = resolveWorkIdForFile(file.name);
      if (targetId && !assigned.has(targetId)) {
        assigned.set(targetId, file);
      } else {
        unassignedFiles.push(file);
      }
    }

    for (const work of PORTFOLIO_WORKS) {
      if (!assigned.has(work.id) && unassignedFiles.length > 0) {
        const nextFile = unassignedFiles.shift();
        if (nextFile) {
          assigned.set(work.id, nextFile);
        }
      }
    }

    assigned.forEach((file, workId) => {
      handleSelectLocalVideo(workId, file);
    });
  };

  const loadedCount = PORTFOLIO_WORKS.filter(
    (work) => Boolean(localVideoUrls[work.id] || readyVideos[work.id])
  ).length;
  const savedLocalCount = Object.keys(localVideoUrls).length;

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (!selectedWork) return;
    const list = filteredWorks.some((w) => w.id === selectedWork.id)
      ? filteredWorks
      : PORTFOLIO_WORKS;
    const idx = list.findIndex((w) => w.id === selectedWork.id);
    if (idx === -1) return;
    const delta = direction === 'next' ? 1 : -1;
    const nextIdx = (idx + delta + list.length) % list.length;
    setSelectedWork(list[nextIdx]);
  };

  return (
    <section id="portfolio" className="py-16 lg:py-24 border-t border-[#E6E1D6] bg-white">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E6E1D6]">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold text-[#52504B] mb-3 inline-block border-b border-[#C5A048] pb-1">
                {UI_COPY.portfolio.kicker[lang]}
              </p>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#121211]">
                {UI_COPY.portfolio.title[lang]}
              </h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#52504B]">
                {UI_COPY.portfolio.subtitle[lang]}
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs sm:text-sm text-[#52504B] shrink-0">
              <span className="tabular-nums font-medium text-[#121211]">
                {isRtl
                  ? `عرض ${filteredWorks.length} من ${PORTFOLIO_WORKS.length} أعمال`
                  : `Showing ${filteredWorks.length} of ${PORTFOLIO_WORKS.length} works`}
              </span>
              {hasActiveFilter && (
                <>
                  <span aria-hidden="true">·</span>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="font-semibold text-[#121211] hover:underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {isRtl ? 'إعادة ضبط الفلترة' : 'Reset Filters'}
                  </button>
                </>
              )}
            </div>
          </div>
        </Reveal>

        {/* Dedicated Video Filter Bar (By Content Type & Industry Sector) */}
        <div className="mt-7 bg-[#FAF8F4] border border-[#E6E1D6] rounded-xl p-4 sm:p-5 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Primary Filter: Video / Content Type */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#121211] whitespace-nowrap shrink-0">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#121211]" aria-hidden="true" />
                <span>{isRtl ? 'تصفية حسب النوع:' : 'Filter by Type:'}</span>
              </div>

              <div
                role="tablist"
                aria-label={isRtl ? 'تصفية الفيديوهات حسب النوع' : 'Filter videos by content type'}
                className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EFECE4] rounded-lg"
              >
                {PORTFOLIO_CONTENT_TYPES.map((typeOption) => {
                  const isActive = activeContentType === typeOption.id;
                  const count =
                    typeOption.id === 'all'
                      ? PORTFOLIO_WORKS.length
                      : PORTFOLIO_WORKS.filter((w) =>
                          w.contentTypes.includes(typeOption.id as Exclude<PortfolioContentType, 'all'>)
                        ).length;

                  return (
                    <button
                      key={typeOption.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveContentType(typeOption.id)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs sm:text-sm font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-[#121211] text-[#DFB962]'
                          : 'text-[#52504B] hover:text-[#121211] hover:bg-white/75'
                      }`}
                    >
                      <span>{typeOption.label[lang]}</span>
                      <span
                        className={`text-[11px] tabular-nums ${
                          isActive ? 'text-[#DFB962]/85' : 'text-[#6E695E]'
                        }`}
                      >
                        ({count})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Secondary Filter: Industry / Sector */}
            <div
              role="tablist"
              aria-label={isRtl ? 'تصفية الأعمال حسب المجال' : 'Filter portfolio by sector'}
              className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EFECE4] rounded-lg self-start lg:self-auto"
            >
              {PORTFOLIO_CATEGORIES.map((category) => {
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-3 py-2 min-h-[40px] text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#121211] text-white'
                        : 'text-[#52504B] hover:text-[#121211] hover:bg-white/75'
                    }`}
                  >
                    {category.label[lang]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Discreet Studio Media Manager Toggle */}
          <div className="pt-3 border-t border-[#E6E1D6] flex flex-wrap items-center justify-between gap-3 text-xs text-[#6E695E]">
            <span>
              {loadedCount === PORTFOLIO_WORKS.length
                ? isRtl
                  ? 'جميع الفيديوهات الستة مفعّلة بالصوت والصورة.'
                  : 'All six commercial reels active with full audio.'
                : isRtl
                  ? 'اختر أي فيديو لتشغيل المعاينة التفاعلية أو تعيين ملف MP4 لكل عمل بالاسم.'
                  : 'Select any reel to play the preview or assign an MP4 file directly by project name.'}
            </span>

            <button
              type="button"
              onClick={() => setShowMediaManager((prev) => !prev)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#121211] underline-offset-4 hover:underline cursor-pointer whitespace-nowrap shrink-0"
            >
              <Upload className="w-3.5 h-3.5" aria-hidden="true" />
              <span>
                {showMediaManager
                  ? isRtl
                    ? 'إخفاء ربط ملفات الفيديو'
                    : 'Hide Video Slot Manager'
                  : isRtl
                    ? `ربط وترتيب الفيديوهات (${loadedCount}/${PORTFOLIO_WORKS.length})`
                    : `Assign & Order Videos (${loadedCount}/${PORTFOLIO_WORKS.length})`}
              </span>
            </button>
          </div>

          {showMediaManager && (
            <div className="pt-4 border-t border-[#E6E1D6] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-2.5 text-xs text-[#52504B] leading-relaxed">
                  {loadedCount === PORTFOLIO_WORKS.length ? (
                    <CheckCircle2 className="w-4 h-4 text-[#121211] shrink-0 mt-0.5" />
                  ) : (
                    <Play className="w-4 h-4 text-[#121211] shrink-0 mt-0.5" />
                  )}
                  <span>
                    {isRtl
                      ? 'عيّن كل ملف فيديو MP4 مباشرة أمام اسمه الصحيح لمنع أي تداخل، أو ارفع الملفات دفعة واحدة (video-1..video-6).'
                      : 'Assign each MP4 file directly to its matching project row below, or batch-upload named files (video-1..video-6).'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {savedLocalCount > 0 && (
                    <button
                      type="button"
                      onClick={handleClearAllVideos}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-[#121211] bg-white hover:bg-[#EFECE4] border border-[#E6E1D6] rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{isRtl ? 'مسح وإعادة ضبط الكل' : 'Reset Saved Videos'}</span>
                    </button>
                  )}

                  <label className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#121211] hover:bg-[#DFB962] hover:text-[#121211] rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0">
                    <Upload className="w-3.5 h-3.5 shrink-0" />
                    <span>{isRtl ? 'اختيار عدة ملفات MP4' : 'Batch Select MP4s'}</span>
                    <input
                      type="file"
                      multiple
                      accept="video/*"
                      className="sr-only"
                      onChange={(e) => {
                        handleSelectMultipleVideos(e.target.files);
                        e.target.value = '';
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Per-Work Explicit Assignment Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {PORTFOLIO_WORKS.map((work) => {
                  const isAssigned = Boolean(localVideoUrls[work.id] || readyVideos[work.id]);
                  return (
                    <div
                      key={work.id}
                      className="flex items-center justify-between gap-3 p-2.5 bg-white border border-[#E6E1D6] rounded-lg"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={work.poster}
                          alt={work.title[lang]}
                          className="w-10 h-14 object-cover rounded border border-[#E6E1D6] shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#121211] truncate">
                            {work.title[lang]}
                          </p>
                          <p className="text-[11px] text-[#6E695E] truncate mt-0.5" dir="ltr">
                            {work.videoFileName} · {isAssigned ? (isRtl ? 'مفعّل' : 'Active') : (isRtl ? 'بوستر' : 'Poster')}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <label className="inline-flex items-center px-2.5 py-1.5 text-[11px] font-semibold text-[#121211] bg-[#EFECE4] hover:bg-[#DFB962] rounded transition-colors cursor-pointer whitespace-nowrap">
                          <span>
                            {localVideoUrls[work.id]
                              ? isRtl
                                ? 'تغيير'
                                : 'Change'
                              : isRtl
                                ? 'تعيين'
                                : 'Assign'}
                          </span>
                          <input
                            type="file"
                            accept="video/*"
                            className="sr-only"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleSelectLocalVideo(work.id, file);
                              }
                              e.target.value = '';
                            }}
                          />
                        </label>
                        {localVideoUrls[work.id] && (
                          <button
                            type="button"
                            onClick={() => handleRemoveLocalVideo(work.id)}
                            aria-label={isRtl ? `إزالة فيديو ${work.title.ar}` : `Remove video ${work.title.en}`}
                            className="inline-flex items-center justify-center w-7 h-7 text-[#52504B] hover:text-[#121211] hover:bg-[#EFECE4] rounded transition-colors cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <GoogleDriveVideoSync
                lang={lang}
                resolveWorkIdForFile={resolveWorkIdForFile}
                onAssignDriveBlob={handleSelectLocalVideo}
              />
            </div>
          )}
        </div>

        {/* 6 Vertical 9:16 Video Commercial Works Grid */}
        {filteredWorks.length === 0 ? (
          <div className="mt-10 bg-[#FAF8F4] border border-[#E6E1D6] rounded-xl p-10 text-center space-y-4">
            <p className="text-base font-semibold text-[#121211]">
              {isRtl
                ? 'لا توجد أعمال تطابق هذا التصنيف المزدوج حالياً.'
                : 'No video works match this combined filter yet.'}
            </p>
            <p className="text-sm text-[#52504B]">
              {isRtl
                ? 'يمكنك إعادة ضبط الفلترة لعرض جميع الفيديوهات الستة.'
                : 'Reset filters to browse all six commercial video works.'}
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#121211] hover:bg-[#DFB962] hover:text-[#121211] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {isRtl ? 'عرض جميع الأعمال' : 'Show All Works'}
            </button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredWorks.map((work, idx) => (
              <Reveal key={work.id} delay={(idx % 3) * 0.06} className="flex">
                <article
                  className="w-full group flex flex-col justify-between bg-[#FAF8F4] border border-[#E6E1D6] rounded-xl overflow-hidden transition-colors duration-200 hover:border-[#C5A048]"
                >
                  <div>
                    <PortfolioVideoPlayer
                      work={work}
                      lang={lang}
                      localUrl={localVideoUrls[work.id]}
                      hasFailed={failedVideos[work.id]}
                      onVideoError={handleVideoError}
                      onVideoReady={handleVideoReady}
                      onSelectLocalVideo={handleSelectLocalVideo}
                      onOpenLightbox={() => setSelectedWork(work)}
                    />

                    <div className="p-6">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#6E695E]">
                        <div className="flex flex-wrap items-center gap-2 min-w-0">
                          <span
                            className={
                              work.featured
                                ? 'font-semibold text-[#121211]'
                                : 'font-medium text-[#52504B]'
                            }
                          >
                            {work.badge[lang]}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="truncate">{work.contentTypeLabel[lang]}</span>
                        </div>
                      </div>

                      <h3 className="mt-2.5 text-lg font-bold leading-[1.38] text-[#121211] line-clamp-1">
                        <button
                          type="button"
                          onClick={() => setSelectedWork(work)}
                          className="text-start hover:underline underline-offset-4 cursor-pointer w-full truncate"
                          title={work.title[lang]}
                        >
                          {work.title[lang]}
                        </button>
                      </h3>

                      <p className="mt-2 text-sm leading-[1.7] text-[#52504B] line-clamp-2 min-h-[2.975rem]">
                        {work.summary[lang]}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-4 border-t border-[#E6E1D6] flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onRequestSimilar(work.serviceKey, work.title[lang])}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#121211] hover:bg-[#DFB962] hover:text-[#121211] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>{UI_COPY.portfolio.requestSimilar[lang]}</span>
                      {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedWork(work)}
                      className="text-xs font-semibold text-[#52504B] hover:text-[#121211] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {UI_COPY.portfolio.viewDetails[lang]}
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Vertical Video Lightbox Modal */}
      {selectedWork && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedWork(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#FAF8F4] text-[#121211] rounded-xl border border-[#E6E1D6] overflow-hidden my-auto max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between gap-4 px-5 sm:px-7 py-4 border-b border-[#E6E1D6] bg-white shrink-0">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#52504B]">
                <span className="font-semibold text-[#121211]">
                  {selectedWork.badge[lang]}
                </span>
                <span aria-hidden="true">·</span>
                <span>{selectedWork.contentTypeLabel[lang]}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedWork.categoryLabel[lang]}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{selectedWork.year}</span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => navigateLightbox('prev')}
                  aria-label={isRtl ? 'المشروع السابق' : 'Previous project'}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-[#E6E1D6] text-[#121211] hover:bg-[#EFECE4] transition-colors cursor-pointer"
                >
                  {isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => navigateLightbox('next')}
                  aria-label={isRtl ? 'المشروع التالي' : 'Next project'}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-[#E6E1D6] text-[#121211] hover:bg-[#EFECE4] transition-colors cursor-pointer"
                >
                  {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedWork(null)}
                  aria-label={isRtl ? 'إغلاق' : 'Close viewer'}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-[#121211] text-white hover:bg-[#DFB962] hover:text-[#121211] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="overflow-y-auto grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-6 bg-[#121211] flex items-center justify-center p-5 sm:p-7">
                <div className="w-full max-w-[300px] rounded-lg overflow-hidden border border-[#DFB962]/25">
                  <PortfolioVideoPlayer
                    work={selectedWork}
                    lang={lang}
                    localUrl={localVideoUrls[selectedWork.id]}
                    hasFailed={failedVideos[selectedWork.id]}
                    onVideoError={handleVideoError}
                    onVideoReady={handleVideoReady}
                    onSelectLocalVideo={handleSelectLocalVideo}
                    compact={false}
                  />
                </div>
              </div>

              <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between gap-6">
                <div className="space-y-6">
                  <div>
                    <h3 id="lightbox-title" className="text-xl sm:text-2xl font-bold text-[#121211]">
                      {selectedWork.title[lang]}
                    </h3>
                    <p className="mt-2 text-sm text-[#52504B]">
                      {selectedWork.summary[lang]}
                    </p>
                  </div>

                  {/* Technical Deliverable Specs */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#E6E1D6]">
                    <div>
                      <div className="text-xs text-[#6E695E]">
                        {isRtl ? 'العميل / التصنيف' : 'Client / Type'}
                      </div>
                      <div className="mt-1 text-sm font-semibold text-[#121211]">
                        {selectedWork.client[lang]}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-[#6E695E]">
                        {UI_COPY.portfolio.specsLabel[lang]}
                      </div>
                      <div
                        className="mt-1 text-sm font-semibold text-[#121211] tabular-nums"
                        style={{ fontFamily: 'var(--font-mono)' }}
                        dir="ltr"
                      >
                        {selectedWork.format}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-xs text-[#6E695E]">
                        {UI_COPY.portfolio.resultsLabel[lang]}
                      </div>
                      <div className="mt-1 text-xs sm:text-sm text-[#121211]" dir="ltr">
                        {selectedWork.duration} · {selectedWork.platform}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-[#121211] mb-1.5">
                      {UI_COPY.portfolio.challengeLabel[lang]}
                    </h4>
                    <p className="text-sm leading-relaxed text-[#52504B]">
                      {selectedWork.challenge[lang]}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-[#121211] mb-1.5">
                      {UI_COPY.portfolio.executionLabel[lang]}
                    </h4>
                    <p className="text-sm leading-relaxed text-[#52504B]">
                      {selectedWork.execution[lang]}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const workToUse = selectedWork;
                    setSelectedWork(null);
                    onRequestSimilar(workToUse.serviceKey, workToUse.title[lang]);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#121211] hover:bg-[#DFB962] hover:text-[#121211] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>{UI_COPY.portfolio.requestSimilar[lang]}</span>
                  {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
