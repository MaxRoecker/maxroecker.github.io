---
title: 'Web Components #3'
subtitle: 'Shadow DOM'
heading: 'Vamos nos aprofundar sobre a API de shadow DOM e ver todas suas principais características'
created: 2018-09-08 21:51:17
tags:
  - javascript
  - dom
  - webcomponents
  - post
libs:
  - playground
---

Como vimos [na primeira publicação dessa série](/blog/web-components-1/), o
termo _web components_ se refere ao conjunto de APIs disponibilizadas na
plataforma _web_ que permitem a criação de elementos personalizados que podem
ser instanciados de forma declarativa como qualquer _tag_ HTML e que possuem uma
árvore DOM isolada do restante.

A API de [**shadow DOM**](https://dom.spec.whatwg.org/#shadow-trees) permite o
desenvolvedor controlar a natureza global do HTML, CSS e JavaScript. Quando você
adiciona um estilo em um `id` ou uma `class`, não há qualquer forma de saber se
esse identificador irá conflitar com outro estilo na mesma página. Muitas
[ferramentas e técnicas](http://getbem.com/introduction/)
[foram](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/)
[criadas](https://github.com/css-modules/css-modules) para contornar essa
natureza, mas nenhuma resolve o problema. _Bugs_ aparecem e você precisa então
adequar a especificidade do seletor CSS ou utilizar `!important` em todas os
estilos. Isso não só torna dificil implementar como também de manter o código,
além de
[piorar o desempenho](https://developers.google.com/web/updates/2016/06/css-containment)
da aplicação…

## Introdução

Você não precisa necessariamente escrever um elemento personalizado para
utilizar um _shadow_ DOM. Qualquer elemento pode ter um _shadow_ DOM. Não é a
toa que os elementos personalizados e _shadow_ DOM são especificações distintas.
No entanto, quando você escrever um elemento personalizado, é bastante
recomendado que você utilize uma árvore _shadow_ e utilize todas suas vantagens.
Com esta API podemos:

- **Isolar o DOM do seu componente:** elementos em uma subárvore _shadow_ DOM
  são encapsulados e isolados a árvore DOM principal. Por exemplo,
  `document.querySelector` não irá selecionar elementos que estejam dentro de
  uma _shadow_ DOM.
- **CSS encapsulado:** o CSS definido em uma _shadow_ DOM somente tem efeito na
  própria subárvore. Estilos não irão “vazar” para a árvore principal.
- **Simplifica o CSS:** como a natureza do _shadow_ DOM não é mais global, os
  seletores CSS pode ser mais simples, com nomes mais genéricos. Você não
  precisa se preocupar com conflitos em todo o documento.

Uma árvore _shadow_ DOM é a mesma coisa que uma árvore DOM com duas diferenças:
(i) como é criada e; (ii) como ela se comporta em relação à árvore DOM
principal. Veremos a seguir.

## Criando uma subárvore _shadow_ DOM

No DOM “comum”, você cria nós DOM e os adiciona como descendentes de outros
elementos e este passa a ser parte da árvore principal. Com o _shadow_ DOM, você
cria uma subárvore encapsulada, que é anexada à um componente da árvore
principal. Esse elemento é chamado de **hospedeiro**. Qualquer coisa que você
adicione nessa subárvore será encapsulada na subárvore. Uma **raiz _shadow_**
possui uma API muito similar a um
[fragmento de documento](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot)
que é anexado ao elemento hospedeiro. Você pode criar uma raiz _shadow_ em um
elemento utilizando o método `attachShadow`.

<playground-ide
  project-src="/projects/2018-09-08/1/project.json"
  line-numbers
  resizable>
</playground-ide>

Você também pode acessar a subárvore _shadow_ de um elemento com a propriedade
[`shadowRoot`](https://developer.mozilla.org/en-US/docs/Web/API/Element/shadowRoot).
Caso nenhuma subárvore _shadow_ tenha sido anexada, `shadowRoot` retorna `null`.
Outra propriedade útil de uma raiz _shadow_ é a `host`, que referencia o
elemento hospedeiro.

No entanto, o _shadow_ DOM brilha quando utilizado em associação a elementos
personalizados. Fazendo com que este elemento tenha estilos e marcação
encapsulado, resultando em um _web component_. Como visto na
[publicação anterior](/blog/web-components-2/), podemos anexar um _shadow_ em um
elemento personalizando da mesma forma que anexamos em um elemento comum.



