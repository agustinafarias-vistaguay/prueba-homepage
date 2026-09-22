(function () {
    let solicitudAnimTimers = [];

    function clearSolicitudTimers() {
        solicitudAnimTimers.forEach(timer => clearTimeout(timer));
        solicitudAnimTimers = [];
    }

    document.addEventListener('DOMContentLoaded', () => {
        const cards = document.querySelectorAll('.biz-card');
        const images = document.querySelectorAll('.biz-img');
        const cardsContainer = document.getElementById('biz-cards-container');
        const imageContainer = document.getElementById('biz-image-container');
        const section = document.getElementById('business');
        const bizDots = document.querySelectorAll('.biz-dot');

        if (!cards.length || !images.length || !section) return;

        let currentIndex = 0;
        let timer = null;
        let isManualScroll = false;

        function goToSlide(nextIndex, forceReset = false) {
            if (nextIndex === currentIndex && !forceReset) return;

            const currentImg = images[currentIndex];
            const nextImg = images[nextIndex];

            if (nextIndex !== currentIndex) {
                nextImg.style.transition = 'none';
                nextImg.className = 'biz-img absolute max-h-[360px] w-auto object-contain translate-x-full opacity-0 z-10';
                nextImg.offsetHeight;

                const transitionStyle = 'all 700ms cubic-bezier(0.4, 0, 0.2, 1)';
                currentImg.style.transition = transitionStyle;
                nextImg.style.transition = transitionStyle;

                currentImg.className = 'biz-img absolute max-h-[360px] w-auto object-contain -translate-x-full opacity-0 z-0';
                nextImg.className = 'biz-img absolute max-h-[360px] w-auto object-contain translate-x-0 opacity-100 z-10';
            }

            // Actualiza estilos de las cards
            cards.forEach((card, i) => {
                const iconBox = card.querySelector('.biz-icon-box');
                const title = card.querySelector('.biz-title');
                const desc = card.querySelector('.biz-desc');

                if (i === nextIndex) {
                    card.className = 'biz-card w-full min-w-full lg:min-w-0 snap-center group cursor-pointer p-4 rounded-2xl border transition-all duration-500 bg-primary text-white border-primary shadow-md';
                    iconBox.className = 'biz-icon-box w-9 h-9 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0 transition-colors mt-0.5';
                    title.className = 'biz-title text-sm font-bold text-white leading-tight mb-1';
                    desc.className = 'biz-desc text-sm text-white/90 leading-relaxed';
                } else {
                    card.className = 'biz-card w-full min-w-full lg:min-w-0 snap-center group cursor-pointer p-4 rounded-2xl border transition-all duration-500 bg-white border-slate-200/80 text-slate-800 hover:border-primary/50';
                    iconBox.className = 'biz-icon-box w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 transition-colors mt-0.5';
                    title.className = 'biz-title text-sm font-bold text-slate-900 leading-tight mb-1';
                    desc.className = 'biz-desc text-sm text-slate-600 leading-relaxed';
                }
            });

            // Actualiza estilos de los puntos de paginación móviles
            bizDots.forEach((dot, i) => {
                if (i === nextIndex) {
                    dot.classList.remove('w-1.5', 'bg-slate-300');
                    dot.classList.add('w-6', 'bg-primary');
                } else {
                    dot.classList.remove('w-6', 'bg-primary');
                    dot.classList.add('w-1.5', 'bg-slate-300');
                }
            });

            // Desplaza el slider horizontal en móviles si el cambio proviene de una animación/clic
            if (cardsContainer && window.innerWidth < 1024 && !isManualScroll) {
                const cardWidth = cards[nextIndex]?.offsetWidth || 0;
                cardsContainer.scrollTo({
                    left: nextIndex * (cardWidth + 16),
                    behavior: 'smooth'
                });
            }

            currentIndex = nextIndex;

            clearSolicitudTimers();
            if (typeof window.clearDashTimers === 'function') window.clearDashTimers();
            if (typeof window.clearBrandTimers === 'function') window.clearBrandTimers();

            if (currentIndex === 0) {
                runSolicitudAnimation();
            } else if (currentIndex === 1) {
                if (typeof window.runDashboardAnimation === 'function') window.runDashboardAnimation();
            } else if (currentIndex === 2) {
                if (typeof window.runBrandAnimation === 'function') window.runBrandAnimation();
            }
        }

        // Función global para los clics en los puntos de paginación
        window.scrollToBizCard = function (index) {
            isManualScroll = false;
            goToSlide(index, true);
        };

        // Escucha el scroll táctil manual en móvil para sincronizar la tarjeta activa
        if (cardsContainer) {
            let scrollTimeout;
            cardsContainer.addEventListener('scroll', () => {
                if (window.innerWidth >= 1024) return;
                isManualScroll = true;

                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    const scrollLeft = cardsContainer.scrollLeft;
                    const cardWidth = cardsContainer.offsetWidth;
                    const activeIndex = Math.round(scrollLeft / cardWidth);

                    if (activeIndex !== currentIndex && cards[activeIndex]) {
                        goToSlide(activeIndex, true);
                    }
                    isManualScroll = false;
                }, 150);
            });
        }

        function stopAutoRotation() {
            if (timer) clearTimeout(timer);
        }

        cards.forEach((card) => {
            card.addEventListener('click', () => {
                const idx = parseInt(card.getAttribute('data-index'), 10);
                isManualScroll = false;
                goToSlide(idx, true);
            });
        });

        [cardsContainer, imageContainer].forEach(element => {
            if (element) {
                element.addEventListener('mouseenter', stopAutoRotation);
            }
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (currentIndex === 0) runSolicitudAnimation();
                    else if (currentIndex === 1 && typeof window.runDashboardAnimation === 'function') window.runDashboardAnimation();
                    else if (currentIndex === 2 && typeof window.runBrandAnimation === 'function') window.runBrandAnimation();
                } else {
                    stopAutoRotation();
                    clearSolicitudTimers();
                    if (typeof window.clearDashTimers === 'function') window.clearDashTimers();
                    if (typeof window.clearBrandTimers === 'function') window.clearBrandTimers();
                }
            });
        }, { threshold: 0.25 });

        observer.observe(section);
        window.bizGoToSlide = goToSlide;
    });

    function runSolicitudAnimation() {
        clearSolicitudTimers();

        const baseUi = document.getElementById('anim-base-ui');
        const btnSolicitud = document.getElementById('anim-btn-solicitud');
        const backdrop = document.getElementById('anim-backdrop');
        const modalForm = document.getElementById('anim-modal-form');
        const cardSelected = document.getElementById('anim-card-selected');
        const btnSolicitar = document.getElementById('anim-btn-solicitar');
        const modalSuccess = document.getElementById('anim-modal-success');
        const iconCheck = document.getElementById('anim-icon-check');

        if (!baseUi || !btnSolicitud || !backdrop) return;

        baseUi.classList.add('blur-md', 'opacity-0');
        baseUi.classList.remove('blur-0', 'opacity-100');

        btnSolicitud.classList.add('blur-md', 'opacity-0');
        btnSolicitud.classList.remove('blur-0', 'opacity-100');
        btnSolicitud.style.transform = 'scale(1)';

        backdrop.classList.add('opacity-0');

        modalForm.classList.add('opacity-0', 'scale-90');
        modalForm.classList.remove('opacity-100', 'scale-100');

        if (cardSelected) {
            cardSelected.classList.add('opacity-0', 'scale-95');
            cardSelected.classList.remove('opacity-100', 'scale-100');
        }

        if (btnSolicitar) btnSolicitar.style.transform = 'scale(1)';

        modalSuccess.classList.add('opacity-0', 'scale-90');
        modalSuccess.classList.remove('opacity-100', 'scale-100');

        if (iconCheck) iconCheck.style.transform = 'scale(0)';

        const schedule = (fn, delay) => {
            const t = setTimeout(fn, delay);
            solicitudAnimTimers.push(t);
        };

        schedule(() => {
            baseUi.classList.remove('blur-md', 'opacity-0');
            baseUi.classList.add('blur-0', 'opacity-100');

            btnSolicitud.classList.remove('blur-md', 'opacity-0');
            btnSolicitud.classList.add('blur-0', 'opacity-100');
        }, 200);

        schedule(() => {
            btnSolicitud.style.transform = 'scale(1.15)';
        }, 1900);

        schedule(() => {
            btnSolicitud.style.transform = 'scale(1)';
        }, 2300);

        schedule(() => {
            backdrop.classList.remove('opacity-0');
        }, 3200);

        schedule(() => {
            modalForm.classList.remove('opacity-0', 'scale-90');
            modalForm.classList.add('opacity-100', 'scale-100');
        }, 3500);

        schedule(() => {
            if (cardSelected) {
                cardSelected.classList.remove('opacity-0', 'scale-95');
                cardSelected.classList.add('opacity-100', 'scale-100');
            }
        }, 5100);

        schedule(() => {
            if (btnSolicitar) btnSolicitar.style.transform = 'scale(1.15)';
        }, 6200);

        schedule(() => {
            if (btnSolicitar) btnSolicitar.style.transform = 'scale(1)';
        }, 6600);

        schedule(() => {
            modalForm.classList.remove('opacity-100', 'scale-100');
            modalForm.classList.add('opacity-0', 'scale-95');

            modalSuccess.classList.remove('opacity-0', 'scale-90');
            modalSuccess.classList.add('opacity-100', 'scale-100');

            schedule(() => {
                if (iconCheck) {
                    iconCheck.style.transform = 'scale(1.25)';
                    schedule(() => { iconCheck.style.transform = 'scale(1)'; }, 200);
                }
            }, 250);
        }, 7800);

        schedule(() => {
            baseUi.classList.add('opacity-0');
            btnSolicitud.classList.add('opacity-0');
            backdrop.classList.add('opacity-0');

            modalSuccess.classList.remove('opacity-100', 'scale-100');
            modalSuccess.classList.add('opacity-0', 'scale-90');

            schedule(() => {
                if (window.bizGoToSlide) window.bizGoToSlide(1);
            }, 300);
        }, 10800);
    }
})();