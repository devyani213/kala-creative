import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

export function CustomCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    setEnabled(window.matchMedia('(pointer: fine)').matches && !reduced);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add('cursor-host');
    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest('a, button, [data-cursor="hover"]') as HTMLElement | null;
      setActive(Boolean(interactive));
      setLabel(interactive?.dataset.cursorLabel || '');
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      document.body.classList.remove('cursor-host');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 rounded-full bg-gold"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? 1 : 0, scale: active ? 0 : 1 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[90] flex h-9 w-9 items-center justify-center rounded-full border border-gold/70"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? 1 : 0, scale: active ? 1.45 : 0.55 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >
        {label && (
          <span className="whitespace-nowrap rounded-full bg-ink-deep px-2 py-1 font-sans text-[7px] uppercase tracking-[0.18em] text-bone">
            {label}
          </span>
        )}
      </motion.div>
    </>
  );
}
