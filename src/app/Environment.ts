import { AmbientLight, DirectionalLight } from 'three'
import App from './App'

export default class Environment {
	app: App
	constructor() {
		this.app = new App()

		this.addAmbientLight()
		this.addSunLight()
	}

	addAmbientLight() {
		const ambient = new AmbientLight('#ffffff', 1)
		this.app.scene.add(ambient)
	}

	addSunLight() {
		const sunLight = new DirectionalLight('#ffffff', 2)
		sunLight.position.set(1, 1, 1)
		sunLight.shadow.mapSize.set(2048, 2048)
		sunLight.castShadow = true
		this.app.scene.add(sunLight)
	}
}
