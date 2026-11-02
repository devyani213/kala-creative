import React, { useState } from 'react';
import { ArrowRightIcon, MailIcon, CheckIcon, BookOpenIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { ImageReveal, Reveal, Stagger, StaggerItem } from '../components/Reveal';
import { ClosingCta } from '../components/ClosingCta';
import { JournalArticleModal } from '../components/JournalArticleModal';
import { journalEntries } from '../data/site';
import type { JournalEntry } from '../types/content';

export function Journal() {
  const [selectedArticle, setSelectedArticle] = useState<JournalEntry | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success'>('idle');

  const categories = ['All', 'Craft & Philosophy', 'Print & Materiality', 'Perspective'];

  const filteredEntries =
    activeCategory === 'All'
      ? journalEntries
      : journalEntries.filter((item) => item.category.toLowerCase().includes(activeCategory.toLowerCase()));

  const [lead, ...rest] = filteredEntries;

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterStatus('success');
  };

  return (
    <main>
      <PageHeader
        eyebrow="Journal & Studio Essays"
        title="Notes from the bench."
        intro="Occasional writing on typography, material resistance, and the subtle decisions that never fit onto a presentation deck."
      />

      <section className="bg-bone px-6 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-shell">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-6 border-b border-ink/12 pb-4 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`font-sans text-xs uppercase tracking-widest py-1 border-b transition-colors ${
                  activeCategory === cat
                    ? 'border-gold text-ink font-medium'
                    : 'border-transparent text-ink/45 hover:text-ink'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Lead Article */}
          {lead && (
            <article
              onClick={() => setSelectedArticle(lead)}
              className="group grid gap-8 border-t border-ink/12 pt-10 lg:grid-cols-12 lg:gap-14 cursor-pointer"
            >
              <div className="lg:col-span-7">
                <ImageReveal
                  src={lead.image}
                  alt={lead.title}
                  className="aspect-[3/2] w-full"
                  hoverZoom
                />
              </div>
              <div className="lg:col-span-5 lg:pt-6">
                <Reveal y={14}>
                  <p className="font-sans text-[11px] uppercase tracking-widest text-gold-deep">
                    {lead.category} — {lead.date}
                  </p>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="mt-5 font-display text-[2.25rem] font-light leading-[1.1] text-ink sm:text-[3rem] group-hover:text-gold-deep transition-colors">
                    {lead.title}
                  </h2>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="mt-5 max-w-lg font-sans text-[15px] leading-relaxed text-ink/65">
                    {lead.excerpt}
                  </p>
                </Reveal>
                <Reveal delay={0.18}>
                  <div className="mt-7 flex items-center justify-between border-t border-ink/10 pt-4 max-w-sm">
                    <span className="inline-flex items-center gap-2 font-sans text-[12px] uppercase tracking-[0.16em] text-ink group-hover:text-gold-deep transition-colors">
                      Read Full Essay
                      <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="font-sans text-[11px] uppercase tracking-widest text-ink/40">
                      {lead.readTime}
                    </span>
                  </div>
                </Reveal>
              </div>
            </article>
          )}

          {/* Secondary Articles */}
          {rest.length > 0 && (
            <Stagger className="mt-20 grid gap-x-10 gap-y-14 md:grid-cols-2" stagger={0.1}>
              {rest.map((entry) => (
                <StaggerItem key={entry.slug}>
                  <article
                    onClick={() => setSelectedArticle(entry)}
                    className="group flex h-full flex-col cursor-pointer border-t border-ink/12 pt-6"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={entry.image}
                        alt={entry.title}
                        loading="lazy"
                        className="aspect-[3/2] w-full object-cover transition-transform duration-500 ease-premium group-hover:scale-[1.04]"
                      />
                    </div>
                    <p className="mt-6 font-sans text-[11px] uppercase tracking-widest text-gold-deep">
                      {entry.category} — {entry.date}
                    </p>
                    <h3 className="mt-3 font-display text-[1.85rem] font-light leading-tight text-ink transition-colors duration-300 ease-premium group-hover:text-gold-deep">
                      {entry.title}
                    </h3>
                    <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink/65">
                      {entry.excerpt}
                    </p>
                    <div className="mt-auto pt-6 flex items-center justify-between border-t border-ink/10">
                      <span className="font-sans text-xs uppercase tracking-widest text-gold-deep flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read Piece <ArrowRightIcon className="h-3 w-3" />
                      </span>
                      <p className="font-sans text-[11px] uppercase tracking-widest text-ink/40">
                        {entry.readTime}
                      </p>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          )}

          {/* Quarterly Dispatch Newsletter Box */}
          <div className="mt-24 border border-ink/15 bg-bone-dim p-8 sm:p-12 md:p-14">
            <div className="max-w-xl">
              <span className="font-sans text-[10px] uppercase tracking-widest text-gold-deep">
                Quarterly Studio Dispatch
              </span>
              <h2 className="mt-2 font-display text-3xl font-light text-ink">
                Prefer these delivered to your inbox?
              </h2>
              <p className="mt-3 font-sans text-sm text-ink/70 leading-relaxed">
                We publish four essays a year. No marketing funnels, no automated drip campaigns — just considered thoughts on craft and materiality.
              </p>

              {newsletterStatus === 'success' ? (
                <div className="mt-6 flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-300 p-3">
                  <CheckIcon className="h-4 w-4" />
                  <span>You are subscribed to the quarterly dispatch. Welcome.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="mt-6 flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 border-b border-ink/30 bg-transparent py-2.5 font-sans text-sm text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 border border-ink bg-ink px-6 py-2.5 font-sans text-xs uppercase tracking-widest text-bone hover:bg-gold hover:border-gold hover:text-white transition-colors"
                  >
                    <MailIcon className="h-3.5 w-3.5" />
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Reader Modal */}
      <JournalArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      <ClosingCta
        title="Have an essay or collaboration idea?"
        intro="We frequently invite guest cultural critics, typographers, and architects to share notes from their benches."
      />
    </main>
  );
}
