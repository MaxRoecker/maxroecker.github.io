---
title: 'JavaScript Básico #5: Objetos'
description: 'Aprenda o funcionamento e declaração de Objetos em JavaScript, uma estrutura de dados essencial para a linguagem.'
cover:
  path: cover.jpg
  title: Tetrahemihexahedron
  src: 'https://www.flickr.com/photos/21649179@N00/4282044498'
featured: false
date: 2015-10-15 17:03:34
tags:
  - javascript
---

{% blockquote   %}
**propriedade:** 1. Qualidade de próprio. 2. Aquilo que é próprio de alguma coisa; o que a distingue particularmente de outra do mesmo gênero
{% endblockquote %}

Anteriormente, aprendemos como controlar a execução do fluxo do código JavaScript através de declarações. Também vimos como atribuir valores primitivos a variáveis e como manipulá-los no código. Com isso, é possível codificar qualquer algoritmo em JavaScript. Entretanto, ainda não arranhamos a superfície das funcionalidades que a linguagem oferece.

## Recapitulando e acrescentando
Vamos recapitular um pouco sobre valores: em JavaScript há os valores primitivos e os objetos. Todo valor em JavaScript possui **propriedades** ─ com exceção dos valores que indicam um não-valor: (`null` e `undefined`) ─ e que podem ser acessados por uma **chave**. Essas propriedades são também valores e podem ser acessados através do operador `.` da seguinte forma: `valor.chave`.

Os únicos valores que não permitem o acesso através desse operador são os valores numéricos declarados literalmente, pois o ponto indica a parte decimal do número. Porém, se os valores numéricos forem atribuídos à uma variável, você pode acessar com o `.` tranquilamente. Veja alguns exemplos:

{% simplecode js %}
``` js
"javascript".lenght;        // → 10
"javascript".toUpperCase(); // → "JAVASCRIPT"

var a = 2;
a.toExponential(); // → "2e+0"
a.toString();      // → "2"
```
{% endsimplecode %}

Entendeu? A propriedade `lenght` armazena o comprimento da string, ou seja, a quantidade de caracteres que essa string possui. Mas por que a propriedade `toUpperCase` e `toExponential` foi seguida de um par de parênteses? Isso acontece pois essa propriedade é uma função, e para que a função seja aplicada, ou seja, executada, é preciso utilizar a declaração `()`. Em JavaScript, funções também são objetos, e devido a isso podem ser atribuídas em propriedades. Muitas vezes funções atribuídas como propriedades são chamadas de **métodos**. Tente retirar os parênteses para ver o resultado.

{% simplecode js %}
``` js
console.log( "javascript".toUpperCase ); // → function toUpperCase()
```
{% endsimplecode %}

Nesse caso o console está exibindo o rótulo da função, mas não está aplicando a função. Vamos compreender mais sobre o comportamento das funções futuramente.


## Objetos

Os valores primitivos são os blocos de construção primários onde estruturas de dados são construídas. Mas para desenvolver soluções para problemas complexos, usar apenas esses blocos primários podem tornar esse processo muito difícil. Vamos entender um pouco de uma estrutura de dado essencial para o JavaScript, os **Objetos**.

