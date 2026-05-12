import { animate } from 'animejs';

export function initSpeakerTilt() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const MAX_TILT = 10;
  const cards = document.querySelectorAll('[data-tilt]');

  cards.forEach(card => {
    const imgWrap = card.querySelector('.speaker-card__img-wrap');

    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);

      animate(card, {
        rotateY: dx * MAX_TILT,
        rotateX: -dy * MAX_TILT,
        scale: 1.04,
        duration: 250,
        ease: 'outQuart',
      });

      if (imgWrap) {
        animate(imgWrap, {
          translateX: dx * 6,
          translateY: dy * 6,
          duration: 250,
          ease: 'outQuart',
        });
      }
    });

    card.addEventListener('mouseleave', () => {
      animate(card, {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        duration: 500,
        ease: 'outElastic(1, 0.6)',
      });

      if (imgWrap) {
        animate(imgWrap, {
          translateX: 0,
          translateY: 0,
          duration: 500,
          ease: 'outElastic(1, 0.6)',
        });
      }
    });
  });
}
