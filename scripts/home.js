// script.js

document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById('board');
    const buttonsContainer = document.getElementById('buttons-container');
    const resetButton = document.getElementById('reset-btn');
    let squares = [];
    let revealed = [];
    let matchedPairs = 0;
    const totalPairs = 5;
    const images = [
        '../images\image1.png',
        '../images/image2.png',
        '../images/image3.png',
        '../images/image4.png',
        '../images/image5.png'
    ];

    function initBoard() {
        const savedState = sessionStorage.getItem('memoryGameState');
        if (savedState) {
            const gameState = JSON.parse(savedState);
            squares = gameState.squares;
            matchedPairs = gameState.matchedPairs;
            loadBoardState();
        } else {
            setupNewGame();
        }
    }

    function setupNewGame() {
        board.innerHTML = '';
        squares = [];
        revealed = [];
        matchedPairs = 0;
        const imagePairs = [...images, ...images];
        imagePairs.sort(() => Math.random() - 0.5);

        imagePairs.forEach((image, index) => {
            const square = document.createElement('div');
            square.classList.add('square');
            square.dataset.image = image;

            const imageElement = document.createElement('div');
            imageElement.classList.add('image');
            imageElement.style.backgroundImage = `url(${image})`;
            square.appendChild(imageElement);

            square.addEventListener('click', () => handleClick(square));
            board.appendChild(square);
            squares.push({
                element: square,
                revealed: false,
                matched: false,
                id: index
            });
        });

        
        hideAllButtons();
        saveGameState();
    }

    function loadBoardState() {
        board.innerHTML = ''; // Limpiar el tablero antes de cargar el estado
        squares.forEach((square, index) => {
            const squareElement = document.createElement('div');
            squareElement.classList.add('square');
            squareElement.dataset.image = square.element.dataset.image;

            const imageElement = document.createElement('div');
            imageElement.classList.add('image');
            imageElement.style.backgroundImage = `url(${square.element.dataset.image})`;
            squareElement.appendChild(imageElement);

            if (square.revealed) {
                squareElement.classList.add('revealed');
            }

            if (square.matched) {
                squareElement.classList.add('matched');
                squareElement.style.backgroundColor = 'green';
                setButtonVisibility(square.element.dataset.image);
            }

            squareElement.addEventListener('click', () => handleClick(squareElement));
            board.appendChild(squareElement);
            squares[index].element = squareElement;
        });

        
    }

    function handleClick(squareElement) {
        const square = squares.find(s => s.element === squareElement);

        if (revealed.length === 2 || square.revealed || square.matched) return;

        square.revealed = true;
        squareElement.classList.add('revealed');

        revealed.push(square);

        if (revealed.length === 2) {
            checkMatch();
        }

        saveGameState();
    }

    function checkMatch() {
        const [first, second] = revealed;

        if (first.element.dataset.image === second.element.dataset.image) {
            first.matched = true;
            second.matched = true;
            matchedPairs += 1;

            first.element.classList.add('matched');
            second.element.classList.add('matched');

            setButtonVisibility(first.element.dataset.image);

            if (matchedPairs === totalPairs) {
                setTimeout(() => {
                    Swal.fire({
                        title: '¡Felicidades!',
                        text: 'Has encontrado todas las parejas.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        resetButton.style.display = "inline-block"; // Mostrar botón de reiniciar cuando todas las parejas se encuentren
                    });
                }, 500);
            }

            revealed = [];
        } else {
            setTimeout(() => {
                first.revealed = false;
                second.revealed = false;
                first.element.classList.remove('revealed');
                second.element.classList.remove('revealed');
                revealed = [];
                saveGameState();
            }, 1000);
        }

        saveGameState();
    }

    resetButton.addEventListener('click', () => {
        sessionStorage.removeItem('memoryGameState');
        setupNewGame();
    });

    function saveGameState() {
        const gameState = {
            squares: squares.map(square => ({
                revealed: square.revealed,
                matched: square.matched,
                element: {
                    dataset: {
                        image: square.element.dataset.image
                    }
                }
            })),
            matchedPairs: matchedPairs
        };
        sessionStorage.setItem('memoryGameState', JSON.stringify(gameState));
        saveButtonsState();
    }

    function saveButtonsState() {
        const buttonsState = {
            cronogramaBtn: document.getElementById("cronograma-btn").style.display,
            historiaBtn: document.getElementById("historia-btn").style.display,
            hojasBtn: document.getElementById("hojas-btn").style.display,
            registroBtn: document.getElementById("registro-btn").style.display,
            visionBtn: document.getElementById("vision-btn").style.display
        };
        localStorage.setItem('buttonsState', JSON.stringify(buttonsState));
    }

    function loadButtonsState() {
        const savedButtonsState = localStorage.getItem('buttonsState');
        if (savedButtonsState) {
            const buttonsState = JSON.parse(savedButtonsState);
            document.getElementById("cronograma-btn").style.display = buttonsState.cronogramaBtn;
            document.getElementById("historia-btn").style.display = buttonsState.historiaBtn;
            document.getElementById("hojas-btn").style.display = buttonsState.hojasBtn;
            document.getElementById("registro-btn").style.display = buttonsState.registroBtn;
            document.getElementById("vision-btn").style.display = buttonsState.visionBtn;
        }
    }

    function setButtonVisibility(image) {
        let btnId;
        switch (image) {
            case 'images/image1.png':
                btnId = "cronograma-btn";
                break;
            case 'images/image2.png':
                btnId = "historia-btn";
                break;
            case 'images/image3.png':
                btnId = "hojas-btn";
                break;
            case 'images/image4.png':
                btnId = "registro-btn";
                break;
            case 'images/image5.png':
                btnId = "vision-btn";
                break;
        }
        const button = document.getElementById(btnId);
        if (button) {
            button.style.display = 'inline-block';
            setButtonClickHandler(button, btnId);
        }
    }

    function setButtonClickHandler(button, btnId) {
        let targetPage;
        switch (btnId) {
            case "cronograma-btn":
                targetPage = "pages/cronograma.html";
                break;
            case "historia-btn":
                targetPage = "pages/historia.html";
                break;
            case "hojas-btn":
                targetPage = "pages/hojas_de_vida.html";
                break;
            case "registro-btn":
                targetPage = "pages/registro.html";
                break;
            case "vision-btn":
                targetPage = "pages/vision_mision.html";
                break;
        }
        button.addEventListener('click', () => {
            window.location.href = targetPage;
        });
    }

    function hideAllButtons() {
        const buttonIds = [
            'cronograma-btn',
            'historia-btn',
            'hojas-btn',
            'registro-btn',
            'vision-btn'
        ];
        buttonIds.forEach(id => {
            document.getElementById(id).style.display = 'none';
        });
    }

    loadButtonsState();
    initBoard();
});
