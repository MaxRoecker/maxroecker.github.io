---
title: 'JavaScript Intermediário #6'
subtitle: 'Protótipos'
heading: 'Entenda o que, na linguagem JavaScript, são protótipos de objetos.'
created: 2016-04-06 15:54:33
permalink: 'blog/javascript-intermediario-6/index.html'
tags:
  - javascript
---

No último texto da série, iremos abordar um dos conceitos que mais causam
confusão em desenvolvedores que estão iniciando na linguagem, os **protótipos**.
No entanto, espero que ao fim dessa publicação, você compreenda que o mecanismo
de protótipos é simples, mas muito poderoso.

<aside> <p> <strong>pro·tó·ti·po</strong>: (1) Primeiro tipo criado, original;
(2) Algo feito pela primeira vez e, muitas vezes, copiado ou imitado; (3)
Nodelo, padrão, cânone. </p> </aside>

## Métodos de objetos

Em JavaScript, objetos são estruturas de dados que agrupam duplas de chave-valor
denominadas de propriedades. A chave de uma propriedade é um nome que aponta
para um valor único. No entanto, um valor pode ser apontado por várias
propriedades, do mesmo ou diferentes objetos. As propriedades de um objeto podem
ser acessadas por meio dos operadores `.` ou `[…]`. Objetos são,
fundamentalmente, implementações de
[arranjos associativos](https://en.wikipedia.org/wiki/Associative_array).

<aside> <p> Se você quer compreender melhor os fundamentos de objetos em
JavaScript, recomendo também a leitura <a
href="http://maxroecker.github.io/blog/javascript-basico-5/">dessa outra
publicação do blog</a>. </p> </aside>

Mas se objetos são implementações de arranjos associativos, porque eles são
chamados de “objetos” e não de
[mapas](https://docs.oracle.com/javase/7/docs/api/java/util/Map.html),
[dicionários](https://docs.python.org/3/tutorial/datastructures.html#dictionaries)
ou
[tabelas hash](https://doc.rust-lang.org/std/collections/struct.HashMap.html),
como em outras linguagens de programação?

Objetos tem um comportamento bem diferente de outras implementações de arranjos
associativos quando estamos tratando de propriedades que apontam para funções.
Quando uma propriedade aponta para uma função, ela recebe, inclusive, um nome
especial: **método**.

Métodos são propriedades de um objeto que apontam para funções e podem
declarados como uma função qualquer por meio da palavra-chave `function`. No
entanto, métodos tem a possibilidade de utilizar um parâmetro implícito: o
`this`, uma referência para o próprio objeto o qual o método “faz parte”. O
`this` e não precisa ser declarado ou passado como parâmetro quando o utilizamos
no corpo da função. Vamos ver exemplo simples de objeto com métodos no código
abaixo:

```js
const person = {
  firstName: 'Pedro',
  lastName: 'Pipoca',
  getFullName: function () {
    return this.firstName + ' ' + this.lastName;
  },
  toString: function () {
    const fullname = this.getFullName();
    return '[Person: ' + fullname + ']';
  },
};
```

Como se pode ver, o objeto `person` possui duas propriedades, `firstName` e
`lastName`, e dois métodos, `getFullName` e `toString`. As propriedades
`firstName` e `lastName`, que indicam o nome e o sobrenome, são simples strings.
O método `getFullName` é uma função que utiliza o `this` para acessar as
propriedades `firstName` e `lastName` e retornar o nome completo da pessoa por
meio de uma concatenação de strings. Já o método `toString` é uma outra função
que retorna o objeto uma versão serializada como string.

```js
console.log(person.firstName); // → Pedro
console.log(person['lastName']); // → Pipoca

console.log(person.getFullName); // → [Function: getFullName]
console.log(person['toString']); // → [Function: toString]
```

Para acessar tanto propriedades quanto métodos, utilizamos o operador `.` ou
`[…]`. No entanto, acessar um método não significa executá-lo, significa apenas
receber uma referência para o método. Quando queremos executar um método,
precisamos, além de acessá-lo, utilizar um par de parênteses.

```js
console.log(person['getFullName']()); // → Pedro Pipoca

console.log(person.toString()); // → [Person: Pedro Pipoca]
```

Assim como qualquer propriedade, podemos verificar a existência de um método com
o operador `in`:

```js
console.log('getFullName' in person); // → true

console.log('toString' in person); // → true
```

E podemos excluir métodos com o operador `delete`:

```js
console.log('getFullName' in person); // → true
console.log('toString' in person); // → true

delete person.getFullName;
delete person.toString;

console.log('getFullName' in person); // → false
console.log('toString' in person); // → true
```

Mas o que? Nós não excluímos o método `toString`? Porque o operador `in` ainda
acusa que ele existe no objeto `person`? Bem, se ele ainda existe no objeto
então podemos executá-lo. Assim, temos:

```js
console.log(person.toString()); // → [object Object]
```

Mas que método é esse? Essa saída não condiz com a implementação que fizemos
para o `toString` acima… Chega de mistérios! O que temos aqui é um efeito dos
**protótipos** em plena ação.

<figure style="max-width: 60%">
  {% include 'illustrations/airship.svg' %}
</figure>

## Protótipos de objetos

Todo objeto em JavaScript pode ter um protótipo. Um protótipo é, informalmente,
um “objeto reserva” que contém propriedades e métodos e que podem ser acessadas
a partir do objeto inicial. Assim, ao acessar uma propriedade que não existe no
objeto primário, o JavaScript automaticamente busca a propriedade no protótipo
antes de resultar `undefined`.

Como o protótipo também é um objeto, caso a propriedade não seja encontrada no
protótipo então o JavaScript busca no protótipo do protótipo, e assim por
diante. Uma hora ou outra o protótipo de um objeto será `null` e a busca é
encerrada. A busca pela propriedade percorre toda a **cadeia de protótipos**
antes de resultar em `undefined`.

Na verdade, o método `toString` misterioso que vimos acima realmente não faz
parte do objeto `person` que declaramos, mas do protótipo dele: o
`Object.prototype`.

<aside> <p> Todo objeto declarado com o literal <code>{…}</code> possui o
<code>Object.prototype</code> como protótipo; <a
href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object#Object_instances_and_Object_prototype_object">que
possui vários métodos</a>, incluindo o <code>toString</code>. </p> </aside>

Como nós definimos um método `toString` em `person`, ao acessarmos o JavaScript
logo o encontra no primeiro objeto, nem necessitando iniciar a busca pela cadeia
de protótipos. No entando esse comportamento muda a partir do momento que
excluímos o método `toString` de `person`. Caso acessemos o `toString`
novamente, o JavaScript vai encontrá-la no `Object.prototype` por meio da cadeia
de protótipos.

<figure>  
  {% img {
    src: "./prototype-1.svg",
    alt: "Ilustração do objeto person e do protótipo Object.prototype",
    formats: ['svg']
  }%}
</figure>

A implementação do `toString` no `Object.prototype` é totalmente independente da
implementação que fizemos em `person` e isso explica a divergência na saída que
tivemos acima.

Você pode identificar o protótipo de um objeto por meio da função
[`Object.getPrototypeOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf).
Já vimos que o protótipo de um objeto criado com o literal `{…}` é o
`Object.prototype` e que protótipos são opcionais. O `Object.prototype` é um
exemplo de objeto que não tem protótipos. Podemos vamos confirmar essas
sentenças com o exemplo abaixo:

```js
const a = {};
const p = Object.getPrototypeOf(o);

console.log(p == Object.prototype); // → true

const pp = Object.getPrototypeOf(p);

console.log(pp); // → null
```

Você pode criar um objeto com qualquer protótipo por meio da função
[`Object.create`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create),
que recebe como primeiro parâmetro um objeto que será o protótipo do objeto
criado. Veja no exemplo a seguir onde definimos um protótipo para objetos que
representam um ponto com coordenadas em duas dimensões:

```js
var pointPrototype = {
  getDistanceFrom: function (other) {
    var dx = Math.abs(other.x - this.x);
    var dy = Math.abs(other.y - this.y);
    var distance = Math.sqrt(dx * dx + dy * dy);
    return distance;
  },
};

var origin = Object.create(pointPrototype);
origin.x = 0;
origin.y = 0;

var point = Object.create(pointPrototype);
point.x = 3;
point.y = 4;

console.log(point.getDistanceFrom(point)); // → 0
console.log(point.getDistanceFrom(origin)); // → 5
```

Veja que o protótipo possui a função `getDistanceFrom`, que recebe outro ponto
com parâmetro em `other` e calcula a distância entre o `this`. Por causa da
delegação de propriedades, o `this` de um método chamado pelo objeto primário
inicia a busca pelo objeto primário. Por isso que o `this.x` referência o valor
de `origin.x` ou `point.x` mas não de `pointPrototype.x`.

<aside> <p> <a
href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/abs"><code>Math.abs</code></a>
e <a
href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt"><code>Math.sqrt</code></a>
são funções padrão do JavaScript que retornam, respectivamente, o valor absoluto
e a raiz quadrada de um número. </p> </aside>

Devido a busca na cadeia de protótipos, não é preciso definir a função
`getDistanceFrom` duas vezes. Ou seja, uma função definida apenas uma vez pode
ser utilizada por qualquer objeto que tenha `pointPrototype` como protótipo.
Isso permite uma reutilização de código bastante poderosa. A figura abaixo
apresenta uma ilustração do protótipo compartilhado:

<figure>  
  {% img {
    src: "./prototype-2.svg",
    alt: "Ilustração de objetos compartilhando um mesmo protótipo.",
    formats: ['svg']
  }%}
</figure>

Você também pode criar objetos que não tenham protótipos passando `null` para o
primeiro parâmetro do `Object.create`. No entanto, algumas funcionalidades
básicas não estarão disponíveis, como é o caso da função `toString`:

```js
const a = {};
const b = Object.create(null);

a.x = 1;
b.x = 2;

console.log(a.x); // → 1
console.log(b.x); // → 2

console.log(a.toString()); // → [object Object]
console.log(b.toString()); // Erro! "toString" não é uma função
```

É possível alterar o protótipo de um objeto após ele ser criado com a função <a
href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf"><code>Object.setPrototypeOf</code></a>.
No entanto, a forma com que as máquinas virtuais JavaScript otimizam o acesso a
propriedades, alterar o protótipo após a criação do objeto é uma operação muito
lenta. Além disso, os efeitos colaterais que envolvem a mudança da cadeia de
protótipos podem ser bastante imprevisíveis e fonte de bugs com difícil
identificação. Por tudo isso, alterar o protótipo de um objeto é considerado uma
má prática na maioria das vezes.

## Conclusões

A grande vantagem dos protótipos é que eles oferecem um considerável ganho de
desempenho e se apresentam como uma forma eficiente de utilização da memória
quando queremos distribuir código repetido para vários objetos. Afinal, quando
vários objetos compartilham um mesmo protótipo, há somente uma instância desse
protótipo na memória. No entanto, assim como qualquer recurso compartilhado, é
necessário ter uma atenção extra as mutações feita a um protótipo. Qualquer
mudança no prototótipo afeta todos os objetos que o referenciam.

Os protótipos são utilizados principalmente para reutilização e compartilhamento
de código entre diversos objetos. Eles também são fundamentais para alguns
padrões que seguem o paradigma de programação orientado a objetos.

Os protótipos são responsáveis por boa parte do poder de expressividade que
linguagem JavaScript oferece. Sua utilização se torna ainda mais mais
significativa quando aliada a outras funcionalidades presentes na linguagem,
como funções de alta ordem, as <i lang="en">closures</i> e a programação
orientada a eventos.
