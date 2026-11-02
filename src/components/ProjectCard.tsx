import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from 'lucide-react';
import type { Project } from '../types/content';

interface ProjectCardProps {
  project: Project;
  index?: number;
  aspect?: string;
  delay?: number;
}

export function ProjectCard({
  project,
  index,
  aspect = 'aspect-[4/5]'
}: ProjectCardProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link
      to={`/portfolio/${project.slug}`}
      className="group block focus-visible:outline-none"
      data-cursor="hover"
      data-cursor-label="Open"
      aria-label={`${project.title} — ${project.category} case study`}
    >
      <div className={`relative overflow-hidden bg-bone-dim border border-ink/10 shadow-sm ${aspect} w-full`}>
        {/* Real Project Image with smooth scale on hover */}
        <img
          src={project.image}
          alt={project.title}
          loading="eager"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105 ${
            loaded ? 'opacity-100' : 'opacity-95'
          }`}
        />

        {/* Elegant subtle hover overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-deep/80 via-ink-deep/20 to-transparent opacity-0 transition-opacity duration-300 ease-premium group-hover:opacity-100" />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 p-6 opacity-0 transition-[opacity,transform] duration-300 ease-premium group-hover:translate-y-0 group-hover:opacity-100 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-widest text-bone">
            View Case Study
            <ArrowUpRightIcon className="h-3.5 w-3.5 text-gold" strokeWidth={1.8} />
          </span>
          <span className="rounded-full border border-gold/40 bg-ink/70 px-2.5 py-0.5 font-sans text-[9px] uppercase tracking-widest text-gold-soft">
            {project.category}
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <h3 className="font-display text-2xl font-light text-ink transition-colors duration-300 ease-premium group-hover:text-gold-deep">
            {project.title}
          </h3>
          <p className="mt-1.5 font-sans text-[12px] uppercase tracking-[0.16em] text-ink/50">
            {project.category} — {project.year}
          </p>
        </div>
        {typeof index === 'number' && (
          <span className="font-sans text-[11px] tabular-nums tracking-widest text-gold-deep font-semibold">
            {String(index + 1).padStart(2, '0')}
          </span>
        )}
      </div>
    </Link>
  );
}
