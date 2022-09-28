//Selectores 
//let= para declarar variables, const= para declarar variables que no suelen cambiar mucho
//Se ocultan los botones "Guardar y Empezar","Cancelar","Nuevo Juego" y "Salir" para dejar solo "Iniciar Juego" y "Agregar palabra" en la pantalla de inicial 
let botonNuevoJuego = document.getElementById("btn-nuevo-juego").style.display = "none";
let btnSalirDesaparecer = document.getElementById("btn-salir").style.display = "none";
//Se oculta el "<div>agregar-palabra</div>" todo su contenido
let divAgregarPalabra = document.getElementById("agregar-palabra").style.display = 'none';

//Se obtienen los siguientes elementos de html para asignarles un evento a los botnes de "Nuevo Juego", "Salir" de la parte del juego de ahorcado
let btnNuevoJuego = document.getElementById("btn-nuevo-juego");
let btnSalir = document.getElementById("btn-salir");

//Arreglo de palabras para lanzarlos a lazar
var palabras = ["ALURA", "ORACLE", "ONE", "JAVASCRIPT", "HTML", "CSS"];
//Tablero de canvas para hacer los diseños en dos dimensiones
var tablero = document.getElementById('horca').getContext('2d');
//variable que almacenara la palabra secreta
var palabraSecreta = "";
//arreglo vacio almacenar las letras durante la ejecucion
var letras = [];
//numero de oportunidades 
var errores = 8;
//Palabra correcta
let palabraCorrecta = "";
//letras incorrectas
let letrasIncorrectas = [];
//Numero de errores
let numeroErrores = 8;
//Letra Elegida
let letraElegida = [];

//Eventos

//Eventos que contrarlan los botones de "Salir" y "Nuevo Juego" una ves que se haya dado click en el boton "Iniciar Juego"
//Actualiza la pantalla cuando el usuario hace click en el boton "Nuevo juego "
btnNuevoJuego.addEventListener("click", function () {
    location.reload();
});

//Actualiza la pantalla cuando el usuario hace click en el boton "Salir" dentro del juego
btnSalir.addEventListener("click", function () {
    location.reload();
});


//Funcion que devuelve una palabra a lazar del array de palabras
function escojerPalabraSecreta() {
    //Estos metodos escogen un numero aleatorio del array de palabras, que es igual a escoje una palabra a lazar
    let palabra = palabras[Math.floor(Math.random() * palabras.length)]
    //Se almacena la palabra en la variable palabraSecreta
    palabraSecreta = palabra;
    //console.log(palabraSecreta)
    //La funcion retorna la palabra
    return palabra;
}

//Verificar cual es la letra en el que el usuario hizo clic
function verificarLetraTeclada(key) {
    if (letras.length < 1 || letras.indexOf(key) < 0) {
        letras.push(key)
        return false

    }
    else {
        letras.push(key)
        return true
    }
}

//Añadir letra correcta
function anadirLetraCorrecta(i) {
    palabraCorrecta += palabraSecreta[i].toUpperCase();
}

//Funcion que retorna errores
function anadirLetraIncorrecta(letter) {
    if (palabraSecreta.indexOf(letter) <= 0) {
        errores -= 1
    }
    //console.log(errores);
}

//Revisa si la letra ha sido incluida en el arrray de las letras correctas o incorrectas
function verificarFinJuego(letra) {
    if (letraElegida.length < palabraSecreta.length) {
        //incluye las letras ya digitadas en el array
        letrasIncorrectas.push(letra);
        //Valida si el usuario cometio el numero maximo de erreores
        if (letrasIncorrectas.length > numeroErrores) {
            perdiste();
        } else if (letraElegida.length < palabraSecreta.length) {
            anadirLetraIncorrecta(letra);
            escribirLetraIncorrecta(letra, errores);
        }
    }
}

//Verificar si el usuario ha ganado
function verificaVencendor(letra) {
    letraElegida.push(letra.toUpperCase());
    if (letraElegida.length == palabraSecreta.length) {
        ganaste();
    }
}
//Funcion que impide que teclas como shift y otras, sean consideradas como errores y sean escritas
function comprobarLetra(keyCode) {
    //parametro base para hacer las comparaciones
    //key=validacon de ingreso de teclado y se valida la tabla ASCII y asigna un numero de las teclas del teclado y entre el 65 y 90 estan todas las letras del alfabeto de la A-Z en mayusculas
    if (typeof keyCode === "number" && keyCode >= 65 && keyCode <= 90) {
        //Retorna verdadero si se cumple la condicion,si lo que se ha teclado son solo letras 
        //returnar el estado verdadero
        return true;
    } else {
        //Retorna falso si no se han teclado letras
        return false;
    }
}



//Iniciar juego
function iniciarJuego() {
    // Hace que los botones de iniciar juego y agragar palabra desaparezcan
    document.getElementById("div-desaparece").style.display = "none";
    // Llama la funcion que dibuja el tablero del ahorcado
    dibujarCanvas();
    // llama la funcion que sortea la palabra
    escojerPalabraSecreta();
    // llama la funcion que dibuja las lineas donde el usuario escribira
    dibujarLinea();
    // Hace que los botones de Nuevo Juego y Salir aparezacan
    document.getElementById("btn-nuevo-juego").style.display = "block";
    document.getElementById("btn-salir").style.display = "block";

    //Capturar evento desde teclado,es nuestra varible de envento, funcion de flecha se usan para crear funciones que no necesitan parametro o nombres, son funciones mas directas 
    document.onkeydown = (e) => {
        //Cambia a mayusculas la letra tecleada
        let letra = e.key.toUpperCase();
        //Verificar si el usuario todavia no ha perdido
        if (letrasIncorrectas.length <= numeroErrores) {
            //comprobrar si la letra ingresada esta presente en la palabra secreata utilizando el metodo includes
            if (!verificarLetraTeclada(e.key) && comprobarLetra(e.keyCode)) {
                if (palabraSecreta.includes(letra)) {
                    anadirLetraCorrecta(palabraSecreta.indexOf(letra))
                    //Si la palbra correcta, es mas de una en la cadena se escribe 
                    for (let i = 0; i < palabraSecreta.length; i++) {
                        //si palabra secreta esta en la cadena entonces escribe la letra correcta en canvas
                        if (palabraSecreta[i] == letra) {
                            escribirLetraCorrecta(i);
                            verificaVencendor(letra);
                        }
                    }
                }
                //Si el usuario cometio mas errores de los que son permitidos
                //llama las funciones que dibujan el ahorcado y exibe el mensaje de fin de juego
                else {
                    if (!verificarLetraTeclada(e.key) && !verificaVencendor(letra)) return
                    dibujarAhoracado(errores);
                    verificarFinJuego(letra);
                }
            }
        } else {
            alert('Has alcanzado el limite de letras incorrectas')
        }
    }
}
