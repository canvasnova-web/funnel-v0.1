import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  MoveRight,
  Scan,
  CheckCircle2,
  Palette,
  Box,
  Truck,
  Infinity as InfinityIcon,
  X,
  UploadCloud,
  Sparkles,
  Zap,
  Maximize2,
  Copy,
  ChevronDown,
  Crosshair,
  Aperture,
  FileText,
  Activity,
  BrainCircuit,
  Eye,
  Layers,
  Search,
  Printer,
  Loader2,
  Fingerprint,
  Gem,
  Coins,
  History,
  ShieldCheck,
  Ruler,
  Lightbulb,
  Maximize,
  RectangleHorizontal,
  RectangleVertical,
  ArrowRight,
  SlidersHorizontal,
  Globe
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useSpring } from 'framer-motion';

// --- Localization Content ---
const CONTENT = {
  de: {
    nav: {
      cta: "Analyse Starten",
      lang_de: "DE",
      lang_en: "EN"
    },
    hero: {
      badge: "canvasnova",
      headline_1: "Die Zukunft der Kunst",
      headline_2: "gehört Ihnen.",
      sub_1: "Erschaffen Sie",
      sub_2: "Meisterwerke.",
      cta: "Ihren Raum Analysieren",
      before: "Vorher:",
      after: "Nachher: canvasnova"
    },
    explainer: [
      { title: "Der Co-Pilot", text: "Kein Stöbern in generischen Postern. Erschaffen Sie exakt das, was Sie fühlen. Einzigartig, jedes Mal." },
      { title: "Sie führen Regie", text: "Zu bunt? Zu abstrakt? Sie entscheiden. Verfeinern Sie das Ergebnis, bis es perfekt passt." },
      { title: "Die Manufaktur", text: "Wir verkaufen keine JPEGs. Wir liefern physische Meisterwerke. Handgefertigt in Deutschland." }
    ],
    comparison: {
      badge: "Marktpositionierung",
      headline: "Warum canvasnova?",
      features: {
        uniqueness: "Einzigartigkeit",
        material: "Material",
        acquisition: "Erwerb",
        price: "Preismodell"
      },
      col1: { title: "Massenmarkt", sub: "Poster & Drucke", val1: "1 von 1.000.000", val2: "Posterpapier", val3: "Sofort", val4: "Wertlos", price: "€50", impact: "Geringer Effekt" },
      col2: { title: "canvasnova", sub: "Smart Luxury", badge: "Empfehlung", val1: "1 von 1 (Unikat)", val2: "Museums-Acrylglas", val3: "Kuratiert (5 Tage)", val4: "Erschwinglicher Luxus", price: "€140", impact: "Durchschn. Preis / Unikat", cta: "Kuratieren" },
      col3: { title: "Galerie", sub: "Traditionell", val1: "1 von 1 (Original)", val2: "Leinwand / Öl", val3: "Langwierig (3 Mo+)", val4: "Investition", price: "€3.000+", impact: "Hohe Hürde" }
    },
    scanner: {
      badge: "Sofort-Analyse • 100% Kostenlos",
      headline: "Perfektion nach Maß.",
      sub: "Laden Sie ein Foto Ihres Raumes hoch. Wir empfehlen sofort die ideale Größe, Rahmung und das Material.",
      upload: { title: "Raum-Foto hochladen", sub: "JPG, PNG, HEIC akzeptiert" },
      loading_logs: [
        "Initialisiere Geometrie-Engine...",
        "Kalibriere Raumhelligkeit...",
        "Analysiere Wandproportionen...",
        "Berechne optimalen Betrachtungsabstand...",
        "Synthetisiere Kuratoren-Heuristik...",
        "Finalisiere Größenempfehlung..."
      ],
      result: {
        badge: "Kalkuliert",
        retry: "Neu berechnen",
        hero_label: "Optimale Konfiguration",
        desc: "Dieses Verhältnis ({ratio}) bietet das ausgewogenste visuelle Gewicht für typische Betrachtungsabstände von {distance}.",
        material_label: "Material",
        frame_label: "Rahmen",
        cta: "Konfiguration Übernehmen",
        why: "Warum?",
        scale_ref: "Größenvergleich"
      }
    },
    timeline: {
      badge: "Der Manufaktur-Prozess",
      headline: "Von der Idee zum Kunst-Objekt",
      steps: [
        { title: "Vision & Stil", desc: "Definieren Sie Ihren Geschmack. Wählen Sie eine Stilrichtung oder beschreiben Sie Ihren Wunsch. Keine Vorkenntnisse nötig." },
        { title: "KI-Kreation", desc: "Unsere Engine generiert 3 einzigartige, hochauflösende Kunstwerke. Optimiert für großformatigen Druck." },
        { title: "Kuratieren & Verfeinern", desc: "Wählen Sie Ihren Favoriten. Fordern Sie Anpassungen an oder lassen Sie neu generieren. Sie haben die Kontrolle." },
        { title: "Material & Rahmen", desc: "Wählen Sie Museums-Acrylglas, Alu-Dibond oder Leinwand. Ergänzen Sie einen handgefertigten Schattenfugenrahmen." },
        { title: "Experten-Check", desc: "Manuelle Qualitätsprüfung durch Druckexperten. Produziert in Deutschland mit 12-Farben-Archivtinten." },
        { title: "Sicherer Versand", desc: "Spezialisierte Kunstverpackung garantiert sichere Ankunft. Sofort bereit zum Aufhängen." }
      ]
    },
    offer: {
      badge: "Angebot endet in:",
      title: "Launch Angebot",
      sub: "Zeitlich Limitiert",
      item1: "3x Einzigartige KI-Designs",
      item2: "Wand-Analyse",
      item3: "Druck-Guthaben",
      free: "GRATIS",
      total: "Gesamt",
      vat: "INKL. MWST",
      cta_idle: "Launch Angebot Sichern",
      cta_loading: "Aktiviere Zugang...",
      code_text: "Code {code} wird automatisch angewendet"
    },
    footer: {
      desc: "Die Brücke zwischen künstlicher Intelligenz und menschlicher Emotion durch das Medium des Innenraums.",
      rights: "2025 canvasnova.com by Berberich & Hühn GbR"
    }
  },
  en: {
    nav: {
      cta: "Start Analysis",
      lang_de: "DE",
      lang_en: "EN"
    },
    hero: {
      badge: "canvasnova",
      headline_1: "The Future of Fine Art",
      headline_2: "is Yours to Command.",
      sub_1: "Create",
      sub_2: "Masterpieces.",
      cta: "Analyze My Room",
      before: "Before: Reality",
      after: "After: canvasnova"
    },
    explainer: [
      { title: "The Co-Pilot", text: "No browsing through thousands of generic posters. Create exactly what you want. Unique, every time." },
      { title: "You are the Director", text: "Too colorful? Too abstract? You decide. Refine the result until it matches your vision perfectly." },
      { title: "The Manufactory", text: "We don't sell JPEGs. We deliver physical masterpieces. Hand-crafted in Germany, ready to hang." }
    ],
    comparison: {
      badge: "Market Positioning",
      headline: "Why canvasnova?",
      features: {
        uniqueness: "Uniqueness",
        material: "Material",
        acquisition: "Acquisition",
        price: "Price Model"
      },
      col1: { title: "Mass Market", sub: "Posters & Prints", val1: "1 of 1,000,000", val2: "Poster Paper", val3: "Instant", val4: "Depreciating", price: "€50", impact: "Low Impact" },
      col2: { title: "canvasnova", sub: "Smart Luxury", badge: "Recommended", val1: "1 of 1 (Original)", val2: "Museum-Grade (WhiteWall)", val3: "Curated (5 Days)", val4: "Accessible Luxury", price: "€140", impact: "Avg. Price / Unique Piece", cta: "Start Curating" },
      col3: { title: "Traditional Gallery", sub: "Traditional", val1: "1 of 1 (Original)", val2: "Canvas / Oil", val3: "Negotiated (3 Mo+)", val4: "Investment Only", price: "€3,000+", impact: "High Barrier" }
    },
    scanner: {
      badge: "Instant Analysis • 100% Free",
      headline: "Find Your Perfect Match.",
      sub: "Upload a photo of your wall. We'll instantly recommend the ideal size, frame, and material for your specific room.",
      upload: { title: "Upload Room Photo", sub: "JPG, PNG, HEIC accepted" },
      loading_logs: [
        "Initializing geometry engine...",
        "Calibrating room luminance...",
        "Analyzing wall proportions...",
        "Detecting optimal viewing distance...",
        "Synthesizing curator heuristic model...",
        "Finalizing sizing recommendation..."
      ],
      result: {
        badge: "Calculated",
        retry: "Recalculate",
        hero_label: "Optimal Configuration",
        desc: "This ratio ({ratio}) provides the most balanced visual weight for typical viewing distances of {distance}.",
        material_label: "Material",
        frame_label: "Frame",
        cta: "Use This Configuration",
        why: "Why?",
        scale_ref: "Scale Reference"
      }
    },
    timeline: {
      badge: "The Manufaktur Process",
      headline: "From Data to Object",
      steps: [
        { title: "Vision & Style", desc: "Define your taste. Choose a style direction or describe your wish. No prompting skills needed." },
        { title: "AI Creation", desc: "Our engine generates 3 unique, high-resolution artworks. Optimized for large-scale print." },
        { title: "Curate & Refine", desc: "Select your favorite. Request adjustments or reroll instantly. You are in control." },
        { title: "Material & Frame", desc: "Choose Museum-Grade Acrylic, Aluminum Dibond, or Canvas. Add a hand-made wooden frame." },
        { title: "Expert Check & Production", desc: "Manual quality check by print experts. Produced in Germany using 12-color archival inks." },
        { title: "Secure Delivery", desc: "Specialized art packaging ensures safe arrival. Ready to hang immediately." }
      ]
    },
    offer: {
      badge: "Offer Expires In:",
      title: "Founding Member Pass",
      sub: "Limited Time Access",
      item1: "3x Unique AI Designs",
      item2: "Wall Analysis (Lidar)",
      item3: "Print Credit",
      free: "FREE",
      total: "Total",
      vat: "INC. VAT",
      cta_idle: "Claim Free Creator Pass",
      cta_loading: "Activating Access...",
      code_text: "Code {code} Auto-Applied"
    },
    footer: {
      desc: "Bridging the gap between artificial intelligence and human emotion through the medium of interior space.",
      rights: "© 2024 canvasnova Inc. All rights reserved."
    }
  }
};

