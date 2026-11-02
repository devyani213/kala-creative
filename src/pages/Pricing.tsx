import React, { useState } from 'react';
import { CheckIcon, HelpCircleIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { ButtonLink } from '../components/Button';
import { Reveal, Stagger, StaggerItem } from '../components/Reveal';
import { ClosingCta } from '../components/ClosingCta';
import { ProjectEstimator } from '../components/ProjectEstimator';
import { pricingTiers, faqs } from '../data/site';

export function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <main>
      <PageHeader
        eyebrow="Engagements & Investment"
        title="Tailored programmes, quoted to the work."
        intro="We do not issue arbitrary hourly rate cards because transformational design cannot be measured in fragmented minutes. We operate on transparent fixed-fee milestone programmes with complete vector ownership."
      />

      {/* Interactive Scope Configurator */}
      <section className="bg-bone px-6 pb-16 md:px-10">
        <div className="mx-auto max-w-shell">
          <ProjectEstimator />
        </div>
      </section>

      {/* Standard Tier Cards */}
      <section className="bg-bone px-6 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-shell">
          <div className="mb-10 text-center">
            <span className="font-sans text-[10px] uppercase tracking-widest text-gold-deep">
              Standard Engagement Shapes
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-light text-ink">
              Three Curated Paths
            </h2>
          </div>

          <Stagger className="grid gap-px bg-ink/15 lg:grid-cols-3" stagger={0.09}>
            {pricingTiers.map((tier) => (
              <StaggerItem
                key={tier.name}
                className={`flex h-full flex-col p-8 md:p-10 ${
                  tier.featured ? 'bg-ink text-bone shadow-2xl relative' : 'bg-bone text-ink'
                }`}
              >
                {tier.featured && (
                  <div className="absolute top-0 right-0 bg-gold px-4 py-1 font-sans text-[9px] uppercase tracking-widest text-ink-deep font-semibold">
                    Most Requested
                  </div>
                )}

                <div className="flex items-baseline justify-between gap-4">
                  <h3
                    className={`font-display text-[2rem] font-light ${
                      tier.featured ? 'text-bone' : 'text-ink'
                    }`}
                  >
                    {tier.name}
                  </h3>
                </div>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-2xl font-light text-gold-soft">
                    {tier.priceEstimate}
                  </span>
                  <span className="font-sans text-xs opacity-60">· {tier.duration}</span>
                </div>

                <p
                  className={`mt-2 font-sans text-[11px] uppercase tracking-[0.14em] ${
                    tier.featured ? 'text-bone/50' : 'text-ink/40'
                  }`}
                >
                  {tier.positioning}
                </p>

                <p
                  className={`mt-6 font-sans text-[15px] leading-relaxed ${
                    tier.featured ? 'text-bone/70' : 'text-ink/65'
                  }`}
                >
                  {tier.description}
                </p>

                <ul className="mt-8 space-y-3.5 border-t border-current/10 pt-6">
                  {tier.includes.map((item) => (
                    <li
                      key={item}
                      className={`flex items-start gap-3 font-sans text-[14px] ${
                        tier.featured ? 'text-bone/85' : 'text-ink/75'
                      }`}
                    >
                      <CheckIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={2} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p
                  className={`mt-8 border-t pt-5 font-sans text-[12px] ${
                    tier.featured ? 'border-bone/15 text-bone/50' : 'border-ink/12 text-ink/45'
                  }`}
                >
                  {tier.engagement}
                </p>

                <div className="mt-auto pt-8">
                  <ButtonLink
                    to="/contact"
                    variant={tier.featured ? 'solid' : 'outline'}
                    withArrow
                    className="w-full text-center"
                  >
                    Discuss {tier.name}
                  </ButtonLink>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Transparent Payment Policy */}
          <div className="mt-16 grid gap-6 sm:grid-cols-3 border border-ink/12 bg-bone-dim p-8">
            <div>
              <span className="font-sans text-[10px] uppercase tracking-widest text-gold-deep">
                Milestone 01 · 40%
              </span>
              <h4 className="mt-2 font-display text-xl font-light text-ink">Project Inception</h4>
              <p className="mt-1 font-sans text-xs text-ink/60">
                Secures studio calendar slot, discovery research, and strategic positioning alignment.
              </p>
            </div>
            <div>
              <span className="font-sans text-[10px] uppercase tracking-widest text-gold-deep">
                Milestone 02 · 30%
              </span>
              <h4 className="mt-2 font-display text-xl font-light text-ink">Direction Approval</h4>
              <p className="mt-1 font-sans text-xs text-ink/60">
                Invoiced once you approve the chosen design direction and initial production prototypes.
              </p>
            </div>
            <div>
              <span className="font-sans text-[10px] uppercase tracking-widest text-gold-deep">
                Milestone 03 · 30%
              </span>
              <h4 className="mt-2 font-display text-xl font-light text-ink">Final Delivery</h4>
              <p className="mt-1 font-sans text-xs text-ink/60">
                Invoiced upon vector master handover, digital guidelines upload, and printer sign-off.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement FAQ Accordion */}
      <section className="bg-ink-deep px-6 py-24 text-bone md:px-10 md:py-32">
        <div className="mx-auto max-w-shell">
          <div className="mb-14">
            <span className="font-sans text-[10px] uppercase tracking-widest text-gold">
              Questions & Transparency
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-light text-bone">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="divide-y divide-bone/15 border-y border-bone/15 max-w-4xl">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={faq.question} className="py-6">
                  <button
                    type="button"
                    onClick={() => toggleFaq(i)}
                    className="flex w-full items-center justify-between text-left gap-4"
                  >
                    <span className="font-display text-xl sm:text-2xl font-light text-bone hover:text-gold transition-colors">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUpIcon className="h-5 w-5 text-gold shrink-0" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5 text-bone/40 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <p className="mt-4 font-sans text-[15px] leading-relaxed text-bone/70 max-w-2xl">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ClosingCta
        title="Not certain which engagement fits?"
        intro="Most partners aren’t at first. A twenty-minute discovery video call with Arjun Kala is usually enough to identify the right shape."
      />
    </main>
  );
}
