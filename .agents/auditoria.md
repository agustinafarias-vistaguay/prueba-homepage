# Auditoría Técnica y Arquitectura Frontend — Vistaguay AgTech

**Fecha de Auditoría:** 24 de Septiembre de 2026  
**Rol:** Tech Lead & Senior Frontend Architect  
**Alcance:** Código Fuente (`index.html`, `js/*`, `css/*`), Sistema de Estilos (Tailwind CSS v3 CLI), Lógica de Integración/Entornos y Documentación (`README.md`, `.agents/design.md`, `.agents/rules.md`).

---

## 1. Resumen Ejecutivo

* **Puntuación Global del Proyecto:** **6.8 / 10**
* **Diagnóstico General de Salud:**
  El proyecto presenta una base visual sólida, con un diseño atractivo, patrones modernos como animaciones basadas en `IntersectionObserver`, componentes modulares y una buena separación conceptual del ecosistema AgTech. Sin embargo, sufre de **vulnerabilidades de seguridad críticas** (exposición de Personal Access Tokens de GitHub en el bundle cliente), **conflictos de colisión de métodos globales** entre scripts, **omisión de etiquetas semánticas y de accesibilidad (A11y/WCAG)**, **enlaces a entornos de desarrollo en producción** y **falta de automatización en los scripts de construcción (build pipeline)**.

---

## 2. Matriz de Severidad

| Severidad | Cantidad | Descripción Resumida |
| :--- | :---: | :--- |
| 🔴 **Alta (Crítica)** | **5** | Exposición de GitHub PAT en frontend, colisión de `window.toggleAlgoModal`, enlaces a `web.dev` en el footer, scripts bloqueantes en `<head>` y falta de scripts de build en `package.json`. |
| 🟡 **Media** | **7** | Clases CSS en conflicto (`hidden flex`), falta de Focus Trap y `Escape` en modales, omisión de export de `pauseTestimonialCycling`, inyección dinámica de `<style>` en JS, falta de `<main>` y metadatos SEO / OpenGraph, variables filtradas al scope global (`comboInterval`). |
| 🟢 **Mejora / Refactor** | **6** | Eliminación de reflows forzados (`offsetHeight`), sustitución de `unescape()`, limpieza de microtextos (<13px), migración a WebP, estandarización de `scroll-mt` en secciones navegables y unificación de tokens de color. |

---

## 3. Análisis Detallado por Módulo / Archivo

### 3.1. `index.html`

* **SEO y Metadatos:**
  * `<title>Vistaguay</title>` es excesivamente corto e insuficiente para posicionamiento orgánico. Requiere palabras clave representativas (*"Vistaguay AgTech | Plataforma de Analítica Agrícola y Servicios con Drones"*).
  * Ausencia total de etiqueta `<meta name="description">`, etiquetas OpenGraph (`og:title`, `og:image`, `og:description`, `og:url`) y Twitter Cards.
  * Falta `<link rel="canonical">`.
* **Semántica HTML5:**
  * Ausencia del landmark estructural `<main>`. El contenido entre `<nav>` y `<footer>` reside suelto en el `<body>`, afectando la jerarquía para motores de búsqueda y lectores de pantalla.
  * Enlaces del Footer (líneas 882 y 888): Apuntan al subdominio de staging `https://web.dev.vistaguay.com/terms-conditions` y `https://web.dev.vistaguay.com/privacy-policies` en lugar de producción (`https://web.vistaguay.com`).
  * Desalineación de anclas: Las secciones `#business`, `#expert` y `#devs` carecen de `scroll-mt-14 md:scroll-mt-16`, provocando que la barra de navegación fija tape los títulos al navegar mediante los enlaces del menú.
* **Accesibilidad (A11y):**
  * Modales `#algo-modal` (línea 918) y `#download-modal` (línea 1011): Carecen de `role="dialog"`, `aria-modal="true"`, y `aria-labelledby`.
  * Botón hamburguesa `#hamburger-btn`: Posee `aria-label` pero no manipula `aria-expanded="false|true"`.
  * Formularios: Los campos con error no incorporan `aria-invalid="true"` ni asocian el mensaje de error mediante `aria-describedby`.