// --- Types ---
interface AnalysisResult {
  size: string;
  width: number;
  height: number;
  material: string;
  frame: string;
  distance: string;
  lux: string;
}

interface TimelineStepProps {
  step: {
    title: string;
    desc: string;
    icon: any;
    image?: string;
  };
  index: number;
  isLast: boolean;
}

type Lang = 'de' | 'en';

// --- Components ---

// 1. Hero Section
const Hero = ({ onAnalyzeClick, lang }: { onAnalyzeClick: () => void, lang: Lang }) => {
  const t = CONTENT[lang].hero;
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDrag = useCallback((e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    let clientX: number;
    if ('touches' in e && e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
    } else if ('clientX' in e) {
      clientX = (e as any).clientX;
    } else {
      return;
    }

    const position = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, position)));
  }, []);

  const startDrag = () => setIsDragging(true);
  const stopDrag = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mouseup', stopDrag);
      window.addEventListener('touchend', stopDrag);
      window.addEventListener('mousemove', handleDrag as any);
      window.addEventListener('touchmove', handleDrag as any);
    } else {
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchend', stopDrag);
      window.removeEventListener('mousemove', handleDrag as any);
      window.removeEventListener('touchmove', handleDrag as any);
    }
    return () => {
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchend', stopDrag);
      window.removeEventListener('mousemove', handleDrag as any);
      window.removeEventListener('touchmove', handleDrag as any);
    };
  }, [isDragging, handleDrag]);

  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center py-20 overflow-hidden bg-gallery-white">
      <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none z-0" />

      <div className={`relative z-10 flex flex-col items-center text-center max-w-6xl px-6 mb-16 transition-all duration-700 ${isDragging ? 'blur-[2px] opacity-80' : 'blur-0 opacity-100'}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200/60 bg-white/40 backdrop-blur-md text-[10px] uppercase tracking-[0.25em] text-gray-600 font-sans font-bold shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-int-orange" />
            {t.badge}
          </span>
        </motion.div>

        <h1 className="text-6xl md:text-9xl font-serif font-bold leading-[0.9] tracking-tighter text-gallery-black mb-10 drop-shadow-sm">
          {t.headline_1.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: i * 0.035, ease: [0.2, 0.65, 0.3, 0.9] }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
          <br />
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="block text-4xl md:text-5xl italic text-gray-400 font-light mt-4 tracking-tight font-serif"
          >
            {t.headline_2}
          </motion.span>
        </h1>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAnalyzeClick}
          className="group relative inline-flex items-center gap-4 bg-gallery-black text-white px-8 py-4 rounded-full font-sans text-sm font-bold uppercase tracking-widest shadow-2xl shadow-black/20 overflow-hidden"
        >
          <span className="relative z-10">{t.cta}</span>
          <div className="relative z-10 w-6 h-6 rounded-full bg-int-orange flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
            <MoveRight className="w-3 h-3 text-white" />
          </div>
          <div className="absolute inset-0 bg-gray-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.3, ease: [0.2, 0.65, 0.3, 0.9] }}
        className="relative w-full max-w-[1400px] h-[60vh] md:h-[80vh] px-4"
      >
        <div
          ref={containerRef}
          className="relative w-full h-full rounded-[2rem] overflow-hidden cursor-ew-resize shadow-[0_25px_50px_-12px_rgba(255,79,0,0.15)] select-none group border border-gray-200"
          onMouseDown={startDrag}
          onTouchStart={startDrag}
          onClick={(e) => !isDragging && handleDrag(e)}
        >
          <div className="absolute inset-0 bg-black">
            <img
              src="/images/hero-art.jpg"
              alt="Artistic Room"
              className="w-full h-full object-cover saturate-[1.25] contrast-[1.15]"
            />
            <div className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-xl text-white px-6 py-2.5 rounded-full font-mono text-xs tracking-widest uppercase border border-white/10 shadow-lg drop-shadow-md">
              {t.after}
            </div>
          </div>

          <div
            className="absolute inset-0 border-r border-white/50 overflow-hidden bg-gray-100"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src="/images/hero-empty.jpg"
              alt="Empty Room"
              className="w-full h-full object-cover max-w-none grayscale brightness-[0.9] contrast-[1.1]"
              style={{ width: containerRef.current?.offsetWidth || '100vw' }}
            />
            <div className="absolute inset-0 bg-grain opacity-50 mix-blend-multiply pointer-events-none" />

            <div className="absolute bottom-8 left-8 bg-white/80 backdrop-blur-xl text-gallery-black px-6 py-2.5 rounded-full font-mono text-xs tracking-widest uppercase border border-white/20 shadow-lg">
              {t.before}
            </div>
          </div>

          <div
            className="absolute top-0 bottom-0 w-px bg-transparent z-20 flex items-center justify-center pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="relative pointer-events-auto cursor-ew-resize group-active:scale-95 transition-transform">
              <div className="absolute inset-0 -m-6 bg-int-orange blur-3xl opacity-20 rounded-full animate-pulse" />
              <div className="relative w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex items-center justify-center z-30 ring-1 ring-white/30">
                <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

// 1.5 Explainer Section (The Triangle of Quality)
const ExplainerSection = ({ lang }: { lang: Lang }) => {
  const t = CONTENT[lang].explainer;
  const icons = [Sparkles, SlidersHorizontal, Gem];

  return (
    <section className="py-24 px-6 bg-gallery-white relative z-20 border-b border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.map((card, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                whileHover={{ y: -8, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                className="p-8 rounded-3xl border border-white/60 bg-white/40 backdrop-blur-md shadow-sm transition-all duration-300 cursor-default group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm text-gray-400 group-hover:text-int-orange group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl text-gallery-black mb-3 tracking-tight">{card.title}</h3>
                <p className="text-gray-500 font-sans text-sm leading-relaxed">{card.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// 2. Comparison Section
const ComparisonSection = ({ lang }: { lang: Lang }) => {
  const t = CONTENT[lang].comparison;
  const [hoveredCard, setHoveredCard] = useState<'mass' | 'cn' | 'trad' | null>(null);

  const features = [
    {
      label: t.features.uniqueness,
      icon: Fingerprint,
      mass: t.col1.val1,
      cn: t.col2.val1,
      trad: t.col3.val1
    },
    {
      label: t.features.material,
      icon: Layers,
      mass: t.col1.val2,
      cn: t.col2.val2,
      trad: t.col3.val2
    },
    {
      label: t.features.acquisition,
      icon: Zap,
      mass: t.col1.val3,
      cn: t.col2.val3,
      trad: t.col3.val3
    },
    {
      label: t.features.price,
      icon: Coins,
      mass: t.col1.val4,
      cn: t.col2.val4,
      trad: t.col3.val4
    }
  ];

  return (
    <section className="py-32 px-4 md:px-6 bg-[#FAFAFA] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-white text-[10px] uppercase tracking-widest text-gray-400 font-mono mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-int-orange" />
            {t.badge}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif text-gallery-black"
          >
            {t.headline}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">

          <motion.div
            className={`relative p-8 rounded-[2rem] border border-neutral-100 bg-neutral-50 transition-all duration-500 ${hoveredCard === 'cn' ? 'opacity-40 blur-[1px]' : 'opacity-100'}`}
            onMouseEnter={() => setHoveredCard('mass')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="mb-8 opacity-60 text-center">
              <h3 className="font-serif text-xl text-neutral-600">{t.col1.title}</h3>
              <p className="text-[10px] font-mono text-neutral-400 mt-2 uppercase tracking-widest">{t.col1.sub}</p>
            </div>

            <div className="space-y-6">
              {features.map((f, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-1 py-3 border-b border-gray-100 last:border-0">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest">{f.label}</span>
                  <span className="text-sm font-sans font-medium text-neutral-500">{f.mass}</span>
                </div>
              ))}
              <div className="pt-6 text-center">
                <p className="font-serif text-2xl text-neutral-400 line-through decoration-red-400/30">{t.col1.price}</p>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest mt-1">{t.col1.impact}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative p-10 rounded-[2.5rem] bg-white z-20 md:-my-8 ring-1 ring-black/5"
            initial={{ y: 0 }}
            whileInView={{ scale: 1.02 }}
            viewport={{ once: true }}
            onMouseEnter={() => setHoveredCard('cn')}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0,0,0,0.01)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-50/40 via-purple-50/10 to-transparent opacity-60 rounded-[2.5rem] pointer-events-none" />

            <div className="relative z-10">
              <div className="absolute -top-14 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-b from-gray-800 to-black text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl flex items-center gap-2 ring-1 ring-white/20">
                  <Sparkles className="w-3 h-3 text-orange-400" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">{t.col2.sub}</span>
                </span>
              </div>

              <div className="mb-10 text-center">
                <h3 className="font-serif text-4xl text-gallery-black mb-2 tracking-tight font-semibold">canvasnova</h3>
                <div className="h-0.5 w-8 bg-int-orange mx-auto opacity-80" />
              </div>

              <div className="space-y-2">
                {features.map((f, i) => (
                  <div key={i} className="flex justify-between items-center py-4 border-b border-gray-50 last:border-0 group px-2 rounded-lg transition-colors hover:bg-gray-50/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-int-orange">
                        <f.icon className="w-4 h-4" strokeWidth={2.5} />
                      </div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">{f.label}</span>
                    </div>
                    <span className="text-sm font-bold text-gallery-black text-right">{f.cn}</span>
                  </div>
                ))}

                <div className="pt-8 mt-4 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <p className="font-serif text-5xl text-int-orange font-medium tracking-tight">{t.col2.price}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{t.col2.impact}</p>
                  </div>
                  <button className="w-full mt-6 bg-gallery-black text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-int-orange hover:shadow-lg hover:shadow-int-orange/20 transition-all duration-300 flex items-center justify-center gap-2 group">
                    {t.col2.cta}
                    <MoveRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={`relative p-8 rounded-[2rem] border border-neutral-100 bg-neutral-50 transition-all duration-500 ${hoveredCard === 'cn' ? 'opacity-40 blur-[1px]' : 'opacity-100'}`}
            onMouseEnter={() => setHoveredCard('trad')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="mb-8 opacity-60 text-center">
              <h3 className="font-serif text-xl text-neutral-600">{t.col3.title}</h3>
              <p className="text-[10px] font-mono text-neutral-400 mt-2 uppercase tracking-widest">{t.col3.sub}</p>
            </div>
            <div className="space-y-6">
              {features.map((f, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-1 py-3 border-b border-gray-100 last:border-0">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest">{f.label}</span>
                  <span className="text-sm font-sans font-medium text-neutral-500">{f.trad}</span>
                </div>
              ))}
              <div className="pt-6 text-center">
                <p className="font-serif text-2xl text-neutral-800">{t.col3.price}</p>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest mt-1">{t.col3.impact}</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

// 3. Wall Visualizer (Scanner)
const Scanner = ({ id, lang }: { id: string, lang: Lang }) => {
  const t = CONTENT[lang].scanner;
  const [state, setState] = useState<'idle' | 'scanning' | 'analyzed'>('idle');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [rationale, setRationale] = useState<{ reason: string, ratio: string } | null>(null);
  const [terminalLog, setTerminalLog] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  const runSimulation = () => {
    setState('scanning');
    setTerminalLog([]);

    let step = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      if (step < t.loading_logs.length) {
        setTerminalLog(prev => [...prev.slice(-3), t.loading_logs[step]]);
        step++;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        finalizeResult();
      }
    }, 800);
  };

  const finalizeResult = () => {
    setTimeout(() => {
      const reasons = {
        de: {
          v1: 'Fügt Standard-Deckenhöhen Vertikalität hinzu.',
          v2: 'Erzeugt einen befehlenden Fokuspunkt in schmalen Räumen.',
          v3: 'Ausgewogene klassische Proportion für die Platzierung über dem Sofa.',
          v4: 'Immersive Breite, die das Raumlayout verankert.',
          v5: 'Galerie-Standard für große Feature-Wände.',
          v6: 'Moderne, symmetrische Balance für zeitgenössische Räume.',
          v7: 'Maximale geometrische Präsenz für minimalistische Wände.'
        },
        en: {
          v1: 'Adds verticality to standard ceiling heights.',
          v2: 'Creates a commanding focal point in narrow spaces.',
          v3: 'Balanced classic proportion for above-sofa placement.',
          v4: 'Immersive width that anchors the room layout.',
          v5: 'Gallery-standard impact for large feature walls.',
          v6: 'Modern, symmetrical balance for contemporary spaces.',
          v7: 'Maximum geometric presence for minimalist walls.'
        }
      };

      const r = reasons[lang];

      const RECOMMENDATIONS = [
        { size: '80x120cm', width: 80, height: 120, ratio: '2:3', reason: r.v1 },
        { size: '100x150cm', width: 100, height: 150, ratio: '2:3', reason: r.v2 },
        { size: '120x80cm', width: 120, height: 80, ratio: '3:2', reason: r.v3 },
        { size: '150x100cm', width: 150, height: 100, ratio: '3:2', reason: r.v4 },
        { size: '180x120cm', width: 180, height: 120, ratio: '3:2', reason: r.v5 },
        { size: '100x100cm', width: 100, height: 100, ratio: '1:1', reason: r.v6 },
        { size: '120x120cm', width: 120, height: 120, ratio: '1:1', reason: r.v7 }
      ];

      const materials = ['Acrylic Glass', 'Aluminum Dibond', 'Fine Art Canvas'];
      const frames = ['Oak Shadow Gap', 'Black Aluminum', 'White Wood', 'Frameless'];

      const selection = RECOMMENDATIONS[Math.floor(Math.random() * RECOMMENDATIONS.length)];

      setResult({
        size: selection.size,
        width: selection.width,
        height: selection.height,
        material: materials[Math.floor(Math.random() * materials.length)],
        frame: frames[Math.floor(Math.random() * frames.length)],
        distance: `${(2 + Math.random() * 2).toFixed(1)}m`,
        lux: `${Math.floor(200 + Math.random() * 400)}lx`
      });
      setRationale({ reason: selection.reason, ratio: selection.ratio });
      setState('analyzed');
    }, 800);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewImage(event.target.result as string);
          runSimulation();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const getArtRectProps = (width: number, height: number) => {
    const x = 120;
    const y = 100 - (height / 2);
    return { x, y, width, height };
  };

  return (
    <section id={id} className="py-24 px-4 md:px-6 bg-[#F2F2F2] relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 flex flex-col md:flex-row items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-int-orange animate-pulse" />
              <span className="font-mono text-xs font-bold text-int-orange tracking-widest uppercase">{t.badge}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-gallery-black">{t.headline}</h2>
            <p className="text-gray-500 font-sans font-medium mt-3 max-w-lg text-lg">
              {t.sub}
            </p>
          </div>
        </div>

        <div
          ref={containerRef}
          className={`relative w-full bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-700 ease-in-out ${state === 'analyzed' ? 'h-auto' : 'aspect-[4/3] md:aspect-[16/9]'}`}
        >
          <AnimatePresence mode='wait'>
            {state === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, filter: 'blur(5px)' }}
                className="absolute inset-0 flex items-center justify-center bg-neutral-50"
              >
                <div
                  className="absolute inset-0 opacity-[0.07] pointer-events-none"
                  style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="group relative cursor-pointer w-full h-full flex flex-col items-center justify-center"
                >
                  <input type="file" ref={fileInputRef} onChange={handleUpload} className="hidden" accept="image/*" />
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-24 h-24 rounded-2xl bg-white shadow-xl flex items-center justify-center mb-6 relative z-10 border border-neutral-100 group-hover:border-int-orange/30 transition-colors"
                  >
                    <UploadCloud className="w-10 h-10 text-gray-400 group-hover:text-int-orange transition-colors duration-300" />
                    <div className="absolute inset-0 rounded-2xl border-2 border-int-orange opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all" />
                  </motion.div>
                  <h3 className="font-serif text-2xl text-gallery-black mb-2">{t.upload.title}</h3>
                  <p className="text-gray-400 font-mono text-xs tracking-widest uppercase">{t.upload.sub}</p>
                </div>
              </motion.div>
            )}

            {state === 'scanning' && (
              <motion.div
                key="scanning"
                className="absolute inset-0 bg-white overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Background Image with Elegant Blur */}
                {previewImage && (
                  <div className="absolute inset-0 z-0">
                    <img src={previewImage} alt="Scanning" className="w-full h-full object-cover opacity-20 blur-xl scale-110" />
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
                  </div>
                )}

                {/* Soft Scanning Bar */}
                <motion.div
                  className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-int-orange/10 to-transparent z-10"
                  animate={{ top: ['-20%', '120%'] }}
                  transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
                />

                {/* Center Content */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
                  {/* Minimalist Loader */}
                  <div className="relative mb-12">
                    <div className="w-24 h-24 rounded-full border border-gray-100" />
                    <motion.div
                      className="absolute inset-0 w-24 h-24 rounded-full border-t border-int-orange"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Scan className="w-6 h-6 text-int-orange/80" />
                    </div>
                  </div>

                  {/* Elegant Text Logs */}
                  <div className="h-12 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      {terminalLog.slice(-1).map((log, i) => (
                        <motion.div
                          key={`${log}-${i}`}
                          initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                          transition={{ duration: 0.5 }}
                          className="font-serif text-xl text-gallery-black tracking-tight"
                        >
                          {log}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}

            {state === 'analyzed' && result && (
              <motion.div
                key="analyzed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full flex flex-col md:flex-row bg-[#FAFAFA]"
              >
                <div className="w-full md:w-1/2 relative min-h-[400px] bg-gray-100 flex items-center justify-center border-r border-gray-200">
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white rounded-full border border-gray-200 text-[10px] font-bold uppercase tracking-widest text-gray-400">{t.result.scale_ref}</div>
                  <div className="relative w-full h-full max-w-[400px] max-h-[400px] p-8">
                    <svg viewBox="0 0 300 250" className="w-full h-full drop-shadow-xl">
                      <line x1="0" y1="250" x2="300" y2="250" stroke="#E5E5E5" strokeWidth="2" />
                      <circle cx="60" cy="90" r="10" fill="#D4D4D4" />
                      <path d="M60,100 L60,170 M60,170 L45,250 M60,170 L75,250 M60,115 L40,140 M60,115 L80,140" stroke="#D4D4D4" strokeWidth="4" strokeLinecap="round" />
                      <text x="30" y="240" className="text-[10px] fill-gray-400 font-mono">1.7m</text>
                      <motion.rect
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        {...getArtRectProps(result.width, result.height)}
                        fill="#FFFFFF"
                        stroke="#121212"
                        strokeWidth="2"
                        className="shadow-lg"
                      />
                      <text x={120 + result.width + 10} y={100} className="text-[10px] fill-int-orange font-mono font-bold">{result.width}cm</text>
                      <text x={120 + (result.width / 2)} y={100 + (result.height / 2) + 15} className="text-[10px] fill-int-orange font-mono font-bold text-center" textAnchor="middle">{result.height}cm</text>
                    </svg>
                  </div>
                </div>

                <div className="w-full md:w-1/2 bg-white p-12 flex flex-col justify-center">
                  <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-100">
                      <CheckCircle2 className="w-3 h-3 text-green-600" />
                      <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest">{t.result.badge}</span>
                    </div>
                    <button onClick={runSimulation} className="text-xs font-bold text-gray-400 hover:text-int-orange transition-colors uppercase tracking-widest flex items-center gap-1">
                      <History className="w-3 h-3" /> {t.result.retry}
                    </button>
                  </div>

                  <div className="mb-12">
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">{t.result.hero_label}</span>
                    <motion.h3
                      className="text-6xl font-mono text-gallery-black leading-none mb-4 tracking-tighter font-medium"
                    >
                      {result.width} <span className="text-gray-300">x</span> {result.height}
                      <span className="text-lg text-gray-400 ml-2 align-top">cm</span>
                    </motion.h3>
                    <p className="text-sm text-gray-500 font-sans max-w-sm leading-relaxed">
                      {t.result.desc.replace('{ratio}', rationale?.ratio || '').replace('{distance}', result.distance)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-12">
                    <div>
                      <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{t.result.material_label}</span>
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-int-orange" />
                        <span className="font-medium text-gallery-black text-sm">{result.material}</span>
                      </div>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{t.result.frame_label}</span>
                      <div className="flex items-center gap-2">
                        <Box className="w-4 h-4 text-int-orange" />
                        <span className="font-medium text-gallery-black text-sm">{result.frame}</span>
                      </div>
                    </div>
                  </div>

                  {rationale && (
                    <div className="mb-8 p-4 bg-white border-l-2 border-int-orange pl-4 text-gray-600 text-sm">
                      <span className="font-bold block mb-1 text-int-orange text-xs uppercase">{t.result.why}</span>
                      "{rationale.reason}"
                    </div>
                  )}

                  <button
                    onClick={() => document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full bg-gallery-black text-white py-5 rounded-none border border-black hover:bg-white hover:text-black transition-all duration-300 font-mono text-sm uppercase tracking-widest flex items-center justify-center gap-4 group"
                  >
                    {t.result.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

// 4. Manufaktur Timeline
const TimelineStep: React.FC<TimelineStepProps> = ({ step, index, isLast }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0.5, scale: 0.95, filter: 'grayscale(100%)' }}
      animate={{
        opacity: isInView ? 1 : 0.5,
        scale: isInView ? 1.05 : 0.95,
        filter: isInView ? 'grayscale(0%)' : 'grayscale(100%)'
      }}
      transition={{ duration: 0.5 }}
      className={`relative flex gap-8 md:gap-16 ${isLast ? 'pb-0' : 'pb-20'} group items-center`}
    >
      {/* Icon Column */}
      <div className="relative z-10 flex flex-col items-center shrink-0 w-20 md:w-24">
        <motion.div
          animate={{
            backgroundColor: isInView ? '#FFFFFF' : '#F5F5F5',
            borderColor: isInView ? '#FF4F00' : '#E5E5E5',
            boxShadow: isInView ? '0 0 30px rgba(255, 79, 0, 0.4)' : 'none'
          }}
          transition={{ duration: 0.4 }}
          className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border border-gray-200 flex items-center justify-center bg-gray-50/50 backdrop-blur-sm relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
          <step.icon className={`w-6 h-6 md:w-8 md:h-8 relative z-10 transition-colors duration-300 ${isInView ? 'text-int-orange' : 'text-gray-400'}`} />

          {isInView && (
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 rounded-2xl border border-int-orange"
            />
          )}
        </motion.div>
        <div className={`mt-4 font-mono text-xs font-bold tracking-widest transition-colors ${isInView ? 'text-neutral-800' : 'text-neutral-400'}`}>
          0{index + 1}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div
          animate={{ x: isInView ? 0 : -20 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className={`font-serif text-2xl md:text-3xl font-bold mb-3 transition-colors ${isInView ? 'text-gallery-black' : 'text-gray-400'}`}>{step.title}</h3>
          <p className="font-sans text-gray-500 leading-relaxed text-base md:text-lg max-w-md">{step.desc}</p>
        </motion.div>

        {step.image && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{
              opacity: isInView ? 1 : 0,
              x: isInView ? 0 : 20,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative h-40 w-full md:w-64 rounded-xl overflow-hidden shadow-2xl border border-gray-100 hidden md:block group-hover:shadow-orange-500/10 transition-shadow"
          >
            <img
              src={step.image}
              alt={step.title}
              className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const Timeline = ({ lang }: { lang: Lang }) => {
  const t = CONTENT[lang].timeline;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const icons = [Palette, Sparkles, Scan, Layers, Eye, Truck];
  const steps = t.steps.map((step, i) => ({
    ...step,
    icon: icons[i],
    image: [
      "/images/step1.png",
      "/images/step2.jpg",
      "/images/step3.jpg",
      "/images/step4.jpg",
      "/images/step5.jpg",
      "/images/step6.jpg"
    ][i]
  }));

  return (
    <section className="py-40 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-40 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-px bg-gray-200" />
              <span className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest">{t.badge}</span>
              <div className="w-12 h-px bg-gray-200" />
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-gallery-black tracking-tight">{t.headline}</h2>
          </motion.div>
        </div>

        <div ref={containerRef} className="relative">
          <div className="absolute left-[39px] md:left-[47px] top-0 bottom-0 w-[2px] bg-neutral-100 z-0 rounded-full overflow-hidden">
            <motion.div
              style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
              className="w-full bg-gradient-to-b from-int-orange via-purple-500 to-int-orange relative"
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-white border-2 border-int-orange rounded-full shadow-[0_0_20px_#FF4F00] z-10" />
            </motion.div>
          </div>

          <div className="relative z-10">
            {steps.map((step, i) => (
              <TimelineStep key={i} step={step} index={i} isLast={i === steps.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// 5. Offer Section (The Ticket) - Premium "Digital Object" Edition
const OfferSection = ({ id, lang }: { id: string, lang: Lang }) => {
  const t = CONTENT[lang].offer;
  const [status, setStatus] = useState<'idle' | 'claiming' | 'redirecting'>('idle');
  const [particles, setParticles] = useState<{ id: number, x: number, y: number, color: string }[]>([]);
  const [timeLeft, setTimeLeft] = useState(15179);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleClaim = () => {
    navigator.clipboard.writeText("ART-LAUNCH");

    // Trigger visual feedback
    setStatus('claiming');

    // Confetti logic
    const colors = ['#FF4F00', '#FFFFFF', '#333333'];
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setParticles(newParticles);

    // Transition to redirecting state after "processing"
    setTimeout(() => {
      setStatus('redirecting');
      // Actual redirect
      setTimeout(() => {
        window.location.href = "https://canvasnova.com/create?promo=christmas";
      }, 800);
    }, 1500);

    setTimeout(() => setParticles([]), 2000);
  };

  return (
    <section id={id} className="py-32 px-4 bg-gallery-black text-white relative overflow-hidden flex justify-center min-h-[800px] items-center">
      {/* Background Texture - Noise & Ambient Light */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-int-orange blur-[150px] opacity-10 pointer-events-none" />

      <div className="max-w-md w-full relative z-10 perspective-1000">
        <motion.div
          initial={{ y: 40, opacity: 0, rotateX: 10 }}
          whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className={`relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ${status !== 'idle' ? 'scale-[0.98] brightness-110' : ''}`}
        >

          {/* Animated Border Beam */}
          <div className="absolute inset-0 p-[1px] rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-neutral-800/80 rounded-3xl" />
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_340deg,#FF4F00_360deg)] animate-[spin_4s_linear_infinite] opacity-50" />
          </div>

          {/* Card Content Container */}
          <div className="relative bg-neutral-950 rounded-[23px] overflow-hidden h-full">
            {/* Header Section */}
            <div className="bg-neutral-900 p-8 pb-10 relative border-b border-white/5">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="font-mono text-[10px] text-gray-500 tracking-widest uppercase block mb-1">Pass Type</span>
                  <h3 className="text-2xl font-serif font-bold text-white tracking-tight">{t.title}</h3>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                  <InfinityIcon className="w-4 h-4 text-int-orange" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] text-gray-500 tracking-widest uppercase block mb-1">{t.badge}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-int-orange rounded-full animate-pulse" />
                    <span className="text-white tracking-widest font-mono font-bold">{formatTime(timeLeft)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[10px] text-gray-500 tracking-widest uppercase block mb-1">Batch</span>
                  <span className="font-mono text-white text-sm">CN-2024-X</span>
                </div>
              </div>
            </div>

            {/* Perforated Tear Line */}
            <div className="relative h-0 flex items-center justify-between px-3 z-20">
              <div className="w-6 h-6 rounded-full bg-gallery-black -ml-6" />
              <div className="w-full border-t-2 border-dashed border-neutral-800 mx-2" />
              <div className="w-6 h-6 rounded-full bg-gallery-black -mr-6" />
            </div>

            {/* Body Section */}
            <div className="p-8 space-y-8 bg-neutral-950/50 backdrop-blur-sm">
              <div className="space-y-5">
                <div className="flex justify-between items-center text-sm group">
                  <span className="text-gray-400 group-hover:text-white transition-colors">{t.item1}</span>
                  <span className="font-mono text-gray-600 line-through decoration-white/20">€2.00</span>
                </div>
                <div className="flex justify-between items-center text-sm group">
                  <span className="text-gray-400 group-hover:text-white transition-colors">{t.item2}</span>
                  <span className="font-mono text-int-orange font-bold tracking-wider">{t.free}</span>
                </div>
                <div className="flex justify-between items-center text-sm group">
                  <span className="text-gray-400 group-hover:text-white transition-colors">{t.item3}</span>
                  <span className="font-mono text-gray-600 line-through decoration-white/20">€5.00</span>
                </div>

                {/* The Big Price Reveal */}
                <div className="pt-6 mt-6 border-t border-white/5 flex justify-between items-end">
                  <div>
                    <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1 block">{t.total}</span>
                    <span className="font-serif text-3xl text-gray-500 line-through decoration-int-orange/50 decoration-2">€7.00</span>
                  </div>
                  <div className="text-right">
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                      className="inline-block"
                    >
                      <span
                        className="font-sans text-7xl font-bold text-white tracking-tighter leading-none block"
                        style={{ textShadow: '0 0 30px rgba(255, 255, 255, 0.15)' }}
                      >
                        €0.00
                      </span>
                    </motion.div>
                    <span className="font-mono text-[10px] text-int-orange uppercase tracking-widest mt-2 block">
                      {t.vat} • Launch Special
                    </span>
                  </div>
                </div>
              </div>

              {/* Interaction Area */}
              <div className="relative mt-4">
                <button
                  onClick={handleClaim}
                  disabled={status !== 'idle'}
                  className="group w-full bg-white text-black py-5 rounded-xl font-mono text-sm font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-3 hover:bg-gray-100 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-80 disabled:scale-100 relative overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    {status === 'idle' ? (
                      <motion.span
                        key="idle"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        className="relative z-10 flex items-center gap-2"
                      >
                        {t.cta_idle}
                        <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="loading"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="relative z-10 flex items-center gap-3"
                      >
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {status === 'claiming' ? 'Generating Pass...' : t.cta_loading}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>

                {/* Confetti Particles */}
                {particles.map(p => (
                  p ? (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                      animate={{ opacity: 0, x: p.x, y: p.y, scale: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      style={{ backgroundColor: p.color }}
                      className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-sm pointer-events-none z-50"
                    />
                  ) : null
                ))}
              </div>

              {/* Footer Code */}
              <div className="flex items-center justify-center gap-3 opacity-40 pt-2">
                <div className="h-px w-8 bg-white" />
                <p className="text-center font-mono text-[10px] text-white tracking-widest">
                  {t.code_text.replace('{code}', 'ART-LAUNCH')}
                </p>
                <div className="h-px w-8 bg-white" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

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
            <div className="flex items-center bg-gray-100 rounded-full p-1 border border-gray-200">
              <button
                onClick={() => setLang('de')}
                className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'de' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'}`}
              >
                DE
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'en' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'}`}
              >
                EN
              </button>
            </div>

            <button
              onClick={scrollToScanner}
              className="hidden md:block bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-int-orange transition-colors shadow-lg shadow-black/10"
            >
              {CONTENT[lang].nav.cta}
            </button>
          </div>
        </div>
      </nav>

      <Hero onAnalyzeClick={scrollToScanner} lang={lang} />
      <ExplainerSection lang={lang} />
      <ComparisonSection lang={lang} />
      <Scanner id="scanner" lang={lang} />
      <Timeline lang={lang} />
      <OfferSection id="offer" lang={lang} />

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
              { name: 'Tik-Tok', url: 'https://www.tiktok.com/@canvasnova.com' },
              { name: 'Impressum', url: 'https://www.canvasnova.com/imprint' }
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