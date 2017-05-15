---
title: 'JavaScript Orientado a Objetos #1: Introdução'
description: 'Compreenda os principais conceitos da Orientação a Objetos e como podemos alcançá-los no JavaScript'
cover:
  path: cover.jpg
  title: 'Polyhedron models'
  src: 'https://www.flickr.com/photos/fdecomite/3275300224/in/album-72157613498998540/'
featured: true
tags:
  - javascript
  - object-oriented programming
date: 2016-04-15 08:49:56
---

> **{% raw %}pa.ra.dig.ma{% endraw %}**: [substantivo masculino] (1) um exemplo que serve como modelo; padrão.

Hoje vamos iniciar uma nova série de posts sobre a linguagem JavaScript com foco na programação orientada a objetos. Nessa série, pretende-se que você alcance e compreenda conceitos importantes como o encapsulamento de dados, herança e polimorfismo em seu código. Vamos também entender mais a fundo a estrutura dos objetos e compreender o o estilo de programação baseado em protótipos do JavaScript.

---
## Introdução rápida à Programação Orientada a Objetos

A Programação Orientada a Objetos (POO) refere-se ao uso de componentes auto-contidos de código para o desenvolvimento de aplicações, chamados **Objetos**. Os Objetos foram desenvolvidos ao longo dos anos para resolver um problema da complexidade que a Programação Estruturada vinha carregando: a falta de encapsulamento e de modularização do código. O conceito principal de objetos é: separar um problema complexo em pequenos problemas isolados e fornecer um protocolo ao mundo exterior pelo qual o objeto pode ser utilizado.

{% figure "Um objeto esconde do mundo externo sua complexidade interna e fornece um protocolo para ser utilizado." %}
{% asset_img 'object.svg' 'Representação ilustrativa de um objeto escondendo um interior complexo e por fora exibindo somente uma interface simples.' %}
{% endfigure %}

O grande triunfo da Orientação á Objetos é que os dados e as funções que manipulam esses dados estão agregados em uma mesma estrutura e podem proteger-se do acesso e da manipulação direta do "mundo externo". Nos objetos, os dados  ficam em um escopo interno do objeto e são chamados de **Atributos**. Os atributos armazenam o **Estado** do objeto, ou seja, o conjunto de valores que o objeto contém. Toda vez que o valor de algum atributo é alterado, o objeto muda de estado. Por sua vez, para que o um objeto possa ser usado pelo mundo externo, ele deve fornecer um protocolo. Protocolos de acesso à objetos são, em sua maioria, composta por **Métodos**. Métodos são propriedades aplicáveis — ou seja, funções — do objeto e que podem ser executadas para alterar ou ler o estado de um objeto. Toda vez que um método é executado, é dito que o foi enviada uma “mensagem” ao objeto.

Construir aplicações com Objetos permite que os desenvolvedores adotem algumas técnicas valiosas:

* **Herança**: A Herança é a capacidade de objetos poderem "herdar" características de outros objetos, ou seja, copiar os métodos e atributos de outro objeto.
* **Encasulamento**: o Encasulamento de dados acontece quando os objetos "escondem" suas propriedades do mundo externo ao restringir o acesso a eles. Em um primeiro momento, podemos achar que a falta de encapsulamento não faz falta quando um “programador sabe o que está fazendo”, mas o problema começa a aparecer quando ao alterarmos um atributo e não estamos cientes de como esse atributo pode afetar o comportamento do objeto em outros momentos, fazendo que com bugs com difícil localização apareçam.
* **Polimorfismo**: O Polimorfismo pode ser definido rapidamente como a habilidade de chamar um mesmo método em diferentes objetos e cada um deles responder “em seu próprio modo”. Quando dizemos que um conjunto de objetos é polimórfico, queremos dizer que os objetos desse conjunto possuem interfaces idênticas — ou seja, aceitam as mesmas entradas e proporcionam a mesma saída — mas sua implementação interna pode ser drasticamente diferente.

A Programação Orientada a Objetos é destinada a promover uma maior flexibilidade e facilidade de manutenção da aplicação e é muito popular em softwares de grande escala. Atualmente, muitas linguagens populares — como Java, C++, Python, Ruby, PHP entre outras — permitem programação orientada a objetos, e o JavaScript também está incluso nesse grupo. Entretanto, o JavaScript possui algumas peculiaridades na Orientação a Objetos que em um primeiro momento podem ser estranhas para a grande maioria dos desenvolvedores acostumados com outras linguagens.

---
## Revisando os Objetos em JavaScript

