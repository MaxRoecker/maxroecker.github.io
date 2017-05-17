---
title: Por que você deveria aprender JavaScript
featured: false
date: 2015-08-21 00:16:21
description: Já considerada uma linguagem sem importância, hoje ela assume um papel líder no mercado.
cover:
  path: cover.png
  title: JavaScript Logo
tags:
  - javascript
  - personal
---
A web se tornou a plataforma padrão de desenvolvimento nos últimos anos, e isso é evidenciado pelo tanto de [ferramentas](https://www.npmjs.com/), [ambientes gráficos](http://www.i-programmer.info/news/167-javascript/5418-javascript-to-be-the-default-langauge-for-gnome.html), [plataformas de desenvolvimento](http://electron.atom.io/) e [sistemas operacionais](http://www.chromium.org/chromium-os) que utilizam suas tecnologias para apresentar seu conteúdo. Hoje, aplicações para dispositivos móveis nativas incorporam tecnologias do HTML, CSS e JavaScript em seu núcleo. Nem mesmo o hardware tem escapado dessa mudança. Projetos como [Arduino](https://lostechies.com/derickbailey/2013/07/30/let-me-teach-you-arduino-with-javascript/), [NodeBots](http://nodebots.io/) e [Tessel](https://tessel.io/) vislumbram que em um futuro próximo poderemos ter JavaScript como uma linguagem comum para sistemas embarcados.

Porém, ainda há certa barreira em aprender essa linguagem, pois ela já foi considerada, e com razão, sem importância, um brinquedo, que tinha somente a função de criar alguns efeitos na interface do usuário. Hoje essa situação mudou.

## A aurora de um novo tempo

Em meados de 2004, o Google lança o Gmail, serviço de e-mail consagrado por garantir espaço quase ilimitado gratuitamente. Porém, algo muito importante também foi feito: sua interface utilizava AJAX para acrescentar dinamismo na interação do usuário com a aplicação. O **AJAX** (do inglês _Asynchronous Javascript And XML_) permitia a troca de informações com o servidor de forma assíncrona com o [XMLHttpRequest](https://developer.mozilla.org/pt-BR/docs/Web/API/XMLHttpRequest) da Microsoft, ou seja, permitia com que conteúdo fosse carregado sem necessidade do recarregamento da página inteira. Desde então, o desenvolvimento de aplicações web não foi mais o mesmo e evoluiu em velocidade espantosa.

{% quote author:"Jesse James Garrett" url:"http://www.adaptivepath.com/ideas/ajax-new-approach-web-applications/" %}
AJAX não é uma tecnologia. Na verdade são muitas tecnologias, cada uma florescendo por conta própria, trabalhando juntas de forma poderosa
{% endquote %}

Já em 2009, o lançamento do [Node.js](https://nodejs.org/) permitiu que o JavaScript, aliado a um [I/O não bloqueante](https://en.wikipedia.org/wiki/Asynchronous_I/O) e [orientado a eventos](https://en.wikipedia.org/wiki/Event-driven_programming), ganhasse espaço no lado do servidor das aplicações. Sua adoção foi muito rápida, principalmente para atender a nova demanda de aplicativos web e mobile que exigiam grandes quantidades de respostas em tempo real. Dois anos mais tarde, em 2011, foi lançado o [NPM](https://www.npmjs.com/), gerenciador de pacotes e de bibliotecas para o Node, causando uma explosão em sua popularidade. Veja o gráfico abaixo, que compara a quantidade de módulos entre os principais gerenciadores de pacotes.

{% figure alt:"Gráfico da quantidade de módulos presentes em diversos repositórios." caption:"O npm já superou a quantidade de módulos. Fonte: [Module Counts](http://www.modulecounts.com/)" width:569 height:372 %}
{% asset_path "npm.jpg" %}
{% endfigure %}

## Vantagens

#### Performance

Nos navegadores e ambientes modernos, a maioria dos códigos JavaScript é compilado, otimizado e executado como código nativo. Portando, seu tempo de execução é próximo de aplicações escritas em C ou C++. Ainda que se tenha [processamento em excesso](https://en.wikipedia.org/wiki/Overhead_(computing)) para a tipagem dinâmica dos dados e para o [gerenciamento de memória](https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)) de dados que não são mais utilizados pela aplicação, mas na maioria dos casos essa diferença é insignificante.

#### Orientação a objetos

O JavaScript possui um rico suporte para programação orientada a objetos (OO). Utilizando o modelo de herança baseada em protótipo, ao invés de classes, é possível modificar as propriedades dos objeto-pai (protótipos) a qualquer momento, aumentando a flexibilidade da linguagem.

É possível também utilizar os principais conceitos de OO: encapsulamento, polimorfismo, herança múltipla e composição. Orientação a objetos baseada em protótipos (POO) é muito mais flexível que a orientação de objetos baseadas em classes (COO). É possível imitar COO com POO, caso você queira; o contrário não é verdadeiro.

#### Funções como objetos de primeira classe

Em JavaScript praticamente tudo é um objeto, até mesmo funções. Por isso, funções podem ser usadas em qualquer lugar onde você pode utilizar uma variável.

Podemos criar funções de alta ordem — funções que recebem outras funções como parâmetros e/ou retornam que funções —, utilizadas em programação funcional para abstrair códigos que muitas vezes são repetidos ou com micro-controle. Bons exemplos são as funções `map()`, `reduce()` ou `filter()`; que abstraem iteração e manipulação de listas sem o uso de declarações de laço, ou seja, você poderá percorrer listas e outras estruturas encadeadas sem precisar do uso de `for` ou `while` explícitos. Isso diminui drasticamente o tamanho do código escrito, além de torná-lo mais expressivo e declarativo.

#### Reusabilidade

Código escrito em JavaScript é portável e facilmente reusável em outros locais. É tão flexível que permite você escrever o mesmo código no cliente e no servidor, ou distribuir a base de dados entre todos clientes.

Com tudo isso, a produtividade ao escrever um código pode ser elevada ao máximo. A utilização de códigos de terceiros — que normalmente já foram testadas e aprovadas — é facilmente integravel. Com JavaScript é fácil criar módulos e encapsular suas funcionalidades.

## Conclusão

Hoje, a **Lei de Atwood** nunca pareceu ser tão verdadeira. O JavaScript tem dominado — e continua crescendo — em todas as áreas e aplicações, desde [aplicativos sociais](https://developers.facebook.com/docs/javascript) ou [suítes office baseadas em nuvem](https://www.google.com/docs/about/) baseadas em nuvem, até mesmo [jogos](http://phaser.io/) com grande processamento gráfico.

{% quote "Jeff Atwood" "http://blog.codinghorror.com/the-principle-of-least-power/" %}
Qualquer aplicação que possa ser escrita em JavaScript, eventualmente será escrita em JavaScript
{% endquote %}
