(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const mountPoint = document.getElementById('ecosystem-animation-mount');
    if (!mountPoint) return;

    mountPoint.innerHTML = `
<div id="vistaguay-animation-container" class="relative w-full max-w-2xl mx-auto max-h-[380px] md:max-h-[420px] overflow-visible select-none mt-4 sm:mt-6 scale-95 sm:scale-100 lg:scale-105 transform origin-top">
      <div class="relative w-full aspect-[4/3] max-h-[480px]">
        
        <div id="vg-title-badge" class="absolute left-1/2 top-[8%] -translate-x-1/2 -translate-y-1/2 z-25 transition-all duration-700 opacity-0 scale-50 pointer-events-none">
          <div class="px-5 py-2 rounded-full bg-primary text-white font-extrabold text-sm sm:text-sm shadow-[0_8px_25px_rgba(71,194,120,0.3)] flex items-center justify-center">
            <span>Ecosistema Integrado</span>
          </div>
        </div>

        <div id="vg-center-logo" class="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-700 opacity-0 scale-50 pointer-events-none">
          <div class="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-white border-2 border-primary shadow-[0_15px_35px_rgba(71,194,120,0.4)] flex items-center justify-center p-1.5 overflow-hidden">
            <img src="images/iso-logo.png" alt="Vistaguay Isotipo" class="w-full h-full object-contain" onError="this.src='iso-logo.png'" />
          </div>
        </div>

        <svg viewBox="0 0 800 600" class="w-full h-full absolute inset-0 overflow-visible pointer-events-none">
  <line id="line-farmer-dev" x1="400" y1="60" x2="120" y2="450" stroke="#47C278" stroke-width="3.5" stroke-linecap="round" class="opacity-0 transition-opacity duration-700" />
  <line id="line-farmer-pilot" x1="400" y1="60" x2="680" y2="450" stroke="#47C278" stroke-width="3.5" stroke-linecap="round" class="opacity-0 transition-opacity duration-700" />
  <line id="line-dev-pilot" x1="120" y1="450" x2="680" y2="450" stroke="#47C278" stroke-width="3.5" stroke-linecap="round" class="opacity-0 transition-opacity duration-700" />

  <line id="line-farmer-center" x1="400" y1="60" x2="400" y2="300" stroke="#47C278" stroke-width="4" stroke-linecap="round" stroke-dasharray="6,6" class="opacity-0 transition-opacity duration-700" />
  <line id="line-dev-center" x1="120" y1="450" x2="400" y2="300" stroke="#47C278" stroke-width="4" stroke-linecap="round" stroke-dasharray="6,6" class="opacity-0 transition-opacity duration-700" />
  <line id="line-pilot-center" x1="680" y1="450" x2="400" y2="300" stroke="#47C278" stroke-width="4" stroke-linecap="round" stroke-dasharray="6,6" class="opacity-0 transition-opacity duration-700" />
</svg>

<div id="vg-node-farmer" class="vg-node absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer flex flex-col items-center select-none transition-all duration-700">
  <div id="bubble-farmer" class="vg-bubble absolute bottom-full mb-3 left-1/2 z-50 w-max max-w-[220px] opacity-0 pointer-events-none transition-all duration-400" style="transform: translate(-50%, 0) scale(0.5);">
    <div class="relative px-3.5 py-2 rounded-2xl bg-primary text-white font-semibold text-sm shadow-lg border border-emerald-300 text-center">
      <span>"Quiero soluciones sin comprar un dron"</span>
      <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-primary"></div>
    </div>
  </div>
  <div class="node-circle w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-white flex items-center justify-center p-1 shadow-xl">
    <div class="w-full h-full rounded-full bg-emerald-50/60 flex items-center justify-center p-2 overflow-hidden">
      <img src="images/Farmer.jpg" alt="Productor" class="w-full h-full object-contain" onError="this.src='Farmer.jpg'" />
    </div>
  </div>
  <span class="node-title absolute -bottom-9 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-sm font-bold text-slate-900 bg-white border border-slate-200 shadow-sm whitespace-nowrap">Productor</span>
</div>

<div id="vg-node-pilot" class="vg-node absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer flex flex-col items-center select-none transition-all duration-700">
  <div id="bubble-pilot" class="vg-bubble absolute top-full mt-11 left-1/2 z-50 w-max max-w-[200px] opacity-0 pointer-events-none transition-all duration-400" style="transform: translate(-50%, 0) scale(0.5);">
    <div class="relative px-3.5 py-2 rounded-2xl bg-primary text-white font-semibold text-sm shadow-lg border border-emerald-300 text-center">
      <div class="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-primary"></div>
      <span>"Quiero volar más en mi zona"</span>
    </div>
  </div>
  <div class="node-circle w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-white flex items-center justify-center p-1 shadow-xl">
    <div class="w-full h-full rounded-full bg-emerald-50/60 flex items-center justify-center p-2 overflow-hidden">
      <img src="images/Pilot.jpg" alt="Pilotos" class="w-full h-full object-contain" onError="this.src='Pilot.jpg'" />
    </div>
  </div>
  <span class="node-title absolute -bottom-9 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-sm font-bold text-slate-900 bg-white border border-slate-200 shadow-sm whitespace-nowrap">Pilotos</span>
</div>

<div id="vg-node-dev" class="vg-node absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer flex flex-col items-center select-none transition-all duration-700">
  <div id="bubble-dev" class="vg-bubble absolute top-full mt-11 left-1/2 z-50 w-max max-w-[210px] opacity-0 pointer-events-none transition-all duration-400" style="transform: translate(-50%, 0) scale(0.5);">
    <div class="relative px-3.5 py-2 rounded-2xl bg-primary text-white font-semibold text-sm shadow-lg border border-emerald-300 text-center">
      <div class="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-primary"></div>
      <span>"Quiero vender mis algoritmos"</span>
    </div>
  </div>
  <div class="node-circle w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-white flex items-center justify-center p-1 shadow-xl">
    <div class="w-full h-full rounded-full bg-emerald-50/60 flex items-center justify-center p-2 overflow-hidden">
      <img src="images/Dev.jpg" alt="Desarrolladores" class="w-full h-full object-contain" onError="this.src='Dev.jpg'" />
    </div>
  </div>
  <span class="node-title absolute -bottom-9 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-sm font-bold text-slate-900 bg-white border border-slate-200 shadow-sm whitespace-nowrap">Desarrolladores</span>
</div>

      </div>
    </div>
  `;

    const nodeFarmer = document.getElementById('vg-node-farmer');
    const nodePilot = document.getElementById('vg-node-pilot');
    const nodeDev = document.getElementById('vg-node-dev');

    const bubbleFarmer = document.getElementById('bubble-farmer');
    const bubblePilot = document.getElementById('bubble-pilot');
    const bubbleDev = document.getElementById('bubble-dev');

    const titleBadge = document.getElementById('vg-title-badge');
    const centerLogo = document.getElementById('vg-center-logo');

    const lineFarmerDev = document.getElementById('line-farmer-dev');
    const lineFarmerPilot = document.getElementById('line-farmer-pilot');
    const lineDevPilot = document.getElementById('line-dev-pilot');

    const lineFarmerCenter = document.getElementById('line-farmer-center');
    const lineDevCenter = document.getElementById('line-dev-center');
    const linePilotCenter = document.getElementById('line-pilot-center');

    let timelineTimeout = null;

    function runEcosystemAnimation() {
      clearTimeout(timelineTimeout);

      titleBadge.style.opacity = '0';
      titleBadge.style.transform = 'translate(-50%, -50%) scale(0.5)';
      centerLogo.style.opacity = '0';
      centerLogo.style.transform = 'translate(-50%, -50%) scale(0.5)';

      [lineFarmerDev, lineFarmerPilot, lineDevPilot, lineFarmerCenter, lineDevCenter, linePilotCenter].forEach(l => l.style.opacity = '0');
      [bubbleFarmer, bubblePilot, bubbleDev].forEach(b => {
        b.style.opacity = '0';
        b.style.transform = 'translate(-50%, 0) scale(0.5)';
      });

      nodeFarmer.style.opacity = '0';
      nodeFarmer.style.left = '18%';
      nodeFarmer.style.top = '60%';
      nodeFarmer.style.transform = 'translate(-50%, -50%) scale(0.9)';

      nodePilot.style.opacity = '0';
      nodePilot.style.left = '50%';
      nodePilot.style.top = '60%';
      nodePilot.style.transform = 'translate(-50%, -50%) scale(0.9)';

      nodeDev.style.opacity = '0';
      nodeDev.style.left = '82%';
      nodeDev.style.top = '60%';
      nodeDev.style.transform = 'translate(-50%, -50%) scale(0.9)';

      setTimeout(() => {
        titleBadge.style.opacity = '1';
        titleBadge.style.transform = 'translate(-50%, -50%) scale(1)';
      }, 100);

      setTimeout(() => { nodeFarmer.style.opacity = '1'; }, 700);
      setTimeout(() => { nodePilot.style.opacity = '1'; }, 1400);
      setTimeout(() => { nodeDev.style.opacity = '1'; }, 2100);

      setTimeout(() => {
        if (titleBadge) titleBadge.style.opacity = '0';

        nodeFarmer.style.left = '50%';
        nodeFarmer.style.top = '10%';
        nodeFarmer.style.transform = 'translate(-50%, -50%) scale(0.9)';

        nodeDev.style.left = '15%';
        nodeDev.style.top = '75%';
        nodeDev.style.transform = 'translate(-50%, -50%) scale(0.9)';

        nodePilot.style.left = '85%';
        nodePilot.style.top = '75%';
        nodePilot.style.transform = 'translate(-50%, -50%) scale(0.9)';
        if (typeof centerLogo !== 'undefined' && centerLogo) {
          centerLogo.style.left = '50%';
          centerLogo.style.top = '50%';
          centerLogo.style.transform = 'translate(-50%, -50%) scale(0.9)';
        }

        [lineFarmerDev, lineFarmerPilot, lineDevPilot].forEach(l => {
          if (l) l.style.opacity = '1';
        });
      }, 3300);

      setTimeout(() => {
        bubbleFarmer.style.opacity = '1';
        bubbleFarmer.style.transform = 'translate(-50%, 0) scale(1)';
      }, 4900);

      setTimeout(() => {
        bubbleFarmer.style.opacity = '0';
        bubbleFarmer.style.transform = 'translate(-50%, 0) scale(0.5)';
        bubblePilot.style.opacity = '1';
        bubblePilot.style.transform = 'translate(-50%, 0) scale(1)';
      }, 7300);

      setTimeout(() => {
        bubblePilot.style.opacity = '0';
        bubblePilot.style.transform = 'translate(-50%, 0) scale(0.5)';
        bubbleDev.style.opacity = '1';
        bubbleDev.style.transform = 'translate(-50%, 0) scale(1)';
      }, 9700);

      setTimeout(() => {
        bubbleDev.style.opacity = '0';
        bubbleDev.style.transform = 'translate(-50%, 0) scale(0.5)';

        [lineFarmerDev, lineFarmerPilot, lineDevPilot].forEach(l => l.style.opacity = '0');
        [lineFarmerCenter, lineDevCenter, linePilotCenter].forEach(l => l.style.opacity = '1');

        centerLogo.style.opacity = '1';
        centerLogo.style.transform = 'translate(-50%, -50%) scale(1)';
      }, 12100);

      timelineTimeout = setTimeout(() => {
        runEcosystemAnimation();
      }, 16000);
    }

    runEcosystemAnimation();
  });
})();