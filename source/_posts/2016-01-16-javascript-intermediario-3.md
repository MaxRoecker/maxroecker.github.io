---
title: 'JavaScript Intermediário #3: Hoisting'
description: 'Conheça o Hoisting, o içamento de variáveis, característica peculiar do JavaScript que normalmente é causa confusão entre os desenvolvedores.'
cover:
  path: cover.jpg
  title: 'Polyhedron models'
  src: 'https://www.flickr.com/photos/fdecomite/3274431349/in/album-72157613498998540/'
featured: false
date: 2016-01-16 18:34:26
tags:
  - javascript
---
> **i.çar**: Alçar, erguer, levantar.

Hoje veremos uma característica bastante peculiar  do JavaScript e que normalmente é causa de pequenos erros quanto estamos trabalhando com linguagem: o içamento de variáveis, comumente chamado de  *Hoisting*.

---
## Hoisting de variáveis
No momento de execução, as declarações de variáveis em JavaScript passam por um processo de içamento, ou seja, a declaração da variável “sobe” para o topo do escopo atribuído. Esse processo funciona tanto para declarações `var` quanto para declarações `let`. Veja:

{% simplecode js %}
``` js
var x = 1;

function foo() {
  console.log( x );
  var x = 2;
};

foo();
```
{% endsimplecode %}

Qual é o valor impresso pelo `console.log(x)`? Se você chutou `1`, infelizmente você está **errado**. Essa é uma das principais fontes de erros e *bugs* em códigos escritos na linguagem. O *hoisting* permite a utilização virtual de variáveis antes mesmo de sua declaração, mas sua inicialização continua no mesmo lugar de antes. O valor impresso pelo `console.log(x)`, nesse caso, é `undefined`. O código anterior, após o processo de *hoisting*, é interpretado como o código abaixo:

{% simplecode js %}
``` js
var x = 1;

function foo() {
  var x; // Declaração puxada no topo, valor é undefined.
  console.log( x );
  x = 2; // A inicialização ainda se encontra aqui.
};

foo();
```
{% endsimplecode %}

---
## Hoisting de funções
O processo de *hoisting* também afeta as funções nomeadas — funções declaradas da seguinte forma `function nomeDaFunção ( ... )` —, porém seu comportamento é diferente do de variáveis; a inicialização da variável é imediata, ou seja, quando uma função nomeada é içada, sua inicialização também sofre o mesmo efeito. Dessa forma, o código a seguir é válido.

{% simplecode js %}
``` js
foo( 1 );

function foo( a ) {
  return 'Função nomeada #' + a;
};
```
{% endsimplecode %}

O resultado do código é `Função nomeada #1`. Perceba que a função é declarada após o momento de chamada da mesma, mas pelo processo de *hoist* essa declaração é levada para o início do escopo — nesse caso, o início do arquivo. Mas lembre-se, esse processo somente funciona para funções nomeadas, funções anônimas atribuídas à variáveis não sofrem *hoisting*, pois a inicialização da variável nunca é içada com a declaração da mesma.

{% asset_img hoist.svg [Analogia ilustrativa da fase de hoist como um guindaste que eleva as declarações de variáveis ao topo do escopo.] %}

---
## Boas práticas
Pelos exemplos anteriores, é óbvio que o comportamento de içar ao topo do escopo as declarações de variáveis e funções nomeadas pode levar a resultados confusos e proporcionar um código de difícil leitura. Portanto, é importante que você siga algumas boas práticas no momento de escrita do código.

É importante que você mantenha a leitura do código em acordo com o estado dele. Dessa forma, elevar as declarações de suas variáveis para o topo do seu respectivo escopo evita confusão com o processo de *hoisting*, pois seu código deixa explícito que desde o topo do escopo a variável está declarada.

Outra prática importante é a inicialização de um valor na variável sempre que possível, com exceção para os casos quando a inicialização não pode ser atribuído no momento. Dessa forma, seu código se torna mais declarativo e evita valores indefinidos no corpo da função. Veja o exemplo abaixo:

{% simplecode js %}
``` js
function foo() {
  var number = 1,
      string = 'Result: ',
      bar = function( a ) {
        return 2 * a;
      },
      result;
  result = string + bar( 1 );
  console.log( result );
};

foo();
```
{% endsimplecode %}
