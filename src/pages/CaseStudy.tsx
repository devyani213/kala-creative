import React, { useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircle2Icon,
  Maximize2Icon,
  Share2Icon,
  CheckIcon,
  LayersIcon
} from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '../components/Reveal';
import { ClosingCta } from '../components/ClosingCta';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { LightboxModal } from '../components/LightboxModal';
import { projects } from '../data/projects';
import { EASE_ENTRY } from '../utils/motion';

const chapters = [
  { key: 'challenge', label: '01. The Challenge' },
  { key: 'solution', label: '02. The Creative Solution' },
  { key: 'result', label: '03. Commercial Impact' }
] as const;

export function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return <Navigate to="/portfolio" replace />;

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const prev = projects[(index - 1 + projects.length) % projects.length];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <main>
      {/* Hero Visual */}
      <div ref={heroRef} className="relative h-[72vh] min-h-[28rem] w-full overflow-hidden bg-ink-deep">
        <motion.img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover opacity-95"
          style={{ y: reduced ? undefined : imageY, scale: 1.05 }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(16,28,43,0.85) 0%, rgba(16,28,43,0.15) 50%, rgba(16,28,43,0.3) 100%)'
          }}
        />

        <div className="absolute inset-x-0 bottom-0 px-6 pb-12 md:px-10 md:pb-16">
          <div className="mx-auto max-w-shell">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <motion.div
                initial={{ opacity: 0, y: reduced ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE_ENTRY, delay: 0.2 }}
                className="flex items-center gap-3 font-sans text-[11px] uppercase tracking-widest text-gold"
              >
                <span>{project.category}</span>
                <span>—</span>
                <span>{project.year}</span>
                <span>—</span>
                <span className="text-bone/70">{project.client}</span>
              </motion.div>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 border border-bone/25 bg-ink/50 px-3 py-1 font-sans text-[10px] uppercase tracking-widest text-bone hover:border-gold hover:text-gold transition-colors backdrop-blur-sm"
              >
                {copied ? <CheckIcon className="h-3 w-3 text-emerald-400" /> : <Share2Icon className="h-3 w-3" />}
                <span>{copied ? 'Link Copied' : 'Share Case Study'}</span>
              </button>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: reduced ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: EASE_ENTRY, delay: 0.3 }}
              className="mt-4 max-w-4xl font-display text-[2.8rem] font-light leading-[1.02] text-bone sm:text-[4.5rem] md:text-[5.2rem]"
            >
              {project.title}
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <section className="bg-bone px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-shell">
          {/* Executive Summary */}
          <Reveal>
            <div className="border-b border-ink/12 pb-12">
              <span className="font-sans text-[10px] uppercase tracking-widest text-gold-deep">
                Executive Overview
              </span>
              <p className="mt-4 max-w-4xl font-display text-[1.75rem] sm:text-[2.2rem] font-light leading-[1.28] text-ink">
                {project.summary}
              </p>
            </div>
          </Reveal>

          {/* Interactive Before & After Comparison */}
          {project.beforeImage && project.afterImage && (
            <div className="mt-16">
              <Reveal>
                <div className="mb-6">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-gold-deep">
                    Transformation Analysis
                  </span>
                  <h2 className="mt-2 font-display text-2xl sm:text-3xl font-light text-ink">
                    Before & After Rebrand Comparison
                  </h2>
                </div>
                <BeforeAfterSlider
                  beforeImage={project.beforeImage}
                  afterImage={project.afterImage}
                  beforeLabel="Prior Brand State"
                  afterLabel="Kala Creative Redesign"
                />
              </Reveal>
            </div>
          )}

          {/* Chapters (Challenge, Solution, Result) & Sidebar */}
          <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-12 lg:col-span-7">
              {chapters.map((chapter, i) => (
                <Reveal key={chapter.key} delay={i * 0.06}>
                  <div className="border-t border-ink/12 pt-8">
                    <h2 className="font-sans text-[11px] uppercase tracking-widest text-gold-deep">
                      {chapter.label}
                    </h2>
                    <p className="mt-4 font-sans text-[16px] leading-[1.8] text-ink/75">
                      {project[chapter.key]}
                    </p>
                  </div>
                </Reveal>
              ))}

              {/* Deliverables Checklist */}
              {project.deliverables && (
                <Reveal delay={0.2}>
                  <div className="border-t border-ink/12 pt-8">
                    <div className="flex items-center gap-2 font-sans text-[11px] uppercase tracking-widest text-gold-deep">
                      <LayersIcon className="h-3.5 w-3.5" />
                      <span>Deliverables Handed Over</span>
                    </div>
                    <ul className="mt-5 space-y-3">
                      {project.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-3 font-sans text-sm text-ink/80">
                          <CheckCircle2Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}
            </div>

            {/* Sidebar: Verified Metrics & Leadership Quote */}
            <aside className="lg:col-span-5 space-y-8">
              <div className="border border-ink/12 bg-bone-dim p-8">
                <span className="font-sans text-[10px] uppercase tracking-widest text-gold-deep">
                  Verified Commercial Impact
                </span>
                <Stagger className="mt-6 space-y-6 divide-y divide-ink/10" stagger={0.08}>
                  {project.metrics.map((metric) => (
                    <StaggerItem key={metric.label} className="pt-4 first:pt-0">
                      <p className="font-display text-[2.8rem] font-light leading-none text-ink">
                        {metric.value}
                      </p>
                      <p className="mt-2 font-sans text-[11px] uppercase tracking-widest text-ink/50">
                        {metric.label}
                      </p>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>

              <Reveal delay={0.12}>
                <figure className="bg-ink p-8 text-bone shadow-xl">
                  <blockquote className="font-display text-[1.45rem] font-light leading-snug text-bone/90">
                    “{project.quote.text}”
                  </blockquote>
                  <figcaption className="mt-6 border-t border-bone/15 pt-4">
                    <span className="block font-sans text-sm font-medium text-bone">{project.quote.author}</span>
                    <span className="mt-0.5 block font-sans text-[11px] uppercase tracking-widest text-gold-soft">
                      {project.quote.role}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </aside>
          </div>

          {/* Interactive Lightbox Image Gallery */}
          <div className="mt-24">
            <div className="flex items-center justify-between border-b border-ink/12 pb-4 mb-8">
              <h2 className="font-display text-2xl sm:text-3xl font-light text-ink">
                Production Artifacts & Imagery
              </h2>
              <span className="font-sans text-xs text-ink/50 uppercase tracking-widest">
                Click any image to expand
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {project.gallery.map((image, i) => (
                <div
                  key={image}
                  className="group relative aspect-[4/3] w-full overflow-hidden border border-ink/15 cursor-zoom-in"
                  onClick={() => setLightboxIndex(i)}
                >
                  <img
                    src={image}
                    alt={`${project.title} — artifact ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-ink-deep/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-deep/80 text-bone backdrop-blur-sm">
                      <Maximize2Icon className="h-4 w-4 text-gold" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next / Prev Project Navigation Bar */}
          <div className="mt-24 flex flex-wrap items-center justify-between gap-6 border-t border-ink/12 pt-8">
            <Link
              to={`/portfolio/${prev.slug}`}
              className="group inline-flex items-center gap-2.5 font-sans text-[12px] uppercase tracking-[0.16em] text-ink/60 transition-colors hover:text-ink"
            >
              <ArrowLeftIcon
                className="h-3.5 w-3.5 transition-transform duration-300 ease-premium group-hover:-translate-x-1"
                strokeWidth={1.5}
              />
              <span>Previous: {prev.title}</span>
            </Link>

            <Link to="/portfolio" className="font-sans text-xs uppercase tracking-widest text-ink/40 hover:text-gold-deep">
              All Archives
            </Link>

            <Link to={`/portfolio/${next.slug}`} className="group text-right">
              <span className="block font-sans text-[11px] uppercase tracking-widest text-ink/40">
                Next Case Study
              </span>
              <span className="mt-1 inline-flex items-center gap-2 font-display text-2xl font-light text-ink transition-colors duration-300 ease-premium group-hover:text-gold-deep">
                {next.title}
                <ArrowRightIcon
                  className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        images={project.gallery}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNext={() => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % project.gallery.length : null))}
        onPrev={() =>
          setLightboxIndex((prev) =>
            prev !== null ? (prev - 1 + project.gallery.length) % project.gallery.length : null
          )
        }
      />

      <ClosingCta
        title={`Ready to transform like ${project.client}?`}
        intro="Every engagement starts with an initial discovery dialogue with our founding directors in Kalyani Nagar."
      />
    </main>
  );
}
