/* ════════════════════════════════════════════════════════════════
   PANTALLA DE CORTINILLA — pantalla.html
   Toda la animación vive en css/screen-cover.css (keyframes CSS, que siguen
   corriendo aunque la pestaña pierda el foco y no dependen de ningún
   paquete externo). Aquí solo queda lo que el CSS no puede resolver:

   1. El desfile de logos: clonar el grupo hasta llenar la pantalla y
      traducir «px por segundo» a una duración, para que la velocidad sea la
      misma en un portátil y en un proyector 4K.
   2. Los controles del operador: pantalla completa y ocultar el puntero.
   ════════════════════════════════════════════════════════════════ */

/* Velocidad del desfile en píxeles por segundo. Un valor tranquilo: en una
   pantalla de 1920 px cada logo tarda unos 25 s en cruzarla. */
const MARQUEE_SPEED = 75;

/* Tiempo sin mover el puntero tras el cual se oculta el cursor y los
   controles. */
const IDLE_DELAY = 3000;

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* ── Desfile de logos ───────────────────────────────────────────── */
function initMarquee() {
  const track = document.querySelector('.cover__marquee-track');
  if (!track) return;

  const source = track.querySelector('.cover__marquee-group');
  if (!source) return;

  // Plantilla intacta: cada reconstrucción parte de ella, nunca de un clon.
  const template = source.cloneNode(true);

  function build() {
    track.removeAttribute('data-marquee');
    track.replaceChildren(template.cloneNode(true));

    // Con «reducir movimiento» se queda la cuadrícula quieta del CSS.
    if (prefersReducedMotion.matches) return;

    // El ancho hay que medirlo con la fila ya en una sola línea: en la
    // cuadrícula de reserva el grupo se ciñe al ancho del contenedor.
    track.setAttribute('data-marquee', 'measuring');

    const group = track.firstElementChild;
    const groupWidth = group.getBoundingClientRect().width;
    if (!groupWidth) {
      track.removeAttribute('data-marquee');
      return;
    }

    // Hacen falta copias suficientes para que, con el grupo desplazado por
    // completo, no se abra ningún hueco: dos pantallas de ancho bastan.
    const needed = Math.max(2, Math.ceil((window.innerWidth * 2) / groupWidth));
    for (let i = 1; i < needed; i++) {
      const copy = template.cloneNode(true);
      // Copias decorativas: el lector de pantalla ya leyó la primera.
      copy.setAttribute('aria-hidden', 'true');
      track.appendChild(copy);
    }

    // El ciclo desplaza exactamente un grupo, así que su duración es la que
    // ese grupo tarda en recorrerse a la velocidad elegida.
    track.style.setProperty('--mq-copies', String(needed));
    track.style.setProperty('--mq-duration', `${(groupWidth / MARQUEE_SPEED).toFixed(2)}s`);
    track.setAttribute('data-marquee', 'running');
  }

  build();

  // Las imágenes sin dimensiones declaradas pueden cambiar el ancho del
  // grupo al decodificarse; se recalcula cuando ya están todas.
  if (document.readyState !== 'complete') {
    window.addEventListener('load', build, { once: true });
  }

  // Al cambiar de resolución (conectar el proyector, girar la tablet) hay
  // que volver a medir. Se espera a que el navegador deje de redimensionar.
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(build, 250);
  });

  prefersReducedMotion.addEventListener('change', build);
}

/* ── Controles del operador ─────────────────────────────────────── */
function initControls() {
  const button = document.querySelector('[data-cover-fullscreen]');
  const body = document.body;

  if (button) {
    button.addEventListener('click', () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        // Puede rechazarse (iframe sin permiso, gesto no reconocido): la
        // pantalla sigue siendo útil sin pantalla completa.
        document.documentElement.requestFullscreen().catch(() => {});
      }
    });

    document.addEventListener('fullscreenchange', () => {
      const isFullscreen = Boolean(document.fullscreenElement);
      body.classList.toggle('is-fullscreen', isFullscreen);
      button.setAttribute('aria-label', isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa');
    });
  }

  // Puntero quieto: se oculta el cursor y los controles para que la
  // proyección quede limpia.
  let idleTimer;
  const goIdle = () => body.classList.add('is-idle');
  const wake = () => {
    body.classList.remove('is-idle');
    clearTimeout(idleTimer);
    idleTimer = setTimeout(goIdle, IDLE_DELAY);
  };

  ['pointermove', 'pointerdown', 'keydown'].forEach(type => {
    document.addEventListener(type, wake, { passive: true });
  });

  idleTimer = setTimeout(goIdle, IDLE_DELAY);
}

initMarquee();
initControls();
