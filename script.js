document.addEventListener('DOMContentLoaded', () => {

    // --- Selección de Elementos DOM ---
    const bodyElement = document.body;
    const enterButton = document.getElementById('enter-shop-button');
    const buttonText = enterButton.querySelector('.button-text');
    const progressBarContainer = document.getElementById('progress-bar-container');
    const progressBar = document.getElementById('progress-bar');
    const progressPercentage = document.getElementById('progress-percentage');
    const loadingStatusText = document.getElementById('loading-status-text');
    const productSpots = document.querySelectorAll('.product-spot');

    // --- Datos de Imágenes de Producto ---
    const productImages = [
        { src: 'imagenes-inicio/reloj.png', alt: 'Elegante reloj de pulsera' },
        { src: 'imagenes-inicio/computadora.png', alt: 'Laptop moderna y potente' },
        { src: 'imagenes-inicio/play4.png', alt: 'Consola de videojuegos PlayStation 4' },
        { src: 'imagenes-inicio/cafetera.png', alt: 'Cafetera de goteo automática' },
        { src: 'imagenes-inicio/auriculares.png', alt: 'Auriculares inalámbricos con cancelación de ruido' },
        { src: 'imagenes-inicio/zapatillas.png' , alt: 'Zapatillas deportivas cómodas' }
        // Agrega más imágenes si lo deseas
    ];

    // --- Variables para Animación de Imágenes ---
    let currentSpotIndex = -1; // Iniciar en -1 para que el primero sea 0
    let currentImageIndex = -1;
    const imageIntervalTime = 4000; // 4 segundos
    const imageFadeTime = 800; // 0.8 segundos (coincide con CSS transition)
    let imageInterval;

    // --- Precarga de Imágenes ---
    function preloadImages(images) {
        images.forEach(imageData => {
            const img = new Image();
            img.src = imageData.src;
        });
        console.log("Imágenes precargadas iniciadas.");
    }

    // --- Lógica de Imágenes Flotantes ---
    function showNextImage() {
        // 1. Ocultar el spot actual (si hay uno)
        if (currentSpotIndex !== -1) {
            productSpots[currentSpotIndex].classList.remove('active');
        }

        // 2. Esperar a que termine el fade-out antes de cambiar y mostrar el nuevo
        setTimeout(() => {
            // 3. Seleccionar el siguiente spot (cíclico)
            currentSpotIndex = (currentSpotIndex + 1) % productSpots.length;
            const nextSpot = productSpots[currentSpotIndex];
            const imgElement = nextSpot.querySelector('img');

            // 4. Seleccionar una imagen aleatoria (diferente a la anterior si es posible)
            let randomImageIndex;
            do {
                randomImageIndex = Math.floor(Math.random() * productImages.length);
            } while (productImages.length > 1 && randomImageIndex === currentImageIndex); // Evita repetir si hay más de 1 imagen
            currentImageIndex = randomImageIndex;
            const randomImage = productImages[currentImageIndex];

            // 5. Actualizar la imagen en el spot seleccionado
            imgElement.src = randomImage.src;
            imgElement.alt = randomImage.alt;

            // 6. Mostrar el nuevo spot (fade-in)
            nextSpot.classList.add('active');

        }, imageFadeTime); // Esperar la duración del fade-out
    }

    // --- Lógica del Botón de Entrada y Carga ---
    const buttonTransitionTime = 600; // ms (coincide con CSS transition)
    const progressBarFillTime = 2500; // ms (coincide con CSS transition)
    const redirectDelay = 300; // ms (pequeño margen después de completar la barra)

    enterButton.addEventListener('click', () => {
        // Detener animación de imágenes de fondo
        clearInterval(imageInterval);
        productSpots.forEach(spot => spot.classList.remove('active')); // Ocultarlas

        // 1. Iniciar Transformación del Botón y Atenuación del Fondo
        enterButton.classList.add('loading');
        enterButton.disabled = true; // Desactivar botón
        bodyElement.classList.add('dimmed');
        setTimeout(() => bodyElement.classList.add('active'), 50); // Activar fade de atenuación

        // 2. Mostrar Texto de Estado (con ligero retraso)
        setTimeout(() => {
            loadingStatusText.classList.add('visible');
        }, buttonTransitionTime / 2); // A mitad de la transformación del botón

        // 3. Iniciar Animación de la Barra de Progreso (después de la transformación inicial)
        setTimeout(() => {
            let progress = 0;
            const intervalStep = 50; // Actualizar cada 50ms
            const totalSteps = progressBarFillTime / intervalStep;
            let currentStep = 0;

            progressBar.style.transition = `width ${progressBarFillTime}ms linear`; // Asegurar la transición JS/CSS
            progressBar.style.width = '100%'; // Iniciar la animación CSS

            const progressInterval = setInterval(() => {
                currentStep++;
                progress = Math.min(100, Math.round((currentStep / totalSteps) * 100));
                progressPercentage.textContent = `${progress}%`;

                if (progress >= 100) {
                    clearInterval(progressInterval);
                    // 4. Redirigir después de un pequeño margen
                    setTimeout(() => {
                         window.location.href = 'tienda/tienda.html';
                       // console.log("Redirigiendo a tienda/tienda.html..."); // Para pruebas
                    }, redirectDelay);
                }
            }, intervalStep);

        }, buttonTransitionTime); // Empezar a llenar la barra cuando la transformación del botón termine
    });

    // --- Inicialización ---
    preloadImages(productImages);
    showNextImage(); // Mostrar la primera imagen inmediatamente
    imageInterval = setInterval(showNextImage, imageIntervalTime); // Iniciar ciclo de imágenes

}); // Fin de DOMContentLoaded