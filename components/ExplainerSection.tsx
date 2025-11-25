import React from 'react';
import { Sparkles, SlidersHorizontal, Gem } from 'lucide-react';
import { motion } from 'framer-motion';
import { CONTENT } from '../data/content';
import { Lang } from '../types';

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

export default ExplainerSection;
