// FUNCIONES
function restart() {
    span.textContent = '';
    aciertos = [];
    resultado = '';
    vidas = 6;
    start.disabled = false; // ON Button
    retry.disabled = true;
    imagen.src = '/assets/images/ahorcado/vidas/6.png';
}

function buttonsOff() {
    for (let i = 0; i < botones.length; i++) {
        botones[i].disabled = true;
    }
}

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