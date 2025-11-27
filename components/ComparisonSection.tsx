import React, { useState } from 'react';
import { Fingerprint, Layers, Zap, Coins, ChevronDown } from 'lucide-react';
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
        }
    ];

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
                            {features.map((f, i) => (
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
                            {features.map((f, i) => (
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
                            {features.map((f, i) => (
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
                                    className="w-full px-5 py-4 flex items-center justify-between text-left"
                                >
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="w-8 h-8 rounded-xl bg-neutral-50 flex items-center justify-center flex-shrink-0">
                                            <f.icon className="w-4 h-4 text-neutral-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-bold uppercase tracking-wide text-neutral-700 mb-1">
                                                {f.label}
                                            </div>
                                            {/* Ratings in collapsed state */}
                                            {!isExpanded && (
                                                <div className="font-mono text-[11px] text-neutral-500 flex flex-wrap gap-x-2">
                                                    <span>{t.col1.title.split(' ')[0]} {f.ratings.mass}/5</span>
                                                    <span>·</span>
                                                    <span className="text-orange-500 font-semibold">canvasnova {f.ratings.cn}/5</span>
                                                    <span>·</span>
                                                    <span>{t.col3.title} {f.ratings.trad}/5</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <ChevronDown
                                        className={`w-5 h-5 text-neutral-400 transition-transform duration-300 flex-shrink-0 ml-2 ${isExpanded ? 'rotate-180' : ''}`}
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
                                            <div className="px-5 pb-5 space-y-3 border-t border-neutral-100 pt-4">
                                                {/* canvasnova - Highlighted */}
                                                <div className="bg-orange-50 rounded-2xl px-4 py-3">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <span className="text-sm font-semibold text-orange-500">canvasnova</span>
                                                        <span className="font-mono text-xs text-orange-500 font-semibold">{f.ratings.cn}/5</span>
                                                    </div>
                                                    <p className="text-sm text-neutral-900 font-medium">{f.cn}</p>
                                                </div>

                                                {/* Industrie-Poster */}
                                                <div className="px-4 py-2">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <span className="text-sm font-medium text-neutral-500">{t.col1.title}</span>
                                                        <span className="font-mono text-xs text-neutral-400">{f.ratings.mass}/5</span>
                                                    </div>
                                                    <p className="text-sm text-neutral-500">{f.mass}</p>
                                                </div>

                                                {/* Galerie */}
                                                <div className="px-4 py-2">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <span className="text-sm font-medium text-neutral-500">{t.col3.title}</span>
                                                        <span className="font-mono text-xs text-neutral-400">{f.ratings.trad}/5</span>
                                                    </div>
                                                    <p className="text-sm text-neutral-500">{f.trad}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}

                    {/* Price Accordion */}
                    <div className="rounded-3xl bg-white border border-black/5 shadow-sm shadow-black/5 overflow-hidden">
                        {/* Accordion Header */}
                        <button
                            onClick={() => setExpandedFeature(expandedFeature === 99 ? -1 : 99)}
                            className="w-full px-5 py-4 flex items-center justify-between text-left"
                        >
                            <div className="flex items-center gap-3 flex-1">
                                <div className="w-8 h-8 rounded-xl bg-neutral-50 flex items-center justify-center flex-shrink-0">
                                    <Coins className="w-4 h-4 text-neutral-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-bold uppercase tracking-wide text-neutral-700 mb-1">
                                        {t.features.price}
                                    </div>
                                    {/* Ratings in collapsed state */}
                                    {expandedFeature !== 99 && (
                                        <div className="font-mono text-[11px] text-neutral-500 flex flex-wrap gap-x-2">
                                            <span>{t.col1.title.split(' ')[0]} 2/5</span>
                                            <span>·</span>
                                            <span className="text-orange-500 font-semibold">canvasnova 5/5</span>
                                            <span>·</span>
                                            <span>{t.col3.title} 1/5</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <ChevronDown
                                className={`w-5 h-5 text-neutral-400 transition-transform duration-300 flex-shrink-0 ml-2 ${expandedFeature === 99 ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {/* Accordion Content */}
                        <AnimatePresence initial={false}>
                            {expandedFeature === 99 && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <div className="px-5 pb-5 space-y-3 border-t border-neutral-100 pt-4">
                                        {/* canvasnova - Highlighted */}
                                        <div className="bg-orange-50 rounded-2xl px-4 py-3">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="text-sm font-semibold text-orange-500">canvasnova</span>
                                                <span className="font-mono text-xs text-orange-500 font-semibold">5/5</span>
                                            </div>
                                            <p className="text-base font-bold text-neutral-900">{t.col2.price}</p>
                                        </div>

                                        {/* Industrie-Poster */}
                                        <div className="px-4 py-2">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="text-sm font-medium text-neutral-500">{t.col1.title}</span>
                                                <span className="font-mono text-xs text-neutral-400">2/5</span>
                                            </div>
                                            <p className="text-sm text-neutral-500">{t.col1.price}</p>
                                        </div>

                                        {/* Galerie */}
                                        <div className="px-4 py-2">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="text-sm font-medium text-neutral-500">{t.col3.title}</span>
                                                <span className="font-mono text-xs text-neutral-400">1/5</span>
                                            </div>
                                            <p className="text-sm text-neutral-500">{t.col3.price}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* CTA Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="bg-gallery-black text-white rounded-3xl p-8 shadow-xl text-center relative overflow-hidden mt-6"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-int-orange/20 to-transparent opacity-50" />
                        <h3 className="relative z-10 text-2xl font-serif mb-2 font-bold">{t.col2.price}</h3>
                        <p className="relative z-10 text-xs text-gray-400 uppercase tracking-widest mb-8">{t.col2.impact}</p>

                        <button className="relative z-10 w-full bg-white text-gallery-black py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-int-orange hover:text-white transition-colors shadow-lg">
                            {t.col2.cta}
                        </button>
                    </motion.div>
                </motion.div>



            </div>
        </section>
    );
};

export default ComparisonSection;
