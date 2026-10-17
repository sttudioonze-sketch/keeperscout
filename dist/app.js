const screens = {
  inicio: {src:'assets/tela-inicial.png', alt:'Tela inicial real do Keeper Scout com goleiros e partidas', label:'Visão geral do aplicativo'},
  relatorio: {src:'assets/relatorio.png', alt:'Tela real do relatório de jogo no Keeper Scout', label:'Relatório após a partida'}
};
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab) {
  tabs.forEach(item => {item.setAttribute('aria-selected', String(item === tab)); item.tabIndex = item === tab ? 0 : -1;});
  const screen = screens[tab.dataset.screen];
  const img = document.getElementById('product-screen');
  img.src = screen.src; img.alt = screen.alt;
  document.getElementById('screen-label').textContent = screen.label;
  document.getElementById('painel-tela').setAttribute('aria-labelledby', tab.id);
}
tabs.forEach((tab,index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if(event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
    if(event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
    if(event.key === 'Home') next = 0;
    if(event.key === 'End') next = tabs.length - 1;
    if(next !== undefined) {event.preventDefault(); tabs[next].focus(); selectTab(tabs[next]);}
  });
});
