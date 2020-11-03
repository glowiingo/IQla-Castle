/**
 * Created by Charles Huang.
 * Worked on by Charles Huang & Alexis C. Mendiola.
 */
const SCALE_SIZE = 0.75; // scale minigame relative to game size
const BACKGROUND_SCALE_SIZE = 0.85; // background behind minigame to imitate border

class minigame_scene_manager extends Phaser.Scene {
    constructor() {
        super("minigame_scene_manager");
    }

    init() {
        // initialize and prepare data 
        // constants, configurations, etc.
        this.minigameWidth = this.cameras.default.width * SCALE_SIZE;
        this.minigameHeight = this.cameras.default.height * SCALE_SIZE;
        this.backgroundWidth = this.cameras.default.width * BACKGROUND_SCALE_SIZE;
        this.backgroundHeight = this.cameras.default.height * BACKGROUND_SCALE_SIZE;
        this.buttPadding = 8; // da padding for yo' butt
    }

    preload() {
        this.load.image('exitButt', '../../assets/exitButt.png');
    }
    
    create(key) {
        this.scene.launch(key, {width: this.minigameWidth, height: this.minigameHeight});
        this.add.rectangle(game.config.width / 2, game.config.height  / 2, this.backgroundWidth, this.backgroundHeight, 0x123456);
        
        let exitButt = this.add.image(0, 0, 'exitButt');
        exitButt.displayWidth = 25;
        exitButt.displayHeight = 25;
        exitButt.setX((game.config.width - this.backgroundWidth) / 2 + this.backgroundWidth - exitButt.displayWidth / 2 - this.buttPadding);
        exitButt.setY((game.config.height - this.backgroundHeight) / 2 + exitButt.displayHeight / 2 + this.buttPadding);
        exitButt.setInteractive();
        exitButt.on('pointerdown', () => {
            this.end(key);
        });

        this.input.on('pointerdown', () => {
            let xPos = this.game.input.mousePointer.x;
            let yPos = this.game.input.mousePointer.y;
            let xBorder = this.game.config.width / 2 - this.backgroundWidth / 2;
            let yBorder = this.game.config.height / 2 - this.backgroundHeight / 2;
            if(xPos < xBorder || xPos > xBorder + this.backgroundWidth || yPos < yBorder || yPos > yBorder + this.backgroundHeight){
                this.end(key);
            }
        });
    }

    update() {
    }

    // stops minigame and wakes up mainmenu
    end(key){
        this.scene.wake('mainmenu_scene');
        this.scene.stop(key);
        this.scene.stop();
    }
}