# Canvasnova Design‑System: Buttons & Scrollbar

## Schriftarten
- Primärschrift: `Syne` (Überschriften)
- Sekundärschrift: `Inter` (Fließtext/Buttons)
- Konsistente Größen/Gewichte über Variablen in `public/styles/tokens.css`

## Farbpalette
- Weiß: `#F5F5F5`
- Dunkelblau (Primär): `#0F172A`
- Hover: `#1E2746`, Active: `#0B1223`
- Kontrast (Primär ↔ Weiß): ≈ 16:1, erfüllt WCAG AA/AAA

## Design‑Tokens
- Datei: `public/styles/tokens.css`
- Enthält: Farben, Typografie, Button‑Radii/Padding/Shadow, Scrollbar‑Variablen
- Globale Basis‑Styles für `html, body` inkl. `overflow‑x: hidden`

## Buttons
- Klassen: `.btn`, `.btn--primary`, `.btn--secondary`, `.btn--sm|md|lg`, `.btn__icon`
- Primär: Hintergrund `#0F172A`, Text `#F5F5F5`, `border‑radius: 8px`
- Sekundär: Hintergrund `#F5F5F5`, Text `#0F172A`, 1px Rahmen `#0F172A`
- States: Hover/Active mit leichten Farb‑ und Shadow‑Abstufungen
- Touch‑Targets: `min‑height ≥ 44px`
- Disabled: reduzierte Opazität, keine Shadow
- Verwendung: z. B. `<button class="btn btn--primary btn--md">` oder in `components/Button.tsx`

## Scrollbar
- Datei: `public/styles/components.css`
- Breite: `8px`; Track `#F5F5F5`; Thumb `#0F172A`; Radius
- WebKit: `::-webkit-scrollbar*`; Firefox: `scrollbar‑width: thin; scrollbar‑color`
- Utility: `.scrollbar-themed` für Container; `.scrollbar-hide` nur wo erforderlich

## Integration
- Einbindung der CSS in `index.html`
- Komponenten refaktoriert: `components/Button.tsx` nutzt `.btn`‑Klassen
- CTA‑Buttons in `Hero.tsx`, `Process.tsx`, `OfferSection*.tsx`, `ComparisonSection.tsx` vereinheitlicht

## Testing
- Cross‑Browser: Chrome, Firefox, Safari, Edge manuell prüfen
- Geräte: Desktop/Tablet/Mobile; Touch‑Targets ≥ 44px, Scrollbar sichtbar auf Desktop
- Farbkontrast: mit z. B. WebAIM checken; Fokus‑Outline sichtbar
- Performance: keine teuren Filter, leichte Transitions, Shadows moderat

## Richtlinien
- Keine Inline‑Styles in Komponenten für CI‑Elemente
- Reusable Klassen statt mehrfacher Tailwind‑Strings für Buttons
- Nur dort Scrollbar verbergen, wo UX es erfordert
