import * as THREE from 'three'
import App from './App'
import E from '@unseenco/e'
import { Events } from './helpers'
import Clock from './Clock'

export default class World {
	box: THREE.Mesh<THREE.BoxGeometry, THREE.MeshNormalMaterial, THREE.Object3DEventMap>
	app: App
	constructor() {
		this.app = new App()
		new Clock()
		E.on(Events.Update, this.update)
		this.setup()
	}

	setup = () => {
		this.box = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshNormalMaterial())
		this.app.scene.add(this.box)
	}

	update = () => {}
}
