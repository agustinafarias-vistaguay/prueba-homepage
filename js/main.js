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
    } else {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 300);
        document.body.style.overflow = '';
    }
}

window.toggleMobileMenu = toggleMobileMenu;
window.toggleDownloadModal = toggleDownloadModal;

document.addEventListener('DOMContentLoaded', () => {
    const videoIframe = document.getElementById('featured-video');
    if (videoIframe) {
        const videoObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    videoIframe.src = videoIframe.dataset.src;
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        videoObserver.observe(videoIframe);
    }

    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight * 0.9) {
                element.classList.add('active');
            }
        });
    };

    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                revealOnScroll();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    revealOnScroll();
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