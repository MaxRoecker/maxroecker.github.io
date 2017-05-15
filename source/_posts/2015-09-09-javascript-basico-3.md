---
title: 'JavaScript Básico #3: Variáveis e atribuições'
description: ''
cover:
  path: cover.jpg
  title: Tetrahemihexahedron
  src: 'https://www.flickr.com/photos/21649179@N00/4282044498'
featured: false
date: 2015-09-09 15:34:36
tags:
 - javascript
---
{% quote   %}
**va.ri.á.vel:** 1. Sujeito a variação; 2. Que pode ser variado ou mudado; 3. Inconstante.
{% endquote %}

No [artigo anterior](http://maxroecker.com/javascript-basico-2/) vemos como manipular basicamente os valores de tipo primitivo da linguagem, entre eles: números, strings, booleanos, símbolos e valores indefinidos. Também vimos como fazer algumas operações aritméticas e de comparação entre expressões. Com tudo isso, você pode utilizar o JavaScript e o console como uma calculadora. Nesse texto vamos compreender a criação de variáveis e de atribuições de valores à elas.

---
## Variáveis

Todo valor avaliado pelo JavaScript precisa ser armazenado em um local na memória do computador, para identificarmos o local onde armazenarmos valores utilizamos as **variáveis**. Em uma definição bem simples, variáveis são nomes para os locais onde os valores são armazenados. Mais detalhadamente, variáveis também são valores, valores que indicam o endereço de outros valores na memória do computador. Ou seja, quando você precisar de o valor, você chama pelo “nome” da variável, e ela indica o endereço de memória onde o seu valor está. Tudo isso acontece por baixo dos panos. Simples, não?

{% quote author:"Fred Brooks" place:"The Mythical Man-Month"   %}
A representação é a essência da programação.
{% endquote %}

Para criar uma variável, você utiliza a palavra {% c var %} e em seguida o nome que deseja dar à ela. Variáveis podem ter qualquer nome, com exceção de palavras reservadas ─ {% c var %}, por exemplo, é uma palavra reservada ─ e também conter números e os símbolos de pontuação {% c $ %} e {% c _ %}. Você pode atribuir um valor à uma variável através do operador {% c = %}. Quando atribuímos um valor a variável, dizemos que a variável "aponta" para o valor. Por exemplo:


{% simplecode js %}
``` js
var a = 3
var $b = a * a
console.log('Valor de a: ', a)   // → Valor de a: 3
console.log('Valor de $b: ', $b) // → Valor de $b: 9
```
{% endsimplecode %}


Na verdade, variáveis até podem ser declaradas sem a palavra-chave {% c var %}. Por exemplo, a expressão {% c "x = \"foo\"" %} é valida, porém com o efeito de atribuir a variável em escopo global. **Você não deve utilizar esse tipo de declaração**, pois é considerada uma má prática de escrita de código, pois polui o escopo global e aumenta a probabilidade de erros por conflito. Vamos voltar a falar sobre o escopo de variáveis quando falarmos sobre funções.

{% figure 'Uma variável *foo* não guarda o valor *"bar"* atribuído a ela, mas sim o endereço de memória onde o valor está armazenado.' %}
{% asset_img 'variables-values.svg' [Ilustração de analogia de uma variável e seu respectivo valor através de um cordão] %}
{% endfigure %}

É importante ter em mente que variáveis não devem ser interpretadas como "caixas" que guardam os valores, mas sim como "placas" que apontam para onde os valores estão. Assim como placas, você pode redirecionar uma variável, e por isso você pode reutilizar uma variável para outros valores. Veja o exemplo abaixo:

{% simplecode js %}
``` js
var tempo = 'Sol'
var temperatura = 22
console.log('Tempo agora: %s %d°', tempo, temperatura)  // → Tempo agora: Sol 22°

tempo = 'Nublado'
temperatura = temperatura - 2
console.log('Tempo agora: %s %d°', tempo, temperatura)  // → Tempo agora: Nublado 20°
```
{% endsimplecode %}

Podemos ver que mudamos o valor da variável {% c "tempo" %}, assim como utilizamos o valor da variável {% c "temperatura" %} para alterar a si mesma. Os símbolos dentro da string na função de log são utilizadas para [interpolação de string](https://en.wikipedia.org/wiki/String_interpolation). Interpolaçao de strings é uma técnica elas substituem o símbolo pelo valor das variáveis dadas na sequência. No exemplo, o símbolo {% c "%s" %} indica que o valor é uma string, enquanto o {% c "%d" %} indica que o valor é um número; por isso primeiro colocamos a variável {% c "tempo" %} e depois a variável {% c "temperatura" %}. Outra coisa, você percebeu que só um {% c "var" %} pode declarar várias variáveis? Basta separá-las por vírgulas.

### Atalhos de atribuição

Muitas vezes a mesma variável fornece e recebe o valor para uma expressão ─ como é o caso da variável {% c "temperatura" %} do exemplo anterior ─ e por isso há alguns atalhos para o operador de atribuição que diminuem nosso código. Veja a seguir:

{% simplecode js %}
``` js
var tempo = 'Sol', temperatura = 22
console.log('Tempo agora: %s %d°', tempo, temperatura)  // → Tempo agora: Sol 22°

tempo += ' com nuvens'
temperatura -= 2
console.log('Tempo agora: %s %d°', tempo, temperatura)  // → Tempo agora: Sol com nuvens 20°
```
{% endsimplecode %}

Esses atalhos também funcionam para os operadores aritméticos ─ {% c "\*" %}, {% c "\/" %} e {% c "\%" %} ─ apesar de serem menos utilizados.

No [artigo anterior](http://maxroecker.com/javascript-basico-2/), falamos brevemente dos operadores de **incremento** ({% c "++" %}) e **decremento** ({% c "--" %}) que só funcionam para valores inteiros. Tais são muito utilizados junto com variáveis, veja o exemplo abaixo:

{% simplecode js %}
``` js
var t1 = 22
var t2 = 10

console.log("Temperatura 1: %d°", t1++)   // → Temperatura 1: 22°
console.log("Temperatura 2: %d°", ++t2)   // → Temperatura 2: 11°
```
{% endsimplecode %}

Notou uma diferença? Por que o valor de {% c "t1" %} continua o mesmo ainda que utilizamos o incremento? A resposta se encontra na posição do operador. No primeiro caso, colocamos o operador **sucede** da variável, dessa forma a variável só vai ser incrementada após a avaliação da expressão (Nesse caso, após a impressão na tela). Já para {% c "t2" %}, o operador **precede** a variável e dessa forma o valor é incrementado antes da avaliação da expressão. Caso tenha curiosidade, o valor de {% c "t1" %} no console será 23, pois foi increntado após a execução da expressão; mas quando foi impresso na tela, seu valor ainda era 22. Tudo isso também vale para o {% c "--" %}.


### Atribuição condicional

É possível atribuir valores para varáveis de forma condicional. Imagine por exemplo que você tenha a necessidade de um valor de uma variável, mas não há como saber se ela foi declarada anteriormente ou não. Você pode sucintamente resolver esse problema da seguinte forma:

{% simplecode js %}
``` js
var foo = bar || 1
console.log(foo) // → 1;
```
{% endsimplecode %}

Essa atribuição funciona pois o operador {% c "||" %}, quando operando dois valores, retorna o primeiro valor que for verdadeiro (isto é, não seja considerado *falsy*). Assim, se o primeiro valor for {% c "undefined" %}, ele retorna o segundo valor. Dessa forma, sempre podemos atribuir valores padrão para variáveis caso os valores usuais não estejam definidos. Veja outros exemplos:

{% simplecode js %}
``` js
var foo = undefined || null || 1
console.log(foo) // → 1
foo = 2 || null
console.log(foo) // → 2
```
{% endsimplecode %}

## Conclusão

Variáveis são o principal meio de acesso à memória que, quando utilizadas juntas com valores, são de suma importância para a execução de qualquer código e na representação dos dados. No próximo artigo veremos as declarações de controle de fluxo de execução, como condicionais ou de repetições, para evoluirmos ainda mais a nossa capacidade de desenvolver códigos em JavaScript.
