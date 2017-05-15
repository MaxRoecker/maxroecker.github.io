---
title: 'JavaScript Intermediário #2: Programação assíncrona - Parte 1'
description: 'Compreenda nesse artigo uma das principais e mais importantes características do JavaScript: o modelo de concorrência e assincronismo.'
cover:
  path: cover.jpg
  title: 'Polyhedron models'
  src: 'https://www.flickr.com/photos/fdecomite/3274431349/in/album-72157613498998540/'
featured: false
date: 2016-01-13 17:47:20
tags:
  - javascript
---
> <b>as.sin.cro.nis.mo</b>: 1. Qualidade ou estado de assíncrono; 2. Ausência de concorrência no tempo.

Nesse texto, vamos entender um pouco mais sobre um paradigma importante quando estamos programando em JavaScript, e uma das principais características que levaram ao sucesso da linguagem em ambientes tão distintos como o navegador e o servidor:  o modelo de concorrência e assincronismo.

---
## Introdução rápida
O JavaScript é uma linguagem que foi fundamentalmente desenvolvida para ser executada de forma serial, ou seja, não paralela. Em um ambiente JavaScript, há somente um contexto sendo executado por vez, ou seja, não há múltiplos fluxos de instruções sendo executadas ao mesmo tempo,  tudo é executado em um só fluxo de instrução. Portanto, só há uma [pilha de execução](https://en.wikipedia.org/wiki/Call_stack).

Porém, mesmo sem suporte nativo ao paralelismo, o JavaScript possui um modelo de concorrência para garantir uso efetivo do processamento. Chamado informalmente de **Laço de Eventos** (*Event Loop*),  o modelo é fundamentalmente diferente de outras linguagens, tais como C ou Java.

---
## O Laço de Eventos (Event Loop)
### A pilha
No JavaScript, quando uma função é executada, um quadro (*frame*) é adicionado à pilha de execução. Se uma função chama outra função, então outro quadro é empilhado. Somente o topo da pilha se encontra dentro do contexto de execução.

Ao fim de execução de uma função, seu respectivo quadro é desempilhado e a função que a chamou volta a estar no contexto de execução. Quando a primeira função termina de executar, a pilha fica vazia. Veja a imagem abaixo.

{% figure "Um exemplo do comportamento da pilha durante a execução de um código" %}
{% asset_img scopes.svg [Ilustração do comportamento da pilha durante a execução do código, com a adição e remoção de escopos.] %}
{% endfigure %}

Nesse pequeno exemplo, adaptado de [um artigo do MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop), temos um pequeno código e o estado da pilha em diversos pontos de execução.

* **Estágio 0:** No início, temos uma pilha já iniciada com o quadro do escopo global — executado assim que o código é iniciado — que define as funções {% c "foo" %} e {% c "bar" %} e então chama a função {% c "bar" %}.
* **Estágio 1:** Nesse momento, um novo quadro é empilhado pois o código principal chama {% c "bar" %}.
* **Estágio 2:** A função {% c "bar" %} também chama outra função, {% c "foo" %}, logo o seu respectivo quadro também é empilhado.
* **Estágio 3:** Quando {% c "foo" %} termina sua execução, a mesma retorna o resultado para {% c "bar" %}.
* **Estágio 4:** A função {% c "bar" %} também termina e retorna para o escopo global.
* **Estágio 5:** Ao fim da execução do escopo global, seu quadro é removido e a pilha fica vazia.

Na grande maioria das linguagens, incluindo Java e C, quando a pilha está vazia significa que o programa foi finalizado. Mas no JavaScript o comportamento é diferente, devido à fila de trabalhos.


### A fila de trabalhos
[De acordo com a ECMAScript](http://www.ecma-international.org/ecma-262/6.0/#sec-jobs-and-job-queues), um **trabalho** é uma operação abstrata que inicia uma computação quando a pilha de execução está vazia. A **fila de trabalhos** é uma fila de registros de trabalhos com comportamento [FIFO](https://pt.wikipedia.org/wiki/FIFO) (primeiro a entrar é o primeiro a sair).

Um trabalho entra na fila de trabalhos quando está pronto para ser executado, mas somente entra em execução quando a pilha está vazia. Uma vez que entre em execução, o trabalho é executado até o fim sem qualquer interrupção.

Assim, quando a pilha fica vazia, um laço verifica a fila de trabalhos e coloca o primeiro da fila em execução. Esse processo se repete indefinidamente e se chama **Laço de Eventos** (*Event Loop*). Veja um pequeno exemplo abaixo:

{% figure "Exemplo do comportamento da pilha e da fila de trabalhos durante a execução de um código." %}
{% asset_img eventloop.svg [Ilustração do comportamento da pilha durante a execução do código, com a adição e remoção de escopos e de trabalhos da fila.] %}
{% endfigure %}

* **Estágio 0:** No início, o escopo global é executado e enfileira um trabalho {% c "T0"%}.
* **Estágio 1:** Logo depois, é enfileirado outro trabalho {% c "T1"%} devido ao lançamento de um evento, por exemplo.
* **Estágio 2:** O escopo global termina sua execução, então o Laço de Eventos pega o primeiro trabalho da fila, {% c "T0"%}, e o coloca em execução.
* **Estágio 3:** Em seguida, {% c "T0"%} adiciona mais um trabalho, {% c "T2"%}, na fila.
* **Estágio 4:** A execução de {% c "T0"%} é finalizada e o Laço de Eventos coloca agora o trabalho {% c "T1"%} para executar.
* **Estágio 5:** O trabalho {% c "T1"%} termina e {% c "T2"%} entra em execução. Ao fim, o Laço de Eventos aguarda mais trabalhos serem enfileirados para que possam ser executados.

### Enfileirando trabalhos
Na grande maioria dos motores JavaScript, incluindo os navegadores, trabalhos são adicionados à fila qualquer momento que um evento (*event*) ocorra, se ele possuir um ouvinte (*listener*). [Promessas (*Promises*)](http://www.ecma-international.org/ecma-262/6.0/#sec-promise-objects) — objetos especificados na ES6 — também enfileiram trabalhos. Porém, uma outra simples forma de adicionar um trabalho na fila de trabalhos é utilizar a função nativa {% c "setTimeout"%}.

A função {% c "setTimeout"%} possui dois parâmetros: o primeiro, uma função, é o trabalho que será enfileirado; e o segundo, um número, é o tempo (em milissegundos) de espera até que a função seja enfileirada. Veja e teste o exemplo de execução abaixo:

{% simplecode js %}
``` js
console.log('Antes dos timeouts')

setTimeout(function () {
  console.log('Primeiro timeout')
}, 3000)

setTimeout(function () {
  console.log('Segundo timeout')
}, 0)

console.log('Depois dos timeouts')
```
{% endsimplecode %}

A saída desse pequeno código será a seguinte:

{% simplecode  %}
```
→ Antes dos timeouts
→ Depois dos timeouts
→ Segundo timeout
→ Primeiro timeout
```
{% endsimplecode %}


**Mas porque o "segundo timeout" aparece depois de "depois dos timeouts" mesmo que o tempo de espera seja zero?** Bem, a função do segundo {% c "setTimeout"%} aguarda *zero milissegundos* e então é enfileirada e só é executada quando o fluxo principal é finalizado. Logo o comportamento segue exatamente o modelo explicado anteriormente.

O fluxo principal não é bloqueado porque colocamos em espera uma função, pois o {% c "setTimeout"%} simplesmente só enfileirou um trabalho após o tempo de espera. Note que chamar o {% c "setTimeout"%} irá somente adicionar o trabalho na fila após passar o tempo de espera. Se a fila estiver vazia e a pilha também, o trabalho será processado imediatamente. Porém se houver outra trabalho na frente ou a pilha não estiver vazia, a função do {% c "setTimeout"%} terá que esperar até que todos os trabalhos a sua frente sejam processados. **Portanto, tenha em mente que o segundo parâmetro garante um tempo mínimo, mas não o tempo exato até o início do processamento.**

---
## Conclusão
O modelo de concorrência e assincronismo implementado pelo JavaScript é um dos grandes diferenciais da linguagem. A concorrência de tarefas é realizada sem interrupções ou bloqueios, como é o caso das linguagens C ou Java, e por isso é um modelo de fácil aprendizado.

O mecanismo de assincronismo e concorrência do JavaScript não é só usado com {% c "setTimeout"%}. Para executar qualquer tipo de função onde um dos seus parâmetros dependa um resultado externo — como é o caso de *callbacks* e promessas — ou no tratamento de eventos — lançados pelo *DOM* ou por um *AJAX*, por exemplo — a utilização da programação assíncrona é obrigatória.

{% quote author:"Anders Hejlsberg" url:"https://channel9.msdn.com/blogs/charles/c-40-meet-the-design-team" %}
É inocência pensar que de alguma forma você irá ser capaz de adicionar concorrência em seu código sem ter que modificar nada em seu aplicativo para que ele execute concorrentemente.
{% endquote %}


Entretanto, há um preço a pagar pela simplicidade do modelo: seu código fica muito mais complexo e de difícil leitura, pois é necessário entender as circunstâncias em que um trabalho irá ser executado ou não. Afinal, concorrência é um problema complexo e  resolver um problema complexo força você a escolher uma solução complexa de um jeito ou de outro. Um clássico exemplo da “*Síndrome do Cobertor Curto*”.
