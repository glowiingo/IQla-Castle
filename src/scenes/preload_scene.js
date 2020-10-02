/*
This class is defined in order for preloading of assets, animations, and sprites.
*/


class preload_scene extends Phaser.Scene {
    constructor() {
        super("preload_scene");
    }

    init() {
        // initialize and prepare data
    }
    
    create() {
        this.add.text(20, 20, "Loading Game...");
        console.log("Load Scene");
        this.scene.start("mainmenu_scene");
    }
}
