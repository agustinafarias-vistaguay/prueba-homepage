// js/weed-combo.js - Transición en cortina/barrido con timings personalizados preservados

/**
 * @file weed-combo.js
 * @description Controls the curtain/swipe preview animation on the solutions showcard.
 */

let comboInterval = null;

/**
 * Opens the combo demo modal layer on the solutions showcase card.
 * @returns {void}
 */

(function () {
    function openComboDemoModal() {
        const cardContainer = document.getElementById('solutions-content-card');
        if (!cardContainer) return;

        const defaultOverlay = document.getElementById('solutions-overlay-image');
        if (defaultOverlay) {
            defaultOverlay.style.zIndex = '10';
            defaultOverlay.style.transition = 'transform 1.7s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.45s ease-out';
            defaultOverlay.style.transform = 'translate(36%, -48%) scale(1.3)';
            defaultOverlay.style.opacity = '0';
        }

        const rightColumn = cardContainer.children[1];
        if (!rightColumn) return;

        let demoLayer = document.getElementById('inline-combo-demo');

        if (!demoLayer) {
            demoLayer = document.createElement('div');
            demoLayer.id = 'inline-combo-demo';
            demoLayer.className = 'absolute inset-0 z-40 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center p-4 opacity-0 transition-opacity duration-700 ease-out overflow-hidden';
            demoLayer.innerHTML = `
            <button onclick="closeComboDemoModal()" aria-label="Cerrar demo" 
                class="absolute top-3 right-3 z-50 text-white/80 hover:text-white bg-black/60 hover:bg-black/90 w-9 h-9 rounded-full flex items-center justify-center transition-colors backdrop-blur-md cursor-pointer">
                <svg class="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
            </button>

            <div class="relative w-full max-w-[480px] sm:max-w-[570px] lg:max-w-[630px] -translate-y-[20%] flex items-center justify-center">
                <img src="images/mdm-superpuesto.png" alt="Laptop Vistaguay" 
                     class="relative z-20 w-full h-auto drop-shadow-2xl pointer-events-none">

                <div class="absolute top-[45.5%] left-1/2 -translate-x-1/2 w-[65%] h-[47.5%] overflow-hidden bg-transparent rounded-sm shadow-inner z-30">
                    <img id="img-layer-1" src="images/pq-mdm-1.png" alt="Conteo" 
                         class="absolute inset-0 w-full h-full object-cover z-10" 
                         style="clip-path: inset(0 100% 0 0); transition: clip-path 0.8s cubic-bezier(0.4, 0, 0.2, 1);">
                    <img id="img-layer-2" src="images/pq-mdm-2.jpg" alt="Malezas" 
                         class="absolute inset-0 w-full h-full object-cover z-20" 
                         style="clip-path: inset(0 100% 0 0); transition: clip-path 0.8s cubic-bezier(0.4, 0, 0.2, 1);">
                </div>
            </div>
        `;
            rightColumn.appendChild(demoLayer);
        }

        demoLayer.classList.remove('hidden');
        setTimeout(() => demoLayer.classList.remove('opacity-0'), 200);

        startComboAnimation();
    }

    /**
     * Closes the combo demo modal layer on the solutions showcase card.
     * @returns {void}
     */
    function closeComboDemoModal() {
        const demoLayer = document.getElementById('inline-combo-demo');

        const defaultOverlay = document.getElementById('solutions-overlay-image');
        if (defaultOverlay) {
            defaultOverlay.style.zIndex = '45';
            defaultOverlay.style.transition = 'transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.5s ease-in';
            defaultOverlay.style.transform = '';
            defaultOverlay.style.opacity = '1';

            setTimeout(() => {
                defaultOverlay.style.zIndex = '';
            }, 700);
        }

        if (!demoLayer) return;

        stopComboAnimation();
        demoLayer.classList.add('opacity-0');
        setTimeout(() => {
            demoLayer.classList.add('hidden');
        }, 500);
    }

    /**
     * Starts the curtain/swipe preview animation, toggling clip-path properties sequentially.
     * @returns {void}
     */
    function startComboAnimation() {
        stopComboAnimation();
        let currentLayer = 1;

        const img1 = document.getElementById('img-layer-1');
        const img2 = document.getElementById('img-layer-2');

        if (img1 && img2) {
            img1.style.clipPath = 'inset(0 100% 0 0)';
            img2.style.clipPath = 'inset(0 100% 0 0)';
        }
        const TIEMPO_ESPERA_PRIMERA_IMAGEN = 900;

        setTimeout(() => {
            if (!img1) return;

            img1.style.clipPath = 'inset(0 0 0 0)';

            comboInterval = setInterval(() => {
                if (!img1 || !img2) return;

                if (currentLayer === 1) {
                    // Despliega la 2ª imagen encima en cortina
                    img2.style.clipPath = 'inset(0 0 0 0)';
                    currentLayer = 2;
                } else {
                    // Repliega la 2ª imagen revelando de nuevo la 1ª fija abajo
                    img2.style.clipPath = 'inset(0 100% 0 0)';
                    currentLayer = 1;
                }
            }, 2500);

        }, TIEMPO_ESPERA_PRIMERA_IMAGEN);
    }

    /**
     * Stops the active curtain/swipe preview animation interval.
     * @returns {void}
     */
    function stopComboAnimation() {
        if (comboInterval) {
            clearInterval(comboInterval);
            comboInterval = null;
        }
    }

    // Bind functions to global window object for inline HTML event handling
    window.openComboDemoModal = openComboDemoModal;
    window.closeComboDemoModal = closeComboDemoModal;

    window.closeWeedComboModal = closeWeedComboModal;

})();