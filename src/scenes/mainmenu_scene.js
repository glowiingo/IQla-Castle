class mainmenu_scene extends Phaser.Scene {
  constructor() {
    super("mainmenu_scene");
  }

  create() {
    console.log("Main Menu");
    // Use this line to launch minigame in "overlay". Replace this.scene.start(SCENE_NAME) in "pointerdown" events:
    // this.scene.launch("minigame_scene_manager", "mouse_click_minigame");

    this.serverConnection = new ServerConnection();

    this.gameplay_text = this.add.text(20, 20, "Gameplay Scene", { font: "25px Arial", fill: "yellow" });

    this.gameplay_text.setInteractive();
    this.gameplay_text.on("pointerdown", () => {
      let r = prompt("Room name?");
      this.serverConnection.setRoom(r);
      this.scene.start("gameplay_scene", {serverConnection: this.serverConnection});
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
  }
}