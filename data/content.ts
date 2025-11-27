export const CONTENT = {
    de: {
        nav: {
            cta: "Analyse Starten",
            lang_de: "DE",
            lang_en: "EN"
        },
        hero: {
            badge: "DAS ENDE DER LEEREN WÄNDE",
            headline_1: "Kein Poster,",
            headline_2: "das jeder hat.",
            sub_headline: "Erschaffen Sie echte Galerie-Unikate, die es weltweit nur einmal gibt. Perfekt auf Ihren Raum abgestimmt.",
            cta: "JETZT UNIKAT ENTWERFEN →",
            before: "Vorher:",
            after: "Nachher: canvasnova"
        },
        explainer: [
            { title: "Nie wieder endlos suchen.", text: "Vergessen Sie generische Poster-Shops. Unsere KI erschafft exakt das Bild, das Sie im Kopf haben – aber nirgends kaufen können." },
            { title: "Sie haben das letzte Wort.", text: "Kein Zufallsprodukt. Ändern Sie Farben, Stil oder Stimmung mit einem Klick, bis das Werk 100% Ihrer Vision entspricht." },
            { title: "Keine Pixel. Echte Kunst.", text: "Wir verkaufen keine JPEGs. Wir liefern physische Meisterwerke auf Galerie-Materialien (Acryl, Alu-Dibond, Canvas). Handgefertigt in Deutschland." }
        ],
        comparison: {
            badge: "Marktpositionierung",
            headline: "Der Unterschied.",
            features: {
                uniqueness: "Einzigartigkeit",
                material: "Material",
                acquisition: "Erwerb",
                price: "Preismodell"
            },
            col1: { title: "Industrie-Poster", sub: "Poster & Drucke", val1: "Massenware (1 Mio. Kopien)", val2: "Dünnes Poster-Papier", val3: "Von der Stange", val4: "Wegwerf-Deko", price: "~ €40", impact: "Billig" },
            col2: { title: "canvasnova", sub: "Smart Luxury", badge: "Empfehlung", val1: "Echtes Unikat (1 von 1)", val2: "Museums-Qualität (Hahnemühle/Alu)", val3: "Von Ihnen erschaffen", val4: "Design-Statement", price: "ab €140", impact: "Fair", cta: "Kuratieren" },
            col3: { title: "Galerie", sub: "Traditionell", val1: "Original", val2: "Leinwand / Öl", val3: "Exklusiver Zugang nötig", val4: "Kapitalanlage", price: "€3.000+", impact: "Überteuert" }
        },
        scanner: {
            badge: "Sofort-Visualisierung • 100% Kostenlos",
            headline: "Wie sieht es an Ihrer Wand aus?",
            sub: "Kein Rätselraten mehr. Sehen Sie das Ergebnis, bevor Sie bestellen. Wir zeigen Ihnen sofort die perfekte Größe und Wirkung.",
            upload: { title: "Foto auswählen & anprobieren", sub: "JPG, PNG, HEIC akzeptiert" },
            loading_logs: [
                "Initialisiere Geometrie-Engine...",
                "Kalibriere Raumhelligkeit...",
                "Analysiere Wandproportionen...",
                "Berechne optimalen Betrachtungsabstand...",
                "Synthetisiere Kuratoren-Heuristik...",
                "Finalisiere Größenempfehlung..."
            ],
            result: {
                badge: "Kalkuliert",
                retry: "Neu berechnen",
                hero_label: "Optimale Konfiguration",
                desc: "Dieses Verhältnis ({ratio}) bietet das ausgewogenste visuelle Gewicht für typische Betrachtungsabstände von {distance}.",
                material_label: "Material",
                frame_label: "Rahmen",
                cta: "Konfiguration Übernehmen",
                why: "Warum?",
                scale_ref: "Größenvergleich"
            }
        },
        curator_quiz: {
            badge: "Kuratoren-Check",
            headline: "Unsicher, was passt?",
            sub: "Finden Sie in 30 Sekunden die perfekte Konfiguration für Ihren Raum.",
            steps: {
                space: {
                    question: "Welcher Raum soll veredelt werden?",
                    options: [
                        { label: "Großes Wohnzimmer / Loft", icon: "Sofa" },
                        { label: "Schlafzimmer / Ruhezone", icon: "Bed" },
                        { label: "Flur / Entrée", icon: "Briefcase" },
                        { label: "Kleine Nische / Home Office", icon: "Layout" }
                    ]
                },
                light: {
                    question: "Wie fällt das Licht?",
                    options: [
                        { label: "Fenster direkt gegenüber", sub: "Vorsicht: Reflexionen" },
                        { label: "Seitliches Tageslicht", sub: "Ausgewogen" },
                        { label: "Wenig Licht / Kunstlicht", sub: "Spots & Akzente" }
                    ]
                },
                wall: {
                    question: "Wie sieht die Wand aus?",
                    options: [
                        { label: "Klassisch Weiß", sub: "Heller Untergrund" },
                        { label: "Dunkel / Farbig", sub: "Kontrastreich" },
                        { label: "Beton / Stein / Rau", sub: "Industriell / Texturiert" }
                    ]
                },
                style: { // Renamed to 'vibe' in logic but keeping key 'style' or changing to 'vibe'? User said "Step 4: The Vibe". Let's change key to 'vibe' to match logic, but need to update component too.
                    question: "Was ist das Ziel?",
                    options: [
                        { label: "Statement / Wow-Effekt", sub: "Maximaler Fokus" },
                        { label: "Gemütlichkeit / Akustik", sub: "Wärme & Ruhe" },
                        { label: "Galerie-Look / Clean", sub: "Modern & Hochwertig" }
                    ]
                }
            },
            result: {
                badge: "Ihre ideale Konfiguration",
                headline: "Das Kuratoren-Ergebnis",
                material_label: "Empfohlenes Material",
                frame_label: "Empfohlener Rahmen",
                format_label: "Empfohlenes Format",
                cta: "Konfiguration merken & Ticket sichern",
                restart: "Neu starten"
            }
        },
        timeline: {
            badge: "Der Manufaktur-Prozess",
            headline: "Ihr Weg zum Unikat.",
            steps: [
                { title: "Ihre Vision.", desc: "Wählen Sie eine Richtung oder beschreiben Sie ein Gefühl. Kein Fachwissen nötig – nur Ihr Geschmack." },
                { title: "Die Entstehung.", desc: "Unser Algorithmus erschafft 3 exklusive Entwürfe. Hochauflösend und perfekt auf Großdruck optimiert." },
                { title: "Der Feinschliff.", desc: "Sie haben die Kontrolle. Wählen Sie Ihren Favoriten und verfeinern Sie Details, bis es 'Klick' macht." },
                { title: "Die Veredelung.", desc: "Museums-Acrylglas, Alu-Dibond oder Leinen? Wählen Sie das Finish, das Ihr Werk zum Strahlen bringt." },
                { title: "Das 4-Augen-Prinzip.", desc: "Bevor wir drucken, prüft ein Experte jede Datei manuell auf Farbechtheit und Auflösung." },
                { title: "Die Ankunft.", desc: "Sicher verpackt in unserer Spezial-Box. Auspacken, aufhängen, staunen." }
            ]
        },
        offer: {
            badge: "Angebot endet in:",
            title: "EARLY ACCESS",
            sub: "Zeitlich Limitiert",
            item1: "3x Design-Entwürfe (High-Res)",
            item2: "Raum-Visualisierung Pro",
            item3: "Produktions-Guthaben",
            free: "GRATIS",
            total: "Gesamt",
            vat: "INKL. MWST",
            cta_idle: "JETZT KOSTENLOS EINLÖSEN →",
            cta_loading: "Aktiviere Zugang...",
            code_text: "Ihr Vorteilscode ist bereits hinterlegt."
        },
        footer: {
            desc: "Technologie trifft Handwerk. Made in München.",
            rights: "© 2025 canvasnova. Eine Marke der Berberich & Hühn GbR."
        }
    },
    en: {
        nav: {
            cta: "Start Analysis",
            lang_de: "DE",
            lang_en: "EN"
        },
        hero: {
            badge: "canvasnova",
            headline_1: "The Future of Fine Art",
            headline_2: "is Yours to Command.",
            sub_headline: "Create true gallery originals that exist only once worldwide. Perfectly tailored to your room.",
            cta: "Analyze My Room",
            before: "Before: Reality",
            after: "After: canvasnova"
        },
        explainer: [
            { title: "The Co-Pilot", text: "No browsing through thousands of generic posters. Create exactly what you want. Unique, every time." },
            { title: "You are the Director", text: "Too colorful? Too abstract? You decide. Refine the result until it matches your vision perfectly." },
            { title: "The Manufactory", text: "We don't sell JPEGs. We deliver physical masterpieces. Hand-crafted in Germany, ready to hang." }
        ],
        comparison: {
            badge: "Market Positioning",
            headline: "Why canvasnova?",
            features: {
                uniqueness: "Uniqueness",
                material: "Material",
                acquisition: "Acquisition",
                price: "Price Model"
            },
            col1: { title: "Mass Market", sub: "Posters & Prints", val1: "1 of 1,000,000", val2: "Poster Paper", val3: "Instant", val4: "Depreciating", price: "€50", impact: "Low Impact" },
            col2: { title: "canvasnova", sub: "Smart Luxury", badge: "Recommended", val1: "1 of 1 (Original)", val2: "Museum-Grade (WhiteWall)", val3: "Curated (5 Days)", val4: "Accessible Luxury", price: "€140", impact: "Avg. Price / Unique Piece", cta: "Start Curating" },
            col3: { title: "Traditional Gallery", sub: "Traditional", val1: "1 of 1 (Original)", val2: "Canvas / Oil", val3: "Negotiated (3 Mo+)", val4: "Investment Only", price: "€3,000+", impact: "High Barrier" }
        },
        scanner: {
            badge: "Instant Analysis • 100% Free",
            headline: "Find Your Perfect Match.",
            sub: "Upload a photo of your wall. We'll instantly recommend the ideal size, frame, and material for your specific room.",
            upload: { title: "Upload Room Photo", sub: "JPG, PNG, HEIC accepted" },
            loading_logs: [
                "Initializing geometry engine...",
                "Calibrating room luminance...",
                "Analyzing wall proportions...",
                "Detecting optimal viewing distance...",
                "Synthesizing curator heuristic model...",
                "Finalizing sizing recommendation..."
            ],
            result: {
                badge: "Calculated",
                retry: "Recalculate",
                hero_label: "Optimal Configuration",
                desc: "This ratio ({ratio}) provides the most balanced visual weight for typical viewing distances of {distance}.",
                material_label: "Material",
                frame_label: "Frame",
                cta: "Use This Configuration",
                why: "Why?",
                scale_ref: "Scale Reference"
            }
        },
        curator_quiz: {
            badge: "Curator Check",
            headline: "Unsure what fits?",
            sub: "Find the perfect configuration for your room in 30 seconds.",
            steps: {
                space: {
                    question: "Which room is it for?",
                    options: [
                        { label: "Large Living Room / Loft", icon: "Sofa" },
                        { label: "Bedroom / Quiet Zone", icon: "Bed" },
                        { label: "Hallway / Entry", icon: "Briefcase" },
                        { label: "Small Niche / Home Office", icon: "Layout" }
                    ]
                },
                light: {
                    question: "How is the lighting?",
                    options: [
                        { label: "Window directly opposite", sub: "Caution: Reflections" },
                        { label: "Side Daylight", sub: "Balanced" },
                        { label: "Low Light / Artificial Spots", sub: "Spots & Accents" }
                    ]
                },
                wall: {
                    question: "What does the wall look like?",
                    options: [
                        { label: "Classic White", sub: "Bright Background" },
                        { label: "Dark / Colored", sub: "High Contrast" },
                        { label: "Concrete / Stone / Rough", sub: "Industrial / Textured" }
                    ]
                },
                style: {
                    question: "What is the goal?",
                    options: [
                        { label: "Statement / Wow-Effect", sub: "Maximum Focus" },
                        { label: "Cozy / Acoustic", sub: "Warmth & Silence" },
                        { label: "Gallery Look / Clean", sub: "Modern & Premium" }
                    ]
                }
            },
            result: {
                badge: "Your Ideal Configuration",
                headline: "The Curator Result",
                material_label: "Recommended Material",
                frame_label: "Recommended Frame",
                format_label: "Recommended Format",
                cta: "Save Configuration & Secure Ticket",
                restart: "Restart"
            }
        },
        timeline: {
            badge: "The Manufaktur Process",
            headline: "From Data to Object",
            steps: [
                { title: "Vision & Style", desc: "Define your taste. Choose a style direction or describe your wish. No prompting skills needed." },
                { title: "AI Creation", desc: "Our engine generates 3 unique, high-resolution artworks. Optimized for large-scale print." },
                { title: "Curate & Refine", desc: "Select your favorite. Request adjustments or reroll instantly. You are in control." },
                { title: "Material & Frame", desc: "Choose Museum-Grade Acrylic, Aluminum Dibond, or Canvas. Add a hand-made wooden frame." },
                { title: "Expert Check & Production", desc: "Manual quality check by print experts. Produced in Germany using 12-color archival inks." },
                { title: "Secure Delivery", desc: "Specialized art packaging ensures safe arrival. Ready to hang immediately." }
            ]
        },
        offer: {
            badge: "Offer Expires In:",
            title: "Founding Member Pass",
            sub: "Limited Time Access",
            item1: "Finally Individual Art",
            item2: "No More Boring Walls",
            item3: "Your Personal Masterpiece",
            free: "FREE",
            total: "Total",
            vat: "INC. VAT",
            cta_idle: "Claim Free Creator Pass",
            cta_loading: "Activating Access...",
            code_text: "Code {code} Auto-Applied"
        },
        footer: {
            desc: "Bridging the gap between artificial intelligence and human emotion through the medium of interior space.",
            rights: "© 2024 canvasnova Inc. All rights reserved."
        }
    }
};
