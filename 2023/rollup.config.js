import terser from '@rollup/plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';
import analyze from 'rollup-plugin-analyzer';


//
// Without any plugins, rollup combines all of the used source files into a single file.
// This converts the source inta 45 KB file dist/main.es.js (11 KB zipped)
export default {
	input: 'src/index.mjs',
	output: {
		file: 'dist/main.es.js',
		format: 'es',
		sourcemap: false,
		globals: {
    },
	},
	plugins: [
		analyze({
			summaryOnly: true,
		}),
		// default terser plugin.
		// 17 KB main.es.js (5 KB zipped)
		terser({
			compress: {
				drop_console: true,
			},
		}),
		visualizer({
			gzipSize: true,
			template: 'sunburst', // 'sunburst', 'network', or  'treemap'
		}),
	],
	external: [  ]
};
