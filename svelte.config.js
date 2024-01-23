import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),

		env: {
			dir: './'
		},

		alias: {
			$server: './src/lib/server',
			$db: './src/lib/server/db.ts',
		}
	}
}

export default config
