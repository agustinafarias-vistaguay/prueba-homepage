/**
 * @file testimonials.js
 * @description Controls the 3D slide carousel with central scaling using getIcon('quote').
 */

(function () {
    const testimonials = [
        { quote: "Para nosotros como asesores, Vistaguay es rápida y ágil de utilizar. Desde que la usamos, nos ha permitido ser mucho más eficientes en el tiempo en el que procesamos las imágenes", name: "Santiago Cha", role: "Socio Fundador, Vantagro" },
        { quote: "La nueva plataforma permite vincular la necesidad de un productor con el piloto de dron. Además, te dan un protocolo de vuelo muy simple de lo que el cliente necesita, facilitando el trabajo. Para mí, es el Tinder de los drones", name: "Lucas Fiandrino", role: "Piloto de Drones" },
        { quote: "Gracias a la alianza estratégica con Vistaguay, podemos ofrecer el servicio en todo el país y que todo productor obtenga ahorros de más de 60% en insumos", name: "Pablo Provera", role: "Responsable de Xarvio (BASF)" },
        { quote: "Vistaguay nos permite correlacionar la información digital con lo que veíamos en el campo. Nos ayuda a saber dónde estamos parados y, lo más importante, definir qué cosas podríamos mejorar", name: "Santiago Tourn", role: "Fundador de Mecatech" },
        { quote: "En conjunto a Vistaguay desarrollamos un algoritmo novedoso para Alfalfa. Recomiendo la plataforma a los productores para hacer las mediciones y poder tomar decisiones cada vez más precisas", name: "Fernando Scaramuzza", role: "Investigador, INTA Manfredi" },
        { quote: "Vistaguay entiende las necesidades del trabajo a escala de investigación, dándonos información objetiva y robusta. Se adaptaron muy bien a nuestras necesidades y ofrecen muy buen soporte al cliente en tiempos cortos", name: "Ignacio Colonna", role: "Responsable Global de Desarrollo de Productos, Agrithority" },
        { quote: "Lo que más nos gustó de Vistaguay es la flexibilidad que tuvieron para adaptar la solución a nuestros sistemas. Esto es clave para lograr la escalabilidad que buscamos y para tener un buen diagnóstico que impacta en el resultado económico", name: "Pedro Hales", role: "Coordinador, Grupo Ria" },
        { quote: "Vistaguay me permitió darle un valor agregado a mi profesión, haciendo más eficiente la actividad agropecuaria. La plataforma es muy confiable y, lo mejor, el trato es personalizado. Lo recomiendo", name: "Facundo Fontana", role: "Asesor Privado" },
        { quote: "Encontramos en Vistaguay un proveedor estratégico. Su plataforma nos permite evaluar rápidamente, de manera precisa y a mayor escala cómo está funcionando nuestro producto a campo, en cualquier lugar del mundo", name: "Federico Cola", role: "Fundador, Seed Matriz" },
        { quote: "La plataforma de Vistaguay nos gustó por lo visual e intuitivo de sus reportes, pero sobre todo por la velocidad de entrega. Quedamos muy conformes y recomendamos a quienes están necesitando un servicio similar.", name: "Martín Rainaudo", role: "Gerente, Bamburubí" },
        { quote: "Vistaguay me permite hacer vuelos para productores cerca de mi ubicación. Yo solo cargo las imágenes y cobro por mi vuelo. Si tenés un dron y querés aprovecharlo, te recomiendo sumarte", name: "Pablo Bettini", role: "Piloto de Dron, Vistaguay Expert" }
    ];

    let activeTestimonialIndex = testimonials.length;
    let testimonialInterval = null;
    let isTransitioning = false;

    function initTestimonials() {
        const track = document.getElementById('testimonial-track');
        if (!track) return;
        track.innerHTML = '';

        const loopList = [...testimonials, ...testimonials, ...testimonials];

        loopList.forEach((item) => {
            const cardDiv = document.createElement('div');
            cardDiv.className = `testimonial-card flex flex-col justify-between min-h-[180px] w-[230px] sm:w-[270px] md:w-[300px] shrink-0 select-none`;
            cardDiv.innerHTML = `
            <div>
                ${getIcon('quote', 'w-6 h-6 text-primary mb-2 shrink-0')}
                <p class="text-sm text-slate-600 leading-normal italic mb-6">"${item.quote}"</p>
            </div>
            <div class="flex items-center gap-4">
                <div class="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center font-extrabold text-primary text-[10px]">
                    ${item.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                    <p class="text-sm font-bold text-slate-800">${item.name}</p>
                    <p class="text-xs text-slate-500 font-medium">${item.role}</p>
                </div>
            </div>
        `;

            ['mouseenter', 'mousedown', 'touchstart'].forEach(evt => {
                cardDiv.addEventListener(evt, pauseTestimonialCycling);
            });
            ['mouseleave', 'mouseup', 'touchend'].forEach(evt => {
                cardDiv.addEventListener(evt, startTestimonialCycling);
            });
            track.appendChild(cardDiv);
        });
    }

    function renderTestimonials(animate = true) {
        const track = document.getElementById('testimonial-track');
        if (!track) return;

        const cards = track.children;
        if (cards.length === 0) return;

        const container = track.parentElement;
        const containerWidth = container.offsetWidth;
        const paddingLeft = parseFloat(window.getComputedStyle(container).paddingLeft) || 0;
        const cardWidth = cards[0].offsetWidth || 270;
        const gap = window.innerWidth >= 640 ? 24 : 16;

        const activeCardCenter = (activeTestimonialIndex * (cardWidth + gap)) + (cardWidth / 2);
        const translateX = (containerWidth / 2) - paddingLeft - activeCardCenter;

        track.style.transition = animate ? 'transform 500ms ease-in-out' : 'none';
        track.style.transform = `translateX(${translateX}px)`;

        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            const isActive = i === activeTestimonialIndex;

            card.style.transition = animate ? 'all 500ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none';

            const baseClass = `testimonial-card flex flex-col justify-between min-h-[180px] w-[230px] sm:w-[270px] md:w-[300px] shrink-0 select-none`;

            if (isActive) {
                // Tarjeta Central: Escala destacada
                card.className = `${baseClass} scale-105 sm:scale-110 z-20 !border-2 !border-primary shadow-[0_20px_50px_rgba(71,194,120,0.22)] bg-white opacity-100`;
            } else {
                // Tarjetas Laterales: Reducidas y atenuadas
                card.className = `${baseClass} scale-95 z-10 border border-slate-200 bg-slate-50 opacity-70 shadow-none`;
            }
        }

        const dotsEl = document.getElementById('testimonial-dots');
        if (dotsEl) {
            const realIndex = activeTestimonialIndex % testimonials.length;
            dotsEl.innerHTML = testimonials.map((_, i) => `
            <button onclick="jumpToTestimonial(${i})" 
                    aria-label="Ir al testimonio ${i + 1}"
                    class="h-1 rounded-full transition-all duration-500 ease-out cursor-pointer ${i === realIndex
                    ? 'w-4 bg-primary'
                    : 'w-1 bg-slate-200 hover:bg-slate-300'
                }"></button>
        `).join('');
        }
    }

    function nextTestimonial() {
        if (isTransitioning) return;
        isTransitioning = true;

        activeTestimonialIndex++;
        renderTestimonials(true);

        setTimeout(() => {
            if (activeTestimonialIndex >= testimonials.length * 2) {
                activeTestimonialIndex -= testimonials.length;
                renderTestimonials(false);
            }
            isTransitioning = false;
        }, 500);
    }

    function prevTestimonial() {
        if (isTransitioning) return;
        isTransitioning = true;

        activeTestimonialIndex--;
        renderTestimonials(true);

        setTimeout(() => {
            if (activeTestimonialIndex < testimonials.length) {
                activeTestimonialIndex += testimonials.length;
                renderTestimonials(false);
            }
            isTransitioning = false;
        }, 500);
    }

    function startTestimonialCycling() {
        if (testimonialInterval) clearInterval(testimonialInterval);
        testimonialInterval = setInterval(() => {
            nextTestimonial();
        }, 4000);
    }

    function jumpToTestimonial(index) {
        if (isTransitioning) return;
        pauseTestimonialCycling();

        activeTestimonialIndex = testimonials.length + index;
        renderTestimonials(true);

        setTimeout(() => {
            isTransitioning = false;
            startTestimonialCycling();
        }, 500);
    }

    function pauseTestimonialCycling() {
        if (testimonialInterval) {
            clearInterval(testimonialInterval);
            testimonialInterval = null;
        }
    }

    window.jumpToTestimonial = jumpToTestimonial;
    window.nextTestimonial = nextTestimonial;
    window.prevTestimonial = prevTestimonial;

    document.addEventListener('DOMContentLoaded', () => {
        initTestimonials();
        renderTestimonials();
        startTestimonialCycling();

        const prevBtn = document.getElementById('prev-test-btn');
        const nextBtn = document.getElementById('next-test-btn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                pauseTestimonialCycling();
                prevTestimonial();
                startTestimonialCycling();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                pauseTestimonialCycling();
                nextTestimonial();
                startTestimonialCycling();
            });
        }

        window.addEventListener('resize', () => {
            renderTestimonials(false);
        });
    });

})();