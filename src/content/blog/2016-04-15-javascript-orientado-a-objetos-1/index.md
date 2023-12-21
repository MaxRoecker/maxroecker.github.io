---
title: 'JavaScript Orientado a Objetos #1'
subtitle: 'Introdução'
heading: 'Compreenda os principais conceitos da Orientação a Objetos no JavaScript'
created: 2016-04-15 08:49:56
permalink: 'blog/javascript-orientado-a-objetos-1/index.html'
tags:
  - javascript
  - object oriented programming
---

Hoje vamos iniciar uma nova série de publicações sobre a linguagem JavaScript
com foco na programação orientada a objetos. Nessa série, espero que você
compreenda conceitos importantes como o encapsulamento de dados, herança e
polimorfismo em seu código. Vamos também entender mais a fundo a estrutura dos
objetos e compreender o estilo de programação baseado em protótipos do
JavaScript.

## Introdução rápida à Programação Orientada a Objetos

A
[Programação Orientada a Objetos](https://en.wikipedia.org/wiki/Object-oriented_programming)
(POO) é um paradigma de programação que favorece o uso de **objetos**, unidades
de computação que contém uma combinação de variáveis e funções. Idealmente, esse
paradigma tem o objetivo de separar um problema complexo em pequenos problemas
isolados que são resolvidos por objetos, e fornecem um protocolo ao mundo
exterior pelo qual o objeto pode fornecer informações.

<aside>
  <p>
    <strong>pa.ra.dig.ma:</strong> Exemplo, norma ou padrão estabelecido ou a
    ser seguido.
  </p>
</aside>

O grande triunfo da Orientação a Objetos é que os dados e as funções que
manipulam esses dados estão agregados em uma mesma estrutura e podem proteger-se
do acesso e da manipulação direta do “mundo externo”. Os dados ficam em um
escopo interno do objeto e são chamados de **atributos**. Os atributos armazenam
o **estado** do objeto, ou seja, o conjunto de valores que o objeto contém. Toda
vez que o valor de algum atributo é alterado, o objeto muda de estado. Por sua
vez, para que um objeto possa ser usado pelo mundo externo, ele deve fornecer
um protocolo. Protocolos de acesso à objetos são, em sua maioria, compostos por
**métodos**. Métodos são propriedades funcionais dos objetos e que podem ser
executadas para alterar ou retornar algum valor no estado de um objeto.

Construir aplicações com objetos permite que os desenvolvedores adotem algumas
técnicas valiosas:

- **Herança**: A herança é a capacidade de objetos poderem “copiar”
  características de outros objetos, ou seja, seus métodos os métodos e
  propriedades. É um recurso bastante poderoso e que permite um grande reuso de
  código.
- **Encasulamento**: o encasulamento é a capacidade de objetos “esconderem” suas
  propriedades do mundo externo ou restringir o acesso a eles, permitindo que
  ninguém que não saiba os efeitos colaterais de uma alteração num objeto possa
  interferir em seu funcionamento.
- **Polimorfismo**: O polimorfismo pode ser definido como a habilidade de chamar
  métodos de diferentes objetos de forma idêntica. Quando dizemos que um
  conjunto de objetos é polimórfico, significa que os objetos desse conjunto
  possuem protocolos idênticos, ou seja, aceitam as mesmas entradas e
  proporcionam a mesma saída. No entanto, sua implementação interna pode ser
  drasticamente diferente.

A Programação Orientada a Objetos é destinada a promover uma maior flexibilidade
e facilidade na manutenção de código e é muito popular em aplicações de grande
escala. Atualmente, muitas linguagens populares — como Java, C++, Python, Ruby,
PHP entre outras — permitem programação orientada a objetos. O JavaScript também
está incluso nesse grupo, no entanto, possui algumas peculiaridades que em um
primeiro momento podem ser estranhas para a grande maioria dos desenvolvedores
acostumados com outras linguagens.

<figure>
  {% img {
    src: "./object-1.svg",
    alt: "Um homem opera um veículo de uma roda sentado dentro da grande roda, protegido do mau tempo por um guarda-chuva fixado no dispositivo.",
    title: "J. O. Lose of Patterson, N. J. Veículo de uma Roda. N° 325,548.",
    formats: ['svg']
  }%}
</figure>

## Revisando os Objetos em JavaScript

A grande maioria das linguagens que utilizam Orientação a Objetos se baseiam em
**classes**. Uma classe é um “modelo” ou um “<a
href="https://pt.wikipedia.org/wiki/Blueprint"><em lang="en">blueprint</em></a>”
para a criação de objetos. É responsabilidade da classe definir os atributos e a
interface dos objetos por ela criados. Objetos em uma linguagem baseada em
classes são **instâncias das classes**.

Em Javascript, os objetos não são instâncias de classes. Como já vimos em
[posts anteriores](http://maxroecker.github.io/blog/javascript-basico-5/), um
objeto é uma estrutura de dados da linguagem que se assemelha a uma
[tabela _hash_](https://en.wikipedia.org/wiki/Associative_array). Podemos
definir um objeto, seus atributos e seus métodos com o literal `{…}`.
Veja:

```js
const pessoa = {
  name: 'Pedro',
  email: 'pedro@email.com',
  getUsername: function () {
    return this.email.split('@')[0];
  },
};

console.log(pessoa['name']); // → Pedro
console.log(pessoa.getUsername()); // → pedro
pessoa.email = 'joao@exemplo.com';
console.log(pessoa.getUsername()); // → joao
```

Podemos acessar as propriedades de um objeto através do operador `.` seguido da
propriedade ou através do operador `[]` passando a chave como uma <em
lang="en">string</em>. A palavra `this`, quando utilizada em um objeto,
refere-se ao próprio objeto, dessa forma podemos utilizar o atributo `email` do
objeto criado anteriormente dentro do método `getUsername`.

Entretanto, objetos literais do JavaScript não possuem o conceito de
encapsulamento como pregado pela Orientação a Objeto. Todos os atributos são
acessíveis e visíveis pelo lado de fora do objeto.

## Protótipos

[Como visto anteriormente](http://maxroecker.github.io/blog/javascript-intermediario-6/),
o JavaScript não possui Orientação a Objetos baseado em Classes (OOC). Na
verdade, a linguagem implementa outro “estilo” de programação orientada a
objetos, a **Orientação a Objetos baseada em Protótipos (OOP)**.

Protótipos são, de forma bem simples, objetos que servem de “reserva” para outro
objeto. Dessa forma, quando buscamos uma propriedade em um objeto e ela não está
presente nele, a máquina virtual vai até o protótipo desse objeto buscar essa
propriedade. Caso o resultado seja negativo novamente, busca-se no protótipo do
protótipo e assim por diante até que um objeto não tenha prototótipo ou a
propriedade seja encontrada.

Compreender como os protótipos funcionam é essencial para compreender como
programar em JavaScript orientado a objetos. Caso você queira se saber mais
sobre o que são protótipos de objetos, recomendo a leitura
[desse texto](http://maxroecker.github.io/blog/javascript-intermediario-6/) onde
descrevo com mais detalhes o comportamento de protótipos e suas principais
características.

## Orientação a Objetos em JavaScript

O JavaScript é uma linguagem muito flexível e permite que os desenvolvedores
tenham liberdade para construir diversas soluções para problemas e objetivos que
queiram alcançar. Quando estamos programando em um paradigma orientado a objetos
isso não é diferente. Há múltiplas maneiras e padrões para se programar
orientado a objetos dentro da linguagem.

Cada técnica possui sua vantagem e sua desvantagem característica, e essa
flexibilidade permite que o desenvolvedor escolha qual é a solução mais adequada
ao seu problema. Essa série de publicações pretende passar a você alguns
conceitos e técnicas utilizadas em JavaScript para que os programas garantam as
principais características da programação orientada a objetos. E justamente por
isso iremos nos focar em dois padrões utilizados quando queremos desenvolver
aplicações em JavaScript orientado a objetos: os **construtores** e as
**fábricas**. Ao final, também veremos as novidades do ES2015 para esse
paradigma.

Até mais!
