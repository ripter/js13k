
// Without any plugins, rollup combines all of the used source files into a single file.
//
export default {
	input: 'src/main.mjs',
	output: {
		file: 'dist/main.es.js',
		format: 'es',
		sourcemap: false,
		globals: {
    },
	},
	plugins: [
	],
	external: [  ]
};
