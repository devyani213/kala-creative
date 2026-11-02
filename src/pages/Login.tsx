import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LockIcon,
  UnlockIcon,
  DownloadIcon,
  CheckCircle2Icon,
  ClockIcon,
  FileTextIcon,
  MessageCircleIcon,
  LogOutIcon,
  ExternalLinkIcon,
  SparklesIcon
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { demoClientProject, contactDetails } from '../data/site';
import { EASE_ENTRY } from '../utils/motion';

export function Login() {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (passcode.trim().toUpperCase() === 'ARANYA' || passcode.trim().toUpperCase() === 'DEMO' || passcode.trim() === '1234') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid project access code. Enter "DEMO" or click below for instant preview.');
    }
  };

  const handleDemoAccess = () => {
    setPasscode('ARANYA');
    setIsAuthenticated(true);
    setErrorMsg('');
  };

  const triggerDownload = (assetName: string) => {
    setDownloadToast(`Preparing ${assetName} package…`);
    setTimeout(() => {
      setDownloadToast(`✓ Downloaded ${assetName}`);
      setTimeout(() => setDownloadToast(null), 3500);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-ink-deep text-bone pt-28 pb-20 px-6 md:px-10">
      <div className="mx-auto max-w-shell">
        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            <motion.div
              key="login-screen"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: EASE_ENTRY }}
              className="mx-auto max-w-md py-12 md:py-20"
            >
              <div className="text-center">
                <Logo tone="bone" size={54} />
                <h1 className="mt-8 font-display text-3xl md:text-4xl font-light text-bone">
                  Studio Client Access
                </h1>
                <p className="mt-3 font-sans text-sm text-bone/60 leading-relaxed">
                  Enter your assigned project access key to view active sprint deliverables, production proofs, and your brand vector vault.
                </p>
              </div>

              <form onSubmit={handleLogin} className="mt-10 border border-bone/15 bg-ink p-8 shadow-2xl">
                <div>
                  <label htmlFor="passcode" className="block font-sans text-[11px] uppercase tracking-widest text-gold-soft">
                    Project Access Code
                  </label>
                  <div className="relative mt-2.5">
                    <input
                      id="passcode"
                      type="text"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="e.g. ARANYA or DEMO"
                      className="w-full border-b border-bone/20 bg-transparent py-3 pr-10 font-sans text-lg uppercase tracking-widest text-bone placeholder:text-bone/25 focus:border-gold focus:outline-none"
                      autoFocus
                    />
                    <LockIcon className="absolute right-2 top-3.5 h-4 w-4 text-bone/40" />
                  </div>
                </div>

                {errorMsg && (
                  <p className="mt-4 font-sans text-xs text-rose-300">
                    {errorMsg}
                  </p>
                )}

                <div className="mt-8 flex flex-col gap-3">
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 border border-gold bg-gold px-6 py-3 font-sans text-xs uppercase tracking-[0.2em] font-medium text-ink-deep transition-all duration-300 hover:bg-gold-soft"
                  >
                    <UnlockIcon className="h-3.5 w-3.5" />
                    Enter Project Vault
                  </button>

                  <button
                    type="button"
                    onClick={handleDemoAccess}
                    className="inline-flex w-full items-center justify-center gap-2 border border-bone/20 bg-transparent px-6 py-3 font-sans text-xs uppercase tracking-[0.2em] text-bone/80 transition-all duration-300 hover:border-gold hover:text-gold"
                  >
                    <SparklesIcon className="h-3.5 w-3.5 text-gold" />
                    Explore Demo Client Vault (Aranya House)
                  </button>
                </div>
              </form>

              <div className="mt-8 text-center">
                <p className="font-sans text-xs text-bone/45">
                  Need access to your project? Contact your lead director at{' '}
                  <a href={`mailto:${contactDetails.email}`} className="text-gold-soft underline hover:text-gold">
                    {contactDetails.email}
                  </a>
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="portal-vault"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: EASE_ENTRY }}
              className="space-y-12"
            >
              {/* Header Banner */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-bone/15 pb-8">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-3 py-1 font-sans text-[10px] uppercase tracking-widest text-gold-soft">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Active Client Session
                  </div>
                  <h1 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-light text-bone">
                    {demoClientProject.brandName}
                  </h1>
                  <p className="mt-2 font-sans text-sm text-bone/60">
                    Welcome back, <span className="text-bone font-medium">{demoClientProject.clientName}</span> · Project Code: <span className="font-mono text-gold-soft">{demoClientProject.code}</span>
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <a
                    href={contactDetails.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border border-bone/20 bg-bone/5 px-4 py-2.5 font-sans text-xs uppercase tracking-widest text-bone transition-colors hover:border-gold hover:text-gold"
                  >
                    <MessageCircleIcon className="h-3.5 w-3.5 text-emerald-400" />
                    Lead Director Hotline
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsAuthenticated(false)}
                    className="inline-flex items-center gap-2 border border-bone/15 px-4 py-2.5 font-sans text-xs uppercase tracking-widest text-bone/50 transition-colors hover:text-bone"
                  >
                    <LogOutIcon className="h-3.5 w-3.5" />
                    Sign Out
                  </button>
                </div>
              </div>

              {/* Progress & Milestone Overview */}
              <div className="grid gap-6 md:grid-cols-3">
                <div className="border border-bone/15 bg-ink p-6">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-gold-soft">Current Milestone</span>
                  <p className="mt-3 font-display text-xl sm:text-2xl font-light text-bone">
                    {demoClientProject.phase}
                  </p>
                  <div className="mt-5">
                    <div className="flex justify-between text-xs font-sans text-bone/60 mb-2">
                      <span>Overall Completion</span>
                      <span className="tabular-nums text-gold">{demoClientProject.completion}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-bone/10 overflow-hidden rounded-full">
                      <div
                        className="h-full bg-gold transition-all duration-1000"
                        style={{ width: `${demoClientProject.completion}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="border border-bone/15 bg-ink p-6">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-gold-soft">Studio Partners</span>
                  <p className="mt-3 font-display text-xl sm:text-2xl font-light text-bone">
                    {demoClientProject.leadPartner}
                  </p>
                  <p className="mt-3 font-sans text-xs text-bone/50">
                    Direct oversight across identity architecture & Bhiwandi offset printing supervision.
                  </p>
                </div>

                <div className="border border-bone/15 bg-ink p-6">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-gold-soft">Target Launch Date</span>
                  <p className="mt-3 font-display text-xl sm:text-2xl font-light text-bone">
                    {demoClientProject.targetLaunch}
                  </p>
                  <p className="mt-3 font-sans text-xs text-bone/50">
                    Flagship opening in Pune + London export collateral delivery schedule.
                  </p>
                </div>
              </div>

              {/* Asset Vault & Recent Activity */}
              <div className="grid gap-12 lg:grid-cols-12">
                {/* Vault Deliverables */}
                <div className="lg:col-span-7">
                  <div className="flex items-center justify-between border-b border-bone/15 pb-4">
                    <h2 className="font-display text-2xl font-light text-bone">
                      Production Asset Vault
                    </h2>
                    <span className="font-sans text-xs text-bone/40 uppercase tracking-widest">
                      {demoClientProject.assets.length} Files Ready
                    </span>
                  </div>

                  <div className="mt-6 divide-y divide-bone/10 border border-bone/15 bg-ink">
                    {demoClientProject.assets.map((asset) => (
                      <div
                        key={asset.name}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 transition-colors hover:bg-bone/5"
                      >
                        <div className="flex items-start gap-3.5">
                          <FileTextIcon className="mt-1 h-5 w-5 shrink-0 text-gold" />
                          <div>
                            <p className="font-sans text-sm font-medium text-bone">
                              {asset.name}
                            </p>
                            <p className="mt-1 font-sans text-xs text-bone/45">
                              {asset.type} · {asset.size}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-sans rounded-full ${
                              asset.status === 'Ready'
                                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                                : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                            }`}
                          >
                            {asset.status}
                          </span>
                          <button
                            type="button"
                            onClick={() => triggerDownload(asset.name)}
                            className="inline-flex items-center gap-1.5 border border-bone/20 px-3 py-1.5 font-sans text-[11px] uppercase tracking-widest text-bone/80 transition-colors hover:border-gold hover:text-gold"
                          >
                            <DownloadIcon className="h-3 w-3" />
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Studio Activity Log */}
                <div className="lg:col-span-5">
                  <div className="flex items-center justify-between border-b border-bone/15 pb-4">
                    <h2 className="font-display text-2xl font-light text-bone">
                      Studio Activity & Proofs
                    </h2>
                    <ClockIcon className="h-4 w-4 text-gold-soft" />
                  </div>

                  <div className="mt-6 space-y-4">
                    {demoClientProject.recentUpdates.map((update, i) => (
                      <div key={i} className="border border-bone/15 bg-ink p-5">
                        <div className="flex items-center justify-between font-sans text-[11px] uppercase tracking-widest text-gold-soft">
                          <span>{update.date}</span>
                          <CheckCircle2Icon className="h-3.5 w-3.5 text-emerald-400" />
                        </div>
                        <h3 className="mt-2 font-display text-lg font-light text-bone">
                          {update.title}
                        </h3>
                        <p className="mt-2 font-sans text-xs leading-relaxed text-bone/60">
                          {update.detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 border border-gold/30 bg-gold/5 p-6 text-center">
                    <p className="font-display text-xl font-light text-gold-soft">
                      Next Review Milestone
                    </p>
                    <p className="mt-2 font-sans text-xs text-bone/70 leading-relaxed">
                      Physical print drawdowns and deboss samples arriving at your Mumbai office on Thursday, Nov 6.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Download Toast */}
        <AnimatePresence>
          {downloadToast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-8 right-8 z-[100] flex items-center gap-3 border border-gold bg-ink-deep px-5 py-3.5 font-sans text-xs uppercase tracking-widest text-bone shadow-2xl"
            >
              <span className="h-2 w-2 rounded-full bg-gold animate-ping" />
              <span>{downloadToast}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

