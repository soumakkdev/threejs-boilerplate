import { defineConfig } from 'vite'
import glslify from 'rollup-plugin-glslify'

export default defineConfig({
	root: './src',
	publicDir: '../public',
	build: {
		outDir: '../dist',
	},
	server: {
		port: 8000,
		host: false,
		open: false,
	},
	plugins: [glslify()],
})
