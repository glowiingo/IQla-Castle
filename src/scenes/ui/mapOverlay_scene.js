class mapOverlay_scene extends Phaser.Scene {
  
    constructor() {
      super({
        key: 'mapOverlay_scene',
        active: true
      });
    }
  
    preload() {
      this.load.image('map', '../../assets/mapOverlay.png');
    }
  
    create() {
  
      this.mapOverlay = this.add.sprite(game.config.width/2, game.config.height/2, 'map');
      this.mapOverlay.setScale(1);

      this.enterPress = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      this.enterPress.on('down',() =>this.mapHide());

      this.spacePress = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
      this.spacePress.on('down', () => this.mapShow());

    }

    mapShow(){
        this.mapOverlay.visible = true;
        console.log('show');
    }

    mapHide(){
        this.mapOverlay.visible = false;
        console.log('hide');
    }
}  