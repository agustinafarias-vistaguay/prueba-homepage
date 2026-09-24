# Vistaguay AgTech - Development Directives & Code Rules

## 1. Architecture & Separation of Concerns
* **Strict Style Separation:** Do NOT inject dynamic `<style>` tags from JavaScript files (e.g., `document.head.appendChild(style)`). All keyframes and custom animations must reside in `css/animations.css`.
* **Global Scope Control:** Avoid global `window` pollution. If a JS file must expose a function for an inline HTML event (`onclick="..."`), declare it explicitly and safely:
  `window.myFunction = function(...) { ... };`
* **Script Encapsulation:** Independent JS modules (`solutions.js`, `testimonials.js`, `weed-combo.js`, `business.js`, `pilots-map.js`, `form-dev.js`) must be wrapped in Immediately Invoked Function Expressions (IIFEs) to protect private scope.

---

## 2. Tailwind CLI Compilation Workflow
* **Mandatory Build Command:** Every time utility classes are added, removed, or modified in `index.html` or CSS source files, the developer MUST compile the production CSS bundle using:
  `npx tailwindcss -i ./css/inputs.css -o ./css/output.css --minify`
* **Source vs Output:** Never edit `css/output.css` directly. All custom CSS rules belong in `css/inputs.css`, `css/components.css`, or `css/animations.css`.

---

## 3. Components & Design System (Atomic Design)
* **Mandatory Centralized Classes:** Do NOT write ad-hoc strings of 8+ Tailwind utility classes for repeating buttons or cards. Use centralized classes from `css/components.css`:
  * Buttons: `.btn-primary`, `.btn-secondary-hero`, `.btn-outline`
  * Cards / Pills: `.benefit-pill`, `.tab-btn`
* **Zero Hardcoded Hex Colors:** Prohibited to use hardcoded hex utilities like `bg-[#40a568]` in HTML. Use `bg-primary`, Tailwind tokens, or declared CSS variables.

---

## 4. Performance & Animation Optimizations
* **Viewport-Aware Timers (`IntersectionObserver`):** Any background animation, carousel, or auto-playing loop (`setInterval`) MUST observe its parent section container. When the section scrolls out of view or the tab is hidden, the timer MUST pause automatically (`clearInterval`) to preserve CPU and battery.
* **Modal Overlay Freeze & Scroll Lock:** Opening any global modal (`#download-modal`, `#algo-modal`) MUST trigger `window.pauseTestimonialCycling()` to freeze background loops and set `document.body.style.overflow = 'hidden'` to lock background scrolling. Closing the modal MUST restore timers and scroll fluidly.

---

## 5. Layout, Responsive Design & UX Rules
* **1-Column Mobile Rule:** For screens `<640px`, process flows, benefit lists, or text cards MUST use **1 single column (`grid-cols-1`)**. Never force 2 cramped columns if the column width drops below 200px.
* **Prohibition of Micro-texts:** No informative copy, button, or card item may render below 13px–14px (`text-sm` / `clamp`). Sizes `text-[10px]` or `text-[11px]` are strictly restricted to watermarks or copyright lines.
* **Fixed Navbar Anchoring (`scroll-mt`):** All navigable section targets with IDs (`#servicios`, `#business`, `#expert`, `#devs`) MUST include `scroll-mt-14 md:scroll-mt-16` to prevent the fixed navbar (`fixed top-0 h-14 md:h-15`) from obscuring section headlines during anchor scrolls.
* **Non-Interactive Background Maps:** Leaflet map containers used as visual backgrounds MUST disable mouse/touch gestures (`dragging: false`, `touchZoom: false`, `scrollWheelZoom: false`) and carry the classes `pointer-events-none select-none` to guarantee smooth vertical touch scrolling on mobile screens.
* **Mobile Segmented Pagination:** Carousel indicators on mobile must use fixed-size capsules (`w-8 h-1.5`) with transparent extended touch paddings (`p-2.5`). Dynamic width shifting (`w-2` to `w-7`) is strictly prohibited to eliminate layout shifts (Reflow).
* **Modal DOM Placement:** Modals MUST be placed at the root level of `index.html` (just before `</body>`) to avoid stacking context and overflow clipping issues caused by parent section transforms (`.reveal`).
* **Hero Tablet Constraint:** For screens between 768px and 1023px (`sm` / `md`), media mounts or SVG animations in the Hero section must cap their maximum height (`max-h-[380px]`) to avoid vertical layout stretching.

---

## 6. Repository Hygiene & Maintenance
* **Production Assets & Images:** Do NOT push raw uncompressed images (`>1MB` like `*-origin.*`) to production bundles. All served images must be `.webp` or compressed `.jpg` under 200KB.
* **Synchronized Documentation:** Whenever a file in `js/`, `css/`, or `data/` is added, removed, or renamed, the file tree table in `README.md` MUST be updated.
* **Console & Dead Code Hygiene:** Never leave active debugging `console.log` statements or commented-out code blocks in production files.