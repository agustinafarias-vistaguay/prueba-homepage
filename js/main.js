/**
 * @file main.js
 * @description Core UI logic including mobile navigation toggling, modal controls, scroll reveal observers, and lazy video loading.
 */

/**
 * Toggles the mobile navigation drawer menu and its hamburger/close icon state.
 * @returns {void}
 */
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const iconMenu = document.getElementById('icon-menu');
    const iconClose = document.getElementById('icon-close');
    if (!menu) return;

    const isClosed = menu.classList.toggle('hidden');

    if (iconMenu && iconClose) {
        if (isClosed) {
            iconMenu.classList.remove('opacity-0', 'pointer-events-none');
            iconMenu.classList.add('opacity-100');

            iconClose.classList.remove('opacity-100');
            iconClose.classList.add('opacity-0', 'pointer-events-none');
        } else {
            iconMenu.classList.remove('opacity-100');
            iconMenu.classList.add('opacity-0', 'pointer-events-none');

            iconClose.classList.remove('opacity-0', 'pointer-events-none');
            iconClose.classList.add('opacity-100');
        }
    }
}

/**
 * Toggles the visibility of the download modal with smooth backdrop transitions and disables body scroll.
 * @returns {void}
 */
function toggleDownloadModal() {
    const modal = document.getElementById('download-modal');
    if (!modal) return;

    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
        document.body.style.overflow = 'hidden';

        if (typeof window.pauseTestimonialCycling === 'function') {
            window.pauseTestimonialCycling();
        }
    } else {
        modal.style.opacity = '0';
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

/**
 * Toggles the visibility of the algorithm developer modal with smooth backdrop transitions and disables body scroll.
 * @returns {void}
 */
function toggleAlgoModal() {
    const modal = document.getElementById('algo-modal');
    if (!modal) return;

    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
        document.body.style.overflow = 'hidden';

        if (typeof window.pauseTestimonialCycling === 'function') {
            window.pauseTestimonialCycling();
        }
    } else {
        modal.style.opacity = '0';
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

/**
 * Toggles the visibility of the platform selection login modal with smooth backdrop transitions and disables body scroll.
 * @returns {void}
 */
function toggleLoginModal() {
    const modal = document.getElementById('login-modal');
    if (!modal) return;

    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
        document.body.style.overflow = 'hidden';

        if (typeof window.pauseTestimonialCycling === 'function') {
            window.pauseTestimonialCycling();
        }
    } else {
        modal.style.opacity = '0';
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

window.toggleMobileMenu = toggleMobileMenu;
window.toggleDownloadModal = toggleDownloadModal;
window.toggleAlgoModal = toggleAlgoModal;
window.toggleLoginModal = toggleLoginModal;

document.addEventListener('DOMContentLoaded', () => {
    // Control dinámico de reproducción/pausa del video institucional según visibilidad
    const videoIframe = document.getElementById('featured-video');
    if (videoIframe) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Carga y reproduce el video cuando entra al campo de visión
                    if (!videoIframe.src || videoIframe.src.endsWith('about:blank')) {
                        if (videoIframe.dataset.src) {
                            videoIframe.src = videoIframe.dataset.src;
                        }
                    }
                } else {
                    // Corta la descarga por red e interrumpe la reproducción al salir de vista
                    if (videoIframe.src && !videoIframe.src.endsWith('about:blank')) {
                        videoIframe.src = 'about:blank';
                    }
                }
            });
        }, { threshold: 0.25 });

        videoObserver.observe(videoIframe);
    }

    // Revelado progresivo de secciones (.reveal) vía IntersectionObserver
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    obs.unobserve(entry.target); // Una vez visible, deja de observar
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

        reveals.forEach(element => revealObserver.observe(element));
    } else {
        // Fallback de seguridad: activa todo inmediatamente si el navegador no soporta el observador
        reveals.forEach(element => element.classList.add('active'));
    }
});

// Cierre accesible de modales con la tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const algoModal = document.getElementById('algo-modal');
        const downloadModal = document.getElementById('download-modal');
        const loginModal = document.getElementById('login-modal');

        if (algoModal && !algoModal.classList.contains('hidden')) {
            toggleAlgoModal();
        }
        if (downloadModal && !downloadModal.classList.contains('hidden')) {
            toggleDownloadModal();
        }
        if (loginModal && !loginModal.classList.contains('hidden')) {
            toggleLoginModal();
        }
    }
});

