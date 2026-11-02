import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRightIcon, SparklesIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { studioImages } from '../../data/site';
import { Reveal } from '../Reveal';

export function StudioMoment() {
  const reduced = useReducedMotion();

  return (
    <section className="studio-moment bg-ink-deep px-6 py-24 text-bone md:px-10 md:py-32">
      <div className="mx-auto max-w-shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal y={14}>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-3 py-1 font-sans text-[10px] uppercase tracking-widest text-gold-soft mb-4">
                <SparklesIcon className="h-3 w-3 text-gold" />
                The Bench & The Press
              </div>
              <h2 className="font-display text-[2.6rem] font-light leading-[1.04] sm:text-[3.8rem]">
                The work starts long before the screen.
              </h2>
              <p className="mt-6 max-w-md font-sans text-[15px] leading-[1.8] text-bone/70">
                Paper drawdowns, metal casting, foil deboss samples, and heated conversations. We keep the material process visible because that is where the enduring decisions happen.
              </p>
              <Link
                to="/about"
                className="group mt-9 inline-flex items-center gap-2 border-b border-bone/20 pb-2 font-sans text-[11px] uppercase tracking-[0.2em] text-bone/80 transition-colors hover:border-gold hover:text-gold"
              >
                Explore Studio Heritage
                <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-300 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
              </Link>
            </Reveal>
          </div>

          <div className="relative lg:col-span-7">
            <motion.div
              className="group relative z-10 ml-auto w-[86%] overflow-hidden border border-bone/15"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={studioImages.studioWide}
                alt="Designers working inside the Kala Creative studio in Kalyani Nagar"
                loading="lazy"
                className="aspect-[3/2] w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.035]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-deep/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute bottom-5 left-5 translate-y-3 font-sans text-[10px] uppercase tracking-[0.2em] text-bone opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                Kalyani Nagar Studio · Bench 01
              </div>
            </motion.div>

            <motion.div
              className="group absolute -bottom-10 left-0 z-20 w-[44%] overflow-hidden border border-bone/20 bg-ink-deep p-2 shadow-2xl"
              initial={{ opacity: 0, x: -24, y: reduced ? 0 : 18 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={studioImages.studioDetail}
                alt="Paper samples, Pantone drawdowns and material selection in the studio"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
              />
              <div className="p-2 flex items-center justify-between font-sans text-[9px] uppercase tracking-[0.2em] text-bone/50">
                <span>Material / Press Proofs</span>
                <span className="text-gold">Pune</span>
              </div>
            </motion.div>

            <div className="pointer-events-none absolute -right-5 -top-8 hidden font-display text-[9rem] font-light leading-none text-bone/[0.035] lg:block">
              कला
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
