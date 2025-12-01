import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'de' | 'en';

interface ChatMessage {
    role: 'bot' | 'user';
    text: string;
}

interface ScenarioData {
    id: string;
    label: string;
    subject: string;
    tags: string[];
    mediums: Array<{ label: string; img: string; selected: boolean }>;
    chat: ChatMessage[];
    resultImage: string;
}

interface Translations {
    nav: {
        process: string;
        materials: string;
        gallery: string;
        faq: string;
        account: string;
        start: string;
        shipping: string;
        madeIn: string;
    };
    hero: {
        l1: string;
        l2: string;
        sub: string;
        cta: string;
        price: string;
        res: string;
    };
    lab: {
        tag: string;
        l1: string;
        l2: string;
        cards: Array<{ title: string; desc: string; detail: string }>;
        specs: { color: string; res: string; mat: string; weight: string };
    };
    process: {
        tag: string;
        l1: string;
        l2: string;
        step0: string;
        step1: string;
        step2: string;
        processing: string;
        revealLabel: string;
        replayLabel: string;
        scenarios: Record<'A' | 'B' | 'C', ScenarioData>;
        bullets: Array<{ title: string; desc: string }>;
        cta: string;
    };
    gallery: {
        tag: string;
        sub: string;
        archive: string;
        frames: { oak: string; acrylic: string; alu: string; pass: string };
    };
    access: {
        tag: string;
        l1: string;
        l2: string;
        sub: string;
        priceMain: string;
        priceCross: string;
        includes: string;
        feats: string[];
        cta: { idle: string; success: string };
        disclaimer: string;
    };
    footer: {
        explore: string;
        legal: string;
        links: { lab: string; journal: string; corp: string; imp: string; priv: string; terms: string };
        brand: string;
    }
}

