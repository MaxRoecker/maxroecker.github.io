---
title: 'JavaScript Básico #2: Dados, valores e operações'
description: 'Veja como o JavaScript representa, armazena, nomina e opera dados primitivos.'
cover:
  path: cover.jpg
  title: Tetrahemihexahedron
  src: 'https://www.flickr.com/photos/21649179@N00/4282044498'
featured: false
date: 2015-09-01 13:43:26
tags:
  - javascript
---
{% blockquote   %}
Em lógica matemática, um objeto encontra-se em sua *forma normal* se este não pode ser reescrito de forma mais simples.
{% endblockquote %}

**Valores** são os elementos mais simples dentro de uma linguagem: são expressões que não podem ser reduzidas a nenhuma outra ─ ou seja, estão em sua [forma normal](https://en.wikipedia.org/wiki/Normal_form_(abstract_rewriting)). Por exemplo: `2` é um valor, ele é auto-contido e não há como simplificar. Já `1 + 2` é uma expressão que não representa um valor, pois pode ser derivado e reduzido como `3`. Todo valor deve ser armazenado em um local na memória do computador e ocupa algum espaço em bits. Em sua versão mais nova (*ECMAScript 6*), o JavaScript possui dois três categorias de valores: **primitivos** e **objetos**. Nesse artigo vamos focar nos valores do tipo primitivo. Valores primitivos representam os dados mais simples da linguagem e podem ter os seguintes tipos:

* Número
* Booleano
* String
* Símbolo

## Número
Valores do tipo número são, surpreendentemente, valores numéricos. Cada número utiliza 64 bits da memória do computador para ser armazenado. Ou seja, com esse espaço é possível armazenar **2^64^** valores numéricos diferentes ─ aproximadamente uns **18 quintilhões** ─ mas nem todos esses números podem ser utilizados. Alguns bits são utilizados para identificar números negativos ou também para indicar a fração decimal do número. Na verdade, o maior valor numérico inteiro que o JavaScript representa está próximo aos 9 quadrilhões, que é suficientemente grande. ***:)***

