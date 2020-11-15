/* This class is defined to display the position of the player in the map_overlay
@author: Hannah Nguyen
*/
class showPositionPlayer_scene extends Phaser.Scene {
  constructor() {
    super({
      key: 'showPositionPlayer_scene',
    });
  }

  preload() {
    //load the image into the scene
    this.load.image('dot', '../../assets/dot.png');
  }

  create() {
    // add object into the game
    this.scene.setVisible(false);
    let showDot = false;

    this.dot = this.physics.add.sprite(330, 230, 'dot').setScale(0.05);

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
    // non-display player position in map-overlay
    this.scene.setVisible(false);
  }

  move(x, y) {
    if (this.dot) {
      this.dot.x = (x/10) + 145;
      this.dot.y = (y/10) + 145;
    }
  }
}
