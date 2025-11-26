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
            {/* Background Texture - Noise & Ambient Light */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-int-orange blur-[150px] opacity-10 pointer-events-none" />

            <div className="max-w-md w-full relative z-10 perspective-1000">
                <motion.div
                    initial={{ y: 40, opacity: 0, rotateX: 10 }}
                    whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    className={`relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ${status !== 'idle' ? 'scale-[0.98] brightness-110' : ''}`}
                >

                    {/* Animated Border Beam with Metallic Gradient */}
                    <div className="absolute inset-0 p-[1px] rounded-3xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900 rounded-3xl" />
                        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_340deg,#FF4F00_360deg)] animate-[spin_4s_linear_infinite] opacity-50" />
                    </div>

                    {/* Card Content Container with Holographic Sheen */}
                    <div className="relative bg-neutral-950 rounded-[23px] overflow-hidden h-full group/card">
                        {/* Holographic Sheen on Hover */}
                        <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent translate-x-[-100%] group-hover/card:translate-x-[100%] transition-transform duration-1000 ease-out" style={{ transform: 'skewX(-20deg)' }} />
                        </div>
                        {/* Header Section */}
                        <div className="bg-neutral-900 p-8 pb-10 relative border-b border-white/5">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <span className="font-mono text-[10px] text-gray-500 tracking-widest uppercase block mb-1">Pass Type</span>
                                    <h3 className="text-2xl font-serif font-bold text-white tracking-tight">{currentVoucher.title}</h3>
                                </div>
                                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                                    {currentVoucher.type === 'percentage' ? (
                                        <Percent className="w-4 h-4 text-int-orange" />
                                    ) : (
                                        <Euro className="w-4 h-4 text-int-orange" />
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="font-mono text-[10px] text-gray-500 tracking-widest uppercase block mb-1">{t.badge}</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-int-orange rounded-full animate-pulse shadow-[0_0_8px_rgba(255,79,0,0.8)]" style={{ animationDuration: '0.8s' }} />
                                        <span className="text-white tracking-widest font-mono font-bold tabular-nums" style={{ fontVariantNumeric: 'tabular-nums', textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>{formatTime(timeLeft)}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="font-mono text-[10px] text-gray-500 tracking-widest uppercase block mb-1">Batch</span>
                                    <span className="font-mono text-white text-sm">2025</span>
                                </div>
                            </div>
                        </div>

                        {/* Perforated Tear Line with Zigzag and Shadows */}
                        <div className="relative h-0 flex items-center justify-between px-3 z-20">
                            <div className="w-6 h-6 rounded-full bg-gallery-black -ml-6 shadow-inner" />
                            <div className="w-full mx-2 relative">
                                {/* Zigzag Perforation */}
                                <div className="w-full h-[2px] relative" style={{
                                    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 8px, #404040 8px, #404040 10px)',
                                    backgroundSize: '18px 2px'
                                }} />
                                {/* Inner Shadow Effect */}
                                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-b from-black/40 to-transparent" />
                                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-t from-black/40 to-transparent" />
                            </div>
                            <div className="w-6 h-6 rounded-full bg-gallery-black -mr-6 shadow-inner" />
                        </div>

                        {/* Body Section */}
                        <div className="p-8 space-y-8 bg-neutral-950/50 backdrop-blur-sm">
                            <div className="space-y-5">
                                <div className="flex justify-between items-center text-sm group">
                                    <span className="text-gray-400 group-hover:text-white transition-colors">{t.item1}</span>
                                    <span className="font-mono text-gray-600 line-through decoration-white/20">€2.00</span>
                                </div>
                                <div className="flex justify-between items-center text-sm group">
                                    <span className="text-gray-400 group-hover:text-white transition-colors">{t.item2}</span>
                                    <span className="font-mono text-int-orange font-bold tracking-wider">{t.free}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm group">
                                    <span className="text-gray-400 group-hover:text-white transition-colors">{t.item3}</span>
                                    <span className="font-mono text-gray-600 line-through decoration-white/20">€5.00</span>
                                </div>

                                {/* The Big Price Reveal */}
                                <div className="pt-6 mt-6 border-t border-white/5 flex justify-between items-end">
                                    <div>
                                        <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1 block">{t.total}</span>
                                        <span className="font-serif text-3xl text-gray-500 line-through decoration-int-orange/50 decoration-2">€7.00</span>
                                    </div>
                                    <div className="text-right">
                                        <motion.div
                                            initial={{ scale: 0.9 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                                            className="inline-block"
                                        >
                                            <span
                                                className="font-sans text-7xl font-bold text-white tracking-tighter leading-none block"
                                                style={{ textShadow: '0 0 30px rgba(255, 255, 255, 0.15)' }}
                                            >
                                                €0.00
                                            </span>
                                        </motion.div>
                                        <span className="font-mono text-[10px] text-int-orange uppercase tracking-widest mt-2 block">
                                            {t.vat} • {formatSavingsAmount(currentVoucher)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Interaction Area */}
                            <div className="relative mt-4">
                                <button
                                    onClick={handleClaim}
                                    disabled={status !== 'idle'}
                                    className="group w-full bg-white text-black py-5 rounded-xl font-mono text-sm font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-3 hover:bg-gray-100 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-80 disabled:scale-100 relative overflow-hidden shadow-[0_0_20px_rgba(255,79,0,0.2)] hover:shadow-[0_0_30px_rgba(255,79,0,0.4)]"
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
                                                <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

                            {/* Footer Code */}
                            <div className="flex items-center justify-center gap-3 opacity-40 pt-2">
                                <div className="h-px w-8 bg-white" />
                                <p className="text-center font-mono text-[10px] text-white tracking-widest">
                                    {t.code_text.replace('{code}', currentVoucher.code)}
                                </p>
                                <div className="h-px w-8 bg-white" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default OfferSection;
