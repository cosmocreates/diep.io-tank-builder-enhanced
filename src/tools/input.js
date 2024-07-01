const { Keyboard, Mouse } = require('./inputDevices.js');

class InputHandler {
    constructor() {
        this.keyboard = new Keyboard();
        this.mouse = new Mouse();
    }
}

module.exports = { InputHandler };