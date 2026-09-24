import React, { useState, useRef, useCallback } from 'react';
import { Eye, MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  aspectRatioClass?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Original Portrait',
  afterLabel = 'Devotional Masterpiece',
  className = '',
  aspectRatioClass = 'aspect-[3/4]',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleMove(e.clientX);

    const onMouseMove = (moveEvent: MouseEvent) => {
      handleMove(moveEvent.clientX);
    };

    const onMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-3xl border border-amber-500/30 bg-slate-950 shadow-2xl group cursor-ew-resize ${aspectRatioClass} ${className}`}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (Full Background) */}
      <img
        src={afterImage}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Dividing Line & Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-amber-400 cursor-ew-resize z-20 shadow-[0_0_12px_rgba(245,158,11,0.8)]"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-950 border-2 border-amber-400 flex items-center justify-center text-amber-400 shadow-xl group-hover:scale-110 transition-transform">
          <MoveHorizontal className="w-5 h-5" />
        </div>
      </div>

      {/* Floating Badges */}
      <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-xs font-semibold text-slate-200 pointer-events-none">
        {beforeLabel}
      </div>

      <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-amber-500/85 backdrop-blur-md border border-amber-400 text-xs font-semibold text-slate-950 pointer-events-none">
        {afterLabel}
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-amber-500/20 text-[11px] text-amber-200/90 pointer-events-none flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
        <Eye className="w-3.5 h-3.5 text-amber-400" />
        Drag slider to compare identity preservation
      </div>
    </div>
  );
};
