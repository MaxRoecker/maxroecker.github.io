---
title: 'JavaScript Orientado a Objetos #3'
subtitle: 'Fábricas'
heading: 'Entenda mais sobre essa alternativa para a criação de objetos em JavaScript OO.'
created: 2016-04-27 05:16:01
permalink: 'blog/javascript-orientado-a-objetos-3'
tags:
  - javascript
  - object oriented programming
---

Hoje iremos compreender um pouco sobre as Fábricas no contexto do JavaScript
Orientado a Objetos, um padrão de projeto alternativos aos construtores para a
criação de objetos que possui muita similaridade com programação funcional.

<aside>
  <p>
    <strong>fá.bri.ca:</strong> (1) estabelecimento onde ocorre a
    fabricação ou manufatura de produtos; (2) um mecanismo que produz ou cria
    algo.
  </p>
</aside>

Para que você aproveite melhor o texto é recomendado que você tenha conhecimento
dos conceitos básicos de orientação a objetos. Você pode ler uma pequena
introdução
[no texto anterior dessa série](http://maxroecker.github.io/blog/javascript-orientado-a-objetos-1/)
e também ver o como criar objetos com
[construtores](http://maxroecker.github.io/blog/javascript-orientado-a-objetos-2/).
Também é recomendado que você conheça o comportamento e características dos
[_closures_](http://maxroecker.github.io/blog/javascript-intermediario-4/) em
JavaScript. O texto hoje é um pouco longo porque achei importante unir os
principais tópicos de cada padrão em uma só publicação.

## Introdução

Já vimos, na publicação anterior, que construtores, em JavaScript, são funções
que inicializam um objeto o qual a memória já foi alocada. Revisitando nosso
exemplo do construtor `Person`, visto abaixo, vemos que todas as propriedades
são acessíveis e que os métodos são compartilhados entre todos os objetos por
meio da cadeia de protótipos.

```js
function Person(name, surname) {
  this.name = name;
  this.surname = surname;
}

Person.prototype.getFullName = function () {
  return this.name + ' ' + this.surname;
};
```

Para nosso exemplo, vamos adicionar um novo método à `Person` chamado `print` e
que exibe, na saída padrão, uma _string_ representando o objeto.

```js
Person.prototype.print = function () {
  console.log('Person [name: ' + this.name + ']');
};
```

Suponha que queremos chamar o método `print` duas vezes: a primeira
imediatamente após a criação do objeto e a segunda 3 segundos depois. Podemos
utilizar a função `setTimeout`, que recebe uma função e um número de
milissegundos, para fazer essa tarefa. Veja:

```js
const person = new Person('Pedremildo', 'Escavadeira');

person.print(); // → 'Person [name: Pedremildo]'

setTimeout(person.print, 5000); // → 'Person [name: undefined]'
```

O que aconteceu com o método? Porque, após 5 segundos, o resultado foi
diferente? Na realidade, o método perdeu o contexto de onde deveria ser
executado, ou seja, que objeto `this` se refere. Quando chamamos um método
diretamente no objeto com `objeto.método()`, o JavaScript automaticamente define
o `this` do método como o próprio objeto. Como repassamos o método para outro
objeto eventualmente executá-lo, o `this` do método não referencia mais `person`
e, por isso, temos problemas.

A função `print` não está amarrada ao objeto `person`, ela é compartilhada por
todos os objetos construídos por `Person`. E, justamente porque os métodos são
compartilhados é que, em certos casos, podemos ter problemas com a utilização
desses métodos me outros contextos, como vimos acima. Há vários problemas

Uma forma de resolver esse problema é explicitamente pedir para seja criada uma
nova função, idêntica a anterior, mas que esteja amarrada à variável `person`
por meio do método
[`bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
Veja:

```js
const person = new Person('Pedremildo', 'Escavadeira');

person.print(); // → 'Person [name: Pedremildo]'

setTimeout(person.print.bind(person), 5000); // → 'Person [name: Pedremildo]'
```

Resolvemos o problema criando uma cópia da função com um contexto amarrado, no
entanto, essa não é uma das vantagens dos construtores? Porque vamos
compartilhar se, dependendo do caso de uso, teremos que criar cópias com
contexto amarrado.

Este exemplo mostra bem as desvantagens que construtores possuem. O uso
incorreto do `this` é um dos
[erros mais comuns](https://www.toptal.com/javascript/10-most-common-javascript-mistakes)
entre desenvolvedores JavaScript em qualquer nível de experiência e é fonte de
muitos _bugs_. No entanto, há uma alternativa: as **fábricas**.

## Fábricas

Fábricas são, como construtores, funções que inicializam objetos. No entanto,
fábricas não só inicializam o objeto, como também são responsáveis por
criar a área de memória associada à ele; diferente dos construtores, que passam
essa responsabilidade para o operador `new`. Vamos refatorar nosso construtor
para que ele seja uma fábrica. Veja:

```js
function Person(name, surname) {
  const person = {};
  person.name = name;
  person.surname = surname;
  person.getFullName = function () {
    return person.name + ' ' + person.surname;
  };
  person.print = function () {
    console.log('Person [name: ' + person.name + ']');
  };
  return person;
}
```

Veja que nossa função agora, além de inicializar, cria o objeto. Além disso, não
atribuímos mais as funções no protótipo, mas no próprio objeto. Como `Person`
não é um construtor e sim uma função comum, invocamos-a sem o `new`. Podemos
também fazer o exemplo anterior sem a necessidade do `bind`.

```js
const a = Person('Pedremildo', 'Escavadeira');
const b = Person('Testerson', 'Trunk');

console.log(a.name); // → Pedremildo
console.log(b.surname); // → Trunk
console.log(a.getFullName()); // → 'Pedremildo Escavadeira'

b.print(); // → 'Person [name: Testerson]'

setTimeout(b.print, 5000); // → 'Person [name: Testerson]'
```

Note que, como criamos o objeto, não precisamos mais utilizar `this`. Sempre
temos a referência do objeto criado. Isso acontece porque os métodos
`getFullName` e `print` são _closures_ e, assim, mantém a referência do escopo
da fábrica e podem acessá-lo a qualquer momento.

Entretanto, temos um preço a pagar: todos os métodos dos objetos criados são
cópias e não são compartilhados. A cada vez que a fábrica `Person` é chamada, ela
cria um objeto e cópias dos métodos amarrados a esse objeto. Veja:

```js
console.log(a.getFullName === b.getFullName); // → false
```

## Herança

Fábricas também podem utilizar a herança. Vamos relembrar o exemplo da
publicação anterior, criando uma fábrica `Employee`, que estende `Person` e
adiciona a propriedade `salary` e o método `getTax`.

```js
function Employee(name, surname, salary) {
  const employee = Person(name, surname);
  employee.salary = salary;
  employee.getTax = function () {
    return employee.salary * 0.08;
  };
  return employee;
}
```

De forma geral, não precisamos mais utilizar o método `apply` e, como não usamos
protótipos, não há necessidade de utilizar o `Object.create`, como nos
construtores. No entanto, “terceirizamos” a criação do objeto para outra fábrica
que queremos estender as propriedades e métodos.

Veja que a utilização é exatamente igual à `Person`, no entanto, mais propriedades
e métodos estão disponíveis.

```js
const a = Employee('Pedremildo', 'Escavadeira', 100);
const b = Person('Testerson', 'Trunk');

console.log(a.name); // → Pedremildo
console.log(b.surname); // → Trunk
console.log(a.getFullName()); // → 'Pedremildo Escavadeira'
console.log(a.getFullName === b.getFullName); // → false
console.log(a.getTax()); // → 8
```

## Encapsulamento

Apesar dos objetos serem estruturas de dados muito parecidos com uma
[tabela _hash_](https://en.wikipedia.org/wiki/Associative_array), onde todas as
propriedades do objeto são acessíveis. O conceito de encapsulamento, com
fábricas, pode ser atingido por meio do _closure_.

O _closure_ é protegido de qualquer mudança externa além das próprias variáveis
retornadas. Não há necessidade de convenção. Com fábricas, temos encapsulamento
verdadeiro. Vamos refatorar o exemplo acima para adicionar uma propriedade
“privada” que armazena a taxa do imposto de um empregado.

```js
function Employee(name, surname, salary) {
  const employee = Person(name, surname);
  const rate = 0.08;
  employee.salary = salary;
  employee.getTax = function () {
    return employee.salary * rate;
  };
  return employee;
}
```

Veja que `rate` é uma variável que está no `closure` de `getTax`. Não há outra
forma de acessar `rate` senão pelo método `getTax`. Ou seja, `rate` está
encapsulada de qualquer efeito externo que não seja gerado pelo próprio objeto.

## Polimorfismo

Assim como em construtores, devido às características do JavaScript, o
polimorfismo pode ser realizado sem muitos problemas, uma vez que funções são
objetos, objetos são mutáveis e variáveis não possuem tipos definidos.
Normalmente o polimorfismo se dá por meio do <a
href="https://pt.wikipedia.org/wiki/Duck_typing"><em lang="en">duck
typing</em></a> e que fazem o **Teste do Pato**.

<blockquote>
  <p>
    Se algo parece com um pato, nada como um pato e grasna como um pato, então
    provavelmente é um pato
  </p>
</blockquote>

No contexto de programação, isso significa que não é o tipo do objeto que irá
definir sua semântica, mas sim suas propriedades e métodos. Se um conjunto de
objetos contém um método com o nome `foo`, você pode chamá-los sem problema.

Não há um contrato pré-definido entre as objetos — como é o caso das interfaces
em Java ou classes abstratas em C++ — e por isso fica a cargo do codificador
utilizar a mesmo protocolo nos objetos em que deve-se estabelecer um
polimorfismo.

<figure>
  <img
    src="/img/illustrations/automata-duck.svg"
    alt="Um automâto de pato com sistema alimentação similar ao trato digestivo"
    title="Pato Mecânico de Jacques de Vaucanson, 1738"
    decoding="async"
    loading="lazy"
  />
</figure>

## Propriedades e métodos estáticos

De forma similar aos construtores, propriedades e métodos estáticos podem ser
criados atribuindo-os diretamente à fábrica. Relembrando o exemplo da publicação
anterior, vamos criar uma propriedade estática na fábrica `Person` para
armazenar a quantidade de objetos já criados por ele ou qualquer descendente.

```js
function Person(name, surname) {
  Person.count += 1;
  const person = {};
  person.name = name;
  person.surname = surname;
  person.getFullName = function () {
    return person.name + ' ' + person.surname;
  };
  person.print = function () {
    console.log('Person [name: ' + person.name + ']');
  };
  return person;
}

Person.count = 0;
```

Assim, podemos agora verificar quantas instâncias já foram criadas, veja:

```js
console.log(Person.count); // → 0

const a = Person('Pedremildo', 'Escavadeira');

console.log(Person.count); // → 1

const b = Person('Testerson', 'Trunk');

console.log(Person.count); // → 2
```

## Garantias de instanciação

Como as fábricas não utilizam a cadeia de protótipos, não há como determinar se um
objeto foi criado ou não por uma fábrica por meio do operador `instanceof`.

No entanto, também não temos a necessidade de verificar se uma função foi
chamada da forma correta, uma vez que a própria fábrica detém o controle da
criação do objeto.

## Conclusões

Utilizar fábricas traz várias vantagens alternativas e atacam os pontos onde
construtores deixam a desejar:

- Herança simplificada: basta chamar a fábrica que se deseja herdar e modificar
  seus métodos;
- Polimorfismo simplificado: não há contratos entre as fábricas;
- Encapsulamento verdadeiro: o _closure_ mantém o escopo completamente isolado e
  inacessível de efeitos externos.
- O não compartilhamento de métodos traz vantagens uma vez que não precisamos
  nos preocupar em qual contexto um método será executado, eliminando os riscos
  com o uso incorreto do `this`.

Porém, há um preço a se pagar:

- Uso ineficiente da memória: cada método é alocado para cada objeto criado. Não
  há compartilhamento entre todos os objetos através do uso de protótipos e, por
  isso, fábricas tendem a consumir muito mais memória do que construtores;
- Não é possível estabelecer se um objeto foi criado por uma fábrica por meio do
  `instanceof`.

A tabela abaixo resume bem as características dos construtores e fábricas:

| Característica            | Construtores | Fábricas |
| :------------------------ | :----------: | :------: |
| Herança                   |      ✓       |    ✓     |
| Encapsulamento            |      ✗       |    ✓     |
| Verificação de instâncias |      ✓       |    ✗     |
| Consistência do `this`    |      ✗       |    ✓     |
| Uso eficiente de memória  |      ✓       |    ✗     |
| Propriedades estáticas    |      ✓       |    ✓     |

Note que, apesar das vantagens que as fábricas trazem, alguns pontos negativos
impactam a sua escolha.

Num geral, os desenvolvedores JavaScript preferem utilizar construtores ao invés
de fábricas porque os próprios ambientes de execução preferem utilizar esse
padrão. Mas, mesmo sendo menos populares, é importante entender as fábricas pois
elas permitem compreender as limitações que os construtores possuem e
vice-versa.

No entanto, construtores contam com algumas simplificações sintáticas que
facilitam ainda mais seu uso, como é o caso da estrutura `class` no ES6, mas
isso é um assunto para a próxima publicação!

Até mais!
