---
title: 'IDs são globais'
subtitle:
heading: 'Qualquer elemento marcado com um ID é uma variável global no documento'
created: 2018-02-22 10:34:01
tags:
  - javascript
  - dom
  - post
---

Você sabia que se você precisar acessar um elemento de um documento HTML marcado
com um `id`, basta você acessar a variável com o mesmo nome? Ou seja, se você
tiver uma marcação assim:

```html
<div id="foo"></div>
```

No console do navegador você pode digitar `foo` e terá acesso ao elemento DOM.
**Mas, por quê?** É um comportamento padrão dos navegadores para
facilitar o _debug_ ou isso é o padrão esperado?

Na verdade, o comportamento acima é previsto pelo próprio HTML. A
[especificação do HTML](https://html.spec.whatwg.org/#named-access-on-the-window-object)
determina que o objeto `window` deve conter uma propriedade que referencia um
elemento da árvore DOM se:

- Há apenas um elemento no documento o qual o nome da propriedade seja igual ao
  atributo `id`.
- Há apenas um elemento no documento o qual o nome da propriedade seja igual ao
  atributo `name` e este elemento for um `a`, `applet`, `embed`, `form`,
  `frame`, `frameset`, `iframe`, `img` ou `object`.

Em certos casos onde há mais de um elemento que satisfaça as condições acima,
outras regras são aplicadas e um
[`HTMLCollection`](https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCollection)
pode ser retornado ao acessar a variável. No entanto, a ideia principal é
mantida: uma variável representando elementos no DOM será criada no escopo
global. Assim, o código abaixo funciona tal como o esperado, afinal, acessar uma
variável global é acessar uma propriedade do `window`:

```html
<button id="btn">Clique aqui!</button>

<script>
  btn.addEventListener('click', function () {
    btn.textContent = 'Você clicou!';
  });
</script>
```

No entanto, é preciso de atenção. Se já existir uma variável com o valor, ela
não será substituída pela referência do elemento. Por exemplo, se escrever o
atributo `id="fetch"` ele não irá substituir a
[função `fetch`](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API)
presente nos navegadores modernos.

Como a própria especificação diz, este é um comportamento para manter a
retrocompatibilidade e não recomendam se apoiar nele para desenvolver seus
códigos. Além disso, conforme novas funcionalidades vão sendo adicionadas à
plataforma _web_, aumentam as chances de haver um conflito de nomes e seu código
deixar de funcionar. Por isso, quando precisar selecionar um elemento na árvore
DOM, utilize as funções
[`document.getElementById`](https://developer.mozilla.org/pt-BR/docs/Web/API/Document/getElementById)
ou
[`document.querySelector`](https://developer.mozilla.org/pt-BR/docs/Web/API/Document/querySelector).
