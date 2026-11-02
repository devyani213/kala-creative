import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { brandStatement } from '../../data/site';
import { EASE_ENTRY, viewportOnce } from '../../utils/motion';
import { Reveal } from '../Reveal';

export function BrandStatement() {
  const reduced = useReducedMotion();
  const words = brandStatement.line.split(' ');

  return (
    <section id="statement" className="bg-bone px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-shell">
        <motion.h2
          className="max-w-4xl font-display text-[2.4rem] font-light leading-[1.14] text-ink sm:text-[3.5rem] lg:text-[4rem]"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={{ visible: { transition: { staggerChildren: 0.045 } } }}>
          
          {words.map((word, i) =>
          <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
              <motion.span
              className="inline-block"
              variants={{
                hidden: { y: reduced ? 0 : '105%', opacity: reduced ? 0 : 1 },
                visible: {
                  y: '0%',
                  opacity: 1,
                  transition: { duration: 0.72, ease: EASE_ENTRY }
                }
              }}>
              
                {word}
                {i < words.length - 1 ? '\u00A0' : ''}
              </motion.span>
            </span>
          )}
        </motion.h2>

        <div className="mt-12 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <Reveal delay={0.1}>
            <p className="max-w-xl font-sans text-[15px] leading-relaxed text-ink/65">
              {brandStatement.support}
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <Link
              to="/about"
              className="group inline-flex items-center gap-2.5 border-b border-ink/20 pb-1.5 font-sans text-[12px] uppercase tracking-[0.18em] text-ink transition-colors duration-300 ease-premium hover:border-gold hover:text-gold-deep">
              
              Inside the studio
              <ArrowRightIcon
                className="h-3.5 w-3.5 transition-transform duration-300 ease-premium group-hover:translate-x-1"
                strokeWidth={1.75} />
              
            </Link>
          </Reveal>
        </div>
      </div>
    </section>);

}