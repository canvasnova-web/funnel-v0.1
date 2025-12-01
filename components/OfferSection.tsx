import React, { useState, useEffect } from 'react';
import { Check, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT } from '../data/content';
import { Lang } from '../types';
import { getVoucherFromURL, getVoucherFromBackendAPI, getRedirectURL } from '../utils/voucher';
import { VoucherConfig } from '../data/vouchers';

const OfferSection = ({ id, lang }: { id: string, lang: Lang }) => {
    const t = CONTENT[lang].offer;
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
        <section id={id} className="py-24 md:py-32 px-4 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left: Deal Details */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 mb-8">
                            <Sparkles className="w-3.5 h-3.5 text-zinc-700" />
                            <span className="text-xs font-medium text-zinc-800 uppercase tracking-wider">
                                {t.badges.left}
                            </span>
                        </div>

                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-zinc-900 tracking-tight leading-[1.05] mb-6">
                            {t.headline}
                        </h2>
                        <p className="text-lg md:text-xl text-zinc-600 font-light leading-relaxed mb-12">
                            {t.subheadline}
                        </p>

                        {/* Deal Stack - Clean, Minimal */}
                        <div className="space-y-6">
                            {/* Item 1: Creator Fee */}
                            <div className="flex items-start gap-3">
                                <div className="w-5 h-5 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-sm text-zinc-500 font-medium">{t.dealStack.item1.label}:</span>
                                        <span className="text-sm text-zinc-400 line-through">{t.dealStack.item1.original}</span>
                                        <span className="text-base font-semibold text-zinc-900">→ {t.dealStack.item1.discounted}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Item 2: Starting Credit */}
                            <div className="flex items-start gap-3">
                                <div className="w-5 h-5 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-sm text-zinc-500 font-medium">{t.dealStack.item2.label}:</span>
                                        <span className="text-base font-semibold text-zinc-900">{t.dealStack.item2.value}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Item 3: Free Shipping */}
                            <div className="flex items-start gap-3">
                                <div className="w-5 h-5 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-sm text-zinc-500 font-medium">{t.dealStack.item3.label}:</span>
                                        <span className="text-base font-semibold text-zinc-900">{t.dealStack.item3.value}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Minimalist Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white rounded-2xl p-10 md:p-12 shadow-2xl shadow-zinc-900/5 border border-zinc-100 relative"
                    >
                        {/* Badge */}
                        <div className="mb-8 text-center">
                            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider bg-zinc-100 text-zinc-800 border border-zinc-200">
                                {t.badges.right}
                            </span>
                        </div>

                        {/* Large Display */}
                        <div className="text-center mb-8">
                            <div className="text-xs text-zinc-500 mb-3 uppercase tracking-widest font-medium">
                                {t.voucherCard.badge}
                            </div>
                            <div className="text-6xl md:text-7xl font-serif font-bold text-zinc-900 leading-none mb-4">
                                {t.voucherCard.bigText}
                            </div>
                            <p className="text-sm text-zinc-600">
                                {t.voucherCard.subtext}
                            </p>
                        </div>

                        {/* Auto-Applied Code Display */}
                        <div className="mb-8">
                            <label className="block text-xs font-medium text-zinc-500 mb-3 uppercase tracking-wider">
                                {t.voucherCard.codeLabel}
                            </label>
                            <div className="w-full flex items-center justify-between gap-3 px-5 py-4 bg-zinc-50 rounded-lg border border-zinc-200">
                                <span className="font-mono text-base font-semibold text-zinc-900 tracking-wide">
                                    {currentVoucher.code}
                                </span>
                                <div className="w-5 h-5 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0">
                                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                </div>
                            </div>
                            <p className="text-xs text-zinc-500 mt-2 text-center">
                                Automatisch aktiviert
                            </p>
                        </div>

                        {/* CTA Button */}
                        <button
                            onClick={handleClaim}
                            disabled={status !== 'idle'}
                            className="btn btn--primary btn--md w-full"
                        >
                            <AnimatePresence mode="wait">
                                {status === 'idle' ? (
                                    <motion.span
                                        key="idle"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        {t.cta}
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="loading"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex items-center justify-center gap-2"
                                    >
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        {t.ctaLoading}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default OfferSection;
