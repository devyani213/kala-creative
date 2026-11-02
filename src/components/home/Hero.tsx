import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownIcon, Volume2Icon, VolumeXIcon } from 'lucide-react';
import { ButtonAnchor, ButtonLink } from '../Button';
import { clients, contactDetails, heroMedia } from '../../data/site';
import { useEntranceReady } from '../../contexts/EntranceContext';
import { EASE_ENTRY, EASE_OUT } from '../../utils/motion';

const heroLines = [
  'WE MAKE BRANDS FEEL.',
  'IDEAS, GIVEN A FORM.',
  'DESIGN WITH SOMETHING TO SAY.',
  'BUILT TO BE REMEMBERED.'
];

const sequence = { media: 0, eyebrow: 0.16, headline: 0.24, support: 0.46, cta: 0.62, meta: 0.82 };

export function Hero() {
  const ready = useEntranceReady();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [videoMuted, setVideoMuted] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);
  const [linePaused, setLinePaused] = useState(false);

  useEffect(() => {
    if (reduced || linePaused) return;
    const timer = window.setInterval(() => setLineIndex((i) => (i + 1) % heroLines.length), 6000);
    return () => window.clearInterval(timer);
  }, [reduced, linePaused]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '11%']);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 0.8], [0, -70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  const rise = (delay: number, distance = 24) => ({
    initial: { opacity: 0, y: reduced ? 0 : distance },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : distance },
    transition: { duration: 0.9, ease: EASE_ENTRY, delay: reduced ? 0 : delay }
  });

  const logoItems = [...clients, ...clients];

  return (
    <section ref={ref} className="hero-film relative flex min-h-[100svh] w-full items-end overflow-hidden bg-ink-deep">
      <motion.div
        className="absolute inset-[-6%]"
        style={reduced ? undefined : { y: mediaY, scale: mediaScale }}
        initial={{ opacity: 1, scale: reduced ? 1 : 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: EASE_OUT }}
      >
        {heroMedia.heroVideoSrc ? (
          <video
            id="hero-film"
            className="h-full w-full object-cover opacity-90"
            src={heroMedia.heroVideoSrc}
            poster={heroMedia.heroPoster}
            autoPlay
            muted={videoMuted}
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        ) : (
          <img
            src={heroMedia.heroPoster}
            alt="Kala Creative Studio Pune"
            className="h-full w-full object-cover opacity-90"
          />
        )}
      </motion.div>

      <div className="hero-film__wash absolute inset-0" />
      <div className="hero-film__grain pointer-events-none absolute inset-0" />

      <motion.div className="pointer-events-none absolute right-6 top-28 hidden w-36 text-right md:block" initial={{ opacity: 0, x: 18 }} animate={ready ? { opacity: 1, x: 0 } : { opacity: 0, x: 18 }} transition={{ duration: 0.8, delay: 0.95, ease: EASE_ENTRY }}>
        <div className="mb-3 ml-auto h-px w-12 bg-gold" />
        <p className="font-sans text-[9px] uppercase tracking-[0.28em] text-bone/55">Independent creative studio</p>
        <p className="mt-2 font-display text-lg italic text-bone/75">Pune · India</p>
      </motion.div>

      <motion.div className="relative z-10 mx-auto w-full max-w-shell px-6 pb-10 pt-32 md:px-10 md:pb-12" style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}>
        <motion.div {...rise(sequence.eyebrow, 16)} className="flex items-center gap-3">
          <span className="h-px w-8 bg-gold" />
          <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-gold">Design Studio — Pune, India</p>
        </motion.div>

        <motion.div
          {...rise(sequence.headline, 34)}
          className="hero-headline relative mx-auto mt-7 w-full max-w-[1200px] text-center"
          onMouseEnter={() => setLinePaused(true)}
          onMouseLeave={() => setLinePaused(false)}
        >
          <AnimateHeroLine index={lineIndex} reduced={reduced} />
        </motion.div>

        <motion.p {...rise(sequence.support, 22)} className="mx-auto mt-7 max-w-xl text-center font-sans text-[15px] leading-[1.75] text-bone/70 md:text-base">
          Identity, packaging, space and screen — held to one standard, from the first conversation to the day it goes on press.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: reduced ? 0 : 12 }} animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 12 }} transition={{ duration: 0.7, ease: EASE_ENTRY, delay: reduced ? 0 : sequence.cta }} className="mt-9 flex justify-center gap-3 flex-col sm:flex-row sm:items-center">
          <ButtonLink to="/portfolio" variant="solid" withArrow>View selected work</ButtonLink>
          <ButtonAnchor href={contactDetails.bookingHref} variant="outlineLight">{contactDetails.bookingLabel}</ButtonAnchor>
        </motion.div>

        <motion.div {...rise(sequence.meta, 14)} className="mt-10 border-t border-bone/15 pt-5 md:mt-12">
          <div className="hero-client-strip overflow-hidden border-y border-bone/15 py-2.5" aria-label="Selected clients">
            <div className="hero-client-track hero-client-track--reverse flex w-max items-center gap-10 md:gap-14">
              {logoItems.map((client, index) => (
                <span key={`${client}-${index}`} className="group inline-flex shrink-0 items-center gap-2 font-display text-sm font-light tracking-[0.16em] text-bone/38 transition-all duration-500 hover:-translate-y-0.5 hover:text-white md:text-base">
                  <span className="h-1 w-1 rounded-full bg-gold/55 transition-transform duration-300 group-hover:scale-150" />{client}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-end justify-between gap-6">
            <div className="flex flex-wrap gap-x-8 gap-y-3 font-sans text-[10px] uppercase tracking-[0.22em] text-bone/50">
              <span>Est. 2018</span><span>150+ projects</span><span className="hidden sm:inline">50+ brands</span>
            </div>
            <div className="flex items-center gap-5">
              {heroMedia.heroVideoSrc && <button type="button" onClick={() => setVideoMuted((value) => !value)} className="group flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.2em] text-bone/55 transition-colors hover:text-bone" aria-label={videoMuted ? 'Unmute hero film' : 'Mute hero film'}>{videoMuted ? <VolumeXIcon className="h-3.5 w-3.5" strokeWidth={1.3} /> : <Volume2Icon className="h-3.5 w-3.5" strokeWidth={1.3} />}<span className="hidden sm:inline">{videoMuted ? 'Sound off' : 'Sound on'}</span></button>}
              <a href="#statement" className="group flex shrink-0 items-center gap-3 font-sans text-[10px] uppercase tracking-[0.22em] text-bone/60 transition-colors duration-300 hover:text-bone"><span className="hidden sm:inline">Explore</span><motion.span className="flex h-9 w-9 items-center justify-center rounded-full border border-bone/25 transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-ink-deep" animate={reduced ? undefined : { y: [0, 5, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}><ArrowDownIcon className="h-4 w-4" strokeWidth={1.4} /></motion.span></a>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="absolute bottom-7 right-6 hidden items-center gap-3 text-bone/45 md:flex" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 1.25, duration: 0.7 }}><span className="font-sans text-[9px] uppercase tracking-[0.22em]">Scroll to explore</span><motion.span animate={reduced ? undefined : { y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity }}><ArrowDownIcon className="h-4 w-4" strokeWidth={1.2} /></motion.span></motion.div>
    </section>
  );
}

function AnimateHeroLine({ index, reduced }: { index: number; reduced: boolean }) {
  return (
    <div className="relative mx-auto min-h-[7rem] w-full overflow-visible sm:min-h-[9rem] lg:min-h-[10rem]" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.h1
          key={index}
          initial={{ opacity: 0, y: reduced ? 0 : 48, clipPath: reduced ? 'inset(0)' : 'inset(100% 0 0 0)' }}
          animate={{ opacity: 1, y: 0, clipPath: 'inset(0)' }}
          exit={{ opacity: 0, y: reduced ? 0 : -28, clipPath: reduced ? 'inset(0)' : 'inset(0 0 100% 0)' }}
          transition={{ duration: reduced ? 0 : 0.72, ease: [0.16, 1, 0.3, 1] }}
          whileHover={reduced ? undefined : { scale: 1.012, letterSpacing: '-0.02em' }}
          className="absolute inset-x-0 top-0 font-display text-[2.45rem] font-light leading-[0.92] tracking-[-0.035em] text-bone sm:text-[4.3rem] lg:text-[6.2rem]"
        >
          {heroLines[index]}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}
