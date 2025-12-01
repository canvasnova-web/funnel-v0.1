import React, { useRef } from 'react';
import { Palette, Sparkles, Scan, Layers, Eye, Truck } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { CONTENT } from '../data/content';
import { Lang, TimelineStepProps } from '../types';

const TimelineStep: React.FC<TimelineStepProps> = ({ step, index, isLast }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { margin: "-30% 0px -30% 0px", once: false });

    return (
        <div ref={ref} className={`relative flex flex-col md:flex-row gap-8 md:gap-24 ${isLast ? 'pb-0' : 'pb-32'}`}>

            {/* Left Column: Icon & Marker */}
            <div className="flex flex-col items-center md:items-end w-full md:w-32 shrink-0 relative">
                <motion.div
                    animate={{
                        scale: isInView ? 1.1 : 1,
                        backgroundColor: isInView ? '#FFFFFF' : '#F5F5F5',
                        borderColor: isInView ? '#FF4F00' : 'rgba(0,0,0,0.05)',
                        boxShadow: isInView ? '0 10px 40px -10px rgba(255, 79, 0, 0.3)' : 'none'
                    }}
                    transition={{ duration: 0.5 }}
                    className="relative z-20 w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 flex items-center justify-center bg-white transition-colors duration-500"
                >
                    <step.icon
                        className={`w-6 h-6 md:w-8 md:h-8 transition-colors duration-500 ${isInView ? 'text-int-orange' : 'text-gray-300'}`}
                        strokeWidth={1.5}
                    />

                    {/* Active Pulse Ring */}
                    {isInView && (
                        <motion.div
                            initial={{ opacity: 0, scale: 1 }}
                            animate={{ opacity: [0, 0.5, 0], scale: 1.6 }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 rounded-2xl border border-int-orange"
                        />
                    )}
                </motion.div>

                {/* Number Indicator */}
                <div className={`mt-4 font-mono text-xs font-bold tracking-widest transition-colors duration-500 ${isInView ? 'text-int-orange' : 'text-gray-300'}`}>
                    STEP 0{index + 1}
                </div>
            </div>

            {/* Right Column: Content Card */}
            <motion.div
                initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                animate={{
                    opacity: isInView ? 1 : 0.4,
                    x: isInView ? 0 : 20,
                    filter: isInView ? 'blur(0px)' : 'blur(2px)'
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex-1 relative group"
            >
                <div className="relative p-8 md:p-10 rounded-[2rem] bg-white border border-gray-100 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] overflow-hidden hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.1)] transition-shadow duration-500">

                    {/* Glass Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-gray-50/50 opacity-50 pointer-events-none" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className={`font-serif text-3xl md:text-4xl text-gallery-black mb-4 transition-colors duration-300 ${isInView ? 'text-gallery-black' : 'text-gray-400'}`}>
                                {step.title}
                            </h3>
                            <p className="font-sans text-gray-500 leading-relaxed text-lg">
                                {step.desc}
                            </p>
                        </div>

                        {step.image && (
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-inner bg-gray-100 group-hover:scale-[1.02] transition-transform duration-700">
                                <img
                                    src={step.image}
                                    alt={step.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl" />
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const Timeline = ({ lang }: { lang: Lang }) => {
    const t = CONTENT[lang].timeline;
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 20%", "end 80%"]
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
        <section className="py-32 md:py-48 bg-[#FAFAFA] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="mb-32 md:mb-48 text-center max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-white border border-gray-200 text-[10px] font-bold tracking-[0.2em] text-int-orange uppercase mb-6 shadow-sm">
                            {t.badge}
                        </span>
                        <h2 className="text-5xl md:text-7xl font-serif text-gallery-black tracking-tight leading-[1.1]">
                            {t.headline}
                        </h2>
                    </motion.div>
                </div>

                <div ref={containerRef} className="relative">
                    {/* Connecting Line */}
                    <div className="absolute left-[31px] md:left-[39px] top-8 bottom-32 w-[2px] bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                            style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                            className="w-full bg-int-orange shadow-[0_0_15px_#FF4F00]"
                        />
                    </div>

                    <div className="relative z-10 space-y-12">
                        {steps.map((step, i) => (
                            <TimelineStep key={i} step={step} index={i} isLast={i === steps.length - 1} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;