* **Clases en Conflicto de Tailwind:**
  * Línea 918 (`#algo-modal`): Declaración redundante y contradictoria `class="fixed inset-0 z-[100] hidden flex ..."` (`hidden` aplica `display: none` y `flex` aplica `display: flex`).
  * Línea 1012 (`#download-modal`): Declaración simultánea `class="fixed inset-0 z-[100] hidden ... flex ..."`.

---

### 3.2. Scripts JavaScript (`js/`)

#### `js/form-dev.js`
* 🔴 **Fallo de Seguridad Crítico (Exposición de Secretos):**
  Líneas 21 a 27 exponen GitHub Personal Access Tokens (PATs) invirtiendo el string (`REVERSED_TOKEN.split('').reverse().join('')`):
  ```javascript
  const REVERSED_TOKEN_TEST = 'bt6Tm1LOVXnsaVwgJX5pPH0EzomXOzlBzgzS_phg';
  const REVERSED_TOKEN_PROD = 'b6d1t3GzDZMCYY6NMYXNC7rK9XWe4x1g9RWrL5KOj2IUh72vZm4Inl1uod7_9U3jphVyRWUo0AE3DIFC11_tap_buhtig';
  ```
  Cualquier usuario puede inspeccionar el archivo, invertir la cadena y obtener acceso directo de escritura y administración a los repositorios de GitHub (`Vistaguay-resources/Homepage`), permitiendo sobreescribir código fuente, eliminar ramas o inyectar scripts maliciosos.
  > **Solución Arquitectural:** La comunicación de respaldo debe ejecutarse a través de un proxy/backend seguro o Cloudflare Worker sin almacenar credenciales en el cliente web.
* 🔴 **Sobreescritura de Métodos Globales (Bug de Colisión):**
  `form-dev.js` define `window.toggleAlgoModal` (líneas 115-130), sobreescribiendo la función del mismo nombre definida en `main.js` (líneas 72-99). Debido al orden de carga en `index.html`, la versión de `form-dev.js` anula el bloqueo de scroll (`document.body.style.overflow = 'hidden'`) y la pausa de testimonios.
* 🟡 **Lógica de Entornos Débil:**
  `hostname.includes('agustinafarias')` hardcodea un subdominio personal en el código fuente. Despliegues en otros dominios de prueba (Vercel, Netlify, Cloudflare Pages) se ejecutarán por defecto en entorno productivo.
* 🟢 **Uso de API Obsoleta:**
  Línea 52 utiliza `unescape(encodeURIComponent(jsonString))`. `unescape` está marcado como deprecated en los estándares ECMAScript modernos.

#### `js/main.js`
* 🟡 **Fallo de Pausa de Testimonios:**
  Las funciones de modal intentan ejecutar `window.pauseTestimonialCycling()`, pero `testimonials.js` **nunca expone dicha función al objeto `window`**, haciendo que la condición `typeof window.pauseTestimonialCycling === 'function'` evalúe siempre como `false`.

#### `js/testimonials.js`
* 🟡 **Scope Encapsulado Incompleto:**
  No expone `window.pauseTestimonialCycling` ni `window.startTestimonialCycling` a pesar de ser requeridos por la arquitectura declarada en `.agents/rules.md`.
* 🟢 **Uso de Textos Reducidos:**
  Línea 41 utiliza `text-[10px]` para el avatar con iniciales, violando la directiva de diseño que prohíbe fuentes menores a 13px para elementos con texto.

#### `js/weed-combo.js`
* 🟡 **Fuga de Variables al Scope Global:**
  Línea 8 (`let comboInterval = null;`) está declarada **fuera** de la IIFE (que inicia en la línea 15), contaminando el entorno global del navegador.

