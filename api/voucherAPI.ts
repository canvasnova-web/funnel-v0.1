import { VoucherConfig } from '../data/vouchers';

/**
 * Dummy Backend Response Type
 * Zukünftig wird dies von einer echten Backend-API kommen
 */
export interface VoucherAPIResponse {
    code: string;
    type: 'fixed' | 'percentage' | 'tiered';
    discountValue: number;
}

/**
 * Dummy Backend-Funktion
 * Simuliert einen API-Call zu einer Backend-Funktion
 * 
 * @param promoParam - Der promo URL-Parameter (z.B. "christmas")
 * @returns Promise mit VoucherAPIResponse
 */
export const getVoucherFromBackend = async (promoParam: string): Promise<VoucherAPIResponse> => {
    // Simuliere Netzwerk-Latenz
    await new Promise(resolve => setTimeout(resolve, 100));

    // Dummy-Daten basierend auf dem promo-Parameter
    const dummyData: Record<string, VoucherAPIResponse> = {
        default: {
            code: 'ART-LAUNCH',
            type: 'percentage',
            discountValue: 100
        },
        christmas: {
            code: 'christmas',
            type: 'percentage',
            discountValue: 10
        },
        newyear: {
            code: 'NEWYEAR25',
            type: 'fixed',
            discountValue: 25
        },
        instagram: {
            code: 'INSTA15',
            type: 'percentage',
            discountValue: 15
        },
        facebook: {
            code: 'FB5',
            type: 'fixed',
            discountValue: 5
        },
        // Beispiel für Tiered-Discount (zukünftig)
        vip: {
            code: 'VIP-TIER',
            type: 'tiered',
            discountValue: 50
        }
    };

    // Wenn Parameter nicht gefunden, verwende Default
    return dummyData[promoParam] || dummyData.default;
};

/**
 * Konvertiert Backend-Response zu VoucherConfig für Frontend-Kompatibilität
 * 
 * @param apiResponse - Response von der Backend-API
 * @param promoParam - Der promo URL-Parameter
 * @returns VoucherConfig - Frontend-kompatible Voucher-Konfiguration
 */
export const convertAPIResponseToVoucherConfig = (
    apiResponse: VoucherAPIResponse,
    promoParam: string
): VoucherConfig => {
    // Mapping von API-Type zu Frontend-Type
    const typeMapping: Record<string, 'fixed' | 'percentage'> = {
        fixed: 'fixed',
        percentage: 'percentage',
        tiered: 'percentage' // Tiered wird vorerst als percentage behandelt
    };

    return {
        code: apiResponse.code,
        promoId: promoParam,
        displayName: `${promoParam} Special`,
        title: `${promoParam.charAt(0).toUpperCase() + promoParam.slice(1)} Pass`,
        type: typeMapping[apiResponse.type] || 'percentage',
        amount: apiResponse.discountValue,
        validityDays: 30 // Default Gültigkeit
    };
};
