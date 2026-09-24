import React from 'react';
import { Sparkles, Check, Eye } from 'lucide-react';
import { DevotionalStyle } from '../../types/style';
import { Button } from '../common/Button';

interface StyleCardProps {
  style: DevotionalStyle;
  isSelected?: boolean;
  onSelect: (style: DevotionalStyle) => void;
  onPreviewSample?: (style: DevotionalStyle) => void;
}

export const StyleCard: React.FC<StyleCardProps> = ({
  style,
  isSelected = false,
  onSelect,
  onPreviewSample,
}) => {
  return (
    <div
      onClick={() => onSelect(style)}
      className={`group relative flex flex-col rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 border ${
        isSelected
          ? 'bg-slate-900 border-amber-400 ring-2 ring-amber-400/40 shadow-xl shadow-amber-500/10 scale-[1.01]'
          : 'bg-slate-900/70 border-slate-800 hover:border-amber-500/40 hover:bg-slate-900 shadow-lg'
      }`}
    >
      {/* Thumbnail Area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
        <img
          src={style.thumbnail}
          alt={style.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Category & Status badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide backdrop-blur-md ${
              style.deity === 'Krishna'
                ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-500/40'
                : 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
            }`}
          >
            {style.deity}
          </span>
          {style.featured && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Popular
            </span>
          )}
        </div>

        {/* Selection indicator checkmark */}
        {isSelected && (
          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg font-bold">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
        )}

        {/* Preview Before/After sample trigger */}
        {style.sampleBeforeAfter && onPreviewSample && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPreviewSample(style);
            }}
            className="absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-amber-300 text-[11px] flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-3 h-3 text-amber-400" />
            Sample Before/After
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h4 className="text-base sm:text-lg font-semibold text-white group-hover:text-amber-300 transition-colors font-cinzel">
            {style.name}
          </h4>
          <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
            {style.description}
          </p>
        </div>

        {/* Elements tags snippet */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {style.transformation.slice(0, 3).map((item, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-slate-300"
            >
              {item}
            </span>
          ))}
          {style.transformation.length > 3 && (
            <span className="text-[10px] px-1.5 py-0.5 text-slate-500 font-medium">
              +{style.transformation.length - 3} more
            </span>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Button
            type="button"
            size="sm"
            variant={isSelected ? 'primary' : 'secondary'}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(style);
            }}
            className="w-full text-xs font-semibold"
          >
            {isSelected ? 'Selected Style' : 'Use this style'}
          </Button>
        </div>
      </div>
    </div>
  );
};
