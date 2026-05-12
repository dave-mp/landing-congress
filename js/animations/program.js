import { animate, stagger, svg } from 'animejs';

export function initProgramTimeline() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const section = document.querySelector('.program');
  if (!section) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      obs.unobserve(entry.target);

      if (prefersReducedMotion) return;

      // Day dots scale in
      animate('.program__day-dot', {
        scale: [0, 1],
        opacity: [0, 1],
        duration: 400,
        ease: 'outBack',
        delay: stagger(120),
      });

      // Day blocks: alternating left/right entrance
      const days = document.querySelectorAll('.program__day');
      days.forEach((day, i) => {
        animate(day, {
          opacity: [0, 1],
          translateX: [i % 2 === 0 ? -28 : 28, 0],
          duration: 550,
          ease: 'outQuart',
          delay: i * 100,
        });
      });
    });
  }, { threshold: 0.1 });

  observer.observe(section);
}
