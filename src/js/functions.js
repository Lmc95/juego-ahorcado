// FUNCIONES
// Reinicia el juego (variables)
function restart() {
    click = document.querySelector('.comenzar');
    vidasSpan.textContent = '6';
    infoTablero.style.display = 'none';
    mostrarPalabra.style.display = 'none';
    ganar.style.display = 'none';
    perder.style.display = 'none';
    span.textContent = '';
    palabra = '';
    primerLetra = [];
    aciertos = [];
    vidas = 6;
    iniciar.disabled = false; // ON Button
    reiniciar.disabled = true;
    imagen.src = '/assets/images/ahorcado/vidas/6.png';
}

// Desactiva todas las letras (botones)
function buttonsOff() {
    for (let i = 0; i < botones.length; i++) {
        botones[i].disabled = true;
    }
}

// Verifica las vidas y muestra la imagen correspondiente dependiendo la cantidad de vidas
function vidasUsuario() {
    switch(vidas) {
        case 6:
            imagen.src = '/assets/images/ahorcado/vidas/6.png';
            break;
        case 5:
            imagen.src = '/assets/images/ahorcado/vidas/5.png';
            break;
        case 4:
            imagen.src = '/assets/images/ahorcado/vidas/4.png';
            break;
        case 3:
            imagen.src = '/assets/images/ahorcado/vidas/3.png';
            break;
        case 2:
            imagen.src = '/assets/images/ahorcado/vidas/2.png';
            break;
        case 1:
            imagen.src = '/assets/images/ahorcado/vidas/1.png';
            break;
        case 0:
            imagen.src = '/assets/images/ahorcado/vidas/0.png';
            break;
        default:
            console.log('No se cumplio ninguna condicion.')
    }
}

// Ventana GANAR el juego
function ganarJuego() {
    resultadoJuego.style.display = 'block';
    ganar.style.display = 'block';
    cerrar.addEventListener('click', () => {
        resultadoJuego.style.display = 'none';
    })
}

// Ventana PERDER el juego
function perderJuego() {
    resultadoJuego.style.display = 'block';
    perder.style.display = 'block';
    cerrar.addEventListener('click', () => {
        resultadoJuego.style.display = 'none';
    })
}