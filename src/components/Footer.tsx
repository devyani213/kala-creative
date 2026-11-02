import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon, LockIcon } from 'lucide-react';
import { Logo } from './Logo';
import { contactDetails, navigation } from '../data/site';
import { PuneClock } from './PuneClock';

export function Footer() {
  return (
    <footer className="bg-ink-deep px-6 pb-12 pt-20 text-bone md:px-10 md:pt-24 border-t border-bone/10">
      <div className="mx-auto max-w-shell">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Col 1: Brand & Philosophy */}
          <div>
            <Logo tone="bone" size={38} />
            <p className="mt-7 max-w-sm font-display text-2xl font-light leading-snug text-bone/85">
              An independent design studio in Pune for houses that would rather be remembered than noticed.
            </p>
            <div className="mt-6 text-bone/60">
              <PuneClock />
            </div>
          </div>

          {/* Col 2: Navigation & Studio Vault */}
          <nav aria-label="Footer Navigation">
            <h2 className="font-sans text-[11px] uppercase tracking-widest text-gold-soft font-medium">
              Studio & Index
            </h2>
            <ul className="mt-5 space-y-3">
              {[{ label: 'Home', to: '/' }, ...navigation, { label: 'Contact', to: '/contact' }].map(
                (item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="font-sans text-sm text-bone/70 transition-colors duration-200 ease-premium hover:text-gold"
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
              <li className="pt-2 border-t border-bone/10">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-widest text-gold-soft hover:text-gold transition-colors"
                >
                  <LockIcon className="h-3 w-3" />
                  Client Portal & Vault
                </Link>
              </li>
            </ul>
          </nav>

          {/* Col 3: Coordinates & Channels */}
          <div>
            <h2 className="font-sans text-[11px] uppercase tracking-widest text-gold-soft font-medium">
              Coordinates
            </h2>
            <ul className="mt-5 space-y-3 font-sans text-sm text-bone/70">
              <li>
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="transition-colors duration-200 ease-premium hover:text-gold"
                >
                  {contactDetails.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactDetails.phone.replace(/\s/g, '')}`}
                  className="transition-colors duration-200 ease-premium hover:text-gold"
                >
                  {contactDetails.phone}
                </a>
              </li>
              <li className="text-bone/50 text-xs leading-relaxed">{contactDetails.address}</li>
            </ul>

            <ul className="mt-6 flex flex-wrap gap-4">
              {contactDetails.social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1 font-sans text-xs uppercase tracking-wider text-bone/60 transition-colors hover:text-gold"
                  >
                    {item.label}
                    <ArrowUpRightIcon className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rule-invert mt-16" />
        <div className="mt-8 flex flex-col gap-3 font-sans text-xs text-bone/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Kala Creative Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Kalyani Nagar, Pune 411006</span>
            <span>www.kalacreative.in</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
