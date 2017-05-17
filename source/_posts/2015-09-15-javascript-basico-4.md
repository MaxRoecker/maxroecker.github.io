---
title: 'JavaScript Básico #4: Declarações de controle'
description: 'Entenda o pequeno conjunto de declarações de controle do JavaScript e como utilizar em seus códigos.'
cover:
  path: cover.jpg
  title: Tetrahemihexahedron
  src: 'https://www.flickr.com/photos/21649179@N00/4282044498'
featured: false
date: 2015-09-15 16:25:51
tags:
 - javascript
---
{% quote %}
**de.cla.ra.ção:** 1. Ação ou efeito de declarar; 2. Afirmação formal; 3. Asserção explícita.
{% endquote %}

No [artigo anterior](http://maxroecker.com/javascript-basico-3/) vimos como criar variáveis e atribuir valores à elas. Também foi mostrado alguns atalhos de atribuição que você pode utilizar em seu código. Porém só com isso não é possível construir códigos ricos e resolver problemas cotidianos. Nesse texto vamos compreender a criação de declarações, com ênfase nas declarações de controle que o JavaScript possui. Esse artigo provavelmente será um pouco extenso, pois acho importante entender esse conteúdo de uma vez só.

A partir de agora nossos códigos começam a ficar mais extensos, contendo várias linhas. O console JavaScript dos navegadores não é adequado para essas situações. Salvar os códigos em arquivos JavaScript e executá-los no Node.js é uma boa opção. Para executar, por exemplo, um arquivo chamado example.js no Node, você pode acessar o diretório do arquivo no terminal e digitar:

{% simplecode bash %}
``` bash
$ node example.js
```
{% endsimplecode %}

## Expressões e Declarações ##

**Expressões** são declarações de código que produzem um valor. Como visto nos artigos passados, nós utilizamos expressões a todo momento no JavaScript: uma atribuição é uma expressão, uma comparação é uma expressão, uma operação aritmética é uma expressão e até mesmo o próprio valor primitivo é uma expressão. Também vimos que expressões podem ser aninhadas umas às outras, para aumentar seu poder de expressividade.

Todavia, somente expressões não resolvem os problemas que precisamos lidar quando estamos codificando. Por exemplo, muitas vezes queremos que um fragmento do código seja executado dada uma condição; ou ainda, queremos que um trecho de código seja executado múltiplas vezes. Para isso nós utilizamos as declarações de controle de fluxo.

As **Declarações**, também chamadas de *statements*, são rótulos e símbolos especiais que descrevem o comportamento do código. O JavaScript possui um conjunto compacto de declarações ─ especialmente as de controle de fluxo ─, que são utilizadas para incorporar expressividade para o seu código. Em JavaScript, toda declaração deve ser concluída com um {% c ";" %}. As expressões vistas anteriormente também são declarações, com o diferencial de retornarem um valor.

## Declaração de bloco
Uma das declarações mais básicas da linguagem é a de definição de bloco, utilizada para agrupar um conjunto de outras declarações. Todo bloco é delimitado por um par de chaves {% c "{}" %}.

{% simplecode %}
```
{
  declaração 1;
  declaração 2;
  declaração 3;
  …
}
```
{% endsimplecode %}

**Importante:** Em JavaScript, um bloco não define o escopo das variáveis declaradas com {% c "var" %}, como é o caso de linguagens como o C ou Java. O escopo em JavaScript está intimamente ligado com a declaração de funções ─ vamos aprofundar o assunto de escopo de variáveis em artigos futuros. Veja o exemplo:

{% simplecode js %}
``` js
var a = 1
{
  var a = 0
}
console.log(a)  // → 0
```
{% endsimplecode %}

## Declarações condicionais ##

Uma declaração condicional é uma declaração de controle de fluxo que executa ou não um trecho de código dependendo de uma condição a ser avaliada.

### if … else ###

{% figure alt:"Esquema visual representando a declaração if" caption:"A declaração *if* cria um desvio condicional no fluxo de execução, representado na figura pelas setas coloridas." width:1024 height:256 %}
{% asset_path "statement-if.svg" %}
{% endfigure %}

A declaração {% c "if" %} tem o comportamento de executar a próxima declaração ou bloco de declarações, se a condição avaliada seja {% c "true" %}. Pode também ser utilizada com o {% c "else" %} e assim executar a declaração que o sucede se o valor da condição for {% c "false" %}. A sintaxe do {% c "if" %} pode ser dada:

{% simplecode %}
```
if (condição)
  declaração
else
  declaração
```
{% endsimplecode %}

Veja um exemplo abaixo:

{% simplecode js %}
``` js
if (cond0)
  console.log('Condição 0 verdadeira!')

if (cond0) {
  console.log('Bloco de declarações')
  console.log('Condição 0 também verdadeira!')
} else
  console.log('Condição falsa!')

if (cond1) {
  console.log('Condição 1 verdadeira!')
} else if (cond2) {
  console.log('Condição 1 é falsa e condição 2 verdadeira!')
} else {
  console.log('Ambas as condições são falsas')
}
```
{% endsimplecode %}


#### Valores Falsy ####

Nas declarações condicionais, a condição precisa ser uma expressão que seja avaliada em {% c "true" %} ou {% c "false" %}. Mas não necessariamente precisa ser do tipo booleano que já vimos anteriormente. O JavaScript, em sua conversão de tipos, avalia alguns valores especiais automaticamente para {% c "false" %} quando passados em uma condição. Esses valores são chamados de ***Falsy***. São eles:

* {% c "undefined" %} e {% c "null" %}
* Valor numérico {% c "0" %} e {% c "NaN" %}
* Uma String vazia {% c "\"\"" %}

Qualquer outro valor, incluindo objetos, são avaliados como {% c "true" %}. E por isso é preciso atenção especial com valores primitivos booleanos {% c "true" %} e {% c "false" %} com os valores booleanos do objeto Boolean. Veja o exemplo abaixo:

{% simplecode js %}
``` js
var p = false
var o = new Boolean(p)

if (p)
  console.log('A condição é falsa, pois p é do tipo boolean')
if (o)
  console.log('A condição é verdadeira pois c é um objeto.')
```
{% endsimplecode %}

### switch … case ###

{% figure alt:"Representação gráfica da declaração switch … case" caption:"A declaração switch cria uma cadeia de desvios condicionais no fluxo de execução, representado na figura novamente pelas setas coloridas" width:1024 height:256 %}
{% asset_path "statement-switch.svg" %}
{% endfigure %}

O {% c "switch" %} é uma declaração condicional poderosa e complexa que permite que o desenvolvedor escreva uma expressão de condição e teste o valor do seu resultado com algum valor rotulado. Se houver combinação, o programa executa as declarações associadas a ele. Sua sintaxe pode ser resumida em:

{% simplecode  %}
```
switch ( condição ) {
  case valor:
    declaração
  case valor:
    declaração
  …
  default:
    declaração
}
```
{% endsimplecode %}

Para cada tipo de dado da condição, o {% c "switch" %} apresenta um comportamento diferente:

* Para números inteiros, há combinação se o valor da condição é menor que o valor do rótulo.
* Para strings, há combinação se o valor da condição é igual ao valor do rótulo.

Vamos ver na prática! Teste o código abaixo, alterando o valor da variável {% c "temperatura" %} e {% c "clima" %} para ver outros resultados.

{% simplecode js %}
``` js
var temperatura = 0
switch (temperatura) {
  case 0:
    console.log('Temperatura: 0 graus')
  case 20:
    console.log('Temperatura: 20 graus')
  case 30:
    console.log('Temperatura: 30 graus')
  default:
    console.log('Temperatura: acima de 30 graus')
}

var clima = 'Sol'
switch (clima) {
  case 'Sol':
    console.log('Hoje está um dia de sol')
  case 'Nublado':
    console.log('Hoje o céu está nublado')
  case 'Chuva':
    console.log('Hoje está chuvoso')
  default:
    console.log('Clima não informado')
}
```
{% endsimplecode %}

Entendeu o comportamento do código? O JavaScript, ao se deparar com uma declaração {% c "switch" %} primeiramente avalia a expressão de condição e inicia uma cadeia de busca de rótulos que combinem com a condição. Caso houver combinação, as declarações associadas a ele são executadas. Quando todas as declarações foram executadas, então o JavaScript **procura pelo próximo rótulo que combine com valor e repete o processo**. Quando o rótulo {% c "default" %} é atingido, as declarações associadas a ele são executadas automaticamente, independente do valor.

Caso você queira que somente um dos rótulos seja combinado com a condição a expressão {% c "break" %} ─ saída do bloco ─ ao fim das declarações de cada rótulo. Dessa forma, o primeiro rótulo combinado é executado e sai fora do {% c "switch" %}.

{% simplecode js %}
``` js
var temperatura = 0
switch (temperatura) {
  case 0:
    console.log('Temperatura: 0 graus')
    break
  case 20:
    console.log('Temperatura: 20 graus')
    break
  case 30:
    console.log('Temperatura: 30 graus')
    break
  default:
    console.log('Temperatura: acima de 30 graus')
}

var clima = 'Sol'
switch (clima) {
  case 'Sol':
    console.log('Hoje está um dia de sol')
    break
  case 'Nublado':
    console.log('Hoje o céu está nublado')
    break
  case 'Chuva':
    console.log('Hoje está chuvoso')
    break
  default:
    console.log('Clima não informado')
}
```
{% endsimplecode %}

Por conveção, o rótulo {% c "default" %} é sempre colocado como único ao final do bloco, mas não precisa necessariamente ser assim. ***:)***

