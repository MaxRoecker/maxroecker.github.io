---
title: 'Web Components #2'
subtitle: 'Elementos personalizados'
heading: 'Vamos nos aprofundar sobre a API de elementos personalizados e ver todas as novidades que ela traz à web'
created: 2018-04-02 19:49:13
updated: 2021-09-26 21:06:51
layout: 'layouts/post-playground.njk'
permalink: 'blog/web-components-2'
tags:
  - javascript
  - dom
  - webcomponents
---

Como vimos [na publicação anterior](/blog/web-components-1/), o termo _web
components_ se refere ao conjunto de APIs disponibilizadas na plataforma _web_
que permitem a criação de elementos personalizados que podem ser instanciados de
forma declarativa como qualquer _tag_ HTML.

Com a API de
[**elementos personalizados**](https://html.spec.whatwg.org/#custom-elements),
os desenvolvedores são capazes de criar novas _tags_ HTML. É a API fundamental
para os _web components_ e traz uma forma padronizada de criar componentes
reutilizáveis com nada mais que HTML, CSS e JavaScript. Sem a necessidade de
utilizar uma bibliotecas ou _frameworks_. Dessa forma, temos menos código, mais
compatibilidade e mais reutilização.

## Introdução

[Como já vimos](/blog/web-components-1/), para definir um elemento personalizado
basta você estender a classe `HTMLElement` e associar ela à uma _tag_,
utilizando o método `define` do global `customElements`. Para exemplificar,
vamos criar um componente chamado `wc-counter`, que irá ser um simples contador.

```js
class WCCounter extends HTMLElement {}

window.customElements.define('wc-counter', WCCounter);
```

Assim, podemos utilizar nosso elemento da seguinte forma:

```html
<wc-counter></wc-counter>
```

É importante lembrar que utilizar um elemento personalizado não é diferente de
utilizar um `div` ou qualquer outro elemento do HTML. No entanto, algumas regras
de nomenclatura precisam ser seguidas:

1. O nome precisa conter um hífen (`-`). Dessa forma o analisador sintático pode
   distinguir um elemento personalizado de elementos padrões. Além disso,
   previne conflitos caso novas _tags_ forem adicionadas ao HTML no futuro.
2. Você não pode registrar uma mesma _tag_ mais uma vez. Fazer isso irá lançar
   um `DOMException`. Uma vez que uma _tag_ está associada à uma classe, não há
   volta.
3. Elementos personalizados só podem ser utilizados em par. Ou seja, se você
   declarou um elemento como `meu-elemento`, você deve escrevê-lo como
   `<meu-elemento></meu-elemento>`. Escrever `<meu-elemento />` não funciona.

## Definindo a API do elemento

Como utilizamos a [sintaxe `class`](/blog/javascript-orientado-a-objetos-4/)
para definir o construtor do elemento, já utilizamos o `extends` para estender o
comportamento do `HTMLElement`. Estender o comportamento do `HTMLElement`
garante que seu elemento irá seguir a API do DOM e significa que qualquer
propriedade ou métodos que você adicione à classe se tornam parte da interface
DOM do elemento. Ou seja, podemos utilizar a classe para definir a API pública
da sua _tag_.

Imagine que queremos adicionar duas propriedades: `value` e `disabled`, que
indica o valor atual do contador e se está desabilitado ou não, respectivamente.
Vamos adicionar também dois métodos: `increment` e `decrement`, que aumentam e
diminuem o contador em uma unidade. Veja:

<playground-ide
  project-src="/projects/2018-04-02-web-components-2/1/project.json"
  line-numbers
  resizable>
</playground-ide>

Nesse exemplo estamos criando as propriedades `value` e `disabled` utilizando
_getters_ e _setters_ de objetos do JavaScript. Além disso, estamos refletindo
seus valores em atributos no DOM por meio dos métodos `setAttribute` e
`removeAttribute`.

<aside>
<p>
  Como qualquer elemento personalizado estende a classe
  <code>HTMLElement</code>, toda a API do DOM está disponível no código do
  próprio elemento. Ou seja, é possível manipular atributos com
  <code>setAttribute</code> e <code>removeAttribute</code>, adicionar ouvintes
  de eventos com <code>addEventListener</code>, acessar os descendentes com
  <code>children</code> ou selecionar elementos com <code>querySelector</code>.
</p>
</aside>

## Definindo o comportamento do elemento

[Na publicação anterior](/blog/web-components-1/), vimos que é possível
adicionar conteúdo ao elemento manipulando o DOM. Também vimos que para garantir
o encapsulamento do elemento, é importante utilizar um _shadow_ DOM. Vamos
adicionar, ao _shadow_ DOM, três elementos: um `button` para decrementar o
valor, um `span` para exibir o valor e outro `button` para incrementar o valor.

Podemos exibir os valor no `span` apropriado e adicionar ouvintes para reagir as
interações do usuário quando o elemento for conectado à árvore principal do DOM,
por meio do método `connectedCallback`. Além disso, podemos reagir às mudanças
nas propriedades `value`, assim, quando `value` for alterado, vamos alterar o
conteúdo do elemento. Podemos fazer isso alterando os _setters_ de cada
propriedade. Veja abaixo:

<playground-ide
  project-src="/projects/2018-04-02-web-components-2/2/project.json"
  line-numbers
  resizable>
</playground-ide>

E se eu quiser instanciar nosso `wc-counter` com um valor definido? Relembrando
como outros elementos do HTML funcionam, bastaria eu adicionar o nome da
propriedade e o valor na marcação, como abaixo:

```html
<wc-counter value="8"></wc-counter>
```

No entanto, você vai perceber que isso não tem efeito algum. Não funciona porque
ainda não sincronizamos o atributo `value` à propriedade `value`. Atributos e
propriedades são
[mecanismos distintos](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes#content_versus_idl_attributes)
no DOM e não necessariamente sincronizados. Um atributo indica uma marcação no
documento e serializado em uma _string_, já uma propriedade é um valor no objeto
e pode ter qualquer tipo de valor do JavaScript.

<aside>
  <p>
    O elemento <code>input</code>, por exemplo, possui o atributo
    <code>value</code> que inicializa a propriedade homônima. No entanto, após a
    instanciação, não há reflexão entre o atributo e propriedade. Mudanças na
    propriedade não alteram o atributo e mudanças no atributo não alteram a
    propriedade.
  </p>
</aside>

## Reagindo a mudanças nos atributos

Para reagir a mudanças nos atributos precisamos definir quais atributos serão
observados. Para isso, crie a propriedade estática `observedAttributes`, que
retorne o nome dos atributos que queira observar. Após isso, sobrescreva o
método `attributeChangedCallback`, que recebe como argumento três valores: o
nome, o valor anterior e o valor atual do atributo. O método
`attributeChangedCallback` sempre é chamado quando um atributo observado for
alterado. Veja:

<playground-ide
  project-src="/projects/2018-04-02-web-components-2/3/project.json"
  line-numbers
  resizable>
</playground-ide>

Veja que o qualquer mudança no atributo irá ser refletida na propriedade. A
marcação no HTML funciona como o esperado e inicializa a propriedade com o valor
`8`. Também adicionamos a reação de desativar os botões caso o atributo
`disabled` esteja definido.

<aside>
  <p>
    Tome cuidado com os efeitos colaterais dentro do
    <code>attributeChangedCallback</code>. Poderíamos, por exemplo, ser tentados
    a adicionar essa reação ao <i lang="en">setter</i> da propriedade
    <code>disabled</code>. No entanto, este <i lang="en">setter</i> manipula o
    próprio atributo <code>disabled</code>, que dispara novamente o
    <code>attributeChangedCallback</code>… causando um <i lang="en">loop</i>
    infinito.
  </p>
</aside>

## Estilizando de acordo com o estado

Como também já vimos, podemos estilizar o elemento utilizando um `<style>`
encapsulado pelo _shadow_ DOM. Suponha que você queira estilizar o texto do
`span` para negrito, bastaria mudar a marcação atribuída no _shadow_ DOM. No
entanto, se você estilizar o “próprio” elemento hospedeiro do _shadow_ DOM, você
utiliza o pseudo-seletor `:host`. Vamos mudar para que elemento hospedeiro se
comporte tal como um `block`:

<playground-ide
  project-src="/projects/2018-04-02-web-components-2/4/project.json"
  line-numbers
  resizable>
</playground-ide>

Veja que também diminuímos a opacidade caso o elemento esteja desabilitado. Uma
vez que nosso elemento reflete a propriedade no atributo `disabled`, podemos
utilizar seletores de atributos para reagir a essa mudança.

<aside>
  <p>
    Por padrão, qualquer elemento personalizado possui a propriedade
    <code>display</code> como <code>inline-block</code>.
  </p>
</aside>

Elementos personalizados podem ser estilizados utilizando CSS como qualquer
outro elemento HTML. Ou seja, se o usuário do nosso elemento `wc-counter` quiser
mudar o elemento, ele pode. Lembre-se, o encapsulamento só impede que os estilos
da _shadow_ DOM “vazem” para o DOM principal, no entanto o efeito cascata do CSS
continua valendo.

<playground-ide
  project-src="/projects/2018-04-02-web-components-2/5/project.json"
  line-numbers
  resizable>
</playground-ide>

Veja também que “adicionamos” um delay na definição do elemento, e, enquanto ele
não é definido, aplicou-se um estilo temporário com o uso da pseudo-classe
`:defined`. Caso não tenha visto, recarregue o resultado clicando no botão “↻”.

## Elementos não definidos e desconhecidos

O HTML é bastante flexível. Por exemplo, ao declarar uma _tag_ `<accordion>` em
um documento, o navegador vai aceitá-la sem problemas, mesmo que `<accordion>`
não faça parte do vocabulário. Esse comportamento é previsto pela [própria
especificação do
HTML](https://html.spec.whatwg.org/multipage/dom.html#htmlunknownelement).
Elementos desconhecidos são instâncias de `HTMLUnknownElement`.

O mesmo não vale para elementos personalizados. Elementos personalizados
“potenciais” são sempre instâncias de `HTMLElement`, mesmo que ainda não foram
definidos. Ou seja, se você criar um elemento com uma _tag_ que contém um `-`,
esse elemento será instância de `HTMLElement`. Veja:

```js
// "accordion" não é um elemento conhecido do HTML nem um elemento personalizado
document.createElement('accordion') instanceof HTMLUnknownElement; // → true

// "wc-accordion" é um nome válido para elemento personalizado
document.createElement('wc-accordion') instanceof HTMLUnknownElement; // → false
```

O global `customElements` também contém alguns métodos úteis. Por exemplo, caso
você já tenha registrado um elemento personalizado, você pode pegar uma
referência do construtor utilizando o método `get` e passando a _tag_. Caso o
elemento não tenha sido registrado ainda, `get` retorna `undefined`.

```js
let WCCounter = customElements.get('wc-counter');
let counter = new WCCounter();
```

Você também pode definir _callbacks_ para futuras definições de elementos com o
método `whenDefined`. Este método retorna uma instância de `Promise` que
resolve-se quando o elemento for definido ou rejeita-se quando o nome passado
não for um nome de elemento personalizado válido.

```js
customElements.whenDefined('wc-counter').then(() => {
  console.log('"wc-counter" está pronto!');
});
```

## Conclusão

Elementos personalizados são uma forma de definir novas _tags_ HTML e permitem a
criação de componentes reutilizáveis quando combinado com outras tecnologias,
como o _shadow_ DOM. Eles fornecem várias vantagens:

- Interoperabilidade entre os navegadores;
- São bem integrados à ferramentas de _debug_ já presentes nos navegadores e
  conhecidas pelos desenvolvedores;
- Não precisam de qualquer biblioteca ou _framework_ para iniciar e provêm um
  modelo de programação familiar ao DOM. Você precisa apenas de HTML, CSS e
  JavaScript.

Mas essa série de publicações ainda não acabou. Ainda temos que falar sobre
outras especificações que pertencem ao “ecossistema” de _web components_. Até a
próxima!
