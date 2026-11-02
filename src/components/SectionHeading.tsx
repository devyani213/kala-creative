import React from 'react';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: 'ink' | 'bone';
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = 'ink',
  align = 'left',
  className = ''
}: SectionHeadingProps) {
  const dark = tone === 'bone';

  return (
    <div className={`${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow &&
      <Reveal y={12}>
          <p
          className={`font-sans text-[11px] uppercase tracking-widest ${
          dark ? 'text-gold' : 'text-gold-deep'}`
          }>
          
            {eyebrow}
          </p>
        </Reveal>
      }
      <Reveal delay={0.06}>
        <h2
          className={`mt-4 font-display text-[2.15rem] font-light leading-[1.12] sm:text-5xl ${
          dark ? 'text-bone' : 'text-ink'}`
          }>
          
          {title}
        </h2>
      </Reveal>
      {intro &&
      <Reveal delay={0.12}>
          <p
          className={`mt-5 max-w-xl font-sans text-[15px] leading-relaxed ${
          align === 'center' ? 'mx-auto' : ''} ${
          dark ? 'text-bone/65' : 'text-ink/65'}`}>
          
            {intro}
          </p>
        </Reveal>
      }
    </div>);

}