import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '../components/PageHeader';
import { ImageReveal, Reveal, Stagger, StaggerItem } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { ClosingCta } from '../components/ClosingCta';
import { studioImages, team, studioMilestones } from '../data/site';

const philosophy = [
  {
    title: 'Deliberate Restraint',
    body: 'We edit until the primary idea is unmistakable. Adding gratuitous ornament rarely makes a brand more durable; it usually conceals a lack of core conviction.'
  },
  {
    title: 'Material Truth',
    body: 'A brand identity must survive beyond Figma. We obsess over paper stock, grain direction, metal patinas, deboss depth, and the physical hand that will eventually hold it.'
  },
  {
    title: 'One Uncompromising Standard',
    body: 'Every single touchpoint deserves equal rigor. A retail receipt or dispatch label must feel like it was crafted by the exact same minds that sculpted the flagship facade.'
  }
];

export function About() {
  const [activeMilestone, setActiveMilestone] = useState(0);

  return (
    <main>
      <PageHeader
        eyebrow="The Studio & Conviction"
        title="Eleven people, one long argument about craft."
        intro="Kala Creative was founded in Kalyani Nagar, Pune in 2018 with a simple conviction — the work should hold up when someone finally picks it up, walks through it, or lives with it."
      />

      {/* Founder & Philosophy Manifesto */}
      <section className="bg-bone px-6 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto grid max-w-shell gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ImageReveal
              src={studioImages.founder}
              alt="Arjun Kala, Founder & Creative Director"
              className="aspect-[4/5] w-full border border-ink/15 shadow-lg"
            />
          </div>

          <div className="lg:col-span-7 lg:pt-8">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-3 py-1 font-sans text-[10px] uppercase tracking-widest text-gold-deep mb-4">
                Founder's Perspective
              </div>
              <p className="font-display text-[1.85rem] font-light leading-[1.28] text-ink sm:text-[2.35rem]">
                “Exquisite ideas should not suffer dilution between the studio and the printing press. Kala exists to close that chasm.”
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 max-w-2xl space-y-5 font-sans text-[15px] leading-[1.85] text-ink/75">
                <p>
                  We deliberately remain a tight, senior studio of eleven craftsmen in Pune. By keeping our team intimate, the lead partners shaping the initial strategy are the exact individuals checking foil drawdowns on the press floor at 2:00 AM.
                </p>
                <p>
                  We decline more engagements than we accept. That selectivity is deliberate — it gives us the breathing room to interrogate standard answers, prototype difficult physical details, and build work that endures comfortably outside a keynote presentation.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-8 border-t border-ink/15 pt-4">
                <p className="font-sans text-[12px] uppercase tracking-[0.18em] font-medium text-ink">
                  Arjun Kala
                </p>
                <p className="font-sans text-[11px] text-ink/50 tracking-wider">
                  Founder & Creative Director · NID Ahmedabad Alumnus
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Interactive Studio Timeline (2018 - Present) */}
      <section className="bg-ink-deep px-6 py-24 text-bone md:px-10 md:py-32">
        <div className="mx-auto max-w-shell">
          <div className="mb-14">
            <span className="font-sans text-[10px] uppercase tracking-widest text-gold">
              Evolution & Practice
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl font-light text-bone">
              The Kala Journey (2018 — Present)
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-12 md:items-start">
            {/* Timeline Year Selectors */}
            <div className="md:col-span-4 flex flex-row md:flex-col gap-3 overflow-x-auto pb-4 md:pb-0">
              {studioMilestones.map((m, idx) => {
                const isActive = activeMilestone === idx;
                return (
                  <button
                    key={m.year}
                    type="button"
                    onClick={() => setActiveMilestone(idx)}
                    className={`flex items-center gap-4 p-4 text-left border transition-all ${
                      isActive
                        ? 'border-gold bg-gold/15 text-bone'
                        : 'border-bone/15 text-bone/50 hover:border-bone/30 hover:text-bone/80'
                    }`}
                  >
                    <span className="font-sans text-xs tracking-widest text-gold font-medium">
                      {m.year}
                    </span>
                    <span className="font-display text-lg font-light truncate">{m.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Milestone Card */}
            <div className="md:col-span-8 border border-bone/15 bg-ink p-8 sm:p-12">
              <span className="font-sans text-xs uppercase tracking-widest text-gold">
                Milestone Epoch · {studioMilestones[activeMilestone].year}
              </span>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl font-light text-bone">
                {studioMilestones[activeMilestone].title}
              </h3>
              <p className="mt-6 font-sans text-[16px] leading-[1.8] text-bone/70 max-w-xl">
                {studioMilestones[activeMilestone].description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Philosophies */}
      <section className="bg-bone-dim px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-shell">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5 md:sticky md:top-28 md:self-start">
              <span className="font-sans text-[10px] uppercase tracking-widest text-gold-deep">
                Core Principles
              </span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-light text-ink">
                Three principles we refuse to barter away.
              </h2>
              <p className="mt-6 font-sans text-[15px] leading-[1.8] text-ink/65">
                Design tools change every decade. Commercial fads shift each quarter. These three standards anchor every mark that departs our benches.
              </p>
              <div className="mt-8 overflow-hidden border border-ink/15">
                <img
                  src={studioImages.studioDetail}
                  alt="Paper, ink swatches, and material references in the studio"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-7">
              <Stagger className="divide-y divide-ink/15 border-y border-ink/15" stagger={0.08}>
                {philosophy.map((item, i) => (
                  <StaggerItem key={item.title} className="grid gap-6 py-9 sm:grid-cols-[72px_1fr] sm:gap-8 md:py-11">
                    <span className="font-sans text-[11px] tabular-nums tracking-widest text-gold-deep font-semibold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-display text-[2rem] font-light text-ink">{item.title}</h3>
                      <p className="mt-4 font-sans text-[15px] leading-[1.8] text-ink/70">{item.body}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* The Studio Team */}
      <section className="bg-bone px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-shell">
          <SectionHeading
            eyebrow="The Craftsmen"
            title="The minds behind the work."
            intro="No account managers or junior buffers. You collaborate directly with the directors whose signatures appear on your brand guidelines."
          />

          <Stagger className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.08}>
            {team.map((member) => (
              <StaggerItem key={member.name} className="border border-ink/12 bg-white p-5">
                <div className="overflow-hidden aspect-[4/5] w-full bg-ink">
                  <img
                    src={member.photo}
                    alt={member.name}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-500 ease-premium hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 font-display text-xl font-light text-ink">{member.name}</h3>
                <p className="mt-1 font-sans text-[10px] uppercase tracking-wider text-gold-deep font-medium">
                  {member.role}
                </p>
                {member.bio && (
                  <p className="mt-3 font-sans text-xs text-ink/65 leading-relaxed">
                    {member.bio}
                  </p>
                )}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <ClosingCta
        title="Come visit the studio in Pune."
        intro="Most engagements begin with an unhurried hour in Kalyani Nagar, or a video call if you are located overseas."
      />
    </main>
  );
}
