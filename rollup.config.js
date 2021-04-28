import resolve from '@rollup/plugin-node-resolve';
import summary from 'rollup-plugin-summary';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: ['src/lib/playground.js'],
    output: {
      dir: 'rollupout',
      format: 'esm',
    },
    plugins: [
      resolve({
        dedupe: () => true,
      }),
      terser({
        warnings: true,
        ecma: 2020,
        compress: {
          unsafe: true,
          passes: 2,
        },
        output: {
          comments: false,
          inline_script: false,
        },
        mangle: {
          properties: false,
        },
      }),
      summary({
        // Already minified.
        showMinifiedSize: false,
      }),
    ],
  },
];
