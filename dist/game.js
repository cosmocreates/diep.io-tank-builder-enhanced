(()=>{var t={748:(t,e,s)=>{const{strokeWidths:i,circleClosingPoint:o}=s(227);let n=[];class r{constructor(){return n.push(this),this}}function h(t){return n.find((e=>e.constructor.name===t))}t.exports={scene:n,SceneObject:r,getSceneObject:h,StatusIndicator:class extends r{constructor(){super(),this.appearance={fillColor:"rgba(0, 0, 0, 0.5)",locked:!0}}render(t,e){t.font="16pt Reddit Mono",t.fillText("Playtesting",10,e.height-20),t.font="13pt Reddit Mono",t.fillText("diep.io tank builder enhanced",e.width-305,e.height-20)}},Camera:class extends r{constructor(t,e){super(),this.x=t,this.y=e,this.zoom=1,this.subject=h("Player")}render(t,e){this.subject.width=this.subject.width||0,this.subject.height=this.subject.height||0,this.zoom=1/this.subject.radius*50,this.x=this.subject.x+this.subject.width/2-e.width/(2*this.zoom),this.y=this.subject.y+this.subject.height/2-e.height/(2*this.zoom)}},Player:class extends r{constructor(t,e,s,i){super(),this.x=t,this.y=e,this.arena=i,this.radius=s,this.acceleration=.05,this.friction=.02,this.velocityX=0,this.velocityY=0,this.appearance={fillColor:"rgb(70, 155, 240)"}}render(t){this.radius>=(this.arena.width+this.arena.height)/4&&(this.radius=(this.arena.width+this.arena.height)/4),t.save(),t.translate(this.x,this.y),t.arc(0,0,this.radius,0,o),t.restore()}},OutOfBounds:class extends r{constructor(t,e){super(),this.x=t,this.y=e,this.appearance={fillColor:"rgb(160, 160, 160)",locked:!0}}render(t,e){t.rect(this.x,this.y,e.width,e.height)}},Arena:class extends r{constructor(t,e,s,i){super(),this.x=t,this.y=e,this.width=s,this.height=i,this.appearance={fillColor:"rgb(200, 200, 200)"}}renderGrid(t){const e=this.x-2500,s=this.y-2500,o=this.width+5e3,n=this.height+5e3,r=20,h=Math.floor(o/r),a=Math.floor(n/r);t.beginPath(),t.strokeStyle="rgba(0, 0, 0, 0.05)",t.lineWidth=i.thin;for(let i=0;i<=h;i++)t.moveTo(e+r*i+.5,s+.5),t.lineTo(e+r*i+.5,s+n+.5);for(let i=0;i<=a;i++)t.moveTo(e+.5,s+r*i+.5),t.lineTo(e+o+.5,s+r*i+.5);t.stroke(),t.closePath()}render(t){this.renderGrid(t),t.rect(this.x,this.y,this.width,this.height)}}}},227:t=>{const e=2*Math.PI,s={paused:!1,arenaDeadzoneOffset:-100,developmentMode:!0};t.exports={strokeWidths:{primary:2,thin:1},strokeBleedFactors:{primary:-40},circleClosingPoint:e,setSetting:function(t,e){s[t]=e},getSetting:function(t){return s[t]}}},538:(t,e,s)=>{const i=document.getElementById("gameCanvas"),o=i.getContext("2d"),{getSceneObject:n}=s(748);i.shiftColor=function(t,e){const s=t.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]*)\)/);if(!s)throw new Error("Invalid color format");let[i,o,n,r,h]=s;return o=Math.min(Math.max(parseInt(o)+e,0),255),n=Math.min(Math.max(parseInt(n)+e,0),255),r=Math.min(Math.max(parseInt(r)+e,0),255),h=void 0===h||""===h?1:parseFloat(h),`rgba(${o}, ${n}, ${r}, ${h})`},t.exports={canvas:i,context:o,resizeCanvas:function(){const t=n("Camera"),e=n("Player"),s=i.width,o=i.height;i.width=window.innerWidth,i.height=window.innerHeight,t.x=e.x-i.width/(2*t.zoom),t.y=e.y-i.height/(2*t.zoom),t.x+=(i.width-s)/(2*t.zoom),t.y+=(i.height-o)/(2*t.zoom)}}},752:(t,e,s)=>{const{Keyboard:i,Mouse:o}=s(465);t.exports={InputHandler:class{constructor(){this.keyboard=new i,this.mouse=new o}}}},465:t=>{let e={up:{down:!1,trigger:{w:{device:"Keyboard"},ArrowUp:{device:"Keyboard"}}},left:{down:!1,trigger:{a:{device:"Keyboard"},ArrowLeft:{device:"Keyboard"}}},down:{down:!1,trigger:{s:{device:"Keyboard"},ArrowDown:{device:"Keyboard"}}},right:{down:!1,trigger:{d:{device:"Keyboard"},ArrowRight:{device:"Keyboard"}}}};t.exports={inputMap:e,Keyboard:class{constructor(){this.keys={},this.#t()}#t(){for(let t in e)if(e.hasOwnProperty(t))for(let s in e[t].trigger)e[t].trigger.hasOwnProperty(s)&&(this.keys[s]=!1)}keyDown(t){const s=t.key;if(this.keys.hasOwnProperty(s)){this.keys[s]=!0;for(let t in e)e.hasOwnProperty(t)&&e[t].trigger.hasOwnProperty(s)&&(e[t].down=!0)}}keyUp(t){const s=t.key;if(this.keys.hasOwnProperty(s)){this.keys[s]=!1;for(let t in e)if(e.hasOwnProperty(t)&&e[t].trigger.hasOwnProperty(s)){let s=!1;for(let i in e[t].trigger)if(this.keys[i]){s=!0;break}e[t].down=s}}}},Mouse:class{constructor(){this.buttons={},this.#t()}#t(){this.buttons={left:!1,right:!1,middle:!1},window.addEventListener("mousedown",this.mouseDown.bind(this)),window.addEventListener("mouseup",this.mouseUp.bind(this))}mouseDown(t){const e=this.getButtonName(t.button);e&&(this.buttons[e]=!0)}mouseUp(t){const e=this.getButtonName(t.button);e&&(this.buttons[e]=!1)}getButtonName(t){switch(t){case 0:return"left";case 1:return"middle";case 2:return"right";default:return null}}isButtonDown(t){return this.buttons[t]}}}},309:(t,e,s)=>{const{inputMap:i}=s(465),{getSetting:o}=s(227),{getSceneObject:n}=s(748);t.exports={stepMovement:function(){const t=n("Player");i.up.down&&(t.velocityY-=t.acceleration),i.left.down&&(t.velocityX-=t.acceleration),i.down.down&&(t.velocityY+=t.acceleration),i.right.down&&(t.velocityX+=t.acceleration),t.velocityX*=1-t.friction,t.velocityY*=1-t.friction,t.x+=t.velocityX,t.y+=t.velocityY},stepCollision:function(){const t=n("Player"),e=n("Arena"),s=o("arenaDeadzoneOffset");t.x+t.radius>e.x+e.width-s&&(t.x=e.x+e.width-t.radius-s),t.y+t.radius>e.y+e.height-s&&(t.y=e.y+e.height-t.radius-s),t.y-t.radius<e.y+s&&(t.y=e.y+t.radius+s),t.x-t.radius<e.x+s&&(t.x=e.x+t.radius+s)}}},961:(t,e,s)=>{const{scene:i,getSceneObject:o}=s(748),{strokeWidths:n,strokeBleedFactors:r,getSetting:h}=s(227),{stepMovement:a,stepCollision:c}=s(309);t.exports={Renderer:class{constructor(t,e){this.context=t,this.canvas=e,this.renderScene=this.renderScene.bind(this)}clear(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)}renderScene(){const t=o("Camera");this.context.save(),window.requestAnimationFrame(this.renderScene),this.clear(),h("paused")||(a(),c()),i.forEach((e=>{const s=e.appearance||{},i={fillColor:s.fillColor||"rgba(0, 0, 0, 0)",strokeColor:null,strokeWidth:s.strokeWidth||n.primary,pathOpened:s.pathOpened||!0,pathClosed:s.pathClosed||!0,locked:s.locked||!1};i.strokeColor=s.strokeColor||this.canvas.shiftColor(i.fillColor,r.primary),this.context.save(),i.locked||(this.context.scale(t.zoom,t.zoom),this.context.translate(-t.x,-t.y)),i.pathOpened&&this.context.beginPath(),this.context.fillStyle=i.fillColor,this.context.strokeStyle=i.strokeColor,this.context.lineWidth=i.strokeWidth,e.render(this.context,this.canvas),this.context.fill(),this.context.stroke(),i.pathClosed&&this.context.closePath(),this.context.restore()})),this.context.restore()}}}},177:(t,e,s)=>{const{setSetting:i}=s(227);t.exports={Splash:class{constructor(t,e,s){this.image=t,this.timeout=e,this.silent=s}show(){this.silent||(i("paused",!0),this.splash=document.createElement("splash"),this.imageElement=document.createElement("img"),this.imageElement.src=this.image,this.imageElement.draggable=!1,this.splash.appendChild(this.imageElement),document.body.appendChild(this.splash))}hide(){this.silent||(i("paused",!1),this.splash.className="hidden",addEventListener("transitionend",(()=>{this.splash.remove()})))}}}}},e={};function s(i){var o=e[i];if(void 0!==o)return o.exports;var n=e[i]={exports:{}};return t[i](n,n.exports,s),n.exports}const{context:i,canvas:o,resizeCanvas:n}=s(538),{Renderer:r}=s(961),{InputHandler:h}=s(752),{Splash:a}=s(177),{getSetting:c}=s(227),d=s(748);window.onload=function(){const t=new h,e=new r(i,o),s=new a("../assets/images/splash.png",800,c("developmentMode")),l=(new d.OutOfBounds(0,0),new d.Arena(0,0,300,300)),u=new d.Player(0,0,25,l);var p;new d.Camera(0,0),new d.StatusIndicator,s.show(),setTimeout((()=>{s.hide()}),s.timeout),u.x=(u.x+l.width)/2,u.y=(u.y+l.height)/2,e.renderScene(),p=t,n(),window.onkeydown=function(t){p.keyboard.keyDown(t)},window.onkeyup=function(t){p.keyboard.keyUp(t)},window.onmousedown=function(t){p.mouse.mouseDown(t)},window.onmouseup=function(t){p.mouse.mouseUp(t)},n(),window.onresize=function(t){n()}}})();