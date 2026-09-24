import React, { useRef } from 'react';
import { Plus, X, Shield, Info, Compass } from 'lucide-react';
import { FaceReferenceInfo } from '../../types/image';

interface ReferenceUploaderProps {
  references: FaceReferenceInfo[];
  onAddReference: (ref: FaceReferenceInfo) => void;
  onRemoveReference: (id: string) => void;
  onUpdateAngle: (id: string, angle: 'front' | 'left' | 'right' | 'other') => void;
}

export const ReferenceUploader: React.FC<ReferenceUploaderProps> = ({
  references,
  onAddReference,
  onRemoveReference,
  onUpdateAngle,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        onAddReference({
          id: `ref_${Date.now()}`,
          dataUrl,
          mimeType: file.type || 'image/jpeg',
          angle: 'front',
          label: file.name,
        });
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-base font-semibold text-white font-cinzel">
              Optional Identity Reference Photos
            </h4>
            <span className="text-[10px] uppercase font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
              Optional
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Additional reference photos can improve facial consistency and 3D angle alignment. Your primary photo remains the main source.
          </p>
        </div>

        {references.length < 3 && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 rounded-xl transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            Add Face Reference
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Recommended tips */}
      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400">
        <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="text-amber-200 font-medium">Recommended Reference Angles: </span>
          Front-facing portrait, slight left 3/4 angle, or slight right 3/4 angle under natural daylight.
        </div>
      </div>

      {/* Reference list */}
      {references.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {references.map((ref, idx) => (
            <div
              key={ref.id}
              className="relative flex items-center gap-3 p-2.5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/30 transition-colors"
            >
              <div className="w-14 h-16 rounded-xl overflow-hidden bg-slate-900 flex-shrink-0 border border-slate-800">
                <img src={ref.dataUrl} alt="Face Reference" className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <span className="text-[11px] font-medium text-slate-300 block truncate">
                  Reference #{idx + 1}
                </span>

                <div className="flex items-center gap-1">
                  <Compass className="w-3 h-3 text-amber-400 flex-shrink-0" />
                  <select
                    value={ref.angle}
                    onChange={(e) =>
                      onUpdateAngle(ref.id, e.target.value as 'front' | 'left' | 'right' | 'other')
                    }
                    className="bg-slate-900 border border-slate-700 text-[10px] text-amber-200 rounded px-1.5 py-0.5 focus:outline-none focus:border-amber-400"
                  >
                    <option value="front">Front View</option>
                    <option value="left">Slight Left (3/4)</option>
                    <option value="right">Slight Right (3/4)</option>
                    <option value="other">Profile / Other</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onRemoveReference(ref.id)}
                className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                title="Remove reference"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 border border-dashed border-slate-800 rounded-2xl">
          <p className="text-xs text-slate-500">
            No secondary references added. (Primary photo is fully sufficient for generation).
          </p>
        </div>
      )}
    </div>
  );
};
