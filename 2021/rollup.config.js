// import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
// import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';


export default {
	input: 'src/main.mjs',
	output: {
		file: 'dist/main.mjs',
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
		minify( {
			comments: false,
			sourceMap: false,
		})
	],
	external: [  ]
};
