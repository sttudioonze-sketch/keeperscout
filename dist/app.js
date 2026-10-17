const dialog = document.querySelector('.screen-dialog');
let trigger;
document.querySelectorAll('[data-enlarge]').forEach(button => {
  button.addEventListener('click', () => {
    trigger = button;
    const image = document.getElementById('dialog-screen');
    image.src = button.dataset.enlarge;
    image.alt = `${button.dataset.title} — tela original do Keeper Scout`;
    document.getElementById('dialog-title').textContent = button.dataset.title;
    dialog.showModal();
  });
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {if(event.target === dialog) dialog.close();});
dialog.addEventListener('close', () => trigger?.focus());

const presentation = document.querySelector('.original-video video');
const videoStart = document.querySelector('.video-start');
if (presentation && videoStart) {
  const label = videoStart.querySelector('.video-button-label');
  const icon = videoStart.querySelector('.play-icon');
  videoStart.addEventListener('click', async () => {
    if (!presentation.paused) {presentation.pause(); return;}
    try {await presentation.play();}
    catch {presentation.focus();}
  });
  presentation.addEventListener('play', () => {label.textContent = 'Pausar vídeo'; icon.textContent = 'Ⅱ';});
  presentation.addEventListener('pause', () => {label.textContent = 'Assistir ao vídeo'; icon.textContent = '▶';});
  presentation.addEventListener('ended', () => {label.textContent = 'Assistir novamente'; icon.textContent = '▶';});
}

// A imagem permanece visível se o usuário economiza dados, reduz movimento ou o vídeo falha.
const heroMatch = document.querySelector('.hero-match-video');
if (heroMatch) {
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  let inView = false;
  let sourceLoaded = false;
  const syncMatch = () => {
    if (!inView || document.hidden || motionPreference.matches || connection?.saveData) {
      heroMatch.pause();
      if (motionPreference.matches || connection?.saveData) heroMatch.classList.remove('is-playing');
      return;
    }
    if (!sourceLoaded) {
      heroMatch.querySelector('source').src = heroMatch.querySelector('source').dataset.src;
      heroMatch.muted = true;
      heroMatch.load();
      sourceLoaded = true;
    }
    heroMatch.play().catch(() => heroMatch.classList.remove('is-playing'));
  };
  heroMatch.addEventListener('playing', () => heroMatch.classList.add('is-playing'));
  heroMatch.addEventListener('error', () => heroMatch.classList.remove('is-playing'));
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      syncMatch();
    }, {threshold:0.05}).observe(document.querySelector('.tech-hero'));
  } else {inView = true; syncMatch();}
  document.addEventListener('visibilitychange', syncMatch);
  motionPreference.addEventListener('change', syncMatch);
  connection?.addEventListener('change', syncMatch);
}
