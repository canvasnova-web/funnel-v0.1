import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MoveRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { CONTENT } from '../data/content';
import { Lang } from '../types';

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
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-gallery-white">
            <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none z-0" />

            <div className={`relative z-10 flex flex-col items-center text-center max-w-6xl px-6 mb-24 transition-all duration-700 ${isDragging ? 'blur-[2px] opacity-80' : 'blur-0 opacity-100'}`}>

                <h1 className="text-6xl md:text-9xl font-serif font-bold leading-[0.9] tracking-tight text-gallery-black mb-12 drop-shadow-sm">
                    {t.headline_1.split("").map((char, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ duration: 0.4, delay: i * 0.035, ease: "easeOut" }}
                            className="inline-block"
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                    <br />
                    <motion.span
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                        className="block text-4xl md:text-5xl italic text-gray-400 font-light mt-6 tracking-tight font-serif"
                    >
                        {t.headline_2}
                    </motion.span>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                    className="text-lg md:text-xl text-neutral-500 max-w-xl mx-auto mb-14 font-sans leading-relaxed"
                >
                    {t.sub_headline}
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onAnalyzeClick}
                    className="group relative inline-flex items-center gap-4 bg-int-orange text-white px-10 py-5 rounded-full font-sans text-sm font-bold uppercase tracking-widest shadow-xl shadow-int-orange/20 overflow-hidden"
                >
                    <span className="relative z-10">{t.cta}</span>
                    <MoveRight className="relative z-10 w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
                className="relative w-full max-w-[1400px] px-4"
            >
                <div className="relative p-2 rounded-[2.5rem] bg-gradient-to-b from-white/50 to-black/5 border border-black/5 shadow-lg shadow-black/5 backdrop-blur-sm">
                    <div
                        ref={containerRef}
                        className="relative w-full h-[60vh] md:h-[80vh] rounded-[2rem] overflow-hidden cursor-ew-resize select-none group"
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
                                className="w-full h-full object-cover max-w-none grayscale brightness-[0.75] contrast-[1.05] saturate-[0.8]"
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
                            <div className="relative pointer-events-auto cursor-ew-resize group-active:scale-95 transition-transform duration-200">
                                <div className="relative w-16 h-16 rounded-full bg-white/40 backdrop-blur-md border border-white/20 shadow-[0_0_15px_rgba(0,0,0,0.1)] flex items-center justify-center z-30 group-hover:scale-105 group-hover:shadow-[0_0_18px_rgba(255,255,255,0.35)] transition-all duration-300">
                                    <div className="w-1.5 h-8 bg-white/80 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;

