import React, { useState, useRef, useEffect } from 'react';
import { Activity, UploadCloud, Scan, CheckCircle2, History, Layers, Box, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT } from '../data/content';
import { Lang, AnalysisResult } from '../types';

const Scanner = ({ id, lang }: { id: string, lang: Lang }) => {
    const t = CONTENT[lang].scanner;
    const [state, setState] = useState<'idle' | 'scanning' | 'analyzed'>('idle');
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [rationale, setRationale] = useState<{ reason: string, ratio: string } | null>(null);
    const [terminalLog, setTerminalLog] = useState<string[]>([]);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<number | null>(null);

    const runSimulation = () => {
        setState('scanning');
        setTerminalLog([]);

        let step = 0;
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = window.setInterval(() => {
            if (step < t.loading_logs.length) {
                setTerminalLog(prev => [...prev.slice(-3), t.loading_logs[step]]);
                step++;
            } else {
                if (intervalRef.current) clearInterval(intervalRef.current);
                finalizeResult();
            }
        }, 800);
    };

    const finalizeResult = () => {
        setTimeout(() => {
            const reasons = {
                de: {
                    v1: 'Fügt Standard-Deckenhöhen Vertikalität hinzu.',
                    v2: 'Erzeugt einen befehlenden Fokuspunkt.',
                    v3: 'Ausgewogene klassische Proportion.',
                    v4: 'Immersive Breite, die das Raumlayout verankert.',
                    v5: 'Galerie-Standard für große Feature-Wände.',
                    v6: 'Moderne, symmetrische Balance.',
                    v7: 'Maximale geometrische Präsenz.'
                },
                en: {
                    v1: 'Adds verticality.',
                    v2: 'Creates a commanding focal.',
                    v3: 'Balanced classic proportion.',
                    v4: 'Immersive width.',
                    v5: 'Gallery-standard impact.',
                    v6: 'Modern, symmetrical balance.',
                    v7: 'Maximum geometric presence.'
                }
            };

            const r = reasons[lang];

            const RECOMMENDATIONS = [
                { size: '80x120cm', width: 80, height: 120, ratio: '2:3', reason: r.v1 },
                { size: '100x150cm', width: 100, height: 150, ratio: '2:3', reason: r.v2 },
                { size: '120x80cm', width: 120, height: 80, ratio: '3:2', reason: r.v3 },
                { size: '150x100cm', width: 150, height: 100, ratio: '3:2', reason: r.v4 },
                { size: '180x120cm', width: 180, height: 120, ratio: '3:2', reason: r.v5 },
                { size: '100x100cm', width: 100, height: 100, ratio: '1:1', reason: r.v6 },
                { size: '120x120cm', width: 120, height: 120, ratio: '1:1', reason: r.v7 }
            ];

            const materials = ['Acrylic Glass', 'Aluminum Dibond', 'Fine Art Canvas'];
            const frames = ['Oak Shadow Gap', 'Black Aluminum', 'White Wood', 'Frameless'];

            const selection = RECOMMENDATIONS[Math.floor(Math.random() * RECOMMENDATIONS.length)];

            setResult({
                size: selection.size,
                width: selection.width,
                height: selection.height,
                material: materials[Math.floor(Math.random() * materials.length)],
                frame: frames[Math.floor(Math.random() * frames.length)],
                distance: `${(2 + Math.random() * 2).toFixed(1)}m`,
                lux: `${Math.floor(200 + Math.random() * 400)}lx`
            });
            setRationale({ reason: selection.reason, ratio: selection.ratio });
            setState('analyzed');
        }, 800);
    };

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setPreviewImage(event.target.result as string);
                    runSimulation();
                }
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const getArtRectProps = (width: number, height: number) => {
        const x = 120;
        const y = 100 - (height / 2);
        return { x, y, width, height };
    };

    return (
        <section id={id} className="py-24 px-4 md:px-6 bg-[#F2F2F2] relative">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-12 flex flex-col md:flex-row items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Activity className="w-4 h-4 text-int-orange animate-pulse" />
                            <span className="font-mono text-xs font-bold text-int-orange tracking-widest uppercase">{t.badge}</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif text-gallery-black">{t.headline}</h2>
                        <p className="text-gray-500 font-sans font-medium mt-3 max-w-lg text-lg">
                            {t.sub}
                        </p>
                    </div>
                </div>

                <div
                    ref={containerRef}
                    className={`relative w-full bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-700 ease-in-out ${state === 'analyzed' ? 'h-auto' : 'aspect-[4/3] md:aspect-[16/9]'}`}
                >
                    <AnimatePresence mode='wait'>
                        {state === 'idle' && (
                            <motion.div
                                key="idle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, filter: 'blur(5px)' }}
                                className="absolute inset-0 flex items-center justify-center bg-neutral-50"
                            >
                                <div
                                    className="absolute inset-0 opacity-[0.07] pointer-events-none"
                                    style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}
                                />
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="group relative cursor-pointer w-full h-full flex flex-col items-center justify-center"
                                >
                                    <input type="file" ref={fileInputRef} onChange={handleUpload} className="hidden" accept="image/*" />
                                    <motion.div
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-24 h-24 rounded-2xl bg-white shadow-xl flex items-center justify-center mb-6 relative z-10 border border-neutral-100 group-hover:border-int-orange/30 transition-colors"
                                    >
                                        <UploadCloud className="w-10 h-10 text-gray-400 group-hover:text-int-orange transition-colors duration-300" />
                                        <div className="absolute inset-0 rounded-2xl border-2 border-int-orange opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all" />
                                    </motion.div>
                                    <h3 className="font-serif text-2xl text-gallery-black mb-2">{t.upload.title}</h3>
                                    <p className="text-gray-400 font-mono text-xs tracking-widest uppercase">{t.upload.sub}</p>
                                </div>
                            </motion.div>
                        )}

                        {state === 'scanning' && (
                            <motion.div
                                key="scanning"
                                className="absolute inset-0 bg-white overflow-hidden"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                {/* Background Image with Elegant Blur */}
                                {previewImage && (
                                    <div className="absolute inset-0 z-0">
                                        <img src={previewImage} alt="Scanning" className="w-full h-full object-cover opacity-20 blur-xl scale-110" />
                                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
                                    </div>
                                )}

                                {/* Soft Scanning Bar */}
                                <motion.div
                                    className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-int-orange/10 to-transparent z-10"
                                    animate={{ top: ['-20%', '120%'] }}
                                    transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
                                />

                                {/* Center Content */}
                                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
                                    {/* Minimalist Loader */}
                                    <div className="relative mb-12">
                                        <div className="w-24 h-24 rounded-full border border-gray-100" />
                                        <motion.div
                                            className="absolute inset-0 w-24 h-24 rounded-full border-t border-int-orange"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Scan className="w-6 h-6 text-int-orange/80" />
                                        </div>
                                    </div>

                                    {/* Elegant Text Logs */}
                                    <div className="h-12 flex items-center justify-center">
                                        <AnimatePresence mode="wait">
                                            {terminalLog.slice(-1).map((log, i) => (
                                                <motion.div
                                                    key={`${log}-${i}`}
                                                    initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                                    exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                                                    transition={{ duration: 0.5 }}
                                                    className="font-serif text-xl text-gallery-black tracking-tight"
                                                >
                                                    {log}
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {state === 'analyzed' && result && (
                            <motion.div
                                key="analyzed"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8 }}
                                className="w-full flex flex-col md:flex-row bg-[#FAFAFA]"
                            >
                                <div className="w-full md:w-1/2 relative min-h-[400px] bg-gray-100 flex items-center justify-center border-r border-gray-200">
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-white rounded-full border border-gray-200 text-[10px] font-bold uppercase tracking-widest text-gray-400">{t.result.scale_ref}</div>
                                    <div className="relative w-full h-full max-w-[400px] max-h-[400px] p-8">
                                        <svg viewBox="0 0 300 250" className="w-full h-full drop-shadow-xl">
                                            <line x1="0" y1="250" x2="300" y2="250" stroke="#E5E5E5" strokeWidth="2" />
                                            <circle cx="60" cy="90" r="10" fill="#D4D4D4" />
                                            <path d="M60,100 L60,170 M60,170 L45,250 M60,170 L75,250 M60,115 L40,140 M60,115 L80,140" stroke="#D4D4D4" strokeWidth="4" strokeLinecap="round" />
                                            <text x="30" y="240" className="text-[10px] fill-gray-400 font-mono">1.7m</text>
                                            <motion.rect
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.2, duration: 0.5 }}
                                                {...getArtRectProps(result.width, result.height)}
                                                fill="#FFFFFF"
                                                stroke="#121212"
                                                strokeWidth="2"
                                                className="shadow-lg"
                                            />
                                            <text x={120 + result.width + 10} y={100} className="text-[10px] fill-int-orange font-mono font-bold">{result.width}cm</text>
                                            <text x={120 + (result.width / 2)} y={100 + (result.height / 2) + 15} className="text-[10px] fill-int-orange font-mono font-bold text-center" textAnchor="middle">{result.height}cm</text>
                                        </svg>
                                    </div>
                                </div>

                                <div className="w-full md:w-1/2 bg-white p-12 flex flex-col justify-center">
                                    <div className="mb-8 flex items-center justify-between">
                                        <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-100">
                                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                                            <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest">{t.result.badge}</span>
                                        </div>
                                        <button onClick={runSimulation} className="text-xs font-bold text-gray-400 hover:text-int-orange transition-colors uppercase tracking-widest flex items-center gap-1">
                                            <History className="w-3 h-3" /> {t.result.retry}
                                        </button>
                                    </div>

                                    <div className="mb-12">
                                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">{t.result.hero_label}</span>
                                        <motion.h3
                                            className="text-6xl font-mono text-gallery-black leading-none mb-4 tracking-tighter font-medium"
                                        >
                                            {result.width} <span className="text-gray-300">x</span> {result.height}
                                            <span className="text-lg text-gray-400 ml-2 align-top">cm</span>
                                        </motion.h3>
                                        <p className="text-sm text-gray-500 font-sans max-w-sm leading-relaxed">
                                            {t.result.desc.replace('{ratio}', rationale?.ratio || '').replace('{distance}', result.distance)}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6 mb-12">
                                        <div>
                                            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{t.result.material_label}</span>
                                            <div className="flex items-center gap-2">
                                                <Layers className="w-4 h-4 text-int-orange" />
                                                <span className="font-medium text-gallery-black text-sm">{result.material}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{t.result.frame_label}</span>
                                            <div className="flex items-center gap-2">
                                                <Box className="w-4 h-4 text-int-orange" />
                                                <span className="font-medium text-gallery-black text-sm">{result.frame}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {rationale && (
                                        <div className="mb-8 p-4 bg-white border-l-2 border-int-orange pl-4 text-gray-600 text-sm">
                                            <span className="font-bold block mb-1 text-int-orange text-xs uppercase">{t.result.why}</span>
                                            "{rationale.reason}"
                                        </div>
                                    )}

                                    <button
                                        onClick={() => document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' })}
                                        className="w-full bg-gallery-black text-white py-5 rounded-none border border-black hover:bg-white hover:text-black transition-all duration-300 font-mono text-sm uppercase tracking-widest flex items-center justify-center gap-4 group"
                                    >
                                        {t.result.cta}
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Scanner;
