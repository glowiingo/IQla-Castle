/**
 * Created by Charles Huang.
 * Worked on by Charles Huang & Alexis C. Mendiola.
 */
class minigame_scene_manager extends Phaser.Scene {
    constructor() {
        super("minigame_scene_manager");
    }

    init(key) {
        // initialize and prepare data 
        // constants, configurations, etc.
        console.log(`in preload: ${key}`);
        this.childScene = this.scene.get(key); // ERROR: this.childScene is undefined after running 2nd time.
        console.log(this.childScene);
    }

    preload() {
        this.load.image('exitBtn', '../../assets/exitButt.png');
    }

    static setBorder(_this, background){
        const SCALE_SIZE = 0.8;
        let baseWidth = _this.cameras.default.width;
        let baseHeight = _this.cameras.default.height;
        let minigameWidth = baseWidth * SCALE_SIZE;
        let minigameHeight = baseHeight * SCALE_SIZE;
        let exitButt;

        _this.cameras.resize(minigameWidth, minigameHeight);
        _this.cameras.main.x = (baseWidth - minigameWidth) / 2;
        _this.cameras.main.y = (baseHeight - minigameHeight) / 2;
        _this.cameras.main.setBackgroundColor('#5d8a54');

        _this.add.rectangle(minigameWidth / 2, minigameHeight / 2, minigameWidth, minigameHeight, 0x123456, 1);

        let background = background.texture.source[0].image;
        console.log(background);
        
        exitButt = _this.add.image(615, 25, 'exitButt');
        exitButt.displayWidth = 40;
        exitButt.displayHeight = 40;
        exitButt.setInteractive();
        exitButt.on('pointerdown', () => {
            _this.scene.stop();
        });

        _this.input.on('pointerdown', () => {
            let xPos = _this.game.input.mousePointer.x;
            let yPos = _this.game.input.mousePointer.y;
            let xBorder = baseWidth / 2 - minigameWidth / 2;
            let yBorder = baseHeight / 2 - minigameHeight / 2;
            if(xPos < xBorder || xPos > xBorder + minigameWidth || yPos < yBorder || yPos > yBorder + minigameHeight){
                _this.scene.stop();
            }
        });
    }
    
    create() {
    }

    update() {
    }
}