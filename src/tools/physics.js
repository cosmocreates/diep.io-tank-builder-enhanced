const { inputMap } = require('./inputDevices.js');
const { getSetting } = require('../settings.js');
const { getSceneObject } = require('../scene.js');

function stepMovement() {
    const player = getSceneObject('Player');

    if (inputMap.up.down) {
        player.velocityY -= player.acceleration;
    }

    if (inputMap.left.down) {
        player.velocityX -= player.acceleration;
    }

    if (inputMap.down.down) {
        player.velocityY += player.acceleration;
    }

    if (inputMap.right.down) {
        player.velocityX += player.acceleration;
    }
    player.velocityX *= (1 - player.friction);
    player.velocityY *= (1 - player.friction);
    player.x += player.velocityX;
    player.y += player.velocityY;
}

function stepCollision() {
    const player = getSceneObject('Player');
    const arena = getSceneObject('Arena');
    const arenaDeadzoneOffset = getSetting('arenaDeadzoneOffset');

    if (player.x + player.radius > arena.x + arena.width - arenaDeadzoneOffset) {
        player.x = arena.x + arena.width - player.radius - arenaDeadzoneOffset;
    }

    if (player.y + player.radius > arena.y + arena.height - arenaDeadzoneOffset) {
        player.y = arena.y + arena.height - player.radius - arenaDeadzoneOffset;
    }

    if (player.y - player.radius < arena.y + arenaDeadzoneOffset) {
        player.y = arena.y + player.radius + arenaDeadzoneOffset;
    }

    if (player.x - player.radius < arena.x + arenaDeadzoneOffset) {
        player.x = arena.x + player.radius + arenaDeadzoneOffset;
    }
}

module.exports = {
    stepMovement,
    stepCollision
};