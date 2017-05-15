'use strict'
const hljs = require('highlight.js')

const md = require('markdown-it')({
  html: true,
  xhtmlOut: true,
  breaks: false,
  linkify: true,
  typographer: true,
  highlight: (str, lang) => {
    let highlighted = ''
    if (lang != null && hljs.getLanguage(lang) != null) {
      try {
        highlighted = hljs.highlight(lang, str, true).value
      } catch (error) {
        console.error('Error in highlight code:', error)
      }
    } else {
      highlighted = md.utils.escapeHtml(str)
    }
    return `<pre class="hljs"><code>${highlighted}</code></pre>`
  }
})

hexo.extend.tag.register(
  'quote',
  (args, content) => {
    const quote = md.render(content)
    const argsMap = new Map(args.map(i => i.split(':')))
    const author = argsMap.get('author')
    const url = argsMap.get('url')
    const place = argsMap.get('place')
    let citation = ''
    if (author != null && url != null && place != null) {
      citation = `${author}, <em><a href="${url}">${place}</a></em>`
    } else if (author != null && url != null) {
      citation = `<a href="${url}">${author}</a>`
    } else if (author != null && place != null) {
      citation = `${author}, <em>${place}</em>`
    } else if (url != null && place != null) {
      citation = `<em><a href="${url}">${place}</a></em>`
    } else if (url != null) {
      citation = `<em><a href="${url}">${url}</a></em>`
    } else if (place != null) {
      citation = `<em>${place}</em>`
    } else if (author != null) {
      citation = `${author}`
    }
    let footer = ''
    if (citation !== '') {
      footer = `<footer><cite>${citation}</cite></footer>`
    }
    const blockquote = `<blockquote>${quote}${footer}</blockquote>`
    return blockquote
  }, {
    ends: true
  }
)

hexo.extend.tag.register(
  'simplecode',
  (args, content) => {
    return md.render(content)
  }, {
    ends: true
  })

hexo.extend.tag.register(
  'c',
  (args) => {
    const content = args[0]
    return `<code>${content}</code>`
  }, {
    ends: false
  })

hexo.extend.tag.register(
  'figure',
  (args, content) => {
    let caption = ''
    if (args.length > 0) {
      caption = `<figcaption>${md.render(args[0])}</figcaption>`
    }
    return `<figure>${md.render(content)}${caption}</figure>`
  }, {
    ends: true
  })
