import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Toaster } from 'sonner';
import { CONTENT } from './data/content';
import { Lang } from './types';
import { getVoucherFromURL, getRedirectURL } from './utils/voucher';
import Hero from './components/Hero';
import ComparisonSection from './components/ComparisonSection';
import CuratorQuiz from './components/CuratorQuiz';
import OfferSection from './components/OfferSection';
import OfferSectionSecondary from './components/OfferSectionSecondary';
import CookieConsent from './components/CookieConsent';

// Lazy load heavy components
const FeaturesBento = lazy(() => import('./components/FeaturesBento'));
const Process = lazy(() => import('./components/Process'));
const Timeline = lazy(() => import('./components/Timeline'));
const FAQ = lazy(() => import('./components/FAQ'));

// Loading component
const LoadingFallback = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-800 rounded-full animate-spin"></div>
  </div>
);

// Main App Component
const App = () => {
  const [lang, setLang] = useState<Lang>('de');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCtaClick = () => {
    const voucher = getVoucherFromURL();
    window.location.href = getRedirectURL(voucher);
  };

  return (
    <main className="bg-gallery-white min-h-screen text-gallery-black selection:bg-int-orange selection:text-white font-sans">
      <Toaster position="bottom-center" richColors />
      {/* Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-white/80 backdrop-blur-md border-b border-gray-100' : 'py-8 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center">
            <a href="https://canvasnova.com">
              <img src="/logo.webp" alt="canvasnova" className="h-8 w-auto" />
            </a>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => scrollToSection('quiz')}
              className="hidden md:block text-neutral-500 hover:text-black px-5 py-2 text-sm font-medium transition-colors"
            >
              {CONTENT[lang].nav.cta}
            </button>
          </div>
        </div>
      </nav>

      <Hero onAnalyzeClick={handleCtaClick} lang={lang} />

      <Suspense fallback={<LoadingFallback />}>
        <FeaturesBento lang={lang} />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <Process onCtaClick={handleCtaClick} />
      </Suspense>

      <OfferSection id="ticket" lang={lang} />
      <ComparisonSection id="comparison" lang={lang} onCtaClick={handleCtaClick} />

      <Suspense fallback={<LoadingFallback />}>
        <Timeline lang={lang} />
      </Suspense>

      <CuratorQuiz id="quiz" lang={lang} onCtaClick={handleCtaClick} />
      <OfferSectionSecondary lang={lang} />

      <Suspense fallback={<LoadingFallback />}>
        <FAQ lang={lang} />
      </Suspense>

      {/* Cookie Consent Banner */}
      <CookieConsent />

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-6 text-center border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
          <h4 className="font-serif text-2xl">canvasnova</h4>
          <p className="text-gray-500 text-sm max-w-sm">
            {CONTENT[lang].footer.desc}
          </p>
          <div className="flex gap-4">
            {[
              { name: 'Instagram', url: 'https://www.instagram.com/canvasnova_com/' },
              { name: 'TikTok', url: 'https://www.tiktok.com/@canvasnova.com' },
              { name: 'Impressum', url: 'https://www.canvasnova.com/imprint' },
              { name: 'Datenschutz', url: 'https://www.canvasnova.com/privacy-policy' }
            ].map(social => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-white uppercase tracking-widest transition-colors"
              >
                {social.name}
              </a>
            ))}
          </div>
          <p className="text-gray-700 text-xs mt-8">{CONTENT[lang].footer.rights}</p>
        </div>
      </footer>
    </main>
  );
};

export default App;