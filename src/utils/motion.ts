import type { Transition, Variants } from 'framer-motion';

/** Strong, expensive-feeling curves. The built-in easings read as weak at these durations. */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;
export const EASE_ENTRY = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const revealTransition: Transition = {
  duration: 0.72,
  ease: EASE_ENTRY
};

/** Parent that staggers its children. Pair with `childVariants`. */
export const groupVariants = (stagger = 0.07, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay }
  }
});

export const childVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: revealTransition }
};

export const staticChildVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE_ENTRY } }
};

/** Viewport config shared by every scroll reveal so the whole page reads consistently. */
export const viewportOnce = { once: true, amount: 0.25, margin: '0px 0px -10% 0px' };