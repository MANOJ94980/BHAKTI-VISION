import React, { useRef, useState } from 'react';
import { Upload, Sparkles, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { UploadedImageInfo } from '../../types/image';
import { DEMO_PORTRAITS, DemoPortrait } from '../../data/demoImages';

interface ImageUploaderProps {
  onImageSelected: (imageInfo: UploadedImageInfo) => void;
  maxSizeBytes?: number;
  className?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelected,
  maxSizeBytes = 15 * 1024 * 1024, // 15MB default
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    setErrorMessage(null);

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage('Please upload a valid image file (JPG, PNG, or WEBP).');
      return;
    }

    if (file.size > maxSizeBytes) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      const limitMB = (maxSizeBytes / (1024 * 1024)).toFixed(0);
      setErrorMessage(`The uploaded image is ${sizeMB}MB. Maximum permitted file size is ${limitMB}MB. Please choose a smaller photo.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const width = img.naturalWidth || img.width;
        const height = img.naturalHeight || img.height;
        const ratio = width / height;

        let aspectRatioLabel: '1:1' | '3:4' | '4:3' | '9:16' | '16:9' = '3:4';
        if (Math.abs(ratio - 1) < 0.15) aspectRatioLabel = '1:1';
        else if (ratio < 0.85) aspectRatioLabel = '3:4';
        else if (ratio > 1.2) aspectRatioLabel = '4:3';

        onImageSelected({
          id: `img_${Date.now()}`,
          dataUrl,
          mimeType: file.type,
          filename: file.name,
          fileSizeBytes: file.size,
          width,
          height,
          aspectRatioLabel,
          isDemo: false,
        });
      };
      img.src = dataUrl;
    };
    reader.onerror = () => {
      setErrorMessage('Failed to read image file. Please try another photograph.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const selectDemoPortrait = async (demo: DemoPortrait) => {
    setErrorMessage(null);
    try {
      // Fetch demo image as data URL for seamless processing
      const response = await fetch(demo.url);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelected({
          id: demo.id,
          dataUrl: reader.result as string,
          mimeType: 'image/jpeg',
          filename: `${demo.name.replace(/\s+/g, '_')}.jpg`,
          fileSizeBytes: blob.size,
          width: 800,
          height: 1000,
          aspectRatioLabel: '3:4',
          isDemo: true,
        });
      };
      reader.readAsDataURL(blob);
    } catch {
      // Fallback direct url if fetch is blocked
      onImageSelected({
        id: demo.id,
        dataUrl: demo.url,
        mimeType: 'image/jpeg',
        filename: `${demo.name.replace(/\s+/g, '_')}.jpg`,
        fileSizeBytes: 250000,
        width: 800,
        height: 1000,
        aspectRatioLabel: '3:4',
        isDemo: true,
      });
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Upload Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`relative group cursor-pointer border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all duration-300 ${
          isDragging
            ? 'border-amber-400 bg-amber-500/10 scale-[1.01]'
            : 'border-amber-500/30 hover:border-amber-400/60 bg-slate-900/50 hover:bg-slate-900/80'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h4 className="text-lg font-semibold text-white font-cinzel">
              Upload Your Portrait Photograph
            </h4>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Drag and drop your photo here, or click to browse.
            </p>
            <p className="text-xs text-amber-300/70 pt-1">
              Supports JPG, JPEG, PNG, WEBP (up to 15MB). Front-facing portraits with good lighting yield the best identity preservation.
            </p>
          </div>
        </div>

        {/* Ambient glow inside border */}
        <div className="absolute inset-0 rounded-3xl bg-radial-gradient pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="p-4 bg-red-500/15 border border-red-500/40 rounded-2xl flex items-start gap-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400 mt-0.5" />
          <div>
            <p className="font-medium">Upload Error</p>
            <p className="text-xs text-red-300/90 mt-0.5">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Demo Portraits Selection (Section 49) */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-200">
              Try Instantly With Demo Portraits
            </span>
          </div>
          <span className="text-[11px] text-slate-500">No upload required</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {DEMO_PORTRAITS.map((demo) => (
            <button
              key={demo.id}
              type="button"
              onClick={() => selectDemoPortrait(demo)}
              className="group relative flex flex-col items-center p-2 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-850 transition-all text-left overflow-hidden"
            >
              <div className="w-full aspect-square rounded-lg overflow-hidden relative mb-2 bg-slate-950">
                <img
                  src={demo.url}
                  alt={demo.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 backdrop-blur-sm text-[9px] text-amber-300 rounded font-medium">
                  Demo
                </span>
              </div>
              <span className="text-xs font-medium text-slate-200 group-hover:text-amber-300 truncate w-full">
                {demo.name}
              </span>
              <span className="text-[10px] text-slate-500 truncate w-full">
                {demo.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
