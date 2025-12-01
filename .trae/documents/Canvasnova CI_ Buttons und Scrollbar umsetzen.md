## Überblick
- Implementierung von CI-konformen Buttons und Scrollbars für canvasnova.com mit konsistenten Schriftarten, Farbpalette, States und Responsiveness.
- Nutzung von CSS‑Variablen und komponentenbasierten Klassen; strikte Trennung von Styling und Funktionalität.
- Kompatibel mit bestehender Codebasis: React + Vite, Tailwind via CDN, Fonts Syne/Inter bereits verlinkt.

## Architektur & Orte
- Neue Dateien: `src/styles/tokens.css` (Design‑Tokens), `src/styles/components.css` (Komponenten‑Styles), `docs/design-system.md` (Dokumentation).
- Einbindung der CSS‑Dateien in `index.html`; keine Inline‑Styles in Komponenten.
- Anpassungen in `components/Button.tsx` zur Verwendung der neuen Klassen.

## Design‑Tokens (CSS‑Variablen)
- Farben: `--color-bg: #F5F5F5`, `--color-primary: #0F172A`, `--color-text-on-primary: #F5F5F5`, `--color-text-on-bg: #0F172A`.
- Typografie: `--font-primary: "Syne", sans-serif`, `--font-secondary: "Inter", sans-serif`; konsistente Größen/Gewichte (z. B. `--font-size-sm/md/lg`, `--font-weight-regular/semibold/bold`).
- Buttons: `--button-radius: 8px`, `--button-py: 10px`, `--button-px: 16px`, `--button-shadow: 0 8px 16px rgba(15,23,42,0.16)`.
- Scrollbar: `--scrollbar-width: 8px`, `--scrollbar-track: var(--color-bg)`, `--scrollbar-thumb: var(--color-primary)`.

## Buttons (Klassen & States)
- Basisklasse `.btn`: Font, Radius, Padding, Shadow, `display: inline-flex`, vertikale Zentrierung, `transition: background-color,color,box-shadow,transform 150ms ease`.
- Varianten:
  - `.btn--primary`: Hintergrund `#0F172A`, Text `#F5F5F5`.
  - `.btn--secondary`: Hintergrund `#F5F5F5`, Text `#0F172A`, Rahmen `1px` in `#0F172A`.
- Interaktionen:
  - Hover: leichte Aufhellung/Abdunkelung, Shadow verstärken.
  - Active: Farbe stärker abdunkeln/aufhellen, `transform: translateY(1px)`, Shadow reduzieren.
- Größen (`.btn--sm|.btn--md|.btn--lg`): skalieren Padding/Font‑Size; Mobile Touch‑Targets mit `min-height: 44px`.
- Integration in `components/Button.tsx`: Mapping der vorhandenen `primary|secondary`/`sm|md|lg` Props auf die neuen Klassen.

## Scrollbar (global + Utility)
- Globales Styling für `html, body` und scrollbare Container:
  - WebKit: `::-webkit-scrollbar { width: 8px }`, Track `#F5F5F5`, Thumb `#0F172A` mit Radius und Hover‑Abstufung.
  - Firefox: `scrollbar-width: thin; scrollbar-color: var(--color-thumb) var(--color-track)`.
- Utility‑Klasse `.scrollbar-themed` für spezifische Container; Konsolidierung uneinheitlicher Klassen (`scrollbar-hide` → nur wo wirklich benötigt).

## Responsiveness
- Typografie‑Skalen für Breakpoints (`sm/md/lg`), harmonisiert mit Tailwind‑CDN.
- Buttons: größere Padding‑Skalen und `min-height` auf Mobile, Fokus‑Ring mit ausreichendem Kontrast.
- Scrollbar: Breite bleibt 8px; Hover auf Desktop, unkritisch auf Touch‑Geräten.

## WCAG & Kontrast
- Primär (#0F172A) ↔ Weiß (#F5F5F5) Kontrast ≈ 16:1 (AA/AAA erfüllt).
- Fokus‑States gut sichtbar (z. B. `outline: 2px solid #0F172A` auf hellen Untergründen).

## Integration mit Tailwind (CDN)
- Beibehaltung Tailwind‑Utilities für Layout; Farben via CSS‑Variablen als `bg-[var(--color-primary)]` nur wo nötig.
- Keine lokale `tailwind.config.js`; Farbwerte und Radii primär in CSS‑Klassen kapseln.

## Dokumentation
- `docs/design-system.md`: Fonts, Farben, Komponenten, States, Responsive‑Regeln, Browser‑Besonderheiten, Beispiele zur Verwendung (`<button class="btn btn--primary btn--md">`).

## Testing & Qualitätssicherung
- Cross‑Browser: manuelle Checks in Chrome, Firefox, Safari, Edge.
- Geräte: Desktop/Tablet/Mobile; Prüfung der Touch‑Targets (≥44px), Scrollbar‑Darstellung.
- Farbkontrast: Verifizierung mit Tool (z. B. WebAIM). 
- Performance: leichte Shadows, keine teuren Filter; Repaint‑freundliche Transitions.

## Änderungen im Code
- `index.html`: Einbinden `tokens.css` und `components.css`; Entfernen/Anpassen widersprüchlicher Inline‑Styles für Scrollbar.
- `components/Button.tsx`: Klassenbasiertes Styling; States über Pseudoklassen statt Inline‑Styles.
- Optionale Bereinigung uneinheitlicher Button‑Verwendungen in anderen Komponenten (native `<button>` → Vereinheitlichung).

## Akzeptanzkriterien
- Buttons und Scrollbar entsprechen CI pixelgenau (Farben, Radius, Padding, Shadow, States).
- Konsistente Typografie Syne/Inter im gesamten Interface.
- WCAG‑Kontrast AA/AAA erfüllt; sichtbare Fokus‑States.
- Cross‑Browser und Geräte‑Checks ohne Darstellungsfehler.
- Dokumentation vorhanden und verständlich.
