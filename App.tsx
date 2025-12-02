import React, { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { CONTENT } from './data/content';
import { Lang } from './types';
import { getVoucherFromURL, getRedirectURL } from './utils/voucher';
import Hero from './components/Hero';
import FeaturesBento from './components/FeaturesBento';
import ComparisonSection from './components/ComparisonSection';
import Process from './components/Process';
import CuratorQuiz from './components/CuratorQuiz';
import Timeline from './components/Timeline';
import OfferSection from './components/OfferSection';
import OfferSectionSecondary from './components/OfferSectionSecondary';
import FAQ from './components/FAQ';
import CookieConsent from './components/CookieConsent';

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
      <FeaturesBento lang={lang} />
      <Process onCtaClick={handleCtaClick} />
      <OfferSection id="ticket" lang={lang} />
      <ComparisonSection id="comparison" lang={lang} onCtaClick={handleCtaClick} />
      <Timeline lang={lang} />
      <CuratorQuiz id="quiz" lang={lang} onCtaClick={handleCtaClick} />
      <OfferSectionSecondary lang={lang} />
      <FAQ lang={lang} />

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
              { name: 'Datenschutz', url: 'https://www.canvasnova.com/privacy' }
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