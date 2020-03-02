---
title: 'JavaScript Básico #2'
subtitle: 'Valores primitivos'
heading: 'Veja como o JavaScript representa, armazena, nomina e opera os dados primitivos da linguagem.'
date: 2015-09-01 22:29:00
tags:
  - javascript
  - post
---

**Valores** são os elementos mais simples dentro de uma linguagem: são expressões que não podem ser reduzidas a nenhuma outra — ou seja, estão em sua forma normal. Por exemplo: 2 é um valor, ele é auto-contido e não há como simplificar. Já (1+2) é uma expressão que não representa um valor, pois pode ser derivado e reduzido como 3.

<aside>
<p>
Em lógica matemática, um objeto encontra-se em sua <strong>forma normal</strong> se este não pode ser reescrito de forma mais simples.
</p>
</aside>

Todo valor deve ser armazenado em um local na memória do computador e ocupa algum espaço em bits. O JavaScript possui duas categorias de valores: **primitivos** e **objetos**. Nesse artigo vamos focar nos valores do tipo primitivo. Valores primitivos representam os dados simples e podem ter os tipos:

- Número
- String
- Booleano

Existem outros tipos primitivos mais avançados, mas para uma introdução à linguagem, esses três são suficientes.

## Número

Valores do tipo número são, surpreendentemente, valores numéricos. O JavaScript armazena qualquer número como um [ponto flutuante de precisão dupla](https://en.wikipedia.org/wiki/IEEE_754). Ou seja, cada número utiliza 64 bits da memória do computador para ser armazenado. Alguns bits são utilizados para identificar números negativos ou também para indicar a fração decimal do número. Na verdade, [o maior valor numérico inteiro que o JavaScript representa está próximo aos 9 quadrilhões](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER).

Abra o console JavaScript do seu navegador — <kbd><kbd class="key">Ctrl</kbd> + <kbd class="key">Shift</kbd> + <kbd class="key">J</kbd></kbd> — e experimente entrar com os números inteiros `0`, `3` e `16`, apertado <kbd class="key">Enter</kbd> após cada um deles. Você pode ver que o console sempre irá retornar para você o valor da sua expressão informada, caso ela seja avaliada em um valor; caso contrário, ela retorna `undefined`. Não se preocupe em entender o que significa isso por agora, vamos tratar sobre esse valor especial daqui a pouco.

<blockquote>
  <p>
    Computadores são como os deuses do Velho Testamento: muitas regras e nenhuma piedade.
  </p>
  <footer>
    Joseph Campbell, The Power of Myth
  </footer>
</blockquote>

Para representar números inteiros em base decimal, como já visto, basta escrevê-los **sem usar zero esquerda**. Números fracionais são escritos com ponto, então o número 1,5 em JavaScript é escrito como `1.5`. Você também pode omitir a parte inteira quando ela é nula, assim, **0,78** pode ser escrito como `0.78` ou `.78`; No entando, é sempre recomendado que você adicione o zero. Você também pode escrever números muito grandes ou muito pequenos através de [notação científica](https://pt.wikipedia.org/wiki/Nota%C3%A7%C3%A3o_cient%C3%ADfica), usando o `e` para indicar o expoente da base 10. Veja abaixo as diferentes formas de escrever o número o mesmo número:

```js
0.1 // → 0.1
0.1 // → 0.1
1e-1 // → 0.1
```

Há a possibilidade de escrever também números inteiros em bases [hexadecimal](https://pt.wikipedia.org/wiki/Sistema_de_numera%C3%A7%C3%A3o_hexadecimal) (16), [octal](https://pt.wikipedia.org/wiki/Sistema_octal) (8) ou [binária](https://pt.wikipedia.org/wiki/Sistema_de_numera%C3%A7%C3%A3o_bin%C3%A1rio) (2). Para escrever em base hexadecimal, basta adicionar um `0x` à frente de um número com dígitos `01234567890ABCDF`. Já para escrever o número em octal, precede-se o número com um `0` e em seguida qualquer dígito `01234567`, por isso, escrever `014` é diferente de `14` em JavaScript, o primeiro indica um número em base octal e o segundo um número em base decimal.

Números binários são escritos com um `0b` à frente do número com digitos `01`. Para mostrar a diferença na escrita, o número 42 nas diferentes bases é escrito como:

```js
42 // → 42
0b101010 // → 42
052 // → 42
0x2a // → 42
```

### Operações matemáticas

As quatro operações aritméticas básicas: **adição**, **subtração**, **multiplicação** e **divisão**; são dadas no JavaScript pelos símbolos `+`, `-`, `*` e `/`, respectivamente. Esses símbolos são chamados de operadores, e sempre utilizam dos números a sua direita e a sua esquerda para realizar a operação. Outro operador importante é o operador de **módulo** ou **resto da divisão**, escrito com `%`. Experimente executar as seguintes expressões no console.

```js
1 + 4 // → 5
9 / 10 // → 0.9
3 -
  (3 *
    15(
      // → -42
      20 + 5
    )) /
    4 // → 6.25
10 % 9 // → 1
```

Como esperado, a multiplicação e a divisão tem prioridade, seguindo a [ordem de precedência](https://pt.wikipedia.org/wiki/Ordem_de_opera%C3%A7%C3%B5es). Caso você precise da ordem explicita, você deve utilizar os parênteses.

### Valores numéricos especiais

Há três valores numéricos em JavaScript que não se comportam como números comuns. Os primeiros são os que representam os infinitos positivo e negativo — representados na linguagem como `Infinity` e `-Infinity` — que apesar de não poderem ser utilizados em operações aritméticas, podem ser comparados com outros números e podem ser úteis para resolver alguns problemas.

O terceiro é `NaN`, do inglês <i lang="en">Not a Number</i>, ou seja, um valor do tipo número mas que representa um "não-número". Operações aritméticas indefinidas ou mal-formadas resultam em `NaN`, veja alguns exemplos:

```js
Infinity - Infinity // → NaN
0 * Infinity // → NaN
Infinity / -Infinity // → NaN
'a' / 2 // → NaN
```

## Strings

**Strings** são cadeia de caracteres utilizadas para representar texto escrito. Sua representação em JavaScript é dada pelo conteúdo dentro de um par de aspas duplas (`""`) ou aspas simples (`''`). Por exemplo:

```js
'À noite, vovô Kowalsky vê o ímã cair no pé do pinguim queixoso e vovó põe açúcar no chá de tâmaras do jabuti feliz'
'Gazeta publica hoje no jornal uma breve nota de faxina na quermesse.'
```

Qualquer caractere pode ser colocado entre as aspas e o JavaScript se encarrega de atribuir um valor para elas. No entanto, alguns caracteres especiais — como os que indicam uma nova linha ou um espaço de tabulação — precisam ser representados de forma diferente. Para representar esses caracteres especiais utilizamos a notação contra-barra (ou <i lang="en">[character escaping](https://en.wikipedia.org/wiki/Escape_character)</i>). Ou seja, quando uma contra-barra é encontrada no texto, o caractere seguinte indica um caractere especial. Por exemplo, uma string que contenha `\n` indica que há uma quebra de linha. A lista abaixo indica os principais caracteres especiais:

- `\n` — Quebra de linha
- `\"` — Aspas duplas
- `\'` — Aspas simples
- `\\` — Contra-barra
- `\t` — Espaço de tabulação

Ou seja, para escrever a frase "_Usamos o "\n" para escrever uma quebra de linha_" em uma string no JavaScript, é necessário escrevê-la da seguinte forma:

```js
"Usamos o \"\\n\" para escrever uma quebra de linha"
```

Strings não podem ser adicionadas, divididas, multiplicas ou subtraídas. Mas podem ser concatenadas com o operador `+`. Por exemplo, a expressão `'ja' + 'va' + 'script'` produz o resultado `'javascript'`.

## Booleanos

Muitas vezes precisamos de dados tão simples que indiquem somente uma decisão: "sim" e "não", "ligado" e "desligado", "ativo" e "inativo", entre outros. Valores booleanos indicam exatamente isso e são representados por `true` ou `false`. Esses valores são chamados de booleanos em homenagem ao matemático [George Boole](https://pt.wikipedia.org/wiki/George_Boole), grande contribuidor nos campos de lógica matemática e álgebra abstrata. Apesar de serem simples, são essenciais quando estamos lidando com estruturas de controle ou de laço dentro da linguagem.

### Operações booleanas

Valores booleanos podem ser operados através dos operadores lógicos [e](https://pt.wikipedia.org/wiki/Conjun%C3%A7%C3%A3o_l%C3%B3gica), [ou](https://pt.wikipedia.org/wiki/Disjun%C3%A7%C3%A3o_l%C3%B3gica) e [negação](https://pt.wikipedia.org/wiki/Nega%C3%A7%C3%A3o), escritos respectivamente como `&&`, `||` e `!`. Note que o operador de negação `!` é unário, ou seja, ele inverte o próximo valor booleano informado. Exemplos:

```js
true && true // → true
true && false // → false
true || false // → true
false || false // → false
!true // → false
!false // → true
```

### Comparações

A maior parte dos valores primitivos em JavaScript possui uma [ordenação total](https://en.wikipedia.org/wiki/Total_order). Ou seja, possuem a ideia de que um valor é "maior que outro" ou "precede" outro. Para avaliar essa relação, utilizamos **operadores de comparação**, que resultam em um valor booleano `true` ou `false`. Os operadores de comparação são:

- `>`, que indica "_maior que_";
- `>=`, que indica "_maior ou igual a_";
- `==`, que indica "_igual a_";
- `<=`, que indica "_menor ou igual a_";
- `<`, que indica "_menor que_";
- `!=`, que indica "_diferente de_";

Alguns exemplos:

```js
1 <= 2 // → true
1 < 2 - 1 // → false
;(3 ===
  2 +
  1 - // → true
    4) !==
  12 / -3 // → false
'Alvar' < 'Zoink' // → true
'Jaiko' >= 'Jaik' // → true
true > false // → true
```

Números são comparados de acordo com o valor real. Strings são comparadas pela [ordem lexicográfica](https://en.wikipedia.org/wiki/Lexicographical_order), para os valores booleanos, `true` sempre sucede `false` e ambos nunca são iguais.

Uma exceção a essa regra é o valor `NaN`. Na maioria das vezes um valor é igual a ele mesmo, mas com o `NaN` isso não acontece. Em JavaScript, `NaN == NaN` sempre retorna `false`. A justificativa é que normalmente `NaN` indica uma computação aritmética indefinida e isso não significa que ela seja igual a outra computação inválida.

## Valores indefinidos

Há dois valores especiais, `null` e `undefined`, que são utilizados para indicar a falta de um valor próprio — são valores que indicam que não há informação. Muitas operações que não resultam em um valor válido produzem o valor `undefined` por serem obrigadas a retornar um valor. Contextualmente, não há diferença entre `null` e `undefined`, ou seja, você pode considerá-los sinônimos na maioria das vezes.

Alguns autores chegam a afirmar que esse é um acidente dentro do projeto da linguagem. Houve uma proposta de unificar esses valores, mas ela foi [rejeitada](http://wiki.ecmascript.org/doku.php?id=harmony%3atypeof_null).

Podemos notar uma diferença entre os dois valores quando utilizamos o operador `typeof` da linguagem, que fornece que fornece uma string nomeando o tipo do próximo valor dado à ela. Por exemplo:

```js
typeof 3.2 // → "number"
typeof 'a' // → "string"
typeof (true && true) // → "boolean"
typeof null // → "object"
typeof undefined // → "undefined"
```

## Conclusão

Esse artigo ficou um pouco longo, mas acho importante ter esse entendimento inicial de valores e operações básicas para compreensão do JavaScript. Para os próximos artigos, trataremos de assuntos como variáveis, atribuições e de suas especialidades.
