import React, { useState, useRef, useCallback } from 'react';
import { ArrowLeftRightIcon } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspect?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Heritage Archive',
  afterLabel = 'Kala Creative Rebrand',
  aspect = 'aspect-[16/10]'
}: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPos(percentage);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 font-sans text-[11px] uppercase tracking-widest text-ink/50">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-ink/40" />
          {beforeLabel}
        </span>
        <span className="flex items-center gap-1 text-gold-deep font-medium">
          <ArrowLeftRightIcon className="h-3 w-3" />
          Drag slider to compare
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          {afterLabel}
        </span>
      </div>

      <div
        ref={containerRef}
        className={`relative ${aspect} w-full overflow-hidden select-none cursor-ew-resize border border-ink/15 shadow-md`}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (Background) */}
        <img
          src={afterImage}
          alt={afterLabel}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Before Image (Clipped Foreground) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-9 w-9 rounded-full bg-ink-deep border-2 border-white shadow-xl flex items-center justify-center text-white">
            <ArrowLeftRightIcon className="h-3.5 w-3.5 text-gold" />
          </div>
        </div>
      </div>
    </div>
  );
}