---
## Declarações de laço ##

Declarações de laço são utilizadas para executar código repetido. Há três principais declarações de laço em JavaScript: **for**, **while**, e **do … while**. Também é possível dar rótulos para esses laços e localiza-los através de um nome com as declarações **label**, **break** e **continue**.

### while ###

{% figure alt:"Representação gráfica da declaração while" caption:"A declaração *while* cria uma repetição condicional não-determinada" width:1024 height:256 %}
{% asset_path "statement-while.svg" %}
{% endfigure %}

A declaração {% c "while" %}, a mais simples das declarações de laço, executa a próxima declaração enquanto o valor da sua condição for {% c "true" %}. Sua sintaxe é:

{% simplecode  %}
```
while (condição)
  declaração
```
{% endsimplecode %}

Se a condição for eventualmente {% c "false" %}, o laço para de ser executado e o controle para a próxima declaração após ele. A condição é sempre testada **antes** das declarações serem executadas.

Vamos calcular 2<sup>10</sup> utilizando o {% c "while" %}, veja o código abaixo:

{% simplecode js %}
``` js
var resultado = 1
var expoente = 0

while (expoente < 10) {
  resultado = resultado * 2
  expoente++
}

console.log(resultado) // → 1024
```
{% endsimplecode %}

Para fazer laços infinitos, ou seja, laços que nunca param, basta colocar a condição como {% c "true" %}.

