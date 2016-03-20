---
title: 'JavaScript Intermediário #1: Escopos léxicos'
description: 'Compreenda os vários modos de declaração de variáveis e as principais características e o comportamento escopo  do JavaScript.'
cover:
  path: cover.jpg
  title: 'Polyhedron models'
  src: 'https://www.flickr.com/photos/fdecomite/3274431349/in/album-72157613498998540/'
featured: false
date: 2015-12-15 17:37:54
tags:
  - javascript
---
> <b>lé.xi.co</b>: 1. Conjunto das palavras de que dispõe um idioma; 2. Dicionário abreviado.

Estamos agora iniciando uma nova fase de aprendizado em JavaScript, entendendo em profundidade as características que tornam essa linguagem única. Nesse texto vamos focar em um dos aspectos que mais geram confusão entre os desenvolvedores: o escopo léxico de variáveis.

Primeiramente, o que é escopo léxico de uma variável em uma linguagem de programação? Bem,  uma variável definida em nosso código é recebe um identificador único — um nome — utilizado quando queremos acessar o valor que essa variável aponta. O local que uma variável ***x*** é identificada por um nome é nomeado como o **escopo léxico da variável da variável *x***. Fora desse bloco, a variável é indefinida ou um outro valor é identificado por esse nome.

Na maioria das linguagens descendentes do C, as variáveis possuem uma declaração única de variável e atribuem a ela o **escopo léxico de bloco**, ou seja, o bloco — um conjunto de declarações entre um `{ ... }` — é quem define o local onde uma variável é identificada por um nome. Já o JavaScript, desde a ECMAScript 2015, possui três formas de declarar variáveis: por meio do `let`, `const` ou por meio do `var`, e cada uma delas possui uma forma diferente de tratar o escopo léxico da variável declarada.

---
## Declaração de variáveis "var"
Para a declarações de variáveis com `var` é atribuído o **escopo léxico de função**, ou seja, é a função quem define o local que uma variável é identificada por um nome. E isso é o que causa mais confusão em desenvolvedores iniciantes na linguagem, veja o exemplo abaixo:

{% simplecode js %}
``` js
var x = 'foobar';

function foo(){
  var x = 'foo';
  
  for( var i = 0; i < 1; i++ ){
    var x = 'bar';
    console.log( x ); // → bar
  }
  
  console.log( x );   // → bar
}

console.log( x );     // → foobar
foo();
```
{% endsimplecode %}

Nota-se que, mesmo apesar da variável `x` ser declarada novamente dentro do laço, ela é tradada como a mesma variável declarada fora do laço. O contrário acontece com a variável `x` fora da função, nesse caso, o valor é isolado do valor interno à função. Esse comportamento é dado pelo escopo léxico de função — dada por `foo` — e não pelo bloco do laço `for( ... )`.

---
## Declarações de variáveis "let"

No ECMAScript 2015, a declaração de variável `let` foi adicionada ao padrão da linguagem, permitindo a declaração de variáveis sejam atribuídas para um escopo léxico de bloco. Funcionamento semelhante a linguagem C ou Java. Veja o mesmo exemplo anterior com declarações `let`:

{% simplecode js %}
``` js
let x = 'foobar';

function foo(){
  let x = 'foo';
  for( let i = 0; i < 1; i++ ){
    let x = 'bar';
    console.log( x ); // → bar
  }
  console.log( x );   // → foo
}

console.log( x );     // → foobar
foo();
```
{% endsimplecode %}

A diferença de resultados se dá principalmente dentro da função, que agora delimitam o escopo léxico pelo bloco e não mais pela função. Apesar de ser uma funcionalidade relativamente nova da linguagem, o `let` talvez não seja implementado em todos os navegadores ou motores JavaScript, por isso, é necessário atenção ao utilizar.

---
## Declarações de constantes "const"

A declaração de variáveis `const`, que também foi padronizada na ECMAScript 2015, cria uma variável cujo seu valor próprio é fixo, ou seja, a referência é fixa. Isso não significa que o valor seja imutável, apenas não permite que a variável seja reatribuído outro valor. Constantes possuem escopo léxico de bloco, da mesma forma que o `let`. É obrigatório que um valor seja atribuído à constante em sua declaração. Veja o exemplo abaixo:

{% simplecode js %}
``` js
const x = { 'name': 'foo' };
x.id = 164;
console.log( x ); // → { name: 'foo'; id: 164 }

x = {'name': 'bar'}; // → Causa erro de sintaxe
```
{% endsimplecode %}

Ou seja, quando tentamos mudar a referência da constante para um novo objeto, temos um erro de sintaxe (*“Assignment to constant variable”*).

Claro que se você referência um valor primitivo tal como `String` ou `Number`, nada nunca vai mudar o valor. Tais tipos são imutáveis, qualquer método que altere sua estrutura retorna objetos novos.

{% blockquote Bertrand Russel %}
Linguagens não servem somente para expressar pensamentos, mas para possibilitar pensamentos os quais não existiriam se não fossem elas.
{% endblockquote %}

---
## Conclusão
Como um bom programador, uma das coisas mais importantes que você pode aprender é **sempre manter a simplicidade**. Dentro do contexto de variáveis, isso significa que uma variável só deve ser usada para representar um único conceito.

Algumas vezes somos tentados a criar uma variável para representar um dado e outra variável como um lugar temporário para armazenar esse valor em uma transição de representação. Essa prática deve ser evitada, pois leva a um código não efetivo e de difícil leitura. Por isso, favoreça a utilização de `const` e `let` quanto estiver em um código que permita seu uso, ou seja, que utilize o ES6.

Caso você tenha uma variável que não precise que seu valor seja reatribuído, faça de `const` a sua escolha padrão. Seu código fica mais limpo e declarativo. Caso a reatribuíção seja necessária, como é o caso de contadores, acumuladores e outros mecanismos de *loops*, utilize `let`. Também vai indicar que a variável somente é utilizada no bloco onde ela foi declarada, e não na função inteira.

> Siga o princípio de que uma variável deve representar um único conceito. Torne seu código mais legível e declarativo.
