const { EleventyHtmlBasePlugin } = require('@11ty/eleventy');
const htmlmin = require('html-minifier');
const markdownItAnchor = require('markdown-it-anchor');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginNavigation = require('@11ty/eleventy-navigation');
const pluginRss = require('@11ty/eleventy-plugin-rss');

const pluginDrafts = require('./eleventy.config.drafts.js');
const pluginImages = require('./eleventy.config.images.js');

module.exports = function (eleventyConfig) {
  // Copy the contents of the `public` folder to the output folder
  // For example, `./public/img/` ends up in `_site/img/`
  eleventyConfig.addPassthroughCopy({
    './src/public/': '/',
    './node_modules/playground-elements/playground-typescript-worker.js': `/js/`,
  });

  // Run Eleventy when these files change:
  // https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

  // Watch content images for the image pipeline.
  eleventyConfig.addWatchTarget('content/**/*.{svg,webp,png,jpeg}');

  // Watch for changes on the bundled JS and CSS
  eleventyConfig.setServerOptions({
    watch: ['./_site/js/**/*.js', './_site/css/**/*.css'],
  });

  // App plugins
  eleventyConfig.addPlugin(pluginDrafts);
  eleventyConfig.addPlugin(pluginImages);

  // Official plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight, {
    preAttributes: { tabindex: 0 },
  });
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // FILTERS

  // Format a date using Intl.DateTimeFormat
  eleventyConfig.addFilter('formatDate', (date, language, options) => {
    if (language == null) {
      return date.toISOString();
    }
    return new Intl.DateTimeFormat(language, options).format(date);
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter('head', (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if (n < 0) {
      return array.slice(n);
    }
    return array.slice(0, n);
  });

  // Return the smallest number argument
  eleventyConfig.addFilter('min', (...numbers) => {
    return Math.min.apply(null, numbers);
  });

  // Return all the tags used in a collection
  eleventyConfig.addFilter('getAllTags', (collection) => {
    const tags = collection.flatMap((item) => item.data.tags ?? []);
    return Array.from(new Set(tags));
  });

  eleventyConfig.addFilter('filterTagList', function filterTagList(tags) {
    return (tags || []).filter(
      (tag) => ['all', 'nav', 'post', 'posts'].indexOf(tag) === -1,
    );
  });

  // Customize Markdown library settings:
  eleventyConfig.amendLibrary('md', (mdLib) => {
    mdLib.use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.ariaHidden({
        placement: 'after',
        class: 'header-anchor',
        symbol: '#',
        ariaHidden: false,
      }),
      level: [1, 2, 3, 4],
      slugify: eleventyConfig.getFilter('slugify'),
    });
  });

  // Minify the HTML output

  eleventyConfig.addTransform('htmlmin', function (content) {
    // Prior to Eleventy 2.0: use this.outputPath instead
    if (this.page.outputPath && this.page.outputPath.endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
    return content;
  });

  // Features to make your build faster (when you need them)

  // If your passthrough copy gets heavy and cumbersome, add this line
  // to emulate the file copy on the dev server. Learn more:
  // https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

  // eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: ['md', 'njk', 'html', 'liquid'],

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: 'njk',

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: 'njk',

    // These are all optional:
    dir: {
      input: 'src/content', // default: "."
      includes: '../_includes', // default: "_includes"
      data: '../_data', // default: "_data"
      output: '_site',
    },

    // -----------------------------------------------------------------
    // Optional items:
    // -----------------------------------------------------------------

    // If your site deploys to a subdirectory, change `pathPrefix`.
    // Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

    // When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
    // it will transform any absolute URLs in your HTML to include this
    // folder name and does **not** affect where things go in the output folder.
    pathPrefix: '/',
  };
};
