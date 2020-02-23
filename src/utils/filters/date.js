const datefns = require('date-fns')
const locales = require('date-fns/locale')

/**
 * Format a date in a pt-br language.
 *
 * @param {*} date
 * @param {string} [format='']
 * @returns {string}
 */
function formatDate (date, format = '') {
  return format === ''
    ? datefns.formatISO(date)
    : datefns.format(date, format, { locale: locales.ptBR })
}

module.exports = formatDate
