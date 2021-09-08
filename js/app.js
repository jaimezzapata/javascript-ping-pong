//ps= player speed
var ps = 15;

function nfp(urpx) {
  return Number(urpx.replace("px", ""));
}

var juadorDerecha = document.getElementById("derecha");
var izquierda = document.getElementById("izquierda");
var pelota = document.getElementById("pelota");

var puntuacionDerecha = document.getElementById("puntuacionDerecha");
var puntuacionIzquierda = document.getElementById("puntuacionIzquierda");
var ogoal = document.getElementById("punto");

var ancho = window.innerWidth;
var alto = window.innerHeight;

var map = [];
onkeydown = onkeyup = function (e) {
  map[e.keyCode] = e.type == "keydown";
};


/* Se crea el comportamiento del movimiento de los jugadores */
function keydown() {
  if (map[40]) {
    if (nfp(juadorDerecha.style.top) + ps > alto - 200) {
      juadorDerecha.style.top = alto - 200 + "px";
    } else {
      juadorDerecha.style.top = nfp(juadorDerecha.style.top) + ps + "px";
    }
  }

  else if (map[38]) {
    if (nfp(juadorDerecha.style.top) - ps < 0) {
      juadorDerecha.style.top = 0 + "px";
    } else {
      juadorDerecha.style.top = nfp(juadorDerecha.style.top) - ps + "px";
    }
  }

  if (map[83]) {
    if (nfp(izquierda.style.top) + ps > alto - 200) {
      izquierda.style.top = alto - 200 + "px";
    } else {
      izquierda.style.top = nfp(izquierda.style.top) + ps + "px";
    }
  } else if (map[87]) {
    if (nfp(izquierda.style.top) - ps < 0) {
      izquierda.style.top = 0 + "px";
    } else {
      izquierda.style.top = nfp(izquierda.style.top) - ps + "px";
    }
  }
}

var speedx = 3,
  speedy = 1;
var balltime = 1;
pelota.style.left = ancho / 2 + "px";


/* Se crea la pelota de ping pong */
function ball() {
  pelota.style.left = nfp(pelota.style.left) + speedx + "px";
  pelota.style.top = nfp(pelota.style.top) + speedy + "px";
}


/* Se crea el movimiento de la pelota */
function moveball() {
  ball();

  if (alto < nfp(pelota.style.top) + 20 || nfp(pelota.style.top) < 0) {
    speedy *= -1;
  }

  if (nfp(pelota.style.left) >= ancho - 50) {
    if (
      nfp(juadorDerecha.style.top) <= nfp(pelota.style.top) + 20 &&
      nfp(juadorDerecha.style.top) + 200 >= nfp(pelota.style.top)
    ) {
      speedx *= -1;
    } else if (nfp(pelota.style.left) >= ancho - 20) goal("izquierda");
  }

  if (nfp(pelota.style.left) <= 30) {
    if (
      nfp(izquierda.style.top) <= nfp(pelota.style.top) + 20 &&
      nfp(izquierda.style.top) + 200 >= nfp(pelota.style.top)
    ) {
      speedx *= -1;
    } else if (nfp(pelota.style.left) <= 0) goal("derecha");
  }

  setTimeout(function () {
    moveball();
  }, balltime);
}

setInterval(function () {
  keydown();
}, 10);
moveball();


/* Se crea el marcador de puntos y se acumula a su respectivo jugador */
function goal(pos) {
  ogoal.style.color = "white";

  setTimeout(function () {
    ogoal.style.color = "black";
  }, 10);

  if (pos == "izquierda") {
    puntuacionDerecha.innerHTML = Number(puntuacionDerecha.innerHTML) + 1;
  } else {
    puntuacionIzquierda.innerHTML = Number(puntuacionIzquierda.innerHTML) + 1;
  }

  speedx *= -1;
  pelota.style.left = ancho / 2 + "px";
}
