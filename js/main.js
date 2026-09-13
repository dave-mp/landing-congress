import { initHeroAnimations }    from './animations/hero.js';
import { initSVGShapes }         from './animations/svg-shapes.js';
import { initScrollAnimations }  from './animations/scroll.js';
import { initProgramTimeline }   from './animations/program.js';
import { initScrollReactive }    from './animations/scroll-reactive.js';
import { initThemeToggle }       from './ui/theme-toggle.js';
import { initNav }               from './ui/nav.js';

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNav();

  initScrollReactive();   // runs immediately so first scroll is already reactive
  initHeroAnimations();
  initSVGShapes();
  initScrollAnimations();
  initProgramTimeline();

  document.getElementById('footer-year').textContent = new Date().getFullYear();
});
