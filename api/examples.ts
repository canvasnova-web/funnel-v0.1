/**
 * Beispiel: Verwendung der Backend-API
 * 
 * Diese Datei zeigt, wie man die Dummy-Backend-Funktion verwendet
 */

import { getVoucherFromBackend, convertAPIResponseToVoucherConfig } from '../api/voucherAPI';

/**
 * Beispiel 1: Direkter API-Aufruf
 */
async function example1() {
    console.log('=== Beispiel 1: Direkter API-Aufruf ===');

    // URL-Parameter auslesen
    const urlParams = new URLSearchParams(window.location.search);
    const promoParam = urlParams.get('promo') || 'default';

    // Backend-Funktion aufrufen
    const response = await getVoucherFromBackend(promoParam);

    console.log('Backend Response:', response);
    // Output für ?promo=christmas:
    // {
    //   code: "christmas10",
    //   type: "percent",
    //   discountValue: 10
    // }
}

/**
 * Beispiel 2: Verschiedene Promo-Codes testen
 */
async function example2() {
    console.log('\n=== Beispiel 2: Verschiedene Promo-Codes testen ===');

    const promos = ['christmas', 'newyear', 'instagram', 'facebook', 'vip'];

    for (const promo of promos) {
        const response = await getVoucherFromBackend(promo);
        console.log(`${promo}:`, response);
    }
}

/**
 * Beispiel 3: Integration mit bestehendem Voucher-System
 */
async function example3() {
    console.log('\n=== Beispiel 3: Integration mit Voucher-System ===');

    // URL-Parameter auslesen
    const urlParams = new URLSearchParams(window.location.search);
    const promoParam = urlParams.get('promo') || 'default';

    // Backend-Daten holen
    const apiResponse = await getVoucherFromBackend(promoParam);

    // Zu VoucherConfig konvertieren (für Frontend-Kompatibilität)
    const voucherConfig = convertAPIResponseToVoucherConfig(apiResponse, promoParam);

    console.log('Voucher Config:', voucherConfig);
    // Output: Ein vollständiges VoucherConfig-Objekt, das mit dem bestehenden System kompatibel ist
}

/**
 * Beispiel 4: Error Handling
 */
async function example4() {
    console.log('\n=== Beispiel 4: Error Handling ===');

    try {
        // Unbekannter Promo-Code
        const response = await getVoucherFromBackend('unknown-promo');
        console.log('Response für unknown-promo:', response);
        // Fallback: Gibt default zurück
    } catch (error) {
        console.error('Fehler beim API-Aufruf:', error);
    }
}

// Beispiele ausführen (nur für Demo-Zwecke)
if (typeof window !== 'undefined') {
    // Uncomment zum Testen:
    // example1();
    // example2();
    // example3();
    // example4();
}

export { example1, example2, example3, example4 };
