import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MenuIcon, XIcon, SearchIcon, LockIcon } from 'lucide-react';
import { Logo } from './Logo';
import { navigation } from '../data/site';
import { CommandPalette } from './CommandPalette';
import { PuneClock } from './PuneClock';
import { EASE_ENTRY } from '../utils/motion';

export function Navigation() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const overHero = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const solid = scrolled || !overHero;
  const onDark = overHero && !scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,padding] duration-300 ease-premium ${
          solid
            ? 'border-b border-ink/10 bg-bone/90 py-3 backdrop-blur-md supports-[backdrop-filter]:bg-bone/80'
            : 'border-b border-transparent bg-transparent py-5'
        }`}
      >
        <nav
          className="mx-auto flex max-w-shell items-center justify-between px-6 md:px-10"
          aria-label="Primary"
        >
          {/* Brand Logo & Studio Clock */}
          <div className="flex items-center gap-6">
            <Link to="/" aria-label="Kala Creative — home" className="shrink-0">
              <Logo tone={onDark ? 'bone' : 'ink'} size={scrolled ? 26 : 30} />
            </Link>

            <div className={`hidden xl:block ${onDark ? 'text-bone/50' : 'text-ink/50'}`}>
              <PuneClock />
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden items-center gap-7 lg:flex">
            {navigation.map((item) => {
              const current = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={current ? 'page' : undefined}
                  className={`group relative font-sans text-[12px] uppercase tracking-[0.16em] transition-colors duration-200 ease-premium ${
                    onDark ? 'text-bone/80 hover:text-bone' : 'text-ink/75 hover:text-ink'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-[width] duration-300 ease-premium ${
                      current ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}

            {/* Client Portal Link */}
            <Link
              to="/login"
              className={`group flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-[0.16em] transition-colors ${
                pathname === '/login'
                  ? 'text-gold-deep font-medium'
                  : onDark
                  ? 'text-bone/60 hover:text-gold'
                  : 'text-ink/60 hover:text-gold-deep'
              }`}
            >
              <LockIcon className="h-3 w-3 text-gold" />
              <span>Client Portal</span>
            </Link>

            {/* Search / Command Palette Trigger */}
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className={`flex items-center gap-2 rounded-full border px-3 py-1 font-sans text-[10px] uppercase tracking-wider transition-colors ${
                onDark
                  ? 'border-bone/20 text-bone/60 hover:border-gold hover:text-bone'
                  : 'border-ink/15 text-ink/60 hover:border-gold hover:text-ink'
              }`}
              aria-label="Open search command palette"
            >
              <SearchIcon className="h-3 w-3" />
              <span>Search</span>
              <kbd className="hidden sm:inline-block rounded bg-bone/20 px-1 py-0.5 text-[9px] text-inherit font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Start a project CTA */}
            <Link
              to="/contact"
              className={`group inline-flex items-center border px-4 py-2 font-sans text-[11px] uppercase tracking-[0.18em] transition-[background-color,color,border-color,transform] duration-300 ease-premium active:scale-[0.98] ${
                onDark
                  ? 'border-bone/40 text-bone hover:border-gold hover:bg-gold hover:text-ink-deep'
                  : 'border-ink/30 text-ink hover:border-gold hover:bg-gold hover:text-white'
              }`}
            >
              Start a project
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className={`p-1.5 ${onDark ? 'text-bone/80' : 'text-ink/80'}`}
              aria-label="Search"
            >
              <SearchIcon className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className={`p-1.5 ${onDark ? 'text-bone' : 'text-ink'}`}
            >
              <MenuIcon className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-ink-deep px-6 py-6 lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: EASE_ENTRY }}
          >
            <div className="flex items-center justify-between">
              <Logo tone="bone" size={28} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-bone p-1"
              >
                <XIcon className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </div>

            <motion.ul
              className="mt-12 flex flex-col gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.05, delayChildren: 0.08 }
                }
              }}
            >
              {[
                { label: 'Home', to: '/' },
                ...navigation,
                { label: 'Client Portal', to: '/login' },
                { label: 'Contact', to: '/contact' }
              ].map((item) => (
                <motion.li
                  key={item.to}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4, ease: EASE_ENTRY }
                    }
                  }}
                >
                  <Link
                    to={item.to}
                    className="font-display text-3xl font-light text-bone hover:text-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <div className="mt-auto pt-6 border-t border-bone/15">
              <PuneClock />
              <p className="mt-3 font-sans text-xs uppercase tracking-widest text-bone/50">
                studio@kalacreative.in
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
