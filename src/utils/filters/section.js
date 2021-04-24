/**
 * Split the content into excerpt and remainder
 *
 * @param {String} str
 * @param {String [excerpt | remainder]} section
 *
 * If excerpt or nothing is passed as an argument, we return what was before the split marker.
 * If remainder is passed as an argument, we return the rest of the post
 *
 */

function section(str, section, delimiter = '\n<!--more-->\n') {
  var content = new String(str);
  var parts = content.split(delimiter);
  var which = section == 'remainder' ? 1 : 0;
  if (parts.length) {
    return parts[which];
  } else {
    return str;
  }
}

module.exports = section;
