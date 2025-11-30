import React, { useState, useEffect } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT } from '../data/content';
import { Lang } from '../types';
import { getVoucherFromURL, getVoucherFromBackendAPI, getRedirectURL } from '../utils/voucher';
import { VoucherConfig } from '../data/vouchers';

const OfferSectionSecondary = ({ lang }: { lang: Lang }) => {
    const t = CONTENT[lang].secondary_offer;
    const [status, setStatus] = useState<'idle' | 'claiming' | 'redirecting'>('idle');
    const [currentVoucher, setCurrentVoucher] = useState<VoucherConfig>(getVoucherFromURL());
    const [isLoading, setIsLoading] = useState(true);

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

    const handleClaim = () => {
        localStorage.setItem('appliedPromoCode', currentVoucher.code);
        setStatus('claiming');
        setTimeout(() => {
            setStatus('redirecting');
            setTimeout(() => {
                window.location.href = getRedirectURL(currentVoucher);
            }, 800);
        }, 1500);
    };

    return (
        <section className="py-24 md:py-32 px-4 bg-zinc-50">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                        {/* Left Column - Offer */}
                        <div className="space-y-10">
                            {/* Headline */}
                            <div>
                                <h2 className="text-6xl md:text-7xl lg:text-8xl font-serif text-zinc-900 tracking-tight leading-[1.05] mb-6">
                                    Ihr Unikat wartet.
                                </h2>
                                <p className="text-xl md:text-2xl text-zinc-600 font-light leading-relaxed">
                                    Vom leeren Raum zum Gesprächsstoff in wenigen Klicks. Testen Sie es jetzt risikofrei.
                                </p>
                            </div>

                            {/* Price */}
                            <div className="pt-2">
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-6xl md:text-7xl font-serif font-bold text-zinc-900">
                                        0,00 €
                                    </span>
                                </div>
                                <span className="text-sm text-zinc-500 uppercase tracking-wider font-medium">
                                    Kostenlos testen
                                </span>
                            </div>

                            {/* CTA */}
                            <button
                                onClick={handleClaim}
                                disabled={status !== 'idle'}
                                className="w-full max-w-md bg-zinc-900 hover:bg-zinc-800 text-white py-4 px-6 rounded-full font-sans text-sm font-semibold tracking-wide transition-all duration-200 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <AnimatePresence mode="wait">
                                    {status === 'idle' ? (
                                        <motion.span
                                            key="idle"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            Account erstellen & loslegen →
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
                        </div>

                        {/* Right Column - Benefits */}
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-5 h-5 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0 mt-1">
                                    <Check className="w-3 h-3 text-white" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h4 className="font-medium text-zinc-900 mb-1">3x Design-Entwürfe</h4>
                                    <p className="text-sm text-zinc-500">Hochauflösende Unikate für deine Wand</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-5 h-5 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0 mt-1">
                                    <Check className="w-3 h-3 text-white" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h4 className="font-medium text-zinc-900 mb-1">Raum-Visualisierung</h4>
                                    <p className="text-sm text-zinc-500">Sieh das Ergebnis an deiner echten Wand</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-5 h-5 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0 mt-1">
                                    <Check className="w-3 h-3 text-white" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h4 className="font-medium text-zinc-900 mb-1">5€ Startguthaben</h4>
                                    <p className="text-sm text-zinc-500">Sofort anrechenbar bei Bestellung</p>
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
