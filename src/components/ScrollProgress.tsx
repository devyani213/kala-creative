import React from 'react';
import { motion, useScroll } from 'framer-motion';

/** A very small progress cue that makes long-form pages feel intentional. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[100] h-[2px] origin-left bg-gold"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
