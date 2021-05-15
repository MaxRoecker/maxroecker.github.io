---
title: 'JavaScript Intermediário #3'
subtitle: 'Event Loop'
heading: 'Entenda, com uma visão ampla, o modelo de concorrência da linguagem JavaScript'
created: 2016-01-16 17:47:20
tags:
  - javascript
  - post
---

Nesse texto, vamos compreender um pouco mais sobre um paradigma importante
quando estamos programando em JavaScript e, além disso, entender uma das
principais características que levaram ao sucesso da linguagem: o seu modelo de
concorrência.

<aside> <p> <strong>as·sin·cro·nis·mo</strong>: 1. Qualidade ou estado de
assíncrono; 2. Ausência de concorrência no tempo. </p> </aside>

## Assincronia em JavaScript

Programação assíncrona é um paradigma de programação onde o código pode não
seguir o fluxo de execução “padrão”. Além disso, um código assíncrono pode
tratar de interrupções externas ao programa, tais como a chegada de um evento,
sinal, temporizador, entre outras.

Em JavaScript, podemos escrever código assíncrono de forma fácil utilizando a
função
[`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout),
que recebe dois parâmetros: uma função a ser executada e uma quantidade de
milissegundos que indica o tempo de espera para iniciar a execução dessa função.
Veja o exemplo abaixo:

```js
function foo() {
  setTimeout(function () {
    console.log('without one.');
  }, 1000);

  setTimeout(function () {
    console.log('fully dressed');
  }, 0);

  console.log('You know');
}

console.log('Smile, my dear!');
foo();
console.log('you are not');
```

A saída do código acima será escrita como:

<pre><samp>Smile, my dear!
You know
you are not
fully dressed
without one.</samp></pre>

Apesar dos <i lang="en">logs</i> serem colocados fora de ordem, alguns foram
colocados em funções que foram passadas para o `setTimeout` e que serão
executadas somente após o tempo de espera for esgotado. Vamos ver outro exemplo
um pouco mais complexo. Considere o código abaixo:

```js
function asyncCountTo(x) {
  for (var i = 0; i < x; i++) {
    setTimeout(function () {
      console.log(i);
    }, (x - i) * 1000);
  }
}

asyncCountTo(4);
```

Qual é a saída do código acima? Temos um laço que dispara várias funções por
meio do `setTimeout` e que imprimem a variável `i`. Por maior que seja a
surpresa, o código acima exibe como saída:

<pre><samp>4
4
4
4</samp></pre>

Por quê? A razão desse comportamento se deve à <i lang="en">closure</i>
associada a função passada para o `setTimeout`. A variável `i` é compartilhada
por todas as `closures` e, por isso, tem esse comportamento. O laço continua
sendo executado e a variável `i` continua sendo incrementada até chegue ao valor
quatro, que é quando a condição do laço falha. Só então os <i
lang="en">callbacks</i> do `setTimeout` são executados.

<aside> <p> Caso você não tenha familiaridade com <i lang="en">closures</i>, <a
href="https://maxroecker.github.io/blog/javascript-intermediario-2/">essa
publicação do blog</a> pode lhe ajudar. </p> </aside>

No entanto, você percebeu que mesmo quando o tempo de espera for zero, a função
não é executada imediatamente? Bem, aqui estamos de frente com um dos efeitos do
modelo de concorrência do JavaScript e que vamos entrar em detalhes a partir de
agora.

## Programação Orientada a Eventos

O JavaScript é uma linguagem que foi inicialmente desenvolvida para adicionar
funcionalidades as páginas HTML do navegador Netscape. É uma linguagem
multiparadigma que suporta programação
[procedural](https://en.wikipedia.org/wiki/Procedural_programming),
[orientada a objetos](https://en.wikipedia.org/wiki/Object-oriented_programming)
e [funcional](https://en.wikipedia.org/wiki/Functional_programming), mas, foi
especialmente desenvolvida para atender a
[programação orientada a eventos](https://en.wikipedia.org/wiki/Event-driven_programming).

<aside> <p> Caso você queira saber um pouco mais sobre a história da linguagem,
<a href="https://maxroecker.github.io/blog/javascript-basico-1/">leia essa outra
publicação do blog</a>. </p> </aside>

A programação orientada a eventos ajusta o fluxo do programa de acordo com
eventos, ou seja, interrupções que podem ser feitas a qualquer momento e
necessitam de “reações” por parte do programa. É um paradigma muito utilizado
para o desenvolvimento de <i lang="en">drivers</i> e sensores de
microcontroladores. A programação orientada a eventos também predomina no
desenvolvimento de aplicações com GUI, pois requerem que a aplicação reaja de
acordo com a interação do usuário. Não é por coincidência que ela seria
utilizada em “uma linguagem que quer adicionar algumas funcionalidades em
páginas HTML”, certo?

Em uma aplicação orientada a eventos, normalmente temos um
[Laço de Eventos](https://en.wikipedia.org/wiki/Event_loop) — comumente chamado
de <i lang="en">event loop</i> — que aguarda os eventos acontecerem para chamar
funções que foram designadas à responder um evento específico. E é o
comportamento desse laço o qual vamos detalhar daqui em diante.

<figure>
  <img
    src="/images/2016-01-16-javascript-intermediario-3/steam-engine.svg"
    alt="Máquina de ciclos a vapor"
    decoding="async"
    loading="lazy"
  />
</figure>

## O <i lang="en">Event Loop</i> do JavaScript

Toda máquina de execução JavaScript possui um <i lang="en">event loop</i> único
que captura os eventos disparados pelo usuário ou pelo ambiente onde a máquina
está alocada. Se um evento capturado pelo <i lang="en">event loop</i> possuir
algum <i lang="en">callback</i> associado — uma função que deve ser executada
quando o evento ocorrer — então uma **tarefa** será enfileirada na fila de
tarefas que irá iniciar a execução do <i lang="en">callback</i> pelo motor de
execução JavaScript.

A **fila de tarefas**, também chamada de <i lang="en">job queue</i>, é uma
[estrutura de fila](https://www.ime.usp.br/~pf/algoritmos/aulas/fila.html) que
armazena referência para funções que devem ser executadas. De forma geral, o
motor de execução do JavaScript possui um algoritmo bastante simples:

1. Aguarde a fila ter tarefas;
2. Execute a primeira tarefa da fila até o fim, isto é, até que a pilha de
   execução esteja vazia.
3. Retorne ao passo 1.

Na verdade, a função `setTimeout` que vimos anteriormente não “executa uma
função após uma quantidade de tempo”, mas, adiciona no <i lang="en">event
loop</i> a função como um <i lang="en">callback</i> para um sinal de um
temporizador que será disparado após a quantidade de tempo do segunto parâmetro.
Existem outras formas de adicionar tarefas a fila, entre elas:

- Adicionar <i lang="en">listeners</i> de eventos com
  [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters);
- Utilizando
  [`setInterval`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval)
  ou
  [`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage);
