//Crear canvas
function dibujarCanvas(){
    tablero.lineWidth = 8;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.fillStyle = "#F3F5FC";
    tablero.strokeStyle = "#0A3871";

    tablero.fillRect(0,0,1200,800);
    tablero.beginPath();
    tablero.moveTo(650,500);
    tablero.lineTo(900,500);
    tablero.stroke();
    tablero.closePath();
}

function dibujarLinea(){
    tablero.lineWidth = 6;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    //tablero.fillStyle = "#F3F5FC";
    tablero.strokeStyle = "#0A3871";
    tablero.beginPath();

    let anchura = 600/palabraSecreta.length;
    for (let i = 0; i < palabraSecreta.length; i++){
        //HTML = ["H","T","M","L"]
        tablero.moveTo(500 + (anchura*i), 640);
        tablero.lineTo(550 + (anchura*i), 640);
        
    };

    tablero.stroke();
    tablero.closePath();

}

//Funcion que escribira las letras correctas introducidas desde teclado 
function escribirLetraCorrecta(index){
    //Estilo de la letra
    tablero.font = 'bold 52px Inter';
    tablero.lineWidth=6;
    tablero.lineCap="round";
    tablero.lineJoin="round";
    //color de la letra
    tablero.fillStyle="#0A3871";
    let anchura = 600/palabraSecreta.length;
    //Escribir solo una letra de la palabra secreata,posicion en el eje horizontal, eje vertical 620
    tablero.fillText(palabraSecreta[index],505+(anchura*index),620);
    tablero.stroke();

}


function escribirLetraIncorrecta(letra, errorsLeft) {
    //tamaño de la fuente 
    tablero.font = 'bold 40px Inter';
    tablero.lineWidth=6;
    tablero.lineCap="round";
    tablero.lineJoin="round";
    tablero.fillStyle="#0A3871";
    //la letra ingrasada, eje x= 535 eje y=710, 40 tamaño maximo de la fuente, errosLeft el espacio entre cada letra para que quede abajo de los guiones 40= fuente se multiplica un margen de 10 y que se queden visibles en la pantalla, 40 en el eje y  
    tablero.fillText(letra,535+(40*(10-errorsLeft)),710,40)

}

function dibujarAhoracado(puntaje){
    tablero.lineWidth=8;
    tablero.lineCap="round";
    tablero.lineJoin="round";
    tablero.strokeStyle="#0A3871";

    if(puntaje === 8){
        //poste lateral
        tablero.moveTo(700,500);
        tablero.lineTo(700,100);
    }
        //Techo
    if(puntaje === 7){
        tablero.moveTo(850,100);
        tablero.lineTo(700,100);
    }
        //Cuerda
    if(puntaje === 6){
        tablero.moveTo(850,100);
        tablero.lineTo(850,171);
    }
        //para cabeza
    if(puntaje === 5){
        tablero.moveTo(900,230);
        tablero.arc(850,230,50,0,Math.PI*2);
    }
        //para cuerpo
    if(puntaje === 4){
        tablero.moveTo(850,389);
        tablero.lineTo(850,289);
    }
        //pierna izquierda
    if(puntaje === 3){
        tablero.moveTo(850,389);
        tablero.lineTo(800,450);
    }
        //Pierna Derecha
    if(puntaje === 2){
        tablero.moveTo(850,389);
        tablero.lineTo(890,450);
    }
        //Mano izquierda
    if(puntaje === 1){
        tablero.moveTo(850,330);
        tablero.lineTo(800,389);
    }
        //Mano derecha
    if(puntaje === 0){
        tablero.moveTo(850,330);
        tablero.lineTo(890,389);
    }

    tablero.stroke();
    tablero.closePath();
}

function perdiste(){
    tablero.font = 'bold 42px Inter';
    tablero.lineWidth=6;
    tablero.lineCap="round";
    tablero.lineJoin="round";
    tablero.fillStyle="red";
    tablero.fillText("Fin del Juego!", 930,320);
}


function ganaste(){
    tablero.font = 'bold 42px Inter';
    tablero.lineWidth=6;
    tablero.lineCap="round";
    tablero.lineJoin="round";
    tablero.fillStyle="green";
    tablero.fillText("Ganaste,", 950,320);
    tablero.fillText("Felicidades!,", 930,360);
    setTimeout(recargar,1000);    
}

function recargar(){
    location.reload();
}