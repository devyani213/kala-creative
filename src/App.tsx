import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { EntranceProvider } from './contexts/EntranceContext';
import { EASE_ENTRY } from './utils/motion';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Portfolio } from './pages/Portfolio';
import { CaseStudy } from './pages/CaseStudy';
import { Pricing } from './pages/Pricing';
import { Journal } from './pages/Journal';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';

function RoutedContent() {
  const location = useLocation();
  const reduced = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduced ? 0.001 : 0.28, ease: EASE_ENTRY }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<CaseStudy />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/portal" element={<Login />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

interface AppProps {
  /** Play the branded loading panel on first open. */
  showPreloader?: boolean;
  /** Hairline pointer ring on desktop. Automatically off for touch and reduced motion. */
  customCursor?: boolean;
}

export function App({ showPreloader = true, customCursor = true }: AppProps) {
  const [loading, setLoading] = useState(showPreloader);
  const handleComplete = useCallback(() => setLoading(false), []);

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <BrowserRouter>
      <EntranceProvider ready={!loading}>
        <div className="min-h-screen w-full bg-bone">
          <AnimatePresence>
            {loading && <Preloader key="preloader" onComplete={handleComplete} />}
          </AnimatePresence>

          {customCursor && <CustomCursor />}
          <ScrollProgress />
          <Navigation />
          <RoutedContent />
          <Footer />
        </div>
      </EntranceProvider>
    </BrowserRouter>
  );
}
