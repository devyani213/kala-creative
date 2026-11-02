import React, { useState } from 'react';
import { ArrowUpRightIcon, BoxIcon, MonitorIcon, PenToolIcon, StoreIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '../../data/site';

const icons = [PenToolIcon, BoxIcon, StoreIcon, MonitorIcon];

export function ServicesPreview() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="services-editorial bg-bone text-ink" aria-label="Four disciplines, one standard">
      <div className="mx-auto max-w-shell px-6 py-24 md:px-10 md:py-32 lg:py-36">
        <div className="services-editorial__intro">
          <div className="services-editorial__heading">
            <p className="font-display text-[1.15rem] italic font-light leading-none text-gold sm:text-[1.35rem]">
              What we do —
            </p>
            <h2 className="mt-1 max-w-3xl font-sans text-[2.9rem] font-medium leading-[0.96] tracking-[-0.045em] sm:text-[4.5rem] lg:text-[5.2rem]">
              Four disciplines, one standard.
            </h2>
          </div>

          <p className="mt-7 max-w-xl font-sans text-[14px] leading-[1.75] text-ink/60 sm:text-[15px]">
            Most houses come to us for one and stay for the rest — because the system holds across all of them.
          </p>

          <div className="services-editorial__center-dot" aria-hidden="true">
            <span className="services-editorial__center-dot-core" />
          </div>
        </div>

        <div className="services-editorial__list mt-14 md:mt-16">
          {services.slice(0, 4).map((service, index) => {
            const Icon = icons[index] || MonitorIcon;
            const isHovered = hovered === index;

            return (
              <Link
                key={service.id}
                to="/services"
                className={`services-editorial__row group ${isHovered ? 'is-hovered' : ''}`}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(index)}
                onBlur={() => setHovered(null)}
              >
                <div className="services-editorial__title">
                  <span className="services-editorial__point" aria-hidden="true">
                    <span />
                  </span>
                  <Icon className="h-[18px] w-[18px] shrink-0 stroke-[1.35] text-gold transition-transform duration-500 group-hover:-translate-y-0.5" />
                  <h3 className="font-sans text-[1.35rem] font-normal tracking-[-0.025em] sm:text-[1.55rem] lg:text-[1.65rem]">
                    {service.title}
                  </h3>
                </div>

                <p className="services-editorial__description font-sans text-[13px] leading-[1.75] text-ink/60 sm:text-[14px]">
                  {service.description}
                </p>

                <span className="services-editorial__explore inline-flex items-center justify-self-start gap-2 font-sans text-[9px] uppercase tracking-[0.25em] text-ink/40 transition-colors duration-300 group-hover:text-gold lg:justify-self-end">
                  Explore
                  <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.35} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
