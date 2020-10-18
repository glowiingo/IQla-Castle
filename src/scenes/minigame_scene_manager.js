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
    
    create(key) {
        const SCALE_SIZE = 0.8;
        let baseWidth = this.cameras.default.width;
        let baseHeight = this.cameras.default.height;
        let minigameWidth = baseWidth * SCALE_SIZE;
        let minigameHeight = baseHeight * SCALE_SIZE;

        this.scene.launch(key);
        console.log(this.childScene);
        this.childScene.cameras.resize(minigameWidth, minigameHeight);
        this.childScene.cameras.main.x = (baseWidth - minigameWidth) / 2;
        this.childScene.cameras.main.y = (baseHeight - minigameHeight) / 2;
        this.childScene.cameras.main.setBackgroundColor('#5d8a54');
        
        let exitBtn = this.childScene.add.image(0, 0, 'exitBtn');
        exitBtn.setScale(0.1);
        exitBtn.x = minigameWidth - exitBtn.width / 2 * 0.1;
        exitBtn.y = exitBtn.height / 2 * 0.1;
        console.log(exitBtn);

        exitBtn.setInteractive();
        exitBtn.on('pointerdown', () => {
            this.scene.stop(key);
            this.scene.stop('minigame_scene_manager');
        });
    }

    update() {
    }
}