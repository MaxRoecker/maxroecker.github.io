const htmlTagsRegex = /(<.+?>)/gi;
const ampersRegex = /(&.+?;)/gi;
const meaninglessRegex = /\b(\.|\,|o|a|os|as|um|uma|uns|umas|eu|você|nós|vós|eles|meu|seu|dele|dela|sua|sim|não|ou|e|de|para|é|sou|estou|está|são|eram|era)\b/gi;
const punctuationRegex = /\.|\,|\?|-|—|\"|'|\n|\\/g;
const doubleSpaceRegex = /[ ]{2,}/g;

/**
 * Make a search index string by removing duplicated words and removing less
 * useful, common short words.
 *
 * @param {string} text
 * @returns {string}
 */
function squash(text) {
  let result = text;
  result = result.replace(htmlTagsRegex, '');
  result = result.replace(ampersRegex, '');
  const words = result.split(' ');
  result = [...new Set(words)].join(' ');
  result = result.replace(meaninglessRegex, '');
  result = result.replace(punctuationRegex, '');
  result = result.replace(doubleSpaceRegex, ' ');
  return result;
}

module.exports = squash;
