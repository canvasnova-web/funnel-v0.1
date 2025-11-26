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
                                <div className="w-full md:w-1/2 relative min-h-[500px] bg-gradient-to-br from-[#F8F8F8] via-white to-[#F0F0F0] flex items-center justify-center border-r border-gray-200 overflow-hidden">
                                    <div className="absolute top-4 left-4 px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full border border-gray-200/60 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 shadow-lg z-10">{t.result.scale_ref}</div>

                                    {/* Elegant Background with Subtle Noise */}
                                    <div
                                        className="absolute inset-0 opacity-[0.015]"
                                        style={{
                                            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'
                                        }}
                                    />

                                    <div className="relative w-full h-full max-w-[550px] max-h-[550px] p-6 flex items-center justify-center">
                                        <svg viewBox="0 0 500 450" className="w-full h-full" style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.08))' }}>
                                            <defs>
                                                {/* Premium Shadow Filters */}
                                                <filter id="artworkShadowPremium" x="-50%" y="-50%" width="200%" height="200%">
                                                    <feGaussianBlur in="SourceAlpha" stdDeviation="12" />
                                                    <feOffset dx="0" dy="18" result="offsetblur" />
                                                    <feComponentTransfer>
                                                        <feFuncA type="linear" slope="0.35" />
                                                    </feComponentTransfer>
                                                    <feMerge>
                                                        <feMergeNode />
                                                        <feMergeNode in="SourceGraphic" />
                                                    </feMerge>
                                                </filter>

                                                <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                                                    <feGaussianBlur stdDeviation="20" result="blur" />
                                                    <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.15 0" />
                                                    <feMerge>
                                                        <feMergeNode />
                                                        <feMergeNode in="SourceGraphic" />
                                                    </feMerge>
                                                </filter>

                                                {/* Luxury Wall Gradient */}
                                                <linearGradient id="wallGradientPremium" x1="0%" y1="0%" x2="0%" y2="100%">
                                                    <stop offset="0%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
                                                    <stop offset="50%" style={{ stopColor: '#FAFAFA', stopOpacity: 1 }} />
                                                    <stop offset="100%" style={{ stopColor: '#F5F5F5', stopOpacity: 1 }} />
                                                </linearGradient>

                                                {/* Sophisticated Floor Gradient */}
                                                <linearGradient id="floorGradientPremium" x1="0%" y1="0%" x2="0%" y2="100%">
                                                    <stop offset="0%" style={{ stopColor: '#E8E8E8', stopOpacity: 1 }} />
                                                    <stop offset="100%" style={{ stopColor: '#D4D4D4', stopOpacity: 1 }} />
                                                </linearGradient>

                                                {/* Parquet Pattern */}
                                                <pattern id="parquetPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                                    <rect x="0" y="0" width="20" height="40" fill="#DDD" opacity="0.3" />
                                                    <rect x="20" y="0" width="20" height="40" fill="#CCC" opacity="0.2" />
                                                    <line x1="0" y1="20" x2="40" y2="20" stroke="#BBB" strokeWidth="0.5" opacity="0.4" />
                                                </pattern>

                                                {/* Gallery Spotlight */}
                                                <radialGradient id="spotlight" cx="50%" cy="30%">
                                                    <stop offset="0%" style={{ stopColor: '#FFFFFF', stopOpacity: 0.4 }} />
                                                    <stop offset="40%" style={{ stopColor: '#FFFFFF', stopOpacity: 0.15 }} />
                                                    <stop offset="100%" style={{ stopColor: '#FFFFFF', stopOpacity: 0 }} />
                                                </radialGradient>

                                                {/* Ambient Occlusion */}
                                                <radialGradient id="ambientOcclusion" cx="50%" cy="100%">
                                                    <stop offset="0%" style={{ stopColor: '#000000', stopOpacity: 0 }} />
                                                    <stop offset="70%" style={{ stopColor: '#000000', stopOpacity: 0.03 }} />
                                                    <stop offset="100%" style={{ stopColor: '#000000', stopOpacity: 0.08 }} />
                                                </radialGradient>
                                            </defs>

                                            {/* 3D Gallery Room */}
                                            {/* Back Wall with enhanced perspective */}
                                            <path
                                                d="M 60 50 L 440 50 L 400 280 L 100 280 Z"
                                                fill="url(#wallGradientPremium)"
                                                stroke="#D0D0D0"
                                                strokeWidth="1.5"
                                            />

                                            {/* Crown Molding (architectural detail) */}
                                            <path
                                                d="M 60 50 L 440 50 L 435 58 L 65 58 Z"
                                                fill="#FFFFFF"
                                                opacity="0.8"
                                            />

                                            {/* Ambient Light Wash on Wall */}
                                            <ellipse
                                                cx="250"
                                                cy="150"
                                                rx="180"
                                                ry="120"
                                                fill="url(#spotlight)"
                                            />

                                            {/* Premium Parquet Floor */}
                                            <path
                                                d="M 100 280 L 400 280 L 470 390 L 30 390 Z"
                                                fill="url(#floorGradientPremium)"
                                                stroke="#B8B8B8"
                                                strokeWidth="1.5"
                                            />

                                            {/* Parquet Texture Overlay */}
                                            <path
                                                d="M 100 280 L 400 280 L 470 390 L 30 390 Z"
                                                fill="url(#parquetPattern)"
                                            />

                                            {/* Ambient Occlusion on Floor */}
                                            <ellipse
                                                cx="250"
                                                cy="390"
                                                rx="200"
                                                ry="30"
                                                fill="url(#ambientOcclusion)"
                                            />

                                            {/* Left Wall (subtle, adds depth) */}
                                            <path
                                                d="M 60 50 L 100 280 L 30 390 L 30 70 Z"
                                                fill="#E0E0E0"
                                                opacity="0.5"
                                            />

                                            {/* Baseboard with shadow */}
                                            <line x1="100" y1="280" x2="400" y2="280" stroke="#A0A0A0" strokeWidth="3" opacity="0.6" />
                                            <line x1="100" y1="283" x2="400" y2="283" stroke="#F5F5F5" strokeWidth="1.5" opacity="0.8" />

                                            {/* Premium Artwork Display */}
                                            <motion.g
                                                initial={{ opacity: 0, y: -30, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                            >
                                                {(() => {
                                                    const wallCenterX = 250;
                                                    const wallCenterY = 165;
                                                    const scaleFactor = 0.65;
                                                    const artWidth = result.width * scaleFactor;
                                                    const artHeight = result.height * scaleFactor;
                                                    const artX = wallCenterX - (artWidth / 2);
                                                    const artY = wallCenterY - (artHeight / 2);

                                                    return (
                                                        <>
                                                            {/* Multi-layer Shadow for Depth */}
                                                            <rect
                                                                x={artX + 3}
                                                                y={artY + 20}
                                                                width={artWidth}
                                                                height={artHeight}
                                                                fill="#000000"
                                                                opacity="0.12"
                                                                rx="2"
                                                                filter="blur(15px)"
                                                            />

                                                            <rect
                                                                x={artX + 1}
                                                                y={artY + 10}
                                                                width={artWidth}
                                                                height={artHeight}
                                                                fill="#000000"
                                                                opacity="0.08"
                                                                rx="2"
                                                                filter="blur(8px)"
                                                            />

                                                            {/* Outer Frame (Black Gallery Frame) */}
                                                            <rect
                                                                x={artX - 8}
                                                                y={artY - 8}
                                                                width={artWidth + 16}
                                                                height={artHeight + 16}
                                                                fill="#1A1A1A"
                                                                rx="2"
                                                                filter="url(#artworkShadowPremium)"
                                                            />

                                                            {/* Frame Inner Bevel (3D effect) */}
                                                            <rect
                                                                x={artX - 6}
                                                                y={artY - 6}
                                                                width={artWidth + 12}
                                                                height={artHeight + 12}
                                                                fill="none"
                                                                stroke="#333333"
                                                                strokeWidth="1"
                                                                rx="1"
                                                            />

                                                            {/* Museum Mat Board */}
                                                            <rect
                                                                x={artX - 4}
                                                                y={artY - 4}
                                                                width={artWidth + 8}
                                                                height={artHeight + 8}
                                                                fill="#FAFAFA"
                                                                rx="1"
                                                            />

                                                            {/* Mat Board Inner Shadow */}
                                                            <rect
                                                                x={artX - 3}
                                                                y={artY - 3}
                                                                width={artWidth + 6}
                                                                height={artHeight + 6}
                                                                fill="none"
                                                                stroke="#E5E5E5"
                                                                strokeWidth="2"
                                                                rx="1"
                                                            />

                                                            {/* Artwork Canvas */}
                                                            <rect
                                                                x={artX}
                                                                y={artY}
                                                                width={artWidth}
                                                                height={artHeight}
                                                                fill="#FFFFFF"
                                                                rx="0.5"
                                                            />

                                                            {/* Canvas Texture */}
                                                            <rect
                                                                x={artX + 8}
                                                                y={artY + 8}
                                                                width={artWidth - 16}
                                                                height={artHeight - 16}
                                                                fill="#F9F9F9"
                                                                opacity="0.6"
                                                            />

                                                            {/* Gallery Lighting Effect (top highlight) */}
                                                            <linearGradient id={`topLight-${result.width}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                                                <stop offset="0%" style={{ stopColor: '#FFFFFF', stopOpacity: 0.8 }} />
                                                                <stop offset="30%" style={{ stopColor: '#FFFFFF', stopOpacity: 0 }} />
                                                            </linearGradient>
                                                            <rect
                                                                x={artX}
                                                                y={artY}
                                                                width={artWidth}
                                                                height={artHeight * 0.3}
                                                                fill={`url(#topLight-${result.width})`}
                                                                rx="0.5"
                                                            />

                                                            {/* Premium Dimension Lines with Arrows */}
                                                            {/* Width Dimension */}
                                                            <g opacity="0.9">
                                                                <defs>
                                                                    <marker id="arrowWidth" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                                                                        <path d="M 0 0 L 8 4 L 0 8 z" fill="#FF4F00" />
                                                                    </marker>
                                                                </defs>
                                                                <line
                                                                    x1={artX - 6}
                                                                    y1={artY - 20}
                                                                    x2={artX + artWidth + 6}
                                                                    y2={artY - 20}
                                                                    stroke="#FF4F00"
                                                                    strokeWidth="2"
                                                                    markerStart="url(#arrowWidth)"
                                                                    markerEnd="url(#arrowWidth)"
                                                                />
                                                                <rect
                                                                    x={wallCenterX - 35}
                                                                    y={artY - 32}
                                                                    width="70"
                                                                    height="20"
                                                                    fill="white"
                                                                    rx="10"
                                                                    opacity="0.95"
                                                                />
                                                                <text
                                                                    x={wallCenterX}
                                                                    y={artY - 20}
                                                                    className="text-[14px] font-mono font-bold fill-[#FF4F00]"
                                                                    textAnchor="middle"
                                                                    dominantBaseline="middle"
                                                                >
                                                                    {result.width}cm
                                                                </text>
                                                            </g>

                                                            {/* Height Dimension */}
                                                            <g opacity="0.9">
                                                                <line
                                                                    x1={artX + artWidth + 20}
                                                                    y1={artY - 6}
                                                                    x2={artX + artWidth + 20}
                                                                    y2={artY + artHeight + 6}
                                                                    stroke="#FF4F00"
                                                                    strokeWidth="2"
                                                                    markerStart="url(#arrowWidth)"
                                                                    markerEnd="url(#arrowWidth)"
                                                                />
                                                                <rect
                                                                    x={artX + artWidth + 30}
                                                                    y={wallCenterY - 10}
                                                                    width="70"
                                                                    height="20"
                                                                    fill="white"
                                                                    rx="10"
                                                                    opacity="0.95"
                                                                />
                                                                <text
                                                                    x={artX + artWidth + 65}
                                                                    y={wallCenterY}
                                                                    className="text-[14px] font-mono font-bold fill-[#FF4F00]"
                                                                    textAnchor="middle"
                                                                    dominantBaseline="middle"
                                                                >
                                                                    {result.height}cm
                                                                </text>
                                                            </g>
                                                        </>
                                                    );
                                                })()}
                                            </motion.g>

                                            {/* Premium Human Figure (elegant, minimal) */}
                                            <motion.g
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.6, duration: 0.7 }}
                                            >
                                                <g transform="translate(400, 260)" opacity="0.28">
                                                    {/* Subtle shadow under person */}
                                                    <ellipse cx="0" cy="100" rx="12" ry="4" fill="#000000" opacity="0.15" />

                                                    {/* Modern Minimalist Silhouette */}
                                                    {/* Head */}
                                                    <circle cx="0" cy="0" r="10" fill="#2D2D2D" />

                                                    {/* Neck */}
                                                    <rect x="-3" y="10" width="6" height="6" fill="#2D2D2D" />

                                                    {/* Torso (modern cut) */}
                                                    <path
                                                        d="M -11 16 L -11 52 Q -11 56 -7 56 L 7 56 Q 11 56 11 52 L 11 16 Q 11 16 7 16 L -7 16 Q -11 16 -11 16 Z"
                                                        fill="#2D2D2D"
                                                    />

                                                    {/* Legs (elegant proportions) */}
                                                    <rect x="-9" y="56" width="8" height="44" rx="4" fill="#2D2D2D" />
                                                    <rect x="1" y="56" width="8" height="44" rx="4" fill="#2D2D2D" />

                                                    {/* Arms (relaxed position) */}
                                                    <rect x="-17" y="18" width="6" height="32" rx="3" fill="#2D2D2D" transform="rotate(-8 -14 34)" />
                                                    <rect x="11" y="18" width="6" height="32" rx="3" fill="#2D2D2D" transform="rotate(8 14 34)" />

                                                    {/* Height Reference */}
                                                    <line x1="24" y1="-12" x2="24" y2="100" stroke="#A0A0A0" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" />
                                                    <text x="30" y="45" className="text-[10px] fill-gray-400 font-sans italic" opacity="0.8">~170cm</text>
                                                </g>
                                            </motion.g>

                                            {/* Viewing Distance Arc */}
                                            <g opacity="0.25">
                                                <path
                                                    d="M 250 310 Q 270 335 400 310"
                                                    stroke="#666666"
                                                    strokeWidth="1.5"
                                                    strokeDasharray="6,4"
                                                    fill="none"
                                                />
                                                <circle cx="250" cy="310" r="3" fill="#666666" />
                                                <circle cx="400" cy="310" r="3" fill="#666666" />
                                                <rect x="305" y="320" width="60" height="18" fill="white" rx="9" opacity="0.9" />
                                                <text x="335" y="331" className="text-[11px] fill-gray-600 font-mono" textAnchor="middle">
                                                    {result.distance}
                                                </text>
                                            </g>

                                            {/* Subtle Furniture Element (minimalist bench/pedestal for luxury context) */}
                                            <motion.g
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.8, duration: 0.6 }}
                                                opacity="0.15"
                                            >
                                                <rect x="90" y="265" width="45" height="8" rx="1" fill="#1A1A1A" />
                                                <rect x="95" y="273" width="35" height="4" fill="#1A1A1A" />
                                            </motion.g>
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
