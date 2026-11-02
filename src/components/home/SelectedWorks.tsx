import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon, ArrowLeftIcon, ArrowRightIcon, CheckIcon } from 'lucide-react';
import { projects } from '../../data/projects';
import { Reveal } from '../Reveal';

const useCaseCopy = [
  'Identity systems, positioning and visual language built to make a brand unmistakable.',
  'Packaging and material-led design that gives products a stronger presence and a clearer shelf story.',
  'Spatial identities that turn physical environments into memorable brand experiences.',
  'Editorial systems that give complex ideas a clear rhythm, hierarchy and lasting character.',
  'Digital experiences that make a brand feel considered from the first interaction to the last.'
];

const useCasePoints = [
  ['A clear visual system', 'A flexible identity across every touchpoint', 'A brand people can recognise instantly'],
  ['Packaging with a strong point of view', 'Consistent systems across the range', 'Material choices that carry the story'],
  ['A considered journey through space', 'Identity carried into every detail', 'Experiences designed to be remembered'],
  ['A strong editorial grid', 'Typography with clear hierarchy', 'Content that stays engaging and easy to read'],
  ['Interfaces built around people', 'A focused digital visual language', 'Details that make every interaction feel intentional']
];

export function SelectedWorks() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % projects.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [paused]);

  const activeProject = projects[active];

  const handleNext = () => setActive((prev) => (prev + 1) % projects.length);
  const handlePrev = () => setActive((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <section
      className="relative bg-ink-deep text-bone px-6 py-24 md:px-10 md:py-32"
      aria-label="Five that say the most"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-shell">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Left Column: Context & Copy */}
          <div className="relative z-20 max-w-xl">
            <Reveal y={16}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-3.5 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-gold-soft">
                  Signature Engagements
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light leading-[0.98] tracking-[-0.02em]">
                Five that say the most.
              </h2>
            </Reveal>

            {/* Dynamic Project Scope Info */}
            <div className="mt-8 min-h-[200px]">
              <div className="flex items-center gap-3 font-sans text-xs uppercase tracking-widest text-gold">
                <span>{activeProject.category}</span>
                <span>·</span>
                <span>{activeProject.year}</span>
                <span>·</span>
                <span className="text-bone/60">{activeProject.client}</span>
              </div>

              <h3 className="mt-3 font-display text-2xl sm:text-3xl font-light text-bone">
                {activeProject.title}
              </h3>

              <p className="mt-4 font-sans text-[15px] leading-[1.8] text-bone/70">
                {useCaseCopy[active] || activeProject.summary}
              </p>

              <ul className="mt-6 space-y-2.5">
                {useCasePoints[active]?.map((point) => (
                  <li key={point} className="flex items-start gap-3 font-sans text-xs sm:text-sm text-bone/85">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-gold/80 bg-gold/10 text-gold">
                      <CheckIcon className="h-2.5 w-2.5" strokeWidth={2} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive Controls */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-bone/15 pt-6">
              {/* Pagination indicators */}
              <div className="flex items-center gap-2">
                {projects.map((p, index) => (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => setActive(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === active ? 'w-8 bg-gold' : 'w-2 bg-bone/25 hover:bg-bone/50'
                    }`}
                    aria-label={`Switch to ${p.title}`}
                  />
                ))}
                <span className="ml-3 font-sans text-xs text-bone/50 tabular-nums">
                  0{active + 1} / 0{projects.length}
                </span>
              </div>

              {/* Prev / Next & View Link */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-bone/25 text-bone/70 hover:border-gold hover:text-gold transition-colors"
                  aria-label="Previous work"
                >
                  <ArrowLeftIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-bone/25 text-bone/70 hover:border-gold hover:text-gold transition-colors"
                  aria-label="Next work"
                >
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
                <Link
                  to={`/portfolio/${activeProject.slug}`}
                  className="inline-flex items-center gap-1.5 border border-gold bg-gold/10 px-4 py-2 font-sans text-xs uppercase tracking-widest text-gold hover:bg-gold hover:text-ink-deep transition-all"
                >
                  <span>Case Study</span>
                  <ArrowUpRightIcon className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="relative">
            <Link
              to={`/portfolio/${activeProject.slug}`}
              className="group block relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden border border-bone/20 shadow-2xl bg-ink"
            >
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/90 via-ink-deep/20 to-transparent" />

              <div className="absolute top-5 left-5">
                <span className="rounded-full border border-gold/40 bg-ink-deep/70 px-3 py-1 font-sans text-[10px] uppercase tracking-widest text-gold-soft backdrop-blur-sm">
                  {activeProject.category}
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-gold-soft">
                    {activeProject.client}
                  </p>
                  <h4 className="mt-1 font-display text-2xl sm:text-3xl font-light text-bone group-hover:text-gold transition-colors">
                    {activeProject.title}
                  </h4>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/30 bg-ink/60 text-bone backdrop-blur-sm group-hover:border-gold group-hover:bg-gold group-hover:text-ink-deep transition-all">
                  <ArrowUpRightIcon className="h-4 w-4" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
