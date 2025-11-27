import React, { useState } from 'react';
import { Fingerprint, Layers, Zap, Coins, ChevronDown, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT } from '../data/content';
import { Lang } from '../types';

const ComparisonSection = ({ lang }: { lang: Lang }) => {
    const t = CONTENT[lang].comparison;
    const [expandedFeature, setExpandedFeature] = useState<number>(0); // First feature open by default

    const features = [
        {
            label: t.features.uniqueness,
            icon: Fingerprint,
            mass: t.col1.val1,
            cn: t.col2.val1,
            trad: t.col3.val1,
            ratings: { mass: 1, cn: 5, trad: 4 }
        },
        {
            label: t.features.material,
            icon: Layers,
            mass: t.col1.val2,
            cn: t.col2.val2,
            trad: t.col3.val2,
            ratings: { mass: 1, cn: 5, trad: 5 }
        },
        {
            label: t.features.acquisition,
            icon: Zap,
            mass: t.col1.val3,
            cn: t.col2.val3,
            trad: t.col3.val3,
            ratings: { mass: 2, cn: 5, trad: 3 }
        },
        {
            label: t.features.price,
            icon: Coins,
            mass: `${t.col1.price} · Massenware`,
            cn: `${t.col2.price} · ${t.col2.impact}`,
            trad: `${t.col3.price} · Kapitalanlage`,
            ratings: { mass: 2, cn: 5, trad: 1 }
        }
    ];

    const renderStars = (count: number, activeColor: string = "text-orange-500", inactiveColor: string = "text-neutral-200") => {
        return (
            <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-3 h-3 ${i < count ? activeColor : inactiveColor} ${i < count ? 'fill-current' : ''}`}
                        strokeWidth={2}
                    />
                ))}
            </div>
        );
    };

    return (
        <section className="py-24 px-4 md:px-6 bg-[#FAFAFA] relative overflow-hidden">
            <div
                className="absolute inset-0 opacity-[0.015] pointer-events-none"
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

                {/* Desktop 3-Column Grid Layout */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="hidden md:block max-w-5xl mx-auto"
                >
                    {/* Column Headers */}
                    <div className="grid grid-cols-3 gap-8 mb-8">
                        {/* Industrie-Poster Header */}
                        <div className="text-center">
                            <h3 className="font-serif text-lg text-neutral-500">{t.col1.title}</h3>
                            <p className="text-[10px] font-mono text-neutral-400 mt-1 uppercase tracking-widest">{t.col1.sub}</p>
                        </div>

                        {/* CanvasNova Header */}
                        <div className="relative text-center">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
                                <span className="bg-int-orange text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md">
                                    {t.col2.badge}
                                </span>
                            </div>
                            <h3 className="font-serif text-2xl text-gallery-black font-bold">{t.col2.title}</h3>
                            <p className="text-[10px] font-mono text-int-orange mt-1 uppercase tracking-widest font-bold">{t.col2.sub}</p>
                        </div>

                        {/* Galerie Header */}
                        <div className="text-center">
                            <h3 className="font-serif text-lg text-neutral-500">{t.col3.title}</h3>
                            <p className="text-[10px] font-mono text-neutral-400 mt-1 uppercase tracking-widest">{t.col3.sub}</p>
                        </div>
                    </div>

                    {/* Comparison Grid */}
                    <div className="grid grid-cols-3 gap-8 items-start">
                        {/* Left Column - Industrie-Poster */}
                        <div className="space-y-6">
                            {features.slice(0, 3).map((f, i) => (
                                <div key={i} className="text-center py-4">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <f.icon className="w-4 h-4 text-neutral-300" />
                                        <span className="text-xs text-neutral-400 uppercase tracking-wide font-semibold">{f.label}</span>
                                    </div>
                                    <p className="text-sm text-neutral-500 font-medium">{f.mass}</p>
                                </div>
                            ))}
                            {/* Price */}
                            <div className="text-center py-4 pt-8">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <Coins className="w-4 h-4 text-neutral-300" />
                                    <span className="text-xs text-neutral-400 uppercase tracking-wide font-semibold">{t.features.price}</span>
                                </div>
                                <p className="text-sm text-neutral-500 font-medium">{t.col1.price}</p>
                            </div>
                        </div>

                        {/* Center Column - CanvasNova (Elevated Card) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="bg-white rounded-3xl shadow-xl shadow-black/10 border border-black/5 p-6 space-y-6"
                        >
                            {features.slice(0, 3).map((f, i) => (
                                <div key={i} className="bg-neutral-50 rounded-2xl px-4 py-4 text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <f.icon className="w-4 h-4 text-neutral-600" />
                                        <span className="text-xs text-neutral-600 uppercase tracking-wide font-semibold">{f.label}</span>
                                    </div>
                                    <p className="text-base text-neutral-900 font-semibold">{f.cn}</p>
                                </div>
                            ))}
                            {/* Price */}
                            <div className="bg-neutral-50 rounded-2xl px-4 py-6 text-center mt-8">
                                <div className="flex items-center justify-center gap-2 mb-3">
                                    <Coins className="w-4 h-4 text-neutral-600" />
                                    <span className="text-xs text-neutral-600 uppercase tracking-wide font-semibold">{t.features.price}</span>
                                </div>
                                <p className="text-3xl text-neutral-900 font-bold mb-1">{t.col2.price}</p>
                                <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">{t.col2.impact}</span>
                            </div>
                            {/* CTA */}
                            <button className="w-full bg-gallery-black text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-int-orange transition-colors shadow-sm mt-4">
                                {t.col2.cta}
                            </button>
                        </motion.div>

                        {/* Right Column - Galerie */}
                        <div className="space-y-6">
                            {features.slice(0, 3).map((f, i) => (
                                <div key={i} className="text-center py-4">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <f.icon className="w-4 h-4 text-neutral-300" />
                                        <span className="text-xs text-neutral-400 uppercase tracking-wide font-semibold">{f.label}</span>
                                    </div>
                                    <p className="text-sm text-neutral-500 font-medium">{f.trad}</p>
                                </div>
                            ))}
                            {/* Price */}
                            <div className="text-center py-4 pt-8">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <Coins className="w-4 h-4 text-neutral-300" />
                                    <span className="text-xs text-neutral-400 uppercase tracking-wide font-semibold">{t.features.price}</span>
                                </div>
                                <p className="text-sm text-neutral-500 font-medium">{t.col3.price}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>



                {/* Mobile Accordion Layout */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="md:hidden space-y-4 px-2"
                >
                    {/* Feature Accordions */}
                    {features.map((f, i) => {
                        const isExpanded = expandedFeature === i;
                        return (
                            <div
                                key={i}
                                className="rounded-3xl bg-white border border-black/5 shadow-sm shadow-black/5 overflow-hidden"
                            >
                                {/* Accordion Header */}
                                <button
                                    onClick={() => setExpandedFeature(isExpanded ? -1 : i)}
                                    className="w-full px-5 py-5 flex items-start justify-between text-left"
                                >
                                    <div className="flex gap-4 flex-1">
                                        <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center flex-shrink-0 border border-black/5 mt-1">
                                            <f.icon className="w-5 h-5 text-neutral-700" strokeWidth={1.5} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs font-bold uppercase tracking-widest text-neutral-900 mb-3">
                                                {f.label}
                                            </div>

                                            {/* Star Ratings Comparison */}
                                            <div className="space-y-1.5">
                                                {/* Poster */}
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[11px] text-neutral-500">Poster</span>
                                                    {renderStars(f.ratings.mass)}
                                                </div>
                                                {/* canvasnova */}
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[11px] font-semibold text-orange-500">canvasnova</span>
                                                    {renderStars(f.ratings.cn)}
                                                </div>
                                                {/* Galerie */}
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[11px] text-neutral-500">Galerie</span>
                                                    {renderStars(f.ratings.trad)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <ChevronDown
                                        className={`w-5 h-5 text-neutral-400 transition-transform duration-300 flex-shrink-0 ml-2 mt-1 ${isExpanded ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                {/* Accordion Content */}
                                <AnimatePresence initial={false}>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-5 pb-5 space-y-2 border-t border-neutral-100 pt-4 mt-2">
                                                {/* canvasnova - Highlighted */}
                                                <div className="bg-orange-50 rounded-2xl px-4 py-3">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <span className="text-xs font-bold text-orange-600 uppercase tracking-wide">canvasnova</span>
                                                    </div>
                                                    <p className="text-sm text-neutral-900 font-medium leading-relaxed">{f.cn}</p>
                                                </div>

                                                {/* Industrie-Poster */}
                                                <div className="px-4 py-2">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <span className="text-xs font-bold text-neutral-500 uppercase tracking-wide">Poster</span>
                                                    </div>
                                                    <p className="text-sm text-neutral-600 leading-relaxed">{f.mass}</p>
                                                </div>

                                                {/* Galerie */}
                                                <div className="px-4 py-2">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <span className="text-xs font-bold text-neutral-500 uppercase tracking-wide">Galerie</span>
                                                    </div>
                                                    <p className="text-sm text-neutral-600 leading-relaxed">{f.trad}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}

                    {/* Simplified Bottom Price Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="bg-neutral-900 text-white rounded-3xl p-8 shadow-xl text-center relative overflow-hidden mt-8"
                    >
                        {/* Subtle Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-transparent opacity-50" />

                        <div className="relative z-10">
                            <h3 className="text-3xl font-semibold text-white mb-2">ab €140</h3>
                            <p className="text-xs text-white/60 uppercase tracking-[0.25em] mb-8">
                                Galerie-Qualität ohne Galeriepreis
                            </p>

                            <button className="w-full bg-white text-neutral-900 py-4 rounded-full text-sm font-semibold shadow-lg hover:bg-neutral-100 transition-colors">
                                Mit meinem Raum starten
                            </button>
                        </div>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
};

export default ComparisonSection;
