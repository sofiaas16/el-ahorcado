// Game Variables
const palabras = ["esternocleidomastoideo", "miguel", "papitas", "docker", "html", "pollito"];
let palabraOculta; // The word that the usuer have to guess
let errores = 0; // the counter of mistakes
const maxErrores = 7; // this is the max amount of mistakes...

// DOM Elements:

// HTML element that will display the hidden word as blank spaces or revealed letters
const contenedorPalabra = document.getElementById("palabra");

// Container where the virtual keyboard (A-Z buttons) will be generated
const contenedorTeclado = document.getElementById("teclado");

// Button to restart the game when the player wins or loses
const botonReiniciar = document.getElementById("reiniciar");

// Image element used to display hangman drawing based on the number of mistakes
const imagenAhorcado = document.getElementById("imagenAhorcado");

// Initialize Game
function iniciarJuego() {
    // 1. Select a random word from the 'palabras' list
    palabraOculta = palabras[Math.floor(Math.random() * palabras.length)];

    // 2. Reset game state
    errores = 0;
    contenedorPalabra.innerHTML = '';
    contenedorTeclado.innerHTML = '';
    imagenAhorcado.src = "img/primera.png";

    // 3. Display placeholders (spans) for each letter in the selected word
    for (let letra of palabraOculta) {
        const span = document.createElement("span");
        span.textContent = ''; // Initially empty; will be filled when guessed correctly
        contenedorPalabra.appendChild(span);
    }

    // 4.The KEYBOARD
    for (let i = 65; i <= 90; i++) {
        const letra = String.fromCharCode(i);
        const boton = document.createElement("button");
        boton.textContent = letra;
        boton.addEventListener("click", () => procesarLetra(letra.toLowerCase(), boton));
        contenedorTeclado.appendChild(boton);
    }
}

// Process a guessed letter
function procesarLetra(letra, boton) {
    boton.disabled = true; // Disable the button after the user click on a letter
    const spans = contenedorPalabra.getElementsByTagName("span");
    let acierto = false;

    // Check if the letter is in the word
    for (let i = 0; i < palabraOculta.length; i++) {
        if (palabraOculta[i] === letra) {
            spans[i].textContent = letra;
            acierto = true;
        }
    }

    // Handle incorrect guess
    if (!acierto) {
        errores++;
        mostrarParteAhorcado(errores);
        if (errores === maxErrores) {
            alert(`¡Perdiste! La palabra era: ${palabraOculta}`);
            deshabilitarTeclado();
        }
    }
    // Check for win
    else if (Array.from(spans).every(span => span.textContent !== '')) {
        alert("¡Ganaste!");
        deshabilitarTeclado();
    }
}

// Update hangman image based on errors
function mostrarParteAhorcado(errores) {
    const imagenes = ["primera", "segunda", "tercera", "cuarta", "quinta", "sexta", "octava"];
    imagenAhorcado.src = `img/${imagenes[errores]}.png`;
}

// Disable all keyboard buttons (game over)
function deshabilitarTeclado() {
    const botones = contenedorTeclado.querySelectorAll("button");
    botones.forEach(boton => boton.disabled = true);
}

botonReiniciar.addEventListener("click", iniciarJuego);

iniciarJuego();