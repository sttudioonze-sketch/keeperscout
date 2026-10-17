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

const mobileNav = document.querySelector('.mobile-nav');
if (mobileNav) {
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => mobileNav.removeAttribute('open')));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobileNav.open) {
      mobileNav.removeAttribute('open');
      mobileNav.querySelector('summary').focus();
    }
  });
  document.addEventListener('click', event => {if (mobileNav.open && !mobileNav.contains(event.target)) mobileNav.removeAttribute('open');});
}
