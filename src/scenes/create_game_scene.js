/*
This class is defined in order for preloading of assets, animations, and sprites.
*/

class create_game_scene extends Phaser.Scene {
    constructor() {
        super("create_game_scene");
    }

    init() {
        // initialize and prepare data
        // constants, configurations, etc.
    }

    preload() {
        // load audio and images into memory
        this.load.html("nameForm", "../../assets/text/text-input.html");
    }

    create() {
        // add objects into the game

        const screenX = this.cameras.main.width;
        const screenY = this.cameras.main.height;

        const screenCenterX = this.cameras.main.worldView.x + screenX / 2;
        const screenCenterY = this.cameras.main.worldView.y + screenY / 2;

        const loadingText = this.add
            .text(screenCenterX, screenCenterY - 150, "What is your name?", {
                font: "55px Ariel",
                fill: "yellow",
            })
            .setOrigin(0.5);

        const input = this.add.dom(10, 10).createFromCache("nameForm");
    }

    update() {
        // loop that runs constantly
        // -- game logic mainly in this area
    }
}
