
class trap_making_minigame extends Phaser.Scene {
    constructor() {
        super('trap_making_minigame');
    }

    init() {
        // initialize and prepare data 
        // constants, configurations, etc.
        this.load.image('background', '../../assets/shrek2.jpg');
    }

    preload() {
        // load audio and images into memory
    }
    
    create(data) {
      let background = this.add.image(
        this.cameras.default.width / 2, 
        this.cameras.default.height / 2, 
        'background'
      );
      background.displayWidth = data.width;
      background.displayHeight = data.height;
    }

    update() {
        // loop that runs constantly 
        // -- game logic mainly in this area
    }
}
