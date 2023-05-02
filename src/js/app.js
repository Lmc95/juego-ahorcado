
// COMIENZA EL JUEGO
const animales = ['perro', 'gato', 'elefante', 'serpiente'];

const tablero = document.getElementById('letras-tablero');
const botones = document.querySelectorAll('.boton');
const start = document.querySelector('.comenzar');
const stop = document.querySelector('.detener');
const retry = document.querySelector('.retry')

// dibujo a mostrar en tablero
const dibujo = document.querySelector('.dibujo');
let imagen = document.createElement('img');
imagen.src = '/assets/images/ahorcado/vidas/6.png';
dibujo.appendChild(imagen)


// palabra a mostrar en tablero
const mostrarPalabra = document.querySelector('.palabra');
let span = document.createElement('span');
mostrarPalabra.appendChild(span);

// Botones bloqueados hasta presionar "Start"
for (let i = 0; i < botones.length; i++) {
    botones[i].disabled = true;
}
let vidas = 6;
let aciertos = [];
let palabra = '';
retry.disabled = true;

// Da inicio al juego
tablero.addEventListener('click', (e) => {
    
    let click = e.target;
    console.log(click);
    
    // Se da comienzo al juego
    if (click.textContent == 'Jugar') {
        start.disabled = true; // OFF Button

        // Se sortea la palabra secreta
        let sortear = Math.floor(Math.random() * animales.length);
        palabra = animales[sortear];
        console.log(palabra)

        // Se activan todos los botones (letras)
        for (let i = 0; i < botones.length; i++) {
            botones[i].disabled = false;
        }

        // Se muestra en "guiones" la palabra
        for (let i = 0; i < palabra.length; i++) {
            span.textContent += '_ ';
        }

        // Se da fin al juego presionando "End"
    }

});

// Verifica los botones y actualiza tablero
botones.forEach(btn => {
    let resultado = '';
    let letra = btn.textContent;
    letra = letra.toLowerCase();

    btn.addEventListener('click', () => {
        btn.disabled = true;
        // Se actualiza el span a vacío
        span.textContent = '';

        for (let i = 0; i < palabra.length; i++) {
            // Se toman los aciertos de letras
            if (palabra[i] == letra) {
                aciertos.push(palabra[i])
            }

            // Por cada acierto se agrega la letra correspondiente o guion
            // Y se actualiza el "span" que se mostrara en pantalla
            if (aciertos.includes(palabra[i])) {
                resultado += palabra[i];
                span.textContent += palabra[i].toUpperCase();
            } else {
                resultado += '_ ';
                span.textContent += '_ ';
            }
        }
        //console.log(resultado)


        // Vidas, Dibujo
        if (palabra.includes(letra)) {
            // mostrar resultado y tablero
            console.log(`Si esta la letra: ${letra.toUpperCase()} \nVidas: ${vidas}`);
        } else {
            // actualizar resultado, tablero y vidas
            vidas -= 1;
            console.log(`No esta la letra: ${letra.toUpperCase()} \nVidas: ${vidas}`);

            vidasUsuario();

        }


        if (resultado == palabra && vidas > 0) {
            console.log('Ganaste!')
            buttonsOff();
            retry.disabled = false;
            // Evento que reinicia el juego
            retry.addEventListener('click', () => { 
                // TABLERO DIBUJO
                restart();
            })

        } else if (vidas === 0) {
            console.log('Perdiste!')
            // Desactiva todos los botones
            buttonsOff();
            // Retry "Boton" que se activa al terminar el juego
            retry.disabled = false;
            // Evento que reinicia el juego
            retry.addEventListener('click', () => {
                // TABLERO DIBUJO
                restart();
            })
        }


    })
})

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
    





