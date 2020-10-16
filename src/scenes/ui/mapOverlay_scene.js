class mapOverlay_scene extends Phaser.Scene {

  constructor() {
    super({
      key: 'mapOverlay_scene'
    });
  }

  preload() {
    this.load.image('map', '../../assets/mapOverlay.png');

  }

  create() {
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
    this.scene.setVisible(true)
    console.log('show');
  }

  mapHide() {
    this.scene.setVisible(false)
    console.log('hide');
  }
}  