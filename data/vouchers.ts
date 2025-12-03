/**
 * Voucher Configuration
 * 
 * Hier können Sie einfach neue Gutscheine definieren.
 * Jeder Gutschein ist einem URL-Parameter zugeordnet.
 * 
 * Beispiel-URL: https://yoursite.com?campaign=christmas
 * Dies würde den "christmas" Gutschein verwenden.
 */

export interface VoucherConfig {
    /** Der Gutschein-Code, der angezeigt und kopiert wird */
    code: string;
    /** Die Promo-ID für die Weiterleitung zur canvasnova.com */
    promoId: string;
    /** Optional: Anzeigename für den Gutschein */
    displayName?: string;
    /** Titel des Ticket/Pass (wird im UI angezeigt) */
    title: string;
    /** Typ des Gutscheins: "fixed" für Festbetrag (€), "percentage" für Prozentsatz (%) */
    type: "fixed" | "percentage";
    /** Betrag bzw. Prozentsatz (z.B. 10 für 10€ oder 10 für 10%) */
    amount: number;
    /** Optional: Gültigkeit in Tagen ab heute */
    validityDays?: number;
    /** Optional: Gültigkeit bis zu einem bestimmten Datum (ISO-String) */
    validUntil?: string;
}

/**
 * Voucher-Mapping: URL-Parameter → Gutschein-Konfiguration
 * 
 * Der Schlüssel (z.B. "christmas") ist der Wert des URL-Parameters
 * Der Wert ist die Konfiguration für diesen Gutschein
 */
export const VOUCHERS: Record<string, VoucherConfig> = {
    // Standard-Gutschein (wird verwendet wenn kein Parameter angegeben wird)
    default: {
        code: "ART-LAUNCH",
        promoId: "christmas",
        displayName: "Launch Special",
        title: "Launch Special Pass",
        type: "percentage",
        amount: 0,
        validityDays: 30
    },

    // Weihnachtskampagne - 25% Rabatt
    christmas: {
        code: "christmas",
        promoId: "christmas",
        displayName: "Christmas Special",
        title: "Christmas Special Pass",
        type: "percentage",
        amount: 10,
        validUntil: "2025-12-31T23:59:59"
    },

    // Neujahr - 10€ Festbetrag
    newyear: {
        code: "NEWYEAR-2025",
        promoId: "newyear",
        displayName: "New Year Special",
        title: "New Year Special Pass",
        type: "fixed",
        amount: 10,
        validUntil: "2025-01-31T23:59:59"
    },

    // Instagram - 15% Rabatt, 14 Tage gültig
    instagram: {
        code: "INSTA-ART",
        promoId: "instagram",
        displayName: "Instagram Special",
        title: "Instagram Exclusive Pass",
        type: "percentage",
        amount: 15,
        validityDays: 14
    },

    // Facebook - 5€ Festbetrag, 7 Tage gültig
    facebook: {
        code: "FB-ART",
        promoId: "facebook",
        displayName: "Facebook Special",
        title: "Facebook Friends Pass",
        type: "fixed",
        amount: 5,
        validityDays: 7
    }
};

/**
 * Name des URL-Parameters, der verwendet wird
 * Beispiel: ?promo=christmas
 */
export const URL_PARAM_NAME = "promo";

