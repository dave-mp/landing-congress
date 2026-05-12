import { animate, createTimeline, stagger } from 'animejs';

export function initHeroAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Eyebrow fade in immediately
  animate('.hero__eyebrow', {
    opacity: [0, 1],
    translateY: [10, 0],
    duration: 600,
    ease: 'outQuart',
    delay: 100,
  });

  if (prefersReducedMotion) {
    // Reveal all hero text immediately
    document.querySelectorAll('.hero__char').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    animate('.hero__meta, .hero__actions', { opacity: [0, 1], duration: 400 });
    return;
  }

  // Split each headline line into individual character spans
  const lines = document.querySelectorAll('.hero__headline-line');
  const allChars = [];

  lines.forEach(line => {
    const text = line.textContent;
    line.textContent = '';
    text.split('').forEach(char => {
      const span = document.createElement('span');
      span.className = 'hero__char';
      span.textContent = char === ' ' ? ' ' : char;
      line.appendChild(span);
      allChars.push(span);
    });
  });

  const tl = createTimeline({ defaults: { ease: 'outExpo' } });

  // Staggered character reveal
  tl.add(allChars, {
    opacity: [0, 1],
    translateY: ['60%', '0%'],
    rotateX: [-30, 0],
    duration: 700,
    delay: stagger(22, { from: 'first' }),
  }, 300);

  // Meta + actions fade in after headline
  tl.add('.hero__meta', {
    opacity: [0, 1],
    translateY: [16, 0],
    duration: 500,
    ease: 'outQuart',
  }, '-=300');

  tl.add('.hero__actions', {
    opacity: [0, 1],
    translateY: [16, 0],
    duration: 500,
    ease: 'outQuart',
  }, '-=400');

  // Scroll cue: looping pulse line
  animate('.hero__scroll-line', {
    scaleY: [0, 1],
    opacity: [0, 0.7, 0],
    duration: 1600,
    delay: 1400,
    loop: true,
    ease: 'inOutSine',
    transformOrigin: 'top center',
  });

  // Floating hex particles: infinite gentle float
  const particles = document.querySelectorAll('.particle');
  particles.forEach((p, i) => {
    const dy = ((i % 3) - 1) * 14 + (Math.random() * 8 - 4);
    const dx = ((i % 5) - 2) * 6 + (Math.random() * 6 - 3);
    const dur = 3000 + (i * 317) % 2200;
    animate(p, {
      translateY: [dy * -1, dy],
      translateX: [dx * -1, dx],
      rotate: [-8 + i * 3, 8 + i * 3],
      duration: dur,
      loop: true,
      alternate: true,
      ease: 'inOutSine',
      delay: i * 130,
    });
  });
}
