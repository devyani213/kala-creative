import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { SearchIcon, LayoutGridIcon, ListIcon, ArrowUpRightIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { ProjectCard } from '../components/ProjectCard';
import { ClosingCta } from '../components/ClosingCta';
import { projectCategories, projects } from '../data/projects';
import { EASE_ENTRY } from '../utils/motion';
import { Link } from 'react-router-dom';

export function Portfolio() {
  const reduced = useReducedMotion();
  const [category, setCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');

  const visible = useMemo(() => {
    let list = category === 'All' ? projects : projects.filter((p) => p.category === category);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.client.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [category, searchQuery]);

  return (
    <main>
      <PageHeader
        eyebrow="Portfolio & Archive"
        title="The work, in full."
        intro="Every project below shipped into commercial reality. Each case study documents the brief, the craft decisions, the material specifications, and the commercial impact."
      />

      <section className="bg-bone px-6 pb-28 md:px-10 md:pb-36">
        <div className="mx-auto max-w-shell">
          {/* Controls Bar: Category tabs, Search, View switch */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-y border-ink/12 py-4">
            {/* Category tabs */}
            <div
              className="flex flex-wrap items-center gap-x-6 gap-y-3"
              role="group"
              aria-label="Filter projects by category"
            >
              {projectCategories.map((item) => {
                const active = item === category;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    aria-pressed={active}
                    className={`relative py-1 font-sans text-[12px] uppercase tracking-[0.16em] transition-colors duration-200 ease-premium ${
                      active ? 'text-ink font-semibold' : 'text-ink/45 hover:text-ink/80'
                    }`}
                  >
                    {item}
                    {active && (
                      <motion.span
                        layoutId="portfolio-filter"
                        className="absolute -bottom-0.5 left-0 h-px w-full bg-gold"
                        transition={{ duration: 0.28, ease: EASE_ENTRY }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right: Search & Layout Mode */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by keyword…"
                  className="w-40 sm:w-56 border-b border-ink/20 bg-transparent py-1 pl-6 pr-2 font-sans text-xs text-ink placeholder:text-ink/35 focus:border-gold focus:outline-none"
                />
                <SearchIcon className="absolute left-0 top-1.5 h-3.5 w-3.5 text-ink/40" />
              </div>

              <div className="hidden sm:flex items-center border border-ink/20 rounded p-0.5">
                <button
                  type="button"
                  onClick={() => setLayoutMode('grid')}
                  className={`p-1 rounded transition-colors ${layoutMode === 'grid' ? 'bg-ink text-bone' : 'text-ink/50'}`}
                  aria-label="Grid layout"
                >
                  <LayoutGridIcon className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setLayoutMode('list')}
                  className={`p-1 rounded transition-colors ${layoutMode === 'list' ? 'bg-ink text-bone' : 'text-ink/50'}`}
                  aria-label="List layout"
                >
                  <ListIcon className="h-3.5 w-3.5" />
                </button>
              </div>

              <span className="font-sans text-[11px] tabular-nums tracking-widest text-ink/45">
                {String(visible.length).padStart(2, '0')} projects
              </span>
            </div>
          </div>

          {/* Grid View */}
          {layoutMode === 'grid' ? (
            <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {visible.map((project, i) => (
                  <motion.div
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduced ? 0 : -8 }}
                    transition={{ duration: 0.35, ease: EASE_ENTRY, delay: i * 0.03 }}
                    className={i % 2 === 1 ? 'md:pt-16' : undefined}
                  >
                    <ProjectCard
                      project={project}
                      index={i}
                      aspect={i % 2 === 1 ? 'aspect-[4/5]' : 'aspect-[5/6]'}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            /* Editorial List View with High-Resolution Thumbnails */
            <div className="mt-10 divide-y divide-ink/15 border-y border-ink/15">
              {visible.map((project, i) => (
                <Link
                  key={project.slug}
                  to={`/portfolio/${project.slug}`}
                  className="group flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 transition-colors hover:bg-gold/5 px-4 -mx-4"
                >
                  <div className="flex items-center gap-5 sm:gap-6 min-w-0">
                    <span className="font-sans text-xs text-gold-deep tabular-nums font-semibold shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="h-16 w-24 shrink-0 overflow-hidden rounded bg-bone-dim border border-ink/15 shadow-sm">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="min-w-0 truncate">
                      <h2 className="font-display text-2xl sm:text-3xl font-light text-ink group-hover:text-gold-deep transition-colors truncate">
                        {project.title}
                      </h2>
                      <p className="mt-1 font-sans text-xs text-ink/55 truncate">
                        {project.client} · {project.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 self-end md:self-auto font-sans text-xs shrink-0">
                    <span className="rounded-full border border-ink/20 px-3 py-1 uppercase tracking-wider text-ink/60">
                      {project.category}
                    </span>
                    <span className="text-ink/40 tabular-nums">{project.year}</span>
                    <span className="inline-flex items-center gap-1 text-gold-deep uppercase tracking-widest font-medium group-hover:translate-x-1 transition-transform">
                      Inspect <ArrowUpRightIcon className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {visible.length === 0 && (
            <div className="mt-20 py-16 text-center">
              <p className="font-display text-2xl font-light text-ink/60">
                No projects matched your criteria.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 font-sans text-xs uppercase tracking-widest text-gold-deep underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      <ClosingCta
        title="Your brand could anchor this archive."
        intro="Tell us the problem in a single paragraph. We will reply with an unvarnished point of view on how we would approach it."
      />
    </main>
  );
}
