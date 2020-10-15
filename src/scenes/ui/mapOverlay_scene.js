/* This class is defined to display or non-didplay the map overlay
by using keyboard "TAB" 
@author: Hannah Nguyen
*/
class mapOverlay_scene extends Phaser.Scene {

  constructor() {
    super({
      key: 'mapOverlay_scene',
      active: true
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
    this.scene.setVisible(true)
    console.log('show');
  }

  mapHide() {
    // non-display map-overlay
    this.scene.setVisible(false)
    console.log('hide');
  }
}  