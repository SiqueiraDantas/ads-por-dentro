---
name: "ADS por dentro · IFCE Boa Viagem"
description: "Apresentação acadêmica interativa, com controles em Liquid Glass e tecnologias web em camadas."
colors:
  green: "#b6f484"
  green-hover: "#c7ffa1"
  ground: "#101817"
  ink: "#f0f4ef"
  course-ink: "#edf3ec"
  muted: "#aab8b0"
  line: "rgba(203,229,209,.12)"
  nav-ink: "#bcc9c1"
  button-ink: "#19301c"
  html: "#efa489"
  css: "#9bbfff"
  js: "#f1d989"
  local-off: "#372825"
  local-off-ink: "#f3c5aa"
typography:
  display:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(45px,4.1vw,68px)"
    fontWeight: 500
    lineHeight: 1.07
    letterSpacing: "-.04em"
  headline:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(32px,3.2vw,48px)"
    fontWeight: 500
    lineHeight: 1.18
    letterSpacing: "-.035em"
  title:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "29px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-.025em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  button:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.4
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.3
  code:
    fontFamily: "ui-monospace, SFMono-Regular, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  control: "5px"
  button: "8px"
  navigation: "9px"
  card: "12px"
  panel: "15px"
  glass: "23px"
spacing:
  compact: "4px"
  small: "8px"
  control: "12px"
  body: "16px"
  content: "20px"
  section: "30px"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.button-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "13px 20px"
  button-primary-hover:
    backgroundColor: "{colors.green-hover}"
  navigation-link:
    backgroundColor: "transparent"
    textColor: "{colors.nav-ink}"
    rounded: "{rounded.navigation}"
    padding: "12px 10px"
  navigation-link-active:
    backgroundColor: "rgba(182,244,132,.095)"
    textColor: "{colors.green}"
  global-switch:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: "9px 0"
  local-toggle:
    backgroundColor: "#ffffff03"
    textColor: "#b9c7bf"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "5px 8px"
  local-toggle-off:
    backgroundColor: "{colors.local-off}"
    textColor: "{colors.local-off-ink}"
  glass-panel:
    backgroundColor: "linear-gradient(150deg,rgba(93,132,105,.15),rgba(32,48,42,.68) 28%,rgba(20,33,28,.87))"
    textColor: "{colors.ink}"
    rounded: "{rounded.glass}"
    padding: "29px 19px 17px"
    width: "258px"
---

# Design System: ADS por dentro · IFCE Boa Viagem

## Overview

**Creative North Star: "Exposição de tecnologia em camadas"**

Este documento descreve o sistema já implementado; a metáfora e os nomes das cores organizam essa leitura, sem acrescentar preferências atribuídas ao usuário. A identidade confirmada combina português brasileiro, contexto acadêmico do IFCE Boa Viagem e sidebar em Liquid Glass.

O fundo escuro esverdeado sustenta títulos grandes, texto claro e um acento verde luminoso. O vidro concentra navegação e controles; o conteúdo usa divisórias discretas e exemplos materiais de HTML, CSS e JavaScript. A densidade favorece uma apresentação ao vivo com leitura contínua e estados explícitos.

**Key Characteristics:**
- Vidro esverdeado no painel didático persistente.
- Títulos geométricos e texto de leitura amplo.
- Verde luminoso para ações, foco e tecnologia ativa.
- Camadas visuais que explicam a construção da página.
- Controles globais e locais visualmente relacionados, com escopos distintos.

Fontes observadas: `dist/assets/painel.css`, `dist/assets/curso.css` e `dist/index.html` do entregável `outputs/ads-lab`. A cascata final, incluindo os ajustes de legibilidade ao fim das folhas, prevalece sobre declarações anteriores. `PRODUCT.md` da raiz mantém a autoridade de produto.

## Colors

Os tokens do frontmatter preservam os valores CSS de origem; nomes descritivos abaixo explicam seu uso.

