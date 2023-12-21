---
title: 'JavaScript Intermediário #5'
subtitle: 'IIFE'
heading: 'Compreenda o que são funções auto-executantes e quais as vantagens de utilizá-las em seu código'
created: 2016-04-04 14:22:21
permalink: 'blog/javascript-intermediario-5/index.html'
tags:
  - javascript
---

Hoje iremos abordar a IIFE, uma prática muito utilizada no JavaScript quando
estamos desenvolvendo aplicações ou módulos na linguagem já que ela garante um
código que não cause ou seja afetado por efeitos colaterais externos.

## Introdução

Para entender a IIFE, precisamos relembrar o que são expressões funcionais e <i
lang="en">closures</i> em JavaScript.

Funções são tratadas como qualquer outro valor em JavaScript, e, por isso, podem
ser atribuídas em variáveis, passadas como parâmetro ou retornadas como
resultado. Toda vez que uma expressão resulta em uma função, dizemos que temos
uma **expressão funcional**. Uma declaração de função utilizando a palavra-chave
`function` sempre retorna como valor uma referência para a função definida e,
por isso, também é considerada uma expressão funcional. Uma variável pode
executar uma função que ela referencia utilizando um par de parênteses `(…)`
entre os parâmetros da função.

<aside> <p> Caso você queira ler mais sobre o comportamento de expressões
funcionais em JavaScript, recomendo a leitura <a
href="https://maxroecker.github.io/blog/javascript-basico-6/">dessa
publicação</a> no blog. </p> </aside>

Além disso, toda vez que uma função é definida internamente de um escopo de
outra função e, além disso, referencia variáveis locais da função externa; temos
uma <i lang="en">closure</i>. Uma <strong><i lang="en">closure</i></strong>
armazena o escopo léxico da função externa e é capaz de acessá-lo mesmo quando a
sua execução já tenha sido finalizada. O <i lang="en">closure</i> é um estado
privado da função e nada mais tem acesso a esse estado exceto outras funções
definidas no mesmo <i lang="en">closure</i>.

<aside> <p> Se você quiser entender melhor sobre o que são <i
lang="en">closures</i>, <a
href="https://maxroecker.github.io/blog/javascript-intermediario-2/">essa outra
publicação</a> do blog pode lhe ajudar. </p> </aside>

## O Padrão IIFE

Com os conceitos relembrados na introdução, podemos criar uma IIFE. **IIFE é uma
expressão funcional que é executada imediatamente após ser definida**.
Normalmente, uma IIFE (do inglês, <i lang="en">Immediately-Invoked Function
Expression</i>) é escrita como uma a definição de uma função — e sua consequente
expressão funcional — seguida da sua imediata execução. Você pode utilizar o
padrão IIFE utilizando a palavra chave `function` na seguinte forma:

```js
(function () {
  // ...
})();
```

Veja que entre o primeiro par de parênteses externos estamos definindo uma
função — que retorna uma expressão funcional — e, logo em seguida, no segundo
par de parênteses externos, estamos invocando-a.

Vamos aplicar a IIFE em um exemplo prático. Suponha que queremos definir um
contador global e único que somente seja acessível via três funções: `read`, que
retorna o estado atual do contador; `count` que incrementa e retorna o valor do
contador e `reset` que reinicializa o contador. Você poderia implementar uma
solução tal como o código abaixo:

```js
var state = 0;

function read() {
  return state;
}

function count() {
  state = state + 1;
  return state;
}

function reset() {
  state = 0;
  return state;
}

count();
count();
console.log(read()); // → 2
reset();
console.log(read()); // → 0
```

Apesar da variável `state`, que armazena o estado atual do contador, ser global
e única, essa solução possui problemas: a variável `state` está disponível para
todo e qualquer subrotina uma vez que ela é definida globalmente. Além disso, a
variável `state` “polui” o escopo global do código, o que pode levar a conflito
de nomes e bugs difíceis de serem encontrados.

Podemos proteger a variável `state` de efeitos colaterais externos utilizando
uma IIFE. Vamos então refatorar o código acima utilizando essa prática:

```js
var counter = (function () {
  var state = 0;

  return {
    read: function () {
      return state;
    },

    count: function () {
      state = state + 1;
      return state;
    },

    reset: function () {
      state = 0;
      return state;
    },
  };
})();

counter.count();
counter.count();
console.log(counter.read()); // → 2
counter.reset();
console.log(counter.read()); // → 0
```

Agora, no código acima, a variável `state` está protegida por uma <i
lang="en">closure</i> e, dessa forma, não é mais acessível por nenhuma função
exceto a `read`, `count` e `reset`. Para que tenhamos acesso a essas funções, o
retorno da IIFE é um objeto que contém referências para as funções que acessam
`state`. Por isso que a utilização delas é um pouco modificada na refatoração
final.

<aside> <p> A IIFE também pode ser encontrado pelo nome de SEAF (do inglês, <i
lang="en">Self-Executing Anonymous Function</i>). No entanto, o termo IIFE, <a
href="http://benalman.com/news/2010/11/immediately-invoked-function-expression/#iife">introduzido
por Ben Alman</a>, é considerado semanticamente mais adequado. Afinal, a prática
não requer utilizar somente funções anônimas. </p> </aside>

## Conclusões

A IIFE é uma prática muito utilizada para proteger o escopo global da poluição e
conflito de nomes de variáveis. Além disso, permite aliviar um pouco a confusão
de escopos de bloco/função dados pelo
[mecanismo de hasteamento de variáveis e funções do JavaScript](http://maxroecker.github.io/blog/javascript-intermediario-4/).

Outra comum utilização da IIFE é o construção de um estado privado e
encapsulado, uma vez que as variáveis que são utilizadas pelas funções
retornadas da IIFE ficam alocadas em uma <i lang="en">closure</i> e somente
essas funções possuem acesso a elas, como vimos no exemplo.

O post de hoje ficou mais curto, mas, lembre-se, as IIFEs eram uma das poucas
alternativas para a simulação de módulos em JavaScript em uma época anterior ao
ES2015. É sempre bom ter esse conhecimento no seu inventário.
