const slide = document.querySelector('.carousel-slide');
const img = document.querySelectorAll('.carousel-slide img');

const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');

let currentIndex = 0;
const totalImages = img.length;

// Función para actualizar la posición del carrusel
function updateCarousel() {
    const offset = -currentIndex * 100; // Desplazamiento en porcentaje
    slide.style.transform = `translateX(${offset}%)`;
}

// Evento para el botón "Siguiente"
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalImages; // Ciclo infinito
    updateCarousel();
});

// Evento para el botón "Anterior"
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages; // Ciclo infinito
    updateCarousel();
});

