import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { EASE_ENTRY } from '../utils/motion';

interface LightboxModalProps {
  images: string[];
  activeIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function LightboxModal({
  images,
  activeIndex,
  onClose,
  onNext,
  onPrev
}: LightboxModalProps) {
  const isOpen = activeIndex !== null && activeIndex >= 0 && activeIndex < images.length;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-ink-deep/95 backdrop-blur-md p-4 md:p-10 select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-bone/10 text-bone hover:bg-gold hover:text-ink-deep transition-colors"
            aria-label="Close fullscreen view"
          >
            <XIcon className="h-5 w-5" />
          </button>

          {/* Left arrow */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-bone/10 text-bone hover:bg-gold hover:text-ink-deep transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
          )}

          {/* Right arrow */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-bone/10 text-bone hover:bg-gold hover:text-ink-deep transition-colors"
              aria-label="Next image"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          )}

          {/* Active Image */}
          <motion.div
            key={activeIndex}
            className="relative max-h-[85vh] max-w-5xl overflow-hidden border border-bone/15"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_ENTRY }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[activeIndex!]}
              alt={`Gallery preview ${activeIndex! + 1}`}
              className="max-h-[82vh] w-auto max-w-full object-contain"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink-deep/90 to-transparent p-4 flex items-center justify-between text-bone font-sans text-xs">
              <span className="uppercase tracking-widest text-gold-soft">
                Kala Creative Archive
              </span>
              <span className="tabular-nums opacity-60">
                {activeIndex! + 1} / {images.length}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

