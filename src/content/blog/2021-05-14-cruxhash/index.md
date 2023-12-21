---
title: 'Apresentando: CRUXHash'
subtitle:
heading: 'Uma biblioteca de funções hash cruciais para o JavaScript'
created: 2021-05-14 23:33:49
permalink: 'blog/cruxhash/index.html'
tags:
  - javascript
---

_Hash_ é, provavelmente, um dos conceitos mais importantes que um programador
deve conhecer. É por meio de _hashes_ que conseguimos criar as
[tabelas _hash_](https://en.wikipedia.org/wiki/Hash_table), [armazenar senhas de
forma
segura](https://auth0.com/blog/hashing-passwords-one-way-road-to-security/),
[fazer detecção de erros](https://en.wikipedia.org/wiki/Checksum) e também
[compressão de dados](https://en.wikipedia.org/wiki/One-way_compression_function).
São _hashes_ que também permitem criar [sistemas de cache globais em redes de
fornecimento de
conteúdo](https://en.wikipedia.org/wiki/Bloom_filter#Cache_filtering),
popularmente conhecidas como CDNs.

Formalmente, uma função _hash_, traduzida em português como “função de
espalhamento”, é uma função que mapeia um conjunto de dados de tamanho
arbitrário em um conjunto de dados de tamanho fixo. Veja, por exemplo, a função
abaixo:

<figure>
<math display="block">
  <mrow>
    <mi>f</mi>
    <mo>:</mo>
    <mi>ℤ</mi>
    <mo>→</mo>
    <mi>ℤ</mi>
    <mtext>&#x00A0;&#x00A0;tal que&#x00A0;&#x00A0;</mtext>
    <mi>f</mi>
    <mo stretchy="false">(</mo>
    <mi>x</mi>
    <mo stretchy="false">)</mo>
    <mo>=</mo>
    <mi>x</mi>
    <mo>mod</mo>
    <mn>10</mn>
  </mrow>
</math>
</figure>

Essa função pode ser considerada uma função _hash_. Ela receberá um número
inteiro qualquer e irá retornar o resto da divisão por dez. Qualquer resto de
divisão por um número <math display="inline"><mi>n</mi></math>, será um número entre
<math display="inline"><mn>0</mn></math> e <math display="inline"><mo stretchy="false">(</mo><mi>n</mi><mo>-</mo><mn>1</mn><mo stretchy="false">)</mo>
</math>, ou seja, um intervalo fixo. Veja outra função
abaixo:

```js
function hashStr(str) {
  let hashed = 0;
  let i = 0;
  while (i < str.length) {
    hashed = hashed ^ str.charCodeAt(i);
    i += 1;
  }
  return hashed;
}
```

A função `hashStr` acima, escrita em JavaScript, também pode ser considerada uma
função _hash_. Afinal, ela converte uma _string_ de tamanho arbitrário em um
número, combinando caractere a caractere. O operador `^`, nesse exemplo, está
fazendo um
[“ou-exclusivo binário”](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_XOR),
que sempre retorna um número de 32 bits.

Os resultados de uma função _hash_ são chamados de _hash codes_, _digests_ ou
simplesmente _hashes_. Boas funções _hash_ são rápidas e puras, ou seja, a mesma
entrada sempre irá retornar a mesma saída.

## Diferenciando objetos

Outro uso bastante comum é a possibilidade de diferenciar rapidamente objetos
com múltiplas propriedades. Suponha que você queira comparar dois objetos por
meio das propriedades que compõem cada um deles. Uma solução trivial seria
comparar cada propriedade, par-à-par, e, se todas forem equivalentes, os objetos
serão considerados iguais. No entanto, caso alguma propriedade for diferente, os
objetos serão diferentes. Veja a tabela abaixo, onde comparamos dois objetos,
`A` e `B`:

| Propriedade   | `A`                 | `B`                 |  Iguais?   |
| :------------ | ------------------- | ------------------- | :--------: |
| `nome`        | `Pedremildo`        | `Pedremildo`        |     ✓      |
| `sobrenome`   | `Trunk`             | `Trunk`             |     ✓      |
| `nascimento`  | `1991-08-14`        | `1991-08-04`        |     ✗      |
| `email`       | `email@exemplo.com` | `email@exemplo.com` |     ◌      |
| **Resultado** |                     |                     | Diferentes |

Se compararmos `A` e `B`, vemos que os objetos não são iguais porque a
propriedade `nascimento` é diferente. Note que, precisamos comparar até o
momento em que uma propriedade possua valores diferentes. Por isso, a
propriedade `email` sequer é verificada. Assim, esse algoritmo é linearmente
proporcional à quantidade de propriedades que devemos comparar.

Essa solução acima pode ser utilizada para objetos pequenos, com algumas dezenas
de propriedades. No entanto, imagine um objeto mais complexo, com centenas de
propriedades. Ou ainda que seja aninhado, com objetos internos e precisam ser
comparados entre si da mesma forma. Você pode ver que, nesse cenário, comparar
propriedade por propriedade pode demorar um pouco…

Para nos ajudar com essa tarefa, podemos utilizar _hash_ que sirva como uma
“assinatura” para o objeto. Esse _hash_ pode ser criado por meio das
propriedades do próprio objeto. Assim, quando compararmos a igualdade de um
objeto com outro, podemos verificar primeiro a assinatura. Se a assinatura for
diferente, não precisamos verificar nenhuma outra propriedade, porque alguma
delas será diferente.

| Propriedade   | `A`                 | `B`                 |  Iguais?   |
| :------------ | ------------------- | ------------------- | :--------: |
| `hash`        | `19735`             | `28465`             |     ✗      |
| `nome`        | `Pedremildo`        | `Pedremildo`        |     ◌      |
| `sobrenome`   | `Trunk`             | `Trunk`             |     ◌      |
| `nascimento`  | `1991-08-14`        | `1991-08-04`        |     ◌      |
| `email`       | `email@exemplo.com` | `email@exemplo.com` |     ◌      |
| **Resultado** |                     |                     | Diferentes |

Veja que agora, quando comparamos a propriedade `hash`, que foi construída a
partir das propriedades do objeto, temos imediatamente um valor diferente, sem
precisar consultar as outras propriedades. No entanto, se as assinaturas forem
iguais, isso significa que os objetos são iguais?

## Colisões

Como já vimos, uma função _hash_ mapeia um conjunto de tamanho arbitrário em um
conjunto de tamanho fixo. Como você está mapeando um conjunto de dados
possivelmente maior em um conjunto de dados fixo, pelo
[princípio da casa dos pombos](https://pt.wikipedia.org/wiki/Princ%C3%ADpio_da_casa_dos_pombos),
alguns valores diferentes na entrada vão ser mapeados para uma mesma saída.
Quando isso acontece, temos uma **colisão**.

Colisões são problemáticas para funções _hash_. Em tabelas _hash_, [colisões
diminuem o
desempenho](https://en.wikipedia.org/wiki/Hash_table#Collision_resolution). Em
criptografia,
[colisões diminuem a segurança](https://en.wikipedia.org/wiki/Collision_attack).
Em compressão de dados,
[colisões diminuem a taxa de compactação](https://en.wikipedia.org/wiki/One-way_compression_function).
Boas funções _hash_ desejam diminuir a taxa de colisão tentando seguir uma
distribuição uniforme. Assim, nenhum intervalo terá mais ou menos chances de
sofrer colisão.

Em nosso caso de comparação de objetos, colisões nos obrigam a ter que comparar,
inevitavelmente, todas as propriedades. Afinal, mesmo que dois objetos tenham o
mesmo _hash_, eles ainda podem ser diferentes. Só conferindo todas as
propriedades que temos a garantia que os objetos são realmente iguais. Agora, se
assinatura for diferente, temos a garantia de que o objeto não é igual. Por
isso, utilizar _hashes_ é uma forma de agilizar o processo de diferenciar
objetos.

<aside>
<p>
  <a href="https://en.wikipedia.org/wiki/Bloom_filter">Bloom filter</a> é uma
  estrutura de dados probabilística que utiliza <em lang="en">hash</em> e que
  possui um fundamento parecido. Ela permite verificar se um elemento está no
  conjunto ou não.
</p>
<p>
  Falsos positivos podem acontecer, mas falsos negativos não. Portanto, a
  estrutura é capaz de responder sobre a pertinência de um elemento de duas
  formas: “pode estar no conjunto” ou “não está no conjunto“.
</p>
</aside>

## Apresentando: CRUXHash

Para facilitar a criação de _hashes_ de valores primitivos ou objetos em
JavaScript, criei uma pequena biblioteca: a
[**CRUXHash**](https://github.com/MaxRoecker/cruxhash). Para instalar, utilize o
npm.

```bash
npm i cruxhash
```

A CRUXHash é uma biblioteca que provê um conjunto de funções simples para criar
_hashes_ inteiros e sem sinal para valores em JavaScript. Veja o exemplo abaixo:

```js
import { hash, getSeed } from 'cruxhash';

console.log(hash('Smile, my dear!')); // 897319059

console.log(hash(42, getSeed('my seed'))); // 1866919164

console.log(hash('コンニチハ, Hello world, Καλημέρα κόσμε 😀')); // 1149923829
```

A sua principal função, `hash`, permite criar um _hash_ de qualquer valor
primitivo JavaScript: uma _string_, um booleano, um número… Além disso, permite
que você passe, como segundo parâmetro, um `seed`, um número que inicializa o
processo e que pode trazer resultados diferentes de acordo com sua necessidade.

<aside>
  <p>
    A implementação de <em lang="en">hash</em> de <em lange="en">strings</em>
    é baseada no algoritmo
    <a href="https://github.com/aappleby/smhasher/blob/master/src/MurmurHash3.cpp">Murmur3.</a>
    Já o <em lang="en">hash</em> de números é baseado no algoritmo de
    <a href="http://burtleburtle.net/bob/hash/integer.html">
      sete saltos de <em lang="en">bits</em> de Thomas Wang.
    </a>
  </p>
</aside>

Para tratar de objetos, a função `hash` trabalha de uma forma especial. Primeiro
ela verifica se o objeto possui um método `hashCode` e passa, recursivamente,
seu resultado para o `hash`. Esse comportamento é útil para reutilizar objetos
com um processo de _hash_ já definido. Veja:

```js
import { hash } from 'cruxhash';

const obj = {
  value: 0,
  hashCode() {
    return this.value;
  },
};

console.log(hash(obj)); // 1858670630

obj.value = 1;

console.log(hash(obj)); // 796438301
```

Se o objeto possuir o método `valueOf` sobrescrito, como é o caso de objetos
instâncias de `Date`, `Number`, `Boolean`, etc… a função `hash` irá
considerá-lo.

```js
import { hash } from 'cruxhash';

console.log(hash(new Date('2014-07-08'))); // 271363852

console.log(hash(new Date('2014-07-08'))); // 271363852
```

Todo objeto que herde `Object.prototype`, terá o `valueOf` implementado. No
entanto, essa implementação sempre retorna o próprio objeto. Para evitar uma
recursão infinita, o método obriga que o `valueOf` seja sobrescrito.

Agora, se o objeto implementar o
[Protocolo Iterável](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol),
um _hash_ será criado a partir de cada elemento do iterável e, ao final, todos
serão combinados em um _hash_ só. Veja:

```js
import { hash } from 'cruxhash';

const objA = {
  [Symbol.iterator]: function* () {
    yield 0;
    yield 1;
    yield 2;
  },
};

const objB = {
  [Symbol.iterator]: function* () {
    yield 0;
    yield 1;
    yield 2;
  },
};

const objC = {
  [Symbol.iterator]: function* () {
    yield 1;
    yield 2;
    yield 0;
  },
};

console.log(hash(objA)); // 2974883921

console.log(hash(objB)); // 2974883921

console.log(hash(objC)); // 473105883
```

Veja que, os iteráveis `objA` e `objB` possuem uma sequência com os mesmos
elementos na mesma ordem e, por isso, seus _hashes_ são idênticos. Veja, também,
que a ordem faz diferença. A mudança de ordem dos elementos nos iteráveis `objA`
e `objC` resulta em um _hash_ completamente diferente.

<aside>
  <p>
    Em funções <em>hash</em>, é desejável que pequenas mudanças na entrada que
    causem grandes diferenças na saída. Esse comportamento é conhecido como
    <a href="https://en.wikipedia.org/wiki/Avalanche_effect">efeito avalanche.</a>
  </p>
</aside>

No entanto, a função `hash` vai tratar de forma especial estruturas onde a ordem
dos elementos não importa, como é o caso do `Set` ou `Map`. Veja:

```js
import { hash } from './index';

console.log(hash(new Set([0, 1, 2]))); // 1421611346

console.log(hash(new Set([0, 2, 1]))); // 1421611346
```

E por fim, caso você passe um objeto simples, o _hash_ será criado com base no
[`Object.entries`,](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
ou seja, objetos que possuírem mesmas propriedades com mesmos valores, terão
_hashes_ iguais.

```js
import { hash } from './index';

console.log(hash({ a: 1, b: null })); // 1418113148

console.log(hash({ b: null, a: 1 })); // 1418113148
```

## Conclusões

Finalizo por aqui a apresentação da CRUXHash. A biblioteca disponibiliza outras
funções para usos em casos mais específicos. Por isso, recomendo que você veja
no [repositório oficial](https://github.com/MaxRoecker/cruxhash) a documentação
da API disponível.

Criei essa biblioteca de acordo com minha necessidade em projetos pessoais e
profissionais. Caso você queira adicionar algum comportamento, entre em contato
comigo. PRs são sempre bem vindos!

## Agradecimentos

Agradeço meu amigo
[Henrique Neves](https://www.linkedin.com/in/henrique-neves-da-silva-5a93a660/)
pela revisão e pelas considerações importantes no texto!
