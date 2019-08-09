// import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
// import babel from 'rollup-plugin-babel';

export default {
	input: 'src/index.js',
	output: {
		file: 'dist/main.js',
		format: 'iife',
		sourcemap: false,
		globals: {
    },
	},
	plugins: [
		resolve(), // tells Rollup how to find libraries in node_modules
		// commonjs(),
    // babel({
    //   exclude: 'node_modules/**' // only transpile our source code
    // }),
	],
	external: [  ]
};
