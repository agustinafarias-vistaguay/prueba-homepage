# Vistaguay AgTech - Documentación del Proyecto

Sitio web institucional de Vistaguay AgTech para conectar productores agrícolas, asesores y empresas con pilotos de drones y servicios de analítica de precisión.

---

## Estructura de Archivos y Módulos

### Módulos JavaScript (`js/`)
Módulos Vanilla JS encapsulados bajo el patrón IIFE (Immediately Invoked Function Expression) para evitar la contaminación de la memoria global:

| Archivo | Descripción | Tipo / Estado |
| :--- | :--- | :--- |
| `js/main.js` | Menú mobile, modal de descarga, lazy loading de video, portapapeles y throttling de scroll reveal. | Global (`window`) |
| `js/solutions.js` | Selector de solapas de servicios, sub-tabs de malezas y apertura de modales. | Encapsulado (IIFE + `window`) |
| `js/testimonials.js` | Carrusel 3D de testimonios en bucle continuo con controles de navegación. | Encapsulado (IIFE + `window`) |
| `js/business.js` | Carrusel de modelo de negocio y animación interactiva de solicitud de vuelo. | Encapsulado (IIFE) |
| `js/weed-combo.js` | Modal interactivo que muestra la combinación de Mapeo de Malezas y Conteo de Plantas. | Encapsulado (IIFE + `window`) |
| `js/process-flow.js` | Control del slider y pasos explicativos del proceso de trabajo. | Encapsulado (IIFE) |
| `js/pilots-map.js` | Mapa Leaflet.js en modo oscuro con puntos titilantes y dataset de cobertura. | Encapsulado (IIFE) |
| `js/stats.js` | Animación de contadores numéricos al entrar en pantalla vía `IntersectionObserver`. | Encapsulado (IIFE) |
| `js/ecosystem-animation.js` | Renderizado y control de la animación interactiva de nodos en la sección Hero. | Encapsulado (IIFE) |
| `js/tailwind-config.js` | Tokens de diseño, paleta de colores y tipografía fluida mediante `clamp()`. | Config Global |

### Hojas de Estilo CSS (`css/`)
Estilos divididos por capas de uso:

* **`css/components.css`**: Componentes UI reutilizables (`.btn-circle-icon`, `.benefit-pill`, `.testimonial-card`).
* **`css/animations.css`**: Reglas `@keyframes`, carrusel infinito de marcas (`.animate-scroll`) y efectos de revelado al scroll.
* **`css/leaflet-custom.css`**: Estilos del tema oscuro, tooltips y ajustes visuales para el mapa Leaflet.

### Datos y Recursos (`data/` y `images/`)
* **`data/pilots.json`**: Dataset con coordenadas geográficas de pilotos para simular la cobertura en el mapa.
* **`images/`**: Activos visuales optimizados (compresión estandarizada $<200\text{ KB}$ por imagen para agilizar la carga web).

### Configuración para IAs (`.agents/`)
* **`.agents/design.md`**: Sistema de diseño UI/UX (tokens de color, tipografía fluida, botones y elevaciones).
* **`.agents/rules.md`**: Reglas técnicas de arquitectura (modularidad CSS/JS, accesibilidad y exposición al objeto global `window`).

---

## Uso de la carpeta `.agents/` en Prompts

Para solicitar cambios a un asistente de IA (Antigravity, Cursor, Copilot, ChatGPT, Claude), hacé referencia a estos archivos según el tipo de tarea:

### Cambios de Diseño o Estilos (HTML / CSS)
> "Agregá un nuevo botón en la sección de soluciones siguiendo los tokens y la jerarquía de `@.agents/design.md`."

### Funciones JavaScript o Nuevos Archivos
> "Creá el script para el modal basándote en `@.agents/rules.md` para mantener el código modular, exponer las funciones necesarias a `window` y cumplir con las normas de accesibilidad."

### Secciones Completas o Refactorizaciones
> "Vamos a crear una nueva sección. Consultá `@.agents/design.md` para los estilos visuales y `@.agents/rules.md` para la estructura del código."

---

## Optimización de Imágenes
Se ha implementado un script de optimización para comprimir imágenes y mejorar los tiempos de carga. El script reduce el tamaño de las imágenes a menos de 200 KB.

### Ubicación del script
Descargá `optimize_images.py` desde Google Drive en la ruta:
`Vistaguay` ➔ `Área Producto` ➔ `Herramientas`

### Uso
* Copiá el archivo `optimize_images.py` a la raíz de este proyecto.
   * Instalá la dependencia necesaria (solo la primera vez):
     ```bash
     pip install Pillow
     ```
   * Ejecutá el script desde la terminal:
     ```bash
     # En Windows:
     py optimize_images.py

     # En Mac / Linux:
     python3 optimize_images.py
     ```

### Notas
- El script busca imágenes en la carpeta `images/` y subcarpetas.
- Omitirá archivos SVG y archivos que ya tengan `-origin` en el nombre.
- Para que el reemplazo de archivos funcione correctamente, se recomienda cerrar cualquier programa que pueda estar utilizando las imágenes (ej: vista previa).

---

## Ejecución en Entorno Local

Para evitar bloqueos de seguridad CORS al leer `data/pilots.json` con `fetch()`, iniciá la web mediante un servidor local:

**Opción A (VS Code):**
Hacer clic derecho sobre `index.html` ➔ **Open with Live Server**.

**Opción B (Terminal Python):**
```bash
python -m http.server 8000