### Primary
- **Verde luminoso** (`green`): ações principais, foco, navegação ativa e indicadores de tecnologia ligada. **Verde de resposta** (`green-hover`) clareia a ação ao apontar.

### Secondary
- **Terracota HTML**, **azul CSS** e **amarelo JavaScript** (`html`, `css`, `js`): identificação recorrente das três tecnologias; acompanham texto ou símbolo, sem carregar o estado sozinhos.

### Neutral
- **Carvão esverdeado** (`ground`): fundo do documento e base do vidro.
- **Branco frio** (`ink`, `course-ink`): leitura principal do painel e dos componentes de conteúdo, respectivamente.
- **Sálvia discreta** (`muted`, `nav-ink`): apoio, explicação e navegação em repouso. `line` separa áreas sem criar caixas pesadas.
- **Verde profundo de ação** (`button-ink`): texto sobre o botão claro.
- **Terra de pausa** (`local-off`, `local-off-ink`): estado local desligado; ponto e atributo de estado completam a indicação.

**The Estado Explícito Rule.** Cor acompanha rótulo, posição do switch e estado acessível; não substitui a informação de ligado, retirado ou pausado.

## Typography

**Display Font:** Space Grotesk, com fallback sans-serif. **Body Font:** DM Sans, com fallback sans-serif. Código usa a pilha monoespaçada registrada no frontmatter. As fontes são carregadas localmente por `assets/fonts.css`.

A composição observada combina títulos geométricos de peso médio com texto de leitura sem ornamentos. O frontmatter registra os papéis de referência: `display` para o título inicial, `headline` para seções, `title` para o painel de formação, `body` para leitura, `button` para ações e `label` para os toggles locais.

O texto de conteúdo usa entrelinha variável conforme o contexto: a introdução e várias explicações usam (1.8), enquanto a base dos componentes usa `body`. A introdução tem largura máxima de (440px), ampliada para (510px) em telas grandes; o texto expandido de acessibilidade chega a (75ch).

O título inicial muda por breakpoint: até (1400px), `clamp(42px,4.2vw,61px)`; até (1100px), (47px); entre (651px) e (1000px), `clamp(49px,6.4vw,65px)`; até (650px), `clamp(35px,7.8vw,49px)` com entrelinha (1.11). Cabeçalhos de seção também se ajustam a (36px), (32px) e (38px) conforme essas faixas. Os ajustes finais mantêm parágrafos principais em (16px), ações principais em (14px) e rótulos auxiliares em (12px).

## Layout

No desktop, o painel fixo parte de (18px) das bordas e ocupa a largura registrada em `glass-panel`. A apresentação começa em (310px), tem respiro direito de (42px) e largura máxima de (1900px). A partir de (1600px), o painel cresce para (276px) e a apresentação começa em (330px). Até (1190px), passa a (235px), com conteúdo a partir de (274px).

Até (1000px), o vidro vira cabeçalho expansível; a apresentação recebe espaço superior de (95px). Até (600px), esse espaço é (87px), com margens laterais de (20px). A navegação intermediária usa duas colunas, depois uma; switches globais voltam à pilha vertical na menor faixa. Em desktops com altura até (830px), os espaços verticais do painel se contraem.

Conteúdo usa grades de duas colunas: introdução (1fr / 1.06fr), laboratório (1fr / 1fr), formação (.85fr / 1.15fr) e acessibilidade (1.05fr / 1fr). Até (650px), exemplos, formação, acessibilidade e desafio se empilham. Gaps dependem da função, com (35px) na introdução, (65px) no laboratório e (45px) na formação antes das adaptações. O ritmo é contextual, sem uma grade uniforme de espaçamento imposta retrospectivamente.

## Elevation & Depth

O sistema combina separação tonal, bordas translúcidas e sombras contidas. O vidro usa gradiente, `backdrop-filter: blur(28px) saturate(140%)`, realce interno e sombra externa; até (600px), o gradiente recebe maior opacidade para leitura. As três placas do exemplo usam inclinação e sobreposição para comunicar profundidade. Os valores completos de sombra, movimento e breakpoints estão no sidecar.

