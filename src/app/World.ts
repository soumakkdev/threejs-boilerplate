import * as THREE from 'three'
import App from './App'
import E from '@unseenco/e'
import { Events } from './helpers'
import Clock from './Clock'

// import vertexShader from './shaders/demo.vert'
// import fragmentShader from './shaders/demo.frag'

export default class World {
	box: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>
	app: App
	ground: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial, THREE.Object3DEventMap>
	constructor() {
		this.app = new App()
		new Clock()
		E.on(Events.Update, this.update)
		this.setup()
	}

	setup = () => {
		// this.box = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.ShaderMaterial({ vertexShader: vertexShader, fragmentShader: fragmentShader }))
		this.box = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshStandardMaterial({ color: 'skyblue' }))
		this.box.position.y = 0.5
		this.box.castShadow = true
		this.app.scene.add(this.box)

		this.ground = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshStandardMaterial())
		this.ground.receiveShadow = true
		this.ground.rotation.x = -Math.PI / 2
		this.app.scene.add(this.ground)
	}

	update = () => {}
}
