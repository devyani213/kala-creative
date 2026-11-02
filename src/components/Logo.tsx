import React from 'react';

interface LogoProps {
  /** Colour of the wordmark. The dot always stays gold. */
  tone?: 'ink' | 'bone';
  /** Overall scale in px for the Devanagari mark. */
  size?: number;
  className?: string;
}

export function Logo({ tone = 'ink', size = 34, className = '' }: LogoProps) {
  const color = tone === 'ink' ? 'text-ink' : 'text-bone';

  return (
    <span
      className={`inline-flex flex-col items-end leading-none ${color} ${className}`}
      aria-hidden="true">
      
      <span className="relative font-deva" style={{ fontSize: size, lineHeight: 1 }}>
        कला
        <span
          className="absolute rounded-full bg-gold"
          style={{
            width: size * 0.16,
            height: size * 0.16,
            top: -size * 0.16,
            right: size * 0.04
          }} />
        
      </span>
      <span
        className="font-sans font-medium uppercase text-gold"
        style={{
          fontSize: Math.max(7, size * 0.2),
          letterSpacing: size * 0.075,
          marginTop: size * 0.14,
          marginRight: -size * 0.075
        }}>
        
        Creative
      </span>
    </span>);

}