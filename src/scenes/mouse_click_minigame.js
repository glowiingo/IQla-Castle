// Worked on by: Charles Huang
const NUM_OF_MICE = 3;
const MIN_DUR = 200; // minimun amount of time in ms for a mouse to travel from A to B
const MAX_DUR = 600; // maximum amount of time in ms for a mouse to travel from A to B

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
    this.load.image('pp', '../../assets/pp.png');
  }
  
  create(data) {
    let background = this.add.image(
      this.cameras.default.width / 2, 
      this.cameras.default.height / 2, 
      'background'
    );
    background.displayWidth = data.width;
    background.displayHeight = data.height;
    
    let mouseWidth = game.textures.get('pp').source[0].width;
    let mouseHeight = game.textures.get('pp').source[0].height;
    let mice = [];

    for(let i = 0; i < NUM_OF_MICE; i++){
      let randX = this.getRandomWidthFloat(data.width, mouseWidth);
      let randY = this.getRandomHeightFloat(data.height, mouseHeight);
      mice.push(this.add.image(randX, randY, 'pp').setScale(0.6));
    }
    let _this = this; // Idk why but this is suddenly no longer needed and nothing regarding this was change wtf js this is why no one likes you fucking piece of shit like srs how has no one fucking made a replacement for js fucking christ man so many languages i mean we got C, C++, C#, and Object C and that's just one fucking letter and you're gonna tell me out of all these plethora platypuses of languages the shittiest one just happened to be the only option we have for web? This is like the reverse of Mr.Strange's time stone probability thingy thang but instead of winning we end up with this fucking situation with js fucks sake ty for listening to my ted talk. // wait nvm I still need _talk but only one of my "this" needs this and literally every other this doesn't so my point still stands fuck you js. oh hey found a way to not use it but once more my point still stands fuck u mike fuck you.
    
    // add animation for each mouse
    mice.forEach((mouse) => {
      mouse.setInteractive();
      mouse.on('pointerdown', function() {
        mice.splice(mice.indexOf(mouse), 1);
        tween.stop();
        mouse.setVisible(false);
        
        if (mice.length === 0){
          minigame_scene_manager.end('mouse_click_minigame')
        }
      });
      
      // move objects to random coordinates on the board at random speeds.
      mouse.nextX = this.getRandomWidthFloat(data.width, mouseWidth);
      mouse.nextY = this.getRandomHeightFloat(data.height, mouseHeight);
      mouse.rotation = this.getRadians(mouse.x, mouse.y, mouse.nextX, mouse.nextY);
      let tween = this.tweens.add({
        targets: mouse,
        x: mouse.nextX,
        y: mouse.nextY,
        duration: MIN_DUR + Math.random() * (MAX_DUR - MIN_DUR),
        repeat: -1,
        onEnd: () => {
          mouse.nextX = this.getRandomWidthFloat(data.width, mouseWidth);
          mouse.nextY = this.getRandomHeightFloat(data.height, mouseHeight);
          mouse.rotation = this.getRadians(mouse.x, mouse.y, mouse.nextX, mouse.nextY);

          tween.updateTo('x', mouse.nextX, true);
          tween.updateTo('y', mouse.nextY, true);
          tween.updateTo('duration',  MIN_DUR + Math.random() * (MAX_DUR - MIN_DUR), true);   
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

  // atan2() takes in y param first and returns randians relative to
  // the horizontal plane pointing right from (0, 0) hence the additional
  // 90degrees to align it with the current grid (vertical plane pointing
  // up from (0, 0)). 
  getRadians(currX, currY, nextX, nextY){
      return Math.atan2(nextY - currY, nextX - currX) + Math.PI / 2;
  }
}
