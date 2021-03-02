---
title: 'Introdução ao Node.js'
subtitle: ''
heading: 'Uma breve introdução ao interpretador de código JavaScript que não precisa de um navegador.'
date: 2015-09-14 15:45:25
tags:
  - javascript
  - nodejs
  - post
---

O [Node.js](https://nodejs.org/), popularmente conhecido apenas como Node, é um
ambiente de execução JavaScript que não acompanha um navegador. O Node utiliza o
[V8](https://developers.google.com/v8/) como motor de execução, o mesmo
utilizado pelo navegador Google Chrome. O Node também possui um sistema
gerenciador de pacotes, o [NPM](https://www.npmjs.com/), que contém alguns
milhares de módulos open-source para disponíveis em repositório.

Utilizando os mesmos princípios do JavaScript, o Node utiliza um modelo de
concorrência baseado em
**[laço de eventos](https://pt.wikipedia.org/wiki/La%C3%A7o_de_eventos)** que
roda em uma _thread_ única. No entanto, grande parte das operações que podem
bloquear o laço por muito tempo são implementadas de forma assíncrona, evitando
que código JavaScript bloqueie o laço por muito tempo.

Convencionalmente, as implementações de servidores em linguagens como Java e PHP
utilizam a estratégia de criar uma _thread_ para cada conexão. A criação de uma
_thread_ acompanha uma alocação de memória que chega a até alguns megabytes.
Isso pode se tornar custoso a medida que o número de conexões paralelas aumenta.

Pragmaticamente, quando o Node.js precisa executar uma operação entrada e saída
— leituras de arquivos, rede, banco de dados, entre outras — ao invés de
bloquear o fluxo até que o resultado esteja disponível, ele escala o fluxo em
uma fila de tarefas que volta a ser executado quando o resultado estiver
disponível.

Esse modelo de concorrência assíncrono permite que apenas uma _thread_ seja
capaz de manipular vários fluxos de execução diferentes sem a necessidade de
gerenciar _threads_ paralelas, uma tarefa árdua e propícia a bugs.

No entanto, essa característica assíncrona do código pode parecer estranha para
desenvolvedores que estão acostumados com ambientes servidores que fazem
operações síncronas. Ainda assim, a filosofia de execução assíncrona para todas
as coisas é a chave para o sucesso do Node. Enquanto os ambientes servidores
convencionais forçam as conexões a se manterem em linha enquanto arquivos são
carregados no servidor ou requisições de rede são executadas, o Node despacha
cada conexão recebida e continua a aceitar as próximas enquanto os eventos
assíncronos fazem o trabalho "por trás".

O Node não é o único a adotar essa estratégia. Outras plataformas que
compartilham de um modelo de concorrência similar, como é o caso do
[Twisted Python](https://twistedmatrix.com/trac/) e do
[Tornado](http://www.tornadoweb.org/en/stable/) para a linguagem Python, além da
especificação
[Servlets 3.0](http://www.javabeat.net/asynchronous-servlet-servlet-3-0/) para a
linguagem Java.

## Instalando o Node.js

Vamos instalar o Node através do [NVM](https://github.com/creationix/nvm). No
terminal, digite:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh |
```

Rodando o comando acima irá fazer o download do _script_ que instala o NVM e
executá-lo. Esse _script_ clona o repositório do NVM em uma pasta temporária
`~/.nvm` e coloca as variáveis de ambiente em algum arquivo de perfil do
terminal (`~/._profile`, `~/.zshrc`, `~/.profile`, ou `~/.rc`).

Você pode verificar se o NVM foi instalado com sucesso utilizando o commando abaixo:

```bash
command -v nvm
```

Se tudo deu certo, a saída deve ser "<samp>nvm</samp>".

Vamos agora instalar o Node. Para rodar a última versão estável, execute o
commando a seguir:

```bash
nvm install stable
```

Após isso, ative o Node instalado utilizando.

```bash
nvm use stable
```

Você pode aprender mais sobre o NVM na
[página do GitHub do projeto](https://github.com/nvm-sh/nvm). Para verificar a
instalação do Node, digite o comando abaixo.

```bash
node -v
```

## Um pequeno exemplo

Para exemplificar a facilidade em criar servidores HTTP com o Node, vamos fazer
um em alguns minutos? Vamos criar um web server que responde "Hello World" em
formato texto simples para qualquer requisição. Exemplo tirado da
[página oficial](https://nodejs.org/).

```js
var http = require('http');

http
  .createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
  })
  .listen(1337, '127.0.0.1');

console.log('Servidor rodando em http://127.0.0.1:1337/');
```

Para rodar, salve o arquivo com um nome, por exemplo, `example.js` e execute-o
com o Node, no terminal, da seguinte forma:

```bash
node example.js
```

Você deve receber como saída a mensagem "<samp>Servidor rodando em
http://127.0.0.1:1337/</samp>". Com o seu navegador, digite na barra de
endereços o endereço `http://127.0.0.1:1337/` e veja a sua mensagem.

## Conclusão

O Node resolveu muitos problemas que as novas aplicações web e mobile
demandavam, mas não é uma bala de prata que serve para qualquer aplicação.
Certos problemas requerem soluções difernetes e o Node pode não funcionar muito
bem. Ainda assim, é uma ótima ferramenta para ter em seu inventário.
