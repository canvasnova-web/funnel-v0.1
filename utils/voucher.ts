import { VOUCHERS, URL_PARAM_NAME, VoucherConfig } from '../data/vouchers';
import { getVoucherFromBackend, convertAPIResponseToVoucherConfig } from '../api/voucherAPI';

/**
 * Liest den Voucher aus den URL-Parametern (statisch)
 * LEGACY: Wird von getVoucherFromBackendAPI ersetzt
 * 
 * @returns VoucherConfig - Die Konfiguration für den aktuellen Gutschein
 */
export const getVoucherFromURL = (): VoucherConfig => {
    // URL-Parameter auslesen (funktioniert sowohl client- als auch serverseitig)
    if (typeof window === 'undefined') {
        // Server-seitig: Verwende Default
        return VOUCHERS.default;
    }

    const params = new URLSearchParams(window.location.search);
    const campaignParam = params.get(URL_PARAM_NAME);

    // Wenn kein Parameter vorhanden oder unbekannt, verwende Default
    if (!campaignParam || !VOUCHERS[campaignParam]) {
        return VOUCHERS.default;
    }

    return VOUCHERS[campaignParam];
};

/**
 * Liest den Voucher vom Backend über die API
 * Diese Funktion ersetzt getVoucherFromURL() für Backend-Integration
 * 
 * @returns Promise<VoucherConfig> - Die Konfiguration für den aktuellen Gutschein
 */
export const getVoucherFromBackendAPI = async (): Promise<VoucherConfig> => {
    // URL-Parameter auslesen
    if (typeof window === 'undefined') {
        // Server-seitig: Verwende Default
        return VOUCHERS.default;
    }

    const params = new URLSearchParams(window.location.search);
    // Verwende 'promo' als URL-Parameter für Backend-API
    const promoParam = params.get('promo') || 'default';

    try {
        // Backend-API aufrufen
        const apiResponse = await getVoucherFromBackend(promoParam);

        // Backend-Response zu VoucherConfig konvertieren
        return convertAPIResponseToVoucherConfig(apiResponse, promoParam);
    } catch (error) {
        console.error('Fehler beim Laden des Vouchers vom Backend:', error);
        // Fallback zu statischen Daten
        return VOUCHERS.default;
    }
};

/**
 * Gibt die vollständige Redirect-URL zurück
 * 
 * @param voucher - Die Voucher-Konfiguration
 * @returns string - Die vollständige URL zur Weiterleitung
 */
export const getRedirectURL = (voucher: VoucherConfig): string => {
    return `https://canvasnova.com/create?promo=${voucher.promoId}`;
};

/**
 * Formatiert den Gutscheinbetrag basierend auf dem Typ
 * 
 * @param voucher - Die Voucher-Konfiguration
 * @returns string - Formatierter Betrag (z.B. "10€" oder "10%")
 */
export const formatVoucherAmount = (voucher: VoucherConfig): string => {
    if (voucher.type === 'percentage') {
        return `${voucher.amount}%`;
    }
    return `€${voucher.amount}`;
};

/**
 * Berechnet das Ablaufdatum des Gutscheins
 * 
 * @param voucher - Die Voucher-Konfiguration
 * @returns Date - Das Ablaufdatum
 */
export const getVoucherValidUntil = (voucher: VoucherConfig): Date => {
    // Wenn validUntil gesetzt ist, verwende dieses Datum
    if (voucher.validUntil) {
        return new Date(voucher.validUntil);
    }

    // Wenn validityDays gesetzt ist, berechne Datum ab heute
    if (voucher.validityDays) {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + voucher.validityDays);
        endDate.setHours(23, 59, 59, 999);
        return endDate;
    }

    // Fallback: Ende des aktuellen Monats
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0);
};

/**
 * Formatiert die Ersparnis als Euro-Betrag
 * Basierend auf dem Druckpreis. Max Produktpreis beträgt ca. 2300€
 * 
 * @param voucher - Die Voucher-Konfiguration
 * @returns string - Formatierte Ersparnis (z.B. "Spare 10€" oder "Spare bis zu 115€")
 */
export const formatSavingsAmount = (voucher: VoucherConfig): string => {
    const MAX_PRODUCT_PRICE = 2300; // Teuerster Druckpreis

    if (voucher.type === 'fixed') {
        // Festbetrag: "Spare X€"
        return `Spare ${voucher.amount}€`;
    } else {
        // Prozentsatz: Berechne basierend auf max Produktpreis
        const maxSavings = Math.round((MAX_PRODUCT_PRICE * voucher.amount) / 100);
        return `Spare bis zu ${maxSavings}€`;
    }
};

