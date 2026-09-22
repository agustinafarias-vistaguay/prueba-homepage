# Vistaguay AgTech - Development Directives & Code Rules

## 1. Architecture & Separation of Concerns
* **Strict Style Separation:** Do NOT inject dynamic `<style>` tags from JavaScript files (e.g., `document.head.appendChild(style)`). All keyframes and custom animations must reside in `css/animations.css`.
* **Global Scope Control:** Avoid global `window` pollution. If a JS file must expose a function for an inline HTML event (`onclick="..."`), declare it explicitly and safely:
  `window.myFunction = function(...) { ... };`
* **Script Encapsulation:** Independent JS modules (`solutions.js`, `testimonials.js`, `weed-combo.js`, `business.js`) must be wrapped in Immediately Invoked Function Expressions (IIFEs) to protect private scope.

---

## 2. Components & Design System (Atomic Design)
* **Mandatory Centralized Classes:** Do NOT write ad-hoc strings of 8+ Tailwind utility classes for repeating buttons or cards. Use centralized classes from `css/components.css`:
  * Buttons: `.btn-primary`, `.btn-secondary-hero`, `.btn-outline`
  * Cards / Pills: `.benefit-pill`, `.tab-btn`
* **Zero Hardcoded Hex Colors:** Prohibited to use hardcoded hex utilities like `bg-[#47C278]` in HTML. Use `bg-primary`, Tailwind tokens, or declared CSS variables.

---

## 3. Layout & Responsive Design Rules
* **1-Column Mobile Rule:** For screens `<640px`, process flows, benefit lists, or text cards MUST use **1 single column (`grid-cols-1`)**. Never force 2 cramped columns if the column width drops below 200px.
* **Prohibition of Micro-texts:** No informative copy, button, or card item may render below 13px–14px (`text-sm` / `clamp`). Sizes `text-[10px]` or `text-[11px]` are strictly restricted to watermarks or copyright lines.
* **Hero Tablet Constraint:** For screens between 768px and 1023px (`sm` / `md`), media mounts or SVG animations in the Hero section must cap their maximum height (`max-h-[380px]`) to avoid vertical layout stretching.

---

## 4. Repository Hygiene & Maintenance
* **Production Assets & Images:** Do NOT push raw uncompressed images (`>1MB` like `*-origin.*`) to production bundles. All served images must be `.webp` or compressed `.jpg` under 200KB.
* **Synchronized Documentation:** Whenever a file in `js/`, `css/`, or `data/` is added, removed, or renamed, the file tree table in `README.md` MUST be updated.
* **Console & Dead Code Hygiene:** Never leave active debugging `console.log` statements or commented-out code blocks in production files.