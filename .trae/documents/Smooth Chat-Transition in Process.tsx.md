## Ziel
- Kein "Hinken" mehr beim Chat: nahtloser Aufbau sowohl initial als auch beim Szenario-Wechsel.
- Konsistente, sanfte Animationskurven; keine harten Sprünge beim Scroll.

## Probleme heute
- Progressive Nachrichtendarstellung basiert auf `setInterval` und wechselt bei Szenario abrupt (components/Process.tsx:110–128).
- Auto-Scroll springt bei großen Distanzen (components/Process.tsx:130–139).
- Chatcontainer remount (`key`) hilft, aber Exit/Enter-Animation des ganzen Chatblocks fehlt.

## Umsetzungsschritte
1. Container-Transition für Chatblock
- Umschließen der Chatliste mit `AnimatePresence` und `motion.div` (key=`activeScenarioId`), Exit: `{opacity:0,y:10}`, Enter: `{opacity:1,y:0}`.
- Ergebnis: Beim Szenario-Wechsel fährt der alte Chat sanft aus, der neue sanft ein.

2. Staggered Children für Nachrichten
- Umstellung der Nachrichteneinträge auf `motion.li` (oder `motion.div`) mit `variants` und `staggerChildren` auf dem Listencontainer.
- Initial: `opacity:0,y:8`, Animate: `opacity:1,y:0`, `transition:{duration:0.35,ease:"easeOut"}`.
- Vorteil: gleichmäßige, vom Framer gesteuerte Reihenfolge statt Timer-Jitter.

3. Scheduler statt `setInterval`
- Ersetzen des `setInterval` (components/Process.tsx:110–128) durch einen rAF-basierten sequentiellen Scheduler oder Framer `useAnimationControls`:
  - Beispiel: pro 300–500ms Nachricht freigeben via `setTimeout`-Kette, alle Timeouts in `timeoutsRef` verwalten.
  - Cleanup bei Szenario-Wechsel via `clearAllTimers()` (components/Process.tsx:31–37).

4. Sanftes Auto-Scroll
- rAF-Glättung: anstatt direkt auf `scrollHeight` zu springen, schrittweise Annäherung (`el.scrollTop += (target-el.scrollTop)*0.25` bis nah dran), 1–2 rAF Zyklen pro Nachricht.
- Schwellenwert bleibt, aber kompletter Sprung wird vermieden.

5. Layout-Animation
- `layout` auf Nachrichten-Wrapper aktivieren, damit Höhenänderungen (neue Messages) sanft reflowen.

6. Exit-Animation der alten Nachrichten
- Beim Szenario-Wechsel `AnimatePresence` mit `mode="wait"` auf Nachrichtenliste, Exit `{opacity:0,y:-6}`.
- Sicherstellen, dass Key (`chatListKey` oder `activeScenarioId`) steuert, wann Exit/Enter passieren.

7. Timings & Easing
- Einheitliche Kurven: `duration ~0.3–0.4`, `ease:"easeOut"` für Einblendungen, `ease:"easeInOut"` für Container.
- Stagger `0.06–0.12` für Nachrichten, abhängig von Desktop/Mobile.

8. Tests
- Rapid-Switch A↔B↔C: Kein Sprung, keine verspäteten Nachrichten.
- Initial-Sequenz bis Chat: gleichmäßiges Einblenden, Scroll ohne Ruckler.
- Mobile: Performance mit Stagger prüfen, ggf. Stagger niedriger.

## Änderungen im Code
- `components/Process.tsx`:
  - Chatliste: `AnimatePresence` + `motion.div` um die Liste; `layout`, `variants` für Items; `mode:'wait'`.
  - Ersetzen des Intervals durch rAF/Timeout-Kette; Cleanup beibehalten.
  - rAF-Glättung des Scrolls.

## Akzeptanzkriterien
- Szenario-Wechsel zeigt sich als sanfte Aus-/Einblendung ohne abruptes Auftauchen.
- Nachrichten bauen sich progressiv und flüssig auf; Scroll wirkt konsistent.
- Keine Timer-Leaks; Wechsel jederzeit responsiv.
