export const canvas = document.getElementById('gameCanvas');
export const context = canvas.getContext('2d');
import { getSceneObject } from '../scene.js';

canvas.shiftColor = function(color, factor) {
    const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]*)\)/);
    if (!rgbaMatch) {
        throw new Error('Invalid color format');
    }

    let [_, r, g, b, a] = rgbaMatch;
    r = Math.min(Math.max(parseInt(r) + factor, 0), 255);
    g = Math.min(Math.max(parseInt(g) + factor, 0), 255);
    b = Math.min(Math.max(parseInt(b) + factor, 0), 255);
    a = a === undefined || a === '' ? 1 : parseFloat(a);

    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function resizeCanvas() {
    const camera = getSceneObject('Camera')
    const player = getSceneObject('Player')

    const oldCanvasWidth = canvas.width;
    const oldCanvasHeight = canvas.height;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    camera.x = player.x - (canvas.width / (2 * camera.zoom));
    camera.y = player.y - (canvas.height / (2 * camera.zoom));

    camera.x += (canvas.width - oldCanvasWidth) / (2 * camera.zoom);
    camera.y += (canvas.height - oldCanvasHeight) / (2 * camera.zoom);
}