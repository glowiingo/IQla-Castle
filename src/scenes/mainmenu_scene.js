// Worked on by: Gloria Ngo

class mainmenu_scene extends Phaser.Scene {
  constructor() {
    super("mainmenu_scene");
  }

  create() {
    console.log("Main Menu");
    // Use this line to launch minigame in "overlay". Replace this.scene.start(SCENE_NAME) in "pointerdown" events:
    // this.scene.launch("minigame_scene_manager", "mouse_click_minigame");

    this.gameplay_text = this.add.text(20, 20, "Gameplay Scene", { font: "25px Arial", fill: "yellow" });
    
    this.gameplay_text.setInteractive();
    this.gameplay_text.on("pointerdown", () => {
      this.scene.start("gameplay_scene");
    });

    this.mouse_click_minigame_text = this.add.text(20, 60, "Mouse Click Minigame", { font: "25px Arial", fill: "yellow" });

    this.mouse_click_minigame_text.setInteractive();
    this.mouse_click_minigame_text.on("pointerdown", () => {
      this.scene.start("mouse_click_minigame");
    });
    
    this.book_click_minigame_text = this.add.text(20, 100, "Book Click Minigame", { font: "25px Arial", fill: "yellow" });

    this.book_click_minigame_text.setInteractive();
    this.book_click_minigame_text.on("pointerdown", () => {
      this.scene.start("book_click_minigame");
    });

    this.mouse_click_text = this.add.text(20, 140, "Kill Scene", {font: "25px Arial", fill: "yellow"});

    this.mouse_click_text.setInteractive();
    this.mouse_click_text.on("pointerdown", () => {
        this.scene.start("kill_scene", {message: "test_data_from_main"});
    });

    this.trap_scene = this.add.text(20, 180, "Trap Scene", {font: "25px Arial", fill: "yellow"});

    this.trap_scene.setInteractive();
    this.trap_scene.on("pointerdown", () => {
        this.scene.start("trap_gameplay_scene", {message: "test_data_from_main"});
    });
  }
}