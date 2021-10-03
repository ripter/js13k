import { terser } from 'rollup-plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';
import analyze from 'rollup-plugin-analyzer';


//
// Without any plugins, rollup combines all of the used source files into a single file.
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
		analyze({
			summaryOnly: true,
		}),
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
