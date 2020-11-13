/**
 * Created by Charles Huang.
 * Worked on by Charles Huang & Alexis C. Mendiola.
 * 
 * This scene is used to start and end minigame scenes. When creating a minigame, please
 * follow SCALE_SIZE for minigame dimensions. The minigame scene will also be layered on
 * top of the minigame_scene_manager, and therefore objects from the minigame can overlap 
 * the scene_manager's border. To end the minigame, use this scene's static function 'end'. 
 */
const SCALE_SIZE = 0.75; // scale minigame relative to game size
const BACKGROUND_SCALE_SIZE = 0.85; // background behind minigame to imitate border

class minigame_scene_manager extends Phaser.Scene {
  constructor() {
    super('minigame_scene_manager');
  }

  init() {
    // initialize and prepare data 
    // constants, configurations, etc.
    this.minigameWidth = this.cameras.default.width * SCALE_SIZE;
    this.minigameHeight = this.cameras.default.height * SCALE_SIZE;
    this.backgroundWidth = this.cameras.default.width * BACKGROUND_SCALE_SIZE;
    this.backgroundHeight = this.cameras.default.height * BACKGROUND_SCALE_SIZE;
    this.buttPadding = 8; // da padding for yo' butt
  }

  preload() {
    this.load.image('exitButt', '../../assets/exitButt.png');
  }
  
  create(key) {
    // Worked on by: Charles
    this.scene.launch(key, {width: this.minigameWidth, height: this.minigameHeight});
    this.add.rectangle(game.config.width / 2, game.config.height  / 2, this.backgroundWidth, this.backgroundHeight, 0x123456);
    
    // Worked on by: Alexis
    let exitButt = this.add.image(0, 0, 'exitButt');
    exitButt.displayWidth = 25;
    exitButt.displayHeight = 25;
    exitButt.setX((game.config.width - this.backgroundWidth) / 2 + this.backgroundWidth - exitButt.displayWidth / 2 - this.buttPadding);
    exitButt.setY((game.config.height - this.backgroundHeight) / 2 + exitButt.displayHeight / 2 + this.buttPadding);
    exitButt.setInteractive();
    exitButt.on('pointerdown', () => {
        minigame_scene_manager.end(key);
    });

    // Worked on by: Charles
    this.input.on('pointerdown', () => {
      let xPos = this.game.input.mousePointer.x;
      let yPos = this.game.input.mousePointer.y;
      let xBorder = this.game.config.width / 2 - this.backgroundWidth / 2;
      let yBorder = this.game.config.height / 2 - this.backgroundHeight / 2;
      if (xPos < xBorder || xPos > xBorder + this.backgroundWidth || yPos < yBorder || yPos > yBorder + this.backgroundHeight) {
        minigame_scene_manager.end(key);
      }
  });
  }

  update() {}

  /**
   * Stops minigame/scene manager and wakes up mainmenu.
   * Worked on by: Charles
   */
  static end(key) {
    game.scene.wake('mainmenu_scene');
    game.scene.stop('minigame_scene_manager');
    game.scene.stop(key);
  }

  static minigameWon(key) {
    // Worked on by: Alexis

    // TODO:
    // Logic for notifying server to update taskbar after minigame completion.
    console.log('Minigame completed.');
    minigame_scene_manager.end(key);
  }

  static setBackground(scene_key, background_key){
    let background = game.scene.getScene(scene_key).add.image(
      game.config.width / 2, 
      game.config.height / 2, 
        background_key
    );
    background.displayWidth = 600;
    background.displayHeight = 450;
    return background;
  }

    // Returns a new array with the inputs array's elements randomized.
    // This method will remove all the elements from the input array.
    static shuffleArray(arr){
      let newArr = [];
      let length = arr.length;
      for(let i = 0; i < length; i++){
        let randNum = Math.floor(Math.random() * arr.length);
        newArr.push(arr.splice(randNum, 1)[0]);
      }
      return newArr;
    }
}