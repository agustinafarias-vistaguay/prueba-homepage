/**
 * @file process-flow.js
 * @description Animación fluida e ininterrumpida de la línea de proceso sincronizada con latidos suaves.
 */

(function () {
    document.addEventListener('DOMContentLoaded', () => {
        const processContainer = document.getElementById('process-container');
        const progressLine = document.getElementById('process-progress-line');

        if (!processContainer || !progressLine) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    runFluidProcessSequence();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.35 });

        observer.observe(processContainer);

        function pulseIcon(stepIndex) {
            const circle = document.getElementById(`process-icon-${stepIndex}`);
            if (circle) {
                circle.classList.add('animate-icon-pulse');
                setTimeout(() => circle.classList.remove('animate-icon-pulse'), 1000);
            }
        }

        function runFluidProcessSequence() {
            const isDesktop = window.innerWidth >= 1024;
            const totalDuration = 5500;
            const stepInterval = totalDuration / 5;

            if (isDesktop) {
                progressLine.style.transition = `width ${totalDuration}ms linear`;
                progressLine.style.width = '100%';
            }

            pulseIcon(1);

            setTimeout(() => pulseIcon(2), stepInterval);       // ~1100ms
            setTimeout(() => pulseIcon(3), stepInterval * 2);   // ~2200ms
            setTimeout(() => pulseIcon(4), stepInterval * 3);   // ~3300ms
            setTimeout(() => pulseIcon(5), stepInterval * 4);   // ~4400ms

            setTimeout(() => {
                pulseIcon(6);

                const circle6 = document.getElementById('process-icon-6');
                const symbol6 = document.getElementById('process-symbol-6');
                const title6 = document.getElementById('process-title-6');
                const desc6 = document.getElementById('process-desc-6');

                if (circle6) {
                    circle6.classList.remove('bg-emerald-50', 'border-primary/20');
                    circle6.classList.add('bg-primary', 'shadow-md');
                }
                if (symbol6) {
                    symbol6.classList.remove('text-primary');
                    symbol6.classList.add('text-white');
                }
                if (title6) {
                    title6.classList.remove('text-slate-900');
                    title6.classList.add('text-primary');
                }
                if (desc6) {
                    desc6.classList.remove('text-slate-600');
                    desc6.classList.add('text-slate-800', 'font-semibold');
                }
            }, totalDuration);
        }
    });
})();