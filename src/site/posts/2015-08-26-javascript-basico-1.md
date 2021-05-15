---
title: "JavaScript Básico #1"
subtitle: "Introdução"
heading: "O que é JavaScript? Uma pequena introdução sobre a linguagem que nasceu na web e para a web."
created: 2015-08-25 09:15:25
updated: 2021-05-10 22:00:18
tags:
  - javascript
  - post
---

O **JavaScript** é uma linguagem de programação criada em 1995 com o objetivo de
adicionar dinamicidade aos documentos HTML no navegador Netscape. O JavaScript,
junto com o HTML e o CSS, constituem os três pilares tecnológicos da _web_. O
JavaScript permite que código seja executado nos navegadores dos usuários que
acessam uma página _web_, adicionando interatividade e permitindo a construção
de aplicações ricas.

O JavaScript uma
[linguagem de script](https://en.wikipedia.org/wiki/Scripting_language)
[dinâmica](https://en.wikipedia.org/wiki/Dynamic_programming_language) com
[funções de primeira classe](https://en.wikipedia.org/wiki/First-class_function)
e que suporta a criação de
[objetos](https://en.wikipedia.org/wiki/Object-oriented_programming) baseados em
[protótipos](https://en.wikipedia.org/wiki/Prototype-based_programming). Por
essas características, é considerada uma linguagem de multi-paradigma,
oferecendo suporte para programação de estilo
[imperativo](https://pt.wikipedia.org/wiki/Programa%C3%A7%C3%A3o_imperativa),
[orientado a objetos](https://pt.wikipedia.org/wiki/Orienta%C3%A7%C3%A3o_a_objetos)
e [funcional](https://pt.wikipedia.org/wiki/Programa%C3%A7%C3%A3o_funcional).
Mas não se preocupe em entender todos esses conceitos por agora.

<aside><p> Uma <strong>linguagem de script</strong> é uma linguagem de
programação desenvolvida para um ambiente de execução específico. </p></aside>

Apesar de ter seu nascimento em navegadores, atualmente o JavaScript é uma
linguagem que habita também o lado do servidor. Por exemplo, a engine
[V8](https://developers.google.com/v8/) é utilizada no navegador Google Chrome,
mas é utilizado também pelo [Node.js](https://nodejs.org/).

## Voltando para 1995

A Netscape contrata Brendan Eich para liderar o desenvolvimento de uma nova
linguagem de programação que permitiria que o novíssimo suporte do Navegador à
linguagem Java se tornasse mais acessível. Eich decide que uma liguagem de
_script_ com tipagem fraca seria ideal para o ambiente e para o público alvo da
época. No caso, alguns _webdesigners_ que desejavam adicionar algumas
funcionalidades em páginas web sem a necessidade de compilar código em
_bytecode_ ou ter conhecimento avançado de orientação a objetos.

Essa primeira versão da linguagem criada por Brendan Eich foi chamada de
“Mocha”. No entanto, para o lançamento oficial, ela foi chamada de “LiveScript”.
Posteriormente, foi rebatizada JavaScript por iniciativa do setor de
_marketing_, e dar tração junto à outra linguagem que estava começando a ganhar
os holofotes. Um erro levado pelo time de _marketing_ que assombraria os
_webdesigners_ por muitos anos. No entanto, em 4 de Dezembro de 1995, a NetScape
junto a Sun anunciam o JavaScript, uma nova linguagem, que tinha um objetivo:
ser um complemento para o HTML e para o Java.

O JavaScript rapidamente ganhou vida própria, sendo cada vez mais utilizado para
adicionar funcionalidades à documentos HTML do que para controlar _applets_
Java. No entanto, seu sucesso como uma linguagem de programação com uma curva de
aprendizagem baixa — não precisava de um compilador, nem de um processo de
_build_ ou de uma IDE — combinado com algumas falhas de seguranças descobertas
nos meses seguintes construíram a imagem de que a linguagem não era séria o
suficiente para o desenvolvimento de aplicações complexas.

Mas o sucesso do JavaScript não passou despercebido pela Microsoft, empresa por
trás do Internet Explorer. A Microsoft respondeu ao JavaScript da Netscape
lançando a VBScript, que permitia a interação de componentes das páginas HTML
junto ao sistema operacional Windows. Além disso, em 16 de Julho de 1996, a
Microsoft lança uma "versão" do JavaScript para o Internet Explorer 3.0, e a
batiza de JScript.

No entanto o JScript não era totalmente compatível com o JavaScript, e isso
acirrou ainda mais a disputa entre ambos os navegadores. Era comum que alguns os
desenvolvedores abandonassem os usuários de um navegador ou outro ao invés de
escrever um código compatível para ambos.

Em Novembro de 1997, a Netscape e a Sun iniciam o processo de padronizar a
linguagem com a ajuda da _European Computer Manufacturers Association_ (ECMA), e
dão a ela um novo nome: ECMAScript. O processo de padronização durou vários
anos. A ECMAScript 2 foi em Junho de 1998, a ECMAScript 3 em Dezembro de 1994 e
os trabalhos na ECMAScript 4 começaram em 2000.

Nos anos seguintes, o Java perdeu força com os _applets_, o VBScript foi
descontinuado pela Microsoft e o Internet Explorer ganhou a batalha contra o
Netscape Navigator. O domínio de 95% do mercado pelo Internet Explorer no início
dos anos 2000 fez com que o JScript se torna-se o padrão _de facto_ de uma
linguagem que permitia "documentos HTML dinâmicos". Assim, a Microsoft, que
inicialmente participava ativamente do processo de padronização, eventualmente
parou de contribuir e o projeto da ECMAScript 4 foi arquivado por período
indefinido.

A história começou a mudar em 2004, quando a Mozilla, sucessora da Netscape,
lança o Firefox e abocanha uma pequena mas significativa parte do mercado do
Internet Explorer. Em 2005, a Mozilla junta-se a ECMA International, e começa a
trabalhar junto com a Macromedia — que desejava padronizar a linguagem
ActionScript utilizada pelo Flash — para "reviver" a padronização do ECMAScript 4.

Nos próximos anos, o Google lança o navegador Chrome com a _engine_ V8, a
primeira a utilizar tradução dinâmica. Além disso, o desenvolvimento _web_
popularizou-se ainda mais e diversas bibliotecas e ferramentas começaram a ser
disponibilizadas com código livre e que prometiam acabar com a incompatibilidade
do JavaScript nos diversos navegadores, tais como o
[JQuery](https://jquery.com/) e o [MooTools](https://mootools.net/).
Eventualmente chagou-se ao consenso de que era necessário padronizar de vez a
linguagem. Assim, em Dezembro de 2009, a quinta e "definitiva" versão da
ECMAScript é finalmente lançada.

Atualmente o JavaScript é considerado uma implementação da ECMAScript, assim
como o ActionScript e o JScript. Entre 2009 e 2016 vários esforços foram tomados
para melhorar e aumentar a capacidade do ECMAScript. Em 2015, a sexta versão da
linguagem é lançada, com muitas novas funcionalidades, tornando-se
definitivamente uma linguagem madura.

## Série sobre JavaScript

Pretendo iniciar essa série de artigos sobre JavaScript para compartilhar um
pouco do conhecimento que adquiri nos últimos anos, pois acredito que somente
aprende-se uma coisa de verdade quando você ensina-se ela. Sei que há muito
conteúdo de qualidade sobre JavaScript pela _web_ — basta uma pesquisada no
Google — mas muito do conteúdo relevante é dado em língua inglesa ou apresentam
conceitos que já são obsoletos, ou seja, um obstáculo para desenvolvedores
iniciantes e aspirantes em programação que querem aprender sobre essa poderosa
linguagem.

Nessa série, vou exibir inicialmente aspectos primários da linguagem e aos
poucos ir revelando detalhes importantes e complexos conforme avançamos. Vou me
esforçar para tratar o assunto da maneira fácil para você compreender, mas é
importante que você já tenha algum entendimento de codificação e lógica de
programação. Faço sempre uso de uma grande quantidade de exemplos, afinal, **a
melhor forma de aprender a codificar é codificando**.

<blockquote cite="http://lkml.org/lkml/2000/8/25/132">
  <p>
    Talk is cheap, show me the code.
  </p>
  <footer>
    <a href="http://lkml.org/lkml/2000/8/25/132">Linus Torvalds</a>
  </footer>
</blockquote>

Quer começar já? Pois então vamos lá! Caso você esteja num navegador atualizado
— como o Google Chrome ou o Mozilla Firefox — aperte <kbd><kbd
class="key">Ctrl</kbd> + <kbd class="key">Shift</kbd> + <kbd
class="key">J</kbd></kbd> e você verá uma tela com um cursor. Bem vindo ao
**Console JavaScript** do seu navegador! Tente digitar a seguinte expressão
abaixo e aperte <kbd class="key">Enter</kbd>:

```js
var foo = "Olá Mundo!";
```

Em seguida, digite a próxima expressão e novamente aperte <kbd class="key">Enter</kbd>:

```js
console.log(foo);
```

Viu resultado? Parabéns! Você fez sua primeira atribuição de valor em uma
variável e imprimiu o resultado na tela. Simples, não? Esse é só um exemplo
básico de como utilizar o console para lhe auxiliar nesse período de
aprendizado, ele é seu companheiro e sua melhor ferramenta para aprender
JavaScript.

Tente agora uma coisa um pouco mais complexa, escreva a função abaixo no
console. **Dica**: quando for pular a linha, use <kbd><kbd
class="key">Shift</kbd> + <kbd class="key">Enter</kbd></kbd> e após de digitar
tudo aperte <kbd class="key">Enter</kbd>.

```js
function fac(n) {
  if (n === 0) return 1;
  return n * fac(n - 1);
}
```

Após isso, execute os seguintes comandos:

```js
fac(1);
fac(2);
fac(3);
fac(6);
```

Viu que valores na tela? Você notou algum padrão? Compreendeu o que a função
faz? 😄

### Livros

- [JavaScript for Cats](http://jsforcats.com/)
- [Eloquent JavaScript](http://eloquentjavascript.net/)

### Links

- [Learn JavaScript Essentials](https://medium.com/javascript-scene/learn-javascript-b631a4af11f2)
- [JavaScript: The Right Way](http://jstherightway.org/)
- [How to Learn JavaScript Properly](http://javascriptissexy.com/how-to-learn-javascript-properly/)

### Vídeos

- [Desvendando a linguagem JavaScript](https://www.youtube.com/playlist?list=PLQCmSnNFVYnT1-oeDOSBnt164802rkegc)
- [Code School: JavaScript Road Trip Part 1](https://www.codeschool.com/courses/javascript-road-trip-part-1)

## Agradecimentos

Agradeço a [Suzani Cristina](https://www.linkedin.com/in/suzanicristina/) pela
revisão do texto e de algumas informações da história da linguagem. Obrigado!
