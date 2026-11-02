import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRightIcon, DownloadIcon } from 'lucide-react';
import { contactDetails, studioImages } from '../data/site';

export function ClosingCta() {
  const reduced = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-ink-deep px-6 py-24 text-bone md:px-10 md:py-32">
      <div className="mx-auto max-w-shell">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-gold">Start a conversation</p>
            <h2 className="mt-5 max-w-xl font-display text-[2.8rem] font-light leading-[1.04] sm:text-[4.5rem]">Want to know more?</h2>
            <p className="mt-6 max-w-md font-sans text-[15px] leading-[1.8] text-bone/55">Tell us what you are building. We will tell you honestly whether Kala is the right studio for it.</p>
            <a href={`mailto:${contactDetails.email}`} className="group mt-8 inline-flex items-center gap-2 border-b border-bone/20 pb-2 font-sans text-[11px] uppercase tracking-[0.2em] text-bone/75 hover:border-gold hover:text-gold">{contactDetails.email}<ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>

            <div className="mt-14 overflow-hidden border border-bone/12 bg-bone/[0.025]">
              <img src={studioImages.reception} alt="Kala Creative studio reception" loading="lazy" className="aspect-[16/8] w-full object-cover opacity-90" />
              <div className="p-6">
                <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-gold">Take the studio with you</p>
                <h3 className="mt-3 font-display text-2xl font-light">Download our brochure</h3>
                <p className="mt-2 max-w-sm font-sans text-sm leading-relaxed text-bone/45">A compact introduction to our disciplines, approach and selected work.</p>
                <a href="/kala-creative-brochure.pdf" download className="mt-6 inline-flex items-center gap-2 border border-bone/25 px-5 py-3 font-sans text-[10px] uppercase tracking-[0.2em] transition-colors hover:border-gold hover:bg-gold hover:text-ink-deep"><DownloadIcon className="h-3.5 w-3.5" /> Download brochure</a>
              </div>
            </div>
          </div>

          <motion.form onSubmit={(e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); setSubmitted(true); }} initial={{ opacity: 0, y: reduced ? 0 : 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }} className="space-y-7">
            {[
              ['Name', 'name', 'text'], ['Email', 'email', 'email'], ['Phone', 'phone', 'tel'], ['Company / Brand', 'company', 'text']
            ].map(([label, name, type]) => (
              <label key={name} className="block"><span className="mb-2 block font-sans text-[10px] uppercase tracking-[0.18em] text-bone/45">{label}</span><input required name={name} type={type} className="w-full border-0 border-b border-bone/35 bg-transparent px-0 py-3 font-sans text-[15px] text-bone outline-none transition-colors placeholder:text-bone/20 focus:border-gold" /></label>
            ))}
            <label className="block"><span className="mb-2 block font-sans text-[10px] uppercase tracking-[0.18em] text-bone/45">Message</span><textarea required name="message" rows={4} className="w-full resize-none border-0 border-b border-bone/35 bg-transparent px-0 py-3 font-sans text-[15px] text-bone outline-none transition-colors placeholder:text-bone/20 focus:border-gold" /></label>
            <button type="submit" className="inline-flex items-center gap-3 border border-gold bg-gold px-6 py-3.5 font-sans text-[10px] uppercase tracking-[0.2em] text-ink-deep transition-all hover:-translate-y-0.5 hover:bg-gold-soft">{submitted ? 'Thanks — we received this' : 'Get in touch'}<ArrowUpRightIcon className="h-3.5 w-3.5" /></button>
            <p className="font-sans text-[10px] leading-relaxed text-bone/30">This form currently provides the front-end experience. Connect it to your preferred form/email backend before production.</p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
