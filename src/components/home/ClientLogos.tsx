import React from 'react';
import { clients } from '../../data/site';
import { Reveal } from '../Reveal';

export function ClientLogos() {
  const doubled = [...clients, ...clients];

  return (
    <section className="overflow-hidden bg-bone px-6 py-20 md:px-10 md:py-24">
      <div className="mx-auto max-w-shell">
        <Reveal y={12}>
          <div className="flex items-end justify-between gap-6">
            <p className="font-sans text-[11px] uppercase tracking-widest text-ink/40">Selected collaborators</p>
            <span className="hidden font-sans text-[9px] uppercase tracking-[0.2em] text-ink/30 sm:block">Pune · Mumbai · India</span>
          </div>
        </Reveal>

        <div className="mt-10 hidden overflow-hidden md:block">
          <div className="client-marquee flex w-max items-center gap-14">
            {doubled.map((client, index) => (
              <span key={`${client}-${index}`} className="font-display text-2xl font-light tracking-[0.16em] text-ink/30 transition-colors duration-300 hover:text-gold-deep">
                {client}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-9 sm:grid-cols-4 md:hidden">
          {clients.map((client) => (
            <span key={client} className="font-display text-lg font-light tracking-[0.18em] text-ink/35">
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
