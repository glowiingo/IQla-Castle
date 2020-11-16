// Worked on by: Hannah

class mapOverlay_scene extends Phaser.Scene {

  constructor() {
    super({
      key: 'mapOverlay_scene'
    });
  }

  preload() {
    this.load.image('map', '../../assets/protypeMap.png');
  }

  create() {
    this.scene.setVisible(false)
    let showMap = false;

    this.mapOverlay = this.add.sprite(game.config.width / 2, game.config.height / 2, 'map');
    this.mapOverlay.setScale(0.1);

    // toggle map on tab
    this.tabPress = this.input.keyboard.addKey('TAB');
    this.tabPress.on('down', () => {
      showMap =! showMap;
      showMap ? this.mapShow() : this.mapHide();
    });
  }

  mapShow() {
    // display map-overlay
    this.scene.setVisible(true);
  }

  mapHide() {
    // hide map-overlay
    this.scene.setVisible(false);
  }
}  