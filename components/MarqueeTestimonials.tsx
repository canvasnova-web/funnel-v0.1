import React from 'react';
import { Star, Activity, Box, Layers, Frame, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Types ---
type ItemType = 'quote' | 'config';

interface TestimonialItem {
    type: ItemType;
    name: string; // User name or City
    content: string; // Quote or Status
    specs: string; // Material & Size
    icon: React.ElementType;
    rating?: number; // Optional rating (1-5), defaults to 5 if not set
}

// --- Data ---
const items: TestimonialItem[] = [
    {
        type: 'quote',
        name: "Tobias B.",
        content: "Endlich passt das Bild zum Sofa. Mit dem Kurator hatte ich es in 3 Minuten.",
        specs: "Canvas • 120x80cm • Schattenfuge Eiche",
        icon: Frame,
        rating: 5
    },
    {
        type: 'config',
        name: "Konfiguration aus Hamburg",
        content: "Neuer Entwurf erstellt",
        specs: "Acrylglas • 180x120cm • Rahmenlos",
        icon: Layers
    },
    {
        type: 'quote',
        name: "Moritz K.",
        content: "Die Druck-Qualität ist irre. Man sieht jedes Detail.",
        specs: "Alu-Dibond • 100x100cm • Rahmenlos",
        icon: Box,
        rating: 5
    },
    {
        type: 'config',
        name: "Konfiguration aus München",
        content: "Wartet auf Produktion...",
        specs: "Fine Art Papier • 60x40cm • Passepartout Weiß",
        icon: ImageIcon
    },
    {
        type: 'quote',
        name: "Natalie & Stefan",
        content: "Endlich geeinigt. Hier haben wir einfach unsere beiden Stile kombiniert.",
        specs: "Acrylglas • 150x100cm • Alu-Rahmen",
        icon: Layers,
        rating: 5
    },
    {
        type: 'config',
        name: "Konfiguration aus Berlin",
        content: "Neuer Entwurf erstellt",
        specs: "Canvas • 200x100cm • Rahmen Hamburg Ahorn Weiß",
        icon: Frame
    },

    {
        type: 'quote',
        name: "Maximilian B., Ebersberg",
        content: "Das Ergebnis ist mega, aber die Auswahl im Kurator hat mich fast überfordert. Zum Glück hilft der Chat-Modus.",
        specs: "Alu-Dibond • 100x100cm • Rahmenlos",
        icon: Box,
        rating: 4
    },
    {
        type: 'quote',
        name: "Benedikt H., München",
        content: "Ich habe drei Anläufe gebraucht, bis es perfekt war. Aber dass ich unbegrenzt testen konnte, war der Gamechanger.",
        specs: "Acrylglas • 120x80cm • Schattenfuge Weiß",
        icon: Layers,
        rating: 5
    },
    {
        type: 'quote',
        name: "Anonymer Nutzer",
        content: "Nicht ganz billig, aber die Qualität sieht man sofort. Preisleistung besser als jedes I**A-Poster.",
        specs: "Canvas • 80x60cm • Eiche Natur",
        icon: Frame,
        rating: 4
    },
    {
        type: 'quote',
        name: "Birgit S., Regensburg",
        content: "Habe es als Geschenk für meinen Mann gemacht. Sein Gesicht, als er ausgepackt hat: Unbezahlbar.",
        specs: "Fine Art Print • 60x40cm • Aluminium Rahmen",
        icon: ImageIcon,
        rating: 5
    }
];

// Duplicate items for seamless loop
const marqueeItems = [...items, ...items, ...items];

const MarqueeTestimonials: React.FC = () => {
    return (
        <section className="py-24 bg-neutral-50 border-t border-neutral-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
                <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 tracking-tight mb-4">
                    Echte Ergebnisse. Echte Räume.
                </h2>
                <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest">
                    Das sagen unsere ersten Kunden.
                </p>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full flex overflow-hidden mask-linear-fade">
                {/* Gradient Masks for smooth fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-neutral-50 to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-neutral-50 to-transparent z-10"></div>

                <motion.div
                    className="flex gap-6 pl-6"
                    animate={{ x: "-33.33%" }} // Move by one full set length (since we have 3 sets)
                    transition={{
                        duration: 40, // Slow speed
                        ease: "linear",
                        repeat: Infinity,
                    }}
                    whileHover={{ animationPlayState: 'paused' }} // Note: Framer motion doesn't support pause on hover easily with simple animate prop, we might need CSS or a different approach for true pause. 
                // Actually, for a simple marquee, CSS animation is often smoother and easier to pause. Let's try CSS class approach if we want pause-on-hover, 
                // OR just use a very slow duration. 
                // Let's stick to Framer Motion but use a hover variant on the parent? No, let's use the CSS approach for the marquee track to ensure pause works perfectly.
                >
                    {/* We will render this differently to support pause-on-hover easily with Tailwind/CSS */}
                </motion.div>

                {/* CSS Animation Implementation for robust Pause-on-Hover */}
                <div className="flex gap-6 animate-marquee hover:pause-animation">
                    {marqueeItems.map((item, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-[350px] bg-white rounded-xl border border-zinc-100 shadow-sm p-6 flex flex-col justify-between group hover:border-zinc-200 hover:shadow-md transition-all duration-300"
                        >
                            {/* Header */}
                            <div className="mb-4">
                                {item.type === 'quote' ? (
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={12}
                                                className={i < (item.rating || 5) ? "fill-yellow-500 text-yellow-500" : "fill-neutral-200 text-neutral-200"}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="inline-flex items-center gap-2 bg-neutral-100 px-2 py-1 rounded-full">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-600">
                                            Live Config
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="mb-6">
                                {item.type === 'quote' ? (
                                    <p className="font-serif text-lg text-neutral-800 leading-relaxed">
                                        "{item.content}"
                                    </p>
                                ) : (
                                    <p className="font-sans text-sm text-neutral-500 italic">
                                        {item.content}
                                    </p>
                                )}
                                <div className="mt-2 font-bold text-sm text-neutral-900">
                                    {item.name}
                                </div>
                            </div>

                            {/* Footer / Specs */}
                            <div className="pt-4 border-t border-neutral-50 flex items-center gap-3 text-neutral-400">
                                <item.icon size={14} strokeWidth={1.5} />
                                <span className="font-mono text-[10px] uppercase tracking-wide">
                                    {item.specs}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add custom styles for marquee if not present in global css */}
            <style>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); } /* Move 1/3 because we tripled the list */
                }
                .animate-marquee {
                    animation: scroll 40s linear infinite;
                    width: max-content; /* Ensure it takes full width of children */
                }
                .hover\\:pause-animation:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

export default MarqueeTestimonials;
