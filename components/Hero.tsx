import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '../data/content';
import { Lang } from '../types';

const Hero = ({ onAnalyzeClick, lang }: { onAnalyzeClick: () => void, lang: Lang }) => {
    const t = CONTENT[lang].hero;
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Image pair state
    const [currentPair, setCurrentPair] = useState(0);

    // Define image pairs
    const imagePairs = [
        {
            before: '/images/hero-empty.jpg',
            after: '/images/hero-art.jpg',
            label: 'Living Room'
        },
        {
            before: '/images/bedroom-empty.png',
            after: '/images/bedroom.png',
            label: 'Bedroom'
        },
        {
            before: '/images/gym-empty.jpg',
            after: '/images/gym-art.jpg',
            label: 'Home Gym'
        },
        {
            before: '/images/living-empty.jpg',
            after: '/images/living-art.jpg',
            label: 'Modern Living'
        }
    ];

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
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-24 overflow-hidden bg-gradient-to-b from-neutral-50 via-white to-neutral-100">
            {/* Subtle grain texture */}
            <div className="absolute inset-0 bg-grain opacity-5 pointer-events-none z-0" />

            {/* Headline Block */}
            <div className={`relative z-10 flex flex-col items-center text-center max-w-6xl px-6 mb-24 transition-all duration-700 ${isDragging ? 'blur-[2px] opacity-80' : 'blur-0 opacity-100'}`}>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[clamp(2.8rem,6vw,4.5rem)] font-semibold tracking-tight text-neutral-900 leading-[1.1] mb-6"
                >
                    {t.headline_1}
                    <br className="hidden md:block" />
                    <span className="text-neutral-400 italic font-serif font-light ml-2 md:ml-3">
                        {t.headline_2}
                    </span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-base md:text-lg text-neutral-600 max-w-[65ch] mx-auto mb-10 leading-relaxed font-sans"
                >
                    {t.sub_headline}
                </motion.p>

                {/* CTA Button */}
                <motion.button
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 18px 45px rgba(234, 88, 12, 0.45)",
                        backgroundColor: "#ea580c"
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onAnalyzeClick}
                    className="px-8 py-3 rounded-full bg-orange-500 text-white text-sm font-semibold tracking-wide transition-all shadow-lg shadow-orange-500/20"
                >
                    JETZT UNIKAT ENTWERFEN
                </motion.button>
            </div>

            {/* Slider Section */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
                className="relative w-full max-w-[1200px] px-4"
            >
                {/* Context Label */}
                <p className="text-xs text-neutral-500 uppercase tracking-wide text-center mb-6 opacity-80">
                    Erleben Sie den Unterschied.
                </p>

                {/* Slider Card */}
                <div className="relative p-1.5 md:p-2 rounded-3xl bg-white border border-black/5 shadow-lg shadow-black/5 overflow-hidden">
                    <div
                        ref={containerRef}
                        className="relative w-full h-[50vh] md:h-[75vh] rounded-[1.25rem] md:rounded-[1.5rem] overflow-hidden cursor-ew-resize select-none group"
                        onMouseDown={startDrag}
                        onTouchStart={startDrag}
                        onClick={(e) => !isDragging && handleDrag(e)}
                    >
                        {/* After Image (Right Side) */}
                        <div className="absolute inset-0 bg-neutral-100 transition-opacity duration-500">
                            <img
                                key={`after-${currentPair}`}
                                src={imagePairs[currentPair].after}
                                alt="Artistic Room"
                                className="w-full h-full object-cover saturate-[1.1] contrast-[1.05] transition-opacity duration-500"
                            />
                            <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md text-white px-4 py-1.5 rounded-full font-mono text-[10px] tracking-widest uppercase border border-white/10 shadow-sm">
                                {t.after}
                            </div>
                        </div>

                        {/* Before Image (Left Side) */}
                        <div
                            className="absolute inset-0 border-r border-white/60 overflow-hidden bg-neutral-100 transition-opacity duration-500"
                            style={{ width: `${sliderPosition}%` }}
                        >
                            <img
                                key={`before-${currentPair}`}
                                src={imagePairs[currentPair].before}
                                alt="Empty Room"
                                className="w-full h-full object-cover max-w-none grayscale brightness-[0.9] contrast-[1.05] transition-opacity duration-500"
                                style={{ width: containerRef.current?.offsetWidth || '100vw' }}
                            />
                            <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-md text-neutral-900 px-4 py-1.5 rounded-full font-mono text-[10px] tracking-widest uppercase border border-white/40 shadow-sm">
                                {t.before}
                            </div>
                        </div>

                        {/* Slider Handle */}
                        <div
                            className="absolute top-0 bottom-0 w-px bg-transparent z-20 flex items-center justify-center pointer-events-none"
                            style={{ left: `${sliderPosition}%` }}
                        >
                            <div className="relative pointer-events-auto cursor-ew-resize group-active:scale-95 transition-transform duration-200">
                                <div className="w-12 h-12 rounded-full backdrop-blur-md bg-white/40 border border-white/80 shadow-[0_0_18px_rgba(0,0,0,0.15)] flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                                    <div className="flex gap-1">
                                        <div className="w-0.5 h-4 bg-white/90 rounded-full shadow-sm" />
                                        <div className="w-0.5 h-4 bg-white/90 rounded-full shadow-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Arrow Controls Below Slider */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex justify-center mt-8"
                >
                    <div className="inline-flex items-center gap-4 px-5 py-2.5 rounded-full bg-white border border-black/5 shadow-sm">
                        <button
                            onClick={() => setCurrentPair((currentPair - 1 + imagePairs.length) % imagePairs.length)}
                            className="h-8 w-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
                            aria-label="Previous image"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <div className="flex items-center gap-2">
                            {imagePairs.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPair(index)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${currentPair === index ? 'bg-neutral-800 w-4' : 'bg-neutral-200 w-1.5 hover:bg-neutral-300'
                                        }`}
                                    aria-label={`Go to image ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentPair((currentPair + 1) % imagePairs.length)}
                            className="h-8 w-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
                            aria-label="Next image"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;

