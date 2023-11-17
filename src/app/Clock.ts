import E from '@unseenco/e'
import { Events } from './helpers'

export default class Clock {
	init: number
	elapsed: number
	delta: number
	then: number

	constructor() {
		this.init = 0
		this.elapsed = 0
		this.delta = 0
		this.then = performance.now()

		E.on(Events.Update, this.update)
	}

	update = () => {
		const now = performance.now()
		this.elapsed = (now - this.init) * 0.001

		this.delta = (now - this.then) * 0.001
		this.then = now
	}
}
