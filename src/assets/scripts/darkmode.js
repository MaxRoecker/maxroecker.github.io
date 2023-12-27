/** @typedef {'dark' | 'light'} Theme */

/**
 * Check if the value is a Theme
 *
 * @param {unknown} value
 * @returns {theme is Theme}
 */
function isTheme(value) {
  return value === 'dark' || value === 'light';
}

/**
 * Returns the next theme to replace the given one.
 *
 * @param {Theme} current
 * @returns {Theme}
 */
function getNext(current) {
  return current === 'dark' ? 'light' : 'dark';
}

/**
 * Detects the user preferred color scheme.
 *
 * @returns {Theme}
 */
function getPreferredTheme() {
  if (window.matchMedia == null) return 'light';
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
}

/**
 * Returns the stored color stored
 *
 * @returns {Theme | null}
 */
function getStoredTheme() {
  const theme = window.localStorage.getItem('theme');
  if (theme == null) return null;
  if (isTheme(theme)) return theme;
  return null;
}

const button = window.document.getElementById('theme-button');
if (button != null) {
  button.addEventListener('click', () => {
    const stored = getStoredTheme() ?? getPreferredTheme();
    const theme = getNext(stored);
    window.document.documentElement.classList.toggle('dark');
    window.localStorage.setItem('theme', theme);
  });
}

// Adjust the theme when the stored value is not the same as the preferred one.
const stored = getStoredTheme();
if (stored != null) {
  const preferred = getPreferredTheme();
  if (
    (stored === 'dark' && preferred === 'light') ||
    (stored === 'light' && preferred === 'dark')
  ) {
    window.document.documentElement.classList.toggle('dark');
  }
}
