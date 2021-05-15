---
title: 'JavaScript Básico #6'
subtitle: 'Funções'
heading: 'Entenda como funcionam as pouco compreendidas funções em JavaScript'
created: 2015-10-23 09:21:30
tags:
  - javascript
  - post
---

Já vimos o funcionamento de
[objetos](https://maxroecker.github.io/blog/javascript-basico-5/) e de
[estruturas de controle](https://maxroecker.github.io/blog/javascript-basico-4/)
em JavaScript, ambos conceitos essenciais para a aprendizagem da linguagem e
para a escrita de algoritmos. Agora, vamos aprofundar nosso entendimento sobre a
unidade de computação da linguagem JavaScript: as funções.

Uma função é um trecho de código que pode ser chamado por um fluxo de execução —
incluindo por si mesma — ou por uma variável que a referencia. Quando uma função
é chamada, argumentos são passados para a função como entrada, e a função pode
retornar opcionalmente um valor qualquer.

<aside> <p> <strong>fun.ção:</strong> (1) O que alguma coisa faz ou é usada
para; (2) Em matemática, uma relação o qual um elemento de um conjunto é
associado a exatamente um outro elemento de outro conjunto. (3) Em computação,
uma rotina que pode retornar um resultado. </p> </aside>

Funções são extremamente úteis e podem ser utilizadas para reutilização de
código, encapsulamento e composição de dados em diversas linguagens de
programação. No entanto, o modo como funções são tratadas em JavaScript pode ser
estranha para a maioria dos desenvolvedores. Por isso, é importante ter um bom
entendimento de como funções trabalham em JavaScript, para que você possa
extrair o máximo da linguagem.

## Declarando e executando uma função

Uma função pode ser declarada com o auxílio da palavra-chave `function` seguido
de:

1. o nome da função;
2. a lista de parâmetros da função entre parênteses e separado por vírgulas e;
3. As declarações que definem essa função entre um par de chaves `{…}`.

Por exemplo, o código abaixo define uma função chamada `quadrado`.

```js
function quadrado(numero) {
  return numero * numero;
}
```

A função `quadrado` tem um único parâmetro — chamado `numero` — e é definida por
uma única declaração, que consiste em retornar o valor do parâmetro multiplicado
por ele mesmo. Entretanto, definir uma função não significa executar o código
declarado. Definir uma função significa dar um nome a um trecho de código que
será chamado quando for requisitado.

**Chamar uma função** significa realmente executar o trecho de código. Para
chamar uma função em JavaScript, você utiliza o nome da função seguido dos
argumentos de entrada entre um par de parênteses. No exemplo anterior, podemos
chamar a função `quadrado` como segue:

```js
quadrado(3);
```

Nesta chamada, o parâmetro `numero` da função `quadrado` assume o valor `3`. A
função é executada e o resultado, `9`, é retornado da função. Para visualizar
esse resultado, vamos atribuí-lo em uma variável e mostrar no console.

```js
var resultado = quadrado(3);
console.log(resultado); // → 9
```

Valores primitivos, como é o caso de valores do tipo número, são passados para
funções "por valor". Ou seja, uma cópia co valor é passada para a função quando
ela é chamada. O valor original do argumento não é alterado. Veja o exemplo
abaixo:

```js
function somaUm(numero) {
  ++numero;
  console.log('numero dentro da função ', numero);
}

var numero = 0;
console.log('numero antes da função ', numero);
somaUm(numero);
console.log('numero depois da função ', numero);
```

A saída desse código será:

<pre><samp>numero antes da função 0
numero dentro da função 1
numero depois da função 0
</samp></pre>

No entanto, objetos são passados como "por referência". Ou seja, o mesmo objeto
é passado para dentro da função e não uma cópia dele. Dessa forma, mutar o
objeto dentro da função tem efeitos colaterais em valores fora da função. Veja:

```js
function ativar(cupom) {
  cupom.ativo = true;
}

var cupom = { codigo: '000X', ativo: false };
console.log('cupom %s - ativo: %s', cupom.codigo, cupom.ativo);
ativar(cupom);
console.log('cupom %s - ativo: %s', cupom.codigo, cupom.ativo);
```

A saída desse código será:

<pre><samp>cupom 000X - ativo: false
cupom 000X - ativo: true</samp></pre>

Devido as características do JavaScript — mais especificamente o <i
lang="en">hoisting</i> — uma função não pode ser declarada condicionalmente.
Quando temos duas funções com o mesmo nome, há conflito de referência e isso
causa um erro. Ou seja, **não é possível escrever um código como o abaixo**:

```js
if (nota < 7) {
  function resultado() {
    return 'Reprovado';
  }
} else {
  function resultado() {
    return 'Aprovado';
  }
}

console.log('O resultado é: ' + resultado());
```

### Aridade de funções e passagem de argumentos

Diferente de muitas linguagens, o JavaScript não restringe a quantidade de
argumentos que a chamada da função pode receber dada a aridade da função.
Supondo o mesmo exemplo da função `quadrado` acima, as chamadas abaixo são
completamente válidas em JavaScript:

```js
function quadrado(numero) {
  return numero * numero;
}

console.log(quadrado(2)); // → 4
console.log(quadrado(5, 1, 8)); // → 25
console.log(quadrado()); // → NaN
```

A função `quadrado` oficialmente aceita um argumento. Quando executamos a função
passando mais argumentos que a aridade da função, a função os ignora; Se
passamos menos argumentos que aridade da função, o JavaScript atribui
`undefined` para os argumentos faltantes.

<aside> <p> A <a
href="https://pt.wikipedia.org/wiki/Aridade"><strong>aridade</strong></a> de uma
função é o número de parâmetros que a função recebe. Uma função de um parâmetro
é denominada unária; de dois parâmetros, binária; com três parâmetros, ternária;
e assim por diante. Caso uma função não receba parâmetros, a função é denominada
nulária. </p> </aside>

## Funções como valores de primeira-classe

Funções, em JavaScript, são
[valores de primeira classe](ttp://c2.com/cgi/wiki/?FirstClass) e, por isso, são
tratadas como qualquer outro valor na linguagem. Assim, funções podem ser
passadas como parâmetros ou retornadas como resultado de uma função. Funções
podem também serem atribuídas em variáveis.

Além disso, toda função em JavaScript é também um objeto e tem propriedades e
métodos associados. Apesar do `typeof` de uma função ser `"function"`, uma
função é sempre instância de um objeto. Veja abaixo:

```js
function quadrado(numero) {
  return numero * numero;
}

function informacoes(funcao) {
  console.log(typeof funcao);
  console.log(funcao instanceof Object);
  console.log(funcao instanceof Function);
  console.log(funcao.name);
}

var funcao = quadrado;

informacoes(funcao);
```

O código acima terá a saída

<pre><samp>function
true
true
quadrado</samp></pre>

## Expressões funcionais

Em JavaScript, a declaração de uma função pode ser retornada como um valor, ou
seja, como uma expressão funcional. Podemos atribuir a função `quadrado` para
uma variável `potencia2` da seguinte forma:

```js
var potencia2 = function quadrado(numero) {
  return numero * numero;
};

console.log(quadrado(2)); // → 4

console.log(potencia2(2)); // → 4
```

O JavaScript também permite que expressões funcionais sejam anônimas, ou seja,
não requerem um nome para serem definidas. Mais uma vez, podemos reescrever
nossa função `quadrado` como uma expressão funcional:

```js
var quadrado = function (numero) {
  return numero * numero;
};

console.log(quadrado(6)); // → 36
```

Apesar de ter um resultado muito semelhante, utilizar uma expressão funcional
anônima tem um significado diferente de uma declaração de função. Um resultado
interessante é que expressões funcionais podem ser "atribuídas condicionamente",
diferente das funções declaradas. Ou seja, agora, o código abaixo é válido em
JavaScript:

```js
var resultado;

if (nota < 7) {
  resultado = function () {
    return 'Reprovado';
  };
} else {
  resultado = function () {
    return 'Aprovado';
  };
}

console.log('O resultado é: ' + resultado());
```

Funções anônimas são frequentemente utilizadas em JavaScript e permitem escrever
um código coeso e expressivo. Em algumas referências, funções anônimas são
chamadas apenas de _lambdas_.

## Funções de alta ordem

Por serem valores de primeira classe, as funções em JavaScript são
[funções de alta ordem](http://c2.com/cgi/wiki?HigherOrderFunction). Ou seja,
podemos então passar funções como argumentos em outra função ou retornar funções
como resultado de uma função. Veja o exemplo:

```js
function multipliquePor(n) {
  return function (x) {
    return x * n;
  };
}

var dobro = multipliquePor(2);

var triplo = multipliquePor(3);

console.log(dobro(6)); // → 12
console.log(dobro(9)); // → 18
console.log(triplo(3)); // → 9
console.log(triplo(4)); // → 12
```

Note que a função `multipliquePor` pega um parâmetro `n` e retorna uma nova
função que pega um parâmetro `x` e que então, quando for chamada, multiplica `x`
por `n`. Dessa forma, podemos criar duas funções, uma que multiplica por dois,
que chamamos de `dobro`; e uma que multiplica por três, que chamamos de
`triplo`. Ao final, temos as chamadas da funções `dobro` e `triplo` para alguns
diferentes argumentos.

Funções de alta ordem são extremamente úteis e muito utilizadas em JavaScript,
principalmente quando desejamos codificar em um estilo mais próximo do paradigma
funcional. Entender funções de alta ordem permite entender um dos conceitos mais
fundamentais do JavaScript: <i lang="en">closures</i>.

## Conclusão e agradecimentos

Nesse episódio aprendemos sobre funções, como declará-las e suas principais
características. A palavra-chave `function` pode ser utilizada tanto em uma
declaração de função quanto em uma expressão funcional. É fundamental
compreender que funções, em JavaScript, são valores de primeira classe.

Chegamos ao fim da série JavaScript Básico, mas não no fim do conteúdo da
linguagem e de suas funcionalidades. Com o conteúdo visto até aqui, você já pode
criar de programas simples e codificar algoritmos em JavaScript. Gostaria de
agradecer ao meu amigo Guilherme e minha amiga Mariana pela revisão dos textos e
que permitiram uma melhor leitura desse blog.

Pretendo lançar outros textos falando sobre aspectos mais profundos mas
incrivelmente úteis do JavaScript, em termos mais técnicos tais como o processo
de <i lang="en">hoisting</i>, <i lang="en">closures</i>, operações binárias,
entre outros. Também quero escrever mais sobre a programação em paradigma
orientado a objetos e funcional.
