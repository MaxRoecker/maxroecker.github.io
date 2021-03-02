---
title: 'JavaScript Intermediário #1'
subtitle: 'Escopos léxicos'
heading: 'Compreenda os vários modos de declaração de variáveis e as principais características do escopo léxico no JavaScript.'
date: 2015-12-15 17:37:54
tags:
  - javascript
  - post
---

Nessa publicação, vamos focar em um dos aspectos que mais geram confusão entre
os desenvolvedores que estão iniciando o aprendizado em JavaScript: o escopo
léxico de variáveis. Mas, o que é escopo léxico de uma variável?

Uma variável definida em um código recebe um identificador único — um nome — que
é utilizado quando queremos referenciar o valor que essa variável aponta. O
trecho do código em que uma variável qualquer é identificada por um nome é
definido como o **escopo léxico da variável**. Fora desse bloco, a variável é
indefinida ou um outro valor é identificado por esse nome.

<aside> <p> <b>lé·xi·co</b>: (1) Os vocábulos de uma língua; (2) Vocábulos
usados num domínio especializado. </p> </aside>

Na maioria das linguagens descendentes do C, o escopo léxico de uma variável é
definido pelo bloco em que ela foi declarada. Lembrando que um bloco é uma
sequência de declarações entre um par de chaves `{…}`. No JavaScript, nem sempre
o bloco é quem define o escopo da variável, tudo depende da forma com que a
variável foi declarada.

Antes do ECMAScript 2015, só existia uma forma de declarar variáveis: utilizando
da palavra chave `var`. O ECMAScript 2015 trouxe mais duas alternativas, o `let`
e o `const`, que definem um escopo léxico diferente e também ditam a
mutabilidade da variável declarada.

## Declaração de variáveis com `var`

Declarações de variáveis com `var` definem um **escopo léxico de função**, ou
seja, é a função quem define o local que uma variável é identificada por um
nome. Essa abordagem é bastante peculiar e difere da maioria das linguagens,
veja o exemplo abaixo:

```js
var x = 'foobar';

console.log(x); // → foobar

function exemplo() {
  var x = 'foo';
  console.log(x); // → foo
  for (var i = 0; i < 1; i++) {
    var x = 'bar';
    console.log(x); // → bar
  }
  console.log(x); // → bar
}

exemplo();

console.log(x); // → foobar
```

Nota-se que, apesar da variável `x` declarada dentro da função `exemplo` ser
redeclarada novamente dentro do laço, as alterações feitas no laço se mantém
mesmo após a conclusão. Já para a variável `x` declarada fora da função
`exemplo`, o valor não é alterado. Podemos ver que o bloco não definiu o escopo
da variável `x`, mas o corpo da função sim.

## Declarações de variáveis `let`

A declaração de variável `let` foi adicionada ao ECMAScript 2015 para permitir a
declaração de variáveis tenham um escopo léxico de bloco, e, assim, ter um
comportamento de escopo semelhante ao das linguagens C e Java. Veja o mesmo
exemplo anterior, porém agora utilizando `let` na declaração das variáveis:

```js
let x = 'foobar';

console.log(x); // → foobar

function exemplo() {
  let x = 'foo';
  console.log(x); // → foo
  for (let i = 0; i < 1; i++) {
    let x = 'bar';
    console.log(x); // → bar
  }
  console.log(x); // → foo
}

exemplo();

console.log(x); // → foobar
```

A diferença de resultados se dá principalmente dentro da função, onde agora é o
bloco que delimita o escopo léxico e não mais a função.

## Declarações de variáveis `const`

A declaração de variáveis utilizando `const`, que também foi padronizada na
ECMAScript 2015, declara uma variável com escopo de bloco, porém, com uma
referência fixa. Ou seja, uma variável `const` não pode ser atribuída novamente
após a declaração. Veja o exemplo abaixo:

```js
const x = 42;
const y = { name: 'foo' };

x = 42; // → Erro!
y = { name: 'bar' }; // → Erro!
```

É importante ter em mente que, apesar de nome poder dar a ideia de que essa
declaração cria um valor constante, o que é constante é a referência da
variável. Por isso, caso o valor seja um objeto, você pode mutá-lo sem qualquer
erro. Veja:

```js
const y = { name: 'foo' };

y.name = 'bar';

console.log(y); // → {name: 'bar'}

y = { name: 'foobar' }; // Erro!
```

Caso você deseje construir um objeto imutável, é necessário utilizar o
[`Object.freeze`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze).

<figure>
  <img
    src="/images/2015-12-15-javascript-intermediario-1/turtle.svg"
    alt="Uma tartaruga."
    decoding="async"
    loading="lazy"
  />
</figure>

## Conclusão

Como um bom programador, uma das coisas mais importantes que você pode aprender
é sempre manter a simplicidade. Quando estamos falando sobre código, podemos
simplificá-lo quando utilizamos apenas variável para um único conceito.

Algumas vezes podemos ser tentados "reutilizar" uma variável para representar
dois conceitos diferentes. Essa prática deve ser evitada, pois leva a um código
não efetivo e de difícil leitura. Por isso, sempre recomendo a utilização de
`const` e `let` quanto estiver em um código que permita seu uso, ou seja, que
utilize o ES6. Caso você tenha uma variável que não precise que seu valor seja
reatribuído, faça de `const` a sua escolha padrão. Seu código fica mais limpo e
declarativo. Caso a reatribuíção seja necessária, como é o caso de contadores,
acumuladores e outros mecanismos de _loops_, utilize `let`. Também vai indicar
que a variável somente é utilizada no bloco onde ela foi declarada, e não na
função inteira.

Siga o princípio de que uma variável deve representar um único conceito e torne
seu código mais legível e declarativo.

<blockquote> <p> Linguagens não servem somente para expressar pensamentos, mas
para possibilitar pensamentos os quais não existiriam se não fossem elas. </p>
<footer>Bertrand Russel</footer> </blockquote>
