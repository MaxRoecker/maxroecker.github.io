module.exports = function (config) {
  // A useful way to reference the context we are runing eleventy in
  let env = process.env.ELEVENTY_ENV;

  // Layout aliases can make templates more portable
  config.addLayoutAlias('default', 'layouts/base.njk');

  // Add some utility filters
  config.addFilter('squash', require('./src/utils/filters/squash.js'));
  config.addFilter('formatDate', require('./src/utils/filters/date.js'));

  // Add shortcodes
  config.addShortcode('math', require('./src/utils/math'));

  // add support for syntax highlighting
  config.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'));

  // minify the html output
  config.addTransform('htmlmin', require('./src/utils/minify-html.js'));

  // compress and combine js files
  config.addFilter('jsmin', (code) => {
    const UglifyJS = require('uglify-js');
    let minified = UglifyJS.minify(code);
    if (minified.error) {
      console.log('UglifyJS error: ', minified.error);
      return code;
    }
    return minified.code;
  });

  // pass some assets right through
  config.addPassthroughCopy('./src/site/images');
  config.addPassthroughCopy('./src/site/robots.txt');
  config.addPassthroughCopy({ './src/site/fonts': 'css/fonts' });
  config.addPassthroughCopy({ './src/site/projects': 'projects' });
  config.addPassthroughCopy({ './rollupout': 'js' });
  config.addPassthroughCopy({
    'node_modules/playground-elements/playground-typescript-worker.js':
      'js/playground-typescript-worker.js',
  });
  config.addPassthroughCopy({
    'node_modules/playground-elements/playground-service-worker.js':
      'js/playground-service-worker.js',
  });
  config.addPassthroughCopy({
    'node_modules/playground-elements/playground-service-worker-proxy.html':
      'js/playground-service-worker-proxy.html',
  });

  // make the seed target act like prod
  env = env == 'seed' ? 'prod' : env;
  return {
    dir: {
      input: 'src/site',
      output: 'dist',
      data: `_data/${env}`,
    },
    templateFormats: ['njk', 'md', '11ty.js'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    passthroughFileCopy: true,
  };
};
