---
title: 'JavaScript Básico #6: Funções'
description: 'Entenda como funcionam as funções em JavaScript, componentes bastante utilizados mas pouco entendidos pelas características da linguagem.'
cover:
  path: cover.jpg
  title: Tetrahemihexahedron
  src: 'https://www.flickr.com/photos/21649179@N00/4282044498'
featured: false
date: 2015-10-23 09:21:30
tags:
  - javascript
---
{% quote %}
<b>fun.ção:</b> Grandeza relacionada a outra(s), de tal modo que a cada valor atribuído a esta(s), corresponde um valor daquela.
{% endquote %}

Já vimos em momentos passados o funcionamento de objetos e de estruturas de controle em JavaScript. Ambos os conceitos são essenciais para a aprendizagem da linguagem e para a escrita de algoritmos, e estão presentes na maioria das linguagens de programação. Porém, agora é necessário avançarmos um pouco nosso conhecimento e entrar em áreas que tornam o JavaScript único e tão especial para aplicações modernas: as Funções.

Funções são a melhor coisa do JavaScript e sua unidade modular fundamental. O conceito de “embalar” um trecho de código é extremamente útil. Funções são utilizadas para reutilização de código, encapsulamento e composição de dados em diversas linguagens de programação, porém o modo como funções são tratadas em  JavaScript é possivelmente estranha para a maioria dos desenvolvedores. É importante ter um bom entendimento de como funções trabalham em JavaScript, para que você possa utilizar o máximo delas em sua aplicação.

---
## Definindo uma função
Para começar, vamos definir uma função na forma comumente utilizada em várias linguagens de programação, também chamada de **função procedural**.

{% simplecode js %}
``` js
function hello (nome) {
  return 'Hello ' + nome + '!'
}

console.log(hello('Pedro')) // → Hello Pedro!
```
{% endsimplecode %}

Quase todas as linguagens de programação possuem uma forma de declaração de função similar a essa. Todo programador conhece e está confortável com tal sintaxe: {% c "hello" %} é o nome da função, {% c "nome" %} é um argumento da função. Essa função retorna uma string quando é executada com o uso dos {% c "()" %}

Devido as características do JavaScript ─ mais especificamente o *hoisting*, do qual falaremos em lições avançadas ─, uma função procedural não pode ser declarada condicionalmente. **O código a seguir é inválido na maioria dos motores de execução JavaScript:** ao definirmos um mesmo nome para funções procedurais distintas, o JavaScript, através do hoisting, cria uma referência automática no início do código para a função. Quando temos duas funções com o mesmo nome, há conflito de referência e isso causa o erro.

{% simplecode js %}
``` js
/* Esse código exibirá um erro, pois há conflito de referência */

if (nota < 7) {
  function resultado () {
    return 'Reprovado'
  }
} else {
  function resultado () {
    return 'Aprovado'
  }
}

console.log('O resultado é: ' + resultado())
```
{% endsimplecode %}

### Argumentos opcionais
Supondo a função {% c "hello" %} do exemplo anterior. Em JavaScript, o código a seguir é válido.

{% simplecode js %}
``` js
function hello (nome) {
  return 'Hello ' + nome + '!'
}

console.log(hello('Pedro', 'Matias', 'Samuel')) // → Hello Pedro!
```
{% endsimplecode %}

A função {% c "hello" %} oficialmente aceita um argumento. Mesmo quando executamos a função passando mais argumentos, a função {% c "hello" %} simplesmente os ignora. O JavaScript possui uma política bastante flexível com argumentos: se você passa mais argumentos que o declarado pela função, ela os ignora; se você passa menos argumentos que os declarados, os valores faltantes são dados como {% c "undefined" %}.

Apesar de seu comportamento poder permitir que o desenvolvedor passe argumentos errado sem ser avisado, ele também permite a utilização de “parâmetros opcionais”. Dessa forma, você pode estabelecer valores padrão caso eles não sejam passados no momento da execução da função. Veja o exemplo abaixo: temos um parâmetro da função que em seu interior é atribuído condicionalmente a ele mesmo ou à outro valor padrão (nesse caso, o valor {% c "\'World\'" %}). Ou seja, se o parametro for definido ele recebe a si mesmo. Caso ele seja indefinido ({% c "undefined" %}), um valor padrão é associado ao parâmetro.

{% simplecode js %}
``` js
function hello (nome) {
  nome = nome || 'World'
  return 'Hello ' + nome + '!'
}

console.log(hello())        // → Hello World!
console.log(hello('Pedro')) // → Hello Pedro!
```
{% endsimplecode %}

---
## Objetos de Primeira-Classe e Funções de Alta Ordem. ##

