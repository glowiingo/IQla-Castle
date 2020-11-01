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
    this.load.image('exitButt', '../../assets/exitButt.png');
  }
  
  create() {
    // ---------- Exit Button: by Alexis C. M. ---------- //
    // let exitButt = this.add.image(750, 50, 'exitButt');
    // exitButt.displayWidth = 50;
    // exitButt.displayHeight = 50;
    // exitButt.setInteractive();
    // exitButt.on('pointerdown', () => {
    //   this.scene.start('mainmenu_scene');
    // });
    

    minigame_scene_manager.setBorder(this, new Image(0,0,'background'));


    // background.displayWidth = 800;
    // background.displayHeight = 600;


    let mice = this.physics.add.group({
      key: 'haachama', 
      repeat: 2, // One is created automatically so there will be x + 1 in total
      setXY: {x: 100, y: 100, stepX: 50, stepY: 100}
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
        x: Math.random() * game.config.width,
        y: Math.random() * game.config.height,
        duration: 500 + Math.random() * 500,
        repeat: -1,
        onEnd: function(){
          tween.updateTo('x', Math.random() * game.config.width, true);
          tween.updateTo('y', Math.random() * game.config.height, true);
          tween.updateTo('duration', 1000 + Math.random() * 1000, true);                    
        }
      });
    });   
  }

  update() {
      // loop that runs constantly 
      // -- game logic mainly in this area
  }
}