{% blockquote  Joseph Campbell, The Power of Myth  %}
Computadores são como os deuses do Velho Testamento: muitas regras e nenhuma piedade.
{% endblockquote %}

 Abra o **console** ─ <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>J</kbd> ─ e experimente entrar com os números inteiros `0`, `3` e `16`, apertado <kbd>Enter</kbd> após cada um deles. Você pode ver que o console sempre irá retornar para você o valor da sua expressão informada, caso ela seja avaliada em um valor; caso contrário, ela retorna `undefined` (indefinido). Não se preocupe em entender o que significa isso por agora, vamos tratar sobre esse valor especial daqui a pouco.

 Para representar números inteiros decimais, como já visto, basta escrevê-los **sem usar zero esquerda** (Você já vai entender o porquê). Números fracionais são escritos com ponto, então o número **1,5** em JavaScript é escrito como `1.5`. Você também pode omitir a parte inteira quando ela é nula, assim, **0,78** pode ser escrito como `0.78` ou `.78`, por exemplo. Você também pode escrever números muito grandes ou muito pequenos através de [notação científica](https://pt.wikipedia.org/wiki/Nota%C3%A7%C3%A3o_cient%C3%ADfica), usando o `e` para indicar o expoente da base 10. Alguns exemplos:

{% simplecode js %}
``` js
3.14;       // → 3.42
2345.789;   // → 2345.789
.33333333;  // → 0.3333333333333333
-.2831853;  // → -0.283185307179586
+2.58e-6;   // → 0.00000258
```
{% endsimplecode %}

Há a possibilidade de escrever também números inteiros em bases [hexadecimal](https://pt.wikipedia.org/wiki/Sistema_de_numera%C3%A7%C3%A3o_hexadecimal) (16), [octal](https://pt.wikipedia.org/wiki/Sistema_octal) (8) ou [binária](https://pt.wikipedia.org/wiki/Sistema_de_numera%C3%A7%C3%A3o_bin%C3%A1rio) (2). Para escrever em base hexadecimal, basta adicionar um `0x` à frente de um número com dígitos `01234567890ABCDF`. Já para escrever o número em octal, precede-se o número com um `0` e em seguida qualquer dígito `01234567`, por isso, escrever `014` é diferente de `14` em JavaScript, o primeiro indica um número octal e o segundo um número decimal.

Números escritos em binários, dados pela especificação da nova ECMAScript 6, são escritos com um `0b` à frente do número com digitos `0` ou `1`. Para mostrar a diferença na escrita, o número **42** nas diferentes bases é escrito como:

{% simplecode js %}
``` js
42;       // → 42
0b101010; // → 42
052;      // → 42
0x2A;     // → 42
```
{% endsimplecode %}


### Operações matemáticas
 As quatro operações matemáticas básicas: **adição**, **subtração**, **multiplicação** e **divisão**; são dadas no JavaScript pelos símbolos `+`, `-`, `*` e `/`, respectivamente. Esses símbolos são chamados de operadores, e sempre utilizam dos números a sua direita e a sua esquerda para realizar a operação. Outro operador importante é o operador de **módulo** ou **resto da divisão**, escrito com `%`. Experimente executar as seguintes expressões no console.

{% simplecode js %}
``` js
1 + 4;        // → 5
9 / 10;       // → 0.9
3 - 3 * 15;   // → -42
(20 + 5) / 4; // → 6.25
10 % 9;       // → 1
```
{% endsimplecode %}

Como esperado, a multiplicação e a divisão tem prioridade, seguindo a [ordem de precedência](https://pt.wikipedia.org/wiki/Ordem_de_opera%C3%A7%C3%B5es). Caso você precise da ordem explicita, você deve utilizar os parênteses.

Outros operadores, como o **incremento** (`++`, adiciona 1) e **decremento** (`--`, subtrai 1) só funcionam para números inteiros e tem comportamento diferenciado dependendo da sintaxe. Quando precedem o valor, eles operam antes da avaliação da expressão; caso eles sucedam, eles operam após a avaliação da expessão. Apesar de serem pouco utilizados em aritmética, o incremento e decremento são muito utilizados no controle de execução do código, que veremos nos próximos artigos.


### Valores numéricos especiais
 Há três valores numéricos em JavaScript que não se comportam como números. Os primeiros são o **∞** e **-∞** ─ representados na linguagem por `Infinity` e `-Infinity` ─ que são os infinitos  positivo e negativo. Nem mesmo nossa matemática compreende todas as suas propriedades, mas são úteis para solucionar alguns problemas.

O terceiro é `NaN`, do inglês <i lang="en">Not a Number</i>; ou seja, apesar do valor ser numérico, ele não pode ser considerado um "número". Por exemplo, quando temos uma operação infinito menos infinito,  infinito multiplicado por zero, entre outros... Sucintamente: qualquer operação matemática que não resulte em um valor numérico definido é denominado `NaN`.

{% simplecode js %}
``` js
Infinity - Infinity;  // → NaN
0 * Infinity;         // → NaN
Infinity / -Infinity; // → NaN
"a" / 2;              // → NaN
```
{% endsimplecode %}


---
## Strings
 **Strings** ou **cadeia de caracteres** são utilizadas para representar texto escrito. Sua representação em JavaScript é dada pelo conteúdo dentro de um `“”` ou `‘’`. Por exemplo:

{% simplecode js %}
``` js
"À noite, vovô Kowalsky vê o ímã cair no pé do pinguim queixoso e vovó põe açúcar no chá de tâmaras do jabuti feliz";
'Gazeta publica hoje no jornal uma breve nota de faxina na quermesse.';
```
{% endsimplecode %}

Uma String também pode ser criada através da função `String()`, mas deixaremos essa opção de lado por um momento até falarmos de funções.

Qualquer caractere pode ser colocado entre as aspas (duplas ou simples) e o JavaScript se encarrega de atribuir um valor para isso. Mas alguns caracteres especiais, como os que indicam uma nova linha ou um espaço de tabulação, precisam ser representados de forma diferente. Para isso, utiliza-se a *notação contra-barra* (ou <i lang="en">[character escaping](https://en.wikipedia.org/wiki/Escape_character)</i>), ou seja, quando uma contra-barra é encontrada no texto; o caractere seguinte indica um caractere especial. Por exemplo, uma string que contenha `\n` indica que há uma quebra de linha. A lista abaixo indica os principais caracteres especiais:

* `\n` ─ Quebra de linha
* `\"` ─ Aspas duplas
* `\'` ─ Aspas simples
* `\\` ─ Contra-barra
* `\t` ─ Espaço de tabulação

Ou seja, para escrever a frase "***Usamos o "\n" para escrever uma quebra de linha***" seria necessário, no JavaScript, escrever da seguinte forma:

{% simplecode js %}
``` js
"Usamos o \"\\n\" para escrever uma quebra de linha";
```
{% endsimplecode %}

Strings não podem ser adicionadas, divididas, multiplicas ou subtraídas. Mas o operador `+` pode ser usado, desse modo podemos concatenar duas Strings, isto é, "juntá-las". Por exemplo, a expressão `"ja" + "va" + "script"` produz o resultado `"javascript"`.


---
## Booleanos
Muitas vezes precisamos de valores simples que indiquem somente duas informações tal como "sim" e "não" ou "ligado" e "desligado". Os valores de tipo booleanos indicam exatamente isso e são representados por `true` ou `false`. Esses valores são chamados de booleanos, em homenagem ao matemático [George Boole](https://pt.wikipedia.org/wiki/George_Boole), grande contribuidor nos campos de lógica matemática e álgebra abstrata. Apesar de serem simples, são essenciais quando estamos lidando com estruturas de controle ou de laço dentro da linguagem.

### Operações booleanas
Valores booleanos podem ser operados através dos operadores lógicos [e](https://pt.wikipedia.org/wiki/Conjun%C3%A7%C3%A3o_l%C3%B3gica), [ou](https://pt.wikipedia.org/wiki/Disjun%C3%A7%C3%A3o_l%C3%B3gica) e [negação](https://pt.wikipedia.org/wiki/Nega%C3%A7%C3%A3o), escritos respectivamente como `&&`, `||` e `!`. Note que o operador de negação `!` é unário, ou seja, ele inverte o próximo valor booleano informado. Exemplos:

{% simplecode js %}
``` js
true && true;   // → true
true && false;  // → false
true || false;  // → true
!true;          // → false
```
{% endsimplecode %}

O último operador lógico que o JavaScript possui é denominado **operador ternário**, que possui esse nome por ser o único operador com três argumentos, escrito da seguinte forma:

{% simplecode js %}
``` js
true? 1 : 0;  // → 1
false? 1 : 0; // → 0
```
{% endsimplecode %}

O operador ternário é condicional, caso o primeiro valor seja verdadeiro (`true`), ele retorna o segundo valor; se for falso (`false`), ele retorna o terceiro valor.

### Comparações
Alguns operadores aritméticos ou de strings resultam em valores booleanos após a sua execução. Em JavaScript temos os operadores de comparação:

* *"maior que"*, `>`;
* *"maior ou igual a"*, `>=`;
* *"igual a"*, `==`;
* *"menor ou igual a"*, `<=`;
* *"menor que"*, `<`;
* *"diferente de"*, `!=`;

Alguns exemplos:

{% simplecode js %}
``` js
1 <= 2;         // → true
1 < 2 - 1;      // → false
3 == 2 + 1;     // → true
-4 != 12 / -3;  // → false
```
{% endsimplecode %}

Strings podem ser comparadas da mesma forma, só que o critério de comparação se dá pela ordem alfabética da string. Por exemplo:

{% simplecode js %}
``` js
"Alvar" < "Zoink"; // → true
"Jaiko" >= "Jaik"; // → true
```
{% endsimplecode %}

 Na verdade, a comparação é baseada no padrão [Unicode](https://pt.wikipedia.org/wiki/Unicode), que assinala um valor numérico para cada caractere de uma string. Por isso, minúsculos são maiores que maiúsculos ou não-alfabéticos ─ `"Z" < "a" == true` e `"!" > "e" == false` ─ e a comparação é sempre dada da esquerda para a direita, comparando os valores de cada um dos caracteres.

 Na maioria das vezes um valor é igual a ele mesmo, com exceção de `NaN`. Normalmente `NaN` indica uma computação aritmética indefinida e isso não significa que ela seja igual a outra computação inválida.


---
## Símbolos
Um símbolo é um tipo de dado primitivo imutável, especificado pela versão *ECMAScript6*. Criados a partir da função `Symbol()`, símbolos são sinais que servem como identificadores únicos. Ou seja, mesmo que você crie dois símbolos a partir mesma chave, eles são diferentes entre si. Símbolos podem ser utilizados como chaves para objetos ou como nome de funções, como veremos mais para frente.


---
## Valores indefinidos
Há dois valores especiais, `null` e `undefined`, que são utilizados para indicar a falta de um valor próprio ─ são valores que indicam que não há informação. Muitas operações que não resultam em um valor válido produzem o valor `undefined` por serem obrigadas a retornar um valor. Contextualmente, não há diferença entre `null` e `undefined`, ou seja, você pode considerá-los sinônimos na maioria das vezes.

Alguns autores chegam a afirmar que esse é um acidente dentro do projeto da linguagem. Houve uma proposta de unificar esses valores, mas ela foi [rejeitada](http://wiki.ecmascript.org/doku.php?id=harmony%3atypeof_null).  

Podemos notar uma diferença entre os dois valores quando utilizamos o operador `typeof` da linguagem, que fornece que fornece uma string nomeando o tipo do próximo valor dado à ela. Por exemplo:

{% simplecode js %}
``` js
typeof 3.2;             // → "number"
typeof "a";             // → "string"
typeof Symbol();        // → "symbol"
typeof (true && true);  // → "boolean"
typeof null;            // → "object"
typeof undefined;       // → "undefined"
```
{% endsimplecode %}

---
## Conclusão

Esse artigo ficou um pouco longo, mas acho importante ter esse entendimento inicial de valores e operações básicas para compreensão do JavaScript. Para os próximos artigos, trataremos de assuntos como variáveis, atribuições e de suas especialidades.

Até a próxima.
