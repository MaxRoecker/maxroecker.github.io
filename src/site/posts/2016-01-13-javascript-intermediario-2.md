---
title: 'JavaScript Intermediário #2'
subtitle: 'Closures'
heading: 'Entenda de uma vez essa mitológica característica da linguagem JavaScript'
date: 2016-01-13 18:42:06
tags:
  - javascript
  - post
---

A série **JavaScript Intermediário** busca passar, de maneira sólida e gradual, características fundamentais da linguagem. Neste capítulo, vamos voltar nossa atenção para um importante, esquecido e quase mitológico aspecto da linguagem: as <i lang="en">closures</i>, também conhecidas como fechos léxicos ou clausuras.

Mesmo que você programe há muito tempo em JavaScript e nunca tenha ouvido nunca falar em <i lang="en">closures</i>, aqui vai uma revelação: **elas estão em todo lugar**. <i lang="en">Closure</i> não é um tipo de opção especial da linguagem nem uma declaração especial ou um padrão de desenvolvimento. Para falar a verdade, <i lang="en">closures</i> não existem apenas no JavaScript. <i lang="en">Closure</i> é conceito bem mais amplo, com base na teoria de implementação de linguanges de programação. Justamente por isso, é necessário entendê-las para que se possa compreender todas as consequências da sua utilização.

Contudo, antes de entender o que são <i lang="en">closures</i>, precisamos dar um passo atrás e entender como as linguagens de programação são executadas e utilizam a memória do computador.

## A pilha de execução

