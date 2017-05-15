---
title: Introdução ao Node.js
description: 'Uma breve introdução às principais características do Node.js e como instala-lo através do nvm.'
cover:
  path: cover.jpg
  title: 'Node.js Logo'
  src: 'https://nodejs.org/'
featured: false
date: 2015-09-14 16:14:00
tags:
 - javascript
 - nodejs
---
O [Node.js](https://nodejs.org/) é um ambiente JavaScript desenvolvido para ser executado em servidores e possui algumas características bem interessantes:

* Um motor de execução otimizado e rápido, construído sobre o [V8 da Google](https://developers.google.com/v8/)
* Código executado de forma assíncrona por padrão ─ nada é bloqueante;
* Projeto beaseado em iteração de eventos de forma parecida com os navegadores modernos;
* Acesso a rede como prioridade, você pode criar um servidor web com algumas poucas linhas de código;
* Uma potente biblioteca de streams;
* Um sistema gerenciador de pacotes amigável com alguns milhares de módulos open-source para escolha, o [NPM](https://www.npmjs.com/).

Nos servidores convencionais, que mais comumente usam linguagens como Java e PHP, cada conexão inicia um fluxo de execução próprio, chamado de *thread*, acompanhado de uma alocação de memória que chega a até alguns megabytes. Ou seja, se cada conexão utiliza 2 MB, um servidor com 8 GB de memória disponível está restrito supostamente há um máximo de 4000 conexões simultâneas ─ portanto, 4000 usuários de uma aplicação podem acessá-la ao mesmo tempo. Se a base de clientes for maior, você precisa de um computador com mais recursos ou separar a aplicação em mais servidores. Dependendo da aplicação, muitas vezes esse processo não é simples nem barato, inviabilizando o projeto.

O Node trata conexões de forma diferente, uma única thread recebe todas as conexões, ou seja, não há concorrência de recursos. Essa única *thread*, chamada de **Event Loop** (que podemos traduzir para laço de eventos), controla todos os outros fluxos assíncronos. Assim, o Node elimina o gargalo de um máximo de requisições que os servidores convencionais sofrem.

{% figure "Esquemático simplificado de como o <i>Event Loop</i> coordena as várias requisições através do registro e retorno de *callbacks* de funções para realizar o trabalho pesado: como manipular sistemas de arquivos, acessar banco de dados e executar processamento computacional pesado." %}
{% asset_img 'node-eventloop.svg' 'Esquemático visual explicando o funcionamento do Laço de Eventos do Node.js' %}
{% endfigure %}

Essas características podem parecer inicialmente estranhas para desenvolvedores que estão acostumados com ambientes servidores que fazem I/O bloqueante, entretanto o ganho de desempenho atingido por ciclos de conexão não-bloqueante compensa o custo de aprender.

**A filosofia de execução assíncrona para todas as coisas é a chave para o sucesso do Node**. Enquanto os ambientes servidores convencionais forçam as conexões a se manterem em linha enquanto arquivos são carregados no servidor ou requisições de rede são executadas (I/O), o Node despacha cada conexão recebida e continua a aceitar as próximas enquanto os eventos assíncronos fazem o trabalho ao fundo.

Há outras plataformas que compartilham dessa filosofia, [Twisted Python](https://twistedmatrix.com/trac/) e [Tornado](http://www.tornadoweb.org/en/stable/) exemplos para a linguagem Python e a especificação [Servlets 3.0](http://www.javabeat.net/asynchronous-servlet-servlet-3-0/) para a linguagem Java.

## Instalando o Node.js

Vamos instalar o Node através do [nvm](https://github.com/creationix/nvm). No terminal, digite:

{% simplecode bash %}
``` bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.26.1/install.sh | bash
```
{% endsimplecode %}

O download do nvm está iniciado. Assim que concluir, a instalação irá iniciar automaticamente. Ao fim da instalação, faça:

{% simplecode bash %}
``` bash
$ nvm install stable
```
{% endsimplecode %}

Esse comando irá baixar a última versão estável do Node, que  no momento de escrita do artigo é a **0.12.7**. Assim que o download for feito, execute o comando abaixo para colocar em uso a versão baixada.

{% simplecode bash %}
``` bash
$ nvm use stable
```
{% endsimplecode %}

Você pode entender mais comandos do nvm na [página do GitHub do projeto](https://github.com/creationix/nvm). Para verificar a instalação do Node, digite o comando abaixo.

{% simplecode bash %}
``` bash
$ node -v
  v0.12.7
```
{% endsimplecode %}

## Um pequeno exemplo

Lembra quando disse que o Node considera o acesso a rede como prioridade? Pois então, vamos criar um web server que responde "Hello World" para qualquer requisição, exemplo tirado da [página oficial](https://nodejs.org/).

{% simplecode js %}
``` js
var http = require('http')

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('Hello World\n')
}).listen(1337, '127.0.0.1')

console.log('Servidor rodando em http://127.0.0.1:1337/')
```
{% endsimplecode %}

Para rodar, salve o arquivo com um nome, por exemplo, {% c "example.js" %} e excute-o com o Node, no terminal, da seguinte forma:

{% simplecode sh %}
``` sh
$ node example.js
  Servidor rodando em http://127.0.0.1:1337/
```
{% endsimplecode %}

Com o seu navegador, digite na barra de endereços o endereço {% c "http://127.0.0.1:1337/" %} e veja a sua mensagem!

## Conclusão

O Node resolveu muitos problemas que as novas aplicações web e mobile demandavam, mas não é uma **bala de prata**. Há certos tipos de aplicação em que o Node não funciona muito bem e deve ser evitado. O que esperar do futuro? Bem, O Node ainda é um projeto em versão beta, muitas modificações ainda podem ser feitas em seu projeto.

No entanto, é evidente que o seu uso tem sido cada vez mais frequente, portanto, permanecer atualizado é sempre uma boa ideia. ***:)***
