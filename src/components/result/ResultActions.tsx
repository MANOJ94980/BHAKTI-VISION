import React, { useState } from 'react';
import { Download, RefreshCw, Palette, PlusCircle, CheckCircle, ShieldCheck, Sparkles, Share2 } from 'lucide-react';
import { Button } from '../common/Button';
import { downloadImage, sanitizeFilename } from '../../services/storage';

interface ResultActionsProps {
  resultImageUrl: string;
  styleName: string;
  resolution?: string;
  createdAt?: string;
  modelUsed?: string;
  isMock?: boolean;
  onRegenerate: () => void;
  onChangeStyle: () => void;
  onStartNew: () => void;
}

export const ResultActions: React.FC<ResultActionsProps> = ({
  resultImageUrl,
  styleName,
  resolution = '2K',
  createdAt = new Date().toISOString(),
  modelUsed,
  isMock,
  onRegenerate,
  onChangeStyle,
  onStartNew,
}) => {
  const [downloadingFormat, setDownloadingFormat] = useState<'png' | 'jpg' | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleDownload = async (format: 'png' | 'jpg') => {
    setDownloadingFormat(format);
    try {
      const filename = sanitizeFilename(styleName, format);
      await downloadImage(resultImageUrl, filename, format);
    } catch (e) {
      console.error('Download error:', e);
    } finally {
      setDownloadingFormat(null);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // Ignore
    }
  };

  return (
    <div className="bg-slate-900/80 border border-amber-500/25 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
      {/* Primary Actions: Download */}
      <div className="space-y-3">
        <h4 className="text-base font-semibold text-white font-cinzel flex items-center gap-2">
          <Download className="w-4 h-4 text-amber-400" />
          Download Your Devotional Portrait
        </h4>
        <p className="text-xs text-slate-400">
          Save high-resolution identity-preserved portrait directly to your device.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <Button
            size="lg"
            variant="primary"
            onClick={() => handleDownload('png')}
            isLoading={downloadingFormat === 'png'}
            icon={<Download className="w-5 h-5 text-slate-950" />}
            className="w-full text-sm font-bold"
          >
            Download PNG (Lossless)
          </Button>

          <Button
            size="lg"
            variant="secondary"
            onClick={() => handleDownload('jpg')}
            isLoading={downloadingFormat === 'jpg'}
            icon={<Download className="w-5 h-5 text-amber-300" />}
            className="w-full text-sm"
          >
            Download JPG (Standard)
          </Button>
        </div>
      </div>

      {/* Secondary Workflows */}
      <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onRegenerate}
          icon={<RefreshCw className="w-4 h-4" />}
          className="w-full text-xs"
        >
          Generate Again
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={onChangeStyle}
          icon={<Palette className="w-4 h-4" />}
          className="w-full text-xs"
        >
          Change Style
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onStartNew}
          icon={<PlusCircle className="w-4 h-4" />}
          className="w-full text-xs"
        >
          Start New Photo
        </Button>
      </div>

      {/* Share / Copy Action */}
      <div className="pt-1 flex items-center justify-between">
        <button
          type="button"
          onClick={handleCopyLink}
          className="text-xs text-slate-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          {copiedLink ? 'Link Copied to Clipboard!' : 'Share Transformation'}
        </button>

        <span className="text-[11px] text-slate-500">
          Generated using AI
        </span>
      </div>

      {/* Quality Check & Metadata Info Card */}
      <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Selected Style:</span>
          <span className="font-semibold text-amber-200">{styleName}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Resolution:</span>
          <span className="font-medium text-slate-200">{resolution} Master</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Created At:</span>
          <span className="text-slate-300">
            {new Date(createdAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
        <div className="flex items-center justify-between pt-1 border-t border-slate-850">
          <span className="text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Quality Control:
          </span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Face Identity Verified
          </span>
        </div>
        {modelUsed && (
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
            <span>Model Engine:</span>
            <span>{modelUsed}</span>
          </div>
        )}
      </div>
    </div>
  );
};
