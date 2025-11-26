import React, { useState } from 'react';
import { Fingerprint, Layers, Zap, Coins, Sparkles, MoveRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { CONTENT } from '../data/content';
import { Lang } from '../types';

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
        <section className="py-24 px-4 md:px-6 bg-[#FAFAFA] relative overflow-hidden">
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
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

                {/* Desktop Table Layout */}
                <div className="hidden md:grid grid-cols-4 gap-4 items-stretch">
                    {/* Header Column (Empty top-left) */}
                    <div className="flex flex-col justify-end pb-8">
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Features</span>
                    </div>

                    {/* Mass Market Header */}
                    <div className="text-center pb-8 px-4 opacity-50">
                        <h3 className="font-serif text-xl text-neutral-600">{t.col1.title}</h3>
                        <p className="text-[10px] font-mono text-neutral-400 mt-1 uppercase tracking-widest">{t.col1.sub}</p>
                    </div>

                    {/* CanvasNova Header */}
                    <div className="relative text-center pb-8 px-4 z-10">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                            <span className="bg-int-orange text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md">
                                {t.col2.badge}
                            </span>
                        </div>
                        <h3 className="font-serif text-2xl text-gallery-black font-bold">{t.col2.title}</h3>
                        <p className="text-[10px] font-mono text-int-orange mt-1 uppercase tracking-widest font-bold">{t.col2.sub}</p>
                    </div>

                    {/* Gallery Header */}
                    <div className="text-center pb-8 px-4 opacity-50">
                        <h3 className="font-serif text-xl text-neutral-600">{t.col3.title}</h3>
                        <p className="text-[10px] font-mono text-neutral-400 mt-1 uppercase tracking-widest">{t.col3.sub}</p>
                    </div>

                    {/* Rows */}
                    {features.map((f, i) => (
                        <React.Fragment key={i}>
                            {/* Label */}
                            <div className="flex items-center py-6 border-b border-gray-100">
                                <div className="flex items-center gap-3">
                                    <f.icon className="w-5 h-5 text-gray-300" />
                                    <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">{f.label}</span>
                                </div>
                            </div>

                            {/* Mass Value */}
                            <div className="flex items-center justify-center py-6 border-b border-gray-100 bg-gray-50/30 text-center">
                                <span className="text-sm text-gray-500 font-medium">{f.mass}</span>
                            </div>

                            {/* CanvasNova Value */}
                            <div className="relative flex items-center justify-center py-6 border-b border-gray-100 bg-white shadow-sm z-10 -mx-2 rounded-lg ring-1 ring-black/5">
                                <span className="text-base text-gallery-black font-bold">{f.cn}</span>
                            </div>

                            {/* Gallery Value */}
                            <div className="flex items-center justify-center py-6 border-b border-gray-100 bg-gray-50/30 text-center">
                                <span className="text-sm text-gray-500 font-medium">{f.trad}</span>
                            </div>
                        </React.Fragment>
                    ))}

                    {/* Price Row */}
                    <div className="flex items-center py-8">
                        <div className="flex items-center gap-3">
                            <Coins className="w-5 h-5 text-gray-300" />
                            <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">{t.features.price}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center py-8 bg-gray-50/30">
                        <span className="text-lg font-serif text-gray-400 line-through decoration-red-400/30">{t.col1.price}</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest">{t.col1.impact}</span>
                    </div>
                    <div className="relative flex flex-col items-center justify-center py-8 bg-white shadow-lg z-10 -mx-2 rounded-xl ring-1 ring-int-orange/20 border-t-4 border-int-orange">
                        <span className="text-3xl font-serif text-int-orange font-bold">{t.col2.price}</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-4">{t.col2.impact}</span>
                        <button className="bg-gallery-black text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-int-orange transition-colors">
                            {t.col2.cta}
                        </button>
                    </div>
                    <div className="flex flex-col items-center justify-center py-8 bg-gray-50/30">
                        <span className="text-lg font-serif text-gray-600">{t.col3.price}</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest">{t.col3.impact}</span>
                    </div>
                </div>

                {/* Mobile Stacked Layout */}
                <div className="md:hidden space-y-8">
                    {features.map((f, i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                    <f.icon className="w-4 h-4" />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{f.label}</span>
                            </div>

                            <div className="space-y-4">
                                {/* CanvasNova (Highlighted) */}
                                <div className="flex justify-between items-center p-3 rounded-lg bg-orange-50/50 border border-int-orange/10">
                                    <span className="text-xs font-bold text-int-orange">canvasnova</span>
                                    <span className="text-sm font-bold text-gallery-black">{f.cn}</span>
                                </div>

                                {/* Others */}
                                <div className="flex justify-between items-center px-3 opacity-60">
                                    <span className="text-xs font-medium text-gray-400">{t.col1.title}</span>
                                    <span className="text-sm text-gray-500">{f.mass}</span>
                                </div>
                                <div className="flex justify-between items-center px-3 opacity-60">
                                    <span className="text-xs font-medium text-gray-400">{t.col3.title}</span>
                                    <span className="text-sm text-gray-500">{f.trad}</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Price Block Mobile */}
                    <div className="bg-gallery-black text-white rounded-2xl p-8 shadow-xl text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-int-orange/20 to-transparent opacity-50" />
                        <h3 className="relative z-10 text-2xl font-serif mb-1">{t.col2.price}</h3>
                        <p className="relative z-10 text-[10px] text-gray-400 uppercase tracking-widest mb-6">{t.col2.impact}</p>

                        <div className="relative z-10 flex justify-center gap-8 text-xs text-gray-500 mb-8">
                            <div className="flex flex-col">
                                <span className="line-through decoration-white/30">{t.col1.price}</span>
                                <span className="text-[8px] uppercase">{t.col1.title}</span>
                            </div>
                            <div className="flex flex-col">
                                <span>{t.col3.price}</span>
                                <span className="text-[8px] uppercase">{t.col3.title}</span>
                            </div>
                        </div>

                        <button className="relative z-10 w-full bg-white text-gallery-black py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-int-orange hover:text-white transition-colors">
                            {t.col2.cta}
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ComparisonSection;
