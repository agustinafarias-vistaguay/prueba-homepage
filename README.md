# Vistaguay AgTech - Documentación del Proyecto

Sitio web institucional de Vistaguay AgTech para conectar productores agrícolas, asesores y empresas con pilotos de drones y servicios de analítica de precisión.

---

## 🛡️ Arquitectura de Contingencia y Seguridad (Fallback System)

### Contexto del Formulario
Este flujo aplica al **Formulario de Propuesta para Desarrolladores de Algoritmos** (ubicado en la sección donde desarrolladores y partners postulan sus modelos de procesamiento agrícola para integrarse al ecosistema de Vistaguay).

### Contexto de Infraestructura Actual
Actualmente, la instancia principal de automatización (**n8n**) opera en un servidor local (*on-premise*). Dado que la disponibilidad de este servicio depende del estado activo y la conectividad de dicho servidor, la arquitectura del frontend (`js/form-dev.js`) implementa un **sistema de conmutación por error (fallback)** transparente con un tiempo de espera (*timeout*) de 5 segundos.

### Flujo de Respaldo y Recuperación Automática

1. **Envío Principal (n8n):** El formulario envía la propuesta directamente al webhook principal de n8n, el cual procesa los datos, actualiza la base de datos centralizada (Google Sheets) y envía notificaciones automáticas (ej. WhatsApp).
2. **Conmutación por Error (Fallback):** Si la petición a n8n falla o no responde dentro del límite de 5 segundos, el frontend conmuta de forma transparente hacia el proxy serverless.
3. **Cloudflare Worker (Proxy Serverless):** La solicitud es atajada por el Worker `vistaguay-backup`. Este procesa los datos y se autentica mediante **Fine-Grained Personal Access Tokens (PATs) cifrados** guardados en sus variables de entorno, evitando exponer credenciales en el navegador del cliente.
   * **Administración y Acceso:** Este Worker está configurado y desplegado dentro de la cuenta institucional de Cloudflare asociada al correo `admin@vistaguay.com`.
4. **Persistencia Temporal en GitHub (`data/backups/`):** El Worker genera un archivo con el formato `lead_[TIMESTAMP].json` dentro de la ruta `data/backups/`.
   * **Importancia del `.gitkeep`:** Preserva la estructura del directorio `data/backups/` dentro del repositorio de Git. Esto garantiza que la API de GitHub encuentre la carpeta de destino lista para recibir registros sin lanzar errores de ruta vacía.
5. **Procesamiento y Limpieza Automática vía Cron:** Cuando la máquina/servidor local de n8n se restablece, un flujo programado (**Cron Job**) dentro de n8n escanea periódicamente el directorio `data/backups/` de GitHub. Lee los JSON acumulados, re-inserta las propuestas pendientes en Google Sheets, dispara las notificaciones correspondientes y **elimina automáticamente los archivos JSON procesados** de GitHub para evitar la acumulación de archivos innecesarios en el repositorio.

### Roadmap Técnico (Migración a AWS)
Este mecanismo de contingencia (Frontend -> Cloudflare Worker -> GitHub -> Cleanup Cron) fue diseñado como una red de seguridad temporal debido a la naturaleza local del backend. Cuando la infraestructura de n8n sea migrada a una instancia en la nube de alta disponibilidad (AWS EC2 / ECS / Serverless), este flujo conservará únicamente su rol como sistema de respaldo secundario ante caídas críticas.

## Estructura de Archivos y Módulos

### Módulos JavaScript (`js/`)
Módulos Vanilla JS encapsulados bajo el patrón IIFE (Immediately Invoked Function Expression) para evitar la contaminación de la memoria global:

| Archivo | Descripción | Tipo / Estado |
| :--- | :--- | :--- |
| `js/main.js` | Menú mobile, modales (`#download-modal`, `#algo-modal`), control global de pausas de animaciones, videos, copia al portapapeles y lazy loading de iframe. | Global (`window`) |
| `js/solutions.js` | Selector de solapas de servicios, sub-tabs de malezas y apertura de modales. | Encapsulado (IIFE + `window`) |
| `js/testimonials.js` | Carrusel 3D de testimonios en bucle continuo optimizado con `IntersectionObserver`. | Encapsulado (IIFE + `window`) |
| `js/business.js` | Carrusel de modelo de negocio, sincronización de tarjetas y paginación por cápsulas fijas. | Encapsulado (IIFE) |
| `js/brand.js` | Animaciones y lógica interactiva de la diapositiva de presencia de marca en mobile. | Encapsulado (IIFE) |
| `js/dashboard.js` | Transiciones y cambio de escena Light/Dark en la diapositiva de tableros de control. | Encapsulado (IIFE) |
| `js/form-dev.js` | Validación, prevención de errores y envío de propuesta para el formulario de algoritmos. | Encapsulado (IIFE + `window`) |
| `js/icons.js` | Librería centralizada de íconos SVG para inyección limpia mediante `getIcon()`. | Global (`window`) |
| `js/weed-combo.js` | Modal interactivo que muestra la combinación de Mapeo de Malezas y Conteo de Plantas. | Encapsulado (IIFE + `window`) |
| `js/process-flow.js` | Control del slider y pasos explicativos del proceso de trabajo. | Encapsulado (IIFE) |
| `js/pilots-map.js` | Mapa Leaflet.js estático no interactivo en modo oscuro con puntos titilantes y dataset de cobertura. | Encapsulado (IIFE) |
| `js/stats.js` | Animación de contadores numéricos al entrar en pantalla vía `IntersectionObserver`. | Encapsulado (IIFE) |
| `js/ecosystem-animation.js` | Renderizado y control de la animación interactiva de nodos en la sección Hero. | Encapsulado (IIFE) |

### Hojas de Estilo CSS (`css/`)
Estilos divididos por capas de uso según la metodología Tailwind CLI:

* **`css/inputs.css`**: Archivo fuente donde se importan las directivas de Tailwind (`@tailwind base`, `@tailwind components`, `@tailwind utilities`).
* **`css/output.css`**: CSS final minificado generado automáticamente por el compilador CLI de Tailwind v3.
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

## Compilación de Estilos (Tailwind CLI)

Cada vez que se modifiquen clases de utilidad en los archivos HTML o en `css/inputs.css`, **es obligatorio ejecutar el comando de compilación en la terminal de VS Code** para regenerar `css/output.css`:

```powershell
npx tailwindcss -i ./css/inputs.css -o ./css/output.css --minify
```

> [!IMPORTANT]
> **No edites `css/output.css` directamente.** Este archivo es generado automáticamente y cualquier cambio manual será sobrescrito en la próxima compilación.

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