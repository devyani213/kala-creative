import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SearchIcon,
  FolderIcon,
  BookOpenIcon,
  SparklesIcon,
  ArrowRightIcon,
  XIcon,
  ShieldCheckIcon,
  PhoneCallIcon
} from 'lucide-react';
import { projects } from '../data/projects';
import { services, journalEntries, contactDetails } from '../data/site';
import { EASE_ENTRY } from '../utils/motion';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Compile searchable entries
  const allItems = [
    ...projects.map((p) => ({
      title: p.title,
      subtitle: `${p.category} Case Study · ${p.year}`,
      icon: FolderIcon,
      action: () => {
        navigate(`/portfolio/${p.slug}`);
        onClose();
      }
    })),
    ...services.map((s) => ({
      title: s.title,
      subtitle: `Studio Discipline · ${s.timeline}`,
      icon: SparklesIcon,
      action: () => {
        navigate('/services');
        onClose();
      }
    })),
    ...journalEntries.map((j) => ({
      title: j.title,
      subtitle: `Journal Essay · ${j.readTime}`,
      icon: BookOpenIcon,
      action: () => {
        navigate('/journal');
        onClose();
      }
    })),
    {
      title: 'Studio Client Portal (Login)',
      subtitle: 'Private project asset vault & sprint proofs',
      icon: ShieldCheckIcon,
      action: () => {
        navigate('/login');
        onClose();
      }
    },
    {
      title: 'Book a Discovery Call',
      subtitle: 'Schedule a 20-min strategy conversation with Arjun Kala',
      icon: PhoneCallIcon,
      action: () => {
        window.open(contactDetails.bookingHref, '_blank');
        onClose();
      }
    }
  ];

  const filtered = query.trim()
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : allItems.slice(0, 7);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : undefined;
      }
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filtered.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, filtered, selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-start justify-center p-4 pt-20 sm:pt-28 bg-ink-deep/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-xl border border-bone/20 bg-ink-deep text-bone shadow-2xl overflow-hidden"
            initial={{ scale: 0.96, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: EASE_ENTRY }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-bone/15 px-5 py-4">
              <SearchIcon className="h-4 w-4 text-gold" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search works, services, essays, or client portal…"
                className="w-full bg-transparent font-sans text-sm text-bone placeholder:text-bone/40 focus:outline-none"
                autoFocus
              />
              <button
                type="button"
                onClick={onClose}
                className="text-bone/40 hover:text-bone transition-colors"
                aria-label="Close command palette"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-bone/5">
              {filtered.length > 0 ? (
                filtered.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex w-full items-center justify-between p-3 text-left transition-colors ${
                        isSelected ? 'bg-gold/15 text-gold-soft' : 'text-bone/80 hover:bg-bone/5'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon className={`h-4 w-4 shrink-0 ${isSelected ? 'text-gold' : 'text-bone/40'}`} />
                        <div className="truncate">
                          <p className="font-sans text-sm font-light text-bone truncate">{item.title}</p>
                          <p className="font-sans text-[11px] text-bone/45 truncate">{item.subtitle}</p>
                        </div>
                      </div>
                      <ArrowRightIcon className={`h-3.5 w-3.5 shrink-0 ${isSelected ? 'text-gold' : 'text-bone/20'}`} />
                    </button>
                  );
                })
              ) : (
                <div className="py-8 text-center text-sm font-sans text-bone/40">
                  No matches found for “{query}”.
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-bone/15 bg-ink px-4 py-2.5 font-sans text-[10px] uppercase tracking-wider text-bone/40">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Open</span>
                <span>Esc Close</span>
              </div>
              <span className="text-gold-soft">Kala Creative</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

