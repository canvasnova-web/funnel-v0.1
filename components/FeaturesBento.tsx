import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Lang } from '../types';
import { CONTENT } from '../data/content';

interface FeaturesBentoProps {
    lang: Lang;
}

const FeaturesBento: React.FC<FeaturesBentoProps> = ({ lang }) => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="mb-16 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4"
                    >
                        {lang === 'de' ? 'Schluss mit Kompromissen.' : 'No More Compromises.'}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-500 max-w-2xl mx-auto text-lg"
                    >
                        {lang === 'de'
                            ? 'Warum sollten Sie Ihre Einrichtung an ein Bild anpassen, wenn sich das Bild an Sie anpassen kann?'
                            : 'Why adapt your home to a picture when the picture can adapt to you?'}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
                    {/* Card 1: Infinite Choice (Parallax Marquee) */}
                    <Card1 lang={lang} />

                    {/* Card 2: Style Transformation (Cross-fade) */}
                    <Card2 lang={lang} />

                    {/* Card 3: Quality Proof (Before/After Slider) */}
                    <Card3 lang={lang} />
                </div>
            </div>
        </section>
    );
};

// --- Card Components ---

const CardWrapper = ({ children, className = "", colSpan = "col-span-1" }: { children: React.ReactNode, className?: string, colSpan?: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`relative group bg-white rounded-xl border border-gray-200 overflow-hidden ${colSpan} ${className}`}
        >
            {children}
        </motion.div>
    );
};

// Card 1: "Schluss mit 'passt schon'." (Infinite Choice)
const Card1 = ({ lang }: { lang: Lang }) => {
    const images1 = [
        "dist/images/bento_images/Gemini_Generated_Image_4vcmg54vcmg54vcm.png",
        "dist/images/bento_images/Gemini_Generated_Image_7y9s327y9s327y9s.png",
        "dist/images/bento_images/Gemini_Generated_Image_9mk7u19mk7u19mk7.png",
        "dist/images/bento_images/Gemini_Generated_Image_31uco631uco631uc.png",
    ];
    const images2 = [
        "dist/images/bento_images/Gemini_Generated_Image_cv51focv51focv51.png",
        "dist/images/bento_images/Gemini_Generated_Image_f5ihylf5ihylf5ih.png",
        "dist/images/bento_images/Gemini_Generated_Image_hnd0eehnd0eehnd0.png",
        "dist/images/bento_images/Gemini_Generated_Image_jcbxv7jcbxv7jcbx.png",
    ];
    const images3 = [
        "dist/images/bento_images/Gemini_Generated_Image_tm59votm59votm59.png",
        "dist/images/bento_images/Gemini_Generated_Image_uhrc4suhrc4suhrc.png",
        "dist/images/bento_images/Gemini_Generated_Image_x4n8mpx4n8mpx4n8.png",
        "dist/images/bento_images/Gemini_Generated_Image_y4n745y4n745y4n7.png",
    ];

    return (
        <CardWrapper className="h-[400px] md:h-[500px] flex flex-col">
            {/* Parallax Marquee */}
            <div className="absolute inset-0 grid grid-cols-3 gap-2 p-2 opacity-60 mask-image-gradient">
                <MarqueeColumn images={images1} duration={20} />
                <MarqueeColumn images={images2} duration={25} reverse />
                <MarqueeColumn images={images3} duration={22} />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-white via-white/90 to-transparent pt-24">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                    {lang === 'de' ? "Nie wieder 'passt schon'." : "No more 'good enough'."}
                </h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">
                    {lang === 'de'
                        ? 'Vergessen Sie Poster-Shops. Erhalten Sie genau das Bild, das in Ihren Raum passt. Pixelgenau.'
                        : 'Forget poster shops. Get exactly the piece that fits your room. Pixel perfect.'}
                </p>
            </div>
        </CardWrapper>
    );
};

