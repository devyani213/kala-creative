import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  childVariants,
  EASE_ENTRY,
  groupVariants,
  revealTransition,
  viewportOnce
} from '../utils/motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/** A single element that fades and lifts into place once, when it scrolls into view. */
export function Reveal({ children, className = '', delay = 0, y = 20 }: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}

/** Wrap a group of related items; each child using `StaggerItem` arrives in sequence. */
export function Stagger({ children, className = '', stagger = 0.08, delay = 0 }: StaggerProps) {
  return (
    <motion.div
      className={className}
      variants={groupVariants(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={
        reduced
          ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: revealTransition } }
          : childVariants
      }
    >
      {children}
    </motion.div>
  );
}

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  delay?: number;
  hoverZoom?: boolean;
}

/**
 * Robust image component that guarantees visibility without clipping or leaving a blue background.
 */
export function ImageReveal({
  src,
  alt,
  className = '',
  imageClassName = '',
  delay = 0,
  hoverZoom = false
}: ImageRevealProps) {
  const reduced = useReducedMotion();
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-bone-dim ${className}`}>
      <motion.div
        className="h-full w-full"
        initial={reduced ? { opacity: 1 } : { opacity: 0.85, scale: 1.02 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.6, ease: EASE_ENTRY, delay }}
      >
        <img
          src={src}
          alt={alt}
          loading="eager"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-700 ${
            loaded ? 'opacity-100' : 'opacity-90'
          } ${hoverZoom ? 'group-hover:scale-105' : ''} ${imageClassName}`}
        />
      </motion.div>
    </div>
  );
}
