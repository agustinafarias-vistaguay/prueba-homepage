(function () {
    let dashTimers = [];

    function clearDashTimers() {
        dashTimers.forEach(timer => clearTimeout(timer));
        dashTimers = [];
    }

    const scheduleDash = (fn, delay) => {
        const t = setTimeout(fn, delay);
        dashTimers.push(t);
    };

    function resetDashState() {
        clearDashTimers();

        const scene1 = document.getElementById('dash-scene-1');
        const menuWrapper1 = document.getElementById('dash-menu-wrapper-1');
        const btnPanel = document.getElementById('dash-btn-panel');

        const scene2 = document.getElementById('dash-scene-2');
        const backdrop2 = document.getElementById('dash-backdrop-2');
        const chart1 = document.getElementById('dash-chart-1');
        const chart2 = document.getElementById('dash-chart-2');
        const chart3 = document.getElementById('dash-chart-3');
        const menuWrapper2 = document.getElementById('dash-menu-wrapper-2');
        const btnDescargar = document.getElementById('dash-btn-descargar');
        const menuOverlay = document.getElementById('dash-menu-overlay');
        const iconCheck = document.getElementById('dash-icon-check');

        if (scene1) {
            scene1.classList.remove('opacity-0', 'pointer-events-none');
            scene1.classList.add('opacity-100');
        }

        if (menuWrapper1) {
            menuWrapper1.classList.remove('opacity-100', 'scale-100');
            menuWrapper1.classList.add('opacity-0', 'scale-75');
        }
        if (btnPanel) btnPanel.style.transform = 'scale(1)';

        if (scene2) {
            scene2.classList.remove('opacity-100');
            scene2.classList.add('opacity-0', 'pointer-events-none');
        }
        if (backdrop2) {
            backdrop2.classList.remove('opacity-100');
            backdrop2.classList.add('opacity-0');
        }

        [chart1, chart2, chart3].forEach(chart => {
            if (chart) {
                chart.classList.remove('scale-105', 'z-30');
                chart.classList.add('scale-100', 'z-10');
            }
        });

        if (menuWrapper2) {
            menuWrapper2.classList.remove('opacity-100', 'scale-100');
            menuWrapper2.classList.add('opacity-0', 'scale-75');
        }
        if (btnDescargar) btnDescargar.style.transform = 'scale(1)';

        if (menuOverlay) {
            menuOverlay.classList.remove('opacity-100');
            menuOverlay.classList.add('opacity-0', 'pointer-events-none');
        }
        if (iconCheck) {
            iconCheck.classList.add('hidden');
            iconCheck.style.transform = 'scale(0)';
        }
    }

    function runDashboardAnimation() {
        resetDashState();

        const scene1 = document.getElementById('dash-scene-1');
        const menuWrapper1 = document.getElementById('dash-menu-wrapper-1');
        const btnPanel = document.getElementById('dash-btn-panel');

        const scene2 = document.getElementById('dash-scene-2');
        const backdrop2 = document.getElementById('dash-backdrop-2');
        const chart1 = document.getElementById('dash-chart-1');
        const chart2 = document.getElementById('dash-chart-2');
        const chart3 = document.getElementById('dash-chart-3');
        const menuWrapper2 = document.getElementById('dash-menu-wrapper-2');
        const btnDescargar = document.getElementById('dash-btn-descargar');
        const menuOverlay = document.getElementById('dash-menu-overlay');
        const iconCheck = document.getElementById('dash-icon-check');

        // PASO 1: Aparece el menú
        scheduleDash(() => {
            if (menuWrapper1) {
                menuWrapper1.classList.remove('opacity-0', 'scale-75');
                menuWrapper1.classList.add('opacity-100', 'scale-100');
            }
        }, 1800);

        // PASO 2: Animación Pop (Click) del botón "Ver Panel"
        scheduleDash(() => {
            if (btnPanel) btnPanel.style.transform = 'scale(0.92)';
        }, 3800);

        scheduleDash(() => {
            if (btnPanel) btnPanel.style.transform = 'scale(1)';
        }, 4200);

        // PASO 3: Transición a Escena 2 (Modo Oscuro)
        scheduleDash(() => {
            if (scene1) {
                scene1.classList.add('opacity-0', 'pointer-events-none');
                scene1.classList.remove('opacity-100');
            }
            if (scene2) {
                scene2.classList.remove('opacity-0', 'pointer-events-none');
                scene2.classList.add('opacity-100');
            }
        }, 4900);

        // --- BLOQUE 1 DE GRÁFICOS ---
        scheduleDash(() => {
            if (backdrop2) {
                backdrop2.classList.remove('opacity-0');
                backdrop2.classList.add('opacity-100');
            }
            if (chart1) {
                chart1.classList.remove('z-10', 'scale-100');
                chart1.classList.add('z-30', 'scale-105');
            }
        }, 6700);

        scheduleDash(() => {
            if (backdrop2) {
                backdrop2.classList.remove('opacity-100');
                backdrop2.classList.add('opacity-0');
            }
            if (chart1) {
                chart1.classList.remove('scale-105');
                chart1.classList.add('scale-100');
            }
            scheduleDash(() => {
                if (chart1) {
                    chart1.classList.remove('z-30');
                    chart1.classList.add('z-10');
                }
            }, 700);
        }, 9000);

        // --- BLOQUE 2 DE GRÁFICOS ---
        scheduleDash(() => {
            if (backdrop2) {
                backdrop2.classList.remove('opacity-0');
                backdrop2.classList.add('opacity-100');
            }
            if (chart2) {
                chart2.classList.remove('z-10', 'scale-100');
                chart2.classList.add('z-30', 'scale-105');
            }
        }, 10400);

        scheduleDash(() => {
            if (backdrop2) {
                backdrop2.classList.remove('opacity-100');
                backdrop2.classList.add('opacity-0');
            }
            if (chart2) {
                chart2.classList.remove('scale-105');
                chart2.classList.add('scale-100');
            }
            scheduleDash(() => {
                if (chart2) {
                    chart2.classList.remove('z-30');
                    chart2.classList.add('z-10');
                }
            }, 700);
        }, 12700);

        // --- BLOQUE 3 DE GRÁFICOS ---
        scheduleDash(() => {
            if (backdrop2) {
                backdrop2.classList.remove('opacity-0');
                backdrop2.classList.add('opacity-100');
            }
            if (chart3) {
                chart3.classList.remove('z-10', 'scale-100');
                chart3.classList.add('z-30', 'scale-105');
            }
        }, 14100);

        scheduleDash(() => {
            if (backdrop2) {
                backdrop2.classList.remove('opacity-100');
                backdrop2.classList.add('opacity-0');
            }
            if (chart3) {
                chart3.classList.remove('scale-105');
                chart3.classList.add('scale-100');
            }
            scheduleDash(() => {
                if (chart3) {
                    chart3.classList.remove('z-30');
                    chart3.classList.add('z-10');
                }
            }, 700);
        }, 16400);

        // PASO 4: Muestra Menú Descarga (Escena Oscura)
        scheduleDash(() => {
            if (menuWrapper2) {
                menuWrapper2.classList.remove('opacity-0', 'scale-75');
                menuWrapper2.classList.add('opacity-100', 'scale-100');
            }
        }, 18000);

        // Animación Pop (Click) del botón "Descargar"
        scheduleDash(() => {
            if (btnDescargar) btnDescargar.style.transform = 'scale(0.92)';
        }, 19800);

        scheduleDash(() => {
            if (btnDescargar) btnDescargar.style.transform = 'scale(1)';
        }, 20300);

        // Aparece el check
        scheduleDash(() => {
            if (menuOverlay) {
                menuOverlay.classList.remove('opacity-0', 'pointer-events-none');
                menuOverlay.classList.add('opacity-100');
            }
        }, 20800);

        scheduleDash(() => {
            if (iconCheck) {
                iconCheck.classList.remove('hidden');
                iconCheck.style.transform = 'scale(1.2)';
                scheduleDash(() => { iconCheck.style.transform = 'scale(1)'; }, 400);
            }
        }, 21300);

        // Cambio a siguiente tarjeta (Brand)
        scheduleDash(() => {
            if (window.bizGoToSlide) window.bizGoToSlide(2);
        }, 24000);
    }

    // Exportar herramientas de debugueo globales
    window.dashDebug = {
        play: () => runDashboardAnimation(),
        pause: () => clearDashTimers(),
        step: (n) => {
            resetDashState();
            const scene1 = document.getElementById('dash-scene-1');
            const menuWrapper1 = document.getElementById('dash-menu-wrapper-1');
            const scene2 = document.getElementById('dash-scene-2');
            const backdrop2 = document.getElementById('dash-backdrop-2');
            const chart1 = document.getElementById('dash-chart-1');
            const chart2 = document.getElementById('dash-chart-2');
            const chart3 = document.getElementById('dash-chart-3');
            const menuWrapper2 = document.getElementById('dash-menu-wrapper-2');
            const menuOverlay = document.getElementById('dash-menu-overlay');
            const iconCheck = document.getElementById('dash-icon-check');

            if (n >= 1) {
                if (menuWrapper1) {
                    menuWrapper1.classList.remove('opacity-0', 'scale-75');
                    menuWrapper1.classList.add('opacity-100', 'scale-100');
                }
            }
            if (n >= 2) {
                if (scene1) scene1.classList.add('opacity-0', 'pointer-events-none');
                if (scene2) {
                    scene2.classList.remove('opacity-0', 'pointer-events-none');
                    scene2.classList.add('opacity-100');
                }
            }
            if (n === 3 && chart1) {
                if (backdrop2) backdrop2.classList.add('opacity-100');
                chart1.classList.add('z-30', 'scale-105');
            }
            if (n === 4 && chart2) {
                if (backdrop2) backdrop2.classList.add('opacity-100');
                chart2.classList.add('z-30', 'scale-105');
            }
            if (n === 5 && chart3) {
                if (backdrop2) backdrop2.classList.add('opacity-100');
                chart3.classList.add('z-30', 'scale-105');
            }
            if (n >= 6 && menuWrapper2) {
                menuWrapper2.classList.remove('opacity-0', 'scale-75');
                menuWrapper2.classList.add('opacity-100', 'scale-100');
            }
            if (n >= 7) {
                if (menuOverlay) {
                    menuOverlay.classList.remove('opacity-0', 'pointer-events-none');
                    menuOverlay.classList.add('opacity-100');
                }
                if (iconCheck) {
                    iconCheck.classList.remove('hidden');
                    iconCheck.style.transform = 'scale(1)';
                }
            }
        }
    };

    window.runDashboardAnimation = runDashboardAnimation;
    window.clearDashTimers = clearDashTimers;
})();