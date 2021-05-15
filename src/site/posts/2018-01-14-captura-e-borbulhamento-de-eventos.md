---
title: 'Captura e borbulhamento de eventos'
subtitle:
heading: 'Entenda o que são os estágios de propagação de eventos do DOM'
created: 2018-01-14 02:02:00
tags:
  - javascript
  - dom
  - post
---

Um dos aspectos mais confusos quando estamos trabalhando com eventos são os
estágios que um evento passa enquanto é propagado pela árvore DOM: a **captura**
e o **borbulhamento**. Não é sempre que temos problemas, mas você pode ter uma
baita dor de cabeça se você não entender o que cada um dessas etapas faz e como
elas funcionam.

A captura e o borbulhamento de eventos são mecanismos de propagação que
descrevem o que acontece quando um mesmo evento é “escutado” por dois elementos
que são descendentes. Antes de prosseguir, dê uma olhada neste ótimo
[exemplo do MDN](https://mdn.github.io/learning-area/javascript/building-blocks/events/show-video-box.html),
que também pode ser visto abaixo:

<iframe
  src="https://mdn.github.io/learning-area/javascript/building-blocks/events/show-video-box.html"
  loading="lazy"
  width="100%"
  height="512"
></iframe>

Nesse exemplo, o HTML tem a seguinte marcação:

```html
<button>Display video</button>

<div class="hidden">
  <video>
    <source src="rabbit320.mp4" type="video/mp4" />
    <source src="rabbit320.webm" type="video/webm" />
  </video>
</div>
```

Quando há um clique em `<button>`, o vídeo é exibido mudando a classe do `<div>`
de `hidden` para `showing` (há um CSS para isso também). Além disso, se você
clicar no `div` do vídeo, ela irá automaticamente fechar e, se você clicar no
vídeo, ele irá iniciar a execução. Veja o script abaixo:

```js
const button = document.querySelector('button');
const div = document.querySelector('div');
const video = document.querySelector('video');

button.addEventListener('click', function () {
  div.setAttribute('class', 'showing');
});

div.addEventListener('click', function () {
  div.setAttribute('class', 'hidden');
});

video.addEventListener('click', function () {
  video.play();
});
```

Entretanto, temos um problema com essa implementação e você já deve ter
percebido: se você abre o vídeo e clica para iniciar a execução, o vídeo “some”
e você precisa abrir de novo pelo botão. Isso acontece porque o `<video>`, que
ouve eventos de clique é descendente de `<div>`, que também ouve eventos de
clique. Ou seja, quando você clica no vídeo para iniciar a execução, ambos os
ouvintes são executados e, por isso, o vídeo fecha.

## Captura e borbulhamento

Quando um evento é disparado por um elemento que possui algum antecessor (no
exemplo acima, `<video>` tem `<div>` como antecessor), os navegadores podem
propagá-lo em dois estágios: a captura e o borbulhamento.

No estágio de captura, o navegador verifica se o antecessor mais distante do
elemento (normalmente, o `<html>`) possui um ouvinte do evento, e, se existir,
ele o executa. E então ele passa para o próximo antecessor, e faz a mesma coisa;
e assim por diante até que atinja o elemento que foi efetivamente clicado.

Já no estágio de borbulhamento, o contrário é feito: o navegador verifica se o
elemento que foi efetivamente clicado tem um ouvinte para o evento e, em caso
afirmativo, executa o código associado; então ele vai para antecessor mais
próximo e faz a mesma coisa, e assim por diante até chegar no antecessor mais
distante, o `<html>`.

Você pode ver os dois fluxos sumarizados na imagem abaixo:

<figure>
  <img
    src="/images/2018-01-14-captura-e-borbulhamento-de-eventos/capture-bubbling.svg"
    alt="Diagrama representado a captura e o borbulhamento de eventos no DOM"
    decoding="async"
    loading="lazy"
  />
</figure>

Nas versões atuais do DOM, todos os ouvintes de eventos são registrados somente
para o estágio de borbulhamento por padrão. Por isso, em nosso exemplo, o evento
de clique borbulha de `<video>` para o antecessor `<div>`. Assim, ele irá
encontrar o ouvinte de clique em `<video>` e vai começar a rodar o vídeo. Logo
em seguida, ele vai encontrar o ouvinte em `<div>` e vai ocultar o vídeo.

### Parando a propagação dos eventos

O comportamento do exemplo acima é bastante chato, mas pode ser consertado. O
DOM, por meio da classe `Event`, fornece o método `stopPropagation` que pode ser
chamado em um ouvinte quando queremos parar qualquer uma das propagações.

Dessa forma, podemos fazer nosso ouvinte de clique no `<video>` parar a
propagação caso o vídeo não esteja sendo executado. Assim, se `stopPropagation`
for chamado, o ouvinte em `<div>` não é executado. Veja:

```js
video.addEventListener('click', function (event) {
  if (!video.played) {
    event.stopPropagation();
    video.play();
  } else {
    video.pause();
  }
});
```

Como mencionei acima, os eventos são sempre propagados, por padrão, no estágio
de borbulhamento. No entanto, você pode alterar esse comportamento ao registrar
o ouvinte configurando o terceiro parâmetro da função `addEventListener`, por
exemplo:

```js
div.addEventListener(
  'click',
  function () {
    div.setAttribute('class', 'hidden');
  },
  { capture: true },
);
```

No entanto, é importante lembrar que, se um evento é escutado nos dois
estágios de propagação, o estágio de captura será sempre executado primeiro e,
depois, seguido do estágio de borbulhamento.

<aside>
  <p>
    Porque existem dois estágios de propagação de eventos? Isso se deve aos dias
    onde os navegadores não eram muito compatíveis entre si. O Netscape
    utilizava somente a propagação por captura, já o Internet Explorer, usava
    somente a propagação por borbulhamento. Quando o W3C resolveu padronizar
    esse comportamento e fazer os navegadores entrarem em consenso, resolveu-se
    utilizar um sistema com as duas formas de propagação, que é implementado
    pelos navegadores atualmente.
  </p>
</aside>

## Delegação de eventos

Imagine que você tem vários elementos `<li>` em uma lista `<ul>`, como na
marcação abaixo:

```html
<ul id="list">
  <li id="item-a">Item A</li>
  <li id="item-b">Item B</li>
  <li id="item-c">Item C</li>
  …
</ul>
```

Imagine que quando um elemento dessa lista sofrer um clique, você quer exibir um
alerta para o usuário com o `id` do elemento clicado. Você pode adicionar um
ouvinte em cada elemento, como você pode ver abaixo:

```js
const items = document.querySelectorAll('#list li');

for (const item of items) {
  item.addEventListener('click', function (event) {
    alert(event.target.id); // target é o elemento que foi clicado
  });
}
```

E se essa lista for dinâmica? Imagine que seja comum adicionar e remover itens,
você terá que ficar adicionando e removendo ouvintes toda vez para garantir o
funcionamento do seu código. Isso parece trabalhoso…

No entanto, podemos utilizar a propagação de eventos a nosso favor para fazer
uma **delegação de eventos**. Esse conceito é bastante utilizado quando você
quer que um mesmo trecho de código seja executado em um grande número de
descendentes. Ou seja, é mais fácil você apenas adicionar um ouvinte no
antecessor direto e esperar que os eventos sejam propagados por borbulhamento
até ele. Com a propagação de eventos, podemos atingir o mesmo resultado acima
com o seguinte código:

```js
const list = document.querySelector('#list');

list.addEventListener('click', function (event) {
  alert(event.target.id); // target ainda é o elemento que foi clicado
});
```

Com o código acima, as preocupações com a adição ou remoção de itens deixam de
existir porque só temos um ouvinte para toda a lista.

## Conclusão

Com o que vimos até agora, você já tem um bom fundamento sobre os diferentes
estágios de propagação de eventos: a captura e o borbulhamento. Apesar de um
deles raramente ser utilizado, é importante conhecer como o DOM funciona para
que você saiba resolver problemas quando eles surgirem.

Um bom desenvolvedor de _software_ deve conhecer as ferramentas com que
trabalha, e se você trabalha com _web_, deve conhecer o DOM.
