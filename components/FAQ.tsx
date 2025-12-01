import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lang } from '../types';

interface FAQProps {
    lang: Lang;
}

const FAQ: React.FC<FAQProps> = ({ lang }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqItems = [
        {
            question: "Wie funktioniert die Vorschau und was kostet sie?",
            answer: "Nachdem Sie Ihr Wunschdesign konfiguriert haben, generiert unsere KI innerhalb weniger Minuten eine digitale Vorschau Ihres Kunstwerks. Die ersten drei Vorschau-Generierungen oder Revisionen kosten jeweils 2 €. Nach Abschluss Ihrer Bestellung erhalten Sie dafür einen 5 €-Gutschein, den Sie beim Kauf Ihres Kunstwerks einlösen können."
        },
        {
            question: "Kann ich Änderungen an meinem Design vornehmen?",
            answer: "Ja! Nach jeder Vorschau können Sie Änderungswünsche angeben. Die ersten drei Revisionen kosten jeweils 2 €, die Sie als 5 €-Gutschein für Ihre Bestellung zurückerhalten."
        },
        {
            question: "Welche Qualität kann ich erwarten?",
            answer: "Wir drucken ausschließlich auf hochwertigen Materialien wie Leinwand, Alu-Dibond und Acrylglas in Galeriequalität. Vor dem Druck wird Ihr Motiv auf 4K-Auflösung hochskaliert, sodass minimale Abweichungen zur Vorschau möglich sind. Das Endprodukt überzeugt durch brillante Farben und Langlebigkeit."
        },
        {
            question: "Ist mein Kunstwerk wirklich einzigartig?",
            answer: "Ja, jedes Kunstwerk wird individuell nach Ihren Vorgaben von unserer KI erstellt und ist garantiert ein Unikat."
        },
        {
            question: "Welche Gewährleistung gibt es?",
            answer: "Selbstverständlich haben Sie Anspruch auf Gewährleistung bei Produktfehlern oder Transportschäden. Sollte Ihr Kunstwerk beschädigt ankommen oder einen Produktionsfehler aufweisen, kontaktieren Sie uns bitte umgehend – wir sorgen für Ersatz."
        },
        {
            question: "Kann ich mein Kunstwerk zurückgeben oder stornieren?",
            answer: "Da jedes Kunstwerk individuell nach Ihren Vorgaben angefertigt wird, ist eine Rückgabe oder Stornierung nach dem Druck leider nicht möglich."
        },
        {
            question: "Welche Größen und Formate sind verfügbar?",
            answer: "Wir bieten verschiedene Größen und Formate – von kleinen Quadraten bis hin zu großen Panoramaformaten. Die gängigsten Formate finden Sie im Konfigurator, Sonderwünsche sind auf Anfrage möglich."
        },
        {
            question: "Wie lange dauert die Lieferung?",
            answer: "Nach Ihrer Freigabe wird Ihr Kunstwerk innerhalb von 3–5 Werktagen produziert und versendet. Die Versanddauer beträgt in der Regel 1–3 Werktage."
        },
        {
            question: "Kann ich eigene Fotos oder Inspirationen hochladen?",
            answer: "Ja, Sie können eigene Bilder als Inspiration hochladen. Unsere KI berücksichtigt diese bei der Gestaltung Ihres Kunstwerks."
        },
        {
            question: "Wie läuft die Bezahlung ab?",
            answer: "Sie zahlen bequem und sicher online, zum Beispiel per Kreditkarte, PayPal oder Sofortüberweisung. Die Bezahlung der Vorschau erfolgt vorab, die Zahlung für das finale Kunstwerk erst nach Ihrer Freigabe."
        },
        {
            question: "Kann ich ein Kunstwerk verschenken?",
            answer: "Natürlich! Sie können bei der Bestellung eine abweichende Lieferadresse angeben oder einen Geschenkgutschein erwerben."
        }
    ];

    return (
        <section className="py-24 md:py-32 px-4 bg-zinc-50">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-serif text-zinc-900 mb-4"
                    >
                        Häufig gestellte Fragen
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-600 text-lg"
                    >
                        Alles, was Sie über canvasnova wissen müssen
                    </motion.p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white rounded-xl border border-zinc-200 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-zinc-50 transition-colors"
                            >
                                <span className="font-semibold text-zinc-900 pr-8">
                                    {item.question}
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-zinc-400 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>
                            <AnimatePresence initial={false}>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                        <div className="px-6 pb-5 text-zinc-600 leading-relaxed border-t border-zinc-100 pt-4">
                                            {item.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
