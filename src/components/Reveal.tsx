import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  childVariants,
  EASE_ENTRY,
  groupVariants,
  revealTransition,
  viewportOnce } from
'../utils/motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel in px. Kept small on purpose. */
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
      transition={{ ...revealTransition, delay }}>
      
      {children}
    </motion.div>);

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
      viewport={viewportOnce}>
      
      {children}
    </motion.div>);

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
      reduced ?
      { hidden: { opacity: 0 }, visible: { opacity: 1, transition: revealTransition } } :
      childVariants
      }>
      
      {children}
    </motion.div>);

}

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  delay?: number;
  /** Adds a hover zoom. Use for cards and clickable imagery only. */
  hoverZoom?: boolean;
}

/** An image that is uncovered by a rising mask, with the frame settling as it lands. */
export function ImageReveal({
  src,
  alt,
  className = '',
  imageClassName = '',
  delay = 0,
  hoverZoom = false
}: ImageRevealProps) {
  const reduced = useReducedMotion();

  return (
    <div className={`relative overflow-hidden bg-ink/5 ${className}`}>
      <motion.div
        className="h-full w-full"
        initial={
        reduced ?
        { opacity: 0 } :
        { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.06 }
        }
        whileInView={
        reduced ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }
        }
        viewport={viewportOnce}
        transition={{ duration: 0.95, ease: EASE_ENTRY, delay }}>
        
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`h-full w-full object-cover ${
          hoverZoom ?
          'transition-transform duration-500 ease-premium group-hover:scale-[1.04]' :
          ''} ${
          imageClassName}`} />
        
      </motion.div>
    </div>);

}