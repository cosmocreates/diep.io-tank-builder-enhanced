const { setSetting } = require('../settings.js');

class Splash {
    constructor(image, timeout, silent) {
        this.image = image;
        this.timeout = timeout;
        this.silent = silent;
    }

    show() {
        if (this.silent) return;
        setSetting('paused', true);
        this.splash = document.createElement('splash');
        this.imageElement = document.createElement('img');
        this.imageElement.src = this.image;
        this.imageElement.draggable = false;

        this.splash.appendChild(this.imageElement);
        document.body.appendChild(this.splash);
    }

    hide() {
        if (this.silent) return;
        setSetting('paused', false);
        this.splash.className = 'hidden';
        addEventListener('transitionend', () => { this.splash.remove(); });
    }
}

module.exports = { Splash };