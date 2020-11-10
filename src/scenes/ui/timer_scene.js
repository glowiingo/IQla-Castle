// worked on by flemming
class timer_scene extends Phaser.Scene {
  constructor() {
    super({
      key: "timer_scene",
    });
    console.log("timer_scene");
  }

  preload() {
    this.load.image("no", "../../assets/exitButt.png");
  }
  create() {
    console.log("timer button created");
    let killBtn = new timerButton(
      {
        scene: this,
        x: game.config.width - 100,
        y: game.config.height - 50,
        sprite: "no",
      },
      20
    );
    // killBtn.setObj(this);
  }
}
