// worked on by flemming with parker
class timerButton extends Phaser.GameObjects.Sprite {
  constructor(config, cooldownTime) {
    super(config.scene, config.x, config.y, config.sprite);
    config.scene.add.existing(this);
    this.setInteractive();
    this.timedEvent;
    this.setScale(0.25);
    this.canKill = true;
    this.on("pointerdown", this.startTimer, this);
    this.obj = "";
    this.cd = cooldownTime;
  }
  setObj(obj) {
    this.obj = obj;
  }

  startTimer() {
    console.log("hit kill button");
  }
}
