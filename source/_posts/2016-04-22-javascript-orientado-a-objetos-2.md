---
title: 'JavaScript Orientado a Objetos #2:
O Padrão Construtor Simples'
description: 'O que é o Padrão Construtor Simples? Entenda uma das principais técnicas utilizadas para a criação de objetos em JavaScript OO.'
cover:
  path: cover.jpg
  title: 'Polyhedron models'
  src: 'https://www.flickr.com/photos/fdecomite/3275300224/in/album-72157613498998540/'
featured: false
date: 2016-04-22 21:05:36
tags:
  - javascript
  - object-oriented programming
---

> **{%raw%}cons.tru.tor{%endraw%}**: [adjetivo substantivo] 1) que ou aquele que constrói; construidor. 2) o que domina o saber de construir.

Hoje iremos compreender um pouco Padrão Construtor Simples no contexto do JavaScript Orientado a Objetos, um padrão de projeto que possui comportamento baseado nos métodos construtores da linguagem Java. Para que você aproveite melhor o texto é recomendado que você tenha conhecimento dos conceitos básicos de orientação a objetos. Você pode ler uma pequena introdução [no texto anterior dessa série](http://maxroecker.github.io/blog/javascript-orientado-a-objetos-1/). Também é recomendado que você conheça o comportamento e características dos [objetos](http://maxroecker.github.io/blog/javascript-basico-5/), [funções](http://maxroecker.github.io/blog/javascript-basico-6/) e também de *[closures](http://maxroecker.github.io/blog/javascript-intermediario-4/)* em JavaScript.

O texto hoje é um pouco longo, pois achei importante unir os principais tópicos de cada padrão em um só local e evitar fragmentação de conteúdo.


---
## Introdução

Na orientação a objetos, um **Construtor** é um componente especial utilizado para inicializar um objeto recém-criado, uma vez que a memória utilizada por ele já foi alocada. O conceito de construtores também é utilizado no JavaScript quando estamos trabalhando com programação orientada a objetos. No entanto, diferente de linguagens como o Java e o C++ — onde o construtor é um método da própria classe —, em JavaScript o construtor é uma função que constrói o objeto. Como em JavaScript [quase tudo é um objeto](http://maxroecker.github.io/blog/javascript-basico-5/), [incluindo funções](http://maxroecker.github.io/blog/javascript-basico-6/), podemos utilizá-las de forma análoga à “instanciadores de objetos”.

Funções possuem uma dupla de entradas e um elemento de saída. Podemos utilizar funções para criar objetos da seguinte forma: (i) Recebendo um objeto e os valores de inicialização como entrada; (ii) Adicionando as propriedades no corpo da função; e (iii) retornando o objeto modificado como resultado da função.

Vamos exemplificar esse comportamento com um exemplo. Queremos construir um objeto que represente uma pessoa. Precisamos salvar seu nome completo e data de nascimento. Vamos fazer também alguns métodos para retornar a idade (calculada a partir do momento atual) e também outro método que retorne somente o primeiro nome da pessoa. Utilizando os conceitos vistos anteriormente, nosso construtor de objetos de pessoas, em um primeiro momento, teria a estrutura similar ao abaixo:

{% simplecode js %}
``` js
function PersonConstructor( object, fullname, birthDate ) {
  object.fullname = fullname || '';
  object.birthDate = birthDate || null;
  object.getAge = function() {
    const today = new Date(),
          age = today.getFullYear() - this.birthDate.getFullYear(),
          month = today.getMonth() - this.birthDate.getMonth(),
          isBeforeBirthDay = month < 0 ||
                             ( month === 0 &&
                               today.getDate() < this.birthDate.getDate() );
    if ( isBeforeBirthDay ) {
        return age - 1;
    }
    return age;
  };
  object.getFirstName = function() {
    return this.fullname.split(' ')[ 0 ];
  };
  return object;
}
```
{% endsimplecode %}

Agora, podemos utilizar nosso primeiro construtor para criar objetos de pessoas aplicando a função em alguns valores:


{% simplecode js %}
``` js
const pedremildo = PersonConstructor( {}, 'Pedremildo Escavadeira', new Date( 1990, 1, 5 ) );
const testerson = PersonConstructor( {}, 'Testerson Trunk', new Date( 1987, 8, 23 ) );

console.log( pedremildo.getFirstName() ); // → Pedremildo
console.log( testerson.getAge() );        // → 28
```
{% endsimplecode %}


---
## Construtores Simples
Como construtores são uma das técnicas mais utilizada para a criação de objetos no JavaScript, a própria linguagem fornece um “açúcar sintático” (*[syntatic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar)*) com a utilização do operador `new`. Quando adicionado à frente de uma chamada de função, o operador `new` muda o escopo de execução da função, atribuindo um novo objeto vazio a ele. Dessa forma, podemos utilizar a palavra `this` dentro do contexto da função e estaremos referenciando ao novo objeto que a expressão `new` inclui ao escopo.

{% figure 'Um construtor, em JavaScript, é uma função que recebe um objeto e atribui a ele características e um comportamento próprio.' %}
{% asset_img 'constructor.svg' 'Imagem ilustrativa representando um construtor como um trabalhador da construção civil criando um objeto.' %}
{% endfigure %}

O operador `new` também altera o comportamento de retorno implícito da função. Em uma função, quando não há um `return` explícito no código da função, o retorno é `undefined`. Porém, se a invocação da função é precedida pelo operador `new`,  então a função retorna implicitamente o próprio contexto da função, que nesse caso é novo objeto criado anteriormente pelo próprio `new`.

Utilizando o mesmo exemplo anterior, vamos utilizar o operador `new` em nossos construtores que também foram modificados para utilizar das características ele aplica na função. Veja a seguir:

{% simplecode js %}
``` js
function Person( fullname, birthDate ) {
  this.fullname = fullname || '';
  this.birthDate = birthDate || null;
  this.getAge = function() {
    const today = new Date(),
          age = today.getFullYear() - this.birthDate.getFullYear(),
          month = today.getMonth() - this.birthDate.getMonth(),
          isBeforeBirthDay = month < 0 ||
                             ( month === 0 &&
                               today.getDate() < this.birthDate.getDate() );
    if ( isBeforeBirthDay ) {
        return age - 1;
    }
    return age;
  };
  this.getFirstName = function() {
    return this.fullname.split(' ')[ 0 ];
  };
  this.toString = function() {
    return '{' + this.fullname + '}';
  };
};
```
{% endsimplecode %}

Agora, quando queremos criar nosso objetos, é obrigatória a utilização do operador `new` toda vez que chamamos a função. No entanto, não precisamos mais passar um objeto para o construtor, porque o `new` implicitamente faz isso para nós. Veja:

{% simplecode js %}
``` js
const pedremildo = new Person( 'Pedremildo Escavadeira', new Date( 1990, 1, 5 ) );
const testerson = new Person( 'Testerson Trunk', new Date( 1987, 8, 23 ) );

console.log( testerson.getFirstName() );  // → Pedremildo
console.log( pedremildo.getAge() );       // → 28
```
{% endsimplecode %}

Quando utilizamos construtores simples,  os métodos definidos dentro dos objetos são duplicados para cada instância criada. Ou seja, cada objeto criado pelo construtor `Person` possui uma cópia idêntica da função `getAge`, por exemplo. Podemos verificar esse comportamento comparando a igualdade entre as referências dos métodos de diferentes objetos:

{% simplecode js %}
``` js
console.log( testerson.getDate === pedremildo.getAge ); // → false
```
{% endsimplecode %}

Essa cópia de funções idênticas em vários objetos pode acarretar em um problema de desempenho quando estamos trabalhando com muitos objetos criados ao mesmo tempo.


---
## Herança

Com construtores simples, podemos alcançar a herança em nossos objetos ao utilizar uma chamada ao construtor — normalmente chamado de “pai” —, do qual se quer herdar as características com o auxílio do método `apply`. O `apply` é um método pertencente a todo objeto função, que aplica a função de acordo com o contexto dado e os argumentos passados. Recebe dois parâmetros: o primeiro, um objeto, indica contexto em que a função deve ser aplicada (ou seja, para onde a referência `this` dentro do método pai deve ser apontada), e o segundo é um *array* que indica os argumentos que devem ser passados a função para ser executada.

{% figure 'Quando utilizamos herança, as propriedades dos objetos pais são passadas aos seus filhos.' %}
{% asset_img 'inheritance.svg' 'Representação ilustrativa da herança como uma árvore genealógica entre os objetos.' %}
{% endfigure %}

De forma mais técnica, a herança feita pela utilização do `apply` copia todas as propriedades definidas pelo construtor pai e aplica no objeto gerado pelo construtor filho. Quando um filho quer reescrever uma propriedade herdada (seja ela um atributo ou um método), ele simplesmente substitui tal propriedade por um valor próprio.

Para exemplificar a herança, vamos supor que estamos desenvolvendo um jogo de simulação de cidades (ao melhor estilo *SimCity*, por exemplo). As construções de sua cidade possuem várias propriedades distintas, mas também possuem várias propriedades similares. É esse comportamento similar que se torna um bom candidato a ser elevando para um construtor mais abstrato que depois possa ser herdado pelas outras construções.

Em nossa modelagem, vamos seguir o diagrama ilustrado a seguir. Temos como pai um construtor genérico de construção, então temos residências. Também temos um construtor que representa um local de trabalho, e com isso suas especializações em instalações comerciais e industriais.

{% figure 'Diagrama que representa nosso modelo de construtores de objetos construções do jogo.' %}
{% asset_img 'building-model-1.svg' 'Diagrama mostrando as relações dos construtores de construções. Ao topo temos o Building; a partir dele herda-se Redidential e Working Building. A partir de Working Building herda-se Commercial e Industrial.' %}
{% endfigure %}

Utilizando os conceitos e os modelos vistos anteriormente, vamos primeiramente desenvolver nosso construtor de objetos que representa construções:

{% simplecode js %}
``` js
function Building( value, water, power ) {
  this.value = value;
  this.water = water;
  this.power = power;
  this.getValue = function() {
    return this.value;
  };
  this.getPowerConsumption = function() {
    return this.power;
  };
  this.getWaterConsumption = function() {
    return this.water;
  };
}
```
{% endsimplecode %}

Com o construtor `Building` concluído, podemos agora fazer nosso construtor de residências.

{% simplecode js %}
``` js
function Residential( value, water, power, size ) {
  Building.apply( this, [ value, water, power ]);
  this.size = size;
  this.residents = [];
  this.addResident = function( person ) {
    if ( this.residents.length <= this.size ) {
      this.residents.push( person );
    }
  };
}
```
{% endsimplecode %}

Agora já podemos construir objetos do tipo residências e colocar objetos pessoas para morar nelas. Veja no exemplo a seguir.

{% simplecode js %}
``` js
const chale = new Residential( 4095, 22, 120, 3 );
const sobrado = new Residential( 6144, 25, 150, 4 );
chale.addResident( pedremildo );
sobrado.addResident( testerson );

console.log( chale.getPowerConsumption() ); // → 120
console.log( sobrado.residents[ 0 ] );      // → {Testerson}
```
{% endsimplecode %}

Vamos agora ao desenvolvimento das construções de trabalho: comerciais e industriais. Como ambos os tipos de construções possuem a habilidade de “empregar” pessoas, vamos criar um construtor que abstraia esse comportamento e herdar essas características em outros construtores.

Veja no exemplo a seguir.

{% simplecode js %}
``` js
function WorkingBuilding( name, value, water, power, jobs ) {
  Building.apply( this, [ value, water, power ]);
  this.name = name;
  this.jobs = jobs;
  this.employees = [];
  this.addEmployee = function( person ) {
    if ( this.employees.length < this.jobs ) {
      this.employees.push( person );
    }
  };
}
```
{% endsimplecode %}

Agora vamos aos construtores de objetos que representam uma construção comercial e uma construção industrial.

{% simplecode js %}
``` js
function Commercial( name, value, water, power, jobs ) {
  WorkingBuilding.apply( this, [ name, value, water, power, jobs ]);
}

function Industrial( name, value, water, power, jobs, pollution ) {
  WorkingBuilding.apply( this, [ name, value, water, power, jobs ]);
  this.pollution = pollution;
}
```
{% endsimplecode %}

Com nossos construtores feitos, podemos agora criar os estabelecimentos comerciais e industriais, como também adicionar os empregados ligados a eles.

{% simplecode js %}
``` js
const com = new Commercial( 'Lojas Compras & Compras', 10240, 55, 320, 15 );
com.addEmployee( pedremildo );

const ind = new Industrial( 'AutoParts Central', 18432, 89, 450, 30, 1.2 );
ind.addEmployee( testerson );

console.log( ind.employees ); // → [ {Testerson} ]
console.log( com.name );      // → Lojas Compras & Compras
```
{% endsimplecode %}


### Herança Múltipla
A herança múltipla é possível em JavaScript quando utilizamos Construtores Simples. Nada impede que haja dois construtores diferentes sendo invocados com `apply` dentro de outro construto,r porém algumas considerações precisam ser levadas em conta.

Para exemplificar, vamos supor que agora criamos um construtor que represente construções que possuem várias residências ou quartos, tais como condomínios, apartamentos ou hotéis. Assim, poderemos criar condomínios residências com o construtor `Residential` já criado anteriormente. Nosso modelo então ficará como mostrado na figura a seguir.

{% figure 'Diagrama que representa nosso modelo de construtores de objetos construções do jogo, agora com herança múltipla.' %}
{% asset_img 'building-model-2.svg' 'Diagrama mostrando as relações dos construtores de construções. Ao topo temos o Building e Complex; a partir dele herda-se Redidential e Working Building. A partir de Working Building herda-se Commercial e Industrial. A partir de Redidential e Complex herda-se Condominium.' %}
{% endfigure %}

Primeiramente, desenvolvemos o construtor `Complex`, como vemos em seguida:

{% simplecode js %}
``` js
function Complex( spaces ) {
  this.spaces = new Array( spaces );
  this.occupy = function( spaceNumber, person ) {
    if ( spaceNumber < this.spaces.length ) {
      this.spaces[ spaceNumber ] = this.spaces[ spaceNumber ] || [];
      this.spaces[ spaceNumber ].push( person );
    }
  };
}
```
{% endsimplecode %}

Agora, vamos fazer um construtor de condomínio residencial que herde as características dos construtores `Residential` e `Complex`.

{% simplecode js %}
``` js
function Condominium( value, water, power, size, spaces ) {
  Residential.apply( this, [ value, water, power, size ]);
  Complex.apply( this, [ spaces ]);
}
```
{% endsimplecode %}

Agora podemos criar nossos objetos de condomínios residenciais utilizando o `Condominium`. Veja a seguir:

{% simplecode js %}
``` js
const condo = new Condominium( 20480, 130, 189, 3, 16 );
condo.addResident( pedremildo );
condo.addResident( testerson );

condo.occupy( 3, pedremildo );
condo.occupy( 3, testerson );

console.log( condo.residents );   // → [ {Pedremildo}, {Testerson} ]
console.log( condo.spaces[ 3 ] ); // → [ {Pedremildo}, {Testerson} ]
```
{% endsimplecode %}

Veja que, por exemplo, você também poderia utilizar o construtor `Complex` juntamente com  o construtor `Commercial` para a construção de objetos que representem hotéis e pousadas. Sinta-se livre para testar.

No entanto, antes de usar indiscriminadamente a herança múltipla em JavaScript, é importante ponderar sobre os seguintes pontos:

* O JavaScript não sofre do **[Problema do Diamante](https://en.wikipedia.org/wiki/Multiple_inheritance#The_diamond_problem)**. Se diferentes construtores possuírem conflitos, ou seja, atributos ou métodos possuírem o mesmo nome, somente permanecerá a propriedade do último construtor aplicado. Esse comportamento pode levar a estados difíceis de serem previstos e a bugs difíceis de serem encontrados.
* Se diferentes construtores possuírem um mesmo construtor pai, esse construtor pai será chamado duas vezes — o que é considerado um problema de desempenho e de má utilização da memória.


---
## Encapsulamento
Como já visto, objetos do JavaScript possuem todos os seus atributos públicos, ou seja, o estado do objeto pode ser alterado pelo mundo externo sem qualquer controle do próprio objeto. Para garantir o encapsulamento dos dados de um objeto utilizamos o nosso querido *closure* das funções.

{% figure 'Objetos encapsulados são opacos ao mundo exterior e não podem ter suas propriedades modificadas se não por meio da interface do objeto.' %}
{% asset_img 'encapsulation.svg' 'Representação ilustrativa do encapsulamento como um objeto trancado com um cadeado.' %}
{% endfigure %}

Para lembrarmos rapidamente: quando variáveis de um escopo são utilizadas por funções mais internas, essas variáveis são alocadas em uma área específica da memória chamada *closure*. Todas as funções que foram criadas nesse escopo são ligadas a esse *closure* e por isso podem acessar as variáveis mesmo que o escopo tenha deixado de existir no momento que essas funções são executadas. Quando as variáveis estão alocadas em um *closure*, não há forma de acessá-las exceto pelas próprias funções que estão ligadas nesse *closure*. É utilizando esse conceito que adaptamos nossos construtores para conseguirmos o encapsulamento de dados. Caso você queira entender mais profundamente o conceito de *closure*, recomendo dar uma olhada nesse [texto já publicado no blog](http://maxroecker.github.io/blog/javascript-intermediario-4/).

Para exemplificar, vamos rever nossos construtores dos exemplos anteriores. Veja por exemplo nosso construtor `Residential` que possui o atributo `residents` público. Um programador pode quebrar a regra de negócio do modelo em atribuir mais população à residência do que o permitido pelo atributo `size` dela. Para isso, podemos encapsular a propriedade `residents` na *closure* do construtor e fornecer um método para retornar uma cópia dela. Veja:

{% simplecode js %}
``` js
function Residential( value, water, power, size ) {
  const residents = [];
  Building.apply( this, [ value, water, power ]);
  this.size = size;
  this.addResident = function( person ) {
    if ( residents.length <= this.size ) {
      residents.push( person );
    }
  };
  this.getResidents = function() {
    return residents.slice();
  };
}
```
{% endsimplecode %}

Agora, só conseguimos acessar o valor de `residents` através do método `getResidents`. Veja a seguir um exemplo:

{% simplecode js %}
``` js
const sobrado = new Residential( 6144, 25, 150, 4 );
sobrado.addResident( pedremildo );
sobrado.addResident( testerson );

console.log( sobrado.getResidents() );  // → [ {Testerson}, {Pedremildo} ]
console.log( sobrado.residents );       // → undefined

```
{% endsimplecode %}

Note que mesmo que atribuíssemos uma propriedade ao objeto — [uma vez que os objetos em JavaScript suportam adição dinâmica de propriedades](http://maxroecker.github.io/blog/javascript-basico-5/#verificando-a-existência-de-uma-propriedade) — nossos métodos iriam ficar protegidos porque não estão referenciando a propriedade através do `this`, mas sim a variável que está alocada no *closure*. Veja no código a seguir:

{% simplecode js %}
``` js
console.log( sobrado.residents );       // → undefined
sobrado.residents = [];
console.log( sobrado.getResidents() );  // → [ {Testerson}, {Pedremildo} ]
```
{% endsimplecode %}

Em JavaScript não há o conceito de atributos protegidos — como em Java quando são anotados com `protected` — e por isso , caso tenhamos herança, atributos privados dos pais também não podem ser acessados por filhos. Lembre-se, os atributos privados de um objeto pertencem somente ao objeto e é ele quem dita como o acesso a esse atributo deve ocorrer.


---
## Polimorfismo

Em JavaScript o polimorfismo pode ser realizado sem muitos problemas, uma vez que funções são objetos, objetos são mutáveis e variáveis não possuem tipos definidos. Não há um contrato pré-definido entre as variáveis — como é o caso das interfaces em Java — e por isso fica a cargo do codificador utilizar a mesma interface nos objetos em que deve-se estabelecer um polimorfismo.

{% figure 'O polimorfismo permite que diferentes objetos que implementem uma mesma interface possam ser tratados de forma indistinguível.' %}
{% asset_img 'polymorphism.svg' 'Representação ilustrativa do polimorfismo como uma situação onde um objeto ordene os objetos a falarem e todos respondem a sua maneira.' %}
{% endfigure %}

Vamos exemplificar modificando nossos construtores `Commercial` e `Industrial` para que possuam o método `getPowerConsumption` que se adeque a realidade de cada um. Em nosso modelo, um edifício comercial possui um consumo que representa 20% de sua capacidade total e o restante (80%) é calculado com base no número de empregados que edifício emprega Dessa forma, nosso construtor `Commercial` poderia ter o seguinte código:

{% simplecode js %}
``` js
function Commercial( name, value, water, power, jobs ) {
  WorkingBuilding.apply( this, [ name, value, water, power, jobs ]);
  this.getPowerConsumption = function() {
    const fixedPower = this.power * 0.2,
          variablePower = this.power * 0.8,
          powerPerEmployee = variablePower / this.jobs,
          actualPower = powerPerEmployee * this.employees.length;
    return fixedPower + actualPower;
  };
}
```
{% endsimplecode %}

Já nossos edifícios industriais possuem um consumo fixo de 30% de sua capacidade total. O restante (70%) depende exclusivamente do índice de poluição que a construção emite. Só então é calculado o índice de consumo para cada empregado que a construção possui. Logo, o construtor pode ser parecido com o código a seguir:

{% simplecode js %}
``` js
function Industrial( name, value, water, power, jobs, pollution ) {
  WorkingBuilding.apply( this, [ name, value, water, power, jobs ]);
  this.pollution = pollution;
  this.getPowerConsumption = function() {
    const fixedPower = this.power * 0.3,
          variablePower = this.power * 0.7,
          pollutionTreatmentPower = variablePower * this.pollution;
          powerPerEmployee = ( variablePower - pollutionTreatmentPower ) / this.jobs,
          actualConsumption = powerPerEmployee * this.employees.length;
    return fixedPower + pollutionTreatmentPower + actualConsumption;
  };
}
```
{% endsimplecode %}

Para que polimorfismo seja feito, a entrada e saída da função deve ser o mesmo. Nesse exemplo, o nosso método não possui entrada e possui uma saída numérica. Como a interface é a mesma, podemos agora atribuir esses objetos em uma lista e chamar seus métodos independentemente de como sejam implementados em seu interior. Veja a seguir:

Criando as instâncias e executando a função `getPowerConsumption`, temos o resultado esperado. Não é necessário se preocupar com o que o objeto é nem como ele implementa o método. É somente preciso garantir que o método seja implementado com a interface definida:

{% simplecode js %}
``` js
const com = new Commercial( 'Lojas Compras & Compras', 10240, 55, 320, 15 );
com.addEmployee( pedremildo );

const ind = new Industrial( 'AutoParts Central', 18432, 89, 450, 30, 0.2 );
ind.addEmployee( testerson );

const workingBuildings = [ com, ind ];

for ( var i = 0; i < workingBuildings.length; i++ ) {
  var build = workingBuildings[ i ];
  console.log(
    'Construção: %s \n— Consumo: %d / %d',
    build.name,
    build.getPowerConsumption(),
    build.power
  );
}

```
{% endsimplecode %}

Um problema que podemos ver é que se o programador esquecer de implementar o método em um dos construtores, teremos então um erro ao executarmos uma função que não existe no objeto.


---
## Outras características

### Propriedades estáticas

Propriedades estáticas são atributos/métodos que pertencem ao construtor e não a cada um dos objetos construídos por ele. Propriedades estáticas dos construtores podem ser criadas atribuindo propriedades aos próprios construtores. Propriedades estáticas também são sempre públicas, por isso, é preciso tomar cuidado com sua utilização.

Vamos exemplificar a utilização de propriedades estáticas no construtor `Building` para armazenar a quantidade de objetos já criados por ele ou seus “filhos”.

{% simplecode js %}
``` js
function Building( value, water, power ) {
  Building.count = ++;
  this.value = value;
  this.water = water;
  this.power = power;
  // ...
}

Building.count = 0;
```
{% endsimplecode %}

Agora, vamos instanciar algumas variáveis e verificar o resultado.

{% simplecode js %}
``` js
const sobrado = new Residential( 6144, 25, 150, 4 );
const com = new Commercial( 'Lojas Compras & Compras', 10240, 55, 320, 15 );
const ind = new Industrial( 'AutoParts Central', 18432, 89, 450, 30, 0.2 );

console.log( Building.count ); // → 3
```
{% endsimplecode %}


### Verificar se um objeto é instância de um construtor

Com construtores simples, há a possibilidade de utilização do operador `instanceof`, que testa se um objeto possui em seu protótipo o passado à direita. Veja por exemplo no código a seguir:

{% simplecode js %}
``` js
const com = new Commercial( 'Lojas Compras & Compras', 10240, 55, 320, 15 );

console.log( com instanceof Commercial ); // → true
console.log( com instanceof Industrial ); // → false
console.log( com instanceof Building );   // → false
```
{% endsimplecode %}

Porém, como você não faz herança com a utilização de protótipos, apesar de um objeto construído por `Commercial` também é construído por um `Building`, mas o operador `instanceOf` não consegue definir que objeto é instância de `Building`.


---
## Resumo

{% asset_img 'scale.svg' 'Ilustração de uma balança.' %}

O Padrão Construtor Simples possui várias vantagens, tais como:

* Herança feita de modo fácil, uma vez que basta aplicar os construtores os quais se quer herdar as propriedades;
Possibilidade de utilização de Herança múltipla;
* Encapsulamento fácil, uma vez que utilizar o *closure* da função construtora permite a criação de escopos privados;
* Polimorfismo simples, sendo possível utilizar a herança múltipla uma vez que desejamos garantir que os objetos tenham determinado método/atributo;
* Solução simples e enxuta para a programação orientada a objetos.

Porém, alguns pontos devem ser considerados quando trabalhos com Construtores Simples:

* Todos os objetos construídos por construtores possuem cópias de funções idênticas, mas que ocupam espaço distintos na memória, o que pode levar a um problema de desempenho quando muitos objetos são criados ao mesmo tempo;
* Herança sempre copia todqas as propriedades — atributos e funções — e  as aplica no contexto do construtor herdeiro. A herança também é toda agrupada na chamada ao construtor pai, o que pode trazer inflexibilidade para a arquitetura do seu software;
* A determinação de tipos é limitada somente ao construtor primário, não sendo possível determinar se um objeto herdou de outro(s) construtor(es) algumas propriedades com a utilização do `instanceOf`.


---
## Conclusões

Hoje compreendemos sobre Construtores Simples, um padrão muito utilizado no lado cliente de aplicações web, pois oferece as principais características da programação orientada a objetos — uma vez que no *front-end* o número de instanciação de objetos não costuma ser grande e por isso o problema de desempenho não provoca grandes estragos. Porém, se o número de objetos começa a crescer, esse padrão pode se tornar proibitivo.

Por hoje é só, pessoal. No próximo post da série vamos compreender os Construtores com Protótipos, uma solução encontrada para minimizar os efeitos de desempenho que os Construtores Simples possuem.

Até a próxima!
