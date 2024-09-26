const carousel = document.getElementById('carousel');
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;
const totalSlides = slides.length;

function updateCarousel() {
    // Mueve el carrusel a la posición correcta
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Pausa todos los videos y reproduce el del slide actual
    slides.forEach((slide, index) => {
        const iframe = slide.querySelector('iframe');
        if (index === currentIndex) {
            iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        } else {
            iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }
    });
}

document.getElementById('nextBtn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides; // Carrusel infinito hacia adelante
    updateCarousel();
});

document.getElementById('prevBtn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Carrusel infinito hacia atrás
    updateCarousel();
});

// Inicialización del carrusel
updateCarousel();
