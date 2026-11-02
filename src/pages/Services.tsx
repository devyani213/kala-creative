import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, ClockIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal, Stagger, StaggerItem } from '../components/Reveal';
import { ClosingCta } from '../components/ClosingCta';
import { processSteps, services, faqs } from '../data/site';
import { projects } from '../data/projects';

export function Services() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main>
      <PageHeader
        eyebrow="Capabilities & Disciplines"
        title="Four disciplines, held to one standard."
        intro="No account management layer. No junior delegation. The senior partners who lead your strategic discovery are the same craftspeople who sign off on final production."
      />

      {/* Services List */}
      <section className="bg-bone px-6 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-shell">
          {services.map((service, i) => {
            const proofProject = projects.find((p) => p.title.includes(service.proof.project) || service.proof.project.includes(p.title));
            return (
              <Reveal key={service.id} delay={0.04 * i}>
                <article className="grid gap-8 border-t border-ink/15 py-14 lg:grid-cols-12 lg:gap-12">
                  {/* Discipline Title & Description */}
                  <div className="lg:col-span-4">
                    <div className="flex items-center gap-3">
                      <span className="font-sans text-[11px] tabular-nums tracking-widest text-gold-deep font-semibold">
                        0{i + 1}
                      </span>
                      <span className="flex items-center gap-1 font-sans text-xs text-ink/50">
                        <ClockIcon className="h-3 w-3" />
                        {service.timeline}
                      </span>
                    </div>

                    <h2 className="mt-4 font-display text-[2.2rem] font-light leading-tight text-ink sm:text-[2.6rem]">
                      {service.title}
                    </h2>
                    <p className="mt-4 max-w-md font-sans text-[15px] leading-relaxed text-ink/70">
                      {service.description}
                    </p>
                  </div>

                  {/* Deliverables List */}
                  <div className="lg:col-span-4">
                    <h3 className="font-sans text-[11px] uppercase tracking-widest text-ink/40">
                      Artifacts & Deliverables
                    </h3>
                    <ul className="mt-5 space-y-3.5">
                      {service.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 font-sans text-[14px] text-ink/75"
                        >
                          <CheckIcon
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-deep"
                            strokeWidth={2}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Proof Case Study Card */}
                  <div className="lg:col-span-4">
                    <h3 className="font-sans text-[11px] uppercase tracking-widest text-ink/40">
                      Commercial Validation
                    </h3>
                    {proofProject && (
                      <Link
                        to={`/portfolio/${proofProject.slug}`}
                        className="group mt-5 block overflow-hidden border border-ink/12 bg-bone-dim p-4 transition-colors hover:border-gold"
                      >
                        <div className="overflow-hidden aspect-[16/10] w-full">
                          <img
                            src={proofProject.image}
                            alt={proofProject.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
                          />
                        </div>
                        <p className="mt-4 font-sans text-xs text-ink/75 leading-relaxed">
                          {service.proof.outcome}
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-widest text-gold-deep group-hover:underline">
                          View {proofProject.title} Case Study
                          <ArrowUpRightIcon className="h-3.5 w-3.5" />
                        </span>
                      </Link>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Process Architecture Section */}
      <section className="bg-ink-deep px-6 py-24 text-bone md:px-10 md:py-32">
        <div className="mx-auto max-w-shell">
          <SectionHeading
            eyebrow="Methodology"
            title="Discover, Design, Deliver, Support."
            intro="A structured twelve-week arc. The schedule adapts to complexity, but the deliberate sequence never changes."
            tone="bone"
          />

          <Stagger className="mt-16 divide-y divide-bone/15 border-y border-bone/15" stagger={0.1}>
            {processSteps.map((step, i) => (
              <StaggerItem key={step.step} className="py-8">
                <div className="grid gap-4 md:grid-cols-12 md:gap-8 items-baseline">
                  <div className="flex items-baseline gap-4 md:col-span-4">
                    <span className="font-sans text-xs tabular-nums tracking-widest text-gold font-semibold">
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-[2rem] font-light text-bone">
                      {step.step}
                    </h3>
                  </div>
                  <p className="font-sans text-[15px] leading-relaxed text-bone/70 md:col-span-6">
                    {step.description}
                  </p>
                  <p className="font-sans text-xs uppercase tracking-widest text-gold-soft md:col-span-2 md:justify-self-end">
                    {step.duration}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-bone px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-shell">
          <div className="mb-12">
            <span className="font-sans text-[10px] uppercase tracking-widest text-gold-deep">
              Clear Expectations
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-light text-ink">
              Service Delivery FAQs
            </h2>
          </div>

          <div className="divide-y divide-ink/15 border-y border-ink/15 max-w-4xl">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={faq.question} className="py-6">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between text-left gap-4"
                  >
                    <span className="font-display text-xl sm:text-2xl font-light text-ink hover:text-gold-deep transition-colors">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUpIcon className="h-5 w-5 text-gold-deep shrink-0" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5 text-ink/40 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <p className="mt-4 font-sans text-[15px] leading-relaxed text-ink/75 max-w-2xl">
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
        title="Ready to commission a discipline?"
        intro="Start with a discovery conversation. We will review your category and explain exactly where our craft can generate leverage."
      />
    </main>
  );
}
