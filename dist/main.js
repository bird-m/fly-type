!function(){"use strict";!function(){class t{constructor(t){this.xCoordinate=t.xCoordinate,this.yCoordinate=t.yCoordinate,this.xVelocity=t.xVelocity,this.yVelocity=t.yVelocity,this.color=t.color,this.transparency=t.transparency||1}move(){this.xCoordinate=this.xCoordinate+this.xVelocity,this.yCoordinate=this.yCoordinate+this.yVelocity}}class e extends t{constructor(t){super(t),this.width=t.width,this.height=t.height}draw(t){const e=t.createLinearGradient(this.xCoordinate,this.yCoordinate,this.xCoordinate,this.yCoordinate+this.height);e.addColorStop(0,"lightyellow"),e.addColorStop(.3,"yellow"),e.addColorStop(.5,"yellow"),e.addColorStop(.7,"yellow"),e.addColorStop(1,"lightyellow"),t.fillStyle=e,t.fillRect(this.xCoordinate,this.yCoordinate,this.width,this.height)}}class i extends e{constructor(t){super(t),this.character=t.character,this.color=t.color||"black",this.canvasInterface=t.canvasInterface,this.typeable=t.typeable,this.points=0}draw(t){t.fillStyle=this.color,t.font=i.FONT,t.fillText(this.character,this.xCoordinate,this.yCoordinate)}get height(){this.canvasInterface.font=i.FONT;const t=this.canvasInterface.measureText(this.character);return t.actualBoundingBoxAscent+t.actualBoundingBoxDescent}set height(t){}}var r,a,s;function n(t){return t.length?t[Math.floor(Math.random()*t.length)]:null}r=i,s="20px Georgia",(a=function(t){var e=function(t,e){if("object"!=typeof t||null===t)return t;var i=t[Symbol.toPrimitive];if(void 0!==i){var r=i.call(t,"string");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==typeof e?e:String(e)}(a="FONT"))in r?Object.defineProperty(r,a,{value:s,enumerable:!0,configurable:!0,writable:!0}):r[a]=s;const o=document.getElementById("message");function h(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";o.style.backgroundColor=i,o.style.color=e,o.innerHTML=t}function c(t,e,i){return(e=function(t){var e=function(t,e){if("object"!=typeof t||null===t)return t;var i=t[Symbol.toPrimitive];if(void 0!==i){var r=i.call(t,"string");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==typeof e?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}class l{constructor(t){this.canvasInterface=t,this.width=t.canvas.width,this.height=t.canvas.height,this.gameOver=!1,this.scoreOutput=document.getElementById("game-score"),this.livesOutput=document.getElementById("game-lives"),this.reset(),this.xCharOptions=[.2*this.width,.4*this.width,.6*this.width,.8*this.width],this.img=new Image,this.img.src="/assets/fullLegalPad500.png",this.targetBar=new e({xCoordinate:0,yCoordinate:411,xVelocity:0,yVelocity:0,color:"lightgrey",width:this.width,height:50,canvasInterface:this.canvasInterface})}printScore(){this.scoreOutput.innerHTML=this.score}printLives(){this.livesOutput.innerHTML=this.lives}addChar(){const t=this.targetArray[0];if(this.characters.length>=1&&this.characters[this.characters.length-1].yCoordinate<=.05*this.height);else if(" "===t)this.wordPause=2,this.targetArray.shift();else if(this.targetArray.length>0&&this.wordPause<=0){const t=new i({xCoordinate:n(this.xCharOptions),yCoordinate:0,xVelocity:0,yVelocity:this.charVel,character:this.targetArray.shift(),canvasInterface:this.canvasInterface,typeable:!1});this.characters.push(t)}else 0===this.characters.length?(this.resetSentence(),this.charVel=1.2*this.charVel):this.wordPause--}resetSentence(){var t;this.targetSentence=`${n(l.ADJECTIVES)} ${n(l.NOUNS)}s ${n(l.VERBS)} ${n(l.ADVERBS)}`,this.targetArray=Array.from(this.targetSentence),t=this.targetSentence,document.getElementById("sentence").innerHTML=t}step(){for(let t=this.characters.length-1;t>=0;t--){const e=this.characters[t];e.move(),this.charOffCanvas(e)?this.characters.splice(t,1):this.colorChar(e)}this.hasLives()||(this.pause(),this.gameOver=!0)}hasLives(){return this.lives>0}charOffCanvas(t){return t.yCoordinate>this.height+t.height&&(this.lives--,h(`Oh no, you missed ${t.character}.`,"black","grey"),!0)}animate(){this.drawBackdrop("beige"),this.targetBar.draw(this.canvasInterface),this.characters.forEach((t=>{t.draw(this.canvasInterface)})),this.drawCounters()}drawCounters(){this.printLives(),this.printScore()}start(){h(""),this.gameInterval=setInterval((()=>{this.gameOver&&(this.reset(),this.gameOver=!1),this.step(),this.gameOver||this.animate()}),17),this.charInterval=setInterval((()=>{this.addChar()}),500)}pause(){clearInterval(this.gameInterval),clearInterval(this.charInterval),this.addOverlay()}addOverlay(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"grey",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.5;this.canvasInterface.globalAlpha=e,this.canvasInterface.fillStyle=t,this.canvasInterface.fillRect(0,0,this.width,this.height),this.canvasInterface.globalAlpha=1}colorChar(t){const e=this.targetBar.yCoordinate,i=this.targetBar.yCoordinate+this.targetBar.height+t.height;if(t.yCoordinate>=e&&t.yCoordinate<=i){let r=i-e,a=(t.yCoordinate-e)/r;a>=.2&&a<=.8?(t.color="green",t.points=15):(t.color="red",t.points=10),t.typeable=!0}else t.typeable=!1,t.points=0,t.color="black"}checkEntry(t){let e=null;const i=this.characters.filter((i=>{if(i.character===t&&i.typeable)return 15===i.points?h("Right on target - Nice!","red","yellow"):h("Close....","black","grey"),this.score=this.score+i.points,this.lives=Math.min(this.lives+1,3),!0;i.typeable&&(e=i.character)}));if(!(i.length>0)){console.log(this.lives,"lives before"),this.lives=this.lives-1,console.log(this.lives,"lives after");let i="";return i=e?` instead of ${e}`:"",h(`Arghhh. You entered ${t}${i}`,"yellow","red"),!1}i.forEach((t=>{const e=this.characters.indexOf(t);this.characters.splice(e,1)}))}drawBackdrop(t){this.canvasInterface.fillStyle=t,this.canvasInterface.fillRect(0,0,this.width,this.height),this.canvasInterface.drawImage(this.img,0,0)}replayScreen(){this.drawCounters(),h(`${o.innerHTML} Enter to replay.`,"yellow","red"),this.reset()}reset(){this.characters=[],this.score=0,this.lives=3,this.charX=null,this.resetSentence(),this.wordPause=0,this.charVel=2}}c(l,"ADJECTIVES",["furry","happy","gloomy","friendly"]),c(l,"NOUNS",["dog","cat","tree","mountain"]),c(l,"VERBS",["ran","jumped","slept","ate"]),c(l,"ADVERBS",["quickly","slowly","loudly","quietly"]);class g{constructor(t){this.canvasInterface=t,this.game=new l(t),this.bindKeys(),this.gameRunning=!1,this.updateHTMLScore()}bindKeys(){document.addEventListener("keydown",(t=>{this.handleKey(t)}))}handleKey(t){const e=t.key;" "===e||"Enter"===e?(console.log("restarting"),this.gameToggle()):"ArrowRight"===e?(this.game.step(),this.game.animate()):g.INPUT.indexOf(e)>=0?this.game.checkEntry(e):console.log(e,`did not process your ${e}`)}startGame(){this.gameRunning=!0,this.game.start(),this.gameCheckInterval=setInterval((()=>{this.checkGame()}),17)}checkGame(){this.game.gameOver&&(clearInterval(this.gameCheckInterval),this.gameRunning=!1,(""===document.cookie||this.game.score>this.cookieScore())&&(document.cookie=`highScore=${this.game.score}`,this.updateHTMLScore()),this.game.replayScreen())}cookieScore(){let t=null;const e=document.cookie.split(";");for(let i=0;i<e.length;i++){const r=e[i].split("=");if("highScore"===r[0]){t=parseInt(r[1]);break}}return t}updateHTMLScore(){const t=this.cookieScore();document.getElementById("scores").innerHTML=t?`High Score: ${t}`:"No high score...yet"}gameToggle(){this.gameRunning?this.pauseGame():this.startGame()}pauseGame(){this.gameRunning=!1,clearInterval(this.gameCheckInterval),this.game.pause()}}!function(t,e,i){(e=function(t){var e=function(t,e){if("object"!=typeof t||null===t)return t;var i=t[Symbol.toPrimitive];if(void 0!==i){var r=i.call(t,"string");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==typeof e?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i}(g,"INPUT",["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","y","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","Y","X","Y","Z"]);const d=document.getElementById("game-canvas");d.width=500,d.height=500;const u=d.getContext("2d"),y=new g(u);window.view=y,y.startGame()}()}();
//# sourceMappingURL=main.js.map