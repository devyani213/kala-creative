import React, { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, StarIcon, QuoteIcon } from 'lucide-react';
import { testimonials } from '../../data/site';
import { Reveal } from '../Reveal';

export function Testimonials() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused || testimonials.length < 2) return;
    // 7 seconds luxury pace
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % testimonials.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [paused, reduced]);

  const item = testimonials[active];

  const change = (direction: number) => {
    setActive((current) => (current + direction + testimonials.length) % testimonials.length);
  };

  return (
    <section
      className="testimonial-editorial bg-bone-dim px-6 py-24 md:px-10 md:py-32"
      aria-label="Client testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-shell">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-ink/10 pb-6">
          <Reveal y={12}>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-gold-deep">
                Voices of Partnership
              </p>
            </div>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-light text-ink">
              In Their Own Words
            </h2>
          </Reveal>

          <div className="flex items-center gap-1 text-gold">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
            ))}
            <span className="ml-2 font-sans text-xs uppercase tracking-wider text-ink/60">
              5.0 Studio Rating
            </span>
          </div>
        </div>

        <div className="testimonial-editorial__content py-8">
          <div key={active} className="testimonial-editorial__quote-wrap testimonial-editorial__quote-wrap--slide">
            <div className="relative shrink-0">
              <img
                src={item.photo}
                alt={item.author}
                className="testimonial-editorial__portrait border-2 border-gold/40 shadow-md"
                loading="lazy"
              />
              <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-ink text-gold">
                <QuoteIcon className="h-3 w-3 fill-gold" />
              </div>
            </div>

            <div className="testimonial-editorial__copy">
              <blockquote className="testimonial-editorial__quote">
                “{item.quote}”
              </blockquote>
              <figcaption className="testimonial-editorial__author">
                <span className="text-base sm:text-lg">{item.author}</span>
                <small className="text-ink/60">{item.role}</small>
                {item.project && (
                  <span className="mt-1 inline-flex w-max items-center rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 font-sans text-[10px] uppercase tracking-wider text-gold-deep">
                    {item.project}
                  </span>
                )}
              </figcaption>
            </div>
          </div>
        </div>

        <div className="testimonial-editorial__controls border-t border-ink/10 pt-6">
          <div
            className="testimonial-editorial__progress"
            aria-label={`Testimonial ${active + 1} of ${testimonials.length}`}
          >
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Show testimonial ${index + 1}`}
                className={`testimonial-editorial__progress-item ${index === active ? 'is-active' : ''}`}
                onClick={() => setActive(index)}
              />
            ))}
            <span className="ml-3 font-sans text-xs text-ink/40 tabular-nums">
              0{active + 1} / 0{testimonials.length}
            </span>
          </div>

          <div className="testimonial-editorial__arrows flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => change(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-gold hover:bg-gold hover:text-white"
            >
              <ArrowLeftIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => change(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-gold hover:bg-gold hover:text-white"
            >
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
