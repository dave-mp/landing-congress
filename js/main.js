import { initHeroAnimations }    from './animations/hero.js';
import { initSVGShapes }         from './animations/svg-shapes.js';
import { initScrollAnimations }  from './animations/scroll.js';
import { initProgramTimeline }   from './animations/program.js';
import { initSpeakerTilt }       from './animations/speakers.js';
import { initThemeToggle }       from './ui/theme-toggle.js';
import { initNav }               from './ui/nav.js';
import { initForms }             from './ui/forms.js';

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNav();
  initForms();

  initHeroAnimations();
  initSVGShapes();
  initScrollAnimations();
  initProgramTimeline();
  initSpeakerTilt();

  document.getElementById('footer-year').textContent = new Date().getFullYear();
});
