---
title: 'Web Components #2'
subtitle: 'Elementos personalizados'
heading: 'Vamos nos aprofundar sobre a API de elementos personalizados e ver todas as novidades que ela traz à web'
date: 2018-04-02 19:49:13
tags:
  - javascript
  - dom
  - webcomponents
  - post
---

Como vimos [na publicação anterior](/blog/web-components-1/), o termo _web
components_ se refere ao conjunto de APIs disponibilizadas na plataforma _web_
que permitem a criação de elementos personalizados e que também podem ser
instanciados por meio declarativo com uma _tag_ HTML.

Com a API de
[**elementos personalizados**](https://html.spec.whatwg.org/#custom-elements),
os desenvolvedores são capazes de **criar novas _tags_ HTML**, ou extender
elementos que outros desenvolvedores criaram. É a API fundamental para os _web
components_ e traz uma forma padronizada de criar componentes reutilizáveis com
nada mais que HTML, CSS e JavaScript. Nada de bibliotecas ou _frameworks_. Como
resultado temos menos código no navegador do cliente, mais modularidade e mais
reutilização.

## Introdução

Você já deve conhecer o HTML, certo? Uma ótima ferramenta para construir
aplicações na _web_. O HTML é declarativo, portável, bem suportado e fácil de
trabalhar. No entanto, o HTML tem um problema: seu vocabulário é limitado e não
pode ser extendido.

Os elementos personalizados são a resposta para permitir a atualização e
extensão do HTML, preenchendo as lacunas e ligando a estrutura declarativa com o
comportamento via código. Se você está com um problema que o HTML não pode
resolver, talvez a criação de um elemento personalizado pode. Elementos
personalizados permitem que os navegadores adicionem comportamento ao HTML
preservando os benefícios que ele já possui.

[Como já vimos](/blog/web-components-1/), para definir um elemento personalizado
basta você estender a classe `HTMLElement` e associar ela à uma _tag_,
utilizando o global `customElements.define`. Para exemplificar, vamos criar um
componente chamado `wc-counter`, que irá conter um simples contador.

```js
class WCCounter extends HTMLElement {}

window.customElements.define('wc-counter', WCCounter);
```

Assim, podemos utilizar nosso componente da seguinte forma:

```html
<wc-counter></wc-counter>
```

É importante lembrar que utilizar um elemento personalizado não é diferente de
utilizar um `div` ou qualquer outro elemento do HTML. Instâncias podem ser
declaradas na página, ou criadas dinamicamente com o JavaScript; você pode
adicionar ouvintes de eventos, etc.

Algumas regras de nomenclatura precisam ser seguidas para criar elementos
personalizados:

1. O nome precisa conter um hífen (`-`). Dessa forma o analisador sintático do
   HTML pode distinguir um elemento personalizado de elementos comuns. Além
   disso, previne conflitos caso novas _tags_ forem adicionadas ao HTML no
   futuro.
2. Você não pode registrar uma mesma _tag_ mais uma vez. Fazer isso irá lançar
   um `DOMException`. Uma vez que uma _tag_ está associada à uma classe, não há
   volta.
3. Elementos personalizados só podem ser utilizados em par. Ou seja, sempre
   escreva `<meu-componente></meu-componente>`.

## Definindo a API do elemento

Como utilizamos a sintaxe `class` para definir o construtor do elemento, já
utilizamos o `extends` para estender o comportamento do `HTMLElement`. Estender
o comportamento do `HTMLElement` garante que seu componente irá seguir a API do
DOM e significa que qualquer propriedade ou métodos que você adicione à classe
se tornam parte da interface DOM do elemento. Ou seja, podemos utilizar a classe
para definir a API pública da sua _tag_.

Imagine que queremos adicionar duas propriedades: `value` e `disabled`, que
indicar o valor atual do contador e se está desabilitado ou não,
respectivamente. Vamos adicionar também dois métodos: `increment` e `decrement´,
que aumentam e diminuem o contador em uma unidade. Assim, podemos fazer algo
como abaixo:

```js
class WCCounter extends HTMLElement {
  constructor() {
    super();
    this._value = 0;
  }

  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }
  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  increment() {
    this.value += 1;
  }

  decrement() {
    this.value -= 1;
  }
}

window.customElements.define('wc-counter', WCCounter);
```

Nesse exemplo estamos criando as propriedades `value` e `disabled` utilizando
_getters_ e _setters_ de objetos do JavaScript. Além disso, estamos refletindo
seus valores em atributos no DOM por meio dos métodos `setAttribute` e
`removeAttribute`.

Em um elemento personalizado, o `this` referencia um elemento do DOM. Ou seja,
toda a API do DOM está disponível no código do próprio elemento. Você pode
adicionar um ouvinte de evento com `this.addEventListener`, acessar os
descendentes com `this.children` e até mesmo selecionar elementos com
`this.querySelector`. Veja que é possível testar o funcionamento do nosso
componente no código abaixo:

```js
const counter = document.createElement('wc-counter');

console.log(counter.value); // → 0

counter.value = 2;

counter.increment();

