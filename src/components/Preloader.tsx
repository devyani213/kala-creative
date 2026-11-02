import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Logo } from './Logo';
import { EASE_ENTRY, EASE_OUT } from '../utils/motion';

interface PreloaderProps {
  onComplete: () => void;
}

const DURATION_MS = 1600;

/**
 * Signature Kala Creative Entrance Screen:
 * The Devanagari mark resolves from soft blur to crisp gold while a hairline counter advances 0 -> 100,
 * before clipping cleanly upward to hand over to the studio experience.
 */
export function Preloader({ onComplete }: PreloaderProps) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduced) {
      setProgress(100);
      const timeout = window.setTimeout(onComplete, 200);
      return () => window.clearTimeout(timeout);
    }

    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const linear = Math.min(elapsed / DURATION_MS, 1);
      // Smooth cubic deceleration into 100
      const eased = 1 - Math.pow(1 - linear, 3);
      setProgress(Math.round(eased * 100));

      if (linear < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        window.setTimeout(onComplete, 180);
      }
    };

    frame = requestAnimationFrame(tick);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete, reduced]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-deep px-6 text-bone select-none"
      initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={
        reduced
          ? { opacity: 0, transition: { duration: 0.25 } }
          : {
              clipPath: 'inset(0% 0% 100% 0%)',
              transition: { duration: 0.72, ease: EASE_ENTRY }
            }
      }
      role="status"
      aria-live="polite"
      aria-label="Loading Kala Creative Studio"
    >
      <div className="absolute top-8 left-8 hidden sm:flex items-center gap-3">
        <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
        <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-bone/40">
          Independent Design Studio — Pune
        </span>
      </div>

      <motion.div
        initial={reduced ? { opacity: 1 } : { opacity: 0.1, filter: 'blur(16px)', scale: 1.05 }}
        animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
        transition={{ duration: 1.15, ease: EASE_OUT }}
        className="flex flex-col items-center"
      >
        <Logo tone="bone" size={72} />
      </motion.div>

      <div className="mt-14 w-full max-w-[240px]">
        <div className="h-px w-full bg-bone/15 overflow-hidden">
          <motion.div
            className="h-px bg-gold"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0 }}
          />
        </div>
        <div className="mt-3.5 flex items-baseline justify-between font-sans text-[10px] uppercase tracking-[0.22em] text-bone/50">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-1 w-1 rounded-full bg-gold" />
            Kala Creative
          </span>
          <span className="tabular-nums text-gold-soft">{progress}%</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onComplete}
        className="absolute bottom-8 right-8 text-[9px] uppercase tracking-[0.25em] text-bone/30 hover:text-gold transition-colors duration-200"
      >
        Skip intro [Esc]
      </button>
    </motion.div>
  );
}
