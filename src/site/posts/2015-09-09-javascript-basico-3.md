---
title: 'JavaScript Básico #3'
subtitle: 'Variáveis e atribuições'
heading: 'Entenda como utilizar de variáveis e atribuir valores no JavaScript.'
date: 2015-09-09 17:00:03
tags:
  - javascript
  - post
---

No [artigo anterior](https://maxroecker.github.io/posts/2015-09-01-javascript-basico-2/) vemos como manipular basicamente os valores de tipo primitivo da linguagem, entre eles: números, strings, booleanos e valores indefinidos. Também vimos como fazer algumas operações aritméticas e de comparação entre expressões. No entanto, somente valores não são suficientes para expressar algoritmos complexos. É necessário utilizar a memória do computador para armazenar valores computados e acessá-los depois. Nesse texto vamos ver como atribuir e nomear valores por meio do uso de **variáveis**.

<aside>
<p>
<strong>va.ri.á.vel:</strong> 1. Sujeito a variação; 2. Que pode ser variado ou mudado; 3. Inconstante.
</p>
</aside>

## Variáveis

Todo valor do JavaScript precisa ser armazenado em um local na memória do computador, para identificarmos tal local utilizamos as **variáveis**. Em uma definição bem simples, variáveis são nomes para os locais onde os valores são armazenados.

<blockquote>
  <p>
    A representação é a essência da programação.
  </p>
  <footer>Fred Brooks, The Mythical Man-Month</footer>
</blockquote>

Para definirmos uma variável, utilizamos a palavra `var` seguida do nome escolhido para a variável. Variáveis podem ter qualquer nome, com exceção de palavras reservadas. `var` é um exemplo de palavra reservada, você não pode dar o nome de uma variável de `var`. Outras palavras reservadas incluem controles de fluxo e definições do próprio JavaScript. Nomes de variáveis também não podem conter espaços e não podem começar com números, mas podem conter números depois do primeiro caracter. Alguns símbolos também podem ser utilizados, como o `$` e o `_`. Por exemplo:

```js
var a = 3
var $b = a * a
console.log('Valor de a: ', a) // → Valor de a: 3
console.log('Valor de $b: ', $b) // → Valor de $b: 9
```

É importante ter em mente que variáveis não devem ser interpretadas como “caixas” que guardam os valores, mas sim como “placas” que apontam para onde os valores estão. Assim como placas, você pode mudar a posição apontada de uma variável, e por isso você pode reutilizar uma variável para outros valores. Veja o exemplo abaixo:

```js
var tempo = 'Sol'
var temperatura = 22
console.log('Tempo agora: %s %d°', tempo, temperatura) // → Tempo agora: Sol 22°

tempo = 'Nublado'
temperatura = temperatura - 2
console.log('Tempo agora: %s %d°', tempo, temperatura) // → Tempo agora: Nublado 20°
```

Podemos ver que mudamos o valor da variável `tempo` de `'Sol'` para `'Nublado'`. Já para a variável `temperatura`, mudamos o valor dela de `22` para `20`, uma vez que utilizamos o próprio da variável na atribuição. Percebeu que nós não utilizamos a palavra chave `var` quando atribuímos o segundo valor? Isso é possível porque a variável já foi declarada e só queremos atribuir um valor a ela, não declarar uma nova variável.

<aside>
<p>
Os símbolos dentro da string na função <code>console.log</code> são utilizadas para a <a href="https://en.wikipedia.org/wiki/String_interpolation">interpolação de string</a>. Interpolação de string é uma técnica que substitui símbolos especiais na string por valores passados. Cada símbolo indica uma formatação especial. No exemplo, o símbolo <code>%s</code> indica que o valor é uma string, enquanto o <code>%d</code> indica que o valor é um número.
</p>
</aside>

## Atalhos de atribuição

Muitas vezes a mesma variável fornece e recebe o valor para uma expressão — como é o caso da variável `temperatura` do exemplo anterior — e por isso há alguns atalhos para o operador de atribuição que diminuem a quantidade de escrita de código. Veja a seguir:

```js
var tempo = 'Sol'
var temperatura = 22
console.log('Tempo agora: %s %d°', tempo, temperatura) // → Tempo agora: Sol 22°

tempo += ' com nuvens'
temperatura -= 2
console.log('Tempo agora: %s %d°', tempo, temperatura) // → Tempo agora: Sol com nuvens 20°
```

Na atribuição utilizando o `+=`, o JavaScript executa uma concatenação com o valor a direita e depois atribui o resultado a variável tempo. Algo similar acontece com a atribuição utilizando `-=`, só que nesse caso o JavaScript faz uma subtração do valor a direita e o resultado é atribuído a variável `temperatura`. Esses atalhos também funcionam para os operadores aritméticos `*`, `/` e `%`.

Outros dois atalhos atribuição são o **incremento** (`++`) e o **decremento** (`--`). Ambos só funcionam para números inteiros e possuem um comportamento simples: adicionam ou subtraem o número da variável em uma unidade e atribuem o resultado a própria variável. Veja o exemplo abaixo:

```js
var t1 = 22
var t2 = 11

t1++
t2--

console.log('Temperatura 1: %d°', t1) // → Temperatura 1: 23°
console.log('Temperatura 2: %d°', t2) // → Temperatura 2: 10°
```

Atribuições utilizando `++` e `--` também retornam um valor, então você pode reescrever o código acima como:

```js
var t1 = 22
var t2 = 11

console.log('Temperatura 1: %d°', t1++) // → Temperatura 1: 22°
console.log('Temperatura 2: %d°', t2--) // → Temperatura 2: 11°

console.log('Temperatura 1: %d°', t1) // → Temperatura 1: 23°
console.log('Temperatura 2: %d°', t2) // → Temperatura 2: 10°
```

No entanto, atribuições `++` e `--` tem comportamento diferente dependendo da posição em que são colocados. Quando precedem o valor, eles retornam o valor após o incremento/decremento; caso eles sucedam, eles retornam o valor antes do incremento/decremento. Assim:

```js
var t1 = 22
var t2 = 11

console.log('Temperatura 1: %d°', ++t1) // → Temperatura 1: 23°
console.log('Temperatura 2: %d°', --t2) // → Temperatura 2: 10°

console.log('Temperatura 1: %d°', t1) // → Temperatura 1: 23°
console.log('Temperatura 2: %d°', t2) // → Temperatura 2: 10°
```

## Atribuição condicional

É possível atribuir valores para varáveis de forma condicional utilizando o operador ternário `?`. O operador ternário possui uma sintaxe similar a:

```
[condição] ? [valor caso verdadeiro] : [valor caso falso]
```

Vamos entender melhor o comportamento da atribuição condicional com um exemplo. Suponha que você queira exibir um texto se o número `n` é par ou ímpar. Para verificar que um número é ímpar, você pode testar se módulo do número por dois é zero (ou seja, não sobra resto da divisão do número `n` por dois). Se essa condição é verdadeira, então atribuiremos `'par'` ao resultado. Caso contrário, atribuíremos `'ímpar'`. Um código para esse pequeno algoritmo poderia ser:

```js
var n = 11 // pode ser qualquer número
var resultado = n % 2 == 0 ? 'par' : 'ímpar'
console.log(resultado)
```

Teste o código acima com outros valores para a variável `n` e veja os resultados.

## Conclusão

Variáveis são o principal meio de acesso à memória que, quando utilizadas juntas com valores, forma o fundamento da execução de qualquer código e da representação dos dados de um algoritmo. No próximo artigo veremos as declarações de controle de fluxo de execução, como condicionais ou de repetições, para evoluirmos ainda mais a nossa capacidade de desenvolver códigos em JavaScript.
