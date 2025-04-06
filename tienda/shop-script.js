// shop-script.js (CON DEPURACIÓN ADICIONAL)

document.addEventListener('DOMContentLoaded', () => {
    console.log("[DEBUG] DOM completamente cargado y parseado."); // Log inicial

    // --- Funcionalidad del Reloj ---
    try {
        const timeElement = document.getElementById('time');
        const dateElement = document.getElementById('date');

        if (timeElement && dateElement) {
            console.log("[DEBUG] Elementos de reloj encontrados:", timeElement, dateElement); // Log
            let clockIntervalId = null; // Para referencia

            function updateClock() {
                try {
                    const now = new Date();
                    const timeString = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                    const dateString = now.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

                    // ===>>> LOG CLAVE: Muestra qué texto se va a asignar <<<===
                    console.log(`[DEBUG Clock Update] Time: ${timeString}, Date: ${dateString}`);

                    // Intenta asignar directamente
                    timeElement.textContent = timeString;
                    dateElement.textContent = dateString;

                    // ===>>> LOG CLAVE 2: Verifica si se asignó (puede que no refleje inmediatamente si hay error sutil) <<<===
                    // console.log("[DEBUG Clock Update] textContent set for time:", timeElement.textContent);
                    // console.log("[DEBUG Clock Update] textContent set for date:", dateElement.textContent);

                } catch (updateError) {
                     console.error("[DEBUG Clock Update] Error DENTRO de updateClock:", updateError);
                     // Si hay error aquí, detenemos el intervalo para no llenar la consola
                     if (clockIntervalId) {
                         clearInterval(clockIntervalId);
                         console.warn("[DEBUG Clock Update] Intervalo detenido debido a error.");
                     }
                }
            }

            updateClock(); // Primera actualización inmediata
            clockIntervalId = setInterval(updateClock, 1000); // Actualizaciones posteriores
            console.log("[DEBUG] Reloj inicializado y actualizándose. Interval ID:", clockIntervalId); // Log

        } else {
            console.warn("[DEBUG] Elementos de reloj (time o date) no encontrados en el DOM.");
        }
    } catch (error) {
        console.error("[DEBUG] Error inicializando el reloj:", error);
    }

    // --- Inicialización del Carrusel Swiper ---
    // (Mismo código de Swiper que antes)
    try {
        const carouselElement = document.querySelector('.product-carousel');
        if (carouselElement) {
            console.log("[DEBUG] Elemento del carrusel encontrado. Inicializando Swiper...");
            const productCarousel = new Swiper(carouselElement, { /* ... opciones ... */
                loop: true, autoplay: { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true, }, pagination: { el: '.swiper-pagination', clickable: true, dynamicBullets: true, }, navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev', }, slidesPerView: 1, spaceBetween: 15,
             });
            console.log("[DEBUG] Swiper inicializado.");
        } else {
             console.log("[DEBUG] Elemento .product-carousel no encontrado.");
        }
    } catch (error) {
        console.error("[DEBUG] Error inicializando Swiper:", error);
    }


    // --- Lógica para Ocultar/Mostrar Header al Hacer Scroll ---
    // (Mismo código de scroll que antes)
    try {
        const header = document.querySelector('.site-header');
        if (header) {
            console.log("[DEBUG] Header encontrado. Inicializando lógica de scroll.");
            let lastScrollTop = 0; const delta = 5; const headerHeight = header.offsetHeight;
            window.addEventListener('scroll', function() { /* ... lógica scroll ... */
                let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop; if (Math.abs(lastScrollTop - currentScrollTop) <= delta) return; if (currentScrollTop > lastScrollTop && currentScrollTop > headerHeight) { header.classList.add('site-header--hidden'); } else { if (currentScrollTop + window.innerHeight < document.documentElement.scrollHeight - delta) { header.classList.remove('site-header--hidden'); } } lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
            }, { passive: true });
             console.log("[DEBUG] Lógica de scroll del header activa.");
        } else {
            console.log("[DEBUG] Elemento .site-header no encontrado.");
        }
    } catch (error) {
        console.error("[DEBUG] Error en la lógica de scroll del header:", error);
    }


    // --- Lógica para el Formulario de Contacto con EmailJS ---
    // (Mismo código de EmailJS que antes)
     try {
        const contactForm = document.getElementById('contact-form');
        const formMessage = document.getElementById('form-message');
        if (contactForm && formMessage) {
             console.log("[DEBUG] Formulario de contacto encontrado. Configurando EmailJS...");
             const EMAILJS_PUBLIC_KEY = '61nIYLoW5BRUJS0qF'; const EMAILJS_SERVICE_ID = 'service_fycl90c'; const EMAILJS_TEMPLATE_ID = 'template_cdnsnkt';
             let emailJsInitialized = false;
             if (EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'TU_PUBLIC_KEY') { /* ... inicialización emailjs ... */ try { emailjs.init(EMAILJS_PUBLIC_KEY); emailJsInitialized = true; console.log("[DEBUG] EmailJS inicializado."); } catch (initError) { console.error("[DEBUG] Error inicializando EmailJS:", initError); /* ... manejo error ... */ } } else { console.warn("[DEBUG] EmailJS Public Key no configurada."); /* ... manejo advertencia ... */ }
             contactForm.addEventListener('submit', function(event) { /* ... lógica envío ... */ event.preventDefault(); formMessage.textContent = ''; formMessage.classList.remove('success', 'error'); formMessage.style.display = 'none'; if (!emailJsInitialized) { /* ... manejo no inicializado ... */ return; } formMessage.textContent = 'Enviando mensaje...'; formMessage.style.display = 'block'; const submitButton = this.querySelector('.form-button'); if (submitButton) submitButton.disabled = true; emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this) .then(() => { /* ... éxito ... */ formMessage.textContent = '¡Mensaje enviado!'; formMessage.classList.add('success'); contactForm.reset(); console.log("[DEBUG] EmailJS: Mensaje enviado."); }, (error) => { /* ... error ... */ formMessage.textContent = 'Error al enviar.'; formMessage.classList.add('error'); console.error('[DEBUG] Error EmailJS:', JSON.stringify(error)); }) .finally(() => { /* ... siempre ... */ formMessage.style.display = 'block'; if (submitButton) submitButton.disabled = false; }); });
             console.log("[DEBUG] Listener para formulario EmailJS configurado.");
        } else { if (!contactForm) console.log("[DEBUG] #contact-form no encontrado."); if (!formMessage) console.log("[DEBUG] #form-message no encontrado."); }
    } catch (error) { console.error("[DEBUG] Error configurando el formulario de contacto:", error); }

    console.log("[DEBUG] Script shop-script.js finalizado."); // Log final

}); // Fin del DOMContentLoaded