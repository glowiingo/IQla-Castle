// Worked on by: William (Front End)

class temp_game_end_scene extends Phaser.Scene {
  constructor() {
    super("temp_game_end_scene");
  }

  init() {
  }

  preload() {
  }

  create() {
    const screenX = this.cameras.main.width;
    const screenY = this.cameras.main.height;
    const screenCenterX = this.cameras.main.worldView.x + screenX / 2;
    const screenCenterY = this.cameras.main.worldView.y + screenY / 2;

    this.add
      .text(screenCenterX, screenCenterY - 150, "IQla's Castle", {
        font: "55px Ariel",
        fill: "yellow",
      })
      .setOrigin(0.5);
  }

}
