import { Keyboard, Mouse } from './inputDevices.js'

export class InputHandler {
    constructor() {
        this.keyboard = new Keyboard()
        this.mouse = new Mouse()
    }
}