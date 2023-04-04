import MovingCharacter from "./movingCharacter";
import MovingRectangle from "./movingRectangle";
import { genSentence, selectRand, setBanner } from "./util";

export default class Game {
   
    // static DICTIONARY = ["h","j","k","l"];
    // static DICTIONARY = ["h"]; // limited test chars
    
    static ADJECTIVES = ['furry', 'happy', 'gloomy', 'friendly'];
    static NOUNS = ['dog', 'cat', 'tree', 'mountain'];
    static VERBS = ['ran', 'jumped', 'slept', 'ate'];
    static ADVERBS = ['quickly', 'slowly', 'loudly', 'quietly'];

    constructor(canvasInterface) {
        this.canvasInterface = canvasInterface;
        this.width = canvasInterface.canvas.width;
        this.height = canvasInterface.canvas.height;
        this.characters = [];
        this.score = 0;
        this.lives = 50;
        this.gameOver = false;
        this.resetSentence();
        this.xCharOptions = [
            this.width*0.20,
            this.width*0.40,
            this.width*0.60,
            this.width*0.80
        ];


        // debugger;

        //initialize the target bar that the letters will cross and give it starting positions
        this.targetBar = new MovingRectangle({
            xCoordinate: 0,
            yCoordinate: 400,
            xVelocity: 0, 
            yVelocity: 0, 
            color: "lightgrey",
            width: this.width,
            height: 30,
            canvasInterface: this.canvasInterface
        })
    }

    addChar() {
            
        // debugger;
        if (this.noSpaceTarget.length > 0){

            const vel = 1.5;
            const newChar = new MovingCharacter({
                xCoordinate: selectRand(this.xCharOptions),
                yCoordinate: 0,
                xVelocity: 0, 
                yVelocity: vel, 
                character: this.removeChar(),
                canvasInterface: this.canvasInterface,
                typeable: false
            })
            this.characters.push(newChar);
        } else if (this.characters.length === 0) {
            this.resetSentence();
        }
        // debugger;
    }

    removeChar() {
        return this.noSpaceTarget.shift();
    }

    // sentenceCleared() {
    //     return (this.noSpaceTarget.length === 0 || this.characters.length === 0)
    // }

    resetSentence() {
        this.targetSentence = genSentence();
        this.noSpaceTarget = Array.from(this.targetSentence.split(" ").join(""));
        setBanner(this.targetSentence);
    }

    step() {
        
        for (let i = this.characters.length - 1; i >=0; i--) {
            const char = this.characters[i];
            char.move();

            if (this.charOffCanvas(char)) {
                // debugger;
                // console.log("char deleted");
                this.characters.splice(i,1);
            } else {
                this.colorChar(char);
            }
        }
        
        //end game if score is <=0
        if (this.lives <= 0) {
            this.pause();
            // this.characters = [];
            // this.reset();
            this.gameOver = true;
            // console.log("game over");
            // debugger;
        }
        // console.log(this.characters.length, "num of chars");
    }

    charOffCanvas(char) {
        if (char.yCoordinate > (this.height + char.height)) {
            this.lives --;
            return true
        } else {
            return false;
        }
    }

    animate(){
        this.drawBackdrop("beige");
        this.targetBar.draw(this.canvasInterface);
        this.characters.forEach((char) =>{
            char.draw(this.canvasInterface);
        });
        this.drawCounters();
    }

    drawCounters() {
        
        this.canvasInterface.fillStyle = "black";
        this.canvasInterface.font = '14px Arial';
        
        //draw score
        const scoreX =  0.01*this.width;
        const scoreY =  0.99*this.height;

        this.canvasInterface.fillText(`Score: ${this.score}`,scoreX,scoreY);

        //draw lives
        const livesX =  0.89*this.width;
        const livesY =  0.99*this.height;
        
        this.canvasInterface.fillText(`Lives: ${this.lives}`,livesX,livesY);
    }

    start() {
        this.gameOver = false;
        this.gameInterval = setInterval(() => {
            this.step();
            
            if (!this.gameOver) this.animate();
        
        }, 17);
        
        this.charInterval = setInterval(() => {
            // console.log("char added");
            this.addChar();
        }, 500);
    }

    pause() {
        clearInterval(this.gameInterval);
        clearInterval(this.charInterval);
    }

    colorChar(char) {
        if (char.yCoordinate >= this.targetBar.yCoordinate && char.yCoordinate <= (this.targetBar.yCoordinate + this.targetBar.height + char.height)) {
            char.typeable = true;
            char.color = "red";
        } else {
            char.typeable = false;
            char.color = "black";
        }
    }

    
    checkEntry(inputChar) {
        debugger;
        console.log(inputChar, "input char");
        const matchingChars = this.characters.filter((char) => {
            if(char.character === inputChar && char.typeable) {
                this.score = this.score + 10;
                this.lives = Math.min(this.lives + 1, 5);
                return true;
            }
        })
        if (matchingChars.length > 0) {
            matchingChars.forEach((hitChar) => {
                const delIdx = this.characters.indexOf(hitChar);
                this.characters.splice(delIdx,1);
            });
        } else {
            // console.log("miss!");
            return false;
        }
    }

    drawBackdrop (color) {
        this.canvasInterface.fillStyle = color;
        this.canvasInterface.fillRect(0, 0, this.width, this.height);
    }

    replayScreen() {
        // console.log("replay screen")
        this.drawBackdrop("grey");
        this.characters = [];
        this.score = 0;
        this.lives = 5;
        this.charX = null;

        // this.canvasInterface.fillStyle = "black";
        // this.canvasInterface.font = '26px Arial';
        
        // //draw score
        // const msgX =  0.20*this.width;
        // const msgY =  0.50*this.height;

        // this.canvasInterface.fillText(`Select return to play again!`,msgX,msgY);

        setBanner("Game over :( select return to play again!")
    }

    
}
        