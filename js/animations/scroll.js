import { animate, stagger } from 'animejs';

// Uses IntersectionObserver to detect when sections enter the viewport,
// then triggers anime.js animations. repeat:false equivalent via disconnect().

function makeObserver(animateFn, threshold = 0.15) {
  return new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateFn();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold });
}

export function initScrollAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // ── About ──────────────────────────────────────────────────────
  const aboutSection = document.querySelector('.about');
  if (aboutSection) {
    makeObserver(() => {
      animate('.about__text', {
        opacity: [0, 1],
        translateX: [-30, 0],
        duration: 700,
        ease: 'outQuart',
      });
      animate('.about__venue-image', {
        opacity: [0, 1],
        translateX: [30, 0],
        duration: 700,
        ease: 'outQuart',
        delay: 150,
      });
    }).observe(aboutSection);
  }

  // ── Topics ─────────────────────────────────────────────────────
  const topicsSection = document.querySelector('.topics');
  if (topicsSection && document.querySelector('.topic-card')) {
    makeObserver(() => {
      animate('.topic-card', {
        opacity: [0, 1],
        scale: [0.85, 1],
        translateY: [30, 0],
        duration: 600,
        ease: 'outBack',
        delay: stagger(130, { from: 'first' }),
      });
    }, 0.1).observe(topicsSection);
  }

  // ── Venue ──────────────────────────────────────────────────
  const venueSection = document.querySelector('.venue');
  if (venueSection && document.querySelector('.venue-card')) {
    makeObserver(() => {
      animate('.venue-card', {
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 550,
        ease: 'outQuart',
        delay: stagger(100, { from: 'first' }),
      });
    }, 0.1).observe(venueSection);
  }

  // ── Speakers ───────────────────────────────────────────────────
  const speakersSection = document.querySelector('.speakers');
  if (speakersSection && document.querySelector('.speaker-card')) {
    makeObserver(() => {
      animate('.speaker-card', {
        opacity: [0, 1],
        scale: [0.88, 1],
        duration: 500,
        ease: 'outQuad',
        delay: stagger(65, { from: 'center' }),
      });
    }, 0.1).observe(speakersSection);
  }

  // ── Registro ───────────────────────────────────────────────────
  const registroSection = document.querySelector('.registro');
  if (registroSection) {
    makeObserver(() => {
      animate('.registro__intro', {
        opacity: [0, 1],
        translateX: [-30, 0],
        duration: 600,
        ease: 'outQuart',
      });
      animate('.registro__form', {
        opacity: [0, 1],
        translateX: [30, 0],
        duration: 600,
        ease: 'outQuart',
        delay: 120,
      });
    }, 0.05).observe(registroSection);
  }

  // ── Sponsors ───────────────────────────────────────────────────
  const sponsorsSection = document.querySelector('.sponsors');
  if (sponsorsSection && document.querySelector('.sponsor-logo')) {
    makeObserver(() => {
      animate('.sponsor-logo', {
        opacity: [0, 0.8],
        scale: [0.8, 1],
        duration: 450,
        ease: 'outQuad',
        delay: stagger(55, { from: 'first' }),
      });
    }, 0.1).observe(sponsorsSection);
  }

  // ── Contact ────────────────────────────────────────────────────
  const contactSection = document.querySelector('.contact');
  if (contactSection) {
    makeObserver(() => {
      animate('.contact__info', {
        opacity: [0, 1],
        translateX: [-30, 0],
        duration: 600,
        ease: 'outQuart',
      });
      animate('.contact__form', {
        opacity: [0, 1],
        translateX: [30, 0],
        duration: 600,
        ease: 'outQuart',
        delay: 120,
      });
    }, 0.05).observe(contactSection);
  }
}
