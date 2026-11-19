import React, { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import {
  Cloud,
  Download,
  ExternalLink,
  FolderOpen,
  LogOut,
  RefreshCw,
  Search,
  Sparkles,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { Language, PORTFOLIO_WORKS } from '../data/portfolioData';
import {
  deleteDriveFile,
  downloadDriveFileAsBlob,
  DriveFileItem,
  getDriveAccessToken,
  googleDriveSignIn,
  initDriveAuth,
  listDriveVideoFiles,
  logoutGoogleDrive,
  uploadVideoFileToDrive,
} from '../utils/googleDrive';
import { GoogleSignInButton } from './GoogleSignInButton';

interface GoogleDriveVideoSyncProps {
  lang: Language;
  resolveWorkIdForFile: (fileName: string) => string | undefined;
  onAssignDriveBlob: (workId: string, blob: Blob) => void;
}

type PendingAction =
  | { type: 'delete'; file: DriveFileItem }
  | { type: 'upload'; file: File };

function formatFileSize(bytesStr?: string): string {
  const bytes = Number(bytesStr);
  if (!Number.isFinite(bytes) || bytes <= 0) return '';
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const GoogleDriveVideoSync: React.FC<GoogleDriveVideoSyncProps> = ({
  lang,
  resolveWorkIdForFile,
  onAssignDriveBlob,
}) => {
  const isRtl = lang === 'ar';
  const [needsAuth, setNeedsAuth] = useState(true);
  const [driveUser, setDriveUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [driveFiles, setDriveFiles] = useState<DriveFileItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTargets, setSelectedTargets] = useState<Record<string, string>>({});
  const [busyFileId, setBusyFileId] = useState<string | null>(null);
  const [isMutating, setIsMutating] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);

  const loadFiles = async (query = searchQuery) => {
    if (!getDriveAccessToken()) {
      setNeedsAuth(true);
      return;
    }
    setIsLoadingFiles(true);
    setFeedback(null);
    try {
      const files = await listDriveVideoFiles(query);
      setDriveFiles(files);
      const initialTargets: Record<string, string> = {};
      for (const file of files) {
        const matched = resolveWorkIdForFile(file.name);
        initialTargets[file.id] = matched || PORTFOLIO_WORKS[0].id;
      }
      setSelectedTargets(initialTargets);
    } catch (err) {
      if (err instanceof Error && err.message === 'AUTH_REQUIRED') {
        setNeedsAuth(true);
      } else {
        setFeedback(
          isRtl
            ? 'تعذر قراءة ملفات الفيديو من Google Drive. يرجى المحاولة مرة أخرى.'
            : 'Unable to fetch video files from Google Drive. Please try again.'
        );
      }
    } finally {
      setIsLoadingFiles(false);
    }
  };

  useEffect(() => {
    const unsubscribe = initDriveAuth(
      (user) => {
        setDriveUser(user);
        setNeedsAuth(false);
      },
      () => {
        setDriveUser(null);
        setNeedsAuth(true);
        setDriveFiles([]);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setFeedback(null);
    try {
      const result = await googleDriveSignIn();
      setDriveUser(result.user);
      setNeedsAuth(false);
      await loadFiles('');
    } catch {
      setFeedback(
        isRtl
          ? 'لم يكتمل تسجيل الدخول عبر Google. يمكنك المحاولة مرة أخرى.'
          : 'Google sign-in did not complete. Please try again.'
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logoutGoogleDrive();
    setDriveUser(null);
    setNeedsAuth(true);
    setDriveFiles([]);
    setFeedback(null);
  };

  const handleImportFile = async (file: DriveFileItem, workId: string) => {
    setBusyFileId(file.id);
    setFeedback(null);
    try {
      const blob = await downloadDriveFileAsBlob(file.id);
      onAssignDriveBlob(workId, blob);
      const targetWork = PORTFOLIO_WORKS.find((w) => w.id === workId);
      setFeedback(
        isRtl
          ? `تم استيراد "${file.name}" وتعيينه إلى "${targetWork?.title.ar || workId}" بنجاح.`
          : `Imported "${file.name}" and assigned it to "${targetWork?.title.en || workId}".`
      );
    } catch (err) {
      if (err instanceof Error && err.message === 'AUTH_REQUIRED') {
        setNeedsAuth(true);
      } else {
        setFeedback(
          isRtl
            ? `تعذر تحميل "${file.name}" من Google Drive.`
            : `Failed to download "${file.name}" from Google Drive.`
        );
      }
    } finally {
      setBusyFileId(null);
    }
  };

  const handleAutoMatchImport = async () => {
    const matchedPairs: { file: DriveFileItem; workId: string }[] = [];
    const usedWorkIds = new Set<string>();

    for (const file of driveFiles) {
      const match = resolveWorkIdForFile(file.name);
      if (match && !usedWorkIds.has(match)) {
        usedWorkIds.add(match);
        matchedPairs.push({ file, workId: match });
      }
    }

    if (matchedPairs.length === 0) {
      setFeedback(
        isRtl
          ? 'لم يتم العثور على أسماء ملفات مطابقة تلقائياً (مثل coffee أو video-1..6). يمكنك التعيين يدوياً لكل فيديو.'
          : 'No automatic filename matches found (e.g., coffee or video-1..6). Assign each video manually below.'
      );
      return;
    }

    setIsLoadingFiles(true);
    setFeedback(null);
    try {
      for (const pair of matchedPairs) {
        const blob = await downloadDriveFileAsBlob(pair.file.id);
        onAssignDriveBlob(pair.workId, blob);
      }
      setFeedback(
        isRtl
          ? `تم استيراد ومطابقة ${matchedPairs.length} فيديو من Google Drive بنجاح.`
          : `Successfully matched and imported ${matchedPairs.length} video(s) from Google Drive.`
      );
    } catch (err) {
      if (err instanceof Error && err.message === 'AUTH_REQUIRED') {
        setNeedsAuth(true);
      } else {
        setFeedback(
          isRtl
            ? 'حدث خطأ أثناء الاستيراد التلقائي من Google Drive.'
            : 'An error occurred while auto-importing from Google Drive.'
        );
      }
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const executePendingAction = async () => {
    if (!pendingAction) return;
    setIsMutating(true);
    setFeedback(null);

    try {
      if (pendingAction.type === 'delete') {
        await deleteDriveFile(pendingAction.file.id);
        setDriveFiles((prev) => prev.filter((f) => f.id !== pendingAction.file.id));
        setFeedback(
          isRtl
            ? `تم حذف الملف "${pendingAction.file.name}" من Google Drive.`
            : `Deleted "${pendingAction.file.name}" from Google Drive.`
        );
      } else if (pendingAction.type === 'upload') {
        const uploaded = await uploadVideoFileToDrive(pendingAction.file);
        setDriveFiles((prev) => [uploaded, ...prev]);
        const matched = resolveWorkIdForFile(uploaded.name);
        setSelectedTargets((prev) => ({
          ...prev,
          [uploaded.id]: matched || PORTFOLIO_WORKS[0].id,
        }));
        setFeedback(
          isRtl
            ? `تم رفع "${uploaded.name}" إلى Google Drive بنجاح.`
            : `Uploaded "${uploaded.name}" to Google Drive.`
        );
      }
      setPendingAction(null);
    } catch (err) {
      if (err instanceof Error && err.message === 'AUTH_REQUIRED') {
        setNeedsAuth(true);
        setPendingAction(null);
      } else {
        setFeedback(
          isRtl
            ? 'تعذر تنفيذ العملية على Google Drive. يرجى التحقق من الصلاحيات والمحاولة مرة أخرى.'
            : 'Could not complete the Google Drive operation. Check permissions and try again.'
        );
      }
    } finally {
      setIsMutating(false);
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-[#E6E1D6] space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-[#E6E1D6] rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-md bg-[#121211] text-[#DFB962] flex items-center justify-center shrink-0">
            <Cloud className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#121211]">
              {isRtl ? 'مزامنة الفيديوهات من Google Drive' : 'Google Drive Video Library'}
            </h4>
            <p className="mt-0.5 text-xs text-[#52504B]">
              {needsAuth
                ? isRtl
                  ? 'سجّل الدخول بحساب Google لاستعراض فيديوهاتك واستيرادها مباشرة إلى أعمال المعرض.'
                  : 'Sign in with Google to browse your Drive videos and import them directly into portfolio slots.'
                : isRtl
                  ? `متصل بالحساب: ${driveUser?.email || driveUser?.displayName || 'Google Drive'}`
                  : `Connected as: ${driveUser?.email || driveUser?.displayName || 'Google Drive'}`}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {needsAuth ? (
            <GoogleSignInButton
              onClick={handleLogin}
              disabled={isLoggingIn}
              label={
                isLoggingIn
                  ? isRtl
                    ? 'جارٍ الاتصال...'
                    : 'Signing in...'
                  : 'Sign in with Google'
              }
            />
          ) : (
            <>
              <label className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#121211] hover:bg-[#DFB962] hover:text-[#121211] rounded-md transition-colors cursor-pointer whitespace-nowrap">
                <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{isRtl ? 'رفع فيديو إلى Drive' : 'Upload to Drive'}</span>
                <input
                  type="file"
                  accept="video/*"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setPendingAction({ type: 'upload', file });
                    }
                    e.target.value = '';
                  }}
                />
              </label>

              <button
                type="button"
                onClick={() => loadFiles(searchQuery)}
                disabled={isLoadingFiles}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#121211] bg-[#EFECE4] hover:bg-[#DFB962] rounded-md transition-colors cursor-pointer whitespace-nowrap"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${isLoadingFiles ? 'animate-spin' : ''}`}
                  aria-hidden="true"
                />
                <span>{isRtl ? 'تحديث' : 'Refresh'}</span>
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#52504B] hover:text-[#121211] border border-[#E6E1D6] rounded-md transition-colors cursor-pointer whitespace-nowrap"
              >
                <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{isRtl ? 'تسجيل الخروج' : 'Sign out'}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {feedback && (
        <div className="px-3.5 py-2.5 text-xs font-medium text-[#121211] bg-[#EFECE4] border border-[#C5A048]/60 rounded-md">
          {feedback}
        </div>
      )}

      {!needsAuth && (
        <div className="bg-white border border-[#E6E1D6] rounded-lg p-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void loadFiles(searchQuery);
              }}
              className="flex items-center gap-2 flex-1"
            >
              <div className="relative flex-1 max-w-sm">
                <Search
                  className="w-3.5 h-3.5 text-[#6E695E] absolute top-1/2 -translate-y-1/2 start-3 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isRtl ? 'ابحث باسم ملف الفيديو في Drive...' : 'Search Drive video filename...'
                  }
                  className="w-full ps-8 pe-3 py-2 text-xs bg-[#FAF8F4] border border-[#D6CFC2] rounded-md text-[#121211] placeholder:text-[#8C877B] focus:outline-none focus:border-[#121211]"
                />
              </div>
              <button
                type="submit"
                className="px-3.5 py-2 text-xs font-semibold text-[#121211] bg-[#EFECE4] hover:bg-[#DFB962] rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                {isRtl ? 'بحث' : 'Search'}
              </button>
            </form>

            {driveFiles.length > 0 && (
              <button
                type="button"
                onClick={handleAutoMatchImport}
                disabled={isLoadingFiles}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#DFB962] bg-[#121211] hover:bg-[#DFB962] hover:text-[#121211] rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{isRtl ? 'مطابقة واستيراد تلقائي' : 'Auto-Match & Import'}</span>
              </button>
            )}
          </div>

          {isLoadingFiles ? (
            <p className="py-6 text-center text-xs text-[#52504B]">
              {isRtl ? 'جارٍ تحميل الفيديوهات من Google Drive...' : 'Loading videos from Google Drive...'}
            </p>
          ) : driveFiles.length === 0 ? (
            <div className="py-6 text-center space-y-2">
              <FolderOpen className="w-6 h-6 text-[#6E695E] mx-auto" aria-hidden="true" />
              <p className="text-xs text-[#52504B]">
                {isRtl
                  ? 'لا توجد ملفات فيديو ظاهرة حالياً. يمكنك البحث أو رفع ملف جديد إلى Google Drive.'
                  : 'No video files found right now. Try refreshing or upload a video to Google Drive.'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#EAE5DA] max-h-72 overflow-y-auto">
              {driveFiles.map((file) => {
                const targetId = selectedTargets[file.id] || PORTFOLIO_WORKS[0].id;
                const isBusy = busyFileId === file.id;
                const sizeText = formatFileSize(file.size);
                return (
                  <div
                    key={file.id}
                    className="py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-2.5"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xs font-semibold text-[#121211] truncate" dir="ltr">
                          {file.name}
                        </span>
                        {file.webViewLink && (
                          <a
                            href={file.webViewLink}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={isRtl ? 'فتح في Drive' : 'Open in Drive'}
                            className="text-[#52504B] hover:text-[#121211] shrink-0"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                      {sizeText && (
                        <span className="text-[11px] text-[#6E695E] tabular-nums" dir="ltr">
                          {sizeText}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <select
                        value={targetId}
                        onChange={(e) =>
                          setSelectedTargets((prev) => ({ ...prev, [file.id]: e.target.value }))
                        }
                        aria-label={isRtl ? `اختر الخانة لملف ${file.name}` : `Select slot for ${file.name}`}
                        className="px-2.5 py-1.5 text-xs bg-[#FAF8F4] border border-[#D6CFC2] rounded text-[#121211] focus:outline-none focus:border-[#121211] max-w-[210px]"
                      >
                        {PORTFOLIO_WORKS.map((work) => (
                          <option key={work.id} value={work.id}>
                            {work.title[lang]}
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => handleImportFile(file, targetId)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#121211] hover:bg-[#DFB962] hover:text-[#121211] disabled:opacity-60 rounded transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <Download className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>
                          {isBusy
                            ? isRtl
                              ? 'جارٍ الاستيراد...'
                              : 'Importing...'
                            : isRtl
                              ? 'استيراد للخانة'
                              : 'Import to Slot'}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPendingAction({ type: 'delete', file })}
                        aria-label={isRtl ? `حذف ${file.name} من Drive` : `Delete ${file.name} from Drive`}
                        className="inline-flex items-center justify-center w-8 h-8 text-[#52504B] hover:text-[#121211] hover:bg-[#EFECE4] rounded transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Mandatory Explicit User Confirmation Modal before Mutating/Deleting Drive Data */}
      {pendingAction && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="drive-confirm-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4"
          onClick={() => !isMutating && setPendingAction(null)}
        >
          <div
            className="w-full max-w-md bg-[#FAF8F4] border border-[#E6E1D6] rounded-xl p-6 space-y-4 text-[#121211]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <h5 id="drive-confirm-title" className="text-base font-bold text-[#121211]">
                {pendingAction.type === 'delete'
                  ? isRtl
                    ? 'تأكيد حذف الملف من Google Drive'
                    : 'Confirm Delete from Google Drive'
                  : isRtl
                    ? 'تأكيد رفع الملف إلى Google Drive'
                    : 'Confirm Upload to Google Drive'}
              </h5>
              <button
                type="button"
                disabled={isMutating}
                onClick={() => setPendingAction(null)}
                aria-label={isRtl ? 'إلغاء' : 'Cancel'}
                className="text-[#52504B] hover:text-[#121211] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-[#52504B] leading-relaxed">
              {pendingAction.type === 'delete'
                ? isRtl
                  ? `هل أنتِ متأكدة من حذف الملف "${pendingAction.file.name}" نهائياً من Google Drive؟ لا يمكن التراجع عن هذه العملية.`
                  : `Are you sure you want to delete "${pendingAction.file.name}" from Google Drive? This action cannot be undone.`
                : isRtl
                  ? `سيتم رفع ملف الفيديو "${pendingAction.file.name}" إلى حسابك في Google Drive.`
                  : `Upload "${pendingAction.file.name}" to your connected Google Drive account?`}
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                disabled={isMutating}
                onClick={() => setPendingAction(null)}
                className="px-4 py-2 text-xs font-semibold text-[#121211] bg-white border border-[#E6E1D6] hover:bg-[#EFECE4] rounded-md transition-colors cursor-pointer"
              >
                {isRtl ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="button"
                disabled={isMutating}
                onClick={executePendingAction}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#121211] hover:bg-[#DFB962] hover:text-[#121211] disabled:opacity-60 rounded-md transition-colors cursor-pointer"
              >
                {isMutating
                  ? isRtl
                    ? 'جارٍ التنفيذ...'
                    : 'Processing...'
                  : pendingAction.type === 'delete'
                    ? isRtl
                      ? 'تأكيد الحذف'
                      : 'Confirm Delete'
                    : isRtl
                      ? 'تأكيد الرفع'
                      : 'Confirm Upload'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
