# Pharen UI — Kurzanleitung Installation

Diese kurze Anleitung zeigt zwei einfache Wege, Pharen UI in einem Projekt zu nutzen:

1) Als npm/yarn/pnpm Bibliothek (empfohlen für Bibliothekskonsumenten)
2) Per CLI / Registry-Init (Projekt-Scaffold mit Tailwind-Prüfung)

---

## 1) Installation als Bibliothek (npm / pnpm / yarn)

Empfohlen, wenn du Pharen UI in einer bestehenden Vue 3 App verwenden willst.

- Installation (pnpm):

```bash
pnpm add @pharen/ui
# oder falls du lokal testen willst (aus dem Monorepo):
pnpm add link:../..
```

- Styles einbinden (minimal):

Importiere die bereitgestellte, kompilierte CSS-Datei. Dadurch erhältst du die Design-Tokens und die vom Paket gelieferten Klassen.

```ts
// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import '@pharen/ui/styles.css' // fertige, ausgelieferte CSS
import PharenUI from '@pharen/ui'

const app = createApp(App)
app.use(PharenUI)
app.mount('#app')
```

Hinweis: Pharen UI ist für Tailwind v4 entwickelt. Das Paket exportiert eine bereits kompilierte CSS-Datei (`./dist/ui.css`) die als `./styles.css` im Package-Export verfügbar ist. Wenn du die Klassen vollständig mit deinem eigenen Tailwind-Build kombinieren willst, installiere Tailwind in deinem Projekt und integriere die Quellen entsprechend.

---

## 2) CLI / Registry-Init (Projekt-Scaffold)

Pharen UI enthält ein CLI-Skript, das ein Projekt initialisiert und prüft, ob Tailwind installiert ist. Es ist nützlich, wenn du ein neues Projekt mit Pharen-UI-v4-Tailwind-Setup aufsetzen willst.

- CLI ausführen (nach globaler Installation oder lokal):

```bash
# lokal (im Repo) - Beispiel
node ./dist/cli.js init
```

Die CLI gibt Hinweise zur Tailwind-Installation aus, falls sie nicht gefunden wird.

---

## Hinweise für Konsumenten

- Tailwind: Pharen UI nutzt Tailwind v4 intern. Die Bibliothek liefert bereits eine kompilierte CSS-Datei, sodass ein Consumer das Paket auch ohne eigenen Tailwind-Build nutzen kann. Wenn du jedoch die Klassen in deinem Purge/scan zu Tailwind hinzufügen willst (um die CSS-Größe zu verringern), füge die Komponenten-Quellen/`node_modules/@pharen/ui/dist` in die `content`-Paths deines `tailwind.config.js`.

- TypeScript: Die Distribution stellt `.d.ts`-Typen im `types`-Export bereit. Wenn du Probleme mit Drittanbieter‑Typen siehst (z. B. Embla), aktualisiere auf die neueste Patch-Version der Bibliothek — Type-Leaks wurden bereits in neueren Builds adressiert.

---

Wenn du eine kurze Installationsanleitung im Repo (z. B. `README.md`) oder Demo-Projekt gewünscht hast, sag mir kurz welche Variante du bevorzugst (nur npm-guide, oder zusätzlich ein kurzes Beispiel mit Tailwind-Integration) — ich ergänze es dann.