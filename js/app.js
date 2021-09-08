let estadoJuego = "start";
let raquetaUno = document.querySelector(".raquetaUno");
let raquetaDos = document.querySelector(".raquetaDos");
let tablero = document.querySelector(".tablero");
let pelota_inicial = document.querySelector(".pelota");
let pelota = document.querySelector(".pelota");
let puntuacionUno = document.querySelector(".puntuacionJugadorUno");
let puntuacionDos = document.querySelector(".puntuacionJugadorDos");
let mensaje = document.querySelector(".mensaje");
let raquetaUno_coor = raquetaUno.getBoundingClientRect();
let raquetaDos_coor = raquetaDos.getBoundingClientRect();
let pelota_inicial_coord = pelota.getBoundingClientRect();
let pelota_coord = pelota_inicial_coord;
let tablero_coord = tablero.getBoundingClientRect();
let paddle_common = document.querySelector(".raqueta").getBoundingClientRect();

let dx = Math.floor(Math.random() * 4) + 3;
let dy = Math.floor(Math.random() * 4) + 3;
let dxd = Math.floor(Math.random() * 2);
let dyd = Math.floor(Math.random() * 2);

/* Iniciar el juego al presionar Enter */
document.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    estadoJuego = estadoJuego == "start" ? "play" : "start";
    if (estadoJuego == "play") {
      mensaje.innerHTML = "Juego Iniciado";
      mensaje.style.left = 42 + "vw";
      requestAnimationFrame(() => {
        dx = Math.floor(Math.random() * 4) + 3;
        dy = Math.floor(Math.random() * 4) + 3;
        dxd = Math.floor(Math.random() * 2);
        dyd = Math.floor(Math.random() * 2);
        moveBall(dx, dy, dxd, dyd);
      });
    }
  }

  /* Configuración de las teclas de movimientos*/
  if (estadoJuego == "play") {
    /* Configuración flechas de dirección */
    if (e.key == "ArrowUp") {
      raquetaDos.style.top =
        Math.max(
          tablero_coord.top,
          raquetaDos_coor.top - window.innerHeight * 0.1
        ) + "px";
      raquetaDos_coor = raquetaDos.getBoundingClientRect();
    }
    if (e.key == "ArrowDown") {
      raquetaDos.style.top =
        Math.min(
          tablero_coord.bottom - paddle_common.height,
          raquetaDos_coor.top + window.innerHeight * 0.1
        ) + "px";
      raquetaDos_coor = raquetaDos.getBoundingClientRect();
    }

    /* Configuración teclas S y W */
    if (e.key == "w") {
      raquetaUno.style.top =
        Math.max(
          tablero_coord.top,
          raquetaUno_coor.top - window.innerHeight * 0.06
        ) + "px";
      raquetaUno_coor = raquetaUno.getBoundingClientRect();
    }
    if (e.key == "s") {
      raquetaUno.style.top =
        Math.min(
          tablero_coord.bottom - paddle_common.height,
          raquetaUno_coor.top + window.innerHeight * 0.06
        ) + "px";
      raquetaUno_coor = raquetaUno.getBoundingClientRect();
    }
  }
});

/*Funciones que le da movimiento a la pelota de Ping Pong  */
function moveBall(dx, dy, dxd, dyd) {
  if (pelota_coord.top <= tablero_coord.top) {
    dyd = 1;
  }
  if (pelota_coord.bottom >= tablero_coord.bottom) {
    dyd = 0;
  }
  if (
    pelota_coord.left <= raquetaUno_coor.right &&
    pelota_coord.top >= raquetaUno_coor.top &&
    pelota_coord.bottom <= raquetaUno_coor.bottom
  ) {
    dxd = 1;
    dx = Math.floor(Math.random() * 4) + 3;
    dy = Math.floor(Math.random() * 4) + 3;
  }
  if (
    pelota_coord.right >= raquetaDos_coor.left &&
    pelota_coord.top >= raquetaDos_coor.top &&
    pelota_coord.bottom <= raquetaDos_coor.bottom
  ) {
    dxd = 0;
    dx = Math.floor(Math.random() * 4) + 3;
    dy = Math.floor(Math.random() * 4) + 3;
  }
  if (
    pelota_coord.left <= tablero_coord.left ||
    pelota_coord.right >= tablero_coord.right
  ) {
    if (pelota_coord.left <= tablero_coord.left) {
      puntuacionDos.innerHTML = +puntuacionDos.innerHTML + 1;
    } else {
      puntuacionUno.innerHTML = +puntuacionUno.innerHTML + 1;
    }
    estadoJuego = "start";

    pelota_coord = pelota_inicial_coord;
    pelota.style = pelota_inicial.style;
    mensaje.innerHTML = "Presone ENTER para jugar";
    mensaje.style.left = 38 + "vw";
    return;
  }
  pelota.style.top = pelota_coord.top + dy * (dyd == 0 ? -1 : 1) + "px";
  pelota.style.left = pelota_coord.left + dx * (dxd == 0 ? -1 : 1) + "px";
  pelota_coord = pelota.getBoundingClientRect();
  requestAnimationFrame(() => {
    moveBall(dx, dy, dxd, dyd);
  });
}
