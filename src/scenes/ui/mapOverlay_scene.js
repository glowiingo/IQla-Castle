// Worked on by: Hannah

class mapOverlay_scene extends Phaser.Scene {

  constructor() {
    super({
      key: 'mapOverlay_scene'
    });
  }

  preload() {
    //load the image into the scene
    this.load.image('map', '../../assets/mapOverlay.png');

  }

  create() {
    // add object into the game
    this.scene.setVisible(false)
    let showMap = false;

    this.mapOverlay = this.add.sprite(game.config.width / 2, game.config.height / 2, 'map');
    this.mapOverlay.setScale(1);

    this.tabPress = this.input.keyboard.addKey('TAB');
    this.tabPress.on('down', () => {
      showMap = !showMap;
      showMap ? this.mapShow() : this.mapHide();
    });

  }

  mapShow() {
    // display map-overlay
    this.scene.setVisible(true);
  }

  mapHide() {
    // non-display map-overlay
    this.scene.setVisible(false);
  }
}  