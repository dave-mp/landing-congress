import { animate, svg } from 'animejs';

export function initSVGShapes() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // DNA strand paths: draw on page load
  const dnaPaths = document.querySelectorAll('.hero__dna path');
  dnaPaths.forEach((path, i) => {
    try {
      const drawable = svg.createDrawable(path);
      animate(drawable, {
        draw: ['0 0', '0 1'],
        duration: 2400,
        ease: 'inOutQuad',
        delay: 500 + i * 250,
      });
    } catch (_) {
      // Graceful skip if svg API unavailable
    }
  });

  // DNA cross-rungs: draw on page load
  const rungs = document.querySelectorAll('.hero__dna line');
  rungs.forEach((line, i) => {
    try {
      const drawable = svg.createDrawable(line);
      animate(drawable, {
        draw: ['0 0', '0 1'],
        duration: 600,
        ease: 'outQuad',
        delay: 1200 + i * 150,
      });
    } catch (_) {}
  });

  // ECG pulse: looping draw-and-erase
  const pulsePath = document.querySelector('.hero__pulse-path');
  if (pulsePath) {
    try {
      const drawable = svg.createDrawable(pulsePath);
      animate(drawable, {
        draw: ['0 0', '0 0.65', '0.4 1'],
        duration: 2200,
        ease: 'linear',
        loop: true,
        delay: 900,
      });
    } catch (_) {
      // Fallback: CSS opacity pulse
      animate(pulsePath, {
        opacity: [0, 0.12, 0],
        duration: 2200,
        loop: true,
        ease: 'inOutSine',
      });
    }
  }

  // Hex deco: gentle scale pulse (CSS shape in About section)
  const hexDeco = document.querySelector('.about__hex-deco');
  if (hexDeco) {
    animate(hexDeco, {
      scale: [0.9, 1.1],
      opacity: [0.15, 0.3],
      duration: 3200,
      loop: true,
      alternate: true,
      ease: 'inOutSine',
      delay: 800,
    });
  }
}