Os Objetos são valores que permitem o agrupamento de outros valores arbitrários através de uma chave. Ou seja, são basicamente um conjunto de propriedades, onde cada propriedade é um par de chave-valor. Em sua essência, objetos são [arranjos associativos](https://en.wikipedia.org/wiki/Associative_array)  ─ também chamados de mapas, tabelas de símbolos ou dicionários ─,  onde cada chave é única dentro da estrutura e é atribuída a ela somente um valor e implementados como uma [tabela hash](https://en.wikipedia.org/wiki/Hash_table).

{% figure "Um objeto é um conjuntos de vários pares de chave-valor. Cada chave leva a um único valor e é única no objeto. Cada chave é como se fosse um “braço” que aponta para uma região da memória onde o valor está armazenado." %}
{% asset_img 7-object.svg [Representação metafórica de um objeto como um polvo representando onde cada braço segura um valor] %}
{% endfigure %}


### Declarando objetos
Em JavaScript, os objetos normalmente são declarados através do literal objeto. Sua sintaxe é dada como:

{% simplecode  %}
```
{
  chave: valor,
  chave: valor,
  ...
  chave: valor
}
```
{% endsimplecode %}

Pode-se perceber que os pares de chave-valor do objeto são separados por vírgulas. A última propriedade não possui uma vírgula posterior, mas em versões mais novas da *ECMAScript*, essa regra não precisa ser rigidamente seguida. Uma chave segue as mesmas regras de um identificador de variável. Veja o exemplo:

{% simplecode js %}
``` js
var passaro = {
  nome: "Corruíra",
  nomeCientifico: "Troglodytes musculus",
  descrever: function() {
    return this.nome
      + " ("
      + this.nomeCientifico
      + ") é um pássaro comum na América do Sul";
  }
};
```
{% endsimplecode %}

### Acessando as propriedades
Como qualquer outro valor, você pode acessar as propriedades de um objeto com o operador `.`. Quando temos uma função como propriedade do objeto, podemos referenciar ao próprio objeto através da declaração `this`, assim podendo então acessar suas propriedades com o `.` normalmente. Veja a função `descrever` do exemplo anterior e o seu comportamento quando é executada abaixo:

{% simplecode js %}
``` js
console.log(passaro.nome);        // → Corruíra
console.log(passaro.descrever()); // → Corruíra (Troglodytes musculus) é um pássaro comum na América do Sul
```
{% endsimplecode %}

Você também pode atribuir valores para as propriedades da mesma forma como feito com variáveis, através dos operadores de atribuição `=` e seus derivados.

{% simplecode js %}
``` js
passaro.nome = 'Bem-te-vi';
passaro.nomeCientifico = 'Pitangus sulphuratus';
console.log(passaro.descrever()); // → Bem-te-vi (Pitangus sulphuratus) é um pássaro comum na América do Sul
```
{% endsimplecode %}

É possível também utilizar strings como chave de objetos, que permitem que as chaves não precisem seguir a regra de identificadores de variáveis. São expressas como no exemplo a seguir:

{% simplecode js %}
``` js
var passaro = {
  'nome': 'Trinca-ferro',
  'nome cientifico': 'Saltator similis',
  'descrever': function(){
    return this.nome
      + ' ('
      + this.especie
      + ') é um pássaro comum na América do Sul';
  }
};
```
{% endsimplecode %}

Para acessar o valor atribuído à uma chave string, utiliza-se o operador de acesso ao arranjo `[]`. Veja no código a seguir:

{% simplecode js %}
``` js
console.log(passaro['nome']);             // → Trinca-ferro
console.log(passaro['nome cientifico']);  // → Saltator similis
console.log(passaro['descrever']());      // → Trinca-ferro (Saltator similis) é um pássaro comum na América do Sul

passaro['nome'] = 'Tico-tico';
passaro['nome cientifico'] = 'Zonotrichia capensis';
console.log(passaro['descrever']());      // → Tico-tico (Zonotrichia capensis) é um pássaro comum na América do Sul
```
{% endsimplecode %}

Note que mesmo que o valor retornado seja uma função, ainda assim é necessário utilizar `()` para que a função seja executada. É importante observar que uma chave declarada como string ou como identificador de variável é considerada a mesma se possuir os mesmos caracteres. Veja:

{% simplecode js %}
``` js
var chave = 'nome';
passaro.nome = 'João-de-barro';
passaro[chave + ' ' + 'cientifico'] = 'Furnarius rufus';

console.log(passaro[chave]);      // → João-de-barro
console.log(passaro.descrever()); // → João-de-barro (Furnarius rufus) é um pássaro comum na América do Sul

```
{% endsimplecode %}


### Verificando a existência de uma propriedade
Quando lemos uma propriedade que não existe no objeto, o valor `undefined` é retornado. Mas se atribuímos um valor para uma propriedade inexistente, essa propriedade é criada dentro do objeto. Podemos verificar se uma propriedade existe no objeto através do operador `in`, que retorna `true` ou  `false` caso a propriedade exista no objeto ou não.

{% simplecode js %}
``` js
var chave = 'cor';
console.log(passaro[chave]);    // → undefined
console.log(chave in passaro);  // → false

passaro.cor = 'Amarelo';
console.log(chave in passaro);  // → true
console.log(passaro[chave]);    // → Amarelo
```
{% endsimplecode %}


###Removendo propriedades
O operador `delete` remove a propriedade do objeto. Veja:

{% simplecode js %}
``` js
console.log('descrever' in passaro); // → true
delete passaro.descrever;
console.log('descrever' in passaro); // → false
```
{% endsimplecode %}

Nos motores de execução modernos de JavaScript, mudar o número de propriedades de um objeto é muito mais custoso em termos computacionais do que atribuir novos valores para uma propriedade. Muitas vezes atribuir o valor da propriedade para `null` pode resolver o problema, a não ser que seja necessário utilizar o operador `in`.


### Iterando sobre as propriedades
É possível também iterar em todas as chaves de um objeto, através da declaração `for in`, que possui a seguinte sintaxe:

{% simplecode %}
```
for (chave in objeto)
  declaração;
```
{% endsimplecode %}

Onde a *chave* é uma variável que assume o nome de uma das propriedades em cada iteração e o *objeto* é onde as propriedades serão iteradas. A declaração `for in` itera sobre as propriedades enumeráveis de um objeto em uma ordem arbitrária e também na sua cadeia de protótipos. Seguindo os mesmos exemplos anteriores, vamos listar o nome das propriedades e o seu tipo em um objeto declarado.

{% simplecode js %}
``` js
var passaro = {
  'nome': 'Patativa',
  'nome cientifico': 'Sporophila leucoptera',
  'descrever': function() {
    return this.nome
      + ' ('
      + this.especie
      + ') é um pássaro comum na América do Sul';
  }
};

for ( var chave in passaro ){
  console.log( 'Propriedade: "%s" - Tipo: "%s"', chave, typeof passaro[ chave ]);
}
```
{% endsimplecode %}

---
## Diferenças entre valores primitivos e objetos
O Javascript possui uma distinção arbitrária entre os valores.

* Valores primitivos são: booleanos, números, strings, símbolos e `null` e `undefined` declarados literalmente;
* Qualquer outro valor é um objeto.

A grande diferença entre os valores primitivos e objetos é o modo como eles são comparados e a mutabilidade de seus conteúdos.


###Comparação
Os valores primitivos são comparados através do seu “conteúdo”, ou seja, se dois valores primitivos tem o mesmo conteúdo, eles são iguais.

{% simplecode js %}
``` js
var tres = 3;
3 == 4;         // → false
tres == 3;      // → true
'xyz' == 'xyz'  // → true
```
{% endsimplecode %}

Já objetos são comparados através da sua referência, cada valor tem sua identidade única e é somente igual a si mesmo. Objetos com o mesmo conteúdo não são considerados iguais.

{% simplecode js %}
``` js
var obj1 = {'prop':1};
var obj2 = {'prop':1};
obj1 == obj2 // → false
obj1 == obj1 // → true
obj1 = obj2; // Atribuímos a referência de obj2 em obj1
obj1 == obj2 // → true
```
{% endsimplecode %}


### Mutabilidade
Valores primitivos são considerados **imutáveis**, ou seja, é impossível mudar uma propriedade ou o seu valor para esses tipos de dados. Toda vez que você os manipula, na verdade você gera novos valores a partir dos antigos, mesmo que sejam idênticos.

{% simplecode js %}
``` js
var a = 'string';
console.log(a.lenght); // → 6
a.lenght = 9;
console.log(a.lenght); // → 6
```
{% endsimplecode %}

Por outro lado, objetos são **mutáveis**. Alterar, adicionar ou remover uma propriedade de um objeto não gera um novo objeto a partir do antigo, é o mesmo objeto modificado. Ou seja, quando atribuímos objetos para variáveis ou para propriedades de objetos, na verdade estamos indicando somente uma referência para o objeto. Se duas referências diferentes direcionam a um mesmo valor, alterar o valor reflete em mudanças para todos os objetos que “apontam” para ele. Veja:

{% simplecode js %}
``` js
var passaro = {nome: 'Patativa'};
var ave = passaro;
console.log(ave.nome);      // → Patativa
ave.nome = 'Patativa-do-campo';
console.log(passaro.nome);  // → Patativa-do-campo
```
{% endsimplecode %}

---
## Conclusão
Objetos fornecem para o desenvolvedor modos de agrupar vários valores em um só conjunto. Conceitualmente, podemos colocar todos os valores que possuem alguma relação em um mesmo conjunto ao invés de deixá-los espalhados pelo código. Objetos são a estrutura de dados básica do JavaScript, quase todo elemento dentro da linguagem é um objeto. Até mesmo valores primitivos possuem seus análogos em objetos, que serão vistos mais em artigos futuros.

Apesar de possuírem o mesmo nome, Objetos não devem ser confundidos com o conceito de objeto em programação orientada a objetos (OO), que é definido como [instância de uma classe](https://pt.wikipedia.org/wiki/Objeto_(ci%C3%AAncia_da_computa%C3%A7%C3%A3o)). Como dito anteriormente, Objetos em Javascript são arranjos associativos dinâmicos.

{% blockquote Donald Knuth  %}
As maioria das pessoas acredita que a ciência da computação é uma arte para gênios, mas a realidade é o oposto, são somente muitas pessoas desenvolvendo coisas uma sobre as outras, como um muro de pequenas pedras.
{% endblockquote %}
