// Worked on by: Charles Huang
class mouse_click_minigame extends Phaser.Scene {
  constructor() {
    super('mouse_click_minigame');
  }

  init() {
    // initialize and prepare data 
    // constants, configurations, etc.
  }

  preload() {
    // Load audio and images into memory.
    this.load.image('haachama', '../../assets/haachamachama112.png');
    this.load.image('background', '../../assets/shrek.jpg');
  }
  
  create(data) {
    let background = this.add.image(
      this.cameras.default.width / 2, 
      this.cameras.default.height / 2, 
      'background'
    );
    background.displayWidth = data.width;
    background.displayHeight = data.height;
    
    let mouseWidth = game.textures.get('haachama').source[0].width;
    let mouseHeight = game.textures.get('haachama').source[0].height;
    let mice = this.physics.add.group({
      key: 'haachama', 
      repeat: 2, // One is created automatically so there will be x + 1 in total
      setXY: {x: this.getRandomWidthFloat(data.width, mouseWidth), y: this.getRandomHeightFloat(data.height, mouseHeight)}
    });
    let _this = this; // Necessary for tween.

    mice.children.iterate(function(child) {
      child.setInteractive();
      child.on('pointerdown', function() {
        mice.remove(child);
        tween.stop();
        child.setVisible(false);
        
        if (mice.getLength() == 0){
            _this.add.text(game.config.width / 2, game.config.height / 2, 'hi');
        }
      });
      // Makes objects move to random places on the game screen at random speeds.
      let tween = _this.tweens.add({
        targets: child,
        x: _this.getRandomWidthFloat(data.width, mouseWidth),
        y: _this.getRandomHeightFloat(data.Height, mouseHeight),
        duration: 200 + Math.random() * 400,
        repeat: -1,
        onEnd: function(){
          tween.updateTo('x', _this.getRandomWidthFloat(data.width, mouseWidth), true);
          tween.updateTo('y', _this.getRandomHeightFloat(data.height, mouseHeight), true);
          tween.updateTo('duration', 200 + Math.random() * 400, true);                    
        }
      });
    });   
  }

  update() {
      // loop that runs constantly 
      // -- game logic mainly in this area
  }

  // Returns a random float that falls within the given 1D coordinate.
  // This assumes the board containing said coordinate is centered on
  // the main game. Parameter object_size is used to account for the 
  // image's anchor point being at its center (this function will not
  // accurately work otherwise). IE: If this function is given a board 
  // size of 3 and object size of 1 on a game of size 5, it will return 
  // a random float between 2.5 and 3.5 (exclusive).
  getRandomWidthFloat(board_size, object_size){
    let min = (this.game.config.width - board_size) / 2 + object_size / 2;
    return Math.random() * (board_size - object_size / 2 - min) + min;
  }

  getRandomHeightFloat(board_size, object_size){
    let min = (this.game.config.height - board_size) / 2 + object_size / 2;
    return Math.random() * (board_size - object_size / 2 - min) + min;
  }
}