- Respostas de requisições HTTP utilizando as APIs
  [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)
  ou [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) dos
  navegadores.

O <i lang="en">event loop</i> é um modelo de concorrência não preemptivo. Não é
possível interromper a execução da função corrente e retornar posteriormente.
Somente uma função é executada por vez. Uma vez que a computação de uma função é
iniciada, ela não é mais interrompida. Assim, não há paralelismo de execução das
funções no <i lang="en">event loop</i>.

<aside> <p> <a
href="https://pt.wikipedia.org/wiki/Preemptividade">Preemptividade</a> é a
capacidade de um sistema de interromper temporariamente uma tarefa em execução
sem exigir cooperação, com a intenção de retomar a tarefa posteriormente. </p>
</aside>

É por isso que, mesmo quando colocado no `setTimeout` com tempo de espera zero,
o <i lang="en">callback</i> não é executado imediatamente. Ainda é necessário
terminar a execução da função atual e, somente então, o <i
lang="en">callback</i> é executado. Isso explica o comportamendo da saída do
código do exemplo anterior. Na realidade, o `setTimeout` não garante que a
função vai ser executada após o período, mas sim que sua tarefa será
enfileirada.

Outro efeito colateral desse modelo de concorrência é que, se alguma tarefa
demanda muita computação, ela inevitavelmente vai bloquear a fila de tarefas por
muito tempo e, assim, nenhuma outra tarefa poderá ser iniciada. Se a fila de
tarefas está bloqueada, os <i lang="en">callbacks</i> dos eventos das ações do
usuário podem não ser respondidos em tempo adequado e a GUI apresenta estar
“travada”, por exemplo.

## Indo além

Agora que você já entende o modelo de concorrência, alguns questionamentos podem
estar perambulando pela sua cabeça:

<blockquote> <p> Mas, quando fazemos uma requisição HTTP utilizando a API fetch,
o usuário ainda é capaz de interagir com a tela mesmo que a requisição demore
vários segundos para ser concluída… Como isso acontece se o <i lang="en">event
loop</i> está bloqueado? </p> </blockquote>

Diferentes máquinas virtuais JavaScript implementam algumas funcionalidades em
fluxos de execução paralelos ao <i lang="en">event loop</i> para não bloquear a
fila de tarefas por muito tempo. Normalmente tais funcionalidades estão
relacionadas a operações de entrada e saída que, comumente, são operações
“lentas”. Alguns exemplos de operações de entrada e saída que normalmente são
executadas paralelamente ao <i lang="en">event loop</i> incluem: leitura e
escrita de arquivos, requisições de rede, <i lang="en">stream</i> de multimídia,
acesso ao banco de dados, entre outros.

Essa publicação apresentou uma versão bastante simplificada de como o <i
lang="en">event loop</i> do JavaScript funciona. Ainda há vários pontos que
foram deixados de lado para o bem da sanidade da explicação. No entanto,
acredito que você tenha conseguido entender o funcionamento das máquinas
virtuais JavaScript e compreendido o modelo de concorrência da linguagem e as
consequências que surgem a partir do seu uso. Caso você tenha interesse em uma
visão mais completa, recomendo ler mais sobre:

- A fila de microtarefas e as <i lang="en"><a
  href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">promises</a></i>;
- A instanciação de <i lang="en">event loops</i> paralelos com
  [<i lang="en">Workers</i>](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API);
- As
  [etapas de apresentação](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
  nos navegadores.
