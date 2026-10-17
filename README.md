# Keeper Scout

Landing page do Keeper Scout, com layout responsivo, telas reais do aplicativo e conteúdo aprovado.

## Visualizar localmente

Não exige instalação ou compilação. Com Python 3 instalado, execute na raiz:

```sh
python3 -m http.server 4173 --directory dist
```

Abra http://localhost:4173.

## Estrutura

- `dist/`: site pronto para hospedagem estática, incluindo HTML, CSS, JavaScript, imagens e vídeo.
- `scripts/prepare-web-images.py`: gera versões WebP das imagens; exige Python e Pillow.
- `source-reference/`: referência do conteúdo aprovado.
- `DESIGN.md`: decisões de design e verificações realizadas.
- `.openai/hosting.json`: configuração da publicação existente no Sites.

Para outros serviços de hospedagem, use `dist` como pasta pública. Não há backend, variáveis de ambiente ou etapa de build.