### do … while ###
A declaração {% c "do … while" %},  tem um comportamento parecido com o {% c "while" %}: executa a declaração enquanto a condição for verdadeira. Sua sintaxe é:

{% simplecode %}
```
do
  declaração
while (condição);
```
{% endsimplecode %}

A diferença entre as duas é que a condição é testada **depois** da execução da declaração. Se a condição for {% c "false" %}, o laço para de ser executado e o controle para a pŕoxima declaração após ele.

Usando o mesmo exemplo anterior, vamos calcular 2<sup>10</sup> utilizando o {% c "do … while" %}, veja o código abaixo:

{% simplecode js %}
``` js
var resultado = 1
var expoente = 0

do {
  resultado = resultado * 2
  expoente += 1
} while (expoente < 10)

console.log(resultado) // → 1024
```
{% endsimplecode %}

Laços infinitos também podem ser feitos bastando colocar a condição como {% c "true" %}.

### for ###

{% figure alt:"Representação gráfica da declaração for" caption:"A declaração *for* cria uma repetição condicional determinada em passos" width:1024 height:256 %}
{% asset_path "statement-for.svg" %}
{% endfigure %}

Um laço {% c "for" %} também repete a próxima declaração até que a condição dada seja {% c "false" %}. Porém, junto com a condição, ela carrega outras duas declarações: a inicialização e o passo. Tem sintaxe parecida com Java e C:

{% simplecode  %}
```
for (inicialização; condição; passo)
  declaração
```
{% endsimplecode %}

Um {% c "for" %}, ao ser executado, executa os seguintes passos ordenadamente:

