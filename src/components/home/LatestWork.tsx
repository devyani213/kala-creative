import React from 'react';
import { Link } from 'react-router-dom';
import { InstagramIcon, ArrowUpRightIcon } from 'lucide-react';
import { projects } from '../../data/projects';
import { studioImages } from '../../data/site';
import { Reveal, Stagger, StaggerItem } from '../Reveal';

const feed = [
  { image: projects[1].image, caption: 'Packaging', project: projects[1].title, link: `/portfolio/${projects[1].slug}` },
  { image: studioImages.studioDetail, caption: 'Material & Press', project: 'Studio Bench', link: '/about' },
  { image: projects[3].image, caption: 'Editorial', project: projects[3].title, link: `/portfolio/${projects[3].slug}` },
  { image: studioImages.studioWide, caption: 'Creative Direction', project: 'Studio Floor', link: '/about' },
  { image: projects[2].image, caption: 'Spatial', project: projects[2].title, link: `/portfolio/${projects[2].slug}` },
  { image: projects[4].image, caption: 'Digital', project: projects[4].title, link: `/portfolio/${projects[4].slug}` }
];

export function LatestWork() {
  return (
    <section className="bg-bone px-6 pb-24 pt-4 md:px-10 md:pb-32">
      <div className="mx-auto max-w-shell">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink/10 pb-5">
          <Reveal y={12}>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <p className="font-sans text-[11px] uppercase tracking-widest text-ink/50">
                Visual Dispatches From Pune
              </p>
            </div>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-light text-ink">
              Recent Work & Material Studies
            </h2>
          </Reveal>

          <Reveal y={12} delay={0.08}>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.16em] text-ink/70 transition-colors duration-200 ease-premium hover:text-gold-deep"
            >
              <InstagramIcon className="h-4 w-4 text-gold-deep" strokeWidth={1.5} />
              <span>@kalacreative.in</span>
              <ArrowUpRightIcon className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>

        <Stagger className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6" stagger={0.06}>
          {feed.map((item) => (
            <StaggerItem key={item.caption}>
              <Link
                to={item.link}
                className="group relative block aspect-square overflow-hidden border border-ink/10 bg-ink"
                data-cursor="hover"
                data-cursor-label={item.caption}
              >
                <img
                  src={item.image}
                  alt={item.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
                />
                <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink-deep/90 via-ink-deep/30 to-transparent p-3 text-bone opacity-0 transition-opacity duration-300 ease-premium group-hover:opacity-100">
                  <span className="font-sans text-[9px] uppercase tracking-[0.18em] text-gold-soft">
                    {item.caption}
                  </span>
                  <span className="mt-0.5 font-display text-sm text-bone">
                    {item.project}
                  </span>
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
