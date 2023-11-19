import E from '@unseenco/e'
import Stats from 'stats.js'
import {
	ACESFilmicToneMapping,
	AxesHelper,
	GridHelper,
	PCFSoftShadowMap,
	PerspectiveCamera,
	SRGBColorSpace,
	Scene,
	Vector2,
	Vector3,
	WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three-stdlib'
import { Pane } from 'tweakpane'
import Environment from './Environment'
import World from './World'
import { Events } from './helpers'

interface AppProps {
	root: HTMLDivElement
}

export default class App {
	static instance: App
	scene: Scene
	fov: number
	camera: PerspectiveCamera
	width: number
	height: number
	aspect: number
	cameraPosition: Vector3
	renderer: WebGLRenderer
	root: HTMLDivElement
	stats: Stats
	orbit: OrbitControls
	gui: Pane
	axes: AxesHelper
	grid: GridHelper
	cursor: Vector2

	constructor(props?: AppProps) {
		if (App.instance) return App.instance
		App.instance = this

		if (props?.root) {
			this.root = props.root
		}
		this.fov = 50
		this.width = window.innerWidth
		this.height = window.innerHeight
		this.aspect = this.width / this.height
		this.cameraPosition = new Vector3(-3, 2, 5)
		this.cursor = new Vector2()

		this.scene = new Scene()

		this.camera = new PerspectiveCamera(this.fov, this.aspect)
		this.camera.position.copy(this.cameraPosition)
		this.scene.add(this.camera)

		this.renderer = new WebGLRenderer({ antialias: true })
		this.renderer.setSize(this.width, this.height)
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		this.renderer.setClearColor('#151515')
		this.renderer.setAnimationLoop(this.update)
		this.renderer.shadowMap.enabled = true
		this.renderer.shadowMap.type = PCFSoftShadowMap
		this.renderer.outputColorSpace = SRGBColorSpace
		this.renderer.toneMapping = ACESFilmicToneMapping
		this.root.appendChild(this.renderer.domElement)

		this.stats = new Stats()
		this.root.appendChild(this.stats.dom)

		this.orbit = new OrbitControls(this.camera, this.renderer.domElement)
		this.orbit.enableDamping = true
		this.orbit.target.set(0, 0, 0)

		this.axes = new AxesHelper(2)
		this.axes.visible = false
		this.axes.position.y = 0.001
		this.scene.add(this.axes)

		this.grid = new GridHelper()
		this.grid.visible = false
		this.grid.position.y = 0.001
		this.scene.add(this.grid)

		this.gui = new Pane({ title: 'Controls', expanded: false })
		this.gui.addBinding(this.axes, 'visible', { label: 'Axes' })
		this.gui.addBinding(this.grid, 'visible', { label: 'Grid' })
		this.gui.addBinding(this.orbit, 'enabled', { label: 'Orbit' })

		new World()
		new Environment()

		E.on('resize', window, this.resize)
		E.on('keydown', document, this.fullscreen)
		E.on('mousemove', window, this.mousemove)
		E.on('keydown', document, this.toggleDebug)
	}

	resize = () => {
		this.width = window.innerWidth
		this.height = window.innerHeight
		this.aspect = this.width / this.height

		this.camera.aspect = this.aspect
		this.camera.updateProjectionMatrix()

		this.renderer.setSize(this.width, this.height)
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
	}

	mousemove = (e: MouseEvent) => {
		// 1 <> -1
		this.cursor.x = (e.clientX / this.width) * 2 - 1
		this.cursor.y = -((e.clientY / this.height) * 2 - 1)
	}

	fullscreen = (e: KeyboardEvent) => {
		if (e.ctrlKey && e.code === 'Space') {
			if (!document.fullscreenElement) {
				this.renderer.domElement.requestFullscreen()
			} else {
				document.exitFullscreen()
			}
		}
	}

	toggleDebug = (e: KeyboardEvent) => {
		e.preventDefault()
		if (e.altKey && e.code === 'KeyD') {
			this.gui.hidden = !this.gui.hidden
		}
	}

	update = () => {
		E.emit(Events.Update)
		this.stats.update()
		this.orbit.update()
		this.renderer.render(this.scene, this.camera)
	}
}