const translations: Record<Language, Translations> = {
    de: {
        nav: {
            process: "Prozess", materials: "Materialien", gallery: "Galerie", faq: "FAQ",
            account: "Konto", start: "Jetzt starten", shipping: "Globaler Versand via WhiteWall®", madeIn: "Made in Germany"
        },
        hero: {
            l1: "SCHLUSS MIT", l2: "DEKO VON DER STANGE.",
            sub: "Erschaffe Wandkunst, die deine Geschichte erzählt. AI-generiert, kuratiert von dir, handgerahmt in Deutschland.",
            cta: "Jetzt personalisieren", price: "Ab €120 – Dein Unikat", res: "Auflösung 8K+"
        },
        lab: {
            tag: "Systemarchitektur v2.0", l1: "PRÄZISION", l2: "INGENIEURSKUNST.",
            cards: [
                { title: "KI Super-Resolution", desc: "Proprietäres Upscaling auf 400 DPI für gestochen scharfe Details in Großformaten (>120cm).", detail: "GAN-V3.2" },
                { title: "Galerie-Acrylglas", desc: "2mm kristallklares Acrylglas mit dauerelastischer Silikonversiegelung.", detail: "REFRAKTIV" },
                { title: "WhiteWall® Labor", desc: "Handgefertigt in Deutschland. Lumachrome-Präzision. 75 Jahre Farbgarantie.", detail: "ISO 9706" }
            ],
            specs: { color: "Farbraum", res: "Auflösung", mat: "Basismaterial", weight: "Gewicht" }
        },
        process: {
            tag: "Wie es funktioniert",
            l1: "VOM GEDANKEN",
            l2: "ZUM MEISTERWERK.",
            step0: "DEINE EINGABE",
            step1: "BASIS-PARAMETER",
            step2: "MEDIUM WÄHLEN",
            processing: "Synthetisiere High-Res Render...",
            revealLabel: "DEIN MEISTERWERK",
            replayLabel: "ANDEREN STIL TESTEN",
            scenarios: {
                A: {
                    id: 'A',
                    label: 'Klassisch',
                    subject: "Eine Poolparty am Genfer See in den 1960ern",
                    tags: ["TYP: FOTOGRAPHIE", "THEMA: VINTAGE", "RATIO: 3:2"],
                    mediums: [
                        { label: "ANALOG FILM", img: "/images/process_images/A/A-Analog.jpeg", selected: false },
                        { label: "EDITORIAL", img: "/images/process_images/A/A-Editorial.jpeg", selected: true },
                        { label: "CINEMATIC", img: "/images/process_images/A/A-Cinematic.jpeg", selected: false }
                    ],
                    chat: [
                        { role: 'bot', text: "Klassisch. Sollen wir den Look von altem Kodak-Film (warm & gesättigt) oder Fujifilm (kühl & grünlich) simulieren?" },
                        { role: 'user', text: "Kodak, warm und sonnig." },
                        { role: 'bot', text: "Verstanden. Wie soll die Szenerie wirken? Eher intim mit wenigen Personen oder eine belebte Gesellschaft?" },
                        { role: 'user', text: "Eine große, belebte Gesellschaft." },
                        { role: 'bot', text: "Notiert. Sollen wir im Hintergrund eine bestimmte Landschaft integrieren?" },
                        { role: 'user', text: "Ja, Berge und ein Seeufer." }
                    ],
                    resultImage: "/images/process_images/A/A.png"
                },
                B: {
                    id: 'B',
                    label: 'Futuristisch',
                    subject: "Ein entspannter Tiger am Poolrand eines luxuriösen Resorts, umgeben von tropischen Palmen, symmetrische Komposition.",
                    tags: ["TYP: DIGITAL", "THEMA: SURREAL", "RATIO: 1:1"],
                    mediums: [
                        { label: "DIGITAL PAINTING", img: "/images/process_images/B/B-Digital Painting.jpeg", selected: false },
                        { label: "3D RENDER", img: "/images/process_images/B/B-3DRender.jpeg", selected: true },
                        { label: "COLLAGE", img: "/images/process_images/B/B-Collage.jpeg", selected: false }
                    ],
                    chat: [
                        { role: 'bot', text: "Ein starker Kontrast. Soll die Szene bedrohlich wirken oder eine friedliche 'Traum-Logik' ausstrahlen?" },
                        { role: 'user', text: "Friedliche Traum-Logik." },
                        { role: 'bot', text: "Verstanden. Bevorzugst du eine natürliche, wilde Anordnung oder eine streng symmetrische Architektur (ähnlich Wes Anderson)?" },
                        { role: 'user', text: "Streng symmetrisch." },
                        { role: 'bot', text: "Notiert. Welche Akzentfarben sollen wir für die Sonnenschirme und Möbel nutzen, um das Grün der Palmen zu ergänzen?" },
                        { role: 'user', text: "Gelb-Weiß gestreift für einen sonnigen Resort-Look." }
                    ],
                    resultImage: "/images/process_images/B/B.png"
                },
                C: {
                    id: 'C',
                    label: 'Minimalist',
                    subject: "Ein Astronaut betrachtet eine leuchtende Stadt-Silhouette, gemalt im Stil eines alten Meisters, mit sichtbarer Leinwand-Textur und goldenem Licht.",
                    tags: ["TYP: MALEREI", "THEMA: SCI-FI", "RATIO: 3:2"],
                    mediums: [
                        { label: "GOUACHE", img: "/images/process_images/C/C-Gouache.jpeg", selected: false },
                        { label: "ÖL AUF LEINWAND", img: "/images/process_images/C/C-Malerei.jpeg", selected: true },
                        { label: "KREIDEZEICHNUNG", img: "/images/process_images/C/C-Kreidezeichnung.jpeg", selected: false }
                    ],
                    chat: [
                        { role: 'bot', text: "Ein spannender Kontrast: Hochtechnologie gemalt mit klassischen Mitteln. Sollen wir den Pinselstrich so setzen, dass das Bild wie ein antikes Fundstück aus der Zukunft wirkt?" },
                        { role: 'user', text: "Ja, genau. Wie ein altes Gemälde mit futuristischem Look." },
                        { role: 'bot', text: "Exzellent. Für die Beleuchtung: Wollen wir das typische 'Chiaroscuro' (hell-dunkel Kontrast) alter Meister nutzen, um den Astronauten dramatisch hervorzuheben?" },
                        { role: 'user', text: "Ja, starker Kontrast mit goldenem Lichtschein." },
                        { role: 'bot', text: "Verstanden. Soll die Stadt im Hintergrund technologisch detailliert sein oder eher abstrakt wirken, wie Pinselstriche, die Licht reflektieren?" },
                        { role: 'user', text: "Abstrakt, nur Licht und vertikale Strukturen." }
                    ],
                    resultImage: "/images/process_images/C/C.png"
                }
            },
            bullets: [
                { title: "Ihr persönlicher KI-Kurator.", desc: "Beschreiben Sie Ihre Vision. Unser Assistent verwandelt Ihre Wünsche in visuelle Vorschläge. Ohne Vorkenntnisse." },
                { title: "Brillante Auflösung.", desc: "Jedes Detail wird perfektioniert. Gestochen scharf auch im Großformat – für eine Wirkung, die den Raum dominiert." },
                { title: "Handmade in Germany.", desc: "Produziert im besten Fotolabor der Welt. In 5-7 Tagen hängt Ihr Unikat bei Ihnen. Fertig montiert." }
            ],
            cta: "Jetzt Ausprobieren"
        },
        gallery: {
            tag: "Kuratierte Ausstellung.", sub: "\"Eine neue Art der kuratierten Kreativität, für lebendige Sammlungen.\"", archive: "Vollständiges Archiv",
            frames: { oak: "Massivholz Eiche / Museumsglas", acrylic: "Galerie-Acryl / Rahmenlos", alu: "Alu-Dibond / Matt versiegelt", pass: "Ahorn Weiß / Passepartout" }
        },
        access: {
            tag: "KI Kreations-Credit", l1: "STUDIO", l2: "ZUGANG.", sub: "Schalte die generative Engine frei.\nSofort loslegen.",
            priceMain: "€2.00", priceCross: "€12.00", includes: "BEINHALTET 3 HI-RES GENERIERUNGEN",
            feats: ["Unbegrenzte Entwürfe", "3x High-Res Downloads", "2€ Rabatt auf ersten Druck"],
            cta: { idle: "Guthaben aufladen", success: "Gutschrift erfolgt" },
            disclaimer: "Wird vollständig auf die erste Bestellung angerechnet."
        },
        footer: {
            explore: "Entdecken", legal: "Rechtliches",
            links: { lab: "Das Labor", journal: "Journal", corp: "Corporate", imp: "Impressum", priv: "Datenschutz", terms: "AGB" },
            brand: "Canvasnova ist eine Marke der Metropolitan Gallery GmbH.\nDesigned in Berlin. Gedruckt weltweit."
        }
    },
    en: {
        nav: {
            process: "Process", materials: "Materials", gallery: "Gallery", faq: "FAQ",
            account: "Account", start: "Start Creating", shipping: "Global Shipping", madeIn: "Made in Germany"
        },
        hero: {
            l1: "NO MORE", l2: "GENERIC DECOR.",
            sub: "Create wall art that tells your story. AI-generated, curated by you, hand-framed in Germany.",
            cta: "Start Customizing", price: "From €120 – Unique", res: "Resolution 8K+"
        },
        lab: {
            tag: "System Architecture v2.0", l1: "PRECISION", l2: "ENGINEERED.",
            cards: [
                { title: "AI Super-Resolution", desc: "Proprietary upscaling to 400 DPI density for razor-sharp details at large formats (>120cm).", detail: "GAN-V3.2" },
                { title: "Gallery Acrylic Glass", desc: "2mm Crystal-Clear Acrylic facing with permanent elastic silicone sealing.", detail: "REFRACTIVE" },
                { title: "WhiteWall® Lab", desc: "Handcrafted in Germany. Lumachrome-style precision. 75-year color brilliance guarantee.", detail: "ISO 9706" }
            ],
            specs: { color: "Color Space", res: "Resolution", mat: "Base Material", weight: "Weight" }
        },
        process: {
            tag: "The Evidence", l1: "FROM YOUR IDEA", l2: "TO MASTERPIECE.",
            step0: "YOUR INPUT",
            step1: "BASE PARAMETERS",
            step2: "SELECT MEDIUM",
            processing: "Synthesizing High-Res Render...",
            revealLabel: "YOUR MASTERPIECE",
            replayLabel: "TRY ANOTHER STYLE",
            scenarios: {
                A: {
                    id: 'A',
                    label: 'Classic',
                    subject: "A lonely lighthouse in a storm",
                    tags: ["TYPE: PAINTING", "THEME: NATURE", "RATIO: 3:2"],
                    mediums: [
                        { label: "Acrylic", img: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=150&h=150&fit=crop", selected: false },
                        { label: "Oil", img: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=150&h=150&fit=crop", selected: true },
                        { label: "Watercolor", img: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=150&h=150&fit=crop", selected: false }
                    ],
                    chat: [
                        { role: 'bot', text: "Excellent. For oil, I recommend an 'Impasto' texture. Should we apply that?" },
                        { role: 'user', text: "Yes, please." },
                        { role: 'bot', text: "And the lighting? Soft morning light or dramatic Chiaroscuro?" },
                        { role: 'user', text: "Dramatic, please." }
                    ],
                    resultImage: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2000&auto=format&fit=crop"
                },
                B: {
                    id: 'B',
                    label: 'Futuristic',
                    subject: "A futuristic city in the clouds",
                    tags: ["TYPE: DIGITAL", "THEME: SCI-FI", "RATIO: 16:9"],
                    mediums: [
                        { label: "Vector", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&h=150&fit=crop", selected: false },
                        { label: "3D Render", img: "https://images.unsplash.com/photo-1614728853911-49e036259f94?w=150&h=150&fit=crop", selected: true },
                        { label: "Matte", img: "https://images.unsplash.com/photo-1620641788427-b11e6919dece?w=150&h=150&fit=crop", selected: false }
                    ],
                    chat: [
                        { role: 'bot', text: "Exciting. Should we add a neon-glow effect for the skyscrapers?" },
                        { role: 'user', text: "Yes, cyberpunk style." },
                        { role: 'bot', text: "How detailed should the architecture be? Abstract or ultra-realistic?" },
                        { role: 'user', text: "Ultra-detailed." }
                    ],
                    resultImage: "https://images.unsplash.com/photo-1535868463750-c78d9543614f?q=80&w=2000&auto=format&fit=crop"
                },
                C: {
                    id: 'C',
                    label: 'Minimalist',
                    subject: "A single tree in thick fog",
                    tags: ["TYPE: PHOTO", "THEME: ZEN", "RATIO: 1:1"],
                    mediums: [
                        { label: "Color", img: "https://images.unsplash.com/photo-1508144753681-9986d4df99b3?w=150&h=150&fit=crop", selected: false },
                        { label: "B&W", img: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=150&h=150&fit=crop", selected: true },
                        { label: "Sepia", img: "https://images.unsplash.com/photo-1533158388470-9a56699990c6?w=150&h=150&fit=crop", selected: false }
                    ],
                    chat: [
                        { role: 'bot', text: "Very poetic. Should we add strong film grain?" },
                        { role: 'user', text: "Yes, heavy grain." },
                        { role: 'bot', text: "Contrast: Rather soft (Low Key) or hard (High Key)?" },
                        { role: 'user', text: "High Key, please." }
                    ],
                    resultImage: "https://images.unsplash.com/photo-1478436127897-579ea5a604bc?q=80&w=2000&auto=format&fit=crop"
                }
            },
            bullets: [
                { title: "Co-Creation, Not Prompting.", desc: "Our AI Curator guides you. Your answers create the perfect prompt." },
                { title: "Ultra HD Resolution.", desc: "Razor-sharp for large formats. Pixel-perfect upscaling." },
                { title: "Museum Quality.", desc: "Real physical production, not just pixels. Handmade in Germany." }
            ],
            cta: "Try It Now"
        },
        gallery: {
            tag: "Curated Exhibition.", sub: "\"A new kind of curated creativity, for living collections.\"", archive: "View Full Archive",
            frames: { oak: "Solid Oak Frame / Museum Glass", acrylic: "Gallery Acrylic / Frameless", alu: "Alu-Dibond / Matte Seal", pass: "White Maple / Passepartout" }
        },
        access: {
            tag: "AI Creation Credit", l1: "STUDIO", l2: "ACCESS.", sub: "Unlock the generative engine.\nStart creating immediately.",
            priceMain: "€2.00", priceCross: "€12.00", includes: "Includes 3 Hi-Res Generations",
            feats: ["Generate unlimited drafts", "Download 3x High-Res files", "€2 discount on first print"],
            cta: { idle: "Add to Account", success: "Credits Added" },
            disclaimer: "Fully credited towards your first print order."
        },
        footer: {
            explore: "Explore", legal: "Legal",
            links: { lab: "The Lab", journal: "Journal", corp: "Corporate", imp: "Imprint", priv: "Privacy", terms: "Terms" },
            brand: "Canvasnova is a trademark of Metropolitan Gallery GmbH.\nDesigned in Berlin. Printed Globally."
        }
    }
};

interface LanguageContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [lang, setLang] = useState<Language>('de');

    return (
        <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};