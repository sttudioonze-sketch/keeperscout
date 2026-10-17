(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const hero = document.querySelector('.tech-hero');
  const animations = new Set();
  const play = (element, keyframes, options) => {
    if (!element || reduced.matches || !element.animate) return;
    const animation = element.animate(keyframes, options);
    animations.add(animation);
    animation.finished.then(() => animations.delete(animation), () => animations.delete(animation));
  };
  const enter = (element, delay = 0, distance = 24) => play(element, [
    {opacity: 0, translate: `0 ${distance}px`, filter: 'blur(4px)'},
    {opacity: 1, translate: '0 0', filter: 'blur(0px)'}
  ], {duration: 850, delay, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards'});

  if (!reduced.matches) {
    document.documentElement.classList.add('motion-ready');
    ['.hero-copy .intro', '.hero-copy h1', '.hero-copy .lead', '.hero-actions'].forEach((selector, index) => {
      enter(document.querySelector(selector), 100 + index * 120, index === 1 ? 28 : 18);
    });
    enter(document.querySelector('.hero-panels'), 480, 42);
    document.querySelectorAll('.floating-tag').forEach((tag, index) => enter(tag, 650 + index * 100, 12));
  }

  if ('IntersectionObserver' in window) {
    const reveal = new IntersectionObserver(entries => {
      entries.filter(entry => entry.isIntersecting).forEach((entry, index) => {
        enter(entry.target, Math.min(index * 65, 195));
        reveal.unobserve(entry.target);
      });
    }, {threshold: 0.08, rootMargin: '0px 0px -25px 0px'});
    document.querySelectorAll('.center-heading, .overview-media, .overview-pillars article, .question-band .wrap, .workflow-art, .approved-steps article, .resource-card, .approved-statement .wrap, .benefits-list article, .benefits-art, .price-box, .download-inner > div, .support-band, .approved-faq > div').forEach(element => reveal.observe(element));
    const visibility = new IntersectionObserver(entries => {
      entries.forEach(entry => hero.classList.toggle('effects-active', entry.isIntersecting && !reduced.matches));
    });
    visibility.observe(hero);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) hero.classList.remove('effects-active');
      else if (!reduced.matches && hero.getBoundingClientRect().bottom > 0) hero.classList.add('effects-active');
    });
  }

  document.querySelectorAll('.glass-panel, .resource-card, .price-box, .approved-store-links a').forEach(surface => {
    let frame;
    surface.addEventListener('pointermove', event => {
      if (reduced.matches || !finePointer.matches) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = surface.getBoundingClientRect();
        surface.style.setProperty('--shine-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
        surface.style.setProperty('--shine-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
      });
    });
    surface.addEventListener('pointerleave', () => {
      cancelAnimationFrame(frame);
      surface.style.removeProperty('--shine-x');
      surface.style.removeProperty('--shine-y');
    });
  });
  let lightFrame;
  hero.addEventListener('pointermove', event => {
    if (reduced.matches || !finePointer.matches) return;
    cancelAnimationFrame(lightFrame);
    lightFrame = requestAnimationFrame(() => {
      const bounds = hero.getBoundingClientRect();
      hero.style.setProperty('--light-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
      hero.style.setProperty('--light-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
    });
  });
  hero.addEventListener('pointerleave', () => {
    cancelAnimationFrame(lightFrame);
    hero.style.removeProperty('--light-x');
    hero.style.removeProperty('--light-y');
  });
  reduced.addEventListener('change', () => {
    if (reduced.matches) {
      animations.forEach(animation => animation.cancel());
      hero.classList.remove('effects-active');
      document.documentElement.classList.remove('motion-ready');
    } else if (hero.getBoundingClientRect().bottom > 0) {
      hero.classList.add('effects-active');
    }
  });
})();