console.log(counter.value); // → 3
```

## Definindo o comportamento do elemento

[Na publicação anterior](/blog/web-components-1/), vimos que é possível
adicionar conteúdo ao elemento manipulando o DOM. Também vimos que para garantir
o encapsulamento do componente, é importante utilizar um _shadow_ DOM. Para o
conteúdo desse componente, vamos adicionar três elementos: um `button` para
decrementar o valor, um `span` para exibir o valor e outro `button` para
incrementar o valor.

Vamos exibir os valor no `span` apropriado e adicionar ouvintes para reagir as
interações do usuário quando o componente for conectado à árvore principal do
DOM, por meio do método `connectedCallback`.

```js
class WCCounter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <button id="dec"> − </button>
      <span id="display"></span>
      <button id="inc"> + </button>
    `;
    this._display = this.shadowRoot.getElementById('display');
    this._dec = this.shadowRoot.getElementById('dec');
    this._inc = this.shadowRoot.getElementById('inc');
    this._value = 0;
  }

  // …

  connectedCallback() {
    this._display.textContent = this.value.toString();
    this._dec.addEventListener('click', () => this.decrement());
    this._inc.addEventListener('click', () => this.increment());
  }
}
```

Além disso, vamos reagir as mudanças nas propriedades `value` e `disabled`.
Quando `value` for alterado, vamos alterar o conteúdo do elemento. Quando
`disabled` for alterado, vamos habilitar ou desabilitar os botões. Podemos fazer
isso alterando os _setters_ de cada propriedade:

```js
class WCCounter extends HTMLElement {
  // …

  set value(value) {
    this._value = value;
    this._display.textContent = value.toString();
  }

  // …

  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
    this._dec.disabled = value;
    this._inc.disabled = value;
  }

  // …
}
```

Se você instanciar seu componente como abaixo, verá que tudo está funcionando
conforme o esperado.

```html
<wc-counter></wc-counter>
```

No entanto, e se eu quiser instanciar com um valor definido? Relembrando como
outros elementos do HTML funcionam, bastaria eu adicionar o nome da propriedade
e o valor na marcação, como abaixo:

```html
<wc-counter value="8"></wc-counter>
```

No entanto, você vai perceber que isso não funciona. E não funciona porque ainda
não sincronizamos o atributo `value` à propriedade `value`. Atributos e
propriedades são mecanismos distintos no DOM e não necessariamente
sincronizados. Um atributo indica uma marcação no documento e serializado em uma
_string_, já uma propriedade é um valor no objeto e pode ter qualquer tipo de
valor do JavaScript.

<aside>
  <p>
    O elemento <code>input</code>, por exemplo, possui o atributo
    <code>value</code> que pode ser inicializar a propriedade de mesmo nome.
    No entanto, após a instanciação, não há reflexão entre o atributo e
    propriedade. Mudanças na propriedade não alteram o atributo e mudanças no
    atributo não alteram a propriedade.
  </p>
</aside>

## Reagindo a mudanças nos atributos

Para reagir a mudanças nos atributos, primeiramente precisamos definir quais
atributos iremos observar. Para isso, crie a propriedade estática
`observedAttributes`, que retorne o nome dos atributos observados. Após isso,
sobreescrevemos o método `attributeChangedCallback`; que recebe como argumento
três valores: o nome, o valor anterior e o valor atual do atributo. Vamos então
implementar esse método para adicionar o comportamento desejado.

```js
class WCCounter extends HTMLElement {
  // …

  attributeChangedCallback(name, previous, current) {
    if (name === 'value') {
      this.value = Number.parseInt(current);
    }
  }

  static get observedAttributes() {
    return ['value'];
  }
}
```

Agora, veja que o qualquer mudança no atributo irá ser refletida na propriedade
e a marcação abaixo funciona como o esperado e inicializa a propriedade
com o valor `8`.

```html
<wc-counter value="8"></wc-counter>
```

## Estilizando de acordo com o estado do componente

Como também já vimos, podemos estilizar o componente utilizando um componente
`style` encapsulado pelo _shadow_ DOM. Suponha que você queira estilizar o texto
do elemento `#display`, bastaria mudar a marcação atribuída no _shadow_ DOM.

```js
class WCCounter extends HTMLElement {
  constructor() {
    // …
    this.shadowRoot.innerHTML = `
      <style>
        #display {
          font-weight: bold;
        }
      </style>
      <button id="dec"> − </button>
      <span id="display"></span>
      <button id="inc"> + </button>
    `;
    // …
  }

  // …
}
```

Por padrão, qualquer elemento personalizado possui a propriedade `diplay` como
`block`. Se você quer mudar esse comportamento, você pode utilizar a
pseudo-classe `:host`, que seleciona o hospeideiro de um _shadow_ DOM. Ou seja,
se queremos que nosso elemento se comporte tal como um `inline-block`, basta,
no componente de estilos:

```html
<style>
  :host {
    display: inline-block;
  }

  #display {
    font-weight: bold;
  }
</style>
```

Agora suponha que você queira diminuir a opacidade caso o componente esteja
desabilitado. Uma vez que nosso componente reflete a propriedade no atributo
`disabled`; podemos utilizar seletores de atributos para reagir a essa mudança.

```html
<style>
  :host {
    display: inline-block;
  }

  :host([disabled]) {
    opacity: 0.5;
  }

  #display {
    font-weight: bold;
  }
</style>
```

## Informando
