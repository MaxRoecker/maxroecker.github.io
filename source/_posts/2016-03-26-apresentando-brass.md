---
title: 'Apresentando: Brass'
description: 'Um tema simples e colorido para Hexo'
cover:
  path: cover.png
  title: 'Brass Logo'
  src: ''
featured: false
tags:
  - design
  - web
date: 2016-03-26 23:12:00
---

No post anterior mencionei sobre a estratégia de mover o blog outra vez e sobre o novo framework que eu utilizei, o [Hexo](http://hexo.io). Venho agora apresentar a solução desenvolvida por mim: Brass, um tema simples e colorido para Hexo.

Brass foi desenvolvido com três focos principais: ser facilmente configurável; ser um tema leve e rápido; e utilizar tecnologias de ponta da Open Web, disponíveis hoje em grande parte dos navegadores modernos. O tema Brass possui código aberto (sob licença MIT) está disponível em seu [repositório](https://github.com/MaxRoecker/hexo-theme-brass). Caso queiram uma demonstração do tema, vocês já estão em uma. Isso mesmo, o próprio blog utiliza o Brass.

---
## Principais características e alguns detalhes técnicos
Para manter a configuração das funcionalidades do tema simples, o Brass utiliza os [arquivos de dados Hexo](https://hexo.io/docs/data-files.html) para customizar o comportamento do blog. Através de algumas definições e propriedades, você pode configurar seu menu, adicionar uma biografia no rodapé do site e até atribuir a logo do seu site. Tudo isso centralizado em um só arquivo e sem a necessidade de alterar o código fonte.

O tema também é otimizado para o SEO, com soluções prontas das meta-tags de [Twitter Cards](https://dev.twitter.com/cards/overview), [Facebook Open Graph](https://developers.facebook.com/docs/sharing/opengraph) e [JSON-ld](http://json-ld.org/). Há também como configurar o Google Analytics, para que você tenha estatísticas do tráfego do seu blog.
  
Para manter o tema rápido, foi decidido não adicionar arquivos scripts no tema. Dessa forma,  Brass não possui JQuery, nem Angular ou qualquer outra biblioteca ou framework em JavaScript, com exceção do trecho de código do Google Analytics.

Todo o estilo do tema é baseado em [CSS Variables](https://www.w3.org/TR/css-variables/), um novo recurso disponível há pouco tempo nos navegadores modernos, que permite a utilização de variáveis nativamente no CSS, sem o uso de outras ferramentas.

---
## Inicialização
Para instalar o Brass no seu blog, primeiramente é necessário que você utilize o Hexo 3.2.0 ou superior. Então, siga os passos a seguir:

1) No diretório do seu blog, instale o Brass através do comando abaixo.

{% simplecode bash %}
``` bash
$ git clone https://github.com/MaxRoecker/hexo-theme-brass.git  themes/brass
```
{% endsimplecode %}

2) Ative o Brass alterando o arquivo `_config.yml`, atribuindo à propriedade `theme` o valor  `brass`.

{% simplecode yml %}
``` yml
# Hexo Configuration file: "_config.yml"
# ...
theme: brass
# ...
```
{% endsimplecode %}

Caso você queira aprender como configurar todas as opções que o tema fornece, [consulte a documentação no repositório](https://github.com/MaxRoecker/hexo-theme-brass#configuration).

---
## Alguma dúvida?
Caso você tenha alguma dúvida ou sugestão, entre em contato através do Github. Sinta-se livre também para fazer um fork do projeto e alterá-lo como quiser.

Por hoje é só, pessoal. Até a próxima.
