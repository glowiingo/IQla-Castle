class mainmenu_scene extends Phaser.Scene {
    constructor() {
        super("mainmenu_scene");
    }

    create() {
        console.log("Main Menu");
        this.add.text(20, 20, "Playing game", {font: "25px Arial", fill: "yellow"});
        this.mouse_click_text = this.add.text(20, 20, "Gameplay Scene", {font: "25px Arial", fill: "yellow"});
        // Use this line to launch minigame in "overlay". Replace this.scene.start(SCENE_NAME) in "pointerdown" events:
         

        this.gameplay_text = this.add.text(20, 20, "Gameplay Scene", {font: "25px Arial", fill: "yellow"});

        this.gameplay_text.setInteractive();
        this.gameplay_text.on("pointerdown", () => {
            //this.scene.start("gameplay_scene");
            this.scene.launch("minigame_scene_manager", "mouse_click_minigame");
        });

        this.mouse_click_minigame_text = this.add.text(20, 60, "Mouse Click Minigame", {font: "25px Arial", fill: "yellow"});

        this.mouse_click_minigame_text.setInteractive();
        this.mouse_click_minigame_text.on("pointerdown", () => {
            this.scene.launch("mouse_click_minigame");
        });

        this.book_click_minigame_text = this.add.text(20, 100, "Book Click Minigame", {font: "25px Arial", fill: "yellow"});

        this.book_click_minigame_text.setInteractive();
        this.book_click_minigame_text.on("pointerdown", () => {
            this.scene.launch("book_click_minigame");
        });
    }
}