const MarqueeColumn = ({ images, duration, reverse = false }: { images: string[], duration: number, reverse?: boolean }) => {
    return (
        <div className="relative h-full overflow-hidden">
            <motion.div
                animate={{ y: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
                transition={{ duration, repeat: Infinity, ease: "linear" }}
                className="flex flex-col gap-2"
            >
                {[...images, ...images].map((src, i) => (
                    <div key={i} className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100">
                        <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};


// Card 2: "Du bist der Kurator." (Style Transformation)
const Card2 = ({ lang }: { lang: Lang }) => {
    const [index, setIndex] = useState(0);
    const styles = [
        {
            name: lang === 'de' ? 'Realistisch' : 'Realistic',
            image: 'dist/images/process_images/A/A.png' // Landscape
        },
        {
            name: lang === 'de' ? 'Öl-Gemälde' : 'Oil Painting',
            image: 'dist/images/bento_images/Gemini_Generated_Image_4vcmg54vcmg54vcm.png' // Oil style
        },
        {
            name: lang === 'de' ? 'Minimal' : 'Minimal',
            image: 'dist/images/bento_images/Gemini_Generated_Image_hnd0eehnd0eehnd0.png' // Minimal
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % styles.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [styles.length]);

    return (
        <CardWrapper colSpan="md:col-span-2" className="h-[400px] md:h-[500px] flex flex-col md:flex-row overflow-hidden">
            {/* Image Container */}
            <div className="relative w-full h-full">
                <AnimatePresence mode="popLayout">
                    <motion.img
                        key={index}
                        src={styles[index].image}
                        alt={styles[index].name}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </AnimatePresence>

                {/* Overlay UI */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8 md:p-12">
                    <div className="mb-auto flex justify-end">
                        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-900">
                                {lang === 'de' ? 'Stil:' : 'Style:'} {styles[index].name}
                            </span>
                        </div>
                    </div>

                    <div className="max-w-md">
                        <h3 className="text-3xl font-serif font-bold text-white mb-4 drop-shadow-md">
                            {lang === 'de' ? 'Sie führen Regie.' : 'You are the Director.'}
                        </h3>
                        <p className="text-white/90 text-lg font-medium drop-shadow-md">
                            {lang === 'de'
                                ? 'Bestimmen Sie Farben, Stil und Stimmung. Unsere KI setzt Ihre Vision um – ohne Zufallsprinzip.'
                                : 'Control mood, colors, and style. Our AI executes your vision – no random luck.'}
                        </p>
                    </div>
                </div>
            </div>
        </CardWrapper>
    );
};


// Card 3: "Digital erschaffen. Als Meisterwerk geliefert." (Quality Proof)
const Card3 = ({ lang }: { lang: Lang }) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const handleMove = (clientX: number) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
            const percent = (x / rect.width) * 100;
            setSliderPosition(percent);
        }
    };

    const onMouseDown = () => { isDragging.current = true; };
    const onMouseUp = () => { isDragging.current = false; };
    const onMouseMove = (e: React.MouseEvent) => {
        if (isDragging.current) handleMove(e.clientX);
    };
    const onTouchMove = (e: React.TouchEvent) => {
        handleMove(e.touches[0].clientX);
    };

    return (
        <CardWrapper colSpan="md:col-span-3" className="h-[400px] md:h-[500px] flex flex-col md:flex-row">
            <div className="relative w-full h-full select-none"
                ref={containerRef}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                onMouseMove={onMouseMove}
                onTouchMove={onTouchMove}
            >
                {/* Right Image (Canvas Texture) - Background */}
                <div className="absolute inset-0">
                    <img
                        src="dist/images/bento_images/01-Floater Frame.png" // Use a texture-like image or macro shot
                        alt="Canvas"
                        className="w-full h-full object-cover filter brightness-90 contrast-125"
                    />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/canvas-orange.png')] opacity-40 mix-blend-overlay" />
                    <div className="absolute bottom-8 right-8 bg-black/80 text-white text-xs font-bold px-3 py-1 rounded">
                        {lang === 'de' ? 'Echtes Canvas' : 'Real Canvas'}
                    </div>
                </div>

                {/* Left Image (Digital Art) - Clipped */}
                <div
                    className="absolute inset-0 overflow-hidden border-r-2 border-white shadow-[5px_0_20px_rgba(0,0,0,0.3)]"
                    style={{ width: `${sliderPosition}%` }}
                >
                    <img
                        src="dist/images/process_images/A/A.png" // Same image but cleaner/brighter
                        alt="Digital"
                        className="w-full h-full object-cover" // Need to ensure it doesn't squash. Ideally absolute positioning or object-cover with full width of container
                        style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100vw' }} // Hack to keep image static while container clips
                    />
                    <div className="absolute bottom-8 left-8 bg-white/90 text-black text-xs font-bold px-3 py-1 rounded">
                        {lang === 'de' ? 'Dein Entwurf' : 'Your Design'}
                    </div>
                </div>

                {/* Slider Handle */}
                <div
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10 flex items-center justify-center"
                    style={{ left: `${sliderPosition}%` }}
                >
                    <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                        </svg>
                    </div>
                </div>

                {/* Text Overlay */}
                <div className="absolute top-8 left-8 z-20 pointer-events-none mix-blend-difference text-white">
                    <h3 className="text-3xl font-serif font-bold mb-2">
                        {lang === 'de' ? 'Weltklasse Qualität.' : 'World-Class Quality.'}
                    </h3>
                    <h3 className="text-3xl font-serif font-bold opacity-80">
                        {lang === 'de' ? 'Gefertigt besten Fotolabor der Welt.' : 'Made by the best Fotolab in the World.'}
                    </h3>
                    <p className="text-white/80 mt-2 max-w-xs">
                        {lang === 'de' ? 'Galerie-Standard für Ihr Zuhause.' : 'Gallery standard for your home.'}
                    </p>
                </div>
            </div>
        </CardWrapper>
    );
};

export default FeaturesBento;
