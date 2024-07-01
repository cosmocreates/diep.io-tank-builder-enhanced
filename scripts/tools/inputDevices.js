export let inputMap = {
    'up': {
        down: false,
        trigger: {
            'w': { device: 'Keyboard' },
            'ArrowUp': { device: 'Keyboard' }
        }
    },
    'left': {
        down: false,
        trigger: {
            'a': { device: 'Keyboard' },
            'ArrowLeft': { device: 'Keyboard' }
        }
    },
    'down': {
        down: false,
        trigger: {
            's': { device: 'Keyboard' },
            'ArrowDown': { device: 'Keyboard' }
        }
    },
    'right': {
        down: false,
        trigger: {
            'd': { device: 'Keyboard' },
            'ArrowRight': { device: 'Keyboard' }
        }
    }
};

export class Keyboard {
    constructor() {
        this.keys = {};
        this.#init();
    }

    #init() {
        for (let action in inputMap) {
            if (inputMap.hasOwnProperty(action)) {

                for (let key in inputMap[action].trigger) {
                    if (inputMap[action].trigger.hasOwnProperty(key)) {
                        this.keys[key] = false;
                    }
                }
            }
        }
    }

    keyDown(event) {
        const key = event.key;
        if (this.keys.hasOwnProperty(key)) {
            this.keys[key] = true;

            for (let action in inputMap) {
                if (inputMap.hasOwnProperty(action)) {
                    if (inputMap[action].trigger.hasOwnProperty(key)) {
                        inputMap[action].down = true;
                    }
                }
            }
        }
    }

    keyUp(event) {
        const key = event.key;
        if (this.keys.hasOwnProperty(key)) {
            this.keys[key] = false;

            for (let action in inputMap) {
                if (inputMap.hasOwnProperty(action)) {
                    if (inputMap[action].trigger.hasOwnProperty(key)) {

                        let anyKeyPressed = false;
                        for (let k in inputMap[action].trigger) {
                            if (this.keys[k]) {
                                anyKeyPressed = true;
                                break;
                            }
                        }
                        inputMap[action].down = anyKeyPressed;
                    }
                }
            }
        }
    }
}

export class Mouse {
    constructor() {
        this.buttons = {};
        this.#init();
    }

    #init() {
        this.buttons = {
            left: false,
            right: false,
            middle: false
        };

        window.addEventListener('mousedown', this.mouseDown.bind(this));
        window.addEventListener('mouseup', this.mouseUp.bind(this));
    }

    mouseDown(event) {
        const button = this.getButtonName(event.button);
        if (button) {
            this.buttons[button] = true;
        }
    }

    mouseUp(event) {
        const button = this.getButtonName(event.button);
        if (button) {
            this.buttons[button] = false;
        }
    }

    getButtonName(buttonCode) {
        switch (buttonCode) {
            case 0:
                return 'left';
            case 1:
                return 'middle';
            case 2:
                return 'right';
            default:
                return null;
        }
    }

    isButtonDown(buttonName) {
        return this.buttons[buttonName];
    }
}