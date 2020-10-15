class minigame_scene_manager extends Phaser.Scene {
    constructor() {
        super("minigame_scene_manager");
    }

    init() {
        // initialize and prepare data 
        // constants, configurations, etc.
    }

    preload() {
        this.load.image('exitBtn', '../../assets/exitCage.jpg');
    }
    
    create(key) {
        const SCALE_SIZE = 0.8;
        let baseWidth = this.cameras.default.width;
        let baseHeight = this.cameras.default.height;
        let minigameWidth = baseWidth * SCALE_SIZE;
        let minigameHeight = baseHeight * SCALE_SIZE;

        this.scene.start(key);
        this.childScene = this.scene.get(key);
        this.childScene.cameras.resize(minigameWidth, minigameHeight);
        this.childScene.cameras.main.x = (baseWidth - minigameWidth) / 2;
        this.childScene.cameras.main.y = (baseHeight - minigameHeight) / 2;
        this.childScene.cameras.main.setBackgroundColor("#800085");
        

        let exitBtn = this.childScene.add.image(0, 0, "exitBtn");
        exitBtn.setScale(0.1);
        exitBtn.x = minigameWidth - exitBtn.width / 2 * 0.1;
        exitBtn.y = exitBtn.height / 2 * 0.1;
        console.log(exitBtn);

        exitBtn.setInteractive();
        exitBtn.on("pointerdown", function() {
            console.log("hello");
        });
    }

    update() {
    }
}