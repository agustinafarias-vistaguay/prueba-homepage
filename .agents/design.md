# Vistaguay AgTech - Design System & UI/UX Specifications (Atomic Design)

## 1. Color Palette & Tokens (Atoms)

### Core Brand Colors
* **Primary (Vistaguay Green):** CSS Variable `--color-primary` (`#47C278`)
  * Tailwind Tokens: `primary`, `bg-primary`, `text-primary`, `border-primary`
  * Standard Hover State: `#3DB067` (`--color-primary-hover`)
  * Active/Click State: `#349B5B` (`--color-primary-active`)
  * Light Accent Background: `#EEFAF2` (`--color-primary-light`)
  * Glow Effect: `rgba(71, 194, 120, 0.35)` (`--color-primary-glow`)
  * **Strict Policy:** Absolute prohibition of hardcoded `#47C278` hex values in HTML classes. Always use Tailwind `primary` or CSS variables.

### Surfaces & Backgrounds
* **General Page Background:** `#FAFAFA` (`--color-bg-app`)
* **Surface Containers:** `#FFFFFF` (`--color-surface`)
* **Subtle Surface:** `#F8FAFC` (`--color-surface-subtle`)
* **Dark Contrast Surfaces:**
  * Dark App Accent (Experts): `#1E293B` (`--color-surface-dark`)
  * Inverse Surface: `#2F3131` (`--color-surface-inverse`)
  * Hero Background Overlay: `bg-black/65`

### Text & Contrast Standards (WCAG 2.1 AA Compliant)
* **Headings (H1, H2, H3):** `#0F172A` / `#1A1C1C` (`--color-text-title` / `text-slate-900`)
* **Body Text (Primary Copy):** `#334155` (`--color-text-body` / `text-slate-700`)
* **Muted Copy / Secondary:** `#64748B` (`--color-text-muted` / `text-slate-500`)
* **Dark Background Copy:** `#F8FAFC` (`text-white`) / `#CBD5E1` (`text-slate-300`)
* **Accessibility Rule:** Minimum contrast ratio > 4.5:1. Never use `text-slate-400` or lower for readable copy on light backgrounds.

---

## 2. Typography Hierarchy & Fluid Scaling (clamp)

* **Font Family:** `Plus Jakarta Sans` (Weights: 400, 500, 600, 700, 800)
* **Accessibility Rule:** Micro-texts below 13px are **strictly forbidden** for informative copy, card items, or buttons.

### Responsive Typography Scale
| Token | CSS Formula `clamp()` | Range (Mobile → Desktop) | Usage |
| :--- | :--- | :--- | :--- |
| **`--font-display-h1`** | `clamp(1.75rem, 4vw + 0.75rem, 2.5rem)` | 28px → 40px | H1 Hero & Main CTA Headline |
| **`--font-title-h2`** | `clamp(1.35rem, 2.5vw + 0.5rem, 1.875rem)` | 21.6px → 30px | H2 Section Titles |
| **`--font-title-h3`** | `clamp(1.05rem, 1.2vw + 0.6rem, 1.25rem)` | 16.8px → 20px | H3 Cards, Services & Step Titles |
| **`--font-body-base`** | `clamp(0.9375rem, 0.4vw + 0.85rem, 1rem)` | 15px → 16px | Body Lead Copy & Main Paragraphs |
| **`--font-body-sm`** | `clamp(0.8125rem, 0.3vw + 0.75rem, 0.875rem)` | 13px → 14px | Subtitles, List Items, Bullets & Buttons |
| **`--font-micro-badge`** | `clamp(0.75rem, 0.2vw + 0.7rem, 0.8125rem)` | 12px → 13px | Badges, Footer Copyright & Tags |

---

## 3. Elevation & Surface Hierarchy (Native Tailwind Shadows)

