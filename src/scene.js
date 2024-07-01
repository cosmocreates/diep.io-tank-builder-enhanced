const { strokeWidths, circleClosingPoint } = require('./settings.js');

let scene = [];

class SceneObject {
    constructor() {
        scene.push(this);
        return this;
    }
}

function getSceneObject(name) {
    return scene.find(obj => obj.constructor.name === name);
}

class StatusIndicator extends SceneObject {
    constructor() {
        super();
        this.appearance = {
            fillColor: 'rgba(0, 0, 0, 0.5)',
            locked: true
        };
    }

    render(context, canvas) {
        context.font = '16pt Reddit Mono';
        context.fillText('Playtesting', 10, canvas.height - 20);
        
        context.font = '13pt Reddit Mono';
        context.fillText('diep.io tank builder enhanced', canvas.width - 305, canvas.height - 20);
    }
}

class Camera extends SceneObject {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.zoom = 1;
        this.subject = getSceneObject('Player');
    }

    render(context, canvas) {
        this.subject.width = this.subject.width || 0;
        this.subject.height = this.subject.height || 0;

        this.zoom = 1 / this.subject.radius * 50;

        this.x = (this.subject.x + this.subject.width / 2) - (canvas.width / (2 * this.zoom));
        this.y = (this.subject.y + this.subject.height / 2) - (canvas.height / (2 * this.zoom));
    }
}

class Player extends SceneObject {
    constructor(x, y, radius, arena) {
        super();
        this.x = x;
        this.y = y;
        this.arena = arena;
        this.radius = radius;
        this.acceleration = 0.05;
        this.friction = 0.02;
        this.velocityX = 0;
        this.velocityY = 0;

        this.appearance = {
            fillColor: 'rgb(70, 155, 240)'
        };
    }

    render(context) {
        if (this.radius >= (this.arena.width + this.arena.height) / 4) {
            this.radius = (this.arena.width + this.arena.height) / 4;
        }

        context.save();
        context.translate(this.x, this.y);
        context.arc(0, 0, this.radius, 0, circleClosingPoint);
        context.restore();
    }
}

class OutOfBounds extends SceneObject {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;

        this.appearance = {
            fillColor: 'rgb(160, 160, 160)',
            locked: true
        };
    }

    render(context, canvas) {
        context.rect(this.x, this.y, canvas.width, canvas.height);
    }
}

class Arena extends SceneObject {
    constructor(x, y, width, height) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.appearance = {
            fillColor: 'rgb(200, 200, 200)'
        };
    }

    renderGrid(context) {
        const arenaX = this.x - 2500;
        const arenaY = this.y - 2500;

        const width = this.width + 5000;
        const height = this.height + 5000;

        const gridSize = 20;
        const gridX = Math.floor(width / gridSize);
        const gridY = Math.floor(height / gridSize);

        context.beginPath();
        context.strokeStyle = 'rgba(0, 0, 0, 0.05)';
        context.lineWidth = strokeWidths.thin;

        for (let x = 0; x <= gridX; x++) {
            context.moveTo(arenaX + gridSize * x + 0.5, arenaY + 0.5);
            context.lineTo(arenaX + gridSize * x + 0.5, arenaY + height + 0.5);
        }

        for (let y = 0; y <= gridY; y++) {
            context.moveTo(arenaX + 0.5, arenaY + gridSize * y + 0.5);
            context.lineTo(arenaX + width + 0.5, arenaY + gridSize * y + 0.5);
        }

        context.stroke();
        context.closePath();
    }

    render(context) {
        this.renderGrid(context);
        context.rect(this.x, this.y, this.width, this.height);
    }
}

module.exports = {
    scene,
    SceneObject,
    getSceneObject,
    StatusIndicator,
    Camera,
    Player,
    OutOfBounds,
    Arena
};