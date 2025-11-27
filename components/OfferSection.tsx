import React, { useState, useEffect } from 'react';
import { Infinity as InfinityIcon, MoveRight, Loader2, Percent, Euro } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT } from '../data/content';
import { Lang } from '../types';
import { getVoucherFromURL, getVoucherFromBackendAPI, getRedirectURL, getVoucherValidUntil, formatSavingsAmount } from '../utils/voucher';
import { VoucherConfig } from '../data/vouchers';

const OfferSection = ({ id, lang }: { id: string, lang: Lang }) => {
    const t = CONTENT[lang].offer;
    const [status, setStatus] = useState<'idle' | 'claiming' | 'redirecting'>('idle');
    const [particles, setParticles] = useState<{ id: number, x: number, y: number, color: string }[]>([]);
    const [currentVoucher, setCurrentVoucher] = useState<VoucherConfig>(getVoucherFromURL());
    const [isLoading, setIsLoading] = useState(true);

    // Calculate seconds until voucher expiry date
    const calculateTimeLeft = () => {
        const now = new Date();
        const endDate = getVoucherValidUntil(currentVoucher);
        const diff = Math.floor((endDate.getTime() - now.getTime()) / 1000);
        return Math.max(0, diff);
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    // Load voucher from Backend API on mount and URL change
    useEffect(() => {
        const loadVoucherFromAPI = async () => {
            setIsLoading(true);
            try {
                const voucherFromAPI = await getVoucherFromBackendAPI();
                setCurrentVoucher(voucherFromAPI);
            } catch (error) {
                console.error('Error loading voucher from API:', error);
                // Fallback zu statischen Daten
                setCurrentVoucher(getVoucherFromURL());
            } finally {
                setIsLoading(false);
            }
        };

        loadVoucherFromAPI();

        // Listen for URL changes (popstate for browser back/forward)
        const handleURLChange = () => {
            loadVoucherFromAPI();
        };

        window.addEventListener('popstate', handleURLChange);

        // Check URL periodically (in case it's changed programmatically)
        const urlCheckInterval = setInterval(() => {
            const params = new URLSearchParams(window.location.search);
            const currentPromo = params.get('promo') || params.get('campaign');

            // Nur neu laden wenn sich tatsächlich etwas geändert hat
            if (currentPromo && currentPromo !== currentVoucher.promoId) {
                loadVoucherFromAPI();
            }
        }, 1000);

        return () => {
            window.removeEventListener('popstate', handleURLChange);
            clearInterval(urlCheckInterval);
        };
    }, []);

    // Update countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, [currentVoucher]);


    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleClaim = () => {
        // Copy the dynamic voucher code to clipboard
        navigator.clipboard.writeText(currentVoucher.code);

        // Trigger visual feedback
        setStatus('claiming');

        // Confetti logic
        const colors = ['#FF4F00', '#FFFFFF', '#333333'];
        const newParticles = Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 400,
            color: colors[Math.floor(Math.random() * colors.length)]
        }));
        setParticles(newParticles);

        // Transition to redirecting state after "processing"
        setTimeout(() => {
            setStatus('redirecting');
            // Actual redirect with dynamic voucher
            setTimeout(() => {
                window.location.href = getRedirectURL(currentVoucher);
            }, 800);
        }, 1500);

        setTimeout(() => setParticles([]), 2000);
    };

    return (
        <section id={id} className="py-32 px-4 bg-gallery-black text-white relative overflow-hidden flex justify-center min-h-[800px] items-center">
            {/* Background Texture - Reduced Noise */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-int-orange blur-[150px] opacity-10 pointer-events-none" />

            <div className="max-w-md w-full relative z-10">
                <motion.div
                    initial={{ y: 24, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ${status !== 'idle' ? 'scale-[0.98] brightness-110' : ''}`}
                >

                    {/* Simplified Border */}
                    <div className="absolute inset-0 p-[1px] rounded-3xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900 rounded-3xl" />
                        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_340deg,#FF4F00_360deg)] animate-[spin_4s_linear_infinite] opacity-50" />
                    </div>

                    {/* Card Content Container */}
                    <div className="relative bg-neutral-950 rounded-[23px] overflow-hidden h-full">
                        {/* Header Section - Mobile Optimized */}
                        <div className="bg-neutral-900 px-5 py-6 md:p-8 md:pb-10 relative">
                            <div className="flex justify-between items-start mb-6 md:mb-8">
                                <div>
                                    <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase block mb-2">Pass Type</span>
                                    <h3 className="text-base md:text-2xl font-serif font-semibold md:font-bold text-white tracking-tight">{currentVoucher.title}</h3>
                                </div>
                                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                                    {currentVoucher.type === 'percentage' ? (
                                        <Percent className="w-4 h-4 text-int-orange" />
                                    ) : (
                                        <Euro className="w-4 h-4 text-int-orange" />
                                    )}
                                </div>
                            </div>

                            {/* Countdown Row - Mobile Optimized */}
                            <div className="flex items-center justify-between bg-black/20 rounded-2xl px-4 md:px-5 py-3 md:py-4 border border-white/5">
                                <div>
                                    <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase block mb-1">ANGEBOT ENDET IN:</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-int-orange rounded-full animate-pulse shadow-[0_0_8px_rgba(255,79,0,0.8)]" style={{ animationDuration: '1.2s' }} />
                                        <span className="text-white tracking-widest font-mono text-xs md:text-sm font-bold tabular-nums">{formatTime(timeLeft)}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase block mb-1">Batch</span>
                                    <span className="font-mono text-white text-xs md:text-sm">2025</span>
                                </div>
                            </div>
                        </div>

                        {/* Perforated Tear Line */}
                        <div className="relative h-0 flex items-center justify-between px-3 z-20">
                            <div className="w-6 h-6 rounded-full bg-gallery-black -ml-6 shadow-inner" />
                            <div className="w-full mx-2 relative">
                                <div className="w-full h-[2px] relative" style={{
                                    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 8px, #404040 8px, #404040 10px)',
                                    backgroundSize: '18px 2px'
                                }} />
                                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-b from-black/40 to-transparent" />
                                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-t from-black/40 to-transparent" />
                            </div>
                            <div className="w-6 h-6 rounded-full bg-gallery-black -mr-6 shadow-inner" />
                        </div>

                        {/* Body Section - Mobile Optimized Spacing */}
                        <div className="px-5 py-6 md:p-8 md:pt-10 space-y-8 md:space-y-10 bg-neutral-950/50 backdrop-blur-sm">
                            {/* Benefits List - Mobile Optimized */}
                            <div className="space-y-3 border-t border-white/10 pt-4 md:space-y-4 md:border-t md:border-white/5 md:pt-6">
                                <div className="flex justify-between items-center text-xs md:text-sm">
                                    <span className="text-white/70 md:text-white/60">{t.item1}</span>
                                    <span className="font-mono text-[11px] md:text-xs text-white/30 line-through">€2.00</span>
                                </div>
                                <div className="flex justify-between items-center text-xs md:text-sm">
                                    <span className="text-white/70 md:text-white/60">{t.item2}</span>
                                    <span className="font-mono text-xs md:text-sm text-orange-400 font-semibold tracking-wider">{t.free}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs md:text-sm">
                                    <span className="text-white/70 md:text-white/60">{t.item3}</span>
                                    <span className="font-mono text-[11px] md:text-xs text-white/30 line-through">€5.00</span>
                                </div>
                            </div>

                            {/* Price Block - Mobile Centered */}
                            <div className="text-center space-y-2 md:space-y-3">
                                <div className="flex items-center justify-center gap-3">
                                    <span className="text-xs md:text-2xl font-serif text-white/30 line-through decoration-int-orange/50 decoration-2">€7.00</span>
                                    <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">→</span>
                                </div>
                                <div>
                                    <span
                                        className="font-sans text-4xl md:text-5xl font-semibold text-white tracking-tight leading-none block"
                                        style={{ textShadow: '0 0 20px rgba(0,0,0,0.8)' }}
                                    >
                                        €0.00
                                    </span>
                                    <span className="font-mono text-[10px] md:text-xs text-orange-300 uppercase tracking-[0.25em] mt-2 md:mt-3 block">
                                        {t.vat} · {formatSavingsAmount(currentVoucher)}
                                    </span>
                                </div>
                            </div>

                            {/* CTA Button - Mobile Full Width */}
                            <div className="relative">
                                <button
                                    onClick={handleClaim}
                                    disabled={status !== 'idle'}
                                    className="group w-full bg-int-orange hover:bg-orange-600 active:bg-orange-700 text-white py-4 md:py-5 rounded-full font-sans text-xs md:text-sm font-semibold md:font-bold uppercase tracking-wide md:tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-80 disabled:scale-100 relative overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.7)] md:shadow-xl md:shadow-int-orange/20 md:hover:scale-105 md:hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]"
                                >
                                    <AnimatePresence mode="wait">
                                        {status === 'idle' ? (
                                            <motion.span
                                                key="idle"
                                                initial={{ y: 10, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: -10, opacity: 0 }}
                                                className="relative z-10 flex items-center gap-2"
                                            >
                                                {t.cta_idle}
                                            </motion.span>
                                        ) : (
                                            <motion.span
                                                key="loading"
                                                initial={{ y: 10, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                className="relative z-10 flex items-center gap-3"
                                            >
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                {status === 'claiming' ? 'Generating Pass...' : t.cta_loading}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </button>

                                {/* Confetti Particles */}
                                {particles.map(p => (
                                    p ? (
                                        <motion.div
                                            key={p.id}
                                            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                                            animate={{ opacity: 0, x: p.x, y: p.y, scale: 0 }}
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                            style={{ backgroundColor: p.color }}
                                            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-sm pointer-events-none z-50"
                                        />
                                    ) : null
                                ))}
                            </div>

                            {/* Fine Print - Simplified */}
                            <div className="text-center pt-2">
                                <p className="text-[10px] text-white/35 tracking-wide">
                                    {t.code_text.replace('{code}', currentVoucher.code)}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default OfferSection;
