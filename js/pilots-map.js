/**
 * @file pilots-map.js
 * Optimizado para rendimiento GPU, prevención de reflows e IntersectionObserver.
 */

(function () {
    let activeTimeouts = [];
    let cycleTimeout = null;
    let isMapVisible = false;

    if (!document.getElementById('pilots-map-animation-style')) {
        const style = document.createElement('style');
        style.id = 'pilots-map-animation-style';
        style.innerHTML = `
        @keyframes pulseDotGlow {
            0% {
                transform: scale(1);
                opacity: 0.8;
            }
            50% {
                transform: scale(2.2);
                opacity: 1;
            }
            100% {
                transform: scale(1);
                opacity: 0.8;
            }
        }
        .dot-blinking {
            animation: pulseDotGlow 1.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
            will-change: transform, opacity;
            z-index: 9999 !important;
        }
    `;
        document.head.appendChild(style);
    }

    function clearAllTimeouts() {
        activeTimeouts.forEach(t => clearTimeout(t));
        activeTimeouts = [];
        if (cycleTimeout) clearTimeout(cycleTimeout);
    }

    function blinkMarker(marker) {
        const el = marker.getElement();
        if (!el) return;
        const dot = el.querySelector('div');
        if (!dot) return;

        dot.classList.remove('dot-blinking');

        // Reemplazo de void dot.offsetWidth por requestAnimationFrame para evitar Layout Thrashing
        requestAnimationFrame(() => {
            dot.classList.add('dot-blinking');
        });

        const t = setTimeout(() => {
            dot.classList.remove('dot-blinking');
        }, 1200);
        activeTimeouts.push(t);
    }

    function startDispersedBlinkingLoop(markers) {
        if (!markers.length) return;

        const misionesRegion = markers.filter(m => m._pilotData.lat > -28.5 && m._pilotData.lng > -56.5);
        const northRegion = markers.filter(m => m._pilotData.lat > -30 && m._pilotData.lng <= -56.5);
        const westRegion = markers.filter(m => m._pilotData.lng < -67 && m._pilotData.lat <= -28 && m._pilotData.lat > -40);
        const centerRegion = markers.filter(m => m._pilotData.lat <= -30 && m._pilotData.lat > -36 && m._pilotData.lng >= -67);
        const southRegion = markers.filter(m => m._pilotData.lat <= -36);

        const getRandomItem = (arr, fallback) => (arr && arr.length ? arr[Math.floor(Math.random() * arr.length)] : fallback[Math.floor(Math.random() * fallback.length)]);

        function runCycle() {
            if (!isMapVisible) return;
            clearAllTimeouts();

            const groups = [];
            for (let g = 0; g < 3; g++) {
                groups.push([
                    getRandomItem(misionesRegion, markers),
                    getRandomItem(northRegion, markers),
                    getRandomItem(westRegion, markers),
                    getRandomItem(centerRegion, markers),
                    getRandomItem(southRegion, markers)
                ]);
            }

            let delay = 0;
            groups.forEach((group) => {
                group.forEach((marker) => {
                    const t = setTimeout(() => {
                        if (isMapVisible) blinkMarker(marker);
                    }, delay);
                    activeTimeouts.push(t);
                    delay += 500;
                });
                delay += 800;
            });

            cycleTimeout = setTimeout(() => {
                if (isMapVisible) runCycle();
            }, delay + 1200);
        }

        // Frena el cálculo de titileos cuando la sección no está en pantalla
        const container = document.getElementById('pilots-native-map');
        if (container && 'IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    isMapVisible = entry.isIntersecting;
                    if (isMapVisible) {
                        runCycle();
                    } else {
                        clearAllTimeouts();
                    }
                });
            }, { threshold: 0.1 });
            observer.observe(container);
        } else {
            isMapVisible = true;
            runCycle();
        }
    }

    function initPilotsMap() {
        const mapContainer = document.getElementById('pilots-native-map');
        if (!mapContainer) return;

        const map = L.map('pilots-native-map', {
            center: [-35.5, -62.0],
            zoom: 4,
            zoomControl: false,
            attributionControl: false,
            scrollWheelZoom: false,
            dragging: true
        });

        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 20,
            maxNativeZoom: 16
        }).addTo(map);

        setTimeout(() => {
            map.invalidateSize();
        }, 200);

        const allMarkers = [];

        fetch('data/pilots.json')
            .then(response => response.json())
            .then(pilots => {
                pilots.forEach(pilot => {
                    if (pilot.lat && pilot.lng) {
                        const staticIcon = L.divIcon({
                            className: 'custom-leaflet-dot',
                            html: '<div class="w-1.5 h-1.5 rounded-full bg-primary/90 shadow-[0_0_4px_rgba(71,194,120,0.8)]"></div>',
                            iconSize: [6, 6],
                            iconAnchor: [3, 3]
                        });

                        const marker = L.marker([pilot.lat, pilot.lng], { icon: staticIcon, interactive: false })
                            .addTo(map);

                        marker._pilotData = pilot;
                        allMarkers.push(marker);
                    }
                });

                startDispersedBlinkingLoop(allMarkers);
            })
            .catch(err => console.error("Error loading pilot map dataset:", err));
    }

    document.addEventListener('DOMContentLoaded', () => {
        initPilotsMap();
    });
})();