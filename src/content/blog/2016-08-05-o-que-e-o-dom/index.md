---
title: 'O que é o DOM?'
subtitle:
heading: 'Entenda que é o DOM e o que ele representa para a Web'
created: 2016-08-05 22:15:22
permalink: 'blog/o-que-e-o-dom'
tags:
  - javascript
  - dom
---

O **Modelo Objeto de Documento** (DOM, do inglês <em lang="en">Document Object
Model</em>) é uma estrutura de dados que representa a estrutura e o conteúdo de
um documento _web_. Técnicamente, o DOM é uma representação orientada a objetos
de documentos HTML e XML, e fornece funções e métodos para que um programa possa
interagir com eles.

O DOM é definido pelas especificações da [W3C](https://www.w3.org/DOM/) e da
[WHATWG](https://dom.spec.whatwg.org/), e implementado pelos navegadores. Muitos
navegadores podem estender essa especificação e disponibilizar funcionalidades
que não são adotadas por todos os navegadores, então é preciso cuidado e é
sempre recomendado seguir o padrão das especificações.

Como dito, o DOM representa um documento _web_ como uma API orientada a objetos.
Todas as propriedades, métodos e eventos disponíveis para manipular e criar
páginas _web_ são organizadas em objetos. Uma página HTML, por exemplo, será
representada pela classe `Document`. Já uma tabela, escrita com a tag `<table>`,
será representada pela classe `HTMLTableElement`.

O DOM define métodos que servem para buscar elementos também. Um exemplo é o
`querySelectorAll`, que recebe um seletor CSS em uma _string_ e retornar
elementos descendentes que casam com o seletor dado.

```js
const paragraphs = document.querySelectorAll('p');

for (const paragraph of paragraphs) {
  console.log(paragraph);
}
```

## O DOM e o JavaScript

No exemplo anterior, e em quase todos os exemplos que você vai encontrar quando
pesquisar e trabalhar com DOM, você utilizará o JavaScript. No entanto, é
importante entender e separar o DOM e o JavaScript. DOM não é uma linguagem de
programação, mas sem o DOM o JavaScript não seria capaz de compreender páginas
_web_ e adicionar interação à elas.

No início da _web_, o JavaScript e o DOM eram muito interligados. Mas, com o
desenvolvimento das especificações e da tecnologia _web_, eles se desenvolveram
em duas entidades distintas. O DOM moderno é projetado para ser implementado em
qualquer linguagem de programação. Veja um exemplo de utilização do DOM em
Python usando a biblioteca
[`minidom`](https://docs.python.org/3/library/xml.dom.minidom.html).

```py
import xml.dom.minidom as dom

document = dom.parse('./index.html')
p_list = document.getElementsByTagName('p')

for p in p_list:
    print(p)
```

## Acessando o DOM

Nos navegadores não é necessário adicionar uma biblioteca para utilizar o DOM,
qualquer `script` JavaScript executado no ambiente dos navegadores tem acesso
a ele. Veja um exemplo abaixo de um documento HTML que utiliza o DOM para
construir um cabeçalho com a frase “Olá Mundo!”.

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <script>
      window.addEventListener('load', function () {
        const header = document.createElement('h1');
        const text = document.createTextNode('Olá Mundo!');
        header.appendChild(text);
        document.body.appendChild(header);
      });
    </script>
  </head>
  <body></body>
</html>
```

Grande parte do conteúdo do _script_ utiliza o DOM nesse exemplo: o método
`addEventListener` do `window`; os método `createElement` do `document` ou o
`appendChild` do `header`. Todos esses métodos são definidos pelo DOM e
disponibilizados pelo navegador.

## Algumas interfaces fundamentais

Como já dito anteriormente, o DOM é uma API orientada a objetos que representa
um documento _web_. Um documento HTML, por exemplo, é representado no DOM como
um objeto que segue a interface
[`Document`](https://developer.mozilla.org/en-US/docs/Web/API/Document) e
apresenta uma estrutura similar com uma
[árvore](<https://pt.wikipedia.org/wiki/%C3%81rvore_(estrutura_de_dados)>). Muitas
vezes esse objeto é chamado de “Árvore DOM”. Nos navegadores você pode acessar a
instância desse objeto pela variável `document` (como fizemos no exemplo
anterior).

No entanto, a interface `Document` estende outra interface ainda mais genérica,
a [`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node). `Node` é uma
interface genérica que muitas outras APIs do DOM são baseadas. Qualquer “nó” no
DOM implementa `Node`. Alguns exemplos incluem o já mencionado `Document`, mas
temos também
[`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element), interface
que todas as tags HTML seguem; ou também a
[`Text`](https://developer.mozilla.org/en-US/docs/Web/API/Text), interface
implementada pelos nós de texto do documento; e até mesmo a
[`Comment`](https://developer.mozilla.org/en-US/docs/Web/API/Comment), que
representa um comentário denotado pela marcação `<!-- -->` no HTML.

Outra interface importante é a
[`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget).
Todos os nós DOM implementam essa interface, pois `Node` é uma extensão de
`EventTarget`. A `EventTarget` permite a criação de objetos capazes de ouvir e
disparar eventos. Por exemplo, se você tem a necessidade de executar um trecho
de código quando um usuário clica em um elemento, você provavelmente utilizará
um evento e o método `addEventListener` da interface `EventTarget`.

<aside>
  <p>
    <code>EventTarget</code> é uma interface tão ubíqua que, inclusive, é
    implementada por classes fora do documento <em>web</em>, como é o caso do
    <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window"><code>Window</code></a>
  </p>
</aside>

## Conclusões

Você pode ver que quase todas as características de um documento HTML são
representadas de alguma forma no DOM. Existem muitas classes e interfaces que
contém diversos métodos e propriedades. É colossal o tamanho da especificação do
DOM.

Você pode achar que isso é muito para aprender de uma vez e realmente é. No
entanto, em um primeiro momento você não precisa entender tudo nos mínimos
detalhes, o importante é você ter noção geral de como essa tecnologia _web_
funciona. Eu acredito que, conforme você adquire experiência, você deve entender
o funcionamento dessa API para que você seja um bom desenvolvedor de _software_
para a _web_.
