import React, { useState, useEffect } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT } from '../data/content';
import { Lang } from '../types';
import { getVoucherFromURL, getVoucherFromBackendAPI, getRedirectURL, getVoucherValidUntil } from '../utils/voucher';
import { VoucherConfig } from '../data/vouchers';

const OfferSection = ({ id, lang }: { id: string, lang: Lang }) => {
    const t = CONTENT[lang].offer;
    const [status, setStatus] = useState<'idle' | 'claiming' | 'redirecting'>('idle');
    const [currentVoucher, setCurrentVoucher] = useState<VoucherConfig>(getVoucherFromURL());
    const [isLoading, setIsLoading] = useState(true);

    const calculateTimeLeft = () => {
        const now = new Date();
        const endDate = getVoucherValidUntil(currentVoucher);
        const diff = Math.floor((endDate.getTime() - now.getTime()) / 1000);
        return Math.max(0, diff);
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const loadVoucherFromAPI = async () => {
            setIsLoading(true);
            try {
                const voucherFromAPI = await getVoucherFromBackendAPI();
                setCurrentVoucher(voucherFromAPI);
            } catch (error) {
                console.error('Error loading voucher from API:', error);
                setCurrentVoucher(getVoucherFromURL());
            } finally {
                setIsLoading(false);
            }
        };
        loadVoucherFromAPI();
        const handleURLChange = () => loadVoucherFromAPI();
        window.addEventListener('popstate', handleURLChange);
        return () => window.removeEventListener('popstate', handleURLChange);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, [currentVoucher]);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleClaim = () => {
        navigator.clipboard.writeText(currentVoucher.code);
        setStatus('claiming');
        setTimeout(() => {
            setStatus('redirecting');
            setTimeout(() => {
                window.location.href = getRedirectURL(currentVoucher);
            }, 800);
        }, 1500);
    };

    return (
        <section id={id} className="py-24 md:py-32 px-4 bg-neutral-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* Left: Headline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-neutral-900 tracking-tight leading-[1.1] mb-4">
                            Galerie-Qualität,
                        </h2>
                        <p className="text-3xl md:text-4xl lg:text-5xl text-neutral-400 font-serif tracking-tight leading-[1.1]">
                            risikofrei testen
                        </p>

                        <div className="mt-12 flex items-center gap-2 text-sm text-neutral-500">
                            <div className="w-2 h-2 rounded-full bg-int-orange animate-pulse" />
                            <span className="font-mono tracking-wide">
                                Angebot endet in {formatTime(timeLeft)}
                            </span>
                        </div>
                    </motion.div>

                    {/* Right: Pricing Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-neutral-900/5 border border-neutral-200"
                    >
                        {/* Badge */}
                        <div className="mb-6">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-neutral-100 text-neutral-600 border border-neutral-200">
                                Creator Pass
                            </span>
                        </div>

                        {/* Price */}
                        <div className="mb-2">
                            <span className="text-6xl md:text-7xl font-serif font-bold text-neutral-900">
                                €0.00
                            </span>
                        </div>
                        <p className="text-sm text-neutral-500 mb-8">
                            3x Design-Entwürfe + Visualisierung gratis
                        </p>

                        {/* CTA Button */}
                        <button
                            onClick={handleClaim}
                            disabled={status !== 'idle'}
                            className="w-full bg-neutral-900 hover:bg-black text-white py-5 rounded-xl font-sans text-sm font-bold uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-80 disabled:scale-100 shadow-lg mb-8"
                        >
                            <AnimatePresence mode="wait">
                                {status === 'idle' ? (
                                    <motion.span
                                        key="idle"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        Kostenlos starten
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="loading"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex items-center justify-center gap-2"
                                    >
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        {status === 'claiming' ? 'Wird aktiviert...' : 'Weiterleitung...'}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>

                        {/* What's included */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">
                                Was ist enthalten?
                            </h4>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-sm text-neutral-600">
                                    <Check className="w-4 h-4 text-int-orange flex-shrink-0 mt-0.5" strokeWidth={3} />
                                    <span>3x hochauflösende Design-Entwürfe (Unikate)</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-neutral-600">
                                    <Check className="w-4 h-4 text-int-orange flex-shrink-0 mt-0.5" strokeWidth={3} />
                                    <span>Raum-Visualisierung (wie sieht es bei dir aus?)</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-neutral-600">
                                    <Check className="w-4 h-4 text-int-orange flex-shrink-0 mt-0.5" strokeWidth={3} />
                                    <span>€5.00 Produktions-Guthaben für Bestellung</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-neutral-600">
                                    <Check className="w-4 h-4 text-int-orange flex-shrink-0 mt-0.5" strokeWidth={3} />
                                    <span>Unbegrenzte Revisionen & Änderungen</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default OfferSection;
