class playerUI_scene extends Phaser.Scene {

  constructor() {
    super({
      key: 'playerUI_scene'
    });
  }

  preload() {
    this.load.image('kill', '../../assets/kill.png');
  }

  create() {

    this.killButton = this.add.sprite(game.config.width - 100, game.config.height - 100, 'kill');
    this.killButton.setInteractive();
    this.killButton.setScale(0.25);
    this.timedEvent;
    this.canKill = true;

    this.killButton
      .on('pointerdown', () => this.kill())
      .on('pointerover', () => this.enterButtonHoverState())
      .on('pointerout', () => this.exitButtonHoverState());

    // When window is resized, fix things
    window.addEventListener('resize', () => {
      this.resize(window.innerWidth, window.innerHeight);
    });
  }

  enablePress() {
    this.killButton.setTint(0xFFFFFF);
    this.canKill = true;
  }

  kill() {
    this.killButton.setTint(0x2b2a2a);
    this.time.delayedCall(2000, this.enablePress, [], this)
    this.canKill = false;
    let gameplay = this.scene.get("gameplay_scene");
    gameplay.kill(gameplay.otherPlayers.getChildren());
  }

  enterButtonHoverState() {
    if (this.canKill) {
      this.killButton.setScale(0.5);
    }

  }

  exitButtonHoverState() {
    this.killButton.setScale(0.25);
  }

  resize(width, height) {
    //this.titleText.setPosition(document.body.offsetWidth / 2 - 300, 80);
    this.killButton.setPosition(document.body.offsetWidth - 200, document.body.offsetHeight - 200);
  }


}