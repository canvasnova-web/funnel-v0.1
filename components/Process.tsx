import React, { useState, useEffect, useRef } from 'react';
import { Check, Sparkles, CheckCircle2, Info } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
type ScenarioId = 'A' | 'B' | 'C';
type ProcessStep =
    | 'typing'      // 0. Typing the subject
    | 'analyzing'   // 1. Showing tags & medium (Simulating analysis)
    | 'chatting'    // 2. Streaming chat messages
    | 'processing'  // 3. Loading bar
    | 'reveal';     // 4. Final result

// --- Sub-Component: Scenario Runner ---
// This component handles the entire animation sequence for a SINGLE scenario.
// It is "keyed" by the scenario ID in the parent, so it completely unmounts/remounts on switch.
const ScenarioRunner: React.FC<{
    scenarioId: ScenarioId;
    data: any; // Typed from your content
    t: any;
    isDesktop: boolean;
    onSwitch: (id: ScenarioId) => void;
    isVisible: boolean;
}> = ({ scenarioId, data, t, isDesktop, onSwitch, isVisible }) => {

    // -- State --
    const [step, setStep] = useState<ProcessStep>('typing');
    const [typedText, setTypedText] = useState("");
    const [visibleMsgCount, setVisibleMsgCount] = useState(0);
    const [progress, setProgress] = useState(0); // Explicit progress state
    const [hasStarted, setHasStarted] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // -- Constants --
    const TYPING_SPEED = 35;
    const ANALYSIS_DELAY = 1500; // Time to look at tags/mediums
    const MSG_DELAY = 1200;      // Time between messages
    const PROCESSING_DURATION = 2800; // Milliseconds

    // -- Sequence Logic --

    // Start when visible
    useEffect(() => {
        if (isVisible && !hasStarted) {
            setHasStarted(true);
        }
    }, [isVisible]);

    // 1. Typing Effect
    useEffect(() => {
        if (!hasStarted) return;

        let currentText = "";
        const targetText = data.subject;
        let charIndex = 0;

        const interval = setInterval(() => {
            if (charIndex < targetText.length) {
                currentText += targetText.charAt(charIndex);
                setTypedText(currentText);
                charIndex++;
            } else {
                clearInterval(interval);
                // Move to next step after a brief pause
                setTimeout(() => setStep('analyzing'), 600);
            }
        }, TYPING_SPEED);

        return () => clearInterval(interval);
    }, [hasStarted, data.subject]); // Run when started

    // 2. Analyzing (Tags & Mediums)
    useEffect(() => {
        if (step !== 'analyzing') return;

        const timer = setTimeout(() => {
            setStep('chatting');
        }, ANALYSIS_DELAY);

        return () => clearTimeout(timer);
    }, [step]);

    // 3. Chatting
    useEffect(() => {
        if (step !== 'chatting') return;

        // Reset msg count just in case
        setVisibleMsgCount(0);

        let msgIndex = 0;
        const totalMsgs = data.chat.length;

        const interval = setInterval(() => {
            msgIndex++;
            setVisibleMsgCount(msgIndex);

            if (msgIndex >= totalMsgs) {
                clearInterval(interval);
                // Wait a bit after last message, then process
                setTimeout(() => setStep('processing'), 1000);
            }
        }, MSG_DELAY);

        return () => clearInterval(interval);
    }, [step, data.chat.length]);

    // 4. Processing (Handled by CSS transition)
    useEffect(() => {
        if (step !== 'processing') {
            setProgress(0);
            return;
        }

        // Trigger the fill animation slightly after mount to ensure transition works
        const fillTimer = setTimeout(() => {
            setProgress(100);
        }, 50);

        const nextStepTimer = setTimeout(() => {
            setStep('reveal');
        }, PROCESSING_DURATION);

        return () => {
            clearTimeout(fillTimer);
            clearTimeout(nextStepTimer);
        };
    }, [step]);

    // -- Auto-Scroll Chat --
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [visibleMsgCount, step]);


    // -- Renders --

    // Helper to check if we should show elements based on current step
    // We want to keep elements visible after they appear
    const showParams = step !== 'typing';
    const showChat = step === 'chatting' || step === 'processing' || step === 'reveal';
    const showProcessing = step === 'processing';
    const showReveal = step === 'reveal';

    return (
        <>
            {/* --- LEFT SIDE: INTERFACE --- */}
            <motion.div
                className="relative h-full bg-[#fdfcf8] border-r border-neutral-200 flex flex-col overflow-hidden z-10"
                initial={{ width: '100%', flexBasis: '100%' }}
                animate={isDesktop ? {
                    width: showReveal ? '30%' : '100%',
                    flexBasis: showReveal ? '30%' : '100%',
                } : {
                    width: '100%',
                    // On mobile, we fade out the chat layer to show the art behind it
                    opacity: showReveal ? 0 : 1,
                    pointerEvents: showReveal ? 'none' : 'auto'
                }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
            >
                <div className="flex flex-col h-full p-6 md:p-12 w-full relative">

                    {/* 1. Subject Input */}
                    <div className="mb-8 flex-shrink-0">
                        <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block mb-2">
                            {t.process.step0}
                        </span>
                        <div className="relative">
                            <input
                                type="text"
                                value={typedText}
                                readOnly
                                className="w-full bg-white border-b-2 border-neutral-200 py-2 text-lg md:text-xl font-serif text-ink focus:outline-none"
                            />
                            {step === 'typing' && (
                                <span className="absolute right-0 top-2 w-2 h-6 bg-intl-orange animate-pulse"></span>
                            )}
                        </div>
                    </div>

                    {/* 2. Parameters (Tags) */}
                    <div className="mb-8 flex-shrink-0 min-h-[60px]">
                        <AnimatePresence>
                            {showParams && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block mb-3">
                                        {t.process.step1}
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {data.tags.map((tag: string, i: number) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="flex items-center gap-2 bg-white border border-neutral-200 px-3 py-1.5 rounded text-[10px] font-mono text-neutral-600 shadow-sm"
                                            >
                                                <Check size={10} className="text-intl-orange" strokeWidth={3} />
                                                {tag}
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* 3. Visual Choice (Mediums) */}
                    <div className="mb-8 flex-shrink-0 min-h-[100px]">
                        <AnimatePresence>
                            {showParams && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block mb-3">
                                        {t.process.step2}
                                    </span>
                                    <div className="grid grid-cols-3 gap-3">
                                        {data.mediums.map((m: any, i: number) => (
                                            <div key={i} className="flex flex-col items-center gap-2">
                                                <motion.div
                                                    className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-500 ${m.selected ? 'border-intl-orange shadow-md scale-105' : 'border-transparent opacity-50'}`}
                                                    initial={{ scale: 0.9, opacity: 0 }}
                                                    animate={{ scale: m.selected ? 1.05 : 0.9, opacity: 1 }}
                                                    transition={{ delay: 0.5 + (i * 0.1) }}
                                                >
                                                    <img src={m.img} alt={m.label} loading="lazy" sizes="80px" className="w-full h-full object-cover" />
                                                    {m.selected && (
                                                        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                                                            <CheckCircle2 className="text-white drop-shadow-md" size={20} />
                                                        </div>
                                                    )}
                                                </motion.div>
                                                <span className={`font-mono text-[9px] uppercase tracking-widest ${m.selected ? 'text-intl-orange font-bold' : 'text-neutral-400'}`}>
                                                    {m.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* 4. Chat Thread */}
                    <div className="flex-grow relative mask-linear-fade" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 5%)' }}>
                        <div ref={chatContainerRef} className="absolute inset-0 overflow-y-auto scrollbar-hide pb-24">
                            <div className="flex flex-col gap-4 pt-2 px-1">
                                {showChat && data.chat.slice(0, step === 'chatting' ? visibleMsgCount : undefined).map((msg: any, i: number) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} w-full`}
                                    >
                                        <div className={`text-xs md:text-sm py-3 px-4 shadow-sm leading-relaxed max-w-[85%] relative rounded-2xl ${msg.role === 'bot'
                                            ? 'bg-white border border-neutral-200 text-neutral-700 rounded-tr-xl rounded-br-xl rounded-bl-xl'
                                            : 'bg-neutral-900 text-white rounded-tl-xl rounded-bl-xl rounded-br-xl'
                                            }`}>
                                            {msg.text}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="mt-auto pt-4 pb-20 md:pb-4 flex-shrink-0">
                        <p className="text-[10px] text-neutral-400 flex items-start md:items-center gap-2 font-mono leading-tight">
                            <Info size={12} className="flex-shrink-0 mt-0.5 md:mt-0" />
                            Hinweis: Dies ist eine vereinfachte Demo. Der echte AI-Kurator analysiert Ihre Antworten in 12+ Dimensionen.
                        </p>
                    </div>

                    {/* 5. Loading Bar */}
                    <AnimatePresence>
                        {showProcessing && (
                            <motion.div
                                className="absolute bottom-0 left-0 w-full bg-[#fdfcf8] border-t border-neutral-200 p-6 flex items-center gap-4 z-[60]"
                                initial={{ y: '100%' }}
                                animate={{ y: 0 }}
                                exit={{ y: '100%' }}
                            >
                                <div className="w-4 h-4 border-2 border-intl-orange border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
                                <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest flex-shrink-0">
                                    {t.process.processing}
                                </span>
                                <div className="flex-grow h-1 bg-neutral-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-intl-orange transition-all ease-linear"
                                        style={{
                                            width: `${progress}%`,
                                            transitionDuration: `${PROCESSING_DURATION}ms`
                                        }}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </motion.div>

            {/* --- RIGHT SIDE: ARTWORK --- */}
            <motion.div
                className="absolute inset-0 md:relative bg-neutral-800 overflow-hidden z-0"
                initial={{ width: '0%', flexBasis: '0%' }}
                animate={isDesktop ? {
                    width: showReveal ? '70%' : '0%',
                    flexBasis: showReveal ? '70%' : '0%',
                } : {
                    width: '100%',
                    // On mobile, this is always full width behind, revealed by chat opacity
                }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            >
                {/* Image */}
                <motion.img
                    src={data.resultImage}
                    alt="Result"
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1, filter: 'blur(12px)' }}
                    animate={{
                        opacity: showReveal ? 1 : 0,
                        scale: showReveal ? 1 : 1.1,
                        filter: showReveal ? 'blur(0px)' : 'blur(12px)'
                    }}
                    transition={{ duration: 1.5 }}
                />

                {/* Reveal Label */}
                <AnimatePresence>
                    {showReveal && (
                        <motion.div
                            className="absolute bottom-32 md:bottom-12 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white border border-white/10 px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl whitespace-nowrap z-20"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Sparkles className="text-intl-orange animate-pulse" size={16} />
                            <span className="font-mono text-xs font-bold uppercase tracking-widest">
                                {t.process.revealLabel}
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Replay UI */}
                <AnimatePresence>
                    {showReveal && (
                        <motion.div
                            className="absolute top-6 right-6 z-50 flex flex-col items-end gap-2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.0 }}
                        >
                            <span className="bg-black/50 text-white text-[9px] px-2 py-1 rounded font-mono uppercase tracking-widest backdrop-blur-md">
                                {t.process.replayLabel}
                            </span>
                            <div className="flex gap-2">
                                {(['A', 'B', 'C'] as const).map((id) => (
                                    <button
                                        key={id}
                                        onClick={() => onSwitch(id)}
                                        className={`w-8 h-8 rounded flex items-center justify-center font-mono text-xs transition-colors ${scenarioId === id
                                            ? 'bg-intl-orange text-white'
                                            : 'bg-black/60 text-white hover:bg-black/80 border border-white/20 backdrop-blur-md'
                                            }`}
                                    >
                                        {id}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </motion.div>
        </>
    );
};


// --- Main Component ---
const Process: React.FC<{ onCtaClick?: () => void }> = ({ onCtaClick }) => {
    const { t } = useLanguage();
    const [activeScenarioId, setActiveScenarioId] = useState<ScenarioId>('A');
    const [isDesktop, setIsDesktop] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} id="process" className="py-12 md:py-48 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-8 md:mb-24">
                    <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block mb-4 md:mb-6">
                        {t.process.tag}
                    </span>
                    <h2 className="font-serif text-4xl md:text-8xl tracking-tighter text-ink leading-none">
                        {t.process.l1}<br />{t.process.l2}
                    </h2>
                </div>

                {/* Main Container */}
                <div className="relative w-full max-w-6xl mx-auto h-[750px] md:h-[800px] bg-neutral-900 shadow-2xl overflow-hidden rounded-2xl md:rounded-sm border border-neutral-800 mb-16 flex flex-col md:flex-row">
                    {/* 
                        KEY CONCEPT: 
                        We use the `key` prop here to force React to completely unmount the old ScenarioRunner 
                        and mount a fresh one when the scenario ID changes. 
                        This guarantees zero state pollution between scenarios.
                    */}
                    <ScenarioRunner
                        key={activeScenarioId}
                        scenarioId={activeScenarioId}
                        data={t.process.scenarios[activeScenarioId]}
                        t={t}
                        isDesktop={isDesktop}
                        onSwitch={setActiveScenarioId}
                        isVisible={isVisible}
                    />
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-t border-neutral-100 pt-12 md:pt-16 max-w-5xl mx-auto">
                    {t.process.bullets.map((bullet: any, i: number) => (
                        <div key={i} className="flex flex-col items-center text-center px-4">
                            <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-intl-orange mb-4">
                                <Check size={16} strokeWidth={3} />
                            </div>
                            <h3 className="font-serif text-xl md:text-2xl mb-2 text-ink">
                                {bullet.title}
                            </h3>
                            <p className="font-mono text-[10px] md:text-xs text-neutral-500 uppercase tracking-wide leading-relaxed max-w-xs">
                                {bullet.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-16 md:mt-24 flex justify-center pb-12 md:pb-0">
                    <button
                        onClick={onCtaClick}
                        className="btn btn--primary btn--md"
                    >
                        {t.process.cta}
                    </button>
                </div>

            </div>
        </section>
    );
};

export default Process;
