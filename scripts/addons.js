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
    return `<code>${md.utils.escapeHtml(content)}</code>`
  }, {
    ends: false
  })

hexo.extend.tag.register(
  'figure',
  (args, content) => {
    const argsMap = new Map(args.map(i => i.split(':')))
    const alt = argsMap.has('alt')
      ? md.utils.escapeHtml(argsMap.get('alt')) : ''
    const caption = argsMap.has('caption')
      ? `<figcaption>${md.render(argsMap.get('caption'))}</figcaption>` : ''
    const width = argsMap.has('width')
      ? argsMap.get('width') : '100'
    const height = argsMap.has('height')
      ? argsMap.get('height') : '100'
    console.log(content)
    const img = `
    <amp-img src="${content}"
        alt="${alt}"
        width="${width}"
        height="${height}"
        layout="responsive">
      <noscript>
        <img src="${content}" alt="${alt}" width="${width}" height="${height}">
      </noscript>
    </amp-img>`
    return `<figure>${img}${caption}</figure>`
  }, {
    ends: true
  })
