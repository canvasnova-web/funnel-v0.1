import React, { useState, useEffect } from 'react';
import { CONTENT } from './data/content';
import { Lang } from './types';
import Hero from './components/Hero';
import ExplainerSection from './components/ExplainerSection';
import ComparisonSection from './components/ComparisonSection';
import Process from './components/Process';
import Scanner from './components/Scanner';
import Timeline from './components/Timeline';
import OfferSection from './components/OfferSection';

// Main App Component
const App = () => {
  const [lang, setLang] = useState<Lang>('de');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToScanner = () => {
    document.getElementById('scanner')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="bg-gallery-white min-h-screen text-gallery-black selection:bg-int-orange selection:text-white font-sans">
      {/* Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-white/80 backdrop-blur-md border-b border-gray-100' : 'py-8 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center">
            <a href="https://canvasnova.com">
              <img src="/logo.png" alt="canvasnova" className="h-8 w-auto" />
            </a>
          </div>

          <div className="flex items-center gap-6">
            {/* Language Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLang('de')}
                className={`px-2 py-1 text-[10px] font-bold transition-all ${lang === 'de' ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
              >
                DE
              </button>
              <span className="text-gray-300 text-[10px]">/</span>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 text-[10px] font-bold transition-all ${lang === 'en' ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
              >
                EN
              </button>
            </div>

            <button
              onClick={scrollToScanner}
              className="hidden md:block text-neutral-500 hover:text-black px-5 py-2 text-sm font-medium transition-colors"
            >
              {CONTENT[lang].nav.cta}
            </button>
          </div>
        </div>
      </nav>

      <Hero onAnalyzeClick={scrollToScanner} lang={lang} />
      <ExplainerSection lang={lang} />
      <Process />
      <ComparisonSection lang={lang} />
      <Timeline lang={lang} />
      <OfferSection id="offer" lang={lang} />
      <Scanner id="scanner" lang={lang} />

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