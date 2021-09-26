---
title: 'JavaScript Intermediário #4'
subtitle: 'Hoisting'
heading: 'Nessa curta publicação, conheça o mecanismo de hoisting, uma característica peculiar da linguagem JavaScript.'
created: 2016-01-16 18:34:26
tags:
  - javascript
  - post
---

Hoje veremos uma característica bastante peculiar do JavaScript e que
normalmente é causa de pequenos erros quanto estamos trabalhando com a
linguagem: o hasteamento de variáveis, comumente chamado de <i
lang="en">hoisting</i>.

<aside> <p> <strong>has·te·ar</strong>: (1) Elevar ou prender ao topo de uma
haste. (2) Altear, içar, levantar. </p> </aside>

## Hasteamento de variáveis

No momento de execução de um código JavaScript, toda declaração de variável
passam por um processo de hasteamento, isto é, a declaração da variável é
elevada para o topo do escopo atribuído de forma automática. Esse processo é
comumente chamado de <i lang="en">hoisting</i>. O conceito pode ser um pouco
confuso a princípio, então, vamos para um exemplo prático. Em JavaScript, é
possível declarar uma função e chamá-la logo em seguida, como no exemplo abaixo:

```js
function hello(name) {
  console.log('Hello, ' + name + '!');
}

hello('Max'); // → Hello, Max!
```

Entretanto, você também pode chamar uma função que ainda não foi declarada. Ou
seja, o código acima pode ser reescrito como o abaixo e ainda assim continua
funcionando:

```js
hello('Max'); // → Hello, Max!

function hello(name) {
  console.log('Hello, ' + name + '!');
}
```

Isso acontece porque a declaração da função `hello` é hasteada ao topo do
código. O compilador faz esse processo de forma automática e, por isso, o código
continua funcionando normalmente. O mesmo acontece para variáveis declaradas com
`var`. Veja:

```js
console.log(x); // → undefined
var x = 6;
console.log(x); // → 6
```

Um erro não aconteceu, no entanto, porque a primeira saída foi `undefined` se a
variável é declarada com o valor `6`? Bem, isso acontece porque o mecanismo de
<i lang="en">hoisting</i> do JavaScript somente eleva declarações das variáveis,
mas não a atribuíções que as inicializam. Ou seja, o código acima tem um
comportamento equivalente ao código abaixo:

```js
var x;
console.log(x); // → undefined
x = 6;
console.log(x); // → 6
```

Declarações de variáveis locais passam pelo mesmo processo, ou seja, a saída do
código abaixo:

```js
var x;

console.log(x);
x = 1;
foo();
console.log(x);

function foo() {
  console.log(x);
  var x = 2;
  console.log(x);
}
```

Será igual a:

<pre><samp>undefined
undefined
2
1</samp></pre>

No entanto, o <i lang="en">hoisting</i> somente é aplicado em declarações que
utilizam `var`. O mecanismo de hasteamento de variáveis declaradas com `let` e
`const` não permite a referência de uma variável ainda não declarada e irá
lançar um erro do tipo
[`ReferenceError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError).

## Conclusão

Podemos resumir essa publicação como: o hasteamento de variáveis com `var` eleva
para o topo do código somente a declaração, mas não a definição; enquanto o
hasteamento de funções eleva para o topo do código tanto a declaração quando a
definição.

<figure>
  <img
    src="/images/illustrations/hoisting.svg"
    alt="Mecanismo para elevar água."
    decoding="async"
    loading="lazy"
  />
</figure>

Ainda assim, pelos exemplos anteriores, o comportamento de hastear as
declarações de variáveis e funções podem levar a resultados confusos e
proporcionar um código de difícil leitura. É importante que você siga algumas
boas práticas no momento de escrita do código. Elevar as declarações de suas
variáveis para o topo do seu respectivo escopo evita confusão com o mecanismo de
<i lang="en">hoisting</i>, pois seu código deixa-o explícito.

Outra prática importante é a inicialização de um valor na variável sempre que
possível. Dessa forma, evita-se valores indefinidos durante a execução e
surpresas indesejadas.
