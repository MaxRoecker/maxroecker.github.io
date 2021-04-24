const htmlmin = require('html-minifier');

/**
 * @param {string} content
 * @param {string} outputPath
 * @returns {string}
 */
function minifyHTML(content, outputPath) {
  if (outputPath.endsWith('.html')) {
    let minified = htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
    });
    return minified;
  } else {
    return content;
  }
}

module.exports = minifyHTML;
