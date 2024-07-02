const { scene, getSceneObject, Farm } = require('../scene.js');
const { strokeWidths, strokeBleedFactors, getSetting } = require('../settings.js');
const { stepMovement, stepCollision } = require('./physics.js');
const { frameRepeatPoints } = require('../settings.js');

class Renderer {
    constructor(context, canvas) {
        this.context = context;
        this.canvas = canvas;
        this.frame = 0;
        this.farm = new Farm();
        this.renderScene = this.renderScene.bind(this);
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    animationFrameLoopPassed(targetFrame) {
        return this.frame % targetFrame === 0
    }

    renderScene() {
        const camera = getSceneObject('Camera');
        this.context.save();

        window.requestAnimationFrame(this.renderScene);
        this.clear();

        if (!getSetting('paused')) {
            stepMovement();
            stepCollision();
            if (this.animationFrameLoopPassed(frameRepeatPoints.shapeSpawn)) {
                {
                    this.farm.newShape()
                }
            }
        }

        scene.forEach(sceneObject => {
            const appearance = sceneObject.appearance || {};
            const appearanceScrubbed = {
                fillColor: appearance.fillColor || 'rgba(0, 0, 0, 0)',
                strokeColor: null,
                strokeWidth: appearance.strokeWidth || strokeWidths.primary,
                pathOpened: appearance.pathOpened || true,
                pathClosed: appearance.pathClosed || true,
                locked: appearance.locked || false,
            };

            appearanceScrubbed.strokeColor = appearance.strokeColor || this.canvas.shiftColor(appearanceScrubbed.fillColor, strokeBleedFactors.primary);
            
            this.context.save();

            if (!appearanceScrubbed.locked) {
                this.context.scale(camera.zoom, camera.zoom);
                this.context.translate(-camera.x, -camera.y);
            }

            if (appearanceScrubbed.pathOpened) { this.context.beginPath(); }
            this.context.fillStyle = appearanceScrubbed.fillColor;
            this.context.strokeStyle = appearanceScrubbed.strokeColor;
            this.context.lineWidth = appearanceScrubbed.strokeWidth;
            sceneObject.render(this.context, this.canvas);
            this.context.fill();
            this.context.stroke();
            if (appearanceScrubbed.pathClosed) { this.context.closePath(); }
            this.context.restore();
        });

        this.context.restore();
    }
}

module.exports = { Renderer };