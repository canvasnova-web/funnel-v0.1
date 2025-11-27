import React, { useState, useEffect } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT } from '../data/content';
import { Lang } from '../types';
import { getVoucherFromURL, getVoucherFromBackendAPI, getRedirectURL, getVoucherValidUntil } from '../utils/voucher';
import { VoucherConfig } from '../data/vouchers';

const OfferSectionSecondary = ({ lang }: { lang: Lang }) => {
    const t = CONTENT[lang].secondary_offer;
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
        <section className="py-24 px-4 bg-white border-t border-neutral-100">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-neutral-50 rounded-3xl p-8 md:p-12 lg:p-16 border border-neutral-200"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

                        {/* Left Column */}
                        <div className="space-y-8">
                            {/* Badge */}
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-orange-500" />
                                <span className="text-sm font-medium text-neutral-700">
                                    Zeitlich limitiert
                                </span>
                            </div>

                            {/* Headline */}
                            <div>
                                <h2 className="text-5xl md:text-6xl font-serif text-neutral-900 tracking-tight leading-[1.1] mb-4">
                                    0→1 Wandkunst
                                </h2>
                                <h3 className="text-4xl md:text-5xl font-serif text-neutral-900 tracking-tight leading-[1.1]">
                                    in <span className="italic text-neutral-500">48 Stunden</span>
                                </h3>
                            </div>

                            {/* Description */}
                            <p className="text-lg text-neutral-600 leading-relaxed max-w-md">
                                Von der Idee zum fertigen Design. Wir erstellen dein Unikat, visualisieren es in deinem Raum und liefern dir 3 hochauflösende Entwürfe. Komplett kostenlos.
                            </p>

                            {/* Price */}
                            <div className="pt-4">
                                <div className="flex items-baseline gap-3 mb-1">
                                    <span className="text-5xl md:text-6xl font-serif font-bold text-neutral-900">
                                        €0.00
                                    </span>
                                    <span className="text-lg text-neutral-400">kostenloser Start</span>
                                </div>
                            </div>

                            {/* CTA */}
                            <button
                                onClick={handleClaim}
                                disabled={status !== 'idle'}
                                className="w-full max-w-md bg-neutral-900 hover:bg-black text-white py-5 rounded-xl font-sans text-sm font-bold uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-80 disabled:scale-100 shadow-lg"
                            >
                                <AnimatePresence mode="wait">
                                    {status === 'idle' ? (
                                        <motion.span
                                            key="idle"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            Jetzt starten
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

                            {/* Countdown */}
                            <p className="text-sm text-neutral-500 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-int-orange animate-pulse" />
                                Angebot endet in {formatTime(timeLeft)}
                            </p>
                        </div>

                        {/* Right Column - Benefits */}
                        <div className="space-y-4 lg:pl-8">
                            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-neutral-200">
                                <div className="w-6 h-6 rounded-full bg-neutral-900 flex items-center justify-center flex-shrink-0">
                                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                </div>
                                <div>
                                    <h4 className="font-medium text-neutral-900 mb-1">3x Design-Entwürfe</h4>
                                    <p className="text-sm text-neutral-500">Hochauflösende Unikate für deine Wand</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-neutral-200">
                                <div className="w-6 h-6 rounded-full bg-neutral-900 flex items-center justify-center flex-shrink-0">
                                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                </div>
                                <div>
                                    <h4 className="font-medium text-neutral-900 mb-1">Raum-Visualisierung</h4>
                                    <p className="text-sm text-neutral-500">Sieh das Ergebnis an deiner echten Wand</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-neutral-200">
                                <div className="w-6 h-6 rounded-full bg-neutral-900 flex items-center justify-center flex-shrink-0">
                                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                </div>
                                <div>
                                    <h4 className="font-medium text-neutral-900 mb-1">Material-Beratung</h4>
                                    <p className="text-sm text-neutral-500">Welches Finish passt zu deinem Raum?</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-neutral-200">
                                <div className="w-6 h-6 rounded-full bg-neutral-900 flex items-center justify-center flex-shrink-0">
                                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                </div>
                                <div>
                                    <h4 className="font-medium text-neutral-900 mb-1">€5.00 Produktions-Guthaben</h4>
                                    <p className="text-sm text-neutral-500">Sofort anrechenbar bei Bestellung</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-neutral-200">
                                <div className="w-6 h-6 rounded-full bg-neutral-900 flex items-center justify-center flex-shrink-0">
                                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                </div>
                                <div>
                                    <h4 className="font-medium text-neutral-900 mb-1">48h Lieferzeit</h4>
                                    <p className="text-sm text-neutral-500">Deine Designs in 2 Tagen bereit</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-neutral-200">
                                <div className="w-6 h-6 rounded-full bg-neutral-900 flex items-center justify-center flex-shrink-0">
                                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                </div>
                                <div>
                                    <h4 className="font-medium text-neutral-900 mb-1">Unbegrenzte Revisionen</h4>
                                    <p className="text-sm text-neutral-500">Bis du 100% zufrieden bist</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default OfferSectionSecondary;
