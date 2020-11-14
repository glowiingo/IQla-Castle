// // worked on by flemming with parker
// Worked by Lewis
// In game button, cooldownTime is optional.
class gameplayButton extends Phaser.GameObjects.Sprite {
  constructor(config, cooldownTime = 0) {
    super(config.scene, config.x, config.y, config.texture);
    config.scene.add.existing(this);

    this.setInteractive();

    if (cooldownTime != 0) {
      this.on('pointerdown', this.startTimer);
    }

    this.on('pointerover', () => this.enterButtonHoverState());
    this.on('pointerout', () => this.exitButtonHoverState());
    this.setScale(0.35);
    this.cdTime = cooldownTime;
    this.scene = config.scene;
    this.x = config.x;
    this.y = config.y;
    this.delay = 1000;
  }

  startTimer() {
    if (this.isTinted) {
      return;
    }

    this.cd = this.cdTime;
    this.disableInteractive();
    this.setTint(0x2b2a2a);

    const cdTextStyle = { font: '35px' };
    this.text = this.scene.add
      .text(this.x, this.y, this.formatTime(this.cd), cdTextStyle)
      .setOrigin(0.5, 0.5);

    this.timedEvent = this.scene.time.addEvent({
      delay: this.delay,
      callback: this.onEvent,
      callbackScope: this,
      loop: true,
    });
  }

  endTimer() {
    this.timedEvent.destroy();
    this.text.destroy();
    this.clearTint();
    this.setInteractive();
  }

  formatTime(milliseconds) {
    var seconds = Math.floor(milliseconds / 1000);
    return `${seconds}`;
  }

  onEvent() {
    this.cd -= this.delay; // One second
    this.text.setText(this.formatTime(this.cd));

    if (this.cd === 0) {
      this.endTimer();
    }
  }

  enterButtonHoverState() {
    if (!this.isTinted) {
      this.setScale(0.4);
    }
  }

  exitButtonHoverState() {
    this.setScale(0.35);
  }
}
