export function initNav() {
  const header = document.querySelector('.site-header');
  const hamburger = document.querySelector('.nav__hamburger');
  const navLinks = document.querySelector('.nav__links');

  // Sticky scroll shadow
  const scrollObserver = new IntersectionObserver(
    ([entry]) => {
      header?.classList.toggle('is-scrolled', !entry.isIntersecting);
    },
    { threshold: 0 }
  );

  const sentinel = document.createElement('div');
  sentinel.style.cssText = 'position:absolute;top:1px;height:1px;width:1px;pointer-events:none;';
  document.body.prepend(sentinel);
  scrollObserver.observe(sentinel);

  // Altura real del header (franja institucional + nav) para scroll-padding-top
  if (header) {
    const setHeaderHeight = () =>
      document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`);
    new ResizeObserver(setHeaderHeight).observe(header);
    setHeaderHeight();
  }

  // Mobile hamburger
  if (hamburger && navLinks) {
    const setMenuOpen = isOpen => {
      navLinks.classList.toggle('is-open', isOpen);
      hamburger.classList.toggle('is-open', isOpen);
      header?.classList.toggle('is-menu-open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.setAttribute('aria-label', isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    hamburger.addEventListener('click', () => {
      setMenuOpen(!navLinks.classList.contains('is-open'));
    });

    // Close on nav link click
    navLinks.querySelectorAll('.nav__link, .nav__cta').forEach(link => {
      link.addEventListener('click', () => setMenuOpen(false));
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
        setMenuOpen(false);
        hamburger.focus();
      }
    });

    // Al pasar a escritorio el menú desplegable deja de existir: cerrarlo
    // para no dejar el scroll de la página bloqueado.
    window.matchMedia('(min-width: 1200px)').addEventListener('change', e => {
      if (e.matches) setMenuOpen(false);
    });
  }
}
