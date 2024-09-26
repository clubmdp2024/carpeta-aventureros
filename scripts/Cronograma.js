window.onload = function() {
    const puzzleGrid = document.getElementById("puzzle");
    const zoomContainer = document.getElementById("zoom-container");
    const zoomedImage = document.getElementById("zoomed-image");
    const closeZoomBtn = document.getElementById("close-zoom");
    const lens = document.querySelector(".lens");

    const puzzlePieces = [];

    // Crear 12 piezas del rompecabezas
    for (let i = 0; i < 12; i++) {
        const piece = document.createElement("div");
        piece.classList.add("puzzle-piece");
        piece.style.backgroundPosition = `${-(i % 4) * 256}px ${-Math.floor(i / 4) * 131.11}px`;
        piece.dataset.index = i; // Guardar el índice
        puzzlePieces.push(piece);
    }

    // Mezclar y agregar piezas al contenedor
    puzzlePieces.sort(() => Math.random() - 0.5).forEach(piece => {
        puzzleGrid.appendChild(piece);
        
        piece.addEventListener("click", () => {
            zoomedImage.src = `../images/rompecabezas.png`; // Cambiar a la imagen correspondiente
            zoomContainer.style.display = 'flex';
        });
    });

    // Cerrar zoom
    closeZoomBtn.addEventListener("click", () => {
        zoomContainer.style.display = 'none';
        lens.style.display = 'none'; // Eliminar la lupa al cerrar
    });

    zoomedImage.addEventListener("mousemove", (e) => {
        const rect = zoomedImage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Posicionar la lupa
        lens.style.left = `${e.clientX - 50}px`; // Centrar la lupa
        lens.style.top = `${e.clientY - 50}px`; // Centrar la lupa
        lens.style.display = 'block'; // Mostrar la lupa

        // Aplicar el efecto de lupa
        lens.style.backgroundImage = `url(${zoomedImage.src})`;
        lens.style.backgroundSize = `${zoomedImage.offsetWidth * 2}px ${zoomedImage.offsetHeight * 2}px`;
        lens.style.backgroundPosition = `-${x * 2}px -${y * 2}px`; // Desplazar la imagen según el cursor
    });

    zoomedImage.addEventListener("mouseleave", () => {
        lens.style.display = 'none'; // Ocultar la lupa cuando el cursor sale de la imagen
    });
};