window.copyEmailToClipboard = function (event, email) {
    event.preventDefault();

    navigator.clipboard.writeText(email).then(() => {
        const toast = document.getElementById('email-copied-toast');
        if (toast) {
            toast.classList.remove('hidden', 'opacity-0');
            toast.classList.add('opacity-100');

            setTimeout(() => {
                toast.classList.remove('opacity-100');
                toast.classList.add('opacity-0');
                setTimeout(() => toast.classList.add('hidden'), 300);
            }, 2000);
        }
    }).catch(err => {
        console.error('Error al copiar el correo:', err);
    });
};

// 1. Mapeo centralizado de nombres de pestañas
const TAB_TITLES = {
    // Planting Quality
    'tab-producto': 'Ficha Técnica',
    'tab-carga': 'Solicitud del Servicio',
    'tab-interpretacion': 'Interpretar Reporte',

    // Productor B2C / Onboarding
    'tab-registro': 'Creación de Cuenta',
    'tab-estructura': 'Configuración Inicial',
    'tab-tareas': 'Solicitud de Tareas',
    'tab-perfil': 'Edición de Cuenta y Marca',

    // Pilotos Experts (para cuando lo sumes)
    'tab-licencias': 'Registro y Licencias',
    'tab-vuelos': 'Gestión de Vuelos',
    'tab-liquidacion': 'Entrega y Liquidación'
};

// 2. Función de cambio de sección (Desktop + Mobile)
function switchTab(tabId, element = null) {
    if (!tabId) return;

    // A. Mostrar la sección seleccionada y ocultar el resto
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.add('hidden'));
    const target = document.getElementById(tabId);
    if (target) target.classList.remove('hidden');

    // B. Actualizar botones de la sidebar grande (Desktop)
    const sidebar = document.getElementById('sidebar-menu');
    if (sidebar) {
        sidebar.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('sidebar-tab-active');
            btn.classList.add('sidebar-tab-inactive');
        });

        const activeBtn = element || sidebar.querySelector(`button[onclick*="${tabId}"]`);
        if (activeBtn) {
            activeBtn.classList.remove('sidebar-tab-inactive');
            activeBtn.classList.add('sidebar-tab-active');
        }
    }

    // C. Actualizar texto de la barra flotante móvil
    const mobileTitle = document.getElementById('mobile-current-tab-name');
    if (mobileTitle) {
        // 1. Busca en el diccionario TAB_TITLES
        let title = TAB_TITLES[tabId];

        // 2. Fallback escalable: si no está en el diccionario, extrae el texto del botón del DOM
        if (!title && sidebar) {
            const btn = sidebar.querySelector(`button[onclick*="${tabId}"]`);
            if (btn) {
                // Toma el texto del último span (evita el span del icono)
                const textSpan = btn.querySelector('span:not([data-icon])') || btn;
                title = textSpan.textContent.trim();
            }
        }

        if (title) {
            mobileTitle.textContent = title;
        }
    }

    // D. Sincronizar estilo visual activo dentro del desplegable móvil
    const dropdown = document.getElementById('mobile-dropdown-menu');
    if (dropdown) {
        dropdown.querySelectorAll('button').forEach(btn => {
            const isMatch = btn.getAttribute('onclick')?.includes(tabId);
            btn.classList.toggle('bg-primary/10', isMatch);
            btn.classList.toggle('text-primary', isMatch);
            btn.classList.toggle('font-bold', isMatch);
            btn.classList.toggle('text-slate-700', !isMatch);
            btn.classList.toggle('font-semibold', !isMatch);
        });
    }

    // E. Cerrar el menú desplegable móvil
    closeMobileDropdown();

    // F. Subir la pantalla suavemente a la cabecera
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 3. Control del desplegable móvil
function toggleMobileIndex(e) {
    if (e) e.stopPropagation();
    const dropdown = document.getElementById('mobile-dropdown-menu');
    const chevron = document.getElementById('mobile-chevron');
    const btn = document.getElementById('mobile-tab-btn');

    if (dropdown) {
        const isClosed = dropdown.classList.contains('hidden');
        dropdown.classList.toggle('hidden', !isClosed);

        if (chevron) chevron.classList.toggle('rotate-180', isClosed);

        if (btn) {
            btn.classList.toggle('rounded-b-none', isClosed);
        }
    }
}

