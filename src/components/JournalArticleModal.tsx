import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, Share2Icon, CheckIcon, BookOpenIcon, ClockIcon } from 'lucide-react';
import type { JournalEntry } from '../types/content';
import { EASE_ENTRY } from '../utils/motion';

interface JournalArticleModalProps {
  article: JournalEntry | null;
  onClose: () => void;
}

export function JournalArticleModal({ article, onClose }: JournalArticleModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!article) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [article, onClose]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <AnimatePresence>
      {article && (
        <motion.div
          className="fixed inset-0 z-[140] flex justify-end bg-ink-deep/75 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.article
            className="relative h-full w-full max-w-2xl overflow-y-auto bg-bone p-6 sm:p-12 md:p-16 text-ink shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: EASE_ENTRY }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between border-b border-ink/15 pb-6">
              <div className="flex items-center gap-3 font-sans text-xs uppercase tracking-widest text-gold-deep">
                <BookOpenIcon className="h-4 w-4" />
                <span>Kala Journal</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center gap-1.5 border border-ink/20 px-3 py-1.5 font-sans text-[11px] uppercase tracking-wider text-ink/70 hover:border-gold hover:text-gold-deep transition-colors"
                >
                  {copied ? <CheckIcon className="h-3 w-3 text-emerald-600" /> : <Share2Icon className="h-3 w-3" />}
                  <span>{copied ? 'Link Copied' : 'Share'}</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 text-ink/70 hover:bg-ink hover:text-bone transition-colors"
                  aria-label="Close article"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Article Header */}
            <div className="mt-8">
              <div className="flex items-center gap-3 font-sans text-[11px] uppercase tracking-widest text-ink/50">
                <span>{article.category}</span>
                <span>·</span>
                <span>{article.date}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <ClockIcon className="h-3 w-3" />
                  {article.readTime}
                </span>
              </div>

              <h1 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-light leading-tight text-ink">
                {article.title}
              </h1>

              {article.author && (
                <p className="mt-4 font-sans text-xs uppercase tracking-widest text-gold-deep">
                  Words by {article.author} · Pune Studio
                </p>
              )}
            </div>

            {/* Featured Image */}
            <div className="mt-8 overflow-hidden border border-ink/10">
              <img
                src={article.image}
                alt={article.title}
                className="aspect-[16/10] w-full object-cover"
              />
            </div>

            {/* Article Prose Content */}
            <div className="mt-10 space-y-6 font-sans text-[16px] leading-[1.85] text-ink/80">
              {article.content && article.content.length > 0 ? (
                article.content.map((paragraph, idx) => (
                  <p key={idx} className={idx === 0 ? 'first-letter:font-display first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:text-gold-deep' : ''}>
                    {paragraph}
                  </p>
                ))
              ) : (
                <p>{article.excerpt}</p>
              )}
            </div>

            {/* Article Footer & Inquiry */}
            <div className="mt-16 border-t border-ink/15 pt-8">
              <p className="font-display text-xl font-light text-ink">
                Have a thought on this piece?
              </p>
              <p className="mt-2 font-sans text-xs leading-relaxed text-ink/60">
                We write these notes directly from our benches in Kalyani Nagar. Reach out to the author directly at{' '}
                <a href="mailto:studio@kalacreative.in" className="text-gold-deep underline hover:text-ink">
                  studio@kalacreative.in
                </a>
              </p>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