* **Soft Elevation (`shadow-sm`):** Small cards, badges, and secondary buttons (`shadow-sm border border-slate-200/70`).
* **Container Elevation (`shadow-md` / `shadow-lg`):** Main section containers (End-to-End Solution, Developers, Experts).
* **Interactive Elevation (`shadow-xl`):** Service cards 50/50, Pilot Map container, and Video showcase.
* **Floating Overlay Elevation (`shadow-2xl`):** Global modals (`#download-modal`, `#weed-combo-modal`) and mobile slide-out menu (`#mobile-menu`).

---

## 4. Button & Interactive Component Hierarchy (Molecules)

All buttons use **Sentence case** and flex alignment (`inline-flex items-center justify-center gap-2`).

### A. Primary CTA Button (`.btn-primary`)
* **Usage:** Main conversion actions (*Conocer la plataforma*, *Registrarse*, *Sumate como Expert*).
* **CSS Class:** `bg-primary hover:bg-[#3db067] text-white py-2.5 px-5 rounded-full font-bold text-sm shadow-sm transition-all hover:scale-[1.02] active:scale-95 inline-flex items-center justify-center gap-2`

### B. Secondary CTA Button - Dark/Hero Variant (`.btn-secondary-hero`)
* **Usage:** Secondary actions over dark overlays or images (*Soy piloto de drone*).
* **CSS Class:** `bg-white/10 hover:bg-white/20 border border-white/40 text-white py-2.5 px-5 rounded-full font-semibold text-sm backdrop-blur-sm transition-all active:scale-95 inline-flex items-center justify-center gap-2`

### C. Secondary CTA Button - Light/Outline Variant (`.btn-outline`)
* **Usage:** Secondary actions on light surfaces (*Ir a la plataforma*).
* **CSS Class:** `border border-slate-300 text-slate-800 hover:border-primary hover:text-primary hover:bg-emerald-50/50 py-2 px-4.5 rounded-full font-semibold text-sm transition-all inline-flex items-center justify-center gap-2`

### D. Benefit / Feature Pills (`.benefit-pill`)
* **Usage:** Service parameters, crop chips, and technical stats.
* **CSS Class:** `bg-slate-50 border border-slate-200 rounded-xl py-2 px-3.5 flex items-center gap-2.5 text-sm font-semibold text-slate-700 hover:border-primary/50 hover:bg-white transition-all`

---

## 5. Mobile & Responsive Layout Rules (Organisms)

### Grid & Column Constraints
* **Process Flow (6 Steps):** Must use **1 column in mobile (`grid-cols-1`)**, switching to 2-3 columns on tablets (`sm:grid-cols-2 md:grid-cols-3`) and 6 columns on desktop (`lg:grid-cols-6`).
* **Service Pills & Sub-tabs:** Must use `grid-cols-1` on mobile to prevent text wrapping into 4+ lines.
* **Stats Counter Cards:** Internal padding `p-5 md:p-6`. Stat numbers `text-3xl sm:text-4xl font-extrabold text-primary`. Stat labels `text-sm font-bold text-slate-700`. Partner logos upscaled to `h-8 sm:h-10`.

### Tablet Layout Constraints (768px - 1023px)
* **Hero Section Constraint:** Must use natural height (`min-h-[80vh] md:min-h-[85vh]`). The SVG animation container must be constrained with `max-h-[380px] md:max-h-[420px]` to prevent vertical stretching and viewport overflow.

---

## 6. Media, Modals & Quality Standards

* **Modal Overlay:** `fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4`.
* **Modal Surface:** `rounded-3xl bg-white shadow-2xl border border-slate-200 max-h-[90vh] my-auto overflow-hidden`.
* **Mandatory Accessibility Attributes:**
  * Mobile Menu Toggle: `aria-label="Abrir menú de navegación"`
  * Carousel Arrows: `aria-label="Anterior testimonio"` / `aria-label="Siguiente testimonio"`
  * Close Buttons: `aria-label="Cerrar ventana"`
* **Image Optimization:** All production photos must be served in `.webp` or compressed `.jpg` under 200KB. Raw original files (`>1MB`) must be excluded from web bundles.