const katex = require('katex')

/**
 * @param {string} tex
 * @returns {string}
 */
function renderMath (tex) {
  return katex.renderToString(tex, { throwOnError: false })
}

module.exports = renderMath