A grande maioria das linguagens de programação utiliza uma estrutura para registrar todas as subrotinas ativas de um programa. [Essa estrutura normalmente é implementada como uma pilha](https://en.wikipedia.org/wiki/Stack-based_memory_allocation). Essa pilha tem várias responsabilidades que incluem: armazenar o ponto de execução atual, armazenar o endereço para qual a subrotina ativa deve retornar um valor quando terminar a execução, armazenar as variáveis locais, entre outras. De forma geral, podemos resumir o funcionamento da pilha de execução como:

- Toda subrotina chamada empilha um novo quadro de contexto;
- Quadros permanecem na pilha até o fim da execução da subrotina;
- Quando a subrotina termina, o quadro é desempilhado, liberando memória para a próxima subrotina;
- Quando a pilha estiver vazia, é considerado que o programa chegou ao fim da execução.

<aside>
<p>
Um estouro de pilha (<i lang="en">stack overflow</i>) ocorre quando um programa empilha mais quadros do que a quantidade de memória disponível permite.
</p>
</aside>

Em JavaScript, consideramos as funções como subrotinas. Veja o código abaixo que contém três declarações de funções e a chamada de uma delas:

```js
function add (x, y) {
  return x + y
}

function div (x, y) {
  return x / y
}

function avg (x, y) {
  var sum = add(x, y)
  return div(sum, 2)
}

console.log(avg(4, 5)) // → 4.5
```

A execução do código acima fará com que a pilha de execução tenha, de forma simplificada, os estados dado pela figura abaixo.

<figure>
  <img
    src="/images/2016-01-13-javascript-intermediario-2/stack1.svg"
    alt="Sequência do empilhamento dos quadros da execução do código acima."
  />
</figure>

1. Temos a chamada da função `avg` que empilha seu respectivo quadro contendo os parâmetros `x = 4` e `y = 5`;
2. A partir de um ponto, a função `avg` chama a função `add`, que por sua vez empilha seu quadro de contexto contendo também os parâmetros `x = 4` e `y = 5`;
3. Ao terminar de executar, `add` retorna o valor `9` para a variável `sum` no quadro de contexto da função `avg`;
4. A função `avg` então chama `div`, que por sua vez empilha o seu respectivo quadro de contexto, contendo os parâmetros `x = 9` e `y = 2`;
5. A função `div` termina sua execução e retorna um valor para uma variável anônima, aqui representada como um `~`;
6. A função `avg` termina sua execução e retorna o resultado para o escopo global, aqui também representada como um `~`, e que é impressa no console.

Agora, vamos ver um outro exemplo um pouco mais complexo. Considere o código abaixo:

```js
function mul (x) {
  return function (y) {
    return x * y
  }
}

var double = mul(2)

console.log(double(4)) // → 8
```

A execução desse código terá, de forma simplificada, os seguintes estados da pilha:

<figure>
  <img
    src="/images/2016-01-13-javascript-intermediario-2/stack2.svg"
    alt="Sequência do empilhamento dos quadros da execução do código acima."
  />
</figure>

1. Temos a chamada da função `mul` que empilha seu respectivo quadro contendo o parâmetro `x = 2`;
2. Ao terminar de executar, `mul` retorna uma referência para uma função anônima — aqui representada como um `#` — para a variável `double` no quadro de contexto global;
3. O contexto global chama então `double`, que por sua vez empilha o seu quadro de contexto, contendo o parâmetro `y = 2`;
4. Mas espere aí… para concluir sua execução a função apontada por `double` precisa do parâmetro `x`, que pertencia ao quadro da função `mul`. No entanto, o quadro de contexto de `mul` já foi desempilhado porque sua execução foi finalizada. Onde foi parar `x`?

Bem, senhoras e senhores, aqui lhes apresento a <i lang="en">closure</i>. Muito prazer!

## <i lang="en">Closures</i>

<i lang="en">Closures</i> nada mais são que funções que armazenam o contexto léxico interno para que possam ser utilizadas mesmo quando o quadro de contexto já não existe mais.

Uma <i lang="en">closure</i> acontece quando uma função é declarada dentro do escopo de outra e, além disso, a função interior referencia variáveis locais da função exterior. Quando a função exterior é executada, uma closure é criada contendo uma referência da função interior e referências para quaisquer variáveis no contexto da função exterior que a função interior necessita.

<aside>
<p>
<i lang="en">Closures</i> funções são capazes de ”lembrar“ de variáveis pertencente ao escopo léxico de onde foram declaradas mesmo quando executadas fora dele.
</p>
</aside>

Normalmente, <i lang="en">closures</i> armazenam essas informações na área de [memória dinâmica](https://en.wikipedia.org/wiki/Memory_management#Dynamic_memory_allocation) do computador, comumente chamada de <i lang="en">heap</i>. Dessa forma, vamos redesenhar o nosso esquema simplificado do estado da pilha de execução contemplando também o <i lang="en">heap</i>:

<figure>
  <img
    src="/images/2016-01-13-javascript-intermediario-2/stack3.svg"
    alt="Sequência do empilhamento dos quadros da execução do código acima."
  />
</figure>

1. Temos a chamada da função `mul` que empilha seu respectivo quadro contendo o parâmetro `x = 2`;
2. Ao terminar de executar, `mul` retorna uma referência de uma <i lang="en">closure</i> anônima — aqui representada como um `#` — para a variável `double` no quadro de contexto global;
3. O contexto global chama então `double`, que por sua vez empilha o seu quadro de contexto, contendo o parâmetro `y = 2`;
4. Ao executar, a <i lang="en">closure</i> apontada por `double` pega o valor do parâmetro `x = 2` do contexto salvo e multiplica pelo parâmetro `y = 2`. O valor da multiplicação é retornado e exibido pelo console.

## Teoria e propriedades das <i lang="en">closures</i>

Uma linguagem de programação não consegue implementar <i lang="en">closures</i> se o seu modelo de memória apenas utiliza apenas a pilha para gerenciar a memória. Em tais linguagens, as variáveis locais são automaticamente desalocadas quando a função termina sua execução. Entretanto, uma <i lang="en">closure</i> requer que as variáveis capturadas sobrevivam além da execução da função original. Por isso, essas variáveis precisam ser alocadas até que não sejam mais necessárias, normalmente utilizando a área de memória dinâmica <i lang="en">heap</i> ao invés da pilha. O tempo de vida dessas variáveis é controlado para que permançam acessíveis enquanto houver alguma <i lang="en">closure</i> que a referencie.

Isso explica por a grande maioria das linguagens de programação que suportam <i lang="en">closures</i> normalmente acompanham um [coletor de lixo](<https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)>). Alternativas ao uso de coletor de lixo para o gerenciamento de memória seria o controle manual ou continuar usando um espaço especial da pilha para armazenar a <i lang="en">closure</i>, mas, ambas as estratégias podem ter um [comportamento indefinido](https://en.wikipedia.org/wiki/Undefined_behavior) uma vez podem acontecer “[referências selvagens](https://pt.wikipedia.org/wiki/Apontador_pendente)”.

<aside>
<p>
O <a href="https://en.wikipedia.org/wiki/Funarg_problem">Problema Funarg</a> descreve essa dificuldade de implementar funções de alta ordem e <i lang="en">closures</i> em linguagens de progração com memória baseada em pilha, tais como C e C++.
</p>
</aside>

É importante lembrar que o contexto salvo por uma <i lang="en">closure</i> é imune a interferência externa além da própria <i lang="en">closure</i>. Isso garante uma área de memória oculta para a função e pode ser útil para representar um estado interno privado. Além disso, em JavaScript, por <i lang="en">closures</i> serem funções e funções serem objetos, <i lang="en">closures</i> são identificadas apenas pela sua referência, mesmo que ambas apontem para a mesma função. Vide o exemplo anterior, temos:

```js
function mul (x) {
  return function (y) {
    return x * y
  }
}

var double = mul(2)
var triple = mul(3)

console.log(double(6)) // → 12
console.log(triple(4)) // → 12
console.log(double == triple) // → false
```

## Conclusão

Para que você utilize o potencial da linguagem JavaScript ao máximo, é fundamental compreender as <i lang="en">closures</i>. É com elas que você consegue criar encapsulamento dos dados ou programar orientado a eventos de forma simples e declarativa. <i lang="en">Closure</i> é um daqueles conceitos curiosos que são paradoxalmente difíceis de compreender porque são ubíquos demais e estão por toda parte. Mas, uma vez que o programador se torne apto a utilizá-lo a seu favor, soluções simples e concisas podem ser desenvolvidas.

<blockquote cite="https://www.dreamsongs.com/ObjectsHaveNotFailedNarr.html">
<p>
Uma das conclusões que nós chegamos foi que um objeto não precisa ser um primitivo conceito em uma linguagem de programação; um objeto e seu comportamento pode ser construído por meio de um pouco de valores e algumas boas e velhas expressões lambdas.
</p>
<footer>
<a href="https://www.dreamsongs.com/ObjectsHaveNotFailedNarr.html">Guy L. Steele</a>
</footer>
</blockquote>
