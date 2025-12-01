import React, { useState, useRef, useEffect } from 'react';
import { Check, Sparkles, Bot, User, CheckCircle2, Info, Sliders, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const Process: React.FC<{ onCtaClick?: () => void }> = ({ onCtaClick }) => {
    const { t } = useLanguage();
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
    const intervalsRef = useRef<NodeJS.Timeout[]>([]);

    // State Machine
    const [sequenceState, setSequenceState] = useState<'idle' | 'typing' | 'params' | 'medium' | 'chat' | 'processing' | 'reveal'>('idle');
    const [activeScenarioId, setActiveScenarioId] = useState<'A' | 'B' | 'C'>('A');
    const [isDesktop, setIsDesktop] = useState(true);
    const [hasFinishedOnce, setHasFinishedOnce] = useState(false);
    const [displayedSubject, setDisplayedSubject] = useState("");
    const [visibleMsgCount, setVisibleMsgCount] = useState(0);

    const activeData = t.process.scenarios[activeScenarioId];

    // Handle Resize
    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Clear all timeouts and intervals
    const clearAllTimers = () => {
        timeoutsRef.current.forEach(clearTimeout);
        intervalsRef.current.forEach(clearInterval);
        timeoutsRef.current = [];
        intervalsRef.current = [];
    };

    // Start sequence when in view OR when scenario changes
    const startSequence = (scenarioId?: 'A' | 'B' | 'C') => {
        // Clear any existing timers
        clearAllTimers();

        // Use the provided scenarioId or fall back to current activeScenarioId
        const targetScenarioId = scenarioId || activeScenarioId;
        const targetData = t.process.scenarios[targetScenarioId];

        // Reset state
        setSequenceState('typing');
        setDisplayedSubject("");
        setVisibleMsgCount(0);

        // --- ANIMATION TIMELINE ---

        // 1. Typing Effect (0s - 1.5s)
        let currentText = "";
        const fullText = targetData.subject;
        let charIndex = 0;

        const typingInterval = setInterval(() => {
            if (charIndex < fullText.length) {
                currentText += fullText.charAt(charIndex);
                setDisplayedSubject(currentText);
                charIndex++;
            } else {
                clearInterval(typingInterval);
                // Proceed to next step
                const timeout = setTimeout(() => setSequenceState('params'), 500);
                timeoutsRef.current.push(timeout);
            }
        }, 40); // Typing speed
        intervalsRef.current.push(typingInterval);

        // 2. Params (Starts approx at 2.0s)
        timeoutsRef.current.push(setTimeout(() => setSequenceState('params'), 2000));

        // 3. Medium (Starts at 3.0s)
        timeoutsRef.current.push(setTimeout(() => setSequenceState('medium'), 3000));

        // 4. Chat (Starts at 4.5s)
        timeoutsRef.current.push(setTimeout(() => setSequenceState('chat'), 4500));

        // 5. Processing (Starts at 9.0s - after chat)
        timeoutsRef.current.push(setTimeout(() => setSequenceState('processing'), 9000));

        // 6. Reveal (Starts at 12.5s)
        timeoutsRef.current.push(setTimeout(() => {
            setSequenceState('reveal');
            setHasFinishedOnce(true);
        }, 12500));
    };

    const switchScenario = (id: 'A' | 'B' | 'C') => {
        // Clear all running timers first
        clearAllTimers();

        // Reset state immediately
        setActiveScenarioId(id);
        setSequenceState('idle');
        setVisibleMsgCount(0);
        setDisplayedSubject("");

        // Small delay to allow re-render then restart with the new scenario ID
        const restartTimeout = setTimeout(() => startSequence(id), 100);
        timeoutsRef.current.push(restartTimeout);
    };

    // Progressive message rendering for chat
    useEffect(() => {
        if (sequenceState !== 'chat') {
            return;
        }

        // Reset and start showing messages one by one
        setVisibleMsgCount(0);
        const msgInterval = setInterval(() => {
            setVisibleMsgCount(prev => {
                if (prev < activeData.chat.length) {
                    return prev + 1;
                } else {
                    clearInterval(msgInterval);
                    return prev;
                }
            });
        }, 1000); // 1 message per second

        intervalsRef.current.push(msgInterval);
        return () => clearInterval(msgInterval);
    }, [sequenceState, activeData.chat.length]);

    // Auto-scroll when new messages appear
    useEffect(() => {
        if (chatContainerRef.current && visibleMsgCount > 0) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [visibleMsgCount]);

    // Cleanup on unmount
    useEffect(() => {
        return () => clearAllTimers();
    }, []);

    // Reset Logic (Mobile Back Button)
    const resetToChat = () => {
        // Just visually hide reveal, but keep state as 'reveal' to show full chat? 
        // Or revert state? Reverting state is cleaner for animations.
        // Let's effectively "rewind" to 'processing' state visually without the loading bar?
        // Actually, mobile logic just hides the Art Layer opacity.
        // But we need to manage the 'Back' button visibility.
        // Simplified: We just toggle a mobile-specific view flag if we needed it, 
        // but here we can just leverage the desktop logic or simple state if we want to be strict.
        // For this demo, "Back" just re-plays the end state of chat.
        // Let's just set sequenceState back to 'chat' (completed).
        // But that would re-trigger auto-scroll. 
        // Let's keep it simple: The "Back" button is mainly to see parameters. 
        // We can just toggle the opacity logic on mobile.
    };

    // Mobile Toggle Logic handled via CSS classes in render usually, 
    // but here we used `isRevealed` state in previous iteration.
    // `sequenceState === 'reveal'` drives the layout. 
    // If we want to "go back", we set sequenceState = 'processing' (finished bar).

    return (
        <section id="process" className="py-12 md:py-48 bg-white relative">
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

                {/* === MAIN INTERACTIVE CONTAINER === */}
                <motion.div
                    className="relative w-full max-w-6xl mx-auto h-[750px] md:h-[800px] bg-neutral-900 shadow-2xl overflow-hidden rounded-2xl md:rounded-sm border border-neutral-800 mb-16 flex flex-col md:flex-row"
                    onViewportEnter={() => { if (sequenceState === 'idle') startSequence(); }}
                    viewport={{ once: true, amount: 0.3 }}
                >

                    {/* --- RIGHT LAYER: ARTWORK (Desktop: Right Side / Mobile: Full Background) --- */}
                    <motion.div
                        className="absolute inset-0 md:relative bg-neutral-800 overflow-hidden z-0"
                        // Desktop Logic: Hidden until reveal, then expands to 70%
                        initial={{ width: '0%', flexBasis: '0%' }}
                        animate={isDesktop ? {
                            width: sequenceState === 'reveal' ? '70%' : '0%',
                            flexBasis: sequenceState === 'reveal' ? '70%' : '0%',
                            filter: sequenceState === 'reveal' ? 'blur(0px)' : 'blur(12px)',
                            opacity: sequenceState === 'reveal' ? 1 : 0
                        } : {
                            width: '100%',
                            opacity: 1,
                            filter: sequenceState === 'reveal' ? 'blur(0px)' : 'blur(12px)'
                        }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    >
                        {/* Image Transition */}
                        <AnimatePresence mode='wait'>
                            <motion.img
                                key={activeData.resultImage}
                                src={activeData.resultImage}
                                alt="Final Masterpiece"
                                className="absolute inset-0 w-full h-full object-cover"
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: sequenceState === 'reveal' ? 1 : 0, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5 }}
                            />
                        </AnimatePresence>

                        {/* Reveal Label */}
                        <AnimatePresence>
                            {sequenceState === 'reveal' && (
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

                        {/* REPLAY UI (Overlay on Art) */}
                        <AnimatePresence>
                            {sequenceState === 'reveal' && (
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
                                                onClick={() => switchScenario(id)}
                                                className={`w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all hover:scale-110 ${activeScenarioId === id ? 'bg-intl-orange text-white border-intl-orange' : 'bg-black/40 text-white/70 hover:bg-white hover:text-black'}`}
                                            >
                                                {id}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </motion.div>


                    {/* --- LEFT LAYER: CHAT INTERFACE --- */}
                    <motion.div
                        className="relative h-full bg-[#fdfcf8] border-r border-neutral-200 flex flex-col overflow-hidden z-10"
                        // Desktop Logic: Full width until reveal, then shrinks to 30%
                        // Mobile Logic: Fullscreen Overlay that fades out
                        initial={{ width: '100%', flexBasis: '100%' }}
                        animate={isDesktop ? {
                            width: sequenceState === 'reveal' ? '30%' : '100%',
                            flexBasis: sequenceState === 'reveal' ? '30%' : '100%',
                        } : {
                            width: '100%',
                            opacity: sequenceState === 'reveal' ? 0 : 1,
                            pointerEvents: sequenceState === 'reveal' ? 'none' : 'auto'
                        }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                    >
                        <div className="flex flex-col h-full p-6 md:p-12 w-full relative">

                            {/* 0. NEW: SUBJECT INPUT SIMULATION */}
                            <div className="mb-8 flex-shrink-0">
                                <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block mb-2">
                                    {t.process.step0}
                                </span>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={displayedSubject}
                                        readOnly
                                        className="w-full bg-white border-b-2 border-neutral-200 py-2 text-lg md:text-xl font-serif text-ink focus:outline-none"
                                    />
                                    {sequenceState === 'typing' && (
                                        <span className="absolute right-0 top-2 w-2 h-6 bg-intl-orange animate-pulse"></span>
                                    )}
                                </div>
                            </div>

                            {/* 1. TOP: PARAMETER TAGS */}
                            <div className="mb-8 flex-shrink-0">
                                <AnimatePresence>
                                    {(sequenceState === 'params' || sequenceState === 'medium' || sequenceState === 'chat' || sequenceState === 'processing' || sequenceState === 'reveal') && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block mb-3">
                                                {t.process.step1}
                                            </span>
                                            <div className="flex flex-wrap gap-2">
                                                {activeData.tags.map((tag, i) => (
                                                    <motion.div
                                                        key={`${activeScenarioId}-${i}`}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
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

                            {/* 2. MIDDLE: VISUAL CHOICE */}
                            <div className="mb-8 flex-shrink-0">
                                <AnimatePresence>
                                    {(sequenceState === 'medium' || sequenceState === 'chat' || sequenceState === 'processing' || sequenceState === 'reveal') && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block mb-3">
                                                {t.process.step2}
                                            </span>
                                            <div className="grid grid-cols-3 gap-3">
                                                {activeData.mediums.map((m, i) => {
                                                    return (
                                                        <div key={`${activeScenarioId}-${i}`} className="flex flex-col items-center gap-2">
                                                            <motion.div
                                                                className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-500 ${m.selected ? 'border-intl-orange shadow-md scale-105' : 'border-transparent opacity-50'}`}
                                                                initial={{ scale: 0.9 }}
                                                                animate={m.selected ? { scale: 1.05 } : { scale: 0.9 }}
                                                                transition={{ delay: 0.5 }}
                                                            >
                                                                <img src={m.img} alt={m.label} className="w-full h-full object-cover" />
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
                                                    )
                                                })}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* 3. BOTTOM: CHAT THREAD */}
                            <div className="flex-grow relative mask-linear-fade" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 5%)' }}>
                                <div ref={chatContainerRef} className="absolute inset-0 overflow-y-auto scrollbar-hide pb-24">
                                    <div className="flex flex-col gap-4 pt-2 px-1">
                                        <AnimatePresence>
                                            {(sequenceState === 'chat' || sequenceState === 'processing' || sequenceState === 'reveal') && activeData.chat.slice(0, sequenceState === 'chat' ? visibleMsgCount : activeData.chat.length).map((msg, i) => (
                                                <motion.div
                                                    key={`${activeScenarioId}-${i}`}
                                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    transition={{ duration: 0.5 }}
                                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} w-full`}
                                                >
                                                    <div
                                                        className={`
                                                    text-xs md:text-sm py-3 px-4 shadow-sm leading-relaxed max-w-[85%] relative rounded-2xl
                                                    ${msg.role === 'bot'
                                                                ? 'bg-white border border-neutral-200 text-neutral-700 rounded-tr-xl rounded-br-xl rounded-bl-xl'
                                                                : 'bg-neutral-900 text-white rounded-tl-xl rounded-bl-xl rounded-br-xl'
                                                            }
                                                `}
                                                    >
                                                        {msg.text}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>

                            {/* DISCLAIMER */}
                            <div className="mt-auto pt-4 pb-20 md:pb-4 flex-shrink-0">
                                <p className="text-[10px] text-neutral-400 flex items-start md:items-center gap-2 font-mono leading-tight">
                                    <Info size={12} className="flex-shrink-0 mt-0.5 md:mt-0" />
                                    Hinweis: Dies ist eine vereinfachte Demo. Der echte AI-Kurator analysiert deine Antworten in 12+ Dimensionen.
                                </p>
                            </div>

                            {/* 4. FOOTER: LOADING BAR */}
                            <AnimatePresence>
                                {sequenceState === 'processing' && (
                                    <motion.div
                                        className="absolute bottom-0 left-0 w-full bg-[#fdfcf8] border-t border-neutral-200 p-6 flex items-center gap-4 z-30"
                                        initial={{ y: '100%' }}
                                        animate={{ y: 0 }}
                                        exit={{ y: '100%' }}
                                    >
                                        <div className="w-4 h-4 border-2 border-intl-orange border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
                                        <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest flex-shrink-0">
                                            {t.process.processing}
                                        </span>
                                        <div className="flex-grow h-1 bg-neutral-200 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-intl-orange"
                                                initial={{ width: 0 }}
                                                animate={{ width: '100%' }}
                                                transition={{ duration: 3.5, ease: "easeInOut" }}
                                            ></motion.div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* 5. MOBILE NAV: SHOW RESULT BUTTON */}
                            <AnimatePresence>
                                {!isDesktop && sequenceState === 'reveal' && (
                                    <motion.div
                                        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                    >
                                        <button
                                            onClick={() => {/* Logic to toggle view handled by opacity class state if needed, or just let user scroll/click replay */ }}
                                            className="bg-neutral-900 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-xl text-[10px] font-mono font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                                        >
                                            {/* On mobile, 'reveal' hides chat automatically via opacity. 
                                        The 'Replay' UI on artwork handles reset. 
                                        So we might not need a button here unless we want to toggle back.
                                        Let's render a "Replay" style selector on mobile artwork too.
                                    */}
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </div>
                    </motion.div>

                </motion.div>

                {/* BENEFITS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-t border-neutral-100 pt-12 md:pt-16 max-w-5xl mx-auto">
                    {t.process.bullets.map((bullet, i) => (
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
                        className="bg-gallery-black text-white px-10 py-5 rounded-full font-mono text-xs uppercase tracking-widest hover:bg-int-orange hover:shadow-[0_10px_40px_-10px_rgba(255,79,0,0.6)] transition-all duration-300 flex items-center gap-3"
                    >
                        {t.process.cta}
                    </button>
                </div>

            </div>
        </section>
    );
};

export default Process;