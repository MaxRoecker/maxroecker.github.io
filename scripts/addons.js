'use strict';
const hljs = require( 'highlight.js' );
const md = require( 'markdown-it' )({
  html: true,
  xhtmlOut: true,
  breaks: false,
  linkify: true,
  typographer: true,
  highlight: ( str, lang ) => {
    if ( lang && hljs.getLanguage( lang ) ) {
      try {
        return '<pre class="hljs"><code>'
          + hljs.highlight( lang, str, true ).value
          + '</code></pre>';
      } catch ( e ) {
        console.error( 'Error in highlight code:', e );
      }
    }
    
    return '<pre class="hljs"><code>'
     + md.utils.escapeHtml( str )
     + '</code></pre>';
  }
});

hexo.extend.tag.register( 'simplecode', ( args, content ) => {
  return md.render(content);
}, { ends: true });

hexo.extend.tag.register( 'figure', ( args, content ) => {
  let result = '<figure>' + md.render( content );
  if ( args.length ) {
    result += '<figcaption>'
      + md.render( args[ 0 ] )
      + '</figcaption>';
  }
  result += '</figure>';
  return result;
}, { ends: true });
