import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckIcon, MapPinIcon, MessageCircleIcon, PhoneCallIcon, ClockIcon, SendIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Button, ButtonAnchor } from '../components/Button';
import { ImageReveal, Reveal } from '../components/Reveal';
import { contactDetails } from '../data/site';
import { PuneClock } from '../components/PuneClock';
import { EASE_ENTRY } from '../utils/motion';

interface FormState {
  name: string;
  email: string;
  company: string;
  brief: string;
  budget: string;
  services: string[];
}

const emptyForm: FormState = {
  name: '',
  email: '',
  company: '',
  brief: '',
  budget: '',
  services: []
};

const serviceOptions = [
  'Brand Identity',
  'Packaging & Print',
  'Spatial Architecture',
  'Digital Experience',
  'Retained Advisory'
];

const fieldClass =
  'w-full border-b border-ink/20 bg-transparent pb-3 pt-2 font-sans text-[15px] text-ink transition-colors duration-200 ease-premium placeholder:text-ink/30 focus:border-gold focus:outline-none';

export function Contact() {
  const reduced = useReducedMotion();
  const location = useLocation();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  // Check if routed from ProjectEstimator
  useEffect(() => {
    if (location.state) {
      const { prefillBrief, prefillBudget } = location.state as {
        prefillBrief?: string;
        prefillBudget?: string;
      };
      if (prefillBrief || prefillBudget) {
        setForm((prev) => ({
          ...prev,
          brief: prefillBrief || prev.brief,
          budget: prefillBudget || prev.budget
        }));
      }
    }
  }, [location.state]);

  const update = (key: keyof FormState) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((current) => ({ ...current, [key]: event.target.value }));

  const toggleService = (srv: string) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(srv)
        ? prev.services.filter((s) => s !== srv)
        : [...prev.services, srv]
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.brief.trim()) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    window.setTimeout(() => setStatus('sent'), 950);
  };

  return (
    <main>
      <PageHeader
        eyebrow="Initiate Dialogue"
        title="Tell us what you’re building."
        intro="A single paragraph is enough to start. We read every brief directly at the studio bench and reply within two working days."
      />

      <section className="bg-bone px-6 pb-28 md:px-10 md:pb-36">
        <div className="mx-auto grid max-w-shell gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left: Dynamic Form */}
          <div className="lg:col-span-7">
            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE_ENTRY }}
                className="border border-ink/15 bg-bone-dim p-8 md:p-12 shadow-sm"
                role="status"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold text-white">
                  <CheckIcon className="h-6 w-6" strokeWidth={2} />
                </span>
                <h2 className="mt-6 font-display text-3xl sm:text-4xl font-light text-ink">
                  Thank you, {form.name.split(' ')[0]}.
                </h2>
                <p className="mt-4 font-sans text-[15px] leading-relaxed text-ink/75 max-w-lg">
                  Your brief is currently with Arjun Kala and our senior team. Expect our initial observations and project availability response within 48 business hours.
                </p>

                <div className="mt-8 pt-6 border-t border-ink/10 flex flex-wrap items-center gap-4">
                  <ButtonAnchor href={contactDetails.bookingHref} variant="solid" withArrow>
                    Schedule Direct Strategy Call
                  </ButtonAnchor>
                  <ButtonAnchor href={contactDetails.whatsappHref} variant="outline">
                    <MessageCircleIcon className="h-4 w-4 text-emerald-600" />
                    Open WhatsApp Chat
                  </ButtonAnchor>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="border-t border-ink/12 pt-8">
                {/* Discipline pills */}
                <div>
                  <label className="block font-sans text-[11px] uppercase tracking-widest text-ink/45 mb-3">
                    Disciplines Required
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((srv) => {
                      const isChecked = form.services.includes(srv);
                      return (
                        <button
                          key={srv}
                          type="button"
                          onClick={() => toggleService(srv)}
                          className={`px-3.5 py-1.5 font-sans text-xs uppercase tracking-wider border rounded-full transition-colors ${
                            isChecked
                              ? 'border-gold bg-gold text-white'
                              : 'border-ink/20 text-ink/70 hover:border-ink'
                          }`}
                        >
                          {srv}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-10 grid gap-10 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="font-sans text-[11px] uppercase tracking-widest text-ink/45">
                      Your Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={update('name')}
                      placeholder="e.g. Meera Raghunathan"
                      className={fieldClass}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="font-sans text-[11px] uppercase tracking-widest text-ink/45">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={update('email')}
                      placeholder="meera@aranyahouse.in"
                      className={fieldClass}
                      required
                    />
                  </div>
                </div>

                <div className="mt-10">
                  <label htmlFor="company" className="font-sans text-[11px] uppercase tracking-widest text-ink/45">
                    Brand or Organisation Name
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={update('company')}
                    placeholder="Aranya House Textiles"
                    className={fieldClass}
                  />
                </div>

                <div className="mt-10">
                  <label htmlFor="brief" className="font-sans text-[11px] uppercase tracking-widest text-ink/45">
                    Project Vision & Objectives *
                  </label>
                  <textarea
                    id="brief"
                    name="brief"
                    rows={4}
                    value={form.brief}
                    onChange={update('brief')}
                    placeholder="What are you building, what timeline are you working toward, and what challenge are you seeking to resolve?"
                    className={`${fieldClass} resize-none`}
                    required
                  />
                </div>

                <div className="mt-10">
                  <label htmlFor="budget" className="font-sans text-[11px] uppercase tracking-widest text-ink/45">
                    Anticipated Investment Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={form.budget}
                    onChange={update('budget')}
                    className={`${fieldClass} appearance-none bg-bone`}
                  >
                    <option value="">Select a planned range</option>
                    {contactDetails.budgetRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>

                {status === 'error' && (
                  <p role="alert" className="mt-6 font-sans text-xs text-rose-600">
                    Please provide your name, valid email, and project vision so we can respond thoughtfully.
                  </p>
                )}

                <div className="mt-10 flex items-center gap-4">
                  <Button
                    type="submit"
                    variant="solid"
                    withArrow
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? 'Transmitting Brief…' : 'Submit Project Brief'}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Studio Location, Live Clock & Direct Channels */}
          <aside className="lg:col-span-5 space-y-8">
            <ImageReveal
              src="/b927e5fb-31d6-4afe-8ee1-f1c3901d6dfd.jpg"
              alt="The Kala Creative studio courtyard in Kalyani Nagar, Pune"
              className="aspect-[4/3] w-full"
            />

            <div className="border border-ink/15 bg-bone-dim p-6">
              <div className="flex items-center justify-between pb-4 border-b border-ink/10">
                <span className="font-sans text-[10px] uppercase tracking-widest text-gold-deep">
                  Studio Presence
                </span>
                <PuneClock />
              </div>

              <dl className="mt-5 space-y-4 font-sans text-sm">
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-ink/40">Studio Location</dt>
                  <dd className="mt-1 text-ink/80 leading-snug">
                    {contactDetails.address}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-ink/40">Email Correspondence</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${contactDetails.email}`}
                      className="text-ink hover:text-gold-deep transition-colors"
                    >
                      {contactDetails.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-ink/40">Direct Phone</dt>
                  <dd className="mt-1">
                    <a
                      href={`tel:${contactDetails.phone.replace(/\s/g, '')}`}
                      className="text-ink hover:text-gold-deep transition-colors"
                    >
                      {contactDetails.phone}
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="mt-6 pt-5 border-t border-ink/10 flex flex-col gap-2.5">
                <ButtonAnchor href={contactDetails.bookingHref} variant="solid" withArrow className="w-full text-center">
                  {contactDetails.bookingLabel}
                </ButtonAnchor>
                <ButtonAnchor href={contactDetails.whatsappHref} variant="outline" className="w-full text-center">
                  <MessageCircleIcon className="h-4 w-4 text-emerald-600" />
                  Chat on WhatsApp
                </ButtonAnchor>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
