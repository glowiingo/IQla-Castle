class temp_menu_scene extends Phaser.Scene {
    constructor() {
        super("temp_menu_scene");
    }

  create() {
    /**
     * TEMPLATE for adding new menu item:
     * Things to change:
     * - Second param in this.add.text. Replace 00 with (40 + whatever number the previous menu item had).
     * - Third param in this.add.text. Replace "YOUR TEXT HERE" with whatever text you want displayed.
     * - Replace the text in this.scene.start("YOUR_SCENE_NAME_HERE") with the name of the scene you want to load on click.
     */
    // this.mouse_click_text = this.add.text(20, 00, "YOUR TEXT HERE", {
    //     font: "25px Arial",
    //     fill: "green"
    // });
    // this.mouse_click_text.setInteractive();
    // this.mouse_click_text.on("pointerdown", () => {
    //     this.scene.start("YOUR_SCENE_NAME_HERE"); // Replace text.
    // });

    console.log("Temp Main Menu");
    // Worked on by: Evano
    this.scenData = new SceneData(this.scene.manager.getScene("gameplay_scene"));
    this.mouse_click_text = this.add.text(20, 20, "Gameplay Scene", {
      font: "25px Arial",
      fill: "yellow"
    });
    this.mouse_click_text.setInteractive();
    this.mouse_click_text.on("pointerdown", () => {
      // Worked on by: Evano
      let r = prompt("Room name?");
      this.scenData.serverConnection.setRoom(r);
      this.scene.start("gameplay_scene");
    });
    
    this.mouse_click_text = this.add.text(20, 60, "Back End POC Menu", {
      font: "25px Arial",
      fill: "yellow"
    });
    this.mouse_click_text.setInteractive();
    this.mouse_click_text.on("pointerdown", () => {
        // back_end_menu_scene
        this.scene.start("mainmenu_scene");
    });
    
    this.mouse_click_text = this.add.text(20, 100, "Front End POC Menu", {
        font: "25px Arial",
        fill: "yellow",
    });
    this.mouse_click_text.setInteractive();
    this.mouse_click_text.on("pointerdown", () => {
        this.scene.start("title_screen_scene");
    });
    }
}
