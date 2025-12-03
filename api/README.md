# Backend API - Voucher System

## Übersicht

Diese API-Funktionen simulieren Backend-Calls für das Voucher-System. In der Zukunft werden diese durch echte Backend-API-Endpunkte ersetzt.

## URL-Parameter

Die API verwendet den URL-Parameter `promo` anstelle von `campaign`:

```
https://yoursite.com?promo=christmas
```

## API-Funktion

### `getVoucherFromBackend(promoParam: string)`

Ruft Voucher-Informationen vom Backend ab (aktuell: Dummy-Funktion).

**Parameter:**
- `promoParam` (string): Der Promo-Code (z.B. "christmas", "newyear")

**Rückgabewert:**
```typescript
{
    code: string;           // Der Gutschein-Code (z.B. "christmas10")
    type: string;          // Art des Rabatts: "fixed" | "percentage" | "tiered"
    discountValue: number; // Rabattwert (z.B. 10 für 10€ oder 10%)
}
```

## Beispiele

### Beispiel 1: Christmas Promo
```typescript
const response = await getVoucherFromBackend('christmas');
// Output:
// {
//   code: "christmas10",
//   type: "percentage",
//   discountValue: 10
// }
```

### Beispiel 2: New Year Promo (Fixed)
```typescript
const response = await getVoucherFromBackend('newyear');
// Output:
// {
//   code: "NEWYEAR25",
//   type: "fixed",
//   discountValue: 25
// }
```

### Beispiel 3: VIP Promo (Tiered)
```typescript
const response = await getVoucherFromBackend('vip');
// Output:
// {
//   code: "VIP-TIER",
//   type: "tiered",
//   discountValue: 50
// }
```

## Verfügbare Promo-Codes

| Promo-Code | Code | Type | Discount Value |
|------------|------|------|----------------|
| default | ART-LAUNCH | percentage | 100 |
| christmas | christmas | percentage | 10 |
| newyear | NEWYEAR25 | fixed | 25 |
| instagram | INSTA15 | percentage | 15 |
| facebook | FB5 | fixed | 5 |
| vip | VIP-TIER | tiered | 50 |

## Discount Types

- **`fixed`**: Festbetrag in Euro (z.B. 25€ Rabatt)
- **`percentage`**: Prozent-Rabatt (z.B. 10% Rabatt)
- **`tiered`**: Gestaffelter Rabatt (für zukünftige Implementierung)

## Integration mit Frontend

Die Funktion `convertAPIResponseToVoucherConfig()` konvertiert die Backend-Response in das Frontend-kompatible `VoucherConfig`-Format:

```typescript
import { getVoucherFromBackend, convertAPIResponseToVoucherConfig } from './api/voucherAPI';

// Backend-Daten abrufen
const apiResponse = await getVoucherFromBackend('christmas');

// Zu VoucherConfig konvertieren
const voucherConfig = convertAPIResponseToVoucherConfig(apiResponse, 'christmas');

// Jetzt kann voucherConfig mit dem bestehenden System verwendet werden
```

## Migration zu echtem Backend

Um diese Dummy-Funktion durch eine echte Backend-API zu ersetzen:

1. Ersetzen Sie die Dummy-Daten in `getVoucherFromBackend()` durch einen echten Fetch-Call:

```typescript
export const getVoucherFromBackend = async (promoParam: string): Promise<VoucherAPIResponse> => {
    const response = await fetch(`https://api.yourbackend.com/vouchers?promo=${promoParam}`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch voucher data');
    }
    
    return await response.json();
};
```

2. Stellen Sie sicher, dass Ihr Backend die gleiche Datenstruktur zurückgibt:
   - `code`: string
   - `type`: "fixed" | "percentage" | "tiered"
   - `discountValue`: number

3. Fügen Sie Error-Handling hinzu für Netzwerkfehler, ungültige Promo-Codes, etc.

## Testing

Siehe `api/examples.ts` für detaillierte Beispiele zur Verwendung der API.

```bash
# Im Browser-Console:
import { example1 } from './api/examples';
example1(); // Testet den aktuellen URL-Parameter
```

## Nächste Schritte

- [ ] Backend-Endpunkt erstellen
- [ ] Authentifizierung hinzufügen (falls benötigt)
- [ ] Error-Handling verbessern
- [ ] Caching implementieren
- [ ] Analytics/Tracking einbauen
- [ ] Tiered-Discount-Logik implementieren
