import React, { useState, useEffect } from 'react';

type ConsentType = 'all' | 'essential' | 'custom' | null;

interface CookiePreferences {
    essential: boolean;
    marketing: boolean;
    analytics: boolean;
}

import { initFacebookPixel } from '../utils/analytics';

// Helper function to initialize analytics based on granular consent
export const initAnalytics = () => {
    const consent = localStorage.getItem('cookie-consent') as ConsentType;
    const preferences = localStorage.getItem('cookie-preferences');

    if (consent === 'all') {
        // Initialize all analytics
        initFacebookPixel();
        console.log('All analytics initialized with user consent');
    } else if (consent === 'custom' && preferences) {
        const prefs: CookiePreferences = JSON.parse(preferences);

        // Initialize analytics based on granular preferences
        if (prefs.analytics) {
            // Google Analytics would go here
            console.log('Analytics cookies enabled');
        }

        if (prefs.marketing) {
            // Facebook Pixel
            initFacebookPixel();
            console.log('Marketing cookies enabled');
        }
    }
};

const CookieConsent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState<CookiePreferences>({
        essential: true, // Always true, cannot be disabled
        marketing: false,
        analytics: false,
    });

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookie-consent');

        if (!consent) {
            // Show banner after a short delay for better UX
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);

            return () => clearTimeout(timer);
        } else {
            // User has already consented, initialize analytics if needed
            initAnalytics();
        }
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem('cookie-consent', 'all');
        localStorage.setItem('cookie-preferences', JSON.stringify({
            essential: true,
            marketing: true,
            analytics: true,
        }));
        setIsVisible(false);
        setShowSettings(false);
        initAnalytics();
    };

    const handleEssentialOnly = () => {
        localStorage.setItem('cookie-consent', 'essential');
        localStorage.setItem('cookie-preferences', JSON.stringify({
            essential: true,
            marketing: false,
            analytics: false,
        }));
        setIsVisible(false);
        setShowSettings(false);
    };

    const handleSavePreferences = () => {
        localStorage.setItem('cookie-consent', 'custom');
        localStorage.setItem('cookie-preferences', JSON.stringify(preferences));
        setIsVisible(false);
        setShowSettings(false);
        initAnalytics();
    };

    const togglePreference = (key: keyof CookiePreferences) => {
        if (key === 'essential') return; // Essential cookies cannot be disabled
        setPreferences(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    if (!isVisible) return null;

    return (
        <>
            {/* Settings Modal */}
            {showSettings && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-lg shadow-2xl max-w-md w-full animate-scale-in">
                        {/* Modal Header */}
                        <div className="border-b border-zinc-100 px-6 py-4">
                            <h3 className="text-lg font-semibold text-zinc-900">Cookie-Einstellungen</h3>
                            <p className="text-sm text-zinc-600 mt-1">
                                Wählen Sie, welche Cookies Sie zulassen möchten
                            </p>
                        </div>

                        {/* Modal Content */}
                        <div className="px-6 py-4 space-y-4 max-h-[60vh] overflow-y-auto">
                            {/* Essential Cookies */}
                            <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-100">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-medium text-zinc-900 text-sm">Essenzielle Cookies</h4>
                                        <span className="text-xs bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded">Erforderlich</span>
                                    </div>
                                    <p className="text-xs text-zinc-600 mt-1">
                                        Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.
                                    </p>
                                </div>
                                <div className="flex-shrink-0">
                                    <div className="w-11 h-6 bg-zinc-300 rounded-full cursor-not-allowed opacity-50 relative">
                                        <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Analytics Cookies */}
                            <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-100">
                                <div className="flex-1">
                                    <h4 className="font-medium text-zinc-900 text-sm">Analyse-Cookies</h4>
                                    <p className="text-xs text-zinc-600 mt-1">
                                        Helfen uns zu verstehen, wie Besucher mit der Website interagieren (z.B. Google Analytics).
                                    </p>
                                </div>
                                <div className="flex-shrink-0">
                                    <button
                                        onClick={() => togglePreference('analytics')}
                                        className={`w-11 h-6 rounded-full transition-colors duration-200 relative ${preferences.analytics ? 'bg-black' : 'bg-zinc-300'
                                            }`}
                                    >
                                        <div
                                            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${preferences.analytics ? 'right-0.5' : 'left-0.5'
                                                }`}
                                        ></div>
                                    </button>
                                </div>
                            </div>

                            {/* Marketing Cookies */}
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <h4 className="font-medium text-zinc-900 text-sm">Marketing-Cookies</h4>
                                    <p className="text-xs text-zinc-600 mt-1">
                                        Werden verwendet, um Besuchern relevante Werbung und Marketing-Kampagnen anzuzeigen (z.B. Facebook Pixel).
                                    </p>
                                </div>
                                <div className="flex-shrink-0">
                                    <button
                                        onClick={() => togglePreference('marketing')}
                                        className={`w-11 h-6 rounded-full transition-colors duration-200 relative ${preferences.marketing ? 'bg-black' : 'bg-zinc-300'
                                            }`}
                                    >
                                        <div
                                            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${preferences.marketing ? 'right-0.5' : 'left-0.5'
                                                }`}
                                        ></div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="border-t border-zinc-100 px-6 py-4 flex items-center justify-end gap-3">
                            <button
                                onClick={() => setShowSettings(false)}
                                className="text-sm text-zinc-600 hover:text-zinc-800 font-medium transition-colors px-4 py-2"
                            >
                                Abbrechen
                            </button>
                            <button
                                onClick={handleSavePreferences}
                                className="bg-black text-white text-sm font-medium px-6 py-2.5 rounded-md hover:bg-zinc-800 transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                Auswahl speichern
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Cookie Banner */}
            <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
                <div className="bg-white/90 backdrop-blur-md border-t border-zinc-100 shadow-lg">
                    <div className="max-w-7xl mx-auto px-6 py-6">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            {/* Text Content */}
                            <div className="flex-1">
                                <p className="text-sm text-zinc-800 leading-relaxed">
                                    Wir nutzen Cookies, um Ihr Erlebnis zu verbessern und unsere Dienste zu optimieren.
                                    Sind Sie damit einverstanden?{' '}
                                    <a
                                        href="https://www.canvasnova.com/privacy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline hover:text-zinc-600 transition-colors"
                                    >
                                        Datenschutz
                                    </a>
                                    {' · '}
                                    <a
                                        href="https://www.canvasnova.com/imprint"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline hover:text-zinc-600 transition-colors"
                                    >
                                        Impressum
                                    </a>
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
                                <button
                                    onClick={handleEssentialOnly}
                                    className="text-sm text-zinc-600 hover:text-zinc-800 font-medium transition-colors px-4 py-2"
                                >
                                    Nur Essenzielle
                                </button>
                                <button
                                    onClick={() => setShowSettings(true)}
                                    className="text-sm text-zinc-600 hover:text-zinc-800 font-medium transition-colors px-4 py-2 border border-zinc-300 rounded-md hover:border-zinc-400"
                                >
                                    Einstellungen
                                </button>
                                <button
                                    onClick={handleAcceptAll}
                                    className="bg-black text-white text-sm font-medium px-6 py-2.5 rounded-md hover:bg-zinc-800 transition-all duration-200 shadow-sm hover:shadow-md"
                                >
                                    Alle akzeptieren
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CookieConsent;
