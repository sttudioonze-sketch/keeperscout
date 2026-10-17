import json,html,re,pathlib,urllib.parse
root=pathlib.Path(__file__).resolve().parent.parent
source=json.load(open(root/'source-reference/approved.json'))
def t(k):return source[k]['texts']
def e(s):return html.escape(s.replace('\u200b','').strip())
def note(s):return '<p class="section-note">'+e(s)+'</p>'
def heading(k):return note(t(k)[0])+'<h2>'+e(t(k)[1])+'</h2>'
def cta(label='Conheça a Keeper Scout',dest='#plano'):return '<a class="button" href="'+dest+'">'+label+' <span aria-hidden="true">↗</span></a>'
path=root/'dist/index.html';old=path.read_text()
prefix=old[:old.index('<section class="hero')]
hero=old[old.index('<section class="hero'):old.index('<section class="audience')]
hero=hero.replace('Inteligência para cada decisão em campo','Keeper Scout')
hero=hero.replace('Uma nova visão.<br>Para a evolução dos goleiros.','O JOGO TERMINA<br>A EVOLUÇÃO CONTINUA')
hero=hero.replace('Transforme cada ação em informação. Conecte o que acontece no jogo ao trabalho que faz seu goleiro evoluir.',e(t('comp-mq8sprkc')[1]))
hero=hero.replace('Explorar o aplicativo','Conheça a Keeper Scout').replace('Baixar o Keeper Scout','Quero assinar o Keeper Scout').replace('href="#baixar">Quero assinar','href="#plano">Quero assinar')
parts=[prefix,hero]
parts.append('<section class="overview wrap" id="aplicativo" data-original="comp-mq8vdbyy"><div class="center-heading"><h2>'+e(t('comp-mq8vdbyy')[0])+'</h2><p>'+e(t('comp-mq8vdbyy')[1])+'</p>'+cta(dest='#recursos')+'</div><div class="overview-media"><div class="original-video"><video controls playsinline preload="metadata" aria-label="Vídeo de apresentação original do Keeper Scout"><source src="assets/apresentacao.mp4" type="video/mp4">Seu navegador não suporta este vídeo.</video></div><img class="thiago-original" src="assets/thiago.png" alt="Thiago Mehl, imagem original do Keeper Scout" loading="lazy"></div><div class="overview-pillars">')
r=t('comp-mq8vdbyy')
for i in (2,4,6):parts.append('<article><h3>'+e(r[i])+'</h3><p>'+e(r[i+1])+'</p></article>')
parts.append('</div></section>')
q=t('comp-mqhw7pvs')[0].split('?')
parts.append('<section class="question-band" data-original="comp-mqhw7pvs"><div class="wrap"><h2>'+e(q[0]+'?')+'</h2><p>Você assiste, analisa e orienta seus goleiros.</p><p>Mas o que acontece com estas informações depois que a partida termina?</p></div></section>')
parts.append('<section class="approved-workflow wrap" id="como-funciona" data-original="comp-mqpi723a comp-mqg3esrb"><div class="center-heading">'+heading('comp-mqpi723a')+'</div><div class="workflow-layout"><div class="workflow-art"><img src="assets/fluxo.png" alt="Keeper Scout, registro e acompanhamento de goleiros" loading="lazy"></div><div class="approved-steps">')
for i,x in enumerate(t('comp-mqg3esrb')):
 title,body=x.split(': ',1)
 parts.append('<article><span class="step-index">'+str(i+1).zfill(2)+'</span><div><h3>'+e(title+':')+'</h3><p>'+e(body)+'</p></div></article>')
parts.append(cta('Quero assinar o Keeper Scout','#plano')+'</div></div></section>')
parts.append('<section class="approved-resources wrap" id="recursos" data-original="comp-mqi1f1jd comp-mrjwni9c comp-mqhzkaxc"><div class="center-heading">'+heading('comp-mqi1f1jd')+'</div><div class="second-video-slot" hidden data-original="comp-mrjxd0ov"></div><div class="resource-grid">')
resources=t('comp-mqhzkaxc')
for i in range(10):
 desc,title=resources[2*i:2*i+2]
 parts.append('<article class="resource-card"><button class="resource-image" data-enlarge="assets/recurso-'+str(i)+'.png" data-title="'+e(title)+'" aria-label="Ampliar tela: '+e(title)+'"><img src="assets/recurso-'+str(i)+'.png" alt="'+e(title)+' — tela original do Keeper Scout" loading="lazy"><span class="enlarge-icon" aria-hidden="true">⤢</span></button><div class="resource-copy"><h3>'+e(title)+'</h3><p>'+e(desc)+'</p></div></article>')
parts.append('</div><div class="section-action">'+cta(dest='#plano')+'</div></section>')
parts.append('<section class="statement approved-statement" data-original="comp-mqyfmqkj"><div class="wrap"><h2>O problema não é analisar.</h2><p>O problema é transformar o jogo em informação útil para que o goleiro evolua. Porque sem evolução, o controle não tem sentido.</p></div></section>')
parts.append('<section class="approved-benefits wrap" id="beneficios" data-original="comp-mqpjjfyk comp-mqpiqtod"><div class="center-heading">'+heading('comp-mqpjjfyk')+'</div><div class="benefits-layout"><div class="benefits-list">')
for x in t('comp-mqpiqtod'):
 title,body=x.split(': ',1)
 parts.append('<article><span class="benefit-mark" aria-hidden="true">✧</span><div><h3>'+e(title+':')+'</h3><p>'+e(body)+'</p></div></article>')
