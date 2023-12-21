const path = require('path');
const fs = require('fs');
const esbuild = require('esbuild');

async function build(entryPoints = [], outdir) {
  // Playground
  const result = await esbuild.build({
    entryPoints,
    outdir,
    bundle: true,
    target: 'es2020',
    minify: true,
    entryNames: '[name].[hash]',
    legalComments: 'none',
    external: ['/img/*', '/projects/*'],
    format: 'esm',
    metafile: true,
  });
  const entries = Object.entries(result.metafile.outputs).map(
    ([output, config]) => {
      return [config.entryPoint, path.relative('./_site/', output)];
    },
  );
  return Object.fromEntries(entries);
}

async function main(args) {
  if (args[0] === 'styles') {
    const entryPoints = [
      './src/assets/styles/reset.css',
      './src/assets/styles/index.css',
      './src/assets/styles/highlight.css',
      './src/assets/styles/playground.css',
    ];
    const entries = await build(entryPoints, './_site/css');
    const data = JSON.stringify(entries, null, 2);
    fs.writeFileSync('./src/_data/styles.json', data, {
      encoding: 'utf-8',
      flag: 'w',
    });
  }

  if (args[0] === 'scripts') {
    const entryPoints = ['./src/assets/scripts/playground.js'];
    const entries = await build(entryPoints, './_site/js');
    const data = JSON.stringify(entries, null, 2);
    fs.writeFileSync('./src/_data/scripts.json', data, {
      encoding: 'utf-8',
      flag: 'w',
    });
  }
}

main(process.argv.slice(2)).catch((error) => console.error(error));