Já dissemos em episódios anteriores que funções em JavaScript são também consideradas *first-class objects* (objetos de primeira classe) e também são *high-order functions* (funções de alta-ordem). Um elemento de uma linguagem é dito ser um valor de [primeira classe](http://c2.com/cgi/wiki/?FirstClass) se não há restrições em como o valor é criado ou usado; quando a construção pode ser tradada como um valor sem restrições. [Funções de alta ordem](http://c2.com/cgi/wiki?HigherOrderFunction) são funções que podem receber outra função como argumento ou retornar uma função como resultado.

Em JavaScript, funções são somente um tipo especial de objeto e podem fazer todas as coisas que um objeto pode fazer. Em suma:

* Uma função é uma instância de Object;
* Uma função tem propriedades e métodos;
* Você pode armazenar uma função em uma variável;
* Você pode passar uma função como parâmetro para outra função;
* Você pode retornar uma função a partir de outra função.

---
## Funções como variáveis ##

Provavelmente uma sintaxe um tanto incomum para a maioria dos desenvolvedores é a definição de uma função como uma variável.

{% simplecode js %}
``` js
var hello = function (nome) {
  console.log('Hello ' + nome + '!')
}

hello('Mundo') // → Hello Mundo!
```
{% endsimplecode %}

Não há muita diferença entre as declarações. Somente atribua uma função para uma variável declarada. Todo o resto é o mesmo. Mas esse tipo de construção não é só considerada “uma modificação visual”. Esse tipo de construção tem um outro significado: nossa função agora pode ser manipulada como qualquer variável.

Um resultado interessante desse tipo de declaração é que funções declaradas agora podem ser “condicionais”. Seguindo o exemplo errado anterior, o código agora é válido em JavaScript.

{% simplecode js %}
``` js
/* Esse código não exibirá erro,
 * pois não há conflito de referência
 */
var resultado
if (nota < 7) {
  resultado = function () {
    return 'Reprovado'
  }
} else {
  resultado = function () {
    return 'Aprovado'
  }
}

console.log('O resultado é: ' + resultado());
```
{% endsimplecode %}

A grande diferença desse tipo de declaração de função, também chamada de **expressão funcional**, é que não damos um nome para a função. Todas são **Funções Anônimas**. Funções anônimas são usadas freqüentemente em JavaScript.

---
## Funções como parâmetros e retorno ##

Já que funções podem ser declaradas como variáveis, podemos então passá-las como argumentos em outra função. Veja o exemplo:

{% simplecode js %}
``` js
var quiz = function (question, response) {
  var result = function () {
    console.log('Question: ', question())
    console.log('Response: ', response())
  }
  return result
}

var question = function () {
  return 'Qual o maior mamífero vivo do mundo?'
}

var response = function () {
  return 'A Baleia Azul é o maior mamífero vivo do mundo.'
}

var result = quiz(question, response)
result()
```
{% endsimplecode %}

Note que estamos passando a referência, também chamada de ponteiro, das funções em {% c "question" %} e {% c "response" %} para a função em {% c "quiz" %}, e esta por sua vez retorna outra referência para uma função que atribuímos a variável {% c "result" %}.


### Expressões λ ###

 Agora que entendemos o conceito de funções como valores, e que podemos atribuir essas funções para variáveis e passá-las como argumento ou como resultado de uma função, você entendeu o conceito de [Expressão λ](https://en.wikipedia.org/wiki/Anonymous_function) (Lambda). Basicamente, **Expressão λ** é o conceito da [programação funcional](https://pt.wikipedia.org/wiki/Programa%C3%A7%C3%A3o_funcional) utilizado quando uma função é passada para outra como argumento.

> Se uma função é usada como um valor, então essa função é uma Expressão λ

Em JavaScript, Expressões λ são utilizadas comumente em:

* Executar funções dentro de outras funções;
* Adicionar manipuladores de eventos em interações com o DOM ─ *Document Object Model*, é a modelo que representa estruturalmente um arquivo HTML;
* Adicionar funções de *callback* ─ funções que executam um tipo de “retorno”, ou seja, você passa uma função que deve ser executada em um momento posterior.

Expressões  λ são utilizadas juntamente com funções anônimas e *closures*. Conceitos distintos mas intimamente ligados, importantes para o bom entendimento da expressividade que o JavaScript possui. Veremos tais conceitos com mais detalhes futuramente.

---
## Referências de funções ##

Quando se define uma função, ela ocupa um espaço na memória do computador. Na verdade, a variável recebe o endereço a referência para o local da memória dentro do [*heap*](http://c2.com/cgi/wiki?TheHeap) do JavaScript. Observe o código:

{% simplecode js %}
``` js
var hello = function () {
  console.log('Goodbye World!')
}

var goodbye = hello

hello = function () {
  console.log('Hello World!')
}

hello()   // → Hello World!
goodbye() // → Goodbye World!
```
{% endsimplecode %}

---
## Conclusão ##

Nesse episódio aprendemos sobre funções, como declará-las e suas principais características. A palavra-chave {% c "function" %}, quando usada em uma expressão, cria uma função procedural. Quando usada em uma atribuição, cria uma referência para uma função. A chave do entendimento das funções é o seu comportamento como objetos de primeira classe, ou seja, seu funcionamento é igual a qualquer outro valor da linguagem.

Separar seu código em funções é importante para modularizar e evitar repetição dentro do seu código. Funções também são importantes para aumentar o vocabulário do seu código como também sua expressividade. Detalhes como o escopo das funções, *closures*, *hoisting* e programação funcional ainda são conceitos que ainda precisam de mais atenção e são importantes dentro da linguagem.

### Agradecimentos
Chegamos ao fim da série JavaScrip Básico, não no fim do conteúdo da linguagem e de suas funcionalidades, mas que já permitem a criação de programas simples e básico e até mesmo a manipulação do DOM do HTML em certas instâncias.

Gostaria de agradecer ao meu amigo Guilherme e em especial para minha amiga Mariana pela revisão dos textos e que permitiram uma melhor leitura desse blog.

### Futuro
Pretendo lançar outros textos falando sobre aspectos mais profundos mas incrivelmente úteis do JavaScript, em termos mais técnicos (tais como a etapa hoisting, as closures, operações binárias) como também programação em paradigma orientado a objetos e funcional.

Não pare por aqui, continue curioso. ***:)***
