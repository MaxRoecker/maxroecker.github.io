---
title: 'JavaScript Intermediário #6: Protótipos'
description: 'Entenda o que são protótipos de objetos e porque esse conceito é fundamental dentro da linguagem JavaScript'
cover:
  path: cover.jpg
  title: 'Polyhedron models'
  src: 'https://www.flickr.com/photos/fdecomite/3274431349/in/album-72157613498998540/'
featured: false
date: 2016-04-04 14:22:21
tags:
  - javascript
---

> **pro.tó.ti.po**: (1) primeiro tipo criado; original. (2) algo feito pela primeira vez e, muitas vezes, copiado ou imitado; modelo, padrão, cânone.

No último texto da série JavaScript Intermediário, iremos abordar um dos conceitos que mais causam confusão em desenvolvedores que estão iniciando na linguagem, os Protótipos de Objetos. No entanto, vamos ao fim verificar que é um conceito bem simples e poderoso, utilizado em várias soluções dentro da linguagem.

---
## Introdução
[Em textos anteriores](http://maxroecker.github.io/blog/javascript-basico-5/), estudamos que objetos são estruturas de dados compostas por tuplas de "chave-valor" que muito se assemelham a [tabelas *hash*](https://pt.wikipedia.org/wiki/Vetor_associativo). Objetos possuem propriedades que podem ser acessadas por meio do operador `.key` ou `[ key ]` (onde `key` é o nome da propriedade). Caso tentarmos ler uma propriedade que não exista, teremos `undefined` como resultado. Mas se atribuímos um valor para uma propriedade inexistente no objeto, essa propriedade é criada e agora carrega o valor.

Vamos ver exemplo simples de objeto abaixo:

{% simplecode js %}
``` js
const user = {
  email: 'pedro@exemplo.com'
  name: 'Pedro',
  getUsername: function() {
    return this.email.split( '@' )[ 0 ];
  }
}

console.log( user.email );          // → pedro@exemplo.com
console.log( user.getUsername() );  // → pedro
console.log( user.toString() )      // → [object Object]
```
{% endsimplecode %}

Espere um pouco... onde a propriedade `toString` foi declarada? Nosso objeto `user` não possui essa propriedade. Além disso, ela é uma função e foi executada. Porque isso aconteceu? Bem, acabamos de visualizar os protótipos em ação, que definiremos a seguir.

---
## Definição

**Protótipos** são objetos que servem como "reserva" para outros objetos e são a principal forma para alcançarmos a reutilização de código dentro da linguagem. Para definir um protótipo, suponha dois objetos, *A* e *B*. Dizemos que *A* é protótipo *B* quando *A* fornece um suporte “reserva” para *B*, ou seja, ao procurar-se uma propriedade em *B* e ela não for encontrada, essa propriedade é buscada então em *A*.

No exemplo anterior, o objeto `user` foi criado com os literais `{ }`. Todo objeto criado com o literal `{ }` possui como protótipo o `Object.prototype`, que possui vários métodos, entre eles o `toString`. Dessa forma, quando invocamos o método `toString` em nosso objeto recém-criado, primeiramente a máquina virtual JavaScript irá procurar alguma propriedade com o nome `toString` no próprio objeto `user`.  Como não há, a máquina virtual então vai até o protótipo do `user` — `Object.prototype` — e faz a busca pelo método. Como o método é encontrado, ele é executado.

O JavaScript não é o único a utilizar protótipos em objetos, outras linguagens que implementam esse estilo de programação incluem as linguagens [Self](http://www.selflanguage.org/), [Logtalk](http://logtalk.org/) e [Lua](http://www.lua.org/).

---
## Descobrindo o protótipo de um objeto

Você pode descobrir o protótipo de um objeto utilizando a função `Object.getPrototypeOf` aplicada em um objeto. Por exemplo, veja a seguir o protótipo de um objeto literal vazio — ou seja, um objeto sem qualquer propriedade declarada em si mesmo:

{% figure 'Você pode descobrir o protótipo de um objeto aplicando a função Object.getPrototypeOf no objeto.' %}
{% asset_img object-prototype.png 'Resultado ao executar a função Object.getPrototypeOf em um objeto vazio.' %}
{% endfigure %}

Quando tentamos acessar uma propriedade em um objeto e ela não é encontrada, a máquina virtual irá procurar no protótipo desse objeto. Caso também não fosse encontrada, a busca passa a ser no protótipo do protótipo, e se assim por diante até que último algum objeto não tenha mais um protótipo. Essa referência de protótipos é chamada de **Cadeia de Protótipos**.

{% figure "As referências de objetos para objetos por meio de protótipos formam uma Cadeia de Protótipos" %}
{% asset_img prototype-chain.svg 'Representação ilustrativa da cadeia protótipos, onde cada objeto aponta para outro objeto por meio de uma referência' %}
{% endfigure %}

Já vimos que o protótipo de um objeto literal é o `Object.prototype`, mas qual é o protótipo do `Object.prototype`? O `Object.prototype` é considerado o "último protótipo" em uma cadeia de protótipos e por isso seu protótipo é `null`.

---
## Criando objetos com diferentes protótipos
Você pode alterar o protótipo de um objeto no momento da sua criação utilizando a função `Object.create`, que recebe no primeiro parâmetro um objeto que será o protótipo do objeto criado. Veja no exemplo a seguir onde definimos um protótipo para um objeto que representa um ponto com coordenadas x e y:

{% simplecode js %}
``` js
var pointPrototype = {
  getDistanceFromOrigin: function() {
    var distance = Math.sqrt( this.x * this.x + this.y * this.y );
    return distance;
  }
};

var point = Object.create( pointPrototype );
point.x = 3;
point.y = 4;

console.log( point.getDistanceFromOrigin() ); // → 5
```
{% endsimplecode %}

---
## Alterando o protótipo de um objeto já criado

Alterar o protótipo de um objeto após ele ser criado é possível com a utilização da propriedade `__proto__`. Vamos ilustrar a utilização dessa porpriedade com o exemplo anterior do ponto com coordenadas x e y:

{% simplecode js %}
``` js
var pointPrototype = {
  getDistanceFromOrigin: function() {
    var distance = Math.sqrt( this.x * this.x + this.y * this.y );
    return distance;
  }
}

var point = {
  x: 3,
  y: 4
};

point.__proto__ = pointPrototype;

console.log( point.getDistanceFromOrigin() ); // → 5
```
{% endsimplecode %}

No entanto, alterar o protótipo de um objeto é uma operação **muito lenta** em qualquer motor de execução JavaScript e por isso é uma **prática desencorajada**. Além do mais, a propriedade `__proto__` só foi considerada como padrão dentro da linguagem com a especificação ECMAScript 2016, possuindo problemas de compatibilidade com versões antigas.

> Lembre-se: Para saber o protótipo de um objeto é recomenda-se a função  `Object.getPrototypeOf`. Para  para criar objetos com diferentes protótipos é recomendada a função `Object.create`. Mudar o protótipo de um objeto já criado é sempre considerado uma má prática.


---
## Conclusões

Os protótipos são responsáveis por grande parte do poder que a linguagem JavaScript oferece e se torna ainda mais expressiva quando aliada as estruturas funcionais presentes na linguagem, tais como *closures*, funções de alta ordem e etc. Os protótipos são utilizados principalmente para reutilização de código e também são fundamentais em alguns padrões para programar em JavaScript orientado à objetos.

A grande vantagem dos protótipos é que eles oferecem um considerável ganho de desempenho e se apresentam como uma forma eficiente de utilização da memória quando queremos distribuir código repetido para vários objetos. Afinal, quando vários objetos compartilham um mesmo protótipo, há somente uma cópia desse protótipo na memória. Porém é necessário ter em mente que quando um protótipo é compartilhado entre todos, qualquer mudança nesse objeto afeta todos os objetos que o apontam como prototótipo.

---

Chegamos ao fim da série **JavaScript Intermediário** do blog. Espero que tenham gostado do conteúdo e aprendido tanto quanto eu também aprendi escrevendo esses textos. Haverão outros textos sobre JavaScript nesse blog futuramente, porém abordando assuntos cada vez mais profundos dentro da linguagem e da área de desenvolvimento de software. Fique ligado.

Por hoje é só pessoal, até a próxima!
