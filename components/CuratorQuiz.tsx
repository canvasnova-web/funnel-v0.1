import React, { useState } from 'react';
import { Activity, CheckCircle2, ArrowRight, Sofa, Bed, Briefcase, Sun, Cloud, Maximize, Columns, Square, Layout, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT } from '../data/content';
import { Lang } from '../types';

interface CuratorQuizProps {
    id: string;
    lang: Lang;
}

type Step = 'space' | 'light' | 'wall' | 'style' | 'result';

interface QuizState {
    space: number | null;
    light: number | null;
    wall: number | null;
    style: number | null;
}

const CuratorQuiz: React.FC<CuratorQuizProps> = ({ id, lang }) => {
    const t = CONTENT[lang].curator_quiz;
    const [currentStep, setCurrentStep] = useState<Step>('space');
    const [answers, setAnswers] = useState<QuizState>({
        space: null,
        light: null,
        wall: null,
        style: null
    });

    const steps: Step[] = ['space', 'light', 'wall', 'style', 'result'];

    const handleAnswer = (step: Step, index: number) => {
        setAnswers(prev => ({ ...prev, [step]: index }));

        const currentIndex = steps.indexOf(step);
        if (currentIndex < steps.length - 1) {
            setTimeout(() => {
                setCurrentStep(steps[currentIndex + 1]);
            }, 400);
        }
    };

    const getRecommendation = () => {
        const { space, light, wall, style } = answers;

        // Default fallback
        let material = "Fine Art Canvas";
        let frame = "Oak Shadow Gap";
        let format = "120x80cm (3:2)";

        // --- MATERIAL LOGIC ---
        // Priority 1: Reflection Safety (Light)
        if (light === 0) { // Window Opposite -> Force Matte
            material = lang === 'de' ? "Leinwand (Matt)" : "Canvas (Matte)";
        }
        // Priority 2: Vibe (if no reflection risk)
        else if (style === 1) { // Cozy/Acoustic -> Canvas
            material = lang === 'de' ? "Leinwand (Akustik)" : "Canvas (Acoustic)";
        }
        else if (style === 2) { // Gallery/Clean -> Acrylic
            material = lang === 'de' ? "Acrylglas (Gallery)" : "Acrylic Glass (Gallery)";
        }
        // Fallback based on Light if Vibe is neutral (Statement)
        else if (light === 1) { // Side Light
            material = "Hahnemühle Fine Art";
        }
        else if (light === 2) { // Low Light -> Acrylic for depth
            material = lang === 'de' ? "Acrylglas (Gallery)" : "Acrylic Glass (Gallery)";
        }

        // --- FRAME LOGIC (Contrast) ---
        if (wall === 0) { // White Wall -> Needs Contrast
            frame = lang === 'de' ? "Eiche Schwarz (Schattenfuge)" : "Black Oak (Shadow Gap)";
        }
        else if (wall === 1) { // Dark/Colored -> Needs Pop
            frame = lang === 'de' ? "Weißes Holz" : "White Wood";
        }
        else if (wall === 2) { // Concrete/Rough -> Industrial
            frame = lang === 'de' ? "Rahmenlos (Alu-Dibond)" : "Frameless (Alu-Dibond)";
        }

        // --- FORMAT/SIZE LOGIC ---
        // Base size on Space
        if (space === 0) { // Large Living/Loft
            format = "180x120cm (3:2)";
        } else if (space === 3) { // Niche
            format = "60x90cm (2:3)";
        } else if (space === 2) { // Hallway
            format = "100x150cm (2:3)"; // Portrait for impact
        } else { // Bedroom
            format = "120x80cm (3:2)";
        }

        // Vibe Modifier
        if (style === 0 && space !== 3) { // Statement -> Maximize (unless Niche)
            if (space === 0) format = "200x140cm (XXL)";
            else format = "150x100cm (3:2)";
        }

        return { material, frame, format };
    };

    const recommendation = getRecommendation();

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'Sofa': return <Sofa className="w-6 h-6" />;
            case 'Bed': return <Bed className="w-6 h-6" />;
            case 'Briefcase': return <Briefcase className="w-6 h-6" />;
            case 'Layout': return <Layout className="w-6 h-6" />;
            default: return null;
        }
    };

    const progress = ((steps.indexOf(currentStep)) / (steps.length - 1)) * 100;

    return (
        <section id={id} className="py-24 px-4 md:px-6 bg-[#F2F2F2] relative overflow-hidden">
            <div className="max-w-4xl mx-auto relative z-10">
                <div className="mb-12 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Activity className="w-4 h-4 text-int-orange animate-pulse" />
                        <span className="font-mono text-xs font-bold text-int-orange tracking-widest uppercase">{t.badge}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif text-gallery-black mb-4">{t.headline}</h2>
                    <p className="text-gray-500 font-sans font-medium max-w-lg mx-auto text-lg">
                        {t.sub}
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden relative min-h-[500px] flex flex-col">
                    {/* Progress Bar */}
                    <div className="h-1 bg-gray-100 w-full">
                        <motion.div
                            className="h-full bg-int-orange"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>

                    <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            {steps.map((step) => {
                                if (currentStep !== step) return null;

                                if (step === 'result') {
                                    return (
                                        <motion.div
                                            key="result"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="w-full"
                                        >
                                            <div className="text-center mb-8">
                                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-100 mb-6">
                                                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                                                    <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest">{t.result.badge}</span>
                                                </div>
                                                <h3 className="text-3xl font-serif text-gallery-black mb-2">{t.result.headline}</h3>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                                <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-100 text-center">
                                                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">{t.result.material_label}</span>
                                                    <p className="font-serif text-xl text-gallery-black">{recommendation.material}</p>
                                                </div>
                                                <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-100 text-center">
                                                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">{t.result.frame_label}</span>
                                                    <p className="font-serif text-xl text-gallery-black">{recommendation.frame}</p>
                                                </div>
                                                <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-100 text-center">
                                                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">{t.result.format_label}</span>
                                                    <p className="font-serif text-xl text-gallery-black">{recommendation.format}</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-4 max-w-md mx-auto">
                                                <button
                                                    onClick={() => document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' })}
                                                    className="w-full bg-gallery-black text-white py-4 rounded-lg hover:bg-int-orange transition-colors font-mono text-sm uppercase tracking-widest flex items-center justify-center gap-3 group shadow-lg hover:shadow-xl hover:shadow-int-orange/20"
                                                >
                                                    {t.result.cta}
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setAnswers({ space: null, light: null, wall: null, style: null });
                                                        setCurrentStep('space');
                                                    }}
                                                    className="text-xs font-bold text-gray-400 hover:text-gray-600 uppercase tracking-widest flex items-center justify-center gap-2"
                                                >
                                                    <RefreshCcw className="w-3 h-3" />
                                                    {t.result.restart}
                                                </button>
                                            </div>
                                        </motion.div>
                                    );
                                }

                                const stepData = t.steps[step as keyof typeof t.steps];
                                if (!stepData) return null;

                                return (
                                    <motion.div
                                        key={step}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="w-full max-w-2xl mx-auto"
                                    >
                                        <h3 className="text-2xl md:text-3xl font-serif text-gallery-black mb-8 text-center">
                                            {stepData.question}
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {stepData.options.map((option: any, index: number) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleAnswer(step as Step, index)}
                                                    className={`
                                                        group relative p-6 rounded-xl border-2 text-left transition-all duration-300
                                                        ${answers[step as keyof QuizState] === index
                                                            ? 'border-int-orange bg-int-orange/5'
                                                            : 'border-gray-100 hover:border-int-orange/30 hover:bg-neutral-50'
                                                        }
                                                    `}
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <div className={`
                                                            p-3 rounded-lg transition-colors
                                                            ${answers[step as keyof QuizState] === index
                                                                ? 'bg-int-orange text-white'
                                                                : 'bg-gray-100 text-gray-400 group-hover:text-int-orange'
                                                            }
                                                        `}>
                                                            {step === 'space' && getIcon(option.icon)}
                                                            {step === 'light' && (index === 0 ? <Sun className="w-6 h-6" /> : <Cloud className="w-6 h-6" />)}
                                                            {step === 'wall' && (index === 0 ? <Maximize className="w-6 h-6" /> : index === 1 ? <Columns className="w-6 h-6" /> : <Square className="w-6 h-6" />)}
                                                            {step === 'style' && (index === 0 ? <Layout className="w-6 h-6" /> : <Sofa className="w-6 h-6" />)}
                                                        </div>
                                                        <div>
                                                            <span className={`block font-serif text-lg mb-1 ${answers[step as keyof QuizState] === index ? 'text-int-orange' : 'text-gallery-black'}`}>
                                                                {option.label}
                                                            </span>
                                                            {option.sub && (
                                                                <span className="text-sm text-gray-400 font-sans">
                                                                    {option.sub}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CuratorQuiz;
