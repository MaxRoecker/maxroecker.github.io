---
title: 'JavaScript Orientado a Objetos #3: O Padrão Construtor com Protótipos'
description: 'Conheça sobre esse padrão de criação de objetos utilizado para um uso otimizado de memória.'
cover:
  path: cover.jpg
  title: 'Polyhedron models'
  src: 'https://www.flickr.com/photos/fdecomite/3275300224/in/album-72157613498998540/'
featured: false
date: 2016-09-06 14:55:42
tags:
  - javascript
  - object-oriented programming
---

Hoje, nesse texto, vamos entender sobre outro padrão muito utilizado dentro da programação orientada a objetos no JavaScript: o **Padrão Construtor com Protótipos**. O Padrão Construtor com Protótipos possui muitas similaridades com o Padrão Construtor Simples, por isso é recomendado que você possua conhecimento dele primeiramente. Detalhes sobre Construtores Simples no [texto anterior](http://maxroecker.github.io/blog/javascript-orientado-a-objetos-2/) dessa série.

Além disso, para compreender bem o texto, é importante que você também tenha um bom conhecimento do funcionamento de protótipos de objetos em JavaScript. Você pode ler sobre protótipos de objetos [nesse texto](http://maxroecker.github.io/blog/javascript-intermediario-6/) também publicado anteriormente no blog.


---
## Introdução
Como vimos anteriormente, um **Construtor** é um componente especial que é executado para inicializar um objeto recém-criado uma vez que o seu espaço na memória já foi alocado. Vimos  também que um construtor em JavaScript é uma função responsável por receber um objeto vazio  — com a utilização do operador {%c "new"%} — e atribuir-lhe as propriedades desejadas. um construtor de um objeto que representa uma Pessoa pode ser visto a seguir:

{% simplecode js %}
``` js
function Person (fullname, birthDate) {
  this.fullname = fullname || ''
  this.birthDate = birthDate || null
  this.getAge = function () {
    const today = new Date()
    const age = today.getFullYear() - this.birthDate.getFullYear()
    const month = today.getMonth() - this.birthDate.getMonth()
    const isBeforeBirthDay = (month < 0) ||
      (month === 0 && today.getDate() < this.birthDate.getDate())
    if (isBeforeBirthDay) {
      return age - 1
    }
    return age
  }
  this.getFirstName = function () {
    return this.fullname.split(' ')[ 0 ]
  }
}

const pedremildo = new Person('Pedremildo Escavadeira', new Date(1990, 1, 5))
const testerson = new Person('Testerson Trunk', new Date(1987, 8, 23))

console.log(testerson.getFirstName())   // → Pedremildo
console.log(pedremildo.getAge())        // → 28
```
{% endsimplecode %}


---
## Construtores com Protótipos

Vimos anteriormente que construtores simples possuem algumas deficiências, principalmente quando estamos falando no desempenho da aplicação quando são criadas muitas instâncias de objetos de um mesmo construtor, uma vez que todo objeto possui cópias idênticas de todos os métodos utilizados. Por exemplo, o método {%c "getAge"%} do código anterior é copiado para todos os objetos construídos por {%c "Person"%}.

Podemos comprovar isso comparando uma função — que é um objeto — com outro. Como pode-se demonstrar no código a seguir:

{% simplecode js %}
``` js
console.log(testerson.getDate === pedremildo.getAge)  // → false
```
{% endsimplecode %}

Para contornar a situação, os desenvolvedores JavaScript começaram a utilizar protótipos dos objetos para garantir que somente uma “cópia” de métodos fosse alocada na memória com a utilização de protótipos. **Protótipos** são “interfaces reserva” de objetos, ou seja, quando uma propriedade (atributo ou método) não é encontrado no próprio objeto, busca-se no protótipo a propriedade. Esse processo continua indefinidamente enquanto existirem protótipos para os objetos através de um método chamado [delegação](https://en.wikipedia.org/wiki/Delegation_(object-oriented_programming)).

No Padrão Construtor com Protótipos, o objeto é criado por um construtor e os métodos são colocados no protótipo. Como a utilização de construtores com protótipos passou a ser uma técnica muito popular para a programação orientada a objetos em JavaScript, APIs nativas foram modificadas para tornar esse processo mais simples e menos verboso no código. Para criar um construtor com protótipos, utilizamos a propriedade {%c "prototype"%} de objetos do tipo {%c "Function"%}.

Vamos refatorar o código do nosso construtor {%c "Person"%} para utilizar protótipos. As propriedades do objeto devem ser sempre do objeto e por isso continuam sendo atribuídas dentro do construtor. Os métodos {%c "getAge"%} e {%c "getFirstName"%} agora pertencerão ao protótipo dos objetos criados por {%c "Person"%}. Veja no código a seguir:

{% simplecode js %}
``` js
function Person (fullname, birthDate) {
  this.fullname = fullname || ''
  this.birthDate = birthDate || null
}

Person.prototype = {
  getAge: function () {
    const today = new Date()
    const age = today.getFullYear() - this.birthDate.getFullYear()
    const month = today.getMonth() - this.birthDate.getMonth()
    const isBeforeBirthDay = (month < 0) ||
      (month === 0 && today.getDate() < this.birthDate.getDate())
    if (isBeforeBirthDay) {
      return age - 1
    }
    return age
  },
  getFirstName: function () {
    return this.fullname.split(' ')[ 0 ]
  }
}
```
{% endsimplecode %}

Utilizando construtores com protótipos, os métodos {%c "getAge"%} e {%c "getFirstName"%} agora são único para todas as instâncias, uma vez que os métodos se encontram no protótipo das instâncias, que é único também. Note que a forma de criar os objetos permanece o mesmo e acessar seu protocolo é o mesmo.

{% simplecode js %}
``` js
const pedremildo = new Person('Pedremildo Escavadeira', new Date(1990, 1, 5))
const testerson = new Person('Testerson Trunk', new Date(1987, 8, 23))

console.log(testerson.getFirstName())  // → Pedremildo
console.log(pedremildo.getAge())       // → 28

console.log(testerson.getAge === pedremildo.getAge) // → true
```
{% endsimplecode %}

O resultado é verdadeiro porque a referência do método de um objeto e do outro apontam para a mesma área de memória, ou seja, são o mesmo objeto. Algumas observações são importantes:

 - Propriedades colocadas no protótipo serão compartilhadas entre todos os objetos que o referenciam, por isso é preciso ter atenção;
 - Caso você atribua um método chamado  {%c "getAge"%} no objeto, ele não sobreescreverá o protótipo, mas adicionará esse método apenas para o objeto;
 - Note que há diferença entre o modo que um protótipo é associado com o construtor — por meio da propriedade {%c "prototype"%} — e o modo que os objetos possuem protótipos — por meio da função {%c "Object.getPrototypeOf"%}. Quando, por exemplo, {%c "new Person(name, date)"%} é chamado, o protótipo do objeto retornado referencia o {%c "Person.prototype"%}


---
## Herança

Com construtores com protótipos, a herança é sempre alcançada em duas etapas: transferência de propriedades e encadeamento de protótipos. A primeira parte, a transferência de propriedades, é feita da mesma forma que os construtores simples, utilizando o método {%c "apply"%} de um construtor no contexto {%c "this"%} atual. Dessa forma, todas as propriedades que o construtor chamado possuir serão atribuídos ao contexto {%c "this"%} do objeto. Caso você queira entender melhor esse processo, veja como funciona herança [no texto anterior dessa série](http://maxroecker.github.io/blog/javascript-orientado-a-objetos-2/#herança).

A segunda parte consiste em encadear os protótipos e alinhar as referências aos construtores com o intuito de completar a cadeia de protótipos. Esse processo é bastante simples e feito por meio de uma função comumente chamada de {%c "inherit"%}. Veja o código dela:

{% simplecode js %}
``` js
function inherit (constructor, parents, prototype) {
  var inheritance = {}
  for (let i = 0; i < parents.length; i++) {
    var parent = parents[i].prototype
    for (var property in parent) {
      if (parent.hasOwnProperty(property)) {
        inheritance[property] = parent[property]
      }
    }
  }
  for (let property in prototype) {
    if (prototype.hasOwnProperty(property)) {
      inheritance[property] = prototype[property]
    }
  }

  inheritance.constructor = constructor

  return inheritance
}
```
{% endsimplecode %}

Observe que há a cópia de todas as propriedades de {%c "parents"%} e {%c "prototype"%} para um novo objeto denominado {%c "inheritance"%}. Esse objeto se tornará o protótipo dos objetos costruídos por {%c "constructor"%}. Esse processo de cópia de propriedades de vários objetos para outro é comumente chamado de *mixin*.

Para exemplificar, vamos utilizar os mesmos exemplos utilizados [em capítulos passados](http://maxroecker.github.io/blog/javascript-orientado-a-objetos-2/#herança). Queremos construir um jogo de simulação de cidades e estamos desenvolvendo os objetos que representam as construções da cidade. Seguiremos o modelo proposto no diagrama a seguir.

{% figure 'Diagrama que representa nosso modelo de construtores de objetos construções do jogo.' %}
{% asset_img 'building-model-2.svg' 'Diagrama mostrando as relações dos construtores de construções. Ao topo temos o Building e Complex; a partir dele herda-se Redidential e Working Building. A partir de Working Building herda-se Commercial e Industrial. A partir de Redidential e Complex herda-se Condominium.' %}
{% endfigure %}

Primeiramente, vamos ao nosso construtor {%c "Building"%}. Seu código é semelhante ao da figura a seguir:

{% simplecode js %}
``` js
function Building (value, water, power) {
  this.value = value
  this.water = water
  this.power = power
}

Building.prototype = {
  getValue: function () {
    return this.value
  },

  getPowerConsumption: function () {
    return this.power
  },

  getWaterConsumption: function () {
    return this.water
  }
}
```
{% endsimplecode %}

Agora, vamos fazer nosso construtor {%c "Residential"%}, que herda diretamente as propriedades de {%c "Building"%}. Além de utilizar o método {%c "apply"%}, visto no capítulo anterior, criamos a cadeia de protótipos utilizando a função {%c "Object.create"%}. A função {%c "Object.create"%} é responsável por criar objetos com características específicas. De forma especial, seu primeiro parâmetro indica o objeto protótipo do objeto a ser criado. Veja no código a seguir:

{% simplecode js %}
``` js
var residentialParents = [Building]
var residentialPrototype = {
  addResident: function (person) {
    if (this.residents.length <= this.size) {
      this.residents.push(person)
    }
  }
}

Residential.prototype = inherit(Residential, residentialParents, residentialPrototype)
```
{% endsimplecode %}

A delegação de atributos na cadeia de protótipos sempre começa sua “busca” pelo primeiro elemento. Por isso que quando executa-se uma função que pertence a um protótipo, mas que acessa atributos com a palavra chave {%c "this"%}, é o atributo do objeto que será acessado — caso ele não exista, a delegação continua a subir na cadeia de protótipos.

{% simplecode js %}
``` js
const chale = new Residential(4095, 22, 120, 3)
const sobrado = new Residential(6144, 25, 150, 4)
chale.addResident(testerson)
sobrado.addResident(pedremildo)

console.log(chale.getPowerConsumption()) // → 120
console.log(sobrado.residents[0])      // → {Pedremildo ...}
```
{% endsimplecode %}

Vamos agora ao desenvolvimento das construções de trabalho: comerciais e industriais. Como ambos os tipos de construções possuem a habilidade de “empregar” pessoas, vamos criar um construtor que abstraia esse comportamento e herdar essas características em outros construtores.

{% simplecode js %}
``` js
function WorkingBuilding (name, value, water, power, jobs) {
  Building.apply(this, [value, water, power])
  this.name = name
  this.jobs = jobs
  this.employees = []
}

var workingBuildingParents = [Building]
var workingBuildingPrototype = {
  addEmployee: function (person) {
    if (this.employees.length < this.jobs) {
      this.employees.push(person)
    }
  }
}

WorkingBuilding.prototype = inherit(WorkingBuilding, workingBuildingParents, workingBuildingPrototype)
```
{% endsimplecode %}

Agora vamos aos construtores de objetos que representam uma construção comercial e uma construção industrial.

{% simplecode js %}
``` js
function Commercial (name, value, water, power, jobs) {
  WorkingBuilding.apply(this, [name, value, water, power, jobs])
}

Commercial.prototype = inherit(Commercial, [WorkingBuilding], {})

function Industrial (name, value, water, power, jobs, pollution) {
  WorkingBuilding.apply(this, [name, value, water, power, jobs])
  this.pollution = pollution
}

Industrial.prototype = inherit(Industrial, [WorkingBuilding], {})
```
{% endsimplecode %}

Com nossos construtores feitos, podemos agora criar os estabelecimentos comerciais e industriais, como também adicionar os empregados ligados a eles.

{% simplecode js %}
``` js
const com = new Commercial('Lojas Compras & Compras', 10240, 55, 320, 15)
com.addEmployee(pedremildo)

const ind = new Industrial('AutoParts Central', 18432, 89, 450, 30)
ind.addEmployee(testerson)

console.log(ind.employees)  // → [ {Testerson} ]
console.log(com.name)       // → Lojas Compras & Compras
```
{% endsimplecode %}


### Herança Múltipla
A herança múltipla é possível em JavaScript quando utilizamos Construtores com Protótipos. Primeiro é necessário executar o {%c "apply"%} de cada um dos construtores dos quais se quer herdar propriedades no construtor. Após isso, basta adicioná-lo no arranjo {%c "parents"%} e passá-lo para a função {%c "inherit"%}.

Para exemplificarmos, vamos codificar nosso construtor {%c "Condominium"%}, que herda propriedades de  {%c "Complex"%} e de {%c "Residential"%}:

{% simplecode js %}
``` js
function Complex (spaces) {
  this.spaces = new Array(spaces)
}

Complex.prototype = {
  occupy: function (spaceNumber, person) {
    if (spaceNumber < this.spaces.length) {
      this.spaces[spaceNumber] = this.spaces[spaceNumber] || []
      this.spaces[spaceNumber].push(person)
    }
  }
}

function Condominium (value, water, power, size, spaces) {
  Residential.apply(this, [value, water, power, size])
  Complex.apply(this, [spaces])
}

Condominium.prototype = inherit(Condominium, [Complex, Residential], {})
```
{% endsimplecode %}

Note que a ordem em que estão os elementos em {%c "parents"%} é importante, uma vez que o processo de *mixin* pode substituir as propriedades dos objetos anteriores por posteriores.


---
## Encapsulamento

Construtores com Protótipos não possuem o conceito de encapsulamento, pois, afinal, se um método que esteja referenciado no protótipo de um objeto precisa acessar uma propriedade do objeto, essa propriedade **precisa ser pública**. Para isso, quando utilizando o padrão construtor com protótipos, utiliza-se uma **convenção de nomenclatura**. De forma geral, métodos ou atributos que iniciem com um subtraço (*underscore*, {%c "_"%}) não devem ser chamado fora do contexto da criação do objeto — mesmo que isso seja possível.

Para exemplificar, vamos rever nossos construtores dos exemplos anteriores. Veja por exemplo nosso construtor {%c "Residential"%} que possui o atributo {%c "residents"%} público. Um programador pode quebrar a regra de negócio do modelo em atribuir mais população à residência do que o permitido pelo atributo size dela. Podemos indicar ao desenvolvedor que esse atributo não deve ser acessado publicamente renomeando-o para {%c "_residents"%} e adicionando métodos de acesso públicos.

{% simplecode js %}
``` js
function Residential( value, water, power, size ) {
  Building.apply(this, [value, water, power])
  this.size = size
  this._residents = []
}

var residentialParents = [Building]
var residentialPrototype = {
  addResident: function (person) {
    if (this._residents.length <= this.size) {
      this._residents.push(person)
    }
  },
  getResidents: function () {
    return this._residents.slice()
  }
}

Residential.prototype = inherit(Residential, residentialParents, residentialPrototype)
```
{% endsimplecode %}


---
## Polimorfismo
Em JavaScript o polimorfismo pode ser realizado sem muitos problemas, uma vez que funções são objetos, objetos são mutáveis e variáveis não possuem tipos definidos. Não há um contrato pré-definido entre as variáveis — como é o caso das interfaces em Java ou classes abstratas em C++ — e por isso fica a cargo do codificador utilizar a mesma interface nos objetos em que deve-se estabelecer um polimorfismo.

{% figure 'O polimorfismo permite que diferentes objetos que implementem uma mesma interface possam ser tratados de forma indistinguível.' %}
{% asset_img 'polymorphism.svg' 'Representação ilustrativa do polimorfismo como uma situação onde um objeto ordene os objetos a falarem e todos respondem a sua maneira.' %}
{% endfigure %}

O polimorfismo com construtores com protótipos pode ser feito da mesma forma que com construtores simples, porém os métodos estão referenciados no protótipo ao invés do próprio objeto.

Vamos exemplificar modificando nossos construtores {%c "Commercial"%} e {%c "Industrial"%} para que possuam o método getPowerConsumption que se adeque a realidade de cada um. Em nosso modelo, um edifício comercial possui um consumo que representa 20% de sua capacidade total e o restante (80%) é calculado com base no número de empregados do edifício. Dessa forma, nosso construtor {%c "Commercial"%} pode ter o seguinte código:

{% simplecode js %}
``` js
function Commercial (name, value, water, power, jobs) {
  WorkingBuilding.apply(this, [name, value, water, power, jobs])
}

Commercial.prototype = inherit(Commercial, [WorkingBuilding], {
  getPowerConsumption: function() {
    const fixedPower = this.power * 0.2
    const variablePower = this.power * 0.8
    const powerPerEmployee = variablePower / this.jobs
    const actualPower = powerPerEmployee * this.employees.length
    return fixedPower + actualPower
  }
})
```
{% endsimplecode %}

Já nossos edifícios industriais possuem um consumo fixo de 30% de sua capacidade total. O restante (70%) depende exclusivamente do índice de poluição que a construção emite. Só então é calculado o índice de consumo para cada empregado. Logo, o construtor pode ser parecido com o código a seguir:

{% simplecode js %}
``` js
function Industrial(name, value, water, power, jobs, pollution) {
  WorkingBuilding.apply(this, [name, value, water, power, jobs])
  this.pollution = pollution
}

Industrial.prototype = inherit(Industrial, [WorkingBuilding], {
  getPowerConsumption: function() {
    const fixedPower = this.power * 0.3
    const variablePower = this.power * 0.7
    const pollutionTreatmentPower = variablePower * this.pollution
    const powerPerEmployee = (variablePower - pollutionTreatmentPower) / this.jobs
    const actualConsumption = powerPerEmployee * this.employees.length
    return fixedPower + pollutionTreatmentPower + actualConsumption
  }
})
```
{% endsimplecode %}

Para que polimorfismo seja feito, a entrada e saída da função deve ser os mesmos. Nesse exemplo, o nosso método não possui entrada e possui uma saída numérica. Como a interface é a mesma, podemos agora atribuir esses objetos em uma lista e chamar seus métodos independentemente de como sejam implementados em seu interior.

{% simplecode js %}
``` js
const com = new Commercial('Lojas Compras & Compras', 10240, 55, 320, 15)
com.addEmployee(pedremildo)

const ind = new Industrial('AutoParts Central', 18432, 89, 450, 30, 0.2)
ind.addEmployee(testerson)

const workingBuildings = [com, ind]

for (var i = 0; i < workingBuildings.length; i++) {
  var build = workingBuildings[i]
  console.log(
    'Construção: %s \n— Consumo: %d / %d',
    build.name,
    build.getPowerConsumption(),
    build.power
  )
}
```
{% endsimplecode %}


---
## Resumo

O Padrão Construtor com Protótipos possui várias vantagens, tais como:

 - Possibilidade de utilização de Herança múltipla, apesar dos riscos de sobreposição de propriedades e estados imprevisíveis;
 - Polimorfismo feito de maneira simples;
 - Uso enxuto da memória, pois cada método é somente alocado uma vez e compartilhado entre todos os objetos através do uso de protótipos;
 - Propriedades estáticas podem ser feitas da mesma maneira que Construtores Simples.

{% asset_img 'scale.svg' 'Ilustração de uma balança.' %}

Porém, alguns pontos devem ser considerados quando trabalhos com Construtores com Protótipos:

 - A herança é mais complicada, pois é necessário copiar as propriedades de um protótipo para outro;
 - Não permite um verdadeiro encapsulamento.


---
## Conclusões

Hoje compreendemos sobre Construtores com Protótipos, um padrão muito utilizado no lado cliente de aplicações web, pois oferece as principais características da programação orientada a objetos com um menor custo de uso de memória.

Por hoje é só, pessoal. No próximo post da série vamos compreender o Padrão Fábrica para a criação de objetos, que vem para resolver alguns problemas que ambos os padrões baseados em construtores tem: falhas que podem ocorrer devido ao uso da palavra-chave {%c "new"%}.

Até a próxima!