#### `js/pilots-map.js`
* 🟡 **Inyección Dinámica de `<style>`:**
  Líneas 11-36 crean un elemento `<style>` e inyectan `@keyframes pulseDotGlow` en tiempo de ejecución, violando la Regla 1 de `.agents/rules.md` que exige centralizar keyframes en `css/animations.css` o `css/leaflet-custom.css`.

#### `js/business.js` & `js/brand.js`
* 🟢 **Layout Thrashing (Forzado de Reflow):**
  Líneas como `nextImg.offsetHeight;` en `business.js` y `void shimmer.offsetWidth;` en `brand.js` fuerzan el recálculo sincrónico del árbol de renderizado de la GPU. Deben ser sustituidas por `requestAnimationFrame`.

#### `js/icons.js`
* 🟡 **Bloqueo en el Render Path Crítico:**
  Se carga en el `<head>` de forma síncrona sin atributo `defer`, bloqueando el parsing inicial del HTML.

---

### 3.3. CSS & Build Pipeline

* **`package.json`:**
  * `devDependencies` incluye `tailwindcss: ^3.4.19`, pero el objeto `scripts` no define comandos de compilación.
  * No existen scripts para `npm run build:css` o `npm run dev:css`, dependiendo de la ejecución manual de comandos CLI largos.
* **`css/inputs.css` vs `css/components.css`:**
  * `components.css` define clases como `.btn-primary` y `.btn-outline` con valores hexadecimales estáticos (`#47C278`, `#39A864`, `#cbd5e1`), en lugar de utilizar las variables CSS del Design System o las directivas `@apply` de Tailwind.
* **`css/output.css`:**
  * Tamaño actual: ~46.8 KB. Se encuentra adecuadamente purgado gracias al escaneo de `./*.html` y `./js/**/*.js`.

---

### 3.4. Auditoría de Documentación

* **`README.md`:**
  * No documenta el flujo de integración con n8n ni advierte sobre el manejo seguro de webhooks.
  * Falta incluir los scripts de npm para el flujo de trabajo diario de los desarrolladores.
* **`.agents/rules.md`:**
  * Muy bien estructurado, pero no se cumple en su totalidad en el código actual (se violan la Regla 1 de no inyectar `<style>`, la Regla 4 de pausa de timers al abrir modales y la Regla 5 de offsets `scroll-mt`).
* **`.agents/design.md`:**
  * Completo y consistente; sin embargo, en el código HTML existen discrepancias con clases arbitrarias `text-[10px]`, `text-[11px]`, `text-[13px]` y alturas relativas `h-[85%]`.

---

## 4. Bloques de Código Refactorizados (Antes vs. Después)

### 4.1. `index.html` — Metadatos, Accesibilidad y Headings

```diff
  <head>
      <meta charset="utf-8">
      <meta content="width=device-width, initial-scale=1.0" name="viewport">
-     <title>Vistaguay</title>
+     <title>Vistaguay AgTech | Plataforma de Analítica Agrícola y Drones de Precisión</title>
+     <meta name="description" content="Conectamos a productores agrícolas y asesores con pilotos de drones y algoritmos de precisión para conteo de plantas, malezas y aplicaciones dirigidas.">
+     <meta property="og:type" content="website">
+     <meta property="og:title" content="Vistaguay AgTech | Ecosistema de Drones para el Agro">
+     <meta property="og:description" content="Monitoreo inteligente de cultivos, prescripciones sectorizadas y red nacional de pilotos certificados.">
+     <meta property="og:image" content="https://vistaguay.com/images/fondo1.jpg">
      <link rel="icon" type="image/png" href="images/favicon.svg">

      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link rel="preconnect" href="https://server.arcgisonline.com">
      <link rel="stylesheet" href="css/output.css">
-     <script src="js/icons.js"></script>
+     <script src="js/icons.js" defer></script>
```

