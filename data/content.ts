export const CONTENT = {
    de: {
        nav: {
            cta: "Analyse Starten",
            lang_de: "DE",
            lang_en: "EN"
        },
        hero: {
            badge: "Bereits über 1.000 Entwürfe generiert.",
            headline_1: "Ihr Zuhause verdient",
            headline_2: "mehr als Standard.",
            sub_headline: "Entwerfen Sie ohne Vorkenntnisse in Minuten echte Galerie-Kunst, die perfekt zu Ihrem Raum passt. Einzigartig weltweit.",
            cta: "Jetzt kostenlos entwerfen →",
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
            col1: { title: "Massenware", sub: "Poster & Drucke", val1: "Endlose Kopien", val2: "Dünnes Poster-Papier", val3: "Von der Stange", val4: "Wegwerf-Deko", price: "~ €19-60", impact: "Billig" },
            col2: { title: "canvasnova", sub: "Smart Luxury", badge: "Empfehlung", val1: "Echtes Unikat (1 von 1)", val2: "Galerie-Standard (Fineart-Acryl/Papier/Alu/Canvas)", val3: "Von Ihnen erschaffen", val4: "Design-Statement", price: "ab €39", impact: "Fair", cta: "Kuratieren" },
            col3: { title: "Galerie", sub: "Traditionell", val1: "Original / Abzug", val2: "Leinwand / Öl / Acryl", val3: "Exklusiver Zugang nötig", val4: "Kapitalanlage", price: "€3.000+", impact: "Überteuert" }
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
            headline: "Finden Sie Ihren Stil in 30 Sekunden.",
            sub: "Kostenlos & unverbindlich.",
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
            headline: "Vom Gedanken zum Meisterwerk.",
            steps: [
                { title: "Vision & Stil", desc: "Definieren Sie Ihren Geschmack. Wählen Sie eine Stilrichtung oder beschreiben Sie Ihren Wunsch. Keine Vorkenntnisse nötig." },
                { title: "KI-Kreation", desc: "Unsere Engine generiert 3 einzigartige Kunstwerke in höchster Auflösung. Optimiert für Großformat-Druck." },
                { title: "Kuratieren & Verfeinern", desc: "Wählen Sie Ihren Favoriten. Fordern Sie Anpassungen an oder generieren Sie neue Vorschläge. Sie haben die Kontrolle." },
                { title: "Material & Rahmen", desc: "Wählen Sie Museumsglas-Acryl, Alu-Dibond oder Canvas. Ergänzen Sie einen handgefertigten Holzrahmen." },
                { title: "Expert Check & Produktion", desc: "Manuelle Qualitätsprüfung durch Print-Experten. Produziert in Deutschland mit 12-Farben-Archivtinte." },
                { title: "Sichere Lieferung", desc: "Spezialisierte Kunst-Verpackung garantiert sicheren Transport. Sofort aufhängbereit." }
            ]
        },
        offer: {
            badges: {
                left: "Limitiertes Angebot",
                right: "Aktivierter Gutschein-Code"
            },
            headline: "Curator-Zugang freigeschaltet.",
            subheadline: "Testen Sie unsere KI-Kunst-Engine heute kostenlos. Wir übernehmen die API-Gebühren für Sie.",
            dealStack: {
                item1: {
                    label: "Creator-Gebühr",
                    original: "2,00 €",
                    discounted: "0,00 €"
                },
                item2: {
                    label: "Startguthaben",
                    value: "5,00 €"
                },
                item3: {
                    label: "Versand",
                    value: "Kostenlos"
                }
            },
            voucherCard: {
                badge: "Einladung bestätigt",
                bigText: "GRATIS STARTEN",
                subtext: "Keine Zahlungsdaten erforderlich.",
                codeLabel: "Ihr Code (Auto-aktiviert)"
            },
            copyArea: {
                copiedToast: "Code kopiert!"
            },
            cta: "Account erstellen & loslegen →",
            ctaLoading: "Wird aktiviert..."
        },
        secondary_offer: {
            badge: "Creator Pass",
            headline: "Noch unsicher? Starten Sie risikofrei.",
            sub: "Testen Sie den Prozess ohne Kosten.",
            item1: "3x Design-Entwürfe",
            item2: "Visualisierung",
            item3: "Gutschein",
            price_label: "Kostenlos",
            price: "€0.00",
            cta: "Creator Pass sichern"
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
            col2: { title: "canvasnova", sub: "Smart Luxury", badge: "Recommended", val1: "1 of 1 (Original)", val2: "Gallerie-Niveau", val3: "Curated (5 Days)", val4: "Accessible Luxury", price: "€39", impact: "Avg. Price / Unique Piece", cta: "Start Curating" },
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
            badges: {
                left: "Limited Offer",
                right: "Activated Partner Code"
            },
            headline: "Creator Access Unlocked.",
            subheadline: "Test our AI art engine for free today. We cover the API fees for you.",
            dealStack: {
                item1: {
                    label: "Creator Fee",
                    original: "€2.00",
                    discounted: "€0.00"
                },
                item2: {
                    label: "Starting Credit",
                    value: "€5.00"
                },
                item3: {
                    label: "Shipping",
                    value: "Free"
                }
            },
            voucherCard: {
                badge: "Activated Partner Code",
                bigText: "START FREE",
                subtext: "No payment details required.",
                codeLabel: "Your Code (Auto-applied)"
            },
            copyArea: {
                copiedToast: "Code copied!"
            },
            cta: "Create Account & Start →",
            ctaLoading: "Activating..."
        },
        secondary_offer: {
            badge: "Creator Pass",
            headline: "Still unsure? Start risk-free.",
            sub: "Try the process at no cost.",
            item1: "3x Design Drafts",
            item2: "Visualization",
            item3: "Voucher",
            price_label: "Free",
            price: "€0.00",
            cta: "Claim Creator Pass"
        },
        footer: {
            desc: "Bridging the gap between artificial intelligence and human emotion through the medium of interior space.",
            rights: "© 2024 canvasnova Inc. All rights reserved."
        }
    }
};
