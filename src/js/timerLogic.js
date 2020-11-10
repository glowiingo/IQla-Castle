// // worked on by flemming with parker
class timerButton extends Phaser.GameObjects.Sprite {
  constructor(config, cooldownTime = null) {
    super(config.scene, config.x, config.y, config.sprite);
    config.scene.add.existing(this);
    this.setInteractive();
    this.timedEvent;
    this.setScale(0.25);
    this.canKill = true;
    this.on("pointerdown", this.startTimer, this);
    this.obj = "";
    this.cd = cooldownTime;
    this.scene = config.scene;
  }
  setObj(obj) {
    this.obj = obj;
  }

  startTimer() {
    let cd = this.cd;
    console.log(`timer running for ${cd}ms`);
    this.setTint(0x2b2a2a);
    this.text = this.scene.add.text(32, 32, this.formatTime(cd));
    this.timedEvent = this.scene.time.addEvent({
      delay: 1000,
      callback: this.onEvent,
      callbackScope: this,
      loop: true,
    });
  }
  formatTime(milliseconds) {
    var seconds = Math.floor(milliseconds / 1000);
    return `${seconds}`;
  }
  onEvent() {
    cd -= 1000; // One second
    this.text.setText(this.formatTime(cd));
    if (cd === 0) {
      this.timedEvent.destroy();
    }
  }
}
