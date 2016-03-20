---
title: "JavaScript Básico #1: Introdução"
featured: false
date: 2015-08-26 00:33:36
description: "O que é JavaScript? Uma pequena introdução sobre a linguagem que nasceu na web."
cover:
  path: cover-3.jpg
  title: Tetrahemihexahedron
  src: 'https://www.flickr.com/photos/21649179@N00/4282044498'
tags:
  - javascript
---

{% blockquote %}
Uma **linguagem de script** é uma linguagem de programação desenvolvida para um ambiente de execução específico.
{% endblockquote %}

O **JavaScript** (abreviado como **JS**) é uma linguagem de programação desenvolvida em 1995 com o objetivo de adicionar aos documentos HTML uma programação dentro do navegador Netscape Navigator e desde então foi adotada pelos maiores navegadores gráficos. O JavaScript é o responsável por podermos utilizar as modernas aplicações web e permitiu com que a web se transformasse no que é hoje.

Em seu núcleo, o JavaScript uma [linguagem de script](https://en.wikipedia.org/wiki/Scripting_language) [dinâmica](https://en.wikipedia.org/wiki/Dynamic_programming_language) com [funções de primeira classe](https://en.wikipedia.org/wiki/First-class_function) e que suporta a criação de [objetos](https://en.wikipedia.org/wiki/Object-oriented_programming) baseados em [protótipos](https://en.wikipedia.org/wiki/Prototype-based_programming). Por essas características, é considerada uma linguagem de multi-paradigma, oferecendo suporte para programação de estilo [imperativo](https://pt.wikipedia.org/wiki/Programa%C3%A7%C3%A3o_imperativa), [orientado a objetos](https://pt.wikipedia.org/wiki/Orienta%C3%A7%C3%A3o_a_objetos) e  [funcional](https://pt.wikipedia.org/wiki/Programa%C3%A7%C3%A3o_funcional). Mas não se preocupe em entender todos esses conceitos por agora.

 Apesar de ter seu nascimento em navegadores e clientes web, atualmente o JavaScript é uma linguagem que habita também o lado do servidor. Por exemplo, a engine [V8](https://developers.google.com/v8/) do Google é utilizada no navegador Google Chrome e nas versões mais recentes do Opera, mas é utilizado também pelo [Node.js](https://nodejs.org/). Outro exemplo é o [MongoDB](https://www.mongodb.org/), banco de dados não relacional, que utiliza o JavaScript como linguagem de busca. É importante observar que o JavaScript **nada** tem a ver com linguagem de programação Java. O nome JavaScript foi dado por questões de marketing e até hoje estamos ainda presos ao nome.
 
Continuando a história da linguagem, após a adoção por outros navegadores uma especificação foi desenvolvida para padronizar como o JavaScript deve funcionar, denominado como **ECMAScript**. Na prática, ambos os termos ─ JavaScript e ECMAScript ─ podem ser considerados sinônimos. Atualmente, está em processo de finalização da versão 6 da ECMAScript, que trará significativas mudanças na forma com que se programa JavaScript.

## Série sobre JavaScript

Pretendo iniciar essa série de artigos sobre JavaScript para compartilhar um pouco do conhecimento que adquiri nos últimos anos, pois acredito que a gente só aprende uma coisa de verdade quando você ensina ela. Sei que há muito conteúdo, e de qualidade, sobre JavaScript pela web ─ basta uma pesquisada no Google ─ mas muito do conteúdo relevante é dado em língua inglesa ou apresentam conceitos que já são obsoletos, ou seja, um obstáculo para desenvolvedores iniciantes e aspirantes em programação que querem aprender sobre essa poderosa linguagem.

Nessa série, vou exibir inicialmente aspectos primários da linguagem e aos poucos ir revelando detalhes importantes e complexos conforme avançamos. Vou me esforçar para tratar o assunto da maneira fácil para você compreender, mas é importante que você já tenha algum entendimento de codificação e lógica de programação. Faço sempre uso de uma grande quantidade de exemplos, afinal, ***a melhor forma de aprender a codificar é codificando***.

{% blockquote Linus Torvalds http://lkml.org/lkml/2000/8/25/132 %}
Talk is cheap, show me the code
{% endblockquote %}

Quer começar já? Pois então vamos lá! Caso você esteja num navegador atualizado ─ como o Google Chrome ou o Mozilla Firefox ─ aperte <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>J</kbd> e você verá uma tela com um cursor. Bem vindo ao **Console JavaScript** do seu navegador! Tente digitar a seguinte expressão abaixo e aperte <kbd>Enter</kbd>:

{% simplecode js %}
``` js
var foo = 'Olá Mundo!';
```
{% endsimplecode %}

Em seguida, digite a próxima expressão e novamente aperte <kbd>Enter</kbd>:

{% simplecode js %}
``` js
console.log( foo );
```
{% endsimplecode %}

Viu resultado? Parabéns! Você fez sua primeira atribuição de valor em uma variável e imprimiu o resultado na tela. Simples, não? Esse é só um exemplo básico de como utilizar o console para lhe auxiliar nesse período de aprendizado, ele é seu companheiro e sua melhor ferramenta para aprender JavaScript.

Tente agora uma coisa um pouco mais complexa, escreva a função abaixo no console. **Dica**: quando for pular a linha, use <kbd>Shift</kbd> + <kbd>Enter</kbd> e após de digitar tudo aperte <kbd>Enter</kbd>.

{% simplecode %}
```js
function fac( n ) {
  if ( n == 0 )
    return 1;
  else
    return fac( n - 1 ) * n;
}
```
{% endsimplecode %}

Após isso, execute os seguintes comandos:

{% simplecode %}
``` js
fac( 1 );
fac( 2 );
fac( 3 );
fac( 6 );
```
{% endsimplecode %}

Compreendeu o que a função faz? ***:)***

#### Livros
* [JavaScript for Cats](http://jsforcats.com/)
* [Eloquent JavaScript](http://eloquentjavascript.net/)

#### Links
* [Learn JavaScript Essentials](https://medium.com/javascript-scene/learn-javascript-b631a4af11f2)
* [JavaScript: The Right Way](http://jstherightway.org/)
* [How to Learn JavaScript Properly](http://javascriptissexy.com/how-to-learn-javascript-properly/)

#### Vídeos
* [Desvendando a linguagem JavaScript](https://www.youtube.com/playlist?list=PLQCmSnNFVYnT1-oeDOSBnt164802rkegc)
* [Code School: JavaScript Road Trip Part 1](https://www.codeschool.com/courses/javascript-road-trip-part-1)
