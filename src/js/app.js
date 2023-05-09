// categorias
let categorias = {
    Animales: ["perro", "gato", "tigre", "elefante", "jirafa", "avestruz", "serpiente", "cebra", "rinoceronte", "ballena"],
    Paises: ["portugal", "canada", "mexico", "brasil", "españa", "francia", "alemania", "italia", "china", "argentina"],
    Colores: ["rojo", "verde", "azul", "amarillo", "morado", "naranja", "rosa", "negro", "blanco", "violeta"],
    Deportes: ["futbol", "baloncesto", "tenis", "boxeo", "voleibol", "rugby", "golf", "natacion", "ciclismo", "atletismo"]
}
//console.log('categorias: ' + Object.keys(categorias).length)

const tablero = document.getElementById('letras-tablero'); // UNO
const botones = document.querySelectorAll('.boton');
const iniciar = document.querySelector('.comenzar');
const reiniciar = document.querySelector('.reiniciar')
const cerrar = document.querySelector('.cerrar');

// Resultados final del juego: ganar o perder
const resultadoJuego = document.querySelector('.resultado');
const ganar = document.querySelector('.ganaste');
const perder = document.querySelector('.perdiste');

const palabraGanar = document.querySelector('.palabra-ganar');
const palabraPerder = document.querySelector('.palabra-perder')
let spanGanar = document.createElement('span');
let spanPerder = document.createElement('span');
palabraGanar.appendChild(spanGanar);
palabraPerder.appendChild(spanPerder);

// Tablero: categoria y vidas
const infoTablero = document.querySelector('.info-tablero'); // DOS
const categoria = document.querySelector('.categoria');
const vidasInfo = document.querySelector('.vidas');
let categoriaSpan = document.createElement('span');
let vidasSpan = document.createElement('span');
categoria.appendChild(categoriaSpan);
vidasInfo.appendChild(vidasSpan);

// dibujo a mostrar en tablero
const dibujo = document.querySelector('.dibujo');
let imagen = document.createElement('img');
imagen.src = '/assets/images/ahorcado/vidas/6.png';
dibujo.appendChild(imagen)

// se agrega la palabra a mostrar en tablero
const mostrarPalabra = document.querySelector('.palabra');
let span = document.createElement('span');
mostrarPalabra.appendChild(span);

// Botones bloqueados hasta presionar "Jugar/Iniciar"
for (let i = 0; i < botones.length; i++) {
    botones[i].disabled = true;
}

// variables del juego
let width = window.innerWidth;
let vidas = 6;
let primerLetra = [];
let aciertos = [];
let palabra = '';
let click = '';
reiniciar.disabled = true;

// Obtenemos el evento del "tablero"
tablero.addEventListener('click', (e) => {
    click = e.target;
    //console.log(click);
    // Se da comienzo al juego
    if (click.textContent == 'Jugar') {

        if(width > 725) {
            tablero.appendChild(infoTablero);
            tablero.appendChild(mostrarPalabra);
        }

        iniciar.disabled = true; // OFF Button
        infoTablero.style.display = 'block';
        mostrarPalabra.style.display = 'block';

        let sortear = Math.floor(Math.random() * Object.keys(categorias).length)
        let sorteoCategoria = Object.keys(categorias)[sortear];
        categoriaSpan.textContent = sorteoCategoria;

        let listaCategoria = categorias[sorteoCategoria];
        let sortearLista = Math.floor(Math.random()*listaCategoria.length);
        palabra = listaCategoria[sortearLista];
        spanGanar.textContent = palabra.toUpperCase();
        spanPerder.textContent = palabra.toUpperCase();
        //console.log(listaCategoria) 
        primerLetra.push(palabra.substring(0,1));
        
        // Se activan todos los botones (letras)
        for (let i = 0; i < botones.length; i++) {
            botones[i].disabled = false;
        }

        // Se muestra en "guiones" la palabra
        for (let i = 0; i < palabra.length; i++) {
            if(i===0){
                span.textContent = palabra.toUpperCase().substring(0,1);
            }else {

                span.textContent += '_ ';
            }
        }
    }
});

// Verifica los botones y actualiza tablero (general)
botones.forEach(btn => {
    vidasSpan.textContent = '6';
    let letra = btn.textContent;
    letra = letra.toLowerCase();
    
    btn.addEventListener('click', () => {
        let resultado = '';
        btn.disabled = true;
        // Se actualiza el span a vacío

        for (let i = 1; i < palabra.length; i++) {
            // Se toman los aciertos de letras, ingorando la primer letra de "palabra".
            if (palabra[i] == letra) {
                aciertos.push(palabra[i].toLowerCase())
            }
            // Por cada acierto se agrega la letra correspondiente o guion
            // Y se actualiza el "span" que se mostrara en pantalla
            if (aciertos.includes(palabra[i])) {
                resultado += palabra[i];
            } else {
                resultado += '_ ';
            }
        }

        // Concatena la primer letra + el resto de aciertos
        let palabraOculta = primerLetra.join('').trim() + resultado.trim();
        span.textContent = palabraOculta.toUpperCase();

        // Vidas, Dibujo
        if (palabra.substring(1).includes(letra)) {
            // mostrar resultado y tablero (console)
            console.log(`Si esta la letra: ${letra.toUpperCase()} \nVidas: ${vidas}`);
        } else {
            // actualizar resultado, tablero y vidas
            vidas -= 1;
            vidasSpan.textContent = `${vidas}`;
            console.log(`No esta la letra: ${letra.toUpperCase()} \nVidas: ${vidas}`);
            // Dependiendo la cantidad de vidas muestra el img correspondiente
            vidasUsuario();

        }

        // Se verifica si el usuario GANO o PERDIO
        if (palabraOculta == palabra && vidas > 0) {
            console.log('Ganaste!')
            ganarJuego(); // Muestra ventana "GANASTE"
            buttonsOff(); // Desactiva todos los botones
            reiniciar.disabled = false; // Se desactiva el boton "Volver a jugar"
            // Evento que reinicia el juego
            reiniciar.addEventListener('click', () => { 
                restart();
            })

        } else if (vidas === 0) {
            console.log('Perdiste!')
            perderJuego(); // Muestra ventana "PERDISTE"
            buttonsOff(); // Desactiva todos los botones
            reiniciar.disabled = false; // Se desactiva el boton "Volver a jugar"
            // Evento que reinicia el juego
            reiniciar.addEventListener('click', () => {
                restart();
            })
        }

    })
})