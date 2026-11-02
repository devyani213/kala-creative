import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { impactStats } from '../../data/site';
import { Stagger, StaggerItem } from '../Reveal';

function Counter({ value, suffix }: {value: number;suffix: string;}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }

    const duration = 1400;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const linear = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - linear, 3);
      setDisplay(Math.round(eased * value));
      if (linear < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>);

}

export function ImpactStrip() {
  return (
    <section className="bg-ink px-6 py-20 text-bone md:px-10 md:py-24">
      <div className="mx-auto max-w-shell">
        <Stagger className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4" stagger={0.09}>
          {impactStats.map((stat) =>
          <StaggerItem key={stat.label}>
              <p className="font-display text-[3rem] font-light leading-none text-bone sm:text-[4rem]">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-4 font-sans text-[11px] uppercase tracking-widest text-bone/45">
                {stat.label}
              </p>
            </StaggerItem>
          )}
        </Stagger>
      </div>
    </section>);

}