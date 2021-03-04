---
title: 'JavaScript Orientado a Objetos #2'
subtitle: 'Construtores'
heading: 'Se aprofunde em uma das principais técnicas utilizadas para a criação de objetos em JavaScript OO.'
date: 2016-04-22 21:05:36
tags:
  - javascript
  - object-oriented programming
  - post
---

Hoje iremos compreender um pouco sobre Construtores no contexto do JavaScript
Orientado a Objetos, um padrão de projeto para a criação de objetos que possui
muita similaridade com a orientação a objetos com classes.

<aside> <p> <strong>cons.tru.tor:</strong> (1) que ou aquele que constrói;
construidor. (2) o que domina o saber de construir. </p> </aside>

Para que você aproveite melhor o texto é recomendado que você tenha conhecimento
dos conceitos básicos de orientação a objetos. Você pode ler uma pequena
introdução
[no texto anterior dessa série](http://maxroecker.github.io/blog/javascript-orientado-a-objetos-1/).
Também é recomendado que você conheça o comportamento e características dos
[objetos](http://maxroecker.github.io/blog/javascript-basico-5/) e
[funções](http://maxroecker.github.io/blog/javascript-basico-6/) em
JavaScript. O texto hoje é um pouco longo porque achei importante unir os
principais tópicos de cada padrão em uma só publicação.

## Introdução

Na orientação a objetos, um **construtor** é uma rotina utilizada para
inicializar um objeto cuja a memória para ele já foi alocada. Em linguagens com
orientação a objetos baseada em classes, como é o caso do Java e do C++, o
construtor é definido na própria classe e é invocado toda vez que uma instância
dessa classe é criada.

O JavaScript não possui classes, mas o conceito de construtores é feito por meio
de funções que inicializam objetos. Por exemplo, veja a função abaixo `Person`,
que recebe um objeto `target`, além de um nome junto e um sobrenome em `name` e
`surname`.

```js
function Person(target, name, surname) {
  target.name = name;
  target.surname = surname;
  target.getFullName = getFullName;
  return target;
}

function getFullName() {
  return this.name + ' ' + this.surname;
}
```

Veja que a função `Person` recebe o objeto alvo e inicializa-o,
atribuindo as propriedades e métodos que definem o objeto.

<aside>
  <p>
    Mesmo que a função <code>Person</code> seja definida antes da função
    <code>getFullName</code>, ela ainda pode referenciá-la, pois suas
    declarações passaram por um processo de <a
href="https://maxroecker.github.io/blog/javascript-intermediario-4/"><em
lang="en">hoist</em></a>.
  </p>
</aside>

Veja que podemos utilizá-la como um construtor, uma vez que ela inicializa um
objeto e permite a interação por meio de métodos e acesso as propriedades.

```js
const a = Person({}, 'Pedremildo', 'Escavadeira');
const b = Person({}, 'Testerson', 'Trunk');

console.log(a.name); // → Pedremildo
console.log(b.surname); // → Trunk
console.log(a.getFullName()); // → 'Pedremildo Escavadeira'
console.log(a.getFullName === b.getFullName); // → true
```

## Construtores

O exemplo anterior de um construtor está “bem comportado”, uma vez que estamos
passando objetos “vazios” com o literal `{…}`. Quando estamos falando de
construtores, normalmente estamos falando de inicializar objetos recém-criados,
mas nada garante que alguém passe qualquer objeto como o `target` do nosso
construtor.

Para isso, o JavaScript fornece o operador
[`new`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new).
O `new` é um operador utilizado antes da chamada de funções e que muda alguns
detalhes da sua execução. Ao executar `new ⟨função⟩(⟨argumentos⟩)`, o JavaScript
faz os seguintes passos:

1. Cria um objeto vazio com protótipo igual a propriedade `prototype` da função;
2. “Amarra” o contexto `this` da função ao objeto criado no passo 1;
3. Retorna o objeto criado no passo 1 caso a função retorne `undefined`.

Assim, podemos reescrever a função `Person` acima de maneira mais simples e
intuitiva:

```js
function Person(name, surname) {
  this.name = name;
  this.surname = surname;
}

Person.prototype.getFullName = function () {
  return this.name + ' ' + this.surname;
};
```

Veja que não é mais necessário receber um objeto como parâmetro, pois o `this` é
implicitamente definido como o objeto recém criado pelo operador `new`. Também
não há necessidade de retornar um objeto, já que o `new` implicitamente fará
isso. Além disso, não precisamos mais atribuir os métodos diretamente no objeto
como antes, uma vez que utilizamos a cadeia de protótipos. O operador `new` irá
criar um objeto com protótipo igual a `Person.prototype`, onde nossos métodos
são definidos.

O operador `new` garante que um objeto “novo” é fornecido, então, precisamos
instanciar nossos objetos utilizando ele. Veja que podemos fazer exatamente os
mesmos testes que o exemplo anterior.

```js
const a = new Person('Pedremildo', 'Escavadeira');
const b = new Person('Testerson', 'Trunk');

console.log(a.name); // → Pedremildo
console.log(b.surname); // → Trunk
console.log(a.getFullName()); // → 'Pedremildo Escavadeira'
console.log(a.getFullName === b.getFullName); // → true
```

Utilizar construtores com o operador `new` e a cadeia de protótipos é
considerado a técnica mais comum e recomendada de desenvolver código orientado a
objetos em JavaScript, e é nela que iremos nos aprofundar nos próximos tópicos.

## Herança

Podemos alcançar a herança ao utilizar uma chamada ao construtor qual se quer
herdar as características com o auxílio do método
[`apply`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply).
O `apply` é um método de funções (lembre-se que funções, no JavaScript, também
são objetos), que recebe dois parâmetros: o primeiro, um objeto, indica contexto
em que a função deve ser aplicada, ou seja, que `this` referencia; e o
segundo, um arranjo, que recebe os argumentos que devem ser passados a função
a ser executada.

Vamos criar um novo construtor, `Employee`, que estende `Person` e adiciona uma
propriedade e um método: `salary` e `getTax`, respectivamente. Veja como essa
herança é implementada abaixo:

```js
function Employee(name, surname, salary) {
  Person.apply(this, [name, surname]);
  this.salary = salary;
}

Employee.prototype = Object.create(Person.prototype);

Employee.prototype.getTax = function () {
  return this.salary * 0.08;
};
```

De forma geral, o que o método `apply` está fazendo é executar a função `Person`
no objeto `this` da função `Employee`, algo muito similar à chamada `super` em
linguagens com orientação a objetos baseada em classes. Além disso, precisamos
adequar o protótipo de `Employee` para estender o protótipo de `Person` e,
assim, herdar os métodos pela cadeia de protótipos. Para fazer isso, utilizamos
a função `Object.create`, que cria um objeto com um protótipo definido.

Veja que a utilização é exatamente igual à `Person`, no entanto, mais propriedades
e métodos estão disponíveis.

```js
const a = new Employee('Pedremildo', 'Escavadeira', 100);
const b = new Person('Testerson', 'Trunk');

console.log(a.name); // → Pedremildo
console.log(b.surname); // → Trunk
console.log(a.getFullName()); // → 'Pedremildo Escavadeira'
console.log(a.getFullName === b.getFullName); // → true
console.log(a.getTax()); // → 8
```

## Encapsulamento

Como os objetos são estruturas de dados muito parecidos com uma
[tabela _hash_](https://en.wikipedia.org/wiki/Associative_array), todas as
propriedades do objeto podem ser acessadas. O conceito de encapsulamento, com
construtores, não é regido pela linguagem, mas sim por convenção.

Normalmente se queremos que uma propriedade do objeto seja “protegida” do meio
externo, fazemos isso por meio de uma notação padrão, normalmente prefixando o
nome da propriedade com `_`. Vamos refatorar o exemplo acima para adicionar
uma propriedade “privada” que armazena a taxa do imposto de um empregado.

```js
function Employee(name, surname, salary) {
  Person.apply(this, [name, surname]);
  this._rate = 0.08;
  this.salary = salary;
}

Employee.prototype = Object.create(Person.prototype);

Employee.prototype.getTax = function () {
  return this.salary * this._rate;
};
```

Veja que a propriedade `_rate` é adicionada ao objeto como qualquer outra, no
entanto, como prefixamos o nome com `_`, quem utiliza esse objeto sabe que essa
propriedade não deve ser manipulada, pois o comportamento do objeto pode se
tornar imprevisível.

Relembrando: a propriedade `_rate` é exibida e pode ser acessada como qualquer
outra propriedade do objeto, mas, por convenção, indica-se que ela não deve ser
manipulada fora do próprio objeto. Esse tipo de convenção não é único da
linguagem JavaScript, outras linguagens dinâmicas, como o Python,
[adotam regras similares](https://docs.python.org/3/tutorial/classes.html#private-variables).

## Polimorfismo

Em JavaScript o polimorfismo pode ser realizado sem muitos problemas, uma vez
que funções são objetos, objetos são mutáveis e variáveis não possuem tipos
definidos. Normalmente o polimorfismo se dá por meio do <a
href="https://pt.wikipedia.org/wiki/Duck_typing"><em lang="en">duck
typing</em></a> e que fazem o **Teste do Pato**.

<blockquote>
  <p>
    Se algo parece com um pato, nada como um pato e grasna como um pato, então
    provavelmente é um pato
  </p>
</blockquote>

No contexto de programação, isso significa que não é o tipo nem a cadeia de
herança de do objeto que irá definir sua semântica, mas sim suas propriedades e
métodos. Se um conjunto de objetos contém um método com o nome `foo`, você pode
chamá-los sem problema.

Não há um contrato pré-definido entre as objetos — como é o caso das interfaces
em Java ou classes abstratas em C++ — e por isso fica a cargo do codificador
utilizar a mesmo protocolo nos objetos em que deve-se estabelecer um
polimorfismo.

<figure>
  <img
    src="/images/2016-04-22-javascript-orientado-a-objetos-2/duck.svg"
    alt="Um automâto de pato com sistema alimentação similar ao trato digestivo"
    title="Pato Mecânico de Jacques de Vaucanson, 1738"
    decoding="async"
    loading="lazy"
  />
</figure>

## Propriedades e métodos estáticos

Propriedades estáticas são atributos/métodos que pertencem ao construtor e não a
cada um dos objetos construídos por ele. Propriedades estáticas dos construtores
podem ser criadas atribuindo propriedades aos próprios construtores.

Vamos exemplificar a utilização de propriedades estáticas no construtor `Person`
para armazenar a quantidade de objetos já criados por ele ou qualquer
descendente.

```js
function Person(name, surname) {
  Person.count += 1;
  this.name = name;
  this.surname = surname;
}

Person.count = 0;

Person.prototype.getFullName = function () {
  return this.name + ' ' + this.surname;
};
```

Assim, podemos agora verificar quantas instâncias já foram criadas, veja:

```js
console.log(Person.count); // → 0

const a = new Person('Pedremildo', 'Escavadeira');

console.log(Person.count); // → 1

const b = new Person('Testerson', 'Trunk');

console.log(Person.count); // → 2
```

## Garantias de instanciação

O JavaScript também permite verificar se um objeto é uma instância de um
construtor por meio do operador `instanceof`. Veja abaixo:

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

O operador `instanceof` testa se a propriedade `prototype` do construtor à
direita está na cadeia de protótipos do objeto à esquerda, e, com isso, determina
se um objeto foi construído por aquele.

O uso do `instanceof` é bastante utilizado para garantir a segurança de um
construtor. Uma vez que um construtor é uma função qualquer que utiliza o
contexto `this`, o que acontece se chamar a função sem o <code>new</code>?

Nesse caso, não cria-se um objeto novo e o `this` no construtor passa a ser o
contexto atual de onde a função foi executada. Assim, o construtor, que espera
que o `this` seja um objeto recém-criado na verdade recebe outro e isso pode
causar efeitos colaterais imprevisíveis e <em lang="en">bugs</em> de difícil
localização. Para garantir que o construtor sempre receba no `this` o objeto
esperado, podemos adicionar o seguinte teste:

```js
function Person(name, surname) {
  if (!(this instanceof Person)) throw new TypeError();
  this.name = name;
  this.surname = surname;
}

Person.prototype.getFullName = function () {
  return this.name + ' ' + this.surname;
};
```

Assim, se caso alguém chame `Person` sem o `new`, teremos um erro.

```js
const a = Person('Pedremildo', 'Escavadeira'); // → erro!
const b = new Person('Testerson', 'Trunk'); // → sucesso
```

## Conclusões

Utilizar construtores traz várias vantagens que incluem:

- Herança simplificada: basta chamar o construtor em outro e adequar a cadeia
  herdar as propriedades;
- Polimorfismo simplificado: não há contratos entre diferentes construtores.
- Uso eficiente da memória: cada método é somente alocado uma vez e
  compartilhado entre todos os objetos através do uso de protótipos;

Porém, alguns pontos devem ser considerados:

- Não permite um verdadeiro encapsulamento, todas as propriedades são
  acessíveis;
- É necessário sempre tomar cuidado ou tratar a chamada de construtores sem o
  operador `new`;
- Justamente porque os métodos são compartilhados e dependem de um contexto
  específico, é necessário uma atenção especial quando os métodos são chamados
  para evitar
  [problemas com o `this`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/this).

Apesar dos pontos “negativos”, a utilização de construtores em JavaScript é tão
comum que grande parte das APIs fornecidas pelos ambientes de execução utilizam
esse padrão. No entanto, há uma outro padrão para programarmos JavaScript
orientado a objetos: as Fábricas, que mitigam os pontos negativos vistos acima
ao custo de alguns dos positivos. Mas, esse assunto fica para a próxima
publicação.

Até a próxima!
