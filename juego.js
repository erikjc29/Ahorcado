//video 2:14
;(function(){
"use strict"

  var palabras=[
    "ALURA",
    "HTML",
    "CSS",
    "JAVASCRIPT",
    "ORACLE",
    "FIGMA",
    "TRELLO",
    "CHALLENGE",
    "DISCORD",
    "GITHUB"
  ]

//VARIABLE PARA LA CONFIGURACION ACTUAL
    var juego=null;

    var finalizado=false;

var $html= {
  hombre: document.getElementById("hombre"),
  adivinado: document.querySelector(".adivinado"),
  errado: document.querySelector(".errado")
}
function dibujar(juego){
  //actualizar la imagen del hombre
  var $elem
  $elem= $html.hombre

  var estado= juego.estado;
  if(estado==8){
    estado= juego.previo;
  }
  $elem.src="img/"+estado+".png"

  //creamos letras adivinadas
  var palabra = juego.palabra
  var adivinado=juego.adivinado
  $elem=$html.adivinado
//borramos los elemento anteriores
$elem.innerHTML="";

  for(let letra of palabra){
    let $span= document.createElement("span");
    let $txt=document.createTextNode("")
    if(adivinado.indexOf(letra) >= 0){
      $txt.nodeValue=letra
    }
    $span.setAttribute("class", "letra correcta");
    $span.appendChild($txt);
    $elem.appendChild($span);
  }
  // creamos las letras erradas
  var errado=juego.errado
  $elem=$html.errado
  //borramos los elementos anteriores
  $elem.innerHTML="";
  for (let letra of errado){
    let $span= document.createElement("span")
    let $txt= document.createTextNode(letra)
    $span.setAttribute("class", "errado")
    $span.appendChild($txt)
    $elem.appendChild($span)
  }
}

function adivinar(juego, letra){
  var estado=juego.estado;
  //si ya se gano o perdio no hay nada que hacer
  if (estado ==1 || estado==8){
    return
  }

  var adivinado= juego.adivinado;
  var errado = juego.errado;
  //si ya hemos adivinado o errado la letra no hay que hacer nada
  if(adivinado.indexOf(letra) >= 0 || 
  errado.indexOf(letra) >=0){
    return
  }

  var palabra =juego.palabra
  //si es letra de la palabra debemos ver si llegmaos al estado 
  if(palabra.indexOf(letra) >= 0){
      let ganado=true;
    //debemos ver si llegmaos al estado
    for(let l of palabra){
      if (adivinado.indexOf(l) < 0 && l !=letra ){
         ganado=false
        juego.previo = juego.estado;
        break
      }
    }
    //si ya se ha ganado, debemos indicarlo 
    if(ganado){
      juego.estado=8;
    }
    //agregamos la letra a la lista de letras adivinadas
    adivinado.push(letra);
  }
  else{
    //si no es letra de la palabra, un paso mas de la horca
    juego.estado--
    //agreagamos a la lista de erradas
    errado.push(letra)
  }
}

window.onkeypress= function adivinarLetra(e){
  var letra=e.key;
  letra=letra.toUpperCase();
  if(/[^A-ZÑ]/.test(letra)){
    return
  }
  adivinar(juego,letra)
  var estado=juego.estado;
  if(estado==8 && !finalizado){
   document.querySelector(".mensaje").textContent="FELICIDADES GANASTE"
   finalizado=true;
   document.querySelector(".mensaje").classList.add("verde")
  }
  else if(estado==1 && !finalizado){
    let palabra= juego.palabra;
    finalizado=true
    document.querySelector(".mensaje").textContent="PERDISTE, VOLVELO A INTENTAR. LA PALABRA ERA: "+palabra
    document.querySelector(".mensaje").classList.add("rojo")

  }
  dibujar(juego)
}

window.nuevoJuego= function nuevoJuego(){

  var palabra= palabraAleatoria()
  juego= {}
  juego.palabra= palabra
  juego.estado=7
  juego.adivinado=[]
  juego.errado=[]
  finalizado=false
  dibujar(juego)
  console.log(juego)
}

function palabraAleatoria(){
  var index= Math.floor(Math.random()*palabras.length)
  return palabras[index]
}

let btnJuego=document.querySelector(".btn-azul")
btnJuego.addEventListener("click",empezarJuego)
function empezarJuego(){
  document.getElementById("hombre").classList.remove("invisible")
  document.getElementById("adivinado").classList.remove("invisible")
  document.getElementById("errado").classList.remove("invisible")
  document.getElementById("btnAgregar").classList.add("invisible")
  document.getElementById("agregarPalabra").classList.add("invisible")
  document.getElementById("btnDesistir").classList.remove("invisible")
  document.querySelector(".mensaje").innerHTML=""
  nuevoJuego()
  console.log(palabras)
}

let btnAgregar=document.getElementById("btnAgregar")
btnAgregar.addEventListener("click",agregarPalabra)
function agregarPalabra(){
  document.getElementById("agregarPalabra").classList.remove("invisible");
  let palabraGuardar=document.querySelector(".agregar")
  let lpbg=palabraGuardar.value;
  console.log(lpbg);
  if(lpbg.length >1 && lpbg.length<=8 || /\d/.test(lpbg)){ 
    let palabraGuardada = lpbg.toUpperCase();
    palabras.push(palabraGuardada);
    console.log(palabraGuardada)
    console.log(palabras)
  }
  else{
    document.querySelector(".mensaje").textContent="Maximo 8 letras"
    
    document.querySelector(".mensaje").classList.add("azul")
  }
  console.log(palabras)
}

let btnDesistir=document.getElementById("btnDesistir")
btnDesistir.addEventListener("click", desistir)
function desistir(){
  document.getElementById("hombre").classList.add("invisible")
  document.getElementById("adivinado").classList.add("invisible")
  document.getElementById("errado").classList.add("invisible")
  document.getElementById("btnAgregar").classList.remove("invisible")
  document.getElementById("btnDesistir").classList.add("invisible")
  document.querySelector(".mensaje").innerHTML=""
  juego.estado==1
  finalizado=true
}

}())