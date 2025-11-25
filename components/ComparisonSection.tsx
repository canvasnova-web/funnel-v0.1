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

export default ComparisonSection;