parts.append(cta('Quero assinar o Keeper Scout','#plano')+'</div><div class="benefits-art"><img src="assets/beneficios.png" alt="Keeper Scout, relatórios e evolução dos goleiros" loading="lazy"></div></div></section>')
parts.append('<section class="testimonials wrap" hidden data-original="comp-mqg57inv" data-original-visibility="hidden"><div class="center-heading">'+heading('comp-mqg57inv')+'</div><div class="testimonial-grid">')
for x in t('comp-mqg57inv')[2:]:parts.append('<article><h3>Nome</h3><p>'+e(x)+'</p></article>')
parts.append('</div>'+cta('Quero assinar o Keeper Scout','#plano')+'</section>')
p=t('comp-mrnw6vab')
parts.append('<section class="approved-pricing wrap" id="plano" data-original="comp-mrnw6vab"><div class="price-glow" aria-hidden="true"></div><div class="center-heading">'+note(p[0])+'<h2>'+e(p[1])+'</h2></div><div class="price-box"><h3>'+e(p[2])+'</h3><p class="previous">'+e(p[3])+'</p><p class="price"><span>'+e(p[4])+'</span><strong>'+e(p[5])+'</strong></p><p class="offer-limit">'+e(p[6])+'</p>'+cta('Quero assinar o Keeper Scout','#baixar')+'</div></section>')
parts.append('<section class="downloads" id="baixar" data-original="comp-mu1uyocl"><div class="wrap download-inner"><div>'+note(t('comp-mu1uyocl')[0])+'<h2>'+e(t('comp-mu1uyocl')[1])+'</h2></div><div class="approved-store-links"><a href="https://play.google.com/store/apps/details?id=com.keeperscout" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">▷</span><div><small>Google Play</small><strong>Baixar o Keeper Scout Android</strong></div><b aria-hidden="true">↗</b></a><a href="https://apps.apple.com/us/app/keeperscout/id6771470034" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">◉</span><div><small>App Store</small><strong>Baixar o Keeper Scout Iphone</strong></div><b aria-hidden="true">↗</b></a></div></div></section>')
msg='Olá Thiago, tudo bem? preciso de suporte no Kepper Scout'
wa='https://wa.me/554199290660?text='+urllib.parse.quote(msg,safe='')
parts.append('<section class="support-band wrap" id="suporte" data-original="comp-mqg41w39"><h2>'+e(t('comp-mqg41w39')[0])+'</h2><a class="button secondary" href="'+wa+'" target="_blank" rel="noopener noreferrer">Falar com o Suporte <span aria-hidden="true">↗</span></a></section>')
qs=['1. O que é o KeeperScout?','2. Para quem o app foi feito?','3. O que dá para fazer no KeeperScout?','4. Como funciona o scout durante a partida?','5. O que são os relatórios?','6. Consigo acompanhar a evolução do goleiro ao longo do tempo?','7. Dá para organizar goleiros por clube e categoria?','8. O app é em português? E meus dados ficam seguros?']
parts.append('<section class="faq wrap approved-faq" id="duvidas" data-original="comp-mrf0n4qp"><div><h2>Perguntas Frequentes</h2></div><div class="questions">')
for i,(q,a) in enumerate(zip(qs,t('comp-mrf0n4qp')[1:])):
 # Asterisks in the original FAQ were formatting markers, not words.
 a=e(a.replace('*',''))
 if i==2:a=a.replace(' - ','</li><li>').replace('Você pode:</li>','<p>Você pode:</p><ul>').replace('<li>','<li>',1)+'</li></ul>';body=a
 else:body='<p>'+a+'</p>'
 parts.append('<details'+(' open' if i==0 else '')+'><summary>'+e(q)+'</summary><div class="faq-answer">'+body+'</div></details>')
parts.append('</div></section></main><footer class="footer wrap" data-original="comp-mqg3ag59"><a class="brand" href="https://www.fabricadegoleiros.com.br/" aria-label="Fábrica de Goleiros"><img src="assets/logo.png" alt="Keeper Scout"></a><p>Keeper Scout<br>Todos os direitos reservados</p><div><a href="https://www.fabricadegoleiros.com.br/keepper-scout-termo-de-uso" target="_blank" rel="noopener noreferrer">Termos de Uso</a><span>© 2026 | Sttudio11 Web Design</span></div></footer><dialog class="screen-dialog" aria-labelledby="dialog-title"><div class="dialog-toolbar"><h2 id="dialog-title"></h2><button type="button" class="dialog-close" aria-label="Fechar tela ampliada">✕</button></div><img id="dialog-screen" alt=""></dialog><script src="app.js"></script></body></html>')
path.write_text(''.join(parts))