1. Executa a inicialização
2. Se a condição é {% c "true" %}, executa a declaração correspondente; se for {% c "false" %}, sai do laço sem executar a declaração nem o passo;
3. Executa o passo;

Com essa sintaxe, a inicialização é normalmente utilizada para atribuir valores iniciais às variáveis de controle. Já o passo, indica qual o ritmo que o for deve ter. Lembre-se, como a inicialização e o passo são declarações, podem ser vazias também para criar laços infinitos.

Vamos ver o mesmo exemplo de cálculo de 2<sup>10</sup> escrito com {% c "for" %}:

{% simplecode js %}
``` js
var resultado = 1

for (var expoente = 0; expoente < 10; expoente++)
  resultado = resultado * 2

console.log(resultado) // → 1024
```
{% endsimplecode %}

Veja que a variável **expoente** foi declarada na inicialização do laço, e o seu passo é dado de 1 em 1.

### Declarações de rótulo e quebra de laço ###

Como já dito, o JavaScript permite a criação de rótulos que identificam uma declaração, assim como variáveis identificam valores. Qualquer declaração pode ser rotulada e interrompida, porém esse recurso é mais utilizada em laços aninhados. Dessa forma, você pode interromper a execução de laços aninhados específicos de forma declarativa.

#### label ####

Declaração de rotulação que marca uma posição em seu código. O rótulo segue as mesmas regras que nomes dados para variáveis. Dada pela sintaxe:

{% simplecode  %}
```
rótulo:
declaração de laço
```
{% endsimplecode %}


#### break ####

A declaração {% c "break" %} sem um rótulo interrompe a execução de um laço ou {% c "switch" %}, como visto anteriormente, mais interno. Ou seja, se há dois laços aninhados e houver um break, o laço "de dentro" será interrompido.

Quando utilizados com um {% c "label" %}, interrompe a execução da declaração rotulada com o {% c "label" %}. Sua sintaxe é simples:

{% simplecode  %}
```
break;
break [rótulo];
```
{% endsimplecode %}

#### continue ####
A declaração {% c "continue" %} tem um comportamento diferente quando acompanhado de um rótulo ou não. Quando sem rótulo, o {% c "continue" %} pula a atual iteração e passa para a próxima do laço mais interno. Quando acompanhado de um rótulo, faz o mesmo processo para o laço rotulado.

Ao contrário do {% c "break" %} que cancela a execução do laço, o {% c "continue" %} somente pula a iteração atual. Caso seja um {% c "while" %} ou  {% c "do … while" %}, o {% c "continue" %} pula para a verificação da condição. Caso seja um {% c "for" %}, ele pula para a declaração de passo. Sua sintaxe é:

{% simplecode  %}
```
continue;
continue [rótulo];
```
{% endsimplecode %}

O exemplo abaixo é um modo *ruim e pouco eficiente* de exibir os naturais menores que 100 ─ mas auxilia a compreensão dos comandos mostrados.

{% simplecode js %}
``` js
var j = 0
lacoExterno:
for (var i = 0; i < 100; i += 10) {
  j = 0
  while (true) {
    if (j < 10) {
      console.log(j + i)
      j++
    } else {
      continue lacoExterno
    }
  }
}
```
{% endsimplecode %}

## Declaração vazia ##
Uma declaração vazia é somente um {% c ";" %}, indicando que nenhuma outra declaração deve ser executada. Uma declaração vazia pode ser utilizada em algumas declarações de laço. Veja o exemplo abaixo onde zeramos um array com um {% c "for" %} em declaração um vazia:

{% simplecode js %}
``` js
var array = [1, 2, 3]

for (var i = 0; i < 3; array[i++] = 0) {}

console.log(array) // → [0,0,0]
```
{% endsimplecode %}

## Conclusão ##

Declarações são os blocos de construção da linguagem. Utilizar declarações em sequência dá ao seu código novas maneiras de ser executado, permitindo interferir no fluxo com que as instruções são executadas de acordo com as condições que você desejar. Já os valores, que também são declarações, sempre resultam um valor e podem ser utilizados em variáveis e também em outras declarações.

A partir de agora você já pode elaborar algoritmos e codificar programas simples e escrevê-los em JavaScript.
