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
