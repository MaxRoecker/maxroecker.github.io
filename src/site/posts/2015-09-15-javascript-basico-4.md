---
title: 'JavaScript Básico #4'
subtitle: 'Declarações de controle'
heading: 'Entenda o conjunto de declarações de controle do JavaScript e como utilizar em seus códigos.'
created: 2015-09-15 16:25:51
tags:
  - javascript
  - post
---

No [artigo anterior](http://maxroecker.github.io/blog/javascript-basico-3/)
vimos como criar variáveis e atribuir valores à elas. Também foi mostrado alguns
atalhos de atribuição e formas de modificar os valores das variáveis. Nesse
texto vamos aumentar nossa compreensão de códigos em JavaScript e entender as
declarações de controle que a linguagem possui.

<aside> <p> <strong>de·cla·ra·ção:</strong> (1) Ação ou efeito de declarar; (2)
Afirmação formal; (3) Asserção explícita; </p> </aside>

A partir de agora nossos códigos começam a ficar mais extensos, contendo várias
linhas. O console JavaScript dos navegadores não é adequado para essas
situações. Salvar os códigos em arquivos JavaScript e executá-los no Node.js é
uma boa opção. Para executar, por exemplo, um arquivo chamado `example.js` no
Node, você pode acessar o diretório do arquivo no terminal e digitar:

<pre><kbd>node example.js</kbd></pre>

## Expressões e Declarações

**Expressões** são declarações de código que produzem um valor. Como visto
anteriormente, nós utilizamos expressões a todo momento no JavaScript: uma
atribuição é uma expressão, uma comparação é uma expressão, uma operação
aritmética é uma expressão, entre outras.

Todavia, somente expressões não resolvem os problemas que precisamos lidar
quando estamos codificando. Por exemplo, muitas vezes queremos que um fragmento
do código seja executado dada uma condição; ou ainda, queremos que um trecho de
código seja executado múltiplas vezes. Para isso nós utilizamos as declarações
de controle de fluxo.

**Declarações** de controle de fluxo, também chamadas de <i
lang="en">statements</i>, são palavras chaves que descrevem o comportamento do
código. O JavaScript possui um conjunto compacto de declarações que podem ser
combinadas para adicionar complexidade o seu código. Expressões também são
declarações, mas possuem a diferença de que sempre retornam um valor.

## Declaração de bloco

Uma das declarações mais básicas da linguagem é a de definição de bloco,
utilizada para agrupar um conjunto de outras declarações. Todo bloco é
delimitado por um par de chaves `{…}`.

```text
{
  [declaração 1]
  [declaração 2]
  [declaração 3]
  […]
}
```

**Importante:** Diferente das linguagens C ou Java, no JavaScript, um bloco não
define o escopo das variáveis declaradas com `var`. O escopo em JavaScript está
intimamente ligado com a declaração de funções. Vamos aprofundar o assunto de
escopo de variáveis em artigos futuros, mas veja o exemplo abaixo para entender
melhor:

```js
var a = 0;
{
  console.log(a); // → 0
  var a = 1;
  console.log(a); // → 1
}
console.log(a); // → 1
```

A variável `a` não é oculta pela segunda declaração de uma variável com mesmo
nome. Ambas as declarações são a mesma variável. Por isso, após a saída do
bloco, o valor alterado dentro do bloco é mantido.

## Declarações condicionais

Uma declaração condicional é uma declaração de controle de fluxo que executa ou
não um trecho de código dependendo de uma condição booleana a ser avaliada.

### Condicional única `if … else`

A declaração `if` tem o comportamento de executar a próxima declaração ou bloco
de declarações, se a condição avaliada seja `true`. Um `if` pode ser pareado com
um `else` e assim executar a declaração que o sucede se o valor da condição for
`false`. Você também pode encadear vários `if`, que serão testados um de cada
vez. Veja o exemplo:

```js
if (condicao1) console.log('Condição 1 verdadeira');

if (condicao2) {
  console.log('Bloco de declarações');
  console.log('Condição 2 também verdadeira');
} else console.log('Condição 2 falsa');

if (condicao3) {
  console.log('Condição 3 verdadeira');
} else if (condicao4) {
  console.log('Condição 3 é falsa e condição 4 verdadeira');
} else {
  console.log('Condição 3 e 4 são falsas');
}
```

#### _Falsy_ e _Truthy_

Nas declarações condicionais, a condição sempre avaliada a expressão em `true`
ou `false`. No entanto, mesmo que a expressão não seja do tipo booleano, o
JavaScript, em sua coersão de tipos, trata alguns valores especiais e os avalia
como `false` quando são utilizados em um contexto booleano. Esses valores são
chamados de _falsy_. São eles:

- Valores indefinidos `undefined` e `null`;
- Números `0` e `NaN`;
- String vazia `""` e `''`.

Qualquer outro valor da linguagem JavaScript, incluindo objetos, são avaliados
como `true` e por são chamados de _truthy_. Por isso é preciso atenção especial
com valores primitivos `true` e `false` e com instâncias de Boolean. Veja o
exemplo abaixo:

```js
var p = false;
var o = new Boolean(false);

if (p) console.log('A condição é falsa, pois p é do tipo boolean');
if (o) console.log('A condição é verdadeira pois c é um objeto.');
```

### Condicional múltipla `switch … case`

O `switch` é uma declaração condicional poderosa e complexa que permite que o
desenvolvedor escreva uma expressão de condição combine uma expressão com um
valor enumerado. Se houver combinação, o `switch` é ativado e executa as
declarações que seguem. Sua sintaxe pode ser resumida em:

```text
switch ([expressão]) {
  case [expressão1]:
    [declaração]
  case [expressão2]:
    [declaração]
  …
  default:
    [declaração]
}
```

O `switch` possui um mecanismo de <i lang="en">fall-through</i>, ou seja, a
partir do momento que a expressão combina com um valor, todas as próximas
declarações são executadas também. Veja no exemplo abaixo:

```js
var temperatura = 20;
switch (temperatura) {
  case 0:
    console.log('Temperatura: 0 graus');
  case 20:
    console.log('Temperatura: 20 graus');
  case 30:
    console.log('Temperatura: 30 graus');
  default:
    console.log('Temperatura: acima de 30 graus');
}

var clima = 'Nublado';
switch (clima) {
  case 'Sol':
    console.log('Hoje está um dia de sol');
  case 'Nublado':
    console.log('Hoje o céu está nublado');
  case 'Chuva':
    console.log('Hoje está chuvoso');
  default:
    console.log('Clima não informado');
}
```

Podemos ver a saída desse código abaixo:

<pre><samp>Temperatura: 20 graus
Temperatura: 30 graus
Temperatura: acima de 30 graus
Hoje o céu está nublado
Hoje está chuvoso
Clima não informado</samp></pre>

O JavaScript, ao se deparar com uma declaração `switch` primeiramente avalia a
expressão de condição e inicia uma cadeia de busca de rótulos que combinem com a
condição. Caso houver combinação, as declarações associadas a ele são
executadas. Além disso, o mecanismo de <i lang="en">fall-through</i> também é
ativado. Assim, todas as declarações abaixo do valor combinado também são
executadas, inclusive a declaração `default`.

Caso você não queira que o mecanismo de <i lang="en">fall-through</i> tenha
efeito, você pode utilizar a declaração `break` que força a saída do fluxo do
`switch`. Veja o mesmo código anterior utilizando o `break` para cada uma das
condições:

```js
var temperatura = 20;
switch (temperatura) {
  case 0:
    console.log('Temperatura: 0 graus');
    break;
  case 20:
    console.log('Temperatura: 20 graus');
    break;
  case 30:
    console.log('Temperatura: 30 graus');
    break;
  default:
    console.log('Temperatura: acima de 30 graus');
    break;
}

var clima = 'Nublado';
switch (clima) {
  case 'Sol':
    console.log('Hoje está um dia de sol');
    break;
  case 'Nublado':
    console.log('Hoje o céu está nublado');
    break;
  case 'Chuva':
    console.log('Hoje está chuvoso');
    break;
  default:
    console.log('Clima não informado');
    break;
}
```

Que vai ter, como esperado, a saída:

<pre><samp>Temperatura: 20 graus
Hoje o céu está nublado</samp></pre>

Por utilidade, o `default` é sempre colocado ao final do bloco, mas não precisa
necessariamente ser assim. O efeito colateral de colocar o `default` antes do
final é que, por ele ativar o mecanismo de <i lang="en">fall-through</i>,
qualquer declaração abaixo também será executada, o que é raramente desejado.

## Declarações de laço

Declarações de laço são utilizadas para executar código repetido. Há três
principais declarações de laço em JavaScript: `for`, `while`, e `do … while`.
Também é possível dar rótulos para esses laços e localizá-los através de um nome
com as declarações `label`, `break` e `continue`.

### Laço condicional simples `while`

A declaração `while`, a mais simples das declarações de laço, executa a próxima
declaração enquanto o valor da expressão avaliada for `true`. Se a expressão for
`false`, o laço para de ser executado e o fluxo segue para a próxima declaração
após o laço. A expressão de condição é sempre testada antes das declarações
serem executadas. Para fazer laços infinitos, ou seja, laços que nunca param,
basta colocar a condição como `true`.

Vamos calcular {% math "2^{10}" %} utilizando o `while`, veja o código abaixo:

```js
var resultado = 1;
var expoente = 0;

while (expoente < 10) {
  resultado = resultado * 2;
  expoente++;
}

console.log(resultado); // → 1024
```

### Laço condicional simples `do…while`

A declaração `do…while` tem um comportamento parecido com o `while`: executa uma
enquanto uma condição booleana é `true`. A diferença entre o `while` e o
`do…while` é a ordem de avaliação da expre ssão da condição em relação a
declaração. Enquanto no `while`, se a expressão for `false`, a declaração não
chega nem a ser executada, para o `do…while`, a declaração é sempre executada ao
menos uma vez, indepentende da expressão ser `true` ou `false`. Laços infinitos
também podem ser feitos bastando colocar a condição como `true`.

Usando o mesmo exemplo anterior, vamos calcular {% math "2^{10}" %} utilizando o
`do … while`, veja o código abaixo:

```js
var resultado = 1;
var expoente = 0;

do {
  resultado = resultado * 2;
  expoente += 1;
} while (expoente < 10);

console.log(resultado); // → 1024
```

### Laços completos com `for`

Um laço `for` também repete a próxima declaração até que a condição dada
avaliada como `false`. Porém, junto com a condição, ela carrega outras duas
declarações: a **inicialização** e o **passo**. Um `for`, ao ser executado, faz
os seguintes passos ordenadamente:

1. Executa a inicialização
2. Se a condição é `true`, executa a declaração correspondente; se for `false`,
   sai do laço sem executar a declaração nem o passo;
3. Executa o passo e volta ao item número 2.

A inicialização é normalmente utilizada para atribuir valores iniciais às
variáveis de controle. Já o passo, indica qual o ritmo que o `for` deve ter.
Lembre-se, como a inicialização e o passo são declarações, podem ser vazias
também para criar laços infinitos.

Vamos ver o mesmo exemplo de cálculo de {% math "2^{10}" %} escrito com `for`:

```js
var resultado = 1;

for (var expoente = 0; expoente < 10; expoente += 1) {
  resultado = resultado * 2;
}

console.log(resultado); // → 1024
```

Veja que a variável **expoente** foi declarada na inicialização do laço, e o seu
passo é dado de 1 em 1.

### Declarações de rótulo e quebra de fluxo

O JavaScript permite a criação de rótulos que identificam uma declaração.
Qualquer declaração pode ser rotulada, porém esse recurso é mais utilizada em
laços aninhados. Dessa forma, você pode interromper a execução de laços
aninhados específicos de forma declarativa.

#### Declarações de rótulo

Declaração de rotulação que marca uma posição em seu código. O rótulo segue as
mesmas regras que nomes dados para variáveis. Dada pela sintaxe:

```text
[rótulo]: [declaração]
```

#### Quebra de fluxo com `break`

Como já vimos no exemplo do `switch`, a declaração `break` sem um rótulo
interrompe a execução da declaração atual. Em caso de laços, a declaração
`break` faz que o laço atual pare de ser executado imediatamente e continue a
execução a partir da próxima declaração após o laço. Podemos utilizar o `break`
acompanhado de um `label`, assim quando execução é interrompida, ela inicia a
partir da primeira declaração após o rótulo. Sua sintaxe é simples:

```text
break
break [rótulo]
```

#### Quebra de fluxo com `continue`

A declaração `continue` também quebra o fluxo de execução, mas só pode ser
utilizado em laços. Enquanto o `break` para a execução do laço, o `continue`
quebra a atual iteração do laço e inicia uma nova. Ou seja, faz com que a
condição seja testada novamente e, no caso do `for`, o passo seja executado
também. Quando acompanhado de um rótulo, o `continue` tem o mesmo comportamento,
mas para o laço rotulado. A sintaxe é

```text
continue
continue [rótulo]
```

O exemplo abaixo é um modo ruim e pouco eficiente de exibir os naturais menores
que 100 — mas auxilia a compreensão do `continue` e `break` junto a um rótulo
mostrados.

```js
var j = 0;
lacoExterno: for (var i = 0; ; i += 10) {
  j = 0;
  if (i >= 100) break lacoExterno;
  while (true) {
    if (j < 10) {
      console.log(j + i);
      j++;
    } else {
      continue lacoExterno;
    }
  }
}
```

## Conclusão

Declarações são os blocos de construção da linguagem. Utilizar declarações em
sequência dá ao seu código novas maneiras de ser executado, permitindo
interferir no fluxo com que as instruções são executadas de acordo com as
condições que você desejar. Já os valores, que também são declarações, sempre
resultam um valor e podem ser utilizados em variáveis e também em outras
declarações.
