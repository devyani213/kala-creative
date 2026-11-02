import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE_ENTRY } from '../utils/motion';
import { studioImages } from '../data/site';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  intro?: string;
}

export function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  const reduced = useReducedMotion();

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, ease: EASE_ENTRY, delay: reduced ? 0 : delay }
  });

  return (
    <header className="bg-bone px-6 pb-16 pt-36 md:px-10 md:pb-24 md:pt-44">
      <div className="mx-auto grid max-w-shell gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-20">
        <div>
        <motion.p
          {...rise(0)}
          className="font-sans text-[11px] uppercase tracking-widest text-gold-deep">
          
          {eyebrow}
        </motion.p>
        <motion.h1
          {...rise(0.08)}
          className="mt-5 max-w-4xl font-display text-[2.75rem] font-light leading-[1.05] text-ink sm:text-[4.25rem]">
          
          {title}
        </motion.h1>
        {intro &&
        <motion.p
          {...rise(0.16)}
          className="mt-6 max-w-xl font-sans text-[15px] leading-relaxed text-ink/65">
          
            {intro}
          </motion.p>
        }
        </div>
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_ENTRY, delay: reduced ? 0 : 0.2 }}
          className="relative overflow-hidden bg-ink-deep"
        >
          <img
            src={studioImages.studioWide}
            alt="Kala Creative studio workspace"
            className="aspect-[4/3] w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-deep/75 to-transparent p-5 pt-14">
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-bone/70">Kala Creative · Pune</p>
          </div>
        </motion.div>
      </div>
    </header>);

}