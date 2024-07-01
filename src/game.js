const { context, canvas, resizeCanvas } = require('./tools/canvas.js');
const { Renderer } = require('./tools/renderer.js');
const { InputHandler } = require('./tools/input.js');
const { Splash } = require('./tools/splash.js');
const { getSetting } = require('./settings.js');
const scene = require('./scene.js');

console.log('ALPHA RELEASE (MAY BE UNSTABLE) ⚠️')

function startGame() {
  const inputHandler = new InputHandler();
  const renderer = new Renderer(context, canvas);

  const splash = new Splash('../assets/images/splash.png', 800, getSetting('developmentMode'))
  const outOfBounds = new scene.OutOfBounds(0, 0)
  const arena = new scene.Arena(0, 0, 300, 300);
  const player = new scene.Player(0, 0, 25, arena);
  const camera = new scene.Camera(0, 0);
  const status = new scene.StatusIndicator()

  splash.show()
  
  setTimeout(() => {
    splash.hide()
  }, splash.timeout);

  player.x = (player.x + arena.width) / 2
  player.y = (player.y + arena.height) / 2

  renderer.renderScene();

  initialize(inputHandler);
}

function initialize(input) {
  resizeCanvas();

  window.onkeydown = function(event) {
    input.keyboard.keyDown(event);
  };

  window.onkeyup = function(event) {
    input.keyboard.keyUp(event);
  };

  window.onmousedown = function(event) {
    input.mouse.mouseDown(event);
  };

  window.onmouseup = function(event) {
    input.mouse.mouseUp(event);
  };

  resizeCanvas()

  window.onresize = function(event) {
    resizeCanvas();
  };
}

window.onload = startGame;