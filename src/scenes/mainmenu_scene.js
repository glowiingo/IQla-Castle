class mainmenu_scene extends Phaser.Scene {
    constructor() {
        super("mainmenu_scene");
    }

    create() {
        console.log("Main Menu");
        this.add.text(20, 20, "Playing game", {
            font: "25px Arial",
            fill: "yellow"
        });
        this.scene.start("gameplay_scene", {
            message: "test_data_from_main"
        });
    }
}