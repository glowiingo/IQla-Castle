/*
This class is defined in order for preloading of assets, animations, and sprites.
// Worked on by: Gloria Ngo
*/


class REPLACE_WITH_SCENE_NAME extends Phaser.Scene {
    constructor() {
        super("REPLACE_WITH_CURENT_SCENE_KEY_NAME");
    }

    init() {
        // initialize and prepare data 
        // constants, configurations, etc.
    }

    preload() {
        // load audio and images into memory
    }
    
    create() {
        // add objects into the game
        this.scene.start("REPLACE_WITH_NEXT_SCENE_KEY_NAME");
    }

    update() {
        // loop that runs constantly 
        // -- game logic mainly in this area
    }
}
