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

window.toggleMobileMenu = toggleMobileMenu;
window.toggleDownloadModal = toggleDownloadModal;
window.toggleAlgoModal = toggleAlgoModal;

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