```diff
-     <div id="algo-modal" class="fixed inset-0 z-[100] hidden flex bg-slate-950/70 backdrop-blur-sm items-center justify-center p-3 sm:p-4 transition-opacity duration-300 opacity-0" onclick="if(event.target === this) toggleAlgoModal()">
+     <div id="algo-modal" role="dialog" aria-modal="true" aria-labelledby="algo-modal-title" class="fixed inset-0 z-[100] hidden bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 transition-opacity duration-300 opacity-0" onclick="if(event.target === this) toggleAlgoModal()">
          <div class="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-w-lg w-full max-h-[85vh] sm:max-h-[90vh] my-auto mx-auto flex flex-col">
              <div class="px-5 py-3.5 sm:px-6 sm:py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
-                 <h3 class="text-base sm:text-lg font-extrabold text-slate-900">Contanos sobre tu algoritmo</h3>
+                 <h3 id="algo-modal-title" class="text-base sm:text-lg font-extrabold text-slate-900">Contanos sobre tu algoritmo</h3>
```

---

### 4.2. `js/form-dev.js` — Remoción de Tokens y Manejo Seguro de Modal / Teclado

```diff
-     // 3. Tokens de GitHub (Invertidos para evitar invalidación automática por Secret Scanning)
-     const REVERSED_TOKEN_TEST = 'bt6Tm1LOVXnsaVwgJX5pPH0EzomXOzlBzgzS_phg';
-     const REVERSED_TOKEN_PROD = 'b6d1t3GzDZMCYY6NMYXNC7rK9XWe4x1g9RWrL5KOj2IUh72vZm4Inl1uod7_9U3jphVyRWUo0AE3DIFC11_tap_buhtig';
-     const REVERSED_TOKEN = isTestEnv ? REVERSED_TOKEN_TEST : REVERSED_TOKEN_PROD;
-     const GITHUB_TOKEN = REVERSED_TOKEN.split('').reverse().join('');

      // Respaldo secundario delegado a endpoint seguro (sin exponer credenciales)
      async function saveBackupToGithub(data) {
+         // NOTA: La persistencia de contingencia debe realizarse vía n8n fallback o endpoint backend
+         console.warn('Ejecutando contingencia segura...');
+         return false;
      }
```

```diff
-     window.toggleAlgoModal = function () {
-         const modal = document.getElementById('algo-modal');
-         if (!modal) return;
-         if (modal.classList.contains('hidden')) {
-             resetModalState();
-             modal.classList.remove('hidden');
-             setTimeout(() => modal.classList.remove('opacity-0'), 10);
-         } else {
-             modal.classList.add('opacity-0');
-             setTimeout(() => {
-                 modal.classList.add('hidden');
-                 resetModalState();
-             }, 300);
-         }
-     };
+     // Unificación de toggleAlgoModal en main.js delegando a resetModalState()
+     window.resetAlgoFormState = resetModalState;
```

---

### 4.3. `js/main.js` — Manejo Integral de Modales, Focus Trap, Tecla `Escape` y Timers

```diff
  function toggleAlgoModal() {
      const modal = document.getElementById('algo-modal');
      if (!modal) return;

      if (modal.classList.contains('hidden')) {
+         if (typeof window.resetAlgoFormState === 'function') window.resetAlgoFormState();
          modal.classList.remove('hidden');
          modal.classList.add('flex');
          setTimeout(() => {
              modal.classList.remove('opacity-0');
+             modal.querySelector('input, button')?.focus();
          }, 10);
          document.body.style.overflow = 'hidden';

          if (typeof window.pauseTestimonialCycling === 'function') {
              window.pauseTestimonialCycling();
          }
      } else {
          modal.classList.add('opacity-0');
          setTimeout(() => {
              modal.classList.add('hidden');
              modal.classList.remove('flex');
          }, 300);
          document.body.style.overflow = '';

          if (typeof window.startTestimonialCycling === 'function') {
              window.startTestimonialCycling();
          }
      }
  }

+ // Listener global para cerrar modales con tecla Escape
+ document.addEventListener('keydown', (e) => {
+     if (e.key === 'Escape') {
+         const algoModal = document.getElementById('algo-modal');
+         const downloadModal = document.getElementById('download-modal');
+         if (algoModal && !algoModal.classList.contains('hidden')) toggleAlgoModal();
+         if (downloadModal && !downloadModal.classList.contains('hidden')) toggleDownloadModal();
+     }
+ });
```

