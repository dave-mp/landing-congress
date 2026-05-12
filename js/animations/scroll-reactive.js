export function initScrollReactive() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const orbA = document.querySelector('.orb-a');
  const orbB = document.querySelector('.orb-b');
  if (!orbA && !orbB) return;

  let angleA = 0, targetA = 0;
  let angleB = 0, targetB = 0;
  let scaleA = 1, targetScaleA = 1;

  function getProgress() {
    const max = document.body.scrollHeight - window.innerHeight;
    return max > 0 ? window.scrollY / max : 0;
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  window.addEventListener('scroll', () => {
    const p = getProgress();
    targetA = p * 480;       // clockwise 480° across the full page
    targetB = p * -300;      // counter-clockwise 300°
    targetScaleA = 1 + p * 0.25;
  }, { passive: true });

  (function tick() {
    angleA = lerp(angleA, targetA, 0.07);
    angleB = lerp(angleB, targetB, 0.07);
    scaleA = lerp(scaleA, targetScaleA, 0.07);

    if (orbA) orbA.style.transform = `rotate(${angleA}deg) scale(${scaleA})`;
    if (orbB) orbB.style.transform = `rotate(${angleB}deg)`;

    requestAnimationFrame(tick);
  })();
}
