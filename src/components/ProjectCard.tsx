import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from 'lucide-react';
import { ImageReveal } from './Reveal';
import type { Project } from '../types/content';

interface ProjectCardProps {
  project: Project;
  /** Index shown alongside the title. Pass the position within the visible set. */
  index?: number;
  aspect?: string;
  delay?: number;
}

export function ProjectCard({
  project,
  index,
  aspect = 'aspect-[4/5]',
  delay = 0
}: ProjectCardProps) {
  return (
    <Link
      to={`/portfolio/${project.slug}`}
      className="group block focus-visible:outline-none" data-cursor="hover" data-cursor-label="Open"
      aria-label={`${project.title} — ${project.category} case study`}>
      
      <div className="project-card-media relative overflow-hidden bg-ink">
        <ImageReveal
          src={project.image}
          alt={project.title}
          className={`${aspect} w-full`}
          delay={delay}
          hoverZoom />
        
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-premium group-hover:opacity-100"
          style={{
            background:
            'linear-gradient(to top, rgba(16,28,43,0.78) 0%, rgba(16,28,43,0.1) 55%, transparent 100%)'
          }} />
        
        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 p-6 opacity-0 transition-[opacity,transform] duration-500 ease-premium group-hover:translate-y-0 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-widest text-bone">
            View case study
            <ArrowUpRightIcon className="h-3.5 w-3.5" strokeWidth={1.5} />
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <h3 className="font-display text-2xl font-light text-ink transition-colors duration-300 ease-premium group-hover:text-gold-deep">
            {project.title}
          </h3>
          <p className="mt-1.5 font-sans text-[12px] uppercase tracking-[0.16em] text-ink/45">
            {project.category} — {project.year}
          </p>
        </div>
        {typeof index === 'number' &&
        <span className="font-sans text-[11px] tabular-nums tracking-widest text-ink/30">
            {String(index + 1).padStart(2, '0')}
          </span>
        }
      </div>
    </Link>);

}