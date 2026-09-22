(function () {
    let brandTimers = [];

    function clearBrandTimers() {
        brandTimers.forEach(timer => clearTimeout(timer));
        brandTimers = [];
    }

    const scheduleBrand = (fn, delay) => {
        const t = setTimeout(fn, delay);
        brandTimers.push(t);
    };

    function resetState() {
        clearBrandTimers();

        const baseUi = document.getElementById('brand-base-ui');
        const cardWrapper = document.getElementById('brand-card-wrapper');
        const shimmer = document.getElementById('brand-shimmer');
        const btnVer = document.getElementById('brand-btn-ver');
        const backdrop = document.getElementById('brand-backdrop');
        const bottomSheet = document.getElementById('brand-bottomsheet');
        const pill = document.getElementById('brand-pill');
        const landing = document.getElementById('brand-landing');
        const btnCta = document.getElementById('brand-btn-cta');
        const loader = document.getElementById('brand-loader');
        const spinner = document.getElementById('brand-spinner');
        const loaderText = document.getElementById('brand-loader-text');
        const iconCheck = document.getElementById('brand-icon-check');

        if (baseUi) {
            baseUi.classList.add('blur-md', 'opacity-0');
            baseUi.classList.remove('blur-0', 'blur-sm', 'opacity-100');
        }

        if (cardWrapper) {
            cardWrapper.classList.add('blur-md', 'opacity-0');
            cardWrapper.classList.remove('blur-0', 'opacity-100');
        }

        if (btnVer) {
            btnVer.classList.add('blur-md', 'opacity-0');
            btnVer.classList.remove('blur-0', 'opacity-100');
            btnVer.style.transform = 'scale(1)';
        }

        if (shimmer) {
            shimmer.style.transition = 'none';
            shimmer.style.transform = 'translateX(-150%)';
        }

        if (backdrop) {
            backdrop.classList.add('opacity-0');
            backdrop.classList.remove('opacity-100');
        }

        if (bottomSheet) {
            bottomSheet.style.transition = 'all 700ms ease-out';
            bottomSheet.classList.add('translate-y-full', 'h-[85%]', 'rounded-t-2xl');
            bottomSheet.classList.remove('h-full', 'rounded-none');
        }

        if (pill) pill.classList.remove('opacity-0');

        if (landing) {
            landing.style.transition = 'none';
            landing.style.transform = 'translateY(0)';
            landing.classList.remove('opacity-0');
            landing.classList.add('opacity-100');
        }

        if (btnCta) {
            btnCta.classList.add('opacity-0', 'scale-75');
            btnCta.classList.remove('opacity-100', 'scale-100');
        }

        if (loader) {
            loader.style.transition = 'opacity 300ms ease-in-out';
            loader.classList.add('opacity-0', 'pointer-events-none');
            loader.classList.remove('opacity-100');
        }

        if (spinner) spinner.classList.remove('hidden');
        if (loaderText) loaderText.classList.remove('hidden', 'opacity-0');

        if (iconCheck) {
            iconCheck.style.transition = 'transform 300ms ease-in-out';
            iconCheck.classList.add('hidden');
            iconCheck.style.transform = 'scale(0)';
        }

        if (shimmer) void shimmer.offsetWidth;
        if (landing) void landing.offsetWidth;
    }

    function runBrandAnimation() {
        resetState();

        const baseUi = document.getElementById('brand-base-ui');
        const cardWrapper = document.getElementById('brand-card-wrapper');
        const shimmer = document.getElementById('brand-shimmer');
        const btnVer = document.getElementById('brand-btn-ver');
        const backdrop = document.getElementById('brand-backdrop');
        const bottomSheet = document.getElementById('brand-bottomsheet');
        const pill = document.getElementById('brand-pill');
        const landing = document.getElementById('brand-landing');
        const btnCta = document.getElementById('brand-btn-cta');
        const loader = document.getElementById('brand-loader');
        const spinner = document.getElementById('brand-spinner');
        const loaderText = document.getElementById('brand-loader-text');
        const iconCheck = document.getElementById('brand-icon-check');

        if (!baseUi || !cardWrapper || !shimmer || !btnVer || !bottomSheet) return;

        shimmer.style.transition = 'transform 1800ms ease-in-out';
        if (landing) landing.style.transition = 'transform 3800ms ease-in-out';

        scheduleBrand(() => {
            baseUi.classList.remove('blur-md', 'opacity-0');
            baseUi.classList.add('blur-0', 'opacity-100');

            cardWrapper.classList.remove('blur-md', 'opacity-0');
            cardWrapper.classList.add('blur-0', 'opacity-100');

            btnVer.classList.remove('blur-md', 'opacity-0');
            btnVer.classList.add('blur-0', 'opacity-100');
        }, 500);

        scheduleBrand(() => {
            baseUi.classList.add('blur-sm');
            shimmer.style.transform = 'translateX(200%)';
        }, 2500);

        scheduleBrand(() => {
            btnVer.style.transform = 'scale(1.15)';
        }, 4400);

        scheduleBrand(() => {
            btnVer.style.transform = 'scale(1)';
        }, 4900);

        scheduleBrand(() => {
            if (backdrop) {
                backdrop.classList.remove('opacity-0');
                backdrop.classList.add('opacity-100');
            }
            if (bottomSheet) bottomSheet.classList.remove('translate-y-full');
        }, 5700);

        scheduleBrand(() => {
            if (landing) landing.style.transform = 'translateY(-50%)';
        }, 7000);

        // POP FLUIDO Y EGLANTE EN UN SOLO PASO NATI VO
        scheduleBrand(() => {
            if (btnCta) {
                btnCta.classList.remove('opacity-0', 'scale-75');
                btnCta.classList.add('opacity-100', 'scale-100');
            }
        }, 11200);

        scheduleBrand(() => {
            if (loader) {
                loader.classList.remove('opacity-0', 'pointer-events-none');
                loader.classList.add('opacity-100');
            }
            if (btnCta) {
                btnCta.classList.remove('opacity-100');
                btnCta.classList.add('opacity-0');
            }
        }, 12800);

        scheduleBrand(() => {
            if (spinner) spinner.classList.add('hidden');
            if (loaderText) loaderText.classList.add('hidden');
        }, 15000);

        scheduleBrand(() => {
            if (iconCheck) {
                iconCheck.classList.remove('hidden');
                iconCheck.style.transform = 'scale(1.25)';
                scheduleBrand(() => { iconCheck.style.transform = 'scale(1)'; }, 250);
            }
        }, 15300);

        scheduleBrand(() => {
            if (iconCheck) {
                iconCheck.style.transform = 'scale(0)';
                scheduleBrand(() => { iconCheck.classList.add('hidden'); }, 300);
            }
        }, 16800);

        scheduleBrand(() => {
            if (pill) pill.classList.add('opacity-0');

            if (bottomSheet) {
                bottomSheet.style.transition = 'all 800ms cubic-bezier(0.4, 0, 0.2, 1)';
                bottomSheet.classList.remove('h-[85%]', 'rounded-t-2xl');
                bottomSheet.classList.add('h-full', 'rounded-none');
            }

            if (btnCta) {
                btnCta.classList.remove('opacity-100');
                btnCta.classList.add('opacity-0');
            }

            if (landing) {
                landing.style.transition = 'none';
                landing.style.transform = 'translateY(0)';
                void landing.offsetWidth;
            }
        }, 17500);

        scheduleBrand(() => {
            if (loader) {
                loader.style.transition = 'opacity 800ms ease-in-out';
                loader.classList.add('opacity-0', 'pointer-events-none');
                loader.classList.remove('opacity-100');
            }
        }, 18400);

        scheduleBrand(() => {
            if (window.bizGoToSlide) window.bizGoToSlide(0);
        }, 23500);
    }

    window.brandDebug = {
        play: () => runBrandAnimation(),
        pause: () => clearBrandTimers(),
        step: (n) => {
            resetState();
            const baseUi = document.getElementById('brand-base-ui');
            const cardWrapper = document.getElementById('brand-card-wrapper');
            const shimmer = document.getElementById('brand-shimmer');
            const btnVer = document.getElementById('brand-btn-ver');
            const backdrop = document.getElementById('brand-backdrop');
            const bottomSheet = document.getElementById('brand-bottomsheet');
            const pill = document.getElementById('brand-pill');
            const landing = document.getElementById('brand-landing');
            const btnCta = document.getElementById('brand-btn-cta');
            const loader = document.getElementById('brand-loader');
            const spinner = document.getElementById('brand-spinner');
            const loaderText = document.getElementById('brand-loader-text');
            const iconCheck = document.getElementById('brand-icon-check');

            if (n >= 1) {
                if (baseUi) {
                    baseUi.classList.remove('blur-md', 'opacity-0');
                    baseUi.classList.add('blur-0', 'opacity-100');
                }
                if (cardWrapper) {
                    cardWrapper.classList.remove('blur-md', 'opacity-0');
                    cardWrapper.classList.add('blur-0', 'opacity-100');
                }
                if (btnVer) {
                    btnVer.classList.remove('blur-md', 'opacity-0');
                    btnVer.classList.add('blur-0', 'opacity-100');
                }
            }
            if (n >= 2) {
                if (baseUi) baseUi.classList.add('blur-sm');
                if (shimmer) {
                    shimmer.style.transition = 'transform 300ms ease-in-out';
                    shimmer.style.transform = 'translateX(50%)';
                }
            }
            if (n >= 3 && btnVer) btnVer.style.transform = 'scale(1.15)';
            if (n >= 4) {
                if (backdrop) {
                    backdrop.classList.remove('opacity-0');
                    backdrop.classList.add('opacity-100');
                }
                if (bottomSheet) bottomSheet.classList.remove('translate-y-full');
            }
            if (n >= 5 && landing) {
                landing.style.transition = 'transform 300ms ease-in-out';
                landing.style.transform = 'translateY(-50%)';
            }
            if (n >= 6) {
                if (landing) landing.style.transform = 'translateY(-50%)';
                if (btnCta) {
                    btnCta.classList.remove('opacity-0', 'scale-75');
                    btnCta.classList.add('opacity-100', 'scale-100');
                }
            }
            if (n >= 7) {
                if (bottomSheet) bottomSheet.classList.remove('translate-y-full');
                if (btnCta) {
                    btnCta.classList.remove('opacity-100');
                    btnCta.classList.add('opacity-0');
                }
                if (loader) {
                    loader.classList.remove('opacity-0', 'pointer-events-none');
                    loader.classList.add('opacity-100');
                }
                if (spinner) spinner.classList.add('hidden');
                if (loaderText) loaderText.classList.add('hidden');
                if (iconCheck) {
                    iconCheck.classList.remove('hidden');
                    iconCheck.style.transform = 'scale(1)';
                }
            }
            if (n >= 8) {
                if (pill) pill.classList.add('opacity-0');
                if (bottomSheet) {
                    bottomSheet.classList.remove('translate-y-full', 'h-[85%]', 'rounded-t-2xl');
                    bottomSheet.classList.add('h-full', 'rounded-none');
                }
                if (btnCta) {
                    btnCta.classList.remove('opacity-100');
                    btnCta.classList.add('opacity-0');
                }
                if (landing) {
                    landing.style.transform = 'translateY(0)';
                }
                if (loader) {
                    loader.classList.add('opacity-0', 'pointer-events-none');
                }
            }
        }
    };

    window.runBrandAnimation = runBrandAnimation;
    window.clearBrandTimers = clearBrandTimers;
})();