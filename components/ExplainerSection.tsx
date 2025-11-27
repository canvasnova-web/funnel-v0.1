import React, { MouseEvent } from 'react';
import { Sparkles, SlidersHorizontal, Gem } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { CONTENT } from '../data/content';
import { Lang } from '../types';

const ExplainerSection = ({ lang }: { lang: Lang }) => {
    const t = CONTENT[lang].explainer;
    const icons = [Sparkles, SlidersHorizontal, Gem];

    return (
        <section className="py-20 md:py-32 px-6 bg-gallery-white relative z-20 border-b border-gray-100/50">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col space-y-6 md:grid md:grid-cols-3 md:gap-10 md:space-y-0">
                    {t.map((card, i) => (
                        <Card key={i} i={i} card={card} Icon={icons[i]} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const Card = ({ i, card, Icon }: { i: number, card: any, Icon: any }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            whileHover={{ y: -1, scale: 1.02 }}
            whileTap={{ y: -1, scale: 1.02 }}
            className="group relative p-6 md:p-8 rounded-2xl border border-black/10 bg-white shadow-sm shadow-black/5 hover:shadow-md hover:shadow-black/10 active:shadow-md active:shadow-black/10 transition-all duration-300 cursor-default overflow-hidden"
        >
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                          650px circle at ${mouseX}px ${mouseY}px,
                          rgba(0, 0, 0, 0.03),
                          transparent 80%
                        )
                      `,
                }}
            />
            <div className="relative z-10 max-w-md mx-auto md:max-w-none">
                <div className="h-10 w-10 rounded-xl bg-neutral-50 border border-black/5 flex items-center justify-center mb-5 text-neutral-700">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-lg md:text-xl font-semibold text-neutral-900 mb-2.5 tracking-tight leading-snug">{card.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{card.text}</p>
            </div>
        </motion.div>
    );
};

export default ExplainerSection;