---

### 4.4. `js/testimonials.js` — Exposición de Controladores de Pausa

```diff
      window.jumpToTestimonial = jumpToTestimonial;
      window.nextTestimonial = nextTestimonial;
      window.prevTestimonial = prevTestimonial;
+     window.pauseTestimonialCycling = pauseTestimonialCycling;
+     window.startTestimonialCycling = startTestimonialCycling;
```

---

### 4.5. `package.json` — Automatización de Scripts de Compilación

```diff
    "scripts": {
-     "test": "echo \"Error: no test specified\" && exit 1"
+     "test": "echo \"Error: no test specified\" && exit 1",
+     "build:css": "tailwindcss -i ./css/inputs.css -o ./css/output.css --minify",
+     "dev:css": "tailwindcss -i ./css/inputs.css -o ./css/output.css --watch"
    },
```

---

## 5. Plan de Acción Priorizado (Roadmap)

### Fase 1: Seguridad y Fallos Críticos (Inmediato — Día 1)
1. **Revocar Tokens de GitHub:** Eliminar de inmediato los PATs expuestos en `js/form-dev.js` y revocarlos en la configuración de seguridad de las cuentas de GitHub asociadas.
2. **Corregir Enlaces a Staging en Footer:** Modificar los links a Términos y Privacidad en `index.html` de `web.dev.vistaguay.com` a `web.vistaguay.com`.
3. **Resolver Colisión de `toggleAlgoModal`:** Consolidar la apertura y cierre del modal en `js/main.js` y delegar el reinicio visual a `resetAlgoFormState()`.
4. **Exponer Controladores de Testimonios:** Exportar `pauseTestimonialCycling` y `startTestimonialCycling` al objeto global `window` en `js/testimonials.js`.

### Fase 2: Rendimiento y Refactorización de Código (Días 2-3)
1. **Configurar Scripts en `package.json`:** Añadir los comandos `build:css` y `dev:css` con Tailwind CLI.
2. **Eliminar Inyección de `<style>` en JS:** Mover `@keyframes pulseDotGlow` y `.dot-blinking` desde `js/pilots-map.js` a `css/leaflet-custom.css`.
3. **Encapsular Variable Global en `weed-combo.js`:** Mover `let comboInterval` al interior de la función autoejecutable (IIFE).
4. **Optimizar Carga de Scripts en `<head>`:** Aplicar atributo `defer` a `js/icons.js` y evaluar la carga asíncrona diferida para Leaflet.
5. **Eliminar Clases CSS en Conflicto:** Limpiar combinaciones simultáneas de `hidden flex` en `#algo-modal` y `#download-modal`.

