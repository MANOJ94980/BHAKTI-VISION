import React from 'react';
import { Trash2, RefreshCw, CheckCircle2, ShieldCheck, Maximize2 } from 'lucide-react';
import { UploadedImageInfo } from '../../types/image';
import { Button } from '../common/Button';

interface ImagePreviewProps {
  imageInfo: UploadedImageInfo;
  onRemove: () => void;
  onReplace: () => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageInfo,
  onRemove,
  onReplace,
}) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="bg-slate-900/80 border border-amber-500/25 rounded-3xl p-5 sm:p-6 shadow-xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row gap-6 items-center">
        {/* Main thumbnail preview */}
        <div className="relative group w-44 sm:w-52 aspect-[3/4] rounded-2xl overflow-hidden bg-slate-950 border border-amber-500/30 flex-shrink-0 shadow-lg">
          <img
            src={imageInfo.dataUrl}
            alt={imageInfo.filename}
            className="w-full h-full object-cover"
          />

          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-500/40 text-[10px] text-amber-300 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-amber-400" />
            Source Photo
          </div>

          {imageInfo.isDemo && (
            <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-amber-500/90 text-slate-950 text-[10px] font-bold">
              Demo Portrait
            </div>
          )}
        </div>

        {/* Metadata & Actions */}
        <div className="flex-1 w-full space-y-4 text-left">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] uppercase font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 rounded-full">
                Primary Identity Source
              </span>
              <span className="text-xs text-slate-400">
                {imageInfo.aspectRatioLabel || '3:4'} composition
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-semibold text-white mt-1.5 truncate">
              {imageInfo.filename}
            </h4>
          </div>

          {/* Details list */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <div>
              <span className="text-slate-500 block">Dimensions:</span>
              <span className="text-slate-200 font-medium">
                {imageInfo.width && imageInfo.height
                  ? `${imageInfo.width} × ${imageInfo.height} px`
                  : 'High Resolution'}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">File Size:</span>
              <span className="text-slate-200 font-medium">
                {formatFileSize(imageInfo.fileSizeBytes)}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Format:</span>
              <span className="text-slate-200 font-medium uppercase">
                {imageInfo.mimeType.replace('image/', '')}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Identity Engine:</span>
              <span className="text-amber-300 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Locked & Protected
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Your unique facial geometry, eye shape, nose contours, jawline, and natural skin tone will be preserved while crafting your devotional transformation.
          </p>

          {/* Replace / Remove Buttons */}
          <div className="flex flex-wrap gap-2.5 pt-1">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onReplace}
              icon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Replace Photo
            </Button>
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={onRemove}
              icon={<Trash2 className="w-3.5 h-3.5" />}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
