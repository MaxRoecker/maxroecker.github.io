---
title: 'JavaScript Orientado a Objetos #4'
subtitle: 'Classes'
heading: 'Veja as principais adições do ES2015 relacionadas ao JavaScript OO.'
created: 2016-04-30 17:23:39
permalink: 'blog/javascript-orientado-a-objetos-4/index.html'
tags:
  - javascript
  - object oriented programming
---

Hoje iremos voltar a ver sobre Construtores no contexto do JavaScript
Orientado a Objetos, e as principais funcionalidades que a versão 2015 adicionou
à linguagem.

Para que você aproveite melhor o texto é recomendado que você tenha conhecimento
dos conceitos básicos de orientação a objetos. Você pode ler uma pequena
introdução
[no texto anterior dessa série](http://maxroecker.github.io/blog/javascript-orientado-a-objetos-1/)
e também ver o como criar objetos com
[construtores](http://maxroecker.github.io/blog/javascript-orientado-a-objetos-2/)
e a alternativa à ele, as
[fábricas](http://maxroecker.github.io/blog/javascript-orientado-a-objetos-3/).

## Introdução

Já vimos que construtores são feitos por meio de funções que recebem um contexto
especial em `this` e que são chamadas junto ao operador `new`. Vimos também que
construtores adicionam métodos ao protótipo dos objetos criados e, por isso, são
capazes de compartilhar o mesmo método para qualquer instância. Relembrando o
exemplo das publicações anteriores, temos, abaixo, o construtor `Person`:

```js
function Person(name, surname) {
  this.name = name;
  this.surname = surname;
}

Person.prototype.getFullName = function () {
  return this.name + ' ' + this.surname;
};
```

Podemos utilizá-lo com o operador `new`, veja:

```js
const a = new Person('Pedremildo', 'Escavadeira');

console.log(a.getFullName()); // → 'Pedremildo Escavadeira'
```

## Classes do ES2015

No entanto, essa notação para escrever construtores é bastante diferente de
outras linguagens de programação, o que sempre causou um pouco de receio em
desenvolvedores. Com o advento do ECMA2015, o JavaScript adicionou outra forma
de escrever construtores, muito similar a outras linguagens de programação, com
a utilização de **classes**. Podemos reescrever o construtor `Person` anterior
da seguinte forma:

```js
class Person {
  constructor(name, surname) {
    this.name = name;
    this.surname = surname;
  }

  getFullName() {
    return this.name + ' ' + this.surname;
  }
}
```

Essa notação é bastante similar ao Java, C++ ou Python e utiliza a palavra-chave
`class`. No entanto, não confunda a classe do JavaScript com a classe de outras
linguagens. A palavra-chave `class` nada mais é que um
“[açúcar sintático](https://pt.wikipedia.org/wiki/A%C3%A7%C3%BAcar_sint%C3%A1tico)”
para os construtores feitos com funções. Sua utilização é, também, idêntica aos
construtores:

```js
const a = new Person('Pedremildo', 'Escavadeira');
const b = new Person('Testerson', 'Trunk');

console.log(a.name); // → Pedremildo
console.log(b.surname); // → Trunk
console.log(a.getFullName()); // → 'Pedremildo Escavadeira'
console.log(a.getFullName === b.getFullName); // → true
```

De forma resumida, o código que antes ficava no construtor agora é colocado
dentro do `constructor`, e os métodos que antes eram adicionados no `prototype`
do construtor agora são definidos no corpo da classe. Essa mudança sintática
aproxima o JavaScript de outras linguagens e torna mais fácil para pessoas com
outras experiências animem-se com ele.

## Herança

A herança, com as classes, possuem as mesmas vantagens e desvantagens da herança
com construtores, mas possuem uma sintaxe mais simples utilizando a
palavra-chave `extends`. Vamos relembrar o exemplo da publicação anterior e
criar a classe `Employee`, que estende `Person` e adiciona a propriedade
`salary` e o método `getTax`. Veja, abaixo, como essa herança é implementada com
classes:

```js
class Employee extends Person {
  constructor(name, surname, salary) {
    super(name, surname);
    this.salary = salary;
  }

  getTax() {
    return this.salary * 0.08;
  }
}
```

Veja que o método `apply`, utilizado nos construtores, foi substituído pela
chamada `super`. Além disso, ao utilizarmos `extends`, não precisamos adequar a
cadeia de protótipos. Toda essa parte já é feita pelo JavaScript
automaticamente. A instanciação de objetos continua idêntica.

```js
const a = new Employee('Pedremildo', 'Escavadeira', 100);
const b = new Person('Testerson', 'Trunk');

console.log(a.name); // → Pedremildo
console.log(b.surname); // → Trunk
console.log(a.getFullName()); // → 'Pedremildo Escavadeira'
console.log(a.getFullName === b.getFullName); // → true
console.log(a.getTax()); // → 8
```

## Encapsulamento e polimorfismo

Como os objetos são estruturas de dados muito parecidos com uma
[tabela _hash_](https://en.wikipedia.org/wiki/Associative_array), todas as
propriedades do objeto são acessíveis. As classes, até o ES2015, não
possuem uma forma de definir que uma propriedade seja oculta ou não.

Mas, assim como com os construtores, se queremos que uma propriedade do objeto
seja “protegida” do meio externo, fazemos isso por meio de uma notação padrão,
normalmente prefixando o nome da propriedade com `_`.

Já com relação ao polimorfismo, as mesmas regras dos construtores são aplicadas
e é dado por meio do <a href="https://pt.wikipedia.org/wiki/Duck_typing"><em
lang="en">duck typing</em></a>.

## Propriedades e métodos estáticos

Nas classes, propriedades estáticas podem ser adicionadas com prefixando-a com
a declaração `static`. Quando uma propriedade ou método é prefixado com `static`,
o JavaScript adiciona esse essa propriedade ou método na própria classe e não
no protótipo ou nas instâncias dos objetos.

Vamos exemplificar relembrando o exemplo das publicações anteriores, onde
utilizamos uma propriedade estática para armazenar a quantidade de objetos já
criados pela classe ou qualquer descendente.

```js
class Person {
  static count = 0;

  constructor(name, surname) {
    Person.count += 1;
    this.name = name;
    this.surname = surname;
  }

  getFullName() {
    return this.name + ' ' + this.surname;
  }
}
```

Assim, podemos agora verificar quantas instâncias já foram criadas de forma
idêntica aos construtores, veja:

```js
console.log(Person.count); // → 0

const a = new Person('Pedremildo', 'Escavadeira');

console.log(Person.count); // → 1

const b = new Person('Testerson', 'Trunk');

console.log(Person.count); // → 2
```

## Garantias de instanciação

É possível verificar se um objeto é uma instância de uma classe por meio do
operador `instanceof`. Veja abaixo:

```js
const a = new Employee('Pedremildo', 'Escavadeira', 100);
const b = new Person('Testerson', 'Trunk');

console.log(a instanceof Employee); // → true
console.log(a instanceof Person); // → true
console.log(a instanceof Object); // → true

console.log(b instanceof Employee); // → false
console.log(b instanceof Person); // → true
console.log(b instanceof Object); // → true
```

Assim como nos construtores, o operador `instanceof` testa se a o protótipo dos
objetos criados pela classe à direita está na cadeia de protótipos do objeto à
esquerda, e, com isso, determina se um objeto foi construído por aquele.

No entanto, diferente dos construtores, não é necessário testar um objeto
criado por uma classe para saber se a classe foi chamada com `new`. Caso alguém
tente chamar uma classe como uma função sem o `new`, o próprio JavaScript
dispara um erro.

```js
const a = Person('Pedremildo', 'Escavadeira'); // → erro!
const b = new Person('Testerson', 'Trunk'); // → sucesso
```

## Conclusões

Utilizar construtores traz várias vantagens que os construtores já possuem, como
a herança e polimorfismo simplificados e o uso eficiente de memória por meio do
compartilhamento de código via protótipos. Além disso, a utilização de classes
já mitiga o cuidado que temos que ter com operadores `new` nos construtores. No
entanto, é alguns pontos ainda permanecem no ES2015:

- Não permite um verdadeiro encapsulamento, todas as propriedades são
  acessíveis;
- Justamente porque os métodos são compartilhados e dependem de um contexto
  específico, é necessário uma atenção especial quando os métodos são chamados
  para evitar
  [problemas com o `this`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/this).

Podemos dizer que as classes são “construtores melhorados” e que é prudente
favorecer o uso de classes ao invés de construtores na medida do possível. No
entanto, mesmo com classes disponíveis, grande parte de código escrito em
JavaScript ainda contém construtores e, por isso, é importante saber como
funcionam caso você precise lidar com eles em algum momento.

Essa publicação encerra, por enquanto, a série de introdução ao JavaScript
orientado a objetos. Esse não é um final definitivo. Podem existir mais
publicações futuras com novas funcionalidades que podem ser adicionadas à
linguagem ou evoluções nas técnicas de desenvolvimento OO.

Até mais!