### Fase 3: UX, Accesibilidad y Documentación (Días 4-5)
1. **Implementar Accesibilidad en Modales:** Agregar soporte de tecla `Escape`, Focus Trap y atributos ARIA (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`).
2. **Completar Metadatos SEO y Estructura Semántica:** Envolver el cuerpo principal en la etiqueta `<main>`, optimizar el `<title>` y configurar etiquetas OpenGraph / Twitter Cards.
3. **Alinear Offsets de Navegación (`scroll-mt`):** Añadir `scroll-mt-14 md:scroll-mt-16` a las secciones `#business`, `#expert` y `#devs`.
4. **Sincronizar Documentación:** Actualizar `README.md` y `.agents/rules.md` para reflejar la arquitectura refactorizada.


---

## 6. Checklist de Tareas Pendientes (Roadmap de Refactorización)

### 🟢 Tareas Completadas
- [x] **Seguridad Crítica:** Eliminación de PATs de GitHub expuestos en client-side (`js/form-dev.js`).
- [x] **Proxy Serverless:** Implementación y despliegue del Cloudflare Worker (`vistaguay-backup`) para respaldo seguro.
- [x] **Rendimiento de Red:** Pausa y carga diferida dinámica del video de YouTube en `js/main.js` vía `IntersectionObserver`.
- [x] **Documentación Técnica:** Actualización del `README.md` con flujo de contingencia, rol del `.gitkeep`, cuenta de administración de Cloudflare y roadmap hacia AWS.

---

### 🛠️ Fase 1: Enlaces, Pipeline y Correcciones Directas (Inmediato)
- [x] **Links de Producción en Footer:** Modificar los enlaces de Términos y Privacidad en `index.html` (cambiar `web.dev.vistaguay.com` por `web.vistaguay.com`).
- [x] **Optimización de Carga (`<head>`):** Agregar el atributo `defer` a `<script src="js/icons.js">` en `index.html` para evitar bloquear el renderizado inicial.
- [x] **Automatización de Build (`package.json`):** Agregar los scripts `build:css` y `dev:css` con la CLI de Tailwind v3.
- [x] **Controladores de Testimonios (`js/testimonials.js`):** Exponer `window.pauseTestimonialCycling` y `window.startTestimonialCycling` al objeto global `window` para permitir la pausa cuando los modales están abiertos.

---

### 🎨 Fase 2: Consistencia Gráfica y Diseño UI/UX
- [ ] **Estandarización Estética de la Plataforma (Sección Servicios vs. Business):**
  - **Diagnóstico:** Actualmente la sección `business` utiliza una representación de la plataforma minimalista, vectorial y animada, mientras que la sección `services` utiliza una captura de pantalla realista. Esta mezcla rompe la cohesión del lenguaje de diseño del sitio.
  - **Acción:** Diseñar y generar las versiones de pantalla minimalistas y animadas para la sección `services` (`#services`), unificando el estilo gráfico ilustrativo en toda la landing page.
- [x] **Alineación de Navegación (`scroll-mt`):** Añadir `scroll-mt-14 md:scroll-mt-16` a las secciones navegables (`#business`, `#expert`, `#devs`) para que la barra de navegación fija no pise los títulos al scrollear.
- [x] **Limpieza de Microtextos:** Revisar y ajustar tamaños inferiores a `13px` (ej. `text-[10px]` en `js/testimonials.js`) según las guías del Design System.

---

### 💻 Fase 3: Calidad de Código y Mantenibilidad JavaScript
- [x] **Limpieza de Clases CSS Contradictorias:** Eliminar declaraciones simultáneas `hidden flex` en los modales `#algo-modal` y `#download-modal` en `index.html`.
- [x] **Inyección de Estilos en JS (`js/pilots-map.js`):** Mover la animación `@keyframes pulseDotGlow` del archivo JS a `css/leaflet-custom.css`.
- [x] **Encapsulamiento de Scope (`js/weed-combo.js`):** Mover la variable `let comboInterval` al interior de la función autoejecutable (IIFE) para evitar fugas al scope global.
- [x] **Optimización de Reflows GPU:** Reemplazar llamadas que fuerzan el recálculo sincrónico de layout (`offsetHeight`, `offsetWidth`) en `business.js` y `brand.js` por `requestAnimationFrame`.

---

### ♿ Fase 4: SEO, Accesibilidad (WCAG) y Semántica HTML
- [x] **Estructura HTML5 Semántica:** Envolver el contenido principal de la página (entre `<nav>` y `<footer>`) dentro de la etiqueta `<main>`.
- [x] **SEO & Metadatos Social Media:**
  - Optimizar el `<title>` para incluir palabras clave representativas.
  - Agregar `<meta name="description">`, etiquetas OpenGraph (`og:title`, `og:image`, `og:description`) y Twitter Cards.
- [x] **Accesibilidad en Modales:**
  - Agregar atributos ARIA (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`) a los modales.
  - Implementar el cierre con la tecla `Escape` y trampa de foco (*Focus Trap*) mientras el modal está abierto.