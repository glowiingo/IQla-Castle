// Worked on by: Hannah

class showPositionPlayer_scene extends Phaser.Scene {
  constructor() {
    super({
      key: 'showPositionPlayer_scene',
    });
  }

  preload() {
    this.load.image('dot', '../../assets/dot.png');
  }

  create() {
    this.scene.setVisible(false);
    let showDot = false;

    this.dot = this.physics.add.sprite(330, 230, 'dot').setScale(0.05);

    // toggle player position on tab
    this.tabPress = this.input.keyboard.addKey('TAB');
    this.tabPress.on('down', () => {
      showDot = !showDot;
      showDot ? this.dotShow() : this.dotHide();
    });
  }

  dotShow() {
    // display player position in map-overlay
    this.scene.setVisible(true);
  }

  dotHide() {
    // hide player position in map-overlay
    this.scene.setVisible(false);
  }

  move(x, y) {
    // move the dot based on player movement
    if (this.dot) {
      this.dot.x = (x/10) + 145;
      this.dot.y = (y/10) + 145;
    }
  }

}
