import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import ts from '@wessberg/rollup-plugin-ts';
import pkg from './package.json';

const extensions = ['.ts', '.tsx'];

export default {
  input: './src/index.ts',

  external: [...Object.keys(pkg.peerDependencies || {}), '@styled-icons/material/KeyboardArrowDown'],

  plugins: [resolve({ extensions }), ts({ transpiler: 'babel' }), commonjs({ extensions })],

  output: [
    { file: pkg.main, format: 'cjs', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
};
