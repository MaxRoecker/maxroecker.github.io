---
title: 'Web Components #1'
subtitle: 'Introdução'
heading: 'Uma breve introdução sobre o que são web components e seus principais casos de uso'
created: 2018-01-30 01:00:55
updated: 2021-05-04 23:25:21
tags:
  - javascript
  - dom
  - webcomponents
  - post
libs:
  - playground
---

Você já deve conhecer o HTML, certo? Uma ótima ferramenta para construir
aplicações na _web_. O HTML é declarativo, portável, bem suportado e fácil de
trabalhar. Quando você está construindo um documento ou uma aplicação com HTML
você tem algumas opções disponíveis. Você quer criar uma âncora? Utilize a _tag_
[`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a). Quer criar
um parágrafo? Utilize a _tag_
[`<p>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p). Um botão?
Você pode utilizar a _tag_
[`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)
ou a
[`<input type="button">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/button).

Mas e se, por exemplo, você quiser criar uma
[aba](https://en.wikipedia.org/wiki/Tab_(interface))? Que _tag_ do HTML você vai
usar? E se for um [_tooltip_](https://en.wikipedia.org/wiki/Tooltip) ou um
[_accordion_](https://en.wikipedia.org/wiki/Accordion_(GUI))? O vocabulário do
HTML é limitado e não existe uma _tag_ que descreva completamente cada um dos
elementos de interface anteriores. Normalmente, tais componentes envolvem
utilizar mais de uma _tag_ HTML associado à um pouco de comportamento dado em um
_script_. Isso não é uma tarefa simples. E fica cada vez mais complexa quanto
mais elementos em tela você precisar controlar. Não seria mais fácil uma forma
de você poder “estender” o HTML e poder criar elementos personalizados para a
sua necessidade, encapsulando estilo, comportamento e marcação em uma só
“entidade”?

<figure>
  <img
    src="/images/illustrations/lock.svg"
    alt="Um leão heráldico."
    decoding="async"
    loading="lazy"
  />
</figure>


Os [_web components_](https://en.wikipedia.org/wiki/Web_Components) são a
resposta da plataforma _web_ para este problema. Com eles, você pode criar
elementos personalizados e fazer uma extensão do HTML, preenchendo as lacunas e
ligando a estrutura declarativa com o comportamento via código. Se você está com
um problema que o HTML não pode resolver, talvez a criação de um elemento
personalizado pode. Elementos personalizados permitem que os navegadores
adicionem comportamento ao HTML e preservando os benefícios que já possui.

Os _web components_ são, na verdade, um termo “guarda-chuva” para um conjunto de
APIs e tecnologias disponibilizadas nos navegadores que, quando utilizadas em
conjunto, permitem a criação de componentes completos. Se fundamentam em três
principais especificações:

- [Elementos personalizados](https://html.spec.whatwg.org/#custom-elements);
- [_Shadow_ DOM](https://dom.spec.whatwg.org/#shadow-trees);
- [O elemento _template_](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element).

Antes de detalhar cada uma dessas especificações, vamos fazer um apanhado geral
de como _web components_ trabalham e como você pode utilizá-los.

## Como definir e instanciar um _web component_

Para criar um _web component_ basta você estender a classe
[`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) e
registrar uma tag associada a essa classe por meio do método `define` do objeto
global `customElements`. Simples assim! Veja um exemplo no código abaixo que
está utilizando a [sintaxe de classes](/blog/javascript-orientado-a-objetos-4)
do ES2015.

```js
class HelloWorld extends HTMLElement {}

window.customElements.define('hello-world', HelloWorld);
```

A partir de agora, utilizar o elemento `hello-world` não é diferente de utilizar
um `div`. Você pode utilizar a tag de forma declarativa no HTML. Ou criar um
elemento de forma imperativa por meio do DOM. Você também pode utilizar as APIs
do DOM para selecionar e manipular seu elemento personalizado como qualquer
outro. Veja abaixo:

<playground-ide
  project-src="/projects/2018-01-30/1/project.json"
  editable-filesystem
  line-numbers
  resizable>
</playground-ide>

Você pode ver que, como com seu elemento personalizado presente na árvore DOM,
nada é exibido no navegador. Isso acontece porque ainda não adicionamos conteúdo
ao _web component_.

## Adicionando conteúdo ao _web component_

Todo e qualquer comportamento do componente é dado pela a classe associada à
_tag_. No nosso caso, se queremos adicionar um conteúdo ao `hello-world`,
precisamos defini-lo na classe `HelloWorld`. Como o próprio nome do componente
sugere, vamos exibir a frase “Hello, World!” em um `h1` no nosso componente.
Para fazer isso, sobreescrevemos o método `connectedCallback`. Veja:

<playground-ide
  project-src="/projects/2018-01-30/2/project.json"
  editable-filesystem
  line-numbers
  resizable>
</playground-ide>

<aside>
  <p>
    O método <code>connectedCallback</code> é executado quando o elemento é
    “conectado” à árvore DOM. Outros métodos também são disponibilizados pela
    API de elementos personalizados e formam o “ciclo de vida” de um
    <i>web component</i>, veja <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks">aqui</a>.
  </p>
</aside>

## Adicionando estilos ao _web component_

Bom, agora que temos nosso componente, vamos estilizá-lo para que o `h1` tenha
uma cor azul. Podemos fazer isso com CSS utilizando o elemento `style` e
atribuímos ao `head` do documento. Veja:

<playground-ide
  project-src="/projects/2018-01-30/3/project.json"
  editable-filesystem
  line-numbers
  resizable>
</playground-ide>

No entanto você vai perceber que outros elementos `h1` foram estilizados também.
Isso acontece porque o comportamento padrão do CSS é global. Uma folha de
estilos afeta todos os elementos de um documento. No entanto, para solucionar
este problema, temos em mãos a API **_Shadow_ DOM**.

## Encapsulando o _web component_

A _Shadow_ DOM é uma API que permite criar subárvores DOM encapsuladas da árvore
DOM principal. Assim, qualquer marcação, estilo ou _script_ que seja definido no
_shadow_ DOM só afeta o próprio _shadow_ DOM. Nós podemos fazer isso por meio
do método `attachShadow`. Veja:

<playground-ide
  project-src="/projects/2018-01-30/4/project.json"
  editable-filesystem
  line-numbers
  resizable>
</playground-ide>

Se você ver o resultado, agora somente o `h1` do _web component_ está estilizado
e, graças ao _shadow_ DOM, não temos efeitos colaterais em outros elementos da
árvore DOM.

## Conclusão

O termo _web components_ define um conjunto de especificações de baixo nível
que, quando utilizadas em conjunto, permitem criar verdadeiros componentes que
podem ser reutilizados em uma aplicação sem a necessidade de convenção,
biblioteca ou _framework_.

Existem outras especificações abrangidas pelo termo _web components_ e que não
vimos nesta introdução; como o elemento `template`, o elemento slot ou os
módulos de CSS. Meu objetivo é criar uma série de publicações abordando os
detalhes de cada uma dessas especificações. Além disso, vamos ver algumas boas
práticas quando estamos trabalhando com componentes e como podemos utilizá-los
para solucionar problemas durante o desenvolvimento de aplicações para a _web_.

Conforme o desenvolvimento _web_ se torna mais complexo, desenvolvedores irão
“repassar” mais responsabilidades para a plataforma, que amadurece e evolui.
Este é o caso dos _web components_ que, atualmente, já são suportados na grande
maioria dos grandes navegadores.

No entanto, essa é uma tecnologia ainda em fase de construção. Certas
especificações ainda estão em fase inicial ou com suporte bastante limitado, mas
que ilustram um futuro promissor para a tecnologia.
