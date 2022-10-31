import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			$comp: './src/lib/components',
			$db: './src/database',
			$lib: './src/lib'
		},
		env: {
			dir: path.resolve('./'),
			publicPrefix: 'PUBLIC_'
		}
	}
};

export default config;
