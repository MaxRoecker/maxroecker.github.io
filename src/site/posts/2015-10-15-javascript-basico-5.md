---
title: 'JavaScript Básico #5'
subtitle: 'Objetos'
heading: 'Aprenda as principais características dos objetos, estruturas essenciais da linguagem JavaScript.'
date: 2015-10-15 17:03:34
tags:
  - javascript
  - post
---

Anteriormente, [aprendemos como controlar a execução do fluxo do código JavaScript através de declarações](https://maxroecker.github.io/blog/javascript-basico-4/). Também vimos [como atribuir valores primitivos a variáveis e como manipulá-los no código](https://maxroecker.github.io/blog/javascript-basico-3/). Com isso, é possível codificar qualquer algoritmo em JavaScript. Entretanto, ainda não arranhamos a superfície das funcionalidades que a linguagem oferece.

## Propriedades

Todo valor em JavaScript — exceto o `null` e o `undefined` — possui propriedades que podem ser acessados por uma chave. Essas propriedades são valores e podem ser acessados através do operador `.`. Veja o exemplo abaixo:

```js
var str = 'javascript'
str.lenght // → 10

var num = 3
num.toFixed // → function toFixed
```

A propriedade `lenght` armazena um número que representa a quantidade de caracteres que essa string possui, ou seja, o comprimento da cadeia. Já a propriedade `toFixed` é uma referência de uma função. Em JavaScript, função são tratadas como valores e, por isso, podem ser atribuídas em proprieades. É comum chamar funções atribuídas em propriedades como **métodos**.

## Objetos

Além de valores do tipo primitivo, o JavaScript possui também valores do tipo **Objeto**. Objetos são valores que permitem o agrupamento de outros valores identificados por meio de uma chave. Em sua essência, objetos são [arranjos associativos](https://en.wikipedia.org/wiki/Associative_array) — também chamados de mapas, tabelas de símbolos ou dicionários — onde cada chave é uma string única que apontam para outros valores.

<figure>
  <img
    src="/images/2015-10-15-javascript-basico-5/object.svg"
    alt="Um objeto com propriedades apontando para seus respectivos valores."
  />
  <figcaption>
    Um objeto é um conjunto de vários pares de chave-valor. Cada chave é única no objeto e direciona para um valor.
  </figcaption>
</figure>

### Declarando objetos

Em JavaScript, os objetos normalmente são declarados através do literal objeto `{…}`. Sua sintaxe é dada como:

```
{
  [chave1]: [valor1],
  [chave2]: [valor2],
  …
}
```

Pode-se perceber que os pares de chave-valor do objeto são separadas por vírgulas. Desde o ECMAScript 2015, [a última propriedade do objeto pode ser sucedida uma vírgula](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Trailing_commas#Objects).

```js
var passaro = {
  nome: 'Corruíra',
  nomeCientifico: 'Troglodytes musculus'
}
```

### Acessando as propriedades

Como qualquer outro valor, você pode acessar as propriedades de um objeto com o operador `.`. Veja a continuação do exemplo anterior:

```js
console.log(passaro.nome) // → Corruíra
console.log(passaro.nomeCientifico) // → Troglodytes musculus
```

Você também pode atribuir valores para as propriedades da mesma forma como feito com variáveis.

```js
passaro.nome = 'Bem-te-vi'
passaro.nomeCientifico = 'Pitangus sulphuratus'

console.log(passaro.nome) // → Bem-te-vi
console.log(passaro.nomeCientifico) // → Pitangus sulphuratus
```

É possível também utilizar strings como chave de objetos. Utilizar strings como chave permite a vantagem de escrever chaves que o nome não segue as regras dos identificadores de variáveis. Ou seja, você pode ter uma chave começando com número ou contendo espaço, por exemplo. No entanto, chaves definidas por strings possuem sintaxe um pouco diferente, veja abaixo:

```js
var passaro = {
  nome: 'Trinca-ferro',
  'nome cientifico': 'Saltator similis'
}
```

Há também diferença ao acessar propriedades que a chave que não segue as regras de identificadores de variáveis. Nesses casos, é necessário utilizar o operador de acesso `[…]`. Veja os acessos do objeto do código anterior abaixo:

```js
console.log(passaro.nome) // → Trinca-ferro
console.log(passaro['nome']) // → Trinca-ferro
console.log(passaro['nome cientifico']) // → Saltator similis

passaro.nome = 'Tico-tico'
passaro['nome cientifico'] = 'Zonotrichia capensis'

console.log(passaro.nome) // → Tico-tico
console.log(passaro['nome']) // → Zonotrichia capensis
console.log(passaro['nome cientifico']) // → Saltator similis
```

### Adicionando propriedades

Por serem arranjos associativos, os objetos permite a inserção de propriedades após a declaração. Assim, podemos reescrever o exemplo anterior da seguinte forma:

```js
var passaro = {} // Objeto vazio
passaro.nome = 'Sabiá-laranjeira'
passaro['nome cientifico'] = 'Turdus rufiventris'

console.log(passaro['nome']) // → Sabiá-laranjeira
console.log(passaro['nome cientifico']) // → Turdus rufiventris
```

### Verificando a existência de uma propriedade

Quando lemos uma propriedade que não existe no objeto, acessá-la resulta em `undefined`. Agora, se uma propriedade existe seu valor é `undefined`, acessá-la também resulta em `undefined`. Utilizamos o operador `in` para verificar se uma propriedade existe em um objeto, que retorna `true` caso a chave a esquerda exista no objeto ou `false` caso contrário.

```js
var chave = 'cor'

console.log(chave in passaro) // → false
console.log(passaro[chave]) // → undefined

passaro.cor = 'Amarelo'

console.log(chave in passaro) // → true
console.log(passaro[chave]) // → Amarelo
```

### Removendo propriedades

O operador `delete` remove a propriedade do objeto.

```js
console.log('cor' in passaro) // → true

delete passaro.cor

console.log('cor' in passaro) // → false
```

### Iterando sobre as propriedades com `for…in`

É possível também iterar em todas as chaves de um objeto por meio da declaração `for…in`. Possui a seguinte sintaxe:

```
for ([chave] in [objeto])
  [declaração]
```

A cada iteração, uma das chaves é visitada pelo laço. A declaração `for…in` itera sobre as propriedades enumeráveis de um objeto em uma ordem arbitrária. Assim:

```js
var passaro = {
  nome: 'Patativa',
  'nome cientifico': 'Sporophila leucoptera',
  id: 1,
  extinct: false
}

for (var chave in passaro) {
  console.log('Propriedade %s - Tipo: %s', chave, typeof passaro[chave])
}
```

O resultado do código acima pode ser como escrito abaixo ou em uma ordem difernete.

<pre>
<samp>
  Propriedade extinct - Tipo: boolean
  Propriedade nome cientifico - Tipo: string
  Propriedade id - Tipo: number
  Propriedade nome - Tipo: string
</samp>
</pre>

## Diferenças entre valores primitivos e objetos

Objetos e valores se diferem em JavaScript em alguns pontos:

- Valores primitivos são valores do tipo booleano, número, string ou os valores `null` e `undefined`;
- Qualquer outro valor é um objeto.

A grande diferença entre os valores primitivos e objetos é o modo como eles são comparados e a mutabilidade de seus conteúdos.

### Comparação

Os valores primitivos são comparados através do seu “conteúdo”, ou seja, se dois valores primitivos tem o mesmo conteúdo, eles são iguais.

```js
var tres = 3
console.log(3 == 4) // → false
console.log(tres == 3) // → true
console.log('xyz' == 'xyz') // → true
```

Já objetos são comparados através da sua referência, cada valor tem sua identidade única e é somente igual a si mesmo. Objetos com o mesmo conteúdo não são considerados iguais.

```js
var obj1 = { prop: 1 }
var obj2 = { prop: 1 }

obj1 == obj2 // → false
obj1 == obj1 // → true

obj1 = obj2 // Atribuímos a referência de obj2 em obj1

obj1 == obj2 // → true
```

### Mutabilidade

Valores primitivos são considerados **imutáveis**, ou seja, é impossível mudar uma propriedade ou o seu valor para esses tipos de dados. Toda vez que você os manipula, na verdade você gera novos valores a partir dos antigos, mesmo que sejam idênticos.

```js
var a = 'string'

console.log(a.lenght) // → 6

a.lenght = 9

console.log(a.lenght) // → 6

a = 'outra string'

console.log(a.lenght) // → 12
```

Por outro lado, objetos são **mutáveis**. Alterar, adicionar ou remover uma propriedade de um objeto não gera um novo objeto a partir do antigo. O mesmo objeto modificado. Ou seja, quando atribuímos objetos para variáveis ou para propriedades de objetos, na verdade estamos indicando somente uma referência para o objeto. Se duas referências diferentes direcionam a um mesmo valor, alterar o valor reflete em mudanças para todos os objetos que “apontam” para ele.

```js
var passaro = { nome: 'Patativa' }
var ave = passaro

console.log(ave.nome) // → Patativa

ave.nome = 'Patativa-do-campo'

console.log(passaro.nome) // → Patativa-do-campo
```

## Conclusão

Objetos fornecem modos de agrupar vários valores em um só conjunto. Conceitualmente, podemos colocar todos os valores que possuem alguma relação em um mesmo conjunto ao invés de deixá-los espalhados pelo código. Objeto é uma das estrutura de dados mais básicas do JavaScript. Quase todo elemento dentro da linguagem é um objeto.

Apesar de possuírem o mesmo nome, objetos não devem ser confundidos com o conceito de objeto em programação orientada a objetos, definido como [instância de uma classe](<https://pt.wikipedia.org/wiki/Objeto_(ci%C3%AAncia_da_computa%C3%A7%C3%A3o)>). Como dito anteriormente, objetos em Javascript são arranjos associativos dinâmicos.

<blockquote>
  <p>
  As maioria das pessoas acredita que a ciência da computação é uma arte para gênios. Na realidade é o oposto. São somente muitas pessoas desenvolvendo coisas umas sobre as outras, como um muro de pequenas pedras.
  </p>
  <footer>
    Donald Knuth
  </footer>
</blockquote>
