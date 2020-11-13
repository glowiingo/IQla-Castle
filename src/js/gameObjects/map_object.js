// Worked on by: Alexis

class MapObject extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.sprite);
    this.scene = config.scene;
    this.x = config.x;
    this.y = config.y;
  }
}