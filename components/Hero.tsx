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
        <section className="relative min-h-[95vh] flex flex-col items-center justify-center py-20 overflow-hidden bg-gallery-white">
            <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none z-0" />

            <div className={`relative z-10 flex flex-col items-center text-center max-w-6xl px-6 mb-16 transition-all duration-700 ${isDragging ? 'blur-[2px] opacity-80' : 'blur-0 opacity-100'}`}>
                {/* Badge removed for visual clarity - Rams principle: less but better */}

                <h1 className="text-6xl md:text-9xl font-serif font-bold leading-[0.9] tracking-[-0.02em] text-gallery-black mb-10 drop-shadow-sm">
                    {t.headline_1.split("").map((char, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ duration: 1, delay: i * 0.035, ease: [0.2, 0.65, 0.3, 0.9] }}
                            className="inline-block"
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                    <br />
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="block text-4xl md:text-5xl italic text-gray-400 font-light mt-4 tracking-tight font-serif"
                    >
                        {t.headline_2}
                    </motion.span>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto mb-10 font-sans leading-relaxed"
                >
                    {t.sub_headline}
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onAnalyzeClick}
                    className="group relative inline-flex items-center gap-4 bg-gallery-black text-white px-8 py-4 rounded-full font-sans text-sm font-bold uppercase tracking-widest shadow-2xl shadow-black/20 overflow-hidden"
                >
                    <span className="relative z-10">{t.cta}</span>
                    <div className="relative z-10 w-6 h-6 rounded-full bg-int-orange flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                        <MoveRight className="w-3 h-3 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gray-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </motion.button>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.4, delay: 0.3, ease: [0.2, 0.65, 0.3, 0.9] }}
                className="relative w-full max-w-[1400px] h-[60vh] md:h-[80vh] px-4"
            >
                <div
                    ref={containerRef}
                    className="relative w-full h-full rounded-[2rem] overflow-hidden cursor-ew-resize shadow-[0_25px_50px_-12px_rgba(255,79,0,0.15)] select-none group border border-gray-200"
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
                        <div className="relative pointer-events-auto cursor-ew-resize group-active:scale-95 transition-transform">
                            <div className="absolute inset-0 -m-8 bg-int-orange blur-3xl opacity-30 rounded-full animate-pulse" style={{ animationDuration: '2s' }} />
                            <div className="relative w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.2)] flex items-center justify-center z-30 ring-2 ring-white/40 animate-pulse" style={{ animationDuration: '2s' }}>
                                <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,1)]" />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
