# ADS por dentro

Site de apresentação do curso de Análise e Desenvolvimento de Sistemas do IFCE campus Boa Viagem, com laboratório interativo de HTML, CSS e JavaScript.

## Abrir o projeto

Abra `dist/index.html` no Chrome, Edge ou Safari atualizado. Os arquivos e as fontes estão incluídos no projeto: a apresentação funciona offline. Os links para o IFCE precisam de internet.

O projeto foi testado no navegador por um servidor local. Para desenvolvimento, você também pode servir a pasta `dist`:

```sh
cd dist
python3 -m http.server 8080
```

Depois abra `http://localhost:8080`.

## Como apresentar

1. Conheça o curso e clique em “Dê vida à ideia”.
2. No Laboratório web, clique em “Quero criar” e observe o contador.
3. Retire apenas o CSS da seção: o botão continua contando.
4. Restaure o CSS e retire o JS: o botão deixa de atualizar o contador.
5. Retire o HTML: o conteúdo daquela seção sai da página.
6. Use os controles na sidebar para aplicar o experimento ao conteúdo de toda a apresentação.
7. “Retirar tudo” desliga as três tecnologias. “Restaurar site” reativa todos os controles globais e locais.
8. Explore as áreas da formação, o contraste e o desafio final.

No celular, o menu no topo abre a navegação e os controles globais. A apresentação também tem um botão de tela cheia.

## O que os controles realmente fazem

O painel didático é independente e permanece em funcionamento para permitir a restauração. Seu escopo é o conteúdo das cinco seções da apresentação, não a interface de controle.

- **HTML:** retira os nós de conteúdo da árvore do documento e os guarda em um `DocumentFragment`. Ao restaurar, os mesmos nós voltam, preservando o estado da demonstração.
- **CSS:** desativa o `<link>` da folha de estilos no Shadow DOM da seção (`link.disabled`). Aparece a apresentação padrão do navegador. A moldura do painel didático permanece legível.
- **JavaScript:** bloqueia a execução das ações programadas daquela seção. Contador, seleção de área, contraste e desafio deixam de responder. Não remove scripts já executados do navegador: isso não desfaria automaticamente seus efeitos. A interface informa claramente que se trata de uma pausa das interações.
- **Combinados:** os controles globais prevalecem sobre os locais. Quando uma tecnologia é desativada globalmente, seus controles locais ficam indisponíveis até que ela seja reativada.
- **HTML nativo:** links e `<details>` continuam funcionando sem JavaScript; isso também faz parte da explicação.

Não há rastreamento, backend, dependências de pacotes, autenticação nem gravação de dados pessoais. O experimento reinicia com todas as tecnologias ligadas ao recarregar.

## Arquivos

- `dist/index.html`: conteúdo semântico da apresentação e painel didático.
- `dist/assets/painel.css`: sidebar Liquid Glass, navegação e controles independentes.
- `dist/assets/curso.css`: estilo das seções que pode ser retirado.
- `dist/assets/apresentacao.js`: controles e interações, com estados globais e locais.
- `dist/assets/fonts.css` e `fonts/`: DM Sans e Space Grotesk hospedadas localmente.

As seções usam Declarative Shadow DOM com fallback por JavaScript para manter as folhas de estilos isoladas. Em navegadores atuais, o conteúdo é exibido mesmo quando o JavaScript está desabilitado no navegador; o painel de demonstração precisa de JavaScript para funcionar.

## Fontes do conteúdo

- PDF fornecido pelo usuário: “Documento sem título.pdf”, quatro páginas, contendo o roteiro da apresentação e as disciplinas agrupadas por área. As áreas apresentadas são uma organização didática desse material, não uma reprodução integral da matriz vigente.
- Página oficial do curso: https://portal.ifce.edu.br/cursos/boa-viagem-analise-e-desenvolvimento-de-sistemas/ — graduação tecnológica presencial, duração de 2 anos e meio e carga horária de 2.100 horas. Verificação em 20/11/2026.

As fontes DM Sans e Space Grotesk são distribuídas sob SIL Open Font License. Seus textos de licença estão na pasta `dist/assets/fonts`.

Esta é uma apresentação acadêmica; não se apresenta como portal oficial do IFCE. Não há dados inventados sobre vagas, notas de corte, salários ou inscrições abertas.

## Verificação desta versão

Foram verificadas as oito combinações globais de tecnologias nas cinco seções e os quinze controles locais isolados. Também foram testados contador, restauração de estado, abas com teclado, contraste, respostas do desafio e o comportamento nativo de `<details>` sem o JavaScript da seção. A revisão visual cobriu 1440px, 715px e 390px, sem rolagem horizontal no documento ou erros no console.

Para versionar o projeto, mantenha a documentação e os arquivos da pasta `dist`. Não inclua arquivos temporários nem credenciais.
