---
title: 'JavaScript Intermediário #5: O Padrão IIFE'
description: 'Compreenda o que são funções auto-executantes e quais as vantagens de utilizá-las em seus projetos'
cover:
  path: cover.jpg
  title: 'Polyhedron models'
  src: 'https://www.flickr.com/photos/fdecomite/3274431349/in/album-72157613498998540/'
featured: false
date: 2016-04-04 14:22:21
tags:
  - javascript
---

Hoje iremos abordar um padrão de projeto muito utilizado no JavaScript, o Padrão IIFE. O Padrão IIFE é uma solução comum quando estamos desenvolvendo aplicações ou módulos na linguagem, pois garante que os módulos não causem ou sejam afetados por interperes externos.

---
## Introdução ##

### *Closures* ###

[Como visto anteriormente](http://maxroecker.github.io/blog/javascript-intermediario-4/), em JavaScript, toda vez que uma função é invocada — ou seja, aplicada, executada, etc. — é criado um novo escopo e adicionado na pilha do contexto de execução. Também já vimos que todo escopo de execução pode criar um *closure* se alguma variável do escopo atual é utilizada em alguma função mais interna. Toda variável que está alocada em um *closure* só é acessível pelas funções que foram criadas no contexto onde o *closure* também foi estabelecido. Por isso, dizemos que as variáveis que estão em um *closure* estão em um **escopo privado**.

No exemplo abaixo podemos ver esse comportamento. A variável {%c "i"%} se encontra no escopo privado e pode ser acessada pela função {%c "counter"%} que é retornada pela função {%c "getCounter"%}. A variável {%c "i"%} continua existindo mesmo que contexto de execução da função {%c "getCounter"%} já tenha sido encerrado por que está alocada em um closure. Veja:

{% simplecode js %}
``` js
function getCounter () {
  var i = 0
  return function counter () {
    return i++
  }
}

var counter = getCounter()
console.log(counter())  // → 0
console.log(counter())  // → 1
console.log(counter())  // → 2
```
{% endsimplecode %}


### Expressões funcionais ###

Quando você define uma função através de um {%c "function foo () {…}"%} ou através de um {%c "var foo = function () {…}"%}, o que você tem como retorno é uma **Expressão Funcional**, ou seja, você possui como valor uma referência para uma função.

Quando uma expressão funcional é sucedida por um {%c "()"%}, então temos que a função é invocada. Vimos esse comportamento no exemplo anterior, onde o retorno de {%c "getCounter"%} é uma referência de função e ela é invocada logo em seguida com a utilização da variável {%c "counter"%}.

---
## O Padrão IIFE ##

Com os conceitos relembrados na introdução, podemos criar uma **Expressão Funcional Imediatamente Invocada** ^[O Padrão IIFE também pode ser encontrado pelo nome de “Função Anônima Auto-executante”. O termo “Expressão Funcional Imediatamente Invocada”, introduzido por [Ben Alman](http://benalman.com/news/2010/11/immediately-invoked-function-expression/#iife), é considerado semanticamente mais adequado, pois as funções não precisam necessariamente ser anônimas.] (IIFE, do inglês “*Immediately-Invoked Function Expression*”). Uma IIFE é a definição de uma função — sua consequente expressão funcional — seguida com a imediata execução. Você pode utilizar o padrão IIFE utilizando um {%c "(function () {…})()"%}^[No Cálculo λ, o Padrão IIFE é análogo uma “Expressão Redutível”, mais conhecido pelo termo “redex” (uma abreviação da expressão em inglês “*reductible expression*”), que se refere aos subtermos que pode ser reduzidos por uma das regras de redução.]. Veja que no primeiro parenteses estamos definindo uma função — que retorna uma referência de função — e logo em seguida estamos invocando-a com um {%c "()"%}.

Vamos visualizar melhor uma IIFE aplicando-a no exemplo anterior:

{% simplecode js %}
``` js
var counter = (function () {
  var i = 0
  return function () {
    return i++
  }
})()

console.log(counter())  // → 0
console.log(counter())  // → 1
console.log(counter())  // → 2
```
{% endsimplecode %}

Uma IIFE também podem receber entradas como qualquer outra função. Utilizando do exemplo anterior, agora vamos fazer o contador ter como entrada opcional um valor numérico que indica o valor que deve-se iniciar a contagem. Dessa forma, o código seria parecido com o que se segue:

{% simplecode js %}
``` js
var counterFromFive = (function (start) {
  var i = start || 0
  return function () {
    return i++
  }
})(5)

console.log(counterFromFive())  // → 5
console.log(counterFromFive())  // → 6
console.log(counterFromFive())  // → 7
```
{% endsimplecode %}

---
## Conclusões ##

O Padrão IIEF é muito utilizado para evitar conflitos entre nomes de variáveis e a confusão de escopos de bloco/corpo de função juntamente com o [processo de hoisting](http://maxroecker.github.io/blog/javascript-intermediario-3/) que acontece no JavaScript. O padrão também é utilizado para proteger o escopo global de uma poluição de nomes de variáveis.

Outra comum utilização do Padrão IIFE é o encapsulamento e proteção de dados de acesso externo, uma vez que as variáveis que são utilizadas por funções retornadas ficam alocadas em um closure e somente essas funções possuem acesso a elas.

O post de hoje ficou mais curto, mas lembre-se, o Padrão IIFE é importante e possui muitas vantagens quando estamos programando aplicações que possuem vários módulos.

Ficamos por aqui hoje, pessoal. Até a próxima!
