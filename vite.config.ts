import { defineConfig } from 'vite'
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
})
