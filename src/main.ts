import App from './app/App'
import { isWebGLAvailable, getWebGLErrorMessage } from 'three-stdlib'
import './style.css'

const root = document.getElementById('app') as HTMLDivElement

if (isWebGLAvailable()) {
	new App({
		root,
	})
} else {
	const warning = getWebGLErrorMessage()
	console.warn(warning)
	root.textContent = 'WebGL is not supported'
}
