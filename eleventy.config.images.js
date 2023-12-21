const path = require('path');
const eleventyImage = require('@11ty/eleventy-img');

module.exports = (eleventyConfig) => {
  function relativeToInputPath(inputPath, relativeFilePath) {
    let split = inputPath.split('/');
    split.pop();

    return path.resolve(split.join(path.sep), relativeFilePath);
  }

  // Eleventy Image shortcode
  // https://www.11ty.dev/docs/plugins/image/
  eleventyConfig.addAsyncShortcode(
    'image',
    async function (src, alt, widths, sizes) {
      // Full list of formats here: https://www.11ty.dev/docs/plugins/image/#output-formats
      // Warning: Avif can be resource-intensive so take care!
      let formats = ['avif', 'webp', 'auto'];
      let file = relativeToInputPath(this.page.inputPath, src);
      let metadata = await eleventyImage(file, {
        widths: widths || ['auto'],
        formats,
        outputDir: path.join(eleventyConfig.dir.output, 'img'), // Advanced usage note: `eleventyConfig.dir` works here because we’re using addPlugin.
      });

      // TODO loading=eager and fetchpriority=high
      let imageAttributes = {
        alt,
        sizes,
        loading: 'lazy',
        decoding: 'async',
      };
      return eleventyImage.generateHTML(metadata, imageAttributes);
    },
  );

  // Eleventy Image shortcode
  // https://www.11ty.dev/docs/plugins/image/
  eleventyConfig.addAsyncShortcode('img', async function (options) {
    const {
      src,
      alt,
      title,
      widths = ['auto'],
      formats = ['auto'],
      sizes,
    } = options;
    // Full list of formats here: https://www.11ty.dev/docs/plugins/image/#output-formats
    // Warning: Avif can be resource-intensive so take care!
    let file = relativeToInputPath(this.page.inputPath, src);
    // Advanced usage note: `eleventyConfig.dir` works here because we’re using addPlugin.
    const outputDir = path.join(eleventyConfig.dir.output, 'img');
    let metadata = await eleventyImage(file, { widths, formats, outputDir });

    // TODO loading=eager and fetchpriority=high
    let imageAttributes = {
      alt,
      title,
      sizes,
      loading: 'lazy',
      decoding: 'async',
    };
    return eleventyImage.generateHTML(metadata, imageAttributes);
  });
};
