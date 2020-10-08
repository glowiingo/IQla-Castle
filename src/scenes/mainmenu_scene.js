class mainmenu_scene extends Phaser.Scene {
    constructor() {
        super("mainmenu_scene");
    }

    create() {
        console.log("Main Menu");
        this.mouse_click_text = this.add.text(20, 20, "Gameplay Scene", {font: "25px Arial", fill: "yellow"});

        this.mouse_click_text.setInteractive();
        this.mouse_click_text.on("pointerdown", () => {
            this.scene.start("gameplay_scene");
        });

        this.mouse_click_text = this.add.text(20, 60, "Mouse Click Minigame", {font: "25px Arial", fill: "yellow"});

        this.mouse_click_text.setInteractive();
        this.mouse_click_text.on("pointerdown", () => {
            this.scene.start("mouse_click_minigame");
        });

        this.mouse_click_text = this.add.text(20, 100, "Book Click Minigame", {font: "25px Arial", fill: "yellow"});

        this.mouse_click_text.setInteractive();
        this.mouse_click_text.on("pointerdown", () => {
            this.scene.start("book_click_minigame");
        });
        
    }
}