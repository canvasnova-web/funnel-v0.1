# Voucher System - Dokumentation

## Übersicht

Das Voucher-System ermöglicht es, basierend auf URL-Parametern dynamisch verschiedene Gutscheine anzuzeigen mit:
- **Dynamische Titel**: Der Ticket-Titel ändert sich basierend auf der Kampagne
- **Gutscheintypen**: Festbetrag (€) oder Prozentsatz (%)
- **Konfigurierbare Zeiträume**: Feste Enddaten oder relative Gültigkeitsdauer
- **Automatische Updates**: Das Ticket aktualisiert sich wenn sich der URL-Parameter ändert

## Verwendung

### URL-Parameter

Der Gutschein wird über den URL-Parameter `campaign` gesteuert:

```
https://yoursite.com?campaign=christmas
```

### Verfügbare Kampagnen

| URL Parameter | Code | Titel | Typ | Betrag | Gültigkeit |
|--------------|------|-------|-----|--------|------------|
| (kein) | ART-LAUNCH | Launch Special Pass | Prozent | 100% | 30 Tage |
| `?campaign=christmas` | XMAS-2025 | Christmas Special Pass | Prozent | 25% | 31. Dez 2025 |
| `?campaign=newyear` | NEWYEAR-2025 | New Year Special Pass | Festbetrag | 10€ | 31. Jan 2025 |
| `?campaign=instagram` | INSTA-ART | Instagram Exclusive Pass | Prozent | 15% | 14 Tage |
| `?campaign=facebook` | FB-ART | Facebook Friends Pass | Festbetrag | 5€ | 7 Tage |

## Neue Kampagne hinzufügen

### Schritt 1: Voucher-Konfiguration erweitern

Öffnen Sie die Datei `data/vouchers.ts` und fügen Sie einen neuen Eintrag hinzu:

```typescript
export const VOUCHERS: Record<string, VoucherConfig> = {
    // ... bestehende Vouchers ...
    
    // Ihre neue Kampagne
    myNewCampaign: {
        code: "MEIN-CODE-2025",           // Der Code, der angezeigt wird
        promoId: "my-promo",               // Die Promo-ID für die Weiterleitung
        displayName: "Meine Kampagne",     // Optional: Anzeigename
        title: "Meine Special Pass",       // Titel des Tickets im UI
        type: "percentage",                 // "fixed" für € oder "percentage" für %
        amount: 20,                         // 20 für 20€ oder 20%
        validityDays: 14                    // Optional: Gültig für 14 Tage
        // ODER
        // validUntil: "2025-12-31T23:59:59" // Optional: Gültig bis zum Datum
    }
};
```

#### Gutscheintypen

Der Rabatt bezieht sich immer auf den **Druckpreis**. Das System zeigt die tatsächliche Ersparnis in Euro an:

- **`type: "percentage"`**: Prozent-Rabatt wird als Euro-Betrag angezeigt basierend auf dem höchsten Produktpreis (ca. 2300€)
  - Beispiel: 20% → wird als "Spare bis zu 460€" angezeigt (20% von 2300€)
- **`type: "fixed"`**: Festbetrag-Rabatt wird direkt angezeigt
  - Beispiel: 10€ → wird als "Spare 10€" angezeigt

#### Gültigkeitszeiträume

Sie können die Gültigkeit auf zwei Arten definieren:

1. **Relative Gültigkeit** (`validityDays`):
   ```typescript
   validityDays: 7  // Gutschein ist 7 Tage ab heute gültig
   ```

2. **Absolutes Enddatum** (`validUntil`):
   ```typescript
   validUntil: "2025-12-31T23:59:59"  // Gültig bis zum 31. Dezember 2025
   ```

Wenn beide fehlen, verwendet das System den Standard (Ende des aktuellen Monats).

### Schritt 2: Testen

Rufen Sie die URL mit dem neuen Parameter auf:
```
http://localhost:5173?campaign=myNewCampaign
```

Der neue Gutschein-Code sollte automatisch im Ticket angezeigt werden.

### Schritt 3: Marketing-Links erstellen

Erstellen Sie Links für Ihre Kampagnen:
- Facebook: `https://yoursite.com?campaign=facebook`
- Instagram: `https://yoursite.com?campaign=instagram`
- Newsletter: `https://yoursite.com?campaign=newsletter`
- etc.

## Technische Details

### Dateien

- **`data/vouchers.ts`**: Zentrale Konfigurationsdatei für alle Gutscheine
- **`utils/voucher.ts`**: Utility-Funktionen zum Auslesen und Verarbeiten
- **`components/OfferSection.tsx`**: Komponente, die den Gutschein anzeigt

### Funktionsweise

1. Beim Laden der Seite wird `getVoucherFromURL()` aufgerufen
2. Die Funktion liest den `campaign` URL-Parameter aus
3. Basierend auf dem Parameter wird die passende Voucher-Config aus `VOUCHERS` geladen
4. Falls kein/unbekannter Parameter: Default-Voucher wird verwendet
5. Die Config wird im State gespeichert und im UI angezeigt
6. Beim Klick auf den Button wird der Code in die Zwischenablage kopiert
7. Weiterleitung erfolgt zur dynamisch generierten URL

### Anpassungen

Um den URL-Parameter-Namen zu ändern, editieren Sie in `data/vouchers.ts`:

```typescript
export const URL_PARAM_NAME = "campaign"; // Ändern Sie dies zu z.B. "promo"
```

Dann funktionieren URLs wie: `?promo=christmas`

## Beispiele

### Beispiel 1: Saisonale Prozent-Kampagne

```typescript
spring: {
    code: "SPRING-2025",
    promoId: "spring-sale",
    displayName: "Frühlings-Special",
    title: "Spring Savings Pass",
    type: "percentage",
    amount: 30,
    validUntil: "2025-03-31T23:59:59"
}
```

Aufruf: `?campaign=spring`
Anzeige: "Spare bis zu 690€" (30% von 2300€) bis 31. März 2025

### Beispiel 2: Partner-Kampagne mit Festbetrag

```typescript
partner_company: {
    code: "PARTNER-20",
    promoId: "partner-discount",
    displayName: "Partner Rabatt",
    title: "Partner Exclusive Pass",
    type: "fixed",
    amount: 15,
    validityDays: 60
}
```

Aufruf: `?campaign=partner_company`
Anzeige: "Spare 15€" für 60 Tage ab heute

### Beispiel 3: Influencer-Kampagne mit kurzer Gültigkeit

```typescript
influencer_max: {
    code: "MAX10",
    promoId: "influencer-max",
    displayName: "Max Influencer Special",
    title: "Max's Special Pass",
    type: "percentage",
    amount: 10,
    validityDays: 3
}
```

Aufruf: `?campaign=influencer_max`
Anzeige: "Spare bis zu 230€" (10% von 2300€) für 3 Tage ab heute

## Troubleshooting

### Gutschein wird nicht angezeigt

- Prüfen Sie die Browser-Console auf Fehler
- Stellen Sie sicher, dass der Campaign-Name in `VOUCHERS` existiert
- Testen Sie mit dem Default (ohne Parameter)

### Falsche Weiterleitung

- Prüfen Sie die `promoId` in der Voucher-Config
- Überprüfen Sie die `getRedirectURL()` Funktion in `utils/voucher.ts`

### Änderungen werden nicht übernommen

- Löschen Sie den Browser-Cache
- Führen Sie einen Hard-Reload durch (Cmd+Shift+R / Ctrl+Shift+R)
- Starten Sie den Dev-Server neu