function closeMobileDropdown() {
    const dropdown = document.getElementById('mobile-dropdown-menu');
    const chevron = document.getElementById('mobile-chevron');
    const btn = document.getElementById('mobile-tab-btn');

    if (dropdown && !dropdown.classList.contains('hidden')) {
        dropdown.classList.add('hidden');
        if (chevron) chevron.classList.remove('rotate-180');
        if (btn) btn.classList.remove('rounded-b-none');
    }
}

// Cierra el menú al tocar en cualquier otra parte de la pantalla
document.addEventListener('click', (e) => {
    const floatingBar = document.getElementById('mobile-floating-bar');
    if (floatingBar && !floatingBar.contains(e.target)) {
        closeMobileDropdown();
    }
});

// 4. Detector de Scroll: Muestra la barra SOLO cuando el índice grande desaparece
window.addEventListener('scroll', () => {
    const mainCard = document.getElementById('main-sidebar-card');
    const floatingBar = document.getElementById('mobile-floating-bar');

    if (!mainCard || !floatingBar) return;

    if (window.innerWidth >= 1024) {
        floatingBar.classList.add('-translate-y-full', 'opacity-0', 'pointer-events-none');
        floatingBar.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
        return;
    }

    const cardRect = mainCard.getBoundingClientRect();
    const isCardOutOfView = cardRect.bottom < 60;

    if (isCardOutOfView) {
        floatingBar.classList.remove('-translate-y-full', 'opacity-0', 'pointer-events-none');
        floatingBar.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
    } else {
        floatingBar.classList.add('-translate-y-full', 'opacity-0', 'pointer-events-none');
        floatingBar.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
        closeMobileDropdown();
    }
}, { passive: true });

// Exportación global
window.switchTab = switchTab;
window.toggleMobileIndex = toggleMobileIndex;
window.closeMobileDropdown = closeMobileDropdown;

/**
 * Alterna entre vistas de plataforma ('app' o 'web') dentro de cualquier contenedor segmentado.
 * @param {string} containerId - ID del contenedor padre (ej: 'paso-crear-campana', 'paso-crear-proyecto', 'paso-crear-lotes', 'paso-acceso-lote')
 * @param {'app'|'web'} platform - Plataforma a mostrar ('app' o 'web')
 */
function toggleSegmentedPlatform(containerId, platform) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Detectar botones del switch dentro del contenedor
    const buttons = container.querySelectorAll('.segmented-control button');
    let btnApp = container.querySelector('[id*="-app-btn"]');
    let btnWeb = container.querySelector('[id*="-web-btn"]');

    if (!btnApp && buttons.length >= 2) btnApp = buttons[0];
    if (!btnWeb && buttons.length >= 2) btnWeb = buttons[1];

    // Detectar vistas correspondientes a este contenedor
    const appViews = container.querySelectorAll('[class*="view-"][class*="-app"]');
    const webViews = container.querySelectorAll('[class*="view-"][class*="-web"]');

    if (platform === 'app') {
        if (btnApp) {
            btnApp.classList.remove('segmented-btn-inactive');
            btnApp.classList.add('segmented-btn-active');
        }
        if (btnWeb) {
            btnWeb.classList.remove('segmented-btn-active');
            btnWeb.classList.add('segmented-btn-inactive');
        }
        appViews.forEach(el => el.classList.remove('hidden'));
        webViews.forEach(el => el.classList.add('hidden'));
    } else {
        if (btnWeb) {
            btnWeb.classList.remove('segmented-btn-inactive');
            btnWeb.classList.add('segmented-btn-active');
        }
        if (btnApp) {
            btnApp.classList.remove('segmented-btn-active');
            btnApp.classList.add('segmented-btn-inactive');
        }
        webViews.forEach(el => el.classList.remove('hidden'));
        appViews.forEach(el => el.classList.add('hidden'));
    }
}

// Exportación global y alias de compatibilidad para evitar errores
window.toggleSegmentedPlatform = toggleSegmentedPlatform;
window.toggleCampanaPlatform = (p) => toggleSegmentedPlatform('paso-crear-campana', p);
window.toggleProyectoPlatform = (p) => toggleSegmentedPlatform('paso-crear-proyecto', p);
window.toggleLotePlatform = (p) => toggleSegmentedPlatform('paso-crear-lotes', p);
window.toggleAccessPlatform = (p) => toggleSegmentedPlatform('paso-acceso-lote', p);