**The Vidro Funcional Rule.** O efeito Liquid Glass pertence ao painel persistente de orientação e controle; os exemplos usam sua própria profundidade para explicar as tecnologias.

Transições observadas duram (0.18s–0.25s) para resposta a estado e (0.5s) para reorganizar as placas. `prefers-reduced-motion: reduce` desliga animações e transições; a rolagem suave também é suspensa no painel.

## Shapes

Botões e controles têm cantos pequenos ou médios; navegação, exemplos e painéis usam os papéis de raio do frontmatter. O vidro se distingue pelo maior arredondamento. A versão móvel do vidro usa o raio de painel, sem copiar o contorno desktop. Trilhos dos switches são cápsulas e seus puxadores são circulares. Bordas finas e translúcidas delimitam estado e superfície; os círculos decorativos ficam nos exemplos de composição e desafio.

## Components

### Buttons

Ação principal clara e direta: verde luminoso, texto profundo, borda da mesma cor e espaço interno definido no token. Hover usa `green-hover` e a sombra final de (0 6px 18px -8px #0005). Ícone de ação mede (16px). Até (650px), a largura de padding cai para (18px), mantendo fonte final de (14px). Links de ação oficial preservam essa linguagem. Botões de retirada e restauração usam tratamentos discretos no vidro.

### Navigation

Linhas com ícone de (18px), rótulo e badge opcional. Repouso usa `navigation-link`; hover acrescenta branco translúcido e texto claro. Estado ativo usa fundo e borda verdes discretos, com `aria-current="location"`. No celular, o menu expansível preserva os mesmos rótulos e indica abertura por `aria-expanded`.

### Global switch

Controle largo com tecnologia e explicação à esquerda, trilho de (31 × 18px) à direita e puxador de (12px). Ligado: trilho verde e puxador deslocado (12px); desligado: trilho cinza esverdeado e puxador à esquerda. Rótulo final de (14px), apoio de (12px). Usa botão com `role="switch"` e `aria-checked` para toda a apresentação.

### Local toggle

Controle compacto por seção com ponto de estado e rótulo HTML, CSS ou JS. Em repouso usa `local-toggle`; desligado adota `local-toggle-off`, borda terracota e ponto correspondente. Altura mínima de (30px), ampliada a (34px) até (600px), quando o padding passa a (6px 7px). Quando bloqueado pelo estado global, o texto e o ponto usam tom apagado e o controle fica desabilitado. O painel de controle continua disponível ao retirar estilos do conteúdo.

### Glass panel / containers

O painel de vidro aloja marca, navegação, switches e restauração. Sua materialidade é registrada em Elevation & Depth e no snippet completo. Exemplos de conteúdo usam recipientes mais discretos: janela do laboratório com raio de painel e sombra própria; painel de formação com raio de card e fundo translúcido; amostra de contraste com estados escuro e claro. Não há campo de entrada textual nesta versão.

**The Foco Visível Rule.** Links, botões e alvos de teclado usam contorno verde de (3px), com afastamento de (5px); o conteúdo também aplica esse tratamento a `summary` e alvos com `tabindex`.

## Do's and Don'ts

### Do:
- **Do** manter português brasileiro e identificação do IFCE Boa Viagem nas superfícies pertinentes.
- **Do** preservar a relação entre verde luminoso, ação principal, foco e estado ligado.
- **Do** manter rótulos explícitos para os escopos global e local e uma restauração sempre acessível.
- **Do** respeitar a cascata final de legibilidade, o empilhamento móvel e a preferência por movimento reduzido.

### Don't:
- **Don't** transformar a retirada de CSS do conteúdo na perda dos controles didáticos.
- **Don't** indicar tecnologia ligada ou desligada somente pela cor.
- **Don't** espalhar a materialidade do painel de vidro por todos os blocos de leitura.
- **Don't** documentar simulação de pausa como remoção literal de JavaScript ou do documento inteiro.