A grande maioria das linguagens que utilizam Orientação a Objetos se baseiam em **Classes**. Uma Classe é um "modelo" ou um  "[blueprint](https://pt.wikipedia.org/wiki/Blueprint)" para a criação de objetos. É responsabilidade da classe definir os atributos e a interface dos objetos por ela criados. Objetos em uma linguagem baseada em classes são **instâncias das classes**.

{% figure "Classes definem o comportamento de objetos e servem como modelo para a sua instanciação" %}
{% asset_img object-class.svg 'Representação ilustrativa de uma classe como um blueprint de um objeto.' %}
{% endfigure %}

Em Javascript, os objetos não são instâncias de classes. Como já vimos em [posts anteriores](http://maxroecker.github.io/blog/javascript-basico-5/), um objeto é uma estrutura de dados básica da linguagem que se assemelha a uma [tabela *hash*](https://en.wikipedia.org/wiki/Associative_array). Podemos definir um objeto, seus atributos e seus métodos com o literal {%c "{ }"%}. Veja:

{% simplecode js %}
``` js
const pessoa = {
  name: 'Pedro',
  email: 'pedro@email.com',
  getUsername: function () {
    return this.email.split('@')[0]
  }
}

console.log(pessoa[ 'name' ])      // → Pedro
console.log(pessoa.getUsername())  // → pedro
pessoa.email = 'joao@exemplo.com'
console.log(pessoa.getUsername())  // → joao
```
{% endsimplecode %}

Podemos acessar as propriedades de um objeto através do operador {%c "key"%} ou através do operador {%c "[key]"%}, onde {%c "key"%} é o nome da propriedade. A palavra {%c "this"%}, quando utilizada em um objeto, referencia o próprio objeto, dessa forma podemos utilizar o atributo {%c "email"%} do objeto criado anteriormente dentro do método {%c "getUsername"%}.

Entretanto, objetos literais do JavaScript não possuem o conceito de encapsulamento como pregado pela Orientação a Objeto. Todos os atributos são acessíveis e visíveis pelo lado de fora do objeto.

---
## Protótipos

[Como visto anteriormente](http://maxroecker.github.io/blog/javascript-intermediario-6/), o JavaScript não possui Orientação a Objetos baseado em Classes (OOC). Na verdade, a linguagem implementa outro “estilo” de programação orientada a objetos, a **Orientação a Objetos baseada em Protótipos (OOP)**.

Protótipos são, de forma bem simples, objetos que servem de "reserva" para outro objeto. Dessa forma, quando buscamos uma propriedade em um objeto e ela não está presente nele, a máquina virtual vai até o protótipo desse objeto buscar essa propriedade. Caso o resultado seja negativo novamente, busca-se no protótipo do protótipo e assim por diante até que um objeto não tenha prototótipo ou a propriedade seja encontrada.

{% figure 'As referências de objetos para objetos por meio de protótipos formam uma Cadeia de Protótipos' %}
![Representação ilustrativa da cadeia protótipos, onde cada objeto aponta para outro objeto por meio de uma referência](http://maxroecker.github.io/blog/javascript-intermediario-6/prototype-chain.svg)
{% endfigure %}

Compreender como protótipos funcionam é essencial para compreender como programar em JavaScript orientado a objetos. Caso você queira se saber mais sobre o que são protótipos de objetos, recomendo a leitura [desse texto](http://maxroecker.github.io/blog/javascript-intermediario-6/) onde descrevo com mais detalhes o comportamento de protótipos e suas principais características.

---
## Orientação a Objetos em JavaScript

O JavaScript é uma linguagem muito flexível e permite que os desenvolvedores tenham liberdade para construir diversas soluções para problemas e objetivos que queiram alcançar. Quando estamos programando em um paradigma orientado a objetos  isso não é diferente. Há múltiplas maneiras e padrões para se programar orientado a objetos dentro da linguagem.

Cada técnica possui sua vantagem e sua desvantagem característica, e essa flexibilidade permite que o desenvolvedor escolha a qual é a solução mais adequada ao seu problema. Em alguns casos há técnicas que se abdicam até de seguir fielmente todos os conceitos pregados pela programação orientada a objetos para que possam ter mais desempenho, por exemplo.

Essa série de posts pretende passar ao leitor alguns conceitos e técnicas utilizadas em JavaScript para os programas garantam as principais características da Programação Orientada a Objetos: herança, encapsulamento e polimorfismo. E justamente por isso iremos nos focar em três padrões utilizados quando queremos desenvolver aplicações em JavaScript orientado a objetos: o Padrão Construtor Simples, o Padrão Construtor com Protótipos e o Padrão Fábrica.

Por hoje é só, pessoal. Mas fique ligado, no próximo post vamos nos aprofundar no Padrão Construtor Simples. Até lá!
